/**
 * Published booth pricing tiers.
 *
 * Single source of truth for the pricing page cards and the downloadable
 * Booth Rental Pricing Guide PDF, so the guide can never drift from the site.
 */

/** Booking year the downloadable guide is published for. */
export const GUIDE_YEAR = 2027;

/** The guide ships in a USA (USD) and a Canadian (CAD) edition. */
export type PricingRegion = "us" | "ca";

export const REGION_LABEL: Record<PricingRegion, string> = {
  us: "USA Edition",
  ca: "Canada Edition",
};

export const REGION_CURRENCY: Record<PricingRegion, string> = {
  us: "All figures in USD, for shows held in the United States.",
  ca: "All figures in CAD, for shows held in Canada.",
};

export type PricingTier = {
  size: string;
  rental: string;
  custom: string;
  sqft: string;
  fits: string;
  includes: string[];
  featured?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    size: "10×10 in-line",
    rental: "$16,250",
    custom: "$22,000",
    sqft: "100 sq ft",
    fits: "Regional shows and first-time exhibitors",
    includes: [
      "Custom backwall",
      "Reception counter",
      "Standard lighting",
      "Monitor mount",
      "Printed graphics",
    ],
  },
  {
    size: "10×20 in-line",
    rental: "$22,750",
    custom: "$32,000",
    sqft: "200 sq ft",
    fits: "Established programmes needing a demo area plus a meeting nook",
    includes: [
      "Custom backwall + wings",
      "Reception + demo counters",
      "Semi-private meeting nook",
      "Lit feature wall",
      "Storage",
    ],
    featured: true,
  },
  {
    size: "20×20 island",
    rental: "$39,000",
    custom: "$60,000",
    sqft: "400 sq ft",
    fits: "Flagship shows where you need a 360° presence",
    includes: [
      "Four-sided architecture",
      "Hanging sign (rigging extra)",
      "Enclosed meeting room",
      "AV integration",
      "Custom flooring",
    ],
  },
  {
    size: "20×30+ island",
    rental: "$65,000",
    custom: "$95,000",
    sqft: "600+ sq ft",
    fits: "Category-leader presence, hospitality and multiple demo zones",
    includes: [
      "Multi-zone architecture",
      "Hospitality bar",
      "Two meeting rooms",
      "LED feature wall",
      "Double-deck capable",
    ],
  },
];

/** Canadian edition — same footprints, CAD starting prices. */
export const PRICING_TIERS_CAD: PricingTier[] = PRICING_TIERS.map((t, i) => ({
  ...t,
  rental: ["$22,100", "$31,200", "$53,300", "$88,400"][i]!,
  custom: ["$30,000", "$44,000", "$82,000", "$130,000"][i]!,
}));

export function tiersFor(region: PricingRegion): PricingTier[] {
  return region === "ca" ? PRICING_TIERS_CAD : PRICING_TIERS;
}

/**
 * Build levels, named in plain search language rather than "Tier 1/2/3".
 * The starting-from price is the Standard level; Premium, Flagship and Architect
 * are the same footprint built at progressively higher finish and feature levels.
 */
export type SpecTier = {
  level: 1 | 2 | 3 | 4;
  /** Short label used in tables and chips, e.g. "Standard". */
  short: string;
  /** Full label used in headings, e.g. "Standard booth". */
  label: string;
  multiplier: number;
  blurb: string;
};

export const SPEC_TIERS: SpecTier[] = [
  {
    level: 1,
    short: "Standard",
    label: "Standard booth",
    multiplier: 1,
    blurb:
      "100% custom layout, custom graphics and turnkey service. This is the starting-from price for the footprint.",
  },
  {
    level: 2,
    short: "Premium",
    label: "Premium booth",
    multiplier: 1.2,
    blurb:
      "More structure and custom detailing, backlit feature walls, millwork counters and a larger integrated AV and lighting package.",
  },
  {
    level: 3,
    short: "Flagship",
    label: "Flagship booth",
    multiplier: 1.4,
    blurb:
      "Heavily customised architecture, enclosed meeting rooms and second-storey or overhead structure, with extensive LED, lighting and full AV integration.",
  },
  {
    level: 4,
    short: "Architect",
    label: "Architect booth",
    multiplier: 1.82,
    blurb:
      "Our highest level: designed and approved by a top designer or architect, with engineered one-off structures, sculptural forms, bespoke materials, integrated technology and white-glove service. A second story is optional, not assumed.",
  },
];


