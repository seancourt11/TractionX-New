/**
 * Modular sizing rules and the customer-facing presets built on top of them.
 *
 * Customers only ever see friendly names — "20 ft Backwall", "Extra Tall".
 * The millimetre grid below is what the editor actually snaps and builds to.
 */

import type { BoothType, HeightPreset } from "./types";

export const MM_PER_FT = 304.8;

export const ftToMm = (ft: number) => Math.round(ft * MM_PER_FT);
export const mmToFt = (mm: number) => mm / MM_PER_FT;

/** Common beMatrix width modules. 992 is the primary building block. */
export const WIDTH_MODULES = [992, 496, 310] as const;

/** Finest common step used for free positioning on the grid. */
export const GRID_STEP_MM = 62;

export const HEIGHTS: { id: HeightPreset; label: string; mm: number; approx: string }[] = [
  { id: "standard", label: "Standard", mm: 2418, approx: "approx. 8 ft" },
  { id: "tall", label: "Tall", mm: 3410, approx: "approx. 11 ft" },
  { id: "extra_tall", label: "Extra Tall", mm: 4402, approx: "approx. 14.5 ft" },
  { id: "double", label: "Double Height", mm: 4836, approx: "approx. 16 ft" },
];

export function heightMm(preset: HeightPreset): number {
  return HEIGHTS.find((h) => h.id === preset)?.mm ?? 2418;
}

export const BOOTH_SIZES: { id: string; label: string; widthFt: number; depthFt: number }[] = [
  { id: "10x10", label: "10 × 10 ft", widthFt: 10, depthFt: 10 },
  { id: "10x20", label: "10 × 20 ft", widthFt: 20, depthFt: 10 },
  { id: "20x20", label: "20 × 20 ft", widthFt: 20, depthFt: 20 },
  { id: "20x30", label: "20 × 30 ft", widthFt: 30, depthFt: 20 },
  { id: "20x40", label: "20 × 40 ft", widthFt: 40, depthFt: 20 },
  { id: "30x30", label: "30 × 30 ft", widthFt: 30, depthFt: 30 },
  { id: "30x40", label: "30 × 40 ft", widthFt: 40, depthFt: 30 },
  { id: "40x40", label: "40 × 40 ft", widthFt: 40, depthFt: 40 },
];

export const BOOTH_TYPES: { id: BoothType; label: string; blurb: string }[] = [
  { id: "inline", label: "Inline", blurb: "One aisle at the front, neighbours both sides." },
  { id: "corner", label: "Corner", blurb: "Aisles on the front and one side." },
  { id: "peninsula", label: "Peninsula", blurb: "Aisles on three sides, neighbour at the back." },
  { id: "island", label: "Island", blurb: "Aisles on all four sides." },
];

/**
 * Break a target width into 992 / 496 / 310 modules, favouring 992.
 * Returns the module widths in order, left to right.
 */
export function modulesForWidth(targetMm: number): number[] {
  const out: number[] = [];
  let remaining = Math.max(310, Math.round(targetMm));
  while (remaining >= 992 - 150) {
    out.push(992);
    remaining -= 992;
  }
  if (remaining >= 400) out.push(496);
  else if (remaining >= 200) out.push(310);
  return out.length ? out : [992];
}

export type WallPreset = {
  id: string;
  label: string;
  group: "Backwalls" | "Side / Return Walls" | "Feature Walls";
  /** Nominal width in feet, shown to the customer. */
  ft: number;
  hint?: string;
};

export const WALL_PRESETS: WallPreset[] = [
  { id: "10ft_backwall", label: "10 ft Backwall", group: "Backwalls", ft: 10 },
  { id: "20ft_backwall", label: "20 ft Backwall", group: "Backwalls", ft: 20 },
  { id: "30ft_backwall", label: "30 ft Backwall", group: "Backwalls", ft: 30 },
  { id: "40ft_backwall", label: "40 ft Backwall", group: "Backwalls", ft: 40 },
  { id: "3ft_side_wall", label: "3 ft Side Return", group: "Side / Return Walls", ft: 3 },
  { id: "6ft_side_wall", label: "6 ft Side Wall", group: "Side / Return Walls", ft: 6 },
  { id: "10ft_side_wall", label: "10 ft Side Wall", group: "Side / Return Walls", ft: 10 },
  { id: "feature_wall", label: "Freestanding Feature Wall", group: "Feature Walls", ft: 8 },
  { id: "short_return", label: "Short Return Wall", group: "Feature Walls", ft: 4 },
  { id: "tall_feature_wall", label: "Tall Feature Wall", group: "Feature Walls", ft: 10, hint: "Extra Tall" },
];

