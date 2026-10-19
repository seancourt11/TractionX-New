export type FloorPlanPlatform = {
  slug: string;
  name: string;
  category:
    | "Floor-plan-first"
    | "Trade show operating system"
    | "Enterprise event suite"
    | "Event app";
  bestFor: string;
  strengths: string[];
  considerations: string[];
  pricingNote: string;
  whereWeFit: string;
  whoShouldPick: string[];
  lastVerified: string;
};

export const FLOORPLAN_PLATFORMS: FloorPlanPlatform[] = [
  {
    slug: "expofp",
    name: "ExpoFP",
    category: "Floor-plan-first",
    bestFor:
      "Show organizers who want a purpose-built, visually polished interactive floor plan without a full event-management suite attached.",
    strengths: [
      "Floor plan is the whole product, so the map builder, booth inventory and exhibitor self-service tools are deep rather than bolted on",
      "Exhibitors get an auto-login link to manage their own profile and reserve booths directly on the map",
      "Optional credit card payment collection so booths and sponsorships can be sold straight off the plan",
      "Packaged tiers (Maps Only, Maps and Exhibitors, Maps, Exhibitors and Payments) let organizers add capability as the show grows",
      "A professional design team option for organizers who want the plan built and styled for them rather than self-serve",
    ],
    considerations: [
      "It's a floor plan tool first, not a full registration, housing or conference-management platform, so larger organizers usually still run those pieces elsewhere",
      "Pricing scales with booth count and event count, which is worth mapping against your show's size before committing",
      "Self-serve plans still need someone to own booth-mix strategy, sponsor placement and exhibitor onboarding day to day",
      "Best-looking results typically come from either the paid design service or a team comfortable in the FP Designer tool",
    ],
    pricingNote:
      "Per-event pricing based on booth count, published on expofp.com/pricing, plus a professional design add-on; annual licensing is available for organizers running 10+ events per year — contact ExpoFP for a quote.",
    whereWeFit:
      "Traction X runs the floor plan operationally on top of ExpoFP: we translate your CAD or hall drawing into the platform, structure booth and sponsorship inventory and pricing, onboard exhibitors, and keep the plan current through move-in — so your team gets ExpoFP's clean interactive map without carrying the day-to-day build and update workload in-house.",
    whoShouldPick: [
      "Organizers who want the floor plan itself to look best-in-class and be simple for exhibitors to use",
      "Shows that want to sell booths and sponsorships directly off the map without a heavier event suite",
      "Teams that would rather hand the plan build to a managed partner than learn a new design tool",
    ],
    lastVerified: "August 2026",
  },
  {
    slug: "mapyourshow",
    name: "Map Your Show",
    category: "Trade show operating system",
    bestFor:
      "Organizers who want floor planning bundled with booth sales, exhibitor resource management and attendee-facing tools in one connected system.",
    strengths: [
      "Floor Builder sits alongside Booth Sales, an Exhibitor Resource Center, My Show Planner and a mobile app, so the floor plan is one module in a wider trade show operating system",
      "Built specifically for trade show organizers rather than adapted from general event software",
      "Real-time floor plan updates that flow through to the exhibitor directory and attendee planner",
      "Serves trade show, conference and corporate event organizers from a single platform",
      "Long track record in the North American trade show and association market",
    ],
    considerations: [
      "The breadth of the platform means there's more to configure and learn than a floor-plan-only tool",
      "Full functionality is typically most valuable to organizers who adopt the connected suite rather than the map builder alone",
      "Pricing isn't published; it's quoted per show based on scope, so budgeting requires a sales conversation",
      "As with any all-in-one system, switching a single module later (just the floor plan, for example) is more involved than it would be with a standalone tool",
    ],
    pricingNote: "Pricing on request — Map Your Show does not publish rate cards; quotes are scoped per show.",
    whereWeFit:
      "Traction X works inside Map Your Show as your floor plan operations team: converting venue drawings into the Floor Builder, managing booth assignments and holds, coordinating with your Exhibitor Resource Center content, and keeping the plan accurate through the show cycle — so your internal team can focus on sales and sponsor relationships instead of map maintenance.",
    whoShouldPick: [
      "Organizers who want floor plan, booth sales and exhibitor resources connected in one operating system",
      "Associations and B2B trade shows already invested in the broader Map Your Show ecosystem",
      "Teams that prefer one vendor relationship over stitching together several point tools",
    ],
    lastVerified: "August 2026",
  },
  {
    slug: "expocad",
    name: "EXPOCAD (3e by A.C.T. Inc.)",
    category: "Trade show operating system",
    bestFor:
      "General service contractors, decorators and organizers who need production-grade floor plan design and management with deep booth-inventory control.",
    strengths: [
      "A long-standing name in trade show floor plan software, purpose-built for the exhibition industry",
      "Non-CAD, drag-and-drop interface for combining, dividing, holding and renting booths in real time",
      "REST API for piping floor plan, exhibitor and revenue data into CRMs, BI tools, registration systems and custom apps",
      "Tools aimed specifically at organizer workflows — booth assignment, revenue tracking, floor optimization for traffic flow",
      "Established relationships with general service contractors, which matters when a plan needs to match official show services data",
    ],
    considerations: [
      "Historically associated with a more traditional, GSC-oriented workflow, though the current 3e product has moved toward a simpler interface",
      "Pricing is not published and is quoted per organization/event",
      "As an operator-facing system, it benefits from someone owning inventory rules and booth-mix decisions rather than running purely self-serve",
      "Full value is realized when floor plan data is actively connected to registration and revenue systems via the API — that integration work takes planning",
    ],
    pricingNote: "Pricing on request — EXPOCAD (3e) does not publish rates; contact their team for a scoped quote.",
    whereWeFit:
      "Traction X handles the EXPOCAD build and upkeep on your behalf: modeling the hall, structuring bookable inventory, managing combine/divide/hold requests from exhibitors and sales reps, and keeping the plan synced with your GSC and registration data through the API — giving you production-grade floor plan management without needing in-house EXPOCAD expertise.",
    whoShouldPick: [
      "Organizers and GSCs who need granular control over booth inventory and revenue reporting",
      "Shows that want floor plan data integrated into a CRM or BI stack via API",
      "Teams that already work closely with a general service contractor and want a floor plan tool built for that workflow",
    ],
    lastVerified: "August 2026",
  },
  {
    slug: "a2z-events",
    name: "A2Z Events by Personify",
    category: "Trade show operating system",
    bestFor:
      "Associations and trade show organizers who want floor plan and booth sales tightly linked to a broader event and membership management ecosystem.",
    strengths: [
      "Floor plan and booth sales sit inside a comprehensive event platform that also covers registration and exhibitor management",
      "Backed by Personify, which serves association and event professionals across a wider software portfolio",
      "Feature-rich toolset aimed at driving exhibitor and sponsorship revenue growth, not just displaying a map",
      "Useful for organizers who also run Personify's association management or membership tools, since data can stay connected",
      "Established presence in the association trade show market with a long operating history (platform traces back to the late 1990s)",
    ],
    considerations: [
      "As part of a larger suite, the floor plan module is typically adopted alongside other A2Z/Personify tools rather than standalone",
      "Pricing isn't public and is quoted based on the modules and event scope you need",
      "Associations not already in the Personify ecosystem should weigh integration value against a lighter, floor-plan-only tool",
      "Like other full-suite platforms, configuration and onboarding take more upfront time than a single-purpose map builder",
    ],
    pricingNote: "Pricing on request — A2Z Events by Personify does not publish rates; quotes are scoped to your organization.",
    whereWeFit:
      "Traction X manages the floor plan build and ongoing updates inside A2Z Events, aligning booth and sponsorship inventory with your sales targets, handling exhibitor placement requests, and keeping the plan current — so your association or ops team isn't the one manually maintaining the map on top of everything else A2Z runs.",
    whoShouldPick: [
      "Associations already using Personify's broader event or membership tools",
      "Organizers who want floor plan and booth sales revenue tracking in the same system as registration",
      "Teams that value one connected data model over separate best-of-breed tools",
    ],
    lastVerified: "August 2026",
  },
  {
    slug: "cvent",
    name: "Cvent (Event Diagramming)",
    category: "Enterprise event suite",
    bestFor:
      "Organizers and venues already inside the Cvent ecosystem who need diagramming and floor plans connected to registration, venue sourcing and broader event management.",
    strengths: [
      "Event Diagramming is part of one of the largest enterprise event management platforms, with registration, venue sourcing and marketing under the same roof",
      "Publishes a tiered pricing page for diagramming, including a free tier, which is unusually transparent for this category",
      "Drag-and-drop, to-scale layouts with real-time collaboration between planners and venues",
      "Large install base among hotels, venues and enterprise planners, so diagrams often travel well between a show and its host properties",
      "Strong fit for organizers who need a diagram to double as a venue-facing planning document, not just an exhibitor-facing map",
    ],
    considerations: [
      "Cvent's diagramming tool is built around general event layouts (banquets, meetings, social events) as much as trade-show-specific booth inventory, so exhibitor/booth-sales workflows are less specialized than floor-plan-first tools",
      "Paid diagramming plans require a 12-month commitment",
      "Full-suite Cvent pricing beyond diagramming is quote-based and can represent a larger platform commitment than a floor plan alone needs",
      "Getting the most value typically means adopting more of the Cvent ecosystem, which is a bigger decision than picking a floor plan tool in isolation",
    ],
    pricingNote:
      "Event Diagramming publishes tiered pricing, including a free plan, at cvent.com/en/event-marketing-management/cvent-event-design-software/pricing; broader Cvent platform pricing is quote-based.",
    whereWeFit:
      "Traction X builds and maintains your show's diagram inside Cvent, coordinates it with venue-side stakeholders, and keeps booth or space assignments current — giving you Cvent's enterprise polish and venue connectivity without your team needing to become in-house diagramming specialists.",
    whoShouldPick: [
      "Organizers already running registration or venue sourcing through Cvent",
      "Shows that need a diagram to be shared and edited jointly with a venue or hotel",
      "Teams that want transparent, published starter pricing before talking to sales",
    ],
    lastVerified: "August 2026",
  },
  {
    slug: "mapd",
    name: "MapD Events",
    category: "Trade show operating system",
    bestFor:
      "Growing trade shows and associations that want an all-in-one, sales-oriented platform with published per-event pricing.",
    strengths: [
      "Positions itself as an all-in-one trade show management platform covering booths, sponsors, meetings and attendee flow, not just a map",
      "Live-sync interactive floor plan showing sold, open and reserved inventory in real time",
      "Publishes tiered, per-event pricing starting with a Starter plan, which is uncommon transparency for this category",
      "Sponsor profile, exhibitor marketplace and bookmarking features built for revenue generation, not just navigation",
      "Backed by Nextech AR Solutions / Map Dynamics, giving it a broader AR/interactive-media parent with relevant tooling",
    ],
    considerations: [
      "A newer, smaller-scale entrant than legacy trade show software providers, so the ecosystem of integrations and long-term references is still developing",
      "Entry-tier pricing covers essential tools; higher-value features (payments, deeper customization) sit in higher tiers, so total cost depends on which capabilities you need",
      "Best suited to organizers comfortable with a modern, product-led platform rather than a heavily customized enterprise deployment",
      "As with any per-event pricing model, costs should be modeled against your actual show cadence before committing",
    ],
    pricingNote:
      "Published per-event pricing tiers starting around $1,250/event for the Starter plan, per mapdevents.com/pricing; higher tiers add features at additional cost.",
    whereWeFit:
      "Traction X sets up and operates the MapD floor plan for your show — configuring booth and sponsor inventory, keeping the live-sync map accurate as sales close, and supporting exhibitors through the booking process — so you get MapD's real-time selling tools without adding platform administration to your team's plate.",
    whoShouldPick: [
      "Growing shows that want published, per-event pricing rather than a custom quote",
      "Organizers who want booth sales, sponsor management and floor plan in one lighter-weight platform",
      "Teams open to a newer platform in exchange for transparent pricing and a modern interface",
    ],
    lastVerified: "August 2026",
  },
  {
    slug: "expoplatform",
    name: "ExpoPlatform",
    category: "Enterprise event suite",
    bestFor:
      "Large exhibitions and B2B marketplaces that want floor plan navigation bundled with AI-driven matchmaking, meetings and exhibitor monetization at scale.",
    strengths: [
      "Interactive floor plan is one module inside a broader AI-powered event platform used by large exhibition organizers",
      "Exhibitors can customize their stand listing on the map with branding, information and links, extending the floor plan into a lead-generation surface",
      "AI-driven matchmaking and speed-networking modules can connect attendee and exhibitor data to the floor plan experience",
      "Publishes a starting price point for its platform, which is more transparent than most enterprise suites",
      "Track record with large-scale exhibition organizers running high-volume meeting programs alongside their show floor",
    ],
    considerations: [
      "Pricing scales with exhibitor and attendee volume plus chosen modules, so the published starting figure is a floor, not a full quote",
      "The platform's core strength is the broader AI/matchmaking event suite; the floor plan is a component of that rather than a standalone specialty",
      "Larger, more configurable platforms typically need more onboarding time than a single-purpose floor plan tool",
      "Best value is realized by organizers who use the wider platform (registration, meetings, matchmaking) rather than the floor plan in isolation",
    ],
    pricingNote:
      "Publishes a starting price (from $3,999) on expoplatform.com/pricing, scaling with exhibitor/attendee volume and modules; full quotes are scoped per event.",
    whereWeFit:
      "Traction X builds and manages the exhibitor-facing floor plan inside ExpoPlatform — structuring stand listings, coordinating with your matchmaking and meetings setup, and keeping the map current — so large-scale organizers get the platform's AI-driven tools without their team having to run floor plan operations manually alongside everything else ExpoPlatform offers.",
    whoShouldPick: [
      "Large exhibitions that want floor plan navigation tied into AI matchmaking and meeting scheduling",
      "Organizers running high-volume B2B marketplace-style events",
      "Teams that want a published starting price before a deeper sales conversation",
    ],
    lastVerified: "August 2026",
  },
];

export function getFloorPlanPlatform(slug: string) {
  return FLOORPLAN_PLATFORMS.find((p) => p.slug === slug);
}
