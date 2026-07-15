import { PageHero } from "@/components/ui";

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: { title: string; copy: string }[] }) {
  return <><PageHero eyebrow="Legal & privacy" title={<>{title}<br /><em>made readable.</em></>} copy={intro} index="14" /><section className="policy-list shell">{sections.map((section, i) => <article className="policy-card" key={section.title}><span>0{i+1}</span><h2>{section.title}</h2><p>{section.copy}</p></article>)}</section></>;
}
