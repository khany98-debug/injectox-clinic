import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY to enable test deposits." }, { status: 503 });
  try {
    const body = await request.json() as { amount?: number; description?: string; email?: string };
    const amount = Math.max(100, Math.round(Number(body.amount ?? 20) * 100));
    const stripe = new Stripe(secret);
    const intent = await stripe.paymentIntents.create({ amount, currency: "gbp", description: body.description ?? "Injectox Clinic booking deposit", receipt_email: body.email, automatic_payment_methods: { enabled: true } });
    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch {
    return NextResponse.json({ error: "Unable to create a payment session." }, { status: 400 });
  }
}
