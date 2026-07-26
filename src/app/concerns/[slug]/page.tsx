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
  return <><PageHero compact eyebrow="Your concern" title={item.title} copy={`${item.short} Compare the recommended routes below.`} /><section id="recommended" className="concern-options shell"><div className="concern-options-head"><div><span className="eyebrow">Recommended treatments</span><h2>Your clearest options.</h2></div><p>Suitability and the final plan are always confirmed in consultation. This guide is a simple starting point, not a diagnosis.</p></div><div className="compare-grid">{options.map((option, i) => option && <article className="compare-card" key={option.slug}><span>Option 0{i+1}</span><h3>{option.name}</h3><p>{option.intro}</p><p><b>Best for:</b> {option.idealFor.slice(0,3).join(", ")}</p><p><b>From:</b> {formatPrice(option.price)} · {option.duration}</p><Button href={`/treatments/${option.slug}`} variant="line">View treatment</Button></article>)}</div><div className="concern-options-cta"><p>Not sure which route is right?</p><Button href={booking.currentDiary} external>Book a consultation</Button></div></section><FinalCTA /></>;
}
