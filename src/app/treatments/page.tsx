import type { Metadata } from "next";
import { FinalCTA, PageHero } from "@/components/ui";
import { TreatmentBrowser } from "@/components/treatment-browser";
import { EditableText } from "@/components/dev/editable-text";
import { pages } from "@/lib/content";

export const metadata: Metadata = { title: "Treatments", description: "Explore Injectox Clinic lip filler, facial balancing, anti-wrinkle, skin and laser treatments in Salford." };

export default function TreatmentsPage() {
  const t = pages.treatmentsList;
  return <>
    <PageHero
      eyebrow={t.heroEyebrow}
      eyebrowPath="pages.treatmentsList.heroEyebrow"
      title={<><EditableText as="span" path="pages.treatmentsList.heroTitleLine1" value={t.heroTitleLine1} /><br /><em><EditableText as="span" path="pages.treatmentsList.heroTitleLine2" value={t.heroTitleLine2} /></em></>}
      copy={t.heroCopy}
      copyPath="pages.treatmentsList.heroCopy"
      index="02"
    />
    <section className="inner-section shell"><TreatmentBrowser /></section>
    <FinalCTA />
  </>;
}
