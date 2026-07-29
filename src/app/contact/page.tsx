import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact-details";
import { Button, FinalCTA, PageHero } from "@/components/ui";
import { booking } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Contact Injectox Clinic or find the Salford clinic serving Greater Manchester." };

export default function ContactPage() {
  return <>
    <PageHero eyebrow="Talk to Injectox" title={<>Questions are<br /><em>always welcome.</em></>} copy="Book directly, start with a free consultation or message the clinic on Instagram before deciding." index="10" />
    <section className="contact-layout shell">
      <div className="contact-card">
        <span className="eyebrow">Fastest route</span>
        <h2>Ready to choose a time?</h2>
        <p>Choose your treatment, date and time securely through Faces, where your consent and appointment details stay together.</p>
        <Button href={booking.currentDiary} variant="light" external>Book through Faces</Button>
        <Button href={booking.instagram} variant="line" external>Message on Instagram</Button>
      </div>
      <ContactDetails />
    </section>
    <FinalCTA />
  </>;
}
