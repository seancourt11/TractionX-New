/**
 * Traction X internal workspace — shared types.
 *
 * This file doubles as the API contract for the external Next.js backend:
 * every screen in /admin reads and writes these shapes, so the developer
 * building the real backend can implement against them directly.
 *
 * Nothing here talks to a server. The prototype keeps state in the browser.
 */

export type Currency = "CAD" | "USD";

/** Tax jurisdiction applied to a document (place of supply). */
export type TaxRegion = {
  id: string;
  label: string;
  /** Combined rate as a decimal, e.g. 0.05 for GST 5%. */
  rate: number;
  /** Printed on the document beside the tax line. */
  note: string;
};

export type DocType = "estimate" | "rental_sow" | "purchase_agreement" | "change_order" | "invoice";

export const DOC_TYPE_LABEL: Record<DocType, string> = {
  estimate: "Estimate",
  rental_sow: "Rental SOW",
  purchase_agreement: "Purchase Agreement",
  change_order: "Change Order",
  invoice: "Invoice",
};

export type DocStatus = "draft" | "sent" | "viewed" | "signed" | "paid" | "void";

export const DOC_STATUS_LABEL: Record<DocStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  viewed: "Viewed",
  signed: "Signed",
  paid: "Paid",
  void: "Void",
};

export type LeadStatus = "new" | "working" | "quoted" | "won" | "lost";

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  working: "Working",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

/** Delivery state of the push to JobForge. */
export type SyncStatus = "synced" | "pending" | "failed" | "not_configured";

export const SYNC_STATUS_LABEL: Record<SyncStatus, string> = {
  synced: "Synced",
  pending: "Queued",
  failed: "Failed",
  not_configured: "Not configured",
};

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  showName: string;
  showDate: string;
  footprint: string;
  build: string;
  tier: string;
  addons: string[];
  estimate: number;
  currency: Currency;
  rushApplied: boolean;
  /** Visitor gave express consent to receive project text messages. */
  smsOptIn?: boolean;
  /** Booth-planner output when the lead came from Build Your Booth Plan. */
  planScore?: number;
  planBand?: string;
  planRecommendation?: string;
  planSummary?: string;
  sourcePage: string;
  utmSource: string;
  status: LeadStatus;
  notes: string;
  sync: {
    status: SyncStatus;
    jobforgeId?: string;
    lastAttempt?: string;
    error?: string;
  };
};

/**
 * One priced row on a document.
 *
 * `standard` / `discounted` are UNIT rates; the row total is rate × qty.
 * Rows can carry a thumbnail so booth designs and products print visually.
 */
export type LineItem = {
  id: string;
  label: string;
  /** Optional second line printed under the label. */
  description?: string;
  /** Catalog SKU / design code. */
  sku?: string;
  /** Thumbnail URL shown in the builder and on the document. */
  image?: string;
  /** Defaults to 1 when omitted. */
  qty?: number;
  standard: number;
  /** null = no discount offered on this row. */
  discounted: number | null;
};


export type PaymentStage = {
  id: string;
  label: string;
  percent: number;
  /** Free text: a date, or a trigger like "on install handover". */
  dueLabel: string;
};

/** Time-limited / bundled-offer conditions printed above the pricing table. */
export type OfferTerms = {
  enabled: boolean;
  headline: string;
  expiresOn: string;
  requiredDepositPercent: number;
  /** Flat reduction applied to the subtotal when the offer conditions are met. */
  reducedBy?: number;
  conditions: string;
};

export type SignatureRecord = {
  signerName: string;
  signerTitle: string;
  signedAt: string;
  ipAddress: string;
  userAgent: string;
  /** Typed signature text as rendered on the document. */
  typed: string;
};

export type DocumentRecord = {
  id: string;
  type: DocType;
  status: DocStatus;
  /** Unguessable token used by the public signing link. */
  token: string;
  createdAt: string;
  updatedAt: string;
  /** Set when this document was generated from a lead. */
  leadId?: string;
  /** Set on change orders. */
  parentId?: string;

  title: string;
  clientName: string;
  clientContact: string;
  clientEmail: string;
  billingAddress: string;

  showName: string;
  venue: string;
  city: string;
  footprint: string;

  currency: Currency;
  taxRegionId: string;

  overview: string;
  includedServices: string[];
  configuration: string[];
  exclusions: string[];
  assumptions: string[];
  qcSteps: string[];
  shipping: string[];

  lineItems: LineItem[];
  offer: OfferTerms;
  paymentStages: PaymentStage[];

  invoiceNumber: string;
  invoiceDate: string;

  /** Account manager who owns and countersigns this document. */
  signatoryName?: string;
  signatoryTitle?: string;
  signatoryEmail?: string;

  /* ---- Invoice-only fields (type === "invoice") ------------------------- */
  /** Payment-stage id on the parent document this invoice bills. */
  stageId?: string;
  /** Percentage of the contract this invoice bills. */
  stagePercent?: number;
  /** Due date, ISO yyyy-mm-dd. */
  dueDate?: string;
  /** Set when payment has been recorded. */
  paidAt?: string;
  /** Cheque #, EFT reference or e-transfer confirmation. */
  paymentRef?: string;
  /** Deal reference (TX-YYYY-####) this document belongs to. */
  dealRef?: string;

  signature?: SignatureRecord;
  events: DocumentEvent[];
};

export type DocumentEvent = {
  at: string;
  label: string;
};

export type Signatory = {
  name: string;
  title: string;
  email: string;
};

export type CompanySettings = {
  legalName: string;
  address: string;
  phone: string;
  email: string;
  signatoryName: string;
  signatoryTitle: string;
  /** Selectable account managers who can own a document. */
  signatories?: Signatory[];
  taxRegistration: string;
  bank: {
    /** Registered account holder, printed as the wire beneficiary. */
    beneficiaryName?: string;
    name: string;
    address: string;
    institution: string;
    transit: string;
    account: string;
    swift: string;
  };
  etransferEmail: string;
  chequePayee: string;
};

/** Reusable clause libraries a PM assembles a document from. */
export type SnippetLibrary = {
  includedServices: string[];
  configuration: string[];
  exclusions: string[];
  assumptions: string[];
  qcSteps: string[];
  shipping: string[];
};

/** A saved document a PM can start the next one from. */
export type DocumentTemplate = {
  id: string;
  name: string;
  createdAt: string;
  doc: DocumentRecord;
};

export type AdminData = {
  leads: Lead[];
  documents: DocumentRecord[];
  templates: DocumentTemplate[];
  settings: CompanySettings;
  taxRegions: TaxRegion[];
  snippets: SnippetLibrary;
};
