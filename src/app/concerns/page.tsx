import type { Metadata } from "next";
import { ConcernGrid, FinalCTA, PageHero } from "@/components/ui";
import { EditableText } from "@/components/dev/editable-text";
import { pages } from "@/lib/content";

export const metadata: Metadata = { title: "Concerns", description: "Find the right aesthetics or skin treatment by starting with the concern you want to address." };
export default function ConcernsPage() {
  const c = pages.concerns;
  return <>
    <PageHero
      compact
      eyebrow={c.heroEyebrow}
      eyebrowPath="pages.concerns.heroEyebrow"
      title={<><EditableText as="span" path="pages.concerns.heroTitleLine1" value={c.heroTitleLine1} /><br /><em><EditableText as="span" path="pages.concerns.heroTitleLine2" value={c.heroTitleLine2} /></em></>}
      copy={c.heroCopy}
      copyPath="pages.concerns.heroCopy"
      index="03"
    />
    <section className="inner-section shell concern-index">
      <div className="concern-index-intro">
        <span className="eyebrow"><EditableText path="pages.concerns.introEyebrow" value={c.introEyebrow} /></span>
        <p><EditableText path="pages.concerns.introCopy" value={c.introCopy} /></p>
      </div>
      <ConcernGrid />
    </section>
    <FinalCTA />
  </>;
}
