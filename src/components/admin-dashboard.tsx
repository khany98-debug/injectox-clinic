"use client";

import { Check, CreditCard, ExternalLink, LayoutDashboard, MessageSquareQuote, Settings2, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { booking, pricing as defaultPricing, treatments as defaultTreatments, type PriceGroup, type Treatment } from "@/lib/content";
import type { ContentOverrides, ReviewSubmission } from "@/lib/site-types";

type Tab = "Overview" | "Prices" | "Treatments" | "Reviews" | "Website copy" | "Clinic settings";
const defaultContent: ContentOverrides = {
  copy: {
    treatmentsHeroTitle: "Precision,\nThe right treatment.\nChosen for you,",
    treatmentsHeroDescription: "Explore signature injectables, advanced skin, laser and wellness options. Every route begins with suitability—not pressure.",
    faqHeroTitle: "Clear answers.\nYour questions, answered simply.",
    faqHeroDescription: "Everything first-time and returning clients usually want to know before booking.",
  },
  treatments: {},
  pricing: {},
};

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [notice, setNotice] = useState("");
  const [content, setContent] = useState<ContentOverrides>(defaultContent);
  const [reviews, setReviews] = useState<ReviewSubmission[]>([]);
  const [persistent, setPersistent] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch("/api/admin/content", { cache: "no-store" }).then((r) => r.json()), fetch("/api/admin/reviews", { cache: "no-store" }).then((r) => r.json())])
      .then(([contentPayload, reviewPayload]) => {
        if (contentPayload.content) setContent({ ...defaultContent, ...contentPayload.content, copy: { ...defaultContent.copy, ...contentPayload.content.copy } });
        if (typeof contentPayload.persistent === "boolean") setPersistent(contentPayload.persistent);
        if (Array.isArray(reviewPayload.reviews)) setReviews(reviewPayload.reviews);
      })
      .catch(() => setNotice("The dashboard could not load its latest data. Refresh and try again."))
      .finally(() => setLoading(false));
  }, []);

  function showNotice(message: string) { setNotice(message); window.setTimeout(() => setNotice(""), 4000); }

  async function saveContent(next = content) {
    const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: next }) });
    const payload = await response.json() as { persistent?: boolean; error?: string };
    if (!response.ok) throw new Error(payload.error || "Could not save changes.");
    if (typeof payload.persistent === "boolean") setPersistent(payload.persistent);
    showNotice(payload.persistent ? "Changes saved and published across the website." : "Changes saved for this server, but persistent storage is not connected yet.");
  }

  async function updateReview(id: string, status: "approved" | "dismissed") {
    const response = await fetch("/api/admin/reviews", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    const payload = await response.json() as { reviews?: ReviewSubmission[]; error?: string };
    if (!response.ok) { showNotice(payload.error || "Could not update review."); return; }
    setReviews(payload.reviews ?? reviews);
    showNotice(status === "approved" ? "Review approved. Add it to the published stories when ready." : "Review dismissed.");
  }

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.reload(); }
  const navItems: [Tab, typeof LayoutDashboard][] = [["Overview", LayoutDashboard], ["Prices", CreditCard], ["Treatments", Sparkles], ["Reviews", MessageSquareQuote], ["Website copy", Settings2], ["Clinic settings", Settings2]];
  const pending = reviews.filter((review) => review.status === "pending").length;

  return <section className="admin-shell shell">
    <aside className="admin-sidebar"><div className="admin-brand"><span className="wordmark-mark">I</span><span>INJECTOX<br /><small>STUDIO ADMIN</small></span></div><nav aria-label="Admin navigation">{navItems.map(([item, Icon]) => <button className={tab === item ? "is-active" : ""} key={item} onClick={() => setTab(item)} type="button"><Icon size={15} />{item}{item === "Reviews" && pending > 0 && <i className="admin-nav-count">{pending}</i>}</button>)}</nav><div className="admin-sidebar-note"><Sparkles size={15} /><span><b>Faces connected</b><small>Clients book, pay and complete consent in Faces.</small></span></div></aside>
    <div className="admin-main"><header className="admin-topbar"><div><span className="eyebrow">Private workspace</span><h1>{tab}</h1></div><div className="admin-user"><span>FK</span><div><b>Fatima Khan</b><small>Owner & practitioner</small></div><button type="button" onClick={logout}>Sign out</button></div></header>{!persistent && <div className="admin-notice" role="status"><Settings2 size={15} />Persistent content storage is not connected. Add KV_REST_API_URL and KV_REST_API_TOKEN in Vercel so edits survive deployments and are shared across devices.</div>}{notice && <div className="admin-notice" role="status"><Check size={15} />{notice}</div>}{loading ? <div className="admin-card"><p className="admin-muted">Loading the live clinic content…</p></div> : <>{tab === "Overview" && <Overview pending={pending} onNavigate={setTab} persistent={persistent} />}{tab === "Prices" && <Prices content={content} setContent={setContent} saveContent={saveContent} />}{tab === "Treatments" && <Treatments content={content} setContent={setContent} saveContent={saveContent} />}{tab === "Reviews" && <Reviews reviews={reviews} updateReview={updateReview} />}{tab === "Website copy" && <WebsiteCopy content={content} setContent={setContent} saveContent={saveContent} />}{tab === "Clinic settings" && <Settings />}</>}</div>
  </section>;
}

