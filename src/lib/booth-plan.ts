/* ==========================================================================
 *  BUILD YOUR BOOTH PLAN — exhibit needs analyzer engine
 * ==========================================================================
 *
 *  Pure model: the question graph, branching rules, scoring, booth profile,
 *  recommendation copy and the mapping into the existing cost estimator.
 *  No UI, no side effects — so the planner screen, the PDF and the lead
 *  payload all read exactly the same numbers as /booth-cost-calculator.
 * ========================================================================== */

import {
  ADDONS,
  FINISH,
  FOOTPRINTS,
  calculate,
  money,
  type EstimatorConfig,
} from "@/lib/estimator";
import { cityTierFor } from "@/lib/lead-prefill";

export type Option = { value: string; label: string; note?: string };

/* -------------------------------------------------------------------------- */
/* Question data                                                               */
/* -------------------------------------------------------------------------- */

/** Booth space. `fp` is the matching cost-estimator footprint id. */
export const PLAN_SPACES: (Option & { fp: string; islandish: boolean; score: number })[] = [
  { value: "10x10", label: "10×10", note: "100 sq ft · 3×3 m", fp: "10x10", islandish: false, score: 5 },
  { value: "10x20", label: "10×20", note: "200 sq ft · 3×6 m", fp: "10x20", islandish: false, score: 10 },
  { value: "20x20", label: "20×20", note: "400 sq ft · 6×6 m", fp: "20x20", islandish: true, score: 20 },
  { value: "20x30", label: "20×30", note: "600 sq ft · 6×9 m", fp: "20x30", islandish: true, score: 25 },
  { value: "20x40", label: "20×40", note: "800 sq ft · 6×12 m", fp: "20x40", islandish: true, score: 30 },
  { value: "20x50", label: "20×50 or larger", note: "1,000+ sq ft", fp: "30x30", islandish: true, score: 30 },
  { value: "island", label: "Island booth", note: "Open on all four sides", fp: "20x20", islandish: true, score: 22 },
  { value: "pavilion", label: "Pavilion / multiple exhibitors", note: "Shared or partner program", fp: "activation", islandish: true, score: 30 },
  { value: "unsure", label: "Not sure yet", note: "We'll help you size it", fp: "10x20", islandish: false, score: 5 },
];

/** The allocation question — asked early because it steers everything after. */
export const PLAN_PRIORITIES: Option[] = [
  { value: "impact", label: "Make the biggest visual impact possible", note: "Height, lighting and large-format brand presence" },
  { value: "features", label: "Get the most booth features within our budget", note: "Maximum function per dollar" },
  { value: "brand", label: "Create a highly custom branded experience", note: "Architecture designed around the brand" },
  { value: "reuse", label: "Create something reusable across multiple shows", note: "Reconfigurable across footprints" },
  { value: "simple", label: "Keep transport and setup extremely simple", note: "Your team handles it" },
  { value: "balance", label: "Balance all of the above", note: "The usual answer — and a good one" },
];

export const PLAN_PATHS: (Option & { blurb: string[] })[] = [
  {
    value: "portable",
    label: "Portable & self-managed",
    note: "Our team transports, sets up and manages it",
    blurb: ["Packs into cases", "Fits a vehicle — some kits fly as checked luggage", "Quick setup, reusable, minimal show labour"],
  },
  {
    value: "modular",
    label: "Modular / custom exhibit",
    note: "More presence, professional delivery and show support",
    blurb: ["Modular or fully custom architecture", "Lighting, screens, counters, storage, meeting space", "Professional install with turnkey show management available"],
  },
];

export const PLAN_TRAVEL: Option[] = [
  { value: "car", label: "Car / SUV" },
  { value: "van", label: "Cargo van" },
  { value: "air", label: "Checked airline luggage" },
  { value: "freight", label: "Freight shipment" },
  { value: "mixed", label: "A combination, show to show" },
];

export const PLAN_PORTABLE_SIZE: Option[] = [
  { value: "10x10", label: "10×10" },
  { value: "10x20", label: "10×20" },
  { value: "both", label: "Both" },
  { value: "unsure", label: "Not sure" },
];

export const PLAN_PORTABLE_NEEDS: Option[] = [
  { value: "backwall", label: "Branded back wall" },
  { value: "returns", label: "Side walls / returns" },
  { value: "monitor", label: "TV or monitor" },
  { value: "counter", label: "Reception counter" },
  { value: "product", label: "Product display" },
  { value: "lighting", label: "Lighting" },
  { value: "shelving", label: "Shelving" },
  { value: "ipad", label: "iPad / interactive" },
  { value: "meeting", label: "Small meeting area" },
  { value: "storage", label: "Storage" },
  { value: "flooring", label: "Flooring" },
  { value: "cases", label: "Carrying / shipping cases" },
];

