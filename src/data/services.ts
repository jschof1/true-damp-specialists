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
  "North London",
  "Central London",
  "Home Counties",
  "Buckinghamshire",
  "Hertfordshire",
  "Bedfordshire",
  "Milton Keynes",
  "Bedford",
  "Amersham",
  "Hitchin",
  "Welwyn Garden City",
  "Stevenage",
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
    metaTitle: `Independent Damp Surveys ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Independent damp surveys in ${DEFAULT_AREA}. Clear advice for damp patches, homebuyer concerns and failed repairs, with a written report and practical next steps.`,
    icon: Search,
    heroDescription:
      "Find out what is causing the damp before committing to treatment. We investigate the property, explain the evidence and provide a written report with practical next steps. Useful when a homebuyer survey has flagged damp or previous advice has left you unsure.",
    shortDesc:
      "Clear answers for homeowners and buyers, with evidence, a written report and proportionate advice before repairs.",
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
    title: "Second-Opinion Damp & Moisture Investigations",
    metaTitle: `Second-Opinion Damp Surveys ${DEFAULT_AREA} | True Damp Specialists`,
    metaDescription: `Conflicting damp reports or failed damp-proofing? Independent second opinions in ${DEFAULT_AREA} to understand the cause and decide what work is needed.`,
    icon: Scale,
    heroDescription:
      "Detailed damp and moisture investigations built around how the building is actually performing. Used where the cause is unclear, moisture behaviour needs proper interpretation, or previous repairs have failed because the root cause was never diagnosed.",
    shortDesc:
      "Consultancy-led investigation for unclear moisture behaviour, defect pathways, thermal patterns and failed previous repairs.",
    fullDescription: [
      "This service is designed for cases where moisture behaviour, construction detail, or defect interaction needs to be broken down properly before the right decision can be made.",
      "We use evidence-led reasoning, moisture profiling, thermal context and environmental analysis to explain what is actually happening within the building fabric, rather than relying on generic damp labels or assumptions.",
      "The output is a clearer root cause diagnosis, a more defensible explanation of why the issue is occurring, and staged guidance on what should happen next.",
    ],
    features: [
      "Specialist damp and moisture investigation",
      "Moisture mechanism analysis",
      "Thermal and environmental context",
      "Defect interaction and construction context",
      "Root cause diagnosis for failed previous repairs",
      "Staged remediation thinking",
      "Evidence-led reporting",
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
          "Reports are structured around clear findings and evidence. Where the brief extends beyond diagnosis, we can also support insured remedial or project works planning so the next stage is properly scoped. Use with your own legal or compliance advisers where formal duties apply.",
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
  // Specialist commercial routes support, rather than replace, the core damp offer.
  {
    slug: "commercial-damp-surveys",
    title: "Commercial Damp Surveys & Investigations",
    metaTitle: "Commercial Damp Surveys | True Damp Specialists",
    metaDescription: "Independent commercial damp investigations for managing agents, property owners and project teams. Clear findings, practical recommendations and specialist support.",
    icon: Building2,
    heroDescription: "Understand damp and moisture problems in a commercial property before deciding on repairs. We agree the investigation around the building, access arrangements and the decisions your project team needs to make.",
    shortDesc: "Independent investigation and practical reporting for commercial properties, managing agents and project teams.",
    fullDescription: [
      "Commercial instructions can involve recurring water ingress, conflicting reports or defects that affect a wider refurbishment. We start with the history, existing evidence and intended works so the investigation answers the right questions.",
      "The report explains the findings and proportionate next steps. Where further specialist input or remedial planning is needed, Rob can coordinate suitable support from his network for the agreed brief.",
      "Ferro and reinforcement scanning can be considered separately when a project requires information about concrete before proposed cutting or drilling. It complements the commercial offer without replacing a damp investigation.",
    ],
    features: ["Brief agreed around your property and project", "Review of existing reports and repair history", "Investigation of damp and moisture pathways", "Clear written findings and practical priorities", "Coordination with property and project teams", "Specialist support where the brief requires it"],
    pricing: [{service:"Commercial damp investigation",price:"Quoted per project",note:"Scope, access, reporting and any specialist input agreed in advance"}],
    faqs: [
      {question:"Who is this service for?",answer:"Commercial property owners, managing agents and project teams who need an independent explanation of a damp or moisture problem before planning the next step."},
      {question:"Can you review a problem after previous repairs?",answer:"Yes. Share the reports, photographs and repair history so we can agree an investigation focused on the unresolved issue."},
      {question:"Is concrete scanning included?",answer:"No. Scanning has a separate scope and quotation. We will discuss whether it is relevant to your proposed works and what specialist input is needed."},
    ],
    areas: coreAreas,
    relatedServices:["ferro-reinforcement-scanning","moisture-diagnostics-building-pathology","remedial-specifications-project-support"],
    process:commonProcess,
  },
  {
    slug:"ferro-reinforcement-scanning",
    title:"Ferro & Reinforcement Scanning",
    metaTitle:"Ferro & Reinforcement Scanning | True Damp Specialists",
    metaDescription:"Specialist concrete scanning coordinated by Rob Cain for commercial projects. Discuss your proposed cutting or drilling, site access and reporting requirements.",
    icon:Search,
    heroDescription:"Planning work involving concrete floors or structures? Rob coordinates specialist scanning to help the project team investigate what lies within the concrete before deciding how to proceed.",
    shortDesc:"Specialist concrete scanning for commercial project teams planning cutting, drilling or further investigation.",
    fullDescription:[
      "Rob has developed this service through commercial project work and a network of specialist subcontractors. Start by sharing what you plan to do, the concrete areas involved and any drawings or existing information.",
      "The appropriate scanning method, access requirements and reporting scope are agreed for the project. Findings help inform the next decision; they are not a blanket guarantee that cutting or drilling is safe.",
      "Scanning is a supporting commercial service. For damp, leaks or recurring moisture problems, an independent damp investigation remains the starting point."
    ],
    features:["Project brief reviewed with Rob", "Specialist scanning coordinated to suit the brief", "Existing drawings and site information considered", "Access and survey scope agreed in advance", "Findings for the project team's next decision", "Separate quotation for specialist investigation"],
    pricing:[{service:"Ferro / reinforcement scanning",price:"Quoted per project",note:"Method, coverage, access and reporting agreed before attendance"}],
    faqs:[
      {question:"What should I send with an enquiry?",answer:"The site location, the proposed works, approximate area to investigate, any drawings or photographs and your preferred timescale. Rob will review what further detail is needed."},
      {question:"Does a scan authorise cutting or drilling?",answer:"No. The project team must consider the findings alongside the construction information and any necessary engineering advice before agreeing the work."},
      {question:"Is this the same as a damp survey?",answer:"No. Concrete scanning answers a different project question. If you are investigating damp or water ingress, we can help identify the appropriate damp survey first."},
    ],
    areas:coreAreas,
    relatedServices:["commercial-damp-surveys","independent-damp-mould-surveys","remedial-specifications-project-support"],
    process:commonProcess,
  }
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const getRelatedServices = (slugs: string[]): Service[] =>
  services.filter((service) => slugs.includes(service.slug));
