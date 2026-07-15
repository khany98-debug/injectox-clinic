export const booking = {
  provider: "Injectox",
  consultation: "/book?service=Free%20consultation",
  treatment: "/book",
  currentDiary:
    "https://facesconsent.com/clinics/manchester-salford-injectox-clinic-7fa674fa29d6/injectoxclinic?clinicName=injectoxclinic",
  instagram: "https://www.instagram.com/injectoxclinic/",
  // Add the clinic's dedicated WhatsApp URL before launch. CTAs gracefully fall back to Instagram.
  whatsapp: "",
} as const;

export const clinic = {
  name: "Injectox Clinic",
  practitioner: "Fatima Khan",
  role: "Aesthetic practitioner",
  location: "Skin Clinic MCR, Waters Edge Business Park, Modwen Road, Salford",
  areas: ["Manchester", "Salford", "Bolton"],
  rating: "5.0",
  verifiedReviews: 53,
  treatmentsCompleted: 492,
  // Live figures verified against the public Faces profile on 15 July 2026.
  instagramFollowers: "8.3k",
} as const;

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

export const treatments: Treatment[] = [
  {
    slug: "russian-lip-filler",
    name: "Russian Lip Filler",
    category: "Injectables",
    eyebrow: "The signature",
    intro:
      "A precision-led lip treatment designed around shape, lift and proportion—not a one-size-fits-all trend.",
    price: 160,
    duration: "45 mins",
    downtime: "Usually 2–7 days",
    consultation: true,
    benefits: ["Refined definition", "Tailored volume", "Balanced side profile", "Natural-looking finish"],
    idealFor: ["Lips lacking shape", "Subtle volume", "Cupid’s bow definition", "Rebalancing existing filler"],
    process: ["Consultation and facial assessment", "Bespoke technique selection", "Precision treatment", "Aftercare and review guidance"],
    faq: [
      { q: "Will my lips look overfilled?", a: "The plan is built around your proportions and desired finish. Fatima’s public treatment philosophy prioritises facial harmony and staged results over chasing volume." },
      { q: "How much product is used?", a: "The current Russian Lip appointment listed on Faces is 0.7ml. The right plan is confirmed during your assessment." },
      { q: "How long do results last?", a: "Longevity varies with metabolism, product and lifestyle. Your practitioner will explain realistic expectations at consultation." },
    ],
    image: "/images/social/c7fad21909e20ae0.jpg",
    relatedConcerns: ["thin-lips", "facial-imbalance"],
  },
  {
    slug: "facial-balancing",
    name: "Facial Balancing",
    category: "Injectables",
    eyebrow: "Bespoke planning",
    intro: "A considered, multi-area approach that looks at the face as a whole to create a more harmonious profile.",
    price: 249,
    duration: "From 60 mins",
    downtime: "Usually 2–7 days",
    consultation: true,
    benefits: ["Whole-face assessment", "More harmonious proportions", "Flexible multi-area plans", "Subtle, cohesive change"],
    idealFor: ["Profile balancing", "Chin or jaw definition", "Cheek support", "A bespoke refresh"],
    process: ["Facial mapping", "Honest treatment prioritisation", "Staged or same-day plan", "Review guidance"],
    faq: [
      { q: "Which areas are treated?", a: "That depends on your anatomy and goals. Packages are flexible and the consultation is used to decide where treatment adds genuine value." },
      { q: "Do I need everything at once?", a: "No. A staged plan can often be the most refined route and helps protect natural proportions." },
    ],
    image: "/images/social/d63e43704810bbe8.jpg",
    relatedConcerns: ["facial-imbalance", "fine-lines"],
  },
  {
    slug: "anti-wrinkle",
    name: "Anti-Wrinkle",
    category: "Injectables",
    eyebrow: "Expression, softened",
    intro: "Consultation-led treatment for a fresher, rested appearance while protecting the character of your face.",
    price: 149,
    duration: "30–45 mins",
    downtime: "Minimal",
    consultation: true,
    benefits: ["Softens selected lines", "Bespoke area planning", "Fresh, rested look", "Natural expression prioritised"],
    idealFor: ["Forehead lines", "Frown lines", "Crow’s feet", "Brow or lower-face concerns"],
    process: ["Medical suitability check", "Expression assessment", "Precision treatment", "Review as advised"],
    faq: [
      { q: "How many areas do I need?", a: "One, two and three-area options are listed. Your assessment determines the most appropriate plan." },
      { q: "When will I see a change?", a: "Results develop gradually rather than instantly. Your practitioner will outline the expected timeline and review process." },
    ],
    image: "/images/social/e02d3028604462dc.jpg",
    relatedConcerns: ["fine-lines", "facial-imbalance"],
  },
  {
    slug: "skin-boosters",
    name: "Skin Boosters",
    category: "Skin",
    eyebrow: "Hydration, elevated",
    intro: "Injectable hydration options chosen to support radiance, texture and a healthy-looking skin finish.",
    price: 119,
    duration: "30–45 mins",
    downtime: "Usually 1–3 days",
    consultation: true,
    benefits: ["Deep hydration", "Improved radiance", "Smoother texture", "Collagen-supportive options"],
    idealFor: ["Dullness", "Dehydration", "Fine texture", "Pre-event skin planning"],
    process: ["Skin assessment", "Product selection", "Targeted treatment", "Course planning if appropriate"],
    faq: [
      { q: "Which skin booster is right for me?", a: "Injectox lists several options including Lumi Pro, Baby Glow, Seventy Hyal, Aqua Shine and Profhilo. Selection depends on your skin and goals." },
      { q: "Can it be combined with microneedling?", a: "The clinic’s public education highlights combination planning. Suitability, order and timing should be confirmed at consultation." },
    ],
    image: "/images/social/54478c754cf500e7.jpg",
    relatedConcerns: ["dull-skin", "acne-pigmentation-texture"],
  },
  {
    slug: "microneedling",
    name: "Microneedling",
    category: "Skin",
    eyebrow: "Texture, renewed",
    intro: "A collagen-supporting treatment for clients seeking smoother, more even and revitalised-looking skin.",
    price: 65,
    duration: "60 mins",
    downtime: "Usually 1–3 days",
    consultation: true,
    benefits: ["Supports collagen", "Targets uneven texture", "Softens the look of pores", "Course-friendly"],
    idealFor: ["Texture", "Post-acne marks", "Visible pores", "Dull-looking skin"],
    process: ["Skin consultation", "Preparation and cleanse", "Controlled microneedling", "Recovery plan"],
    faq: [
      { q: "Is one session enough?", a: "Some clients value a single refresh; texture and scarring goals often benefit from a planned course." },
      { q: "What should I avoid afterwards?", a: "You will receive aftercare tailored to your treatment. SPF, gentle skincare and avoiding heat or active ingredients are commonly discussed." },
    ],
    image: "/images/social/4fc1e289fbac258e.jpg",
    relatedConcerns: ["acne-pigmentation-texture", "dull-skin"],
  },
  {
    slug: "advanced-facials",
    name: "Advanced Facials",
    category: "Skin",
    eyebrow: "The polished reset",
    intro: "From Glass Skin to extraction-led and medical-grade facial options, chosen around what your skin needs now.",
    price: 60,
    duration: "30–60 mins",
    downtime: "None to minimal",
    consultation: false,
    benefits: ["Immediate polish", "Bespoke skin focus", "Multiple treatment options", "Event-ready planning"],
    idealFor: ["Congestion", "Dullness", "Dry texture", "Regular maintenance"],
    process: ["Skin check-in", "Targeted treatment steps", "Finishing care", "Home-care guidance"],
    faq: [
      { q: "Which facial should I book?", a: "If you are unsure, book a consultation or send an enquiry. The right choice depends on sensitivity, congestion, goals and timing." },
      { q: "Can I book before an event?", a: "Yes, but leave appropriate time—especially for peels or extraction. Ask the clinic for a personalised timeline." },
    ],
    image: "/images/social/8e4de4dfc3262fcb.jpg",
    relatedConcerns: ["dull-skin", "acne-pigmentation-texture"],
  },
  {
    slug: "laser-hair-removal",
    name: "Laser Hair Removal",
    category: "Laser",
    eyebrow: "Long-term smoothness",
    intro: "A course-led route to reducing unwanted facial or body hair with flexible single-area and package options.",
    price: 25,
    duration: "30–60 mins",
    downtime: "Minimal",
    consultation: true,
    patchTest: true,
    benefits: ["Face and body options", "Flexible area sizing", "Six-session packages", "Course planning"],
    idealFor: ["Unwanted facial hair", "Underarms", "Bikini", "Full-body planning"],
    process: ["Consultation and patch test", "Course design", "Treatment sessions", "Progress review"],
    faq: [
      { q: "Do I need a patch test?", a: "Patch testing and suitability should be confirmed before starting a laser course." },
      { q: "How many sessions are available?", a: "Current package listings use six sessions with one session free for selected areas." },
    ],
    image: "/images/social/afba577fea3621ea.jpg",
    relatedConcerns: ["unwanted-hair"],
  },
  {
    slug: "filler-dissolving",
    name: "Filler Dissolving",
    category: "Injectables",
    eyebrow: "Reset with care",
    intro: "A consultation-led service for clients considering correction, removal or a thoughtful reset before a new plan.",
    price: 119,
    duration: "45 mins",
    downtime: "Variable",
    consultation: true,
    benefits: ["Assessment first", "Correction-led planning", "Supports a fresh start", "Clear next-step guidance"],
    idealFor: ["Migration concerns", "Previous filler dissatisfaction", "A planned refill", "Professional assessment"],
    process: ["History and assessment", "Suitability discussion", "Treatment if appropriate", "Review before refilling"],
    faq: [
      { q: "Can I refill immediately?", a: "A suitable interval and reassessment are important. The clinic will advise your personal timeline." },
      { q: "Is dissolving always needed?", a: "No. An honest assessment is the right first step; treatment is only recommended when appropriate." },
    ],
    image: "/images/social/ab960fcc2e310c70.jpg",
    relatedConcerns: ["thin-lips", "facial-imbalance"],
  },
];

