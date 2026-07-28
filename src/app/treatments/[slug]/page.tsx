import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TreatmentDetail } from "@/components/treatment-detail";
import { formatPrice, treatmentBySlug, treatments } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return treatments.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = treatmentBySlug((await params).slug); return item ? { title: item.name, description: `${item.intro} From ${formatPrice(item.price)} at Injectox Clinic, Salford.` } : {}; }

export default async function TreatmentPage({ params }: Props) {
  const item = treatmentBySlug((await params).slug);
  if (!item) notFound();
  return <TreatmentDetail treatment={item} />;
}
