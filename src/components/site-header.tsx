"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ClinicLogo } from "@/components/clinic-logo";
import { booking } from "@/lib/content";

const nav = [
  ["Treatments", "/treatments"],
  ["Concerns", "/concerns"],
  ["Results", "/gallery"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["Address", "/#find-the-clinic"],
  ["FAQ", "/faq"],
] as const;

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
          {nav.map(([label, href]) => (
            <Link key={href} href={href} data-active={pathname.startsWith(href)}>{label}</Link>
          ))}
        </nav>
        <a className="header-book" href={booking.currentDiary} target="_blank" rel="noreferrer">
          <span className="header-book-label">Book now</span>
          <span className="header-book-icon" aria-hidden="true"><ArrowUpRight size={14} strokeWidth={1.7} /></span>
        </a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`}>
        <span className="eyebrow">Menu</span>
        {nav.map(([label, href], i) => <Link key={href} href={href} onClick={() => setOpen(false)}><small>0{i + 1}</small>{label}</Link>)}
        <Link href="/reviews" onClick={() => setOpen(false)}><small>06</small>Reviews</Link>
        <Link href="/contact" onClick={() => setOpen(false)}><small>07</small>Contact</Link>
        <a className="button button-light" href={booking.currentDiary} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Book now</a>
      </div>
    </>
  );
}
