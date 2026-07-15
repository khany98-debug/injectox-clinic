import type { MetadataRoute } from "next";
import { concerns, treatments } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://injectoxclinic.co.uk";
  const staticRoutes = ["", "/treatments", "/concerns", "/pricing", "/reviews", "/about", "/faq", "/policies", "/contact", "/book", "/gallery", "/packages", "/pay-later", "/shop", "/privacy-policy", "/terms", "/cookies"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...treatments.map((treatment) => ({ url: `${base}/treatments/${treatment.slug}`, changeFrequency: "monthly" as const, priority: .8 })),
    ...concerns.map((concern) => ({ url: `${base}/concerns/${concern.slug}`, changeFrequency: "monthly" as const, priority: .75 })),
  ];
}
