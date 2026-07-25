import { NextResponse } from "next/server";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

type NewsletterBody = { email?: string; website?: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const limiter = rateLimit(request, "newsletter", 8, 10 * 60 * 1000);
  if (!limiter.allowed) return rateLimitResponse(limiter.retryAfter);
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Invalid subscription request." }, { status: 415 });

  const body = await request.json() as NewsletterBody;
  if (body.website) return NextResponse.json({ ok: true });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 160) : "";
  if (!emailPattern.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  const endpoint = process.env.NEWSLETTER_SUBSCRIBE_ENDPOINT;
  const token = process.env.NEWSLETTER_API_KEY;
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ email, source: "injectox-website" }),
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ error: "Subscription could not be saved. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
