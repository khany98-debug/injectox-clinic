"use client";

import { Check, Star } from "lucide-react";
import { FormEvent, useState } from "react";

export function ReviewSubmit() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  if (sent) return <div className="review-submit-success" role="status"><Check size={18} /><h3>Thank you for sharing your experience.</h3><p>Your review has been sent for approval and will only be published with your permission.</p></div>;
  return <form className="review-submit" onSubmit={submit}><div><span className="eyebrow">Share your experience</span><h2>Tell the next client<br /><em>how it felt.</em></h2><p>Reviews are moderated before publishing. We only use your first name and surname initial unless you choose otherwise.</p></div><div className="review-submit-fields"><label><span>Your name</span><input name="name" required /></label><label><span>Treatment</span><select name="treatment" defaultValue=""><option value="" disabled>Select a treatment</option><option>Russian Lip Filler</option><option>Facial Balancing</option><option>Skin treatment</option><option>Laser Hair Removal</option><option>Other</option></select></label><label className="review-field-wide"><span>Your review</span><textarea name="review" rows={5} required placeholder="What did you value most about your visit?" /></label><label><span>Rating</span><span className="review-stars-input" aria-label="Five star rating">{[1,2,3,4,5].map((star) => <Star key={star} size={18} fill="currentColor" />)}</span></label><label className="review-consent review-field-wide"><input type="checkbox" required /><span>I give Injectox permission to review and publish this feedback.</span></label><button className="button button-dark review-field-wide" type="submit">Submit for approval <span>↗</span></button></div></form>;
}
