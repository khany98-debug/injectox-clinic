import type { Metadata } from "next";
import { FinalCTA, PageHero, TreatmentsGrid } from "@/components/ui";

export const metadata: Metadata = { title: "Treatments", description: "Explore Injectox Clinic lip filler, facial balancing, anti-wrinkle, skin and laser treatments in Salford." };

export default function TreatmentsPage() {
  return <><PageHero eyebrow="The treatment edit" title={<>Precision, polish &<br /><em>a plan that fits.</em></>} copy="Explore signature injectables, advanced skin, laser and wellness options. Every route begins with suitability—not pressure." index="02" /><section className="inner-section shell"><div className="category-rail"><span>All treatments</span><a href="#injectables">Injectables</a><a href="#skin">Skin</a><a href="#laser">Laser</a></div><TreatmentsGrid /></section><FinalCTA /></>;
}
