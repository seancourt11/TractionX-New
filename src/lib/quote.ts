/**
 * Quote construction — turns a scoped deal into itemized, comparable options.
 *
 * The numbers all come from `src/lib/estimator.ts` so the quote a client sees
 * is arithmetically the same model as the public calculator, plus the scoping
 * answers priced as their own lines.
 */

import type { Deal, DealScope } from "./deal";
import {
  ADDONS,
  CITY_TIER,
  FINISH,
  FOOTPRINTS,
  addonCost,
  calculate,
  isAddonAvailable,
  money,
} from "./estimator";

export type QuoteLine = {
  id: string;
  label: string;
  note?: string;
  amount: number;
};

export type QuoteOption = {
  id: string;
  label: string;
  note: string;
  /** Recommended = the finish level the client configured. */
  recommended: boolean;
  lines: QuoteLine[];
  subtotal: number;
  /** Venue-billed services, shown but excluded from our subtotal. */
  servicesLow: number;
  servicesHigh: number;
};

/* -------------------------------------------------------------------------- */
/* Scope pricing                                                               */
/* -------------------------------------------------------------------------- */

/** Sub-linear scale so scope items don't double when the booth does. */
function scopeScale(sqft: number): number {
  return Math.round((0.6 + (sqft / 200) * 0.4) * 100) / 100;
}

type ScopeRule = { match: string; label: string; note?: string; base: number };

const SCOPE_RULES: Partial<Record<keyof DealScope, ScopeRule[]>> = {
  position: [
    { match: "corner", label: "Corner build — two open sides", note: "Double-sided finishing and sightlines", base: 1200 },
    { match: "peninsula", label: "Peninsula build — three open sides", note: "Three finished elevations", base: 2600 },
    { match: "island", label: "Island build — four open sides", note: "360° finishing, centre structure", base: 4200 },
  ],
  ceiling: [
    { match: "20ft", label: "Tall structure allowance (16–20 ft)", note: "Engineered uprights and taller graphics", base: 3200 },
    { match: "rigging", label: "Rigged overhead structure", note: "Hanging sign, rigging plot and engineering letter", base: 4500 },
  ],
  graphics: [
    { match: "full", label: "Full graphic wrap", note: "Every visible surface printed", base: 3400 },
    { match: "backlit", label: "Backlit fabric graphics", note: "SEG lightboxes with tensioned prints", base: 5200 },
  ],
  av: [
    { match: "screens", label: "Screen package", note: "Monitors, mounts, media players and cabling", base: 2400 },
    { match: "video-wall", label: "Video wall", note: "LED tiles, processor and on-site tech", base: 12500 },
    { match: "interactive", label: "Interactive / touch demo stations", note: "Touch displays, kiosks and lead capture", base: 4600 },
  ],
  furniture: [
    { match: "essential", label: "Essential furniture package", note: "Stools, counters and waste units", base: 1100 },
    { match: "lounge", label: "Lounge furniture package", note: "Soft seating, occasional tables, rugs", base: 2600 },
    { match: "hospitality", label: "Hospitality package", note: "Bar, back bar, fridge and glassware storage", base: 3800 },
  ],
  storage: [
    { match: "closet", label: "Lockable storage closet", note: "Locking door, shelving and coat rail", base: 1400 },
    { match: "room", label: "Enclosed meeting room", note: "Private walls, door and lighting", base: 3900 },
  ],
  flooring: [
    { match: "carpet", label: "Upgraded padded carpet", base: 900 },
    { match: "vinyl", label: "Printed vinyl or plank flooring", base: 1900 },
    { match: "raised", label: "Raised custom flooring deck", note: "Cable management under floor", base: 3200 },
  ],
};

