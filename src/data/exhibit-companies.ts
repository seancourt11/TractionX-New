/**
 * Provider landscape for the exhibit-company comparison page.
 *
 * Everything here is a general, defensible observation about each company's
 * service model — no invented pricing, no claims about a competitor we can't
 * stand behind. The goal is a genuinely useful buyer's guide that happens to
 * make Traction X's position obvious.
 */

export type ExhibitCompany = {
  id: string;
  name: string;
  category: string;
  summary: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  /** Highlighted card treatment for our own entry. */
  us?: boolean;
};

export const EXHIBIT_COMPANIES: ExhibitCompany[] = [
  {
    id: "freeman",
    name: "Freeman",
    category: "General service contractor",
    summary:
      "The largest general service contractor in North America. Freeman is the official contractor on a huge share of major US and Canadian shows, which means they handle material handling, rigging, electrical coordination and show-floor labour as well as selling exhibit rentals and custom builds.",
    pros: [
      "Official-contractor status on many large shows — freight, drayage, rigging and labour are all handled through one account",
      "Enormous rental inventory and national logistics reach; almost no show is out of range",
      "Strong at very large islands, general sessions and full event production",
      "Deep familiarity with venue rules, union labour jurisdictions and show deadlines",
    ],
    cons: [
      "Rental exhibit programmes lean on standardised kits — genuine custom fabrication usually means a longer, more expensive path",
      "Show services (material handling, electrical, rigging) are billed separately and are frequently where budgets blow out",
      "Account teams carry a lot of exhibitors during show season; response times can stretch at peak",
      "Less flexible on late scope changes because the same crew is servicing the entire floor",
    ],
    bestFor:
      "Exhibitors who want everything on one show invoice, and organisers running large-format general sessions.",
  },
  {
    id: "ges",
    name: "GES (Viad)",
    category: "General service contractor",
    summary:
      "The other large general service contractor, GES operates the same dual role: official contractor on many shows plus its own exhibit rental and custom-build arm, with a global footprint through its international divisions.",
    pros: [
      "Global reach — useful when the same programme runs across North America, Europe and the Middle East",
      "Official-contractor advantages on the shows they hold: simpler logistics, direct access to the floor plan and utilities",
      "Large modular rental inventory available at short notice",
      "Well-developed exhibitor portals and ordering systems",
    ],
    cons: [
      "Rental designs are drawn from a system library, so booths can look like other booths on the same floor",
      "Custom work typically routes through a separate division with its own timeline and pricing",
      "Show-service pricing (drayage in particular) is set by the show, not negotiable with you",
      "Support quality varies by region and by which local branch services your show",
    ],
    bestFor:
      "Multinational exhibitors who need one vendor relationship across several continents.",
  },
  {
    id: "czarnowski",
    name: "Czarnowski",
    category: "National exhibit house",
    summary:
      "A large, long-established exhibit house focused on custom design and fabrication rather than general show services, with multiple production facilities and a strong presence in pharma, medtech and industrial trade shows.",
    pros: [
      "Serious custom fabrication capability with in-house production capacity",
      "Strong strategy and experiential design teams for programme-level work",
      "Handles multi-show, multi-year programmes with asset management and storage",
      "Not the official contractor, so their incentive is your booth, not the floor",
    ],
    cons: [
      "Built around large, ongoing programmes — a one-off 10×20 is not the sweet spot",
      "Layered account structure means more people between you and the shop floor",
      "Lead times reflect the size of the operation; fast turnarounds are the exception",
      "Programme-level engagements often come with minimums that smaller exhibitors can't justify",
    ],
    bestFor:
      "Enterprise exhibitors with a large annual show calendar and a dedicated exhibit budget owner.",
  },
  {
    id: "skyline",
    name: "Skyline Exhibits",
    category: "Franchise / dealer network",
    summary:
      "A franchise network selling proprietary modular and portable display systems through independently owned local dealers, with rental options built on the same hardware.",
    pros: [
      "Local dealer presence in most markets — a face-to-face contact nearby",
      "Proven, reusable hardware systems that are quick to install and reconfigure",
      "Good fit for portable and inline displays where speed matters more than uniqueness",
      "Consistent parts availability across the network",
    ],
    cons: [
      "Designs are constrained by the proprietary system — the aesthetic ceiling is the hardware",
      "Quality and responsiveness depend heavily on which franchise owns your territory",
      "Replacement parts and graphics are tied to that system long-term",
      "Not the right route for a bespoke island or an activation-grade brand environment",
    ],
    bestFor:
      "Exhibitors standardising on a repeatable inline or modular kit across many regional shows.",
  },
  {
    id: "nimlok-orbus",
    name: "Nimlok / Orbus",
    category: "Modular systems through dealers",
    summary:
      "Manufacturer-led modular and portable display systems distributed through a dealer and reseller network, covering everything from banner stands to larger modular structures.",
    pros: [
      "Broad, well-priced product catalogue with fast lead times on stock items",
      "Excellent for portables, fabric backwalls and lightweight travelling displays",
      "Predictable pricing — you can see what a kit costs before talking to anyone",
      "Wide dealer coverage means someone local can usually support you",
    ],
    cons: [
      "Buying through a reseller adds a layer between you and the manufacturer",
      "Customisation is largely graphics and configuration, not fabrication",
      "Booths built on common systems are recognisable to anyone who walks trade show floors",
      "Limited support for show logistics, install labour and on-site problem solving",
    ],
    bestFor:
      "Smaller footprints and travelling displays where budget and portability outrank distinctiveness.",
  },
  {
    id: "regional",
    name: "Local & regional exhibit houses",
    category: "Independent shops",
    summary:
      "Independent exhibit builders serving a city or region. The category ranges from excellent boutique fabricators to a print shop with a woodworking bench, so the name on the door tells you very little.",
    pros: [
      "Direct access to the people actually building your booth",
      "Flexible on scope changes and often faster to quote",
      "Competitive on price for local shows with short freight legs",
      "Genuine custom work is on the table at smaller footprints",
    ],
    cons: [
      "Capability varies enormously — vet the shop, not the sales pitch",
      "Coverage outside their home region often means subcontracting install to strangers",
      "Smaller inventory means a rental may become a build, at build pricing",
      "Limited capacity during peak season when several clients have shows the same week",
    ],
    bestFor:
      "Single-market exhibitors doing a handful of local shows a year.",
  },
  {
    id: "traction-x",
    name: "Traction X",
    category: "Custom exhibit rentals & builds",
    us: true,
    summary:
      "A custom exhibit partner: every rental is fabricated to your drawings and brand rather than pulled from a system catalogue, with install and dismantle labour included in the exhibit price and a complimentary 3D design before you commit.",
    pros: [
      "100% custom rentals — the structure is built to your design, not adapted from a kit",
      "Install and dismantle labour included in every exhibit price, not added later",
      "Complimentary photoreal 3D design before you spend anything",
      "Tiered and à la carte pricing, so the booth is designed to your precise budget",
      "Direct access to the designers and the shop — no account layer in between",
      "Custom fabrication and millwork in-house for activation-grade brand environments",
    ],
    cons: [
      "We are not the official show contractor, so venue services (drayage, electrical, rigging) are ordered from the show",
      "We are not the cheapest route to a basic pop-up banner display",
      "Custom design takes design time — sub-two-week turnarounds are rush work, not the norm",
    ],
    bestFor:
      "Exhibitors who want a booth that looks purpose-built for their brand, with predictable all-in exhibit pricing.",
  },
];

