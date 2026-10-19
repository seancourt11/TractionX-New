/**
 * Client-side PDF generation.
 *
 * Two documents, both built in the browser at click time so they always
 * reflect the pricing currently shown on the site:
 *   1. The 2026 Booth Pricing Guide (lead magnet).
 *   2. A visitor's own cost-estimator breakdown.
 */

import { jsPDF } from "jspdf";
import {
  GUIDE_YEAR,
  REGION_LABEL,
  REGION_CURRENCY,
  tiersFor,
  notIncludedFor,
  showServicesFor,
  PRICING_INCLUDED,
  SPEC_TIERS,
  tierPrice,
  PRICING_RANGE_DRIVERS,
  PRICING_COST_SAVERS,
  type PricingRegion,
} from "@/data/pricing-tiers";
import {
  calculate,
  describeConfig,
  money,
  ESTIMATE_NOTE,
  type EstimatorConfig,
} from "@/lib/estimator";
import {
  PLAN_BUDGET,
  PLAN_OWNERSHIP,
  PLAN_SPACES,
  PLAN_TIMELINE,
  PROFILE_LABEL,
  boothProfile,
  investmentRange,
  recommend,
  servicesRange,
  type PlanAnswers,
  type ProfileKey,
} from "@/lib/booth-plan";
import { SITE } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/* Shared layout primitives                                                    */
/* -------------------------------------------------------------------------- */

const PAGE_W = 210; // A4 mm
const PAGE_H = 297;
const M = 16; // margin
const CONTENT_W = PAGE_W - M * 2;

const PURPLE: [number, number, number] = [124, 77, 190];
const INK: [number, number, number] = [24, 24, 27];
const MUTED: [number, number, number] = [110, 110, 120];
const RULE: [number, number, number] = [222, 222, 230];

type Doc = { pdf: jsPDF; y: number };

function newDoc(): Doc {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  return { pdf, y: 0 };
}

/** Adds a page when the next block wouldn't fit above the footer band. */
function ensure(d: Doc, needed: number) {
  if (d.y + needed > PAGE_H - 18) {
    d.pdf.addPage();
    d.y = M;
  }
}

function header(d: Doc, title: string, subtitle: string) {
  const { pdf } = d;
  pdf.setFillColor(...INK);
  pdf.rect(0, 0, PAGE_W, 34, "F");

  pdf.setFillColor(...PURPLE);
  pdf.rect(0, 34, PAGE_W, 1.6, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(19);
  pdf.text(title.toUpperCase(), M, 17);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(190, 190, 200);
  pdf.text(subtitle, M, 25);

  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text(SITE.name.toUpperCase(), PAGE_W - M, 17, { align: "right" });
  pdf.setTextColor(190, 190, 200);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.text(SITE.phoneDisplay, PAGE_W - M, 22.5, { align: "right" });
  pdf.text(SITE.email, PAGE_W - M, 26.5, { align: "right" });

  d.y = 43;
}

function sectionTitle(d: Doc, text: string) {
  ensure(d, 16);
  const { pdf } = d;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(...INK);
  pdf.text(text.toUpperCase(), M, d.y);
  d.y += 2.6;
  pdf.setDrawColor(...PURPLE);
  pdf.setLineWidth(0.5);
  pdf.line(M, d.y, M + 22, d.y);
  d.y += 5;
}

function body(d: Doc, text: string, size = 9) {
  const { pdf } = d;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(size);
  pdf.setTextColor(...MUTED);
  const lines = pdf.splitTextToSize(text, CONTENT_W) as string[];
  ensure(d, lines.length * (size * 0.42) + 3);
  pdf.text(lines, M, d.y);
  d.y += lines.length * (size * 0.42) + 3;
}

function bullets(d: Doc, items: string[]) {
  const { pdf } = d;
  pdf.setFontSize(9);
  for (const item of items) {
    const lines = pdf.splitTextToSize(item, CONTENT_W - 6) as string[];
    ensure(d, lines.length * 4 + 1.5);
    pdf.setTextColor(...PURPLE);
    pdf.setFont("helvetica", "bold");
    pdf.text("•", M + 0.5, d.y);
    pdf.setTextColor(...MUTED);
    pdf.setFont("helvetica", "normal");
    pdf.text(lines, M + 5, d.y);
    d.y += lines.length * 4 + 1;
  }
  d.y += 2;
}

/** Two-column label/value rows with hairline separators. */
function rows(d: Doc, data: [string, string][], labelW = CONTENT_W * 0.62) {
  const { pdf } = d;
  pdf.setFontSize(9);
  for (const [label, value] of data) {
    const labelLines = pdf.splitTextToSize(label, labelW - 4) as string[];
    const h = Math.max(labelLines.length * 4, 5) + 2;
    ensure(d, h);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(...INK);
    pdf.text(labelLines, M, d.y);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...PURPLE);
    pdf.text(value, PAGE_W - M, d.y, { align: "right" });
    d.y += h;
    pdf.setDrawColor(...RULE);
    pdf.setLineWidth(0.2);
    pdf.line(M, d.y - 2.2, PAGE_W - M, d.y - 2.2);
  }
  d.y += 3;
}

