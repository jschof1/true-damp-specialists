import { services } from "./data/services";
import { areas } from "./data/areas";

export interface RouteMetadata {
  path: string;
  outputPath: string;
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
  priority?: number;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
}

export const routes: RouteMetadata[] = [
  {
    path: "/",
    outputPath: "index.html",
    title: "Independent Damp Surveys | True Damp Specialists",
    description:
      "Independent damp, mould and moisture investigations from a Watford base across London and the Home Counties. Evidence-led reporting and clearer next steps.",
    priority: 1.0,
    changefreq: "weekly",
  },
  {
    path: "/services",
    outputPath: "services/index.html",
    title: "Damp & Moisture Services | True Damp Specialists",
    description:
      "Explore independent damp surveys, moisture diagnostics, mould investigations, waterproofing guidance and remedial support from True Damp Specialists.",
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    path: "/locations",
    outputPath: "locations/index.html",
    title: "Areas We Cover | True Damp Specialists",
    description:
      "Coverage across Watford, London, Buckinghamshire, Hertfordshire, Bedfordshire and Oxfordshire for independent damp and mould investigations.",
    priority: 0.8,
    changefreq: "weekly",
  },
  {
    path: "/reviews",
    outputPath: "reviews/index.html",
    title: "Client Feedback | True Damp Specialists",
    description:
      "Read client feedback themes around clarity, professionalism and diagnosis-first damp investigations from True Damp Specialists.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/faq",
    outputPath: "faq/index.html",
    title: "Damp Survey FAQ | True Damp Specialists",
    description:
      "Answers to common questions about independent damp surveys, mould diagnosis, moisture investigations and next-step reporting.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/contact",
    outputPath: "contact/index.html",
    title: "Contact True Damp Specialists",
    description:
      "Get in touch with True Damp Specialists for independent damp, mould and moisture advice across Watford, London and the Home Counties.",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/about",
    outputPath: "about/index.html",
    title: "About Us | True Damp Specialists",
    description:
      "Independent damp specialists with PCA-trained surveyors, engineers and waterproofing designers. Evidence-led surveys, clear reports, and advice that is not tied to treatment sales.",
    priority: 0.85,
    changefreq: "monthly",
  },
  {
    path: "/get-quote",
    outputPath: "get-quote/index.html",
    title: "Request Specialist Advice | True Damp Specialists",
    description:
      "Share your damp, mould or moisture issue with True Damp Specialists and request independent advice on the right next step.",
    priority: 0.6,
    changefreq: "monthly",
  },
  {
    path: "/portfolio",
    outputPath: "portfolio/index.html",
    title: "Case Studies & Project Evidence | True Damp Specialists",
    description:
      "Explore selected case-study themes, project evidence and investigation-led examples from True Damp Specialists.",
    priority: 0.8,
    changefreq: "weekly",
  },
  /*
  {
    path: "/blog",
    outputPath: "blog/index.html",
    title: "Damp & Moisture Insights | True Damp Specialists",
    description: "Insights and guidance on damp, mould, moisture diagnostics and independent reporting from True Damp Specialists.",
    priority: 0.8,
    changefreq: "weekly",
  },
  */
  {
    path: "/discount",
    outputPath: "discount/index.html",
    title: "Specialist Advice Offer | True Damp Specialists",
    description:
      "Promotional or campaign landing page for True Damp Specialists.",
    noindex: true,
  },
  {
    path: "/feedback",
    outputPath: "feedback/index.html",
    title: "Leave Feedback | True Damp Specialists",
    description:
      "Leave feedback about your experience with True Damp Specialists.",
    noindex: true,
  },
  {
    path: "/add-customer",
    outputPath: "add-customer/index.html",
    title: "Add Customer | True Damp Specialists",
    description:
      "Internal customer intake page for True Damp Specialists.",
    noindex: true,
  },
  {
    path: "/marketing-form",
    outputPath: "marketing-form/index.html",
    title: "Marketing Inquiry | True Damp Specialists",
    description:
      "Internal marketing inquiry page for True Damp Specialists.",
    noindex: true,
  },
  // Dynamic Services
  ...services.map((s) => ({
    path: `/services/${s.slug}`,
    outputPath: `services/${s.slug}/index.html`,
    title: s.metaTitle,
    description: s.metaDescription,
    priority: 0.8,
    changefreq: "monthly" as const,
  })),
  // Dynamic Areas
  ...areas.map((a) => ({
    path: `/locations/${a.slug}`,
    outputPath: `locations/${a.slug}/index.html`,
    title: a.metaTitle || `Independent Damp Survey ${a.name} | True Damp Specialists`,
    description:
      a.metaDescription ||
      `Independent damp, mould and moisture investigations in ${a.name}. Evidence-led diagnosis and practical next-step guidance.`,
    priority: 0.6,
    changefreq: "monthly" as const,
  })),
];

export const indexableRoutes = routes.filter(r => !r.noindex);

