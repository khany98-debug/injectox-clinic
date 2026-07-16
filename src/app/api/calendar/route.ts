import { clinic } from "@/lib/content";

function clean(value: string | null, limit = 160) {
  return (value ?? "").replace(/[\r\n,;]/g, " ").trim().slice(0, limit);
}

function addMinutes(time: string, minutes: number) {
  const [hours, mins] = time.split(":").map(Number);
  const total = hours * 60 + mins + minutes;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}${String(total % 60).padStart(2, "0")}00`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const treatment = clean(url.searchParams.get("treatment")) || "Injectox appointment";
  const date = clean(url.searchParams.get("date"), 10);
  const time = clean(url.searchParams.get("time"), 5);
  const reference = clean(url.searchParams.get("reference"), 40);
  const duration = Number.parseInt(clean(url.searchParams.get("duration"), 20)) || 45;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return new Response("Invalid appointment", { status: 400 });
  const day = date.replaceAll("-", "");
  const start = time.replace(":", "") + "00";
  const end = addMinutes(time, duration);
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Injectox Clinic//Booking//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "BEGIN:VEVENT", `UID:${reference || crypto.randomUUID()}@injectoxclinic.co.uk`, `DTSTART;TZID=Europe/London:${day}T${start}`, `DTEND;TZID=Europe/London:${day}T${end}`, `SUMMARY:${treatment} — Injectox Clinic`, `LOCATION:${clinic.location}`, `DESCRIPTION:Your Injectox Clinic appointment. Reference ${reference}. Treatment remains subject to consultation and suitability.`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  return new Response(ics, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="injectox-${reference || "appointment"}.ics"`, "Cache-Control": "no-store" } });
}
