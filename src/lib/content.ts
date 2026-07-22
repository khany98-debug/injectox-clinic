import contentData from "./content.data.json";

// All copy below is loaded from content.data.json so it can be edited in place
// (by hand, or via the dev-only click-to-edit overlay) without touching this file.

export const booking = contentData.booking;
export const clinic = contentData.clinic;

export type Treatment = {
  slug: string;
  name: string;
  category: "Injectables" | "Skin" | "Laser" | "Wellness";
  eyebrow: string;
  intro: string;
  price: number;
  duration: string;
  downtime: string;
  consultation: boolean;
  patchTest?: boolean;
  benefits: string[];
  idealFor: string[];
  process: string[];
  faq: { q: string; a: string }[];
  image: string;
  relatedConcerns: string[];
};

export const treatments = contentData.treatments as Treatment[];

export type Concern = { slug: string; title: string; short: string; treatments: string[] };
export const concerns = contentData.concerns as Concern[];

export type PriceItem = { name: string; price: number; duration: string };
export type PriceGroup = { category: string; note?: string; items: PriceItem[] };
export const pricing = contentData.pricing as PriceGroup[];

export type GalleryItem = { src: string; label: string; href: string };
export const gallery = contentData.gallery as GalleryItem[];

export type ResultItem = { src: string; label: string; category: string; note: string };
export const results = contentData.results as ResultItem[];

export type ResultFilm = { src: string; poster: string; label: string; category: string; note: string };
export const resultFilms = contentData.resultFilms as ResultFilm[];

export type Review = { name: string; treatment: string; date: string; quote: string };
export const reviews = contentData.reviews as Review[];

export type Faq = { q: string; a: string };
export const faqs = contentData.faqs as Faq[];

export function treatmentBySlug(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function concernBySlug(slug: string) {
  return concerns.find((c) => c.slug === slug);
}

export function formatPrice(value: number) {
  return value === 0 ? "Free" : `£${value}`;
}

export function bookingImageFor(serviceName: string) {
  const name = serviceName.toLowerCase();
  if (name.includes("consultation")) return "/images/dropbox/client-labelled/consultation-fatima.jpg";
  if (name.includes("vitamin") || name.includes("biotin")) return "/images/dropbox/client-labelled/vitamin-injection.jpg";
  if (name.includes("lemon bottle")) return "/images/dropbox/client-labelled/lemon-bottle-booking.jpg";
  if (name.includes("laser") || name.includes("body") || name.includes("bikini") || name.includes("hollywood") || name.includes("small area") || name.includes("medium area") || name.includes("large area")) return "/images/dropbox/client-labelled/laser-hair-removal-main.jpg";
  if (name.includes("microneedling")) return "/images/dropbox/client-labelled/microneedling.jpg";
  if (name.includes("chemical peel") || name.includes("biorepeel")) return "/images/dropbox/client-labelled/chemical-peel.jpg";
  if (name.includes("clinicare")) return "/images/dropbox/client-labelled/clinicare-facial.jpg";
  if (name.includes("dermaplane")) return "/images/dropbox/client-labelled/dermaplane.jpg";
  if (name.includes("glass skin") || name.includes("full works") || name.includes("extraction")) return "/images/dropbox/client-labelled/glow-facial.jpg";
  if (name.includes("polynucleotide")) return "/images/dropbox/client-labelled/polynucleotides.jpg";
  if (name.includes("lumi pro") || name.includes("aqua shine")) return "/images/dropbox/client-labelled/lumi-pro-skin-booster-product.jpg";
  if (name.includes("skin booster") || name.includes("lumi") || name.includes("profhilo") || name.includes("hyal") || name.includes("baby glow") || name.includes("ami eyes")) return "/images/dropbox/client-labelled/skin-booster-main.jpg";
  if (name.includes("anti-wrinkle") || name.includes("one area") || name.includes("two areas") || name.includes("three areas") || name.includes("masseter") || name.includes("brow") || name.includes("bunny") || name.includes("lip flip") || name.includes("downturned")) return "/images/dropbox/client-labelled/anti-wrinkle.jpg";
  if (name.includes("tear trough")) return "/images/dropbox/client-labelled/tear-trough-filler.jpg";
  if (name.includes("chin")) return "/images/dropbox/client-labelled/chin-filler.jpg";
  if (name.includes("jaw")) return "/images/dropbox/client-labelled/jaw-filler.jpg";
  if (name.includes("cheek")) return "/images/dropbox/client-labelled/cheek-filler.jpg";
  if (name.includes("facial balancing") || name.includes("package")) return "/images/dropbox/client-labelled/facial-balancing.jpg";
  if (name.includes("dissolv")) return "/images/dropbox/client-labelled/filler-dissolving.jpg";
  if (name.includes("smile lines")) return "/images/dropbox/client-labelled/smile-lines.jpg";
  if (name.includes("marionette")) return "/images/dropbox/client-labelled/marionette-lines.jpg";
  if (name.includes("nasolabial")) return "/images/dropbox/client-labelled/lip-1-1ml.jpg";
  if (name.includes("lip")) return "/images/dropbox/client-labelled/lip-0-7ml.jpg";
  return "/images/dropbox/client-labelled/advanced-facial.jpg";
}
