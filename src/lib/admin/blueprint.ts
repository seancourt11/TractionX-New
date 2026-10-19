/**
 * Document blueprint — turns a few wizard answers (size, build, tier, the
 * pieces in the booth) into a fully written draft document.
 *
 * Pricing comes from `src/lib/estimator.ts` so a document always agrees with
 * the public calculator and the tier structure used across the site.
 */

import {
  BUILDS,
  FINISH,
  FOOTPRINTS,
  type BuildId,
} from "@/lib/estimator";
import type {
  DocumentRecord,
  LineItem,
  SnippetLibrary,
} from "@/data/admin-demo/types";
import { nextInvoiceNumber, randomToken } from "./doc-math";

export { FOOTPRINTS, FINISH, BUILDS };

/* -------------------------------------------------------------------------- */
/* Common booth components                                                     */
/* -------------------------------------------------------------------------- */

export type ComponentDef = {
  id: string;
  label: string;
  /** Printed under the line item on the document. */
  description: string;
  /** Unit price at the 10×20 (200 sq ft) baseline. */
  base: number;
  /** Sub-linear scaling with footprint. */
  scale: "area" | "fixture" | "flat";
  defaultQty: number;
  /** Configuration bullet written onto the document. */
  bullet: (qty: number) => string;
};

export const COMPONENTS: ComponentDef[] = [
  {
    id: "backwall",
    label: "Custom back wall with branded graphic panels",
    description: "Engineered modular structure spanning the booth width, clean-finish returns",
    base: 4200,
    scale: "area",
    defaultQty: 1,
    bullet: () => "Custom back wall — engineered modular structure spanning the full booth width, with branded graphic panels and clean-finish returns",
  },
  {
    id: "sidewalls",
    label: "Side walls",
    description: "Full-height flanking walls in the booth finish",
    base: 1900,
    scale: "area",
    defaultQty: 2,
    bullet: (q) => `${q} side wall${q > 1 ? "s" : ""} — full-height flanking walls in the same finish, framing the booth`,
  },
  {
    id: "soffit",
    label: "Soffit ceiling with recessed LED pot lights",
    description: "Full-width soffit tying the booth into one architectural volume",
    base: 3600,
    scale: "area",
    defaultQty: 1,
    bullet: () => "Full-width soffit ceiling with evenly spaced recessed LED pot lights washing the back wall graphics",
  },
  {
    id: "separator",
    label: "Centre separator frame",
    description: "Slim vertical profile dividing the booth into display zones",
    base: 900,
    scale: "fixture",
    defaultQty: 1,
    bullet: () => "Centre separator — slim vertical frame profile creating mirrored display zones without closing the booth off",
  },
  {
    id: "counter",
    label: "Custom counter with lockable storage",
    description: "Shop-built counter, levelling feet and a branded graphic face",
    base: 1450,
    scale: "fixture",
    defaultQty: 2,
    bullet: (q) => `${q} custom counter${q > 1 ? "s" : ""} — shop-built with lockable interior storage, levelling feet and a branded graphic face. Dimensions are nominal and confirmed on the approved shop drawings`,
  },
  {
    id: "stool",
    label: "Counter-height stool (rental inventory)",
    description: "Final model confirmed during the 3D design phase",
    base: 120,
    scale: "flat",
    defaultQty: 4,
    bullet: (q) => `${q} stool${q > 1 ? "s" : ""} — counter-height, coordinated to the booth finish, supplied from Traction X rental inventory`,
  },
  {
    id: "display",
    label: "Wall-mounted LED display (rental inventory)",
    description: "Approx. 55\" class with bracket, in-wall cable management and power / signal pass-through",
    base: 1250,
    scale: "flat",
    defaultQty: 2,
    bullet: (q) => `${q} wall-mounted LED display${q > 1 ? "s" : ""} — approx. 55" class, supplied from Traction X rental inventory complete with bracket, in-wall cable management and power / signal pass-through. Final screen size confirmed during the 3D design phase`,
  },
  {
    id: "platform",
    label: "Custom product display platform / pedestal",
    description: "Shop-fabricated and stanced for the client's display unit",
    base: 1700,
    scale: "fixture",
    defaultQty: 1,
    bullet: (q) => `${q} custom display platform — shop-fabricated pedestal sized and stanced for the client-supplied display unit; standard finish is matte black with an alternative accent colour available on request`,
  },
  {
    id: "lounge",
    label: "Lounge setting — sofa and coffee table",
    description: "Supplied from Traction X rental inventory",
    base: 950,
    scale: "flat",
    defaultQty: 1,
    bullet: () => "Lounge setting — sofa and rectangular coffee table supplied from Traction X rental inventory; final models and placement confirmed during the 3D design phase",
  },
  {
    id: "storage",
    label: "Lockable storage closet",
    description: "Locking door, shelving and coat rail",
    base: 1400,
    scale: "fixture",
    defaultQty: 1,
    bullet: () => "Lockable storage closet with locking door, shelving and coat rail",
  },
  {
    id: "meeting",
    label: "Enclosed meeting room",
    description: "Private walls, door and interior lighting",
    base: 3900,
    scale: "area",
    defaultQty: 1,
    bullet: () => "Enclosed meeting room — private walls, door and interior lighting",
  },
  {
    id: "flooring",
    label: "Show-floor carpet with premium underlay",
    description: "Full footprint coverage",
    base: 900,
    scale: "area",
    defaultQty: 1,
    bullet: () => "Show-floor carpet with premium underlay across the full booth footprint",
  },
  {
    id: "raised-floor",
    label: "Raised custom flooring deck",
    description: "Cable management run beneath the deck",
    base: 2600,
    scale: "area",
    defaultQty: 1,
    bullet: () => "Raised custom flooring deck with cable management run beneath the floor",
  },
  {
    id: "hanging-sign",
    label: "Hanging sign / rigged overhead structure",
    description: "Rigging plot and engineering letter; venue rigging labour excluded",
    base: 4200,
    scale: "area",
    defaultQty: 1,
    bullet: () => "Hanging sign / rigged overhead structure with rigging plot and engineering letter (rigging labour ordered through the venue contractor)",
  },
  {
    id: "hospitality",
    label: "Hospitality bar and back bar",
    description: "Bar, back bar, fridge and glassware storage",
    base: 2300,
    scale: "fixture",
    defaultQty: 1,
    bullet: () => "Hospitality package — bar, back bar, fridge and glassware storage",
  },
  {
    id: "demo",
    label: "Demo stations with lead capture",
    description: "Touch displays, kiosks and lead capture hardware",
    base: 2000,
    scale: "area",
    defaultQty: 1,
    bullet: (q) => `${q} demo station${q > 1 ? "s" : ""} with touch display and lead-capture hardware`,
  },
];

