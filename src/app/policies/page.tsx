import type { Metadata } from "next";
import { FinalCTA, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Clinic Policies & Booking Information", description: "Injectox Clinic booking, consultation, age, laser and cancellation policy guidance.", path: "/policies" });
const policies = [
  ["01", "Adults only", "Injectable treatments are presented for clients aged 18 and over. Valid photo ID may be requested."],
  ["02", "Consultation & suitability", "Treatment is subject to assessment and medical suitability. A booking does not guarantee that treatment will proceed."],
  ["03", "Deposits & cancellations", "A £15 deposit secures your appointment. If you give at least 48 hours’ notice, I’ll move your deposit to your new appointment. With less notice, the deposit is lost. If I need to cancel, or you’re not suitable for treatment at your consultation, your deposit is refunded."],
  ["04", "Lateness", "If you arrive more than 15 minutes late, I will try my best to still see you, but this can’t be guaranteed. If I’m unable to fit you in, you’ll lose your deposit and need to rebook."],
  ["05", "Pregnancy & breastfeeding", "I’m unable to treat clients who are pregnant or breastfeeding. This includes laser treatments."],
  ["06", "Top-ups & reviews", "Tear trough top-ups within 2 weeks of treatment can be booked for £20. Anti-wrinkle treatment includes a two-week review appointment."],
  ["07", "Laser patch testing", "A consultation and patch test are required before laser treatment. For the free laser promotion, the patch test must be completed 48 hours before treatment. Follow all preparation guidance supplied by the clinic."],
  ["08", "Results & aftercare", "Results and recovery vary. Follow your personalised aftercare and contact the clinic promptly with any concerns."],
] as const;
export default function PoliciesPage() { return <><PageHero eyebrow="Policy before pressure" title={<>The details that keep<br /><em>care feeling clear.</em></>} copy="This page summarises key principles. The provider terms displayed during your live booking are the final terms for that appointment." index="09" /><section className="policy-list shell">{policies.map(([n,title,copy]) => <article className="policy-card" key={n}><span>{n}</span><h2>{title}</h2><p>{copy}</p></article>)}</section><FinalCTA /></>; }
