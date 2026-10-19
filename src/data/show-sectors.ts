/**
 * Sector taxonomy used by the trade-show directory hubs
 * (/trade-shows/<sector>-trade-shows) and by Show.sectorSlugs.
 *
 * Keep slugs stable — they are public URLs.
 */

export type ShowSector = {
  slug: string;
  label: string; // "Medical & Healthcare"
  plural: string; // "medical and healthcare trade shows"
  blurb: string;
};

export const SHOW_SECTORS: ShowSector[] = [
  {
    slug: "technology",
    label: "Technology & Software",
    plural: "technology and software trade shows",
    blurb:
      "Demo-heavy floors where the booth is a product surface: power density, screen calibration, meeting capacity and a queue plan matter more than square footage.",
  },
  {
    slug: "healthcare-medical",
    label: "Healthcare & Medical Devices",
    plural: "healthcare and medical device trade shows",
    blurb:
      "Regulated messaging, clinician demo stations and quiet consult rooms — plus graphics that survive legal review inside a compressed approval window.",
  },
  {
    slug: "defence-security",
    label: "Defence & Security",
    plural: "defence and security trade shows",
    blurb:
      "Delegation hosting, export-control-aware graphics and engineered mounting for real hardware, built around closed briefing space rather than aisle traffic.",
  },
  {
    slug: "manufacturing-industrial",
    label: "Manufacturing & Industrial",
    plural: "manufacturing and industrial trade shows",
    blurb:
      "Machinery-in-motion booths: floor loading, guarding, three-phase power drops and rigging engineering are the design constraints, not the finishes.",
  },
  {
    slug: "energy",
    label: "Energy & Utilities",
    plural: "energy and utilities trade shows",
    blurb:
      "Long buying cycles and technical audiences. These floors reward hospitality space, private meeting rooms and hardware you can actually walk a client through.",
  },
  {
    slug: "construction-building",
    label: "Construction & Building",
    plural: "construction and building trade shows",
    blurb:
      "Heavy product, outdoor lots and material handling. Booths need real substrate samples, durable flooring and structures rated for equipment weight.",
  },
  {
    slug: "automotive-mobility",
    label: "Automotive & Mobility",
    plural: "automotive and mobility trade shows",
    blurb:
      "Vehicle spotting, turntables, ramp clearances and lighting that flatters paint — the build schedule is driven by when the vehicle can be spotted, not move-in day.",
  },
  {
    slug: "food-beverage",
    label: "Food & Beverage",
    plural: "food and beverage trade shows",
    blurb:
      "Sampling logistics: health permits, refrigeration, plumbing, waste and a service counter that keeps a line moving without blocking the aisle.",
  },
  {
    slug: "retail-consumer",
    label: "Retail & Consumer Goods",
    plural: "retail and consumer goods trade shows",
    blurb:
      "Merchandising density and buyer meeting rooms. Fixture systems have to reconfigure between markets without a rebuild.",
  },
  {
    slug: "finance-fintech",
    label: "Finance & Fintech",
    plural: "finance and fintech trade shows",
    blurb:
      "Meeting-first exhibits: a premium material palette, private banquettes and enough acoustic separation to close a deal on the floor.",
  },
  {
    slug: "aerospace-aviation",
    label: "Aerospace & Aviation",
    plural: "aerospace and aviation trade shows",
    blurb:
      "Chalets, static displays and engineered hardware mounting, with security-cleared crews and hard deadlines set by aircraft movement.",
  },
  {
    slug: "entertainment-media",
    label: "Entertainment & Media",
    plural: "entertainment and media trade shows",
    blurb:
      "Attraction-grade activations. Content, lighting and queue design carry the booth, and the build tolerance is closer to scenic than to exhibit.",
  },
  {
    slug: "pharma-biotech",
    label: "Pharma & Biotech",
    plural: "pharma and biotech trade shows",
    blurb:
      "Compliance-reviewed graphics, scientific poster space and hosted meeting programs, usually locked months out by medical-legal review.",
  },
  {
    slug: "packaging-logistics",
    label: "Packaging, Supply Chain & Logistics",
    plural: "packaging, supply chain and logistics trade shows",
    blurb:
      "Working equipment on the stand: conveyors, robotics cells, safety perimeters and the power and rigging to run them for four straight days.",
  },
  {
    slug: "sports-outdoor",
    label: "Sports, Outdoor & Recreation",
    plural: "sports, outdoor and recreation trade shows",
    blurb:
      "Experiential product trial — surfaces, structures and lighting that let buyers handle gear the way they would in the field.",
  },
  {
    slug: "cannabis",
    label: "Cannabis",
    plural: "cannabis trade shows",
    blurb:
      "Fast-moving brands, strict signage rules and a floor where retail-grade finish quality separates the serious operators.",
  },
  {
    slug: "hospitality-travel",
    label: "Hospitality, Travel & Events",
    plural: "hospitality, travel and event industry trade shows",
    blurb:
      "Destination storytelling and hosted-buyer meetings — the booth is a lounge and a sales office at the same time.",
  },
  {
    slug: "beauty-wellness",
    label: "Beauty & Wellness",
    plural: "beauty and wellness trade shows",
    blurb:
      "Photographic finish quality, treatment stations and lighting engineered for skin tone and social content capture.",
  },
  {
    slug: "agriculture",
    label: "Agriculture & Agtech",
    plural: "agriculture and agtech trade shows",
    blurb:
      "Equipment yards, indoor/outdoor hybrid footprints and structures that hold up to dirt, weather and machinery traffic.",
  },
  {
    slug: "mining-resources",
    label: "Mining & Natural Resources",
    plural: "mining and natural resources trade shows",
    blurb:
      "Investor-facing hospitality plus core samples and heavy equipment — two very different design problems in one footprint.",
  },
  {
    slug: "education",
    label: "Education & Association",
    plural: "education and association trade shows",
    blurb:
      "Budget-disciplined exhibits with high reuse: modular systems that re-skin between chapters, regions and annual meetings.",
  },
  {
    slug: "marine",
    label: "Marine & Offshore",
    plural: "marine and offshore trade shows",
    blurb:
      "Dockside and in-hall builds, corrosion-aware hardware, and structures that handle wind loading when the show goes outdoors.",
  },
];

export const SHOW_SECTOR_MAP: Record<string, ShowSector> = Object.fromEntries(
  SHOW_SECTORS.map((s) => [s.slug, s]),
);

export const getSector = (slug: string) => SHOW_SECTOR_MAP[slug];
