import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, Camera, Check, Clock3, Droplets, Focus, Heart, ScanFace, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { booking, clinic, concerns, faqs, formatPrice, pricing, resultFilms, reviews, treatments, type Treatment } from "@/lib/content";
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

export function PageHero({ eyebrow, title, copy, index = "01", compact = false }: { eyebrow: string; title: React.ReactNode; copy: string; index?: string; compact?: boolean }) {
  return (
    <section className={`page-hero shell ${compact ? "page-hero-compact" : ""}`}>
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
          <Image src={treatment.image} alt={treatment.name} fill loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 760px) 86vw, 30vw" />
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
  const concernIcons = {
    "thin-lips": Heart,
    "facial-imbalance": ScanFace,
    "fine-lines": Clock3,
    "dull-skin": Droplets,
    "acne-pigmentation-texture": Focus,
    "unwanted-hair": Zap,
  } as const;
  return (
    <div className="concern-grid">
      {items.map((concern) => {
        const Icon = concernIcons[concern.slug];
        return (
          <Link href={`/concerns/${concern.slug}`} className="concern-card" key={concern.slug}>
            <span className="concern-card-kicker"><Icon aria-hidden="true" /><small>{concern.number}</small></span>
            <div><h3>{concern.title}</h3><p>{concern.short}</p></div><ArrowDownRight aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="stats-section">
      <div className="shell stats-grid">
        <Reveal className="stats-heading"><span className="eyebrow">Proof, not promises</span><h2>Experience you<br /><em>can feel.</em></h2><p>Experience across Fatima’s complete client history and verified feedback collected across the clinic’s booking platforms.</p></Reveal>
        <div className="stat"><strong><CountUp value={clinic.treatmentsCompleted} suffix="+" /></strong><span>Treatments performed</span></div>
        <div className="stat"><strong><CountUp value={clinic.verifiedReviews} suffix="+" /></strong><span>Verified reviews</span></div>
        <div className="stat"><strong>{clinic.rating}</strong><span>Average rating</span></div>
      </div>
    </section>
  );
}

export function ReviewsStrip({ all = false, mobileLoop = false }: { all?: boolean; mobileLoop?: boolean }) {
  const baseCards = all ? reviews : reviews.slice(0, 4);
  return (
    <div className={mobileLoop ? "mobile-carousel-viewport reviews-carousel-viewport" : undefined}>
      <div className={`reviews-grid ${mobileLoop ? "mobile-review-carousel" : ""}`}>
        {baseCards.map((review, i) => (
          <Reveal className={`review-card ${i % baseCards.length === 1 ? "featured" : ""}`} delay={(i % 3) * 0.08} key={`${review.name}-${i}`}>
            <div className="review-stars">★★★★★</div>
            <blockquote>“{review.quote}”</blockquote>
            <div><b>{review.name}</b><span>{review.treatment} · {review.date}</span></div>
          </Reveal>
        ))}
        {mobileLoop && baseCards.map((review, i) => (
          <Reveal className={`review-card mobile-loop-copy ${i % baseCards.length === 1 ? "featured" : ""}`} delay={0} key={`${review.name}-loop-${i}`}>
            <div className="review-stars">★★★★★</div>
            <blockquote>“{review.quote}”</blockquote>
            <div><b>{review.name}</b><span>{review.treatment} · {review.date}</span></div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function ResultFilmPanel() {
  return (
    <section className="result-film-section shell">
      <div className="result-film-copy">
        <span className="eyebrow">Inside Injectox</span>
        <h2>Treatment moments,<br /><em>on loop.</em></h2>
        <p>Short clinic films add movement without pulling visitors away from the booking journey.</p>
        <Link className="text-link" href={booking.instagram} target="_blank" rel="noreferrer">View Instagram <ArrowRight /></Link>
      </div>
      <div className="result-film-grid">
        {resultFilms.map((film, index) => (
          <div className="result-film-card" key={film.src}>
            <video src={film.src} poster={film.poster} autoPlay muted loop playsInline preload={index === 0 ? "metadata" : "none"} />
            <span><small>{String(index + 1).padStart(2, "0")}</small>{film.label}</span>
          </div>
        ))}
      </div>
    </section>
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
        <section className="price-group" id={({ 1: "filler", 3: "skin", 5: "laser", 6: "packages" } as Record<number, string>)[groupIndex]} key={group.category}>
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
