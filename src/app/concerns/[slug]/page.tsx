import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, FinalCTA, PageHero } from "@/components/ui";
import { booking, concernBySlug, concerns, formatPrice, treatmentBySlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return concerns.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = concernBySlug((await params).slug); return item ? { title: item.title, description: item.short } : {}; }

export default async function ConcernPage({ params }: Props) {
  const item = concernBySlug((await params).slug); if (!item) notFound();
  const options = item.treatments.map((slug) => treatmentBySlug(slug)).filter(Boolean);
  return <><PageHero eyebrow="Your concern" title={<>{item.title}<br /><em>considered softly.</em></>} copy={`${item.short} A consultation is the best place to understand what is appropriate for you.`} index={item.number} /><section className="concern-detail shell"><div className="concern-detail-copy"><span className="eyebrow">A softer way to decide</span><h2>Your concern first.<br /><em>The treatment second.</em></h2><p>Features, skin and hair concerns can have many contributing factors. This guide is not a diagnosis; it is a clear starting point for an honest conversation.</p><Button href={booking.consultation}>Book a consultation</Button></div><div><div className="compare-grid">{options.map((option, i) => option && <article className="compare-card" key={option.slug}><span>Option 0{i+1}</span><h3>{option.name}</h3><p>{option.intro}</p><p><b>Best for:</b> {option.idealFor.slice(0,3).join(", ")}</p><p><b>From:</b> {formatPrice(option.price)} · {option.duration}</p><Button href={`/treatments/${option.slug}`} variant="line">Compare treatment</Button></article>)}</div></div></section><FinalCTA /></>;
}
