"use client";

import { useState } from "react";
import { TreatmentCard } from "@/components/ui";
import { useSiteContent } from "@/components/site-content-provider";

const filters = ["All", "Injectables", "Skin", "Laser", "Wellness"] as const;

export function TreatmentBrowser() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const { treatments: managedTreatments } = useSiteContent();
  const visible = filter === "All" ? managedTreatments : managedTreatments.filter((treatment) => treatment.category === filter);

  return (
    <div>
      <div className="category-rail category-filter" aria-label="Filter treatments">
        {filters.map((item) => <button className={filter === item ? "is-active" : ""} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} key={item}>{item === "All" ? "All treatments" : item}</button>)}
      </div>
      <div className="treatments-grid" aria-live="polite">{visible.map((treatment, index) => <TreatmentCard treatment={treatment} index={index} key={treatment.slug} />)}</div>
    </div>
  );
}
