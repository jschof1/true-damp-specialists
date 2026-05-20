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
  {
    title: "Sample Escape of Water Report",
    description: "Example report for an escape-of-water scenario, useful for understanding moisture pathways and remedial priorities.",
    category: "Sample Reports",
    status: "Preview coming soon",
    featured: true,
  },
  {
    title: "Sample Home Buyer Damp Report",
    description: "Sample report for home buyers who need clarity before purchase, negotiation or planned remedial works.",
    category: "Sample Reports",
    status: "Preview coming soon",
    featured: true,
  },
  {
    title: "Sample Heritage Damp Report",
    description: "Example report for a heritage or older building where breathability, materials and context matter.",
    category: "Sample Reports",
    status: "Preview coming soon",
    featured: true,
  },
  {
    title: "Sample Heritage Damp Report 2",
    description: "Second heritage sample showing how True Damp Specialists approach complex traditional buildings.",
    category: "Sample Reports",
    status: "Preview coming soon",
  },
  {
    title: "Condensation and BS 5250",
    description: "Plain-English guidance on condensation risk and the role of BS 5250 in moisture control.",
    category: "Guidance Notes",
    status: "PDF available",
    href: "/reports/condensation-bs-5250.pdf",
  },
  {
    title: "Mould Cleaning, Redecoration and Ventilation",
    description: "Explains what helps mould problems, what does not, and why cleaning alone rarely solves the cause.",
    category: "Guidance Notes",
    status: "PDF available",
    href: "/reports/mould-cleaning-redecoration-ventilation.pdf",
  },
  {
    title: "Understanding Moisture in Buildings",
    description: "An accessible overview of how moisture behaves in buildings and why diagnosis should come before treatment.",
    category: "Guidance Notes",
    status: "PDF available",
    href: "/reports/understanding-moisture-in-buildings.pdf",
  },
  {
    title: "Why Bedrooms Are Common Rooms for Mould",
    description: "Guidance on why bedrooms frequently show mould first and what the pattern can reveal.",
    category: "Guidance Notes",
    status: "PDF available",
    href: "/reports/why-bedrooms-are-common-rooms-for-mould.pdf",
  },
  {
    title: "Why Damp Keeps Coming Back After Repairs",
    description: "Explains why repeated repairs fail when the original diagnosis misses the real moisture mechanism.",
    category: "Guidance Notes",
    status: "PDF available",
    href: "/reports/why-damp-keeps-coming-back-after-repairs.pdf",
  },
  {
    title: "Why Does That Damp Patch Move?",
    description: "A practical explanation of changing damp patterns and why movement can be an important clue.",
    category: "Guidance Notes",
    status: "PDF available",
    href: "/reports/why-does-that-damp-patch-move.pdf",
  },
  {
    title: "Why External Inspections Matter",
    description: "Shows why the outside of a building is often the most overlooked part of damp diagnosis.",
    category: "Guidance Notes",
    status: "PDF available",
    href: "/reports/why-external-inspections-matter.pdf",
  },
  {
    title: "Why Most Damp Diagnoses Get It Wrong",
    description: "A short guide to common diagnostic mistakes and why independent investigation matters.",
    category: "Guidance Notes",
    status: "PDF available",
    href: "/reports/why-most-damp-diagnoses-get-it-wrong.pdf",
  },
  {
    title: "Why Insulation Matters Before You Diagnose Damp",
    description: "Explains how insulation, thermal bridging and surface temperature affect damp and mould diagnosis.",
    category: "Guidance Notes",
    status: "PDF available",
    href: "/reports/why-insulation-matters-before-diagnosing-damp.pdf",
  },
  {
    title: "Thermal Imaging in Damp Diagnosis",
    description: "What thermal imaging can show, what it cannot prove on its own, and how it supports wider investigation.",
    category: "Technical Briefings",
    status: "PDF available",
    href: "/reports/thermal-imaging-in-damp-diagnosis.pdf",
    featured: true,
  },
  {
    title: "Three Moisture Mechanisms",
    description: "A concise technical briefing on the different mechanisms that can create damp symptoms.",
    category: "Technical Briefings",
    status: "PDF available",
    href: "/reports/three-moisture-mechanisms.pdf",
  },
];

export const reportCategories: ReportCategory[] = ["Sample Reports", "Guidance Notes", "Technical Briefings"];

export const reportsPageContent = {
  navLabel: "Reports",
  seoTitle: "Reports & Guidance",
  seoDescription: "Read specialist damp and moisture investigation guidance from True Damp Specialists, including technical notes on thermal imaging, condensation and moisture diagnosis.",
  breadcrumbLabel: "Reports and guidance",
  hero: {
    eyebrow: "Reports and guidance",
    title: "See the evidence-led reports behind the advice.",
    description: "Read technical notes and practical damp guidance written to show how moisture behaves, why diagnosis matters and why generic repairs often fail.",
    imageAlt: "A damp survey report being reviewed on a desk",
    primaryCta: "Preview section",
    secondaryCta: "Book a survey",
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
    title: "Featured report previews",
    description: "Start with the documents that explain moisture behaviour, diagnostic tools and common reasons damp repairs fail.",
  },
  library: {
    title: "Report library",
    description: "Guidance notes are available now. Sample investigation reports remain listed as previews until redacted versions are approved.",
  },
  cta: {
    title: "Need a report for your own property?",
    description: "Book an independent survey and get a clear, evidence-led report that explains what is happening and what to do next.",
    primaryText: "Request a survey",
    secondaryPrefix: "Call",
  },
};
