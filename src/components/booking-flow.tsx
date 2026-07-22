"use client";

import { CalendarDays, Check, ChevronLeft, Clock3, LoaderCircle, LockKeyhole, Sparkles } from "lucide-react";
import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { bookingImageFor, formatPrice, pricing, shared } from "@/lib/content";
import { EditableText } from "@/components/dev/editable-text";

type BookingService = {
  id: string;
  category: string;
  name: string;
  price: number;
  duration: string;
  image: string;
};

const services: BookingService[] = pricing.flatMap((group, groupIndex) =>
  group.items.map((item, itemIndex) => ({
    ...item,
    category: group.category,
    id: `${groupIndex}-${itemIndex}`,
    image: bookingImageFor(item.name),
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
  const bf = shared.bookingFlowCopy;
  const requestedService = initialService ? (serviceAliases[initialService] ?? initialService) : undefined;
  const initial = services.find((service) => service.name.toLowerCase() === requestedService?.toLowerCase());
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState(initial?.category ?? pricing[0].category);
  const [serviceId, setServiceId] = useState(initial?.id ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [details, setDetails] = useState({ name: "", email: "", phone: "", notes: "", consent: false });
  const dates = useMemo(() => nextDates(), []);
  const selected = services.find((service) => service.id === serviceId);
  const visibleServices = services.filter((service) => service.category === category);

  const canContinue = [Boolean(selected), Boolean(date && time), Boolean(details.name && details.email && details.phone && details.consent), true][step];

  function continueFlow() {
    if (canContinue) setStep((current) => Math.min(current + 1, 3));
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !date || !time || !canContinue) return;
    setSubmitting(true);
    setCheckoutError("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ service: selected.name, date, time, name: details.name, email: details.email, phone: details.phone, notes: details.notes }) });
      const payload = await response.json() as { url?: string; error?: string };
      if (!response.ok || !payload.url) throw new Error(payload.error || "Checkout could not be started.");
      window.location.assign(payload.url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Checkout could not be started.");
      setSubmitting(false);
    }
  }

  return (
    <form className="booking-builder" onSubmit={submitBooking}>
      <div className="booking-builder-top">
        <div>
          <span className="booking-native-badge"><Sparkles size={13} /> On-site booking</span>
          <h2><EditableText as="span" path="shared.bookingFlowCopy.introTitle" value={bf.introTitle} /></h2>
          <p><EditableText path="shared.bookingFlowCopy.introCopy" value={bf.introCopy} /></p>
        </div>
          <p className="booking-demo-note"><LockKeyhole size={14} /> Secure booking · Stripe protected checkout</p>
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
              <span className="eyebrow"><EditableText path="shared.bookingFlowCopy.step1Eyebrow" value={bf.step1Eyebrow} /></span>
              <h3><EditableText as="span" path="shared.bookingFlowCopy.step1Title" value={bf.step1Title} /></h3>
              <div className="booking-categories" aria-label="Treatment categories">
                {pricing.map((group) => (
                  <button className={category === group.category ? "is-active" : ""} type="button" onClick={() => setCategory(group.category)} key={group.category}>{group.category}</button>
                ))}
              </div>
              <div className="booking-service-list">
                {visibleServices.map((service) => (
                  <button className={service.id === serviceId ? "booking-service is-selected" : "booking-service"} type="button" onClick={() => setServiceId(service.id)} aria-pressed={service.id === serviceId} key={service.id}>
                    <span className="booking-service-image"><Image src={service.image} alt="" fill sizes="72px" /></span>
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
              <span className="eyebrow"><EditableText path="shared.bookingFlowCopy.step2Eyebrow" value={bf.step2Eyebrow} /></span>
              <h3><EditableText as="span" path="shared.bookingFlowCopy.step2Title" value={bf.step2Title} /></h3>
              <p className="booking-panel-copy"><EditableText path="shared.bookingFlowCopy.step2Copy" value={bf.step2Copy} /></p>
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
              <span className="eyebrow"><EditableText path="shared.bookingFlowCopy.step3Eyebrow" value={bf.step3Eyebrow} /></span>
              <h3><EditableText as="span" path="shared.bookingFlowCopy.step3Title" value={bf.step3Title} /></h3>
              <p className="booking-panel-copy"><EditableText path="shared.bookingFlowCopy.step3Copy" value={bf.step3Copy} /></p>
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
              <span className="eyebrow"><EditableText path="shared.bookingFlowCopy.step4Eyebrow" value={bf.step4Eyebrow} /></span>
              <h3><EditableText as="span" path="shared.bookingFlowCopy.step4Title" value={bf.step4Title} /></h3>
              <div className="booking-review">
                <div><small>Treatment</small><b>{selected.name}</b><button type="button" onClick={() => setStep(0)}>Change</button></div>
                <div><small>Preferred visit</small><b>{dateParts(date).long} at {time}</b><button type="button" onClick={() => setStep(1)}>Change</button></div>
                <div><small>Contact</small><b>{details.name}<br />{details.email}<br />{details.phone}</b><button type="button" onClick={() => setStep(2)}>Change</button></div>
                <div><small>Treatment price</small><strong>{formatPrice(selected.price)}</strong><span>{selected.price === 0 ? <EditableText path="shared.bookingFlowCopy.freeConsultNote" value={bf.freeConsultNote} /> : <EditableText path="shared.bookingFlowCopy.depositNote" value={bf.depositNote} />}</span></div>
              </div>
              <p className="booking-panel-copy"><EditableText path="shared.bookingFlowCopy.consentCopy" value={bf.consentCopy} /></p>
            </div>
          )}

          {checkoutError && <p className="booking-checkout-error" role="alert">{checkoutError}</p>}
          <div className="booking-actions">
            {step > 0 && <button className="booking-back" type="button" onClick={() => setStep((current) => current - 1)}><ChevronLeft size={16} /> Back</button>}
            {step < 3 ? <button className="button button-dark" type="button" onClick={continueFlow} disabled={!canContinue}>Continue</button> : <button className="button button-dark" type="submit" disabled={submitting}>{submitting ? <><LoaderCircle className="booking-spinner" size={15} /> Opening Stripe…</> : selected?.price === 0 ? "Confirm consultation" : "Pay deposit securely"}</button>}
          </div>
        </div>

        <aside className="booking-summary">
          <span className="eyebrow"><EditableText path="shared.bookingFlowCopy.summaryEyebrow" value={bf.summaryEyebrow} /></span>
          {selected ? <div className="booking-summary-image"><Image src={selected.image} alt={selected.name} fill sizes="290px" /></div> : <div className="booking-summary-mark">I</div>}
          {selected ? <><h3>{selected.name}</h3><p>{selected.category}</p><dl><div><dt><Clock3 size={13} /> Duration</dt><dd>{selected.duration}</dd></div><div><dt>From</dt><dd>{formatPrice(selected.price)}</dd></div>{date && <div><dt><CalendarDays size={13} /> Preferred date</dt><dd>{dateParts(date).long}</dd></div>}{time && <div><dt>Preferred time</dt><dd>{time}</dd></div>}</dl></> : <><h3><EditableText as="span" path="shared.bookingFlowCopy.summaryEmptyTitle" value={bf.summaryEmptyTitle} /></h3><p><EditableText path="shared.bookingFlowCopy.summaryEmptyCopy" value={bf.summaryEmptyCopy} /></p></>}
          <div className="booking-summary-trust"><LockKeyhole size={15} /><span><b><EditableText path="shared.bookingFlowCopy.secureTitle" value={bf.secureTitle} /></b><small><EditableText path="shared.bookingFlowCopy.secureCopy" value={bf.secureCopy} /></small></span></div>
        </aside>
      </div>
    </form>
  );
}
