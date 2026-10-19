import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { VENUES } from "@/data/venues";
import { VENUE_FLOOR_PLANS } from "@/data/venue-floor-plans";
import { absUrl, robotsMeta } from "@/lib/seo";

const TITLE = "Convention Centre Floor Plan Guides — Halls, Docks, Rigging & Aisle Rules | Traction X";
const DESC =
  "Venue-by-venue floor plan guides for show organizers: hall dimensions and clear heights, booth numbering, dock access, rigging approvals and aisle rules across major North American convention centres.";
const URL = absUrl("/venue-floor-plans");

export const Route = createFileRoute("/venue-floor-plans/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...robotsMeta(),
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "Venue floor plan guides", item: URL },
          ],
        }),
      },
    ],
  }),
  component: VenueFloorPlanIndex,
});

function VenueFloorPlanIndex() {
  const covered = VENUES.filter((v) => VENUE_FLOOR_PLANS[v.slug]);
  const groups: { label: string; venues: typeof covered }[] = [
    { label: "United States", venues: covered.filter((v) => v.country === "US") },
    { label: "Canada", venues: covered.filter((v) => v.country === "CA") },
  ];

  return (
    <PageLayout>
      <PageHero
        eyebrow="For show organizers, venues and GSCs"
        title="Convention Centre Floor Plan Guides"
        accent="Built From What We See On Site"
        intro="Every building has its own booth numbering, dock access, ceiling heights, rigging approvals and aisle rules — and those constraints decide what your floor can actually sell. We publish what we know about each hall so your plan is built against reality, not a generic template."
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <QuoteButton label="Plan my floor" source="venue-floor-plans-index" />
          <Link
            to="/custom-trade-show-floor-plans"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3 font-semibold hover:bg-white/10"
          >
            Floor plan design &amp; management <span aria-hidden>→</span>
          </Link>
        </div>
      </PageHero>

      {groups.map((g) =>
        g.venues.length === 0 ? null : (
          <Section key={g.label} eyebrow={g.label} title={`${g.label} venues`} bg={g.label === "Canada" ? "muted" : "default"}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {g.venues.map((v) => (
                <Link
                  key={v.slug}
                  to="/venue-floor-plans/$slug"
                  params={{ slug: v.slug }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-[oklch(0.78_0.13_300)]/50 transition-colors"
                >
                  <div className="text-xs uppercase tracking-widest text-white/50">
                    {v.city}, {v.stateAbbr}
                  </div>
                  <h2 className="mt-2 font-display text-lg font-semibold">{v.shortName} floor plan guide</h2>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed">
                    {VENUE_FLOOR_PLANS[v.slug]!.halls.length} halls documented · {v.size}
                  </p>
                  <span className="mt-4 inline-block text-sm text-[oklch(0.78_0.13_300)] group-hover:underline">
                    Read the guide →
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        ),
      )}

      <Section eyebrow="Related" title="Keep going">
        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/venues" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Venue booth rental guides
          </Link>
          <Link to="/shows" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Show-by-show exhibitor guides
          </Link>
          <Link to="/floor-plan-software-comparison" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Floor plan software comparison
          </Link>
          <Link to="/rent-a-booth" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Custom booth rentals
          </Link>
        </div>
      </Section>

      <DesignCtaBand source="venue-floor-plans-index" />
    </PageLayout>
  );
}
