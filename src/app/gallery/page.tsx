import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { FinalCTA, PageHero, SocialFollow } from "@/components/ui";

export const metadata: Metadata = { title: "Results & Journal", description: "Explore Injectox Clinic treatment work, education and client stories from Instagram." };
export default function GalleryPage() { return <><PageHero eyebrow="Results & journal" title={<>The detail is<br /><em>the difference.</em></>} copy="A live-minded edit of Injectox Clinic’s public treatment work, client stories and educational posts. Tap any frame to explore." index="06" /><section className="inner-section"><div className="shell split-heading"><p>All imagery is drawn from the clinic’s own public social content. Treatment outcomes vary and consent applies.</p><SocialFollow /></div><GalleryGrid /></section><FinalCTA /></>; }
