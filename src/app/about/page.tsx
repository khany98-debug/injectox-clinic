import type { Metadata } from "next";
import Image from "next/image";
import { Button, FinalCTA, PageHero, TrustPanel } from "@/components/ui";
import { EditableText } from "@/components/dev/editable-text";
import { booking, pages } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: "Meet Fatima Khan and discover the facial-harmony philosophy behind Injectox Clinic." };

export default function AboutPage() {
  const a = pages.about;
  return <>
    <PageHero
      eyebrow={a.heroEyebrow}
      eyebrowPath="pages.about.heroEyebrow"
      title={<><EditableText as="span" path="pages.about.heroTitleLine1" value={a.heroTitleLine1} /><br /><em><EditableText as="span" path="pages.about.heroTitleLine2" value={a.heroTitleLine2} /></em></>}
      copy={a.heroCopy}
      copyPath="pages.about.heroCopy"
      index="07"
    />
    <section className="story-grid shell">
      <div className="story-image"><Image src="/images/dropbox/client-labelled/consultation-fatima.jpg" alt="Fatima Khan consulting with a client at Injectox Clinic" fill priority sizes="(max-width: 760px) 100vw, 42vw" /></div>
      <div className="story-copy">
        <span className="eyebrow"><EditableText path="pages.about.storyEyebrow" value={a.storyEyebrow} /></span>
        <h2><EditableText as="span" path="pages.about.storyTitleLine1" value={a.storyTitleLine1} /><br /><em><EditableText as="span" path="pages.about.storyTitleLine2" value={a.storyTitleLine2} /></em></h2>
        <p><EditableText path="pages.about.storyParagraph1" value={a.storyParagraph1} /></p>
        <p><EditableText path="pages.about.storyParagraph2" value={a.storyParagraph2} /></p>
        <div className="story-quote">“<EditableText path="pages.about.storyQuote" value={a.storyQuote} />”</div>
        <TrustPanel />
        <Button href={booking.consultation} textPath="pages.about.consultationBtn" textValue={a.consultationBtn} />
      </div>
    </section>
    <FinalCTA />
  </>;
}
