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
      "Independent damp, mould and moisture specialists focused on diagnosis, evidence-led reporting and practical next steps across London, the Home Counties and the Midlands.",
    priority: 1.0,
    changefreq: "weekly",
  },
  {
    path: "/services",
    outputPath: "services/index.html",
    title: "Services | True Damp Specialists",
    description:
      "We identify the cause of damp, mould and moisture issues using evidence-led investigation — giving you clear conclusions and practical next steps you can rely on.",
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    path: "/locations",
    outputPath: "locations/index.html",
    title: "Damp Problems We Diagnose | True Damp Specialists",
    description:
      "Independent, evidence-led damp and moisture investigations across residential, heritage and complex buildings, focused on getting the diagnosis right.",
    priority: 0.8,
    changefreq: "weekly",
  },
  {
    path: "/reviews",
    outputPath: "reviews/index.html",
    title: "Reviews | True Damp Specialists",
    description:
      "Read what clients say after getting the right diagnosis, with independent damp and moisture investigations focused on clarity and correct next steps.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/faq",
    outputPath: "faq/index.html",
    title: "Damp Survey FAQ | True Damp Specialists",
    description:
      "Answers on damp surveys, mould, condensation, waterproofing, report scope and remedial recommendations.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/contact",
    outputPath: "contact/index.html",
    title: "Contact True Damp Specialists | Independent Damp Specialists",
    description:
      "Speak to a damp and moisture specialist for independent advice, diagnosis-led surveys, second opinions, and clear next-step guidance.",
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
    title: "Request a Survey | True Damp Specialists",
    description:
      "Request an independent damp, mould or waterproofing survey in under 2 minutes. Fast response across London & the Home Counties and the UK.",
      "Tell us what you're seeing and we'll point you toward the right next step. Independent damp, mould and moisture advice from True Damp Specialists.",
    priority: 0.6,
    changefreq: "monthly",
  },
  {
    path: "/portfolio",
    outputPath: "portfolio/index.html",
    title: "Case Studies | True Damp Specialists",
    description:
      "This section should showcase outcomes, project types and the sort of evidence-rich work the business is known for, rather than generic marketing gallery filler.",
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

