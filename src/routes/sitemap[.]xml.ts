import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICES } from "@/data/services";
import { PRODUCTS } from "@/data/products";
import { BOOTH_SIZES } from "@/data/booth-sizes";
import { REGIONS } from "@/data/regions";
import { BLOG_POSTS } from "@/data/blog-posts";
import { CASE_STUDIES } from "@/data/case-studies";
import { VENUES, venueUrlSlug } from "@/data/venues";
import { VENUE_FLOOR_PLANS } from "@/data/venue-floor-plans";
import { FLOORPLAN_PLATFORMS } from "@/data/floorplan-platforms";
import { SHOWS, showUrlSlug } from "@/data/shows";
import { CITIES, cityUrlSlug } from "@/data/cities";
import { RENTAL_BOOTHS } from "@/data/rental-booths";
import { COMPARISONS } from "@/data/comparisons";
import { GUIDES } from "@/data/guides";
import { COMBOS } from "@/data/industries";
import { INDUSTRIES } from "@/data/industry-pages";
import { PORTABLE_CATEGORIES, PORTABLE_PRODUCTS } from "@/data/portable-products";
import { PORTABLE_FOOTPRINTS } from "@/lib/portable-size";
import { DIRECTORY_HUBS } from "@/lib/show-directory";
import { CALENDAR_YEARS, CALENDAR_MONTHS } from "@/lib/show-calendar";
import { EXHIBITOR_RESOURCES } from "@/data/exhibitor-resources";


