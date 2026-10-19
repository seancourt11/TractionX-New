/**
 * Social content library — LinkedIn + Instagram.
 *
 * Every post is tied to a real page on this site and, where a photo is
 * involved, to a real catalogue record (`boothSlug` / `productSlug`) so the
 * image and the link can never drift from the caption. Nothing here invents a
 * client, a city or a result — location lines say where a booth is *available*,
 * not where it shipped.
 *
 * Rendered internally at /admin/social. Not public, not indexed.
 */

export type SocialTheme =
  | "faq"
  | "timeline"
  | "cost"
  | "catalogue"
  | "portables"
  | "custom"
  | "resources"
  | "automation"
  | "hiring";

export type SocialCta = "design" | "meeting" | "quote" | "resource" | "careers";

/**
 * How the visual for a post is composed.
 * - photo    single asset, cropped to the platform aspect
 * - promise  asset + Traction X Promise badges baked in
 * - overlay  asset + a headline card (for FAQ / timeline posts)
 * - split    two assets side by side (comparisons, before/after)
 * - carousel 2–5 assets exported as numbered files
 */
export type SocialFormat = "photo" | "promise" | "overlay" | "split" | "carousel";

export type SocialPost = {
  id: string;
  /** Suggested week in the 12-week rotation. */
  week: number;
  theme: SocialTheme;
  /** Internal label — never published. */
  title: string;
  linkedin: string;
  instagram: string;
  hashtags: string[];
  /** Site-relative link that belongs in the caption / bio link. */
  href: string;
  /** Resolves the photo and size from the rental catalogue. */
  boothSlug?: string;
  /** Resolves the photo and specs from the portable catalogue. */
  productSlug?: string;
  /** Resolves the same hero photo the public venue page uses. */
  venueSlug?: string;
  /** Resolves the same hero photo the public show page uses. */
  showSlug?: string;
  /** Explicit gallery image index (1–37) from the portfolio library. */
  gallerySlug?: string;
  /** Explicit image when the post isn't catalogue-backed. */
  image?: string;
  /** Visual treatment. Falls back to the theme default when omitted. */
  format?: SocialFormat;
  /** Promise ids baked onto the visual. Falls back to the theme default. */
  promiseIds?: string[];
  /** Short headline painted onto `overlay` visuals. Defaults to the title. */
  overlayText?: string;
  /** Second asset for `split` visuals — booth slug, product slug or gallery id. */
  splitWith?: { boothSlug?: string; productSlug?: string; gallerySlug?: string };
  /** Labels painted under each half of a `split` visual. */
  splitLabels?: [string, string];
  /** Extra assets for `carousel` visuals, in order after the primary image. */
  carousel?: { boothSlug?: string; productSlug?: string; gallerySlug?: string; caption?: string }[];
  city?: string;
  venue?: string;
  cta: SocialCta;
};

export const FORMAT_LABEL: Record<SocialFormat, string> = {
  photo: "Photo",
  promise: "Promise badge",
  overlay: "Headline card",
  split: "Split compare",
  carousel: "Carousel",
};

/** Default visual treatment per theme, applied when a post omits `format`. */
export const THEME_FORMAT: Record<SocialTheme, SocialFormat> = {
  faq: "overlay",
  timeline: "overlay",
  cost: "promise",
  catalogue: "photo",
  portables: "photo",
  custom: "promise",
  resources: "overlay",
  automation: "overlay",
  hiring: "overlay",
};

/** Default promise badges per theme, applied when a post omits `promiseIds`. */
export const THEME_PROMISES: Record<SocialTheme, string[]> = {
  faq: ["fixed-scope"],
  timeline: ["on-floor", "response"],
  cost: ["id-included", "fixed-scope"],
  catalogue: ["prebuild", "id-included"],
  portables: ["response"],
  custom: ["prebuild", "fixed-scope"],
  resources: ["response"],
  automation: ["response", "fixed-scope"],
  hiring: ["prebuild", "on-floor"],
};


export const THEME_LABEL: Record<SocialTheme, string> = {
  faq: "FAQ / objection",
  timeline: "Timelines & deadlines",
  cost: "Cost & pricing",
  catalogue: "Rental catalogue",
  portables: "Portables",
  custom: "Custom fabrication",
  resources: "Resources & tools",
  automation: "Pricing tools & 3D design",
  hiring: "Hiring & careers",
};

export const CTA_LABEL: Record<SocialCta, string> = {
  design: "Free 3D design",
  meeting: "Book a virtual meeting",
  quote: "Get a quote",
  resource: "Download / use the tool",
  careers: "Apply / careers page",
};

const TAGS = {
  core: ["#tradeshow", "#tradeshowbooth", "#exhibitiondesign", "#eventmarketing", "#boothdesign"],
  rental: ["#tradeshowbooth", "#boothrental", "#exhibitrental", "#tradeshowdisplay", "#eventprofs"],
  cost: ["#tradeshowbudget", "#eventmarketing", "#tradeshowbooth", "#exhibitmarketing", "#b2bmarketing"],
  portable: ["#portabledisplay", "#tradeshowdisplay", "#bannerstand", "#popupbooth", "#smallbusinessmarketing"],
  custom: ["#customexhibit", "#brandactivation", "#experientialmarketing", "#fabrication", "#tradeshowbooth"],
  resources: ["#eventprofs", "#tradeshowtips", "#exhibitormarketing", "#eventplanning", "#b2bmarketing"],
  hiring: ["#hiring", "#nowhiring", "#tradeshowjobs", "#eventprofs", "#skilledtrades"],
};

/** Line every caption can end on, matching the two site CTAs. */
export const CTA_LINE: Record<SocialCta, string> = {
  design: "Complimentary 3D design of your booth — no cost, no commitment.",
  meeting: "Book a 10-minute touch base, or a 30-minute working session if you're planning a $10K+ build.",
  quote: "Instant pricing in about 60 seconds, or send us the brief and we'll price it properly.",
  resource: "Free to use — no signup for the checklists.",
  careers: "See the roles we hire for and how to apply: tractionx.ca/careers",
};

