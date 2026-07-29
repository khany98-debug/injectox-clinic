"use client";

import { AlertTriangle, Check, Cloud, CreditCard, ExternalLink, LayoutDashboard, Mail, MessageSquareQuote, Save, Settings2, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { booking, pricing as defaultPricing, treatments as defaultTreatments, type PriceGroup, type Treatment } from "@/lib/content";
import type { ContentOverrides, ReviewSubmission } from "@/lib/site-types";

type Tab = "Overview" | "Prices" | "Treatments" | "Reviews" | "Website copy" | "Clinic settings";
type Integrations = { reviewNotifications: boolean; notificationEmail: string };

const defaultContent: ContentOverrides = {
  copy: {
    treatmentsHeroTitle: "Precision,\nThe right treatment.\nChosen for you,",
    treatmentsHeroDescription: "Explore signature injectables, advanced skin, laser and wellness options. Every route begins with suitability—not pressure.",
    faqHeroTitle: "Clear answers.\nYour questions, answered simply.",
    faqHeroDescription: "Everything first-time and returning clients usually want to know before booking.",
  },
  treatments: {},
  pricing: {},
  clinic: { contactEmail: "Injectoxclinic@gmail.com" },
};

function mergeContent(value?: Partial<ContentOverrides>): ContentOverrides {
  return {
    ...defaultContent,
    ...value,
    copy: { ...defaultContent.copy, ...value?.copy },
    treatments: { ...value?.treatments },
    pricing: { ...value?.pricing },
    clinic: { ...defaultContent.clinic, ...value?.clinic },
  };
}

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [notice, setNotice] = useState("");
  const [content, setContent] = useState<ContentOverrides>(defaultContent);
  const [reviews, setReviews] = useState<ReviewSubmission[]>([]);
  const [persistent, setPersistent] = useState(true);
  const [integrations, setIntegrations] = useState<Integrations>({ reviewNotifications: false, notificationEmail: "Injectoxclinic@gmail.com" });
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const [contentResponse, reviewResponse] = await Promise.all([
      fetch("/api/admin/content", { cache: "no-store" }),
      fetch("/api/admin/reviews", { cache: "no-store" }),
    ]);
    if (!contentResponse.ok || !reviewResponse.ok) throw new Error("The dashboard could not load its latest data.");
    const contentPayload = await contentResponse.json() as { content?: ContentOverrides; persistent?: boolean; integrations?: Integrations };
    const reviewPayload = await reviewResponse.json() as { reviews?: ReviewSubmission[] };
    setContent(mergeContent(contentPayload.content));
    setPersistent(Boolean(contentPayload.persistent));
    if (contentPayload.integrations) setIntegrations(contentPayload.integrations);
    setReviews(Array.isArray(reviewPayload.reviews) ? reviewPayload.reviews : []);
  }

  useEffect(() => {
    const load = window.setTimeout(() => {
      void refresh().catch((error) => setNotice(error instanceof Error ? error.message : "The dashboard could not load its latest data.")).finally(() => setLoading(false));
    }, 0);
    return () => window.clearTimeout(load);
  }, []);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 5000);
  }

  async function saveContent(next = content) {
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: next }),
    });
    const payload = await response.json() as { content?: ContentOverrides; persistent?: boolean; error?: string };
    if (!response.ok) throw new Error(payload.error || "Could not save changes.");
    setContent(mergeContent(payload.content));
    if (typeof payload.persistent === "boolean") setPersistent(payload.persistent);
    showNotice(payload.persistent ? "Saved and published across the website." : "Saved temporarily. Connect storage before relying on this change.");
  }

  async function updateReview(id: string, status: "approved" | "dismissed" | "pending") {
    const response = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const payload = await response.json() as { reviews?: ReviewSubmission[]; error?: string };
    if (!response.ok) throw new Error(payload.error || "Could not update review.");
    setReviews(payload.reviews ?? []);
    showNotice(status === "approved" ? "Review approved and published on the website." : status === "dismissed" ? "Review dismissed." : "Review restored to the moderation queue.");
  }

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.reload(); }
  const pending = reviews.filter((review) => review.status === "pending").length;
  const navItems: [Tab, typeof LayoutDashboard][] = [["Overview", LayoutDashboard], ["Prices", CreditCard], ["Treatments", Sparkles], ["Reviews", MessageSquareQuote], ["Website copy", Settings2], ["Clinic settings", Settings2]];

  return <section className="admin-shell shell">
    <aside className="admin-sidebar">
      <div className="admin-brand"><span className="wordmark-mark">I</span><span>INJECTOX<br /><small>STUDIO ADMIN</small></span></div>
      <nav aria-label="Admin navigation">{navItems.map(([item, Icon]) => <button className={tab === item ? "is-active" : ""} key={item} onClick={() => setTab(item)} type="button"><Icon size={15} />{item}{item === "Reviews" && pending > 0 && <i className="admin-nav-count">{pending}</i>}</button>)}</nav>
      <div className="admin-sidebar-note"><Sparkles size={15} /><span><b>Faces connected</b><small>Clients book, pay and complete consent in Faces.</small></span></div>
    </aside>
    <div className="admin-main">
      <header className="admin-topbar"><div><span className="eyebrow">Private workspace</span><h1>{tab}</h1></div><div className="admin-user"><span>FK</span><div><b>Fatima Khan</b><small>Owner & practitioner</small></div><button type="button" onClick={logout}>Sign out</button></div></header>
      {!persistent && <StorageWarning />}
      {notice && <div className="admin-notice" role="status"><Check size={15} />{notice}</div>}
      {loading ? <div className="admin-card"><p className="admin-muted">Loading the live clinic content…</p></div> : <>
        {tab === "Overview" && <Overview pending={pending} reviews={reviews} persistent={persistent} integrations={integrations} onNavigate={setTab} />}
        {tab === "Prices" && <Prices content={content} setContent={setContent} saveContent={saveContent} />}
        {tab === "Treatments" && <Treatments content={content} setContent={setContent} saveContent={saveContent} />}
        {tab === "Reviews" && <Reviews reviews={reviews} updateReview={updateReview} />}
        {tab === "Website copy" && <WebsiteCopy content={content} setContent={setContent} saveContent={saveContent} />}
        {tab === "Clinic settings" && <Settings content={content} setContent={setContent} saveContent={saveContent} integrations={integrations} />}
      </>}
    </div>
  </section>;
}

