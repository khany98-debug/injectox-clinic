import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendBookingEmails } from "@/lib/emails";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secret || !webhookSecret || !signature) return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 503 });
  try {
    const stripe = new Stripe(secret);
    const payload = await request.text();
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const metadata = session.metadata ?? {};
      if (metadata.clientEmail && metadata.clientName && metadata.treatment && metadata.date && metadata.time) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://injectox-clinic.vercel.app";
        await sendBookingEmails({
          reference: metadata.reference ?? `IC-${session.id.slice(-8).toUpperCase()}`,
          clientName: metadata.clientName,
          clientEmail: metadata.clientEmail,
          clientPhone: metadata.clientPhone ?? "Not supplied",
          treatment: metadata.treatment,
          date: metadata.date,
          time: metadata.time,
          duration: metadata.duration ?? "Appointment",
          notes: metadata.notes,
          amountPaid: session.amount_total ? `£${(session.amount_total / 100).toFixed(2)}` : undefined,
          siteUrl,
        });
      }
    }
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Invalid Stripe webhook signature." }, { status: 400 });
  }
}