/**
 * Impact tiers, named to match the cost estimator's finish levels so the
 * planner can never contradict the pricing pages.
 */
export const PLAN_TIERS: (Option & { finish: string; headline: string; includes: string[] })[] = [
  {
    value: "standard",
    label: "Clean & professional",
    finish: "standard",
    headline: "Standard",
    note: "A strong branded presence without a long list of custom elements.",
    includes: ["Back wall + side returns", "Brand graphics", "Reception counter", "Booth lighting", "Monitor"],
  },
  {
    value: "elevated",
    label: "Elevated",
    finish: "elevated",
    headline: "Elevated",
    note: "More architectural presence and better visitor engagement.",
    includes: ["Larger screens", "Custom reception counter", "Arches or feature walls", "Product displays + shelving", "Branded flooring"],
  },
  {
    value: "premium",
    label: "High impact",
    finish: "premium",
    headline: "Premium",
    note: "The booth should read clearly above the exhibitors around it.",
    includes: ["Tall structures", "Large-format + backlit graphics", "LED / video", "Meeting space and storage", "Custom millwork and lighting"],
  },
  {
    value: "architect",
    label: "Flagship / fully custom",
    finish: "architect",
    headline: "Architect",
    note: "The exhibit is a major extension of the brand.",
    includes: ["Fully custom architecture", "Large LED installations", "Hospitality + private meeting rooms", "Multiple demo zones", "Double decks and hanging structures"],
  },
];

export const PLAN_GOALS: Option[] = [
  { value: "leads", label: "Generate leads" },
  { value: "meetings", label: "Hold meetings" },
  { value: "demo", label: "Demonstrate products" },
  { value: "display", label: "Display physical products" },
  { value: "video", label: "Play video / presentations" },
  { value: "customers", label: "Host existing customers" },
  { value: "launch", label: "Launch a new product" },
  { value: "awareness", label: "Create brand awareness" },
  { value: "hospitality", label: "Entertain / hospitality" },
  { value: "presentations", label: "Give presentations" },
  { value: "capture", label: "Collect visitor information" },
  { value: "workstations", label: "Provide workstations" },
  { value: "private", label: "Provide private discussions" },
  { value: "storage", label: "Provide storage" },
  { value: "multi", label: "Support multiple divisions or partners" },
];

export type SliderId = "architecture" | "technology" | "hospitality" | "product" | "functionality";

export const PLAN_SLIDERS: { id: SliderId; label: string; low: string; high: string }[] = [
  { id: "architecture", label: "Architecture / visual impact", low: "Simple", high: "Statement" },
  { id: "technology", label: "Technology / AV", low: "None", high: "LED wall" },
  { id: "hospitality", label: "Meeting / hospitality", low: "Open floor", high: "Private rooms" },
  { id: "product", label: "Product displays", low: "Few", high: "Many" },
  { id: "functionality", label: "Storage / functionality", low: "Minimal", high: "Heavy" },
];

