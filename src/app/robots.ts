import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://injectoxclinic.co.uk/sitemap.xml" }; }
