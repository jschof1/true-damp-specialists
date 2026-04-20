import type React from "react";
import type { LucideProps } from "lucide-react";
import {
  Search,
  Scale,
  Building2,
  Camera,
  GitCompare,
  ClipboardList,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { siteSettings } from "./siteSettings";

type LucideIcon = React.ComponentType<LucideProps & { className?: string }>;

const DEFAULT_AREA = siteSettings.addressDetails.addressLocality;

export interface ServicePricing {
  service: string;
  price: string;
  note?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Service {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  icon: LucideIcon;
  heroDescription: string;
  shortDesc: string;
  fullDescription: string[];
  features: string[];
  pricing: ServicePricing[];
  faqs: ServiceFAQ[];
  areas: string[];
  relatedServices: string[];
  process: ServiceProcessStep[];
}

const coreAreas = [
  "Watford",
  "Central London",
  "St Albans",
  "High Wycombe",
  "Luton",
  "Hemel Hempstead",
  "Oxford",
  "Aylesbury",
];

const commonProcess: ServiceProcessStep[] = [
  {
    title: "Understand the case",
    description:
      "We establish the symptoms, the property context, any previous advice, and what decision the client needs to make.",
    icon: Search,
  },
  {
    title: "Inspect and analyse",
    description:
      "We gather the right evidence, assess likely causes, and test the issue against the building context rather than jumping to treatment.",
    icon: Settings,
  },
  {
    title: "Report and recommend",
    description:
      "You receive clearer findings, practical next steps, and where needed a more structured remedial direction.",
    icon: CheckCircle2,
  },
];

export const services: Service[] = [
  {
    slug: "independent-damp-mould-surveys",
    title: "Damp & Mould, Thermal & Salt Analysis",
    metaTitle: `Damp, Thermal & Salt Analysis ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Independent damp and mould diagnostics in ${DEFAULT_AREA} using moisture profiling, thermal imaging, mould testing and salt testing. Clear data, visual evidence and defensible conclusions.`,
    icon: Search,
    heroDescription:
      "Independent diagnostics using moisture profiling, thermal imaging, mould testing and salt testing to determine the true cause and extent of damp. Every survey is backed by clear data and visual evidence.",
    shortDesc:
      "Moisture profiling, thermal imaging, mould and salt testing with evidence-led conclusions on cause and extent.",
    fullDescription: [
      "This service is built for clients who need the issue explained with measurable data, not guesswork. We combine moisture profiling, thermal imaging, mould sampling where appropriate, and salt analysis to build a coherent picture of what is happening in the building fabric.",
      "The objective is to establish the true cause and extent of damp-related problems so decisions about treatment, negotiation or further investigation rest on defensible evidence.",
      "Reporting includes clear visual documentation so homeowners, landlords and professional clients can see how conclusions were reached.",
    ],
    features: [
      "Moisture profiling and pattern interpretation",
      "Thermal imaging to support cause analysis",
      "Mould and salt testing where they add clarity",
      "Visual evidence and structured reporting",
      "Independent of product-led or sales-driven recommendations",
      "Suitable for residential and professional instruction",
    ],
    pricing: [
      {
        service: "Thermal, salt and moisture diagnostic survey",
        price: "Quoted per case",
        note: "Scope depends on property type, size and testing depth",
      },
      {
        service: "Extended testing or complex fabric cases",
        price: "Quoted per case",
        note: "Additional sampling or revisit may be agreed where needed",
      },
    ],
    faqs: [
      {
        question: "Why include salt testing alongside thermal imaging?",
        answer:
          "Salt contamination can change how finishes behave and how moisture presents. Where relevant, salt analysis helps avoid misreading symptoms that look like one mechanism but are driven by another.",
      },
      {
        question: "Is this only for obvious damp patches?",
        answer:
          "No. It is also for cases where the problem is intermittent, poorly explained, or where previous advice has not matched what you are seeing on site.",
      },
      {
        question: "Will I get images and data in the report?",
        answer:
          "Yes. The survey is built around clear data and visual evidence so the conclusions are easier to follow and defend.",
      },
    ],
    areas: coreAreas,
    relatedServices: [
      "moisture-diagnostics-building-pathology",
      "external-defects-drainage-weathering",
      "remedial-specifications-project-support",
    ],
    process: commonProcess,
  },
  {
    slug: "moisture-diagnostics-building-pathology",
    title: "Residential Compliance – Awaab's Law",
    metaTitle: `Awaab's Law & Residential Compliance ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Housing health and Awaab's Law–aligned reporting in ${DEFAULT_AREA} for landlords, housing providers and residents. Clear timeframes, evidence and standards-led documentation.`,
    icon: Scale,
    heroDescription:
      "Detailed reports aligned with Awaab's Law and current housing health standards, helping landlords, housing providers, and residents meet legislative timeframes and improve living conditions.",
    shortDesc:
      "Reports aligned with Awaab's Law and housing health standards for landlords, providers and residents.",
    fullDescription: [
      "This service focuses on residential compliance: documenting damp and mould risk in a way that aligns with Awaab's Law expectations and wider housing health requirements.",
      "Reports are structured to help landlords, housing providers, managing agents and residents understand severity, timescales and proportionate next steps.",
      "The aim is defensible documentation that supports timely action and clearer communication between all parties.",
    ],
    features: [
      "Awaab's Law–aware reporting structure",
      "Housing health and standards-led framing",
      "Suitable for landlords, providers and residents",
      "Clear severity and evidence documentation",
      "Supports prioritisation within legislative timeframes",
      "Works alongside technical damp and mould investigation",
    ],
    pricing: [
      {
        service: "Compliance-oriented damp and mould report",
        price: "Quoted per case",
        note: "Scope depends on unit count, reporting depth and access",
      },
      {
        service: "Portfolio or multi-unit instruction",
        price: "Quoted per case",
        note: "Discuss block, estate or programme-level needs",
      },
    ],
    faqs: [
      {
        question: "Is this only for social housing?",
        answer:
          "No. While Awaab's Law is a key reference for residential compliance, similar standards-led framing can be relevant wherever health-based housing duties and clear documentation matter.",
      },
      {
        question: "Can you work with our existing policies and templates?",
        answer:
          "Where appropriate, we align outputs with your reporting needs while keeping findings independent and evidence-led.",
      },
      {
        question: "Do you advise on timescales for action?",
        answer:
          "Reports are written to reflect severity and risk proportionately so responsible parties can plan timely remedial and verification steps.",
      },
    ],
    areas: coreAreas,
    relatedServices: [
      "independent-damp-mould-surveys",
      "mould-remediation-condensation-control",
      "remedial-specifications-project-support",
    ],
    process: commonProcess,
  },
  {
    slug: "mould-remediation-condensation-control",
    title: "Commercial & Multi-Occupancy Surveys",
    metaTitle: `Commercial Damp & COSHH Surveys ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `COSHH-aligned damp and environmental assessments in ${DEFAULT_AREA} for offices, retail, apartments and communal buildings. Evidence-based compliance and risk documentation.`,
    icon: Building2,
    heroDescription:
      "COSHH-aligned risk assessments, environmental testing, and damp investigations across offices, retail units, apartment blocks, and communal areas. Protecting tenants, staff, and the public through evidence-based compliance.",
    shortDesc:
      "COSHH-aligned assessments and damp investigations for commercial and multi-occupancy buildings.",
    fullDescription: [
      "Commercial and shared buildings need surveys that respect occupancy risk, statutory expectations and clear audit trails. We deliver COSHH-aligned risk assessment thinking alongside environmental testing and damp investigation where needed.",
      "The service covers offices, retail, apartment blocks, communal spaces and similar settings where multiple stakeholders rely on proportionate, documented conclusions.",
      "Outputs are designed to support duty-holders, facilities teams and residents with evidence-based compliance rather than generic damp sales language.",
    ],
    features: [
      "COSHH-aligned risk assessment framing",
      "Environmental testing integrated with damp investigation",
      "Offices, retail, blocks and communal areas",
      "Tenant, staff and public safety considerations",
      "Evidence-based reporting for duty-holders",
      "Scalable to single assets or portfolios",
    ],
    pricing: [
      {
        service: "Commercial or multi-occupancy survey",
        price: "Quoted per case",
        note: "Depends on floor area, access and testing scope",
      },
      {
        service: "Programme or estate-level instruction",
        price: "Quoted per case",
        note: "Discuss repeat visits and reporting consistency",
      },
    ],
    faqs: [
      {
        question: "Do you survey occupied workplaces?",
        answer:
          "Yes, subject to safe access and agreed arrangements. We plan surveys to minimise disruption while capturing representative conditions.",
      },
      {
        question: "Can this support insurance or regulatory documentation?",
        answer:
          "Reports are structured around clear findings and evidence. Use with your own legal or compliance advisers where formal duties apply.",
      },
      {
        question: "Is environmental testing always required?",
        answer:
          "Not always. We recommend testing where it changes the conclusion or supports proportionate compliance documentation.",
      },
    ],
    areas: coreAreas,
    relatedServices: [
      "independent-damp-mould-surveys",
      "moisture-diagnostics-building-pathology",
      "external-defects-drainage-weathering",
    ],
    process: commonProcess,
  },
  {
    slug: "basement-below-ground-waterproofing",
    title: "Complex Cases & Second Opinions",
    metaTitle: `Second Opinions & Complex Damp Cases ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Independent second opinions in ${DEFAULT_AREA} for misdiagnosed damp, failed treatments and conflicting reports. Factual review and clear next steps.`,
    icon: GitCompare,
    heroDescription:
      "We review previous reports, failed treatments, or conflicting findings to provide an impartial, factual second opinion. Ideal for misdiagnosed or long-term damp and mould cases.",
    shortDesc:
      "Impartial review of prior reports and treatments for misdiagnosed or long-running damp and mould problems.",
    fullDescription: [
      "This service is for clients stuck between contradictory advice, repeat failed treatments, or reports that do not match what the building is doing.",
      "We work through the history, the previous conclusions and the site evidence to produce an independent, factual second opinion.",
      "It is especially suited to long-term or high-stakes cases where the cost of getting the diagnosis wrong is significant.",
    ],
    features: [
      "Structured review of prior reports and treatments",
      "Impartial, evidence-led conclusions",
      "Clarifies conflicting or generic advice",
      "Suitable for homeowners, landlords and professionals",
      "Supports dispute resolution and next-step planning",
      "Can combine with targeted re-survey work",
    ],
    pricing: [
      {
        service: "Second opinion / report review",
        price: "Quoted per case",
        note: "Depends on volume of paperwork and site revisit needs",
      },
      {
        service: "Complex case with extended investigation",
        price: "Quoted per case",
        note: "Multi-stage work quoted transparently",
      },
    ],
    faqs: [
      {
        question: "Do you need to visit the property?",
        answer:
          "Often yes for a robust second opinion, but desk-based review can be agreed where appropriate. We will advise what level of inspection is proportionate.",
      },
      {
        question: "Can you comment on another surveyor's report?",
        answer:
          "Yes, professionally and factually, focusing on methodology, evidence and conclusions rather than personal criticism.",
      },
      {
        question: "What if the issue has lasted years?",
        answer:
          "Long-running cases are common. The review prioritises pattern, history and failed interventions to reset the diagnosis.",
      },
    ],
    areas: coreAreas,
    relatedServices: [
      "independent-damp-mould-surveys",
      "moisture-diagnostics-building-pathology",
      "remedial-specifications-project-support",
    ],
    process: commonProcess,
  },
  {
    slug: "external-defects-drainage-weathering",
    title: "Invasive, CCTV & Drainage Investigations",
    metaTitle: `Invasive & CCTV Drainage Surveys ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Selective invasive investigation and CCTV drainage surveys in ${DEFAULT_AREA} where surface readings are insufficient. Photo and video evidence for hidden ingress and defects.`,
    icon: Camera,
    heroDescription:
      "Where surface readings aren't enough, we perform selective exposure and CCTV drainage surveys to confirm hidden water ingress and structural defects. Findings are documented with photography and video evidence.",
    shortDesc:
      "Selective invasive work and CCTV drainage surveys to confirm hidden ingress with photo and video evidence.",
    fullDescription: [
      "Some moisture problems cannot be resolved from observation alone. This service adds selective invasive investigation and CCTV drainage inspection to confirm what is happening inside concealed construction or below ground.",
      "It is used where surface readings are ambiguous, where ingress is suspected from drainage or buried elements, or where structural defects need to be ruled in or out.",
      "Findings are documented with photography and video so clients and contractors share a clear view of the evidence.",
    ],
    features: [
      "Selective exposure where proportionate and justified",
      "CCTV drainage inspection for below-ground routes",
      "Confirms hidden ingress and structural concerns",
      "Photography and video documentation",
      "Supports targeted repair specifications",
      "Pairs with wider damp and pathology surveys",
    ],
    pricing: [
      {
        service: "Invasive or CCTV-led investigation",
        price: "Quoted per case",
        note: "Access, reinstatement and drainage length affect cost",
      },
      {
        service: "Combined survey plus invasive follow-on",
        price: "Quoted per case",
        note: "Often staged after initial assessment",
      },
    ],
    faqs: [
      {
        question: "When is invasive investigation justified?",
        answer:
          "When non-destructive assessment cannot reasonably confirm the cause, or where liability and repair scope depend on seeing concealed conditions.",
      },
      {
        question: "Do you arrange drainage CCTV specialists?",
        answer:
          "CCTV drainage work is delivered as part of a coordinated scope so imaging aligns with the damp investigation conclusions.",
      },
      {
        question: "Will I receive video files?",
        answer:
          "Yes, where CCTV forms part of the instruction, findings are documented with video evidence alongside stills and reporting.",
      },
    ],
    areas: coreAreas,
    relatedServices: [
      "basement-below-ground-waterproofing",
      "moisture-diagnostics-building-pathology",
      "remedial-specifications-project-support",
    ],
    process: commonProcess,
  },
  {
    slug: "remedial-specifications-project-support",
    title: "Pre-Purchase Surveys & Remediation Planning",
    metaTitle: `Pre-Purchase Damp Surveys ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Pre-purchase damp surveys and remediation planning in ${DEFAULT_AREA}. Independent advice before sale or works, aligned with BS 8102, BS 5250 and PCA methodology.`,
    icon: ClipboardList,
    heroDescription:
      "For buyers and homeowners, we deliver clear, independent advice before works or sales — including cost guidance and remedial design plans built around BS 8102, BS 5250, and PCA methodology.",
    shortDesc:
      "Independent pre-purchase advice and remediation planning with BS-aligned remedial design thinking.",
    fullDescription: [
      "Buying or selling a property with damp or mould risk needs proportionate, independent advice before money is committed to the wrong works.",
      "This service delivers clear findings before purchase or major works, with cost guidance and remedial design planning framed around BS 8102, BS 5250 and PCA methodology where applicable.",
      "Outputs help buyers, vendors and homeowners negotiate fairly and instruct contractors with a defensible scope.",
    ],
    features: [
      "Pre-purchase and pre-works independent advice",
      "Remediation planning and scope clarity",
      "BS 8102, BS 5250 and PCA-aligned thinking",
      "Indicative cost guidance categories",
      "Supports conveyancing and project budgeting",
      "Reduces risk of repeat failed treatments",
    ],
    pricing: [
      {
        service: "Pre-purchase damp and moisture survey",
        price: "Quoted per case",
        note: "Varies with property size, access and reporting depth",
      },
      {
        service: "Remediation specification support",
        price: "Quoted per case",
        note: "Follows diagnosis or pre-purchase instruction",
      },
    ],
    faqs: [
      {
        question: "Is this useful if a lender or surveyor flagged damp?",
        answer:
          "Yes. It translates generic flags into clearer technical reasoning and proportionate next steps.",
      },
      {
        question: "Do you provide contractor-ready specifications?",
        answer:
          "Where needed, outputs support clearer scopes for tender. Contractor pricing still follows market quotations.",
      },
      {
        question: "Can vendors commission this before sale?",
        answer:
          "Yes. Independent documentation can support realistic pricing and reduce fall-through risk.",
      },
    ],
    areas: coreAreas,
    relatedServices: [
      "independent-damp-mould-surveys",
      "basement-below-ground-waterproofing",
      "external-defects-drainage-weathering",
    ],
    process: commonProcess,
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const getRelatedServices = (slugs: string[]): Service[] =>
  services.filter((service) => slugs.includes(service.slug));
