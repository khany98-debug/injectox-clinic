import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { FinalCTA, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Client Results", description: "Explore genuine Injectox Clinic client lip and skin treatment results in Salford." };
export default function GalleryPage() { return <><PageHero eyebrow="Real client results" title={<>Subtle changes.<br /><em>Beautifully considered.</em></>} copy="A curated edit of genuine Injectox client outcomes photographed in the clinic. Tap any result to view it in detail." index="06" /><section className="results-intro shell"><span className="eyebrow">The work</span><h2>Real faces. Real treatments.<br /><em>No stock imagery.</em></h2><p>These images show individual client experiences supplied by the clinic. Results, swelling, recovery and longevity vary. Images should only remain published where valid client consent is recorded.</p></section><section className="results-gallery"><GalleryGrid source="results" /></section><FinalCTA /></>; }
