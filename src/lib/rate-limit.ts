type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Lightweight per-instance guard for public POST endpoints.
 * Configure a shared edge limiter (or Upstash) for multi-instance production traffic. */
export function rateLimit(request: Request, scope: string, limit: number, windowMs: number) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const client = forwarded || request.headers.get("x-real-ip") || "unknown";
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

export function rateLimitResponse(retryAfter: number) {
  return Response.json({ error: "Too many requests. Please wait a moment and try again." }, {
    status: 429,
    headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" },
  });
}
