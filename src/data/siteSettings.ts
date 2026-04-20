export const siteSettings = {
  businessName: "True Damp Specialists",
  legalName: "TRUE DAMP SPECIALISTS LIMITED",
  baseUrl: "https://www.truedampspecialists.co.uk",
  primaryImagePath: "/assets/true-damp-hero-og.jpeg",
  /** House mark only (transparent PNG); wordmark is rendered as text in layout. */
  logoPath: "/assets/true-damp-logo-icon.png",
  /** Two-line lockup next to the icon for readability on dark headers. */
  logoWordmarkLine1: "True Damp",
  logoWordmarkLine2: "Specialists",
  phone: "+447782229411",
  phoneFormatted: "+44 7782 229411",
  email: "info@truedampspecialists.co.uk",
  address: "Watford, Hertfordshire WD24 4AS, UK",
  addressDetails: {
    addressLocality: "Watford",
    addressRegion: "Hertfordshire",
    postalCode: "WD24 4AS",
    addressCountry: "GB",
  },
  /** Geo coordinates not available from the supplied brief; omitted intentionally. */
  geo: undefined as { latitude: number; longitude: number } | undefined,
  priceRange: "££",
  /** Public rating references should be treated carefully until approved by the client. */
  googleRating: null as string | null,
  reviewCount: null as string | null,
  /** Review links are routed to public profiles until a preferred GBP/share link is confirmed. */
  googlePageUrl: "https://www.checkatrade.com/trades/truedampspecialists",
  sameAs: [] as string[],
  feedbackGoogleReviewUrl: "https://g.page/r/CU-GUEpjknolEBM/review",
  areaServed:
    "London, the Home Counties, the Midlands, Watford, Buckinghamshire, Hertfordshire, Bedfordshire, Oxfordshire and specialist projects across the UK",
  standardFaqs: [
    {
      question: "Why choose an independent damp survey instead of a free damp quote?",
      answer:
        "An independent survey focuses on diagnosis, not product sales. That means the findings are driven by evidence such as moisture profiling, thermal imaging, salts, ventilation and building defects, rather than a pre-decided treatment recommendation.",
    },
    {
      question: "Can you help if another damp company has already given conflicting advice?",
      answer:
        "Yes. Second-opinion work is a core part of what we do. We are often asked to review failed treatments, generic reports, or unclear recommendations and explain what is actually causing the issue.",
    },
    {
      question: "Do you only work for homeowners?",
      answer:
        "No. We work with homeowners, buyers, landlords, housing providers, managing agents, developers, and commercial clients. The reporting style is tailored to the property type and the decision that needs to be made.",
    },
    {
      question: "Do you carry out the remedial works yourselves?",
      answer:
        "Our primary role is diagnosis, reporting, and remedial planning. Where works are needed, we explain the right next step clearly and can help clients understand what kind of specialist or system is appropriate.",
    },
    {
      question: "What areas do you cover?",
      answer:
        "We are based in Watford and cover London, the Home Counties and the Midlands, plus Buckinghamshire, Hertfordshire, Bedfordshire, and Oxfordshire, with availability for specialist projects elsewhere in the UK.",
    },
    {
      question: "Can your reports help with Awaab's Law and damp compliance cases?",
      answer:
        "Yes, where relevant. We provide evidence-led reporting that can support landlords, housing providers, and property professionals dealing with damp, mould, moisture, and health-related housing concerns.",
    },
    {
      question: "What is included in a damp and mould investigation?",
      answer:
        "Investigations typically combine visual inspection, moisture profiling, thermal imaging, salts analysis, ventilation assessment, and defect-led reasoning so that the likely cause, extent, and practical next steps are clearly documented.",
    },
    {
      question: "Do you offer any guarantee on your findings?",
      answer:
        "The client commitment described in the brief is that if a client is not satisfied that the likely cause or next steps have been made clear, the case will be reviewed again free of charge. Any final wording should stay aligned with the client's approved promise.",
    },
  ],
};
