import type { Metadata } from "next";

export const siteUrl = "https://www.injectoxclinic.co.uk";
export const socialImage = {
  url: "/images/injectox-social-share.jpg",
  width: 1200,
  height: 630,
  alt: "Injectox Clinic in Salford",
};

export function pageMetadata({ title, description, path = "/", index = true }: { title: string; description: string; path?: string; index?: boolean }): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const fullTitle = `${title} | Injectox Clinic`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title: fullTitle, description, url: canonical, siteName: "Injectox Clinic", images: [socialImage], locale: "en_GB", type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [socialImage.url] },
    robots: { index, follow: index },
  };
}