/** Component groups. `addon` maps into the estimator's add-on list. */
export const PLAN_COMPONENTS: {
  group: string;
  items: (Option & { addon?: string })[];
}[] = [
  {
    group: "Structure",
    items: [
      { value: "backwall", label: "Back wall" },
      { value: "sidewalls", label: "Side walls" },
      { value: "tower", label: "Tall branding tower" },
      { value: "arch", label: "Arch" },
      { value: "overhead", label: "Overhead structure" },
      { value: "hanging-sign", label: "Hanging sign", addon: "rigging" },
      { value: "enclosed", label: "Enclosed room", addon: "meeting" },
      { value: "storage-room", label: "Storage room", addon: "storage" },
      { value: "meeting-room", label: "Private meeting room", addon: "meeting" },
      { value: "double-deck", label: "Double deck" },
    ],
  },
  {
    group: "Technology",
    items: [
      { value: "tv", label: "TV", addon: "av" },
      { value: "multi-tv", label: "Multiple TVs", addon: "av" },
      { value: "led-wall", label: "Large LED wall", addon: "led-wall" },
      { value: "touchscreen", label: "Touchscreen", addon: "demo" },
      { value: "interactive", label: "Interactive display", addon: "demo" },
      { value: "ipad", label: "iPad stand", addon: "demo" },
      { value: "demo-tech", label: "Product demo technology", addon: "demo" },
    ],
  },
  {
    group: "Furniture",
    items: [
      { value: "reception", label: "Reception counter" },
      { value: "bar", label: "Bar counter", addon: "hospitality" },
      { value: "meeting-table", label: "Meeting table" },
      { value: "lounge", label: "Lounge furniture" },
      { value: "stools", label: "Stools" },
      { value: "workstations", label: "Workstations" },
    ],
  },
  {
    group: "Display",
    items: [
      { value: "shelving", label: "Shelving" },
      { value: "product-display", label: "Product displays" },
      { value: "cases", label: "Display cases" },
      { value: "mounting", label: "Product mounting" },
      { value: "literature", label: "Literature" },
      { value: "samples", label: "Samples" },
    ],
  },
  {
    group: "Lighting",
    items: [
      { value: "basic-light", label: "Basic booth lighting" },
      { value: "accent-light", label: "Accent lighting" },
      { value: "led-light", label: "LED lighting" },
      { value: "backlit", label: "Backlit graphics" },
      { value: "architectural-light", label: "Integrated architectural lighting" },
    ],
  },
  {
    group: "Flooring",
    items: [
      { value: "carpet", label: "Carpet" },
      { value: "vinyl", label: "Vinyl" },
      { value: "wood", label: "Wood-look floor" },
      { value: "raised", label: "Raised floor", addon: "flooring" },
      { value: "custom-floor", label: "Custom flooring", addon: "flooring" },
    ],
  },
];

export const PLAN_FREQUENCY: (Option & { shows: number })[] = [
  { value: "one", label: "One event only", shows: 1 },
  { value: "few", label: "A few events", shows: 2 },
  { value: "several", label: "Several events each year", shows: 4 },
  { value: "national", label: "National trade show program", shows: 6 },
  { value: "international", label: "International show program", shows: 8 },
  { value: "unsure", label: "Not sure", shows: 1 },
];

export const PLAN_OWNERSHIP: Option[] = [
  { value: "rent", label: "Rent" },
  { value: "buy", label: "Purchase" },
  { value: "compare", label: "Compare rental vs purchase" },
  { value: "unsure", label: "Not sure" },
];

export const PLAN_SERVICE: (Option & { score: number })[] = [
  { value: "exhibit", label: "Exhibit only", note: "We design and manufacture it; your team handles the event.", score: 5 },
  { value: "logistics", label: "Exhibit + logistics", note: "Exhibit, packing, shipping and show delivery coordination.", score: 10 },
  { value: "turnkey", label: "Full turnkey", note: "Design, build, graphics, AV, furniture, freight, I&D, on-site PM and storage between shows.", score: 20 },
];

export const PLAN_TIMELINE: (Option & { score: number })[] = [
  { value: "lt4", label: "Less than 4 weeks", score: 20 },
  { value: "4-8", label: "4–8 weeks", score: 20 },
  { value: "8-12", label: "8–12 weeks", score: 15 },
  { value: "3-6m", label: "3–6 months", score: 10 },
  { value: "6m+", label: "More than 6 months", score: 5 },
];

export const PLAN_STAGE: (Option & { score: number })[] = [
  { value: "research", label: "Just researching", score: 2 },
  { value: "budget", label: "Establishing a budget", score: 5 },
  { value: "comparing", label: "Comparing exhibit companies", score: 10 },
  { value: "have-design", label: "We have an existing design", score: 10 },
  { value: "need-concepts", label: "We need design concepts", score: 10 },
  { value: "need-proposal", label: "We need a proposal", score: 15 },
  { value: "urgent", label: "We need to move quickly", score: 20 },
  { value: "booked", label: "We've already booked the booth space", score: 25 },
];

export const PLAN_BUDGET: (Option & { score: number; mid: number })[] = [
  { value: "lt10", label: "Under $10,000", score: 0, mid: 8000 },
  { value: "10-20", label: "$10,000 – $20,000", score: 5, mid: 15000 },
  { value: "20-35", label: "$20,000 – $35,000", score: 10, mid: 27500 },
  { value: "35-50", label: "$35,000 – $50,000", score: 15, mid: 42500 },
  { value: "50-75", label: "$50,000 – $75,000", score: 20, mid: 62500 },
  { value: "75-125", label: "$75,000 – $125,000", score: 25, mid: 100000 },
  { value: "125-200", label: "$125,000 – $200,000", score: 30, mid: 162500 },
  { value: "200+", label: "$200,000+", score: 30, mid: 250000 },
  { value: "unsure", label: "Not sure yet", score: 5, mid: 0 },
];

