import { siteSettings } from "./siteSettings";
import type { Review } from "./reviews";

/**
 * Generic placeholder reviews for display when no approved public review copy is available.
 * These are paraphrased outcome themes, not verbatim published testimonials.
 */
export const fallbackReviews: Review[] = [
  {
    name: "Homeowner",
    location: siteSettings.addressDetails.addressLocality,
    rating: 5,
    text: "The clearest part of the experience was finally understanding the likely cause and what needed to happen next.",
    service: "Independent Damp & Mould Surveys",
    scenarioLabel: "Long-term damp misdiagnosed as rising damp",
    date: "Recently",
    verified: false,
  },
  {
    name: "Buyer",
    location: siteSettings.addressDetails.addressLocality,
    rating: 5,
    text: "The report made a confusing issue much easier to understand before we committed to major works.",
    service: "Moisture Diagnostics & Building Pathology",
    scenarioLabel: "Pre-purchase damp assessment",
    date: "Recently",
    verified: false,
  },
  {
    name: "Landlord",
    location: siteSettings.addressDetails.addressLocality,
    rating: 5,
    text: "We needed something more convincing than generic damp advice, and the findings felt properly reasoned.",
    service: "Mould Remediation & Condensation Control",
    scenarioLabel: "Condensation and mould in older property",
    date: "Recently",
    verified: false,
  },
  {
    name: "Property Owner",
    location: siteSettings.addressDetails.addressLocality,
    rating: 5,
    text: "The recommendations felt practical and grounded in the building rather than in selling unnecessary treatment.",
    service: "Remedial Specifications & Project Support",
    scenarioLabel: "High moisture readings with unclear source",
    date: "Recently",
    verified: false,
  },
];
