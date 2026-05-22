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
    description: "Independent specialist damp and moisture investigations in Oxford, including heritage-sensitive, occupied and technically complex properties.",
    metaTitle: "Independent Damp Survey Oxford | True Damp Specialists",
    metaDescription: "Independent damp and moisture investigations in Oxford. Clear diagnosis, practical reporting and specialist thinking for complex and heritage-sensitive cases.",
    localContext: "Oxford's older buildings, altered historic fabric and more specialist property stock often call for a gentler, more analytical approach to moisture diagnosis than generic treatment-led advice.",
    neighborhoods: ["Jericho", "Summertown", "Headington", "Cowley", "Iffley", "Osney"],
  },
  {
    name: "Milton Keynes",
    slug: "milton-keynes",
    region: "Buckinghamshire",
    postcodes: ["MK1", "MK2", "MK3", "MK4", "MK5", "MK6", "MK7", "MK8", "MK9", "MK10"],
    emergencyTime: QUOTE_TIME,
    description: "Specialist damp and moisture investigations in Milton Keynes for homes, landlords, commercial spaces and properties where the cause is unclear.",
    metaTitle: "Damp & Moisture Investigation Milton Keynes | True Damp Specialists",
    metaDescription: "Specialist damp and moisture investigations in Milton Keynes. Evidence-led diagnosis, thermal context and practical reporting for homeowners, landlords and commercial clients.",
    localContext: "Milton Keynes contains a wide range of construction eras, extensions, flats and commercial units. That makes thermal behaviour, ventilation, drainage and previous works important to assess together before remedial decisions are made.",
    neighborhoods: ["Bletchley", "Wolverton", "Stony Stratford", "Newport Pagnell", "Woburn Sands", "Central Milton Keynes"],
  },
  {
    name: "Bedford",
    slug: "bedford",
    region: "Bedfordshire",
    postcodes: ["MK40", "MK41", "MK42", "MK43", "MK44"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp, mould and moisture reporting in Bedford for residential, rented, heritage and mixed-use properties.",
    metaTitle: "Independent Damp Survey Bedford | True Damp Specialists",
    metaDescription: "Independent damp and moisture investigations in Bedford. Diagnosis-led reporting, moisture profiling and practical next-step guidance.",
    localContext: "Bedford's mix of older housing, converted buildings, riverside settings and rented property means moisture symptoms should be interpreted against the building fabric, exposure and ventilation context.",
    neighborhoods: ["Castle", "De Parys", "Kempston", "Putnoe", "Brickhill", "Goldington"],
  },
  {
    name: "Amersham",
    slug: "amersham",
    region: "Buckinghamshire",
    postcodes: ["HP6", "HP7"],
    emergencyTime: QUOTE_TIME,
    description: "Specialist damp and moisture investigations in Amersham, including period homes, heritage fabric and complex moisture behaviour.",
    metaTitle: "Specialist Damp Investigation Amersham | True Damp Specialists",
    metaDescription: "Specialist damp and moisture investigations in Amersham for older, heritage and complex buildings. Evidence-led diagnosis and clear reporting.",
    localContext: "Amersham's older homes and traditional materials often need a careful building-fabric assessment before modern damp treatments or repairs are specified.",
    neighborhoods: ["Old Amersham", "Amersham on the Hill", "Chesham Bois", "Little Chalfont", "Coleshill", "Hyde Heath"],
  },
  {
    name: "Hitchin",
    slug: "hitchin",
    region: "Hertfordshire",
    postcodes: ["SG4", "SG5"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp and mould investigations in Hitchin for homeowners, buyers, landlords and property professionals who need a clear diagnosis.",
    metaTitle: "Independent Damp Survey Hitchin | True Damp Specialists",
    metaDescription: "Independent damp, mould and moisture investigations in Hitchin. Evidence-led reporting and practical remedial direction.",
    localContext: "Hitchin has a broad mix of older buildings, altered homes and managed property. Moisture issues here can involve external defects, ventilation, thermal bridges or previous repairs, so a single-label diagnosis is rarely enough.",
    neighborhoods: ["Town Centre", "West Hitchin", "Purwell", "Walsworth", "Ickleford", "Charlton"],
  },
  {
    name: "Welwyn Garden City",
    slug: "welwyn-garden-city",
    region: "Hertfordshire",
    postcodes: ["AL7", "AL8"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp, mould and moisture investigations in Welwyn Garden City with reporting focused on cause, evidence and practical next steps.",
    metaTitle: "Damp & Moisture Investigation Welwyn Garden City | True Damp Specialists",
    metaDescription: "Independent damp and moisture investigations in Welwyn Garden City. Thermal imaging, moisture profiling and clear evidence-led reporting.",
    localContext: "Welwyn Garden City's planned housing, later alterations and varied property management histories can make moisture behaviour dependent on ventilation, detailing, occupancy and fabric performance.",
    neighborhoods: ["Haldens", "Panshanger", "Handside", "Peartree", "Digswell", "Sherrardspark"],
  },
  {
    name: "Stevenage",
    slug: "stevenage",
    region: "Hertfordshire",
    postcodes: ["SG1", "SG2"],
    emergencyTime: QUOTE_TIME,
    description: "Independent damp, mould and moisture reporting in Stevenage for residential, rental and managed-property cases.",
    metaTitle: "Independent Damp Survey Stevenage | True Damp Specialists",
    metaDescription: "Independent damp, mould and moisture investigations in Stevenage. Diagnosis-led reporting for homeowners, landlords and property professionals.",
    localContext: "Stevenage properties often involve post-war housing, altered details, ventilation changes and varied maintenance histories. A proper damp investigation helps separate condensation, fabric defects, leaks and previous treatment issues.",
    neighborhoods: ["Old Town", "Chells", "Shephall", "Bedwell", "Pin Green", "Great Ashby"],
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
