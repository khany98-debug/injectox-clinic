import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/motion";
import { HeroFilm } from "@/components/hero-film";
import { Button, ConcernGrid, FAQList, FinalCTA, ResultFilmPanel, ReviewsStrip, SectionIntro, SocialFollow, StatsSection, TreatmentsGrid, TrustPanel } from "@/components/ui";
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
            <span className="eyebrow hero-location"><span>Aesthetics clinic in</span><span>Salford, Manchester</span></span>
            <h1><span>Injectox</span><span>Clinic</span></h1>
            <p>
              Refined lip filler, facial balancing, medical-grade skin and laser hair removal with a calm,
              consultation-led approach.
            </p>
            <div className="button-row">
              <Button href={booking.treatment}>Book now</Button>
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
          />
        </div>
        <ConcernGrid />
      </section>

      <section className="section shell reference-services">
        <div className="split-heading">
          <SectionIntro
            eyebrow="Signature treatments"
            title={<>Lips, skin, laser<br /><em>and balance.</em></>}
          />
          <Link className="text-link" href="/treatments">All treatments <ArrowRight /></Link>
        </div>
        <TreatmentsGrid limit={6} />
      </section>

      <section className="section shell home-about">
        <div className="home-about-media">
          <Image src="/images/dropbox/client-labelled/consultation-fatima.jpg" alt="Fatima consulting with a client at Injectox Clinic" fill sizes="(max-width: 800px) 100vw, 44vw" />
        </div>
        <div className="home-about-copy">
          <SectionIntro eyebrow="Meet Fatima" title={<>Honest advice.<br /><em>Beautiful judgement.</em></>} />
          <p>Every appointment is led by Fatima from her private Salford clinic, with a focus on facial harmony, calm consultation and results that still feel like you.</p>
          <p>There is no one-size-fits-all plan. Fatima considers your features, lifestyle and timing before recommending what will make a genuine difference—and will always say when less is more.</p>
          <Button href="/about" variant="line">About Fatima</Button>
        </div>
      </section>

      <section className="experience-section">
        <div className="experience-copy">
          <SectionIntro
            eyebrow="The Injectox experience"
            title={<>A calm space for<br /><em>considered care.</em></>}
          />
          <TrustPanel />
          <Button href="/book" variant="line">Book an appointment</Button>
        </div>
        <div className="experience-media">
          <Image src="/images/dropbox/curated/clinic-treatment-room.jpg" alt="Inside the private Injectox Clinic treatment room" fill sizes="(max-width: 800px) 100vw, 46vw" />
        </div>
      </section>

      <section className="clinic-location-band">
        <div className="shell clinic-location-grid">
          <div><span className="eyebrow">Find the clinic</span><h2>Salford, Greater<br /><em>Manchester.</em></h2></div>
          <div><p><b>Skin Clinic MCR</b><br />Waters Edge Business Park<br />Modwen Road, Salford</p><Button href="/contact" variant="light">Directions &amp; contact</Button><div className="clinic-map" aria-label="Map showing Injectox Clinic in Salford"><iframe title="Injectox Clinic location map" loading="lazy" src="https://www.google.com/maps?q=Skin+Clinic+MCR,+Waters+Edge+Business+Park,+Modwen+Road,+Salford&amp;output=embed" /></div></div>
        </div>
      </section>

      <StatsSection />
      <ResultFilmPanel />

      <section className="section shell pricing-preview">
        <div className="pricing-preview-copy">
          <span className="eyebrow">Treatment pricing</span>
          <h2>Clear prices before you book.</h2>
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
