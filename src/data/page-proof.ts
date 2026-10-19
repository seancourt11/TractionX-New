/**
 * Optional "information gain" layer for city / venue / show / industry pages.
 *
 * NOTHING HERE IS REQUIRED. Every field is optional and every consumer skips
 * its section entirely when the field is missing — no empty headings, no
 * placeholder copy, no invented facts. Add entries as real material becomes
 * available (a first-hand note after a show, a photo set, a verified spec) and
 * the page picks it up automatically.
 *
 * Why it matters: Google's March 2026 core + spam updates target "scaled
 * content abuse" — sets of pages where only the entity name changes. The fix
 * is information gain: something on this page that exists on no other page.
 * Facts below should be verifiable; first-hand notes should be things Traction
 * X actually experienced.
 */

export type ProofFact = {
  /** Short label, e.g. "West Hall ceiling height". */
  label: string;
  /** The specific value or detail. */
  value: string;
  /** Optional source note shown in small text, e.g. "Venue exhibitor kit, 2026". */
  source?: string;
};

export type PageProof = {
  /** Verifiable specifics unique to this entity. Rendered as a facts grid. */
  facts?: ProofFact[];
  /** First-hand Traction X observation. Written in our own voice. */
  firstHand?: string;
  /** Named PM or lead for this market/show. */
  contact?: { name: string; role: string; email?: string };
  /** Only set when true and countable. e.g. "11 projects since 2022". */
  trackRecord?: string;
  /** ISO date of the last human review of this page's facts. */
  lastReviewed?: string;
  /** Authoritative URLs for schema.org `sameAs` — official site, Wikipedia, etc. */
  sameAs?: string[];
  /** Extra entity-specific FAQs appended to the generated set. */
  faqs?: { q: string; a: string }[];
};

type ProofMap = Record<string, PageProof>;

/* ------------------------------------------------------------------ */
/* VENUES                                                              */
/* ------------------------------------------------------------------ */

export const VENUE_PROOF: ProofMap = {
  "las-vegas-convention-center": {
    sameAs: [
      "https://www.vegasmeansbusiness.com/meeting-facilities/las-vegas-convention-center/",
      "https://en.wikipedia.org/wiki/Las_Vegas_Convention_Center",
    ],
    facts: [
      {
        label: "West Hall",
        value:
          "Opened in June 2021 as a 1.4 million sq ft expansion, adding roughly 600,000 sq ft of column-free exhibit space.",
        source: "LVCVA",
      },
      {
        label: "Underground people mover",
        value:
          "The Boring Company Vegas Loop connects West, Central and South halls — relevant when your team is splitting time between halls during move-in.",
      },
    ],
  },
  "mccormick-place": {
    sameAs: [
      "https://www.mccormickplace.com/",
      "https://en.wikipedia.org/wiki/McCormick_Place",
    ],
    facts: [
      {
        label: "Scale",
        value:
          "The largest convention centre in North America — roughly 2.6 million sq ft of exhibit space across four connected buildings.",
      },
      {
        label: "Exhibitor rights",
        value:
          "Chicago's exhibitor rights rules let your own full-time staff set up displays under 300 sq ft using hand tools, without hiring labour.",
        source: "McCormick Place exhibitor policy",
      },
    ],
  },
  "javits-center": {
    sameAs: [
      "https://www.javitscenter.com/",
      "https://en.wikipedia.org/wiki/Jacob_K._Javits_Convention_Center",
    ],
    facts: [
      {
        label: "Green roof",
        value:
          "A 6.75-acre green roof and rooftop farm — the sustainability story matters if your exhibit needs to align with a corporate ESG narrative.",
      },
    ],
  },
  "halifax-convention-centre": {
    sameAs: [
      "https://halifaxconventioncentre.com/",
      "https://en.wikipedia.org/wiki/Halifax_Convention_Centre",
    ],
    facts: [
      {
        label: "Home turf",
        value:
          "Traction X is based in Atlantic Canada. Our shop is a short drive from the loading dock, which removes cross-border freight and drayage risk entirely for Halifax shows.",
      },
    ],
  },
  "metro-toronto-convention-centre": {
    sameAs: [
      "https://www.mtccc.com/",
      "https://en.wikipedia.org/wiki/Metro_Toronto_Convention_Centre",
    ],
  },
  "palais-des-congres-montreal": {
    sameAs: ["https://congresmtl.com/en/"],
  },
  "mandalay-bay-convention-center": {
    sameAs: ["https://mandalaybay.mgmresorts.com/en/meetings-groups.html"],
  },
  "anaheim-convention-center": {
    sameAs: [
      "https://www.anaheimconventioncenter.com/",
      "https://en.wikipedia.org/wiki/Anaheim_Convention_Center",
    ],
  },
  "san-jose-mcenery-convention-center": {
    sameAs: ["https://www.sanjose.org/mcenery-convention-center"],
  },
  "long-beach-convention-center": {
    sameAs: ["https://www.longbeachcc.com/"],
  },
  "gaylord-national": {
    sameAs: ["https://www.marriott.com/en-us/hotels/wasgn-gaylord-national-resort-and-convention-center/overview/"],
  },
};

