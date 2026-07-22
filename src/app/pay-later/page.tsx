import type { Metadata } from "next";
import { Button, PageHero } from "@/components/ui";
import { EditableText } from "@/components/dev/editable-text";
import { booking, pages } from "@/lib/content";

export const metadata: Metadata = { title: "Payment Flexibility", description: "Ask Injectox Clinic about current pay-later options and provider terms." };
export default function PayLaterPage() {
  const p = pages.payLater;
  return <>
    <PageHero
      eyebrow={p.heroEyebrow}
      eyebrowPath="pages.payLater.heroEyebrow"
      title={<><EditableText as="span" path="pages.payLater.heroTitleLine1" value={p.heroTitleLine1} /><br /><em><EditableText as="span" path="pages.payLater.heroTitleLine2" value={p.heroTitleLine2} /></em></>}
      copy={p.heroCopy}
      copyPath="pages.payLater.heroCopy"
      index="13"
    />
    <section className="coming-soon shell">
      <div>
        <span className="eyebrow"><EditableText path="pages.payLater.sectionEyebrow" value={p.sectionEyebrow} /></span>
        <h1><EditableText as="span" path="pages.payLater.sectionTitleLine1" value={p.sectionTitleLine1} /><br /><em><EditableText as="span" path="pages.payLater.sectionTitleLine2" value={p.sectionTitleLine2} /></em></h1>
        <p><EditableText path="pages.payLater.sectionCopy" value={p.sectionCopy} /></p>
        <Button href={booking.instagram} external>Ask about instalments</Button>
      </div>
    </section>
  </>;
}
