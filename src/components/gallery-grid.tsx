"use client";

import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { gallery } from "@/lib/content";

export function GalleryGrid({ limit }: { limit?: number }) {
  const items = limit ? gallery.slice(0, limit) : gallery;
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null);
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
            <span><small>0{String(i + 1).padStart(2, "0")}</small>{item.label}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.label} onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close image"><X /></button>
          <div className="lightbox-image" onClick={(e) => e.stopPropagation()}>
            <Image src={selected.src} alt={selected.label} fill sizes="90vw" />
          </div>
          <a href={selected.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>View original on Instagram <ExternalLink size={15} /></a>
        </div>
      )}
    </>
  );
}
