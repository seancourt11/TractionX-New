// Sitewide search index — built once at module scope from existing data files.
// Kept lean: large catalogs (rental booths, portable products) are represented by
// their size/category hubs rather than every individual SKU, to avoid bloating
// the client bundle with hundreds of near-duplicate entries.

import { SERVICES } from "@/data/services";
import { PRODUCTS } from "@/data/products";
import { BOOTH_SIZES } from "@/data/booth-sizes";
import { metricKeywords } from "@/lib/units";
import { CITIES, cityUrlSlug, cityLabel } from "@/data/cities";
import { SHOWS, showUrlSlug } from "@/data/shows";
import { VENUES, venueUrlSlug } from "@/data/venues";
import { VENUE_FLOOR_PLANS } from "@/data/venue-floor-plans";
import { INDUSTRIES } from "@/data/industry-pages";
import { COMPARISONS } from "@/data/comparisons";
import { GUIDES } from "@/data/guides";
import { CASE_STUDIES } from "@/data/case-studies";
import { BLOG_POSTS } from "@/data/blog-posts";
import { PORTABLE_CATEGORIES } from "@/data/portable-products";
import { PORTABLE_FOOTPRINTS } from "@/lib/portable-size";
import { RENTAL_SIZES } from "@/data/rental-booths";
import { DIRECTORY_HUBS } from "@/lib/show-directory";

export type SearchGroup =
  | "Services"
  | "Products"
  | "Booth Sizes"
  | "Cities"
  | "Shows"
  | "Venues"
  | "Industries"
  | "Comparisons"
  | "Guides"
  | "Case Studies"
  | "Blog"
  | "Portable Displays"
  | "Trade Show Directory"
  | "Rental Booths"
  | "Pages";

export type SearchEntry = {
  title: string;
  subtitle?: string;
  group: SearchGroup;
  href: string;
  keywords: string;
};

const services: SearchEntry[] = SERVICES.map((s) => ({
  title: s.label,
  subtitle: s.short,
  group: "Services",
  href: `/services/${s.slug}`,
  keywords: [s.label, s.short, ...(s.relatedTerms ?? [])].join(" "),
}));

const products: SearchEntry[] = PRODUCTS.map((p) => ({
  title: p.label,
  subtitle: p.short,
  group: "Products",
  href: `/products/${p.slug}`,
  keywords: [p.label, p.short].join(" "),
}));

const boothSizes: SearchEntry[] = BOOTH_SIZES.map((b) => ({
  title: b.label,
  subtitle: b.short,
  group: "Booth Sizes",
  href: `/booth-size/${b.slug}`,
  keywords: [b.label, b.short, metricKeywords(b.gallerySize ?? b.label)].join(" "),
}));

const cities: SearchEntry[] = CITIES.map((c) => ({
  title: cityLabel(c),
  subtitle: c.hero,
  group: "Cities",
  href: `/city/${cityUrlSlug(c.slug)}`,
  keywords: [c.city, c.state, c.stateAbbr, c.countryName, ...c.neighborhoods].join(" "),
}));

const shows: SearchEntry[] = SHOWS.map((s) => ({
  title: s.name,
  subtitle: `${s.city}, ${s.state} — ${s.cadence}`,
  group: "Shows",
  href: `/shows/${showUrlSlug(s.slug)}`,
  keywords: [s.name, s.shortName, s.city, s.industry, s.audience].join(" "),
}));

const venues: SearchEntry[] = VENUES.map((v) => ({
  title: v.name,
  subtitle: `${v.city}, ${v.stateAbbr}`,
  group: "Venues",
  href: `/venues/${venueUrlSlug(v.slug)}`,
  keywords: [v.name, v.shortName, v.city, v.state, ...v.majorShows].join(" "),
}));

const industries: SearchEntry[] = INDUSTRIES.map((i) => ({
  title: i.label,
  subtitle: i.intro.slice(0, 120),
  group: "Industries",
  href: `/industries/${i.slug}`,
  keywords: [i.label, i.plural, i.audience].join(" "),
}));

const comparisons: SearchEntry[] = COMPARISONS.map((c) => ({
  title: c.label,
  subtitle: c.tldr.slice(0, 120),
  group: "Comparisons",
  href: `/compare/${c.slug}`,
  keywords: [c.label, c.optionA, c.optionB].join(" "),
}));

const guides: SearchEntry[] = GUIDES.map((g) => ({
  title: g.label,
  subtitle: g.tldr.slice(0, 120),
  group: "Guides",
  href: `/guides/${g.slug}`,
  keywords: [g.label, g.eyebrow].join(" "),
}));

