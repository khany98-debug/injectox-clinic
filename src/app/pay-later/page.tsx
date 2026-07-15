import type { Metadata } from "next";
import { Button, PageHero } from "@/components/ui";
import { booking } from "@/lib/content";

export const metadata: Metadata = { title: "Payment Flexibility", description: "Ask Injectox Clinic about current pay-later options and provider terms." };
export default function PayLaterPage() { return <><PageHero eyebrow="Payment flexibility" title={<>Plan the result.<br /><em>Understand the terms.</em></>} copy="The public booking catalogue lists a PAYL8R service charge. Finance availability, eligibility, rates and terms must be confirmed directly before you commit." index="13" /><section className="coming-soon shell"><div><span className="eyebrow">Clarity first</span><h1>Flexible,<br /><em>never vague.</em></h1><p>This site does not advertise unverified credit terms. Ask the clinic for the current regulated provider information, total cost and eligibility criteria.</p><Button href={booking.instagram} external>Ask about instalments</Button></div></section></>; }