export const PLAN_EXISTING: Option[] = [
  { value: "no", label: "No" },
  { value: "replace", label: "Yes — we want to replace it" },
  { value: "modify", label: "Yes — we want to modify it" },
  { value: "manage", label: "Yes — we need help managing it" },
];

/* -------------------------------------------------------------------------- */
/* Answers                                                                     */
/* -------------------------------------------------------------------------- */

export type PlanAnswers = {
  space: string;
  priority: string;
  path: string;
  travel: string;
  portableSize: string;
  portableNeeds: string[];
  tier: string;
  goals: string[];
  sliders: Record<SliderId, number>;
  components: string[];
  frequency: string;
  ownership: string;
  service: string;
  show: string;
  city: string;
  citySlug: string;
  showDate: string;
  boothNumber: string;
  timeline: string;
  stage: string;
  budget: string;
  existing: string;
  notes: string;
};

export const EMPTY_ANSWERS: PlanAnswers = {
  space: "",
  priority: "",
  path: "",
  travel: "",
  portableSize: "",
  portableNeeds: [],
  tier: "",
  goals: [],
  sliders: { architecture: 2, technology: 2, hospitality: 1, product: 2, functionality: 1 },
  components: [],
  frequency: "",
  ownership: "",
  service: "",
  show: "",
  city: "",
  citySlug: "",
  showDate: "",
  boothNumber: "",
  timeline: "",
  stage: "",
  budget: "",
  existing: "",
  notes: "",
};

/* -------------------------------------------------------------------------- */
/* Branching                                                                   */
/* -------------------------------------------------------------------------- */

export type StepId =
  | "space"
  | "priority"
  | "path"
  | "portable"
  | "tier"
  | "goals"
  | "sliders"
  | "components"
  | "program"
  | "event"
  | "budget";

const STEP_TITLE: Record<StepId, string> = {
  space: "What size is your exhibit space?",
  priority: "What matters most for this exhibit?",
  path: "How do you want to manage the booth?",
  portable: "Tell us how you'll use it",
  tier: "What level of impact are you trying to create?",
  goals: "What needs to happen inside the booth?",
  sliders: "Where should the investment go?",
  components: "What would you like included?",
  program: "How will you use it, and how much should we handle?",
  event: "Tell us about the event",
  budget: "What investment range are you considering?",
};

export const stepTitle = (id: StepId) => STEP_TITLE[id];

/** Islands and anything 20×20 or larger skip the portable question entirely. */
export function forcesModular(space: string): boolean {
  const s = PLAN_SPACES.find((x) => x.value === space);
  return Boolean(s?.islandish);
}

export function stepsFor(a: PlanAnswers): StepId[] {
  const steps: StepId[] = ["space", "priority"];
  if (!forcesModular(a.space)) steps.push("path");
  const portable = a.path === "portable" && !forcesModular(a.space);
  if (portable) {
    steps.push("portable");
  } else {
    steps.push("tier", "goals", "sliders", "components");
  }
  steps.push("program", "event", "budget");
  return steps;
}

/** Effective path once the space has overridden it. */
export function pathOf(a: PlanAnswers): "portable" | "modular" {
  if (forcesModular(a.space)) return "modular";
  return a.path === "portable" ? "portable" : "modular";
}

export function isStepComplete(step: StepId, a: PlanAnswers): boolean {
  switch (step) {
    case "space":
      return !!a.space;
    case "priority":
      return !!a.priority;
    case "path":
      return !!a.path;
    case "portable":
      return !!a.travel && !!a.portableSize;
    case "tier":
      return !!a.tier;
    case "goals":
      return a.goals.length > 0;
    case "sliders":
      return true;
    case "components":
      return true;
    case "program":
      return !!a.frequency && !!a.ownership && !!a.service;
    case "event":
      return !!a.timeline && !!a.stage;
    case "budget":
      return !!a.budget;
  }
}

/* -------------------------------------------------------------------------- */
/* Pre-ticked components from tier + goals                                     */
/* -------------------------------------------------------------------------- */