function StorageWarning() {
  return <div className="admin-warning" role="alert"><AlertTriangle size={17} /><div><b>Changes and reviews are not yet stored permanently.</b><p>Connect Vercel KV (or Upstash Redis) in Vercel with <code>KV_REST_API_URL</code> and <code>KV_REST_API_TOKEN</code>. Until then, a new server instance can lose edits and review submissions.</p></div></div>;
}

function Overview({ pending, reviews, persistent, integrations, onNavigate }: { pending: number; reviews: ReviewSubmission[]; persistent: boolean; integrations: Integrations; onNavigate: (tab: Tab) => void }) {
  const approved = reviews.filter((review) => review.status === "approved").length;
  return <>
    <div className="admin-metrics"><div><small>Public treatments</small><strong>{defaultTreatments.length}</strong><span>Managed catalogue</span></div><div><small>Pricing items</small><strong>{defaultPricing.reduce((total, group) => total + group.items.length, 0)}</strong><span>Across all groups</span></div><div><small>Reviews waiting</small><strong>{pending}</strong><span>Needs moderation</span></div><div><small>Published reviews</small><strong>{approved}</strong><span>From the website form</span></div></div>
    <div className="admin-grid">
      <div className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow">Content health</span><h2>Everything in one place.</h2></div></div><div className="admin-health-list"><div><span><b>Prices</b><small>Edit pricing, duration and labels on the public catalogue.</small></span><button type="button" onClick={() => onNavigate("Prices")}>Edit prices <span>↗</span></button></div><div><span><b>Treatments</b><small>Update treatment cards and treatment-page descriptions.</small></span><button type="button" onClick={() => onNavigate("Treatments")}>Edit treatments <span>↗</span></button></div><div><span><b>Reviews</b><small>{pending ? `${pending} review${pending === 1 ? " is" : "s are"} waiting for approval.` : "No reviews are waiting for approval."}</small></span><button type="button" onClick={() => onNavigate("Reviews")}>Open review queue <span>↗</span></button></div><div><span><b>Website copy</b><small>Change page headings and supporting descriptions.</small></span><button type="button" onClick={() => onNavigate("Website copy")}>Edit copy <span>↗</span></button></div></div></div>
      <div className="admin-card admin-quick"><span className="eyebrow">Connection status</span><h2>What is live.</h2><p className={persistent ? "admin-connection is-ready" : "admin-connection"}><Cloud size={14} />{persistent ? "Content storage is connected" : "Content storage needs connecting"}</p><p className={integrations.reviewNotifications ? "admin-connection is-ready" : "admin-connection"}><Mail size={14} />{integrations.reviewNotifications ? `Review alerts send to ${integrations.notificationEmail}` : "Brevo review alerts need connecting"}</p><a href={booking.currentDiary} target="_blank" rel="noreferrer">Open Faces booking <ExternalLink size={13} /></a><button type="button" onClick={() => onNavigate("Clinic settings")}>Open clinic settings <span>↗</span></button></div>
    </div>
  </>;
}

