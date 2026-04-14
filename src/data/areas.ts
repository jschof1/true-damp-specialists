export interface Area {
  readonly name: string;
  readonly slug: string;
  readonly region: string;
  postcodes: string[];
  /** Neutral quote turnaround (no travel-time promise). Used for UI display. */
  emergencyTime: string;
  description?: string;
  landmarks?: string[];
  metaTitle?: string;
  metaDescription?: string;
  localContext?: string;
  neighborhoods?: string[];
}

export function validateArea(area: Area): string[] {
  const errors: string[] = [];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(area.slug)) {
    errors.push(`[${area.slug}] slug: must be lowercase kebab-case`);
  }
  if (!area.region || area.region.length < 2) {
    errors.push(`[${area.slug}] region: required`);
  }
  return errors;
}

export function validateAllAreas(areaList: Area[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const a of areaList) {
    if (seen.has(a.slug)) errors.push(`Duplicate slug: ${a.slug}`);
    seen.add(a.slug);
    errors.push(...validateArea(a));
  }
  return errors;
}

const QUOTE_TIME = "Discuss scope and next steps";

export const areas: Area[] = [
  {
    name: "Watford",
    slug: "watford",
    region: "Hertfordshire & Watford",
    postcodes: ["WD17", "WD18", "WD19", "WD24", "WD25"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp, mould and moisture investigations in Watford, with reporting built around diagnosis, practical next steps and avoiding the wrong remedial decision.",
    metaTitle: "Independent Damp Survey Watford | True Damp Specialists",
    metaDescription: "Independent damp and mould surveys in Watford. Clear diagnosis, evidence-led reporting and practical next-step guidance for homeowners, buyers and landlords.",
    localContext: "Watford combines older housing stock, extensions, flats and newer developments. That mix means moisture problems can stem from ventilation, maintenance, fabric defects, drainage or previous poor advice rather than one simple cause.",
    neighborhoods: ["Cassiobury", "Nascot Wood", "West Watford", "North Watford", "Garston", "Leavesden"],
  },
  {
    name: "Central London",
    slug: "central-london",
    region: "London",
    postcodes: ["WC1", "WC2", "EC1", "EC2", "EC3", "EC4", "W1", "SW1", "SE1"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp, mould and moisture reporting for Central London properties, including residential, mixed-use, managed and specialist buildings.",
    metaTitle: "Independent Damp Survey Central London | True Damp Specialists",
    metaDescription: "Independent damp and moisture investigations in Central London for residential, managed and specialist property cases. Evidence-led reporting and practical next steps.",
    localContext: "Central London properties often combine age, density, complex maintenance histories and specialist use classes. Moisture problems here frequently need stronger diagnosis and reporting discipline than a generic damp quote can provide.",
    neighborhoods: ["Marylebone", "Bloomsbury", "Westminster", "Holborn", "South Bank", "Clerkenwell"],
  },
  {
    name: "St Albans",
    slug: "st-albans",
    region: "Hertfordshire & Watford",
    postcodes: ["AL1", "AL2", "AL3", "AL4"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp and mould surveys in St Albans for homeowners, buyers, landlords and property professionals who need a clearer diagnosis.",
    metaTitle: "Independent Damp Survey St Albans | True Damp Specialists",
    metaDescription: "Independent damp and mould investigations in St Albans. Diagnosis-first reporting, second opinions and practical remedial guidance.",
    localContext: "St Albans combines historic housing, period detailing, modern family homes and investment property. That usually makes defect-led reasoning and ventilation context just as important as simple moisture readings.",
    neighborhoods: ["City Centre", "Marshalswick", "Fleetville", "Bernards Heath", "Park Street", "London Colney"],
  },
  {
    name: "High Wycombe",
    slug: "high-wycombe",
    region: "Buckinghamshire",
    postcodes: ["HP10", "HP11", "HP12", "HP13", "HP14", "HP15"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp and moisture diagnostics in High Wycombe, with support for repeated damp, ingress concerns, mould and report-led next steps.",
    metaTitle: "Independent Damp Survey High Wycombe | True Damp Specialists",
    metaDescription: "Independent damp, mould and moisture surveys in High Wycombe. Clear diagnosis and practical reporting for homeowners, buyers and landlords.",
    localContext: "High Wycombe and its surrounding commuter-belt housing create a wide mix of property age, construction style and maintenance history. That makes accurate cause analysis especially important before works are instructed.",
    neighborhoods: ["Town Centre", "Hazlemere", "Downley", "Loudwater", "Marlow Hill", "Booker"],
  },
  {
    name: "Luton",
    slug: "luton",
    region: "Bedfordshire",
    postcodes: ["LU1", "LU2", "LU3", "LU4"],
    emergencyTime: QUOTE_TIME,
    description: "Independent surveys and diagnostics for damp, mould and moisture issues in Luton, including owner-occupied, rented and higher-density housing cases.",
    metaTitle: "Independent Damp Survey Luton | True Damp Specialists",
    metaDescription: "Independent damp and mould investigations in Luton. Evidence-led reporting, second opinions and practical next-step guidance.",
    localContext: "Luton's denser housing patterns and varied maintenance standards can make mould, condensation and repeated damp complaints especially important to diagnose properly before remediation is planned.",
    neighborhoods: ["Bury Park", "Stopsley", "Leagrave", "Round Green", "Farley Hill", "Wigmore"],
  },
  {
    name: "Hemel Hempstead",
    slug: "hemel-hempstead",
    region: "Hertfordshire & Watford",
    postcodes: ["HP1", "HP2", "HP3"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp and mould reporting in Hemel Hempstead for homes, rented properties and wider property-management cases.",
    metaTitle: "Independent Damp Survey Hemel Hempstead | True Damp Specialists",
    metaDescription: "Independent damp and mould surveys in Hemel Hempstead. Diagnosis-first reporting and clearer next steps for homeowners, landlords and buyers.",
    localContext: "Hemel Hempstead's mix of post-war housing, later developments and altered building fabric can produce moisture issues that need a more context-aware diagnosis than a standard damp sales visit.",
    neighborhoods: ["Boxmoor", "Apsley", "Leverstock Green", "Warners End", "Nash Mills", "Adeyfield"],
  },
  {
    name: "Oxford",
    slug: "oxford",
    region: "Oxfordshire",
    postcodes: ["OX1", "OX2", "OX3", "OX4"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp and building-pathology-led investigations in Oxford, including heritage-sensitive, occupied and technically complex properties.",
    metaTitle: "Independent Damp Survey Oxford | True Damp Specialists",
    metaDescription: "Independent damp and moisture investigations in Oxford. Clear diagnosis, practical reporting and specialist thinking for complex and heritage-sensitive cases.",
    localContext: "Oxford's older buildings, altered historic fabric and more specialist property stock often call for a gentler, more analytical approach to moisture diagnosis than generic treatment-led advice.",
    neighborhoods: ["Jericho", "Summertown", "Headington", "Cowley", "Iffley", "Osney"],
  },
  {
    name: "Aylesbury",
    slug: "aylesbury",
    region: "Buckinghamshire",
    postcodes: ["HP17", "HP18", "HP19", "HP20", "HP21", "HP22"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp and mould investigations in Aylesbury for homeowners, buyers, landlords and property professionals who need a more reliable diagnosis.",
    metaTitle: "Independent Damp Survey Aylesbury | True Damp Specialists",
    metaDescription: "Independent damp and mould surveys in Aylesbury. Clear reporting, diagnosis-first advice and practical next steps.",
    localContext: "Aylesbury's housing spread includes established family homes, newer estates and varied maintenance histories, which makes a careful distinction between defect, moisture behaviour and occupancy effects especially valuable.",
    neighborhoods: ["Fairford Leys", "Southcourt", "Broughton", "Bedgrove", "Walton Court", "Berryfields"],
  }
];

const areaImages =
  typeof import.meta.glob === "function"
    ? (import.meta.glob("../assets/areas/*.{png,webp}", {
        eager: true,
        query: "?url",
        import: "default",
      }) as Record<string, string | undefined>)
    : ({} as Record<string, string | undefined>);

export const getAreaImage = (slug: string): string | undefined => {
  const pngPath = `../assets/areas/${slug}.png`;
  const webpPath = `../assets/areas/${slug}.webp`;
  return (areaImages[pngPath] || areaImages[webpPath]) as string | undefined;
};

export const getAreaBySlug = (slug: string) =>
  areas.find((a) => a.slug === slug);
