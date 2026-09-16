import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, FinalCTA, PageHero } from "@/components/ui";
import { booking, concernBySlug, concerns, formatPrice, treatmentBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return concerns.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = concernBySlug((await params).slug);
  return item ? pageMetadata({ title: `${item.title} treatments in Salford`, description: item.short, path: `/concerns/${item.slug}` }) : {};
}

const concernGuidance: Record<string, string> = {
  "thin-lips": "Start with the shape you already have. We can discuss definition, symmetry and a measured amount of volume before deciding whether treatment is right for you.",
  "facial-imbalance": "Facial balancing starts with a whole-face assessment rather than a one-area fix. We prioritise the changes that add genuine harmony and can stage a plan where that is more appropriate.",
  "fine-lines": "We look at how your expression moves and what you want to soften. The goal is a fresher finish that still feels like you.",
  "dull-skin": "Skin concerns are personal, so the first step is understanding your skin, timing and goals before choosing hydration, facial or injectable skin support.",
  "acne-pigmentation-texture": "Texture and clarity often benefit from realistic course planning. We will talk through your skin history, suitability and what improvement can reasonably look like.",
  "unwanted-hair": "Laser hair removal is planned around your skin and hair. A patch test and consultation come first, followed by the course or area plan that suits you.",
};

export default async function ConcernPage({ params }: Props) {
  const item = concernBySlug((await params).slug);
  if (!item) notFound();
  const options = item.treatments.map((slug) => treatmentBySlug(slug)).filter(Boolean);
  return (
    <>
      <PageHero compact eyebrow="Your concern" title={item.title} copy={`${item.short} Compare the recommended routes below.`} />
      <section id="recommended" className="concern-options shell">
        <div className="concern-options-head">
          <div>
            <span className="eyebrow">Recommended treatments</span>
            <h2>Your clearest options.</h2>
            <p className="concern-guidance">{concernGuidance[item.slug]}</p>
          </div>
          <p>Suitability and the final plan are always confirmed in consultation. This guide is a simple starting point, not a diagnosis.</p>
        </div>
        <div className="compare-grid">
          {options.map((option, i) => option && <article className="compare-card" key={option.slug}><span>Option 0{i + 1}</span><h3>{option.name}</h3><p>{option.intro}</p><p><b>Best for:</b> {option.idealFor.slice(0, 3).join(", ")}</p><p><b>From:</b> {formatPrice(option.price)} · {option.duration}</p><Button href={`/treatments/${option.slug}`} variant="line">View treatment</Button></article>)}
        </div>
        <div className="concern-options-cta"><p>Not sure which route is right?</p><Button href={booking.currentDiary} external>Book a consultation</Button></div>
      </section>
      <FinalCTA />
    </>
  );
}
