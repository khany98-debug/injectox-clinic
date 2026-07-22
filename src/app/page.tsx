import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/motion";
import { HeroFilm } from "@/components/hero-film";
import { EditableText } from "@/components/dev/editable-text";
import { Button, ConcernGrid, FAQList, FinalCTA, ResultFilmPanel, ReviewsStrip, SectionIntro, SocialFollow, StatsSection, TreatmentsGrid, TrustPanel } from "@/components/ui";
import { booking, pages } from "@/lib/content";

const reasonIcons = [HeartHandshake, Sparkles, ShieldCheck];

export default function Home() {
  const h = pages.home;
  return (
    <>
      <section className="home-hero reference-hero">
        <HeroFilm />
        <div className="hero-wash" />
        <div className="hero-grain" />
        <div className="hero-copy reference-hero-copy">
          <Reveal>
            <span className="eyebrow hero-location"><span><EditableText path="pages.home.heroEyebrowLine1" value={h.heroEyebrowLine1} /></span><span><EditableText path="pages.home.heroEyebrowLine2" value={h.heroEyebrowLine2} /></span></span>
            <h1><span>Injectox</span><span>Clinic</span></h1>
            <p>
              <EditableText path="pages.home.heroIntro" value={h.heroIntro} />
            </p>
            <div className="button-row">
              <Button href={booking.treatment}>Book now</Button>
              <Button href="/treatments" variant="line">View treatments</Button>
            </div>
            <div className="hero-proof" aria-label="Injectox Clinic approach">
              {h.heroProof.map((item, i) => <span key={i}><EditableText path={`pages.home.heroProof.${i}`} value={item} /></span>)}
            </div>
          </Reveal>
        </div>
        <div className="reference-hero-panel">
          <span><EditableText path="pages.home.heroPanelLabel" value={h.heroPanelLabel} /></span>
          <b><EditableText path="pages.home.heroPanelText" value={h.heroPanelText} /></b>
          <Link href="/pricing">View pricing <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="reference-trust shell" aria-label="Clinic trust points">
        {h.trustPoints.map((item, i) => (
          <div key={i}><CheckCircle2 size={17} /><span><EditableText path={`pages.home.trustPoints.${i}`} value={item} /></span></div>
        ))}
      </section>

      <section className="section shell why-section">
        <div className="split-heading">
          <SectionIntro
            eyebrow={h.whyEyebrow}
            eyebrowPath="pages.home.whyEyebrow"
            title={<><EditableText as="span" path="pages.home.whyTitleLine1" value={h.whyTitleLine1} /><br /><em><EditableText as="span" path="pages.home.whyTitleLine2" value={h.whyTitleLine2} /></em></>}
          />
          <Link className="text-link" href="/about">Meet Fatima <ArrowRight /></Link>
        </div>
        <div className="reason-grid">
          {h.reasons.map((reason, index) => {
            const Icon = reasonIcons[index] ?? HeartHandshake;
            return (
              <Reveal className="reason-card" delay={index * 0.06} key={reason.title}>
                <Icon size={22} />
                <h3><EditableText path={`pages.home.reasons.${index}.title`} value={reason.title} /></h3>
                <p><EditableText path={`pages.home.reasons.${index}.copy`} value={reason.copy} /></p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="discover" className="section shell concern-section reference-concerns">
        <div className="split-heading">
          <SectionIntro
            eyebrow={h.concernEyebrow}
            eyebrowPath="pages.home.concernEyebrow"
            title={<><EditableText as="span" path="pages.home.concernTitleLine1" value={h.concernTitleLine1} /><br /><em><EditableText as="span" path="pages.home.concernTitleLine2" value={h.concernTitleLine2} /></em></>}
          />
        </div>
        <ConcernGrid />
      </section>

      <section className="section shell reference-services">
        <div className="split-heading">
          <SectionIntro
            eyebrow={h.servicesEyebrow}
            eyebrowPath="pages.home.servicesEyebrow"
            title={<><EditableText as="span" path="pages.home.servicesTitleLine1" value={h.servicesTitleLine1} /><br /><em><EditableText as="span" path="pages.home.servicesTitleLine2" value={h.servicesTitleLine2} /></em></>}
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
          <SectionIntro
            eyebrow={h.aboutEyebrow}
            eyebrowPath="pages.home.aboutEyebrow"
            title={<><EditableText as="span" path="pages.home.aboutTitleLine1" value={h.aboutTitleLine1} /><br /><em><EditableText as="span" path="pages.home.aboutTitleLine2" value={h.aboutTitleLine2} /></em></>}
          />
          <p><EditableText path="pages.home.aboutParagraph1" value={h.aboutParagraph1} /></p>
          <p><EditableText path="pages.home.aboutParagraph2" value={h.aboutParagraph2} /></p>
          <Button href="/about" variant="line">About Fatima</Button>
        </div>
      </section>

      <section className="experience-section">
        <div className="experience-copy">
          <SectionIntro
            eyebrow={h.experienceEyebrow}
            eyebrowPath="pages.home.experienceEyebrow"
            title={<><EditableText as="span" path="pages.home.experienceTitleLine1" value={h.experienceTitleLine1} /><br /><em><EditableText as="span" path="pages.home.experienceTitleLine2" value={h.experienceTitleLine2} /></em></>}
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
          <div><span className="eyebrow">Find the clinic</span><h2><EditableText as="span" path="pages.home.locationTitleLine1" value={h.locationTitleLine1} /><br /><em><EditableText as="span" path="pages.home.locationTitleLine2" value={h.locationTitleLine2} /></em></h2></div>
          <div><p><b>Skin Clinic MCR</b><br />Waters Edge Business Park<br />Modwen Road, Salford</p><Button href="/contact" variant="light">Directions &amp; contact</Button><div className="clinic-map" aria-label="Map showing Injectox Clinic in Salford"><iframe title="Injectox Clinic location map" loading="lazy" src="https://www.google.com/maps?q=Skin+Clinic+MCR,+Waters+Edge+Business+Park,+Modwen+Road,+Salford&amp;output=embed" /></div></div>
        </div>
      </section>

      <StatsSection />
      <ResultFilmPanel />

      <section className="section shell pricing-preview">
        <div className="pricing-preview-copy">
          <span className="eyebrow"><EditableText path="pages.home.pricingPreviewEyebrow" value={h.pricingPreviewEyebrow} /></span>
          <h2><EditableText as="span" path="pages.home.pricingPreviewTitle" value={h.pricingPreviewTitle} /></h2>
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
            eyebrow={h.socialEyebrow}
            eyebrowPath="pages.home.socialEyebrow"
            title={<><EditableText as="span" path="pages.home.socialTitleLine1" value={h.socialTitleLine1} /><br /><em><EditableText as="span" path="pages.home.socialTitleLine2" value={h.socialTitleLine2} /></em></>}
          />
          <SocialFollow />
        </div>
        <GalleryGrid source="results" limit={8} mobileLoop includeFilms />
      </section>

      <section className="section shell reviews-section reference-reviews">
        <div className="split-heading">
          <SectionIntro
            eyebrow={h.reviewsEyebrow}
            eyebrowPath="pages.home.reviewsEyebrow"
            title={<><EditableText as="span" path="pages.home.reviewsTitleLine1" value={h.reviewsTitleLine1} /><br /><em><EditableText as="span" path="pages.home.reviewsTitleLine2" value={h.reviewsTitleLine2} /></em></>}
          />
          <div className="review-actions">
            <Link className="text-link" href="/reviews">Read reviews <ArrowRight /></Link>
            <Link className="text-link muted" href="/reviews#leave-review">Leave a review <ArrowRight /></Link>
          </div>
        </div>
        <ReviewsStrip mobileLoop />
      </section>



      <section className="section shell faq-section reference-faq">
        <div>
          <SectionIntro
            eyebrow={h.faqEyebrow}
            eyebrowPath="pages.home.faqEyebrow"
            title={<><EditableText as="span" path="pages.home.faqTitleLine1" value={h.faqTitleLine1} /><br /><em><EditableText as="span" path="pages.home.faqTitleLine2" value={h.faqTitleLine2} /></em></>}
          />
          <Button href="/faq" variant="line">View all FAQs</Button>
        </div>
        <FAQList limit={5} />
      </section>

      <FinalCTA title={<><EditableText as="span" path="pages.home.finalCtaTitleLine1" value={h.finalCtaTitleLine1} /><br /><em><EditableText as="span" path="pages.home.finalCtaTitleLine2" value={h.finalCtaTitleLine2} /></em></>} />
    </>
  );
}
