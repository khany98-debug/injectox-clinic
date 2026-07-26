"use client";

import { useEffect, useRef, useState } from "react";
import { cookieConsentEvent, cookieConsentKey } from "@/components/cookie-banner";
const embedUrl = "https://www.google.com/maps?q=Skin+Clinic+MCR,+Waters+Edge+Business+Park,+Modwen+Road,+Salford&output=embed";

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [mapConsent, setMapConsent] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncConsent = () => setMapConsent(window.localStorage.getItem(cookieConsentKey) === "accepted");
    syncConsent();
    window.addEventListener(cookieConsentEvent, syncConsent);
    return () => window.removeEventListener(cookieConsentEvent, syncConsent);
  }, []);

  useEffect(() => {
    if (!mapConsent) return;
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setLoaded(true);
      observer.disconnect();
    }, { rootMargin: "320px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [mapConsent]);

  return <div ref={container} className="clinic-map" aria-label="Map showing Injectox Clinic in Salford">{loaded && <iframe title="Injectox Clinic location map" loading="lazy" src={embedUrl} />}{!mapConsent && <p className="map-consent-note">Accept cookies to load the clinic map automatically.</p>}</div>;
}
