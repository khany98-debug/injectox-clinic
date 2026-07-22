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

export type TitleCopyItem = { title: string; copy: string };

export type PagesContent = {
  home: {
    heroEyebrowLine1: string; heroEyebrowLine2: string; heroIntro: string; heroProof: string[];
    heroPanelLabel: string; heroPanelText: string; trustPoints: string[];
    bookNowBtn: string; viewTreatmentsBtn: string; viewPricingLink: string; meetFatimaLink: string;
    whyEyebrow: string; whyTitleLine1: string; whyTitleLine2: string; reasons: TitleCopyItem[];
    allTreatmentsLink: string;
    concernEyebrow: string; concernTitleLine1: string; concernTitleLine2: string;
    servicesEyebrow: string; servicesTitleLine1: string; servicesTitleLine2: string;
    aboutEyebrow: string; aboutTitleLine1: string; aboutTitleLine2: string; aboutParagraph1: string; aboutParagraph2: string;
    aboutFatimaBtn: string;
    experienceEyebrow: string; experienceTitleLine1: string; experienceTitleLine2: string;
    bookAppointmentBtn: string;
    findClinicEyebrow: string; locationTitleLine1: string; locationTitleLine2: string;
    clinicName: string; clinicAddress1: string; clinicAddress2: string; directionsLink: string;
    pricingPreviewEyebrow: string; pricingPreviewTitle: string;
    pricingItems: { name: string; price: string }[]; viewFullPricingLink: string;
    socialEyebrow: string; socialTitleLine1: string; socialTitleLine2: string;
    reviewsEyebrow: string; reviewsTitleLine1: string; reviewsTitleLine2: string;
    readReviewsLink: string; leaveReviewLink: string;
    faqEyebrow: string; faqTitleLine1: string; faqTitleLine2: string;
    viewAllFaqsBtn: string;
    finalCtaTitleLine1: string; finalCtaTitleLine2: string;
  };
  about: {
    heroEyebrow: string; heroTitleLine1: string; heroTitleLine2: string; heroCopy: string;
    storyEyebrow: string; storyTitleLine1: string; storyTitleLine2: string;
    storyParagraph1: string; storyParagraph2: string; storyQuote: string;
    consultationBtn: string;
  };
  contact: {
    heroEyebrow: string; heroTitleLine1: string; heroTitleLine2: string; heroCopy: string;
    cardEyebrow: string; cardTitle: string; cardCopy: string;
    bookOnSiteBtn: string; messageInstagramBtn: string;
    visitCopy: string; openMapsLink: string; socialCopy: string;
  };
  gallery: {
    heroEyebrow: string; heroTitleLine1: string; heroTitleLine2: string; heroCopy: string;
    introEyebrow: string; introTitleLine1: string; introTitleLine2: string; introCopy: string;
  };
  concerns: {
    heroEyebrow: string; heroTitleLine1: string; heroTitleLine2: string; heroCopy: string;
    introEyebrow: string; introCopy: string;
  };
  concernDetail: { heroEyebrow: string; optionsEyebrow: string; optionsTitle: string; optionsCopy: string; ctaCopy: string };
  treatmentsList: { heroEyebrow: string; heroTitleLine1: string; heroTitleLine2: string; heroCopy: string };
  packages: { heroEyebrow: string; heroTitleLine1: string; heroTitleLine2: string; heroCopy: string };
  payLater: {
    heroEyebrow: string; heroTitleLine1: string; heroTitleLine2: string; heroCopy: string;
    sectionEyebrow: string; sectionTitleLine1: string; sectionTitleLine2: string; sectionCopy: string;
  };
  shop: { eyebrow: string; titleLine1: string; titleLine2: string; copy: string; exploreTreatmentsBtn: string };
  book: { heroEyebrow: string; heroTitleLine1: string; heroTitleLine2: string; heroCopy: string };
  bookSuccess: { titleLine1: string; titleLine2: string; copy: string };
  policies: { heroEyebrow: string; heroTitleLine1: string; heroTitleLine2: string; heroCopy: string; items: TitleCopyItem[] };
};

export const pages = contentData.pages as PagesContent;

export type LegalSection = { title: string; intro: string; sections: TitleCopyItem[] };
export type LegalContent = { cookies: LegalSection; privacy: LegalSection; terms: LegalSection };
export const legal = contentData.legal as LegalContent;

export type SiteChromeContent = { nav: string[]; footerStrapLine1: string; footerStrapLine2: string };
export const siteChrome = contentData.siteChrome as SiteChromeContent;

export type SharedContent = {
  statsSection: { eyebrow: string; titleLine1: string; titleLine2: string; copy: string };
  resultFilmPanel: { eyebrow: string; titleLine1: string; titleLine2: string };
  bookingSteps: TitleCopyItem[];
  trustPanel: TitleCopyItem[];
  finalCta: { eyebrow: string; titleLine1: string; titleLine2: string; copy: string };
  socialFollow: string;
  bookingFlowCopy: {
    introTitle: string; introCopy: string;
    step1Eyebrow: string; step1Title: string;
    step2Eyebrow: string; step2Title: string; step2Copy: string;
    step3Eyebrow: string; step3Title: string; step3Copy: string;
    step4Eyebrow: string; step4Title: string;
    depositNote: string; freeConsultNote: string; consentCopy: string;
    summaryEyebrow: string; summaryEmptyTitle: string; summaryEmptyCopy: string;
    secureTitle: string; secureCopy: string;
  };
  reviewSubmitCopy: { successTitle: string; successCopy: string; eyebrow: string; titleLine1: string; titleLine2: string; copy: string };
};
export const shared = contentData.shared as SharedContent;

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