function Overview({ pending, onNavigate, persistent }: { pending: number; onNavigate: (tab: Tab) => void; persistent: boolean }) { return <><div className="admin-metrics"><div><small>Public treatments</small><strong>{defaultTreatments.length}</strong><span>Managed catalogue</span></div><div><small>Pricing items</small><strong>{defaultPricing.reduce((total, group) => total + group.items.length, 0)}</strong><span>Across all groups</span></div><div><small>Reviews waiting</small><strong>{pending}</strong><span>Needs moderation</span></div><div><small>Booking provider</small><strong>1</strong><span>Faces connected</span></div></div><div className="admin-grid"><div className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow">Content health</span><h2>Everything in one place.</h2></div></div><div className="admin-health-list"><div><span><b>Prices</b><small>Edit any price, name or duration on the public catalogue.</small></span><button type="button" onClick={() => onNavigate("Prices")}>Edit prices <span>↗</span></button></div><div><span><b>Treatments</b><small>Update treatment cards and treatment-page descriptions.</small></span><button type="button" onClick={() => onNavigate("Treatments")}>Edit treatments <span>↗</span></button></div><div><span><b>Reviews</b><small>Approve or dismiss submissions from the live form.</small></span><button type="button" onClick={() => onNavigate("Reviews")}>Review queue <span>↗</span></button></div><div><span><b>Website copy</b><small>Change page headings and supporting descriptions.</small></span><button type="button" onClick={() => onNavigate("Website copy")}>Edit copy <span>↗</span></button></div></div></div><div className="admin-card admin-quick"><span className="eyebrow">Quick actions</span><h2>Keep the clinic moving.</h2><button type="button" onClick={() => onNavigate("Prices")}>Edit pricing <span>↗</span></button><button type="button" onClick={() => onNavigate("Reviews")}>Review submissions <span>↗</span></button><a href={booking.currentDiary} target="_blank" rel="noreferrer">Open Faces booking <ExternalLink size={13} /></a>{!persistent && <p className="admin-muted">Connect Vercel KV to make edits permanent.</p>}</div></div></>; }

function Prices({ content, setContent, saveContent }: { content: ContentOverrides; setContent: React.Dispatch<React.SetStateAction<ContentOverrides>>; saveContent: (content?: ContentOverrides) => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  function update(group: PriceGroup, name: string, field: "name" | "price" | "duration", value: string) { const key = `${group.category}:${name}`; setContent((current) => ({ ...current, pricing: { ...current.pricing, [key]: { ...current.pricing[key], [field]: field === "price" ? Math.max(0, Number(value) || 0) : value } } })); }
  async function save() { setSaving(true); try { await saveContent(); } catch (error) { window.alert(error instanceof Error ? error.message : "Could not save changes."); } finally { setSaving(false); } }
  return <div className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow">Content management</span><h2>Full public catalogue.</h2></div><button className="button button-dark" onClick={save} type="button" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button></div><p className="admin-muted">Changes publish to the treatment pricing page and any homepage pricing previews. Use the exact wording clients see.</p>{defaultPricing.map((group) => <section className="admin-price-group" key={group.category}><h3>{group.category}</h3><div className="admin-price-list">{group.items.map((item) => { const override = content.pricing[`${group.category}:${item.name}`] ?? {}; return <label key={`${group.category}-${item.name}`}><span><input value={String(override.name ?? item.name)} onChange={(event) => update(group, item.name, "name", event.target.value)} aria-label={`${item.name} name`} /><small>{group.category}</small></span><input min="0" step="1" value={String(override.price ?? item.price)} onChange={(event) => update(group, item.name, "price", event.target.value)} type="number" aria-label={`${item.name} price`} /><input value={String(override.duration ?? item.duration)} onChange={(event) => update(group, item.name, "duration", event.target.value)} aria-label={`${item.name} duration`} /><b>£</b></label>; })}</div></section>)}</div>;
}

function Treatments({ content, setContent, saveContent }: { content: ContentOverrides; setContent: React.Dispatch<React.SetStateAction<ContentOverrides>>; saveContent: (content?: ContentOverrides) => Promise<void> }) { const [saving, setSaving] = useState(false); function update(treatment: Treatment, field: "name" | "intro" | "price" | "duration" | "downtime", value: string) { setContent((current) => ({ ...current, treatments: { ...current.treatments, [treatment.slug]: { ...current.treatments[treatment.slug], [field]: field === "price" ? Math.max(0, Number(value) || 0) : value } } })); } async function save() { setSaving(true); try { await saveContent(); } catch (error) { window.alert(error instanceof Error ? error.message : "Could not save changes."); } finally { setSaving(false); } } return <div className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow">Treatment management</span><h2>Cards and descriptions.</h2></div><button className="button button-dark" onClick={save} type="button" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button></div><p className="admin-muted">Edit the name, description, starting price, duration and downtime shown across treatment cards and detail pages.</p><div className="admin-edit-list">{defaultTreatments.map((treatment) => { const item = { ...treatment, ...(content.treatments[treatment.slug] ?? {}) }; return <fieldset key={treatment.slug}><legend>{treatment.name}</legend><label><span>Name</span><input value={item.name} onChange={(event) => update(treatment, "name", event.target.value)} /></label><label><span>Description</span><textarea rows={3} value={item.intro} onChange={(event) => update(treatment, "intro", event.target.value)} /></label><div className="admin-settings"><label><span>Starting price</span><input type="number" min="0" value={item.price} onChange={(event) => update(treatment, "price", event.target.value)} /></label><label><span>Duration</span><input value={item.duration} onChange={(event) => update(treatment, "duration", event.target.value)} /></label><label><span>Downtime</span><input value={item.downtime} onChange={(event) => update(treatment, "downtime", event.target.value)} /></label></div></fieldset>; })}</div></div>; }

function Reviews({ reviews, updateReview }: { reviews: ReviewSubmission[]; updateReview: (id: string, status: "approved" | "dismissed") => Promise<void> }) { const pending = reviews.filter((review) => review.status === "pending"); return <div className="admin-card"><span className="eyebrow">Moderation queue</span><h2>Client reviews.</h2><p className="admin-muted">New submissions are stored here and emailed through Brevo. Approving a review marks it ready for publishing; it does not publish automatically without your approval.</p><div className="admin-review-queue">{pending.length === 0 ? <p className="admin-muted">No reviews are waiting for approval.</p> : pending.map((review) => <div key={review.id}><span><b>{review.name}</b><small>{review.treatment} · {new Date(review.createdAt).toLocaleDateString("en-GB")}</small></span><p>“{review.review}”</p><button type="button" onClick={() => updateReview(review.id, "approved")}><Check size={14} />Approve</button><button type="button" onClick={() => updateReview(review.id, "dismissed")}><X size={14} />Dismiss</button></div>)}</div></div>; }

function WebsiteCopy({ content, setContent, saveContent }: { content: ContentOverrides; setContent: React.Dispatch<React.SetStateAction<ContentOverrides>>; saveContent: (content?: ContentOverrides) => Promise<void> }) { const [saving, setSaving] = useState(false); const fields = [["treatmentsHeroTitle", "Treatments page heading", "Use a new line for each visual line."], ["treatmentsHeroDescription", "Treatments page description", "The supporting text under the heading."], ["faqHeroTitle", "FAQ page heading", "Use a new line for each visual line."], ["faqHeroDescription", "FAQ page description", "The supporting text under the heading."]] as const; async function save() { setSaving(true); try { await saveContent(); } catch (error) { window.alert(error instanceof Error ? error.message : "Could not save changes."); } finally { setSaving(false); } } return <div className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow">Website copy</span><h2>Words that stay on brand.</h2></div><button className="button button-dark" onClick={save} type="button" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button></div><p className="admin-muted">Edit the headings and supporting descriptions without touching code. The typography, colours and layout remain controlled by the studio design system.</p><div className="admin-settings">{fields.map(([key, label, hint]) => <label key={key}><span>{label}<small>{hint}</small></span><textarea rows={key.endsWith("Title") ? 4 : 3} value={content.copy[key] ?? ""} onChange={(event) => setContent((current) => ({ ...current, copy: { ...current.copy, [key]: event.target.value } }))} /></label>)}</div></div>; }

function Settings() { return <div className="admin-card"><span className="eyebrow">Clinic controls</span><h2>Simple, external booking.</h2><p className="admin-muted">Faces is the live source for availability, consent, deposits, payments and appointment confirmations. The website does not store or manage appointments.</p><div className="admin-settings"><label><span>Faces booking link</span><input value={booking.currentDiary} readOnly /></label><label><span>Clinic contact email</span><input defaultValue="hello@injectoxclinic.co.uk" type="email" /></label><label><span>WhatsApp number</span><input value="07930 912949" readOnly /></label></div><a className="button button-dark" href={booking.currentDiary} target="_blank" rel="noreferrer">Open Faces booking <ExternalLink size={15} /></a></div>; }
