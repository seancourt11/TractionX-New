/**
 * Standalone industry cluster — /industries and /industries/$slug
 * Distinct from src/data/industries.ts, which powers the
 * booth-size × industry combo pages under /booth-rental/*.
 */

export type IndustryFaq = { q: string; a: string };

export type IndustryPage = {
  slug: string;
  label: string;
  plural: string;
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  intro: string;
  audience: string;
  buyingCycle: string;
  priorities: string[];
  designNotes: string[];
  compliance: string;
  shows: { name: string; slug?: string }[];
  venues: string[];
  recommendedSizes: string[];
  budget: string;
  proofAngle: string;
  faqs: IndustryFaq[];
};

export const INDUSTRIES: IndustryPage[] = [
  {
    slug: "defence-and-security",
    label: "Defence & Security",
    plural: "defence and security contractors",
    metaTitle: "Defence & Security Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Custom exhibit rentals for defence and security contractors — enclosed briefing rooms, export-control-aware graphics, engineered equipment mounting. DEFSEC, CANSEC, AUSA, AFA.",
    eyebrow: "Industry",
    intro:
      "Defence programmes are won in private conversations, not in aisle traffic. We build exhibits that host delegations, protect controlled information and mount real hardware safely — then dismantle, store and re-issue them for the next show on your calendar.",
    audience: "procurement officers, prime contractors, allied delegations and government buyers",
    buyingCycle:
      "Long-cycle, relationship-led. A defence show is a scheduled-meeting venue: the booth exists to host briefings that were booked six weeks earlier, so meeting capacity beats aisle theatre every time.",
    priorities: [
      "Enclosed briefing space with a real door and controlled sightlines",
      "Engineered mounting and rated flooring for hardware and mock-ups",
      "Restrained, formal visual language — credibility over spectacle",
      "Delegation hosting: seating, hospitality, coat and bag handling",
      "Secure overnight storage for controlled or high-value equipment",
    ],
    designNotes: [
      "Briefing room walls to full height with acoustic treatment, not curtains",
      "No-photography signage integrated into the build, not taped on",
      "Real material finishes — veneer, powder-coat, machined metal",
      "Load calculations signed before any equipment goes on a plinth",
      "Overhead identity so the stand reads from the far end of the hall",
    ],
    compliance:
      "Export-control (ITAR/CGP) and classification rules govern what can be displayed, discussed and photographed. We build the copy-approval and photography-policy checkpoints into the schedule, and we route engineered load calculations to the venue ahead of the drawing deadline.",
    shows: [
      { name: "DEFSEC Atlantic", slug: "defsec-atlantic" },
      { name: "AUSA Annual Meeting", slug: "ausa-annual" },
      { name: "AFA Air, Space & Cyber", slug: "afa-air-space-cyber" },
      { name: "I/ITSEC", slug: "iitsec" },
      { name: "CANSEC" },
    ],
    venues: ["Halifax Convention Centre", "Walter E. Washington Convention Center", "Orange County Convention Center"],
    recommendedSizes: ["10×20 in-line", "20×20 island", "20×40 island with briefing suite"],
    budget: "$22,750 for a 10×20 rental; $39,000+ for a 20×20 with an enclosed briefing room.",
    proofAngle:
      "We are the official custom exhibit rental supplier for DEFSEC Atlantic and have delivered defence programmes for Thales, Accenture and Government of Canada delegations.",
    faqs: [
      {
        q: "Can you build a briefing room that passes venue fire and egress review?",
        a: "Yes. Enclosed rooms over a certain footprint require egress review, and many venues cap ceiling coverage. We submit the plan with the drawing package so the approval lands before fabrication, not during move-in.",
      },
      {
        q: "How do you handle displays under export control?",
        a: "We treat the graphics package as controlled copy: nothing goes to print until your export-control or communications lead signs the sheet. Photography policy, sightline blocking and secure storage are designed in, not improvised.",
      },
    ],
  },
  {
    slug: "aerospace",
    label: "Aerospace",
    plural: "aerospace manufacturers and suppliers",
    metaTitle: "Aerospace Trade Show Booth Rentals & Custom Exhibits | Traction X",
    metaDesc:
      "Aerospace exhibit rentals engineered for scale models, engine cutaways and supplier meetings — Farnborough, NBAA-BACE, AFA and Paris Air Show programmes.",
    eyebrow: "Industry",
    intro:
      "Aerospace booths carry weight — literally. Engine sections, cutaways, scale models and cabin mock-ups need engineered structure, rated flooring and sightlines that let a 40-foot fuselage section read from the aisle without swallowing your meeting space.",
    audience: "airline procurement, primes, tier-one suppliers, MRO buyers and regulators",
    buyingCycle:
      "Multi-year programme sales. The show is a milestone in a relationship, so hospitality and private meeting capacity carry more weight than lead volume.",
    priorities: [
      "Engineered structure for heavy hardware and suspended components",
      "Scale model and cutaway display at proper viewing height",
      "Private and semi-private meeting capacity for programme talks",
      "Hospitality — aerospace buyers expect to be hosted properly",
      "Hanging identity that competes in very tall halls",
    ],
    designNotes: [
      "Rated flooring and dunnage under any hardware over 500 lb",
      "Suspended elements engineered and certified for rigging approval",
      "Cutaway lighting: raking light reveals machined detail",
      "Second-storey or elevated deck where the hall allows it",
      "Muted palette so polished metal is the brightest surface present",
    ],
    compliance:
      "Rigging over hardware requires certified engineering and venue sign-off, and export-control rules apply to many technical displays. Overweight freight needs advance dock scheduling — aerospace crates routinely exceed standard drayage tiers.",
    shows: [
      { name: "NBAA-BACE", slug: "nbaa-bace" },
      { name: "AFA Air, Space & Cyber", slug: "afa-air-space-cyber" },
      { name: "Farnborough International Airshow" },
      { name: "Paris Air Show" },
    ],
    venues: ["Orange County Convention Center", "Las Vegas Convention Center", "Georgia World Congress Center"],
    recommendedSizes: ["20×20 island", "30×30 island", "40×40+ hero activation"],
    budget: "$39,000+ for a 20×20 rental; hero aerospace activations commonly run $130,000+.",
    proofAngle:
      "Air Canada Cargo, Thales and Team Canada aerospace delegations have all exhibited in Traction X builds.",
    faqs: [
      {
        q: "Can you display an engine or airframe section in a rental booth?",
        a: "Yes — with load calculations, rated flooring and a dock plan. We size dunnage to the point loads and coordinate the equipment move with the general contractor's marshalling schedule.",
      },
      {
        q: "Do you handle international air shows?",
        a: "Yes. Air and ocean freight, ATA carnets and in-country partners for last-mile drayage in Europe, the Middle East and Asia.",
      },
    ],
  },
  {
    slug: "medical-devices",
    label: "Medical Devices",
    plural: "medical device manufacturers",
    metaTitle: "Medical Device Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Custom medical device exhibit rentals — clinical demo stations, seated consultation space, regulatory-reviewed graphics. HIMSS, RSNA, MD&M, AAOS, MEDICA.",
    eyebrow: "Industry",
    intro:
      "Clinicians don't make purchase decisions standing up. Medical device booths need working-height demonstration, a seated consultation zone and a clean visual language that reads clinical without reading cheap.",
    audience: "clinicians, hospital procurement committees, GPOs and distribution partners",
    buyingCycle:
      "Committee-driven. The clinician champions, the procurement committee approves — so the booth has to serve both a hands-on demo and a quiet commercial conversation.",
    priorities: [
      "Hands-on device demonstration at working height",
      "Private or semi-private clinical conversation space",
      "Clean-room visual language: bright, white, uncluttered",
      "Locking demo pedestals with integrated power",
      "Secure overnight storage for demo units",
    ],
    designNotes: [
      "Backlit tension fabric reads clinical and premium at once",
      "Procedure animation on loop instead of dense specification text",
      "Seated consult pods — the conversation that closes is a sitting one",
      "Sanitisable surfaces and visible hand-hygiene provision",
      "Clear device-to-clinician approach path from the aisle",
    ],
    compliance:
      "Regulatory affairs typically reviews all claim language on graphics, and demo units may require 'not for sale in this market' labelling. We build a regulatory copy-approval gate before print release so nothing ships unreviewed.",
    shows: [
      { name: "HIMSS Global", slug: "himss-global" },
      { name: "RSNA", slug: "rsna" },
      { name: "MD&M West", slug: "md-m-west" },
      { name: "VIVE", slug: "vive" },
      { name: "MEDICA" },
    ],
    venues: ["McCormick Place", "Orange County Convention Center", "Anaheim Convention Center"],
    recommendedSizes: ["10×10 in-line", "10×20 in-line", "20×20 island"],
    budget: "$16,250 for a 10×10 rental; $39,000+ for a 20×20 with consult rooms.",
    proofAngle: "Device and health-tech exhibitors across HIMSS, RSNA and MD&M have run Traction X rentals.",
    faqs: [
      {
        q: "Can the booth accommodate a device that needs power and water?",
        a: "Yes. Power drops, dedicated circuits and plumbing are ordered against the venue's discounted deadline and integrated into the pedestal design rather than run across the floor.",
      },
      {
        q: "How do you handle regulatory review of booth graphics?",
        a: "Every graphic panel goes out as a proof sheet with a named approver and a hard date. Print releases only after sign-off, and we hold enough schedule buffer to allow one review round.",
      },
    ],
  },
  {
    slug: "pharmaceutical-and-biotech",
    label: "Pharmaceutical & Biotech",
    plural: "pharmaceutical and biotech companies",
    metaTitle: "Pharma & Biotech Exhibit Rentals | Traction X",
    metaDesc:
      "Pharmaceutical and biotech booth rentals with compliant graphics workflow, MSL meeting space and congress-ready builds for HLTH, ASCO, AACR and DIA.",
    eyebrow: "Industry",
    intro:
      "Pharma congress stands live under strict promotional rules and a compressed build window. We deliver compliant, congress-ready exhibits with the meeting capacity your medical and commercial teams both need.",
    audience: "physicians, KOLs, payers, medical affairs teams and congress attendees",
    buyingCycle:
      "Brand-team led with legal and medical review baked in. Timelines are set by review cycles, not fabrication — so we schedule backwards from the sign-off gate.",
    priorities: [
      "Separated promotional and medical-information zones",
      "Meeting rooms for MSL and KOL conversations",
      "Compliant, reviewable graphic content workflow",
      "High-throughput iPad or kiosk data capture",
      "Congress-standard build within tight move-in windows",
    ],
    designNotes: [
      "Distinct architecture for med-info vs. promotional areas",
      "Quiet, acoustically treated KOL meeting space",
      "Digital content over printed panels so late approvals still ship",
      "Neutral brand palette that survives multi-market copy variants",
      "Modular structure that reconfigures across a congress calendar",
    ],
    compliance:
      "Promotional content is governed by regulatory review, and many congresses impose their own booth rules — height caps, no-giveaway policies, separation of promotional and scientific content. We confirm the congress rulebook before design begins.",
    shows: [
      { name: "HLTH", slug: "hlth" },
      { name: "VIVE", slug: "vive" },
      { name: "ASCO Annual Meeting" },
      { name: "DIA Global Annual Meeting" },
    ],
    venues: ["Las Vegas Convention Center", "Venetian Expo", "McCormick Place"],
    recommendedSizes: ["10×20 in-line", "20×20 island", "20×30 island"],
    budget: "$22,750 for a 10×20 rental; $58,500+ for congress islands with meeting rooms.",
    proofAngle: "Health and life-science programmes delivered on congress timelines with review-gated graphics.",
    faqs: [
      {
        q: "What happens if legal approval lands after the print deadline?",
        a: "We design for it. Digital surfaces and swappable panels mean a late approval changes a file, not a fabrication run.",
      },
      {
        q: "Can you separate medical information from promotional space?",
        a: "Yes — different architecture, different signage and a physical boundary, which is what most congress compliance teams expect to see.",
      },
    ],
  },
  {
    slug: "technology-and-saas",
    label: "Technology & SaaS",
    plural: "technology and SaaS companies",
    metaTitle: "Technology & SaaS Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Custom booth rentals for tech and SaaS exhibitors — demo pods, hard-wired internet, meeting capacity and overhead identity for re:Invent, Ignite, Web Summit and CES.",
    eyebrow: "Industry",
    intro:
      "Tech floors are saturated. Differentiation comes from structure and light, not louder graphics — and from having enough demo stations that nobody waits in a queue to see your product.",
    audience: "technical evaluators, IT buyers, channel partners and press",
    buyingCycle:
      "Pipeline-driven. Success is measured in booked meetings and qualified demos, so throughput per staff member is the metric that should shape the floor plan.",
    priorities: [
      "Multiple parallel demo stations, not one big screen",
      "Overhead brand visibility on a dense floor",
      "Scheduled-meeting capacity for pipeline conversations",
      "Hard-wired internet and reliable, dedicated power",
      "Charging and dwell moments that create genuine conversations",
    ],
    designNotes: [
      "Demo pods with individual monitors and stools",
      "Backlit dimensional logo above eye level for aisle recognition",
      "Neutral structure so the product UI is the brightest thing present",
      "Lead capture at each pod, not at a single choke point",
      "Modular kit that scales 10×10 → 20×20 across your show calendar",
    ],
    compliance:
      "Order hard-wired internet in advance — venue Wi-Fi collapses on day one of every major tech show. Hanging signs need engineering approval roughly 60 days out at large venues.",
    shows: [
      { name: "AWS re:Invent", slug: "aws-reinvent" },
      { name: "Microsoft Ignite", slug: "microsoft-ignite" },
      { name: "Web Summit Vancouver", slug: "web-summit-vancouver" },
      { name: "CES", slug: "ces-las-vegas" },
      { name: "KubeCon North America", slug: "kubecon-na" },
    ],
    venues: ["Venetian Expo", "Vancouver Convention Centre", "Moscone Center", "Las Vegas Convention Center"],
    recommendedSizes: ["10×10 in-line", "10×20 in-line", "20×20 island"],
    budget: "$16,250 for a 10×10 rental; $39,000+ for a 20×20 island with demo pods.",
    proofAngle: "NVIDIA, Optibus, TELUS and Netflix activations have been built and managed by our team.",
    faqs: [
      {
        q: "How many demo stations fit in a 10×20?",
        a: "Three comfortably, plus a counter and a small meeting nook. Four is possible but starts to crowd the aisle approach.",
      },
      {
        q: "Do you handle AV and content?",
        a: "Yes — displays, LED walls, playback hardware and content formatting for the exact pixel dimensions of the wall.",
      },
    ],
  },
  {
    slug: "artificial-intelligence",
    label: "Artificial Intelligence",
    plural: "AI and machine-learning companies",
    metaTitle: "AI Company Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Exhibit rentals for AI and ML companies — live inference demos, GPU-grade power and cooling, technical meeting space. NVIDIA GTC, AI Summit, MLOps World, Ai4.",
    eyebrow: "Industry",
    intro:
      "AI booths have a specific problem: the product is invisible. The build has to make an abstract capability physically legible in eight seconds of aisle time — then hold a technical evaluator for twenty minutes.",
    audience: "ML engineers, data leaders, enterprise AI buyers, investors and press",
    buyingCycle:
      "Fast-moving and technically scrutinised. Evaluators want to see the model run live, not watch a video about it.",
    priorities: [
      "Live inference demos with real latency, not recordings",
      "Serious power and heat handling for on-booth compute",
      "A single legible visual metaphor for what the model does",
      "Technical meeting space for architecture conversations",
      "Investor and press hosting on launch shows",
    ],
    designNotes: [
      "Large-format visualisation of model output as the aisle magnet",
      "Dedicated circuits and ventilation for any on-booth GPU hardware",
      "Whiteboard or writable surface — technical buyers draw",
      "Minimal copy, maximum demonstration",
      "Hard-wired network with a cellular failover",
    ],
    compliance:
      "On-booth compute needs dedicated power, and enclosed racks need airflow planning. Confirm the venue's power tiers early — GPU demos routinely exceed the standard booth allocation.",
    shows: [
      { name: "The AI Conference (SF)", slug: "ai-conference-sf" },
      { name: "AI Infra Summit", slug: "ai-infra-summit" },
      { name: "The AI Summit New York", slug: "ai-summit-ny" },
      { name: "MLOps World", slug: "mlops-world" },
      { name: "Big Data & AI Toronto", slug: "big-data-ai-toronto" },
    ],
    venues: ["Moscone Center", "Santa Clara Convention Center", "Javits Center", "Metro Toronto Convention Centre"],
    recommendedSizes: ["10×10 in-line", "10×20 in-line", "20×20 island"],
    budget: "$16,250 for a 10×10 rental; $39,000+ for a 20×20 with live demo infrastructure.",
    proofAngle: "We built NVIDIA's DGX Spark booth and Optibus's AI Café activation.",
    faqs: [
      {
        q: "Can you support GPU hardware on the booth?",
        a: "Yes — dedicated circuits, ventilated enclosures and a UPS on the demo path so a power blip doesn't kill a live model run.",
      },
      {
        q: "What's the best way to demo something abstract?",
        a: "Show the output at scale and let a visitor change one input. Interaction beats explanation on a show floor every time.",
      },
    ],
  },
  {
    slug: "cybersecurity",
    label: "Cybersecurity",
    plural: "cybersecurity vendors",
    metaTitle: "Cybersecurity Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Cybersecurity exhibit rentals built for RSAC, Black Hat and ISC West — threat-visualisation walls, briefing rooms, high-throughput scanning and CISO hosting.",
    eyebrow: "Industry",
    intro:
      "RSAC and Black Hat are the loudest floors in the industry. Winning there means an aisle moment that's visually calm, a demo that shows a real attack path, and enough private space to host a CISO without an audience.",
    audience: "CISOs, security architects, SOC leads, analysts and channel partners",
    buyingCycle:
      "Evaluation-heavy, committee-approved. Analyst and press meetings run alongside pipeline meetings all week.",
    priorities: [
      "Live threat visualisation as the aisle magnet",
      "Private briefing space for CISO and analyst meetings",
      "High-throughput lead scanning without a bottleneck",
      "Theatre or micro-presentation area with sound control",
      "Partner and alliance co-branding zones",
    ],
    designNotes: [
      "Dark, controlled lighting so screens carry the space",
      "Directional audio for theatre so you don't fight your neighbours",
      "Analyst room away from the demo noise",
      "Swag counter positioned to pull traffic past the demos, not around them",
      "Repeatable kit — most vendors run six to ten shows a year",
    ],
    compliance:
      "Big security shows enforce strict noise limits and sound-direction rules. Book hard-wired internet: demoing security software on venue Wi-Fi is a self-inflicted wound.",
    shows: [
      { name: "RSA Conference", slug: "rsa-conference" },
      { name: "ISC West", slug: "isc-west" },
      { name: "Black Hat USA" },
      { name: "KubeCon North America", slug: "kubecon-na" },
    ],
    venues: ["Moscone Center", "Venetian Expo", "Mandalay Bay Convention Center"],
    recommendedSizes: ["10×20 in-line", "20×20 island", "20×30 island"],
    budget: "$22,750 for a 10×20 rental; $39,000+ for islands with a briefing room.",
    proofAngle: "Security and enterprise-software exhibitors run repeat Traction X kits across the RSAC/Black Hat calendar.",
    faqs: [
      {
        q: "Can we reuse the same booth across RSAC, Black Hat and regional shows?",
        a: "That's the model. One kit, reconfigurable footprints, stored between shows and re-graphicked when the message changes.",
      },
      {
        q: "How do we keep the theatre from annoying neighbours?",
        a: "Directional speakers or headset audio, plus orienting the theatre inward. Both venues will otherwise ask you to turn it down mid-show.",
      },
    ],
  },
  {
    slug: "manufacturing-and-industrial",
    label: "Manufacturing & Industrial",
    plural: "manufacturers and industrial suppliers",
    metaTitle: "Manufacturing & Industrial Booth Rentals | Traction X",
    metaDesc:
      "Industrial trade show exhibit rentals engineered around live machinery — rated flooring, guarding, dedicated power and overhead identity. IMTS, FABTECH, PACK EXPO.",
    eyebrow: "Industry",
    intro:
      "In manufacturing, the machine is the booth. Everything else — structure, flooring, lighting, meeting space — is designed around a piece of equipment that weighs several tonnes and needs to run safely all week.",
    audience: "plant engineers, operations directors, integrators and distribution networks",
    buyingCycle:
      "Capital purchase with a long evaluation. Buyers come to watch the machine run and to talk to an engineer who can answer without checking.",
    priorities: [
      "Rated floor loading and safe circulation around equipment",
      "Clear aisle sightline to the machine",
      "Guarding and safety compliance for operating equipment",
      "Technical documentation and spec access on the stand",
      "Overhead brand presence above tall machinery",
    ],
    designNotes: [
      "Design around the equipment, not the other way round",
      "Elevated viewing platform for large machines",
      "Durable flooring rated for the load and the traffic",
      "Dedicated power drops planned with the electrical contractor",
      "A quiet corner for spec conversations away from the noise",
    ],
    compliance:
      "Operating machinery on a show floor requires guarding, dedicated power and often venue safety approval. Rigging over moving equipment brings additional certification requirements, and forklift moves need scheduled dock windows.",
    shows: [
      { name: "IMTS", slug: "imts" },
      { name: "FABTECH", slug: "fabtech" },
      { name: "PACK EXPO International", slug: "pack-expo-international" },
      { name: "Hannover Messe" },
    ],
    venues: ["McCormick Place", "Georgia World Congress Center", "Las Vegas Convention Center"],
    recommendedSizes: ["20×20 island", "30×30 island", "40×40+ machinery pavilion"],
    budget: "$39,000+ for a 20×20 rental; machinery pavilions typically $97,500+.",
    proofAngle: "Industrial and equipment exhibitors at IMTS and FABTECH scale on our modular island kits.",
    faqs: [
      {
        q: "Can you handle machine rigging and placement?",
        a: "We coordinate it with the general contractor and the venue: point loads, dunnage, forklift windows and spotting during move-in.",
      },
      {
        q: "How early should machinery freight be booked?",
        a: "Earlier than you think — machine moves are scheduled against the show's targeted move-in grid, which is normally locked 60 days out.",
      },
    ],
  },
  {
    slug: "energy-and-oil-gas",
    label: "Energy, Oil & Gas",
    plural: "energy, oil and gas companies",
    metaTitle: "Energy, Oil & Gas Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Exhibit rentals for energy, oil and gas exhibitors — cutaway equipment displays, data walls, consortium co-branding. OTC, CERAWeek, Global Energy Show.",
    eyebrow: "Industry",
    intro:
      "Energy shows reward physical proof. A cutaway, a scale model or a piece of the actual product does more work than any graphic — supported by data visualisation that shows the performance numbers buyers came for.",
    audience: "operators, EPC contractors, project developers and policy stakeholders",
    buyingCycle:
      "Project-driven and capital-intensive. Deals move at the pace of project sanction, so the booth is a relationship venue across multiple show cycles.",
    priorities: [
      "Cutaway equipment and scale models as aisle magnets",
      "Performance and output data visualisation",
      "Consortium and JV co-branding space",
      "Private meeting rooms for contract conversations",
      "Hospitality that supports long, unhurried meetings",
    ],
    designNotes: [
      "Rated plinths for heavy cutaway sections",
      "Large-format data wall with live or looped performance data",
      "Co-branding zones engineered for partner logos and messaging",
      "Durable finishes — energy shows are hard on booths",
      "Reusable modular structure across a multi-show calendar",
    ],
    compliance:
      "Heavy equipment needs load calculations and dock scheduling. Sustainability claims on graphics attract increasing scrutiny — we document material reuse so the claim survives a question.",
    shows: [
      { name: "OTC (Offshore Technology Conference)", slug: "otc-offshore" },
      { name: "Global Energy Show" },
      { name: "CERAWeek" },
      { name: "RE+" },
    ],
    venues: ["Georgia World Congress Center", "Ernest N. Morial Convention Center", "Las Vegas Convention Center"],
    recommendedSizes: ["20×20 island", "20×40 island", "30×30 island"],
    budget: "$39,000+ for a 20×20 rental; consortium pavilions $104,000+.",
    proofAngle: "SMA's energy and UL3741 booths were designed, fabricated and managed by Traction X.",
    faqs: [
      {
        q: "Can multiple partners share one booth?",
        a: "Yes — consortium builds are common. We design defined co-branding zones so each partner gets identity without the stand looking like a logo wall.",
      },
      {
        q: "Do you build for international energy shows?",
        a: "Yes, with in-country fabrication partners in Europe and the Middle East to avoid transatlantic freight on structure.",
      },
    ],
  },
  {
    slug: "cleantech-and-renewables",
    label: "Cleantech & Renewables",
    plural: "cleantech and renewable energy companies",
    metaTitle: "Cleantech & Renewable Energy Booth Rentals | Traction X",
    metaDesc:
      "Sustainable exhibit rentals for cleantech and renewables — reusable structure, documented material reuse, data-led storytelling. RE+, WindEurope, Globe Forum.",
    eyebrow: "Industry",
    intro:
      "A cleantech booth built from single-use materials undermines the pitch. We build reusable structure with a documented reuse record you can actually put in front of a buyer or an ESG reviewer.",
    audience: "utilities, developers, EPCs, municipal buyers and policy stakeholders",
    buyingCycle:
      "Policy- and procurement-influenced, with long project cycles and heavy technical diligence.",
    priorities: [
      "Genuinely reusable structure with a reuse record",
      "Technology cutaway or scale model on the aisle",
      "Performance data visualised, not asserted",
      "Partner and municipality co-branding",
      "Low-waste graphics and recyclable substrates",
    ],
    designNotes: [
      "Aluminium extrusion and reusable panels over single-use build",
      "Recyclable print substrates; no laminated composites where avoidable",
      "Material passport documenting reuse for ESG reporting",
      "Warm, natural finishes rather than generic green graphics",
      "Rental over ownership — no warehouse, no refurbishment waste",
    ],
    compliance:
      "Environmental claims on booth graphics face scrutiny under advertising rules in both Canada and the US. We keep documentation for the reuse and recyclability claims we help you make.",
    shows: [
      { name: "RE+" },
      { name: "Globe Forum" },
      { name: "WindEurope" },
      { name: "Web Summit Vancouver", slug: "web-summit-vancouver" },
    ],
    venues: ["Vancouver Convention Centre", "Anaheim Convention Center", "Las Vegas Convention Center"],
    recommendedSizes: ["10×20 in-line", "20×20 island", "20×30 island"],
    budget: "$22,750 for a 10×20 rental; $39,000+ for a 20×20 island.",
    proofAngle:
      "The Vancouver Convention Centre is a LEED Platinum property — our reusable rental model fits how those shows are audited.",
    faqs: [
      {
        q: "Is a rental more sustainable than owning a booth?",
        a: "Generally yes. Rental structure is recovered, refinished and re-issued across many clients, which beats a warehouse full of one-client crates being shipped nationally each show.",
      },
      {
        q: "Can you document the sustainability of our build?",
        a: "Yes — a material summary covering reused structure, recyclable graphics and waste diversion, suitable for ESG reporting.",
      },
    ],
  },
  {
    slug: "mining-and-natural-resources",
    label: "Mining & Natural Resources",
    plural: "mining and resource companies",
    metaTitle: "Mining & Resources Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Booth rentals for mining, exploration and resource companies — investor hosting, core sample display, delegation meetings. PDAC, MINExpo, CIM.",
    eyebrow: "Industry",
    intro:
      "Mining shows are investor shows. PDAC in particular is four days of capital conversations — the booth's job is to host meetings credibly and make the asset story legible fast.",
    audience: "institutional investors, analysts, government delegations and service partners",
    buyingCycle:
      "Capital-raising and partnership-driven rather than transactional. Meeting quality is the entire metric.",
    priorities: [
      "Investor meeting space with real seating",
      "Core sample and asset display",
      "Clear, map-led project storytelling",
      "Delegation and government hosting",
      "Durable, reusable kit for a repeating annual calendar",
    ],
    designNotes: [
      "Lit display cases for core and mineral samples",
      "Large project map as the primary graphic",
      "Seated meeting table rather than standing counters",
      "Real materials — stone, metal, timber — reinforce the sector",
      "Hospitality point that keeps investors on the stand",
    ],
    compliance:
      "Disclosure rules (NI 43-101 in Canada) govern what resource figures can be shown. Get the technical claims reviewed before graphics go to print.",
    shows: [
      { name: "PDAC", slug: "pdac" },
      { name: "MINExpo International" },
      { name: "CIM Connect" },
    ],
    venues: ["Metro Toronto Convention Centre", "Las Vegas Convention Center", "Vancouver Convention Centre"],
    recommendedSizes: ["10×10 in-line", "10×20 in-line", "20×20 island"],
    budget: "$16,250 for a 10×10 rental; $39,000+ for investor-hosting islands.",
    proofAngle: "PDAC at the Metro Toronto Convention Centre is an annual fixture on our build calendar.",
    faqs: [
      {
        q: "How much meeting space do we need at PDAC?",
        a: "More than you think. Most exploration exhibitors under-build seating and end up taking meetings standing in the aisle.",
      },
      {
        q: "Can you display core samples securely?",
        a: "Yes — locking lit cases, with overnight secure storage arranged through the venue where required.",
      },
    ],
  },
  {
    slug: "construction-and-building-products",
    label: "Construction & Building Products",
    plural: "construction and building product manufacturers",
    metaTitle: "Construction & Building Products Booth Rentals | Traction X",
    metaDesc:
      "Exhibit rentals for construction and building-product exhibitors — material sample walls, live demos, contractor hospitality. World of Concrete, IBS, Buildex.",
    eyebrow: "Industry",
    intro:
      "Contractors buy with their hands. Building-product booths need real material, at full scale, that visitors can touch, hit and inspect — and a stand tough enough to survive a week of it.",
    audience: "contractors, specifiers, architects, distributors and dealer networks",
    buyingCycle:
      "Distribution- and specification-led. The show builds dealer relationships and gets product into specs.",
    priorities: [
      "Full-scale material and assembly displays",
      "Live demonstration area with adequate protection",
      "Durable build that survives high-traffic contact",
      "Dealer and distributor meeting capacity",
      "Sample and literature take-away logistics",
    ],
    designNotes: [
      "Real product installed as it would be installed on site",
      "Demo zone with splash and debris containment",
      "Heavy-duty flooring and hard-wearing edges",
      "Simple, high-contrast graphics readable at 30 feet",
      "Storage for volume literature and samples",
    ],
    compliance:
      "Live demos involving tools, water or dust need venue approval and containment. Confirm the show's demonstration policy before locking the design.",
    shows: [
      { name: "World of Concrete" },
      { name: "International Builders' Show" },
      { name: "Buildex" },
      { name: "FABTECH", slug: "fabtech" },
    ],
    venues: ["Las Vegas Convention Center", "Orange County Convention Center", "Vancouver Convention Centre"],
    recommendedSizes: ["10×20 in-line", "20×20 island", "20×40 island"],
    budget: "$22,750 for a 10×20 rental; $39,000+ for demo islands.",
    proofAngle: "Our in-house millwork and metal shop means real assemblies, not printed representations.",
    faqs: [
      {
        q: "Can we run a live product demo with water or dust?",
        a: "With venue approval and containment, yes. We design the containment into the booth so it doesn't look like an afterthought.",
      },
      {
        q: "Will the booth survive a full week of contractor traffic?",
        a: "That's what our fabrication spec is built for — commercial-grade finishes and reinforced edges at contact points.",
      },
    ],
  },
  {
    slug: "automotive-and-mobility",
    label: "Automotive & Mobility",
    plural: "automotive and mobility companies",
    metaTitle: "Automotive & Mobility Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Vehicle-ready exhibit rentals for automotive and mobility exhibitors — turntables, rated flooring, reveal moments. SEMA, CES West Hall, NADA.",
    eyebrow: "Industry",
    intro:
      "Put a vehicle on the stand and everything changes: floor loading, move-in sequencing, sightlines and lighting. We build vehicle-ready exhibits that hit a targeted move-in slot and still look finished when the doors open.",
    audience: "OEM buyers, dealers, aftermarket distributors, fleet operators and media",
    buyingCycle:
      "Dealer and distributor-led, with heavy media attention on launch shows.",
    priorities: [
      "Rated flooring and vehicle spotting plan",
      "Reveal or feature lighting on the vehicle",
      "Aisle sightlines that don't hide the product",
      "Media and dealer hosting areas",
      "Targeted move-in coordination for vehicle placement",
    ],
    designNotes: [
      "Vehicle placed first, structure built around it",
      "Turntable or raised platform where the footprint allows",
      "Focused accent lighting on body lines rather than flat wash",
      "Charging or powertrain storytelling for EV exhibits",
      "Barrier design that protects paint without feeling defensive",
    ],
    compliance:
      "Most venues cap fuel levels and require battery disconnects or locked fuel caps for displayed vehicles. Vehicle spotting is a scheduled, supervised move — it cannot be improvised on move-in day.",
    shows: [
      { name: "SEMA Show", slug: "sema-show" },
      { name: "CES", slug: "ces-las-vegas" },
      { name: "NADA Show" },
      { name: "NBAA-BACE", slug: "nbaa-bace" },
    ],
    venues: ["Las Vegas Convention Center", "Anaheim Convention Center", "Music City Center"],
    recommendedSizes: ["20×20 island", "20×40 island", "30×30 island"],
    budget: "$39,000+ for a vehicle-capable 20×20; hero reveals $110,500+.",
    proofAngle: "West Hall and SEMA vehicle programmes are routine work for our Las Vegas crews.",
    faqs: [
      {
        q: "How is a vehicle moved into the booth?",
        a: "On a scheduled targeted move-in with a spotter, before your structure is fully closed. We sequence the build around that slot.",
      },
      {
        q: "Do we need special flooring?",
        a: "Yes — rated deck and load spreading under tyres, or the venue will refuse the placement.",
      },
    ],
  },
  {
    slug: "food-and-beverage",
    label: "Food & Beverage",
    plural: "food and beverage brands",
    metaTitle: "Food & Beverage Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Sampling-ready exhibit rentals for food and beverage brands — health-compliant counters, refrigeration, packaging-forward shelving. Fancy Food, Expo West, SIAL, IPPE.",
    eyebrow: "Industry",
    intro:
      "Sampling brings health-department rules, refrigeration, water and waste into your booth design. Get those right and the stand does what it should: pull a buyer off the aisle and hand them your product.",
    audience: "retail buyers, distributors, brokers and category managers",
    buyingCycle:
      "Buyer-appointment driven. Category managers walk with a list, so packaging recognition and appointment space both matter.",
    priorities: [
      "Sampling station with health-compliant surfaces",
      "Refrigeration, hand-wash and waste handling",
      "Packaging-forward product merchandising",
      "Buyer meeting space away from sampling traffic",
      "Storage for backstock and cold chain",
    ],
    designNotes: [
      "Sampling counter that pulls aisle traffic without blocking it",
      "Under-counter refrigeration and concealed waste",
      "Lit shelving that makes packaging the hero",
      "Separate seated area for buyer appointments",
      "Wipeable, non-porous surfaces throughout the food zone",
    ],
    compliance:
      "Sampling requires venue health-department approval, food-handler certification and specific surface, refrigeration and hand-wash provisions. Plumbing and refrigeration must be ordered well ahead of the deadline.",
    shows: [
      { name: "IPPE", slug: "ippe" },
      { name: "National Restaurant Association Show", slug: "nra-show" },
      { name: "Fancy Food Show" },
      { name: "Natural Products Expo West" },
      { name: "SIAL Canada" },
    ],
    venues: ["Georgia World Congress Center", "McCormick Place", "Anaheim Convention Center"],
    recommendedSizes: ["10×10 in-line", "10×20 in-line", "20×20 island"],
    budget: "$16,250 for a 10×10 rental; $39,000+ for islands with full sampling infrastructure.",
    proofAngle: "We handle health-department paperwork and refrigeration ordering as part of project management.",
    faqs: [
      {
        q: "Do you handle the health-department approval?",
        a: "We prepare and file the venue's sampling paperwork; your team supplies the food-handler certification.",
      },
      {
        q: "Can we get refrigeration in the booth?",
        a: "Yes — under-counter units integrated into the millwork, ordered against the show's discounted deadline.",
      },
    ],
  },
  {
    slug: "hospitality-and-foodservice",
    label: "Hospitality & Foodservice",
    plural: "hospitality and foodservice suppliers",
    metaTitle: "Hospitality & Foodservice Booth Rentals | Traction X",
    metaDesc:
      "Exhibit rentals for hospitality and foodservice suppliers — working kitchens, equipment demos, operator hosting. NRA Show, IAAPA, HX.",
    eyebrow: "Industry",
    intro:
      "Foodservice buyers want to watch equipment work under real conditions. That means power, ventilation, water and a demo counter that a chef can actually cook behind for eight hours.",
    audience: "restaurant operators, hotel groups, distributors and dealer networks",
    buyingCycle:
      "Dealer and operator-driven, with strong regional distribution influence.",
    priorities: [
      "Working demo kitchen with power, water and ventilation",
      "Chef-height counters and real workflow",
      "Operator seating for menu and margin conversations",
      "Durable, cleanable surfaces",
      "Product display alongside live demonstration",
    ],
    designNotes: [
      "Demo counter oriented so a crowd can watch without blocking the aisle",
      "Stainless and solid-surface finishes that clean under pressure",
      "Overhead identity above the crowd line",
      "Sample handoff point separate from the cooking zone",
      "Storage for cold chain and consumables",
    ],
    compliance:
      "Cooking on the floor triggers fire-marshal review, hood/extinguisher requirements and health approval. Every one of those has a lead time — start them at design, not at move-in.",
    shows: [
      { name: "National Restaurant Association Show", slug: "nra-show" },
      { name: "IAAPA Expo", slug: "iaapa-expo" },
      { name: "HX: The Hotel Experience" },
    ],
    venues: ["McCormick Place", "Orange County Convention Center", "Javits Center"],
    recommendedSizes: ["10×20 in-line", "20×20 island", "20×30 island"],
    budget: "$22,750 for a 10×20 rental; $45,500+ for working-kitchen islands.",
    proofAngle: "We coordinate fire-marshal, health and utility approvals as part of the build, not as an add-on.",
    faqs: [
      {
        q: "Can we cook in the booth?",
        a: "Usually yes, with fire-marshal approval, correct extinguishing provision and often a ventilation solution. It's very doable when planned early.",
      },
      {
        q: "What utilities do we need to order?",
        a: "Typically dedicated power, water and drain. We file those against the discounted deadline on your behalf.",
      },
    ],
  },
  {
    slug: "financial-services-and-fintech",
    label: "Financial Services & Fintech",
    plural: "financial services and fintech firms",
    metaTitle: "Financial Services & Fintech Booth Rentals | Traction X",
    metaDesc:
      "Premium exhibit rentals for financial services and fintech — sound-treated meeting rooms, real material finishes, compliance-gated graphics. Money20/20, SIBOS, Collision.",
    eyebrow: "Industry",
    intro:
      "In financial services the material finish is the message. Real millwork, stone and veneer signal stability in a way that a printed graphic never will — and a sound-treated meeting room is worth more than an extra demo screen.",
    audience: "institutional clients, advisers, fintech partners and regulators",
    buyingCycle:
      "Relationship and trust-led, with compliance review on every public claim.",
    priorities: [
      "Confidential, acoustically treated meeting space",
      "Premium material finish signalling stability",
      "Hospitality rather than product demonstration",
      "Discreet, restrained branding",
      "Compliance-reviewed messaging",
    ],
    designNotes: [
      "Real millwork, stone or veneer — material quality is the message",
      "Sound-treated enclosed meeting room with a door",
      "Warm hospitality point: proper coffee, seated, unhurried",
      "Typography and finish carry the brand; minimal graphics",
      "Discreet lead capture rather than a scanning gauntlet",
    ],
    compliance:
      "Compliance review of displayed copy is standard, and disclosure requirements may apply to any performance figures shown. We build a legal sign-off gate before graphics go to print.",
    shows: [
      { name: "Money20/20 USA", slug: "money2020-usa" },
      { name: "All In Montréal", slug: "all-in-montreal" },
      { name: "SIBOS" },
      { name: "Collision" },
    ],
    venues: ["Venetian Expo", "Palais des congrès de Montréal", "Javits Center"],
    recommendedSizes: ["10×20 in-line", "20×20 island", "20×30 island"],
    budget: "$22,750 for a 10×20 rental; $52,000+ for premium-finish islands with meeting rooms.",
    proofAngle: "Visa and enterprise financial activations have been fabricated in our millwork shop.",
    faqs: [
      {
        q: "Can we get a genuinely private meeting room in a rental?",
        a: "Yes — full-height walls, a door and acoustic treatment. Rental doesn't mean modular-looking; we fabricate to your drawings.",
      },
      {
        q: "How do you manage compliance review of graphics?",
        a: "A named approver, a proof sheet per panel and a hard sign-off date before print release.",
      },
    ],
  },
  {
    slug: "insurance",
    label: "Insurance",
    plural: "insurance carriers and brokers",
    metaTitle: "Insurance Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Exhibit rentals for insurance carriers, brokers and insurtech — broker hospitality, quiet meeting space and conference-ready builds.",
    eyebrow: "Industry",
    intro:
      "Insurance conferences run on scheduled meetings and hospitality. The booth is a hosting environment first: comfortable seating, coffee that isn't an afterthought, and enough acoustic separation to talk about a book of business.",
    audience: "brokers, agency principals, underwriters, risk managers and insurtech partners",
    buyingCycle:
      "Distribution-relationship led, with annual conference cycles that repeat the same audience year over year.",
    priorities: [
      "Broker and agent hospitality with real seating",
      "Semi-private space for book-of-business conversations",
      "Clear product and appetite messaging",
      "Appointment scheduling and check-in flow",
      "Consistent look across a repeating annual circuit",
    ],
    designNotes: [
      "Lounge-grade seating over standing counters",
      "Warm, approachable finishes rather than corporate blue",
      "Appetite and product messaging legible in one pass",
      "Reusable kit that travels a full annual conference circuit",
      "Discreet lead capture at the meeting table",
    ],
    compliance:
      "Marketing copy is often subject to state or provincial regulatory review, and licensing disclosures may be required on displayed material.",
    shows: [
      { name: "RIMS RISKWORLD" },
      { name: "InsureTech Connect" },
      { name: "NAMIC Annual Convention" },
    ],
    venues: ["Mandalay Bay Convention Center", "Gaylord National", "Music City Center"],
    recommendedSizes: ["10×10 in-line", "10×20 in-line", "20×20 island"],
    budget: "$16,250 for a 10×10 rental; $39,000+ for hospitality-led islands.",
    proofAngle: "Our repeat-programme model keeps the same kit consistent across a multi-city conference circuit.",
    faqs: [
      {
        q: "We do eight conferences a year — can one booth cover them all?",
        a: "Yes. We build one kit that reconfigures across 10×10, 10×20 and 20×20 footprints and store it between shows.",
      },
      {
        q: "Can you ship directly between shows?",
        a: "Yes — show-to-show forwarding when dates are tight, warehouse return when they aren't.",
      },
    ],
  },
  {
    slug: "cannabis",
    label: "Cannabis",
    plural: "cannabis brands and operators",
    metaTitle: "Cannabis Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Cannabis exhibit rentals built to jurisdiction display rules — locked lit cases, age-gated zones, retail-shelf simulation. MJBizCon, Lift&Co, Hall of Flowers.",
    eyebrow: "Industry",
    intro:
      "Cannabis floors are visually loud and legally specific. Display rules change by jurisdiction and by show, so the design has to start with the rulebook — then build a brand world strong enough to stand out inside it.",
    audience: "retail buyers, dispensary groups, distributors and licensing partners",
    buyingCycle:
      "Wholesale buyer-driven, with brand differentiation carrying unusual weight in purchase decisions.",
    priorities: [
      "Retail-grade product merchandising",
      "Age-gating and controlled product areas where required",
      "A distinct brand world on a visually saturated floor",
      "Private wholesale meeting space",
      "Secure, locked overnight product storage",
    ],
    designNotes: [
      "Locked, lit display cases meeting jurisdiction rules",
      "Retail-shelf simulation so buyers see the merchandising",
      "Strong environmental design — this floor rewards a distinct world",
      "Wholesale meeting area away from consumer traffic",
      "Compliance signage designed in rather than taped on",
    ],
    compliance:
      "Display rules vary sharply by jurisdiction and by show — some prohibit product on display entirely, others require locked cases and age verification. We confirm the show's specific rules before design begins.",
    shows: [
      { name: "MJBizCon", slug: "mjbizcon" },
      { name: "Lift&Co Expo" },
      { name: "Hall of Flowers" },
    ],
    venues: ["Las Vegas Convention Center", "Metro Toronto Convention Centre", "Anaheim Convention Center"],
    recommendedSizes: ["10×10 in-line", "10×20 in-line", "20×20 island"],
    budget: "$16,250 for a 10×10 rental; $39,000+ for branded island environments.",
    proofAngle: "MJBizCon at the Las Vegas Convention Center is an annual fixture for our Vegas crew.",
    faqs: [
      {
        q: "Can we display actual product?",
        a: "It depends on the show and jurisdiction. We confirm the rulebook first and design locked, age-gated display where product is permitted.",
      },
      {
        q: "How do we stand out at MJBizCon?",
        a: "Environment, not volume. A coherent built world with real materials reads as a serious brand on a floor full of pop-ups.",
      },
    ],
  },
  {
    slug: "retail-and-consumer-products",
    label: "Retail & Consumer Products",
    plural: "retail and consumer product brands",
    metaTitle: "Retail & Consumer Products Booth Rentals | Traction X",
    metaDesc:
      "Consumer product exhibit rentals — planogram-accurate shelving, buyer appointment rooms and packaging-first merchandising. NRF, Expo West, MAGIC.",
    eyebrow: "Industry",
    intro:
      "Buyers walk your booth the way a shopper walks an aisle. Merchandise the product the way it will actually sit on a shelf and the conversation starts from a much better place.",
    audience: "retail buyers, category managers, licensing partners and distributors",
    buyingCycle:
      "Appointment-based buying windows with tight seasonal calendars.",
    priorities: [
      "Planogram-accurate shelving and merchandising",
      "Back-to-back buyer appointment capacity",
      "Packaging and POS display quality",
      "Sample storage and handout logistics",
      "Fast, high-volume reconfiguration between appointments",
    ],
    designNotes: [
      "Shelf bays that mirror the retail environment you're selling into",
      "Appointment tables with visual privacy between them",
      "Storage volume — consumer booths always under-plan it",
      "Lighting tuned to packaging colour, not generic white",
      "Clean brand block visible from the cross-aisle",
    ],
    compliance:
      "Some retail shows restrict on-floor selling or require exhibitor-only hours. Confirm sampling and giveaway policy in the exhibitor manual.",
    shows: [
      { name: "NRF Big Show", slug: "nrf-big-show" },
      { name: "MAGIC Las Vegas" },
      { name: "Natural Products Expo West" },
      { name: "PLMA" },
    ],
    venues: ["Javits Center", "Las Vegas Convention Center", "Anaheim Convention Center"],
    recommendedSizes: ["10×10 in-line", "10×20 in-line", "20×20 island"],
    budget: "$16,250 for a 10×10 rental; $39,000+ for merchandising islands.",
    proofAngle: "Our millwork shop builds retail-grade fixtures, not trade-show approximations of them.",
    faqs: [
      {
        q: "Can you build planogram-accurate shelving?",
        a: "Yes — to your retailer's shelf depth, height and facing spec, so buyers see exactly how it merchandises.",
      },
      {
        q: "How many appointment tables fit in a 10×20?",
        a: "Two with visual separation, plus merchandising. Three is possible if storage moves off-booth.",
      },
    ],
  },
  {
    slug: "gaming-and-entertainment",
    label: "Gaming & Entertainment",
    plural: "gaming and entertainment brands",
    metaTitle: "Gaming & Entertainment Booth Rentals & Activations | Traction X",
    metaDesc:
      "Experiential exhibit rentals and brand activations for gaming and entertainment — queue management, photo moments, streaming setups. TwitchCon, Comic-Con, IAAPA.",
    eyebrow: "Industry",
    intro:
      "Entertainment activations are measured in queue length, dwell and content generated. That changes everything: circulation, camera lines, power and how you keep a 200-person line from swallowing your neighbour's booth.",
    audience: "fans, creators, press, platform partners and licensing buyers",
    buyingCycle:
      "Brand and audience-driven. The KPI is impressions, content and community — not lead scans.",
    priorities: [
      "Queue design that stays inside your footprint",
      "A photo or content moment worth posting",
      "Streaming and capture infrastructure",
      "Talent and creator hosting space",
      "Durability under very high touch volume",
    ],
    designNotes: [
      "Set-grade finishes and scenic fabrication",
      "Camera-tested lighting for phone photography",
      "Queue rails and staff positions designed in",
      "Power and network for streaming rigs",
      "Fast reset between activation cycles",
    ],
    compliance:
      "Queue overflow into aisles is the single most common violation on these floors. Fire-marshal egress rules also constrain enclosed set pieces.",
    shows: [
      { name: "TwitchCon", slug: "twitchcon" },
      { name: "San Diego Comic-Con", slug: "comic-con-san-diego" },
      { name: "Long Beach Comic Con", slug: "long-beach-comic-con" },
      { name: "IAAPA Expo", slug: "iaapa-expo" },
    ],
    venues: ["San Diego Convention Center", "Long Beach Convention Center", "Orange County Convention Center"],
    recommendedSizes: ["20×20 island", "20×40 island", "custom activation footprint"],
    budget: "$39,000+ for a 20×20 activation; large brand activations $130,000+.",
    proofAngle: "Netflix, TELUS Game Changers and Team Canada Fan Fest activations were built by Traction X.",
    faqs: [
      {
        q: "Can you manage the queue as part of the design?",
        a: "Yes — switchback layout, rail specification and staff positions, sized to your expected throughput.",
      },
      {
        q: "Do you build scenic set pieces?",
        a: "Yes. Scenic fabrication, sculpted elements and set-grade finishing are in-house.",
      },
    ],
  },
  {
    slug: "education-and-edtech",
    label: "Education & EdTech",
    plural: "education and edtech companies",
    metaTitle: "Education & EdTech Trade Show Booth Rentals | Traction X",
    metaDesc:
      "Booth rentals for education and edtech exhibitors — demo stations, district buyer meetings and conference-circuit kits. ISTE, SXSW EDU, EDUCAUSE.",
    eyebrow: "Industry",
    intro:
      "Education buyers arrive in groups and evaluate slowly. Booths need enough demo stations for a walking committee and a quiet corner to talk about district-level procurement.",
    audience: "district administrators, faculty, IT directors and procurement committees",
    buyingCycle:
      "Budget-cycle bound and committee-approved, with strong seasonality around fiscal year end.",
    priorities: [
      "Multiple demo stations for group evaluation",
      "Seated space for procurement conversations",
      "Clear pricing and implementation messaging",
      "Take-away material for internal sharing",
      "Affordable kit that travels a heavy conference circuit",
    ],
    designNotes: [
      "Standing demo pods plus one seated table",
      "Bright, approachable palette — education floors reward warmth",
      "Implementation and support messaging up front",
      "Lightweight, reconfigurable kit for a high show count",
      "Storage for volume printed material",
    ],
    compliance:
      "Some education conferences restrict giveaways or require accessibility accommodations in booth design. Check the exhibitor manual for aisle-width and accessibility requirements.",
    shows: [
      { name: "ISTELive" },
      { name: "SXSW EDU" },
      { name: "EDUCAUSE Annual Conference" },
    ],
    venues: ["Austin Convention Center", "Anaheim Convention Center", "San Antonio Convention Center"],
    recommendedSizes: ["10×10 in-line", "10×20 in-line", "20×20 island"],
    budget: "$16,250 for a 10×10 rental; $39,000+ for a 20×20 island.",
    proofAngle: "Reconfigurable rental kits keep per-show cost sane across a heavy education conference calendar.",
    faqs: [
      {
        q: "We exhibit at a lot of shows on a small budget — what's the model?",
        a: "One reconfigurable kit, stored with us, re-graphicked when the message changes. Per-show cost drops sharply after the second show.",
      },
      {
        q: "Can the booth meet accessibility requirements?",
        a: "Yes — counter heights, aisle widths and approach paths designed to accessibility guidance.",
      },
    ],
  },
  {
    slug: "logistics-and-supply-chain",
    label: "Logistics & Supply Chain",
    plural: "logistics and supply chain companies",
    metaTitle: "Logistics & Supply Chain Booth Rentals | Traction X",
    metaDesc:
      "Exhibit rentals for logistics, freight and supply-chain technology exhibitors — network visualisation, shipper meetings and equipment display. MODEX, ProMat, TPM.",
    eyebrow: "Industry",
    intro:
      "Logistics buyers care about network coverage and reliability, both of which are abstract. The booth's job is to make the network visible and give shippers a place to sit down and talk lanes.",
    audience: "shippers, 3PL buyers, carriers, warehouse operators and technology buyers",
    buyingCycle:
      "Contract-driven with annual RFP cycles; relationships built across repeat shows.",
    priorities: [
      "Network and coverage visualisation at scale",
      "Shipper meeting capacity for lane conversations",
      "Equipment or automation demonstration where relevant",
      "High-throughput lead capture",
      "Overhead identity in very large halls",
    ],
    designNotes: [
      "Map-led hero graphic showing genuine coverage",
      "Meeting tables sized for two-on-two conversations",
      "Automation demos need guarding and clear circulation",
      "Hanging identity — MODEX and ProMat halls are enormous",
      "Durable finish for a long, high-traffic week",
    ],
    compliance:
      "Operating automation equipment requires guarding and venue safety approval, and heavy equipment needs load calculations and dock scheduling.",
    shows: [
      { name: "MODEX" },
      { name: "ProMat" },
      { name: "TPM Conference" },
      { name: "PACK EXPO International", slug: "pack-expo-international" },
    ],
    venues: ["Georgia World Congress Center", "McCormick Place", "Long Beach Convention Center"],
    recommendedSizes: ["10×20 in-line", "20×20 island", "30×30 island"],
    budget: "$22,750 for a 10×20 rental; $39,000+ for islands with automation display.",
    proofAngle: "Optibus's transit-technology activations across North America and Brazil were Traction X builds.",
    faqs: [
      {
        q: "Can you display operating automation equipment?",
        a: "Yes, with guarding, dedicated power and venue safety approval coordinated ahead of move-in.",
      },
      {
        q: "How big should a hanging sign be at MODEX?",
        a: "As big as the show rules allow for your footprint — in those halls, overhead identity is most of your visibility budget.",
      },
    ],
  },
  {
    slug: "government-and-public-sector",
    label: "Government & Public Sector",
    plural: "government agencies and public-sector organisations",
    metaTitle: "Government & Public Sector Booth Rentals | Traction X",
    metaDesc:
      "Exhibit rentals for government agencies and public-sector delegations — pavilion builds, co-branded partner zones, procurement-compliant quoting.",
    eyebrow: "Industry",
    intro:
      "Government exhibits usually host a delegation, not a product. Pavilion builds need co-branded partner zones, formal hosting space and documentation that survives a procurement audit.",
    audience: "trade delegations, partner companies, foreign buyers and policy counterparts",
    buyingCycle:
      "Procurement-governed with formal RFP requirements, fixed budgets and audit-ready documentation.",
    priorities: [
      "Pavilion structure hosting multiple partner companies",
      "Formal delegation and bilateral meeting space",
      "Consistent national or agency identity across partners",
      "Procurement-compliant quoting and documentation",
      "Accessibility and official-language compliance",
    ],
    designNotes: [
      "Modular partner pods under one unified pavilion identity",
      "Meeting room for bilateral conversations",
      "Bilingual signage where required",
      "Reception and registration point for delegates",
      "Accessible counter heights and circulation throughout",
    ],
    compliance:
      "Public procurement rules govern the award, so quotes must be itemised, comparable and auditable. Official-language and accessibility requirements apply to signage and booth design in Canadian federal contexts.",
    shows: [
      { name: "DEFSEC Atlantic", slug: "defsec-atlantic" },
      { name: "PDAC", slug: "pdac" },
      { name: "Web Summit Vancouver", slug: "web-summit-vancouver" },
      { name: "Hannover Messe" },
    ],
    venues: ["Halifax Convention Centre", "Metro Toronto Convention Centre", "Vancouver Convention Centre"],
    recommendedSizes: ["20×20 island", "20×40 pavilion", "40×40+ national pavilion"],
    budget: "$39,000+ for a 20×20 pavilion; national pavilions typically $97,500+.",
    proofAngle:
      "Team Canada, Canada Defence and Canada Export pavilions have been designed, built and managed by Traction X.",
    faqs: [
      {
        q: "Can you respond to a formal RFP?",
        a: "Yes — itemised, auditable pricing with the documentation and insurance certificates public procurement requires.",
      },
      {
        q: "How do partner companies get identity inside a pavilion?",
        a: "Defined partner pods with consistent structure and individual branding zones, under one pavilion identity.",
      },
    ],
  },
  {
    slug: "associations-and-nonprofits",
    label: "Associations & Nonprofits",
    plural: "associations and nonprofit organisations",
    metaTitle: "Association & Nonprofit Booth Rentals | Traction X",
    metaDesc:
      "Cost-effective exhibit rentals for associations and nonprofits — membership recruitment, donor hosting and reusable kits across an annual circuit.",
    eyebrow: "Industry",
    intro:
      "Associations exhibit constantly on budgets that don't grow. The right answer is usually one well-made reconfigurable kit, stored between shows, with graphics refreshed rather than rebuilt.",
    audience: "members, prospective members, donors, sponsors and partner organisations",
    buyingCycle:
      "Annual budget cycles with board oversight; cost transparency matters more than in commercial sectors.",
    priorities: [
      "Membership sign-up and recruitment flow",
      "Donor and sponsor hosting",
      "Low total cost across many shows",
      "Easy handling for volunteer or small staff teams",
      "Sponsor recognition without visual clutter",
    ],
    designNotes: [
      "Lightweight structure a two-person team can supervise",
      "Sign-up station at the front edge of the booth",
      "Sponsor recognition zone designed into the architecture",
      "Graphics that swap without rebuilding structure",
      "Storage between shows so nothing sits in someone's garage",
    ],
    compliance:
      "Charitable solicitation rules can apply at events in some jurisdictions; check whether on-floor donation collection requires registration.",
    shows: [
      { name: "ASAE Annual Meeting" },
      { name: "IAAPA Expo", slug: "iaapa-expo" },
      { name: "Regional association conferences" },
    ],
    venues: ["Metro Toronto Convention Centre", "Music City Center", "Gaylord National"],
    recommendedSizes: ["8×10 in-line", "10×10 in-line", "10×20 in-line"],
    budget: "From $11,050 for compact in-line kits; $16,250 for a full 10×10 rental.",
    proofAngle: "Stored, re-issued kits keep multi-show association programmes inside a fixed annual budget.",
    faqs: [
      {
        q: "What's the cheapest way to exhibit at eight shows a year?",
        a: "One owned-look rental kit stored with us, shipped show to show, with graphics refreshed once a year rather than per show.",
      },
      {
        q: "Can volunteers set it up?",
        a: "We can spec a tool-free kit for small footprints, or send an installer where the venue requires union labour.",
      },
    ],
  },
];

export const INDUSTRY_MAP: Record<string, IndustryPage> = Object.fromEntries(
  INDUSTRIES.map((i) => [i.slug, i]),
);
