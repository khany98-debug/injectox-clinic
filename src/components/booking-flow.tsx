"use client";

import { CalendarDays, Check, ChevronLeft, Clock3, LockKeyhole, Sparkles } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { formatPrice, pricing } from "@/lib/content";

type BookingService = {
  id: string;
  category: string;
  name: string;
  price: number;
  duration: string;
};

const services: BookingService[] = pricing.flatMap((group, groupIndex) =>
  group.items.map((item, itemIndex) => ({
    ...item,
    category: group.category,
    id: `${groupIndex}-${itemIndex}`,
  })),
);

const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];
const steps = ["Treatment", "Preferred date", "Your details", "Review"];
const serviceAliases: Record<string, string> = {
  "Russian Lip Filler": "Russian Lip — 0.7ml",
  "Facial Balancing": "Bespoke facial balancing",
  "Anti-Wrinkle": "One area",
  "Skin Boosters": "Lumi Pro / Aqua Shine / Skin Booster",
  Microneedling: "Microneedling",
  "Advanced Facials": "The Full Works facial",
  "Laser Hair Removal": "Small area",
  "Filler Dissolving": "Filler dissolving",
};

function nextDates() {
  const dates: string[] = [];
  const cursor = new Date();
  cursor.setUTCHours(12, 0, 0, 0);
  while (dates.length < 12) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    if (cursor.getUTCDay() !== 0) dates.push(cursor.toISOString().slice(0, 10));
  }
  return dates;
}

function dateParts(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return {
    weekday: date.toLocaleDateString("en-GB", { weekday: "short", timeZone: "Europe/London" }),
    day: date.toLocaleDateString("en-GB", { day: "2-digit", timeZone: "Europe/London" }),
    month: date.toLocaleDateString("en-GB", { month: "short", timeZone: "Europe/London" }),
    long: date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/London" }),
  };
}