const caseStudies: SearchEntry[] = CASE_STUDIES.map((c) => ({
  title: c.title,
  subtitle: `${c.client} — ${c.show}`,
  group: "Case Studies",
  href: `/case-studies/${c.slug}`,
  keywords: [c.title, c.client, c.show, c.city, c.industry].join(" "),
}));

const blogPosts: SearchEntry[] = BLOG_POSTS.map((p) => ({
  title: p.title,
  subtitle: p.excerpt.slice(0, 120),
  group: "Blog",
  href: `/blog/${p.slug}`,
  keywords: [p.title, p.excerpt].join(" "),
}));

const portableSizes: SearchEntry[] = PORTABLE_FOOTPRINTS.map((f) => ({
  title: f.label,
  subtitle: f.short + " portable displays",
  group: "Portable Displays",
  href: `/portable-displays/size/${f.slug}`,
  keywords: `${f.short} portable display booth package`,
}));

const portableCategories: SearchEntry[] = PORTABLE_CATEGORIES.map((c) => ({
  title: c.label,
  subtitle: c.intro.slice(0, 120),
  group: "Portable Displays",
  href: `/portable-displays/${c.slug}`,
  keywords: [c.label, c.intro].join(" "),
}));

const rentalSizeHubs: SearchEntry[] = RENTAL_SIZES.filter(
  (s) => s !== "Larger" && s !== "Custom"
).map((size) => ({
  title: `${size.replace("x", " × ")} Rental Booths`,
  subtitle: `Browse ${size.replace("x", "×")} rental booth designs`,
  group: "Rental Booths",
  href: `/rent-a-booth?size=${size}`,
  keywords: [`${size} rental booth`, `${size.replace("x", "×")} booth`].join(" "),
}));

/** Hand-listed static routes not covered by a data file. */
const staticPages: SearchEntry[] = [
  { title: "Rent a Booth", subtitle: "Custom & modular rental catalog, 10×10 to 30×50", group: "Pages", href: "/rent-a-booth", keywords: "rent a booth rentals catalog" },
  { title: "Booth Cost Calculator", subtitle: "Estimate your trade show booth cost", group: "Pages", href: "/booth-cost-calculator", keywords: "cost calculator pricing estimate" },
  { title: "Trade Show Booth Rental Pricing", subtitle: "2027 pricing guide", group: "Pages", href: "/trade-show-booth-rental-pricing", keywords: "pricing guide rental cost" },
  { title: "Gallery", subtitle: "Browse hundreds of custom trade show booths", group: "Pages", href: "/gallery", keywords: "gallery photos booth designs portfolio" },
  { title: "Contact", subtitle: "Get in touch with Traction X", group: "Pages", href: "/contact", keywords: "contact us quote email phone" },
  { title: "About", subtitle: "About Traction X", group: "Pages", href: "/about", keywords: "about company who we are" },
  { title: "How We Build", subtitle: "Fabrication, QA and pre-ship set-up", group: "Pages", href: "/how-we-build", keywords: "fabrication shop millwork quality control pre-ship process build" },
  { title: "Rescue Booth Builds", subtitle: "Last-minute exhibits in 45 days", group: "Pages", href: "/rescue-booth-builds", keywords: "rush emergency last minute fast rescue supplier failed 45 days" },
  { title: "FAQs", subtitle: "Frequently asked questions", group: "Pages", href: "/faqs", keywords: "faq questions answers" },
  { title: "Events", subtitle: "Upcoming shows & deadlines", group: "Pages", href: "/events", keywords: "events shows deadlines calendar" },
  { title: "Trade Show Directory", subtitle: "Browse shows by sector, city and country", group: "Pages", href: "/trade-shows", keywords: "trade show directory list sector city country exhibitions" },
  { title: "Trade Show Calendar", subtitle: "Upcoming trade show dates by month and year", group: "Pages", href: "/trade-show-calendar", keywords: "trade show calendar dates schedule month year upcoming exhibitions" },
  { title: "Testimonials", subtitle: "What clients say about Traction X", group: "Pages", href: "/testimonials", keywords: "testimonials reviews clients" },
  { title: "Portable Booths", subtitle: "Portable & pop-up trade show displays", group: "Pages", href: "/portable-booths", keywords: "portable booths pop up displays" },
  { title: "Venue Floor Plan Guides", subtitle: "Halls, docks, rigging and aisle rules by venue", group: "Pages", href: "/venue-floor-plans", keywords: "floor plan venue halls rigging docks aisles organizer" },
  { title: "Floor Plan Software Comparison", subtitle: "ExpoFP, Map Your Show, EXPOCAD, A2Z, Cvent compared", group: "Pages", href: "/floor-plan-software-comparison", keywords: "floor plan software comparison expofp mapyourshow expocad a2z cvent" },
  { title: "Trade Show Exhibit Glossary", subtitle: "Glossary of exhibit industry terms", group: "Pages", href: "/resources/trade-show-exhibit-glossary", keywords: "glossary terms definitions" },
  { title: "Careers", subtitle: "Trade show exhibit jobs — fabrication, design, PM, install, sales", group: "Pages", href: "/careers", keywords: "careers jobs hiring employment work apply resume" },
  { title: "Suppliers & Subcontractors", subtitle: "Fabrication, I&D crews, graphics, AV and freight partners", group: "Pages", href: "/suppliers", keywords: "suppliers vendors subcontractors fabrication install crews printers freight partner list procurement" },
  { title: "For Organizers, Venues & Associations", subtitle: "Partner programs for shows, convention centres and societies", group: "Pages", href: "/for-organizers", keywords: "organizer show management venue convention centre association partner official supplier b2b" },
  { title: "Official Show Rental Program", subtitle: "Branded exhibitor booth rental program for shows", group: "Pages", href: "/for-organizers/official-show-rental-program", keywords: "official exhibit vendor preferred supplier show organizer rental program revenue share" },
  { title: "Venue Exhibit Partner Program", subtitle: "Preferred exhibit partner for convention centres", group: "Pages", href: "/for-organizers/venue-exhibit-partner", keywords: "venue convention centre preferred vendor compliance rigging hall rules partner" },
  { title: "Exhibitor Service Desk", subtitle: "On-floor desk and exhibitor service kit support", group: "Pages", href: "/for-organizers/exhibitor-service-desk", keywords: "exhibitor service kit desk move-in support organizer operations eac" },
  { title: "Association Exhibitor Program", subtitle: "Member booth tiers for associations and societies", group: "Pages", href: "/for-organizers/association-exhibitor-program", keywords: "association society annual meeting member exhibitor program tiers sponsor" },
];

