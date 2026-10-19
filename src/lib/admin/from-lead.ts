import type { DocumentRecord, Lead, SnippetLibrary } from "@/data/admin-demo/types";
import { nextInvoiceNumber, randomToken } from "./doc-math";

/**
 * Turns an accepted lead into a pre-filled draft document.
 *
 * This is the "no re-typing" step: everything the quote flow already captured
 * (footprint, tier, add-ons, city, show, estimate) lands on the document, and
 * the PM only edits what is wrong.
 */

const US_HINT = /(,\s*[A-Z]{2}$)|USA|United States|Las Vegas|Chicago|Orlando|Atlanta|Anaheim|New York|Boston|Dallas|Houston|Denver|Miami|Phoenix|Seattle|San /i;

const PROVINCE_TO_REGION: Record<string, string> = {
  "british columbia": "bc",
  vancouver: "bc",
  victoria: "bc",
  burnaby: "bc",
  alberta: "ab",
  calgary: "ab",
  edmonton: "ab",
  "nova scotia": "ns",
  halifax: "ns",
  moncton: "ns",
  ontario: "on",
  toronto: "on",
  ottawa: "on",
  mississauga: "on",
  quebec: "qc",
  montreal: "qc",
  "montréal": "qc",
};

export function guessTaxRegion(city: string): string {
  const key = city.toLowerCase();
  for (const [needle, region] of Object.entries(PROVINCE_TO_REGION)) {
    if (key.includes(needle)) return region;
  }
  return US_HINT.test(city) ? "us" : "bc";
}

export function documentFromLead(
  lead: Lead,
  snippets: SnippetLibrary,
  seq: number,
  type: DocumentRecord["type"] = "rental_sow",
): DocumentRecord {
  const isPurchase = type === "purchase_agreement";
  const now = new Date().toISOString();
  const addonTotal = Math.round(lead.estimate * 0.22);
  const base = lead.estimate - addonTotal;

  return {
    id: `doc-${Date.now()}`,
    type,
    status: "draft",
    token: randomToken(),
    createdAt: now,
    updatedAt: now,
    leadId: lead.id,

    title: isPurchase
      ? `${lead.company} — ${lead.footprint} Portable Package`
      : `${lead.company} — ${lead.footprint} ${lead.showName || "Show"} Activation`,
    clientName: lead.company || lead.name,
    clientContact: lead.name,
    clientEmail: lead.email,
    billingAddress: lead.city,

    showName: lead.showName,
    venue: "",
    city: lead.city,
    footprint: lead.footprint,

    currency: lead.currency,
    taxRegionId: guessTaxRegion(lead.city),

    overview: isPurchase
      ? `Traction X will produce and deliver a ${lead.footprint} portable display package for ${lead.company}. The client owns all hardware and graphics on final payment.`
      : `Traction X will design, fabricate, ship, install and dismantle a ${lead.footprint} custom rental exhibit for ${lead.company} at ${lead.showName || "the show"}${lead.city ? ` in ${lead.city}` : ""}. All structure remains Traction X-owned rental inventory; graphics are produced new for this activation.`,

    includedServices: isPurchase
      ? [
          "Design, layout and 3D visualization",
          "Custom-printed graphics on client-owned hardware",
          "Hardware, hardcases and packing",
          "Setup instructions and packing diagram",
          "Outbound shipping to a single destination",
        ]
      : snippets.includedServices,
    configuration: [
      `${lead.footprint} footprint`,
      `${lead.tier} finish level`,
      ...lead.addons,
    ],
    exclusions: isPurchase
      ? [
          "Material handling / drayage",
          "On-site installation labour (portables are exhibitor-assembled)",
          "Electrical, internet and rigging services at the venue",
          "Return shipping and storage",
        ]
      : snippets.exclusions,
    assumptions: snippets.assumptions,
    qcSteps: isPurchase
      ? [
          "Digital colour proof issued for written approval before print",
          "Assembled fit-check photographed prior to packing",
        ]
      : snippets.qcSteps,
    shipping: isPurchase
      ? [
          "Production: 7–12 business days after written artwork approval",
          "Outbound: Traction X facility → client-specified address",
          "Title and risk pass to the client on delivery and final payment",
        ]
      : snippets.shipping,

    lineItems: [
      {
        id: "li-base",
        label: isPurchase
          ? `${lead.footprint} portable package — hardware, graphics and cases`
          : `${lead.footprint} custom rental exhibit — ${lead.tier} finish, incl. install & dismantle`,
        standard: base,
        discounted: null,
      },
      ...(lead.addons.length
        ? [
            {
              id: "li-addons",
              label: `Add-ons — ${lead.addons.join(", ")}`,
              standard: addonTotal,
              discounted: null,
            },
          ]
        : []),
      ...(lead.rushApplied
        ? [
            {
              id: "li-rush",
              label: "Expedited production surcharge (show inside 30 days) — waivable by PM",
              standard: Math.round(lead.estimate * 0.3),
              discounted: null,
            },
          ]
        : []),
    ],

    offer: {
      enabled: false,
      headline: "Early-commitment pricing",
      expiresOn: "",
      requiredDepositPercent: 50,
      conditions:
        "Discounted rates are held only if the deposit is received by the date above; standard rates apply thereafter.",
    },

    paymentStages: isPurchase
      ? [
          { id: "s1", label: "Deposit", percent: 50, dueLabel: "On signing — releases artwork production" },
          { id: "s2", label: "Balance", percent: 50, dueLabel: "Prior to shipment" },
        ]
      : [
          { id: "s1", label: "Deposit", percent: 50, dueLabel: "On signing — releases design and production" },
          { id: "s2", label: "Balance", percent: 50, dueLabel: "14 days before ship date" },
        ],

    invoiceNumber: nextInvoiceNumber(lead.company || lead.name, seq, isPurchase ? "PA" : "SW"),
    invoiceDate: now.slice(0, 10),
    events: [{ at: now, label: `Draft generated from lead — ${lead.name}` }],
  };
}

export function blankDocument(
  snippets: SnippetLibrary,
  seq: number,
  type: DocumentRecord["type"] = "rental_sow",
): DocumentRecord {
  const now = new Date().toISOString();
  return {
    id: `doc-${Date.now()}`,
    type,
    status: "draft",
    token: randomToken(),
    createdAt: now,
    updatedAt: now,
    title: "Untitled document",
    clientName: "",
    clientContact: "",
    clientEmail: "",
    billingAddress: "",
    showName: "",
    venue: "",
    city: "",
    footprint: "",
    currency: "CAD",
    taxRegionId: "bc",
    overview: "",
    includedServices: type === "rental_sow" ? snippets.includedServices : [],
    configuration: [],
    exclusions: type === "rental_sow" ? snippets.exclusions : [],
    assumptions: snippets.assumptions,
    qcSteps: snippets.qcSteps,
    shipping: snippets.shipping,
    lineItems: [{ id: "li-1", label: "", standard: 0, discounted: null }],
    offer: {
      enabled: false,
      headline: "Early-commitment pricing",
      expiresOn: "",
      requiredDepositPercent: 50,
      conditions:
        "Discounted rates are held only if the deposit is received by the date above; standard rates apply thereafter.",
    },
    paymentStages: [
      { id: "s1", label: "Deposit", percent: 50, dueLabel: "On signing" },
      { id: "s2", label: "Balance", percent: 50, dueLabel: "14 days before ship date" },
    ],
    invoiceNumber: nextInvoiceNumber("Client", seq, type === "purchase_agreement" ? "PA" : "SW"),
    invoiceDate: now.slice(0, 10),
    events: [{ at: now, label: "Blank draft created" }],
  };
}
