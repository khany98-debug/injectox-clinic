import { NextResponse } from "next/server";
import { sendReviewNotification } from "@/lib/emails";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; treatment?: string; review?: string; consent?: boolean };
    const name = body.name?.trim().slice(0, 100) ?? "";
    const treatment = body.treatment?.trim().slice(0, 100) ?? "";
    const review = body.review?.trim().slice(0, 1500) ?? "";
    if (!name || !treatment || review.length < 10 || !body.consent) return NextResponse.json({ error: "Please complete the review and publishing consent." }, { status: 400 });
    const result = await sendReviewNotification({ name, treatment, review });
    if (!result.configured) return NextResponse.json({ error: "Review email is ready but Resend is not configured yet." }, { status: 503 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Your review could not be sent. Please try again." }, { status: 400 });
  }
}
