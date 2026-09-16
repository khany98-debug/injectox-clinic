import type { Metadata } from "next";
import { FinalCTA, PageHero, ReviewsStrip, StatsSection } from "@/components/ui";
import { ReviewSubmit } from "@/components/review-submit";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Injectox Clinic Reviews in Salford", description: "Read verified client experiences from Injectox Clinic in Salford.", path: "/reviews" });
export default function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Verified client words" title={<>Trust, told in<br /><em>their own words.</em></>} copy="The most valuable result is feeling understood. Explore client feedback on honesty, natural-looking outcomes and the Injectox experience." index="05" />
      <StatsSection />
      <section className="section shell reviews-page-list"><ReviewsStrip all /></section>
      <section id="leave-review" className="section review-submit-section"><ReviewSubmit /></section>
      <FinalCTA />
    </>
  );
}
