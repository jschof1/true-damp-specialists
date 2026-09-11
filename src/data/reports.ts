export type ReportCategory = "Sample Reports" | "Guidance Notes" | "Technical Briefings";

export interface ReportResource {
  title: string;
  description: string;
  category: ReportCategory;
  status: string;
  href?: string;
  featured?: boolean;
}

export const reportResources: ReportResource[] = [
  { title: "Sample reports", description: "Redacted sample reports will be added once the underlying project material has been approved for publication.", category: "Sample Reports", status: "Coming soon", featured: true },
  { title: "Condensation and BS 5250", description: "Plain-English guidance on condensation risk and the role of BS 5250 in moisture control.", category: "Guidance Notes", status: "PDF available", href: "/reports/condensation-bs-5250.pdf", featured: true },
  { title: "Understanding Moisture in Buildings", description: "An accessible overview of how moisture behaves in buildings and why diagnosis should come before treatment.", category: "Guidance Notes", status: "PDF available", href: "/reports/understanding-moisture-in-buildings.pdf" },
  { title: "Thermal Imaging in Damp Diagnosis", description: "What thermal imaging can show, what it cannot prove on its own, and how it supports wider investigation.", category: "Technical Briefings", status: "PDF available", href: "/reports/thermal-imaging-in-damp-diagnosis.pdf", featured: true },
];

export const reportCategories: ReportCategory[] = ["Sample Reports", "Guidance Notes", "Technical Briefings"];

export const reportsPageContent = {
  navLabel: "Reports",
  seoTitle: "Reports & Guidance",
  seoDescription: "Read specialist damp and moisture investigation guidance from True Damp Specialists, including technical notes on thermal imaging, condensation and moisture diagnosis.",
  breadcrumbLabel: "Reports and guidance",
  hero: {
    eyebrow: "Reports and guidance",
    title: "See the Reporting Behind the Advice",
    description: "Reports explain the concern, relevant evidence, diagnosis and recommendations so the next decision is easier to make.",
    imageAlt: "Exposed building fabric photographed during a damp and moisture investigation",
    primaryCta: "View guidance",
    secondaryCta: "Discuss Your Property",
  },
  trustCards: [
    {
      title: "Sample reports",
      text: "Redacted sample reports are being prepared separately so private property details are not published.",
    },
    {
      title: "Practical guidance",
      text: "Understand common damp and mould causes without sales-led advice.",
    },
    {
      title: "Technical notes",
      text: "Learn how tools like thermal imaging support diagnosis.",
    },
  ],
  featured: {
    eyebrow: "Start here",
    title: "Featured guidance",
    description: "Start with the documents that explain moisture behaviour, diagnostic tools and common reasons damp repairs fail.",
  },
  library: {
    title: "Report library",
    description: "Guidance notes are available now. Sample investigation reports remain listed as previews until redacted versions are approved.",
  },
  cta: {
    title: "Need reporting for your own property?",
    description: "Tell us about the property and the decision you need to make. We will advise on the appropriate investigation and reporting scope.",
    primaryText: "Discuss Your Property",
    secondaryPrefix: "Call",
  },
};
