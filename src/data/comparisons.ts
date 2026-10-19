export type ComparisonRow = { factor: string; a: string; b: string };

export type Comparison = {
  slug: string;
  label: string;
  optionA: string;
  optionB: string;
  hero: { title: string; accent: string; intro: string };
  tldr: string;
  rows: ComparisonRow[];
  chooseA: { heading: string; points: string[] };
  chooseB: { heading: string; points: string[] };
  verdict: string;
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
};

export const COMPARISONS: Comparison[] = [
  {
    slug: "rent-vs-buy-trade-show-booth",
    label: "Rent vs. Buy",
    optionA: "Renting",
    optionB: "Buying",
    hero: {
      title: "Rent vs. Buy a",
      accent: "Trade Show Booth",
      intro:
        "The honest math on renting versus owning an exhibit — break-even show counts, hidden ownership costs, and which model fits your show calendar.",
    },
    tldr:
      "Rent if you exhibit 1–4 times a year or your footprint changes between shows. Buy if you exhibit 5+ times a year at the same footprint with a stable brand look. Break-even is usually year two to three of a consistent programme — but ownership adds storage, refurbishment and round-trip freight that rental pricing already absorbs.",
    rows: [
      { factor: "Upfront cost (10×20)", a: "$22,750 – $32,000 per show", b: "$32,000 – $65,000 once" },
      { factor: "Annual storage", a: "$0 — included", b: "$1,800 – $6,000/yr" },
      { factor: "Refurbishment", a: "$0 — we maintain the inventory", b: "10–20% of build cost every 2–3 years" },
      { factor: "Graphics refresh", a: "New prints each show, priced in", b: "$1,500 – $6,000 per refresh" },
      { factor: "Round-trip freight", a: "One-way to show, we recover it", b: "Both directions, every show" },
      { factor: "Footprint flexibility", a: "Change size show to show", b: "Locked to the built configuration" },
      { factor: "Design refresh", a: "New look annually at no capital cost", b: "New capital project" },
      { factor: "Balance-sheet treatment", a: "Operating expense", b: "Capital asset, depreciated" },
      { factor: "Lead time", a: "4–8 weeks (rush possible)", b: "8–14 weeks" },
      { factor: "Risk if strategy changes", a: "Low — walk away after the show", b: "High — sunk capital in a fixed asset" },
    ],
    chooseA: {
      heading: "Rent when…",
      points: [
        "You exhibit at one to four shows per year",
        "Your booth size changes between shows (10×10 regional, 20×20 flagship)",
        "You want a visibly new booth each year without a capital request",
        "You're testing a new market, product line or region",
        "You need multi-city delivery and install handled end to end",
        "Marketing budget is opex and capital approval is slow",
      ],
    },
    chooseB: {
      heading: "Buy custom when…",
      points: [
        "You exhibit five or more times a year at the same footprint",
        "Brand standards demand proprietary fabrication and finishes",
        "You have — or want us to provide — managed storage and refurbishment",
        "The booth doubles as a showroom, roadshow or lobby installation",
        "Amortised annual cost lands below your equivalent rental spend",
      ],
    },
    verdict:
      "Most exhibitors overestimate how many shows they'll do and underestimate ownership overhead. Run the real number: total rental cost across your next three years versus purchase price plus storage, refurbishment, graphics and round-trip freight over the same window. Below roughly five shows a year, renting wins almost every time — and a custom rental from Traction X is not a catalog box, it's built to your brand.",
    sections: [
      {
        heading: "The cost most exhibitors forget",
        body: [
          "The purchase price of a booth is the part everyone models. The part that surprises finance is everything that follows it: climate-controlled crate storage between shows, crate repair, refurbishment when laminate chips and LED strips fail, replacement graphics when messaging changes, and return freight on every single show — a cost rentals simply don't have because the structure comes back to us, not to you.",
          "Across a three-year window, those line items commonly add 45–70% on top of the original build price. Model them before you compare the two paths, or the comparison isn't real.",
        ],
      },
      {
        heading: "Custom rental changes the maths",
        body: [
          "The classic rent-versus-buy argument assumed rentals meant generic aluminium extrusion with your logo taped on. That's not what a Traction X rental is. We fabricate to your drawings, in your finishes, with your brand's geometry — then recover and remake the structure after the show.",
          "That means the usual reason to buy — 'we need something that actually looks like us' — no longer forces a capital purchase. You get bespoke design with the cost profile and flexibility of a rental.",
        ],
      },
      {
        heading: "A hybrid model many clients land on",
        body: [
          "Buy the components that never change — a signature reception counter, a proprietary product display fixture, a branded arch — and rent the structure around them each show. You protect the elements that carry brand equity and stay flexible on everything else.",
          "We store, maintain and integrate owned components into rental builds as a managed programme, so your team never touches a crate.",
        ],
      },
    ],
    faqs: [
      { q: "Is renting a trade show booth cheaper than buying?", a: "For one to four shows a year, yes — usually significantly. A 10×20 rental runs $22,750–$32,000 per show with storage, refurbishment and return freight included, while an owned 10×20 costs $32,000–$65,000 up front plus $1,800–$6,000 a year in storage and 10–20% of build cost in refurbishment every two to three years. Break-even typically arrives in year two or three of a five-plus-show-per-year programme." },
      { q: "Can a rental booth still look fully custom?", a: "Yes. Traction X rentals are custom-fabricated to your drawings and brand standards — not catalog hardware. The difference is what happens after the show: we recover and remake the structure instead of shipping it back to your warehouse." },
      { q: "What happens to my graphics on a rental?", a: "Printed graphics are produced fresh for each show and are yours to keep, reuse or discard. Because they're reprinted rather than stored and touched up, your booth never shows the scuffs and colour drift owned graphics accumulate." },
      { q: "Do you store booths we already own?", a: "Yes — managed storage, condition reporting, refurbishment and integration of owned components into new rental builds are all part of our project-management programme." },
    ],
    seo: {
      title: "Rent vs. Buy a Trade Show Booth — Real Cost Comparison (2026) | Traction X",
      description:
        "Should you rent or buy a trade show booth? Side-by-side costs for 10×20 rentals vs. purchase, storage, refurbishment, freight and the real break-even show count.",
    },
  },
  {
    slug: "custom-vs-modular-trade-show-exhibits",
    label: "Custom vs. Modular",
    optionA: "Custom build",
    optionB: "Modular system",
    hero: {
      title: "Custom vs. Modular",
      accent: "Trade Show Exhibits",
      intro:
        "Ground-up fabrication or a reconfigurable modular system — what each actually delivers on the floor, and where the cost difference really comes from.",
    },
    tldr:
      "Custom builds win on brand distinctiveness, unusual geometry and premium material finishes. Modular systems win on reconfigurability, freight cost and speed. Most strong exhibit programmes are hybrids: a modular structural spine with custom-fabricated feature elements — which is how the majority of Traction X rentals are engineered.",
    rows: [
      { factor: "Design freedom", a: "Unlimited — any geometry, any material", b: "Constrained by system framework" },
      { factor: "Cost (10×20)", a: "$32,000 – $65,000", b: "$22,750 – $32,000" },
      { factor: "Lead time", a: "8–14 weeks", b: "4–8 weeks" },
      { factor: "Reconfigurability", a: "Low — built for one footprint", b: "High — rebuild into other sizes" },
      { factor: "Freight weight", a: "Heavier — higher drayage", b: "Lighter — lower drayage" },
      { factor: "Finish level", a: "Millwork, stone, metal, backlit fabric", b: "Extrusion, fabric, laminate panels" },
      { factor: "Repeatability", a: "Rebuild costs are close to original", b: "Same kit, new configuration" },
      { factor: "Best footprint", a: "20×20 and larger islands", b: "10×10 through 20×20" },
    ],
    chooseA: {
      heading: "Go custom when…",
      points: [
        "Your booth has to be architecturally unmistakable on a crowded floor",
        "You need double-decks, hospitality lounges or enclosed meeting rooms",
        "Premium materials — real millwork, stone, brushed metal — carry the brand",
        "Product demonstration requires purpose-built fixtures or integration",
        "The build doubles as a permanent showroom or lobby installation",
      ],
    },
    chooseB: {
      heading: "Go modular when…",
      points: [
        "You exhibit at multiple footprints across a season",
        "Freight and drayage are a meaningful share of your show budget",
        "Timeline is under eight weeks",
        "You want to refresh graphics rather than rebuild structure",
        "Regional and flagship shows need visual consistency at different scales",
      ],
    },
    verdict:
      "Treat it as a spectrum, not a binary. The best-performing booths we build use a modular structural backbone for the walls and ceiling — cheap to freight, fast to install, reconfigurable next season — with custom millwork, backlit feature walls and purpose-built product fixtures layered on top. You get the visual impact of a custom build at meaningfully lower freight, drayage and rebuild cost.",
    sections: [
      {
        heading: "What 'modular' actually means in 2026",
        body: [
          "Modular no longer means visible extrusion and pillowcase fabric. Current systems hide the framework entirely behind seamless tension fabric, backlit lightboxes, dimensional logos and laminate or veneer panels. Attendees can't tell the difference at three feet, let alone across an aisle.",
          "What changes is what happens behind the finish: a modular spine breaks down into lighter, flatter crates, installs faster, and can be re-engineered into a different footprint next season instead of being scrapped.",
        ],
      },
      {
        heading: "Where custom is genuinely irreplaceable",
        body: [
          "Some things a system framework cannot do: cantilevered second storeys, curved solid-surface reception desks, enclosed sound-treated demo rooms, integrated machinery mounts, and any geometry that isn't fundamentally rectilinear.",
          "If your brand's floor presence depends on one of those, custom fabrication isn't a premium — it's a requirement. We run a full millwork and metal shop for exactly this work.",
        ],
      },
      {
        heading: "The freight and drayage difference",
        body: [
          "Drayage is billed by hundredweight on actual crated weight, and a heavy custom build can carry two to three times the crated weight of an equivalent modular structure. On a large show floor that difference alone can run into five figures across a season.",
          "This is the argument that usually decides it for multi-show programmes: identical visual outcome, materially lower recurring show-services bill.",
        ],
      },
    ],
    faqs: [
      { q: "What is the difference between a custom and a modular trade show exhibit?", a: "A custom exhibit is fabricated from scratch for one specific footprint using bespoke materials and geometry. A modular exhibit is built on a reconfigurable structural system that can be rebuilt into different sizes and layouts, finished with tension fabric, lightboxes and panels. Modern modular booths are visually indistinguishable from custom at normal viewing distance." },
      { q: "Is a modular booth cheaper than custom?", a: "Typically 35–50% less at the same footprint — a 10×20 modular runs $22,750–$32,000 versus $32,000–$65,000 custom — and the gap widens over time because modular crates weigh less, cutting drayage on every show." },
      { q: "Can you mix custom and modular in one booth?", a: "Yes, and it's what we recommend for most programmes: a modular structural spine with custom-fabricated millwork, feature walls and product fixtures layered in. You get custom visual impact with modular freight economics." },
      { q: "Do modular booths look cheap?", a: "Not anymore. Current systems are fully concealed behind seamless fabric, backlit graphics and dimensional elements. The frame is invisible in the finished build." },
    ],
    seo: {
      title: "Custom vs. Modular Trade Show Exhibits — Cost, Design & Freight Compared | Traction X",
      description:
        "Custom or modular trade show booth? Compare design freedom, cost at 10×20, lead times, freight weight and drayage — plus the hybrid approach most exhibitors should use.",
    },
  },
  {
    slug: "portable-vs-custom-booth-rental",
    label: "Portable vs. Custom Rental",
    optionA: "Portable display",
    optionB: "Custom rental",
    hero: {
      title: "Portable vs.",
      accent: "Custom Booth Rental",
      intro:
        "Pop-ups, banner stands and tabletop kits versus a fabricated custom rental — the honest breakpoint between the two, by budget and by show tier.",
    },
    tldr:
      "Portable displays make sense under roughly $6,000, for tabletop and 10×10 regional shows, and when your own staff sets up. Custom rentals take over above that — anywhere presence, product integration or a competitive floor matters. The breakpoint is less about size than about who you're standing next to.",
    rows: [
      { factor: "Typical spend", a: "$800 – $6,000", b: "$16,250 and up" },
      { factor: "Setup", a: "Staff, 30–90 minutes, no tools", b: "Professional I&D crew" },
      { factor: "Shipping", a: "Courier cases, no drayage on hand-carry", b: "Crated freight plus drayage" },
      { factor: "Visual impact", a: "Clean but generic", b: "Architecturally distinct" },
      { factor: "Footprints", a: "Tabletop, 10×10", b: "10×10 through island" },
      { factor: "Product integration", a: "Limited — shelving and literature", b: "Purpose-built fixtures, AV, demo stations" },
      { factor: "Lifespan", a: "6–15 shows before it looks tired", b: "Rebuilt fresh each engagement" },
      { factor: "Lead time", a: "1–3 weeks", b: "4–8 weeks" },
    ],
    chooseA: {
      heading: "Portable is right when…",
      points: [
        "You're at tabletop shows, regional conferences or partner events",
        "Total show budget is under about $6,000",
        "Your own team travels with and sets up the display",
        "You need something in under three weeks",
        "You exhibit frequently at low-stakes events where presence is enough",
      ],
    },
    chooseB: {
      heading: "Custom rental is right when…",
      points: [
        "You're on a competitive floor where neighbours have fabricated builds",
        "The booth has to hold meetings, demos or hospitality",
        "Brand perception at this show affects enterprise pipeline",
        "You need AV, lighting, storage and a reception presence",
        "Attendee dwell time — not just impressions — is the goal",
      ],
    },
    verdict:
      "Look left and right at your assigned space before deciding. A portable pop-up between two fabricated 10×10s reads as the least serious company in the row, and that perception costs more than the difference in spend. On a floor where everyone else is portable, a portable display is perfectly sufficient. Match the floor, not an abstract budget rule.",
    sections: [
      {
        heading: "The 'looking small' problem",
        body: [
          "Trade show buyers make credibility judgements in under three seconds, largely on physical presence. A tension-fabric pop-up is clean and professional in isolation, but next to a lit, fabricated, dimensional neighbour it reads as a smaller company with a smaller budget — regardless of your actual size.",
          "This is the single most common reason exhibitors move from portable to custom rental, and it usually happens after one bad show rather than as a planned upgrade.",
        ],
      },
      {
        heading: "The hidden cost comparison",
        body: [
          "Portable looks dramatically cheaper because the comparison usually stops at the hardware price. Add the graphics reprints across a season, replacement cases, the staff time spent setting up and tearing down, and the fact that most portable kits look worn after a dozen shows, and the annual cost of a hard-working portable programme lands closer to a custom rental than the sticker price suggests.",
          "It's still cheaper — but not by the margin most budgets assume.",
        ],
      },
      {
        heading: "You can run both",
        body: [
          "Many of our clients run a two-tier programme: portable kits for the fifteen regional events a year, and a custom rental for the three shows that actually generate pipeline. We supply and store both, and keep the visual language consistent across tiers so the small events still look like the same company.",
        ],
      },
    ],
    faqs: [
      { q: "When should I upgrade from a portable display to a custom rental?", a: "When the shows you attend start generating meaningful pipeline, when your booth neighbours have fabricated builds, or when you need to hold meetings and demos in the space. In budget terms the breakpoint sits around $6,000 — below that portable is usually right, above it a custom rental delivers far more presence per dollar." },
      { q: "Do portable displays avoid drayage?", a: "Sometimes. Many venues allow hand-carried cases through the front door without a drayage charge if you can carry them in one trip without machinery. Rules vary by venue and union jurisdiction — check the exhibitor manual before assuming." },
      { q: "How long does a portable display last?", a: "Typically six to fifteen shows before hardware wear and graphic scuffing become visible. Graphics usually need replacing before the frame does." },
      { q: "Can Traction X supply both portable and custom?", a: "Yes — we run a portable programme for regional and partner events alongside custom rentals for flagship shows, with consistent branding across both tiers." },
    ],
    seo: {
      title: "Portable vs. Custom Booth Rental — Which Trade Show Display Do You Need? | Traction X",
      description:
        "Portable pop-up or custom rental booth? Compare cost, setup, drayage, visual impact and lifespan — with the honest breakpoint between the two by show tier.",
    },
  },
  {
    slug: "exhibit-house-vs-diy-trade-show-booth",
    label: "Exhibit House vs. DIY",
    optionA: "Full-service exhibit house",
    optionB: "DIY / in-house managed",
    hero: {
      title: "Exhibit House vs.",
      accent: "Doing It Yourself",
      intro:
        "Managing your own booth build, freight and labour versus handing the whole programme to one accountable partner — where DIY saves money and where it quietly costs more.",
    },
    tldr:
      "DIY works for portable kits at regional shows. Once you're crating freight, filing show-services paperwork and booking union labour, self-managing typically costs more in overage charges, rush fees and staff hours than a full-service partner's margin — while shifting all the on-floor risk onto your marketing team.",
    rows: [
      { factor: "Booth design", a: "In-house design team, 3D renders", b: "Freelancer or supplier template" },
      { factor: "Fabrication oversight", a: "Owned shop, single accountability", b: "Coordinating multiple vendors" },
      { factor: "Show paperwork", a: "Filed for you, deadlines tracked", b: "Your team, at risk of late fees" },
      { factor: "Drayage handling", a: "Coordinated, weight-optimised crating", b: "Often over-crated and over-billed" },
      { factor: "Union labour", a: "Pre-badged certified crews", b: "Booked on arrival at premium rates" },
      { factor: "On-site problems", a: "Your PM is on the floor", b: "Your marketing manager is on the floor" },
      { factor: "Discount deadlines", a: "Tracked and hit", b: "Commonly missed — 20–35% penalty" },
      { factor: "Internal staff hours", a: "Under 10 per show", b: "40–120 per show" },
    ],
    chooseA: {
      heading: "Use a full-service partner when…",
      points: [
        "The show matters commercially and cannot go wrong",
        "You're exhibiting in a union jurisdiction",
        "Your team has no dedicated events operations person",
        "Freight crosses a border or an ocean",
        "You're running several shows in one season",
      ],
    },
    chooseB: {
      heading: "Self-manage when…",
      points: [
        "You're hand-carrying a portable kit into a regional show",
        "You have an experienced in-house events operations lead",
        "The venue is non-union and exhibitor setup is permitted",
        "The event is low-stakes and the downside of a problem is small",
      ],
    },
    verdict:
      "The real comparison isn't fee versus no fee — it's fee versus overage. Missed discount deadlines alone typically add 20–35% to show services. Add rush freight, over-crated drayage, on-the-day labour rates and the internal hours your marketing team spends on logistics instead of pipeline, and self-managing a mid-size show usually costs more in absolute dollars than delegating it.",
    sections: [
      {
        heading: "The deadline problem",
        body: [
          "Every show publishes advance-order deadlines for electrical, rigging, cleaning, internet, furniture and labour. Order after those dates and rates jump 20–35%; order on-site and they jump again. These deadlines land four to eight weeks out — exactly when a marketing team is heads-down on booth content and forgets the exhibitor manual exists.",
          "Deadline tracking is unglamorous and it's where a project manager pays for themselves before touching a single crate.",
        ],
      },
      {
        heading: "Drayage is where DIY bleeds",
        body: [
          "Drayage is billed on actual crated weight by hundredweight, with minimums. Teams that crate their own booths routinely ship heavier than necessary — wrong crate sizes, unnecessary packing, materials that could have been sourced locally — and pay for it twice, in and out.",
          "Weight-optimised crating and local sourcing of heavy consumables are learned skills. They're also invisible savings, which is why they rarely make it into a DIY cost model.",
        ],
      },
      {
        heading: "Who's standing in the booth at 6am",
        body: [
          "When a crate doesn't arrive, the electrical drop is in the wrong corner, or the labour crew is two hours late, someone has to solve it on the floor at dawn. With a full-service partner that's a project manager who does this fifty times a year. Self-managed, it's your marketing lead — the same person who is supposed to be briefing staff and hosting your first meetings.",
        ],
      },
    ],
    faqs: [
      { q: "Is it cheaper to manage a trade show booth myself?", a: "Only for portable kits at small regional shows. Once crated freight, show-services paperwork and union labour are involved, self-managing usually costs more in missed advance-order discounts (20–35% penalties), over-billed drayage, on-site labour rates and internal staff hours than a full-service partner's fee." },
      { q: "What does a full-service exhibit house actually handle?", a: "Design and 3D renders, fabrication, graphics, crating, freight, drayage coordination, show-services ordering, union labour booking and badging, on-site install and dismantle, storage between shows, and a single project manager on the floor." },
      { q: "How many internal hours does a self-managed show take?", a: "Typically 40–120 staff hours per show across planning, paperwork, vendor coordination and on-site supervision — compared with under 10 when the programme is delegated." },
    ],
    seo: {
      title: "Exhibit House vs. DIY Trade Show Booth — What Self-Managing Really Costs | Traction X",
      description:
        "Should you manage your own trade show booth or use a full-service exhibit house? Compare drayage, union labour, missed discount deadlines and internal staff hours.",
    },
  },
];

export const COMPARISON_MAP: Record<string, Comparison> = Object.fromEntries(
  COMPARISONS.map((c) => [c.slug, c]),
);
