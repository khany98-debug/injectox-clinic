"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { gallery, results } from "@/lib/content";

type GalleryItem = { src: string; label: string; href?: string; category?: string; note?: string };

export function GalleryGrid({ limit, source = "journal" }: { limit?: number; source?: "journal" | "results" }) {
  const collection: readonly GalleryItem[] = source === "results" ? results : gallery;
  const items = limit ? collection.slice(0, limit) : collection;
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selected]);

  return (
    <>
      <div className={`gallery-grid ${limit ? "gallery-preview" : ""}`}>
        {items.map((item, i) => (
          <button className="gallery-card" key={`${item.src}-${i}`} onClick={() => setSelected(item)} aria-label={`View ${item.label}`}>
            <Image src={item.src} alt={item.label} fill sizes={limit ? "(max-width: 700px) 88vw, 30vw" : "(max-width: 700px) 100vw, 33vw"} />
            <span><small>{item.category ?? `0${String(i + 1).padStart(2, "0")}`}</small>{item.label}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.label} onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close image"><X /></button>
          <div className="lightbox-image" onClick={(e) => e.stopPropagation()}>
            <Image src={selected.src} alt={selected.label} fill sizes="90vw" />
          </div>
          <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}><small>{selected.category ?? "Injectox Clinic"}</small><b>{selected.label}</b>{selected.note && <p>{selected.note}</p>}</div>
        </div>
      )}
    </>
  );
}
