import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/shop", "/pay-later"] }, sitemap: "https://www.injectoxclinic.co.uk/sitemap.xml" }; }