export type CompareRow = {
  factor: string;
  gsc: string;
  house: string;
  system: string;
  us: string;
};

/** At-a-glance table: model categories rather than one column per brand. */
export const COMPANY_COMPARE_ROWS: CompareRow[] = [
  {
    factor: "Service model",
    gsc: "Official show contractor plus exhibit sales",
    house: "Design and fabrication for exhibit programmes",
    system: "Proprietary hardware sold through dealers",
    us: "Custom design, fabrication and managed rental",
  },
  {
    factor: "Custom fabrication depth",
    gsc: "Available, on a separate custom track",
    house: "High — the core of the business",
    system: "Low — configuration and graphics",
    us: "High — every rental is built to your drawings",
  },
  {
    factor: "Rental catalogue",
    gsc: "Very large, system-based",
    house: "Limited; programmes are usually owned assets",
    system: "Kit-based rentals on the same hardware",
    us: "Custom rentals across 10×10 through island footprints",
  },
  {
    factor: "Footprint sweet spot",
    gsc: "Large islands and show-wide production",
    house: "20×20 and up, multi-show programmes",
    system: "10×10 to 10×20 and portables",
    us: "10×10 through 40×40 islands and activations",
  },
  {
    factor: "Official-contractor advantage",
    gsc: "Yes — services on one show invoice",
    house: "No",
    system: "No",
    us: "No — venue services are ordered from the show",
  },
  {
    factor: "Install & dismantle labour",
    gsc: "Quoted separately by the show",
    house: "Usually quoted separately",
    system: "Exhibitor-installed or local labour",
    us: "Included in the exhibit price",
  },
  {
    factor: "Design turnaround",
    gsc: "Weeks; longer on the custom track",
    house: "Weeks to months for programme work",
    system: "Days — you're picking from a catalogue",
    us: "Preliminary direction in two business days, full design in one to two weeks",
  },
  {
    factor: "Who you talk to",
    gsc: "Account manager servicing the whole floor",
    house: "Layered account and design teams",
    system: "Local dealer or reseller",
    us: "The designer and the shop building it",
  },
  {
    factor: "Best for",
    gsc: "One-invoice logistics at very large shows",
    house: "Enterprise multi-show programmes",
    system: "Repeatable portable and inline kits",
    us: "Brand-accurate custom booths on a defined budget",
  },
];

