"use client";

import { Camera, Mail, MapPin } from "lucide-react";
import { BookingSteps } from "@/components/ui";
import { useSiteContent } from "@/components/site-content-provider";
import { clinic } from "@/lib/content";

export function ContactDetails() {
  const { clinic: clinicSettings } = useSiteContent();
  const email = clinicSettings.contactEmail;
  return <div className="contact-details">
    <div>
      <small>Visit</small>
      <h3><MapPin size={20} /> {clinic.location}</h3>
      <p>Injectox is based inside Skin Clinic MCR at Waters Edge Business Park on Modwen Road, Salford. Your confirmation email includes full arrival details.</p>
      <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Waters+Edge+Business+Park+Modwen+Road+Salford" target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
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