export const MODULAR_PIECES = [
  { widthMm: 992, label: "992 mm", note: "Primary module", primary: true },
  { widthMm: 496, label: "496 mm", note: "Half module", primary: false },
  { widthMm: 310, label: "310 mm", note: "Fine adjustment", primary: false },
];

/* ---------------------------------------------------------------------------
 * Stage 2 — storage, towers, counters, AV, furniture and flooring.
 * ------------------------------------------------------------------------ */

import type { GraphicType, ItemKind, LogoTreatment, SizingSystem } from "./types";

export type ItemPreset = {
  id: string;
  kind: ItemKind;
  sizing: SizingSystem;
  label: string;
  group: string;
  widthMm: number;
  depthMm: number;
  heightMm: number;
  finish: "white" | "black" | "wood" | "brand";
  elevationMm?: number;
  note?: string;
  /** Names the 3D piece drawn for this product; replaceable with an exact model later. */
  visualKey?: string;
};

/** Storage rooms. Inline booths are locked to 992 mm deep unless overridden. */
export const STORAGE_PRESETS: ItemPreset[] = [
  {
    id: "storage_small",
    kind: "storage",
    sizing: "modular",
    label: "Small Storage Room",
    group: "Storage",
    widthMm: 992,
    depthMm: 992,
    heightMm: 2418,
    finish: "white",
    note: "Coats and cases",
  },
  {
    id: "storage_medium",
    kind: "storage",
    sizing: "modular",
    label: "Medium Storage Room",
    group: "Storage",
    widthMm: 1984,
    depthMm: 992,
    heightMm: 2418,
    finish: "white",
    note: "Storage plus a work surface",
  },
  {
    id: "storage_large",
    kind: "storage",
    sizing: "modular",
    label: "Large Storage / Meeting Room",
    group: "Storage",
    widthMm: 2976,
    depthMm: 1984,
    heightMm: 2418,
    finish: "white",
    note: "Room for a small table",
  },
];

export const TOWER_PRESETS: ItemPreset[] = [
  {
    id: "tower_slim",
    kind: "tower",
    sizing: "modular",
    label: "Slim Tower",
    group: "Towers",
    widthMm: 992,
    depthMm: 496,
    heightMm: 3410,
    finish: "white",
    note: "Tall branding marker",
  },
  {
    id: "tower_square",
    kind: "tower",
    sizing: "modular",
    label: "Square Tower",
    group: "Towers",
    widthMm: 992,
    depthMm: 992,
    heightMm: 3410,
    finish: "white",
    note: "Four-sided graphics",
  },
  {
    id: "tower_tall",
    kind: "tower",
    sizing: "modular",
    label: "Extra Tall Tower",
    group: "Towers",
    widthMm: 992,
    depthMm: 992,
    heightMm: 4402,
    finish: "white",
    note: "Seen across the hall",
  },
];

/** Counters are freely parametric: 24–96 in wide, built from real geometry. */
export const COUNTER_MIN_MM = 610;
export const COUNTER_MAX_MM = 2440;

export const COUNTER_PRESETS: ItemPreset[] = [
  {
    id: "counter_reception",
    kind: "counter",
    sizing: "free",
    label: "Reception Counter",
    group: "Counters",
    widthMm: 1220,
    depthMm: 600,
    heightMm: 1000,
    finish: "white",
    note: "48 in wide",
  },
  {
    id: "counter_demo",
    kind: "counter",
    sizing: "free",
    label: "Demo Counter",
    group: "Counters",
    widthMm: 1830,
    depthMm: 600,
    heightMm: 1000,
    finish: "white",
    note: "72 in wide",
  },
  {
    id: "counter_pedestal",
    kind: "counter",
    sizing: "free",
    label: "Pedestal",
    group: "Counters",
    widthMm: 610,
    depthMm: 610,
    heightMm: 1000,
    finish: "black",
    note: "24 in square",
  },
  {
    id: "counter_bar",
    kind: "counter",
    sizing: "free",
    label: "Bar Counter",
    group: "Counters",
    widthMm: 2440,
    depthMm: 700,
    heightMm: 1100,
    finish: "wood",
    note: "96 in wide",
  },
];