const TIER_DEFAULTS: Record<string, string[]> = {
  standard: ["backwall", "sidewalls", "reception", "basic-light", "tv", "carpet", "literature"],
  elevated: ["backwall", "sidewalls", "reception", "accent-light", "multi-tv", "carpet", "shelving", "product-display", "arch", "stools"],
  premium: ["backwall", "tower", "reception", "backlit", "led-light", "multi-tv", "meeting-table", "storage-room", "product-display", "raised", "lounge"],
  architect: ["backwall", "tower", "overhead", "hanging-sign", "reception", "bar", "meeting-room", "storage-room", "led-wall", "architectural-light", "backlit", "lounge", "custom-floor", "product-display"],
};

const GOAL_COMPONENTS: Record<string, string[]> = {
  meetings: ["meeting-table", "lounge"],
  demo: ["demo-tech", "touchscreen"],
  display: ["product-display", "shelving"],
  video: ["multi-tv"],
  customers: ["lounge", "meeting-table"],
  launch: ["backlit", "tower"],
  hospitality: ["bar", "lounge"],
  presentations: ["multi-tv", "stools"],
  capture: ["ipad"],
  workstations: ["workstations", "stools"],
  private: ["meeting-room"],
  storage: ["storage-room"],
  multi: ["reception", "workstations"],
  leads: ["ipad"],
  awareness: ["tower", "backlit"],
};

/** Suggested component ids for the current tier + goals. */
export function suggestedComponents(a: PlanAnswers): string[] {
  const out = new Set(TIER_DEFAULTS[a.tier] ?? []);
  for (const g of a.goals) for (const c of GOAL_COMPONENTS[g] ?? []) out.add(c);
  return [...out];
}

/* -------------------------------------------------------------------------- */
/* Mapping into the cost estimator                                             */
/* -------------------------------------------------------------------------- */

const COMPONENT_ADDON = new Map<string, string>(
  PLAN_COMPONENTS.flatMap((g) => g.items.filter((i) => i.addon).map((i) => [i.value, i.addon!] as [string, string])),
);

export function estimatorConfigFor(a: PlanAnswers): EstimatorConfig {
  const space = PLAN_SPACES.find((s) => s.value === a.space) ?? PLAN_SPACES[1];
  const tier = PLAN_TIERS.find((t) => t.value === a.tier);
  const freq = PLAN_FREQUENCY.find((f) => f.value === a.frequency);

  const addons = new Set<string>();
  for (const c of a.components) {
    const addon = COMPONENT_ADDON.get(c);
    if (addon && ADDONS.some((x) => x.id === addon)) addons.add(addon);
  }
  // Sliders push add-ons the component list may not have covered.
  if (a.sliders.technology >= 3) addons.add("av");
  if (a.sliders.technology >= 4) addons.add("led-wall");
  if (a.sliders.hospitality >= 3) addons.add("meeting");
  if (a.sliders.functionality >= 3) addons.add("storage");

  return {
    footprint: space.fp,
    build: a.ownership === "buy" ? "custom" : "rental",
    finish: tier?.finish ?? "standard",
    city: cityTierFor(a.citySlug || slugify(a.city)),
    addons: [...addons],
    shows: freq?.shows ?? 1,
  };
}

export const slugify = (s: string) =>
  s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export type PlanRange = { low: number; high: number; label: string };

export function investmentRange(a: PlanAnswers): PlanRange {
  const config = estimatorConfigFor(a);
  const calc = calculate(config);
  // The plan quotes the exhibit itself; show services are called out separately.
  const low = Math.round(calc.boothLow / 500) * 500;
  const high = Math.round(calc.boothHigh / 500) * 500;
  return { low, high, label: `${money(low)} – ${money(high)}` };
}

export function servicesRange(a: PlanAnswers): PlanRange {
  const calc = calculate(estimatorConfigFor(a));
  const low = Math.round(calc.servicesLow / 250) * 250;
  const high = Math.round(calc.servicesHigh / 250) * 250;
  return { low, high, label: `${money(low)} – ${money(high)}` };
}

/* -------------------------------------------------------------------------- */
/* Booth profile                                                               */
/* -------------------------------------------------------------------------- */

export type ProfileKey =
  | "impact"
  | "customization"
  | "technology"
  | "functionality"
  | "portability"
  | "turnkey";

export const PROFILE_LABEL: Record<ProfileKey, string> = {
  impact: "Visual impact",
  customization: "Customization",
  technology: "Technology",
  functionality: "Functionality",
  portability: "Portability",
  turnkey: "Turnkey support",
};

const clamp10 = (n: number) => Math.max(1, Math.min(10, Math.round(n)));

