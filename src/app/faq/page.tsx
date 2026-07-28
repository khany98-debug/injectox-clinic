import type { Metadata } from "next";
import { FAQList, FinalCTA, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Answers about Injectox Clinic consultations, results, laser patch tests, deposits and aftercare." };
export default function FAQPage() { return <><PageHero eyebrow="Good to know" title={<>Clear answers.<br /><em>Your questions, answered simply.</em></>} copy="Everything first-time and returning clients usually want to know before booking." index="08" /><section className="inner-section shell"><FAQList /></section><FinalCTA /></>; }
