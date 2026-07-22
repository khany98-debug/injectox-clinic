import type { Metadata } from "next";
import { FinalCTA, PageHero } from "@/components/ui";
import { EditableText } from "@/components/dev/editable-text";
import { pages } from "@/lib/content";

export const metadata: Metadata = { title: "Clinic Policies", description: "Injectox Clinic booking, consultation, age, laser and cancellation policy guidance." };
export default function PoliciesPage() {
  const p = pages.policies;
  return <>
    <PageHero
      eyebrow={p.heroEyebrow}
      eyebrowPath="pages.policies.heroEyebrow"
      title={<><EditableText as="span" path="pages.policies.heroTitleLine1" value={p.heroTitleLine1} /><br /><em><EditableText as="span" path="pages.policies.heroTitleLine2" value={p.heroTitleLine2} /></em></>}
      copy={p.heroCopy}
      copyPath="pages.policies.heroCopy"
      index="09"
    />
    <section className="policy-list shell">
      {p.items.map((item, i) => (
        <article className="policy-card" key={item.title}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          <h2><EditableText as="span" path={`pages.policies.items.${i}.title`} value={item.title} /></h2>
          <p><EditableText path={`pages.policies.items.${i}.copy`} value={item.copy} /></p>
        </article>
      ))}
    </section>
    <FinalCTA />
  </>;
}
