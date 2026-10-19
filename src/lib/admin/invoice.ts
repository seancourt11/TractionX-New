import type { CompanySettings, DocumentRecord, TaxRegion } from "@/data/admin-demo/types";
import { computeStages, computeTotals, nextInvoiceNumber, randomToken, type StageAmount } from "./doc-math";

/**
 * Invoicing — derives billable invoices from a contract's payment schedule.
 *
 * A contract (rental SOW / purchase agreement / change order) carries the
 * schedule; each stage becomes its own `type: "invoice"` document that bills a
 * percentage of the contract. Line items are summarised from the parent so the
 * client sees what they're paying for without re-keying anything.
 *
 * Like the rest of the workspace this is storage-agnostic: it returns records,
 * the admin store persists them.
 */

export const CONTRACT_TYPES: DocumentRecord["type"][] = ["rental_sow", "purchase_agreement", "change_order"];

export function isContract(doc: DocumentRecord): boolean {
  return doc.type !== "invoice";
}

export function isInvoice(doc: DocumentRecord): boolean {
  return doc.type === "invoice";
}

/** All invoices raised against a contract. */
export function invoicesFor(documents: DocumentRecord[], contractId: string): DocumentRecord[] {
  return documents.filter((d) => d.type === "invoice" && d.parentId === contractId);
}

/** All invoices tied to a deal reference (used by the client portal). */
export function invoicesForDeal(documents: DocumentRecord[], dealRef: string): DocumentRecord[] {
  const contracts = documents.filter((d) => d.type !== "invoice" && (d.dealRef === dealRef || d.leadId === dealRef));
  const ids = new Set(contracts.map((c) => c.id));
  return documents.filter(
    (d) => d.type === "invoice" && (d.dealRef === dealRef || (d.parentId ? ids.has(d.parentId) : false)),
  );
}

/** Which schedule stages have not been invoiced yet. */
export function openStages(contract: DocumentRecord, documents: DocumentRecord[], taxRegions: TaxRegion[]): StageAmount[] {
  const totals = computeTotals(contract, taxRegions);
  const billed = new Set(invoicesFor(documents, contract.id).map((i) => i.stageId));
  return computeStages(contract, totals.total).filter((s) => !billed.has(s.id));
}

export type BillingSummary = {
  contractTotal: number;
  billed: number;
  collected: number;
  outstanding: number;
  overdue: number;
};

export function summarise(
  contract: DocumentRecord | undefined,
  invoices: DocumentRecord[],
  taxRegions: TaxRegion[],
): BillingSummary {
  const contractTotal = contract ? computeTotals(contract, taxRegions).total : 0;
  let billed = 0;
  let collected = 0;
  let overdue = 0;
  for (const inv of invoices) {
    if (inv.status === "void") continue;
    const amount = computeTotals(inv, taxRegions).total;
    billed += amount;
    if (inv.paidAt) collected += amount;
    else if (isOverdue(inv)) overdue += amount;
  }
  return {
    contractTotal: round2(contractTotal),
    billed: round2(billed),
    collected: round2(collected),
    outstanding: round2(billed - collected),
    overdue: round2(overdue),
  };
}

export function isOverdue(inv: DocumentRecord): boolean {
  if (inv.paidAt || inv.status === "draft" || inv.status === "void") return false;
  if (!inv.dueDate) return false;
  return Date.parse(`${inv.dueDate}T23:59:59`) < Date.now();
}

/** Default: net 15 from issue. */
export function defaultDueDate(from = new Date(), days = 15): string {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Builds the invoice document for one payment stage of a contract.
 * Amounts are carried as a single pre-tax line so the shared tax maths in
 * `doc-math.ts` produces exactly the stage total.
 */
export function invoiceForStage(
  contract: DocumentRecord,
  stage: StageAmount,
  taxRegions: TaxRegion[],
  seq: number,
  settings?: CompanySettings,
): DocumentRecord {
  const now = new Date().toISOString();
  const totals = computeTotals(contract, taxRegions);
  const stageSubtotal = round2((totals.subtotal * stage.percent) / 100);
  const contractLabel = contract.type === "purchase_agreement" ? "purchase agreement" : "statement of work";

  return {
    ...contract,
    id: `inv-${Date.now()}`,
    type: "invoice",
    status: "draft",
    token: randomToken(),
    createdAt: now,
    updatedAt: now,
    parentId: contract.id,
    stageId: stage.id,
    stagePercent: stage.percent,
    dueDate: defaultDueDate(),
    paidAt: undefined,
    paymentRef: undefined,
    signature: undefined,

    title: `${stage.label} invoice (${stage.percent}%) — ${contract.title}`,
    overview: `Invoice for the ${stage.percent}% ${stage.label.toLowerCase()} stage of the signed ${contractLabel} ${contract.invoiceNumber}${
      settings ? `, payable to ${settings.legalName}` : ""
    }. ${stage.dueLabel}.`,

    configuration: contract.lineItems.map((li) => li.label).filter(Boolean),

    lineItems: [
      {
        id: `li-${stage.id}`,
        label: `${stage.label} — ${stage.percent}% of ${contract.title}`,
        description: `Per ${contractLabel} ${contract.invoiceNumber}. ${stage.dueLabel}.`,
        qty: 1,
        standard: stageSubtotal,
        discounted: null,
      },
    ],

    offer: { ...contract.offer, enabled: false },

    invoiceNumber: nextInvoiceNumber(contract.clientName || "Client", seq, "IN"),
    invoiceDate: now.slice(0, 10),
    events: [{ at: now, label: `Invoice raised for the ${stage.label.toLowerCase()} stage of ${contract.invoiceNumber}` }],
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
