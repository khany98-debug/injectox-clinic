import type { Metadata } from "next";
import { FinalCTA, PageHero, PricingTable } from "@/components/ui";

export const metadata: Metadata = { title: "Pricing", description: "Transparent current prices for Injectox Clinic treatments, packages, skin and laser services." };
export default function PricingPage() { return <><PageHero eyebrow="Transparent pricing" title={<>Plan beautifully.<br /><em>Book clearly.</em></>} copy="Current public prices from the clinic’s Faces booking catalogue. Your final recommendation may vary with product, area and treatment plan." index="04" /><section className="inner-section shell"><div className="category-rail"><span>All</span><a href="#filler">Filler</a><a href="#skin">Skin</a><a href="#laser">Laser</a><a href="#packages">Packages</a></div><PricingTable /></section><FinalCTA /></>; }
