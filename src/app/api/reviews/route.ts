import { NextResponse } from "next/server";
import { sendReviewNotification } from "@/lib/emails";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { requireSameOrigin } from "@/lib/request-security";
import { getReviews, saveReviews } from "@/lib/site-store";

export async function POST(request: Request) {
  try {
    const originError = requireSameOrigin(request);
    if (originError) return originError;
    const limiter = rateLimit(request, "reviews", 5, 15 * 60 * 1000);
    if (!limiter.allowed) return rateLimitResponse(limiter.retryAfter);
    if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Invalid review request." }, { status: 415 });
    const body = await request.json() as { name?: string; treatment?: string; review?: string; website?: string; consent?: boolean };
    if (body.website) return NextResponse.json({ success: true });
    const name = body.name?.trim().slice(0, 100) ?? "";
    const treatment = body.treatment?.trim().slice(0, 100) ?? "";
    const review = body.review?.trim().slice(0, 1500) ?? "";
    if (!name || !treatment || review.length < 10 || review.length > 1500 || !body.consent) return NextResponse.json({ error: "Please complete the review and publishing consent." }, { status: 400 });
    const submission = { id: crypto.randomUUID(), name, treatment, review, rating: 5, consent: true, status: "pending" as const, createdAt: new Date().toISOString() };
    const reviews = await getReviews();
    await saveReviews([submission, ...reviews].slice(0, 500));
    try {
      const result = await sendReviewNotification({ name, treatment, review });
      if (!result.configured) return NextResponse.json({ success: true, notice: "Review received and queued for moderation." });
    } catch {
      return NextResponse.json({ success: true, notice: "Review received and queued for moderation. Email notification is temporarily unavailable." });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Your review could not be sent. Please try again." }, { status: 400 });
  }
}
