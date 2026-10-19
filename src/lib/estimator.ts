/**
 * Cost estimator model — pricing data, calculation and share-link encoding.
 *
 * Lives outside the component so the PDF generator and the shareable-link
 * decoder work from exactly the same numbers the UI renders.
 */

export type Footprint = {
  id: string;
  label: string;
  rental: number;
  custom: number;
  sqft: number;
};

export const FOOTPRINTS: Footprint[] = [
  { id: "10x10", label: "10×10", rental: 12500, custom: 18000, sqft: 100 },
  { id: "10x20", label: "10×20", rental: 17500, custom: 25000, sqft: 200 },
  { id: "10x30", label: "10×30", rental: 21000, custom: 30000, sqft: 300 },
  { id: "10x40", label: "10×40", rental: 25000, custom: 36000, sqft: 400 },
  { id: "20x20", label: "20×20 island", rental: 30000, custom: 43000, sqft: 400 },
  { id: "20x30", label: "20×30 island", rental: 42000, custom: 60000, sqft: 600 },
  { id: "20x40", label: "20×40 island", rental: 54000, custom: 78000, sqft: 800 },
  { id: "30x30", label: "30×30+ island", rental: 62000, custom: 90000, sqft: 900 },
  { id: "activation", label: "Large activation", rental: 78000, custom: 112000, sqft: 1000 },
];

export const BUILDS = [
  { id: "rental", label: "Custom rental", note: "Built to your brand, recovered after the show" },
  { id: "custom", label: "Custom build (owned)", note: "You keep the asset; storage extra" },
] as const;

export type BuildId = (typeof BUILDS)[number]["id"];

export const FINISH = [
  { id: "standard", label: "Standard", mult: 1, note: "100% custom layout, custom graphics and turn key service" },
  { id: "elevated", label: "Elevated", mult: 1.22, note: "Backlit walls, dimensional logos and Selected Elements" },
  { id: "premium", label: "Premium", mult: 1.5, note: "Completely custom selection of materials and elevated AV" },
  {
    id: "architect",
    label: "Architect",
    mult: 1.95,
    note: "Top designer or architect approval, bespoke materials and white-glove service",
  },
];

// Add-on costs are quoted at the 10x20 (200 sq ft) baseline and scaled by footprint.
// Scaling is sub-linear: add-ons carry fixed setup cost that doesn't double when the booth does.
type AddonScale = Record<string, number>;

const AREA_SCALE: AddonScale = {
  "10x10": 0.6,
  "10x20": 1,
  "10x30": 1.3,
  "10x40": 1.6,
  "20x20": 1.7,
  "20x30": 2.3,
  "20x40": 2.7,
  "30x30": 3,
  activation: 3.4,
};
const FIXTURE_SCALE: AddonScale = {
  "10x10": 0.75,
  "10x20": 1,
  "10x30": 1.15,
  "10x40": 1.3,
  "20x20": 1.4,
  "20x30": 1.7,
  "20x40": 1.9,
  "30x30": 2,
  activation: 2.3,
};

export type Addon = {
  id: string;
  label: string;
  cost: number;
  scale: AddonScale;
  minSqft?: number;
  minFinish?: string;
};

export const ADDONS: Addon[] = [
  { id: "av", label: "AV package (monitors, playback + audio)", cost: 1900, scale: AREA_SCALE },
  {
    id: "led-wall",
    label: "LED wall + processor",
    cost: 12000,
    scale: AREA_SCALE,
    minFinish: "premium",
  },
  { id: "rigging", label: "Hanging sign / rigged truss", cost: 3500, scale: AREA_SCALE, minSqft: 200 },
  { id: "meeting", label: "Enclosed meeting room", cost: 3500, scale: AREA_SCALE },
  { id: "storage", label: "Storage closet + lockable cabinets", cost: 1200, scale: FIXTURE_SCALE },
  { id: "demo", label: "Demo stations + lead capture", cost: 2000, scale: AREA_SCALE },
  { id: "flooring", label: "Raised custom flooring", cost: 1800, scale: AREA_SCALE },
  { id: "hospitality", label: "Hospitality / bar counter", cost: 2300, scale: FIXTURE_SCALE },
];

