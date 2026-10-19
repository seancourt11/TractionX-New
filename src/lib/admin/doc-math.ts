import type { DocumentRecord, LineItem, TaxRegion } from "@/data/admin-demo/types";

/**
 * Document arithmetic — totals, tax, savings and payment schedule.
 *
 * Kept separate from the UI so the same numbers drive the builder, the
 * document preview and the invoice page, and so the external backend can
 * port one function rather than reverse-engineering the screens.
 */

export type DocTotals = {
  standardSubtotal: number;
  subtotal: number;
  savings: number;
  savingsPercent: number;
  /** Line subtotal before the reduced-rate adjustment. */
  lineSubtotal: number;
  /** Flat reduced-rate adjustment applied (0 when no offer is active). */
  reducedBy: number;
  taxRate: number;
  taxLabel: string;
  standardTax: number;
  tax: number;
  standardTotal: number;
  total: number;
  hasDiscount: boolean;
};

export function effectiveRate(item: LineItem): number {
  return item.discounted ?? item.standard;
}

/** Quantity for a row, defaulting to 1. */
export function lineQty(item: LineItem): number {
  const q = Number(item.qty ?? 1);
  return Number.isFinite(q) && q > 0 ? q : 1;
}

/** Row total at the effective (possibly discounted) rate. */
export function lineTotal(item: LineItem): number {
  return round2(effectiveRate(item) * lineQty(item));
}

/** Row total at the standard rate, before any discount. */
export function lineStandardTotal(item: LineItem): number {
  return round2(item.standard * lineQty(item));
}

export function computeTotals(doc: DocumentRecord, regions: TaxRegion[]): DocTotals {
  const region = regions.find((r) => r.id === doc.taxRegionId);
  const taxRate = region?.rate ?? 0;
  const taxLabel = region?.note ?? "No tax applied";

  const standardSubtotal = round2(doc.lineItems.reduce((sum, i) => sum + lineStandardTotal(i), 0));
  const lineSubtotal = round2(doc.lineItems.reduce((sum, i) => sum + lineTotal(i), 0));
  const reducedBy = doc.offer?.enabled ? round2(Math.max(0, Number(doc.offer.reducedBy ?? 0))) : 0;
  const subtotal = round2(Math.max(0, lineSubtotal - reducedBy));
  const savings = round2(standardSubtotal - subtotal);


  const standardTax = round2(standardSubtotal * taxRate);
  const tax = round2(subtotal * taxRate);

  return {
    standardSubtotal,
    lineSubtotal,
    reducedBy,
    subtotal,
    savings,
    savingsPercent: standardSubtotal > 0 ? Math.round((savings / standardSubtotal) * 100) : 0,
    taxRate,
    taxLabel,
    standardTax,
    tax,
    standardTotal: round2(standardSubtotal + standardTax),
    total: round2(subtotal + tax),
    hasDiscount: savings > 0,
  };
}

export type StageAmount = {
  id: string;
  label: string;
  percent: number;
  dueLabel: string;
  /** Pre-tax portion of the contract billed at this milestone. */
  preTax: number;
  /** Tax portion of this milestone. */
  tax: number;
  /** Total due at this milestone, incl. tax. */
  amount: number;
};

export function computeStages(doc: DocumentRecord, total: number, totals?: DocTotals): StageAmount[] {
  const subtotal = totals ? totals.subtotal : total;
  const tax = totals ? totals.tax : 0;
  return doc.paymentStages.map((s) => ({
    ...s,
    preTax: round2((subtotal * s.percent) / 100),
    tax: round2((tax * s.percent) / 100),
    amount: round2((total * s.percent) / 100),
  }));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function money(n: number, currency: string): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function moneyShort(n: number, currency: string): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso.length <= 10 ? `${iso}T12:00:00Z` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Halifax" });
}

export function formatDateTime(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-CA", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Halifax" });
}

/** Auto invoice number: TX-YYYYMM-CLIENT-XX##. */
export function nextInvoiceNumber(clientName: string, seq: number, prefix = "SW"): string {
  const now = new Date();
  const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
  const client = clientName
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 1)
    .join("")
    .slice(0, 4)
    .toUpperCase() || "CLNT";
  return `TX-${ym}-${client}-${prefix}${String(seq).padStart(2, "0")}`;
}

export function randomToken(): string {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < 20; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