const AREA_SCALE: Record<string, number> = {
  "10x10": 0.6, "10x20": 1, "10x30": 1.3, "10x40": 1.6, "20x20": 1.7,
  "20x30": 2.3, "20x40": 2.7, "30x30": 3, activation: 3.4,
};
const FIXTURE_SCALE: Record<string, number> = {
  "10x10": 0.75, "10x20": 1, "10x30": 1.15, "10x40": 1.3, "20x20": 1.4,
  "20x30": 1.7, "20x40": 1.9, "30x30": 2, activation: 2.3,
};

export function componentUnitPrice(def: ComponentDef, footprintId: string, finishMult: number): number {
  const scale =
    def.scale === "area" ? (AREA_SCALE[footprintId] ?? 1) : def.scale === "fixture" ? (FIXTURE_SCALE[footprintId] ?? 1) : 1;
  return Math.round((def.base * scale * finishMult) / 25) * 25;
}

/* -------------------------------------------------------------------------- */
/* Blueprint → document                                                        */
/* -------------------------------------------------------------------------- */

export type DepositSplit = "80-20" | "50-50" | "50-40-10";

export type Blueprint = {
  docType: DocumentRecord["type"];
  clientName: string;
  clientContact: string;
  clientEmail: string;
  billingAddress: string;
  showName: string;
  venue: string;
  city: string;
  footprintId: string;
  customFootprint: string;
  build: BuildId;
  finishId: string;
  currency: DocumentRecord["currency"];
  taxRegionId: string;
  /** componentId → qty (0 / absent = not included). */
  components: Record<string, number>;
  extraLineItems: LineItem[];
  /** Override for the base structure price; 0 = use the model price. */
  basePriceOverride: number;
  offerEnabled: boolean;
  reducedBy: number;
  offerExpiresOn: string;
  depositSplit: DepositSplit;
  invoiceDate: string;
  signatoryName: string;
  signatoryTitle: string;
  signatoryEmail: string;
};

