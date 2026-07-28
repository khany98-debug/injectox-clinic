import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { CookieBanner } from "@/components/cookie-banner";
import { StickyBook } from "@/components/ui";
import { WhatsAppChat } from "@/components/whatsapp-chat";
import { SiteContentProvider } from "@/components/site-content-provider";
import { clinic } from "@/lib/content";
import "./globals.css";

const display = DM_Sans({ variable: "--font-display", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], display: "swap" });
const editorial = Cormorant_Garamond({ variable: "--font-editorial", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://injectoxclinic.co.uk"),
  title: { default: "Injectox Clinic | Refined Aesthetics in Manchester & Salford", template: "%s | Injectox Clinic" },
  description: "Luxury, consultation-led lip filler, facial balancing, skin and laser treatments in Salford, Greater Manchester.",
  keywords: ["lip filler Manchester", "Russian lips Manchester", "facial balancing Manchester", "aesthetics clinic Salford", "laser hair removal Manchester"],
  alternates: { canonical: "/" },
  openGraph: { title: "Injectox Clinic", description: "Refined aesthetics. Entirely yours.", images: [{ url: "/images/injectox-social-share.png", width: 1729, height: 910, alt: "Injectox Clinic interior" }], locale: "en_GB", type: "website" },
  twitter: { card: "summary_large_image", title: "Injectox Clinic", description: "Refined aesthetics. Entirely yours.", images: ["/images/injectox-social-share.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#efe7dc", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: clinic.name,
    image: "https://injectoxclinic.co.uk/images/injectox-social-share.png",
    address: { "@type": "PostalAddress", streetAddress: "Waters Edge Business Park, Modwen Road", addressLocality: "Salford", addressRegion: "Greater Manchester", addressCountry: "GB" },
    url: "https://injectoxclinic.co.uk",
    telephone: "+447930912949",
    areaServed: clinic.areas,
    aggregateRating: { "@type": "AggregateRating", ratingValue: clinic.rating, reviewCount: clinic.verifiedReviews },
    sameAs: ["https://www.instagram.com/injectoxclinic/"],
  };
  return (
    <html lang="en" className={`${display.variable} ${editorial.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteContentProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <StickyBook />
          <WhatsAppChat />
          <CookieBanner />
          <NewsletterPopup />
        </SiteContentProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
