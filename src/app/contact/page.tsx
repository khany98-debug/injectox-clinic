import type { Metadata } from "next";
import { Camera, MapPin } from "lucide-react";
import { BookingSteps, Button, FinalCTA, PageHero } from "@/components/ui";
import { EditableText } from "@/components/dev/editable-text";
import { booking, clinic, pages } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Contact Injectox Clinic or find the Salford clinic serving Greater Manchester." };

export default function ContactPage() {
  const c = pages.contact;
  return <>
    <PageHero
      eyebrow={c.heroEyebrow}
      eyebrowPath="pages.contact.heroEyebrow"
      title={<><EditableText as="span" path="pages.contact.heroTitleLine1" value={c.heroTitleLine1} /><br /><em><EditableText as="span" path="pages.contact.heroTitleLine2" value={c.heroTitleLine2} /></em></>}
      copy={c.heroCopy}
      copyPath="pages.contact.heroCopy"
      index="10"
    />
    <section className="contact-layout shell">
      <div className="contact-card">
        <span className="eyebrow"><EditableText path="pages.contact.cardEyebrow" value={c.cardEyebrow} /></span>
        <h2><EditableText as="span" path="pages.contact.cardTitle" value={c.cardTitle} /></h2>
        <p><EditableText path="pages.contact.cardCopy" value={c.cardCopy} /></p>
        <Button href={booking.treatment} variant="light">Book on this site</Button>
        <Button href={booking.instagram} variant="line" external>Message on Instagram</Button>
      </div>
      <div className="contact-details">
        <div>
          <small>Visit</small>
          <h3><MapPin size={20} /> <EditableText as="span" path="clinic.location" value={clinic.location} /></h3>
          <p><EditableText path="pages.contact.visitCopy" value={c.visitCopy} /></p>
          <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Waters+Edge+Business+Park+Modwen+Road+Salford" target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
        </div>
        <div><small>Social</small><h3><Camera size={20} /> @injectoxclinic</h3><p><EditableText path="pages.contact.socialCopy" value={c.socialCopy} /></p></div>
        <BookingSteps />
      </div>
    </section>
    <FinalCTA />
  </>;
}