export function boothProfile(a: PlanAnswers): Record<ProfileKey, number> {
  const space = PLAN_SPACES.find((s) => s.value === a.space);
  const tierIdx = Math.max(0, PLAN_TIERS.findIndex((t) => t.value === a.tier));
  const portable = pathOf(a) === "portable";
  const comps = a.components.length;
  const sizeWeight = (space?.score ?? 5) / 30; // 0.16 – 1

  if (portable) {
    const needs = a.portableNeeds.length;
    return {
      impact: clamp10(3 + needs * 0.3),
      customization: clamp10(2 + needs * 0.2),
      technology: clamp10(1 + (a.portableNeeds.includes("monitor") ? 3 : 0) + (a.portableNeeds.includes("ipad") ? 2 : 0)),
      functionality: clamp10(3 + needs * 0.25),
      portability: 10,
      turnkey: clamp10(a.service === "turnkey" ? 8 : a.service === "logistics" ? 5 : 2),
    };
  }

  return {
    impact: clamp10(3 + tierIdx * 1.6 + a.sliders.architecture * 0.7 + sizeWeight * 2),
    customization: clamp10(2.5 + tierIdx * 1.9 + (a.ownership === "buy" ? 1 : 0)),
    technology: clamp10(1.5 + a.sliders.technology * 1.8 + (a.components.includes("led-wall") ? 2 : 0)),
    functionality: clamp10(2.5 + a.sliders.functionality * 1.2 + a.sliders.hospitality * 0.8 + comps * 0.15),
    portability: clamp10(8 - tierIdx * 1.6 - sizeWeight * 4),
    turnkey: clamp10(a.service === "turnkey" ? 9 : a.service === "logistics" ? 6 : 3),
  };
}

/* -------------------------------------------------------------------------- */
/* Lead scoring                                                                */
/* -------------------------------------------------------------------------- */

export type PlanScore = {
  score: number;
  band: "high" | "nurture" | "self-serve";
  bandLabel: string;
  action: string;
  signals: string[];
};

export function scorePlan(a: PlanAnswers): PlanScore {
  const space = PLAN_SPACES.find((s) => s.value === a.space);
  const budget = PLAN_BUDGET.find((b) => b.value === a.budget);
  const service = PLAN_SERVICE.find((s) => s.value === a.service);
  const timeline = PLAN_TIMELINE.find((t) => t.value === a.timeline);
  const stage = PLAN_STAGE.find((s) => s.value === a.stage);

  let raw =
    (space?.score ?? 0) +
    (budget?.score ?? 0) +
    (service?.score ?? 0) +
    (timeline?.score ?? 0) +
    (stage?.score ?? 0);

  const signals: string[] = [];

  // Fit multiplier — the combinations that consistently close.
  const namedShow = a.show.trim().length > 1;
  const soon = a.timeline === "4-8" || a.timeline === "8-12" || a.timeline === "3-6m" || a.timeline === "lt4";
  if (space?.islandish && a.service === "turnkey" && namedShow && soon) {
    raw = Math.round(raw * 1.15);
    signals.push("Island + full turnkey on a named show inside 6 months");
  }
  if (a.ownership === "buy" && (budget?.mid ?? 0) >= 50000) signals.push("Buying a program asset, not a one-off");
  if (a.frequency === "national" || a.frequency === "international") {
    raw += 5;
    signals.push("Multi-show program — reuse value across the year");
  }

  // Negative signals — keep the board honest.
  if (a.budget === "lt10" && a.service === "turnkey") {
    raw -= 15;
    signals.push("Full turnkey expectation against an under-$10K budget — reset scope early");
  }
  if (a.stage === "research" && !namedShow) {
    raw -= 10;
    signals.push("Researching with no event named — nurture, don't chase");
  }
  if (a.timeline === "lt4") signals.push("Under 4 weeks — rush schedule and rush fee apply");

  const score = Math.max(0, Math.min(100, raw));
  const band: PlanScore["band"] = score >= 70 ? "high" : score >= 40 ? "nurture" : "self-serve";

  return {
    score,
    band,
    bandLabel: band === "high" ? "High priority" : band === "nurture" ? "Nurture" : "Self-serve",
    action:
      band === "high"
        ? "Call within the hour and offer the 30-minute strategy session with concept sketches."
        : band === "nurture"
          ? "Send the plan PDF plus two matching rentals, and diarise a follow-up before the booking deadline."
          : "Send the pricing guide and the portable catalogue; no live call needed yet.",
    signals,
  };
}

