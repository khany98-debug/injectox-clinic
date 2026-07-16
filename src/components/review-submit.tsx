"use client";

import { Check, Star } from "lucide-react";
import { FormEvent, useState } from "react";

export function ReviewSubmit() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), treatment: form.get("treatment"), review: form.get("review"), website: form.get("website"), consent: form.get("consent") === "on" }) });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Your review could not be sent.");
      setSent(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Your review could not be sent."); }
    finally { setSubmitting(false); }
  }
  if (sent) return <div className="review-submit-success" role="status"><Check size={18} /><h3>Thank you for sharing your experience.</h3><p>Your review has been sent for approval and will only be published with your permission.</p></div>;
  return <form className="review-submit" onSubmit={submit}><div><span className="eyebrow">Share your experience</span><h2>Tell the next client<br /><em>how it felt.</em></h2><p>Reviews are moderated before publishing. We only use your first name and surname initial unless you choose otherwise.</p></div><div className="review-submit-fields"><label className="review-honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label><label><span>Your name</span><input name="name" required maxLength={100} /></label><label><span>Treatment</span><select name="treatment" defaultValue="" required><option value="" disabled>Select a treatment</option><option>Russian Lip Filler</option><option>Facial Balancing</option><option>Skin treatment</option><option>Laser Hair Removal</option><option>Other</option></select></label><label className="review-field-wide"><span>Your review</span><textarea name="review" rows={5} required minLength={10} maxLength={1500} placeholder="What did you value most about your visit?" /></label><label><span>Rating</span><span className="review-stars-input" aria-label="Five star rating">{[1,2,3,4,5].map((star) => <Star key={star} size={18} fill="currentColor" />)}</span></label><label className="review-consent review-field-wide"><input name="consent" type="checkbox" required /><span>I give Injectox permission to review this feedback and publish an approved version using my first name and surname initial.</span></label>{error && <p className="review-form-error review-field-wide" role="alert">{error}</p>}<button className="button button-dark review-field-wide" type="submit" disabled={submitting}>{submitting ? "Sending securely..." : <>Submit for approval <span>↗</span></>}</button></div></form>;
}
