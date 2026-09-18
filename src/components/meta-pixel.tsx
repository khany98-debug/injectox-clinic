"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cookieConsentEvent, cookieConsentKey } from "@/components/cookie-banner";

const pixelId = "8996832890404039";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  push?: Fbq;
  loaded?: boolean;
  version?: string;
  queue: unknown[][];
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function installPixel() {
  if (window.fbq) return;

  // Meta's standard dispatcher must call callMethod after fbevents.js has
  // loaded. Keeping this behaviour is what lets consented click events leave
  // the queue instead of remaining in the browser.
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
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

function hasAcceptedCookies() {
  return window.localStorage.getItem(cookieConsentKey) === "accepted";
}

function track(eventName: "PageView" | "Lead" | "Contact" | "ViewContent") {
  if (hasAcceptedCookies() && window.fbq) window.fbq("track", eventName);
}

function isTrackableTreatmentPath(pathname: string) {
  return pathname.startsWith("/treatments/") && pathname !== "/treatments/anti-wrinkle";
}

export function MetaPixel() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const hasObservedPath = useRef(false);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const enableIfConsented = () => {
      if (hasAcceptedCookies()) {
        installPixel();
        if (hasObservedPath.current && isTrackableTreatmentPath(pathnameRef.current)) track("ViewContent");
      }
    };
    const trackLinkClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href*="facesconsent.com"]') : null;
      if (target) {
        track("Lead");
        return;
      }

      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (link?.href.startsWith("https://wa.me/") || link?.href.startsWith("mailto:")) track("Contact");
    };

    enableIfConsented();
    window.addEventListener(cookieConsentEvent, enableIfConsented);
    document.addEventListener("click", trackLinkClick);
    return () => {
      window.removeEventListener(cookieConsentEvent, enableIfConsented);
      document.removeEventListener("click", trackLinkClick);
    };
  }, []);

  useEffect(() => {
    const isInitialPath = !hasObservedPath.current;
    hasObservedPath.current = true;

    if (!isInitialPath) track("PageView");
    if (isTrackableTreatmentPath(pathname)) track("ViewContent");
  }, [pathname]);

  return null;
}
