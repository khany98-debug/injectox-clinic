"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pricing as defaultPricing, reviews as defaultReviews, treatments as defaultTreatments, type PriceGroup, type Treatment } from "@/lib/content";

type Overrides = { copy?: Record<string, string>; treatments?: Record<string, Partial<Treatment>>; pricing?: Record<string, Partial<PriceGroup["items"][number]>> };
type SiteContent = { copy: Record<string, string>; treatments: Treatment[]; pricing: PriceGroup[]; reviews: typeof defaultReviews[number][]; loaded: boolean };
const ContentContext = createContext<SiteContent>({ copy: {}, treatments: defaultTreatments, pricing: defaultPricing, reviews: [...defaultReviews], loaded: false });

function mergeContent(overrides: Overrides) {
  const treatments = defaultTreatments.map((item) => ({ ...item, ...(overrides.treatments?.[item.slug] ?? {}) }));
  const pricing = defaultPricing.map((group) => ({ ...group, items: group.items.map((item) => ({ ...item, ...(overrides.pricing?.[`${group.category}:${item.name}`] ?? {}) })) }));
  return { copy: overrides.copy ?? {}, treatments, pricing };
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>({});
  const [reviews, setReviews] = useState<typeof defaultReviews[number][]>([...defaultReviews]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { fetch("/api/content", { cache: "no-store" }).then((response) => response.ok ? response.json() : null).then((payload: { overrides?: Overrides; reviews?: typeof defaultReviews[number][] } | null) => { if (payload?.overrides) setOverrides(payload.overrides); if (payload?.reviews) setReviews(payload.reviews); }).catch(() => undefined).finally(() => setLoaded(true)); }, []);
  const value = useMemo(() => ({ ...mergeContent(overrides), reviews, loaded }), [overrides, reviews, loaded]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() { return useContext(ContentContext); }
