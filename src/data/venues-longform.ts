import type { Venue } from "./venues";

// Long-form SEO content for /venues/$slug pages. Same pattern as
// shows-longform.ts: generate rich contextual sections from existing venue
// fields, allow per-venue overrides for flagship properties.

export type Faq = { q: string; a: string };
export type VenueLongform = {
  tldr: string;
  overview: string[];
  hallStrategy: string;
  loadingDocks: string;
  powerData: { label: string; value: string }[];
  riggingRules: string[];
  unionRules: string[];
  accessibility: string;
  sustainability: string;
  arrivalGuide: { from: string; detail: string }[];
  nearbyFB: string[];
  afterHours: string[];
  weatherSeason: string;
  faqs: Faq[];
};

export function buildVenueLongform(v: Venue): VenueLongform {
  const override = VENUE_OVERRIDES[v.slug] ?? {};
  const countryLabel =
    v.country === "US" ? "United States" : v.country === "CA" ? "Canada" : v.country;
  const unionOrRTW = /right-to-work/i.test(v.union)
    ? "right-to-work state — exhibitor set-up of small hand-carriable material is permitted, but larger builds still require GC-dispatched crews"
    : `union labor jurisdictions apply — ${v.union}`;

  const base: VenueLongform = {
    tldr:
      override.tldr ??
      `${v.name} is a ${v.size} convention property in ${v.city}, ${v.stateAbbr}, ${countryLabel}. It hosts ${v.majorShows.slice(0, 4).join(", ")} and other major events. Traction X handles custom booth rentals, freight, drayage coordination, and on-site project management at ${v.shortName} — with pricing that ranges from $16,250 for a 10×10 rental to $130,000+ for hero islands, depending on scope, materials, and AV.`,
    overview:
      override.overview ??
      [
        `${v.name} anchors ${v.city}'s convention economy. The property covers roughly ${v.size} across ${v.halls}, which makes it one of the venues that shapes how the ${countryLabel} tradeshow calendar is booked — anchor shows like ${v.majorShows.slice(0, 2).join(" and ")} rely on the footprint being available in specific weeks each year.`,
        `Because ${v.shortName} operates at the scale it does, exhibitors need to plan against the venue's operating rhythms, not the other way around. That means understanding the loading dock schedule, the exclusive contractor list (electrical, internet, rigging), the labor jurisdictions in play, and the way each hall's ceiling, columns, and hanging points constrain what you can actually build. Traction X spends most of its planning cycle with a client on those constraints before we ever finalize a design.`,
        `Our project managers work ${v.shortName} year-round across ${v.majorShows.length}+ recurring shows, which is the reason we can price accurately, sequence freight without gambling, and put a supervisor on site who has met the venue's shop stewards before. That familiarity compounds — clients who book multiple ${v.shortName} shows through Traction X get faster approvals, better labor allocations, and warehouse storage between shows so freight can stay short-haul instead of coast-to-coast.`,
      ],
    hallStrategy:
      override.hallStrategy ??
      `${v.shortName}'s halls (${v.halls}) each behave differently. Ceiling heights, column grids, and dock proximity vary hall to hall, which means the same 20×20 booth design can succeed in one hall and struggle two halls over. When you engage Traction X during space selection we overlay your booth CAD against the current published floor plan, flag column obstructions in your sightlines, confirm your hanging sign clears the truss, and pick a location whose surrounding neighbors will actually help your traffic.`,
    loadingDocks:
      override.loadingDocks ??
      `Loading at ${v.shortName} runs through the venue's dedicated docks, and inbound freight for large shows almost always sequences through an off-site marshalling yard managed by the show's general contractor (${v.drayage}). For any island booth above 200 sq ft we default to advance-warehouse shipment — inbound to marshalling one to two weeks before show move-in, then targeted to the booth on a scheduled window. Direct-to-show shipments are viable for small in-line booths but risk multi-hour dock waits during peak move-in windows.`,
    powerData:
      override.powerData ??
      [
        { label: "Electrical", value: "Ordered through the venue's exclusive electrical contractor. Advance-order pricing is typically 20–40% cheaper than same-day on-site orders." },
        { label: "Internet & data", value: "Venue-exclusive provider on most halls; hardline is more reliable than convention Wi-Fi for demos that need to be certain." },
        { label: "Water & compressed air", value: "Available in most halls on advance order; used for kitchen demos, live-cooking booths, and industrial equipment displays." },
        { label: "Rigging & hang points", value: "Rigging is managed by the venue or GC's rigging team. Hanging signs and truss must be engineered and approved 30–60 days before move-in." },
      ],
    riggingRules:
      override.riggingRules ??
      [
        "Hanging signs require engineered drawings signed and stamped by a licensed engineer, submitted through the show's GC.",
        "Approval deadlines are typically 30–60 days ahead of move-in — miss the window and the sign goes on the floor, not overhead.",
        "Weight limits vary by hall and grid location. Traction X confirms load ratings against your rigging plot before design is signed off.",
        "Rigging labor is dispatched by the venue or the show's rigging vendor; exhibitors cannot self-perform overhead work.",
        "Motorized rigging and moving elements need extra lead time and pre-show inspection.",
      ],
    unionRules:
      override.unionRules ??
      [
        `${v.shortName} operates under ${v.union}.`,
        `In practice, that means ${unionOrRTW}.`,
        "Freight, forklift, and material handling are typically Teamsters or equivalent jurisdiction.",
        "Booth carpentry, assembly of built exhibits, and setting of hard-walls is usually Carpenters jurisdiction.",
        "Rigging, AV, and audio-visual are commonly IATSE jurisdiction.",
        "Electrical is dispatched by the venue's exclusive electrical vendor and cannot be self-performed.",
        "Traction X coordinates all jurisdictions on your behalf so exhibitors interact with a single project manager rather than four separate labor calls.",
      ],
    accessibility:
      override.accessibility ??
      `${v.name} meets ${countryLabel} accessibility standards, with barrier-free access to all public areas, accessible parking, freight elevators between exhibit halls and meeting rooms, and ADA-compliant signage. Traction X designs booths with ADA-compliant aisles, accessible counter heights on at least one reception surface, and clear pathways through demo zones so your booth is usable by every attendee on the floor.`,
    sustainability:
      override.sustainability ??
      `Every booth we deliver at ${v.shortName} is designed to reuse. Rental frames, walls, and reception furniture return to Traction X's warehouse for refurb and redeploy. When you own booth properties, we build to modular tolerances so hero elements refresh with graphics instead of full rebuilds year over year. That is the single biggest sustainability lever available to a convention exhibitor, and it keeps your capex profile flat instead of spiky.`,
    arrivalGuide:
      override.arrivalGuide ??
      [
        { from: "Airport", detail: `Most Traction X clients arrive via the nearest major airport to ${v.city}. Rideshare is typically the fastest option outside peak convention windows; during major show move-in, book crew shuttles.` },
        { from: "Hotels", detail: `Room blocks near ${v.shortName} — ${v.nearbyHotels.slice(0, 4).join(", ")} — sell out quickly for anchor shows. Book housing at the same time you book booth space.` },
        { from: "Freight yards", detail: `The show's advance freight yard is off-site and dispatches to ${v.shortName} on the GC's schedule. Ship-to-warehouse addresses are published in the exhibitor service kit six to eight weeks pre-show.` },
      ],
    nearbyFB:
      override.nearbyFB ??
      [
        "Hotel-adjacent restaurants inside the convention block",
        "Sit-down group dinner spots within 10 minutes for client entertainment",
        "Quick-service breakfast for install crews near the loading dock",
        "Coffee delivery services that will run to the show floor",
      ],
    afterHours:
      override.afterHours ??
      [
        "Hotel bars in the convention block for informal client meetings",
        "Private-dining rooms for executive dinners (book 6+ weeks ahead)",
        "Off-site event spaces for sponsor parties and hospitality nights",
      ],
    weatherSeason:
      override.weatherSeason ??
      `Plan crew wardrobe and freight protection against ${v.city}'s seasonal weather during each show week. Traction X pre-checks crated freight for moisture protection when we know a show sits in a rainy or snowy season, and we build in a small time buffer when winter weather could delay inbound trucks.`,
    faqs:
      override.faqs ??
      [
        {
          q: `Who is the general contractor at ${v.shortName}?`,
          a: `${v.drayage} Traction X coordinates directly with the GC on freight, drayage, hanging signs, and labor calls so you interact with a single project manager instead of a stack of vendors.`,
        },
        {
          q: `What labor jurisdictions apply at ${v.shortName}?`,
          a: `${v.union}. Traction X dispatches the correct trades for each scope element so exhibitors do not need to become experts in local jurisdictional rules.`,
        },
        {
          q: `Can we install our own booth at ${v.shortName}?`,
          a: /right-to-work/i.test(v.union)
            ? `Yes — most right-to-work venues allow exhibitor set-up of small hand-carriable booths, typically up to about 300 sq ft. Larger builds still require dispatched crews. Confirm the specific show's exhibitor kit for the current threshold.`
            : `Exhibitor set-up is limited at ${v.shortName}. Small hand-carriable in-line displays may qualify, but any booth that requires tools, ladders, or forklift work needs dispatched labor from the show's GC.`,
        },
        {
          q: `How much does drayage cost at ${v.shortName}?`,
          a: `Drayage is billed by the show's GC per hundredweight (cwt) and varies by show. Expect drayage to consume 15–25% of your freight budget as a rule of thumb. Advance-warehouse shipments are usually cheaper per cwt than direct-to-show and reduce dock congestion.`,
        },
        {
          q: `Does ${v.shortName} allow hanging signs?`,
          a: `Yes. Hanging signs require engineered drawings submitted through the show's GC 30–60 days pre-show, and rigging is performed by the venue or GC's rigging team. Traction X handles the sign design, engineering, and rigging coordination end to end.`,
        },
        {
          q: `Where should we stay near ${v.shortName}?`,
          a: `Room blocks near ${v.shortName} — ${v.nearbyHotels.slice(0, 4).join(", ")} — are the most convenient for client meetings and short crew commutes to the loading dock. Book housing early; anchor shows sell out room blocks months ahead.`,
        },
        {
          q: `Can Traction X store our booth between shows at ${v.shortName}?`,
          a: `Yes. Traction X operates warehouse storage and manages between-show refurb, graphic refresh, and re-crating so freight can stay short-haul instead of round-tripping across the continent between events.`,
        },
      ],
  };

  return base;
}

const VENUE_OVERRIDES: Record<string, Partial<VenueLongform>> = {
  "las-vegas-convention-center": {
    tldr:
      "The Las Vegas Convention Center (LVCC) is North America's largest tech, security, and consumer-show venue at 4.6M sq ft (2.5M sq ft exhibit) across West, Central, North, South halls and the Grand Concourse. It hosts CES, NAB, MAGIC, SEMA, ISC West, World of Concrete, IMEX America and MINExpo. Traction X delivers custom booth rentals, Teamsters-managed I&D, IATSE-coordinated rigging, and full project management at LVCC — with rental pricing from $16,250 for a 10×10 up to six-figure hero islands.",
  },
  "halifax-convention-centre": {
    tldr:
      "The Halifax Convention Centre is Atlantic Canada's flagship convention property and the home of DEFSEC Atlantic every October. Traction X is a full-service custom exhibit rental partner at the Halifax Convention Centre — design, fabrication, AV, install, dismantle, and on-site project management.",
  },
};
