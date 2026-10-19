/**
 * Per-design pricing for the rental catalog.
 *
 * Every rental design gets a starting rent range and a buy-from price derived
 * from its footprint (the same numbers the cost estimator uses) and adjusted by
 * the city cost index. Nothing here is hand-entered: cards, booth detail pages
 * and product schema all read from this one place so they can never disagree.
 */

import { FOOTPRINTS } from "@/lib/estimator";
import { cityCostIndex, marketTierForCity, fmtMoney } from "@/lib/market-tier";

/** Rent range width — the top of the band lands near our Elevated finish tier. */
const RANGE_TOP = 1.22;

/** Round to the nearest $250 so bands read like prices, not calculator output. */
const round = (n: number) => Math.round(n / 250) * 250;

type Base = { rental: number; custom: number };

/** Catalog footprints that have no direct estimator entry, derived by area. */
const DERIVED: Record<string, Base> = {
  "10x50": { rental: 29000, custom: 42000 },
  "20x50": { rental: 66000, custom: 95000 },
};

function baseFor(size: string): Base | null {
  const key = size.trim().toLowerCase();
  const fp = FOOTPRINTS.find((f) => f.id === key);
  if (fp) return { rental: fp.rental, custom: fp.custom };
  return DERIVED[key] ?? null;
}

export type BoothPrice = {
  /** True when we publish a number for this footprint. */
  priced: boolean;
  /** Low end of the rent band, in dollars. */
  rentLow: number;
  /** High end of the rent band, in dollars. */
  rentHigh: number;
  /** Starting purchase price, in dollars. */
  buyFrom: number;
  /** "$16,250 – $19,750" */
  rentRange: string;
  /** "$16,250" */
  rentFrom: string;
  /** "$22,000" */
  buyLabel: string;
  /** City the index was applied for, when one was supplied. */
  city?: string;
  /** 1.0 when no city, otherwise the applied cost index. */
  index: number;
};

/** Shown wherever a footprint is too bespoke to publish a starting number. */
export const PRICE_ON_REQUEST = "Priced on request";

/**
 * Starting rent/buy pricing for a catalog footprint, optionally shaded by the
 * visitor's show city. Returns `priced: false` for custom and oversized builds.
 */
export function boothPrice(size: string, city?: string): BoothPrice {
  const base = baseFor(size);
  const index = city ? cityCostIndex(city, marketTierForCity(city).id) : 1;
  if (!base) {
    return {
      priced: false,
      rentLow: 0,
      rentHigh: 0,
      buyFrom: 0,
      rentRange: PRICE_ON_REQUEST,
      rentFrom: PRICE_ON_REQUEST,
      buyLabel: PRICE_ON_REQUEST,
      city,
      index,
    };
  }
  const rentLow = round(base.rental * index);
  const rentHigh = round(base.rental * index * RANGE_TOP);
  const buyFrom = round(base.custom * index);
  return {
    priced: true,
    rentLow,
    rentHigh,
    buyFrom,
    rentRange: `${fmtMoney(rentLow)} – ${fmtMoney(rentHigh)}`,
    rentFrom: fmtMoney(rentLow),
    buyLabel: fmtMoney(buyFrom),
    city,
    index,
  };
}

/** One-line summary used on cards and in meta descriptions. */
export function boothPriceSummary(size: string, city?: string): string {
  const p = boothPrice(size, city);
  if (!p.priced) return PRICE_ON_REQUEST;
  return `Rent ${p.rentRange} · Buy from ${p.buyLabel}`;
}