function footer(pdf: jsPDF) {
  const pages = pdf.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    pdf.setDrawColor(...RULE);
    pdf.setLineWidth(0.2);
    pdf.line(M, PAGE_H - 16, PAGE_W - M, PAGE_H - 16);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(...MUTED);
    pdf.text(
      `${SITE.name} · ${SITE.phoneDisplay} · ${SITE.email} · ${SITE.url.replace(/^https?:\/\//, "")}`,
      M,
      PAGE_H - 11,
    );
    pdf.text(`Page ${i} of ${pages}`, PAGE_W - M, PAGE_H - 11, { align: "right" });
  }
}

function disclaimer(d: Doc) {
  ensure(d, 15);
  const { pdf } = d;
  pdf.setFillColor(246, 246, 249);
  const lines = pdf.splitTextToSize(ESTIMATE_NOTE, CONTENT_W - 8) as string[];
  const h = lines.length * 3.4 + 6;
  pdf.rect(M, d.y - 4, CONTENT_W, h, "F");
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.2);
  pdf.setTextColor(...MUTED);
  pdf.text(lines, M + 4, d.y + 1);
  d.y += h;
}

function ctaBand(d: Doc, heading: string, sub: string) {
  ensure(d, 26);
  const { pdf } = d;
  pdf.setFillColor(...INK);
  pdf.rect(M, d.y - 4, CONTENT_W, 23, "F");
  pdf.setFillColor(...PURPLE);
  pdf.rect(M, d.y - 4, 1.6, 23, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(255, 255, 255);
  pdf.text(heading, M + 7, d.y + 4);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(200, 200, 210);
  const lines = pdf.splitTextToSize(sub, CONTENT_W - 14) as string[];
  pdf.text(lines.slice(0, 2), M + 7, d.y + 10);

  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8.5);
  pdf.text(`${SITE.phoneDisplay}  ·  ${SITE.email}`, M + 7, d.y + 17);

  d.y += 24;
}

function save(pdf: jsPDF, filename: string) {
  pdf.save(filename);
}

/* -------------------------------------------------------------------------- */
/* 1. Booth Rental Pricing Guide (USA + Canada editions)                       */
/* -------------------------------------------------------------------------- */

