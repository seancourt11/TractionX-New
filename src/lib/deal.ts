/* ==========================================================================
 *  DEAL MODEL — the spine of the on-site estimate → quote → contract flow
 * ==========================================================================
 *
 *  A "deal" is everything we know about one opportunity: who the client is,
 *  what show they're going to, the scoped booth configuration, which quote
 *  option they picked, and every event that has happened since.
 *
 *  Storage is deliberately frontend-only for now:
 *    • the deal is persisted in localStorage so the visitor (and we, on the
 *      admin side of the same browser) can come back to it, and
 *    • the whole deal is also encodable into the quote URL, so a link works
 *      on a device that has never seen this browser's storage.
 *
 *  THIS FILE IS THE BACKEND SEAM. When a database exists, replace the read /
 *  write helpers below (`loadDeal`, `saveDeal`, `listDeals`) with API calls —
 *  every screen goes through them and nothing else touches storage.
 * ========================================================================== */

import type { EstimatorConfig } from "./estimator";
import { DEFAULT_CONFIG, decodeConfig, encodeConfig } from "./estimator";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type DealStage =
  | "scoping"
  | "quoted"
  | "accepted"
  | "changes_requested"
  | "contract_sent"
  | "signed"
  | "in_production"
  | "complete"
  | "lost";

export const STAGE_LABEL: Record<DealStage, string> = {
  scoping: "Scoping",
  quoted: "Quoted",
  accepted: "Accepted",
  changes_requested: "Changes requested",
  contract_sent: "Contract sent",
  signed: "Signed",
  in_production: "In production",
  complete: "Complete",
  lost: "Lost",
};

/** The order deals move through on the pipeline board. */
export const PIPELINE: DealStage[] = [
  "scoping",
  "quoted",
  "changes_requested",
  "accepted",
  "contract_sent",
  "signed",
  "in_production",
];

export type DealContact = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

/** The scoping answers that actually move the number. */
export type DealScope = {
  /** inline / corner / peninsula / island */
  position: string;
  /** Ceiling & rigging allowance at the venue. */
  ceiling: string;
  /** Graphics volume. */
  graphics: string;
  /** AV level. */
  av: string;
  /** Furniture package. */
  furniture: string;
  /** Storage / lockable space. */
  storage: string;
  /** Flooring choice. */
  flooring: string;
  venue: string;
  installDate: string;
  dismantleDate: string;
};

export const EMPTY_SCOPE: DealScope = {
  position: "",
  ceiling: "",
  graphics: "",
  av: "",
  furniture: "",
  storage: "",
  flooring: "",
  venue: "",
  installDate: "",
  dismantleDate: "",
};

export type DealFile = { name: string; size: number; kind?: string };

export type DealEvent = { at: string; label: string; by?: "client" | "tractionx" };

export type DealApproval = {
  /** Client's decision on the 3D concept. */
  status: "pending" | "approved" | "changes";
  note: string;
  at: string;
};

export type ChangeOrderRequest = {
  id: string;
  at: string;
  detail: string;
  status: "requested" | "priced" | "signed";
};

export type Deal = {
  /** Human reference printed on everything, e.g. TX-2027-0481. */
  ref: string;
  createdAt: string;
  updatedAt: string;
  stage: DealStage;

  contact: DealContact;

  city: string;
  show: string;
  showDate: string;
  budget: string;
  timeline: string;
  brief: string;

  config: EstimatorConfig;
  scope: DealScope;

  /** Which quote option the client chose ("standard" | "elevated" | "premium"). */
  selectedOption?: string;
  /** Value of the accepted option, for the pipeline board. */
  acceptedValue?: number;

  wants3D: boolean;
  attachments: DealFile[];
  designApproval?: DealApproval;
  changeOrders: ChangeOrderRequest[];

  /** Optional client-set passcode for the portal (not a security boundary). */
  passcode?: string;

  events: DealEvent[];
};

/* -------------------------------------------------------------------------- */
/* Creation                                                                    */
/* -------------------------------------------------------------------------- */

function pad(n: number, len: number) {
  return String(n).padStart(len, "0");
}

/** TX-<year>-<4 digits>. Unique enough for a per-browser prototype. */
export function newDealRef(now = new Date()): string {
  const seq = Math.floor(Math.random() * 9000) + 1000;
  return `TX-${now.getFullYear()}-${pad(seq, 4)}`;
}

export function createDeal(partial: Partial<Deal> = {}): Deal {
  const now = new Date().toISOString();
  return {
    ref: newDealRef(),
    createdAt: now,
    updatedAt: now,
    stage: "scoping",
    contact: { name: "", email: "", phone: "", company: "" },
    city: "",
    show: "",
    showDate: "",
    budget: "",
    timeline: "",
    brief: "",
    config: { ...DEFAULT_CONFIG },
    scope: { ...EMPTY_SCOPE },
    wants3D: true,
    attachments: [],
    changeOrders: [],
    events: [{ at: now, label: "Estimate configured on the website", by: "client" }],
    ...partial,
  };
}

/* -------------------------------------------------------------------------- */
/* Storage — REPLACE THESE THREE WHEN A BACKEND EXISTS                         */
/* -------------------------------------------------------------------------- */

const KEY = "tx.deals.v1";

function readAll(): Deal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Deal[]) : [];
  } catch {
    return [];
  }
}

function writeAll(deals: Deal[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(deals.slice(-100)));
  } catch {
    /* quota or private mode — the deal still lives in the URL */
  }
}