export function isAddonAvailable(addon: Addon, footprintId: string, finishId: string): boolean {
  const fp = FOOTPRINTS.find((f) => f.id === footprintId);
  const selectedFinish = FINISH.findIndex((f) => f.id === finishId);
  const minimumFinish = addon.minFinish ? FINISH.findIndex((f) => f.id === addon.minFinish) : -1;
  return Boolean(fp) && (!addon.minSqft || (fp?.sqft ?? 0) >= addon.minSqft) && selectedFinish >= minimumFinish;
}

export const addonCost = (addon: Addon, footprintId: string) =>
  Math.round((addon.cost * (addon.scale[footprintId] ?? 1)) / 50) * 50;

export const CITY_TIER = [
  { id: "standard", label: "Standard market", mult: 1, note: "Most regional and mid-tier venues" },
  { id: "major", label: "Major market", mult: 1.12, note: "Toronto, Orlando, Atlanta, Vancouver" },
  { id: "union", label: "Strict union city", mult: 1.28, note: "Chicago, NYC, San Francisco, Las Vegas" },
];

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* -------------------------------------------------------------------------- */
/* Configuration + calculation                                                 */
/* -------------------------------------------------------------------------- */

export type EstimatorConfig = {
  footprint: string;
  build: BuildId;
  finish: string;
  city: string;
  addons: string[];
  shows: number;
};

export const DEFAULT_CONFIG: EstimatorConfig = {
  footprint: "10x20",
  build: "rental",
  finish: "standard",
  city: "standard",
  addons: [],
  shows: 1,
};

export type EstimatorCalc = {
  boothLow: number;
  boothHigh: number;
  servicesLow: number;
  servicesHigh: number;
  perShowLow: number;
  perShowHigh: number;
  annualLow: number;
  annualHigh: number;
  sqft: number;
};

export function calculate(config: EstimatorConfig): EstimatorCalc {
  const fp = FOOTPRINTS.find((f) => f.id === config.footprint) ?? FOOTPRINTS[1];
  const fin = FINISH.find((f) => f.id === config.finish) ?? FINISH[0];
  const ct = CITY_TIER.find((c) => c.id === config.city) ?? CITY_TIER[0];

  const base = (config.build === "rental" ? fp.rental : fp.custom) * fin.mult;
  const addonTotal = config.addons.reduce((sum, id) => {
    const a = ADDONS.find((x) => x.id === id);
    if (!a || !isAddonAvailable(a, fp.id, config.finish)) return sum;
    return sum + addonCost(a, fp.id);
  }, 0);

  const boothLow = base + addonTotal;
  const boothHigh = boothLow * 1.38;

  // Show services scale with footprint and city tier, not finish.
  const servicesLow = fp.sqft * 26 * ct.mult;
  const servicesHigh = fp.sqft * 52 * ct.mult;

  const perShowLow = boothLow + servicesLow;
  const perShowHigh = boothHigh + servicesHigh;

  // Owned builds amortise the structure across shows; services repeat.
  const shows = config.shows;
  const annualLow =
    config.build === "rental"
      ? perShowLow * shows
      : boothLow + servicesLow * shows + (shows - 1) * boothLow * 0.14;
  const annualHigh =
    config.build === "rental"
      ? perShowHigh * shows
      : boothHigh + servicesHigh * shows + (shows - 1) * boothHigh * 0.2;

  return {
    boothLow,
    boothHigh,
    servicesLow,
    servicesHigh,
    perShowLow,
    perShowHigh,
    annualLow,
    annualHigh,
    sqft: fp.sqft,
  };
}

/** Add-ons valid for the configured footprint and finish level. */
export function selectedAddonsFor(config: EstimatorConfig): Addon[] {
  return config.addons
    .map((id) => ADDONS.find((x) => x.id === id))
    .filter((a): a is Addon => {
      if (!a) return false;
      return isAddonAvailable(a, config.footprint, config.finish);
    });
}

