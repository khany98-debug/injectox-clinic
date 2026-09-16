import type { Metadata } from "next";
import { FAQList, FinalCTA, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Aesthetics FAQs in Salford", description: "Answers about Injectox Clinic consultations, results, laser patch tests, deposits and aftercare.", path: "/faq" });
export default function FAQPage() { return <><PageHero contentKey="faqHero" eyebrow="Good to know" title={<>Clear answers.<br /><em>Your questions, answered simply.</em></>} copy="Everything first-time and returning clients usually want to know before booking." index="08" /><section className="inner-section shell"><FAQList /></section><FinalCTA /></>; }
