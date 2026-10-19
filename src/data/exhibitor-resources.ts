/**
 * Exhibitor Resource Center — practical tools and checklists for the 16 weeks
 * before a show. Each entry gets its own indexable URL under
 * /exhibitor-resources/<slug>. `tool` names an interactive module rendered
 * between the intro and the body sections.
 */

export type ResourceSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
  checklist?: { group: string; items: string[] }[];
  table?: { head: string[]; rows: string[][] };
};

export type ResourceTool = "budget" | "deadlines" | "roi" | "specs" | "venue-rules" | null;

export type ExhibitorResource = {
  slug: string;
  label: string;
  eyebrow: string;
  /** One line for the hub card. */
  summary: string;
  kind: "Interactive tool" | "Checklist" | "Reference" | "Playbook";
  readMinutes: number;
  tool: ResourceTool;
  hero: { title: string; accent: string; intro: string };
  tldr: string;
  sections: ResourceSection[];
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
  /** Optional HowTo schema steps. */
  howTo?: { name: string; steps: { name: string; text: string }[] };
};

export const EXHIBITOR_RESOURCES: ExhibitorResource[] = [
  /* ---------------------------------------------------------------- 1 */
  {
    slug: "trade-show-budget-template",
    label: "Trade Show Budget Template",
    eyebrow: "Budgeting tool",
    summary:
      "Every real line item — space, booth, drayage, electrical, travel, staff — in one worksheet that totals as you type.",
    kind: "Interactive tool",
    readMinutes: 9,
    tool: "budget",
    hero: {
      title: "Trade Show Budget",
      accent: "Template That Includes The Hidden Lines",
      intro:
        "Most exhibit budgets fail in the same place: the booth is costed accurately and everything the venue bills is guessed. Fill in the worksheet below and you'll see the real all-in number, split by percentage, ready to forward to finance.",
    },
    tldr:
      "Booth fabrication is typically 25–35% of a trade show budget. Space rental is another 20–30%, show services (drayage, electrical, rigging, internet, cleaning) 15–25%, travel and staff 10–20%, and marketing, giveaways and lead capture the rest. Build the budget from all seven categories or you will be 40% short.",
    sections: [
      {
        heading: "How to use the worksheet",
        body: [
          "Start with the two numbers you already know — the square footage you booked and the price per square foot on your space contract. Everything else scales off that footprint, so the worksheet pre-fills sensible starting values for your size and lets you overwrite any line.",
          "Work top to bottom. Leave a line at zero only when you are genuinely certain it does not apply; a zero drayage line, for example, is only true if you are hand-carrying everything and the show allows it.",
        ],
        bullets: [
          "Set the footprint and your space rate first — the rest scales from it.",
          "Overwrite any pre-filled figure with a real quote as soon as you have one.",
          "Keep a contingency line at 8–12%. Show-floor change orders are normal, not exceptional.",
          "Budget outbound freight and post-show storage. Both are routinely forgotten.",
        ],
      },
      {
        heading: "The seven categories every exhibit budget needs",
        body: [
          "Organisers publish space cost. Nobody publishes the rest, which is why first-time exhibitors consistently under-budget by a third or more.",
        ],
        table: {
          head: ["Category", "Typical share", "What sits inside it"],
          rows: [
            ["Space rental", "20–30%", "Per-square-foot booth space, corner or island premium, association member rate"],
            ["Exhibit", "25–35%", "Design, fabrication or rental, graphics, flooring, furniture, install and dismantle labour"],
            ["Show services", "15–25%", "Drayage, electrical, rigging, internet, cleaning, water/air, lead retrieval"],
            ["Freight", "5–10%", "Inbound to advance warehouse, outbound return, crate storage between shows"],
            ["Travel and staff", "10–20%", "Flights, hotel at block rate, per diems, staff time, shipping personal gear"],
            ["Marketing", "5–15%", "Pre-show campaigns, giveaways, printed collateral, in-booth demos, sponsorships"],
            ["Contingency", "8–12%", "On-site change orders, replacement graphics, overtime labour, damaged freight"],
          ],
        },
      },
      {
        heading: "Where budgets actually break",
        bullets: [
          "Drayage billed on gross crated weight with a per-hundredweight minimum — a heavy crate can cost more to move 300 feet than to ship 3,000 miles.",
          "Missing the advance-order deadline on electrical and rigging, which commonly adds 20–35% to those lines.",
          "Overtime labour: install outside standard hours is billed at time and a half or double time in most union halls.",
          "Install and dismantle labour quoted separately by the exhibit supplier and invoiced after the show. Every Traction X price includes it.",
          "Outbound freight and empty-crate return, which land on an invoice weeks after everyone has moved on.",
        ],
      },
      {
        heading: "What we include so it never lands after the show",
        body: [
          "Our published booth pricing covers design, fabrication, graphics, delivery and install and dismantle labour under one agreement. The worksheet still asks you to budget venue-billed services, because those are ordered from the show's official contractor and no exhibit house can absorb them — but the exhibit column will not move on you.",
        ],
      },
    ],
    faqs: [
      {
        q: "What percentage of a trade show budget should the booth be?",
        a: "Plan for the physical exhibit — design, fabrication or rental, graphics, flooring, furniture and install and dismantle labour — to be 25–35% of total show spend. If your booth quote is more than half your budget, the show-services and travel lines are almost certainly under-counted.",
      },
      {
        q: "How much should I budget for drayage?",
        a: "Budget on weight, not guesswork: most general contractors bill $85–$165 per hundredweight with a 200 lb minimum, doubled for special handling or overtime delivery. A typical 10×20 custom rental crates at 800–1,500 lbs, so $900–$2,400 is a realistic band before overtime.",
      },
      {
        q: "Does the booth price include installation?",
        a: "With Traction X, yes — install and dismantle labour is inside every published price, not a post-show invoice. Confirm this in writing with any supplier, because separately billed I&D is the single most common budget surprise.",
      },
      {
        q: "How much contingency should an exhibit budget carry?",
        a: "Eight to twelve percent. On-site change orders, overtime, replacement graphics and additional power drops are routine, and the show floor is the most expensive place on earth to make a decision.",
      },
    ],
    seo: {
      title: "Trade Show Budget Template 2027 — Free Interactive Worksheet | Traction X",
      description:
        "Free interactive trade show budget template covering booth, space, drayage, electrical, freight, travel and staff. Totals as you type, download the worksheet.",
    },
    howTo: {
      name: "How to build a trade show budget",
      steps: [
        { name: "Set your footprint", text: "Enter the booth size you contracted and your per-square-foot space rate." },
        { name: "Cost the exhibit", text: "Add design, fabrication or rental, graphics, flooring and furniture. Confirm install and dismantle labour is included." },
        { name: "Add show services", text: "Budget drayage on crated weight, plus electrical, rigging, internet and cleaning at advance-order rates." },
        { name: "Add freight and travel", text: "Inbound and outbound freight, flights, hotel at block rate, per diems and staff time." },
        { name: "Add marketing and contingency", text: "Pre-show campaigns, collateral and lead capture, then 8–12% contingency for on-site changes." },
      ],
    },
  },

  /* ---------------------------------------------------------------- 2 */
  {
    slug: "show-services-deadline-tracker",
    label: "Show Services Deadline Tracker",
    eyebrow: "Planning tool",
    summary:
      "Enter your show date and get every order-by date that costs real money if you miss it — exportable to your calendar.",
    kind: "Interactive tool",
    readMinutes: 8,
    tool: "deadlines",
    hero: {
      title: "Show Services",
      accent: "Deadline Tracker",
      intro:
        "Advance-order deadlines are the cheapest discount in the exhibit business and the easiest to miss. Put your show date in below and every deadline back-calculates, ready to drop into your calendar.",
    },
    tldr:
      "The deadlines that matter run 20 weeks out to move-in day: design approval at 16 weeks, venue and fire-marshal submissions at 12, fabrication release at 10, discount show-services orders at 8, graphics files at 6, warehouse pre-build at 4, and advance-warehouse freight at 2. Missing the 8-week services deadline typically costs 20–35% on electrical, rigging and internet.",
    sections: [
      {
        heading: "The deadlines that cost money",
        table: {
          head: ["Deadline", "Typical timing", "Cost of missing it"],
          rows: [
            ["Exhibitor manual released", "16–20 weeks out", "You lose lead time on every deadline below"],
            ["Hotel room block", "12–16 weeks out", "Rack rates, often 40–80% higher, and a longer commute"],
            ["Rigging drawings and approvals", "10–12 weeks out", "Hanging sign refused on site — the whole visual anchor of an island booth"],
            ["Discount electrical / internet / cleaning", "6–8 weeks out", "20–35% surcharge, more if ordered on the floor"],
            ["Graphics files to print", "5–6 weeks out", "Rush print fees, or plain panels at show open"],
            ["Advance warehouse freight window", "2–3 weeks out", "Direct-to-show delivery, marshalling yard queues, higher drayage"],
            ["Lead retrieval order", "2–4 weeks out", "On-site pricing, or no scanner at all on a sold-out show"],
          ],
        },
      },
      {
        heading: "Why the advance warehouse window matters most",
        body: [
          "Shipping to the advance warehouse means your crates are already in the building, on your target move-in day, in your booth space when your installers arrive. Direct-to-show shipping means a marshalling yard, a check-in window you do not control, and a crew standing idle at hourly rates while you wait.",
          "The advance window usually opens 30 days before move-in and closes 7–10 days before. Hitting it is normally cheaper per hundredweight and always cheaper in labour.",
        ],
      },
      {
        heading: "How we track this for our clients",
        body: [
          "Every Traction X project runs against this exact work-back schedule with a named producer accountable for each date. You get the tracker whether or not you build with us — but if you do, we file the show-services orders, submit the rigging drawings and book the freight windows for you.",
        ],
      },
    ],
    faqs: [
      {
        q: "When is the discount deadline for trade show electrical?",
        a: "Most general contractors set the advance-rate deadline 14–21 days before move-in, though many shows publish an earlier 'super saver' date around 45 days out. Ordering on the show floor typically costs 20–35% more than the advance rate, sometimes double.",
      },
      {
        q: "How far in advance should I start planning a trade show booth?",
        a: "Twenty weeks for a custom build, and 10–12 weeks is the realistic floor for a custom rental. Anything tighter is possible with pre-engineered systems, but you lose the cheap moments to change the design and pay rush fees on print and freight.",
      },
      {
        q: "What is the advance warehouse deadline?",
        a: "The advance warehouse usually accepts freight from 30 days before move-in until 7–10 days before, with late fees inside the final week. Shipping into that window is the single easiest way to reduce drayage cost and install-day risk.",
      },
    ],
    seo: {
      title: "Trade Show Deadline Tracker — Order-By Dates From Your Show Date | Traction X",
      description:
        "Enter your show date and get every exhibitor deadline back-calculated: electrical discount date, rigging approvals, graphics files, advance warehouse freight. Export to calendar.",
    },
    howTo: {
      name: "How to back-calculate trade show deadlines",
      steps: [
        { name: "Enter the show open date", text: "Work from the first day of show, not the move-in date." },
        { name: "Back-calculate the milestones", text: "Design approval at 16 weeks, venue submissions at 12, fabrication at 10, services at 8, graphics at 6, pre-build at 4, freight at 2." },
        { name: "Check the exhibitor manual", text: "Confirm each date against the show's published manual — deadlines vary by general contractor." },
        { name: "Export to your calendar", text: "Download the schedule and set reminders two weeks before each date." },
      ],
    },
  },

  /* ---------------------------------------------------------------- 3 */
  {
    slug: "trade-show-booth-graphic-specs",
    label: "Booth Graphic File Specs",
    eyebrow: "Production reference",
    summary:
      "Bleed, safe area, resolution and colour profile for every panel type we print, plus finished sizes by footprint.",
    kind: "Reference",
    readMinutes: 10,
    tool: "specs",
    hero: {
      title: "Trade Show Booth",
      accent: "Graphic File Specs",
      intro:
        "The most common cause of a delayed booth is not fabrication — it's artwork that arrives at the wrong size, the wrong resolution or without bleed. Here is exactly what our print floor needs, panel by panel.",
    },
    tldr:
      "Supply vector or 100 ppi-at-full-size raster artwork in CMYK, with 2\" bleed on tension fabric and 0.25\" on rigid panels, and keep critical content 3\" inside the trim on anything that wraps a frame. PDF/X-4 or packaged AI/INDD. Files are due six weeks before show open.",
    sections: [
      {
        heading: "File requirements at a glance",
        table: {
          head: ["Spec", "Requirement", "Why"],
          rows: [
            ["Format", "PDF/X-4, packaged AI or INDD, layered PSD at full scale", "Preserves vector type and spot handling"],
            ["Colour", "CMYK, US Web Coated (SWOP) v2 — supply Pantone references for brand colours", "RGB shifts unpredictably on dye-sub fabric"],
            ["Resolution", "100 ppi at 100% final size (150 ppi for anything read within arm's reach)", "Large-format viewing distance; higher just slows RIP"],
            ["Scale", "Build at full size where possible, otherwise a clean 1:10 with scale noted in the filename", "Removes rounding errors between design and print"],
            ["Bleed — tension fabric", "2\" all round", "Fabric is pulled over the frame edge"],
            ["Bleed — rigid / direct print", "0.25\" all round", "Trim tolerance on cut panels"],
            ["Safe area", "3\" inside trim on wrapped panels, 1\" on rigid", "Keeps logos and text off the fold and out of frame shadow"],
            ["Fonts", "Outlined, or supply the font files", "Substitution changes line breaks on 8-foot type"],
            ["Images", "Embedded, not linked", "Missing links are the top cause of re-supply requests"],
          ],
        },
      },
      {
        heading: "Panel sizes by footprint",
        body: [
          "These are the finished visible sizes for our standard rental frames. Custom builds get a dimensioned template from your project drawings — always print from the template we issue, not from these numbers.",
        ],
        table: {
          head: ["Footprint", "Back wall visible", "Side wall / wing", "Header or hanging sign"],
          rows: [
            ["10×10 inline", "116\" w × 89\" h", "n/a", "Optional 60\" w × 24\" h header"],
            ["10×20 inline", "236\" w × 89\" h (two panels)", "n/a", "94\" w × 24\" h header"],
            ["20×20 island", "Four towers at 46\" w × 118\" h", "Meeting room walls 92\" w × 89\" h", "Square hanging sign 96\" × 96\" × 36\" h"],
            ["20×30 island", "Feature wall 236\" w × 118\" h", "Storage room 92\" w × 89\" h", "Ring sign 144\" dia × 36\" h"],
            ["Double deck", "Deck fascia 236\" w × 42\" h", "Stair surround 48\" w × 89\" h", "Upper-level sign to venue approval"],
          ],
        },
      },
      {
        heading: "Design rules that survive a show floor",
        bullets: [
          "Keep the top 30 inches of any back wall clear of critical content — attendees at three feet cannot see it, and neighbours' structures block it from the aisle.",
          "Your single-sentence value proposition should be legible from 20 feet. That is roughly 6-inch cap height.",
          "Do not centre a logo behind where the reception counter will stand. Check the elevation drawing first.",
          "Avoid large flat areas of deep black or 100% saturated blue on fabric — both show seams and handling marks.",
          "Gradients across multiple panels rarely align perfectly across frame gaps. Break the artwork at the gap instead.",
        ],
      },
      {
        heading: "When artwork is due",
        body: [
          "Six weeks before show open for standard production, and that date is not padded — it accounts for proofing, RIP, print, cut, sew and quality check before the booth is pre-built and photographed in our shop at the four-week mark.",
          "Late files do not usually stop a show; they cost rush print fees and remove the pre-build photo approval that catches problems while they are still fixable.",
        ],
      },
    ],
    faqs: [
      {
        q: "What resolution do trade show booth graphics need to be?",
        a: "100 ppi at 100% of the final printed size is the standard for large-format booth graphics viewed from several feet away. Move to 150 ppi for counters, kiosks and any panel read within arm's reach. Higher resolution adds file size and RIP time without a visible gain.",
      },
      {
        q: "How much bleed do trade show graphics need?",
        a: "Two inches on all sides for tension-fabric graphics because the fabric wraps the frame edge, and 0.25 inch for rigid or direct-printed panels. Keep critical content at least three inches inside the trim line on wrapped panels.",
      },
      {
        q: "Should booth artwork be RGB or CMYK?",
        a: "CMYK, using US Web Coated (SWOP) v2 unless we specify otherwise, with Pantone references supplied for brand-critical colours. RGB files converted at the RIP shift unpredictably, especially on dye-sublimated fabric.",
      },
      {
        q: "When are booth graphic files due?",
        a: "Six weeks before show open. That window covers proofing, printing, sewing or mounting, quality check, and the warehouse pre-build where the finished booth is assembled and photographed for your approval.",
      },
    ],
    seo: {
      title: "Trade Show Booth Graphic Specs — Bleed, Resolution & Panel Sizes | Traction X",
      description:
        "Artwork specs for trade show booth graphics: bleed by panel type, 100 ppi at full size, CMYK profiles, safe areas, finished panel sizes by footprint, and file deadlines.",
    },
  },

  /* ---------------------------------------------------------------- 4 */
  {
    slug: "trade-show-roi-calculator",
    label: "Trade Show ROI Calculator",
    eyebrow: "Business case tool",
    summary:
      "Turn booth spend into cost per lead, break-even deal count and projected pipeline — the page you forward to finance.",
    kind: "Interactive tool",
    readMinutes: 8,
    tool: "roi",
    hero: {
      title: "Trade Show",
      accent: "ROI Calculator",
      intro:
        "Exhibiting gets cut when nobody can express it as a number. Put your spend, traffic and close rate in below and you get cost per lead, cost per opportunity, break-even deals and projected pipeline value.",
    },
    tldr:
      "Trade show ROI is total show investment measured against closed revenue attributable to the show, usually over a 6–12 month window. Track cost per lead and break-even deal count alongside it: a $45,000 show that produces 120 qualified leads at a 20% close rate and a $25,000 average deal is a 13x return, and the break-even point is two deals.",
    sections: [
      {
        heading: "The four numbers worth reporting",
        table: {
          head: ["Metric", "How it's calculated", "What good looks like"],
          rows: [
            ["Cost per lead", "Total show investment ÷ qualified leads", "$150–$450 for B2B, lower at large consumer shows"],
            ["Cost per opportunity", "Total show investment ÷ leads that reach a real sales conversation", "Under 15% of average deal value"],
            ["Break-even deals", "Total show investment ÷ (average deal value × gross margin)", "Fewer than 3 for most B2B programs"],
            ["Return on investment", "(Attributed revenue − investment) ÷ investment", "5x+ over a 12-month attribution window"],
          ],
        },
      },
      {
        heading: "Count the whole investment, not just the booth",
        body: [
          "ROI calculated on booth cost alone flatters the number and gets challenged the moment finance sees the credit-card statements. Include space, exhibit, show services, freight, travel, staff time at loaded cost, and pre-show marketing.",
          "Staff time is the line most people skip. Four people for four days, including travel, is roughly 130 loaded hours — often the second-largest cost in the program.",
        ],
      },
      {
        heading: "Improve the ratio before you cut the booth",
        bullets: [
          "Pre-book meetings. A show where 40% of the calendar is filled before doors open outperforms a bigger booth with an empty diary.",
          "Qualify at the booth rather than scanning everything. Cost per lead looks worse and cost per opportunity looks far better.",
          "Follow up within 48 hours. Response rates fall off a cliff after the first week and most attendees are being contacted by your competitors in that window.",
          "Renting instead of owning removes storage, refurbishment and depreciation from the equation, which usually improves multi-show ROI even when the per-show cost looks similar.",
          "Reuse the same design across a season. The design and engineering cost is spent once; the return is counted at every show.",
        ],
      },
      {
        heading: "Attribution window",
        body: [
          "Use 12 months for considered B2B purchases and 6 months for shorter cycles, and agree the window with sales before the show, not after. Tag every scanned lead with the show name in your CRM on the day, because retrospective tagging never happens.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do you calculate trade show ROI?",
        a: "Subtract total show investment from the revenue attributed to show-sourced deals, then divide by the investment. Total investment must include space, exhibit, show services, freight, travel, loaded staff time and pre-show marketing — not just the booth.",
      },
      {
        q: "What is a good cost per lead at a trade show?",
        a: "For B2B shows, $150–$450 per qualified lead is a common range, varying widely by industry and deal size. Judge it against your other channels: if a trade show lead costs less than paid search and converts better, the show is doing its job.",
      },
      {
        q: "How many leads should a 10x20 booth generate?",
        a: "It depends far more on show traffic and staffing than on booth size, but a well-staffed 10×20 at a mid-sized B2B show commonly produces 80–200 scanned leads across three days, of which 25–40% are genuinely qualified.",
      },
    ],
    seo: {
      title: "Trade Show ROI Calculator — Cost Per Lead & Break-Even | Traction X",
      description:
        "Free trade show ROI calculator: enter booth spend, leads and close rate to get cost per lead, cost per opportunity, break-even deals and projected pipeline value.",
    },
  },

  /* ---------------------------------------------------------------- 5 */
  {
    slug: "booth-staff-training-guide",
    label: "Booth Staffing & Lead Capture Playbook",
    eyebrow: "Playbook",
    summary:
      "Staffing ratios, shift schedules, opening lines, a qualifying script and the 48-hour follow-up sequence.",
    kind: "Playbook",
    readMinutes: 11,
    tool: null,
    hero: {
      title: "Booth Staffing &",
      accent: "Lead Capture Playbook",
      intro:
        "The booth gets the attention and the budget. The four people standing in it decide what the show is worth. This is the briefing we hand clients before doors open.",
    },
    tldr:
      "Staff one person per 50 square feet of open booth space, in shifts no longer than four hours. Open with a question that cannot be answered 'no', qualify on need, timing and authority within 90 seconds, capture five structured fields per lead, and follow up within 48 hours with something specific to the conversation.",
    sections: [
      {
        heading: "How many people you actually need",
        table: {
          head: ["Footprint", "Staff on the floor", "Total roster (with breaks)", "Notes"],
          rows: [
            ["10×10", "2", "3", "One engages, one closes out the conversation and scans"],
            ["10×20", "3", "4–5", "Add a demo or product specialist"],
            ["20×20 island", "4–5", "6–8", "Four open sides means no unattended aisle"],
            ["20×30+ / double deck", "6–8", "10–12", "Split floor team from meeting-room hosts"],
          ],
        },
        bullets: [
          "Shifts of four hours maximum. Attention collapses after that and it shows in the lead quality.",
          "Never leave the booth unstaffed, even for ten minutes at lunch. The one time it happens is when your best prospect walks past.",
          "Nobody sits, eats or works on a laptop in the booth. It reads as closed from the aisle.",
        ],
      },
      {
        heading: "The 90-second qualifying conversation",
        checklist: [
          {
            group: "Open (0–15 seconds)",
            items: [
              "\"What brought you to the show this year?\" — open, specific, cannot be answered with 'no'.",
              "Avoid \"Can I help you?\" and \"Are you familiar with us?\" Both invite an exit.",
              "Step out from behind the counter. Barriers reduce engagement measurably.",
            ],
          },
          {
            group: "Qualify (15–90 seconds)",
            items: [
              "Need: what problem are they solving, in their words?",
              "Timing: when does this need to be in place?",
              "Authority: who else is involved in the decision?",
              "Fit: are they the size and sector you serve? If not, be gracious and be quick.",
            ],
          },
          {
            group: "Capture and close out",
            items: [
              "Scan the badge, then add the structured fields — problem, timing, next step, owner.",
              "Agree an explicit next step with a date, not \"we'll be in touch\".",
              "Hand off or release the conversation inside five minutes so the aisle stays covered.",
            ],
          },
        ],
      },
      {
        heading: "The five fields to capture on every lead",
        bullets: [
          "What they are trying to solve — one sentence in their language, not your product name.",
          "Timing — a quarter or a date, never \"soon\".",
          "Decision role — user, influencer, budget holder.",
          "Agreed next step — demo, quote, sample, intro call.",
          "Who owns the follow-up — a named person, assigned before they walk away.",
        ],
      },
      {
        heading: "The 48-hour follow-up sequence",
        table: {
          head: ["When", "Action", "Content"],
          rows: [
            ["Same evening", "Automated confirmation", "Thanks, what we discussed, the one asset they asked for"],
            ["Within 48 hours", "Personal email from the owner", "Reference the specific conversation, propose the agreed next step with two times"],
            ["Day 7", "Second touch", "A relevant case study from their sector, no pitch"],
            ["Day 14", "Call", "Direct ask for the meeting; close the loop either way"],
            ["Day 30", "Nurture handoff", "Move unqualified leads to marketing, keep the CRM clean"],
          ],
        },
      },
      {
        heading: "Pre-show briefing checklist",
        checklist: [
          {
            group: "One week out",
            items: [
              "Circulate the booth layout with staff positions marked.",
              "Share the three questions everyone asks, and the agreed answers.",
              "Confirm who owns follow-up for each lead type before anyone travels.",
              "Test the lead-capture app on every device and log everyone in.",
            ],
          },
          {
            group: "Morning of day one",
            items: [
              "Fifteen-minute stand-up in the booth: goals, shifts, escalation path.",
              "Check power, screens, lighting and stock of collateral.",
              "Agree the end-of-day debrief time — 15 minutes, same spot, every night.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How many staff do you need for a 10x20 trade show booth?",
        a: "Three people on the floor at any time, from a roster of four or five so everyone gets breaks. The rule of thumb is one staff member per 50 square feet of open booth space, adjusted up if you are running demos.",
      },
      {
        q: "What should booth staff say to attendees?",
        a: "Open with a question that cannot be answered with yes or no — \"What brought you to the show this year?\" works far better than \"Can I help you?\" Then qualify on need, timing and decision role inside 90 seconds.",
      },
      {
        q: "How quickly should you follow up on trade show leads?",
        a: "Within 48 hours, with an email that references the actual conversation. Response rates drop sharply after the first week, and your competitors from the same aisle are contacting the same people in that window.",
      },
    ],
    seo: {
      title: "Booth Staff Training & Lead Capture Playbook — Ratios, Scripts, Follow-Up | Traction X",
      description:
        "Trade show booth staffing ratios by footprint, a 90-second qualifying script, the five lead fields to capture, and a 48-hour follow-up sequence you can hand your team.",
    },
  },

  /* ---------------------------------------------------------------- 6 */
  {
    slug: "trade-show-shipping-checklist",
    label: "Shipping, Drayage & Crate Checklist",
    eyebrow: "Logistics checklist",
    summary:
      "Advance warehouse vs. direct-to-show, labelling, paperwork, cross-border basics and the outbound sequence.",
    kind: "Checklist",
    readMinutes: 9,
    tool: null,
    hero: {
      title: "Trade Show Shipping",
      accent: "& Drayage Checklist",
      intro:
        "Freight is where a well-planned booth becomes an expensive one. This is the do-this-now list: which delivery route to choose, how to label, what paperwork travels with the crates, and how to get everything home.",
    },
    tldr:
      "Ship to the advance warehouse whenever the window allows — it is cheaper per hundredweight, it guarantees your crates are in the booth on your move-in day, and it removes marshalling-yard delays that burn install labour. Label every piece, keep a copy of the bill of lading with the crew, and file the outbound bill of lading before you start tearing down.",
    sections: [
      {
        heading: "Advance warehouse or direct to show?",
        table: {
          head: ["", "Advance warehouse", "Direct to show site"],
          rows: [
            ["Timing", "Ships 30–10 days out, arrives in booth on your move-in day", "Must arrive inside a narrow targeted window"],
            ["Drayage rate", "Usually the lower published rate", "Often similar or higher, plus overtime exposure"],
            ["Risk", "Low — freight is already in the building", "Marshalling yard queues, missed windows, idle crews"],
            ["Best for", "Almost every exhibitor", "Oversized freight, late builds, local shipments"],
          ],
        },
      },
      {
        heading: "Crating and labelling",
        checklist: [
          {
            group: "Before it leaves the shop",
            items: [
              "Weigh every crate and record it — drayage is billed on weight and you need the number for your budget.",
              "Number the pieces (1 of 6, 2 of 6) on all four sides plus the top of each crate.",
              "Show name, booth number, exhibiting company and target move-in date on every label.",
              "Remove old show labels. Stale labels are the top cause of misrouted freight.",
              "Photograph each crate packed and closed for damage claims.",
            ],
          },
          {
            group: "Paperwork that travels",
            items: [
              "Inbound bill of lading, with piece count and weight matching the labels.",
              "Certificate of insurance if the venue requires one.",
              "Material safety data sheets for any adhesives, fuels or batteries.",
              "A printed packing list inside crate 1 and a copy with the lead installer.",
            ],
          },
        ],
      },
      {
        heading: "Cross-border between Canada and the USA",
        bullets: [
          "Use a customs broker who works trade shows. General freight brokers miss temporary-import treatment routinely.",
          "An ATA Carnet suits high-value booths travelling to multiple countries and returning intact; a temporary import bond is often simpler for a single Canada–USA move.",
          "Giveaways, printed collateral and consumables are usually treated as permanent imports and are dutiable. Declare them separately from the booth.",
          "Build in two extra days at the border. A booth held at customs on move-in morning cannot be replaced.",
          "Our full guide covers this in depth: cross-border trade show shipping.",
        ],
      },
      {
        heading: "Outbound — the part everyone rushes",
        checklist: [
          {
            group: "Before teardown starts",
            items: [
              "Submit the outbound bill of lading at the service desk early. Freight without a BOL gets force-shipped at the contractor's choice of carrier and rate.",
              "Confirm your empty crates are returned to the booth before scheduling the crew out.",
              "Book the outbound carrier pickup window and share it with the installers.",
            ],
          },
          {
            group: "During teardown",
            items: [
              "Photograph any damage before packing — claims need dated evidence.",
              "Pack to the same piece count as inbound and re-label anything that moved.",
              "Keep a signed copy of the outbound BOL with the crew, not in a crate.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Should I ship to the advance warehouse or direct to the show?",
        a: "Advance warehouse for almost every exhibitor. Your crates are in the building and delivered to your space on your move-in day, the drayage rate is typically lower, and you avoid marshalling-yard queues that leave paid installers standing idle.",
      },
      {
        q: "How do I label trade show freight?",
        a: "Every piece needs the show name, your exhibiting company name, booth number, target move-in date, and piece numbering (1 of 6, 2 of 6) on at least four sides. Remove all previous show labels before dispatch.",
      },
      {
        q: "What is a bill of lading at a trade show?",
        a: "It is the shipping document that authorises the general contractor to release your freight to a specific carrier. If you do not file an outbound bill of lading before teardown, the contractor force-ships your crates on their chosen carrier at their rate.",
      },
    ],
    seo: {
      title: "Trade Show Shipping & Drayage Checklist — Labels, BOL, Cross-Border | Traction X",
      description:
        "Trade show freight checklist: advance warehouse vs. direct-to-show, crate labelling, bill of lading, cross-border Canada–USA customs, and the outbound teardown sequence.",
    },
  },

  /* ---------------------------------------------------------------- 7 */
  {
    slug: "booth-setup-checklist",
    label: "Booth Setup & Show-Day Checklist",
    eyebrow: "On-site checklist",
    summary:
      "Install walkthrough, the supply kit that saves the day, what to check before doors open, and teardown.",
    kind: "Checklist",
    readMinutes: 7,
    tool: null,
    hero: {
      title: "Booth Setup &",
      accent: "Show-Day Checklist",
      intro:
        "Print this, hand it to whoever is first into the hall, and work down it. Everything on this list came from a real show floor where it went wrong once.",
    },
    tldr:
      "Check your space and power drop before a single crate is opened, build from the floor up, test every screen and light the night before, and walk the booth from the aisle at eye level before doors open. Carry your own tape, extension cords, cleaning kit and a spare set of graphics fixings.",
    sections: [
      {
        heading: "Move-in day",
        checklist: [
          {
            group: "First 30 minutes, before unpacking",
            items: [
              "Confirm the booth number, orientation and neighbours against the floor plan.",
              "Locate the power drop and check it matches what you ordered — wrong location is fixable early, expensive later.",
              "Check the floor for a hanging-sign drop point if you have one.",
              "Count your crates against the inbound bill of lading. Report shortages to the service desk immediately.",
            ],
          },
          {
            group: "Build sequence",
            items: [
              "Floor and underlay first, then structure, then graphics, then AV, then furniture and product.",
              "Run and dress cable before flooring closes over it.",
              "Level the structure before graphics go on — fabric shows every twist.",
              "Empty crates labelled and released to the bone yard as soon as they are clear.",
            ],
          },
          {
            group: "Night before doors",
            items: [
              "Power everything on and leave it running for 20 minutes. Screens and LED fail on warm-up, not cold.",
              "Test every light and replace anything flickering now.",
              "Clean the booth: fabric brushed, glass and counters wiped, flooring vacuumed.",
              "Stand in the aisle at 20 feet and read your own headline. If you can't, fix it tonight.",
              "Stage collateral, giveaways and lead-capture devices, all charged.",
            ],
          },
        ],
      },
      {
        heading: "The show-day survival kit",
        bullets: [
          "Gaff tape, double-sided tape, zip ties and a multi-tool.",
          "Extension cords and a power bar — you always need one more outlet than you ordered.",
          "Lint roller, microfibre cloths and glass cleaner. A dusty booth photographs badly.",
          "Spare graphics fixings, velcro and touch-up markers matching your frame colour.",
          "Phone chargers, spare batteries for scanners, and a printed copy of the exhibitor manual.",
          "Water, mints, painkillers, plasters, and a backup pair of comfortable shoes.",
        ],
      },
      {
        heading: "Each morning of the show",
        checklist: [
          {
            group: "Thirty minutes before doors",
            items: [
              "Power up and confirm all screens are on the right content, not a screensaver or a login prompt.",
              "Restock collateral and giveaways; hide the boxes.",
              "Wipe every surface and re-vacuum traffic lanes.",
              "Stand-up briefing: yesterday's lessons, today's targets, shift order.",
            ],
          },
        ],
      },
      {
        heading: "Teardown",
        checklist: [
          {
            group: "In order",
            items: [
              "Do not start until the show officially closes — most contracts penalise early teardown and it looks terrible to remaining attendees.",
              "Secure lead-capture data first: export or sync before anything is packed.",
              "Photograph any damage before it goes into a crate.",
              "Pack in reverse build order; graphics off before structure comes down.",
              "Outbound bill of lading filed, carrier window confirmed, signed copy with the crew.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to set up a trade show booth?",
        a: "A 10×10 portable is about an hour with two people. A 10×20 custom rental is typically half a day, a 20×20 island a full day, and anything with a hanging sign, double deck or significant AV needs two days plus rigging time booked in advance.",
      },
      {
        q: "What should you bring to a trade show booth?",
        a: "Beyond the exhibit: gaff tape, zip ties, a multi-tool, extension cords and a power bar, cleaning supplies, spare graphic fixings, chargers and spare scanner batteries, a printed exhibitor manual, and comfortable shoes.",
      },
      {
        q: "Can you tear down a trade show booth early?",
        a: "No. Almost every show contract prohibits dismantling before official close, penalties are common, and it damages your brand with the attendees still walking the floor. Plan travel around the published teardown window.",
      },
    ],
    seo: {
      title: "Trade Show Booth Setup Checklist — Move-In, Show Day & Teardown | Traction X",
      description:
        "Printable trade show booth setup checklist: move-in walkthrough, build sequence, night-before testing, show-day survival kit, morning routine and teardown steps.",
    },
  },

  /* ---------------------------------------------------------------- 8 */
  {
    slug: "venue-rules",
    label: "Venue Exhibitor Rules Cheat Sheets",
    eyebrow: "Venue reference",
    summary:
      "Union jurisdiction, drayage handling and logistics facts for the halls we work in, pulled into one comparison.",
    kind: "Reference",
    readMinutes: 6,
    tool: "venue-rules",
    hero: {
      title: "Venue Exhibitor",
      accent: "Rules Cheat Sheets",
      intro:
        "Every hall has its own labour jurisdiction, material-handling arrangement and height conventions. Here is the side-by-side for the venues we install in, with a full page behind each one.",
    },
    tldr:
      "The three rules that change your plan are labour jurisdiction (who may legally touch your crates, tools and power), material handling (who moves freight and how it is billed), and height and rigging limits (whether your hanging sign and any second level are permitted at all). Confirm all three from the show's own exhibitor manual before design is approved — they vary by show as well as by venue.",
    sections: [
      {
        heading: "How to read a venue's rules",
        bullets: [
          "Labour jurisdiction: in strict-union halls, exhibitor personnel may be limited to what they can carry by hand in one trip, with everything else done by union crews.",
          "Material handling: the show's official contractor holds a monopoly on moving freight inside the hall, billed by hundredweight with a minimum.",
          "Height limits: inline booths are usually capped at 8 feet with sightline rules on side walls; islands go higher, but hanging signs and any second level need approved engineering.",
          "Fire and materials: fabrics and flooring generally require flame-certification documentation on site, and enclosed areas over a threshold size may need sprinklers or an extinguisher and exit signage.",
          "Always verify against the exhibitor manual for your specific show. Two shows in the same hall can run different rules.",
        ],
      },
      {
        heading: "What we handle for you",
        body: [
          "For every project we build, our producer reads the exhibitor manual for your show, files the rigging and structural submissions, books labour in the correct jurisdiction, and hits the advance deadlines. The cheat sheets below are for your planning — the compliance is ours.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I set up my own trade show booth?",
        a: "It depends on the hall. In right-to-work markets exhibitor personnel can generally build their own booth. In strict-union cities, exhibitor staff are typically limited to what they can hand-carry in a single trip using no tools, and everything else must be installed by union labour.",
      },
      {
        q: "How tall can a trade show booth be?",
        a: "Inline booths are commonly limited to 8 feet high across the back wall, with side walls stepping down to 4 feet in the forward half for sightlines. Island booths often allow 16 to 20 feet or more, and hanging signs need show approval plus engineered drawings.",
      },
      {
        q: "Do booth graphics need fire certification?",
        a: "Yes in most venues. Fabrics, flooring and any draping usually require flame-retardant certification available on site for inspection. We supply certificates with every booth we build.",
      },
    ],
    seo: {
      title: "Venue Exhibitor Rules — Union Labour, Drayage & Height Limits by Hall | Traction X",
      description:
        "Compare exhibitor rules across major convention centres: labour jurisdiction, material handling, height and rigging limits, and the logistics facts that change your booth plan.",
    },
  },
];

export const RESOURCE_MAP: Record<string, ExhibitorResource> = Object.fromEntries(
  EXHIBITOR_RESOURCES.map((r) => [r.slug, r]),
);
