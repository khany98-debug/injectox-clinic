"use client";

import { useState } from "react";
import { TreatmentCard } from "@/components/ui";
import { treatments } from "@/lib/content";

const filters = ["All", "Injectables", "Skin", "Laser", "Wellness"] as const;

export function TreatmentBrowser() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = filter === "All" ? treatments : treatments.filter((treatment) => treatment.category === filter);

  return (
    <div>
      <div className="category-rail category-filter" aria-label="Filter treatments">
        {filters.map((item) => <button className={filter === item ? "is-active" : ""} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} key={item}>{item === "All" ? "All treatments" : item}</button>)}
      </div>
      <div className="treatments-grid" aria-live="polite">{visible.map((treatment) => <TreatmentCard treatment={treatment} index={treatments.indexOf(treatment)} key={treatment.slug} />)}</div>
    </div>
  );
}
