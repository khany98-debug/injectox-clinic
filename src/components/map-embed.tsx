"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Skin+Clinic+MCR+Waters+Edge+Business+Park+Modwen+Road+Salford";
const embedUrl = "https://www.google.com/maps?q=Skin+Clinic+MCR,+Waters+Edge+Business+Park,+Modwen+Road,+Salford&output=embed";

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  if (loaded) return <div className="clinic-map" aria-label="Map showing Injectox Clinic in Salford"><iframe title="Injectox Clinic location map" loading="lazy" src={embedUrl} /></div>;
  return <div className="clinic-map map-consent"><p>Google Maps may set cookies when loaded.</p><button className="button button-light" type="button" onClick={() => setLoaded(true)}>Load map</button><a href={mapUrl} target="_blank" rel="noreferrer">Open in Google Maps <ExternalLink size={14} /></a></div>;
}