/** Procurement checklist — genuinely useful, and quietly favours transparent vendors. */
export const VENDOR_QUESTIONS: { q: string; why: string }[] = [
  {
    q: "Who owns the design drawings when the project ends?",
    why: "If you can't take the drawings elsewhere, you're locked into that vendor for every future show.",
  },
  {
    q: "Is install and dismantle labour included, or quoted later?",
    why: "I&D is one of the largest line items on the show floor and is often left out of the headline price.",
  },
  {
    q: "What exactly is billed by the venue or show rather than by you?",
    why: "Material handling, electrical, rigging and cleaning are set by the show — an honest vendor tells you upfront.",
  },
  {
    q: "Is this a custom build or a system kit with my graphics on it?",
    why: "Both are valid, but they should not be priced the same. Ask to see the structure without graphics.",
  },
  {
    q: "Who is physically on site during install, and who do I call at 7am on move-in day?",
    why: "A named person beats a support inbox when a crate is late or the floor plan changed.",
  },
  {
    q: "What is your rush policy and the real cut-off date for changes?",
    why: "Every shop has a point of no return. Knowing it early prevents rush fees you didn't budget for.",
  },
  {
    q: "For rentals, how is the structure refurbished between shows?",
    why: "Rental inventory that isn't refinished shows its age under show lighting.",
  },
  {
    q: "Can I see a photoreal 3D render before I commit budget?",
    why: "If a vendor won't show you the booth before you sign, you're buying a description.",
  },
  {
    q: "What happens if my footprint or booth number changes after the show releases the floor plan?",
    why: "It happens constantly. The answer reveals how flexible the build really is.",
  },
  {
    q: "How is the quote structured — one number, or tiers and à la carte?",
    why: "Itemised, tiered pricing lets you protect the budget by trading scope, not by cancelling the booth.",
  },
];

export const COMPANY_FAQS: { q: string; a: string }[] = [
  {
    q: "Is Freeman or GES cheaper for a booth rental?",
    a: "Neither is reliably cheaper than the other — their exhibit rental pricing is broadly comparable and both are shaped far more by the show services attached to the booth than by the structure itself. The bigger cost question is whether you're comparing exhibit-only pricing against exhibit-plus-labour-plus-material-handling. Always normalise the quotes to the same inclusions before deciding.",
  },
  {
    q: "Do I have to use the official show contractor for my booth?",
    a: "Almost never for the exhibit itself. Shows require you to order certain services — material handling, rigging, electrical and sometimes labour — through the official contractor, but you are generally free to have your booth designed, built and rented by any exhibit house you choose. Check the exhibitor manual for your specific show, because the rules on install labour vary by venue and jurisdiction.",
  },
  {
    q: "What's the difference between a general service contractor and an exhibit house?",
    a: "A general service contractor is hired by the show organiser to run the floor: aisle carpet, material handling, rigging, utilities and labour. An exhibit house is hired by you to design and build your booth. The large contractors also sell exhibits, which is where the two roles blur — and why exhibitors sometimes assume they have no choice.",
  },
  {
    q: "Can I use my own exhibit house at a Freeman or GES show?",
    a: "Yes. You'll still order material handling and any required services through the official contractor, and your builder submits an EAC (exhibitor-appointed contractor) notice and certificate of insurance where the show requires one. We handle that paperwork as part of every project.",
  },
  {
    q: "Are custom rentals really custom, or just a kit with new graphics?",
    a: "It depends entirely on the vendor. Much of what's marketed as a custom rental is a modular system reconfigured and re-skinned. A true custom rental is fabricated to your drawings — your geometry, your finishes, your millwork — and then recovered and remade after the show. Ask to see the structure without graphics; that answers the question in one image.",
  },
  {
    q: "How do I compare quotes from different exhibit companies fairly?",
    a: "Normalise three things: what's included in the exhibit price (structure, graphics, AV, furniture, flooring), whether install and dismantle labour is in or out, and which venue services are excluded because the show bills them directly. Once those three are matched, the quotes are comparable — before that, they usually aren't.",
  },
  {
    q: "Which exhibit company is best for a 20×20 island?",
    a: "At 20×20 you're past what system kits do well and usually below the programme minimums of the largest exhibit houses. That footprint is the sweet spot for a specialist custom-rental partner: bespoke fabrication, a single accountable team, and pricing that doesn't carry enterprise overhead.",
  },
  {
    q: "When is Traction X the wrong choice?",
    a: "If you need a single invoice covering the entire show floor, or you're running general sessions and show-wide production, the official contractor is the simpler call. If you need a $2,000 pop-up banner shipped tomorrow, a portable systems dealer will serve you better than we will. We're the right partner when the booth needs to look purpose-built and the budget needs to be respected exactly.",
  },
];