/* ------------------------------------------------------------------ */
/* SHOWS                                                               */
/* ------------------------------------------------------------------ */

export const SHOW_PROOF: ProofMap = {
  "ces-las-vegas": {
    sameAs: ["https://www.ces.tech/", "https://en.wikipedia.org/wiki/CES_(trade_show)"],
  },
  "nab-show": {
    sameAs: ["https://nabshow.com/", "https://en.wikipedia.org/wiki/NAB_Show"],
  },
  "himss-global": {
    sameAs: ["https://www.himss.org/global-conference/"],
  },
  "web-summit-vancouver": {
    sameAs: ["https://vancouver.websummit.com/"],
  },
  "defsec-atlantic": {
    sameAs: ["https://defsecatlantic.ca/"],
  },
  mjbizcon: {
    sameAs: ["https://mjbizconference.com/"],
  },
  fabtech: {
    sameAs: ["https://www.fabtechexpo.com/"],
  },
};

/* ------------------------------------------------------------------ */
/* CITIES                                                              */
/* ------------------------------------------------------------------ */

export const CITY_PROOF: ProofMap = {
  halifax: {
    facts: [
      {
        label: "Local shop",
        value:
          "Halifax is our home market. Fabrication, storage and install crews are all local, so there is no long-haul freight line on a Halifax quote.",
      },
    ],
  },
  "las-vegas": {
    facts: [
      {
        label: "Labour jurisdiction",
        value:
          "Freight and material handling on the show floor falls to Teamsters Local 631; carpentry, decorating and I&D work is split with IATSE Local 720 depending on the hall and the general service contractor.",
        source: "GSC exhibitor service kits, Las Vegas halls",
      },
      {
        label: "Fire marshal review",
        value:
          "Clark County Fire Department requires stamped drawings for any structure over 12 ft, covered ceilings, and multi-level booths — plan for review weeks before the exhibitor kit deadline, not after.",
        source: "Clark County Fire Department exhibit guidelines",
      },
      {
        label: "Advance warehouse",
        value:
          "Most Las Vegas advance warehouses stop receiving without surcharge about one week before move-in; material shipped direct-to-show only moves on your assigned target date.",
      },
    ],
    firstHand:
      "The single most expensive mistake we see in Vegas is missing the target move-in window. Halls the size of LVCC run on marshalling yards — arrive off-target and your crate sits while your crew stands billable. We book crews against the target time, not the show open.",
  },
  orlando: {
    facts: [
      {
        label: "Venue scale",
        value:
          "The Orange County Convention Center runs two campuses — the West and North/South buildings — connected by a pedestrian bridge, so hall assignment changes your freight route and crew staging entirely.",
        source: "OCCC exhibitor information",
      },
      {
        label: "Labour",
        value:
          "Orlando is a right-to-work market: exhibitors may set their own displays, but GSC-controlled forklift, rigging and material handling still applies.",
      },
    ],
  },
  chicago: {
    facts: [
      {
        label: "Exhibitor rights",
        value:
          "McCormick Place's exhibitor rights rules allow your own full-time employees to set up a display under 300 sq ft using hand tools, without hiring labour — a real budget lever on smaller footprints.",
        source: "McCormick Place exhibitor policy",
      },
      {
        label: "Weather window",
        value:
          "Winter move-ins at McCormick regularly slip because of lake-effect freight delays; we stage Chicago programmes to the advance warehouse rather than direct-to-show between December and March.",
      },
    ],
  },
  toronto: {
    facts: [
      {
        label: "Labour",
        value:
          "Metro Toronto Convention Centre work is covered by IATSE Local 58 for stagehand and display labour, with separate electrical jurisdiction — booth electrical is ordered through the venue, not your I&D crew.",
      },
      {
        label: "Two buildings, one name",
        value:
          "The MTCC's North and South buildings sit on opposite sides of Front Street with separate docks — confirm your building before booking freight.",
        source: "MTCC exhibitor services",
      },
    ],
  },
  vancouver: {
    facts: [
      {
        label: "Labour",
        value:
          "Vancouver Convention Centre display labour is IATSE Local 118 jurisdiction; the East and West buildings have separate loading facilities and marshalling.",
      },
      {
        label: "Sustainability rules",
        value:
          "The centre is LEED Platinum and enforces waste-diversion requirements at teardown — single-use printed structures generate disposal charges that modular rentals avoid.",
        source: "Vancouver Convention Centre exhibitor guide",
      },
    ],
  },
  "new-york-city": {
    facts: [
      {
        label: "Freight reality",
        value:
          "Javits move-ins run through a dock system with strict appointment windows and no on-site trailer storage; in Manhattan a missed window usually means a next-day re-delivery, not a two-hour wait.",
      },
      {
        label: "Cost band",
        value:
          "New York is our highest-cost labour market — we quote NYC programmes roughly 15% above the national band to reflect drayage and crew rates rather than discovering it on the show bill.",
      },
    ],
  },
  atlanta: {
    facts: [
      {
        label: "Venue",
        value:
          "Georgia World Congress Center spans three connected buildings with more than 1.5 million sq ft of exhibit space — hall assignment drives which dock and marshalling yard your freight uses.",
        source: "GWCC exhibitor information",
      },
    ],
  },
  "san-diego": {
    facts: [
      {
        label: "Move-in pressure",
        value:
          "San Diego Convention Center sits on a constrained downtown site with limited marshalling; Comic-Con and large medical shows compress target windows more than the published schedule suggests.",
      },
    ],
  },
  anaheim: {
    facts: [
      {
        label: "Venue",
        value:
          "Anaheim Convention Center is the largest exhibit facility on the West Coast, with the ACC North structure adding flexible multi-level space above the original halls.",
        source: "Anaheim Convention Center facility data",
      },
    ],
  },
  boston: {
    facts: [
      {
        label: "Labour",
        value:
          "Boston Convention & Exhibition Center operates under exhibitor-friendly labour rules that let exhibitors set up small booths themselves, but rigging and electrical remain venue-controlled.",
      },
    ],
  },
  montreal: {
    facts: [
      {
        label: "Language",
        value:
          "Quebec's language legislation expects French to be at least as prominent as English on commercial signage — we produce booth graphics bilingual by default for Palais des congrès builds.",
      },
    ],
  },
  dallas: {
    facts: [
      {
        label: "Venue",
        value:
          "Kay Bailey Hutchison Convention Center is under a phased redevelopment, so hall availability and dock configuration shift year to year — we confirm against the current exhibitor kit for each show, not last year's plan.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* INDUSTRIES                                                          */
/* ------------------------------------------------------------------ */

export const INDUSTRY_PROOF: ProofMap = {};

/* ------------------------------------------------------------------ */

export function getVenueProof(slug: string): PageProof {
  return VENUE_PROOF[slug] ?? {};
}
export function getShowProof(slug: string): PageProof {
  return SHOW_PROOF[slug] ?? {};
}
export function getCityProof(slug: string): PageProof {
  return CITY_PROOF[slug] ?? {};
}
export function getIndustryProof(slug: string): PageProof {
  return INDUSTRY_PROOF[slug] ?? {};
}

/** True when there is at least one renderable proof element. */
export function hasProof(p: PageProof): boolean {
  return Boolean(
    (p.facts && p.facts.length) || p.firstHand || p.trackRecord || p.contact,
  );
}
