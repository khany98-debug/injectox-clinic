import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { FinalCTA, PageHero, ResultFilmPanel } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Client Results from Injectox Clinic", description: "Explore genuine Injectox Clinic client lip and skin treatment results in Salford.", path: "/gallery" });
export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Real client results" title={<>Small changes.<br /><em>Serious results.</em></>} copy="A curated edit of real Injectox outcomes, photographed in clinic. Tap any result to see it up close." index="06" />
      <section className="results-intro shell">
        <span className="eyebrow">The work</span>
        <h2>Real faces. Real treatments.<br /><em>No stock imagery.</em></h2>
        <p>Real clients. Real results. Every image on this page was taken right here at Injectox Clinic.</p>
      </section>
      <section className="results-gallery"><GalleryGrid source="results" /></section>
      <ResultFilmPanel />
      <FinalCTA />
    </>
  );
}
