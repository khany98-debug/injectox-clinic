import Link from "next/link";
import { Camera, MapPin } from "lucide-react";
import { ClinicLogo } from "@/components/clinic-logo";
import { EditableText } from "@/components/dev/editable-text";
import { booking, clinic, siteChrome } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand-stack">
            <ClinicLogo />
          </div>
          <p className="footer-strap"><EditableText as="span" path="siteChrome.footerStrapLine1" value={siteChrome.footerStrapLine1} /><br /><em><EditableText as="span" path="siteChrome.footerStrapLine2" value={siteChrome.footerStrapLine2} /></em></p>
        </div>
        <div className="footer-links">
          <div><b>Discover</b><Link href="/treatments">Treatments</Link><Link href="/concerns">Concerns</Link><Link href="/pricing">Pricing</Link><Link href="/gallery">Results</Link></div>
          <div><b>Clinic</b><Link href="/about">About</Link><Link href="/reviews">Reviews</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link></div>
          <div><b>Essentials</b><Link href="/policies">Policies</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link><Link href="/admin">Clinic admin</Link></div>
        </div>
      </div>
      <div className="footer-location"><MapPin size={17} /><span><EditableText path="clinic.location" value={clinic.location} /></span></div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Injectox Clinic</span>
        <span>Salford · Greater Manchester</span>
        <a href={booking.instagram} target="_blank" rel="noreferrer" aria-label="Injectox Clinic on Instagram"><Camera size={18} /> @injectoxclinic</a>
      </div>
    </footer>
  );
}