export function generatePricingGuide(
  recipientName?: string,
  region: PricingRegion = "us",
): void {
  const d = newDoc();
  const year = GUIDE_YEAR;
  const editionLabel = REGION_LABEL[region];
  const tiers = tiersFor(region);

  header(
    d,
    `${year} Custom Booth Rental Pricing Guide`,
    recipientName
      ? `Prepared for ${recipientName} · ${editionLabel} · ${REGION_CURRENCY[region]}`
      : `${editionLabel} · ${REGION_CURRENCY[region]}`,
  );

  body(
    d,
    region === "ca"
      ? `Most exhibit companies make you request a quote to learn anything. We publish our starting ranges so you can budget today. Every figure below is a starting point for a fully custom-fabricated booth at a Canadian show, quoted in Canadian dollars — preliminary concept direction and investment come from a designer within two business days once you send your show, footprint and dates. Full design development follows as the scope is confirmed. ${year} space is being contracted now — the best fabrication windows go first.`
      : `Most exhibit companies make you request a quote to learn anything. We publish our starting ranges so you can budget today. Every figure below is a starting point for a fully custom-fabricated booth at a US show, quoted in US dollars — preliminary concept direction and investment come from a designer within two business days once you send your show, footprint and dates. Full design development follows as the scope is confirmed. ${year} space is being contracted now — the best fabrication windows go first.`,
  );

  d.y += 2;

  sectionTitle(d, "Starting-from prices by footprint and build level");
  body(
    d,
    "Every footprint is quoted at four build levels, and every figure is a starting-from price. What moves a project up a level is the amount of structure, the depth of customisation, the materials specified, and how much AV and lighting is integrated into the build.",
    8,
  );
  d.y += 1;

  // Table header
  const colX = [M, M + 96, M + 140];
  d.pdf.setFillColor(...INK);
  d.pdf.rect(M, d.y - 4.5, CONTENT_W, 8, "F");
  d.pdf.setFont("helvetica", "bold");
  d.pdf.setFontSize(7.5);
  d.pdf.setTextColor(255, 255, 255);
  d.pdf.text("BOOTH SIZE / BUILD LEVEL", colX[0] + 2, d.y);
  d.pdf.text("CUSTOM RENTAL FROM", colX[1], d.y);
  d.pdf.text("OWNED BUILD FROM", colX[2], d.y);
  d.y += 7;

  for (const t of tiers) {
    ensure(d, 22);
    d.pdf.setFont("helvetica", "bold");
    d.pdf.setFontSize(8.8);
    d.pdf.setTextColor(...INK);
    d.pdf.text(`${t.size}  ·  ${t.sqft}`, colX[0] + 2, d.y);
    d.y += 4.4;

    for (const spec of SPEC_TIERS) {
      ensure(d, 5.5);
      d.pdf.setFont("helvetica", spec.level === 1 ? "bold" : "normal");
      d.pdf.setFontSize(8);
      d.pdf.setTextColor(...INK);
      d.pdf.text(`${spec.short} — from`, colX[0] + 4, d.y);
      d.pdf.setFont("helvetica", "bold");
      d.pdf.setFontSize(8.4);
      d.pdf.setTextColor(...PURPLE);
      d.pdf.text(tierPrice(t.rental, spec.multiplier), colX[1], d.y);
      d.pdf.setTextColor(...INK);
      d.pdf.text(tierPrice(t.custom, spec.multiplier), colX[2], d.y);
      d.y += 4.1;
    }

    d.pdf.setDrawColor(...RULE);
    d.pdf.setLineWidth(0.2);
    d.pdf.line(M, d.y - 0.5, PAGE_W - M, d.y - 0.5);
    d.y += 2.6;
  }


  sectionTitle(d, "What each build level includes");
  bullets(d, SPEC_TIERS.map((s) => `${s.label} — ${s.blurb}`));


  sectionTitle(d, "Included in every rental price");
  bullets(d, PRICING_INCLUDED);

  sectionTitle(d, "Billed separately — and by whom");


  for (const [label, note] of notIncludedFor(region)) {
    const noteLines = d.pdf.splitTextToSize(note, CONTENT_W - 4) as string[];
    ensure(d, noteLines.length * 3.4 + 8);
    d.pdf.setFont("helvetica", "bold");
    d.pdf.setFontSize(8.8);
    d.pdf.setTextColor(...INK);
    d.pdf.text(label, M, d.y);
    d.y += 3.8;
    d.pdf.setFont("helvetica", "normal");
    d.pdf.setFontSize(7.8);
    d.pdf.setTextColor(...MUTED);
    d.pdf.text(noteLines, M, d.y);
    d.y += noteLines.length * 3.4 + 3.5;
  }

  sectionTitle(d, "What show services really add");
  body(
    d,
    "Show services are ordered through the venue's general contractor, not through us. We coordinate and optimise them, but the invoice is theirs. Budget for them on top of booth cost:",
  );
  rows(d, showServicesFor(region));
  body(
    d,
    "Booking early matters more than negotiating: hitting the venue's advance-order deadlines is typically worth 20–35% on show services by itself.",
    8,
  );

  body(
    d,
    "Only one way to get your real number: ask us. Every booth is custom, so these are starting ranges — one email or call with your show, footprint and dates gets preliminary concept direction and investment within two business days, no obligation. Full design development follows as the scope is confirmed.",
    8,
  );
  d.y += 2;




  sectionTitle(d, "What moves the price within a range");
  bullets(d, PRICING_RANGE_DRIVERS);


  sectionTitle(d, "Six ways to spend less without shrinking your presence");
  bullets(d, PRICING_COST_SAVERS);

  ctaBand(
    d,
    "Get your exact quote — plus a complimentary 3D design",
    "These ranges are starting points only. Send us your show, footprint and dates and a Traction X designer acknowledges your brief within one business day, then sends preliminary concept direction and investment within two business days. Full photoreal design develops as the scope is confirmed, free and yours to keep.",
  );


  disclaimer(d);
  footer(d.pdf);
  save(
    d.pdf,
    `Traction-X-${year}-Custom-Booth-Rental-Pricing-Guide-${region === "ca" ? "Canada" : "USA"}.pdf`,
  );
}


/* -------------------------------------------------------------------------- */
/* 2. Personalised estimate breakdown                                          */
/* -------------------------------------------------------------------------- */

