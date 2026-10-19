/**
 * The Traction X Promise — single source of truth.
 *
 * Every promise surface (CTA strips, hero bar, /our-promise) reads from this
 * file so the wording never drifts between pages. Do not restate these
 * commitments in page copy with different numbers or terms.
 */

export type Promise7 = {
  id: string;
  /** Ultra-short label used in inline strips beside CTAs. */
  badge: string;
  /** Icon glyph — kept as text so it renders without an icon dependency. */
  icon: string;
  /** Headline used on the promise page and cards. */
  title: string;
  /** One-sentence version used in cards and the hero bar tooltip. */
  short: string;
  /** Full paragraph used on /our-promise. */
  body: string;
};

export const PROMISES: Promise7[] = [
  {
    id: "prebuild",
    badge: "Pre-built & photographed",
    icon: "📸",
    title: "Pre-build and photo proof",
    short: "Your booth is assembled and photographed in our shop before it ships.",
    body:
      "Your booth is fully assembled in our shop before it ships — structure standing, graphics mounted, lighting on. You approve photographs of the real, finished booth, not a render. Problems get solved on our floor, not at 6am on move-in morning.",
  },
  {
    id: "one-contract",
    badge: "One contract, one producer",
    icon: "🤝",
    title: "One contract, one invoice, one producer",
    short: "Design, build, freight, install and dismantle on a single agreement.",
    body:
      "Design, fabrication, freight, install and dismantle sit on one agreement with one accountable producer — not six vendors and six invoices. Costs paid directly to the show or venue (drayage, electrical, rigging, union services) are quoted separately and shown to you before you commit.",
  },
  {
    id: "fixed-scope",
    badge: "Fixed scope, no surprises",
    icon: "🧾",
    title: "Fixed scope, no surprise line items",
    short: "The price on your signed scope is the price you pay.",
    body:
      "The price on your signed scope is the price. Anything that changes it becomes a written change order that you approve before we act on it. You will never receive a post-show invoice for work you did not authorise.",
  },
  {
    id: "id-included",
    badge: "I&D always included",
    icon: "🔧",
    title: "Install and dismantle included",
    short: "Install and dismantle labour is inside every booth price we publish.",
    body:
      "Install and dismantle labour is inside every booth price we publish, including the ranges on our calculator and pricing guides. You will not be quoted a booth and then billed the labour to stand it up.",
  },
  {
    id: "response",
    badge: "Reply in 1 business day",
    icon: "⚡",
    title: "We answer, fast",
    short: "A designer replies within one business day; direction and investment within two.",
    body:
      "A designer acknowledges a complete brief within one business day, then sends preliminary concept direction and investment within two. Full photoreal design, floor plans and a costed scope follow over roughly one to two weeks as the scope develops — complimentary, and yours to keep.",
  },
  {
    id: "on-floor",
    badge: "On the floor with you",
    icon: "🏗️",
    title: "On the floor, not on the phone",
    short: "A Traction X producer is on site through install and show open.",
    body:
      "A Traction X producer is on site for install and through show open. If something needs fixing on move-in morning, the person fixing it already knows your booth, your crates and your deadline — you are not explaining your project to a stranger at a service desk.",
  },
];

/** The three promises used in the compact strip beside CTAs and forms. */
export const CTA_PROMISE_IDS = ["response", "fixed-scope", "id-included"] as const;

/** FAQ entries for /our-promise — also emitted as FAQPage JSON-LD. */
export const PROMISE_FAQS: { q: string; a: string }[] = [
  {
    q: "Is the Traction X Promise a written warranty?",
    a: "The commitments here are how every project runs, and the ones that carry money — fixed scope, change orders in writing, install and dismantle included — are written into your statement of work and purchase agreement before you sign. Nothing on this page replaces the terms of your signed scope; it describes what those terms say.",
  },
  {
    q: "What is not included in a Traction X booth price?",
    a: "Costs paid directly to the show or venue: drayage/material handling, electrical, rigging, internet, cleaning and any union services the venue mandates. We coordinate and estimate them so there is no surprise, but they are billed by the show contractor, not by us. Everything on our side — design, fabrication, graphics, freight, install and dismantle — is in the quoted scope.",
  },
  {
    q: "What happens if the scope changes mid-project?",
    a: "You get a written change order stating exactly what changes, what it costs and how it affects the schedule. We do not proceed until you approve it. That is the only way a Traction X project price moves after signature.",
  },
  {
    q: "How fast will someone actually get back to me?",
    a: "A designer acknowledges a complete brief within one business day. Preliminary concept direction and an investment range follow within two business days. If your show is inside 30 days, call us — rescue and rush builds are handled the same day.",
  },
  {
    q: "Do you pre-build rentals as well as custom exhibits?",
    a: "Yes. Custom fabrication and custom rental configurations are both staged and photographed before they ship, because a rental configured for your footprint has the same failure risk as a new build if nobody stands it up first.",
  },
];
