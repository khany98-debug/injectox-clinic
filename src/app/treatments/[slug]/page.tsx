import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingSteps, Button, FinalCTA } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { EditableText } from "@/components/dev/editable-text";
import { booking, formatPrice, treatments } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return treatments.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const slug = (await params).slug; const item = treatments.find((t) => t.slug === slug); return item ? { title: item.name, description: `${item.intro} From ${formatPrice(item.price)} at Injectox Clinic, Salford.` } : {}; }

export default async function TreatmentPage({ params }: Props) {
  const slug = (await params).slug;
  const index = treatments.findIndex((t) => t.slug === slug);
  const item = index === -1 ? undefined : treatments[index];
  if (!item) notFound();
  const base = `treatments.${index}`;
  return <>
    <section className="treatment-detail-hero"><Reveal className="treatment-detail-copy"><span className="eyebrow">{item.category} · <EditableText path={`${base}.eyebrow`} value={item.eyebrow} /></span><h1><EditableText as="span" path={`${base}.name`} value={item.name} /></h1><p><EditableText as="span" path={`${base}.intro`} value={item.intro} /></p><div className="button-row"><Button href={`/book?service=${encodeURIComponent(item.name)}`}>Book this treatment</Button><Button href="/pricing" variant="line">View all pricing</Button></div></Reveal><div className="treatment-detail-image"><Image src={item.image} alt={item.name} fill priority sizes="(max-width: 760px) 100vw, 50vw" /></div></section>
    <div className="glance"><div><small>From</small><b>{formatPrice(item.price)}</b></div><div><small>Appointment</small><b>{item.duration}</b></div><div><small>Consultation</small><b>{item.consultation ? "Required" : "Recommended"}</b></div><div><small>Typical downtime</small><b>{item.downtime}</b></div><div><small>Patch test</small><b>{item.patchTest ? "Required" : "If advised"}</b></div></div>
    <section className="treatment-body shell"><aside><span className="eyebrow">At a glance</span><h2>A treatment designed around <em>your proportions.</em></h2><p>Suitability, product choice and the exact plan are confirmed with your practitioner. Results and recovery vary.</p><Button href={booking.consultation}>Book consultation</Button></aside><div className="treatment-content">
      <section><span className="eyebrow">Why clients choose it</span><h2>The considered benefits</h2><ul className="benefit-list">{item.benefits.map((b, i) => <li key={i}><EditableText path={`${base}.benefits.${i}`} value={b} /></li>)}</ul></section>
      <section><span className="eyebrow">Ideal for</span><h2>Concerns this route can support</h2><ul className="benefit-list">{item.idealFor.map((b, i) => <li key={i}><EditableText path={`${base}.idealFor.${i}`} value={b} /></li>)}</ul></section>
      <section><span className="eyebrow">Your appointment</span><h2>What to expect</h2><ol className="process-list">{item.process.map((p, i) => <li key={i}><EditableText path={`${base}.process.${i}`} value={p} /></li>)}</ol></section>
      <section><span className="eyebrow">Good to know</span><h2>Before & aftercare</h2><p>Tell the clinic about medical conditions, medication, pregnancy or breastfeeding, allergies and previous treatment. Follow the preparation and aftercare supplied for your appointment. If anything feels unusual after treatment, contact the clinic promptly.</p></section>
      <section><span className="eyebrow">Treatment questions</span><h2>Frequently asked</h2><div className="faq-list">{item.faq.map((faq, i) => <details key={i} open={i===0}><summary><span>0{i+1}</span><EditableText path={`${base}.faq.${i}.q`} value={faq.q} /><i>+</i></summary><p><EditableText path={`${base}.faq.${i}.a`} value={faq.a} /></p></details>)}</div></section>
      <section><span className="eyebrow">Continue exploring</span><h2>Related concerns</h2><div className="related-grid">{item.relatedConcerns.map((slug) => <Link key={slug} href={`/concerns/${slug}`}>{slug.replaceAll("-", " ")} →</Link>)}</div></section>
    </div></section>
    <section className="section shell"><BookingSteps /></section><FinalCTA />
  </>;
}
