import type { Metadata } from "next";
import { FinalCTA, PageHero, PricingTable } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Prices: Lip Filler, Laser & Skin, Salford", description: "Transparent current prices for Injectox Clinic lip filler, packages, skin and laser services in Salford.", path: "/pricing" });
export default function PricingPage() { return <><PageHero eyebrow="Transparent pricing" title={<>Every price,<br /><em>before you book.</em></>} copy="Your final price may vary depending on product, treatment area, and what your consultation recommends." index="04" /><section className="inner-section shell"><div className="category-rail"><span>All</span><a href="#filler">Filler</a><a href="#skin">Skin</a><a href="#laser">Laser packages</a><a href="#packages">Packages</a></div><PricingTable /></section><FinalCTA /></>; }