export function BookingFlow({ initialService }: { initialService?: string }) {
  const requestedService = initialService ? (serviceAliases[initialService] ?? initialService) : undefined;
  const initial = services.find((service) => service.name.toLowerCase() === requestedService?.toLowerCase());
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState(initial?.category ?? pricing[0].category);
  const [serviceId, setServiceId] = useState(initial?.id ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [details, setDetails] = useState({ name: "", email: "", phone: "", notes: "", consent: false });
  const dates = useMemo(() => nextDates(), []);
  const selected = services.find((service) => service.id === serviceId);
  const visibleServices = services.filter((service) => service.category === category);

  const canContinue = [Boolean(selected), Boolean(date && time), Boolean(details.name && details.email && details.phone && details.consent), true][step];

  function continueFlow() {
    if (canContinue) setStep((current) => Math.min(current + 1, 3));
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !date || !time || !canContinue) return;
    const reference = `IC-${Date.now().toString(36).slice(-6).toUpperCase()}`;
    setConfirmation(reference);
  }

  if (confirmation && selected) {
    return (
      <div className="booking-confirmation" aria-live="polite">
        <div className="booking-confirmation-mark"><Check /></div>
        <span className="eyebrow">Booking preview complete</span>
        <h2>Your request is beautifully organised.</h2>
        <p className="booking-confirmation-lead">Reference {confirmation}</p>
        <div className="booking-confirmation-details">
          <div><small>Treatment</small><b>{selected.name}</b></div>
          <div><small>Preferred time</small><b>{dateParts(date).long} · {time}</b></div>
          <div><small>Investment</small><b>{formatPrice(selected.price)}</b></div>
        </div>
        <p className="booking-demo-disclosure">This preview intentionally does not transmit personal data. Connect the clinic calendar, notifications and deposit provider before launch to turn requests into confirmed appointments.</p>
        <button className="button button-dark" type="button" onClick={() => { setConfirmation(""); setStep(0); }}>Start another booking</button>
      </div>
    );
  }

  return (
    <form className="booking-builder" onSubmit={submitBooking}>
      <div className="booking-builder-top">
        <div>
          <span className="booking-native-badge"><Sparkles size={13} /> On-site booking</span>
          <h2>Build your appointment.</h2>
          <p>Choose your treatment, preferred visit and details without leaving Injectox.</p>
        </div>
        <p className="booking-demo-note"><LockKeyhole size={14} /> Interactive preview · no personal data is sent</p>
      </div>

      <ol className="booking-progress" aria-label="Booking progress">
        {steps.map((label, index) => (
          <li className={index === step ? "is-current" : index < step ? "is-complete" : ""} key={label}>
            <button type="button" onClick={() => index < step && setStep(index)} disabled={index > step} aria-current={index === step ? "step" : undefined}>
              <span>{index < step ? <Check size={13} /> : `0${index + 1}`}</span>{label}
            </button>
          </li>
        ))}
      </ol>

      <div className="booking-builder-grid">
        <div className="booking-panel">
          {step === 0 && (
            <div>
              <span className="eyebrow">01 · Choose your route</span>
              <h3>What would you like to book?</h3>
              <div className="booking-categories" aria-label="Treatment categories">
                {pricing.map((group) => (
                  <button className={category === group.category ? "is-active" : ""} type="button" onClick={() => setCategory(group.category)} key={group.category}>{group.category}</button>
                ))}
              </div>
              <div className="booking-service-list">
                {visibleServices.map((service) => (
                  <button className={service.id === serviceId ? "booking-service is-selected" : "booking-service"} type="button" onClick={() => setServiceId(service.id)} aria-pressed={service.id === serviceId} key={service.id}>
                    <span><b>{service.name}</b><small><Clock3 size={12} /> {service.duration}</small></span>
                    <strong>{formatPrice(service.price)}</strong>
                    <i>{service.id === serviceId ? <Check size={14} /> : null}</i>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <span className="eyebrow">02 · Choose your preference</span>
              <h3>When would you like to visit?</h3>
              <p className="booking-panel-copy">Select your preferred date and time. Final availability is confirmed by the clinic.</p>
              <div className="booking-date-grid">
                {dates.map((value) => {
                  const parts = dateParts(value);
                  return <button className={date === value ? "is-selected" : ""} type="button" onClick={() => setDate(value)} aria-pressed={date === value} key={value}><small>{parts.weekday}</small><b>{parts.day}</b><span>{parts.month}</span></button>;
                })}
              </div>
              <div className="booking-time-grid" aria-label="Preferred times">
                {timeSlots.map((value) => <button className={time === value ? "is-selected" : ""} type="button" onClick={() => setTime(value)} aria-pressed={time === value} key={value}>{value}</button>)}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <span className="eyebrow">03 · Your details</span>
              <h3>Where should we confirm?</h3>
              <p className="booking-panel-copy">These fields are ready for the clinic’s secure notification and calendar connection.</p>
              <div className="booking-form-grid">
                <label><span>Full name</span><input value={details.name} onChange={(event) => setDetails({ ...details, name: event.target.value })} autoComplete="name" required /></label>
                <label><span>Mobile number</span><input value={details.phone} onChange={(event) => setDetails({ ...details, phone: event.target.value })} autoComplete="tel" inputMode="tel" required /></label>
                <label className="booking-field-wide"><span>Email address</span><input value={details.email} onChange={(event) => setDetails({ ...details, email: event.target.value })} autoComplete="email" inputMode="email" type="email" required /></label>
                <label className="booking-field-wide"><span>Anything Fatima should know? <small>Optional</small></span><textarea value={details.notes} onChange={(event) => setDetails({ ...details, notes: event.target.value })} rows={4} /></label>
                <label className="booking-consent booking-field-wide"><input checked={details.consent} onChange={(event) => setDetails({ ...details, consent: event.target.checked })} type="checkbox" required /><span>I am aged 18+ and understand that treatment is subject to consultation and suitability.</span></label>
              </div>
            </div>
          )}

          {step === 3 && selected && (
            <div>
              <span className="eyebrow">04 · Review your request</span>
              <h3>Everything, considered.</h3>
              <div className="booking-review">
                <div><small>Treatment</small><b>{selected.name}</b><button type="button" onClick={() => setStep(0)}>Change</button></div>
                <div><small>Preferred visit</small><b>{dateParts(date).long} at {time}</b><button type="button" onClick={() => setStep(1)}>Change</button></div>
                <div><small>Contact</small><b>{details.name}<br />{details.email}<br />{details.phone}</b><button type="button" onClick={() => setStep(2)}>Change</button></div>
                <div><small>Treatment price</small><strong>{formatPrice(selected.price)}</strong><span>Deposit and final confirmation are completed after suitability checks.</span></div>
              </div>
              <p className="booking-panel-copy">By continuing, you acknowledge the clinic’s booking, cancellation and privacy policies.</p>
            </div>
          )}

          <div className="booking-actions">
            {step > 0 && <button className="booking-back" type="button" onClick={() => setStep((current) => current - 1)}><ChevronLeft size={16} /> Back</button>}
            {step < 3 ? <button className="button button-dark" type="button" onClick={continueFlow} disabled={!canContinue}>Continue</button> : <button className="button button-dark" type="submit">Complete booking preview</button>}
          </div>
        </div>

        <aside className="booking-summary">
          <span className="eyebrow">Your appointment</span>
          <div className="booking-summary-mark">I</div>
          {selected ? <><h3>{selected.name}</h3><p>{selected.category}</p><dl><div><dt><Clock3 size={13} /> Duration</dt><dd>{selected.duration}</dd></div><div><dt>From</dt><dd>{formatPrice(selected.price)}</dd></div>{date && <div><dt><CalendarDays size={13} /> Preferred date</dt><dd>{dateParts(date).long}</dd></div>}{time && <div><dt>Preferred time</dt><dd>{time}</dd></div>}</dl></> : <><h3>Your plan will appear here.</h3><p>Select a treatment to begin.</p></>}
          <div className="booking-summary-trust"><LockKeyhole size={15} /><span><b>Private by design</b><small>This preview never sends or stores your details.</small></span></div>
        </aside>
      </div>
    </form>
  );
}