export const concerns = [
  { slug: "thin-lips", title: "Lips & definition", short: "Shape, symmetry and softly considered volume.", number: "01", treatments: ["russian-lip-filler", "filler-dissolving"] },
  { slug: "facial-imbalance", title: "Facial balancing", short: "Profile harmony, structure and whole-face planning.", number: "02", treatments: ["facial-balancing", "anti-wrinkle"] },
  { slug: "fine-lines", title: "Fine lines", short: "A fresher expression without erasing character.", number: "03", treatments: ["anti-wrinkle", "skin-boosters"] },
  { slug: "dull-skin", title: "Dull or tired skin", short: "Hydration, brightness and a polished reset.", number: "04", treatments: ["skin-boosters", "advanced-facials"] },
  { slug: "acne-pigmentation-texture", title: "Texture & clarity", short: "Support for uneven texture, visible pores and post-acne marks.", number: "05", treatments: ["microneedling", "advanced-facials"] },
  { slug: "unwanted-hair", title: "Unwanted hair", short: "A considered course for face or body.", number: "06", treatments: ["laser-hair-removal"] },
] as const;

export type PriceItem = { name: string; price: number; duration: string };
export type PriceGroup = { category: string; note?: string; items: PriceItem[] };

export const pricing: PriceGroup[] = [
  { category: "Consultation", items: [
    { name: "Free consultation", price: 0, duration: "15 mins" },
    { name: "Adjustment / follow-up deposit", price: 20, duration: "45 mins" },
  ]},
  { category: "Lip & dermal filler", items: [
    { name: "Russian Lip — 0.7ml", price: 160, duration: "45 mins" },
    { name: "Smile lines — 1.1ml", price: 119, duration: "45 mins" },
    { name: "Marionette lines — 1.1ml", price: 119, duration: "30 mins" },
    { name: "Nasolabial folds — 1.1ml", price: 119, duration: "30 mins" },
    { name: "Tear trough — Teosyal Redensity 2", price: 199, duration: "30 mins" },
    { name: "Chin filler — 1.1ml", price: 119, duration: "30 mins" },
    { name: "Jaw filler — 1.1ml", price: 119, duration: "45 mins" },
    { name: "Chin filler — 2.2ml", price: 219, duration: "45 mins" },
    { name: "Cheek filler — 2.2ml", price: 219, duration: "45 mins" },
    { name: "Jaw filler — 2.2ml", price: 219, duration: "45 mins" },
    { name: "Filler dissolving", price: 119, duration: "45 mins" },
  ]},
  { category: "Anti-wrinkle", items: [
    { name: "One area", price: 149, duration: "30 mins" },
    { name: "Two areas", price: 175, duration: "45 mins" },
    { name: "Three areas", price: 199, duration: "30 mins" },
    { name: "Masseter", price: 175, duration: "30 mins" },
    { name: "Lip flip add-on", price: 75, duration: "30 mins" },
    { name: "Brow lift add-on", price: 75, duration: "30 mins" },
    { name: "Bunny lines add-on", price: 75, duration: "30 mins" },
    { name: "Downturned smile add-on", price: 75, duration: "30 mins" },
  ]},
  { category: "Skin boosters & polynucleotides", items: [
    { name: "Lumi Pro / Aqua Shine / Skin Booster", price: 119, duration: "30 mins" },
    { name: "Baby Glow", price: 149, duration: "30 mins" },
    { name: "Seventy Hyal 2000", price: 175, duration: "30 mins" },
    { name: "Profhilo", price: 175, duration: "45 mins" },
    { name: "Lumi Eyes", price: 149, duration: "30 mins" },
    { name: "Ami Eyes", price: 99, duration: "30 mins" },
    { name: "Polynucleotides", price: 119, duration: "45 mins" },
    { name: "Lemon Bottle skin booster", price: 119, duration: "30 mins" },
  ]},
  { category: "Facials & microneedling", items: [
    { name: "Microneedling", price: 65, duration: "60 mins" },
    { name: "Microneedling + BioRePeel", price: 99, duration: "45 mins" },
    { name: "Chemical peel", price: 60, duration: "30 mins" },
    { name: "Glass Skin facial", price: 75, duration: "60 mins" },
    { name: "Luxury extraction facial", price: 65, duration: "60 mins" },
    { name: "The Full Works facial", price: 99, duration: "60 mins" },
    { name: "Medical-grade Clinicare facial", price: 75, duration: "60 mins" },
    { name: "Dermaplane", price: 15, duration: "15 mins" },
    { name: "Dermaplane add-on", price: 10, duration: "15 mins" },
  ]},
  { category: "Laser hair removal", note: "Patch test and consultation requirements apply.", items: [
    { name: "Small area", price: 25, duration: "30 mins" },
    { name: "Medium area", price: 45, duration: "30 mins" },
    { name: "Large area", price: 90, duration: "45 mins" },
    { name: "Full bikini / Hollywood", price: 60, duration: "30 mins" },
    { name: "Underarms + full Hollywood", price: 95, duration: "30 mins" },
    { name: "Full body", price: 175, duration: "60 mins" },
  ]},
  { category: "Packages", items: [
    { name: "2.2ml package", price: 249, duration: "60 mins" },
    { name: "3.3ml package", price: 299, duration: "90 mins" },
    { name: "4.4ml package", price: 399, duration: "105 mins" },
    { name: "Bespoke facial balancing", price: 499, duration: "60 mins" },
    { name: "Small-area laser course", price: 150, duration: "6 + 1 sessions" },
    { name: "Medium-area laser course", price: 270, duration: "6 + 1 sessions" },
    { name: "Large-area laser course", price: 540, duration: "6 + 1 sessions" },
    { name: "Full-body laser package", price: 1050, duration: "6 sessions" },
    { name: "Underarms + Hollywood laser course", price: 570, duration: "6 + 1 sessions" },
    { name: "Lemon Bottle six-session package", price: 300, duration: "6 sessions" },
  ]},
  { category: "Wellness & other", items: [
    { name: "Vitamin B12", price: 25, duration: "30 mins" },
    { name: "Vitamin B complex", price: 25, duration: "30 mins" },
    { name: "Vitamin D", price: 29, duration: "30 mins" },
    { name: "Biotin (Vitamin B7)", price: 29, duration: "30 mins" },
    { name: "Lemon Bottle small area", price: 60, duration: "30 mins" },
    { name: "Lemon Bottle medium area", price: 75, duration: "30 mins" },
    { name: "Lemon Bottle large area", price: 90, duration: "30 mins" },
    { name: "Tattoo removal", price: 70, duration: "30 mins" },
  ]},
];

