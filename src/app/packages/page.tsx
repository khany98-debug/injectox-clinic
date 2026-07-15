import type { Metadata } from "next";
import { FinalCTA, PageHero, PricingTable } from "@/components/ui";

export const metadata: Metadata = { title: "Packages", description: "Explore Injectox Clinic facial balancing, filler, laser and treatment packages." };
export default function PackagesPage() { return <><PageHero eyebrow="Planned, not pushed" title={<>Packages with<br /><em>a purpose.</em></>} copy="Flexible treatment and laser options for clients who benefit from a joined-up plan. Exact suitability and sequencing are agreed in consultation." index="12" /><section className="inner-section shell"><PricingTable /></section><FinalCTA /></>; }
