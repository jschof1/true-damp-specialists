import type React from "react";
import type { LucideProps } from "lucide-react";
import {
  Search,
  Droplets,
  Wind,
  Building2,
  Settings,
  FileText,
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
    title: "Independent Damp & Mould Surveys",
    metaTitle: `Independent Damp Survey ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Independent damp and mould surveys in ${DEFAULT_AREA} for homeowners, buyers, landlords and property teams. Evidence-led diagnosis, clear reporting and practical next steps.`,
    icon: Search,
    heroDescription:
      "Independent surveys designed to explain what is actually happening in a property before anyone commits to damp treatments or remedial works.",
    shortDesc:
      "Evidence-led damp and mould surveys for clients who need clarity before spending money or acting on previous advice.",
    fullDescription: [
      "This is the core service for clients who want an independent view of damp, mould and moisture issues before works begin. The emphasis is on understanding the likely cause, the contributing factors and the sensible next step.",
      "It is especially relevant for homeowners, buyers, landlords and property professionals who have already been given vague, conflicting or sales-led advice. The aim is not to push a cure, but to produce clearer reasoning.",
      "A good independent survey should reduce uncertainty, help avoid the wrong treatment, and create a stronger basis for instructing any future works or making a property decision.",
    ],
    features: [
      "Independent diagnosis-first positioning",
      "Suitable for homeowners, buyers and landlords",
      "Useful for second opinions and failed previous advice",
      "Evidence-led inspection and reporting",
      "Focused on the likely cause, not a pre-sold treatment",
      "Practical next-step recommendations",
    ],
    pricing: [
      {
        service: "Independent damp or mould survey",
        price: "Quoted per case",
        note: "Scope depends on property type, size and reporting needs",
      },
      {
        service: "Pre-purchase or second-opinion survey",
        price: "Quoted per case",
        note: "Complex or report-review cases may require additional time",
      },
    ],
    faqs: [
      {
        question: "Why commission an independent damp survey?",
        answer:
          "Because independence changes the recommendation. The survey is there to explain the likely cause and next step, rather than to funnel every issue into a treatment sale.",
      },
      {
        question: "Can this help if another company has already quoted for damp proofing?",
        answer:
          "Yes. Many clients commission this service specifically because the previous advice did not feel convincing, seemed overly generic, or focused too quickly on one type of treatment.",
      },
      {
        question: "Is this useful for buyers and home surveys?",
        answer:
          "Yes. It is particularly useful where damp has been flagged during a purchase and someone needs clearer reasoning before renegotiating, proceeding or planning remedial works.",
      },
    ],
    areas: coreAreas,
    relatedServices: [
      "moisture-diagnostics-building-pathology",
      "mould-remediation-condensation-control",
      "remedial-specifications-project-support",
    ],
    process: commonProcess,
  },
  {
    slug: "moisture-diagnostics-building-pathology",
    title: "Moisture Diagnostics & Building Pathology",
    metaTitle: `Moisture Diagnostics ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Moisture diagnostics and building pathology in ${DEFAULT_AREA} for rising damp, penetrating damp, condensation and hidden moisture issues. Clear technical reasoning and reporting.`,
    icon: Droplets,
    heroDescription:
      "Detailed analysis of how moisture is moving through the building, what mechanism is most likely responsible, and why previous assumptions may have been wrong.",
    shortDesc:
      "Technical diagnosis for rising damp, penetrating damp, condensation and hard-to-explain moisture behaviour.",
    fullDescription: [
      "Some cases need more than a generic damp survey. They need a more explicit look at moisture behaviour, defect pathways, building fabric and the distinction between different damp mechanisms.",
      "This service is designed for cases where the main task is to determine whether the issue is rising damp, penetrating damp, condensation, hidden leakage, salts, ventilation-related moisture, or a combination of factors.",
      "By treating the issue as a building pathology problem rather than a quick-fix sales opportunity, the reporting becomes more useful for owners, consultants and remedial specialists alike.",
    ],
    features: [
      "Differentiates between likely damp mechanisms",
      "Useful for recurring, hidden or confusing cases",
      "Considers ventilation, defects, salts and fabric behaviour",
      "Supports report review and second-opinion work",
      "Designed to improve confidence in the diagnosis",
      "Translates technical findings into practical implications",
    ],
    pricing: [
      {
        service: "Specialist moisture diagnostics",
        price: "Quoted per case",
        note: "Best suited to unclear, repeated or technically complex issues",
      },
      {
        service: "Second-opinion diagnostic review",
        price: "Quoted per case",
        note: "Can include review of previous reports or treatment history",
      },
    ],
    faqs: [
      {
        question: "Can you tell the difference between rising damp, penetrating damp and condensation?",
        answer:
          "Yes, that is one of the main reasons this service exists. The diagnosis is built around evidence and building context rather than around a pre-decided treatment.",
      },
      {
        question: "Is this the right service for a failed damp treatment?",
        answer:
          "Often yes. Where a previous treatment has not solved the issue, the priority is usually to revisit the diagnosis and test whether the original explanation was correct.",
      },
      {
        question: "Do you only look at visible symptoms?",
        answer:
          "No. Visible symptoms matter, but so do defect pathways, local building conditions, moisture patterns and the wider context behind the symptom.",
      },
    ],
    areas: coreAreas,
    relatedServices: [
      "independent-damp-mould-surveys",
      "external-defects-drainage-weathering",
      "remedial-specifications-project-support",
    ],
    process: commonProcess,
  },
  {
    slug: "mould-remediation-condensation-control",
    title: "Mould Remediation & Condensation Control",
    metaTitle: `Mould & Condensation Assessment ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Mould remediation and condensation control support in ${DEFAULT_AREA}. Root-cause analysis, ventilation strategy and clearer reporting for recurring black mould and humidity issues.`,
    icon: Wind,
    heroDescription:
      "A root-cause-led approach to black mould, humidity imbalance, condensation and poor ventilation, designed to move beyond blame and toward a workable strategy.",
    shortDesc:
      "Diagnosis-led support for recurring mould, poor ventilation and condensation-driven moisture problems.",
    fullDescription: [
      "Recurring mould is often treated as a simple cleaning problem when the real issue is a combination of humidity, ventilation, heating patterns, occupancy, cold surfaces and building condition.",
      "This service focuses on understanding why condensation and mould are occurring, what factors are making the issue worse, and what practical changes or remedial measures are most likely to help.",
      "It is relevant for occupied homes, rented properties, housing cases and any scenario where black mould keeps returning without a convincing explanation.",
    ],
    features: [
      "Black mould and condensation investigations",
      "Ventilation and humidity-led reasoning",
      "Useful for homes, rented properties and housing cases",
      "Separates symptom cleaning from real cause analysis",
      "Supports practical ventilation and remediation planning",
      "Can feed into broader damp reporting where needed",
    ],
    pricing: [
      {
        service: "Mould and condensation assessment",
        price: "Quoted per case",
        note: "Scope varies by occupancy, property type and reporting depth",
      },
      {
        service: "Ventilation-led second opinion",
        price: "Quoted per case",
        note: "Useful where the problem keeps recurring after previous advice",
      },
    ],
    faqs: [
      {
        question: "Can you help with recurring black mould?",
        answer:
          "Yes. The aim is to understand why the mould is recurring, not just to describe the visible growth. That usually means looking at humidity, ventilation, fabric temperature and building condition together.",
      },
      {
        question: "Is condensation always an occupancy issue?",
        answer:
          "No. Occupancy patterns may be part of the picture, but they are not always the full answer. Building defects, poor ventilation, cold bridges and poor system performance can all play a role.",
      },
      {
        question: "Do you recommend ventilation upgrades?",
        answer:
          "Where appropriate, yes. Ventilation can be part of the solution, but it should follow a proper understanding of the underlying moisture behaviour rather than being prescribed blindly.",
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
    slug: "basement-below-ground-waterproofing",
    title: "Basement & Below-Ground Waterproofing",
    metaTitle: `Basement Waterproofing Assessment ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Basement and below-ground waterproofing assessments in ${DEFAULT_AREA}. BS 8102-aligned investigation, reporting and practical waterproofing guidance for cellars and lower-ground spaces.`,
    icon: Building2,
    heroDescription:
      "Specialist below-ground investigation for basements, cellars and retaining-structure moisture risk, with waterproofing thinking grounded in evidence and practical design logic.",
    shortDesc:
      "Below-ground moisture and waterproofing guidance for basements, cellars and specialist lower-ground cases.",
    fullDescription: [
      "Below-ground moisture problems need a more specialist lens than standard damp sales language can usually provide. Basement and cellar cases often depend on waterproofing principles, structural context and how the space is intended to perform.",
      "This service helps clients understand what the likely source or failure mechanism is, whether previous waterproofing advice makes sense, and what a practical next step might look like in BS 8102 terms.",
      "It is particularly useful for basements, converted lower-ground accommodation, retaining walls and specialist waterproofing scenarios where the stakes are higher and the wrong advice can be expensive.",
    ],
    features: [
      "Below-ground and basement moisture focus",
      "BS 8102-aligned thinking and reporting",
      "Useful for new and existing waterproofing systems",
      "Helps clarify likely failure mechanisms",
      "Supports design review and next-step decisions",
      "Relevant for residential and specialist property cases",
    ],
    pricing: [
      {
        service: "Below-ground waterproofing assessment",
        price: "Quoted per case",
        note: "Complexity varies widely by structure and intended use",
      },
      {
        service: "Waterproofing review / second opinion",
        price: "Quoted per case",
        note: "Useful where previous specifications or systems are in doubt",
      },
    ],
    faqs: [
      {
        question: "Is this different from a standard damp survey?",
        answer:
          "Usually yes. Basement and below-ground moisture problems often need waterproofing-specific reasoning rather than standard damp-proofing language.",
      },
      {
        question: "Can you review an existing waterproofing proposal?",
        answer:
          "Yes. This can be valuable where a system has been proposed, installed or has failed and the client needs a clearer understanding of whether the approach is sensible.",
      },
      {
        question: "Do you design or install waterproofing systems directly?",
        answer:
          "The main role here is investigation, reporting and guidance. Where works are needed, the report should help the client understand what kind of waterproofing direction or specialist input is appropriate.",
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
    slug: "external-defects-drainage-weathering",
    title: "External Defects & Drainage Investigations",
    metaTitle: `External Defect Investigation ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `External defect and drainage investigations in ${DEFAULT_AREA}. Roofing junctions, rainwater goods, masonry, drainage and envelope defects assessed with a moisture-focused lens.`,
    icon: Settings,
    heroDescription:
      "Targeted investigation of external building defects, drainage issues and weathering pathways that may be driving internal damp symptoms.",
    shortDesc:
      "Defect-led investigation of roofs, masonry, rainwater goods, drainage and external moisture ingress routes.",
    fullDescription: [
      "Many internal damp symptoms are driven by something outside the room where the damage is appearing. This service focuses on the external envelope, defect pathways and drainage-related causes that may be feeding moisture into the building.",
      "That can include roofing details, flashing, rainwater goods, pointing, masonry condition, junctions, render, ground levels and drainage issues where surface symptoms alone are not enough to explain the problem.",
      "It is especially useful where the moisture pattern suggests ingress from outside, or where a client needs a clearer picture before commissioning repairs.",
    ],
    features: [
      "Roofing, flashing and rainwater goods review",
      "Masonry, render and junction defect analysis",
      "Drainage and external moisture pathway thinking",
      "Useful for ingress-led damp symptoms",
      "Can support selective invasive or follow-on investigation",
      "Helps clients prioritise the right repair direction",
    ],
    pricing: [
      {
        service: "External defect investigation",
        price: "Quoted per case",
        note: "Scope depends on property size, access and the defects involved",
      },
      {
        service: "Drainage or ingress-led review",
        price: "Quoted per case",
        note: "May sit alongside a wider damp or pathology assessment",
      },
    ],
    faqs: [
      {
        question: "Can external defects really cause internal damp symptoms?",
        answer:
          "Yes. Many moisture problems show up internally while the real defect sits outside the room or elsewhere on the building envelope.",
      },
      {
        question: "Do you investigate drainage-related causes as well?",
        answer:
          "Yes, where drainage or concealed water movement forms part of the likely cause, that should be considered as part of the overall reasoning.",
      },
      {
        question: "Is this useful before instructing roofing or masonry repairs?",
        answer:
          "Yes. It can help clarify whether the proposed repair direction fits the actual symptom pattern and likely moisture pathway.",
      },
    ],
    areas: coreAreas,
    relatedServices: [
      "moisture-diagnostics-building-pathology",
      "basement-below-ground-waterproofing",
      "remedial-specifications-project-support",
    ],
    process: commonProcess,
  },
  {
    slug: "remedial-specifications-project-support",
    title: "Remedial Specifications & Project Support",
    metaTitle: `Remedial Specifications ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Remedial specifications and project support in ${DEFAULT_AREA}. Clear scopes, cost guidance, reporting and next-step planning after damp and moisture investigations.`,
    icon: FileText,
    heroDescription:
      "Once the likely cause is understood, this service helps translate findings into a clearer remedial scope, reporting framework or project direction.",
    shortDesc:
      "Clear specification, cost guidance and next-step planning after diagnosis-led survey work.",
    fullDescription: [
      "Finding the likely cause is only part of the job. Many clients also need help turning that diagnosis into a usable remedial direction, a clearer contractor brief or a better-structured project conversation.",
      "This service is about translating findings into practical next steps. That may include remedial scope thinking, indicative cost framing, contractor coordination or a clearer explanation of what should be prioritised first.",
      "It is particularly useful for clients dealing with more than one issue, with multiple trades, or with a history of works that have not solved the problem properly.",
    ],
    features: [
      "Turns findings into a clearer remedial direction",
      "Helpful for multi-trade or phased projects",
      "Supports cost planning and priority-setting",
      "Useful for landlords, developers and property professionals",
      "Can sit after survey work or second-opinion work",
      "Designed to reduce confusion before works begin",
    ],
    pricing: [
      {
        service: "Remedial specification support",
        price: "Quoted per case",
        note: "Typically follows or accompanies diagnosis-led work",
      },
      {
        service: "Project support / report-led coordination",
        price: "Quoted per case",
        note: "Depends on complexity, stakeholders and output required",
      },
    ],
    faqs: [
      {
        question: "Do I need this if I already have a survey?",
        answer:
          "Not always, but it is useful where the client needs a clearer scope, a more practical recommendation set or a better framework for speaking to contractors and specialists.",
      },
      {
        question: "Can this help with cost planning?",
        answer:
          "Yes. While it is not a substitute for contractor quotations, it can help clients understand the likely categories of work and the level of intervention they may be dealing with.",
      },
      {
        question: "Is this only for large or commercial projects?",
        answer:
          "No. It can be valuable for homeowners as well, especially where the issue is complex, expensive to get wrong, or tied to a purchase or repeated failed works.",
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
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const getRelatedServices = (slugs: string[]): Service[] =>
  services.filter((service) => slugs.includes(service.slug));