/** Human-readable labels for a configuration. */
export function describeConfig(config: EstimatorConfig) {
  const fp = FOOTPRINTS.find((f) => f.id === config.footprint) ?? FOOTPRINTS[1];
  const build = BUILDS.find((b) => b.id === config.build) ?? BUILDS[0];
  const finish = FINISH.find((f) => f.id === config.finish) ?? FINISH[0];
  const city = CITY_TIER.find((c) => c.id === config.city) ?? CITY_TIER[0];
  return {
    footprint: fp.label,
    sqft: fp.sqft,
    build: build.label,
    finish: finish.label,
    city: city.label,
    shows: config.shows,
    addons: selectedAddonsFor(config).map((a) => ({
      label: a.label,
      cost: addonCost(a, fp.id),
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* Share-link encoding                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Compact, human-scannable encoding so shared URLs stay tidy:
 *   ?e=10x20.rental.standard.union.av-meeting.3
 */

export const SHARE_PARAM = "e";

export function encodeConfig(config: EstimatorConfig): string {
  return [
    config.footprint,
    config.build,
    config.finish,
    config.city,
    config.addons.length ? [...config.addons].sort().join("-") : "none",
    String(config.shows),
  ].join(".");
}

export function decodeConfig(raw: string | null | undefined): EstimatorConfig | null {
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 6) return null;

  const [footprint, build, finish, city, addonsRaw, showsRaw] = parts;

  if (!FOOTPRINTS.some((f) => f.id === footprint)) return null;
  if (build !== "rental" && build !== "custom") return null;
  if (!FINISH.some((f) => f.id === finish)) return null;
  if (!CITY_TIER.some((c) => c.id === city)) return null;

  const addons =
    addonsRaw === "none"
      ? []
      : addonsRaw.split("-").filter((id) => ADDONS.some((a) => a.id === id));

  const shows = Number(showsRaw);
  if (!Number.isFinite(shows) || shows < 1 || shows > 8) return null;

  return { footprint, build, finish, city, addons, shows: Math.round(shows) };
}

/** Absolute, shareable URL for a configuration. */
export function shareUrlFor(config: EstimatorConfig): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set(SHARE_PARAM, encodeConfig(config));
  url.hash = "estimator";
  return url.toString();
}

/* -------------------------------------------------------------------------- */
/* Plain-text summary (clipboard)                                              */
/* -------------------------------------------------------------------------- */

export const ESTIMATE_NOTE =
  "Approximate, non-binding estimate for budgeting only — not a final quote. Final pricing depends on final design, graphics, AV, show services, freight and drayage (billed by the venue), and is confirmed in writing by a Traction X designer.";

export function summaryText(config: EstimatorConfig, link?: string): string {
  const d = describeConfig(config);
  const c = calculate(config);

  const lines = [
    "TRADE SHOW BOOTH ESTIMATE — Traction X",
    "",
    `Footprint:      ${d.footprint} (${d.sqft} sq ft)`,
    `Type:           ${d.build}`,
    `Finish level:   ${d.finish}`,
    `Show city:      ${d.city}`,
    `Shows per year: ${d.shows}`,
    "",
    "ADD-ONS",
    ...(d.addons.length
      ? d.addons.map((a) => `  • ${a.label} — +${money(a.cost)}`)
      : ["  (none selected)"]),
    "",
    "COST BREAKDOWN (per show)",
    `  Booth:            ${money(c.boothLow)} – ${money(c.boothHigh)}`,
    `  Show services:    ${money(c.servicesLow)} – ${money(c.servicesHigh)}`,
    "    (drayage, electrical, rigging — billed by the venue's contractor)",
    `  ALL-IN PER SHOW:  ${money(c.perShowLow)} – ${money(c.perShowHigh)}`,
  ];

  if (config.shows > 1) {
    lines.push(
      "",
      `ANNUAL PROGRAMME (${config.shows} shows)`,
      `  ${money(c.annualLow)} – ${money(c.annualHigh)}`,
    );
  }

  if (link) lines.push("", `Revisit or edit this estimate: ${link}`);

  lines.push(
    "",
    "Traction X · 1-782-409-2527 · info@tractionx.ca",
    "Complimentary 3D design available — see your booth before you spend a dollar.",
    "",
    ESTIMATE_NOTE,
  );

  return lines.join("\n");
}