/** Parse a published price string like "$16,250" into a number. */
export function parsePrice(price: string): number {
  return Number(price.replace(/[^\d.]/g, ""));
}

/** Format a number back into the published "$16,250" style. */
export function formatPrice(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

/** Price for a published base at a given spec tier, rounded to the nearest $500. */
export function tierPrice(base: string, multiplier: number): string {
  const raw = parsePrice(base) * multiplier;
  return formatPrice(Math.round(raw / 500) * 500);
}


export const PRICING_INCLUDED = [
  "Custom design and photoreal 3D renders — complimentary, before you commit",
  "Fabrication of structure, walls, counters and feature elements",
  "Printed graphics produced fresh for the show",
  "Standard booth lighting",
  "Setup drawings, CAD and venue submission documents",
  "Install and dismantle labour — always included in our pricing",
  "Project management from kickoff to teardown",
  "Post-show recovery of the structure — no storage cost to you",
];

export const PRICING_NOT_INCLUDED: [string, string][] = [
  [
    "Drayage / material handling",
    "Billed by the venue's contractor on crated weight. We coordinate and optimise it; the invoice is theirs.",
  ],
  [
    "Electrical, rigging and internet",
    "Venue-controlled services ordered in advance. We file the orders on your behalf.",
  ],
  ["Freight to and from the show", "Quoted per lane; cross-border adds broker fees."],
  ["Booth space rental", "Paid directly to the show organiser."],
  ["Show cleaning and furniture", "Ordered through the general contractor."],
];

/** Canadian edition mirrors the USA list; install and dismantle is included in both. */
export const PRICING_NOT_INCLUDED_CA: [string, string][] = PRICING_NOT_INCLUDED;


/** Show-service cost guidance by market type, as a share of booth cost (USA). */
export const SHOW_SERVICE_GUIDANCE: [string, string][] = [
  ["Standard US market", "Roughly 30–45% of booth cost"],
  ["Major US market (Orlando, Atlanta, Anaheim)", "Roughly 35–50% of booth cost"],
  ["Strict union city (Chicago, NYC, San Francisco, Las Vegas)", "Roughly 45–60% of booth cost"],
];

/** Show-service cost guidance for Canadian shows. */
export const SHOW_SERVICE_GUIDANCE_CA: [string, string][] = [
  ["Regional Canadian market (Halifax, Ottawa, Calgary)", "Roughly 25–40% of booth cost"],
  ["Major Canadian market (Toronto, Vancouver, Montreal)", "Roughly 35–50% of booth cost"],
  ["Cross-border show shipping into the US", "Add customs brokerage, duty deposit and carnet handling"],
];

export function showServicesFor(region: PricingRegion): [string, string][] {
  return region === "ca" ? SHOW_SERVICE_GUIDANCE_CA : SHOW_SERVICE_GUIDANCE;
}

export function notIncludedFor(region: PricingRegion): [string, string][] {
  return region === "ca" ? PRICING_NOT_INCLUDED_CA : PRICING_NOT_INCLUDED;
}


/** What moves a project up or down inside its published range. */
export const PRICING_RANGE_DRIVERS = [
  "How much structure the design carries — walls, towers, enclosed rooms, overhead and second-storey elements",
  "Level of customisation — bespoke millwork, shaped forms and one-off detailing versus repeatable architecture",
  "AV integration — a single monitor versus a tiled LED wall with content and on-site techs",
  "Enclosed structures: meeting rooms, storage and second storeys all add engineering and weight",
  "Weight itself, because drayage is billed per hundredweight — heavier booths cost more every show",
  "Show city — install and dismantle labour is always in our price, so strict union jurisdictions carry a higher built-in labour cost",
];

/** Practical ways exhibitors reduce spend without shrinking presence. */
export const PRICING_COST_SAVERS = [
  "Hit every advance-order deadline. This is the single largest controllable saving — typically 20–35% on show services.",
  "Design for weight. Aluminium framing and tension fabric in place of hard panels can cut drayage substantially on a large booth.",
  "Rent the structure, own the graphics. You keep brand control and lose the storage, refurbishment and return-freight bills.",
  "Reuse the architecture across a season and change only the graphics package between shows.",
  "Order electrical once, correctly. Same-day changes on the show floor are billed at the highest rate on the sheet.",
  "Pick one hero moment instead of five good ones. Concentrated budget reads bigger on the floor than evenly spread budget.",
];