function SaveButton({ saving }: { saving: boolean }) { return <button className="button button-dark admin-save" type="submit" disabled={saving}><Save size={14} />{saving ? "Saving…" : "Save changes"}</button>; }

function Prices({ content, setContent, saveContent }: { content: ContentOverrides; setContent: React.Dispatch<React.SetStateAction<ContentOverrides>>; saveContent: (content?: ContentOverrides) => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  function update(group: PriceGroup, name: string, field: "name" | "price" | "duration", value: string) { const key = `${group.category}:${name}`; setContent((current) => ({ ...current, pricing: { ...current.pricing, [key]: { ...current.pricing[key], [field]: field === "price" ? Math.max(0, Number(value) || 0) : value } } })); }
  async function save(event: React.FormEvent) { event.preventDefault(); setSaving(true); try { await saveContent(); } catch (error) { window.alert(error instanceof Error ? error.message : "Could not save changes."); } finally { setSaving(false); } }
  return <form className="admin-card" onSubmit={save}><div className="admin-card-heading"><div><span className="eyebrow">Content management</span><h2>Full public catalogue.</h2></div><SaveButton saving={saving} /></div><p className="admin-muted">Changes publish to the treatment pricing page and homepage pricing previews. Use the exact wording clients see.</p>{defaultPricing.map((group) => <section className="admin-price-group" key={group.category}><h3>{group.category}</h3><div className="admin-price-list">{group.items.map((item) => { const override = content.pricing[`${group.category}:${item.name}`] ?? {}; return <label key={`${group.category}-${item.name}`}><span><input value={String(override.name ?? item.name)} onChange={(event) => update(group, item.name, "name", event.target.value)} aria-label={`${item.name} name`} /><small>{group.category}</small></span><input min="0" step="1" value={String(override.price ?? item.price)} onChange={(event) => update(group, item.name, "price", event.target.value)} type="number" aria-label={`${item.name} price`} /><input value={String(override.duration ?? item.duration)} onChange={(event) => update(group, item.name, "duration", event.target.value)} aria-label={`${item.name} duration`} /><b>£</b></label>; })}</div></section>)}</form>;
}

function Treatments({ content, setContent, saveContent }: { content: ContentOverrides; setContent: React.Dispatch<React.SetStateAction<ContentOverrides>>; saveContent: (content?: ContentOverrides) => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  function update(treatment: Treatment, field: "name" | "intro" | "price" | "duration" | "downtime", value: string) { setContent((current) => ({ ...current, treatments: { ...current.treatments, [treatment.slug]: { ...current.treatments[treatment.slug], [field]: field === "price" ? Math.max(0, Number(value) || 0) : value } } })); }
  async function save(event: React.FormEvent) { event.preventDefault(); setSaving(true); try { await saveContent(); } catch (error) { window.alert(error instanceof Error ? error.message : "Could not save changes."); } finally { setSaving(false); } }
  return <form className="admin-card" onSubmit={save}><div className="admin-card-heading"><div><span className="eyebrow">Treatment management</span><h2>Cards and descriptions.</h2></div><SaveButton saving={saving} /></div><p className="admin-muted">Edit the name, description, starting price, duration and downtime shown across treatment cards and detail pages.</p><div className="admin-edit-list">{defaultTreatments.map((treatment) => { const item = { ...treatment, ...(content.treatments[treatment.slug] ?? {}) }; return <fieldset key={treatment.slug}><legend>{treatment.name}</legend><label><span>Name</span><input value={item.name} onChange={(event) => update(treatment, "name", event.target.value)} /></label><label><span>Description</span><textarea rows={3} value={item.intro} onChange={(event) => update(treatment, "intro", event.target.value)} /></label><div className="admin-settings"><label><span>Starting price</span><input type="number" min="0" value={item.price} onChange={(event) => update(treatment, "price", event.target.value)} /></label><label><span>Duration</span><input value={item.duration} onChange={(event) => update(treatment, "duration", event.target.value)} /></label><label><span>Downtime</span><input value={item.downtime} onChange={(event) => update(treatment, "downtime", event.target.value)} /></label></div></fieldset>; })}</div></form>;
}

function Reviews({ reviews, updateReview }: { reviews: ReviewSubmission[]; updateReview: (id: string, status: "approved" | "dismissed" | "pending") => Promise<void> }) {
  const [filter, setFilter] = useState<"pending" | "approved" | "dismissed" | "all">("pending");
  const visible = useMemo(() => filter === "all" ? reviews : reviews.filter((review) => review.status === filter), [filter, reviews]);
  return <div className="admin-card"><div className="admin-card-heading"><div><span className="eyebrow">Moderation queue</span><h2>Client reviews.</h2></div><div className="admin-filter" aria-label="Review status filter">{(["pending", "approved", "dismissed", "all"] as const).map((item) => <button key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)} type="button">{item}</button>)}</div></div><p className="admin-muted">Every submission appears here first. Approve it to publish it on the site; dismiss it to keep it private.</p><div className="admin-review-queue">{visible.length === 0 ? <p className="admin-muted">No {filter === "all" ? "review submissions" : `${filter} reviews`} found.</p> : visible.map((review) => <article key={review.id}><span><b>{review.name}</b><small>{review.treatment} · {new Date(review.createdAt).toLocaleDateString("en-GB")}</small><em className={`admin-status ${review.status}`}>{review.status}</em></span><p>“{review.review}”</p><div className="admin-review-actions">{review.status !== "approved" && <button type="button" onClick={() => updateReview(review.id, "approved")}><Check size={14} />Approve</button>}{review.status !== "dismissed" && <button type="button" onClick={() => updateReview(review.id, "dismissed")}><X size={14} />Dismiss</button>}{review.status !== "pending" && <button type="button" onClick={() => updateReview(review.id, "pending")}>Restore</button>}</div></article>)}</div></div>;
}

