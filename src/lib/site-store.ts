import "server-only";

import { pricing, reviews as publishedReviews, treatments } from "@/lib/content";
import { ensureNeonSchema, neonConfigured } from "@/lib/neon";
import type { ContentOverrides, ReviewSubmission } from "@/lib/site-types";
export type { ContentOverrides, ReviewSubmission } from "@/lib/site-types";

const defaultOverrides: ContentOverrides = { copy: {}, treatments: {}, pricing: {}, clinic: {} };
const memory = { content: defaultOverrides, reviews: [] as ReviewSubmission[] };

function kvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function kv<T>(command: unknown[]) {
  const config = kvConfig();
  if (!config) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  let response: Response;
  try {
    response = await fetch(`${config.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
      body: JSON.stringify([command]),
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
  if (!response.ok) throw new Error("Content store request failed");
  const data = await response.json() as Array<{ result?: unknown }>;
  return data[0]?.result as T | null;
}

function mergeOverrides(value: Partial<ContentOverrides> | undefined): ContentOverrides {
  return { ...defaultOverrides, ...value, clinic: { ...defaultOverrides.clinic, ...value?.clinic } };
}

function parseContent(value: unknown) {
  if (!value) return defaultOverrides;
  if (typeof value === "string") {
    try { return mergeOverrides(JSON.parse(value) as Partial<ContentOverrides>); } catch { return defaultOverrides; }
  }
  return typeof value === "object" && !Array.isArray(value) ? mergeOverrides(value as Partial<ContentOverrides>) : defaultOverrides;
}

function normaliseReview(row: Record<string, unknown>): ReviewSubmission {
  return {
    id: String(row.id),
    name: String(row.name),
    treatment: String(row.treatment),
    review: String(row.review),
    rating: Number(row.rating),
    consent: Boolean(row.consent),
    status: row.status === "approved" || row.status === "dismissed" ? row.status : "pending",
    createdAt: new Date(String(row.createdAt ?? row.created_at)).toISOString(),
  };
}

export function contentStoreConfigured() {
  return neonConfigured() || Boolean(kvConfig());
}

export async function getContentOverrides(): Promise<ContentOverrides> {
  const sql = await ensureNeonSchema();
  if (sql) {
    const rows = await sql`SELECT content FROM injectox_site_content WHERE id = 1 LIMIT 1` as { content: unknown }[];
    return parseContent(rows[0]?.content);
  }
  const value = await kv<string | null>(["GET", "injectox:content"]);
  if (value) return parseContent(value);
  return memory.content;
}

export async function saveContentOverrides(content: ContentOverrides) {
  memory.content = content;
  const sql = await ensureNeonSchema();
  if (sql) {
    await sql`
      INSERT INTO injectox_site_content (id, content, updated_at)
      VALUES (1, ${JSON.stringify(content)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
    `;
    return content;
  }
  await kv(["SET", "injectox:content", JSON.stringify(content)]);
  return content;
}

export async function getReviews(): Promise<ReviewSubmission[]> {
  const sql = await ensureNeonSchema();
  if (sql) {
    const rows = await sql`
      SELECT id, name, treatment, review, rating, consent, status, created_at AS "createdAt"
      FROM injectox_reviews ORDER BY created_at DESC LIMIT 500
    ` as Record<string, unknown>[];
    return rows.map(normaliseReview);
  }
  const value = await kv<string | null>(["GET", "injectox:reviews"]);
  if (value) {
    try { return JSON.parse(value) as ReviewSubmission[]; } catch { return []; }
  }
  return memory.reviews;
}

export async function saveReviews(reviews: ReviewSubmission[]) {
  memory.reviews = reviews;
  const sql = await ensureNeonSchema();
  if (sql) {
    // Each write is an upsert. This avoids accidentally losing a review if a
    // client submits feedback at the same moment the clinic moderates another.
    if (reviews.length) await sql.transaction(reviews.map((review) => sql`
      INSERT INTO injectox_reviews (id, name, treatment, review, rating, consent, status, created_at)
      VALUES (${review.id}, ${review.name}, ${review.treatment}, ${review.review}, ${review.rating}, ${review.consent}, ${review.status}, ${review.createdAt})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        treatment = EXCLUDED.treatment,
        review = EXCLUDED.review,
        rating = EXCLUDED.rating,
        consent = EXCLUDED.consent,
        status = EXCLUDED.status
    `));
    return reviews;
  }
  await kv(["SET", "injectox:reviews", JSON.stringify(reviews)]);
  return reviews;
}

export async function getPublicReviews() {
  const approved = (await getReviews()).filter((review) => review.status === "approved");
  return [...publishedReviews, ...approved.map((review) => ({ name: review.name, treatment: review.treatment, date: "Approved client review", quote: review.review }))];
}

export function applyContentOverrides(overrides: ContentOverrides) {
  const nextTreatments = treatments.map((treatment) => ({ ...treatment, ...(overrides.treatments[treatment.slug] ?? {}) }));
  const nextPricing = pricing.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      const key = `${group.category}:${item.name}`;
      return { ...item, ...(overrides.pricing[key] ?? {}) };
    }),
  }));
  return { treatments: nextTreatments, pricing: nextPricing };
}

export function contentKey(category: string, name: string) {
  return `${category}:${name}`;
}
