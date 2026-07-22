"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ClinicLogo } from "@/components/clinic-logo";
import { EditableText } from "@/components/dev/editable-text";
import { booking, siteChrome } from "@/lib/content";

const navHrefs = ["/treatments", "/concerns", "/gallery", "/pricing", "/about"] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHomeHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", open);
    return () => document.body.classList.remove("menu-is-open");
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${onHomeHero ? "on-hero" : "on-light-page"} ${open ? "menu-open" : ""}`}>
        <Link className="wordmark" href="/" aria-label="Injectox Clinic home" onClick={() => setOpen(false)}>
          <ClinicLogo showClinic={false} />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navHrefs.map((href, i) => (
            <Link key={href} href={href} data-active={pathname.startsWith(href)}><EditableText path={`siteChrome.nav.${i}`} value={siteChrome.nav[i]} /></Link>
          ))}
        </nav>
        <Link className="header-book" href={booking.treatment}>
          <span className="header-book-label">Book now</span>
          <span className="header-book-icon" aria-hidden="true"><ArrowUpRight size={14} strokeWidth={1.7} /></span>
        </Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`}>
        <span className="eyebrow">Menu</span>
        {navHrefs.map((href, i) => <Link key={href} href={href} onClick={() => setOpen(false)}><small>0{i + 1}</small><EditableText path={`siteChrome.nav.${i}`} value={siteChrome.nav[i]} /></Link>)}
        <Link href="/reviews" onClick={() => setOpen(false)}><small>06</small>Reviews</Link>
        <Link href="/contact" onClick={() => setOpen(false)}><small>07</small>Contact</Link>
        <Link className="button button-light" href={booking.treatment} onClick={() => setOpen(false)}>Book now</Link>
      </div>
    </>
  );
}
