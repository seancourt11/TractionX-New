export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  sections: { heading: string; body: string[] }[];
  seo: { title: string; description: string };
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "modular-vs-custom-trade-show-booths",
    title: "Modular vs. Custom Trade Show Booths: How to Choose",
    excerpt:
      "The rent-vs-build decision comes down to how often you exhibit, how tight your budget swings between shows, and how bespoke your brand experience needs to be.",
    date: "2026-04-12",
    readMinutes: 6,
    sections: [
      {
        heading: "TL;DR",
        body: [
          "If you exhibit at three or fewer shows per year in changing footprints, a modular rental is almost always the right choice. If you exhibit at four or more with a repeatable footprint, a custom build starts paying for itself inside eighteen months — with the added benefit that you own the design.",
        ],
      },
      {
        heading: "When modular wins",
        body: [
          "Modular exhibits are engineered around aluminium extrusion framing and tension-fabric graphics. The framing rents at a fraction of custom cost, the graphics reprint per show, and the whole booth ships in road cases — so you avoid oversized LTL surcharges.",
          "Choose modular when: you're a first-time exhibitor still learning the show, your booth size changes between shows, your budget is fixed per event, or you're doing a one-off rescue build after another supplier fell through.",
        ],
      },
      {
        heading: "When custom wins",
        body: [
          "Custom exhibits pay off when the same core footprint repeats. Millwork, welded steel and machined aluminium hold up for five-to-seven show cycles with graphic refreshes. The upfront cost is 2–3× a rental of the same size, but by year three the amortised cost per show is materially lower — and the brand experience is one your competitors can't rent.",
          "Choose custom when: you exhibit at four or more shows per year, your booth size and layout are stable, you need permitted double-decks, or the executive team has asked for a booth that doesn't look like anyone else's.",
        ],
      },
      {
        heading: "The hybrid many exhibitors miss",
        body: [
          "A modular chassis + custom millwork insert is the fastest-growing option in the last two years. You get the shipping and reconfiguration economics of modular framing with custom counter, wall and hospitality elements that make it look bespoke. Ask your exhibit partner to price a hybrid option any time you're weighing rent-vs-build — the answer changes.",
        ],
      },
    ],
    seo: {
      title: "Modular vs. Custom Trade Show Booths: How to Choose | Traction X",
      description: "Rent vs. build for trade show booths — how to decide based on show cadence, footprint stability and total-cost-per-show. Includes hybrid modular + custom option.",
    },
  },
  {
    slug: "trade-show-booth-cost-guide-2026",
    title: "Trade Show Booth Cost Guide (2026)",
    excerpt:
      "What a 10×10, 10×20 and 20×20 actually cost in 2026 — rental, custom, and all the drayage, labor and show-services line items that decide your final bill.",
    date: "2026-05-02",
    readMinutes: 8,
    sections: [
      {
        heading: "The number on the exhibit quote is not your final number",
        body: [
          "Every trade show budget has two halves: the exhibit itself and the show-services stack (drayage, electrical, rigging, cleaning, labor, wifi, lead retrieval). For most exhibitors the second half is 40–70% of the first. Budget accordingly.",
        ],
      },
      {
        heading: "10×10 booths",
        body: [
          "Rental starting at about $16,250 for a well-appointed 10×10 with backlit fabric header, reception counter, LED-lit shelving and a monitor mount.",
          "Custom 10×10 builds start around $28,000–$45,000 depending on millwork, real veneer, integrated demo hardware and lighting spec.",
          "Add roughly $3,000–$6,000 in show services for a 10×10 at a major North American convention centre.",
        ],
      },
      {
        heading: "10×20 booths",
        body: [
          "Rental starting at about $22,750. Custom builds $45,000–$90,000. Show services $6,000–$12,000.",
        ],
      },
      {
        heading: "20×20 booths",
        body: [
          "Rental from about $39,000. Custom from $75,000 to $200,000+ depending on hanging structure, hospitality, meeting rooms and AV. Show services $12,000–$25,000+ (rigging is the big-ticket line at this size).",
        ],
      },
      {
        heading: "How to protect the budget",
        body: [
          "File every advance form before the early-bird deadline (typically 30 days pre-show). Missing early-bird can cost 20–35% more on electrical and rigging alone.",
          "Use an advance warehouse only when show flow demands it — drayage is charged per hundredweight both directions.",
          "Ask your exhibit partner for a drayage estimate up-front. The word 'estimate' is doing a lot of work in some quotes.",
        ],
      },
    ],
    seo: {
      title: "Trade Show Booth Cost Guide 2026 — 10×10, 10×20, 20×20 | Traction X",
      description: "What a 10×10, 10×20 and 20×20 trade show booth costs in 2026 — rental vs. custom, plus drayage, labor and show-services budgets. Real numbers, no fluff.",
    },
  },
  {
    slug: "trade-show-timeline-planning",
    title: "The 12-Week Trade Show Timeline (and How to Rescue a 4-Week One)",
    excerpt:
      "A week-by-week planning workback for exhibitors — from design kickoff through outbound freight — with what to compress when the calendar is already on fire.",
    date: "2026-05-20",
    readMinutes: 7,
    sections: [
      {
        heading: "Week 12–10: design & scope",
        body: [
          "Kickoff, objectives, budget band, brand assets in-hand. Concept and floor plan options in week ten. This is the cheapest week to say 'change the whole thing.'",
        ],
      },
      {
        heading: "Week 9–7: production drawings & long-lead items",
        body: [
          "Approved production package. Long-lead items ordered (custom millwork, LED walls with a specific pitch, hanging structures that need permit drawings). Show-services forms filed before early-bird cutoff.",
        ],
      },
      {
        heading: "Week 6–4: fabrication & shop pre-build",
        body: [
          "Booth built, photographed and QC'd in-shop. Graphics printed. Crate labels printed. Freight booked.",
        ],
      },
      {
        heading: "Week 3–1: freight & pre-install",
        body: [
          "Booth ships to advance warehouse or target date at venue. On-site producer confirmed. Labor calls placed. Final show-day timing sent to internal stakeholders.",
        ],
      },
      {
        heading: "Show week & post-show",
        body: [
          "Install, show, dismantle, outbound. Post-show debrief with photos, drayage bill audit and asset check-in inside 10 business days.",
        ],
      },
      {
        heading: "The 4-week rescue",
        body: [
          "Skip original design — pull from an existing modular chassis (700+ in catalog) and layer custom graphics + one hero millwork counter. Direct-to-show freight if inventory allows. Every hour matters, so pick a partner who will pick up the phone the same day you call.",
        ],
      },
    ],
    seo: {
      title: "12-Week Trade Show Timeline & 4-Week Rescue Plan | Traction X",
      description: "Week-by-week trade show planning workback: design, drawings, fabrication, freight and install — plus a 4-week rescue plan for when the calendar is already on fire.",
    },
  },
  {
    slug: "ai-search-geo-for-exhibitors",
    title: "AI Search and GEO: Getting Your Booth Program Cited in ChatGPT and Perplexity",
    excerpt:
      "Generative Engine Optimization (GEO) isn't just an SEO rebrand. Here's how exhibitor marketing teams are surfacing in AI search answers — with structured data, quotable copy and citation-ready sources.",
    date: "2026-06-08",
    readMinutes: 6,
    sections: [
      {
        heading: "Why AI search matters for B2B exhibit buyers",
        body: [
          "Half of B2B research now starts inside an AI assistant. When a marketing director asks Perplexity 'best custom trade show booth builders for Las Vegas', the assistant summarises the answer — and either cites you or doesn't.",
        ],
      },
      {
        heading: "What actually gets cited",
        body: [
          "Assistants heavily favour pages with clear headings, direct answers in the first 100 words (a 'quick answer' or TL;DR block), structured data (Organization, Service, LocalBusiness, FAQPage), and third-party mentions on trusted sources.",
          "Long, hedge-heavy prose ranks poorly in AI answers. Direct, scannable, numbered answers rank well.",
        ],
      },
      {
        heading: "Practical checklist",
        body: [
          "Add a 'Quick answer' block at the top of every service and city page.",
          "Add FAQPage schema on service, city and pricing pages.",
          "Add Organization + Service schema on the homepage and service hubs.",
          "Get cited on at least three third-party sources per major service line (industry directories, association member pages, guest posts).",
          "Publish original data — pricing bands, timelines, case studies with numbers — assistants prefer sources that add net-new information over recap posts.",
        ],
      },
    ],
    seo: {
      title: "AI Search & GEO for Exhibitor Marketing Teams | Traction X",
      description: "Generative Engine Optimization for trade show exhibit programs — how to structure content, schema and citations so ChatGPT and Perplexity cite your booth business.",
    },
  },
  {
    slug: "trade-show-roi-metrics",
    title: "Trade Show ROI: The Five Metrics That Actually Matter",
    excerpt:
      "Booth-scan counts don't pay salespeople. Here's the leaner metric stack CFOs will actually approve next year's exhibit budget against.",
    date: "2026-06-25",
    readMinutes: 5,
    sections: [
      {
        heading: "The five metrics",
        body: [
          "1. Qualified pipeline generated (opps, not leads) — attributed inside 90 days.",
          "2. Meetings booked on-floor with target accounts (name-the-account, not just count).",
          "3. Cost per qualified opportunity (all-in: booth + services + travel + comp).",
          "4. Sales cycle compression for touched vs. untouched accounts.",
          "5. Post-show close rate at 6 and 12 months for booth-sourced opportunities.",
        ],
      },
      {
        heading: "What to stop measuring",
        body: [
          "Badge scans, unqualified leads, 'brand impressions' without a defined denominator, and social media engagement measured only during show week.",
        ],
      },
      {
        heading: "The instrumentation that makes it work",
        body: [
          "A shared spreadsheet with target-account list before the show. Lead-capture that tags account status (target / customer / partner / cold). CRM handoff inside 48 hours of dismantle. Attribution rules agreed with sales ops before the show, not after.",
        ],
      },
    ],
    seo: {
      title: "Trade Show ROI — The 5 Metrics That Actually Matter | Traction X",
      description: "The five trade show ROI metrics CFOs will approve next year's exhibit budget against — qualified pipeline, target-account meetings, cost per opportunity and more.",
    },
  },
];

export const BLOG_MAP = Object.fromEntries(BLOG_POSTS.map((p) => [p.slug, p]));
