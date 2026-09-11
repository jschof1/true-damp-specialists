import type React from "react";
import type { LucideProps } from "lucide-react";
import { Search, Scale, Building2, Camera, GitCompare, ClipboardList, Settings, CheckCircle2 } from "lucide-react";
import { siteSettings } from "./siteSettings";

type LucideIcon = React.ComponentType<LucideProps & { className?: string }>;

export interface ServicePricing { service: string; price: string; note?: string; }
export interface ServiceFAQ { question: string; answer: string; }
export interface ServiceProcessStep { title: string; description: string; icon: LucideIcon; }
export interface Service {
  slug: string; title: string; metaTitle: string; metaDescription: string; icon: LucideIcon;
  heroDescription: string; shortDesc: string; fullDescription: string[]; features: string[];
  pricing: ServicePricing[]; faqs: ServiceFAQ[]; areas: string[]; relatedServices: string[]; process: ServiceProcessStep[];
}

const area = siteSettings.addressDetails.addressLocality;
const coreAreas = ["North London", "Central London", "Home Counties", "Buckinghamshire", "Hertfordshire", "Bedfordshire", "Milton Keynes", "Bedford", "Amersham", "Hitchin", "Welwyn Garden City", "Stevenage"];
const process: ServiceProcessStep[] = [
  { title: "Understand", description: "We start with the concern, the property, what has happened previously and the decision you need to make.", icon: Search },
  { title: "Investigate", description: "We gather the relevant evidence through inspection, measurement and building context.", icon: Settings },
  { title: "Explain", description: "You receive clear findings, practical recommendations and the appropriate next step.", icon: CheckCircle2 },
];
const scope = (service: string): ServicePricing[] => [{ service, price: "Scope agreed before work starts", note: "The property, access, investigation and reporting requirements are agreed before instruction." }];
const related = ["independent-damp-mould-surveys", "moisture-diagnostics-building-pathology", "mould-remediation-condensation-control"];

