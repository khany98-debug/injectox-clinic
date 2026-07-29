import "server-only";

import { createHash } from "node:crypto";
import { ensureNeonSchema } from "@/lib/neon";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function localRateLimit(request: Request, scope: string, limit: number, windowMs: number) {
  const client = clientKey(request);
  const key = `${scope}:${client}`;
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  if (current.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  }
  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function sharedStore() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function neonRateLimit(key: string, windowMs: number) {
  const sql = await ensureNeonSchema();
  if (!sql) return null;
  const seconds = Math.max(1, Math.ceil(windowMs / 1000));
  const rows = await sql`
    INSERT INTO injectox_rate_limits (key, count, reset_at)
    VALUES (${key}, 1, NOW() + (${seconds} * INTERVAL '1 second'))
    ON CONFLICT (key) DO UPDATE SET
      count = CASE WHEN injectox_rate_limits.reset_at <= NOW() THEN 1 ELSE injectox_rate_limits.count + 1 END,
      reset_at = CASE WHEN injectox_rate_limits.reset_at <= NOW() THEN NOW() + (${seconds} * INTERVAL '1 second') ELSE injectox_rate_limits.reset_at END
    RETURNING count, GREATEST(0, CEIL(EXTRACT(EPOCH FROM reset_at - NOW())))::integer AS "retryAfter"
  ` as { count: number; retryAfter: number }[];
  const row = rows[0];
  return row ? { count: Number(row.count), retryAfter: Number(row.retryAfter) } : null;
}

/**
 * Uses Vercel KV/Upstash when configured so limits are shared across serverless
 * instances. If the store is unavailable, the in-memory guard still protects
 * the current instance rather than making the form unusable.
 */
export async function rateLimit(request: Request, scope: string, limit: number, windowMs: number) {
  const store = sharedStore();
  const client = createHash("sha256").update(clientKey(request)).digest("hex");
  const key = `injectox:rate:${scope}:${client}`;
  if (!store) {
    try {
      const shared = await neonRateLimit(key, windowMs);
      if (shared) return { allowed: shared.count <= limit, retryAfter: shared.count <= limit ? 0 : shared.retryAfter };
    } catch {
      // A temporary database fault should never make a public form unusable.
    }
    return localRateLimit(request, scope, limit, windowMs);
  }

  const seconds = Math.max(1, Math.ceil(windowMs / 1000));
  const headers = { Authorization: `Bearer ${store.token}` };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch(`${store.url}/incr/${encodeURIComponent(key)}`, {
      headers,
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return localRateLimit(request, scope, limit, windowMs);
    const count = Number((await response.json())?.result);
    if (!Number.isFinite(count)) return localRateLimit(request, scope, limit, windowMs);
    if (count === 1) {
      await fetch(`${store.url}/expire/${encodeURIComponent(key)}/${seconds}`, {
        headers,
        cache: "no-store",
        signal: controller.signal,
      });
    }
    return { allowed: count <= limit, retryAfter: count <= limit ? 0 : seconds };
  } catch {
    return localRateLimit(request, scope, limit, windowMs);
  } finally {
    clearTimeout(timeout);
  }
}

export function rateLimitResponse(retryAfter: number) {
  return Response.json({ error: "Too many requests. Please wait a moment and try again." }, {
    status: 429,
    headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" },
  });
}
