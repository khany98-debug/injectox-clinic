"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";

const storageKey = "injectox-newsletter-dismissed";

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem(storageKey)) return;
    const timer = window.setTimeout(() => setVisible(true), 6500);
    const onPointerOut = (event: PointerEvent) => {
      if (event.clientY <= 0) setVisible(true);
    };
    document.addEventListener("pointerout", onPointerOut);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  function close() {
    window.localStorage.setItem(storageKey, "true");
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
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({ error: "Subscription could not be saved." })) as { error?: string };
      setError(payload.error ?? "Subscription could not be saved.");
      setStatus("idle");
      return;
    }
    window.localStorage.setItem(storageKey, "true");
    setVisible(false);
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
          <button className="button button-dark" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Subscribing..." : "Subscribe"}</button>
          <small>No spam, just the good stuff. You can unsubscribe at any time.</small>
        </form>
      )}
    </div>
  );
}
