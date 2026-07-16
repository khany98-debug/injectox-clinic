import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { CalendarPlus, Check, MapPin } from "lucide-react";
import { clinic } from "@/lib/content";

export const metadata: Metadata = { title: "Booking Confirmed", robots: { index: false, follow: false } };

export default async function BookingSuccessPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const sessionId = Array.isArray(query.session_id) ? query.session_id[0] : query.session_id;
  let values = { reference: String(query.reference ?? ""), service: String(query.service ?? "Your appointment"), date: String(query.date ?? ""), time: String(query.time ?? ""), duration: String(query.duration ?? "45 mins") };
  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      const session = await new Stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.retrieve(sessionId);
      values = { reference: session.metadata?.reference ?? `IC-${session.id.slice(-8).toUpperCase()}`, service: session.metadata?.treatment ?? "Your appointment", date: session.metadata?.date ?? "", time: session.metadata?.time ?? "", duration: session.metadata?.duration ?? "45 mins" };
    } catch { /* The branded confirmation still renders without exposing payment errors. */ }
  }
  const calendar = `/api/calendar?${new URLSearchParams({ treatment: values.service, date: values.date, time: values.time, duration: values.duration, reference: values.reference })}`;
  return <section className="booking-success"><div className="booking-success-card"><span className="booking-success-mark"><Check /></span><span className="eyebrow">Booking confirmed</span><h1>You’re in the diary.<br /><em>We’ll see you soon.</em></h1><p>Your confirmation email is on its way with your appointment details, clinic address and preparation notes.</p><div className="booking-success-details"><div><small>Treatment</small><b>{values.service}</b></div><div><small>Appointment</small><b>{values.date || "Confirmed by the clinic"}{values.time ? ` · ${values.time}` : ""}</b></div><div><small>Reference</small><b>{values.reference || "Shown in your email"}</b></div><div><small>Clinic</small><b><MapPin size={14} /> {clinic.location}</b></div></div><div className="button-row"><a className="button button-dark" href={calendar}><CalendarPlus size={15} /> Add to calendar</a><Link className="button button-line" href="/">Return home</Link></div></div></section>;
}
