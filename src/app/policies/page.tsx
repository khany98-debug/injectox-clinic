import type { Metadata } from "next";
import { FinalCTA, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Clinic Policies", description: "Injectox Clinic booking, consultation, age, laser and cancellation policy guidance." };
const policies = [
  ["01", "Adults only", "Injectable treatments are presented for clients aged 18 and over. Valid photo ID may be requested."],
  ["02", "Consultation & suitability", "Treatment is subject to assessment and medical suitability. A booking does not guarantee that treatment will proceed."],
  ["03", "Deposits", "Deposits and any remaining balance are handled through the external booking provider. The current terms shown at checkout apply."],
  ["04", "Cancellations", "Please review the cancellation and rescheduling window shown during booking. Late changes and non-attendance may affect your deposit."],
  ["05", "Laser patch testing", "A consultation and patch test may be required before laser treatment. Follow all preparation guidance supplied by the clinic."],
  ["06", "Results & aftercare", "Results and recovery vary. Follow your personalised aftercare and contact the clinic promptly with any concerns."],
] as const;
export default function PoliciesPage() { return <><PageHero eyebrow="Policy before pressure" title={<>The details that keep<br /><em>care feeling clear.</em></>} copy="This page summarises key principles. The provider terms displayed during your live booking are the final terms for that appointment." index="09" /><section className="policy-list shell">{policies.map(([n,title,copy]) => <article className="policy-card" key={n}><span>{n}</span><h2>{title}</h2><p>{copy}</p></article>)}</section><FinalCTA /></>; }