/** Screens are fixed products at real diagonals, and snap to walls. */
export const AV_PRESETS: ItemPreset[] = [
  {
    id: "tv_43",
    kind: "tv",
    sizing: "fixed",
    label: '43" Screen',
    group: "Screens",
    widthMm: 965,
    depthMm: 80,
    heightMm: 560,
    elevationMm: 1300,
    finish: "black",
  },
  {
    id: "tv_55",
    kind: "tv",
    sizing: "fixed",
    label: '55" Screen',
    group: "Screens",
    widthMm: 1230,
    depthMm: 80,
    heightMm: 710,
    elevationMm: 1300,
    finish: "black",
  },
  {
    id: "tv_65",
    kind: "tv",
    sizing: "fixed",
    label: '65" Screen',
    group: "Screens",
    widthMm: 1450,
    depthMm: 85,
    heightMm: 830,
    elevationMm: 1250,
    finish: "black",
  },
  {
    id: "tv_75",
    kind: "tv",
    sizing: "fixed",
    label: '75" Screen',
    group: "Screens",
    widthMm: 1680,
    depthMm: 90,
    heightMm: 960,
    elevationMm: 1200,
    finish: "black",
  },
  {
    id: "touchscreen_43",
    kind: "tv",
    sizing: "fixed",
    label: '43" Touchscreen Kiosk',
    group: "Screens",
    widthMm: 700,
    depthMm: 600,
    heightMm: 1700,
    finish: "black",
    note: "Freestanding",
  },
];

export const FURNITURE_PRESETS: ItemPreset[] = [
  { id: "stool", kind: "furniture", sizing: "fixed", label: "Bar Stool", group: "Furniture", widthMm: 400, depthMm: 400, heightMm: 760, finish: "black" },
  { id: "chair", kind: "furniture", sizing: "fixed", label: "Side Chair", group: "Furniture", widthMm: 500, depthMm: 520, heightMm: 800, finish: "black" },
  { id: "cafe_table", kind: "furniture", sizing: "fixed", label: "Café Table", group: "Furniture", widthMm: 700, depthMm: 700, heightMm: 1050, finish: "white" },
  { id: "coffee_table", kind: "furniture", sizing: "fixed", label: "Coffee Table", group: "Furniture", widthMm: 1100, depthMm: 600, heightMm: 400, finish: "wood" },
  { id: "meeting_table", kind: "furniture", sizing: "fixed", label: "Meeting Table", group: "Furniture", widthMm: 1600, depthMm: 900, heightMm: 750, finish: "wood" },
  { id: "lounge_chair", kind: "furniture", sizing: "fixed", label: "Lounge Chair", group: "Furniture", widthMm: 800, depthMm: 800, heightMm: 750, finish: "black" },
  { id: "sofa", kind: "furniture", sizing: "fixed", label: "Two-Seat Sofa", group: "Furniture", widthMm: 1500, depthMm: 850, heightMm: 750, finish: "black" },
  { id: "literature_rack", kind: "furniture", sizing: "fixed", label: "Literature Rack", group: "Furniture", widthMm: 450, depthMm: 350, heightMm: 1500, finish: "white" },
];

/* ---------------------------------------------------------------------------
 * Stage 3 — graphics, backlighting and overhead signs.
 * ------------------------------------------------------------------------ */

/** Hanging signs. Height is the sign face; hangHeightMm is set on placement. */
export const HANGING_PRESETS: (ItemPreset & { shape: "square" | "rectangle" | "halo" })[] = [
  {
    id: "hanging_square_8",
    kind: "hanging",
    sizing: "free",
    shape: "square",
    label: "8 ft Square Banner",
    group: "Overhead",
    widthMm: 2440,
    depthMm: 2440,
    heightMm: 1220,
    elevationMm: 3660,
    finish: "white",
    note: "Suits 20 × 20 and larger",
  },
  {
    id: "hanging_square_10",
    kind: "hanging",
    sizing: "free",
    shape: "square",
    label: "10 ft Square Banner",
    group: "Overhead",
    widthMm: 3050,
    depthMm: 3050,
    heightMm: 1520,
    elevationMm: 3960,
    finish: "white",
    note: "Suits 30 × 30 and larger",
  },
  {
    id: "hanging_rect_10",
    kind: "hanging",
    sizing: "free",
    shape: "rectangle",
    label: "10 ft Rectangular Banner",
    group: "Overhead",
    widthMm: 3050,
    depthMm: 610,
    heightMm: 1220,
    elevationMm: 3660,
    finish: "white",
    note: "Reads from the aisle",
  },
  {
    id: "hanging_rect_20",
    kind: "hanging",
    sizing: "free",
    shape: "rectangle",
    label: "20 ft Rectangular Banner",
    group: "Overhead",
    widthMm: 6100,
    depthMm: 610,
    heightMm: 1520,
    elevationMm: 4270,
    finish: "white",
    note: "Big statement over a 20 ft frontage",
  },
  {
    id: "hanging_halo_12",
    kind: "hanging",
    sizing: "free",
    shape: "halo",
    label: "12 ft Halo Ring",
    group: "Overhead",
    widthMm: 3660,
    depthMm: 3660,
    heightMm: 1220,
    elevationMm: 3960,
    finish: "white",
    note: "Circular, seen from every aisle",
  },
  {
    id: "hanging_halo_16",
    kind: "hanging",
    sizing: "free",
    shape: "halo",
    label: "16 ft Halo Ring",
    group: "Overhead",
    widthMm: 4880,
    depthMm: 4880,
    heightMm: 1520,
    elevationMm: 4270,
    finish: "white",
    note: "Island booths only",
  },
];

