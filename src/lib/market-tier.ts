import { BOOTH_SIZES } from "@/data/booth-sizes";
import { CITY_TIER } from "@/lib/estimator";

export type MarketTier = {
  id: "standard" | "major" | "union";
  label: string;
  mult: number;
  note: string;
};

/** Strict-union / high-cost labour markets. */
const UNION_CITIES = [
  "chicago",
  "new york",
  "new york city",
  "brooklyn",
  "san francisco",
  "las vegas",
  "boston",
  "philadelphia",
  "detroit",
  "cleveland",
  "pittsburgh",
  "st. louis",
  "minneapolis",
  "seattle",
  "honolulu",
];

/** Major markets — busier halls, higher labour and freight than a regional venue. */
const MAJOR_CITIES = [
  "toronto",
  "orlando",
  "atlanta",
  "vancouver",
  "montréal",
  "montreal",
  "los angeles",
  "anaheim",
  "san diego",
  "dallas",
  "houston",
  "austin",
  "miami",
  "washington",
  "national harbor",
  "denver",
  "phoenix",
  "nashville",
  "new orleans",
  "san jose",
  "calgary",
  "ottawa",
];

/**
 * City cost index — how much a booth costs in a given market versus our
 * national base price. Driven by hall labour rates, freight lanes, drayage and
 * local demand. Hard-capped at ±15% so pricing stays honest and comparable.
 */
const INDEX_MIN = 0.85;
const INDEX_MAX = 1.15;
const clampIndex = (n: number) => Math.min(INDEX_MAX, Math.max(INDEX_MIN, n));

/** Explicit, hand-set city indexes. Everything else is derived below. */
const CITY_INDEX: Record<string, number> = {
  // Highest-cost halls
  "new york": 1.15,
  "new york city": 1.15,
  brooklyn: 1.15,
  "san francisco": 1.14,
  chicago: 1.12,
  boston: 1.12,
  "las vegas": 1.1,
  orlando: 1.1,
  seattle: 1.08,
  philadelphia: 1.08,
  honolulu: 1.12,
  toronto: 1.06,
  vancouver: 1.06,
  // Los Angeles + surrounding Southern California — our strongest fabrication
  // and freight coverage, so we pass the savings through.
  "los angeles": 0.95,
  anaheim: 0.95,
  "long beach": 0.95,
  pasadena: 0.95,
  burbank: 0.95,
  ontario: 0.95,
  riverside: 0.95,
  "santa monica": 0.95,
  "san diego": 0.97,
  irvine: 0.95,
};

/**
 * Derived index for any market we haven't hand-set: start from the labour tier,
 * then clamp. Regional halls stay at our national base price.
 */
function derivedIndex(id: MarketTier["id"]): number {
  if (id === "union") return 1.1;
  if (id === "major") return 1.05;
  return 1.0;
}

/** 0.85–1.15 cost index for a city. */
export function cityCostIndex(city: string, tierId: MarketTier["id"]): number {
  const c = city.trim().toLowerCase();
  const explicit = CITY_INDEX[c];
  return clampIndex(explicit ?? derivedIndex(tierId));
}

/** Human-readable "+10% vs. national base" style label. */
export function cityIndexLabel(index: number): string {
  const pct = Math.round((index - 1) * 100);
  if (pct === 0) return "At our national base pricing";
  return `${pct > 0 ? "+" : ""}${pct}% vs. our national base pricing`;
}

const TIER = (id: MarketTier["id"]): MarketTier => {
  const t = CITY_TIER.find((c) => c.id === id) ?? CITY_TIER[0];
  return { id, label: t.label, mult: t.mult, note: t.note };
};

/** Market tier for a city name, used to shade venue and city price bands. */
export function marketTierForCity(city: string, unionNote?: string): MarketTier {
  const c = city.trim().toLowerCase();
  let base: MarketTier;
  if (UNION_CITIES.includes(c)) base = TIER("union");
  else {
    // Fall back to the venue's own labour note when the city isn't on either list.
    const note = (unionNote ?? "").toLowerCase();
    if (MAJOR_CITIES.includes(c)) base = TIER("major");
    else if (note.includes("strict") || note.includes("full union") || note.includes("union hall")) base = TIER("union");
    else if (note.includes("union")) base = TIER("major");
    else base = TIER("standard");
  }
  const mult = cityCostIndex(city, base.id);
  return { ...base, mult };
}


const parseMoney = (v?: string) => (v ? Number(v.replace(/[^0-9.]/g, "")) : 0);