/** Every deal saved in this browser, newest first. */
export function listDeals(): Deal[] {
  return [...readAll()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function loadDeal(ref: string): Deal | null {
  return readAll().find((d) => d.ref === ref) ?? null;
}

export function saveDeal(deal: Deal): Deal {
  const stamped = { ...deal, updatedAt: new Date().toISOString() };
  const all = readAll();
  const idx = all.findIndex((d) => d.ref === stamped.ref);
  if (idx >= 0) all[idx] = stamped;
  else all.push(stamped);
  writeAll(all);
  return stamped;
}

export function deleteDeal(ref: string): void {
  writeAll(readAll().filter((d) => d.ref !== ref));
}

/** Applies a patch and appends an event in one write. */
export function updateDeal(ref: string, patch: Partial<Deal>, event?: DealEvent): Deal | null {
  const current = loadDeal(ref);
  if (!current) return null;
  const next: Deal = {
    ...current,
    ...patch,
    events: event ? [...current.events, event] : current.events,
  };
  return saveDeal(next);
}

/** Records an activity-feed entry (quote viewed, option compared, etc.). */
export function logDealEvent(ref: string, label: string, by: DealEvent["by"] = "client"): void {
  const current = loadDeal(ref);
  if (!current) return;
  const last = current.events[current.events.length - 1];
  // Don't spam the feed with repeat views inside the same minute.
  if (last && last.label === label && Date.now() - Date.parse(last.at) < 60_000) return;
  saveDeal({ ...current, events: [...current.events, { at: new Date().toISOString(), label, by }] });
}

/** Remembers the deal this browser most recently worked on, for the resume banner. */
const LAST_KEY = "tx.deal.last";

export function rememberDeal(ref: string): void {
  try {
    window.localStorage.setItem(LAST_KEY, ref);
  } catch {
    /* ignore */
  }
}

export function lastDealRef(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(LAST_KEY);
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* URL encoding — lets a quote link work on a device that has no local copy    */
/* -------------------------------------------------------------------------- */

export const DEAL_PARAM = "d";

/** Compact wire form. Keys are shortened so the URL stays sane. */
type WireDeal = {
  r: string;
  c: string; // encoded estimator config
  s: DealScope;
  n: string;
  e: string;
  p: string;
  o: string; // company
  ci: string;
  sh: string;
  sd: string;
  b: string;
  t: string;
  br: string;
  st: DealStage;
  se?: string;
  cr: string; // createdAt
};

function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((input.length + 3) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeDeal(deal: Deal): string {
  const wire: WireDeal = {
    r: deal.ref,
    c: encodeConfig(deal.config),
    s: deal.scope,
    n: deal.contact.name,
    e: deal.contact.email,
    p: deal.contact.phone,
    o: deal.contact.company,
    ci: deal.city,
    sh: deal.show,
    sd: deal.showDate,
    b: deal.budget,
    t: deal.timeline,
    br: deal.brief.slice(0, 600),
    st: deal.stage,
    ...(deal.selectedOption ? { se: deal.selectedOption } : {}),
    cr: deal.createdAt,
  };
  try {
    return toBase64Url(JSON.stringify(wire));
  } catch {
    return "";
  }
}

export function decodeDeal(raw: string | null | undefined): Deal | null {
  if (!raw) return null;
  try {
    const wire = JSON.parse(fromBase64Url(raw)) as WireDeal;
    if (!wire?.r) return null;
    const config = decodeConfig(wire.c) ?? { ...DEFAULT_CONFIG };
    return createDeal({
      ref: wire.r,
      createdAt: wire.cr || new Date().toISOString(),
      stage: wire.st ?? "quoted",
      contact: { name: wire.n ?? "", email: wire.e ?? "", phone: wire.p ?? "", company: wire.o ?? "" },
      city: wire.ci ?? "",
      show: wire.sh ?? "",
      showDate: wire.sd ?? "",
      budget: wire.b ?? "",
      timeline: wire.t ?? "",
      brief: wire.br ?? "",
      config,
      scope: { ...EMPTY_SCOPE, ...(wire.s ?? {}) },
      ...(wire.se ? { selectedOption: wire.se } : {}),
      events: [{ at: new Date().toISOString(), label: "Opened from a shared quote link", by: "client" }],
    });
  } catch {
    return null;
  }
}

/** Absolute quote URL carrying the deal, so it opens anywhere. */
export function quoteUrl(deal: Deal): string {
  const origin = typeof window === "undefined" ? "https://tractionx.ca" : window.location.origin;
  return `${origin}/quote/${deal.ref}?${DEAL_PARAM}=${encodeDeal(deal)}`;
}

/** Absolute portal URL carrying the deal. */
export function portalUrl(deal: Deal): string {
  const origin = typeof window === "undefined" ? "https://tractionx.ca" : window.location.origin;
  return `${origin}/portal/${deal.ref}?${DEAL_PARAM}=${encodeDeal(deal)}`;
}

/**
 * Resolves a deal for a route: prefers the local copy (it has the full
 * history), falls back to the link payload, and adopts the link payload
 * locally so the next visit is instant.
 */
export function resolveDeal(ref: string, search: string): Deal | null {
  const local = loadDeal(ref);
  if (local) return local;
  const params = new URLSearchParams(search);
  const fromLink = decodeDeal(params.get(DEAL_PARAM));
  if (!fromLink) return null;
  return saveDeal({ ...fromLink, ref });
}
