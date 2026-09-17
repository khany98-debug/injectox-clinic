import { clinic, booking, type Treatment } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

const address = {
  "@type": "PostalAddress",
  streetAddress: "Unit 36, Waters Edge Business Park, Modwen Road",
  addressLocality: "Salford",
  addressRegion: "Greater Manchester",
  postalCode: clinic.postcode,
  addressCountry: "GB",
};

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteUrl}/#clinic`,
    name: clinic.name,
    legalName: clinic.legalName,
    image: `${siteUrl}/images/injectox-social-share.jpg`,
    address,
    url: siteUrl,
    telephone: clinic.phone,
    areaServed: clinic.areas,
    priceRange: "££",
    openingHoursSpecification: clinic.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${hours}`,
      opens: "12:00",
      closes: "18:00",
    })),
    aggregateRating: { "@type": "AggregateRating", ratingValue: clinic.rating, reviewCount: clinic.verifiedReviews },
    sameAs: [booking.instagram],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function TreatmentSchema({ treatment }: { treatment: Treatment }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Treatments", item: `${siteUrl}/treatments` },
      { "@type": "ListItem", position: 2, name: treatment.name, item: `${siteUrl}/treatments/${treatment.slug}` },
    ],
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: treatment.name,
    description: treatment.intro,
    provider: { "@id": `${siteUrl}/#clinic` },
    areaServed: clinic.areas,
    offers: { "@type": "Offer", priceCurrency: "GBP", price: treatment.price, url: `${siteUrl}/treatments/${treatment.slug}` },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} /></>;
}
