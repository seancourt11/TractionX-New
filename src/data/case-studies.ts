export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  city: string;
  show: string;
  year: string;
  size: string;
  industry: string;
  heroImage: string; // portfolio asset filename (no path)
  gallery: string[];
  summary: string;
  challenge: string[];
  approach: string[];
  results: { label: string; value: string }[];
  quote?: { text: string; who: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "thales-defence-exhibit",
    client: "Thales",
    title: "A defence-grade brand statement on the DEFSEC floor",
    city: "Halifax",
    show: "DEFSEC Atlantic",
    year: "2025",
    size: "20×30 Island",
    industry: "Defence & Aerospace",
    heroImage: "thales-booth.jpg",
    gallery: ["thales-booth.jpg", "canada-defence-booth-01.jpg", "canada-defence-booth-02.jpg"],
    summary:
      "A custom island exhibit built to host government stakeholders and generate qualified defence procurement conversations across a 3-day show.",
    challenge: [
      "High-profile show floor with primes, primes-of-primes and government end users in every meeting.",
      "Tight ceiling-height rigging rules at the Halifax Convention Centre.",
      "Secure demo areas required for classified conversations.",
    ],
    approach: [
      "Sculpted overhead identifier + backlit brand wall built to venue rigging spec.",
      "Two enclosed meeting pods with acoustic treatment and NDA-ready seating.",
      "Product demo alcoves designed around live equipment and A/V loops.",
      "On-site Traction X PM through install, show days and dismantle.",
    ],
    results: [
      { label: "Qualified meetings", value: "60+" },
      { label: "On-time install", value: "100%" },
      { label: "Client CSAT", value: "5 / 5" },
    ],
    quote: {
      text: "The Traction X team delivered a booth that made us feel bigger than we were. Every meeting we wanted, we got.",
      who: "Program Director, Thales",
    },
  },
  {
    slug: "accenture-mission-ready",
    client: "Accenture Federal",
    title: "Mission-ready activation for federal decision makers",
    city: "Washington, DC",
    show: "Federal & Defence Summit",
    year: "2025",
    size: "20×20 Island",
    industry: "Federal Consulting",
    heroImage: "accenture-mission-ready.jpg",
    gallery: ["accenture-mission-ready.jpg"],
    summary:
      "A brand activation that translated Accenture Federal's mission-readiness story into a walk-through experience for senior federal buyers.",
    challenge: [
      "Complex service portfolio to communicate in 90 seconds of dwell time.",
      "Executive briefing space required inside a 400 sq ft footprint.",
      "Consistent brand execution across signage, wearables and print.",
    ],
    approach: [
      "Narrative-driven booth layout with three story stations.",
      "Frosted-glass executive briefing area with digital whiteboards.",
      "Coordinated giveaway + lead capture flow tied to CRM.",
    ],
    results: [
      { label: "Scanned leads", value: "480+" },
      { label: "Briefings booked", value: "22" },
      { label: "Pipeline attribution", value: "8-figure USD" },
    ],
  },
  {
    slug: "canada-pavilion-defsec",
    client: "Government of Canada",
    title: "Canada Pavilion — the anchor booth of DEFSEC Atlantic",
    city: "Halifax",
    show: "DEFSEC Atlantic",
    year: "2024",
    size: "30×40 Island",
    industry: "Government",
    heroImage: "canada-defence-booth-01.jpg",
    gallery: [
      "canada-defence-booth-01.jpg",
      "canada-defence-booth-02.jpg",
      "canada-export-booth.jpg",
    ],
    summary:
      "The Canada Pavilion functioned as a mini-country within the show — hosting delegations, ministers, and dozens of Canadian defence exporters under one roof.",
    challenge: [
      "House 25+ Canadian exporters plus a hospitality/reception program.",
      "Support VIP visits, ministerial announcements and media moments.",
      "Modular enough to redeploy across multiple annual events.",
    ],
    approach: [
      "Modular island shell with pod stations for each exporter.",
      "Central hospitality bar + backlit Canada wordmark.",
      "Rigged overhead identifier visible from every entrance.",
      "Traction X managed exporters as sub-tenants — schedule, graphics and I&D.",
    ],
    results: [
      { label: "Exporters hosted", value: "25" },
      { label: "Delegations received", value: "40+" },
      { label: "Redeploys", value: "3 shows" },
    ],
  },
  {
    slug: "web-summit-vancouver-alpha",
    client: "Web Summit Vancouver Exhibitors",
    title: "Turnkey Alpha, Beta and Growth booths for Web Summit Vancouver",
    city: "Vancouver",
    show: "Web Summit Vancouver",
    year: "2026",
    size: "3×3m — 6×6m",
    industry: "Tech / SaaS",
    heroImage: "optibus-ai-cafe-booth.png",
    gallery: [
      "optibus-ai-cafe-booth.png",
      "optibus-ai-preference-designer.jpg",
      "optibus-brazil-large-booth.png",
      "optibus-preference-designer-booth.jpg",
    ],
    summary:
      "A tiered turnkey rental program aligned to Web Summit's Alpha / Beta / Growth / Scale exhibitor tiers — deployed for multiple startups on the same show floor.",
    challenge: [
      "Startups arriving from different countries with no on-site logistics.",
      "One preferred vendor covering everything from design to on-site staff.",
      "Consistent visual quality across a 40-booth cluster.",
    ],
    approach: [
      "Standardized 3×3, 3×6 and 6×6m turnkey shells with brandable graphic panels.",
      "5-step process: brief → design → approve → fabricate → install.",
      "Preferred-vendor pricing and 7.5% early-bird discount.",
    ],
    results: [
      { label: "Booths delivered", value: "40+" },
      { label: "On-time delivery", value: "100%" },
      { label: "Repeat-year clients", value: "70%" },
    ],
  },
  {
    slug: "netflix-brand-activation",
    client: "Netflix",
    title: "Netflix brand activation lounge",
    city: "Los Angeles",
    show: "Industry Upfront",
    year: "2025",
    size: "40×40 Island",
    industry: "Media & Entertainment",
    heroImage: "netflix-booth-full.jpg",
    gallery: [
      "netflix-booth-full.jpg",
      "netflix-booth-front.jpg",
      "netflix-booth-lounge.jpg",
    ],
    summary:
      "A high-end lounge activation delivering an on-brand, Instagrammable dwell environment for creators, press and partners.",
    challenge: [
      "Museum-grade finish quality across all surfaces.",
      "24/7 lounge experience with F&B and press moments.",
      "Backlit media walls integrated with content programming.",
    ],
    approach: [
      "Custom-fabricated walls with premium veneer + backlit media.",
      "Programmable content loop across LED walls and monitors.",
      "Dedicated on-site production management for the full run.",
    ],
    results: [
      { label: "Dwell time avg.", value: "22 min" },
      { label: "Social mentions", value: "1.2M+" },
      { label: "Press pickups", value: "70+" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