export function emptyBlueprint(): Blueprint {
  return {
    docType: "rental_sow",
    clientName: "",
    clientContact: "",
    clientEmail: "",
    billingAddress: "",
    showName: "",
    venue: "",
    city: "",
    footprintId: "10x20",
    customFootprint: "",
    build: "rental",
    finishId: "standard",
    currency: "CAD",
    taxRegionId: "ns",
    components: { backwall: 1, flooring: 1, counter: 2, display: 2, stool: 4 },
    extraLineItems: [],
    basePriceOverride: 0,
    offerEnabled: false,
    reducedBy: 0,
    offerExpiresOn: "",
    depositSplit: "50-50",
    invoiceDate: new Date().toISOString().slice(0, 10),
    signatoryName: "",
    signatoryTitle: "",
    signatoryEmail: "",
  };
}

export function footprintLabel(bp: Blueprint): string {
  if (bp.customFootprint.trim()) return bp.customFootprint.trim();
  return FOOTPRINTS.find((f) => f.id === bp.footprintId)?.label ?? bp.footprintId;
}

export function basePrice(bp: Blueprint): number {
  if (bp.basePriceOverride > 0) return bp.basePriceOverride;
  const fp = FOOTPRINTS.find((f) => f.id === bp.footprintId) ?? FOOTPRINTS[1];
  const fin = FINISH.find((f) => f.id === bp.finishId) ?? FINISH[0];
  // The structural shell is the footprint base less the components priced below.
  return Math.round(((bp.build === "rental" ? fp.rental : fp.custom) * fin.mult * 0.55) / 50) * 50;
}

export function blueprintLineItems(bp: Blueprint): LineItem[] {
  const fin = FINISH.find((f) => f.id === bp.finishId) ?? FINISH[0];
  const label = footprintLabel(bp);
  const items: LineItem[] = [
    {
      id: "li-base",
      label: `${label} ${bp.build === "rental" ? "custom rental exhibit" : "custom owned exhibit"} — ${fin.label} finish`,
      description:
        "3D design, shop drawings, fabrication, custom graphics, project management, round-trip freight, install and dismantle labour",
      qty: 1,
      standard: basePrice(bp),
      discounted: null,
    },
  ];

  COMPONENTS.forEach((def) => {
    const qty = bp.components[def.id] ?? 0;
    if (!qty) return;
    items.push({
      id: `li-${def.id}`,
      label: def.label,
      description: def.description,
      qty,
      standard: componentUnitPrice(def, bp.footprintId, fin.mult),
      discounted: null,
    });
  });

  return [...items, ...bp.extraLineItems];
}

export function blueprintConfiguration(bp: Blueprint): string[] {
  const fin = FINISH.find((f) => f.id === bp.finishId) ?? FINISH[0];
  const out = [
    `${footprintLabel(bp)} footprint — ${bp.build === "rental" ? "custom rental" : "custom owned"} build, ${fin.label} finish level`,
  ];
  COMPONENTS.forEach((def) => {
    const qty = bp.components[def.id] ?? 0;
    if (qty) out.push(def.bullet(qty));
  });
  out.push("Full 3D design, shop drawings and pre-stage QC");
  return out;
}