export const gallery = [
  { src: "/images/dropbox/injectox-editorial-01.jpg", label: "Clinic atmosphere", href: "#" },
  { src: "/images/dropbox/injectox-editorial-02.jpg", label: "Treatment detail", href: "#" },
  { src: "/images/dropbox/injectox-clinic-sign.jpg", label: "The Injectox clinic", href: "#" },
  { src: "/images/dropbox/injectox-result-01.jpg", label: "Client result", href: "#" },
  { src: "/images/dropbox/injectox-result-02.jpg", label: "Skin result", href: "#" },
  { src: "/images/social/4fc1e289fbac258e.jpg", label: "Treatment philosophy", href: "https://www.instagram.com/injectoxclinic/reel/DZVY34pskdH/" },
  { src: "/images/social/0636b6d47d8d3e49.jpg", label: "Clinic moments", href: "https://www.instagram.com/injectoxclinic/p/DX9Cbg2s1SD/" },
  { src: "/images/social/54478c754cf500e7.jpg", label: "Skin education", href: "https://www.instagram.com/injectoxclinic/reel/DanzQC4o3DN/" },
  { src: "/images/social/8e4de4dfc3262fcb.jpg", label: "Lip artistry", href: "https://www.instagram.com/injectoxclinic/reel/DavfFZsMAnP/" },
  { src: "/images/social/49579a88687f33ed.jpg", label: "Glow-up edit", href: "https://www.instagram.com/injectoxclinic/p/DaZ9BrBjP0L/" },
  { src: "/images/social/e02d3028604462dc.jpg", label: "Dream results", href: "https://www.instagram.com/injectoxclinic/reel/DaQnFAmsKaz/" },
  { src: "/images/social/41cad99b397d6870.jpg", label: "Client story", href: "https://www.instagram.com/injectoxclinic/p/DagAffEjODI/" },
  { src: "/images/social/c7fad21909e20ae0.jpg", label: "Subtle enhancement", href: "https://www.instagram.com/injectoxclinic/reel/Daio9HuMDru/" },
  { src: "/images/social/ab960fcc2e310c70.jpg", label: "Editorial education", href: "https://www.instagram.com/injectoxclinic/p/DasWjLnDJK1/" },
  { src: "/images/social/6d81c12c58ba24db.jpg", label: "Skin detail", href: "https://www.instagram.com/injectoxclinic/p/DaZ9BrBjP0L/" },
  { src: "/images/social/d63e43704810bbe8.jpg", label: "Facial harmony", href: "https://www.instagram.com/injectoxclinic/reel/DaQnFAmsKaz/" },
  { src: "/images/social/afba577fea3621ea.jpg", label: "Clinic reel", href: "https://www.instagram.com/injectoxclinic/reel/DaVwv_psWTA/" },
] as const;

