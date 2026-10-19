/* ==========================================================================
 *  LEAD CAPTURE — BACKEND INTEGRATION POINT
 * ==========================================================================
 *
 *  Every lead-producing form, gate and download on this site funnels through
 *  `submitLead()` below. Nothing else in the codebase talks to a lead backend.
 *
 *  TO GO LIVE ON YOUR OWN INFRASTRUCTURE:
 *  Replace the body of `deliverLead()` (marked further down) with a fetch to
 *  your endpoint. That is the only change required — every form on the site
 *  will immediately start posting to you, with a `source` field identifying
 *  which form and which page it came from.
 *
 *      async function deliverLead(lead: StoredLead): Promise<void> {
 *        const res = await fetch("https://api.tractionx.ca/leads", {
 *          method: "POST",
 *          headers: { "Content-Type": "application/json" },
 *          body: JSON.stringify(lead),
 *        });
 *        if (!res.ok) throw new Error(`Lead POST failed: ${res.status}`);
 *      }
 *
 *  Until then, leads are validated, stamped and kept in localStorage so
 *  nothing submitted during the pre-launch period is lost. Call
 *  `exportLeads()` from the browser console to pull them out as JSON, or
 *  `downloadLeadsCsv()` to get a spreadsheet.
 * ========================================================================== */

import { z } from "zod";

import { track, trackSmsOptIn } from "@/lib/analytics";

/* -------------------------------------------------------------------------- */
/* Schema                                                                      */
/* -------------------------------------------------------------------------- */

const trimmed = (max: number) => z.string().trim().max(max);

export const leadSchema = z.object({
  /** Which form/page produced this lead. Always set it. */
  source: trimmed(120).min(1, "Source is required"),

  name: trimmed(100).optional(),
  email: trimmed(255).email("Enter a valid email address"),
  phone: trimmed(30).optional(),
  company: trimmed(120).optional(),

  /** Booth footprint, e.g. "10×20". */
  footprint: trimmed(60).optional(),
  /** Show city, e.g. "Las Vegas". */
  city: trimmed(100).optional(),
  /** Show or event name, e.g. "CES 2027". */
  show: trimmed(120).optional(),

  /** Free-text notes from the visitor. */
  message: trimmed(2000).optional(),

  /** Visitor opted into the complimentary 3D design. */
  wants3D: z.boolean().optional(),

  /** Express consent to receive project text messages (never pre-checked). */
  smsOptIn: z.boolean().optional(),
  /** The exact consent wording shown at submit time — kept for compliance. */
  smsConsentText: trimmed(400).optional(),

  /**
   * Anything structured worth keeping — most importantly the full cost
   * estimator configuration when the lead came from the calculator.
   */
  meta: z.record(z.string(), z.unknown()).optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;

/** A validated lead plus the context we stamp on at submit time. */
export type StoredLead = LeadPayload & {
  id: string;
  submittedAt: string;
  page: string;
  referrer: string;
  userAgent: string;
};

export type LeadResult =
  | { ok: true; lead: StoredLead }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/* -------------------------------------------------------------------------- */
/* Storage                                                                     */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = "tx.leads.v1";
const MAX_STORED = 500;

function readStored(): StoredLead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredLead[]) : [];
  } catch {
    return [];
  }
}

function writeStored(leads: StoredLead[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads.slice(-MAX_STORED)));
  } catch {
    /* quota or private mode — the lead still reached deliverLead() */
  }
}

/* -------------------------------------------------------------------------- */
/* Delivery — REPLACE THIS BODY WHEN YOUR BACKEND IS LIVE                      */
/* -------------------------------------------------------------------------- */

async function deliverLead(lead: StoredLead): Promise<void> {
  const existing = readStored();
  writeStored([...existing, lead]);

  if (typeof console !== "undefined") {
    console.info(
      `%c[Traction X lead]%c ${lead.source} — ${lead.email}`,
      "background:oklch(0.78 0.13 300);color:#000;padding:2px 6px;border-radius:3px;font-weight:600",
      "color:inherit",
      lead,
    );
  }
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                  */
/* -------------------------------------------------------------------------- */

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

/**
 * Validate and record a lead. Never throws — inspect the returned result.
 * Strips empty-string optionals so the payload stays clean.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const cleaned = Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v !== "" && v !== undefined && v !== null),
  ) as LeadPayload;

  const parsed = leadSchema.safeParse(cleaned);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Please check the details you entered.",
      fieldErrors,
    };
  }

  const lead: StoredLead = {
    ...parsed.data,
    id: newId(),
    submittedAt: new Date().toISOString(),
    page: typeof window === "undefined" ? "" : window.location.pathname + window.location.search,
    referrer: typeof document === "undefined" ? "" : document.referrer,
    userAgent: typeof navigator === "undefined" ? "" : navigator.userAgent,
  };

  try {
    await deliverLead(lead);
    // Central conversion event — every form on the site routes through here,
    // so no capture point can be missed in GA4.
    track("generate_lead", {
      cta_source: lead.source,
      footprint: lead.footprint,
      city: lead.city,
      show: lead.show,
      wants_3d: lead.wants3D === true,
      sms_opt_in: lead.smsOptIn === true,
      page_path: lead.page,
    });
    if (lead.smsOptIn) trackSmsOptIn(lead.source);
    return { ok: true, lead };

  } catch (err) {
    console.error("[Traction X lead] delivery failed", err);
    return { ok: false, error: "Something went wrong sending that. Please try again." };
  }
}

/* -------------------------------------------------------------------------- */
/* Console helpers — for pulling pre-launch leads out of the browser           */
/* -------------------------------------------------------------------------- */

/** Returns every lead captured in this browser. */
export function exportLeads(): StoredLead[] {
  return readStored();
}

/** Clears captured leads from this browser. */
export function clearLeads(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

const CSV_COLUMNS = [
  "submittedAt",
  "source",
  "name",
  "email",
  "phone",
  "company",
  "footprint",
  "city",
  "show",
  "wants3D",
  "message",
  "page",
  "referrer",
] as const;

function csvCell(value: unknown): string {
  if (value === undefined || value === null) return "";
  const s = typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Downloads all captured leads as a CSV. Run from the browser console. */
export function downloadLeadsCsv(): void {
  const leads = readStored();
  const header = [...CSV_COLUMNS, "meta"].join(",");
  const rows = leads.map((lead) =>
    [...CSV_COLUMNS.map((c) => csvCell(lead[c])), csvCell(lead.meta)].join(","),
  );
  const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `traction-x-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Expose the helpers on window so they're reachable from the console.
if (typeof window !== "undefined") {
  Object.assign(window as unknown as Record<string, unknown>, {
    txExportLeads: exportLeads,
    txDownloadLeadsCsv: downloadLeadsCsv,
    txClearLeads: clearLeads,
  });
}
