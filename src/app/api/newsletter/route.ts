import { NextResponse } from "next/server";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { requireSameOrigin, validHttpsUrl } from "@/lib/request-security";

type NewsletterBody = { firstName?: string; email?: string; website?: string; marketingConsent?: boolean };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const limiter = await rateLimit(request, "newsletter", 8, 10 * 60 * 1000);
  if (Number(request.headers.get("content-length") || 0) > 32_000) return NextResponse.json({ error: "Invalid subscription request." }, { status: 413 });
  if (!limiter.allowed) return rateLimitResponse(limiter.retryAfter);
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Invalid subscription request." }, { status: 415 });

  let body: NewsletterBody;
  try {
    body = await request.json() as NewsletterBody;
  } catch {
    return NextResponse.json({ error: "Invalid subscription request." }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true });
  const firstName = typeof body.firstName === "string" ? body.firstName.trim().replace(/\s+/g, " ").slice(0, 60) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 160) : "";
  if (!/^[\p{L}][\p{L}\s'’-]{0,59}$/u.test(firstName)) return NextResponse.json({ error: "Please enter your first name." }, { status: 400 });
  if (!emailPattern.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!body.marketingConsent) return NextResponse.json({ error: "Please confirm that you want to receive marketing emails." }, { status: 400 });

  const brevoKey = process.env.BREVO_API_KEY;
  const brevoListId = Number.parseInt(process.env.BREVO_LIST_ID ?? "", 10);
  if (brevoKey && Number.isInteger(brevoListId) && brevoListId > 0) {
    try {
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": brevoKey },
        body: JSON.stringify({ email, listIds: [brevoListId], updateEnabled: true, attributes: { FIRSTNAME: firstName } }),
        cache: "no-store",
      });
      if (!response.ok) return NextResponse.json({ error: "Subscription could not be saved. Please try again shortly." }, { status: 502 });
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Subscription could not be saved. Please try again shortly." }, { status: 502 });
    }
  }

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
      body: JSON.stringify({ email, firstName, source: "injectox-website", marketingConsent: true, consentedAt: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ error: "Subscription could not be saved. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
