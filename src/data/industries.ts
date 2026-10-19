/**
 * Booth size x industry combination pages — long-tail commercial intent.
 * Slug pattern: /booth-rental/{size}-booth-rental-for-{industry}
 */

export type IndustryEntry = {
  slug: string;
  label: string;
  plural: string;
  audience: string;
  priorities: string[];
  compliance: string;
  shows: string[];
  designNotes: string[];
};

export type SizeEntry = {
  slug: string;
  label: string;
  dims: string;
  sqft: number;
  rentalFrom: string;
  customFrom: string;
  layout: string;
  staffCount: string;
};

export const COMBO_SIZES: SizeEntry[] = [
  {
    slug: "10x10",
    label: "10×10",
    dims: "10ft × 10ft",
    sqft: 100,
    rentalFrom: "$16,250",
    customFrom: "$22,000",
    layout: "In-line — one open aisle side, backwall plus reception counter",
    staffCount: "2 staff at a time",
  },
  {
    slug: "10x20",
    label: "10×20",
    dims: "10ft × 20ft",
    sqft: 200,
    rentalFrom: "$22,750",
    customFrom: "$32,000",
    layout: "In-line — backwall, demo zone and a semi-private meeting nook",
    staffCount: "3–4 staff at a time",
  },
  {
    slug: "20x20",
    label: "20×20",
    dims: "20ft × 20ft",
    sqft: 400,
    rentalFrom: "$39,000",
    customFrom: "$60,000",
    layout: "Island — open on four sides, hanging sign, enclosed meeting room",
    staffCount: "6–8 staff at a time",
  },
];

