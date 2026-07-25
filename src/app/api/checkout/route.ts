import Stripe from "stripe";
import { NextResponse } from "next/server";
import { pricing } from "@/lib/content";
import { sendBookingEmails } from "@/lib/emails";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

type CheckoutBody = { service?: string; date?: string; time?: string; name?: string; email?: string; phone?: string; notes?: string };

const services = pricing.flatMap((group) => group.items.map((item) => ({ ...item, category: group.category })));
const safe = (value: unknown, limit = 240) => typeof value === "string" ? value.trim().slice(0, limit) : "";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidAppointmentDate(value: string) {
  const selected = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(selected.getTime())) return false;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const max = new Date(today);
  max.setUTCDate(max.getUTCDate() + 120);
  return selected > today && selected <= max && selected.getUTCDay() !== 0;
}

export async function POST(request: Request) {
  try {
    const limiter = rateLimit(request, "checkout", 12, 10 * 60 * 1000);
    if (!limiter.allowed) return rateLimitResponse(limiter.retryAfter);
    if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Invalid booking request." }, { status: 415 });
    const body = await request.json() as CheckoutBody;
    const serviceName = safe(body.service, 120);
    const service = services.find((item) => item.name === serviceName);
    const date = safe(body.date, 10);
    const time = safe(body.time, 5);
    const name = safe(body.name, 100);
    const email = safe(body.email, 160);
    const phone = safe(body.phone, 40);
    const notes = safe(body.notes, 500);
    if (!service || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !isValidAppointmentDate(date) || !/^\d{2}:\d{2}$/.test(time) || !name || !emailPattern.test(email) || phone.length < 7) return NextResponse.json({ error: "Please review your treatment, appointment and contact details." }, { status: 400 });

    const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? new URL(request.url).origin;
    const reference = `IC-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    if (service.price === 0) {
      const emailResult = await sendBookingEmails({ reference, clientName: name, clientEmail: email, clientPhone: phone, treatment: service.name, date, time, duration: service.duration, notes, siteUrl: origin });
      if (!emailResult.configured) return NextResponse.json({ error: "Consultation confirmation is ready but Resend is not connected. Add RESEND_API_KEY and ADMIN_NOTIFICATION_EMAIL in Vercel." }, { status: 503 });
      const success = new URL("/book/success", origin);
      success.searchParams.set("reference", reference);
      success.searchParams.set("service", service.name);
      success.searchParams.set("date", date);
      success.searchParams.set("time", time);
      success.searchParams.set("duration", service.duration);
      return NextResponse.json({ url: success.toString(), free: true });
    }

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return NextResponse.json({ error: "Stripe test mode is ready but not connected. Add STRIPE_SECRET_KEY in Vercel to enable checkout." }, { status: 503 });
    const stripe = new Stripe(secret);
    const depositPence = Math.min(service.price, Number(process.env.BOOKING_DEPOSIT_GBP ?? 20)) * 100;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [{ quantity: 1, price_data: { currency: "gbp", unit_amount: depositPence, product_data: { name: `Booking deposit · ${service.name}`, description: `${date} at ${time} · Injectox Clinic, Salford` } } }],
      success_url: `${origin}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book?cancelled=1&service=${encodeURIComponent(service.name)}`,
      metadata: { reference, clientName: name, clientEmail: email, clientPhone: phone, treatment: service.name, date, time, duration: service.duration, notes: notes.slice(0, 480) },
      payment_intent_data: { description: `${service.name} booking deposit`, metadata: { reference, treatment: service.name, date, time } },
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "We could not start Stripe Checkout. Please try again or contact the clinic." }, { status: 400 });
  }
}
