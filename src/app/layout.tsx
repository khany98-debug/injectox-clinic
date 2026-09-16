import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Manrope } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl, socialImage } from "@/lib/seo";
import "./globals.css";

const display = DM_Sans({ variable: "--font-display", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], display: "swap" });
const editorial = Cormorant_Garamond({ variable: "--font-editorial", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Injectox Clinic | Refined Aesthetics in Manchester & Salford", template: "%s | Injectox Clinic" },
  description: "Luxury, consultation-led lip filler, facial balancing, skin and laser treatments in Salford, Greater Manchester.",
  keywords: ["lip filler Manchester", "Russian lips Manchester", "facial balancing Manchester", "aesthetics clinic Salford", "laser hair removal Manchester"],
  alternates: { canonical: "/" },
  openGraph: { title: "Injectox Clinic", description: "Refined aesthetics. Entirely yours.", url: siteUrl, images: [socialImage], locale: "en_GB", type: "website" },
  twitter: { card: "summary_large_image", title: "Injectox Clinic", description: "Refined aesthetics. Entirely yours.", images: [socialImage.url] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#efe7dc", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${editorial.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