export const COMBO_INDUSTRIES: IndustryEntry[] = [
  {
    slug: "medical-device-companies",
    label: "Medical Device",
    plural: "medical device companies",
    audience: "clinicians, hospital procurement committees and distribution partners",
    priorities: [
      "Hands-on device demonstration at working height",
      "Private space for clinical conversations",
      "Clean-room visual language — bright, white, uncluttered",
      "Secure overnight storage for demo units",
    ],
    compliance:
      "Regulatory copy control matters: claim language on graphics is typically reviewed by regulatory affairs, and demo units may need 'not for sale in this market' labelling. We build in a copy-approval checkpoint before print release.",
    shows: ["HIMSS Global", "MEDICA", "RSNA", "AAOS"],
    designNotes: [
      "Backlit tension fabric reads as clinical and premium at once",
      "Locking demo pedestals with integrated power for devices",
      "Seated consultation area — clinicians don't make decisions standing up",
      "Monitor loops of procedure animation rather than dense text",
    ],
  },
  {
    slug: "technology-and-saas-companies",
    label: "Technology & SaaS",
    plural: "technology and SaaS companies",
    audience: "technical evaluators, IT buyers, partners and press",
    priorities: [
      "Multiple live demo stations, not a single screen",
      "Strong overhead brand visibility on a dense floor",
      "Meeting capacity for scheduled pipeline conversations",
      "Reliable power and hard-wired internet",
    ],
    compliance:
      "Tech floors are saturated, so differentiation comes from structure and light rather than louder graphics. Order hard-wired internet in advance — venue Wi-Fi collapses on day one of every major tech show.",
    shows: ["AWS re:Invent", "Microsoft Ignite", "Web Summit Vancouver", "CES"],
    designNotes: [
      "Demo pods with individual monitors and stools beat one big screen",
      "Backlit dimensional logo above eye level for aisle recognition",
      "Charging counters as a genuine dwell-time magnet",
      "Neutral structure so product UI is the brightest thing in the booth",
    ],
  },
  {
    slug: "defence-and-aerospace-companies",
    label: "Defence & Aerospace",
    plural: "defence and aerospace companies",
    audience: "procurement officers, primes, government delegations and allied partners",
    priorities: [
      "Private, controlled meeting space for restricted conversations",
      "Heavy-load capability for equipment and mock-ups",
      "Formal, understated visual language",
      "Delegation hosting and briefing capacity",
    ],
    compliance:
      "Export-control and classification rules constrain what can be displayed and photographed. Enclosed briefing rooms with controlled sightlines and no-photography signage are standard, and equipment mounting often requires engineered load calculations.",
    shows: ["DEFSEC Atlantic", "CANSEC", "Farnborough", "AUSA"],
    designNotes: [
      "Enclosed briefing room with a door, not a curtain",
      "Reinforced flooring and mounting for equipment displays",
      "Muted palette, real material finishes, restrained graphics",
      "Delegation seating and a discreet hospitality point",
    ],
  },
  {
    slug: "manufacturing-and-industrial-companies",
    label: "Manufacturing & Industrial",
    plural: "manufacturing and industrial companies",
    audience: "plant engineers, operations directors and distribution networks",
    priorities: [
      "Machinery placement with rated floor loading",
      "Safe circulation around operating equipment",
      "Clear sightlines to the machine from the aisle",
      "Technical documentation and spec access",
    ],
    compliance:
      "Operating machinery on a show floor requires guarding, dedicated power drops and often venue safety approval. Rigging over moving equipment brings additional certification requirements.",
    shows: ["IMTS", "FABTECH", "Hannover Messe", "PACK EXPO"],
    designNotes: [
      "Design the booth around the equipment, not the other way round",
      "Overhead structure to reclaim vertical brand presence above machinery",
      "Elevated viewing position or platform for large equipment",
      "Durable flooring rated for the load and the traffic",
    ],
  },
  {
    slug: "food-and-beverage-brands",
    label: "Food & Beverage",
    plural: "food and beverage brands",
    audience: "buyers, distributors, brokers and retail category managers",
    priorities: [
      "Sampling station with health-compliant surfaces",
      "Refrigeration, water and waste handling",
      "Packaging-forward product display",
      "Buyer meeting space away from sampling traffic",
    ],
    compliance:
      "Sampling requires venue health-department approval, food-handler certification and specific surface, refrigeration and hand-wash provisions. Plumbing and refrigeration must be ordered well ahead of the deadline.",
    shows: ["Fancy Food Show", "Natural Products Expo", "PLMA", "SIAL Canada"],
    designNotes: [
      "Sampling counter positioned to pull aisle traffic without blocking it",
      "Under-counter refrigeration and concealed waste",
      "Lit product shelving that makes packaging the hero",
      "Separate seated area so buyer meetings aren't held in a sampling queue",
    ],
  },
  {
    slug: "energy-and-cleantech-companies",
    label: "Energy & Cleantech",
    plural: "energy and cleantech companies",
    audience: "utilities, EPC contractors, project developers and policy stakeholders",
    priorities: [
      "Scale models and cutaway equipment displays",
      "Data visualisation of performance and output",
      "Sustainability credibility in the booth itself",
      "Partner and consortium co-branding space",
    ],
    compliance:
      "Sustainability claims made on booth graphics increasingly attract scrutiny — and a booth built from single-use materials undermines them. Reusable structure and documented material reuse are becoming buyer-facing assets in this sector.",
    shows: ["CERAWeek", "RE+", "Global Energy Show", "WindEurope"],
    designNotes: [
      "Reusable modular structure with a documented reuse record",
      "Large-format data visualisation on a lit feature wall",
      "Physical cutaway or scale model as the aisle magnet",
      "Co-branding zones engineered for consortium partners",
    ],
  },
  {
    slug: "financial-services-firms",
    label: "Financial Services",
    plural: "financial services firms",
    audience: "institutional clients, advisers, fintech partners and regulators",
    priorities: [
      "Confidential, quiet meeting environment",
      "Premium material finish signalling stability",
      "Hospitality rather than product demonstration",
      "Discreet, restrained branding",
    ],
    compliance:
      "Compliance review of all displayed copy is standard, and disclosure requirements may apply to any performance figures shown. Build a legal sign-off gate before graphics go to print.",
    shows: ["Money20/20", "SIBOS", "FinovateFall", "Collision"],
    designNotes: [
      "Real millwork, stone or veneer — material quality is the message",
      "Sound-treated enclosed meeting room",
      "Warm hospitality point: proper coffee, seated, unhurried",
      "Minimal graphics; typography and finish carry the brand",
    ],
  },
  {
    slug: "cannabis-and-wellness-brands",
    label: "Cannabis & Wellness",
    plural: "cannabis and wellness brands",
    audience: "retail buyers, dispensary groups, distributors and licensing partners",
    priorities: [
      "Retail-grade product merchandising",
      "Age-gating and controlled product areas where required",
      "Distinct brand world on a visually loud floor",
      "Buyer meeting space for wholesale conversations",
    ],
    compliance:
      "Display rules vary sharply by jurisdiction and by show — some prohibit product on display entirely, others require locked cases and age verification. Confirm the show's specific rules before design begins, not after.",
    shows: ["MJBizCon", "Lift&Co Expo", "Hall of Flowers", "Expo West"],
    designNotes: [
      "Locked, lit display cases meeting jurisdiction rules",
      "Retail-shelf simulation so buyers see it as it will merchandise",
      "Strong environmental design — this floor rewards a distinct world",
      "Private wholesale meeting area away from consumer traffic",
    ],
  },
];

export type Combo = { size: SizeEntry; industry: IndustryEntry; slug: string };

export const COMBOS: Combo[] = COMBO_SIZES.flatMap((size) =>
  COMBO_INDUSTRIES.map((industry) => ({
    size,
    industry,
    slug: `${size.slug}-booth-rental-for-${industry.slug}`,
  })),
);

export const COMBO_MAP: Record<string, Combo> = Object.fromEntries(COMBOS.map((c) => [c.slug, c]));
