import "server-only";

import { pricing, reviews as publishedReviews, treatments } from "@/lib/content";
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

export function contentStoreConfigured() {
  return Boolean(kvConfig());
}

export async function getContentOverrides(): Promise<ContentOverrides> {
  const value = await kv<string | null>(["GET", "injectox:content"]);
  if (value) {
    try {
      const parsed = JSON.parse(value) as Partial<ContentOverrides>;
      return { ...defaultOverrides, ...parsed, clinic: { ...defaultOverrides.clinic, ...parsed.clinic } };
    } catch { return defaultOverrides; }
  }
  return memory.content;
}

export async function saveContentOverrides(content: ContentOverrides) {
  memory.content = content;
  await kv(["SET", "injectox:content", JSON.stringify(content)]);
  return content;
}

export async function getReviews(): Promise<ReviewSubmission[]> {
  const value = await kv<string | null>(["GET", "injectox:reviews"]);
  if (value) {
    try { return JSON.parse(value) as ReviewSubmission[]; } catch { return []; }
  }
  return memory.reviews;
}

export async function saveReviews(reviews: ReviewSubmission[]) {
  memory.reviews = reviews;
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
