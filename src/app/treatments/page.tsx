import type { Metadata } from "next";
import { FinalCTA, PageHero } from "@/components/ui";
import { TreatmentBrowser } from "@/components/treatment-browser";

export const metadata: Metadata = { title: "Treatments", description: "Explore Injectox Clinic lip filler, facial balancing, anti-wrinkle, skin and laser treatments in Salford." };

export default function TreatmentsPage() {
  return <><PageHero contentKey="treatmentsHero" eyebrow="The treatment edit" title={<>Precision,<br />The right treatment.<br /><em>Chosen for you,</em></>} copy="Explore signature injectables, advanced skin, laser and wellness options. Every route begins with suitability—not pressure." index="02" /><section className="inner-section shell"><TreatmentBrowser /></section><FinalCTA /></>;
}
