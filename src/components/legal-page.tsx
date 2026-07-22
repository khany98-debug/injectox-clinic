import { PageHero } from "@/components/ui";
import { EditableText } from "@/components/dev/editable-text";

export function LegalPage({ title, intro, sections, path }: { title: string; intro: string; sections: { title: string; copy: string }[]; path: string }) {
  return <>
    <PageHero eyebrow="Legal & privacy" title={<><EditableText as="span" path={`${path}.title`} value={title} /><br /><em>made readable.</em></>} copy={intro} copyPath={`${path}.intro`} index="14" />
    <section className="policy-list shell">
      {sections.map((section, i) => (
        <article className="policy-card" key={section.title}>
          <span>0{i + 1}</span>
          <h2><EditableText as="span" path={`${path}.sections.${i}.title`} value={section.title} /></h2>
          <p><EditableText path={`${path}.sections.${i}.copy`} value={section.copy} /></p>
        </article>
      ))}
    </section>
  </>;
}
