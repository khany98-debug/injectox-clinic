"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

export const cookieConsentKey = "injectox-cookie-consent";
export const cookieConsentEvent = "injectox-cookie-consent-change";

type CookieChoice = "accepted" | "essential";

function saveChoice(choice: CookieChoice) {
  window.localStorage.setItem(cookieConsentKey, choice);
  window.dispatchEvent(new CustomEvent(cookieConsentEvent, { detail: choice }));
}

function subscribeToConsentChange(callback: () => void) {
  window.addEventListener(cookieConsentEvent, callback);
  return () => window.removeEventListener(cookieConsentEvent, callback);
}

function hasNoCookieChoice() {
  return !window.localStorage.getItem(cookieConsentKey);
}

export function CookieBanner() {
  const visible = useSyncExternalStore(subscribeToConsentChange, hasNoCookieChoice, () => false);

  function choose(choice: CookieChoice) {
    saveChoice(choice);
  }

  if (!visible) return null;

  return (
    <section className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title">
      <div>
        <span className="eyebrow">Your privacy</span>
        <h2 id="cookie-banner-title">Cookies, kept clear.</h2>
        <p>We use essential storage to run the site. Accepting also lets us load Google Maps automatically when you reach the clinic section.</p>
      </div>
      <div className="cookie-banner-actions">
        <button className="button button-light" type="button" onClick={() => choose("essential")}>Essential only</button>
        <button className="button button-dark" type="button" onClick={() => choose("accepted")}>Accept cookies</button>
        <Link href="/cookies">Cookie policy</Link>
      </div>
    </section>
  );
}
