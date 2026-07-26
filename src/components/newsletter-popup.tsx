"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { cookieConsentEvent, cookieConsentKey } from "@/components/cookie-banner";

const storageKey = "injectox-newsletter-dismissed";

function hasDismissedNewsletter() {
  if (typeof window === "undefined") return true;
  return Boolean(window.localStorage.getItem(storageKey) || window.sessionStorage.getItem(storageKey));
}

function persistDismissal() {
  window.localStorage.setItem(storageKey, "true");
  window.sessionStorage.setItem(storageKey, "true");
}

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasDismissedNewsletter()) return;

    let timer: number | undefined;
    let active = true;
    const onPointerOut = (event: PointerEvent) => {
      if (event.clientY <= 0) setVisible(true);
    };
    const showAfterCookieChoice = () => {
      if (hasDismissedNewsletter() || !window.localStorage.getItem(cookieConsentKey) || timer || !active) return;
      timer = window.setTimeout(() => setVisible(true), 3500);
      document.addEventListener("pointerout", onPointerOut);
    };

    showAfterCookieChoice();
    window.addEventListener(cookieConsentEvent, showAfterCookieChoice);
    return () => {
      active = false;
      if (timer) window.clearTimeout(timer);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener(cookieConsentEvent, showAfterCookieChoice);
    };
  }, []);

  function close() {
    persistDismissal();
    setStatus("idle");
    setEmail("");
    setError("");
    setVisible(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, marketingConsent }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({ error: "Subscription could not be saved." })) as { error?: string };
      setError(payload.error ?? "Subscription could not be saved.");
      setStatus("idle");
      return;
    }
    setStatus("success");
    persistDismissal();
    window.setTimeout(() => {
      setVisible(false);
      setEmail("");
      setMarketingConsent(false);
      setStatus("idle");
    }, 1400);
  }

  if (!visible) return null;

  return (
    <div className="newsletter-popover" role="dialog" aria-modal="false" aria-labelledby="newsletter-title">
      <button className="newsletter-close" type="button" onClick={close} aria-label="Close newsletter sign-up"><X size={16} /></button>
      {status === "success" ? (
        <div className="newsletter-success" role="status">
          <span className="eyebrow">You are on the list</span>
          <h2>Thank you.</h2>
          <p>We’ll only send treatment news, offers and appointment updates worth opening.</p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <span className="eyebrow">DON’T MISS OUT</span>
          <h2 id="newsletter-title">Be first to hear.</h2>
          <p>Be the first to hear about new treatments, exclusive offers and appointment drops.</p>
          <label>
            <span>Email address</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" inputMode="email" autoComplete="email" required placeholder="you@example.com" />
          </label>
          {error && <p className="newsletter-error" role="alert">{error}</p>}
          <label className="newsletter-consent"><input checked={marketingConsent} onChange={(event) => setMarketingConsent(event.target.checked)} type="checkbox" required /><span>I agree to receive Injectox Clinic marketing emails and understand I can unsubscribe at any time.</span></label>
          <button className="button button-dark" type="submit" disabled={status === "submitting" || !marketingConsent}>{status === "submitting" ? "Subscribing..." : "Subscribe"}</button>
          <small>Read the <a href="/privacy-policy">Privacy Policy</a> before subscribing.</small>
        </form>
      )}
    </div>
  );
}
