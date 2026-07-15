"use client";

import { CalendarDays, Check, ChevronDown, Clock3, CreditCard, LayoutDashboard, Settings2, Sparkles, Users, X } from "lucide-react";
import { useMemo, useState } from "react";

type Booking = { id: string; client: string; service: string; date: string; time: string; status: "Confirmed" | "Pending" | "Completed"; amount: number };

const initialBookings: Booking[] = [
  { id: "IC-4K8P2Q", client: "Sophie M.", service: "Russian Lip — 0.7ml", date: "18 Jul 2026", time: "10:00", status: "Confirmed", amount: 160 },
  { id: "IC-7D2L9X", client: "Amelia R.", service: "Skin Booster", date: "18 Jul 2026", time: "13:00", status: "Pending", amount: 119 },
  { id: "IC-1H6N4V", client: "Layla H.", service: "Laser Hair Removal", date: "19 Jul 2026", time: "11:30", status: "Confirmed", amount: 90 },
  { id: "IC-9Q5B7M", client: "Chloe B.", service: "Facial Balancing", date: "16 Jul 2026", time: "14:30", status: "Completed", amount: 249 },
];

export function AdminDashboard() {
  const [bookings, setBookings] = useState(initialBookings);
  const [tab, setTab] = useState("Overview");
  const [notice, setNotice] = useState("");
  const revenue = useMemo(() => bookings.reduce((sum, item) => sum + item.amount, 0), [bookings]);

  function updateBooking(id: string, status: Booking["status"]) {
    setBookings((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    setNotice(`Booking ${id} updated to ${status.toLowerCase()}.`);
    window.setTimeout(() => setNotice(""), 3000);
  }

  return (
    <section className="admin-shell shell">
      <div className="admin-sidebar">
        <div className="admin-brand"><span className="wordmark-mark">I</span><span>INJECTOX<br /><small>STUDIO ADMIN</small></span></div>
        <nav aria-label="Admin navigation">
          {["Overview", "Bookings", "Services & pricing", "Reviews", "Settings"].map((item) => <button className={tab === item ? "is-active" : ""} key={item} onClick={() => setTab(item)}>{item === "Overview" ? <LayoutDashboard size={15} /> : item === "Bookings" ? <CalendarDays size={15} /> : item === "Reviews" ? <Users size={15} /> : item === "Settings" ? <Settings2 size={15} /> : <CreditCard size={15} />}{item}</button>)}
        </nav>
        <div className="admin-sidebar-note"><Sparkles size={15} /><span><b>Test mode</b><small>Stripe is ready for sandbox keys.</small></span></div>
      </div>
      <div className="admin-main">
        <header className="admin-topbar"><div><span className="eyebrow">Private workspace</span><h1>{tab}</h1></div><div className="admin-user"><span>FK</span><div><b>Fatima Khan</b><small>Owner & practitioner</small></div><ChevronDown size={14} /></div></header>
        {notice && <div className="admin-notice" role="status"><Check size={15} />{notice}</div>}
        {tab === "Overview" && <>
          <div className="admin-metrics"><div><small>Upcoming bookings</small><strong>{bookings.filter((item) => item.status !== "Completed").length}</strong><span>Next 7 days</span></div><div><small>Projected revenue</small><strong>£{revenue}</strong><span>From current diary</span></div><div><small>Reviews to approve</small><strong>3</strong><span>Awaiting moderation</span></div><div><small>Completion rate</small><strong>96%</strong><span>Last 30 days</span></div></div>
          <div className="admin-grid"><div className="admin-card admin-calendar"><div className="admin-card-heading"><div><span className="eyebrow">Your diary</span><h2>Upcoming appointments</h2></div><button className="admin-link" onClick={() => setTab("Bookings")}>View all <span>↗</span></button></div><BookingTable bookings={bookings.slice(0, 3)} onUpdate={updateBooking} /></div><div className="admin-card admin-quick"><span className="eyebrow">Quick actions</span><h2>Keep the clinic moving.</h2><button onClick={() => setTab("Services & pricing")}>Edit pricing <span>↗</span></button><button onClick={() => setTab("Reviews")}>Review submissions <span>↗</span></button><a href="/book">Preview booking flow <span>↗</span></a></div></div>
        </>}
        {tab === "Bookings" && <div className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow">Diary management</span><h2>Bookings, reschedules & cancellations</h2></div><button className="button button-dark" onClick={() => setNotice("New booking link copied to clipboard.")}>Create booking</button></div><BookingTable bookings={bookings} onUpdate={updateBooking} /></div>}
        {tab === "Services & pricing" && <div className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow">Content management</span><h2>Services & pricing</h2></div><button className="button button-dark" onClick={() => setNotice("Pricing changes are saved in this preview.")}>Save changes</button></div><div className="admin-price-list">{["Russian Lip — 0.7ml", "Facial Balancing", "Anti-Wrinkle · 3 areas", "Skin Booster", "Microneedling", "Laser · large area"].map((item, index) => <label key={item}><span>{item}<small>Visible on booking and pricing pages</small></span><input defaultValue={[160, 249, 199, 119, 65, 90][index]} type="number" aria-label={`${item} price`} /><b>£</b></label>)}</div></div>}
        {tab === "Reviews" && <div className="admin-card"><span className="eyebrow">Moderation queue</span><h2>Client reviews</h2><p className="admin-muted">Approve only reviews you have permission to publish. Approved entries can be surfaced on the public reviews page.</p><div className="admin-review-queue">{["The most thoughtful consultation I’ve ever had.", "My lips look like me, just more polished.", "The clinic was calm, professional and spotless."].map((quote, index) => <div key={quote}><span><b>{["Hannah P.", "Megan S.", "Zara K."][index]}</b><small>Submitted today · {index === 1 ? "Russian lips" : "Aesthetics"}</small></span><p>“{quote}”</p><button onClick={() => setNotice("Review approved and queued for publishing.")}><Check size={14} />Approve</button><button onClick={() => setNotice("Review removed from the moderation queue.")}><X size={14} />Dismiss</button></div>)}</div></div>}
        {tab === "Settings" && <div className="admin-card"><span className="eyebrow">Clinic controls</span><h2>Booking & payments</h2><div className="admin-settings"><label><span>Clinic booking email</span><input defaultValue="hello@injectoxclinic.co.uk" type="email" /></label><label><span>Stripe mode</span><select defaultValue="test"><option value="test">Test / sandbox</option><option value="live">Live</option></select></label><label><span>Deposit amount</span><input defaultValue="20" type="number" /></label><label><span>WhatsApp number</span><input placeholder="Add clinic number" /></label></div><button className="button button-dark" onClick={() => setNotice("Clinic settings saved locally for this preview.")}>Save settings</button></div>}
      </div>
    </section>
  );
}

function BookingTable({ bookings, onUpdate }: { bookings: Booking[]; onUpdate: (id: string, status: Booking["status"]) => void }) {
  return <div className="admin-table"><div className="admin-table-row admin-table-head"><span>Client</span><span>Treatment</span><span>Appointment</span><span>Status</span><span>Amount</span><span /></div>{bookings.map((item) => <div className="admin-table-row" key={item.id}><span><b>{item.client}</b><small>{item.id}</small></span><span>{item.service}</span><span><b>{item.date}</b><small><Clock3 size={12} /> {item.time}</small></span><span><em className={`admin-status ${item.status.toLowerCase()}`}>{item.status}</em></span><span>£{item.amount}</span><span><select value={item.status} onChange={(event) => onUpdate(item.id, event.target.value as Booking["status"])} aria-label={`Update ${item.client} booking`}><option>Confirmed</option><option>Pending</option><option>Completed</option></select></span></div>)}</div>;
}