/** Line items generated purely from the scoping answers. */
export function scopeLines(scope: DealScope, sqft: number): QuoteLine[] {
  const scale = scopeScale(sqft);
  const out: QuoteLine[] = [];
  (Object.keys(SCOPE_RULES) as (keyof DealScope)[]).forEach((field) => {
    const value = String(scope[field] ?? "");
    if (!value) return;
    const rule = SCOPE_RULES[field]?.find((r) => value.includes(r.match));
    if (!rule) return;
    out.push({
      id: `scope-${field}`,
      label: rule.label,
      ...(rule.note ? { note: rule.note } : {}),
      amount: Math.round((rule.base * scale) / 50) * 50,
    });
  });
  return out;
}

/* -------------------------------------------------------------------------- */
/* Options                                                                     */
/* -------------------------------------------------------------------------- */

const OPTION_IDS = ["standard", "elevated", "premium"] as const;

export function buildOptions(deal: Deal): QuoteOption[] {
  const fp = FOOTPRINTS.find((f) => f.id === deal.config.footprint) ?? FOOTPRINTS[1];
  const scopeItems = scopeLines(deal.scope, fp.sqft);

  return OPTION_IDS.map((id) => {
    const finish = FINISH.find((f) => f.id === id) ?? FINISH[0];
    const config = { ...deal.config, finish: id };
    const calc = calculate(config);

    const addonTotal = deal.config.addons.reduce((sum, addonId) => {
      const a = ADDONS.find((x) => x.id === addonId);
      if (!a || !isAddonAvailable(a, fp.id, id)) return sum;
      return sum + addonCost(a, fp.id);
    }, 0);

    const base = Math.round(calc.boothLow - addonTotal);

    const lines: QuoteLine[] = [
      {
        id: "base",
        label: `${fp.label} ${deal.config.build === "rental" ? "custom rental exhibit" : "custom owned exhibit"} — ${finish.label} finish`,
        note: "Design, 3D concept, fabrication, custom graphics, project management, install and dismantle labour",
        amount: base,
      },
      ...deal.config.addons
        .map((addonId) => ADDONS.find((x) => x.id === addonId))
        .filter((a): a is (typeof ADDONS)[number] => !!a && isAddonAvailable(a, fp.id, id))
        .map((a) => ({ id: `addon-${a.id}`, label: a.label, amount: addonCost(a, fp.id) })),
      ...scopeItems,
    ];

    const subtotal = lines.reduce((s, l) => s + l.amount, 0);

    return {
      id,
      label: finish.label,
      note: finish.note,
      recommended: deal.config.finish === id,
      lines,
      subtotal,
      servicesLow: Math.round(calc.servicesLow),
      servicesHigh: Math.round(calc.servicesHigh),
    };
  });
}

export function optionById(deal: Deal, id: string | undefined): QuoteOption | undefined {
  if (!id) return undefined;
  return buildOptions(deal).find((o) => o.id === id);
}

/** What's always included, and what the venue bills separately. */
export const QUOTE_INCLUSIONS = [
  "Design development and a photoreal 3D concept before you commit",
  "Fabrication of all structure, millwork and printed graphics",
  "Install and dismantle labour — always included in our number",
  "A dedicated project manager from kickoff to teardown",
  "Round-trip freight from our facility to the venue dock",
  "On-site supervision for the duration of the build and teardown",
];

export const QUOTE_EXCLUSIONS = [
  "Material handling / drayage — billed by the venue's official contractor",
  "Electrical, plumbing, internet and rigging labour ordered through the venue",
  "Booth space rental paid directly to show management",
  "Client-side travel, accommodation, catering and staffing",
  "Post-show storage (quoted separately for owned builds)",
];

/** Validity window printed on the quote. */
export function validUntil(deal: Deal, days = 30): string {
  const from = Date.parse(deal.createdAt) || Date.now();
  return new Date(from + days * 86_400_000).toISOString().slice(0, 10);
}

export function quoteRange(option: QuoteOption): string {
  return `${money(option.subtotal)} – ${money(Math.round(option.subtotal * 1.12))}`;
}

/** City-tier label, for printing context on the quote. */
export function cityTierLabel(id: string): string {
  return (CITY_TIER.find((c) => c.id === id) ?? CITY_TIER[0]).label;
}