const SPLITS: Record<DepositSplit, { label: string; percent: number; dueLabel: string }[]> = {
  "80-20": [
    { label: "Deposit", percent: 80, dueLabel: "On signature — locks pricing and production capacity" },
    { label: "Balance", percent: 20, dueLabel: "Install handover, prior to show open" },
  ],
  "50-50": [
    { label: "Deposit", percent: 50, dueLabel: "On signature — releases design and production" },
    { label: "Balance", percent: 50, dueLabel: "14 days before ship date" },
  ],
  "50-40-10": [
    { label: "Deposit", percent: 50, dueLabel: "On signature — releases design and production" },
    { label: "Production draw", percent: 40, dueLabel: "Prior to ship date" },
    { label: "Balance", percent: 10, dueLabel: "Install handover, prior to show open" },
  ],
};

export function documentFromBlueprint(
  bp: Blueprint,
  snippets: SnippetLibrary,
  seq: number,
): DocumentRecord {
  const now = new Date().toISOString();
  const label = footprintLabel(bp);
  const isEstimate = bp.docType === "estimate";
  const isPurchase = bp.docType === "purchase_agreement";
  const prefix = isEstimate ? "ES" : isPurchase ? "PA" : "SW";

  return {
    id: `doc-${Date.now()}`,
    type: bp.docType,
    status: "draft",
    token: randomToken(),
    createdAt: now,
    updatedAt: now,

    title: `${bp.clientName || "New client"} — ${label} ${bp.showName || "Exhibit"} Activation`,
    clientName: bp.clientName,
    clientContact: bp.clientContact,
    clientEmail: bp.clientEmail,
    billingAddress: bp.billingAddress,

    showName: bp.showName,
    venue: bp.venue,
    city: bp.city,
    footprint: label,

    currency: bp.currency,
    taxRegionId: bp.taxRegionId,

    overview: `Traction X — Brand Experiences Inc. will design, produce, deliver, install, staff, dismantle and recover a turnkey ${label} ${
      bp.build === "rental" ? "custom rental" : "custom owned"
    } exhibit activation for ${bp.clientName || "the client"}${bp.showName ? ` at ${bp.showName}` : ""}${
      bp.city ? ` in ${bp.city}` : ""
    }. Scope includes 3D design and pre-show visualization, shop drawings and production QC, install and dismantle, on-site project management, and round-trip logistics between the Traction X production facility and ${
      bp.venue || "the venue"
    }. Exclusive show services — material handling / drayage, in-booth electrical drop, internet and stand cleaning — are excluded and must be ordered through the show's official contractors.`,

    includedServices: snippets.includedServices,
    configuration: blueprintConfiguration(bp),
    exclusions: snippets.exclusions,
    assumptions: snippets.assumptions,
    qcSteps: snippets.qcSteps,
    shipping: snippets.shipping,

    lineItems: blueprintLineItems(bp),

    offer: {
      enabled: bp.offerEnabled,
      headline: "Reduced rate — early signature",
      expiresOn: bp.offerExpiresOn,
      requiredDepositPercent: SPLITS[bp.depositSplit][0].percent,
      reducedBy: bp.reducedBy,
      conditions: bp.offerExpiresOn
        ? `The reduced rate applies only if this document is signed and the deposit placed by ${bp.offerExpiresOn}. After that date the project cost reverts to the standard rate and the payment schedule is re-issued.`
        : "The reduced rate applies only if the document is signed and the deposit placed by the date above.",
    },

    paymentStages: SPLITS[bp.depositSplit].map((s, i) => ({ id: `s${i + 1}`, ...s })),

    invoiceNumber: nextInvoiceNumber(bp.clientName || "Client", seq, prefix),
    invoiceDate: bp.invoiceDate,
    ...(bp.signatoryName ? { signatoryName: bp.signatoryName } : {}),
    ...(bp.signatoryTitle ? { signatoryTitle: bp.signatoryTitle } : {}),
    ...(bp.signatoryEmail ? { signatoryEmail: bp.signatoryEmail } : {}),
    events: [{ at: now, label: "Draft generated from the new-document wizard" }],
  };
}
