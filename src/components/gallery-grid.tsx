"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { gallery, resultFilms, results } from "@/lib/content";

type GalleryItem = { src: string; label: string; href?: string; category?: string; note?: string; poster?: string; kind?: "image" | "video" };

export function GalleryGrid({ limit, source = "journal", mobileLoop = false, includeFilms = false }: { limit?: number; source?: "journal" | "results"; mobileLoop?: boolean; includeFilms?: boolean }) {
  const collection: readonly GalleryItem[] = source === "results" ? results : gallery;
  const enriched = includeFilms ? [...collection, ...resultFilms.map((film) => ({ ...film, kind: "video" as const }))] : [...collection];
  const baseItems = limit ? enriched.slice(0, limit) : enriched;
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selected]);

  return (
    <>
      <div className={mobileLoop ? "mobile-carousel-viewport results-carousel-viewport" : undefined}>
      <div className={`gallery-grid ${limit ? "gallery-preview" : ""} ${mobileLoop ? "mobile-results-carousel" : ""}`}>
        {baseItems.map((item, i) => (
          <button className="gallery-card" key={`${item.src}-${i}`} onClick={() => setSelected(item)} aria-label={`View ${item.label}`}>
            {item.kind === "video" ? (
              <>
                <video src={item.src} poster={item.poster} autoPlay muted loop playsInline preload="metadata" />
                <i className="gallery-play"><Play size={14} fill="currentColor" /></i>
              </>
            ) : (
              <Image src={item.src} alt={item.label} fill sizes={limit ? "(max-width: 700px) 88vw, 30vw" : "(max-width: 700px) 100vw, 33vw"} />
            )}
            <span>{item.category && <small>{item.category}</small>}{item.label}</span>
          </button>
        ))}
        {mobileLoop && baseItems.map((item, i) => (
          <button className="gallery-card mobile-loop-copy" key={`${item.src}-loop-${i}`} onClick={() => setSelected(item)} aria-label={`View ${item.label}`}>
            {item.kind === "video" ? (
              <>
                <video src={item.src} poster={item.poster} autoPlay muted loop playsInline preload="metadata" />
                <i className="gallery-play"><Play size={14} fill="currentColor" /></i>
              </>
            ) : (
              <Image src={item.src} alt={item.label} fill sizes={limit ? "(max-width: 700px) 88vw, 30vw" : "(max-width: 700px) 100vw, 33vw"} />
            )}
            <span>{item.category && <small>{item.category}</small>}{item.label}</span>
          </button>
        ))}
      </div>
      </div>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.label} onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close image"><X /></button>
          <div className="lightbox-image" onClick={(e) => e.stopPropagation()}>
            {selected.kind === "video" ? <video src={selected.src} poster={selected.poster} autoPlay muted loop playsInline controls /> : <Image src={selected.src} alt={selected.label} fill sizes="90vw" />}
          </div>
          <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}><small>{selected.category ?? "Injectox Clinic"}</small><b>{selected.label}</b>{selected.note && <p>{selected.note}</p>}</div>
        </div>
      )}
    </>
  );
}
