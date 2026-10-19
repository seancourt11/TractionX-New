export type GuideSection = {
  heading: string;
  body: string[];
  bullets?: string[];
  table?: { head: string[]; rows: string[][] };
};

export type Guide = {
  slug: string;
  label: string;
  eyebrow: string;
  readMinutes: number;
  hero: { title: string; accent: string; intro: string };
  tldr: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
};

export const GUIDES: Guide[] = [
  {
    slug: "trade-show-drayage-and-union-labor-explained",
    label: "Drayage & Union Labour Explained",
    eyebrow: "Logistics guide",
    readMinutes: 11,
    hero: {
      title: "Drayage & Union Labour,",
      accent: "Explained Properly",
      intro:
        "The two show-services charges that blow up more exhibit budgets than anything else — how they're calculated, why the estimate is never the invoice, and the specific levers that reduce them.",
    },
    tldr:
      "Drayage is the venue's charge to move your freight from the dock to your booth and back, billed by hundredweight on actual crated weight with a minimum — not a flat fee. Union labour rules dictate who may legally touch your crates, tools and power in a given city. Together they commonly add 30–60% on top of booth cost. You reduce them by shipping lighter, crating smarter, hitting advance deadlines and sourcing heavy consumables locally.",
    sections: [
      {
        heading: "What drayage actually covers",
        body: [
          "Drayage — formally 'material handling' — is not shipping. Your freight forwarder gets crates to the venue; drayage is everything that happens after they arrive: unloading from the truck, delivery to your booth space, removal of empty crates to the bone yard, storage of those crates for the duration of the show, return of the crates to your booth on teardown, and reloading onto the outbound truck.",
          "It is billed by the general contractor, not the venue directly, and it is one of the few charges you cannot competitively shop — the show's official contractor has a monopoly inside the hall.",
        ],
        bullets: [
          "Charged per hundredweight (CWT) — every 100 lbs of crated weight",
          "Almost always subject to a 200–300 lb minimum per shipment",
          "Rounded up to the next hundredweight, per shipment, not per show",
          "Surcharges apply for overtime move-in, uncrated goods, special handling and small-package receipt",
        ],
      },
      {
        heading: "Why the estimate is never the invoice",
        body: [
          "Exhibitors budget from the CWT rate on the order form and are then surprised. Four things cause the gap: crate weight is heavier than the exhibit weight people mentally model; each separate shipment triggers its own minimum; overtime rates apply automatically if the dock schedule slips into evenings or weekends; and 'special handling' surcharges attach to anything shipped loose, stacked oddly or delivered by a carrier that can't produce a certified weight ticket.",
          "The fix isn't negotiation — the rates are fixed. It's changing what arrives at the dock.",
        ],
        table: {
          head: ["Lever", "Typical saving", "How"],
          rows: [
            ["Consolidate shipments", "One minimum instead of three", "Ship everything on one bill of lading, not booth / graphics / giveaways separately"],
            ["Weight-optimised crating", "10–30% of drayage", "Right-sized crates, foam instead of timber packing, no redundant framing"],
            ["Ship to advance warehouse", "Avoids overtime surcharges", "Crates are already in the queue rather than in the marshalling yard"],
            ["Source consumables locally", "Removes 200–600 lbs", "Literature, water, giveaways and furniture delivered in-city, not crated cross-country"],
            ["Modular over heavy custom", "Up to 50% of crated weight", "Aluminium spine plus fabric versus solid millwork walls"],
          ],
        },
      },
      {
        heading: "Union labour: who may touch what",
        body: [
          "In union jurisdictions specific trades hold exclusive rights over specific tasks. Carpenters typically own booth assembly and dismantle, electricians own anything connected to power including under-carpet distribution, riggers own everything suspended from the ceiling, and teamsters own freight movement inside the hall.",
          "The rules vary by city and sometimes by venue within a city. Breaching them doesn't get you a warning — it gets your booth stopped mid-install until the correct crew is called, at premium rates, on the clock.",
        ],
        bullets: [
          "Strictest jurisdictions: Chicago, New York, San Francisco, Boston, Las Vegas (varies by hall), Toronto",
          "Most permissive: much of the US Southeast and Southwest, and many Canadian regional venues",
          "Common exhibitor-permitted exception: full-time company employees may set up a booth under a size threshold (often 300 sq ft) using only hand tools, within a limited time window",
          "Anything plugged into house power, and anything above head height, is almost never exhibitor-permitted",
        ],
      },
      {
        heading: "The advance-deadline discount is the biggest single lever",
        body: [
          "Every general contractor publishes a discount deadline — typically three to six weeks before move-in — for electrical, rigging, labour, cleaning, furniture and internet. Order after it and rates rise 20–35%. Order on-site and they rise again, often by half.",
          "Nothing else in show services returns as much money for as little effort. Put the discount deadline in your calendar the day you sign the space contract, not the week you finalise graphics.",
        ],
      },
      {
        heading: "How we handle it for clients",
        body: [
          "Traction X coordinates drayage and labour as part of project management: we crate to weight, consolidate shipments onto one bill of lading, file advance orders ahead of discount deadlines, book and badge certified union crews in advance, and have a project manager on the floor during move-in.",
          "One important point of honesty: drayage is not included in our booth pricing and we don't mark it up. It's billed directly by the venue's contractor on your show bill — we coordinate it, optimise it and tell you what to expect, but the invoice is theirs.",
        ],
      },
    ],
    faqs: [
      { q: "What is drayage at a trade show?", a: "Drayage, or material handling, is the general contractor's charge for moving your freight from the loading dock to your booth space, storing empty crates during the show, and returning everything to the outbound truck. It is billed by hundredweight on actual crated weight with a minimum, and it is separate from shipping." },
      { q: "How much does drayage cost?", a: "Rates commonly run $85–$180 per hundredweight depending on the city and venue, with a 200–300 lb minimum per shipment and surcharges for overtime, uncrated goods and special handling. A typical 10×20 exhibit generates $1,500–$4,500 in drayage round trip." },
      { q: "Can I set up my own trade show booth?", a: "In many venues yes, if the booth is under a size threshold (often 300 sq ft), the work is done by full-time company employees using hand tools only, and nothing involves house power or overhead rigging. In strict union jurisdictions such as Chicago, New York and San Francisco the exceptions are narrower — check the exhibitor manual for that specific show." },
      { q: "How do I reduce drayage charges?", a: "Consolidate everything onto one shipment, crate to weight rather than to habit, ship to the advance warehouse instead of direct-to-show, source literature and giveaways locally, and choose a modular structure over heavy solid construction where the finish allows." },
      { q: "Is drayage included in a Traction X booth quote?", a: "No. We coordinate and optimise it, but drayage is billed directly by the venue's official contractor on your show bill. We tell you what to budget for it up front so it isn't a surprise." },
    ],
    seo: {
      title: "Trade Show Drayage & Union Labour Explained — Costs and How to Cut Them | Traction X",
      description:
        "What drayage really costs, how hundredweight billing works, which union jurisdictions restrict exhibitor setup, and five proven levers that reduce your show-services bill.",
    },
  },
  {
    slug: "cross-border-trade-show-shipping-canada-usa",
    label: "Cross-Border Shipping: Canada ↔ USA",
    eyebrow: "Logistics guide",
    readMinutes: 9,
    hero: {
      title: "Cross-Border Exhibits,",
      accent: "Canada ↔ USA",
      intro:
        "Customs paperwork, carnets, temporary importation and the border delays that strand booths in a bonded yard while the show floor opens without you.",
    },
    tldr:
      "Exhibit material crossing between Canada and the United States moves as a temporary importation and needs a customs broker, a detailed valued manifest and — for high-value or multi-country tours — an ATA carnet. Build five extra business days into the schedule, never let consumables and giveaways ride on the same declaration as the exhibit structure, and confirm the broker is engaged before the truck leaves the shop.",
    sections: [
      {
        heading: "Temporary importation is the whole game",
        body: [
          "An exhibit crossing the border isn't being sold — it's entering temporarily and leaving again. Declared correctly as a temporary importation, duty is avoided. Declared incorrectly, or with a manifest that doesn't match the crate contents, it becomes a commercial import subject to duty and inspection, and that inspection happens at the border, not at the venue.",
          "Every item that stays in-country — literature handed out, branded giveaways, product samples that don't come home — is a separate matter and must be declared as a permanent import with duty paid.",
        ],
      },
      {
        heading: "What you need before the truck moves",
        body: [
          "Paperwork failures, not customs policy, cause almost every cross-border delay we see. The document set is not complicated, but it has to be complete and it has to match reality inside the crates.",
        ],
        bullets: [
          "A licensed customs broker engaged on both sides of the border",
          "A line-item manifest with declared value, country of origin and HS code for every item",
          "Commercial invoice or pro-forma invoice matching the manifest exactly",
          "Proof of temporary importation intent, with the return date",
          "Separate declaration for consumables, literature and giveaways",
          "Carrier bonded and authorised for in-transit movement",
        ],
      },
      {
        heading: "When you need an ATA carnet",
        body: [
          "A carnet is an international customs passport for goods, valid for one year across participating countries. For a straightforward one-off Canada–US run, a broker-managed temporary importation is usually simpler and cheaper. For a multi-country tour, high-value technology, or a booth going on to Europe or Asia afterwards, a carnet is worth it.",
          "The trap with carnets: every single item listed must leave the country again. A giveaway handed to an attendee off a carnet manifest creates a duty liability and a discharge problem on the way out.",
        ],
      },
      {
        heading: "Schedule the border, not just the show",
        body: [
          "The common planning error is working back from move-in day using transit time alone. Border processing, potential secondary inspection and broker clearance are separate windows on top of driving time.",
          "Our standard for cross-border shows: crates leave five business days earlier than a domestic equivalent, and freight targets the advance warehouse rather than direct-to-show, so a border hold costs you slack rather than your install window.",
        ],
        table: {
          head: ["Leg", "Domestic plan", "Cross-border plan"],
          rows: [
            ["Fabrication complete", "3 weeks out", "4 weeks out"],
            ["Crates depart shop", "8–10 days out", "13–15 days out"],
            ["Customs clearance window", "n/a", "2–4 business days"],
            ["Advance warehouse arrival", "5–7 days out", "5–7 days out"],
            ["Booth install", "Move-in day", "Move-in day"],
          ],
        },
      },
      {
        heading: "Why this is a Traction X strength",
        body: [
          "We're a Canadian company that delivers heavily into the United States, so cross-border isn't an occasional complication for us — it's the default lane. We hold established broker relationships on both sides, crate and manifest to customs standards as a matter of routine, and keep US-side fabrication and inventory available when it makes more sense to build closer to the floor than to cross a border at all.",
          "For Canadian exhibitors going to Las Vegas, Chicago, Orlando or New York — and for US exhibitors coming north to Toronto, Vancouver, Montreal or Halifax — that dual-side capability removes the single biggest schedule risk in the project.",
        ],
      },
    ],
    faqs: [
      { q: "Do I need a customs broker to ship a trade show booth from Canada to the USA?", a: "Yes, in practice. Exhibit material crosses as a temporary importation and requires a line-item manifest with declared values, HS codes and country of origin, filed by a licensed broker on both sides. Attempting it without one is the most common cause of freight being held at the border." },
      { q: "Do I need an ATA carnet for a US show?", a: "Usually not for a single Canada–US movement — a broker-managed temporary importation is simpler and cheaper. A carnet makes sense for multi-country tours, very high-value technology, or when the exhibit continues on to Europe or Asia after the show." },
      { q: "How much extra time should I allow for cross-border freight?", a: "Five extra business days versus a domestic equivalent, and always ship to the advance warehouse rather than direct-to-show so a border hold consumes slack instead of your install window." },
      { q: "How are giveaways and literature handled at the border?", a: "Separately. Anything that stays in-country is a permanent import with duty payable, and it must not ride on the same temporary-importation or carnet declaration as the exhibit structure." },
    ],
    seo: {
      title: "Cross-Border Trade Show Shipping Canada ↔ USA — Customs, Carnets & Timing | Traction X",
      description:
        "How to move an exhibit between Canada and the USA: temporary importation, customs brokers, ATA carnets, manifests and the five-day schedule buffer that prevents border delays.",
    },
  },
  {
    slug: "first-time-exhibitor-checklist",
    label: "First-Time Exhibitor Checklist",
    eyebrow: "Planning guide",
    readMinutes: 12,
    hero: {
      title: "First-Time Exhibitor",
      accent: "Checklist",
      intro:
        "A week-by-week plan from signing the space contract to shipping out — every deadline, order form and decision that catches first-time exhibitors, in the order it hits.",
    },
    tldr:
      "Book the space, read the exhibitor manual the same week, and work backwards: booth design by week 10, fabrication by week 4, advance service orders before the discount deadline, freight to the advance warehouse by week 1. Budget the booth at 40–50% of total show cost — space, services, travel and staffing consume the rest.",
    sections: [
      {
        heading: "Budget the whole show, not the booth",
        body: [
          "First-time exhibitors almost always budget the booth and treat everything else as incidental. In reality the booth is under half the number. Building the full picture before you commit prevents the mid-project scramble where graphics get cut to pay for electrical.",
        ],
        table: {
          head: ["Line item", "Share of total", "Notes"],
          rows: [
            ["Floor space", "20–30%", "Priced per sq ft; corners and islands cost more"],
            ["Booth (rental or build)", "25–35%", "The part everyone budgets"],
            ["Show services", "15–25%", "Drayage, electrical, rigging, cleaning, internet, furniture"],
            ["Travel & accommodation", "10–20%", "Show-week hotel rates are punitive — book early"],
            ["Staffing & training", "5–10%", "Time cost of the people on the floor"],
            ["Marketing & follow-up", "5–10%", "Pre-show outreach, giveaways, lead retrieval, post-show sequence"],
          ],
        },
      },
      {
        heading: "Weeks 16–12: foundation",
        body: ["Everything downstream depends on decisions made here."],
        bullets: [
          "Sign the space contract and confirm your booth number and neighbours",
          "Download and actually read the exhibitor manual — note every deadline in a shared calendar",
          "Confirm display rules for your booth type: height limits, hanging-sign eligibility, sightline restrictions",
          "Define one measurable objective for the show (qualified meetings, demos booked, pipeline value)",
          "Set the full budget using the table above",
          "Brief your exhibit partner and request 3D concepts",
        ],
      },
      {
        heading: "Weeks 12–8: design and commit",
        body: ["This is the window where changes are still free."],
        bullets: [
          "Approve the 3D design and floor plan, including the exact electrical drop locations",
          "Lock the booth contract so fabrication can be scheduled",
          "Finalise messaging hierarchy — the backwall headline must be legible from 20 feet",
          "Order lead retrieval units",
          "Book hotels and flights before show-week rates escalate",
          "Start pre-show outreach: book meetings into the calendar now, not on the floor",
        ],
      },
      {
        heading: "Weeks 8–4: the deadline window",
        body: [
          "The advance-order discount deadline usually falls here. Missing it costs 20–35% on services for no benefit whatsoever.",
        ],
        bullets: [
          "Submit all advance service orders: electrical, rigging, internet, cleaning, furniture, labour",
          "Confirm rigging approval and dead-load certification if you have a hanging sign",
          "Approve print-ready graphics files",
          "File your Exhibitor Appointed Contractor notice and insurance certificates if using a non-official installer",
          "Book and badge install crews",
          "Confirm freight plan, shipping addresses and target move-in time",
        ],
      },
      {
        heading: "Weeks 4–1: production and shipping",
        body: ["Fabrication completes and freight moves. Your attention shifts to the people and the follow-up."],
        bullets: [
          "Fabrication and graphics complete; review photos of the set build if offered",
          "Crates ship to the advance warehouse (add five business days if crossing a border)",
          "Run booth staff training: opening question, qualification criteria, demo flow, handoff",
          "Build the post-show follow-up sequence before you travel — it never gets written afterwards",
          "Ship or source literature, giveaways and consumables locally where possible",
          "Confirm on-site contacts and mobile numbers for every vendor",
        ],
      },
      {
        heading: "Show week and after",
        body: [
          "Arrive for install, not for opening. Walk the space with your project manager, confirm the electrical drop is where the drawing said, and test every screen before the hall opens.",
          "The follow-up window matters more than anything that happens in the booth. Leads contacted within 48 hours convert at a multiple of those contacted the following week — which is why the sequence gets written before you fly, not after.",
        ],
        bullets: [
          "Attend install day and sign off the completed build",
          "Brief staff each morning; rotate them off the floor every two hours",
          "Capture leads digitally with qualification notes, not just a badge scan",
          "Photograph the finished booth for next year's brief and internal reporting",
          "Confirm outbound freight paperwork and empty-crate labels before teardown",
          "Send follow-up within 48 hours; hold a debrief within two weeks while detail is fresh",
        ],
      },
    ],
    faqs: [
      { q: "How much does it cost to exhibit at a trade show for the first time?", a: "Budget the booth at roughly 25–35% of total cost. A first-time 10×10 programme typically lands at $25,000–$58,500 all-in including floor space, a custom rental booth, show services, travel and staffing; a 10×20 commonly runs $58,500–$104,000." },
      { q: "How far in advance should I plan a trade show?", a: "Sixteen weeks is comfortable, twelve is workable, and eight is a rush. The hard constraints are fabrication time (4–8 weeks) and the advance-order discount deadline, which usually falls four to six weeks before move-in." },
      { q: "What do first-time exhibitors most often get wrong?", a: "Three things: budgeting only the booth and being blindsided by show services, missing the advance-order discount deadline, and writing the follow-up plan after the show instead of before it." },
      { q: "Should a first-time exhibitor rent or buy a booth?", a: "Rent. You don't yet know which footprint, layout or messaging works for your audience, and a rental lets you learn that without capital risk. Buy only once you have a proven format and a five-plus-show annual calendar." },
    ],
    seo: {
      title: "First-Time Trade Show Exhibitor Checklist — 16-Week Plan & Budget | Traction X",
      description:
        "A week-by-week checklist for first-time exhibitors: full show budget breakdown, exhibitor manual deadlines, advance service orders, freight timing and post-show follow-up.",
    },
  },
];

export const GUIDE_MAP: Record<string, Guide> = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