export function generateEstimateBreakdown(
  config: EstimatorConfig,
  opts?: { name?: string; shareUrl?: string },
): void {
  const d = newDoc();
  const desc = describeConfig(config);
  const calc = calculate(config);
  const dated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  header(
    d,
    "Your Booth Estimate",
    opts?.name ? `Prepared for ${opts.name} · ${dated}` : `Prepared ${dated}`,
  );

  sectionTitle(d, "Your configuration");
  rows(d, [
    ["Booth footprint", `${desc.footprint} (${desc.sqft} sq ft)`],
    ["Rental or owned", desc.build],
    ["Finish level", desc.finish],
    ["Show city tier", desc.city],
    ["Shows per year", String(desc.shows)],
  ]);

  sectionTitle(d, "Selected add-ons");
  if (desc.addons.length) {
    rows(
      d,
      desc.addons.map((a) => [a.label, `+${money(a.cost)}`] as [string, string]),
    );
    body(
      d,
      "Add-on pricing is scaled to your footprint — these carry fixed setup cost, so they do not scale linearly with booth size.",
      7.8,
    );
  } else {
    body(d, "No add-ons selected. The figures below cover the booth and standard show services only.");
  }

  sectionTitle(d, "Cost breakdown, per show");
  rows(d, [
    ["Booth — design, fabrication, graphics, lighting, project management", `${money(calc.boothLow)} – ${money(calc.boothHigh)}`],
    ["Show services — drayage, electrical, rigging", `${money(calc.servicesLow)} – ${money(calc.servicesHigh)}`],
  ]);

  // All-in highlight
  ensure(d, 26);
  d.pdf.setFillColor(243, 238, 252);
  d.pdf.rect(M, d.y - 4, CONTENT_W, 22, "F");
  d.pdf.setFillColor(...PURPLE);
  d.pdf.rect(M, d.y - 4, 1.6, 22, "F");
  d.pdf.setFont("helvetica", "normal");
  d.pdf.setFontSize(7.5);
  d.pdf.setTextColor(...MUTED);
  d.pdf.text("ALL-IN, PER SHOW", M + 7, d.y + 2);
  d.pdf.setFont("helvetica", "bold");
  d.pdf.setFontSize(17);
  d.pdf.setTextColor(...PURPLE);
  d.pdf.text(`${money(calc.perShowLow)} – ${money(calc.perShowHigh)}`, M + 7, d.y + 11);
  d.pdf.setFont("helvetica", "normal");
  d.pdf.setFontSize(7);
  d.pdf.setTextColor(...MUTED);
  d.pdf.text("Before any early-bird or multi-show discounts.", M + 7, d.y + 15.5);
  d.y += 26;

  if (config.shows > 1) {
    sectionTitle(d, `Annual programme — ${config.shows} shows`);
    rows(d, [
      [
        config.build === "custom"
          ? "Owned structure amortised across shows, plus refurbishment and round-trip freight"
          : "Each show priced fresh — no storage, refurbishment or return freight",
        `${money(calc.annualLow)} – ${money(calc.annualHigh)}`,
      ],
    ]);
  }

  sectionTitle(d, "What happens next");
  bullets(d, [
    "A senior project manager reviews this configuration against your actual show, venue and dates.",
    "We confirm which show services your venue's contractor controls, and file those orders on your behalf.",
    "You get a complimentary photoreal 3D concept of the booth — no cost, no obligation, yours to keep.",
    "Final pricing is confirmed in writing before anything is committed.",
  ]);

  if (opts?.shareUrl) {
    sectionTitle(d, "Revisit this estimate");
    body(
      d,
      "This exact configuration is saved in the link below. Open it to adjust the inputs, or send it to a colleague:",
      8,
    );
    ensure(d, 10);
    d.pdf.setFont("helvetica", "normal");
    d.pdf.setFontSize(7.5);
    d.pdf.setTextColor(...PURPLE);
    const urlLines = d.pdf.splitTextToSize(opts.shareUrl, CONTENT_W) as string[];
    d.pdf.text(urlLines, M, d.y);
    d.y += urlLines.length * 3.4 + 4;
  }

  ctaBand(
    d,
    "Next step: get your exact price — send this estimate to us",
    "This is a budgeting estimate, not a quote. Email or call us with your show and dates and a designer acknowledges your brief within one business day, then confirms preliminary concept direction and investment within two business days — plus a complimentary photoreal 3D concept as the scope develops.",
  );


  disclaimer(d);
  footer(d.pdf);
  save(d.pdf, `Traction-X-Booth-Estimate-${desc.footprint.replace(/×/g, "x").replace(/[^\dx]/gi, "") || "custom"}.pdf`);
}

