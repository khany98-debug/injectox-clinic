import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TreatmentDetail } from "@/components/treatment-detail";
import { LaserHairRemovalDetail } from "@/components/laser-hair-removal-detail";
import { TreatmentSchema } from "@/components/structured-data";
import { formatPrice, treatmentBySlug, treatments } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return treatments.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = treatmentBySlug((await params).slug);
  if (!item) return {};
  const titles: Record<string, string> = {
    "russian-lip-filler": "Russian Lip Filler in Salford & Manchester",
    "facial-balancing": "Facial Balancing in Salford & Manchester",
    "laser-hair-removal": "Laser Hair Removal in Salford",
    "skin-boosters": "Skin Boosters & Profhilo in Salford",
    "filler-dissolving": "Filler Dissolving in Salford & Manchester",
  };
  return pageMetadata({ title: titles[item.slug] ?? `${item.name} in Salford`, description: `${item.intro} From ${formatPrice(item.price)} at Injectox Clinic, Salford.`, path: `/treatments/${item.slug}` });
}

export default async function TreatmentPage({ params }: Props) {
  const item = treatmentBySlug((await params).slug);
  if (!item) notFound();
  if (item.slug === "laser-hair-removal") return <><LaserHairRemovalDetail /><TreatmentSchema treatment={item} /></>;
  return <><TreatmentDetail treatment={item} /><TreatmentSchema treatment={item} /></>;
}
