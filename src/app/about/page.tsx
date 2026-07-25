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
        <h2>No handovers. No juniors.<br /><em>Just me.</em></h2>
        <p>I’m Fatima — I founded Injectox Clinic and I’m the lead aesthetician here. I specialise in Russian lip and umbrella technique filler, and every appointment is with me personally, from your first consultation right through to aftercare.</p>
        <p>I’ve always believed treatments should enhance what you already have, not change it. That’s why every plan I put together is built around your face, not a trend — and if less is the right call for you, I’ll always say so.</p>
        <p>My goal for every client who walks into Injectox is simple: I want you to leave feeling heard, confident and like a better version of yourself. Whether it’s your first treatment with me or your tenth, you’ll always get the same thing — my full attention, every single time.</p>
        <div className="story-quote">Expert judgement. Honest advice.</div>
        <TrustPanel />
        <div className="button-row">
          <Button href={booking.consultation}>Meet Fatima in consultation</Button>
          <Button href="/#find-the-clinic" variant="line">Find the clinic</Button>
        </div>
      </div>
    </section>
    <FinalCTA />
  </>;
}
