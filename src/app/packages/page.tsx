import type { Metadata } from "next";
import { FinalCTA, PageHero, PricingTable } from "@/components/ui";
import { EditableText } from "@/components/dev/editable-text";
import { pages } from "@/lib/content";

export const metadata: Metadata = { title: "Packages", description: "Explore Injectox Clinic facial balancing, filler, laser and treatment packages." };
export default function PackagesPage() {
  const p = pages.packages;
  return <>
    <PageHero
      eyebrow={p.heroEyebrow}
      eyebrowPath="pages.packages.heroEyebrow"
      title={<><EditableText as="span" path="pages.packages.heroTitleLine1" value={p.heroTitleLine1} /><br /><em><EditableText as="span" path="pages.packages.heroTitleLine2" value={p.heroTitleLine2} /></em></>}
      copy={p.heroCopy}
      copyPath="pages.packages.heroCopy"
      index="12"
    />
    <section className="inner-section shell"><PricingTable /></section>
    <FinalCTA />
  </>;
}
