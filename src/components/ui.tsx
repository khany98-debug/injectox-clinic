import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, Camera, Check, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { booking, clinic, concerns, faqs, formatPrice, pricing, reviews, treatments, type Treatment } from "@/lib/content";
import { CountUp, Reveal, TiltCard } from "@/components/motion";

export function Button({ href, children, variant = "dark", external = false }: { href: string; children: React.ReactNode; variant?: "dark" | "light" | "line"; external?: boolean }) {
  const cls = `button button-${variant}`;
  if (external) return <a className={cls} href={href} target="_blank" rel="noreferrer">{children}<ArrowRight size={16} /></a>;
  return <Link className={cls} href={href}>{children}<ArrowRight size={16} /></Link>;
}

export function SectionIntro({ eyebrow, title, copy, align = "left" }: { eyebrow: string; title: React.ReactNode; copy?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={`section-intro ${align === "center" ? "center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, copy, index = "01" }: { eyebrow: string; title: React.ReactNode; copy: string; index?: string }) {
  return (
    <section className="page-hero shell">
      <Reveal className="page-hero-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </Reveal>
      <span className="page-index">/{index}</span>
      <div className="page-hero-line" />
    </section>
  );
}

export function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  return (
    <TiltCard className="treatment-card">
      <Link href={`/treatments/${treatment.slug}`}>
        <div className="treatment-image">
          <Image src={treatment.image} alt={treatment.name} fill sizes="(max-width: 760px) 86vw, 30vw" />
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="treatment-card-meta"><span>{treatment.category}</span><span>From {formatPrice(treatment.price)}</span></div>
        <h3>{treatment.name}</h3>
        <p>{treatment.intro}</p>
        <b>Discover treatment <ArrowDownRight size={18} /></b>
      </Link>
    </TiltCard>
  );
}

export function TreatmentsGrid({ limit }: { limit?: number }) {
  const items = limit ? treatments.slice(0, limit) : treatments;
  return <div className="treatments-grid">{items.map((t, i) => <TreatmentCard treatment={t} index={i} key={t.slug} />)}</div>;
}

export function ConcernGrid({ limit }: { limit?: number }) {
  const items = limit ? concerns.slice(0, limit) : concerns;
  return (
    <div className="concern-grid">
      {items.map((concern) => (
        <Link href={`/concerns/${concern.slug}`} className="concern-card" key={concern.slug}>
          <span>{concern.number}</span><div><h3>{concern.title}</h3><p>{concern.short}</p></div><ArrowDownRight />
        </Link>
      ))}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="stats-section">
      <div className="shell stats-grid">
        <Reveal className="stats-heading"><span className="eyebrow">Proof, not promises</span><h2>Experience you<br /><em>can feel.</em></h2><p>Live figures verified from the clinic’s public Faces booking profile.</p></Reveal>
        <div className="stat"><strong><CountUp value={clinic.treatmentsCompleted} suffix="+" /></strong><span>Treatments performed</span></div>
        <div className="stat"><strong><CountUp value={clinic.verifiedReviews} /></strong><span>Verified reviews</span></div>
        <div className="stat"><strong>{clinic.rating}</strong><span>Average rating</span></div>
      </div>
    </section>
  );
}

export function ReviewsStrip({ all = false }: { all?: boolean }) {
  const cards = all ? [...reviews, ...reviews] : reviews;
  return (
    <div className="reviews-grid">
      {cards.map((review, i) => (
        <Reveal className={`review-card ${i === 1 ? "featured" : ""}`} delay={(i % 3) * 0.08} key={`${review.name}-${i}`}>
          <div className="review-stars">★★★★★</div>
          <blockquote>“{review.quote}”</blockquote>
          <div><b>{review.name}</b><span>{review.treatment} · {review.date}</span></div>
        </Reveal>
      ))}
    </div>
  );
}

export function FAQList({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="faq-list">
      {items.map((faq, i) => (
        <details key={faq.q} open={i === 0}>
          <summary><span>{String(i + 1).padStart(2, "0")}</span>{faq.q}<i>+</i></summary>
          <p>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

export function PricingTable({ compact = false }: { compact?: boolean }) {
  const groups = compact ? pricing.slice(0, 4) : pricing;
  return (
    <div className="pricing-groups">
      {groups.map((group, groupIndex) => (
        <section className="price-group" key={group.category}>
          <div className="price-title"><span>{String(groupIndex + 1).padStart(2, "0")}</span><h2>{group.category}</h2>{group.note && <p>{group.note}</p>}</div>
          <div>
            {group.items.map((item) => (
              <div className="price-row" key={`${group.category}-${item.name}`}>
                <div><h3>{item.name}</h3><span><Clock3 size={13} />{item.duration}</span></div>
                <b>{formatPrice(item.price)}</b>
                <Link href={`/book?service=${encodeURIComponent(item.name)}`} aria-label={`Book ${item.name}`}><ArrowRight /></Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function BookingSteps() {
  return (
    <div className="booking-steps">
      {[
        ["01", "Choose your route", "Book a free consultation when you’re unsure, or select a treatment directly."],
        ["02", "Plan with Fatima", "Your features, goals, timing and suitability shape the recommendation."],
        ["03", "Leave polished", "Receive tailored aftercare and a clear route for review or maintenance."],
      ].map(([n, title, copy]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></div>)}
    </div>
  );
}

export function FinalCTA({ title = <>Ready to look like you—<em>only more considered?</em></> }: { title?: React.ReactNode }) {
  return (
    <section className="final-cta">
      <div className="final-orbit" aria-hidden="true"><span /><span /><span /></div>
      <Reveal className="final-cta-copy"><span className="eyebrow">Begin your treatment plan</span><h2>{title}</h2><p>Start with a complimentary consultation in Salford.</p><div className="button-row"><Button href={booking.consultation} variant="light">Book consultation</Button><Button href="/contact" variant="line">Ask a question</Button></div></Reveal>
    </section>
  );
}

export function StickyBook() {
  return <Link className="sticky-book" href={booking.treatment}><span><Sparkles size={13} /> Book now</span><ArrowRight size={15} /></Link>;
}

export function TrustPanel() {
  return (
    <div className="trust-panel">
      {[ [ShieldCheck, "Consultation-led", "Advice before treatment"], [Sparkles, "Natural by design", "Harmony over trends"], [Check, "Transparent pricing", "Live booking prices"] ].map(([Icon, title, copy]) => {
        const C = Icon as typeof ShieldCheck;
        return <div key={String(title)}><C /><span><b>{String(title)}</b><small>{String(copy)}</small></span></div>;
      })}
    </div>
  );
}

export function SocialFollow() {
  return <a className="social-follow" href={booking.instagram} target="_blank" rel="noreferrer"><Camera /> <span>Follow the latest work</span><b>@injectoxclinic</b><ArrowRight /></a>;
}
