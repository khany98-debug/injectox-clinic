import type { Metadata } from "next";
import { FinalCTA, PageHero } from "@/components/ui";
import { TreatmentBrowser } from "@/components/treatment-browser";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Treatments in Salford & Manchester", description: "Explore Injectox Clinic lip filler, facial balancing, anti-wrinkle, skin and laser treatments in Salford.", path: "/treatments" });

export default function TreatmentsPage() {
  return <><PageHero eyebrow="The treatment edit" title={<>The right treatment,<br /><em>chosen for you.</em></>} copy="Explore signature injectables, advanced skin and laser treatments. Every route begins with suitability—not pressure." index="02" /><section className="inner-section shell"><TreatmentBrowser /></section><FinalCTA /></>;
}
