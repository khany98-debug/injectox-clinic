import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Play } from "lucide-react";
import { GalleryGrid } from "@/components/gallery-grid";
import { Marquee, Reveal } from "@/components/motion";
import { HeroFilm } from "@/components/hero-film";
import { BookingSteps, Button, ConcernGrid, FAQList, FinalCTA, ReviewsStrip, SectionIntro, SocialFollow, StatsSection, TreatmentsGrid, TrustPanel } from "@/components/ui";
import { booking } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <HeroFilm />
        <div className="hero-wash" />
        <div className="hero-grain" />
        <div className="hero-copy">
          <Reveal><span className="eyebrow">Manchester · Salford · Bolton</span><h1>Refined aesthetics.<br /><em>Entirely yours.</em></h1><p>Lips, skin, laser and facial harmony—planned with honesty, precision and an eye for what already makes you beautiful.</p><div className="button-row"><Button href={booking.consultation}>Book consultation</Button><Button href="/treatments" variant="line">Explore treatments</Button></div></Reveal>
        </div>
        <span className="hero-film-note">A treatment-room film by Injectox</span>
        <div className="hero-side-note"><span>By Fatima Khan</span><i /><span>Aesthetic practitioner</span></div>
        <Link className="scroll-cue" href="#discover"><span>Discover</span><ArrowDown /></Link>
      </section>

      <Marquee items={["18+ treatments", "Consultation-led care", "Natural-looking results", "Transparent pricing", "Salford clinic"]} />

      <section id="discover" className="section shell concern-section">
        <div className="split-heading"><SectionIntro eyebrow="Start with what you see" title={<>Not sure what to book?<br /><em>Begin with your concern.</em></>} copy="Find the route that fits how you want to feel—not just a treatment name." /><span className="section-number">01 / 08</span></div>
        <ConcernGrid />
      </section>

      <section className="signature-section">
        <div className="signature-image"><Image src="/images/social/c7fad21909e20ae0.jpg" alt="Injectox Clinic lip enhancement result" fill sizes="(max-width: 800px) 100vw, 50vw" /><div className="signature-seal"><span>THE</span><b>SIGNATURE</b><span>INJECTOX</span></div></div>
        <Reveal className="signature-copy"><span className="eyebrow">The Injectox signature</span><h2>Shape over size.<br /><em>Harmony over hype.</em></h2><p>Beautiful lips do not begin with a trend. They begin with your face. Fatima’s approach considers proportion, profile and expression—then builds only what belongs.</p><blockquote>“Enhance, don’t change.”</blockquote><Button href="/treatments/russian-lip-filler" variant="line">Explore the signature</Button></Reveal>
      </section>

      <section className="section shell">
        <div className="split-heading"><SectionIntro eyebrow="Curated treatment edit" title={<>Treatments with<br /><em>intention.</em></>} copy="A focused edit of the clinic’s most requested routes." /><Link className="text-link" href="/treatments">View all treatments <ArrowRight /></Link></div>
        <TreatmentsGrid limit={6} />
      </section>

      <section className="philosophy-section">
        <Reveal className="philosophy-title"><span className="eyebrow">The results philosophy</span><h2>Never more.<br />Always <em>more you.</em></h2></Reveal>
        <div className="philosophy-cards">
          {[ ["01", "Facial harmony", "Every decision considers the whole face—not one isolated feature."], ["02", "Honest advice", "Sometimes the most expert recommendation is to wait, stage, or say no."], ["03", "Tailored plans", "Your anatomy, goals and lifestyle define the route forward."], ["04", "Polished results", "Subtle enough to feel like you. Considered enough to feel different."] ].map(([n, title, copy], i) => <Reveal className="philosophy-card" delay={i * .08} key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
        </div>
      </section>

      <StatsSection />

      <section className="section social-section">
        <div className="shell split-heading"><SectionIntro eyebrow="From the treatment room" title={<>Real work.<br /><em>Real conversations.</em></>} copy="A living edit from Injectox Clinic’s Instagram—education, client journeys and the details behind each result." /><SocialFollow /></div>
        <GalleryGrid limit={6} />
      </section>

      <section className="section shell reviews-section">
        <div className="split-heading"><SectionIntro eyebrow="Client words" title={<>The kind of trust<br /><em>you can’t manufacture.</em></>} /><Link className="text-link" href="/reviews">Read all reviews <ArrowRight /></Link></div>
        <ReviewsStrip />
      </section>

      <section className="booking-section">
        <div className="booking-image"><Image src="/images/social/0636b6d47d8d3e49.jpg" alt="Fatima Khan at Injectox Clinic" fill sizes="(max-width: 800px) 100vw, 42vw" /><a href={booking.instagram} target="_blank" rel="noreferrer"><Play fill="currentColor" /> Watch the clinic story</a></div>
        <div className="booking-copy"><SectionIntro eyebrow="Your experience" title={<>Thoughtful from hello<br /><em>to aftercare.</em></>} copy="Three simple steps. No pressure, no guesswork." /><BookingSteps /><div className="button-row"><Button href={booking.consultation}>Book consultation</Button><Button href="/contact" variant="line">Ask a question</Button></div></div>
      </section>

      <section className="section shell practitioner-section">
        <div className="practitioner-copy"><SectionIntro eyebrow="Meet your practitioner" title={<>A precise eye.<br /><em>A very human approach.</em></>} copy="Fatima Khan is the aesthetic practitioner behind Injectox Clinic. Her public work is defined by facial harmony, natural-looking outcomes and the confidence to recommend only what adds genuine value." /><TrustPanel /><Button href="/about" variant="line">Meet Fatima</Button></div>
        <div className="practitioner-image"><Image src="/images/social/d63e43704810bbe8.jpg" alt="Injectox Clinic treatment detail" fill sizes="(max-width: 800px) 100vw, 42vw" /><span>Manchester<br />Salford<br />Bolton</span></div>
      </section>

      <section className="section shell faq-section">
        <div><SectionIntro eyebrow="Before you book" title={<>Questions,<br /><em>answered honestly.</em></>} /><Button href="/faq" variant="line">View all FAQs</Button></div><FAQList limit={5} />
      </section>

      <FinalCTA />
    </>
  );
}