/** Round to the nearest $250 so bands read like prices, not calculator output. */
const roundBand = (n: number) => Math.round(n / 250) * 250;

export const fmtMoney = (n: number) => `$${n.toLocaleString("en-US")}`;

export type PriceBand = {
  slug: string;
  label: string;
  /** "10×10" */
  dim: string;
  rentFrom: number;
  buyFrom: number;
};

/** Rent/buy starting bands for a market, derived from BOOTH_SIZES + the market multiplier. */
export function priceBandsForTier(tier: MarketTier): PriceBand[] {
  return BOOTH_SIZES.filter((b) => b.category === "size" && b.starting)
    .map((b) => ({
      slug: b.slug,
      label: b.label,
      dim: b.label.replace(" Booths", ""),
      rentFrom: roundBand(parseMoney(b.starting) * tier.mult),
      buyFrom: roundBand(parseMoney(b.purchaseFrom ?? b.starting) * tier.mult),
    }))
    .sort((a, b) => a.rentFrom - b.rentFrom);
}

/** Venue/city-specific pricing FAQ so the band also lands in FAQPage schema. */
export function priceBandFaq(place: string, city: string, tier: MarketTier, prepositionInput?: "at" | "in") {
  // A city is a place you're "in"; a venue or show is one you're "at".
  const preposition = prepositionInput ?? (place.trim().toLowerCase() === city.trim().toLowerCase() ? "in" : "at");
  const bands = priceBandsForTier(tier);
  const twenty = bands.find((b) => b.dim.startsWith("20×20")) ?? bands[bands.length - 1];
  const ten = bands.find((b) => b.dim.startsWith("10×10")) ?? bands[0];
  return {
    q: `How much does a trade show booth cost ${preposition} ${place}?`,
    a: `${preposition === "in" ? "In" : "At"} ${place} a custom 10×10 rental starts around ${fmtMoney(ten.rentFrom)} and a 20×20 island starts around ${fmtMoney(
      twenty.rentFrom,
    )}, including design, fabrication, graphics, delivery and install and dismantle labour. Buying the same design outright starts around ${fmtMoney(
      twenty.buyFrom,
    )} at 20×20. Those bands reflect ${city} as a ${tier.label.toLowerCase()} (${tier.note}); the final number depends on finish level, AV, hanging structure and how much of the space is enclosed.`,
  };
}

/* ------------------------------------------------------------------ */
/* Landed cost: booth + show-floor services                            */
/* ------------------------------------------------------------------ */

/** Square footage from a band label like "10×20". */
export function sqftForDim(dim: string): number {
  const [w, d] = dim.replace(/[^0-9×x]/g, "").split(/[×x]/).map(Number);
  return w && d ? w * d : 0;
}

/**
 * Show-floor services an exhibitor pays the general contractor — drayage,
 * electrical, rigging, cleaning, floor labour. Same $/sqft band the booth cost
 * calculator uses, shaded by the local market tier.
 */
export function serviceRangeForDim(dim: string, tier: MarketTier) {
  const sqft = sqftForDim(dim);
  return {
    sqft,
    low: roundBand(sqft * 26 * tier.mult),
    high: roundBand(sqft * 52 * tier.mult),
  };
}

/** FAQ covering the "real" landed budget, for FAQPage schema. */
export function landedCostFaq(place: string, city: string, tier: MarketTier, prepositionInput?: "at" | "in") {
  const preposition = prepositionInput ?? (place.trim().toLowerCase() === city.trim().toLowerCase() ? "in" : "at");
  const bands = priceBandsForTier(tier);
  const ten = bands.find((b) => b.dim.startsWith("10×10")) ?? bands[0];
  const svc = serviceRangeForDim("10×10", tier);
  return {
    q: `What is the total cost of exhibiting ${preposition} ${place}, including show services?`,
    a: `Budget the booth and the show floor separately. ${preposition === "in" ? "In" : "At"} ${place} a 10×10 custom rental starts around ${fmtMoney(
      ten.rentFrom,
    )} with design, fabrication, graphics, freight and install and dismantle included. On top of that, the general contractor bills drayage, electrical, rigging, cleaning and floor labour — typically ${fmtMoney(
      svc.low,
    )} to ${fmtMoney(svc.high)} for that footprint in ${city} as a ${tier.label.toLowerCase()}. Doubling the footprint roughly doubles the services line, and missed advance deadlines are the most common reason it lands high.`,
  };
}