export const reviews = [
  { name: "Evin B.", treatment: "Aesthetics", date: "July 2026", quote: "The only person I will ever let touch my face. I’m ageing backwards!" },
  { name: "Lacey H.", treatment: "Bespoke plan", date: "July 2026", quote: "Fatima is amazing. She is so genuine and has talked me out of procedures she knew I didn’t need. She really cares about the results and looking natural." },
] as const;

export const faqs = [
  { q: "Do I need a consultation?", a: "Consultation is central to injectable, laser and more advanced treatment planning. A free 15-minute consultation is currently listed through Faces." },
  { q: "Will I still look like myself?", a: "That is the point. The clinic’s public philosophy is built around facial harmony, tailored plans and enhancement that looks polished rather than overdone." },
  { q: "Where is the clinic?", a: "Injectox currently operates from Skin Clinic MCR at Waters Edge Business Park on Modwen Road in Salford. The old Bolton location is marked unavailable on Faces." },
  { q: "How do deposits and cancellations work?", a: "The external booking flow shows the terms that apply to your appointment. Read and accept the current provider policy before paying a deposit." },
  { q: "Are treatments 18+?", a: "Injectable aesthetic treatments on this site are presented for adults aged 18 and over. ID and suitability checks may apply." },
  { q: "Do laser treatments need a patch test?", a: "Patch testing and suitability should be confirmed before starting a laser course. The clinic will give you the correct preparation window." },
] as const;

export function treatmentBySlug(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function concernBySlug(slug: string) {
  return concerns.find((c) => c.slug === slug);
}

export function formatPrice(value: number) {
  return value === 0 ? "Free" : `£${value}`;
}
