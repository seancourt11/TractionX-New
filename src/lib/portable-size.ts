import { PORTABLE_PRODUCTS, type PortableProduct } from "@/data/portable-products";

export type PortableFootprint = "10x10" | "10x20" | "20x20" | "tabletop" | "outdoor";

export type FootprintDef = {
  slug: PortableFootprint;
  label: string;
  short: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
};

export const PORTABLE_FOOTPRINTS: FootprintDef[] = [
  {
    slug: "10x10",
    label: "10×10 ft portable displays",
    short: "10×10 ft",
    metaTitle: "10x10 Portable Trade Show Displays & Booth Packages | Traction X",
    metaDesc:
      "Every portable display that fits a 10×10 ft trade show booth — complete packages, 8–10ft backwalls, lightboxes, counters, banner stands and lighting. Free 3D design, 7–12 day production.",
    intro:
      "Everything in our catalog that works inside a 10×10 ft in-line booth: complete ship-in-a-case packages, 8ft and 10ft wide backwalls, lightboxes, plus the counters, lighting and banner stands that finish the space.",
  },
  {
    slug: "10x20",
    label: "10×20 ft portable displays",
    short: "10×20 ft",
    metaTitle: "10x20 Portable Trade Show Displays & Booth Packages | Traction X",
    metaDesc:
      "Every portable display that fits a 10×20 ft trade show booth — 20ft backwalls, backlit walls, complete packages, counters, towers and lighting. Free 3D design, 7–12 day production.",
    intro:
      "Twenty feet of frontage, still shipping in cases. Complete 10×20 packages, 15ft and 20ft wide backwalls and lightboxes, plus the counters, towers, lighting and banner stands that fill the extra frontage.",
  },
  {
    slug: "20x20",
    label: "20×20 ft portable island displays",
    short: "20×20 ft",
    metaTitle: "20x20 Portable Island Trade Show Displays & Packages | Traction X",
    metaDesc:
      "Every portable display that fits a 20×20 ft island booth — four-sided packages, 20ft walls, hanging banners, towers, counters and lighting. Free 3D design, 7–12 day production.",
    intro:
      "Four-sided island footprints built from portable hardware: island packages, tall feature walls and towers, hanging banners, hospitality counters and the lighting that makes a 20×20 read from across the hall.",
  },
  {
    slug: "tabletop",
    label: "Tabletop & table displays",
    short: "Tabletop",
    metaTitle: "Tabletop Trade Show Displays, Table Covers & Counters | Traction X",
    metaDesc:
      "Tabletop trade show displays, printed table covers, throws, runners and compact counter-top backwalls for 4ft, 6ft and 8ft tables. Free 3D design, 7–12 day production.",
    intro:
      "For shows where you get a table, not a booth: tabletop backwalls, printed covers and throws for 4ft, 6ft and 8ft tables, runners, literature racks and tablet stands.",
  },
  {
    slug: "outdoor",
    label: "Outdoor event displays",
    short: "Outdoor",
    metaTitle: "Outdoor Event Displays, Printed Tents, Flags & Signage | Traction X",
    metaDesc:
      "Outdoor event displays: printed pop up tents and canopies, feather and teardrop flags, A-frame signs, outdoor furniture and umbrellas. Free 3D design, 7–12 day production.",
    intro:
      "Weather-rated branding for festivals, fairs, race days and parking-lot activations: printed tents and canopies, feather and teardrop flags, sidewalk signs, umbrellas and outdoor furniture.",
  },
];

export const FOOTPRINT_MAP: Record<string, FootprintDef> = Object.fromEntries(
  PORTABLE_FOOTPRINTS.map((f) => [f.slug, f]),
);

const OUTDOOR_CATEGORIES = new Set([
  "outdoor-flags-signage",
  "event-tents-canopies",
  "outdoor-furniture-umbrellas",
]);

const TABLE_CATEGORIES = new Set(["table-covers"]);

// Categories that are add-ons — they work in any indoor footprint.
const ADDON_CATEGORIES = new Set([
  "banner-stands",
  "trade-show-counters",
  "tablet-literature-stands",
  "led-display-lighting",
  "snap-frames-poster-displays",
  "retail-slatwall-displays",
  "display-cases-tent-frames",
  "sanitizer-hygiene-stands",
  "inflatable-branding",
]);

const WALL_CATEGORIES = new Set([
  "tension-fabric-displays",
  "backlit-lightbox-displays",
  "pop-up-displays",
  "fabric-tube-displays",
  "step-and-repeat-backdrops",
  "private-enclosures",
  "hanging-banners-towers",
]);

/** Largest width in feet mentioned in the product name or size field. */
function widthFt(p: PortableProduct): number | undefined {
  const hay = `${p.size} ${p.name}`.toLowerCase();
  const nums = [...hay.matchAll(/(\d+(?:\.\d+)?)\s?(?:ft|foot|feet|')/g)].map((m) => Number(m[1]));
  if (!nums.length) return undefined;
  return Math.max(...nums);
}

function isTabletop(p: PortableProduct): boolean {
  const hay = `${p.name} ${p.size}`.toLowerCase();
  return TABLE_CATEGORIES.has(p.category) || /tabletop|table top|table-top|counter-top|table runner|table throw|table cover/.test(hay);
}

export function footprintsFor(p: PortableProduct): PortableFootprint[] {
  if (OUTDOOR_CATEGORIES.has(p.category)) return ["outdoor"];
  if (isTabletop(p)) return ["tabletop"];

  const size = p.size.toLowerCase().replace(/\s|×/g, (m) => (m === "×" ? "x" : ""));
  if (size.includes("20x20")) return ["20x20"];
  if (size.includes("10x20")) return ["10x20", "20x20"];
  if (size.includes("10x10")) return ["10x10", "10x20", "20x20"];

  if (ADDON_CATEGORIES.has(p.category)) return ["10x10", "10x20", "20x20"];

  if (WALL_CATEGORIES.has(p.category)) {
    const w = widthFt(p);
    if (w === undefined) return ["10x10", "10x20", "20x20"];
    if (w >= 19) return ["10x20", "20x20"];
    if (w >= 13) return ["10x20", "20x20"];
    return ["10x10", "10x20", "20x20"];
  }

  return ["10x10", "10x20", "20x20"];
}

export function productsInFootprint(fp: string): PortableProduct[] {
  return PORTABLE_PRODUCTS.filter((p) => footprintsFor(p).includes(fp as PortableFootprint));
}

export function footprintCount(fp: string): number {
  return productsInFootprint(fp).length;
}

/** Products whose primary purpose is the structure of that footprint (packages + walls). */
export function isCoreForFootprint(p: PortableProduct): boolean {
  return !ADDON_CATEGORIES.has(p.category);
}

/** The footprint a product is designed for first; used to rank size pages. */
export function primaryFootprint(p: PortableProduct): PortableFootprint {
  return footprintsFor(p)[0];
}
