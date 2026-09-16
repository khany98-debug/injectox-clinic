import Image from "next/image";

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Skin+Clinic+MCR,+Waters+Edge+Business+Park,+Modwen+Road,+Salford,+M5+3EZ";

export function MapEmbed() {
  return (
    <a className="clinic-map clinic-map-static" href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Open the Injectox Clinic location in Google Maps">
      <Image src="/images/clinic-map.jpg" alt="Map showing the clinic location at Waters Edge Business Park, Salford M5 3EZ" fill sizes="(max-width: 760px) 100vw, 50vw" />
      <span className="clinic-map-pin" aria-hidden="true">•</span>
      <span className="clinic-map-link">Open in Google Maps ↗</span>
      <small>© OpenStreetMap contributors</small>
    </a>
  );
}
