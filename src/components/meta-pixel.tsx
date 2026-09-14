"use client";

import { useEffect } from "react";
import { cookieConsentEvent, cookieConsentKey } from "@/components/cookie-banner";

const pixelId = "8996832890404039";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

function installPixel() {
  if (window.fbq) return;

  const fbq = (...args: unknown[]) => {
    fbq.queue.push(args);
  };
  fbq.queue = [] as unknown[][];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", pixelId);
  fbq("track", "PageView");
}

export function MetaPixel() {
  useEffect(() => {
    const enableIfConsented = () => {
      if (window.localStorage.getItem(cookieConsentKey) === "accepted") installPixel();
    };
    const trackBookingClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href*="facesconsent.com"]') : null;
      if (target && window.fbq) window.fbq("track", "InitiateCheckout");
    };

    enableIfConsented();
    window.addEventListener(cookieConsentEvent, enableIfConsented);
    document.addEventListener("click", trackBookingClick);
    return () => {
      window.removeEventListener(cookieConsentEvent, enableIfConsented);
      document.removeEventListener("click", trackBookingClick);
    };
  }, []);

  return null;
}
