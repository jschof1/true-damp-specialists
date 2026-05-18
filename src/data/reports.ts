export type ReportCategory = "Sample Reports" | "Guidance Notes" | "Technical Briefings";

export interface ReportResource {
  title: string;
  description: string;
  category: ReportCategory;
  status: string;
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
    status: "Preview coming soon",
  },
  {
    title: "Mould Cleaning, Redecoration and Ventilation",
    description: "Explains what helps mould problems, what does not, and why cleaning alone rarely solves the cause.",
    category: "Guidance Notes",
    status: "Preview coming soon",
  },
  {
    title: "Understanding Moisture in Buildings",
    description: "An accessible overview of how moisture behaves in buildings and why diagnosis should come before treatment.",
    category: "Guidance Notes",
    status: "Preview coming soon",
  },
  {
    title: "Why Bedrooms Are Common Rooms for Mould",
    description: "Guidance on why bedrooms frequently show mould first and what the pattern can reveal.",
    category: "Guidance Notes",
    status: "Preview coming soon",
  },
  {
    title: "Why Damp Keeps Coming Back After Repairs",
    description: "Explains why repeated repairs fail when the original diagnosis misses the real moisture mechanism.",
    category: "Guidance Notes",
    status: "Preview coming soon",
  },
  {
    title: "Why Does That Damp Patch Move?",
    description: "A practical explanation of changing damp patterns and why movement can be an important clue.",
    category: "Guidance Notes",
    status: "Preview coming soon",
  },
  {
    title: "Why External Inspections Matter",
    description: "Shows why the outside of a building is often the most overlooked part of damp diagnosis.",
    category: "Guidance Notes",
    status: "Preview coming soon",
  },
  {
    title: "Why Most Damp Diagnoses Get It Wrong",
    description: "A short guide to common diagnostic mistakes and why independent investigation matters.",
    category: "Guidance Notes",
    status: "Preview coming soon",
  },
  {
    title: "Why Insulation Matters Before You Diagnose Damp",
    description: "Explains how insulation, thermal bridging and surface temperature affect damp and mould diagnosis.",
    category: "Guidance Notes",
    status: "Preview coming soon",
  },
  {
    title: "Thermal Imaging in Damp Diagnosis",
    description: "What thermal imaging can show, what it cannot prove on its own, and how it supports wider investigation.",
    category: "Technical Briefings",
    status: "Preview coming soon",
    featured: true,
  },
  {
    title: "Three Moisture Mechanisms",
    description: "A concise technical briefing on the different mechanisms that can create damp symptoms.",
    category: "Technical Briefings",
    status: "Preview coming soon",
  },
];

export const reportCategories: ReportCategory[] = ["Sample Reports", "Guidance Notes", "Technical Briefings"];

export const reportsPageContent = {
  navLabel: "Reports",
  seoTitle: "Reports & Guidance",
  seoDescription: "Preview the new reports and guidance section from True Damp Specialists while redacted sample documents are being prepared.",
  breadcrumbLabel: "Reports and guidance",
  hero: {
    eyebrow: "Reports and guidance",
    title: "See the evidence-led reports behind the advice.",
    description: "We are preparing a library of redacted sample reports, technical notes and practical guidance so clients can understand the depth of investigation before booking a survey.",
    imageAlt: "A damp survey report being reviewed on a desk",
    primaryCta: "Preview section",
    secondaryCta: "Book a survey",
  },
  trustCards: [
    {
      title: "Sample reports",
      text: "A redacted set of sample reports is being prepared for this section.",
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
    description: "These are the documents being prepared for publication once the final redacted versions are ready.",
  },
  library: {
    title: "Report library preview",
    description: "The full report library is being standardised and redacted before files are made viewable online.",
  },
  cta: {
    title: "Need a report for your own property?",
    description: "Book an independent survey and get a clear, evidence-led report that explains what is happening and what to do next.",
    primaryText: "Request a survey",
    secondaryPrefix: "Call",
  },
};