export const services: Service[] = [
  {
    slug: "independent-damp-mould-surveys", title: "Damp & Moisture Investigations", icon: Search,
    metaTitle: `Damp & Moisture Investigations ${area} | True Damp Specialists`,
    metaDescription: `Damp and moisture investigations in ${area}. Understand the cause before committing to repairs, with clear written findings and practical next steps.`,
    heroDescription: "Visible damp is a starting point, not a diagnosis. We investigate the building, the available evidence and the history of the issue before explaining what we believe is causing the problem and what should happen next.",
    shortDesc: "For damp, staining, unexplained moisture or deterioration where the cause needs establishing.",
    fullDescription: ["A damp or moisture concern can involve rainwater, drainage, ground levels, floors, ventilation, thermal bridging, salts, leaks, previous alterations or a combination of factors.", "The investigation considers the visible symptom in the context of the building. The report explains the relevant findings and gives practical next steps rather than a pre-selected treatment."],
    features: ["History and building context", "Affected and adjoining areas", "External and internal moisture pathways", "Moisture patterns and relevant measurements", "Clear written findings", "Practical next-step advice"],
    pricing: scope("Damp & moisture investigation"),
    faqs: [{question:"Will I receive a report?",answer:"The reporting requirements are agreed as part of the scope. A written report explains the relevant findings, diagnosis and recommended next steps."},{question:"Is a damp patch always rising damp?",answer:"No. A visible symptom needs to be considered in the context of the building and the evidence before a diagnosis is made."}],
    areas: coreAreas, relatedServices: ["moisture-diagnostics-building-pathology", "mould-remediation-condensation-control", "external-defects-drainage-weathering"], process,
  },
  {
    slug: "moisture-diagnostics-building-pathology", title: "Damp Second Opinions & Failed Previous Works", icon: Scale,
    metaTitle: `Damp Second Opinions ${area} | True Damp Specialists`, metaDescription: `Independent damp second opinions in ${area} for conflicting advice, failed previous works and significant proposed repairs.`,
    heroDescription: "If advice conflicts, previous works have not solved the problem or substantial work has been proposed, an independent investigation can help establish what the evidence supports.",
    shortDesc: "A clearer view when advice conflicts, previous works have failed or major repairs are proposed.",
    fullDescription: ["We review the concern, the building and relevant previous information before deciding what additional investigation is needed. The purpose is to clarify the cause and the proportionate next step, not to criticise another professional.", "This can be useful where the explanation has changed, the problem remains after work, or the scale of proposed repairs needs more context."],
    features: ["Conflicting advice reviewed in context", "Failed previous works considered", "Relevant reports and observations", "Proportionate further investigation", "Clear findings and next steps"], pricing: scope("Second-opinion investigation"),
    faqs: [{question:"Can you review an earlier report?",answer:"Yes. Relevant reports and previous advice can form part of the history, alongside the condition of the building and any further investigation required."},{question:"Is it only for failed damp proofing?",answer:"No. It is also relevant where advice conflicts or significant works are proposed before the cause is clear."}],
    areas: coreAreas, relatedServices: ["independent-damp-mould-surveys", "external-defects-drainage-weathering", "remedial-specifications-project-support"], process,
  },
  {
    slug: "mould-remediation-condensation-control", title: "Condensation, Mould & Ventilation Investigations", icon: Building2,
    metaTitle: `Condensation & Mould Investigations ${area} | True Damp Specialists`, metaDescription: `Condensation, mould and ventilation investigations in ${area} that consider the building, internal environment and moisture behaviour.`,
    heroDescription: "Mould and condensation are symptoms. We investigate the internal environment, ventilation, cold surfaces, thermal bridging and any building defects that may be affecting moisture behaviour.",
    shortDesc: "Investigation of humidity, ventilation, cold surfaces, thermal bridging and mould concerns.",
    fullDescription: ["A useful investigation looks beyond the visible mould. It considers how moisture is generated, how air moves, how surfaces behave and whether another source of moisture or a building defect is involved.", "Recommendations focus on the cause and practical prevention, rather than a surface-only response."],
    features: ["Internal environment and humidity", "Ventilation and air movement", "Cold surfaces and thermal bridging", "Signs of leaks or building defects", "Clear recommendations for the building"], pricing: scope("Condensation & mould investigation"),
    faqs: [{question:"Is mould always caused by lifestyle?",answer:"No. Mould can involve occupancy, ventilation, thermal performance, leaks and building defects. The relevant factors need to be considered together."},{question:"Do you use thermal imaging?",answer:"Where it is relevant to the question being investigated, thermal imaging can help interpret cold surfaces and moisture behaviour alongside other evidence."}],
    areas: coreAreas, relatedServices: ["independent-damp-mould-surveys", "external-defects-drainage-weathering", "moisture-diagnostics-building-pathology"], process,
  },
  {
    slug: "basement-below-ground-waterproofing", title: "Basement & Below-Ground Moisture Investigations", icon: GitCompare,
    metaTitle: `Basement & Below-Ground Moisture Investigations ${area} | True Damp Specialists`, metaDescription: `Basement and below-ground moisture investigations in ${area}, with building-specific assessment and BS 8102-informed context.`,
    heroDescription: "Below-ground moisture needs to be understood in the context of construction, water pathways, drainage and any existing waterproofing before an intervention is selected.", shortDesc: "For basement and below-ground moisture concerns where the right next step needs defining.",
    fullDescription: ["We consider construction, water pressure and pathways, drainage, ground conditions, visible defects and the context of any existing waterproofing system.", "BS 8102 can inform the assessment, but the recommendation must remain specific to the building and the evidence."],
    features: ["Below-ground construction context", "Ingress and drainage pathways", "Existing waterproofing where present", "BS 8102-informed professional judgement", "Clear next-step guidance"], pricing: scope("Basement & below-ground investigation"),
    faqs: [{question:"Do you install waterproofing?",answer:"The primary purpose of this service is to understand the condition and identify the appropriate scope before waterproofing work is selected."},{question:"Is every basement issue the same?",answer:"No. Below-ground moisture can arise from several interacting factors, which is why the construction and water pathways matter."}],
    areas: coreAreas, relatedServices: ["external-defects-drainage-weathering", "independent-damp-mould-surveys", "remedial-specifications-project-support"], process,
  },
  {
    slug: "external-defects-drainage-weathering", title: "Leak, Drainage & Water Ingress Investigations", icon: Camera,
    metaTitle: `Leak, Drainage & Water Ingress Investigations ${area} | True Damp Specialists`, metaDescription: `Leak, drainage and water ingress investigations in ${area} for concealed moisture pathways, rainwater, plumbing and external defects.`,
    heroDescription: "Water can travel some distance from its source. We investigate likely pathways through roofs, rainwater goods, walls, drainage, plumbing, ground levels and concealed construction.", shortDesc: "For leaks, drainage defects, external water ingress and concealed moisture pathways.",
    fullDescription: ["The investigation starts with the pattern of the problem and the building context. Depending on the question, it may consider roof and rainwater details, external walls, drainage, plumbing, ground levels and concealed voids.", "The aim is to identify the most likely source and route of moisture so any next work is targeted and proportionate."],
    features: ["Roof and rainwater observations", "External water pathways", "Drainage and ground-level context", "Concealed moisture routes", "Evidence for the next decision"], pricing: scope("Leak, drainage & water-ingress investigation"),
    faqs: [{question:"Can a leak cause damp away from the source?",answer:"Yes. Water can travel through construction and along services before becoming visible. The observed symptom is considered alongside likely pathways."},{question:"Will invasive work always be needed?",answer:"No. Any further investigation is recommended only where it is needed to answer the question reliably."}],
    areas: coreAreas, relatedServices: ["independent-damp-mould-surveys", "basement-below-ground-waterproofing", "moisture-diagnostics-building-pathology"], process,
  },
  {
    slug: "remedial-specifications-project-support", title: "Remedial Specifications & Project Support", icon: ClipboardList,
    metaTitle: `Remedial Specifications & Project Support ${area} | True Damp Specialists`, metaDescription: `Diagnosis-led remedial specifications and project support in ${area} after the cause and appropriate scope are understood.`,
    heroDescription: "Diagnosis comes first. Once the cause is understood, we can help define a clear, proportionate scope and support the next stage of work.", shortDesc: "Clear remedial scopes and practical project support after the cause has been established.",
    fullDescription: ["The sequence matters: understand the diagnosis, define the scope, then carry out or coordinate the work. This service helps translate findings into practical remedial specifications and clear project decisions.", "Support can include reviewing proposals, clarifying interfaces and coordinating specialist input where required."],
    features: ["Diagnosis-first scopes", "Remedial specifications", "Review of contractor proposals", "Practical project coordination", "Specialist input where required"], pricing: scope("Remedial specification & project support"),
    faqs: [{question:"Can you help after the survey?",answer:"Yes. Where the cause is clear, we can help define the next scope and review the practical route forward."},{question:"Do you recommend work before investigating?",answer:"No. The scope should follow the diagnosis and the needs of the building."}],
    areas: coreAreas, relatedServices: ["independent-damp-mould-surveys", "moisture-diagnostics-building-pathology", "commercial-damp-surveys"], process,
  },
  {
    slug: "commercial-damp-surveys", title: "Commercial Damp, Moisture & Building Defect Investigations", icon: Scale,
    metaTitle: `Commercial Damp & Building Defect Investigations ${area} | True Damp Specialists`, metaDescription: `Commercial damp, moisture and building defect investigations in ${area}, with practical reporting for property and project decisions.`,
    heroDescription: "Investigation and practical reporting for commercial property where moisture, building defects, programme risk or competing advice need clear context.", shortDesc: "Commercial investigation, reporting and coordination around the building and project decision.",
    fullDescription: ["Commercial instructions often need the concern, evidence, operational context and project impact explained clearly. We investigate the building, interpret the findings and report in a form that supports a practical decision.", "Where needed, the next stage can be coordinated with the appropriate specialist expertise and trades."],
    features: ["Investigate the relevant defect", "Interpret evidence in building context", "Report clear findings and recommendations", "Coordinate appropriate specialist input", "Support practical project decisions"], pricing: scope("Commercial building investigation"),
    faqs: [{question:"Do you work with property teams?",answer:"Yes. The investigation and reporting can be scoped around the property, operational requirements and decision that needs to be made."},{question:"Can specialist input be coordinated?",answer:"Where evidence requires it, appropriate engineering, drainage, roofing, waterproofing or trade input can be brought into the next stage."}],
    areas: coreAreas, relatedServices: ["remedial-specifications-project-support", "external-defects-drainage-weathering", "ferro-reinforcement-scanning"], process,
  },
  {
    slug: "ferro-reinforcement-scanning", title: "Ferro & Reinforcement Scanning", icon: Camera,
    metaTitle: `Ferro & Reinforcement Scanning ${area} | True Damp Specialists`, metaDescription: `Commercial concrete ferro and reinforcement scanning in ${area} to support safe, informed coordination before drilling, cutting or fixing.`,
    heroDescription: "Commercial concrete scanning to help project teams identify reinforcement and embedded features before drilling, cutting or fixing.", shortDesc: "Concrete scanning for safer, informed commercial project coordination.",
    fullDescription: ["This is a commercial scanning service for concrete structures. It helps plan work around reinforcement and embedded elements before drilling, cutting or fixing.", "The service is coordinated around the project brief, access requirements and the information needed for the planned work."],
    features: ["Agree the project brief", "Review access and scan areas", "Carry out scanning", "Record relevant findings", "Support informed coordination before works"], pricing: scope("Ferro & reinforcement scanning"),
    faqs: [{question:"Is this a residential damp service?",answer:"No. This service is for commercial concrete scanning and project coordination."},{question:"What happens after scanning?",answer:"The findings are provided in the form agreed for the project so the next work can be planned with better information."}],
    areas: coreAreas, relatedServices: ["commercial-damp-surveys", "remedial-specifications-project-support", "external-defects-drainage-weathering"], process,
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => services.find((service) => service.slug === slug);

export const getRelatedServices = (slugs: string[]): Service[] =>
  services.filter((service) => slugs.includes(service.slug));
