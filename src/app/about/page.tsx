import type { Metadata } from "next";
import Image from "next/image";
import { Button, FinalCTA, PageHero, TrustPanel } from "@/components/ui";
import { booking } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: "Meet Fatima Khan and discover the facial-harmony philosophy behind Injectox Clinic." };

export default function AboutPage() {
  return <>
    <PageHero eyebrow="The woman behind Injectox" title={<>Beauty judgement.<br /><em>Human honesty.</em></>} copy="Injectox Clinic is led by aesthetic practitioner Fatima Khan from a private Salford clinic serving Greater Manchester." index="07" />
    <section className="story-grid shell">
      <div className="story-image"><Image src="/images/dropbox/client-labelled/consultation-fatima.jpg" alt="Fatima Khan consulting with a client at Injectox Clinic" fill priority sizes="(max-width: 760px) 100vw, 42vw" /></div>
      <div className="story-copy">
        <span className="eyebrow">Meet Fatima</span>
        <h2>Expertise is not only what you can do.<br /><em>It is knowing when not to.</em></h2>
        <p>Fatima’s work returns to the same principle: the best result is tailored to the person in front of her. That means facial harmony over trends, staged change where appropriate and honest advice when a treatment is not needed.</p>
        <p>The Injectox experience is designed to feel warm, polished and clear—from an informed consultation through aftercare.</p>
        <div className="story-quote">“The goal is not to make you look treated. It is to make the whole picture feel more resolved.”</div>
        <TrustPanel />
        <Button href={booking.consultation}>Meet Fatima in consultation</Button>
      </div>
    </section>
    <FinalCTA />
  </>;
}