const venueFloorPlans: SearchEntry[] = VENUES.filter((v) => VENUE_FLOOR_PLANS[v.slug]).map((v) => ({
  title: `${v.shortName} Floor Plan Guide`,
  subtitle: `${v.city}, ${v.stateAbbr} — halls, docks, rigging, aisle rules`,
  group: "Venues",
  href: `/venue-floor-plans/${v.slug}`,
  keywords: `${v.name} ${v.city} floor plan halls rigging docks booth numbering`,
}));

const directoryHubs: SearchEntry[] = DIRECTORY_HUBS.map((h) => ({
  title: h.h1,
  subtitle: `${h.shows.length} shows — ${h.eyebrow}`,
  group: "Trade Show Directory",
  href: `/trade-shows/${h.slug}`,
  keywords: [h.h1, h.eyebrow, h.cityName ?? "", h.sector?.label ?? ""].join(" "),
}));

export const SEARCH_INDEX: SearchEntry[] = [
  ...staticPages,
  ...venueFloorPlans,
  ...directoryHubs,
  ...services,
  ...products,
  ...boothSizes,
  ...portableSizes,
  ...portableCategories,
  ...rentalSizeHubs,
  ...comparisons,
  ...guides,
  ...caseStudies,
  ...blogPosts,
  ...industries,
  ...shows,
  ...venues,
  ...cities,
];

/** A small hand-picked set of popular links shown when the search box is empty. */
export const POPULAR_SEARCHES: SearchEntry[] = [
  staticPages.find((p) => p.href === "/rent-a-booth")!,
  staticPages.find((p) => p.href === "/gallery")!,
  staticPages.find((p) => p.href === "/booth-cost-calculator")!,
  boothSizes.find((b) => b.href === "/booth-size/10x10-booths")!,
  staticPages.find((p) => p.href === "/portable-booths")!,
  staticPages.find((p) => p.href === "/contact")!,
].filter(Boolean);

type Score = { entry: SearchEntry; score: number };

/** Simple scoring: title startsWith > title includes > keywords includes. */
export function searchIndex(query: string, maxPerGroup = 8, maxTotal = 24): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored: Score[] = [];
  for (const entry of SEARCH_INDEX) {
    const title = entry.title.toLowerCase();
    let score = 0;
    if (title.startsWith(q)) score = 3;
    else if (title.includes(q)) score = 2;
    else if (entry.keywords.toLowerCase().includes(q)) score = 1;
    if (score > 0) scored.push({ entry, score });
  }

  scored.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  const perGroupCount = new Map<SearchGroup, number>();
  const results: SearchEntry[] = [];
  for (const { entry } of scored) {
    if (results.length >= maxTotal) break;
    const count = perGroupCount.get(entry.group) ?? 0;
    if (count >= maxPerGroup) continue;
    perGroupCount.set(entry.group, count + 1);
    results.push(entry);
  }
  return results;
}
