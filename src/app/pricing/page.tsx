import type { Metadata } from "next";
import { FinalCTA, PageHero, PricingTable } from "@/components/ui";

export const metadata: Metadata = { title: "Pricing", description: "Transparent current prices for Injectox Clinic treatments, packages, skin and laser services." };
export default function PricingPage() { return <><PageHero eyebrow="Transparent pricing" title={<>Your glow up,<br /><em>priced simply.</em></>} copy="Your final price may vary depending on product, treatment area, and what your consultation recommends." index="04" /><section className="inner-section shell"><div className="category-rail"><span>All</span><a href="#filler">Filler</a><a href="#skin">Skin</a><a href="#laser">Laser packages</a><a href="#packages">Packages</a></div><PricingTable /></section><FinalCTA /></>; }
