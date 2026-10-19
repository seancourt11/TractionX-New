import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout, PageHero, Section } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { RentalCrossLink } from "@/components/RentalCrossLink";
import { VENUES, getVenue, venueUrlSlug, type Venue } from "@/data/venues";
import { SHOWS, showUrlSlug } from "@/data/shows";
import { VENUE_FLOOR_PLANS, type VenueFloorPlan } from "@/data/venue-floor-plans";
import { absUrl, robotsMeta, noindexMeta } from "@/lib/seo";

type LoaderData = { venue: Venue; plan: VenueFloorPlan };

export const Route = createFileRoute("/venue-floor-plans/$slug")({
  loader: ({ params }): LoaderData => {
    const venue = VENUES.find((v) => v.slug === params.slug) ?? getVenue(params.slug);
    const plan = venue ? VENUE_FLOOR_PLANS[venue.slug] : undefined;
    if (!venue || !plan) throw notFound();
    return { venue, plan };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Venue floor plan guide" }, ...noindexMeta()] };
    const { venue: v } = loaderData;
    const url = absUrl(`/venue-floor-plans/${v.slug}`);
    const title = `${v.shortName} Floor Plan Guide — Halls, Docks, Rigging & Aisle Rules | Traction X`;
    const desc = `Floor plan planning guide for ${v.name}: hall dimensions and ceiling heights, booth numbering, dock and freight access, rigging approvals, aisle rules and CAD conversion notes for show organizers.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        ...robotsMeta(),
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Place",
                name: v.name,
                url,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: v.address,
                  addressLocality: v.city,
                  addressRegion: v.stateAbbr,
                  postalCode: v.postalCode,
                  addressCountry: v.country,
                },
                geo: { "@type": "GeoCoordinates", latitude: v.latitude, longitude: v.longitude },
                maximumAttendeeCapacity: undefined,
                description: desc,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Venue floor plan guides",
                    item: absUrl("/venue-floor-plans"),
                  },
                  { "@type": "ListItem", position: 3, name: `${v.shortName} floor plan guide`, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: VenueFloorPlanPage,
});

function VenueFloorPlanPage() {
  const { venue: v, plan } = Route.useLoaderData();
  const shows = SHOWS.filter((s) => s.venueSlug === v.slug);

  return (
    <PageLayout>
      <PageHero
        eyebrow={`${v.city}, ${v.stateAbbr} · Floor plan intelligence`}
        title={`${v.name} Floor Plan Guide`}
        accent="For Show Organizers"
        intro={`What actually constrains a layout in this building — hall dimensions and clear heights, booth numbering conventions, dock and freight access, rigging approvals, and the aisle rules the fire marshal enforces on site.`}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <QuoteButton label="Plan my floor" source={`venue-floor-plan-${v.slug}`} />
          <Link
            to="/custom-trade-show-floor-plans"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3 font-semibold hover:bg-white/10"
          >
            Floor plan design &amp; management <span aria-hidden>→</span>
          </Link>
        </div>
      </PageHero>

      <Section eyebrow="Halls" title="Hall dimensions and clear heights" bg="muted">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/50 uppercase tracking-widest text-xs">
                <th scope="col" className="py-3 pr-6 font-medium">Hall</th>
                <th scope="col" className="py-3 pr-6 font-medium">Exhibit area</th>
                <th scope="col" className="py-3 pr-6 font-medium">Ceiling</th>
                <th scope="col" className="py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {plan.halls.map((h) => (
                <tr key={h.name} className="border-b border-white/10 align-top">
                  <th scope="row" className="py-4 pr-6 font-semibold text-white">{h.name}</th>
                  <td className="py-4 pr-6 text-white/70">{h.sqft}</td>
                  <td className="py-4 pr-6 text-white/70">{h.ceilingHeight}</td>
                  <td className="py-4 text-white/70">{h.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-white/55">
          Building totals: {v.size}. Halls: {v.halls}.
        </p>
      </Section>

      <Section eyebrow="Laying out the floor" title="Numbering, freight and rigging">
        <div className="grid md:grid-cols-2 gap-5">
          {[
            ["Booth numbering", plan.boothNumbering],
            ["Docks & freight access", plan.docks],
            ["Rigging & hanging signs", plan.rigging],
            ["Aisles, sightlines & fire code", plan.aisleRules],
            ["Union & labour", v.union],
            ["Drayage reality", v.drayage],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="font-semibold text-white mb-2">{t}</div>
              <p className="text-white/70 text-sm leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Planning notes" title={`What we watch for at ${v.shortName}`} bg="muted">
        <ul className="grid md:grid-cols-2 gap-4 max-w-5xl">
          {plan.planningNotes.map((n) => (
            <li key={n} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm text-white/75 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.78_0.13_300)]" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="CAD to interactive" title="How this venue's plan becomes a live exhibitor map">
        <p className="max-w-3xl text-white/75 leading-relaxed">{plan.cadNotes}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            ["1. Intake", "Send the venue backdrop (DWG, DXF or PDF) plus your booth count, tier structure and sponsor commitments."],
            ["2. Build", "We plot booth polygons against the real column grid, docks and aisle rules above — then brand it to your show."],
            ["3. Run it", "Inventory goes live for exhibitor and sponsor self-serve, and a project manager makes edits through move-in and show days."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="font-semibold text-white mb-2">{t}</div>
              <p className="text-white/70 text-sm leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {shows.length > 0 && (
        <Section eyebrow="Shows here" title={`Shows we support at ${v.shortName}`} bg="muted">
          <div className="flex flex-wrap gap-3">
            {shows.map((s) => (
              <Link
                key={s.slug}
                to="/shows/$slug"
                params={{ slug: showUrlSlug(s.slug) }}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm hover:border-[oklch(0.78_0.13_300)]/40"
              >
                {s.name} <span className="text-white/50">· {s.cadence}</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <RentalCrossLink
        place={v.shortName}
        seed={`vfp-${v.slug}`}
        source={`venue-floor-plan-${v.slug}`}
        city={v.city}
      />

      <Section eyebrow="Keep going" title="Exhibiting here instead of organizing?">
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            to="/venues/$slug"
            params={{ slug: venueUrlSlug(v.slug) }}
            className="text-[oklch(0.78_0.13_300)] hover:underline"
          >
            {v.shortName} booth rental guide
          </Link>
          <Link to="/rent-a-booth" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Browse custom booth rentals
          </Link>
          <Link to="/custom-trade-show-floor-plans" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Floor plan design &amp; management
          </Link>
          <Link to="/venue-floor-plans" className="text-[oklch(0.78_0.13_300)] hover:underline">
            All venue floor plan guides
          </Link>
        </div>
      </Section>

      <DesignCtaBand source={`venue-floor-plan-${v.slug}`} />
    </PageLayout>
  );
}
