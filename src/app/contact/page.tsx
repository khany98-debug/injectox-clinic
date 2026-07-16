import type { Metadata } from "next";
import { Camera, MapPin } from "lucide-react";
import { BookingSteps, Button, FinalCTA, PageHero } from "@/components/ui";
import { booking, clinic } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Contact Injectox Clinic or find the Salford clinic serving Greater Manchester." };

export default function ContactPage() {
  return <>
    <PageHero eyebrow="Talk to Injectox" title={<>Questions are<br /><em>always welcome.</em></>} copy="Book directly, start with a free consultation or message the clinic on Instagram before deciding." index="10" />
    <section className="contact-layout shell">
      <div className="contact-card">
        <span className="eyebrow">Fastest route</span>
        <h2>Ready to choose a time?</h2>
        <p>Use the on-site booking studio to explore every treatment, price and preferred appointment without leaving Injectox.</p>
        <Button href={booking.treatment} variant="light">Book on this site</Button>
        <Button href={booking.instagram} variant="line" external>Message on Instagram</Button>
      </div>
      <div className="contact-details">
        <div>
          <small>Visit</small>
          <h3><MapPin size={20} /> {clinic.location}</h3>
          <p>Injectox is based inside Skin Clinic MCR at Waters Edge Business Park on Modwen Road, Salford. Your confirmation email includes full arrival details.</p>
          <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Waters+Edge+Business+Park+Modwen+Road+Salford" target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
        </div>
        <div><small>Social</small><h3><Camera size={20} /> @injectoxclinic</h3><p>Follow current results, educational content and clinic updates.</p></div>
        <BookingSteps />
      </div>
    </section>
    <FinalCTA />
  </>;
}
