import type { Metadata } from "next";
import { ConcernGrid, FinalCTA, PageHero, SectionIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Concerns", description: "Find the right aesthetics or skin treatment by starting with the concern you want to address." };
export default function ConcernsPage() { return <><PageHero eyebrow="Concern-led discovery" title={<>Start with how you<br /><em>want to feel.</em></>} copy="You do not need to know a product name. Start with the change you are considering and compare the most relevant routes." index="03" /><section className="inner-section shell"><SectionIntro eyebrow="Choose your concern" title={<>Six starting points.<br /><em>One bespoke plan.</em></>} /><ConcernGrid /></section><FinalCTA /></>; }