/* -------------------------------------------------------------------------- */
/* Recommendation                                                              */
/* -------------------------------------------------------------------------- */

export type Recommendation = {
  headline: string;
  construction: string;
  why: string;
  elements: string[];
  serviceLine: string;
  rush: boolean;
};

const componentLabel = new Map<string, string>(
  PLAN_COMPONENTS.flatMap((g) => g.items.map((i) => [i.value, i.label] as [string, string])),
);

export const labelForComponent = (id: string) => componentLabel.get(id) ?? id;

function structureHeight(space: string, tier: string): string {
  if (tier === "architect") return "20 ft feature structure with rigged overhead branding";
  if (tier === "premium") return "16–20 ft branded structure with backlit feature wall";
  if (tier === "elevated") return "12–16 ft branded structure with arch or tower";
  return forcesModular(space) ? "10–12 ft double-sided branded structure" : "8–10 ft branded back wall with returns";
}

function displaySize(a: PlanAnswers): string | null {
  if (a.components.includes("led-wall")) return "LED video wall with processor and content playback";
  if (a.components.includes("multi-tv")) return "Two to three 55–65\" displays with synchronised playback";
  if (a.components.includes("tv")) return "Integrated 55–65\" display";
  return null;
}

export function recommend(a: PlanAnswers): Recommendation {
  const space = PLAN_SPACES.find((s) => s.value === a.space) ?? PLAN_SPACES[1];
  const tier = PLAN_TIERS.find((t) => t.value === a.tier) ?? PLAN_TIERS[0];
  const portable = pathOf(a) === "portable";
  const owning = a.ownership === "buy";
  const service = PLAN_SERVICE.find((s) => s.value === a.service);

  if (portable) {
    const needs = a.portableNeeds.map((n) => PLAN_PORTABLE_NEEDS.find((x) => x.value === n)?.label ?? n);
    const travel = PLAN_TRAVEL.find((t) => t.value === a.travel)?.label ?? "";
    return {
      headline: `${space.label} portable display kit`,
      construction: "Tension-fabric and modular portable system",
      why: `You want something your own team can move and set up${travel ? `, travelling by ${travel.toLowerCase()}` : ""}. A portable kit gives you a clean branded presence that packs into wheeled cases, sets up in under an hour with no show labour, and takes new graphics each season without replacing the hardware.`,
      elements: [
        "Tension-fabric back wall with printed pillowcase graphic",
        ...(needs.length ? needs : ["Reception counter", "Literature holder"]),
        "Wheeled shipping cases that convert to counters",
        "Replaceable graphics — the frame stays, the message changes",
      ],
      serviceLine: service?.label ?? "Exhibit only",
      rush: a.timeline === "lt4",
    };
  }

  const custom =
    a.tier === "architect"
      ? "Completely custom"
      : a.tier === "premium"
        ? "Mostly custom on a reusable structural frame"
        : a.tier === "elevated"
          ? "Modular with custom features"
          : "Mostly modular";

  const elements: string[] = [structureHeight(a.space, a.tier)];
  const disp = displaySize(a);
  if (disp) elements.push(disp);
  if (a.components.includes("reception")) elements.push("Custom-fabricated reception counter with lockable storage");
  if (a.components.includes("backlit")) elements.push("Backlit fabric brand wall");
  if (a.components.includes("meeting-room") || a.components.includes("enclosed"))
    elements.push("Enclosed private meeting room");
  else if (a.components.includes("meeting-table")) elements.push("Semi-private meeting area seating four");
  if (a.components.includes("storage-room")) elements.push("Lockable storage closet");
  if (a.components.includes("product-display") || a.components.includes("shelving"))
    elements.push("Product display plinths and integrated shelving");
  if (a.components.includes("bar") || a.components.includes("lounge"))
    elements.push("Hospitality bar and lounge seating zone");
  if (a.components.includes("hanging-sign") || a.components.includes("overhead"))
    elements.push("Rigged hanging sign for aisle visibility");
  if (a.components.includes("raised") || a.components.includes("custom-floor"))
    elements.push("Raised custom deck with printed flooring");
  elements.push(
    a.tier === "standard" ? "Integrated booth lighting" : "Integrated LED accent and architectural lighting",
  );

  const priority = PLAN_PRIORITIES.find((p) => p.value === a.priority)?.label.toLowerCase();

  return {
    headline: `${space.label} ${tier.headline} ${owning ? "custom build" : "custom rental"}${
      a.tier === "premium" || a.tier === "architect" ? " with custom millwork" : ""
    }`,
    construction: custom,
    why: `Your answers point to ${custom.toLowerCase()} construction${
      priority ? ` because your first priority is to ${priority}` : ""
    }. ${
      owning
        ? "Owning makes sense at your show count — we build it as an asset, store it between shows and refurbish graphics per event."
        : "A custom rental gets you the same architecture without owning, storing or refurbishing it, and lets the footprint change show to show."
    } The structural frame stays reusable while the custom elements carry the brand, which is what keeps this achievable inside your range.`,
    elements,
    serviceLine: service?.label ?? "Exhibit only",
    rush: a.timeline === "lt4",
  };
}

