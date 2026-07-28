"use client";

import { Check, CreditCard, ExternalLink, LayoutDashboard, MessageSquareQuote, Settings2, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { booking } from "@/lib/content";

type Tab = "Overview" | "Prices" | "Reviews" | "Clinic settings";

const services = [
  ["Russian Lip Filler 0.7ML", 149],
  ["Facial Balancing", 249],
  ["Anti-Wrinkle · 3 areas", 199],
  ["Skin Booster", 119],
  ["Microneedling", 65],
  ["Laser · large area", 90],
] as const;

const pendingReviews = [
  ["Hannah P.", "The most thoughtful consultation I’ve ever had."],
  ["Megan S.", "My lips look like me, just more polished."],
  ["Zara K.", "The clinic was calm, professional and spotless."],
] as const;

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [notice, setNotice] = useState("");
  const [prices, setPrices] = useState<number[]>(() => {
    if (typeof window === "undefined") return services.map(([, price]) => price);
    try {
      const parsed = JSON.parse(window.localStorage.getItem("injectox-admin-prices") ?? "null") as unknown;
      return Array.isArray(parsed) && parsed.length === services.length && parsed.every((value) => typeof value === "number" && Number.isFinite(value) && value >= 0) ? parsed : services.map(([, price]) => price);
    } catch {
      return services.map(([, price]) => price);
    }
  });

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  function savePrices() {
    window.localStorage.setItem("injectox-admin-prices", JSON.stringify(prices));
    showNotice("Pricing changes saved in this browser. Connect a production content store to publish them across devices.");
  }

  const navItems: [Tab, typeof LayoutDashboard][] = [["Overview", LayoutDashboard], ["Prices", CreditCard], ["Reviews", MessageSquareQuote], ["Clinic settings", Settings2]];

  return (
    <section className="admin-shell shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span className="wordmark-mark">I</span><span>INJECTOX<br /><small>STUDIO ADMIN</small></span></div>
        <nav aria-label="Admin navigation">
          {navItems.map(([item, Icon]) => <button className={tab === item ? "is-active" : ""} key={item} onClick={() => setTab(item)} type="button"><Icon size={15} />{item}</button>)}
        </nav>
        <div className="admin-sidebar-note"><Sparkles size={15} /><span><b>Faces connected</b><small>Clients book, pay and complete consent in Faces.</small></span></div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar"><div><span className="eyebrow">Private workspace</span><h1>{tab}</h1></div><div className="admin-user"><span>FK</span><div><b>Fatima Khan</b><small>Owner & practitioner</small></div><button type="button" onClick={logout}>Sign out</button></div></header>
        {notice && <div className="admin-notice" role="status"><Check size={15} />{notice}</div>}

        {tab === "Overview" && <Overview onNavigate={setTab} />}
        {tab === "Prices" && <Prices prices={prices} setPrices={setPrices} savePrices={savePrices} />}
        {tab === "Reviews" && <Reviews showNotice={showNotice} />}
        {tab === "Clinic settings" && <Settings />}
      </div>
    </section>
  );
}

function Overview({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return <>
    <div className="admin-metrics"><div><small>Public treatment pages</small><strong>8</strong><span>Ready to review</span></div><div><small>Pricing groups</small><strong>10</strong><span>Published catalogue</span></div><div><small>Reviews published</small><strong>6</strong><span>Clinic-approved stories</span></div><div><small>Booking provider</small><strong>1</strong><span>Faces connected</span></div></div>
    <div className="admin-grid"><div className="admin-card admin-calendar"><div className="admin-card-heading"><div><span className="eyebrow">Content health</span><h2>Everything in one place.</h2></div></div><div className="admin-health-list"><div><span><b>Prices</b><small>Review the public starting prices and labels.</small></span><button type="button" onClick={() => onNavigate("Prices")}>Edit prices <span>↗</span></button></div><div><span><b>Reviews</b><small>Moderate new client submissions before publishing.</small></span><button type="button" onClick={() => onNavigate("Reviews")}>Review queue <span>↗</span></button></div><div><span><b>Clinic details</b><small>Keep the booking destination and contact details current.</small></span><button type="button" onClick={() => onNavigate("Clinic settings")}>Open settings <span>↗</span></button></div></div></div><div className="admin-card admin-quick"><span className="eyebrow">Quick actions</span><h2>Keep the clinic moving.</h2><button type="button" onClick={() => onNavigate("Prices")}>Edit pricing <span>↗</span></button><button type="button" onClick={() => onNavigate("Reviews")}>Review submissions <span>↗</span></button><a href={booking.currentDiary} target="_blank" rel="noreferrer">Open Faces booking <ExternalLink size={13} /></a></div></div>
  </>;
}

function Prices({ prices, setPrices, savePrices }: { prices: number[]; setPrices: React.Dispatch<React.SetStateAction<number[]>>; savePrices: () => void }) {
  return <div className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow">Content management</span><h2>Public starting prices.</h2></div><button className="button button-dark" onClick={savePrices} type="button">Save changes</button></div><p className="admin-muted">These are the highlighted prices used for quick edits. The live catalogue remains the source of truth for the full treatment list.</p><div className="admin-price-list">{services.map(([name], index) => <label key={name}><span>{name}<small>Visible on treatment and pricing pages</small></span><input min="0" step="1" value={prices[index]} onChange={(event) => setPrices((current) => current.map((price, priceIndex) => priceIndex === index ? Math.max(0, Number(event.target.value) || 0) : price))} type="number" aria-label={`${name} price`} /><b>£</b></label>)}</div></div>;
}

function Reviews({ showNotice }: { showNotice: (message: string) => void }) {
  return <div className="admin-card"><span className="eyebrow">Moderation queue</span><h2>Client reviews.</h2><p className="admin-muted">Approve only reviews you have permission to publish. Approved entries can then be added to the public reviews content.</p><div className="admin-review-queue">{pendingReviews.map(([name, quote]) => <div key={quote}><span><b>{name}</b><small>Submitted recently · client review</small></span><p>“{quote}”</p><button type="button" onClick={() => showNotice("Review approved and queued for publishing.")}><Check size={14} />Approve</button><button type="button" onClick={() => showNotice("Review removed from the moderation queue.")}><X size={14} />Dismiss</button></div>)}</div></div>;
}

function Settings() {
  return <div className="admin-card"><span className="eyebrow">Clinic controls</span><h2>Simple, external booking.</h2><p className="admin-muted">Faces is the live source for availability, consent, deposits, payments and appointment confirmations. The website does not store or manage appointments.</p><div className="admin-settings"><label><span>Faces booking link</span><input value={booking.currentDiary} readOnly /></label><label><span>Clinic contact email</span><input defaultValue="hello@injectoxclinic.co.uk" type="email" /></label><label><span>WhatsApp number</span><input value="07930 912949" readOnly /></label></div><a className="button button-dark" href={booking.currentDiary} target="_blank" rel="noreferrer">Open Faces booking <ExternalLink size={15} /></a></div>;
}
