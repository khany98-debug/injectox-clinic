import type { Metadata } from "next";
import { ConcernGrid, FinalCTA, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Concerns", description: "Find the right aesthetics or skin treatment by starting with the concern you want to address." };
export default function ConcernsPage() { return <><PageHero compact eyebrow="Concern-led discovery" title={<>Start with how you<br /><em>want to feel.</em></>} copy="Choose the change you are considering. We will show you the most relevant treatment routes." index="03" /><section className="inner-section shell concern-index"><div className="concern-index-intro"><span className="eyebrow">Choose your concern</span><p>Six clear starting points. Select one to compare suitable options.</p></div><ConcernGrid /></section><FinalCTA /></>; }