/* -------------------------------------------------------------------------- */
/* Summary + share encoding                                                    */
/* -------------------------------------------------------------------------- */

export const PLAN_SHARE_PARAM = "p";

export function encodePlan(a: PlanAnswers): string {
  try {
    const json = JSON.stringify(a);
    return typeof window === "undefined" ? "" : window.btoa(encodeURIComponent(json));
  } catch {
    return "";
  }
}

export function decodePlan(raw: string | null | undefined): PlanAnswers | null {
  if (!raw) return null;
  try {
    const json = decodeURIComponent(window.atob(raw));
    const parsed = JSON.parse(json) as Partial<PlanAnswers>;
    if (!parsed || typeof parsed !== "object") return null;
    return { ...EMPTY_ANSWERS, ...parsed, sliders: { ...EMPTY_ANSWERS.sliders, ...(parsed.sliders ?? {}) } };
  } catch {
    return null;
  }
}

export const PLAN_STORAGE_KEY = "tx.boothPlan.v1";

/** The structured summary a salesperson reads. Also used by the PDF. */
export function planSummaryText(a: PlanAnswers, contact?: { name?: string; company?: string; email?: string }): string {
  const rec = recommend(a);
  const range = investmentRange(a);
  const score = scorePlan(a);
  const profile = boothProfile(a);

  const line = (k: string, v: string) => `${k.padEnd(18)}${v}`;

  return [
    "NEW EXHIBIT OPPORTUNITY — Traction X Booth Plan",
    "",
    line("Company:", contact?.company || "—"),
    line("Contact:", [contact?.name, contact?.email].filter(Boolean).join(" · ") || "—"),
    line("Event:", a.show || "—"),
    line("Location:", a.city || "—"),
    line("Booth:", `${PLAN_SPACES.find((s) => s.value === a.space)?.label ?? "—"}${a.boothNumber ? ` · #${a.boothNumber}` : ""}`),
    "",
    "RECOMMENDED",
    `  ${rec.headline}`,
    `  Construction: ${rec.construction}`,
    "",
    line("Budget band:", PLAN_BUDGET.find((b) => b.value === a.budget)?.label ?? "—"),
    line("Modelled range:", range.label),
    line("Service level:", rec.serviceLine),
    line("Timeline:", PLAN_TIMELINE.find((t) => t.value === a.timeline)?.label ?? "—"),
    line("Stage:", PLAN_STAGE.find((s) => s.value === a.stage)?.label ?? "—"),
    line("Rent / buy:", PLAN_OWNERSHIP.find((o) => o.value === a.ownership)?.label ?? "—"),
    line("Frequency:", PLAN_FREQUENCY.find((f) => f.value === a.frequency)?.label ?? "—"),
    "",
    "REQUIREMENTS",
    ...rec.elements.map((e) => `  • ${e}`),
    "",
    "GOALS",
    `  ${a.goals.map((g) => PLAN_GOALS.find((x) => x.value === g)?.label ?? g).join(", ") || "—"}`,
    "",
    "BOOTH PROFILE",
    ...(Object.keys(profile) as ProfileKey[]).map((k) => `  ${PROFILE_LABEL[k].padEnd(16)}${profile[k]}/10`),
    "",
    `LEAD SCORE  ${score.score} / 100 — ${score.bandLabel.toUpperCase()}`,
    ...score.signals.map((s) => `  • ${s}`),
    `  Next: ${score.action}`,
    "",
    "Traction X · 1-782-409-2527 · info@tractionx.ca",
  ].join("\n");
}

/** Finish levels exposed for UI copy. */
export const FINISH_LABELS = FINISH.map((f) => f.label);
export const FOOTPRINT_LABELS = FOOTPRINTS.map((f) => f.label);
