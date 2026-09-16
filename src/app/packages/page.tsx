import type { Metadata } from "next";
import { FinalCTA, PageHero, PricingTable } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Treatment Packages in Salford", description: "Explore Injectox Clinic facial balancing, filler and laser treatment packages in Salford.", path: "/packages" });
export default function PackagesPage() { return <><PageHero eyebrow="Planned, not pushed" title={<>Packages with<br /><em>a purpose.</em></>} copy="Flexible treatment and laser options for clients who benefit from a joined-up plan. Exact suitability and sequencing are agreed in consultation." index="12" /><section className="inner-section shell"><PricingTable onlyPackages /></section><FinalCTA /></>; }
