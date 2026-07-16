import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/motion";
import { HeroFilm } from "@/components/hero-film";
import { BookingSteps, Button, ConcernGrid, FAQList, FinalCTA, ResultFilmPanel, ReviewsStrip, SectionIntro, SocialFollow, StatsSection, TreatmentsGrid, TrustPanel } from "@/components/ui";
import { booking } from "@/lib/content";

const reasons = [
  {
    icon: HeartHandshake,
    title: "Honest consultation",
    copy: "Every plan starts with what will suit your face, not what is trending online.",
  },
  {
    icon: Sparkles,
    title: "Natural-looking finish",
    copy: "Lips, skin and facial balancing are approached with polish, restraint and proportion.",
  },
  {
    icon: ShieldCheck,
    title: "Clear treatment info",
    copy: "Prices, booking notes and suitability guidance stay visible before you commit.",
  },
];

export default function Home() {
  return (
    <>
      <section className="home-hero reference-hero">
        <HeroFilm />
        <div className="hero-wash" />
        <div className="hero-grain" />
        <div className="hero-copy reference-hero-copy">
          <Reveal>
            <span className="eyebrow hero-location"><span>Aesthetics clinic in Manchester,</span><span>Salford &amp; Bolton</span></span>
            <h1>Injectox Clinic</h1>
            <p>
              Refined lip filler, facial balancing, medical-grade skin and laser hair removal with a calm,
              consultation-led approach.
            </p>
            <div className="button-row">
              <Button href={booking.consultation}>Book consultation</Button>
              <Button href="/treatments" variant="line">View treatments</Button>
            </div>
          </Reveal>
        </div>
        <div className="reference-hero-panel">
          <span>Known for</span>
          <b>Russian lips, skin glow plans and balanced, natural-looking enhancement.</b>
          <Link href="/pricing">View pricing <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="reference-trust shell" aria-label="Clinic trust points">
        {["18+ treatments only", "Free consultation option", "Transparent pricing", "Salford clinic"].map((item) => (
          <div key={item}><CheckCircle2 size={17} /><span>{item}</span></div>
        ))}
      </section>

      <section className="section shell why-section">
        <div className="split-heading">
          <SectionIntro
            eyebrow="Why Injectox"
            title={<>Beauty that feels<br /><em>considered.</em></>}
            copy="A calm, high-trust clinic experience for clients who want polished results, clear advice and a treatment plan that feels personal."
          />
          <Link className="text-link" href="/about">Meet Fatima <ArrowRight /></Link>
        </div>
        <div className="reason-grid">
          {reasons.map(({ icon: Icon, title, copy }, index) => (
            <Reveal className="reason-card" delay={index * 0.06} key={title}>
              <Icon size={22} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="discover" className="section shell concern-section reference-concerns">
        <div className="split-heading">
          <SectionIntro
            eyebrow="What brings you here?"
            title={<>Start with your<br /><em>concern.</em></>}
            copy="Choose what you want to improve and the site guides you to the most relevant treatment options."
          />
          <span className="section-number">01 / 07</span>
        </div>
        <ConcernGrid />
      </section>

      <section className="section shell reference-services">
        <div className="split-heading">
          <SectionIntro
            eyebrow="Signature treatments"
            title={<>Lips, skin, laser<br /><em>and balance.</em></>}
            copy="A clear treatment edit that lets visitors understand what Injectox offers before they book."
          />
          <Link className="text-link" href="/treatments">All treatments <ArrowRight /></Link>
        </div>
        <TreatmentsGrid limit={6} />
      </section>

      <section className="experience-section">
        <div className="experience-copy">
          <SectionIntro
            eyebrow="The Injectox experience"
            title={<>Precise work in a<br /><em>private clinic setting.</em></>}
            copy="From consultation to aftercare, the experience is designed to feel clear, warm and confidence-led."
          />
          <TrustPanel />
          <Button href="/book" variant="line">Book an appointment</Button>
        </div>
        <div className="experience-media">
          <Image src="/images/social/0636b6d47d8d3e49.jpg" alt="Injectox Clinic treatment room moment" fill sizes="(max-width: 800px) 100vw, 46vw" />
        </div>
      </section>

      <StatsSection />
      <ResultFilmPanel />

      <section className="section shell pricing-preview">
        <div className="pricing-preview-copy">
          <span className="eyebrow">Treatment pricing</span>
          <h2>Clear prices before you book.</h2>
          <p>Visitors can scan key services, compare starting prices and continue straight into the built-in booking page.</p>
        </div>
        <div className="mini-pricing">
          {[
            ["Russian Lip - 0.7ml", "From £160"],
            ["Anti-Wrinkle", "From £149"],
            ["Skin Boosters", "From £119"],
            ["Laser Hair Removal", "From £25"],
          ].map(([name, price]) => (
            <Link href={`/book?service=${encodeURIComponent(name)}`} key={name}>
              <span>{name}</span>
              <b>{price}</b>
              <ArrowRight size={15} />
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/pricing">View full pricing <ArrowRight /></Link>
      </section>

      <section className="section social-section reference-social">
        <div className="shell split-heading">
          <SectionIntro
            eyebrow="Our work"
            title={<>Results that look<br /><em>polished, not overdone.</em></>}
            copy="A refined gallery of real client outcomes, treatment-room moments and professional clinic films."
          />
          <SocialFollow />
        </div>
        <GalleryGrid source="results" limit={8} mobileLoop includeFilms />
      </section>

      <section className="section shell reviews-section reference-reviews">
        <div className="split-heading">
          <SectionIntro eyebrow="Client feedback" title={<>Trust built through<br /><em>real experience.</em></>} />
          <div className="review-actions">
            <Link className="text-link" href="/reviews">Read reviews <ArrowRight /></Link>
            <Link className="text-link muted" href="/reviews#leave-review">Leave a review <ArrowRight /></Link>
          </div>
        </div>
        <ReviewsStrip mobileLoop />
      </section>

      <section className="booking-section reference-booking">
        <div className="booking-image">
          <Image src="/images/social/d63e43704810bbe8.jpg" alt="Injectox Clinic facial harmony result" fill sizes="(max-width: 800px) 100vw, 42vw" />
        </div>
        <div className="booking-copy">
          <SectionIntro
            eyebrow="Booking journey"
            title={<>Simple, clear<br /><em>and reassuring.</em></>}
            copy="A client can choose a consultation, browse treatments, select a time and submit their details without being pushed away from the site."
          />
          <BookingSteps />
          <div className="button-row">
            <Button href="/book">Book now</Button>
            <Button href="/contact" variant="line">Ask a question</Button>
          </div>
        </div>
      </section>

      <section className="section shell faq-section reference-faq">
        <div>
          <SectionIntro eyebrow="Before you book" title={<>Common<br /><em>questions.</em></>} />
          <Button href="/faq" variant="line">View all FAQs</Button>
        </div>
        <FAQList limit={5} />
      </section>

      <FinalCTA title={<>Ready to begin with<br /><em>Injectox Clinic?</em></>} />
    </>
  );
}
