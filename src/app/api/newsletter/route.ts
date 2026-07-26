import { NextResponse } from "next/server";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { requireSameOrigin, validHttpsUrl } from "@/lib/request-security";

type NewsletterBody = { email?: string; website?: string; marketingConsent?: boolean };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const limiter = rateLimit(request, "newsletter", 8, 10 * 60 * 1000);
  if (!limiter.allowed) return rateLimitResponse(limiter.retryAfter);
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Invalid subscription request." }, { status: 415 });

  let body: NewsletterBody;
  try {
    body = await request.json() as NewsletterBody;
  } catch {
    return NextResponse.json({ error: "Invalid subscription request." }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 160) : "";
  if (!emailPattern.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!body.marketingConsent) return NextResponse.json({ error: "Please confirm that you want to receive marketing emails." }, { status: 400 });

  const endpoint = process.env.NEWSLETTER_SUBSCRIBE_ENDPOINT;
  const token = process.env.NEWSLETTER_API_KEY;
  if (endpoint) {
    if (!validHttpsUrl(endpoint)) return NextResponse.json({ error: "Newsletter service is misconfigured." }, { status: 503 });
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ email, source: "injectox-website", marketingConsent: true, consentedAt: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ error: "Subscription could not be saved. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