export const HANG_MIN_MM = 2440;
export const HANG_MAX_MM = 6100;

/** Customer-facing graphic treatments for walls. */
export const GRAPHIC_TYPES: { id: GraphicType; label: string; note: string }[] = [
  { id: "full_seg_graphic", label: "Full graphic", note: "Edge-to-edge printed fabric" },
  { id: "solid_color", label: "Solid colour", note: "One clean brand colour" },
  { id: "backlit_graphic", label: "Backlit graphic", note: "Lit from inside, glows" },
  { id: "printed_logo", label: "Printed logo", note: "Logo on a plain wall" },
  { id: "die_cut_logo", label: "Die-cut logo", note: "Dimensional cut-out letters" },
  { id: "channel_letters", label: "3D backlit letters", note: "Halo-lit channel letters" },
];

export const LOGO_TREATMENTS: { id: LogoTreatment; label: string }[] = [
  { id: "none", label: "None" },
  { id: "printed", label: "Printed" },
  { id: "die_cut", label: "Die-cut" },
  { id: "channel_letters", label: "3D backlit" },
];

/**
 * Recommended overhead sign width for a booth frontage — roughly half to
 * two-thirds of the frontage, kept inside the footprint.
 */
export function recommendedHangingWidthMm(boothWidthMm: number, boothDepthMm: number): number {
  const target = Math.min(boothWidthMm, boothDepthMm) * 0.6;
  return Math.round(Math.min(Math.max(target, HANG_MIN_MM), HANG_MAX_MM));
}

export const ITEM_PRESETS: ItemPreset[] = [
  ...STORAGE_PRESETS,
  ...TOWER_PRESETS,
  ...COUNTER_PRESETS,
  ...AV_PRESETS,
  ...FURNITURE_PRESETS,
  ...HANGING_PRESETS,
];

export type FlooringSwatch = {
  id: string;
  label: string;
  family: "Carpet" | "Rolled Vinyl";
  hex: string;
  note?: string;
};

export const FLOORING_SWATCHES: FlooringSwatch[] = [
  { id: "carpet_black", label: "Black", family: "Carpet", hex: "#141414" },
  { id: "carpet_charcoal", label: "Charcoal", family: "Carpet", hex: "#3a3a3c" },
  { id: "carpet_grey", label: "Silver Grey", family: "Carpet", hex: "#8e8e93" },
  { id: "carpet_navy", label: "Navy", family: "Carpet", hex: "#1e2a45" },
  { id: "carpet_red", label: "Red", family: "Carpet", hex: "#8c1c22" },
  { id: "carpet_white", label: "Ivory", family: "Carpet", hex: "#e8e4dc" },
  { id: "vinyl_light_wood", label: "Light Wood", family: "Rolled Vinyl", hex: "#c9a37a" },
  { id: "vinyl_walnut", label: "Walnut", family: "Rolled Vinyl", hex: "#6b452c" },
  { id: "vinyl_concrete", label: "Polished Concrete", family: "Rolled Vinyl", hex: "#9a9a97" },
  { id: "vinyl_white", label: "Gloss White", family: "Rolled Vinyl", hex: "#f0f0f0" },
  { id: "vinyl_black", label: "Gloss Black", family: "Rolled Vinyl", hex: "#0e0e0e" },
];

export const FINISH_HEX: Record<string, string> = {
  white: "#ededed",
  black: "#1b1b1b",
  wood: "#a9784c",
  brand: "#b48ae8",
};
