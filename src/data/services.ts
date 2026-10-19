export type ServiceEntry = {
  slug: string;
  label: string;
  /** Keyword-led H1 for the page (falls back to hero title + accent). */
  h1?: string;
  short: string;
  /** 40–60 word direct answer, used for the on-page TL;DR and AI-search extraction. */
  answer?: string;
  /** Fast-fact rows shown under the TL;DR (also good AI-answer fodder). */
  quickFacts?: { label: string; value: string }[];
  hero: { title: string; accent?: string; intro: string };
  keyPoints: { title: string; body: string }[];
  /** Long-form, keyword-rich body sections — the substance search engines rank. */
  sections?: { heading: string; body: string; bullets?: string[] }[];
  /** Concrete deliverables list — strong for both conversion and long-tail queries. */
  deliverables?: string[];
  /** Plain-language pricing signal (AI answers and buyers both look for this). */
  pricing?: { note: string; rows?: { label: string; value: string }[] };
  process: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  /** Related searches / semantic terms this page should cover. */
  relatedTerms?: string[];
  seo: { title: string; description: string };
};

export const SERVICES: ServiceEntry[] = [
  {
    slug: "trade-show-display-design",
    label: "Trade Show Display Design",
    h1: "Trade Show Display Design & Booth Design Services",
    short: "Concept, 3D renders and production-ready drawings tuned for footfall and dwell.",
    answer:
      "Trade show display design is the process of turning exhibit objectives into a buildable booth: floor plan, sightlines, graphics, lighting and materials. Traction X sends preliminary concept direction and investment within two business days, then develops photoreal 3D renders, production drawings and a costed BOM over roughly one to two weeks — for 10×10 in-lines through 20×40 islands.",
    quickFacts: [
      { label: "Preliminary concept + investment", value: "Within two business days" },
      { label: "Booth sizes designed", value: "10×10 in-line to 1,000+ sq ft islands" },
      { label: "Revisions included", value: "One full round in the design fee" },
      { label: "Design credit", value: "Applied against any booth we build or rent" },
      { label: "Deliverable format", value: "Renders, elevations, dielines, rigging & power plots" },
    ],
    hero: {
      title: "Trade Show",
      accent: "Display Design",
      intro:
        "Award-caliber trade show booth design — from 10×10 in-lines to 30×50 island builds and multi-storey brand houses. We start from your objectives (leads, meetings, product launch, media) and work back to floor plan, sightlines, materials and traffic flow.",
    },
    keyPoints: [
      { title: "Objective-led exhibit design briefs", body: "Every booth design starts from the number the exhibit has to move — qualified leads, demos, signed contracts, press hits — not a mood board." },
      { title: "Photoreal 3D booth renders", body: "You approve the exact experience your visitors will see: materials, lighting, backlit graphics, hero product moments — before a dollar of fabrication is committed." },
      { title: "Sightlines & traffic flow", body: "We simulate visitor traffic on the actual show floor grid so your hero product isn't hidden behind a demo station or blocked by a neighbouring island." },
      { title: "Sustainable exhibit design options", body: "Reusable modular framing, aluminium extrusions and recyclable print substrates for exhibit programs that repeat across multiple shows." },
    ],
    sections: [
      {
        heading: "What trade show booth design includes",
        body:
          "A complete booth design package covers far more than a pretty picture. We design the exhibit as a working sales environment: where visitors enter, what stops them, where a conversation happens, and where a qualified lead gets captured. Every design decision is checked against the show's floor plan, rigging rules and your booth size.",
        bullets: [
          "Floor plan options with entry points, demo zones, storage and meeting space",
          "Photoreal 3D renders from visitor eye-level, not just hero angles",
          "Graphic layouts sized for 3-second, 10-second and 30-second reads",
          "Lighting design — backlit fabric, wash lighting, spotlit product plinths",
          "Material and finish board: laminate, veneer, painted MDF, metal, printed textile",
          "Power, data and rigging plots that match the venue's exhibitor kit",
        ],
      },
      {
        heading: "Booth design by size: 10×10, 10×20, 20×20 and islands",
        body:
          "Design priorities change completely with square footage. A 10×10 trade show display has one job — stop traffic and start one conversation, so the back wall and a single demo point carry everything. A 10×20 adds a second conversation zone and real storage. At 20×20 and above you're designing an island exhibit with 360° sightlines, hanging signage and often a meeting room or second storey. We design to the size you're actually contracted for, and to the size you'll grow into.",
      },
      {
        heading: "Custom exhibit design vs. modular rental design",
        body:
          "Custom exhibit design gives you unrestricted geometry and bespoke millwork — the right call when the booth is a brand statement or the program repeats for several years. Modular rental design works within a proven aluminium and fabric system, which cuts cost and freight while still looking custom on the floor. We design both, and we'll tell you honestly which one your show calendar and budget point to.",
      },
      {
        heading: "Design that survives contact with the show floor",
        body:
          "A design is only good if it can be built, shipped, installed in the labour hours you booked, and set again next year. Every Traction X design is reviewed by our fabrication and install teams before you see it, so the concept you approve is the booth that actually gets built — no value-engineering surprises after the deposit.",
      },
    ],
    deliverables: [
      "Two to three floor plan concepts",
      "Photoreal 3D renders (hero plus eye-level views)",
      "Materials and finish board",
      "Graphic dielines with bleed and safe areas",
      "Dimensioned elevations and exploded assembly views",
      "Rigging, power and data plots for the venue",
      "Estimated fabrication and freight budget",
    ],
    pricing: {
      note:
        "Design is credited against any booth we build or rent, so most clients pay nothing net for design. Standalone concepts are billed hourly with a not-to-exceed cap agreed up front.",
      rows: [
        { label: "Design credit", value: "100% credited on a built or rented booth" },
        { label: "Typical 10×10 build", value: "From $12,500 USD" },
        { label: "Typical 10×20 build", value: "From $17,500 USD" },
        { label: "Typical 20×20 island", value: "From $30,000 USD" },
      ],
    },
    process: [
      { title: "Discovery call", body: "Objectives, budget band, brand guidelines, must-have activations, past booth photos and the shows on your calendar." },
      { title: "Preliminary direction", body: "Within two business days of a complete brief: initial concept direction and a preliminary investment range so you can decide how to proceed." },
      { title: "Full design development", body: "Photoreal renders, floor plans, materials, revisions and a costed BOM develop over roughly one to two weeks as the scope is confirmed." },
      { title: "Production drawings", body: "Fabrication package: elevations, exploded views, graphic dielines, rigging plan, power/data plot." },
    ],
    faqs: [
      { q: "Do you charge for trade show booth design?", a: "A design credit applies to any built or rented project, so design is effectively free when you build with us. Standalone concepts are billed hourly with a not-to-exceed cap." },
      { q: "How long does trade show display design take?", a: "A designer sends preliminary concept direction and investment within two business days of a complete brief. Full photoreal concepts and production planning typically develop over one to two weeks as the scope is confirmed." },
      { q: "Can you match an existing exhibit house's look?", a: "Yes — including refreshes of prior custom builds and rescue projects where a supplier has fallen through mid-program." },
      { q: "Will I see a 3D render before I commit?", a: "Yes. You approve photoreal renders — materials, lighting, graphics and hero product placement — before fabrication is scheduled." },
      { q: "Do you design 10×10 booths, or only large islands?", a: "Both. We design 10×10 in-lines through 1,000+ sq ft island activations and multi-storey brand houses." },
      { q: "Can the design be reused at multiple shows?", a: "Yes. We engineer for reconfiguration — the same crates can run 10×10, 10×20 and 20×20 layouts as your program scales." },
    ],
    relatedTerms: [
      "trade show booth design",
      "exhibit design services",
      "3D booth rendering",
      "island exhibit design",
      "10x20 trade show booth design",
      "custom exhibit designer",
    ],
    seo: {
      title: "Trade Show Display Design & Booth Design Services | Traction X",
      description:
        "Trade show display design with preliminary concept direction and investment within two business days, followed by photoreal 3D renders, floor plans and production drawings for custom exhibits.",
    },
  },
  {
    slug: "booth-construction",
    label: "Booth Construction",
    h1: "Custom Trade Show Booth Construction & Exhibit Fabrication",
    short: "In-house fabrication in wood, metal, aluminium extrusion and printed textile.",
    answer:
      "Custom trade show booth construction is the fabrication of your approved exhibit design — millwork, welded metal, aluminium extrusion, printed textile and integrated AV. Traction X builds in-house, pre-builds every booth in the shop before it ships, and crates it for repeat shows. Custom builds typically start around $12,500 for a 10×10.",
    quickFacts: [
      { label: "Built in-house", value: "Millwork, welding, textile print, finishing" },
      { label: "Shop pre-build", value: "Every booth assembled and photographed before shipping" },
      { label: "Typical build window", value: "6–10 weeks from approved drawings" },
      { label: "Rush builds", value: "Available; rush fee may apply inside 30 days" },
      { label: "Reconfigurable", value: "Same crates run 10×10 → 10×20 → 20×20" },
    ],
    hero: {
      title: "Custom Booth",
      accent: "Construction",
      intro:
        "Trade show booth fabrication under one roof: millwork, welded steel, CNC-cut aluminium, printed textile skins, backlit graphics and integrated AV. We build for the second, third and fifth show — not just the first.",
    },
    keyPoints: [
      { title: "Wood, metal and textile fabrication", body: "Full CNC millwork shop, welding cell, textile print and finishing — no outsourcing of critical structure to unknown third parties." },
      { title: "Modular re-configurability", body: "Same crates re-configured 10×10 → 10×20 → 20×20 as your exhibit program scales across the show calendar." },
      { title: "Repeatable premium finishes", body: "Automotive-grade paint, real veneer, powder-coated metal and direct-print acrylic that still look new after five shows." },
      { title: "Freight-friendly engineering", body: "Every piece designed to fit standard road cases so you're not paying LTL surcharges for oversized crates." },
    ],
    sections: [
      {
        heading: "How custom exhibit fabrication works",
        body:
          "Construction starts only after drawings and a finish schedule are signed off, so nothing gets cut twice. Structure is fabricated first, then finished, then dry-assembled in our shop as a complete booth. You get shop photos of the full pre-build, and any first-of-a-kind joint or mechanism is prototyped before the full run.",
        bullets: [
          "CNC millwork for counters, plinths, storage and reception desks",
          "Welded steel and aluminium extrusion for structural walls and towers",
          "Backlit tension-fabric and direct-print graphics",
          "Integrated AV: monitor mounts, LED wall framing, cable management",
          "Full shop pre-build, QC walk and photo record",
          "Numbered crates with pack lists and setup diagrams",
        ],
      },
      {
        heading: "Materials that hold up show after show",
        body:
          "The cheapest booth is the one you don't rebuild. We specify materials for repeat use: aluminium extrusion frames that don't rack in transit, laminate and veneer surfaces with edge protection, replaceable graphic skins so a rebrand costs print instead of structure, and hardware that a two-person crew can assemble without specialty tools.",
      },
      {
        heading: "What drives booth construction cost",
        body:
          "Three things move the number: the amount of structure (walls, towers, second storeys, hanging elements), the amount of customization (bespoke millwork, curved and CNC-shaped forms, specialty finishes), and the level of AV and lighting integration. Square footage matters less than what you put in it — install and dismantle labour is included in our pricing, while drayage and venue-billed services stay separate.",
      },
      {
        heading: "Rescue builds and second-source fabrication",
        body:
          "If another exhibit house has fallen through, missed a milestone or gone quiet weeks before a show, we take over. Bring the drawings you have — or the render you approved — and we'll tell you honestly what can be built in the time left and what has to change.",
      },
    ],
    deliverables: [
      "Fabricated booth structure, millwork and graphics",
      "Integrated AV mounts and cable management",
      "Full shop pre-build with photo record",
      "Numbered crates, pack lists and setup diagrams",
      "Assembly instructions for the I&D crew",
      "Asset inventory for repeat-show storage",
    ],
    pricing: {
      note:
        "Custom booth construction pricing is driven by structure, customization and AV integration — not square footage alone. Install and dismantle labour is included in our pricing; drayage and venue-billed show services are separate.",
      rows: [
        { label: "10×10 custom build", value: "From $12,500 USD" },
        { label: "10×20 custom build", value: "From $17,500 USD" },
        { label: "20×20 island build", value: "From $30,000 USD" },
        { label: "Included", value: "Install and dismantle labour" },
      ],
    },
    process: [
      { title: "Approved production package", body: "Drawings plus finish schedule signed off before we cut anything." },
      { title: "Prototype critical joints", body: "Mock up any first-of-a-kind detail in-shop before the full run." },
      { title: "Shop pre-build", body: "Full booth assembled in-shop, photographed, walked through and QC-checked before it ships." },
      { title: "Crate & tag", body: "Numbered crates with pack lists and diagrams for the I&D crew on the show floor." },
    ],
    faqs: [
      { q: "How much does a custom trade show booth cost?", a: "Custom 10×10 builds start around $12,500, 10×20s around $17,500 and 20×20 islands around $30,000. Structure, customization and AV integration move the number more than square footage does." },
      { q: "How long does booth construction take?", a: "Typically 6–10 weeks from approved production drawings. Rush builds are possible; a rush fee may apply inside 30 days and can sometimes be waived by a project manager." },
      { q: "Where is your shop?", a: "Canadian HQ with partner shops in Las Vegas, Orlando, Frankfurt and Sydney for regional builds without cross-border freight." },
      { q: "Can you rescue a build another supplier dropped?", a: "Yes. Rescue builds are a routine part of our schedule — bring the drawings or approved renders you already have." },
      { q: "Do you build rentals as well as purchased booths?", a: "Yes — we're a 100% custom rental company as well as a custom fabricator, and the same booths are available to rent or buy." },
      { q: "Is install and dismantle included?", a: "Yes, install and dismantle labour is included in our pricing. Drayage and venue-billed services such as electrical appear separately on the show bill." },
    ],
    relatedTerms: [
      "custom trade show booth builder",
      "exhibit fabrication",
      "trade show booth manufacturer",
      "custom exhibit construction",
      "modular booth builder",
    ],
    seo: {
      title: "Custom Trade Show Booth Construction & Exhibit Fabrication | Traction X",
      description:
        "In-house custom trade show booth construction: millwork, welded metal, aluminium extrusion, textile print and AV integration. Shop pre-build on every booth. 10×10 builds from $12,500.",
    },
  },
  {
    slug: "project-management",
    label: "Project Management",
    h1: "Trade Show Project Management Services",
    short: "Single point of contact from kickoff through post-show debrief.",
    answer:
      "Trade show project management means one named producer owns your show: advance forms, discount deadlines, union labour calls, freight timing, on-site supervision and the post-show wrap. Traction X manages exhibits we built and exhibits built elsewhere, so you get one accountable person instead of a ticket queue.",
    quickFacts: [
      { label: "Point of contact", value: "One named producer, kickoff to wrap" },
      { label: "Advance forms", value: "Filed before early-bird discount deadlines" },
      { label: "On-site", value: "Producer present during install" },
      { label: "Works with", value: "Exhibits we built and exhibits we didn't" },
      { label: "Post-show", value: "Photos, drayage bill audit, written debrief" },
    ],
    hero: {
      title: "Trade Show",
      accent: "Project Management",
      intro:
        "One producer owns your show. From advance forms and union labour to floor manager check-ins during setup, you get one accountable human — not a ticketing queue.",
    },
    keyPoints: [
      { title: "One point of contact", body: "A named producer through kickoff, design, build, freight, install and post-show reconciliation." },
      { title: "Show-services coordination", body: "Electrical, rigging, plumbing, wifi, drayage, cleaning and lead retrieval — filed on your behalf, on the discounted deadline." },
      { title: "Union labour calls", body: "Union I&D crews booked and scheduled to the right shift length — no last-minute overtime surprises." },
      { title: "Post-show debrief", body: "Photos, freight receipts, a drayage bill audit and a written wrap so next year's build is a repeat, not a reinvention." },
    ],
    sections: [
      {
        heading: "What a trade show project manager actually handles",
        body:
          "Most exhibit budget overruns aren't design decisions — they're missed deadlines. Ordering electrical after the discount cutoff, calling a four-hour crew for a six-hour install, or shipping direct-to-show when the advance warehouse was cheaper. Your producer owns the calendar that prevents all three.",
        bullets: [
          "Exhibitor kit review and every discount deadline mapped to a date",
          "Electrical, rigging, plumbing, internet, cleaning and lead retrieval orders",
          "Labour call planning: crew size, shift length, straight time vs. overtime",
          "Freight routing and target arrival windows",
          "Badge, EAC and certificate of insurance paperwork",
          "On-site supervision, exhibitor-services desk escalation and show-day fixes",
        ],
      },
      {
        heading: "Deadline management is the whole game",
        body:
          "Every show publishes an exhibitor kit with discount cutoffs, usually 30–45 days out. Ordering after those dates commonly costs 25–50% more for identical service, and floor orders cost more again. We work back from move-in day and file early, which is the single most reliable way to protect an exhibit budget.",
      },
      {
        heading: "Managing exhibits we didn't build",
        body:
          "You don't need to buy a booth from us to hire our producers. Standalone show-services and I&D management for exhibits built elsewhere is a normal engagement — useful when an internal marketing team has the booth but not the bandwidth for eight shows a year.",
      },
      {
        heading: "Multi-show exhibit programs",
        body:
          "For programs running several shows a season, we keep one live tracker across the calendar: which assets are where, what needs refurbishment, which graphics need reprinting for a rebrand, and which shows overlap in a way that requires a second set of crates.",
      },
    ],
    deliverables: [
      "Shared live project tracker with owners and deadlines",
      "Filed show-services orders and confirmations",
      "Labour call schedule and crew plan",
      "Freight booking and tracking",
      "On-site producer during install and dismantle",
      "Post-show photo package and written debrief",
      "Invoice reconciliation and drayage bill audit",
    ],
    pricing: {
      note:
        "Project management is included when we design and build your exhibit. Standalone management of a booth built elsewhere is quoted per show based on show size, venue and number of services to coordinate.",
    },
    process: [
      { title: "Kickoff + shared tracker", body: "Milestones, deliverables, owners and discount deadlines — one live document." },
      { title: "Advance forms filed", body: "Electrical, rigging, cleaning and labour all filed before early-bird cutoffs to protect budget." },
      { title: "Ship & install", body: "On-site producer during setup; dismantle and outbound freight coordinated to the day." },
      { title: "Wrap + numbers", body: "Photo package, invoice reconciliation, lessons learned and asset check-in." },
    ],
    faqs: [
      { q: "Can you manage a booth we didn't build?", a: "Yes — standalone show-services coordination and I&D management for exhibits built elsewhere is a routine engagement." },
      { q: "What does a trade show project manager do?", a: "They own the show calendar: exhibitor kit deadlines, service orders, labour calls, freight timing, on-site supervision and the post-show reconciliation." },
      { q: "Will someone from your team be on-site?", a: "Yes. A producer is on the floor during install and available through show days for changes and fixes." },
      { q: "How do you keep show services from blowing the budget?", a: "By filing every order before the discount deadline and calling the correct shift length. Late and floor orders are where most exhibit overruns come from." },
      { q: "Do you audit the drayage bill?", a: "Yes. We collect and audit the drayage and show-services invoices during show week, while disputes can still be raised at the service desk." },
    ],
    relatedTerms: [
      "trade show project management",
      "exhibit program management",
      "show services coordination",
      "exhibitor kit deadlines",
      "on-site booth supervision",
    ],
    seo: {
      title: "Trade Show Project Management Services | Traction X",
      description:
        "One named producer for your exhibit: filed advance forms before discount deadlines, union labour calls, freight timing, on-site supervision and a post-show drayage audit. Booths we built or yours.",
    },
  },
  {
    slug: "install-and-dismantle",
    label: "Install & Dismantle (I&D)",
    h1: "Trade Show Install & Dismantle (I&D) Services",
    short: "Union and non-union I&D crews across every major North American venue.",
    answer:
      "Trade show install and dismantle (I&D) is the labour that sets your booth up and takes it down: crating in, structure, graphics, AV, show-day support, then re-crating and outbound freight. Traction X supplies certified union and non-union crews with one lead installer per project across every major North American convention centre.",
    quickFacts: [
      { label: "Coverage", value: "Every major North American convention centre" },
      { label: "Crews", value: "Union and non-union, OSHA-certified, insured" },
      { label: "Lead installer", value: "Same person from crate open to final walk" },
      { label: "Badging & EAC", value: "Handled in advance" },
      { label: "Included", value: "I&D labour is included in Traction X booth pricing" },
    ],
    hero: {
      title: "Install &",
      accent: "Dismantle",
      intro:
        "Booked, staffed and supervised. Certified I&D crews at Las Vegas Convention Center, Orlando OCCC, Chicago McCormick Place, Georgia World Congress, Javits, Moscone, Toronto MTCC, Halifax Convention Centre and every mid-tier venue in between.",
    },
    keyPoints: [
      { title: "Certified & insured crews", body: "OSHA-certified, jurisdiction-compliant crews with venue badging and EAC paperwork handled in advance." },
      { title: "Lead installer on-site", body: "One lead per project — the same person from crate open to the final walk with your team." },
      { title: "Overtime protection", body: "We call the right shift length so you're not paying overtime rates for the last panel." },
      { title: "Outbound the same night", body: "Dismantle, re-crate to spec, and hand off to your outbound carrier without a lost crate." },
    ],
    sections: [
      {
        heading: "Union vs. non-union I&D — what it means for you",
        body:
          "In union jurisdictions such as Chicago, New York, San Francisco and much of the Las Vegas floor, specific tasks must be performed by the venue's or a certified contractor's labour. In right-to-work and non-union markets you have more flexibility. We staff to whichever rules apply, file the EAC notification on time, and never put you in a jurisdictional dispute on move-in morning.",
      },
      {
        heading: "What happens on install day",
        body:
          "Crates are located and opened, structure goes up first, then graphics, then AV and lighting, then final adjustments and cleaning before doors. The lead installer walks the finished booth with your team, hands over the touch-up kit and stays reachable through the show for fixes.",
        bullets: [
          "Pre-show walk: target install time, crew count, lifts and ladders booked",
          "Structure, graphics, AV and lighting in sequence",
          "Cleaning and final adjustments before doors open",
          "Show-day contact for repairs, graphic swaps and re-sets",
          "Dismantle, re-crate to the pack list, load outbound and sign carrier docs",
        ],
      },
      {
        heading: "How I&D labour is priced",
        body:
          "Labour is billed by crew size × shift length × rate, and rates change with jurisdiction, day of week and time of day. Overtime, weekend and holiday rates are where budgets break. The fix is accurate crew planning: too few installers and you roll into overtime; too many and you pay for people standing around. Traction X booth pricing includes install and dismantle labour, so it's already covered when we build or rent your exhibit.",
      },
    ],
    deliverables: [
      "Booked, badged and insured crew with EAC filing",
      "Named lead installer on-site",
      "Pre-show walk and equipment booking",
      "Full install with graphics, AV and lighting",
      "Show-day support contact",
      "Dismantle, re-crate and outbound freight handoff",
    ],
    pricing: {
      note:
        "Install and dismantle labour is included in Traction X booth build and rental pricing. Standalone I&D for exhibits built elsewhere is quoted by crew size, shift length and jurisdiction.",
    },
    process: [
      { title: "Pre-show walk", body: "Confirm target install time, crew count, tools, and ladders or lifts booked with the venue." },
      { title: "Set + graphics", body: "Structure first, graphics and AV second, final adjustments and cleaning before doors open." },
      { title: "Show-day handoff", body: "Lead installer walks the booth with your team, hands over the toolkit and a contact for on-show fixes." },
      { title: "Dismantle & reload", body: "Break down, crate per pack list, load outbound freight and sign carrier docs." },
    ],
    faqs: [
      { q: "Do you work in union halls?", a: "Yes — full compliance in union jurisdictions including Chicago, New York, San Francisco and union Las Vegas floors, with EAC notifications filed in advance." },
      { q: "Is install and dismantle included in your booth pricing?", a: "Yes. I&D labour is included in Traction X custom build and rental pricing. Drayage and venue-billed services remain separate." },
      { q: "Can you install a booth built by another company?", a: "Yes. Standalone I&D is available for exhibits built elsewhere — send the setup drawings and pack list." },
      { q: "How much does trade show I&D cost?", a: "Standalone labour is priced by crew size, shift length and jurisdiction, with higher overtime, weekend and holiday rates. Accurate crew planning matters more than the hourly figure." },
      { q: "What if something breaks during the show?", a: "Your lead installer stays reachable through show days for repairs, graphic swaps and re-sets." },
    ],
    relatedTerms: [
      "trade show installation services",
      "booth setup and teardown",
      "union I&D labour",
      "exhibit installation company",
      "convention centre install crew",
    ],
    seo: {
      title: "Trade Show Install & Dismantle (I&D) Services | Traction X",
      description:
        "Certified union and non-union I&D crews at every major North American convention centre: pre-show walk, install, show-day support, dismantle and outbound freight. I&D included in our booth pricing.",
    },
  },
  {
    slug: "shipping-and-logistics",
    label: "Shipping & Logistics",
    h1: "Trade Show Shipping, Freight & Logistics Services",
    short: "Advance warehouse, direct-to-show, cross-border and international freight.",
    answer:
      "Trade show shipping and logistics covers routing your exhibit to the show: advance warehouse or direct-to-show, drayage planning, cross-border customs and the return leg. Traction X books to the discount deadline, gives drayage estimates based on real weight and rates, and audits the show bill afterwards.",
    quickFacts: [
      { label: "Lanes", value: "Advance warehouse, direct-to-show, international" },
      { label: "Cross-border", value: "US ↔ CA ↔ EU ↔ MX, ATA carnets, HS codes" },
      { label: "Drayage", value: "Estimated up front, audited after the show" },
      { label: "Modes", value: "Ground, expedited, air and ocean freight" },
      { label: "Return leg", value: "Signed BOLs, warehouse check-in or show-forward" },
    ],
    hero: {
      title: "Trade Show Shipping",
      accent: "& Logistics",
      intro:
        "Booked to the discounted deadline. Advance-warehouse, direct-to-show, cross-border and international air and ocean freight — with drayage estimates you can actually plan against.",
    },
    keyPoints: [
      { title: "Advance warehouse vs. direct-to-show", body: "We recommend the right lane for each show so you're not paying drayage twice or risking a missed target move-in window." },
      { title: "Cross-border compliance", body: "US ↔ CA ↔ EU ↔ MX customs paperwork, ATA carnets and harmonised codes — prepared, not improvised at the border." },
      { title: "Real drayage estimates", body: "Actual weight × published rate × handling type, so the CFO isn't surprised when the show bill lands." },
      { title: "Outbound & return", body: "Signed BOLs, return-to-warehouse coordination and asset check-in for repeat-show exhibit programs." },
    ],
    sections: [
      {
        heading: "Advance warehouse or direct-to-show?",
        body:
          "Advance warehouse shipments arrive weeks early, get stored, and are delivered to your space before your target move-in — safest for tight schedules and complex builds. Direct-to-show arrives during a narrow marshalling window and can be cheaper, but a missed window means waiting in the yard while your labour crew sits on the clock. We pick the lane per show, not by habit.",
      },
      {
        heading: "Understanding drayage",
        body:
          "Drayage is the venue contractor's charge for moving freight from the dock or warehouse to your booth space and back, billed by hundredweight with minimums. It is charged by the show's general contractor, not by us — so it appears as a separate line on your show bill. What we can control is weight, crate count, correct paperwork and avoiding special handling classifications, all of which move the number.",
        bullets: [
          "Estimated on real crate weights before you commit",
          "Crate design that avoids special-handling surcharges",
          "Correct bill of lading and material handling forms",
          "Invoice collected and audited during show week",
        ],
      },
      {
        heading: "International exhibit freight",
        body:
          "Air and ocean freight to Europe, Latin America, Asia and Oceania with in-country partners for last-mile drayage. For temporary exhibit material an ATA carnet usually avoids duties entirely — we prepare the carnet, the packing list and the harmonised codes, and brief your on-site team on what customs will want to see.",
      },
    ],
    deliverables: [
      "Lane recommendation with cost comparison",
      "Carrier booking, insurance certificates and tracking",
      "Drayage estimate based on actual crate weights",
      "Customs paperwork, carnets and HS codes for cross-border moves",
      "Freight tracked in and confirmed on the floor",
      "Outbound BOL, return-to-warehouse or show-forward routing",
    ],
    pricing: {
      note:
        "Freight is quoted per lane and per show. Drayage is billed by the show's general contractor on actual weight and appears separately on your show bill — we coordinate, estimate and audit it.",
    },
    process: [
      { title: "Route selection", body: "Advance warehouse cutoff, target arrival window and drayage estimate — all decided before crate one is packed." },
      { title: "Carrier booking", body: "Preferred national and specialised trade show carriers, insurance certificates and tracking." },
      { title: "On-show handoff", body: "Freight tracked in, drayage bill collected and audited during show week." },
      { title: "Return leg", body: "Outbound BOL, carrier pickup, return-to-warehouse or next-show forward." },
    ],
    faqs: [
      { q: "Do you handle international trade show shipping?", a: "Yes — air and ocean freight to Europe, Latin America, Asia and Oceania, with in-country partners for last-mile drayage and ATA carnets for temporary exhibit material." },
      { q: "What is drayage and is it included?", a: "Drayage is the venue contractor's charge to move freight between the dock or warehouse and your booth space. It's billed by the venue on actual weight and appears as a separate line on your show bill — we coordinate, estimate and audit it, but it isn't included in booth pricing." },
      { q: "Should I ship to the advance warehouse or direct to show?", a: "Advance warehouse is safer for complex builds and tight install schedules; direct-to-show can be cheaper if you hit the marshalling window. We recommend per show based on your move-in time and crate count." },
      { q: "How do you keep freight costs down?", a: "Crate engineering that fits standard road cases, accurate weights, correct paperwork to avoid special handling, and booking before deadline surcharges apply." },
      { q: "Can you ship a booth across the US–Canada border?", a: "Yes. Cross-border moves are routine — we prepare the customs paperwork, carnets and harmonised codes in advance." },
    ],
    relatedTerms: [
      "trade show freight",
      "exhibit shipping company",
      "drayage costs",
      "advance warehouse shipping",
      "ATA carnet trade show",
    ],
    seo: {
      title: "Trade Show Shipping, Freight & Logistics Services | Traction X",
      description:
        "Advance-warehouse, direct-to-show, cross-border and international trade show freight — routed and booked to the discount deadline, with real drayage estimates and a post-show bill audit.",
    },
  },
  {
    slug: "audio-visual-rentals",
    label: "Audio Visual Rentals",
    h1: "Trade Show Audio Visual (AV) Rentals for Exhibits",
    short: "LED walls, large-format displays, PA, lighting and interactive touchscreens.",
    answer:
      "Trade show AV rentals cover the screens, sound and lighting inside your booth: LED video walls, large-format 4K displays, interactive touchscreen kiosks, PA and stage lighting. Traction X rents, installs, commissions and supports AV on-site, and integrates it into the booth structure rather than bolting it on.",
    quickFacts: [
      { label: "LED walls", value: "1.9–2.9mm pitch, curved or flat, with hot spares" },
      { label: "Displays", value: "55″–98″ commercial panels, portrait or landscape" },
      { label: "Interactive", value: "Multi-touch kiosks with lead capture" },
      { label: "On-site", value: "AV tech commissions and supports through show hours" },
      { label: "Availability", value: "LED walls pair with Premium and Architect finish levels" },
    ],
    hero: {
      title: "Trade Show",
      accent: "Audio Visual Rentals",
      intro:
        "LED walls, 4K displays, PA, lighting rigs, touchscreen kiosks and lead-capture tablets — rented, installed, tested and supported on-site by a technician who knows the booth.",
    },
    keyPoints: [
      { title: "LED walls (1.9–2.9mm pitch)", body: "Curved and flat configurations with processors, content playback and hot spares on the floor." },
      { title: "Large-format displays", body: "55″–98″ commercial-grade panels in portrait or landscape, wall-mounted or free-standing on the booth structure." },
      { title: "Interactive touchscreens", body: "Multi-touch kiosks with lead capture, product configurators and demo triggers that feed your CRM." },
      { title: "PA, mics & lighting", body: "Presentation-grade audio and stage lighting for booth theatres, demo stages and reveal moments." },
    ],
    sections: [
      {
        heading: "LED wall or large-format displays?",
        body:
          "An LED video wall is the right call when you need a seamless canvas visible across the hall — product launches, brand moments, large islands. Large-format LCD panels cost far less, are easier to freight and are usually better for close-range detail like spec tables or a looping demo. Pixel pitch matters: 2.9mm is fine when viewers stand back, 1.9mm when they're within a few feet.",
      },
      {
        heading: "AV integrated into the booth, not bolted on",
        body:
          "Because we build the exhibit, screens get designed into the structure: recessed mounts, hidden cable paths, correctly rated power, and framing that carries the weight. That's the difference between a clean video wall and a screen on a stand with a power bar taped to the floor.",
        bullets: [
          "Mount and structural framing designed with the booth",
          "Power and data load planned against the venue's electrical order",
          "Content specs locked before hardware is booked",
          "On-site commissioning and testing before doors open",
          "AV technician on call during show hours",
        ],
      },
      {
        heading: "Content and lead capture",
        body:
          "We can produce and pre-format content to the exact resolution and aspect ratio of the hardware, so nothing gets stretched or letterboxed on the floor. Touchscreen kiosks can be configured for lead capture and product configuration, exporting to your CRM so the show produces a usable list rather than a stack of scanned badges.",
      },
    ],
    deliverables: [
      "Hardware spec matched to booth size and viewing distance",
      "Delivery, install and on-site commissioning",
      "Content formatting to native resolution",
      "Lead-capture configuration on interactive kiosks",
      "AV technician on call through show hours",
      "Strike, packing and return with a damage photo record",
    ],
    pricing: {
      note:
        "AV rental is quoted per show by hardware list and show duration. A monitor-and-audio package suits most 10×10 and 10×20 booths; LED walls and processors are a separate line and pair with Premium and Architect finish levels.",
    },
    process: [
      { title: "Content spec", body: "Resolution, aspect ratio and content type locked before hardware is booked." },
      { title: "Delivery + install", body: "Hardware ships with the booth or drops directly to show; an AV tech commissions it on-site." },
      { title: "Show-day support", body: "AV technician on call during show hours for content swaps and issues." },
      { title: "Strike + return", body: "Dismantled, packed and returned, with a photo record of any damage assessment." },
    ],
    faqs: [
      { q: "Can we run our own content?", a: "Yes. We can also produce and pre-format content to the hardware's native resolution if you don't have specs internally." },
      { q: "How much does an LED wall rental cost for a trade show?", a: "It's quoted by panel count, pixel pitch, processing and show duration. LED walls are a separate line from the standard monitor-and-audio package and typically pair with Premium and Architect finish levels." },
      { q: "Do you provide an on-site AV technician?", a: "Yes — a technician commissions the system before doors and stays on call through show hours." },
      { q: "What size display should a 10×20 booth use?", a: "Most 10×20 exhibits are best served by one or two 65″–86″ commercial panels; an LED wall is usually overkill unless the booth anchors a launch moment." },
      { q: "Can touchscreens capture leads?", a: "Yes. Multi-touch kiosks can run configurators and lead-capture forms that export to your CRM." },
    ],
    relatedTerms: [
      "trade show AV rental",
      "LED wall rental trade show",
      "booth monitor rental",
      "interactive kiosk rental",
      "exhibit lighting rental",
    ],
    seo: {
      title: "Trade Show Audio Visual (AV) Rentals — LED Walls & Displays | Traction X",
      description:
        "Trade show AV rentals: LED video walls, 55″–98″ displays, interactive touchscreen kiosks, PA and lighting — integrated into the booth, commissioned on-site and supported through show hours.",
    },
  },
  {
    slug: "booth-storage-and-asset-management",
    label: "Booth Storage & Asset Management",
    h1: "Trade Show Booth Storage, Asset Management & Reconfiguration",
    short: "Inventoried storage, condition reporting and reconfiguration between shows for owned exhibits.",
    answer:
      "Trade show booth storage and asset management is the between-shows service that makes owning an exhibit practical: climate-controlled storage, an inventoried asset list, condition reporting on every crate, and reconfiguration of the same structure into a different footprint for the next show. Traction X stores, tracks and re-issues owned booths so a purchased exhibit behaves like a rental — ready on schedule, without you managing a warehouse.",
    quickFacts: [
      { label: "Storage", value: "Climate-controlled, between-show inventory" },
      { label: "Inventory tracking", value: "Numbered crates, photo record, asset list" },
      { label: "Reconfiguration", value: "Same crates run 10×10 → 10×20 → 20×20" },
      { label: "Condition reporting", value: "Logged at check-in and check-out of every show" },
      { label: "Who this is for", value: "Owners of a custom or modular booth exhibiting 3+ times a year" },
    ],
    hero: {
      title: "Booth Storage &",
      accent: "Asset Management",
      intro:
        "Owning a booth shouldn't mean managing a warehouse. We store your exhibit between shows, track every crate against a live asset list, report on condition, and reconfigure the same structure into a different footprint when your next show calls for it.",
    },
    keyPoints: [
      { title: "Climate-controlled storage", body: "Crated exhibits and graphics stored between shows in conditions that protect finishes, laminates and printed textile from humidity and temperature swings." },
      { title: "Inventoried asset management", body: "Every crate, panel, light fixture and graphic is logged against a numbered asset list, so nothing gets left behind or mis-shipped to the wrong show." },
      { title: "Refurb & reconfiguration", body: "The same owned booth reconfigured from a 20×20 island down to a 10×20 endcap, or refreshed with new graphics and finishes, without re-cutting structure." },
      { title: "Condition reporting", body: "Photo and written condition reports at check-in and check-out of every show, so wear is caught and repaired before it becomes a show-floor problem." },
    ],
    sections: [
      {
        heading: "Why storage and asset management is the real rent-vs-buy question",
        body:
          "The math on buying a booth usually looks fine until someone has to store it, track which crates are where, and figure out who repairs a cracked laminate corner before the next show. That's the hidden cost rental pricing already absorbs. Asset management closes that gap: we store the exhibit, maintain the inventory, and hand it back ready to install — so an owned booth behaves like a rental from a logistics standpoint while you keep the capital asset.",
        bullets: [
          "Climate-controlled storage between shows, on our account or yours",
          "A live, numbered asset list — crates, panels, lighting, hardware, graphics",
          "Condition report logged at every check-in and check-out",
          "Repairs and touch-ups scheduled between shows, not discovered on install day",
          "Reconfiguration plans for running the same booth at multiple footprints",
        ],
      },
      {
        heading: "Reconfiguring one booth into multiple footprints",
        body:
          "Most exhibit programs don't run the same footprint at every show — a flagship 20×20 island for the anchor event, a 10×20 endcap for a regional show two months later. If the booth was engineered for reconfiguration when it was built, the same crates and modular components can run both, with an updated set plan rather than new fabrication. We manage that set plan, tell you honestly what does and doesn't reconfigure cleanly, and quote the delta for any new panels a smaller or larger footprint needs.",
      },
      {
        heading: "Crate management and freight-ready packing",
        body:
          "Every asset ships and returns in numbered crates with a pack list, so a crew anywhere can open box 4 of 9 and know exactly what belongs inside and where it goes on the floor. Crates are inspected for damage on return from every show, and worn foam, latches or wheels are replaced before the next outbound shipment — not discovered by your I&D crew at 6am on install day.",
      },
      {
        heading: "Refurbishment: when to repair, refinish or rebuild",
        body:
          "A booth that runs five or more shows a year will show wear on high-touch surfaces — counter edges, laminate corners, graphic mounting rails. We inspect and flag these during condition reporting and recommend the least expensive fix that actually holds: a spot refinish, a new graphic skin, or in rare cases a structural rebuild of a single component. We don't recommend a rebuild when a repair will do, and we tell you which option protects the booth's look for the next two to three shows.",
      },
    ],
    deliverables: [
      "Climate-controlled storage between shows",
      "Numbered, tracked asset inventory list",
      "Condition report and photos at every check-in/check-out",
      "Reconfiguration plan and set drawings for alternate footprints",
      "Repair and refurbishment recommendations with cost estimates",
      "Freight-ready crate management and pack lists",
    ],
    pricing: {
      note:
        "Storage and asset management is quoted per booth based on crate count, cubic footage and number of shows per year. It's most cost-effective bundled with a Traction X-built exhibit, but we also take on asset management for booths built elsewhere.",
    },
    process: [
      { title: "Asset intake", body: "Full inventory, photo record and condition report on every crate, panel and fixture." },
      { title: "Storage & tracking", body: "Climate-controlled storage with a live asset list you can check against before every show." },
      { title: "Show-to-show handling", body: "Crates pulled, freighted, installed, dismantled, condition-checked and returned to storage." },
      { title: "Reconfiguration & refurb", body: "Set plans for alternate footprints, and scheduled repairs before wear becomes a show-floor issue." },
    ],
    faqs: [
      { q: "Do you store booths you didn't build?", a: "Yes — asset management is available for exhibits built by other suppliers, as long as we can complete an initial intake inventory and condition report." },
      { q: "Can the same booth run different footprints at different shows?", a: "Yes, if it was engineered for reconfiguration. We assess your current booth and tell you honestly what reconfigures cleanly and what would need new panels." },
      { q: "What happens if a crate is damaged in transit?", a: "Condition is logged at check-in and check-out, so damage is caught immediately, documented with photos, and repaired before the next show rather than discovered on install day." },
      { q: "Is storage climate-controlled?", a: "Yes, storage is climate-controlled to protect finishes, laminates and printed textile between shows." },
      { q: "How is storage priced?", a: "By crate count, cubic footage and number of shows per year — most cost-effective when bundled with a Traction X-built exhibit." },
      { q: "Does this replace buying a new booth every few years?", a: "For most programs, yes. Regular condition reporting and scheduled refurbishment extend a booth's usable life well past the point most owners would otherwise consider a rebuild." },
    ],
    relatedTerms: [
      "trade show booth storage",
      "exhibit asset management",
      "booth reconfiguration",
      "trade show crate management",
      "exhibit refurbishment",
      "owned booth storage between shows",
    ],
    seo: {
      title: "Trade Show Booth Storage, Asset Management & Reconfiguration | Traction X",
      description:
        "Climate-controlled storage, inventoried asset management, condition reporting and reconfiguration for owned trade show exhibits — so a purchased booth behaves like a rental between shows.",
    },
  },
  {
    slug: "trade-show-graphics-and-printing",
    label: "Trade Show Graphics & Printing",
    h1: "Trade Show Graphics & Large Format Printing",
    short: "File setup, substrate selection and large-format print production for booth graphics.",
    answer:
      "Trade show graphics and large-format printing covers turning your artwork into physical booth graphics: correct file setup with bleed and safe areas, resolution matched to viewing distance, substrate selection (tension fabric, direct print, backlit, vinyl, acrylic) and colour matching. Traction X reviews files before production, recommends the right substrate for the graphic's location and distance, and schedules print to land ahead of install — not to it.",
    quickFacts: [
      { label: "File review", value: "Bleed, safe area and resolution checked before production" },
      { label: "Accepted files", value: "Print-ready PDF, high-res TIFF/PSD/AI with outlined type" },
      { label: "Substrates", value: "Tension fabric, direct print, backlit, vinyl, acrylic" },
      { label: "Colour matching", value: "Proofed against Pantone / brand guideline references" },
      { label: "Deadline", value: "Final files typically due 2–3 weeks ahead of install" },
    ],
    hero: {
      title: "Trade Show Graphics",
      accent: "& Large Format Printing",
      intro:
        "Booth graphics that read clean from three feet and thirty. We check every file before it prints, match the substrate to where the graphic lives on the booth, and schedule production to land ahead of install — not the night before.",
    },
    keyPoints: [
      { title: "File review before production", body: "Every file is checked for bleed, safe area, resolution and colour mode before it goes to press — so a spelling fix doesn't turn into a reprint after the graphic is already cut." },
      { title: "Resolution matched to viewing distance", body: "A graphic read from three feet needs far more resolution than a header read from across the aisle; we spec files against the actual viewing distance on your floor plan." },
      { title: "Substrate selection", body: "Tension fabric, direct print on rigid substrate, backlit film, vinyl and acrylic — chosen for where the graphic sits on the booth, not by default." },
      { title: "Colour matching", body: "Proofed against Pantone references or existing brand assets so a backlit tower and a flat backwall don't print two different shades of the same brand colour." },
    ],
    sections: [
      {
        heading: "File setup: bleed, safe area and resolution",
        body:
          "Most graphic delays come from files that weren't built for large-format print. We ask for print-ready PDFs or high-resolution native files (TIFF, PSD, AI) with type outlined or fonts embedded, in CMYK rather than RGB. Bleed extends artwork past the trim edge so no white sliver appears after cutting; the safe area keeps critical text and logos clear of seams, hems and hardware. Resolution requirements scale with viewing distance — a close-up counter graphic needs a much higher effective DPI than a 20-foot backlit header nobody stands next to.",
        bullets: [
          "Print-ready PDF or native file (AI, PSD, TIFF) with fonts outlined or embedded",
          "CMYK colour mode, not RGB, to avoid a colour shift at print",
          "Bleed extended past the trim line on every edge",
          "Critical text and logos kept inside the safe area, clear of seams and hardware",
          "Resolution scaled to actual viewing distance, not a flat DPI rule",
        ],
      },
      {
        heading: "Choosing the right substrate",
        body:
          "Tension fabric is the workhorse for backwalls and towers — lightweight, wrinkle-resistant, and reusable if the same frame is redressed for a new show. Direct print on rigid substrate (PVC, Sintra, acrylic) suits counters, reception desks and any graphic that needs a hard, flat face. Backlit film is built for edge-lit SEG frames and lightboxes, printed to read correctly with light passing through rather than reflecting off it. Vinyl remains the standard for floor graphics and short-run signage. Acrylic and dye-sublimated hard panels carry a premium finish for hero brand moments. We recommend substrate by location and lighting, not by habit.",
      },
      {
        heading: "Colour matching across materials",
        body:
          "The same hex code prints differently on fabric, vinyl and backlit film, because each substrate absorbs and reflects light differently — backlit graphics in particular need adjusted colour values to read correctly once illuminated. We proof major brand colours against Pantone references or existing approved assets before full production, so a client's brand blue doesn't come out three different shades across one booth.",
      },
      {
        heading: "Graphic deadlines relative to install",
        body:
          "Final print-ready files are typically due two to three weeks ahead of install to leave time for proofing, production, quality control and, where needed, mounting to hard substrate before the booth ships. Rush production is possible closer to a show but narrows the margin for catching a file error before it's printed — we flag the risk plainly rather than quietly absorbing it.",
      },
    ],
    deliverables: [
      "Pre-production file review and correction notes",
      "Substrate recommendation by graphic location",
      "Colour proof against Pantone or brand references",
      "Large-format production print",
      "Mounting to hard substrate where required",
      "Packed and labelled graphics matched to the install pack list",
    ],
    pricing: {
      note:
        "Graphics are quoted per square foot by substrate, with file correction and colour proofing included. Custom booth pricing already includes an initial graphic set; reprints and rebrands for repeat shows are priced separately.",
    },
    process: [
      { title: "File intake & review", body: "Bleed, safe area, resolution and colour mode checked before anything goes to press." },
      { title: "Substrate & colour proof", body: "Substrate confirmed by location on the booth, colours proofed against reference before full production." },
      { title: "Production", body: "Large-format print run, mounted to hard substrate where the design calls for it." },
      { title: "Pack & match", body: "Graphics packed and labelled to match the install pack list, so the crew hangs the right panel in the right spot." },
    ],
    faqs: [
      { q: "What file format do you need for booth graphics?", a: "Print-ready PDF is preferred; high-resolution native files (AI, PSD, TIFF) with fonts outlined or embedded also work. Files should be in CMYK with correct bleed and safe area." },
      { q: "What resolution do trade show graphics need?", a: "It depends on viewing distance — a close-up counter graphic needs much higher effective resolution than a large backlit header read from across the aisle. We spec resolution against your floor plan." },
      { q: "What's the best material for a backlit graphic?", a: "Backlit film printed specifically for edge-lit SEG frames or lightboxes — colour values are adjusted so the image reads correctly once illuminated, which is different from a standard direct print." },
      { q: "When are graphic files due before a show?", a: "Typically two to three weeks ahead of install, to allow time for proofing, production and mounting. Rush production is possible but narrows the window to catch file errors." },
      { q: "Can you match our exact brand colours?", a: "Yes — we proof major brand colours against Pantone references or existing approved assets before full production runs." },
      { q: "Do you design graphics or only print them?", a: "Both. Our design team can build graphic layouts from your brand assets, or we can print production-ready files your team or agency has already prepared." },
    ],
    relatedTerms: [
      "trade show graphics printing",
      "large format printing for trade shows",
      "backlit graphic printing",
      "tension fabric graphics",
      "booth graphic file setup",
      "exhibit graphic production",
    ],
    seo: {
      title: "Trade Show Graphics & Large Format Printing | Traction X",
      description:
        "Trade show graphics and large-format printing: file review, bleed and safe area setup, resolution matched to viewing distance, substrate selection and colour matching for tension fabric, backlit, vinyl and acrylic.",
    },
  },
  {
    slug: "show-services-and-exhibitor-kits",
    label: "Show Services & Exhibitor Kits",
    h1: "Show Services & Exhibitor Kit Management",
    short: "Drayage, electrical, rigging, internet, cleaning and labour orders filed to the discount deadline.",
    answer:
      "Show services and exhibitor kit management is the coordination of everything the venue or general contractor bills separately from your booth: drayage (material handling), electrical, rigging, internet, cleaning and union labour. Traction X reviews the exhibitor kit, maps every discount deadline, and files these orders on your behalf — but they are billed directly by the venue or general contractor, not included in booth pricing.",
    quickFacts: [
      { label: "What we coordinate", value: "Drayage, electrical, rigging, internet, cleaning, labour" },
      { label: "Who bills for it", value: "The venue or show's general contractor, not Traction X" },
      { label: "Discount deadlines", value: "Usually 30–45 days before move-in" },
      { label: "Labour jurisdictions", value: "Union rules vary by venue and city" },
      { label: "Included in booth pricing", value: "Install/dismantle labour is; drayage and venue services are not" },
    ],
    hero: {
      title: "Show Services &",
      accent: "Exhibitor Kit Management",
      intro:
        "Every convention centre bills its own services — drayage, electrical, rigging, internet, cleaning, labour — separately from your booth. We read the exhibitor kit, map every discount deadline, and file the orders. The venue still sends the invoice.",
    },
    keyPoints: [
      { title: "Exhibitor kit review", body: "Every show publishes a kit of forms and deadlines; we read it in full and map each discount cutoff to a calendar date so nothing is ordered at full floor price." },
      { title: "Drayage coordination", body: "We estimate drayage from real crate weights, file the paperwork correctly, and audit the invoice during show week — but drayage is billed by the venue's general contractor, not included in booth pricing." },
      { title: "Electrical, rigging & internet", body: "Power, rigging points and internet drops ordered to your floor plan and booked before the discount deadline passes." },
      { title: "Labour jurisdictions", body: "Union rules differ by city and venue; we staff and order to whichever jurisdiction applies so you're not caught in a floor dispute on move-in morning." },
    ],
    sections: [
      {
        heading: "What show services actually are — and who bills for them",
        body:
          "Show services are the venue- or general-contractor-billed items that sit outside your booth build: drayage (material handling), electrical drops, rigging points for hanging signs, internet and telecom, cleaning, and in many cities, union labour for anything beyond what an exhibitor's own staff may touch. This is a site-wide rule worth repeating plainly: drayage is not included in booth pricing. It's a separate charge from the show's general contractor, billed on your crated weight, and it appears as its own line on the show bill regardless of who built your exhibit.",
        bullets: [
          "Drayage (material handling) — billed by weight, by the general contractor",
          "Electrical — power drops ordered to your floor plan and load requirements",
          "Rigging — points and labour for hanging signs and structures",
          "Internet & telecom — booth wifi, hardwired connections, phone lines",
          "Cleaning — booth vacuuming and porter service during show days",
          "Labour — union or venue-required crews for tasks exhibitor staff can't perform themselves",
        ],
      },
      {
        heading: "Exhibitor kit deadlines and discount dates",
        body:
          "Every exhibitor kit publishes an early-bird or standard-rate discount deadline, usually 30–45 days before move-in, after which the same service commonly costs 25–50% more — and ordering on the floor during show week costs more again. We read the kit as soon as it's released, log every deadline against your show date, and file orders with enough lead time to lock the discounted rate. This is one of the most reliable ways to protect a show budget, and it has nothing to do with how the booth itself is designed or built.",
      },
      {
        heading: "Labour jurisdictions and union rules",
        body:
          "Whether your own staff can plug in a monitor or hang a sign depends entirely on the venue's labour jurisdiction. Some convention centres, including McCormick Place in Chicago, allow exhibitors' own full-time staff to set up smaller displays using hand tools without hiring outside labour — while other markets require union crews for the same task. We check the specific venue's exhibitor policy rather than assuming one city's rules apply everywhere, and book the correct crew size and shift length so you're not paying overtime for a job that should have taken half the time.",
      },
      {
        heading: "How Traction X fits in",
        body:
          "We don't own the venue's drayage contract or its electrical service — nobody but the official general contractor can sell those inside the hall. What we do is read every form in the exhibitor kit, tell you plainly what will be billed and by whom, file the paperwork to the discount deadline, and audit the resulting invoice during show week while disputes can still be raised at the service desk. That coordination is included as part of our project management; the underlying charges from the venue are not.",
      },
    ],
    deliverables: [
      "Exhibitor kit review with every deadline mapped to a date",
      "Drayage estimate from real crate weights, filed and audited",
      "Electrical, rigging and internet orders filed to spec",
      "Labour call planning by venue jurisdiction",
      "Cleaning and porter service scheduled for show days",
      "Post-show invoice audit against filed orders",
    ],
    pricing: {
      note:
        "Coordinating show services and exhibitor kits is included as part of Traction X project management. The underlying charges — drayage, electrical, rigging, internet, cleaning and non-included labour — are billed directly by the venue or general contractor and are not part of booth pricing.",
    },
    process: [
      { title: "Kit review", body: "Full exhibitor kit read on release; every discount deadline logged against your show date." },
      { title: "Orders filed", body: "Drayage, electrical, rigging, internet and cleaning ordered to spec before cutoffs pass." },
      { title: "Labour planning", body: "Crew size and shift length booked to the venue's actual labour jurisdiction." },
      { title: "Invoice audit", body: "Show-week invoices collected and checked against what was filed, while disputes can still be raised." },
    ],
    faqs: [
      { q: "Is drayage included in your booth pricing?", a: "No. Drayage is billed by the show's general contractor on your crated weight and always appears as a separate line on the show bill, regardless of who built the exhibit. We estimate it up front, file the paperwork and audit the invoice." },
      { q: "What is an exhibitor kit?", a: "The set of forms and deadlines a show publishes for ordering electrical, rigging, internet, cleaning, labour and drayage. We review it in full and map every discount deadline to a calendar date." },
      { q: "Do I need union labour to set up my booth?", a: "It depends on the venue's labour jurisdiction — rules vary by city and convention centre, and even by booth size. We check the specific venue's exhibitor policy rather than assume one city's rules apply everywhere." },
      { q: "How much do show services typically add to a budget?", a: "Drayage and other venue-billed services commonly add a substantial amount on top of booth cost, and missed discount deadlines or floor orders can add considerably more. Filing early is the main lever you control." },
      { q: "Can you file orders for a booth you didn't build?", a: "Yes — exhibitor kit coordination is a standalone engagement available whether or not Traction X built the exhibit." },
      { q: "Who do I call if there's a problem with a show services invoice?", a: "We audit the invoice against what was filed during show week, while disputes can still be raised at the exhibitor services desk on the floor." },
    ],
    relatedTerms: [
      "exhibitor kit deadlines",
      "trade show drayage",
      "material handling charges",
      "union labour trade show",
      "show services coordination",
      "general contractor exhibitor services",
    ],
    seo: {
      title: "Show Services & Exhibitor Kit Management | Traction X",
      description:
        "Exhibitor kit review, drayage estimates, electrical, rigging, internet, cleaning and union labour coordination — filed to discount deadlines. Drayage and venue services are billed separately from booth pricing.",
    },
  },
];

export const SERVICE_MAP = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
