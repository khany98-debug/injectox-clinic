"use client";

import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { BookingSteps } from "@/components/ui";
import { useSiteContent } from "@/components/site-content-provider";
import { booking, clinic } from "@/lib/content";

export function ContactDetails() {
  const { clinic: clinicSettings } = useSiteContent();
  const email = clinicSettings.contactEmail;
  return <div className="contact-details">
    <div>
      <small>Visit</small>
      <h3><MapPin size={20} /> {clinic.location}</h3>
      <p>Injectox is based inside Skin Clinic MCR at Waters Edge Business Park on Modwen Road, Salford {clinic.postcode}. Free parking is available on site. Your confirmation email includes full arrival details.</p>
      <p><b>Opening hours</b><br />Monday, Wednesday, Friday, Saturday &amp; Sunday · 12pm–6pm</p>
      <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Skin+Clinic+MCR,+Waters+Edge+Business+Park+Modwen+Road+Salford,+M5+3EZ" target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
    </div>
    <div>
      <small>WhatsApp</small>
      <h3><Phone size={20} /> {clinic.phone}</h3>
      <p>Message Fatima with a question before booking.</p>
      <a className="text-link" href={booking.whatsapp} target="_blank" rel="noreferrer">Message on WhatsApp ↗</a>
    </div>
    <div>
      <small>Email</small>
      <h3><Mail size={20} /> {email}</h3>
      <p>For questions before booking, email the clinic directly.</p>
      <a className="text-link" href={`mailto:${email}`}>Email Injectox ↗</a>
    </div>
    <div><small>Social</small><h3><Camera size={20} /> @injectoxclinic</h3><p>Follow current results, educational content and clinic updates.</p></div>
    <BookingSteps />
  </div>;
}
