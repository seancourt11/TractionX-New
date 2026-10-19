/**
 * Internal quoting catalog.
 *
 * Feeds the "Add from catalog" picker in the document builder so a PM can
 * build a quote from real booth designs, portable products and services —
 * each with a thumbnail that prints on the SOW / invoice.
 */

import { RENTAL_BOOTHS } from "@/data/rental-booths";
import { PORTABLE_PRODUCTS } from "@/data/portable-products";
import { portableImage } from "@/data/portable-images";
import { SERVICES } from "@/data/services";

export type CatalogGroup = "booth" | "portable" | "service";

export const CATALOG_GROUP_LABEL: Record<CatalogGroup, string> = {
  booth: "Booth designs",
  portable: "Portable products",
  service: "Services & add-ons",
};

export type CatalogItem = {
  id: string;
  group: CatalogGroup;
  name: string;
  /** Short line printed under the item name on the document. */
  description: string;
  sku: string;
  image?: string;
  /** Suggested unit price; 0 means the PM prices it. */
  price: number;
};

function parsePrice(value?: string): number {
  if (!value) return 0;
  const n = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? Math.round(n) : 0;
}

const boothItems: CatalogItem[] = RENTAL_BOOTHS.map((b) => ({
  id: `booth:${b.slug}`,
  group: "booth" as const,
  name: `${b.size} Custom Rental — ${b.name}`,
  description: `Design ${b.code} · ${b.size} custom rental exhibit, fabricated and finished to your brand.`,
  sku: b.code,
  image: b.image,
  price: 0,
}));

const portableItems: CatalogItem[] = PORTABLE_PRODUCTS.map((p) => ({
  id: `portable:${p.slug}`,
  group: "portable" as const,
  name: p.name,
  description: p.blurb,
  sku: p.slug.toUpperCase().slice(0, 18),
  image: portableImage(p.slug),
  price: parsePrice(p.priceFrom),
}));

const serviceItems: CatalogItem[] = SERVICES.map((s) => ({
  id: `service:${s.slug}`,
  group: "service" as const,
  name: s.label,
  description: s.short,
  sku: `SVC-${s.slug.toUpperCase().slice(0, 12)}`,
  price: 0,
}));

export const CATALOG_ITEMS: CatalogItem[] = [...boothItems, ...portableItems, ...serviceItems];

export function searchCatalog(group: CatalogGroup, query: string, limit = 60): CatalogItem[] {
  const q = query.trim().toLowerCase();
  const pool = CATALOG_ITEMS.filter((i) => i.group === group);
  if (!q) return pool.slice(0, limit);
  return pool
    .filter((i) => `${i.name} ${i.sku} ${i.description}`.toLowerCase().includes(q))
    .slice(0, limit);
}
