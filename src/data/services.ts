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
  "Central London",
  "Watford",
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
    title: "Damp & Mould Assessment",
    metaTitle: `Damp & Mould Assessment ${DEFAULT_AREA} | True Damp Specialists`,
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
    title: "Moisture Diagnostics & Building Pathology",
    metaTitle: `Moisture Diagnostics & Building Pathology ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Moisture diagnostics and building pathology support in ${DEFAULT_AREA}. Evidence-led investigation for unclear damp, moisture movement, and building defect cases.`,
    icon: Scale,
    heroDescription:
      "Detailed moisture diagnostics built around how the building is actually performing. Used where the cause is unclear, the moisture mechanism needs proper interpretation, or the problem requires a more technical building-pathology lens.",
    shortDesc:
      "Evidence-led diagnostics for unclear moisture behaviour, defect pathways, and building-pathology cases.",
    fullDescription: [
      "This service is designed for cases where moisture behaviour, construction detail, or defect interaction needs to be broken down properly before the right decision can be made.",
      "We use evidence-led reasoning to explain what is actually happening within the building fabric, rather than relying on generic damp labels or assumptions.",
      "The output is a clearer diagnosis, a more defensible explanation, and practical guidance on what should happen next.",
    ],
    features: [
      "Building-pathology-led reasoning",
      "Moisture mechanism analysis",
      "Defect interaction and construction context",
      "Evidence-led reporting",
      "Clear diagnosis and next-step guidance",
      "Suitable for technically unclear cases",
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
    title: "Condensation & Ventilation Assessment",
    metaTitle: `Condensation & Ventilation Assessment ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Condensation and ventilation assessment in ${DEFAULT_AREA} for recurring mould, humidity imbalance, cold-surface risk, and indoor moisture problems.`,
    icon: Building2,
    heroDescription:
      "Used where mould or condensation is recurring, where internal conditions appear to be driving the issue, or where proper assessment of airflow, humidity, and cold-surface risk is needed.",
    shortDesc:
      "Assessment of humidity, airflow, thermal bridging, and mould risk in condensation-led cases.",
    fullDescription: [
      "This service is for recurring mould and condensation problems where the visible symptoms are only part of the picture.",
      "We assess humidity behaviour, airflow, thermal bridging, and internal environmental conditions to explain what is actually driving the issue.",
      "The aim is to produce a diagnosis-led explanation and prevention-focused recommendations rather than a surface-level treatment response.",
    ],
    features: [
      "Humidity behaviour and dew-point risk",
      "Ventilation performance review",
      "Thermal bridging and cold-surface analysis",
      "Mould cause identification",
      "Prevention-focused recommendations",
      "Evidence-led reporting",
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
    title: "Basement & Below-Ground Waterproofing Assessment",
    metaTitle: `Basement & Below-Ground Waterproofing Assessment ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Basement and below-ground waterproofing assessment in ${DEFAULT_AREA}, including moisture risk, ingress pathways, and BS 8102-aligned thinking.`,
    icon: GitCompare,
    heroDescription:
      "Assessment of below-ground moisture risk, ingress pathways, and waterproofing context for basements and other below-ground structures where the right diagnosis needs to come before the right intervention.",
    shortDesc:
      "Below-ground and basement assessment with moisture-risk analysis and waterproofing guidance.",
    fullDescription: [
      "Below-ground moisture problems often need a more specialist waterproofing lens than a standard damp visit can provide.",
      "We assess likely ingress pathways, existing waterproofing context, construction detail, and the building’s actual risk profile so the next step is properly defined.",
      "This helps clients avoid generic or misdirected waterproofing recommendations and move toward proportionate, technically grounded decisions.",
    ],
    features: [
      "Below-ground moisture risk assessment",
      "Ingress pathway analysis",
      "Waterproofing context and system review",
      "BS 8102-aligned reasoning",
      "Evidence-led reporting",
      "Clear next-step guidance",
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
    title: "Leak, Drainage & External Defect Investigation",
    metaTitle: `Leak, Drainage & External Defect Investigation ${DEFAULT_AREA} | True Damp Specialists`,
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
    title: "Remedial Specifications & Project Support",
    metaTitle: `Remedial Specifications & Project Support ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Remedial specifications and project support in ${DEFAULT_AREA}, with clear scopes, contractor guidance, and diagnosis-led next-step planning.`,
    icon: ClipboardList,
    heroDescription:
      "Clear remedial specifications and project support where the diagnosis is already known and the next step needs to be defined, scoped, or reviewed properly.",
    shortDesc:
      "Diagnosis-led remedial scopes, contractor guidance, and next-step project support.",
    fullDescription: [
      "This service is for cases where the problem has been identified and the client needs help defining what should actually happen next.",
      "We produce clearer scopes, review suggested works, and help clients understand whether proposed contractor actions align with the diagnosis.",
      "The aim is controlled, proportionate implementation support rather than vague or over-specified remedial advice.",
    ],
    features: [
      "Remedial scope definition",
      "Contractor review and guidance",
      "Project support after diagnosis",
      "Clear written recommendations",
      "Proportionate next-step planning",
      "Reduced risk of wrong or unnecessary works",
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