const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/testimonials", changefreq: "monthly", priority: "0.6" },
          { path: "/faqs", changefreq: "monthly", priority: "0.6" },
          { path: "/gallery", changefreq: "monthly", priority: "0.7" },
          { path: "/services", changefreq: "monthly", priority: "0.8" },
          { path: "/trade-show-displays", changefreq: "monthly", priority: "0.8" },
          { path: "/portable-booths", changefreq: "monthly", priority: "0.8" },
          { path: "/rent-a-booth", changefreq: "monthly", priority: "0.9" },
          { path: "/global", changefreq: "monthly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/las-vegas-modular-trade-show-booth-rentals", changefreq: "weekly", priority: "1.0" },
          { path: "/web-summit-vancouver-booth-rentals", changefreq: "weekly", priority: "1.0" },
          { path: "/custom-trade-show-floor-plans", changefreq: "weekly", priority: "0.9" },
          { path: "/venue-floor-plans", changefreq: "monthly", priority: "0.8" },
          { path: "/floor-plan-software-comparison", changefreq: "monthly", priority: "0.8" },
          { path: "/preferred-vendor-program", changefreq: "monthly", priority: "0.9" },
          { path: "/double-deck-trade-show-booths", changefreq: "monthly", priority: "0.9" },
          { path: "/for-organizers", changefreq: "monthly", priority: "0.9" },
          { path: "/suppliers", changefreq: "monthly", priority: "0.6" },
          { path: "/for-organizers/official-show-rental-program", changefreq: "monthly", priority: "0.8" },
          { path: "/for-organizers/venue-exhibit-partner", changefreq: "monthly", priority: "0.8" },
          { path: "/for-organizers/exhibitor-service-desk", changefreq: "monthly", priority: "0.8" },
          { path: "/for-organizers/association-exhibitor-program", changefreq: "monthly", priority: "0.8" },
          { path: "/defsec-atlantic-booth-rentals", changefreq: "weekly", priority: "0.9" },
          { path: "/booth-cost-calculator", changefreq: "monthly", priority: "0.9" },
          { path: "/exhibitor-resources", changefreq: "monthly", priority: "0.9" },
          { path: "/commercial-millwork-cabinetry", changefreq: "monthly", priority: "0.9" },
          { path: "/case-studies", changefreq: "monthly", priority: "0.8" },
          { path: "/venues", changefreq: "monthly", priority: "0.8" },
          { path: "/shows", changefreq: "monthly", priority: "0.8" },
          { path: "/events", changefreq: "weekly", priority: "0.9" },
          { path: "/trade-shows", changefreq: "weekly", priority: "0.9" },
          { path: "/trade-show-calendar", changefreq: "weekly", priority: "0.9" },
          ...EXHIBITOR_RESOURCES.map((r) => ({
            path: `/exhibitor-resources/${r.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
          ...DIRECTORY_HUBS.map((h) => ({
            path: `/trade-shows/${h.slug}`,
            changefreq: "weekly" as const,
            priority: h.kind === "combo" ? "0.7" : "0.8",
          })),
          ...CALENDAR_YEARS.map((y) => ({
            path: `/trade-show-calendar/${y}`,
            changefreq: "weekly" as const,
            priority: "0.7",
          })),
          ...CALENDAR_MONTHS.map((m) => ({
            path: `/trade-show-calendar/${m.year}/${m.month}`,
            changefreq: "weekly" as const,
            priority: "0.6",
          })),
          { path: "/trade-show-booth-rental-pricing", changefreq: "weekly", priority: "1.0" },

          { path: "/compare", changefreq: "monthly", priority: "0.8" },
          { path: "/compare/trade-show-exhibit-rental-companies", changefreq: "monthly", priority: "0.9" },
          { path: "/guides", changefreq: "monthly", priority: "0.8" },
          { path: "/booth-rental", changefreq: "monthly", priority: "0.8" },
          { path: "/industries", changefreq: "monthly", priority: "0.8" },
          { path: "/resources/trade-show-exhibit-glossary", changefreq: "monthly", priority: "0.7" },
          { path: "/trade-show-marketing-benchmark-report-2026", changefreq: "monthly", priority: "0.9" },
          { path: "/sustainability", changefreq: "monthly", priority: "0.6" },
          { path: "/privacy-policy", changefreq: "monthly", priority: "0.3" },
          { path: "/terms-of-service", changefreq: "monthly", priority: "0.3" },
          { path: "/how-we-build", changefreq: "monthly", priority: "0.8" },
          { path: "/our-promise", changefreq: "monthly", priority: "0.8" },
          { path: "/rescue-booth-builds", changefreq: "monthly", priority: "0.8" },
          { path: "/careers", changefreq: "monthly", priority: "0.5" },
          { path: "/site-map", changefreq: "monthly", priority: "0.3" },
          ...PORTABLE_FOOTPRINTS.map((f) => ({ path: `/portable-displays/size/${f.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...PORTABLE_CATEGORIES.map((c) => ({ path: `/portable-displays/${c.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...PORTABLE_PRODUCTS.map((p) => ({ path: `/portable-displays/${p.category}/${p.slug}`, changefreq: "monthly" as const, priority: "0.6" })),
          ...COMPARISONS.map((c) => ({ path: `/compare/${c.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...COMBOS.map((c) => ({ path: `/booth-rental/${c.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...INDUSTRIES.map((i) => ({ path: `/industries/${i.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...CASE_STUDIES.map((c) => ({ path: `/case-studies/${c.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...VENUES.map((v) => ({ path: `/venues/${venueUrlSlug(v.slug)}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...VENUES.filter((v) => VENUE_FLOOR_PLANS[v.slug]).map((v) => ({ path: `/venue-floor-plans/${v.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...FLOORPLAN_PLATFORMS.map((f) => ({ path: `/floor-plan-software-comparison/${f.slug}`, changefreq: "monthly" as const, priority: "0.6" })),
          ...SHOWS.map((s) => ({ path: `/shows/${showUrlSlug(s.slug)}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...CITIES.map((c) => ({ path: `/city/${cityUrlSlug(c.slug)}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...PRODUCTS.map((p) => ({ path: `/products/${p.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...BOOTH_SIZES.map((b) => ({ path: `/booth-size/${b.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...REGIONS.map((r) => ({ path: `/regions/${r.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...RENTAL_BOOTHS.map((b) => ({ path: `/rent-booth/${b.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...BLOG_POSTS.map((p) => ({ path: `/blog/${p.slug}`, changefreq: "monthly" as const, priority: "0.6" })),
        ];

        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