function WebsiteCopy({ content, setContent, saveContent }: { content: ContentOverrides; setContent: React.Dispatch<React.SetStateAction<ContentOverrides>>; saveContent: (content?: ContentOverrides) => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  const fields = [["treatmentsHeroTitle", "Treatments page heading", "Use a new line for each visual line."], ["treatmentsHeroDescription", "Treatments page description", "The supporting text under the heading."], ["faqHeroTitle", "FAQ page heading", "Use a new line for each visual line."], ["faqHeroDescription", "FAQ page description", "The supporting text under the heading."]] as const;
  async function save(event: React.FormEvent) { event.preventDefault(); setSaving(true); try { await saveContent(); } catch (error) { window.alert(error instanceof Error ? error.message : "Could not save changes."); } finally { setSaving(false); } }
  return <form className="admin-card" onSubmit={save}><div className="admin-card-heading"><div><span className="eyebrow">Website copy</span><h2>Words that stay on brand.</h2></div><SaveButton saving={saving} /></div><p className="admin-muted">Edit the headings and supporting descriptions without touching code. The typography, colours and layout remain controlled by the studio design system.</p><div className="admin-settings">{fields.map(([key, label, hint]) => <label key={key}><span>{label}<small>{hint}</small></span><textarea rows={key.endsWith("Title") ? 4 : 3} value={content.copy[key] ?? ""} onChange={(event) => setContent((current) => ({ ...current, copy: { ...current.copy, [key]: event.target.value } }))} /></label>)}</div></form>;
}

function Settings({ content, setContent, saveContent, integrations }: { content: ContentOverrides; setContent: React.Dispatch<React.SetStateAction<ContentOverrides>>; saveContent: (content?: ContentOverrides) => Promise<void>; integrations: Integrations }) {
  const [saving, setSaving] = useState(false);
  async function save(event: React.FormEvent) { event.preventDefault(); setSaving(true); try { await saveContent(); } catch (error) { window.alert(error instanceof Error ? error.message : "Could not save changes."); } finally { setSaving(false); } }
  return <form className="admin-card" onSubmit={save}><div className="admin-card-heading"><div><span className="eyebrow">Clinic controls</span><h2>Simple, external booking.</h2></div><SaveButton saving={saving} /></div><p className="admin-muted">Faces handles availability, consent, deposits, payments and appointment confirmations. The email below receives review moderation alerts.</p><div className="admin-settings"><label><span>Faces booking link<small>Managed by Faces</small></span><input value={booking.currentDiary} readOnly /></label><label><span>Clinic contact email<small>Review notifications are sent here</small></span><input value={content.clinic.contactEmail ?? ""} onChange={(event) => setContent((current) => ({ ...current, clinic: { ...current.clinic, contactEmail: event.target.value } }))} type="email" required /></label><label><span>WhatsApp number<small>Managed in the website contact widget</small></span><input value="07930 912949" readOnly /></label><label><span>Brevo review notifications<small>{integrations.reviewNotifications ? `Connected · default notification recipient: ${integrations.notificationEmail}` : "Not connected — add BREVO_API_KEY in Vercel"}</small></span><input value={integrations.reviewNotifications ? "Connected" : "Needs connection"} readOnly /></label></div><div className="admin-settings-actions"><a className="button button-dark" href={booking.currentDiary} target="_blank" rel="noreferrer">Open Faces booking <ExternalLink size={15} /></a><button className="admin-refresh" type="button" onClick={() => window.location.reload()}>Refresh dashboard</button></div></form>;
}