export const SOCIAL_POSTS: SocialPost[] = [
  // ── FAQ / objection (10) ──────────────────────────────────────────────
  {
    id: "faq-10x20-cost",
    week: 1,
    theme: "faq",
    title: "What does a 10×20 actually cost?",
    linkedin:
      "\"What does a 10×20 booth actually cost?\" is the question we get more than any other, and most suppliers answer it with \"it depends.\"\n\nHere's a real answer. A 10×20 custom rental starts at $17,500. That's structure, printed graphics, lighting, a counter, a monitor mount and install drawings. Buying the same footprint outright starts around $25,000.\n\nWhat moves the number: finish tier, millwork, AV, hanging structure, and the city you're exhibiting in (labour rates in Las Vegas and Chicago are not Halifax rates).\n\nWhat doesn't move it: install and dismantle. It's in our price, not bolted on afterward.\n\nFull size-by-size pricing:",
    instagram:
      "10×20 booth. Real number, not \"it depends.\"\n\nRent from $17,500 · Buy from $25,000\nStructure + graphics + lighting + counter + monitor mount + I&D included.\n\nWhat changes it: finish, millwork, AV, your show city.\n\nPricing by size at the link in bio 👆",
    hashtags: TAGS.cost,
    href: "/booth-size/10x20-booths",
    cta: "quote",
  },
  {
    id: "faq-rent-vs-buy",
    week: 1,
    theme: "faq",
    title: "Rent or buy?",
    linkedin:
      "Rent or buy? The honest math is simpler than most suppliers make it.\n\nUnder four shows a year → rent. You avoid storage, refurb and the slow death of a booth that no longer matches your brand.\n\nFour or more shows a year, same footprint every time → buying starts to win on cost per show.\n\nChanging footprint show to show → rent, every time. Scaling 10×10 → 20×20 shouldn't require a new capital request.\n\nThe part people miss: a rental doesn't have to look like a rental. Ours are custom-built to your brand and then dismantled — you're renting the structure, not a stock look.",
    instagram:
      "Rent or buy? 👇\n\n1–3 shows/year → rent\n4+ shows, same size → consider buying\nFootprint changes every show → rent\n\nAnd no, a rental doesn't have to look like a rental. Custom graphics, custom layout, custom millwork — every time.\n\nLink in bio for both prices.",
    hashtags: TAGS.rental,
    href: "/rent-a-booth",
    format: "split",
    boothSlug: "10-x-10-microsoft",
    splitWith: { boothSlug: "20-x-20-shopify" },
    splitLabels: ["Rent", "Buy"],
    cta: "meeting",
  },
  {
    id: "faq-id-included",
    week: 2,
    theme: "faq",
    title: "I&D is included",
    linkedin:
      "Install and dismantle is included in every Traction X quote.\n\nWe say it out loud because the industry standard is to leave it off the proposal, win on the sticker price, and add it back on the invoice once your booth is already on the floor.\n\nWhat is billed separately, and why: drayage, electrical, rigging and internet are ordered through the venue's general service contractor at their published rates. Nobody can quote those honestly at proposal stage — but we'll tell you what to budget for them before you sign anything.\n\nA quote that hides labour isn't cheaper. It's just later.",
    instagram:
      "I&D included. Every quote. Every show.\n\nSeparate (and always will be): drayage, electrical, rigging, internet — those are venue-contractor rates, not ours.\n\nWe'll tell you what to budget for them anyway.\n\nNo surprise line items. Ever.",
    hashtags: TAGS.core,
    href: "/trade-show-booth-rental-pricing",
    cta: "quote",
  },
  {
    id: "faq-what-is-drayage",
    week: 2,
    theme: "faq",
    title: "What is drayage?",
    linkedin:
      "Drayage is the single biggest line item first-time exhibitors never budget for.\n\nIt's not shipping. It's the charge for moving your crates from the loading dock (or the advance warehouse) to your booth space and back — billed by weight, with minimums, by the show's general service contractor.\n\nThree things that cut it: ship to the advance warehouse instead of direct-to-show where the rate favours it, consolidate to fewer heavier crates rather than many light ones, and know your crate weight before you book.\n\nWe wrote the whole thing up, union jurisdictions included:",
    instagram:
      "Drayage ≠ shipping.\n\nIt's the charge to move your crates from the dock to your booth. Billed by weight. With minimums. And it surprises almost every first-time exhibitor.\n\nSave this before your next show.\n\nFull guide in bio 👆",
    hashtags: TAGS.resources,
    href: "/guides/trade-show-drayage-and-union-labor-explained",
    cta: "resource",
  },
  {
    id: "faq-how-early",
    week: 3,
    theme: "faq",
    title: "How early should I book?",
    linkedin:
      "How far ahead should you book your booth?\n\n8–12 weeks is comfortable. Design has room to iterate, graphics hit the printer without a rush charge, and freight books at normal rates.\n\n6–8 weeks still works cleanly.\n\n4 weeks is possible with catalogue inventory and a tight approval loop — we do rescue builds regularly.\n\nUnder 3 weeks, the constraint stops being fabrication and becomes graphics production plus freight transit. Tell us the show date first and we'll tell you honestly whether it's on.",
    instagram:
      "\"Is it too late to book?\"\n\n8–12 weeks: comfortable\n6–8 weeks: fine\n4 weeks: doable with catalogue inventory\n<3 weeks: call us, don't email\n\nWe do rescue builds. Tell us the show date first.",
    hashtags: TAGS.rental,
    href: "/rescue-booth-builds",
    cta: "meeting",
  },
  {
    id: "faq-whats-included",
    week: 3,
    theme: "faq",
    title: "What's in a rental package?",
    linkedin:
      "What actually comes in a booth rental?\n\nStructure. Printed graphics to your artwork. Standard lighting. One counter or reception station. Monitor mount. Meeting stool. Setup drawings. Install and dismantle.\n\nQuoted separately because they're venue-controlled: freight, drayage, electrical, rigging, internet.\n\nIf a quote you're comparing doesn't spell out both lists, ask which one it's missing.",
    instagram:
      "What's in the box 📦\n\n✔ Structure\n✔ Custom printed graphics\n✔ Lighting\n✔ Counter / reception\n✔ Monitor mount\n✔ Setup drawings\n✔ Install & dismantle\n\nSeparate: freight, drayage, electrical, rigging, internet.\n\nAsk any supplier for both lists.",
    hashtags: TAGS.rental,
    href: "/rent-a-booth",
    cta: "quote",
  },
  {
    id: "faq-graphics-deadline",
    week: 4,
    theme: "faq",
    title: "When are graphics due?",
    linkedin:
      "The deadline that actually decides whether your booth is ready: artwork.\n\nStructure can be scheduled. Print can't be compressed past a point — and large-format fabric with a colour match needs proofing time on top.\n\nOur rule of thumb: final artwork three weeks before the show for a rental, four for a custom build. Miss it and you're not shipping late, you're shipping unproofed.\n\nBleed, safe area, DPI and colour profile for every panel we build, plus downloadable templates:",
    instagram:
      "Artwork is the real deadline. Not the booth.\n\n3 weeks out → rentals\n4 weeks out → custom builds\n\nBleed, safe area, DPI, colour profile and free templates for every panel size — link in bio.\n\nSend this to your designer.",
    hashtags: TAGS.resources,
    href: "/exhibitor-resources/trade-show-booth-graphic-specs",
    cta: "resource",
  },
  {
    id: "faq-double-deck",
    week: 4,
    theme: "faq",
    title: "Can I do a two-storey booth?",
    linkedin:
      "\"Can we go two storeys?\" — yes, and the answer starts with three questions before design.\n\n1. Does the hall allow it, and at what height? Rules vary hall by hall, not just city by city.\n2. Does the show require stamped engineering drawings, and by when? In most large US venues, yes, and the deadline lands well before the exhibitor kit deadline.\n3. What's the rigging and labour cost on top? That's a venue-contractor line, and it's material on a double deck.\n\nThe payoff is the reason people push through it: you double usable square footage without buying a second booth space — often the cheapest square foot on the floor.",
    instagram:
      "Two storeys = double the space, same footprint.\n\nBefore you design it, answer three things:\n① Height limit in that hall?\n② Stamped drawings required, and by when?\n③ Rigging + labour budget?\n\nWe handle all three. Link in bio.",
    hashtags: TAGS.custom,
    href: "/double-deck-trade-show-booths",
    cta: "meeting",
  },
  {
    id: "faq-first-time",
    week: 5,
    theme: "faq",
    title: "First show — what do I need?",
    linkedin:
      "Exhibiting for the first time? The booth is maybe 40% of the job.\n\nThe other 60%: the exhibitor manual (read it the week you get it), the advance freight deadline, electrical ordered before the discount date, drayage budgeted, staff scheduled in shifts, lead capture tested before doors open, and a follow-up process that runs inside 48 hours.\n\nWe put the whole thing in one checklist so nothing lands as a surprise at move-in.",
    instagram:
      "First trade show? The booth is 40% of it.\n\nThe other 60%:\n• exhibitor manual\n• advance freight deadline\n• electrical discount date\n• drayage budget\n• staff shifts\n• lead capture (test it!)\n• 48-hour follow-up\n\nFull checklist in bio.",
    hashtags: TAGS.resources,
    href: "/guides/first-time-exhibitor-checklist",
    cta: "resource",
  },
  {
    id: "faq-modular-vs-custom",
    week: 5,
    theme: "faq",
    title: "Modular vs custom",
    linkedin:
      "Modular vs custom isn't a quality question. It's a reuse question.\n\nModular: aluminium extrusion, reconfigurable, re-skinnable. A 20×20 breaks down into two 10×10s for regional shows. Lower cost per show if your footprint moves around.\n\nCustom: built for one purpose, one brand, one experience. Curves, millwork, integrated AV, textures a system frame can't do.\n\nMost of what we build is neither purist option — a modular spine with custom fabrication on the visible faces. You get the shape you designed and the economics of a system.",
    instagram:
      "Modular or custom?\n\nModular = reconfigurable, re-skinnable, cheaper per show\nCustom = curves, millwork, integrated AV, one-of-one\n\nMost great booths are both: modular spine, custom faces.\n\nBreakdown in bio.",
    hashtags: TAGS.core,
    href: "/blog/modular-vs-custom-trade-show-booths",
    format: "split",
    boothSlug: "10-x-20-cyberhaven",
    splitWith: { boothSlug: "20-x-30-daikin" },
    splitLabels: ["Modular", "Custom"],
    cta: "design",
  },

  // ── Timelines & deadlines (6) ─────────────────────────────────────────
  {
    id: "time-16-week",
    week: 1,
    theme: "timeline",
    title: "16-week work-back",
    linkedin:
      "The 16-week work-back we run on every build:\n\n16 weeks — brief, budget, footprint confirmed\n14 — 3D design concepts\n12 — design approved, quote signed\n10 — engineering, hall rules and height checks\n8 — exhibitor manual reviewed, electrical and rigging ordered at discount rates\n6 — graphics artwork due\n4 — production and pre-build\n3 — advance warehouse freight cut-off\n1 — install crew and drawings dispatched\n0 — move-in\n\nMost problems on a show floor were scheduling decisions made ten weeks earlier.",
    instagram:
      "16 weeks to show day 🗓️\n\n16 · brief + budget\n14 · 3D concepts\n12 · approved\n10 · engineering\n8 · services ordered\n6 · artwork due\n4 · production\n3 · freight cut-off\n1 · crew dispatch\n0 · move-in\n\nSave this one.",
    hashtags: TAGS.resources,
    href: "/blog/trade-show-timeline-planning",
    cta: "resource",
  },
  {
    id: "time-deadline-tracker",
    week: 2,
    theme: "timeline",
    title: "Deadline tracker",
    linkedin:
      "Every deadline that costs real money if you miss it, in one tracker: advance freight warehouse, discount electrical cut-off, rigging drawings, exhibitor manual, hotel block, lead retrieval.\n\nEnter your show date, get the dates back, export them to your calendar. That's the whole tool.\n\nThe discount electrical deadline alone is typically a 20–30% swing on that line. It is the easiest money any exhibitor leaves on the table.",
    instagram:
      "Enter your show date → get every order-by deadline → export to calendar.\n\nThe discount electrical cut-off alone is a 20–30% swing.\n\nFree tool, link in bio ⏱️",
    hashtags: TAGS.resources,
    href: "/exhibitor-resources/show-services-deadline-tracker",
    cta: "resource",
  },
  {
    id: "time-advance-warehouse",
    week: 4,
    theme: "timeline",
    title: "Advance warehouse vs direct",
    linkedin:
      "Advance warehouse or direct-to-show?\n\nAdvance warehouse: your crates arrive early, sit in a bonded facility, and are on your space when you walk in. Costs more per hundredweight. Buys you certainty.\n\nDirect-to-show: cheaper rate, but you're in a dock queue on a fixed window, and a late truck is your problem in front of your own move-in crew.\n\nOur rule: first show at a venue, or any show where design approval ran late — advance warehouse. Repeat show with a known crew and a healthy schedule — direct is fine.",
    instagram:
      "Advance warehouse vs direct-to-show 🚛\n\nAdvance = costs more, buys certainty\nDirect = cheaper, dock queue, tighter window\n\nFirst time at that venue? Advance warehouse. Every time.\n\nFull decision tree in bio.",
    hashtags: TAGS.resources,
    href: "/exhibitor-resources/trade-show-shipping-checklist",
    cta: "resource",
  },
  {
    id: "time-four-weeks-out",
    week: 6,
    theme: "timeline",
    title: "Four weeks out — what's still possible",
    linkedin:
      "Four weeks out and your booth fell through. What's actually still possible:\n\n✔ A full custom rental from catalogue inventory, re-skinned in your brand\n✔ Printed graphics, if artwork lands in the next few days\n✔ Freight direct-to-show\n✔ Install and dismantle, crewed\n\n✘ Ground-up custom millwork\n✘ Discount-rate electrical (that deadline has passed)\n✘ A hanging structure needing new engineering drawings\n\nWe run these regularly. The first call should be today, not next Monday.",
    instagram:
      "4 weeks out, supplier fell through?\n\nStill possible ✔\ncustom rental from inventory · printed graphics · freight · install\n\nNot possible ✘\nground-up millwork · discount electrical · new rigging drawings\n\nCall today, not Monday.",
    hashtags: TAGS.rental,
    href: "/rescue-booth-builds",
    cta: "meeting",
  },
  {
    id: "time-show-day",
    week: 8,
    theme: "timeline",
    title: "Show-day run sheet",
    linkedin:
      "Show morning, in order:\n\nWalk the booth before staff arrive. Lights on, monitors on, graphics square, nothing scuffed from move-in.\nTest lead capture with a real scan and check the record actually saved.\nBrief the team on the one question that opens a conversation and the three that qualify.\nAssign a booth lead per shift so nobody has to ask who's deciding.\nStock check: literature, giveaways, water, chargers, a lint roller and gaff tape.\n\nThe last two hours of day one always feel different when the first hour was calm.",
    instagram:
      "Show morning checklist ☀️\n\n□ Lights + monitors on\n□ Graphics square, no scuffs\n□ Lead capture tested (real scan!)\n□ Team briefed on opening question\n□ Booth lead per shift\n□ Water, chargers, gaff tape\n\nPrintable version in bio.",
    hashtags: TAGS.resources,
    href: "/exhibitor-resources/booth-setup-checklist",
    cta: "resource",
  },
  {
    id: "time-post-show",
    week: 10,
    theme: "timeline",
    title: "48 hours after",
    linkedin:
      "The 48 hours after a show decide whether it paid for itself.\n\nDay 1: leads split into hot / warm / cold while your team still remembers the faces. Hot leads get a personal email the same day, referencing what they actually asked about.\nDay 2: warm leads get the sequence. Cold goes to nurture, not the bin.\nWeek 1: pipeline value tagged against show cost so you have a number, not a feeling, when budget season comes.\n\nBooth spend is easy to defend when you can show cost per qualified lead.",
    instagram:
      "The 48 hours after the show matter more than the booth.\n\nDay 1 → hot leads, personal email, same day\nDay 2 → warm sequence\nWeek 1 → pipeline vs show cost\n\nCost per qualified lead is how you get next year's budget approved.\n\nROI calculator in bio.",
    hashtags: TAGS.resources,
    href: "/exhibitor-resources/trade-show-roi-calculator",
    cta: "resource",
  },

  // ── Cost & pricing (8) ────────────────────────────────────────────────
  {
    id: "cost-by-size",
    week: 1,
    theme: "cost",
    title: "Starting prices by size",
    linkedin:
      "Published starting prices, because \"request a quote\" isn't an answer when you're building a budget:\n\n10×10 — rent from $12,500 · buy from $18,000\n10×20 — rent from $17,500 · buy from $25,000\n20×20 — rent from $30,000 · buy from $43,000\n20×30 — rent from $42,000 · buy from $60,000\n\nEvery number includes structure, custom graphics, lighting, a counter, drawings and I&D. Freight, drayage and venue services are separate lines we help you forecast.\n\nAdjusted for your show city here:",
    instagram:
      "Starting prices. Published. No form first.\n\n10×10 → from $12,500\n10×20 → from $17,500\n20×20 → from $30,000\n20×30 → from $42,000\n\nStructure + graphics + lighting + counter + I&D included.\n\nCity-adjusted pricing in bio 👆",
    hashtags: TAGS.cost,
    href: "/trade-show-booth-rental-pricing",
    cta: "quote",
  },
  {
    id: "cost-calculator",
    week: 2,
    theme: "cost",
    title: "Booth cost calculator",
    linkedin:
      "We built the booth cost calculator we wanted as exhibitors: pick a footprint, a finish tier and your show city, and see a real range in about a minute.\n\nIt's honest about what it can't know — drayage, electrical and rigging depend on your venue's contractor, so those are shown as budget ranges, not invented certainties.\n\nUse it before you talk to any supplier, including us. Walking into a quote conversation with a number is a much better position than walking in with a question.",
    instagram:
      "Booth budget in 60 seconds ⏱️\n\nFootprint → finish → show city → range.\n\nHonest about what it can't know: drayage, electrical and rigging are venue-contractor rates, shown as ranges.\n\nCalculator in bio. Use it before you call anyone.",
    hashtags: TAGS.cost,
    href: "/booth-cost-calculator",
    cta: "resource",
  },
  {
    id: "cost-city-index",
    week: 3,
    theme: "cost",
    title: "Why the same booth costs more in Vegas",
    linkedin:
      "The same booth costs different money in different cities, and it isn't the booth.\n\nIt's labour jurisdiction, drayage rates, freight distance and hall rules. In Las Vegas, material handling sits with Teamsters Local 631 while carpentry and I&D split with IATSE Local 720 depending on the hall and the general service contractor. That structure is priced in before anyone touches your crates.\n\nSo our pricing carries a city index rather than one national number that's wrong everywhere. You see the real range for the city you're actually exhibiting in.",
    instagram:
      "Same booth. Different city. Different number.\n\nWhy: labour jurisdiction, drayage rates, freight distance, hall rules.\n\nSo we price by city instead of quoting one national number that's wrong everywhere.\n\nCheck your city in bio 📍",
    hashtags: TAGS.cost,
    href: "/las-vegas-modular-trade-show-booth-rentals",
    venueSlug: "las-vegas-convention-center",
    city: "Las Vegas",
    format: "overlay",
    overlayText: "Same booth. Different city. Different number.",
    cta: "quote",
  },
  {
    id: "cost-budget-worksheet",
    week: 4,
    theme: "cost",
    title: "Budget worksheet",
    linkedin:
      "Most trade show budgets miss the same six lines: drayage, rigging, electrical, cleaning, internet and outbound freight.\n\nTogether they're routinely 20–30% of total show cost, and they're the ones that turn a signed-off budget into an awkward conversation in month three.\n\nSo we built the worksheet with every real line item in it — space, booth, graphics, services, freight, travel, staff, giveaways, lead capture — with a running total and a percent-of-budget split as you type.",
    instagram:
      "The six budget lines everyone forgets:\n\n① drayage\n② rigging\n③ electrical\n④ cleaning\n⑤ internet\n⑥ outbound freight\n\n20–30% of total show cost. Every time.\n\nFull worksheet in bio 📊",
    hashtags: TAGS.cost,
    href: "/exhibitor-resources/trade-show-budget-template",
    cta: "resource",
  },
  {
    id: "cost-tiers",
    week: 5,
    theme: "cost",
    title: "What the finish tiers change",
    linkedin:
      "Our pricing runs in four finish tiers, and the difference isn't quality — it's material and detail.\n\nStandard: system framing, printed fabric, clean and correct.\nElevated: better lighting, hard panel accents, a real counter rather than a podium.\nPremium: millwork, integrated AV, custom flooring, feature ceiling elements.\nArchitect: bespoke fabrication, unusual geometry, engineered structures.\n\nSame footprint can span a 2× range across those tiers. Knowing which tier you're buying is the difference between comparing quotes and guessing.",
    instagram:
      "Four finish tiers. Same footprint. Up to 2× the price.\n\nStandard → system framing + fabric\nElevated → lighting, hard panels, real counter\nPremium → millwork, AV, custom flooring\nArchitect → bespoke, engineered\n\nKnow which tier a quote is before you compare it.",
    hashtags: TAGS.cost,
    href: "/trade-show-booth-rental-pricing",
    cta: "quote",
  },
  {
    id: "cost-hidden-fees",
    week: 7,
    theme: "cost",
    title: "Hidden fees to ask about",
    linkedin:
      "Five questions that expose the gap between a cheap quote and a real one:\n\n1. Is install and dismantle in this number, or added later?\n2. Are graphics included, or priced per panel after design?\n3. Who pays for the return freight?\n4. What happens to the price if the show moves my space or my footprint changes?\n5. What's your rush charge threshold, in weeks?\n\nAny supplier who can answer all five in writing is a supplier you can plan against.",
    instagram:
      "5 questions before you sign any booth quote:\n\n① Is I&D included?\n② Graphics included, or per panel?\n③ Who pays return freight?\n④ What if my footprint changes?\n⑤ Rush charge threshold?\n\nAsk all five. In writing.",
    hashtags: TAGS.cost,
    href: "/compare/trade-show-exhibit-rental-companies",
    cta: "meeting",
  },
  {
    id: "cost-roi",
    week: 8,
    theme: "cost",
    title: "Cost per lead",
    linkedin:
      "Your booth doesn't have a cost. It has a cost per qualified lead.\n\nTotal show spend ÷ qualified leads = the number your CFO actually cares about. Layer in close rate and average deal size and you get break-even deal count — usually a much smaller number than people expect, which is exactly why it's worth calculating before budget season, not after.\n\nOur ROI calculator uses real city-indexed booth pricing so the inputs aren't guesses.",
    instagram:
      "Your booth doesn't cost $30,000.\n\nIt costs $X per qualified lead.\n\nSpend ÷ qualified leads = the number your CFO cares about.\n\nAdd close rate → break-even deal count. It's usually smaller than you think.\n\nCalculator in bio 📈",
    hashtags: TAGS.cost,
    href: "/exhibitor-resources/trade-show-roi-calculator",
    cta: "resource",
  },
  {
    id: "cost-10x10-entry",
    week: 9,
    theme: "cost",
    title: "10×10 on a real budget",
    linkedin:
      "You can exhibit well in a 10×10 for less than most people assume.\n\nCustom rental from $12,500, fully finished. Or a portable package from around $3,850 that ships in cases and sets up in under an hour with two people.\n\nThe deciding factor isn't budget, it's frequency. Four regional shows a year on a portable package beats one rental — and one flagship show a year deserves the rental.\n\nBoth paths, priced honestly:",
    instagram:
      "10×10 done properly 👇\n\nCustom rental → from $12,500\nPortable package → from $3,850, sets up in under an hour\n\nFour regional shows a year? Portable.\nOne flagship show? Rental.\n\nBoth priced in bio.",
    hashtags: TAGS.cost,
    href: "/booth-size/10x10-booths",
    cta: "quote",
  },

  // ── Rental catalogue (12) ─────────────────────────────────────────────
  {
    id: "cat-microsoft-10x10",
    week: 1,
    theme: "catalogue",
    title: "10×10 catalogue feature",
    linkedin:
      "A 10×10 has about eight seconds and one sightline. This one uses both.\n\nFull-height back wall so the brand reads from down the aisle, lit product shelving at eye height, and a counter placed to open the space rather than block it. Nothing in the footprint that isn't earning its square foot.\n\nAvailable as a custom rental in any market we serve — re-skinned in your brand, not ours.",
    instagram:
      "10×10. Eight seconds. One sightline.\n\nFull-height back wall · lit shelving at eye height · counter placed to open the space, not block it\n\nAvailable as a custom rental — re-skinned in your brand.\n\nSwipe the full catalogue, link in bio.",
    hashtags: TAGS.rental,
    href: "/rent-booth/10-x-10-microsoft",
    boothSlug: "10-x-10-microsoft",
    cta: "design",
  },
  {
    id: "cat-cyberhaven-10x20",
    week: 2,
    theme: "catalogue",
    title: "10×20 catalogue feature",
    linkedin:
      "Twenty feet of frontage, and the layout does the work: a demo zone at the aisle, a seated conversation corner behind it, and storage that isn't a curtained afterthought.\n\nThe mistake we see most on 10×20s is treating it as two 10×10s side by side. It isn't. It's one continuous sightline you can stage in two acts — attract at the front, qualify at the back.\n\nAvailable as a custom rental in your brand.",
    instagram:
      "10×20 done right = two acts, one sightline.\n\nFront → attract (demo at the aisle)\nBack → qualify (seated corner)\nPlus real storage, not a curtain.\n\nCustom rental in your brand. Link in bio.",
    hashtags: TAGS.rental,
    href: "/rent-booth/10-x-20-cyberhaven",
    boothSlug: "10-x-20-cyberhaven",
    cta: "design",
  },
  {
    id: "cat-shopify-20x20",
    week: 3,
    theme: "catalogue",
    title: "20×20 island feature",
    linkedin:
      "A 20×20 island is four front doors, not one.\n\nThat changes everything about the layout: no back wall to hide behind, every face has to read from an aisle, and traffic should flow through the booth rather than around it. Overhead structure does the long-range work; the floor plan does the close-range work.\n\nThis one keeps the centre open, puts hospitality on the diagonal and hangs the brand where it's visible from the hall entrance.",
    instagram:
      "A 20×20 island has four front doors 🚪🚪🚪🚪\n\nNo back wall to hide behind. Every face reads from an aisle. Traffic flows through, not around.\n\nOverhead does the long game. Floor plan does the close one.\n\nFull island catalogue in bio.",
    hashtags: TAGS.rental,
    href: "/rent-booth/20-x-20-shopify",
    boothSlug: "20-x-20-shopify",
    cta: "design",
  },
  {
    id: "cat-argenx-10x30",
    week: 4,
    theme: "catalogue",
    title: "10×30 in-line",
    linkedin:
      "Thirty feet of in-line frontage is the most underrated footprint on a show floor.\n\nYou get island-scale presence at in-line pricing, and enough run to separate three functions cleanly: welcome, demo, private conversation. Neighbours on two sides only — which means one uninterrupted brand wall the length of the space.\n\nThis one runs a continuous lit graphic band the full 30 feet, then breaks the space into zones underneath it.",
    instagram:
      "10×30 is the most underrated footprint on the floor.\n\nIsland presence. In-line price. One uninterrupted 30ft brand wall.\n\nWelcome → demo → private conversation, all zoned under a continuous lit band.\n\nCatalogue in bio.",
    hashtags: TAGS.rental,
    href: "/rent-booth/10-x-30-argenx",
    boothSlug: "10-x-30-argenx",
    cta: "design",
  },
  {
    id: "cat-daikin-20x30",
    week: 5,
    theme: "catalogue",
    title: "20×30 with meeting space",
    linkedin:
      "At 20×30, you can finally give sales a room.\n\nOnce a booth has an enclosed meeting space, the conversation changes — literally. Deals that would have been \"send me something\" on an open floor become a seated fifteen minutes. That's the entire argument for the footprint.\n\nThe design problem is doing it without turning the aisle-facing side into a wall. Glass, half-height millwork and a raised ceiling element solve it here.",
    instagram:
      "At 20×30 you can give sales a room 🚪\n\nAnd that changes the conversation — \"send me something\" becomes a seated 15 minutes.\n\nTrick is enclosing it without walling off the aisle. Glass + half-height millwork + raised ceiling.\n\nLink in bio.",
    hashtags: TAGS.rental,
    href: "/rent-booth/20-x-30-daikin",
    boothSlug: "20-x-30-daikin",
    cta: "meeting",
  },
  {
    id: "cat-dexcom-20x20",
    week: 6,
    theme: "catalogue",
    title: "Lighting as the differentiator",
    linkedin:
      "Walk any hall and the booths that read best from fifty feet almost always won on light, not size.\n\nBacklit fabric holds colour under terrible overhead hall lighting. Edge-lit panels create depth a flat print can't. Directional heads on product make people look where you want them looking.\n\nIt's also one of the cheapest upgrades available — usually a low four-figure line on a build that's already five or six.",
    instagram:
      "The booths you notice from 50 feet won on lighting, not size 💡\n\nBacklit fabric holds colour under hall lights\nEdge-lit panels add depth\nDirectional heads aim the eye\n\nCheapest upgrade with the biggest read. Every time.",
    hashtags: TAGS.rental,
    href: "/rent-booth/20-x-20-dexcom",
    boothSlug: "20-x-20-dexcom",
    cta: "design",
  },
  {
    id: "cat-noegroup-10x40",
    week: 7,
    theme: "catalogue",
    title: "10×40 corridor strategy",
    linkedin:
      "A 10×40 is a corridor, and corridors have a rhythm problem: people walk the length of it without stopping.\n\nThe fix is interruption. Break the run into three or four bays with a physical or lighting change at each, so there's a reason to pause rather than one continuous surface to walk past.\n\nDone well, a 10×40 out-converts a lot of islands — you're standing beside the aisle, not across a threshold from it.",
    instagram:
      "10×40 problem: people walk the whole length without stopping.\n\nFix: break it into bays. Change material or light at each break. Give them a reason to pause.\n\nDone right, an in-line out-converts a lot of islands.\n\nLink in bio.",
    hashtags: TAGS.rental,
    href: "/rent-booth/10-x-40-noegroup",
    boothSlug: "10-x-40-noegroup",
    cta: "design",
  },
  {
    id: "cat-therabody-20x20",
    week: 8,
    theme: "catalogue",
    title: "Consumer-brand energy",
    linkedin:
      "Consumer brands on a B2B floor have an unfair advantage, and it's not budget — it's that they design for the photo.\n\nOne strong colour field, one repeatable brand moment, product at touchable height, and enough open floor that a crowd looks like a crowd instead of a bottleneck.\n\nB2B booths that borrow this do noticeably better on foot traffic. Nothing here requires a bigger footprint.",
    instagram:
      "Consumer brands design for the photo. B2B usually doesn't.\n\nOne strong colour field\nOne repeatable brand moment\nProduct at touchable height\nOpen floor so a crowd reads as a crowd\n\nNone of that needs a bigger booth.",
    hashtags: TAGS.rental,
    href: "/rent-booth/20-x-20-therabody",
    boothSlug: "20-x-20-therabody",
    cta: "design",
  },
  {
    id: "cat-notified-10x20",
    week: 9,
    theme: "catalogue",
    title: "10×20 with a demo theatre",
    linkedin:
      "A demo theatre inside a 10×20 sounds like a stretch. It isn't — it just needs to be honest about scale.\n\nSix seats, a 65\" screen, a presenter position that doesn't block the aisle, and a schedule posted where people can see it. Sessions on the half hour give passers-by a reason to come back rather than a reason to keep walking.\n\nThe schedule matters more than the screen.",
    instagram:
      "Demo theatre in a 10×20? Yes — at honest scale.\n\n6 seats · 65\" screen · presenter off the aisle · posted schedule\n\nSessions on the half hour give people a reason to come BACK.\n\nThe schedule matters more than the screen.",
    hashtags: TAGS.rental,
    href: "/rent-booth/10-x-20-notified",
    boothSlug: "10-x-20-notified",
    cta: "quote",
  },
  {
    id: "cat-hytera-20x20",
    week: 10,
    theme: "catalogue",
    title: "Product-heavy islands",
    linkedin:
      "If your booth has to hold forty SKUs, the enemy is the wall of product.\n\nWhat works: lit bays with three to five items each, one hero item at eye level per bay, and a clear taxonomy so a visitor can self-navigate to the thing they came for. Everything else goes in a catalogue on a tablet.\n\nA booth is a filter, not a warehouse. The goal is getting the right person to the right shelf in ten seconds.",
    instagram:
      "40 SKUs to show? Don't build a wall of product.\n\n✔ Lit bays, 3–5 items each\n✔ One hero item per bay at eye level\n✔ Clear taxonomy so people self-navigate\n✔ Everything else on a tablet\n\nA booth is a filter, not a warehouse.",
    hashtags: TAGS.rental,
    href: "/rent-booth/20-x-20-hytera",
    boothSlug: "20-x-20-hytera",
    cta: "design",
  },
  {
    id: "cat-leidos-vegas",
    week: 11,
    theme: "catalogue",
    title: "Island available in Las Vegas",
    linkedin:
      "Exhibiting at the Las Vegas Convention Center? Two things worth knowing before you design.\n\nThe West Hall opened in 2021 with roughly 600,000 sq ft of column-free exhibit space — genuinely different sightlines to plan for than the older halls.\n\nAnd Clark County Fire requires stamped drawings for any structure over 12 ft, covered ceilings or multi-level booths. That review runs weeks before the exhibitor kit deadline, not after it.\n\nThis 20×20 island is available as a custom rental for Las Vegas shows, built to those rules.",
    instagram:
      "Exhibiting at LVCC? Two things first 📍\n\n① West Hall = ~600,000 sq ft column-free. Plan your sightlines for it.\n② Clark County Fire wants stamped drawings for anything over 12ft, covered ceilings or double decks — weeks before the kit deadline.\n\nThis island is available for Vegas shows. Link in bio.",
    hashtags: TAGS.rental,
    href: "/venues/las-vegas-convention-center-trade-show-booth-rentals",
    boothSlug: "20-x-20-leidos",
    venueSlug: "las-vegas-convention-center",
    format: "carousel",
    carousel: [
      { boothSlug: "20-x-20-leidos", caption: "20×20 island, available for Vegas shows" },
      { boothSlug: "20-x-20-hytera", caption: "Alternate 20×20 layout" },
    ],
    city: "Las Vegas",
    venue: "Las Vegas Convention Center",
    cta: "quote",
  },
  {
    id: "cat-nureva-chicago",
    week: 12,
    theme: "catalogue",
    title: "20×30 available for McCormick Place",
    linkedin:
      "McCormick Place is the largest convention centre in North America — roughly 2.6 million sq ft across four connected buildings.\n\nWhich means the walk from your hotel to your hall is a real planning input, freight routing depends on which building you're in, and \"we'll just grab it from the crate\" is a twenty-minute round trip.\n\nBuild for it: everything you need during show hours lives inside the booth, and the crate you actually need access to gets labelled and staged accordingly.\n\nThis 20×30 is available as a custom rental for Chicago shows.",
    instagram:
      "McCormick Place: ~2.6 million sq ft. Four buildings. 🏢\n\nSo: \"I'll just grab it from the crate\" = a 20-minute round trip.\n\nBuild for it. Everything you need during show hours lives IN the booth.\n\n20×30 available for Chicago shows — link in bio.",
    hashtags: TAGS.rental,
    href: "/venues/mccormick-place-trade-show-booth-rentals",
    boothSlug: "20-x-30-nureva",
    venueSlug: "mccormick-place",
    format: "carousel",
    carousel: [
      { boothSlug: "20-x-30-nureva", caption: "20×30 available for Chicago shows" },
      { boothSlug: "20-x-30-daikin", caption: "Alternate 20×30 layout" },
    ],
    city: "Chicago",
    venue: "McCormick Place",
    cta: "quote",
  },

  // ── Portables (8) ─────────────────────────────────────────────────────
  {
    id: "port-10x10-package",
    week: 2,
    theme: "portables",
    title: "10×10 portable package",
    linkedin:
      "A complete 10×10 portable exhibit, from $4,250, in two cases.\n\nCurved SEG frame, a single seamless dye-sub graphic, lockable counter, LED arm lights and a monitor mount. Two people, about 45 minutes, no tools.\n\nFor teams doing four or more regional shows a year, this is the footprint economics nobody talks about: you own it, it flies as checked freight, and re-skinning it next year costs a fraction of the original.",
    instagram:
      "Complete 10×10. Two cases. 45 minutes. No tools.\n\nFrom $4,250 — frame, seamless graphic, lockable counter, LED lights, monitor mount.\n\nDoing 4+ regional shows a year? This is the math that works.\n\nLink in bio 📦",
    hashtags: TAGS.portable,
    href: "/portable-displays/10x10-booth-packages/vector-10-curved-seg-backwall-package",
    productSlug: "vector-10-curved-seg-backwall-package",
    cta: "quote",
  },
  {
    id: "port-banner-stand",
    week: 3,
    theme: "portables",
    title: "Retractable banner stand",
    linkedin:
      "The most-used piece of trade show hardware in existence, and most of them are printed badly.\n\nA retractable banner stand is 33\" × 79\" — which means your logo does not need to be 40 inches tall. Put the one message a passer-by needs in the top third, keep the bottom third clear (tables and people block it), and use one high-contrast image rather than four small ones.\n\nFrom $210, sets up in two minutes.",
    instagram:
      "Banner stand rules 📐\n\n33\" × 79\" of space:\n• Top third = your one message\n• Bottom third = assume it's blocked\n• One image, high contrast\n• Logo does NOT need to be 40\" tall\n\nFrom $210. Up in 2 minutes.",
    hashtags: TAGS.portable,
    href: "/portable-displays/banner-stands/standard-retractable-banner-stand-single-sided",
    productSlug: "standard-retractable-banner-stand-single-sided",
    cta: "quote",
  },
  {
    id: "port-lightbox-counter",
    week: 4,
    theme: "portables",
    title: "Backlit lightbox counter",
    linkedin:
      "The upgrade that changes a small booth most: swap the plain counter for a backlit one.\n\nA lit counter reads as a beacon from down the aisle, gives your staff a natural place to stand, and photographs far better than a printed panel under hall lighting. Double-sided from $1,690.\n\nIn a 10×10, it's often the difference between a booth people walk past and a booth people walk toward.",
    instagram:
      "Best small-booth upgrade: a backlit counter 💡\n\nReads as a beacon down the aisle\nGives staff somewhere to stand\nPhotographs way better than printed panel\n\nDouble-sided from $1,690. Link in bio.",
    hashtags: TAGS.portable,
    href: "/portable-displays/backlit-lightbox-displays/3-3-3-3ft-lightbox-counter-double-sided",
    productSlug: "3-3-3-3ft-lightbox-counter-double-sided",
    cta: "design",
  },
  {
    id: "port-table-cover",
    week: 5,
    theme: "portables",
    title: "Table covers",
    linkedin:
      "If your \"booth\" is a 6-foot table at a regional show, the cover is your entire brand presence.\n\nStretch fit with a zippered back reads as tailored rather than draped, and it doesn't billow when someone walks past. Three-sided throws are cheaper and fine when the back is against a wall.\n\nFrom $180, ships flat, sets up in under a minute. It is the highest-return $200 in this industry.",
    instagram:
      "Your \"booth\" is a 6ft table? The cover IS your brand.\n\nStretch fit + zippered back = tailored, no billowing\nThree-sided throw = cheaper, fine against a wall\n\nFrom $180. Up in under a minute.\n\nBest $200 in this industry.",
    hashtags: TAGS.portable,
    href: "/portable-displays/table-covers/4ft-stretch-table-cover-zippered-back",
    productSlug: "4ft-stretch-table-cover-zippered-back",
    cta: "quote",
  },
  {
    id: "port-tension-fabric",
    week: 6,
    theme: "portables",
    title: "Tension fabric backwall",
    linkedin:
      "Tension fabric replaced pop-up panel systems for one reason: a single seamless graphic with no visible joins, and you can wash it.\n\nAn 8ft straight backwall from $1,150, up in about fifteen minutes with one or two people. The frame lasts years; when your brand changes, you replace the fabric skin only — usually a few hundred dollars rather than a new display.\n\nThat replaceable-skin economics is the whole argument.",
    instagram:
      "Why tension fabric won:\n\n✔ One seamless graphic, zero joins\n✔ Washable\n✔ 15-minute setup\n✔ Brand changes? Replace the skin, keep the frame\n\n8ft straight from $1,150. Link in bio.",
    hashtags: TAGS.portable,
    href: "/portable-displays/tension-fabric-displays/straight-8ft-tension-fabric-backwall",
    productSlug: "straight-8ft-tension-fabric-backwall",
    cta: "quote",
  },
  {
    id: "port-tent",
    week: 7,
    theme: "portables",
    title: "Printed pop-up canopy",
    linkedin:
      "Outdoor activations have a different failure mode than trade shows: weather, and a footprint nobody can find.\n\nA fully printed 10×10 canopy solves both — it's visible across a field, and a rated frame with proper weights stays put when the wind turns. From $1,290, up in fifteen minutes with two people.\n\nAdd printed walls on the two sides facing away from traffic and you've got shade, storage and a backdrop instead of just a roof.",
    instagram:
      "Outdoor season 🌤️\n\nFully printed 10×10 canopy from $1,290. Two people, 15 minutes.\n\nPro move: printed walls on the two sides facing away from traffic. Shade + storage + backdrop, not just a roof.\n\nLink in bio.",
    hashtags: TAGS.portable,
    href: "/portable-displays/event-tents-canopies/custom-printed-pop-up-canopy-10x10ft",
    productSlug: "custom-printed-pop-up-canopy-10x10ft",
    cta: "quote",
  },
  {
    id: "port-counter",
    week: 9,
    theme: "portables",
    title: "Counters that earn their space",
    linkedin:
      "A counter in a small booth is doing four jobs: brand surface, staff anchor, lockable storage and lead-capture station.\n\nWhich is why placement matters more than the counter. Against the back wall it becomes a barrier your team hides behind. Angled at the front corner, it opens the space and puts a person at the aisle where conversations actually start.\n\nFrom $920, ships in a case, assembles in fifteen minutes.",
    instagram:
      "Where you put the counter matters more than the counter.\n\n❌ Against the back wall → your team hides behind it\n✔ Angled at the front corner → opens the space, puts a person at the aisle\n\nFrom $920. 15-minute build.",
    hashtags: TAGS.portable,
    href: "/portable-displays/trade-show-counters/rectangle-trade-show-counter",
    productSlug: "rectangle-trade-show-counter",
    cta: "design",
  },
  {
    id: "port-hanging-banner",
    week: 11,
    theme: "portables",
    title: "Hanging banners",
    linkedin:
      "A hanging banner is the only part of your booth people can see from the hall entrance.\n\nWhich means it should carry your name and nothing else. No tagline, no product shot, no URL — none of it is legible at that distance and all of it competes with the one word that matters.\n\nFrom $2,150 for circle or square. Rigging is done by the venue crew and ordered through the show contractor, so check the drawing deadline early — it's usually earlier than you'd expect.",
    instagram:
      "Your hanging banner has ONE job: your name, visible from the hall entrance.\n\nNot the tagline. Not the product shot. Not the URL. None of it is legible up there.\n\nFrom $2,150. Rigging = venue crew, so check the drawing deadline early ⚠️",
    hashtags: TAGS.portable,
    href: "/portable-displays/hanging-banners-towers/trade-show-hanging-banner-circle",
    productSlug: "trade-show-hanging-banner-circle",
    cta: "quote",
  },

  // ── Custom fabrication (6) ────────────────────────────────────────────
  {
    id: "custom-millwork",
    week: 3,
    theme: "custom",
    title: "Millwork vs printed panels",
    linkedin:
      "The moment a booth stops feeling like a booth is usually the moment there's real millwork in it.\n\nA printed panel is a picture of a surface. Millwork is a surface — edges that catch light, materials with weight, joinery a visitor can lean on without it flexing. People read that difference instantly, even when they can't name it.\n\nIt's the single biggest step from Elevated to Premium in our pricing, and the one clients tell us afterwards they'd have made sooner.",
    instagram:
      "Printed panel = a picture of a surface.\nMillwork = a surface.\n\nEdges that catch light. Materials with weight. Something you can lean on.\n\nPeople read the difference in about a second, even if they can't name it.",
    hashtags: TAGS.custom,
    href: "/products/custom-trade-show-exhibits",
    cta: "design",
  },
  {
    id: "custom-3d-first",
    week: 4,
    theme: "custom",
    title: "3D before anything else",
    linkedin:
      "We design in 3D before anyone signs anything, and we don't charge for it.\n\nNot because it's generous — because it's the cheapest way to find the problems. Sightlines that don't work, a counter blocking the aisle, a hanging structure the hall won't allow, a graphic that dies at eye level. All of it is obvious in a render and expensive on a show floor.\n\nSend us a footprint and a brand, get a design back. No commitment attached.",
    instagram:
      "Free 3D design. Before you sign anything.\n\nNot generosity — it's the cheapest place to find the problems. Bad sightlines, blocked aisles, rigging the hall won't allow.\n\nObvious in a render. Expensive on the floor.\n\nSend us a footprint 👉 link in bio",
    hashtags: TAGS.custom,
    href: "/rent-a-booth",
    cta: "design",
  },
  {
    id: "custom-activation",
    week: 6,
    theme: "custom",
    title: "Brand activations",
    linkedin:
      "A brand activation is not a bigger booth. It's a different brief.\n\nA booth optimises for qualified conversations. An activation optimises for a moment people choose to participate in and then share — which means the design question is \"what's the thing they do here?\", not \"where does the product go?\".\n\nThe builds that work have one interaction, done properly, with a queue that feels like an event rather than a line. Everything else is set dressing around it.",
    instagram:
      "Activation ≠ bigger booth.\n\nBooth → optimises for qualified conversations\nActivation → optimises for a moment people choose to join, then share\n\nThe question isn't \"where does the product go?\"\nIt's \"what's the thing they DO here?\"",
    hashtags: TAGS.custom,
    href: "/products/custom-trade-show-exhibits",
    cta: "meeting",
  },
  {
    id: "custom-double-deck",
    week: 7,
    theme: "custom",
    title: "Double deck economics",
    linkedin:
      "The cheapest square footage at most shows is vertical.\n\nA double deck gives you meeting space, storage and a hospitality area without buying more floor — and floor is priced per square foot by the show, while your second storey is a one-time build cost you can rent.\n\nThe gating items are height rules for that specific hall, stamped engineering drawings, and rigging labour. All three are solvable if you start twelve weeks out. None of them are solvable at four.",
    instagram:
      "Cheapest square footage at any show? Vertical. ⬆️\n\nA second storey gets you meetings, storage and hospitality without buying more floor.\n\nGating items: hall height rules, stamped drawings, rigging labour.\n\nAll solvable at 12 weeks. None at 4.",
    hashtags: TAGS.custom,
    href: "/double-deck-trade-show-booths",
    cta: "meeting",
  },
  {
    id: "custom-reuse",
    week: 9,
    theme: "custom",
    title: "Designing for the second show",
    linkedin:
      "Most booths are designed for one show and then quietly cost money for three years.\n\nDesigning for reuse changes small decisions: modular spine so the 20×20 splits into two 10×10s, graphics separated from structure so a rebrand costs fabric not framing, crate sizes that don't trigger oversize freight, and components that fit a standard dock.\n\nNone of that shows in the render. All of it shows in the third invoice.",
    instagram:
      "Design for show two, not just show one.\n\n• Modular spine → 20×20 splits into two 10×10s\n• Graphics separate from structure → rebrand = new fabric, not new booth\n• Crate sizes that dodge oversize freight\n\nNone of it shows in the render. All of it shows in invoice #3.",
    hashtags: TAGS.custom,
    href: "/blog/modular-vs-custom-trade-show-booths",
    cta: "design",
  },
  {
    id: "custom-process",
    week: 12,
    theme: "custom",
    title: "How a custom build runs",
    linkedin:
      "How a custom build actually runs, start to floor:\n\nBrief and budget → 3D concepts → design approved → engineering and hall compliance → graphics production → pre-build in our shop → crate and ship → install → show → dismantle and return.\n\nThe pre-build is the step most suppliers skip and the one that saves show floors. Every custom structure we make gets assembled in the shop first, so the first time it goes together isn't in a hall with an hourly crew standing around it.",
    instagram:
      "Custom build, start to floor:\n\nbrief → 3D → approval → engineering → graphics → PRE-BUILD → crate → install → show → dismantle\n\nThat pre-build step is the one most suppliers skip.\n\nWe assemble everything in the shop first. The show floor is never the first attempt.",
    hashtags: TAGS.custom,
    href: "/products/custom-trade-show-exhibits",
    cta: "meeting",
  },

  // ── Resources & tools (6) ─────────────────────────────────────────────
  {
    id: "res-hub",
    week: 1,
    theme: "resources",
    title: "Exhibitor resource centre",
    linkedin:
      "We put everything an exhibitor needs in the sixteen weeks before a show in one place, free and ungated:\n\n• Budget worksheet with every real line item\n• Show services deadline tracker with calendar export\n• Graphic file specs and artwork templates\n• ROI and cost-per-lead calculator\n• Booth staffing and lead capture playbook\n• Shipping, drayage and crate checklist\n• Show-day setup checklist\n• Venue exhibitor rules cheat sheets\n\nNo email wall on the checklists. Bookmark it and send it to whoever's running your next show.",
    instagram:
      "Everything you need in the 16 weeks before a show. One page. Free.\n\n📊 Budget worksheet\n⏱️ Deadline tracker\n🎨 Graphic specs + templates\n📈 ROI calculator\n👥 Staffing playbook\n🚛 Shipping checklist\n✅ Setup checklist\n🏛️ Venue rules\n\nBookmark it. Link in bio.",
    hashtags: TAGS.resources,
    href: "/exhibitor-resources",
    cta: "resource",
  },
  {
    id: "res-staffing",
    week: 5,
    theme: "resources",
    title: "Booth staffing playbook",
    linkedin:
      "Booth staff make or break the spend, and almost nobody trains them.\n\nThe basics that change results: two staff per 10×10 minimum, shifts no longer than four hours, no phones and no sitting, one opening question rehearsed by everyone, three qualifying questions after it, and a hard rule that nobody eats in the booth.\n\nThe opening question matters most. \"How's the show going for you?\" outperforms \"Can I help you?\" by a mile, because one of them is answerable while walking.",
    instagram:
      "Booth staff rules that actually work 👥\n\n• 2 people per 10×10, minimum\n• Shifts max 4 hours\n• No phones. No sitting. No eating.\n• One rehearsed opening question\n• Three qualifying questions after it\n\n\"How's the show going for you?\" beats \"Can I help you?\" every time.",
    hashtags: TAGS.resources,
    href: "/exhibitor-resources/booth-staff-training-guide",
    cta: "resource",
  },
  {
    id: "res-glossary",
    week: 6,
    theme: "resources",
    title: "Exhibit glossary",
    linkedin:
      "Drayage. Bill of lading. Marshalling yard. In-line vs peninsula vs island. EAC. Target move-in. Hardwall vs pipe and drape. CWT.\n\nThe exhibit industry runs on jargon, and the cost of not knowing a term is usually a line on an invoice.\n\nSo we wrote the glossary in plain language. Free, no signup, and genuinely useful for anyone reading their first exhibitor manual.",
    instagram:
      "Exhibit jargon, decoded 📖\n\ndrayage · CWT · marshalling yard · EAC · target move-in · peninsula vs island · hardwall vs pipe and drape\n\nNot knowing a term usually costs you a line on an invoice.\n\nFree glossary in bio.",
    hashtags: TAGS.resources,
    href: "/resources/trade-show-exhibit-glossary",
    cta: "resource",
  },
  {
    id: "res-cross-border",
    week: 8,
    theme: "resources",
    title: "Canada / US cross-border",
    linkedin:
      "Shipping a booth across the Canada–US border is the most common place a show goes sideways for our clients, and it's almost always paperwork rather than logistics.\n\nCarnet or temporary import, commercial invoice values that match what's in the crate, a customs broker who has handled trade show freight before, and buffer days on the schedule for a border hold you can't control.\n\nBuild the buffer in. A booth stuck at a crossing is a booth that isn't at your show.",
    instagram:
      "Shipping a booth across the CAN/US border? 🇨🇦🇺🇸\n\nIt's never the logistics. It's the paperwork.\n\n• Carnet or temporary import\n• Invoice values matching the crate\n• A broker who's done show freight\n• Buffer days for a border hold\n\nFull guide in bio.",
    hashtags: TAGS.resources,
    href: "/guides/cross-border-trade-show-shipping-canada-usa",
    cta: "resource",
  },
  {
    id: "res-venue-rules",
    week: 10,
    theme: "resources",
    title: "Venue rules cheat sheets",
    linkedin:
      "Hall rules are not national. They're per-venue, sometimes per-hall.\n\nHanging sign height limits, rigging rules, union jurisdiction, fire and material rules, and booth height by footprint all change depending on where you're exhibiting — which is exactly why a design approved at one show can get flagged at the next.\n\nWe keep cheat sheets per venue, built from published exhibitor manuals. Check yours before design, not after.",
    instagram:
      "Hall rules are per-venue. Sometimes per-hall. 🏛️\n\nSign height · rigging · union jurisdiction · fire and material rules · booth height by footprint\n\nWhich is why a design approved at one show gets flagged at the next.\n\nCheat sheets in bio. Check before you design.",
    hashtags: TAGS.resources,
    href: "/exhibitor-resources/venue-rules",
    cta: "resource",
  },
  {
    id: "res-geo-ai",
    week: 11,
    theme: "resources",
    title: "Getting found in AI search",
    linkedin:
      "Exhibitors are increasingly finding suppliers through AI answers rather than a list of blue links — and the same shift is happening to your buyers.\n\nWhat gets a page cited: a direct answer near the top, real specifics rather than adjectives, published numbers, structured data, and content that answers the question actually being asked rather than the keyword adjacent to it.\n\nWe wrote up what we've learned applying this to our own pages.",
    instagram:
      "People are finding suppliers through AI answers now, not just blue links.\n\nWhat gets cited:\n• Direct answer up top\n• Real specifics, not adjectives\n• Published numbers\n• Structured data\n• Answers the actual question\n\nWhat we learned doing it to our own site — bio.",
    hashtags: TAGS.resources,
    href: "/blog/ai-search-geo-for-exhibitors",
    cta: "resource",
  },

  // ── Pricing tools & 3D design (4) ─────────────────────────────────────
  {
    id: "auto-instant-quote",
    week: 2,
    theme: "automation",
    title: "Instant quote",
    linkedin:
      "You shouldn't have to wait three business days to find out whether a booth fits your budget.\n\nSo we built instant quoting into the catalogue. Pick a design, pick your show city, get a price range on screen. If you want it changed — different footprint, added millwork, hospitality build-out — hit customize and a real person picks it up from there.\n\nTwo paths, and neither one starts with a form you fill out hoping someone calls back.",
    instagram:
      "Booth pricing shouldn't take three business days.\n\nPick a design → pick your show city → see the range. On screen. Now.\n\nWant it changed? Hit customize and a human takes it from there.\n\nNeither path starts with \"someone will call you back.\"",
    hashtags: TAGS.rental,
    href: "/rent-a-booth",
    cta: "quote",
  },
  {
    id: "auto-booth-plan",
    week: 6,
    theme: "automation",
    title: "Build your booth plan",
    linkedin:
      "Not sure what you need? Two or three minutes of questions gets you a footprint recommendation, a budget range, a build type and a work-back schedule for your show date.\n\nIt asks the things that actually determine the answer: how many shows a year, what you're trying to do in the booth, how many people you're staffing, whether you need meeting space, and what your approval process looks like.\n\nOutput is a plan you can take to your team, not a lead form with extra steps.",
    instagram:
      "\"I don't know what I need\" → answer a few questions → get a plan.\n\nFootprint · budget range · build type · work-back schedule for your show date.\n\n2–3 minutes. Output is something you can show your team.\n\nLink in bio 🧭",
    hashtags: TAGS.core,
    href: "/build-your-booth-plan",
    cta: "resource",
  },
  {
    id: "auto-3d-offer",
    week: 8,
    theme: "automation",
    title: "Free 3D design offer",
    linkedin:
      "Standing offer: send us your footprint, your show and your brand, and we'll design your booth in 3D. No cost, no commitment, no obligation to build with us.\n\nWe do it because the design is where you find out whether we understand your brief. If we get it right, you'll know. If we don't, you've lost nothing but the time it took to send the email.\n\nThat's a better sales process for both of us than a PDF of past projects.",
    instagram:
      "Free 3D design of your booth. No cost. No commitment. No obligation to build with us.\n\nWhy? Because the design is where you find out if we understood the brief.\n\nGet it right, you'll know. Get it wrong, you lost nothing.\n\nSend us a footprint 👉 bio",
    hashtags: TAGS.custom,
    href: "/rent-a-booth",
    cta: "design",
  },
  {
    id: "auto-meeting",
    week: 12,
    theme: "automation",
    title: "Two meeting lengths",
    linkedin:
      "We offer two meeting lengths, on purpose.\n\n10 minutes — anyone, any stage. Enough to answer \"is this realistic for my budget and timeline?\" and nothing more. No deck.\n\n30 minutes — for $10K+ builds. Footprint, layout options, city-specific costs, work-back schedule, and what we'd need from you to start design.\n\nNobody should have to sit through a half-hour call to get a five-minute answer.",
    instagram:
      "Two meeting lengths. On purpose.\n\n10 min → anyone. \"Is this realistic for my budget and timeline?\" No deck.\n\n30 min → $10K+ builds. Layout options, city costs, work-back schedule.\n\nNobody should sit through 30 minutes for a 5-minute answer.",
    hashtags: TAGS.core,
    href: "/contact",
    cta: "meeting",
  },

  // ── Hiring & careers (8) ─────────────────────────────────────────────
  {
    id: "hire-overview",
    week: 1,
    theme: "hiring",
    title: "We hire across five disciplines",
    linkedin:
      "Traction X is a full-service exhibit house — design, fabrication, project management, install crews and sales all under one roof.\n\nThat means we hire across five very different disciplines:\n\n• Fabrication — millwork, welding, CNC, finishing, textile print\n• Design — booth design, 3D rendering, production drawings\n• Project management — kickoff through advance forms, freight and wrap\n• Install crew — structure, graphics, AV and show-day support on the floor\n• Sales — scoping exhibit programs and owning client relationships\n\nWe don't always have a posted opening. We do always read strong applications, and we keep them on file.",
    instagram:
      "Five disciplines under one roof: fabrication, design, project management, install crew, sales.\n\nWe don't always have a posted opening — we always read strong applications.\n\nRoles and how to apply → link in bio.",
    hashtags: TAGS.hiring,
    href: "/careers",
    overlayText: "We're always open to hearing from people who do this work well.",
    cta: "careers",
  },
  {
    id: "hire-fabrication",
    week: 2,
    theme: "hiring",
    title: "Fabrication roles",
    linkedin:
      "Hiring: fabrication.\n\nMillwork, welding, CNC operation, finishing and textile print — building custom booth structures in-house, not sourcing them.\n\nTrade show experience isn't required. The underlying trades transfer. What matters is whether you care about the difference between a booth that looks right in a render and one that survives four days on a show floor.\n\nShop-based. No regular travel.",
    instagram:
      "Hiring: fabrication.\n\nMillwork · welding · CNC · finishing · textile print. Built in-house.\n\nNo trade show experience needed — the trades transfer.\n\nShop-based, no regular travel. Apply via link in bio.",
    hashtags: TAGS.hiring,
    href: "/careers",
    format: "promise",
    promiseIds: ["prebuild"],
    cta: "careers",
  },
  {
    id: "hire-design",
    week: 4,
    theme: "hiring",
    title: "Design + 3D rendering roles",
    linkedin:
      "Hiring: booth design and 3D rendering.\n\nThis role turns an exhibitor's objectives into a buildable, freight-ready exhibit — concept, renders, then production drawings our own shop has to work from.\n\nThe feedback loop is short and honest: you'll see what you drew get built, crated, and stood up on a floor. That's rare in design work.\n\nPortfolios welcome, including co-op and apprentice applications.",
    instagram:
      "Hiring: booth design + 3D rendering.\n\nConcept → renders → production drawings our own shop builds from.\n\nYou'll see what you drew get built, crated and stood up on a floor.\n\nPortfolios welcome. Link in bio.",
    hashtags: TAGS.hiring,
    href: "/careers",
    format: "photo",
    cta: "careers",
  },
  {
    id: "hire-project-management",
    week: 6,
    theme: "hiring",
    title: "Project management roles",
    linkedin:
      "Hiring: project management.\n\nYou own a show from kickoff through advance forms, freight timing and post-show wrap — across clients in very different industries.\n\nExhibits are unforgiving: a booth either goes up correctly on a fixed date at a fixed venue, or it doesn't. This role suits people who flag a problem early rather than hope it resolves itself.\n\nSome show-season travel. Prior exhibit, event or agency production experience makes it much easier.",
    instagram:
      "Hiring: project management.\n\nKickoff → advance forms → freight timing → post-show wrap. You own the show.\n\nFor people who flag problems early instead of hoping.\n\nSome show-season travel. Link in bio.",
    hashtags: TAGS.hiring,
    href: "/careers",
    format: "promise",
    promiseIds: ["fixed-scope", "response"],
    cta: "careers",
  },
  {
    id: "hire-install-crew",
    week: 8,
    theme: "hiring",
    title: "Install & dismantle crew",
    linkedin:
      "Hiring: install and dismantle crew.\n\nOn-site work at convention centres across North America — structure, graphics, AV and show-day support. Concentrated in Las Vegas, Orlando, Chicago, New York, Toronto and Vancouver, through the spring and fall seasons.\n\nInstall and dismantle is included in every booth we quote, which means our crews are on the floor with the client rather than handed off to a stranger. If you like travel, tight timelines and finishing the job properly, this is that work.",
    instagram:
      "Hiring: install & dismantle crew.\n\nLas Vegas · Orlando · Chicago · New York · Toronto · Vancouver. Spring and fall seasons.\n\nStructure, graphics, AV, show-day support — on the floor with the client.\n\nLink in bio.",
    hashtags: TAGS.hiring,
    href: "/careers",
    format: "promise",
    promiseIds: ["on-floor", "id-included"],
    cta: "careers",
  },
  {
    id: "hire-sales",
    week: 9,
    theme: "hiring",
    title: "Sales roles",
    linkedin:
      "Hiring: sales.\n\nScoping exhibit programs, quoting custom builds and rentals, and holding client relationships across a full show calendar.\n\nWhat makes it different here: install and dismantle is already in our pricing, scope is fixed in writing, and change orders don't appear quietly. You're not selling around surprises — which changes the kind of conversation you get to have.\n\nPrior exhibit, event or agency experience helps a lot.",
    instagram:
      "Hiring: sales.\n\nExhibit programs, custom builds and rentals, full show calendar.\n\nI&D already in our pricing. Scope fixed in writing. No quiet change orders — you're not selling around surprises.\n\nLink in bio.",
    hashtags: TAGS.hiring,
    href: "/careers",
    format: "promise",
    promiseIds: ["id-included", "fixed-scope"],
    cta: "careers",
  },
  {
    id: "hire-coop",
    week: 10,
    theme: "hiring",
    title: "Co-op students & apprentices",
    linkedin:
      "Co-op students and apprentices: we take you in fabrication and design.\n\nSend your program, your term dates and any portfolio work. You'll be on real projects — booths with a real client, a real venue and a real date that cannot move.\n\nIt's the fastest way we know to learn how something goes from a sketch to a structure that survives a show floor.",
    instagram:
      "Co-op + apprentice spots in fabrication and design.\n\nSend your program, term dates and any portfolio work.\n\nReal projects. Real client, real venue, a date that can't move.\n\nLink in bio.",
    hashtags: TAGS.hiring,
    href: "/careers",
    format: "overlay",
    overlayText: "Co-op and apprentice spots: fabrication + design",
    cta: "careers",
  },
  {
    id: "hire-culture",
    week: 11,
    theme: "hiring",
    title: "What it's like on this team",
    linkedin:
      "A booth either goes up correctly on a fixed date at a fixed venue, or it doesn't. There's no version where it's mostly fine.\n\nThat pressure shapes who does well here: people who take ownership, communicate early when something's off, and know the difference between a booth that looks right in a render and one that survives four days of traffic.\n\nBecause design, fabrication, project management, install and sales all sit in one company, you see a project from concept sketch to the crate coming home. If you'd rather own one piece start to finish than hand it off and move on — that's the job.",
    instagram:
      "A booth either goes up correctly on a fixed date, or it doesn't. No \"mostly fine.\"\n\nDesign, fabrication, PM, install and sales in one company — you see a project from sketch to the crate coming home.\n\nHiring. Link in bio.",
    hashtags: TAGS.hiring,
    href: "/careers",
    format: "overlay",
    overlayText: "Own it start to finish — sketch to crate coming home.",
    cta: "careers",
  },
];

export const SOCIAL_THEMES = Object.keys(THEME_LABEL) as SocialTheme[];

export function postsByTheme(theme: SocialTheme | "all"): SocialPost[] {
  return theme === "all" ? SOCIAL_POSTS : SOCIAL_POSTS.filter((p) => p.theme === theme);
}

/** Counts per theme, for the library header. */
export function themeCounts(): Record<SocialTheme, number> {
  const out = {} as Record<SocialTheme, number>;
  for (const t of SOCIAL_THEMES) out[t] = 0;
  for (const p of SOCIAL_POSTS) out[p.theme] += 1;
  return out;
}