/* -------------------------------------------------------------------------- */
/* 3. Recommended Booth Plan (needs analyzer output)                           */
/* -------------------------------------------------------------------------- */

export function generateBoothPlan(
  answers: PlanAnswers,
  contact?: { name?: string; company?: string; email?: string },
): void {
  const d = newDoc();
  const rec = recommend(answers);
  const range = investmentRange(answers);
  const services = servicesRange(answers);
  const profile = boothProfile(answers);
  const space = PLAN_SPACES.find((s) => s.value === answers.space);

  header(
    d,
    "Your recommended exhibit plan",
    [contact?.company || contact?.name, answers.show, answers.city]
      .filter(Boolean)
      .join("  ·  ") || "Prepared by Traction X",
  );

  // Recommendation headline block
  ensure(d, 30);
  d.pdf.setFillColor(243, 238, 252);
  d.pdf.rect(M, d.y - 4, CONTENT_W, 26, "F");
  d.pdf.setFillColor(...PURPLE);
  d.pdf.rect(M, d.y - 4, 1.6, 26, "F");
  d.pdf.setFont("helvetica", "normal");
  d.pdf.setFontSize(7.5);
  d.pdf.setTextColor(...MUTED);
  d.pdf.text("RECOMMENDED SOLUTION", M + 7, d.y + 2);
  d.pdf.setFont("helvetica", "bold");
  d.pdf.setFontSize(14);
  d.pdf.setTextColor(...INK);
  const headLines = d.pdf.splitTextToSize(rec.headline, CONTENT_W - 14) as string[];
  d.pdf.text(headLines.slice(0, 2), M + 7, d.y + 10);
  d.pdf.setFont("helvetica", "normal");
  d.pdf.setFontSize(8);
  d.pdf.setTextColor(...MUTED);
  d.pdf.text(`Construction approach: ${rec.construction}`, M + 7, d.y + 18);
  d.y += 30;

  sectionTitle(d, "Why this approach");
  body(d, rec.why);

  sectionTitle(d, "Suggested booth elements");
  bullets(d, rec.elements);

  sectionTitle(d, "Your booth profile");
  rows(
    d,
    (Object.keys(profile) as ProfileKey[]).map(
      (k) => [PROFILE_LABEL[k], `${profile[k]} / 10`] as [string, string],
    ),
  );

  sectionTitle(d, "Estimated investment");
  body(
    d,
    `Projects with this combination of size, features and service level typically fall in the range below. It covers design, fabrication, graphics, lighting and project management, with install and dismantle labour included.`,
  );
  rows(d, [
    [`Exhibit — ${space?.label ?? "your footprint"}, ${rec.construction.toLowerCase()}`, range.label],
    ["Show services — drayage, electrical, rigging (billed by the venue's contractor)", services.label],
  ]);

  sectionTitle(d, "Project snapshot");
  rows(d, [
    ["Event", answers.show || "To be confirmed"],
    ["City", answers.city || "To be confirmed"],
    ["Booth number", answers.boothNumber || "—"],
    ["Service level", rec.serviceLine],
    ["Timeline", PLAN_TIMELINE.find((t) => t.value === answers.timeline)?.label ?? "—"],
    ["Rent or purchase", PLAN_OWNERSHIP.find((o) => o.value === answers.ownership)?.label ?? "—"],
    ["Budget band", PLAN_BUDGET.find((b) => b.value === answers.budget)?.label ?? "—"],
  ]);

  if (rec.rush) {
    sectionTitle(d, "Rush schedule");
    body(
      d,
      "Your show is inside four weeks. We can still build it — expedited fabrication, graphics and freight carry a rush premium of up to 30%, and drayage deadlines at the venue are already close. Call us today rather than emailing.",
    );
  }

  sectionTitle(d, "What happens next");
  bullets(d, [
    "A senior project manager reviews this plan against your show, venue rules and dates.",
    "You get a complimentary photoreal 3D concept of this booth — no cost, no obligation, yours to keep.",
    "We confirm which show services the venue's contractor controls and file those orders for you.",
    "Final pricing is confirmed in writing before anything is committed.",
  ]);

  ctaBand(
    d,
    "Next step: a 20-minute exhibit strategy call",
    "Bring this plan to the call and we'll show you what we would build inside your range — including two comparable projects we've already delivered at your footprint.",
  );

  disclaimer(d);
  footer(d.pdf);
  save(
    d.pdf,
    `Traction-X-Booth-Plan-${(space?.label ?? "custom").replace(/×/g, "x").replace(/[^\dx]/gi, "") || "custom"}.pdf`,
  );
}
