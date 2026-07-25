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
          <div><b>Discover</b><Link href="/treatments">Treatments</Link><Link href="/concerns">Concerns</Link><Link href="/pricing">Pricing</Link><Link href="/gallery">Results</Link></div>
          <div><b>Clinic</b><Link href="/about">About</Link><Link href="/reviews">Reviews</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link></div>
          <div><b>Essentials</b><Link href="/policies">Policies</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link><Link href="/admin">Clinic admin</Link></div>
        </div>
      </div>
      <div className="footer-location"><MapPin size={17} /><span>{clinic.location}</span></div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Injectox Clinic</span>
        <span>Salford · Greater Manchester</span>
        <a href={booking.instagram} target="_blank" rel="noreferrer" aria-label="Injectox Clinic on Instagram"><Camera size={18} /> @injectoxclinic</a>
      </div>
    </footer>
  );
}
