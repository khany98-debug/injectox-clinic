import "server-only";
import { Resend } from "resend";
import { clinic } from "@/lib/content";

export type BookingEmailData = {
  reference: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  treatment: string;
  date: string;
  time: string;
  duration: string;
  notes?: string;
  amountPaid?: string;
  siteUrl: string;
};

const escapeHtml = (value = "") => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character] ?? character);

function dateLabel(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function calendarUrl(data: BookingEmailData) {
  const query = new URLSearchParams({ treatment: data.treatment, date: data.date, time: data.time, duration: data.duration, reference: data.reference });
  return `${data.siteUrl}/api/calendar?${query}`;
}

function shell(content: string, preheader: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Injectox Clinic</title></head><body style="margin:0;background:#f2f0ea;color:#292a26;font-family:Arial,sans-serif"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f0ea"><tr><td align="center" style="padding:32px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#fbfaf6;border:1px solid #d9d7ce"><tr><td style="padding:28px 34px;background:#292a26;color:#fbfaf6"><table role="presentation" width="100%"><tr><td><span style="display:inline-block;width:34px;height:34px;line-height:34px;text-align:center;border:1px solid #fbfaf6;border-radius:50%;font-family:Georgia,serif;font-size:20px;font-style:italic">I</span><b style="margin-left:12px;font-size:12px;letter-spacing:3px">INJECTOX</b></td><td align="right" style="font-size:9px;letter-spacing:1.8px;color:#c9c8c0">MANCHESTER · SALFORD · BOLTON</td></tr></table></td></tr><tr><td style="padding:42px 34px">${content}</td></tr><tr><td style="padding:24px 34px;border-top:1px solid #d9d7ce;color:#7e8178;font-size:10px;line-height:1.7">${escapeHtml(clinic.location)}<br>Injectox Clinic · Consultation-led aesthetics<br><a href="https://www.instagram.com/injectoxclinic/" style="color:#68675d">@injectoxclinic</a></td></tr></table></td></tr></table></body></html>`;
}

function detailTable(data: BookingEmailData) {
  const rows = [["Treatment", data.treatment], ["Date", dateLabel(data.date)], ["Time", data.time], ["Duration", data.duration], ...(data.amountPaid ? [["Deposit paid", data.amountPaid]] : []), ["Reference", data.reference]];
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;border-top:1px solid #d9d7ce">${rows.map(([label, value]) => `<tr><td style="padding:14px 0;border-bottom:1px solid #d9d7ce;color:#7e8178;font-size:10px;text-transform:uppercase;letter-spacing:1.2px">${escapeHtml(label)}</td><td align="right" style="padding:14px 0;border-bottom:1px solid #d9d7ce;font-size:12px;font-weight:600">${escapeHtml(value)}</td></tr>`).join("")}</table>`;
}

function customerHtml(data: BookingEmailData) {
  return shell(`<p style="margin:0 0 8px;color:#9b766a;font-size:10px;text-transform:uppercase;letter-spacing:2px">Appointment confirmed</p><h1 style="margin:0;font-family:Georgia,serif;font-size:42px;font-weight:400;line-height:1.05">Your Injectox visit,<br><em style="color:#9b766a">beautifully organised.</em></h1><p style="margin:22px 0 0;color:#68675d;font-size:13px;line-height:1.8">Hi ${escapeHtml(data.clientName.split(" ")[0])}, thank you for booking with Fatima. Your appointment details are below.</p>${detailTable(data)}<a href="${calendarUrl(data)}" style="display:inline-block;padding:15px 22px;background:#292a26;color:#fbfaf6;text-decoration:none;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Add to calendar →</a><div style="margin-top:30px;padding:20px;background:#e7e7df"><b style="font-family:Georgia,serif;font-size:18px">Before your visit</b><p style="margin:8px 0 0;color:#68675d;font-size:11px;line-height:1.7">Treatment remains subject to consultation and suitability. Please arrive on time and contact the clinic as soon as possible if you need to make a change.</p></div>`, `Your ${data.treatment} appointment with Injectox Clinic is confirmed.`);
}

function clinicHtml(data: BookingEmailData) {
  return shell(`<p style="margin:0 0 8px;color:#9b766a;font-size:10px;text-transform:uppercase;letter-spacing:2px">New paid booking</p><h1 style="margin:0;font-family:Georgia,serif;font-size:42px;font-weight:400;line-height:1.05">A new client is<br><em style="color:#9b766a">in the diary.</em></h1>${detailTable(data)}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:25px"><tr><td style="padding:18px;background:#e7e7df"><b style="font-family:Georgia,serif;font-size:20px">${escapeHtml(data.clientName)}</b><p style="margin:8px 0 0;font-size:11px;line-height:1.7"><a href="mailto:${escapeHtml(data.clientEmail)}" style="color:#292a26">${escapeHtml(data.clientEmail)}</a><br><a href="tel:${escapeHtml(data.clientPhone)}" style="color:#292a26">${escapeHtml(data.clientPhone)}</a></p></td></tr>${data.notes ? `<tr><td style="padding:18px;border:1px solid #d9d7ce;border-top:0"><small style="color:#7e8178;text-transform:uppercase;letter-spacing:1.2px">Client notes</small><p style="margin:8px 0 0;font-size:12px;line-height:1.7">${escapeHtml(data.notes)}</p></td></tr>` : ""}</table><p style="margin:26px 0 0;color:#7e8178;font-size:10px">This notification was generated after Stripe confirmed payment.</p>`, `New Injectox booking: ${data.treatment} with ${data.clientName}.`);
}

export async function sendBookingEmails(data: BookingEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const clinicEmail = process.env.CLINIC_NOTIFICATION_EMAIL;
  if (!apiKey || !clinicEmail) return { configured: false };
  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? "Injectox Clinic <bookings@injectoxclinic.co.uk>";
  const customer = await resend.emails.send({ from, to: data.clientEmail, subject: `Your Injectox appointment · ${data.treatment}`, html: customerHtml(data) }, { idempotencyKey: `booking-${data.reference}-customer` });
  if (customer.error) throw new Error(customer.error.message);
  const clinicMessage = await resend.emails.send({ from, to: clinicEmail, replyTo: data.clientEmail, subject: `New booking · ${data.treatment} · ${dateLabel(data.date)} ${data.time}`, html: clinicHtml(data) }, { idempotencyKey: `booking-${data.reference}-clinic` });
  if (clinicMessage.error) throw new Error(clinicMessage.error.message);
  return { configured: true, customer, clinic: clinicMessage };
}

export async function sendReviewNotification(data: { name: string; treatment: string; review: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const clinicEmail = process.env.CLINIC_NOTIFICATION_EMAIL;
  if (!apiKey || !clinicEmail) return { configured: false };
  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? "Injectox Clinic <bookings@injectoxclinic.co.uk>";
  const message = await resend.emails.send({ from, to: clinicEmail, subject: `New review awaiting approval · ${data.name}`, html: shell(`<p style="color:#9b766a;font-size:10px;text-transform:uppercase;letter-spacing:2px">Review moderation</p><h1 style="font-family:Georgia,serif;font-size:38px;font-weight:400">A client shared<br><em>their experience.</em></h1><p style="font-family:Georgia,serif;font-size:24px;line-height:1.4">“${escapeHtml(data.review)}”</p><p style="color:#68675d;font-size:12px">${escapeHtml(data.name)} · ${escapeHtml(data.treatment)}</p>`, `New review from ${data.name}`) });
  if (message.error) throw new Error(message.error.message);
  return { configured: true };
}
