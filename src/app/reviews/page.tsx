import type { Metadata } from "next";
import { FinalCTA, PageHero, ReviewsStrip, StatsSection } from "@/components/ui";

export const metadata: Metadata = { title: "Reviews", description: "Read verified client experiences from Injectox Clinic in Salford." };
export default function ReviewsPage() { return <><PageHero eyebrow="Verified client words" title={<>Trust, told in<br /><em>their own words.</em></>} copy="The most valuable result is feeling understood. Explore client feedback on honesty, natural-looking outcomes and the Injectox experience." index="05" /><StatsSection /><section className="section shell"><ReviewsStrip all /></section><FinalCTA /></>; }
