import Link from "next/link";
import { Camera, MapPin } from "lucide-react";
import { ClinicLogo } from "@/components/clinic-logo";
import { booking, clinic } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand-stack">
            <ClinicLogo />
          </div>
          <p className="footer-strap">Aesthetics,<br /><em>done honestly.</em></p>
        </div>
        <div className="footer-links">
          <div><b>Discover</b><Link prefetch={false} href="/treatments">Treatments</Link><Link prefetch={false} href="/concerns">Concerns</Link><Link prefetch={false} href="/pricing">Pricing</Link><Link prefetch={false} href="/gallery">Results</Link></div>
          <div><b>Clinic</b><Link prefetch={false} href="/about">About</Link><Link prefetch={false} href="/reviews">Reviews</Link><Link prefetch={false} href="/faq">FAQ</Link><Link prefetch={false} href="/contact">Contact</Link></div>
          <div><b>Essentials</b><Link prefetch={false} href="/policies">Policies</Link><Link prefetch={false} href="/privacy-policy">Privacy</Link><Link prefetch={false} href="/terms">Terms</Link><Link prefetch={false} href="/cookies">Cookies</Link></div>
        </div>
      </div>
      <div className="footer-location"><MapPin size={17} /><span>{clinic.location}, {clinic.postcode}<br />Open {clinic.openingHoursLabel} · Free parking on site<br />WhatsApp {clinic.phone}</span></div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Injectox Clinic</span>
        <span>Salford · Greater Manchester</span>
        <a href={booking.instagram} target="_blank" rel="noreferrer" aria-label="Injectox Clinic on Instagram"><Camera size={18} /> @injectoxclinic</a>
      </div>
    </footer>
  );
}
