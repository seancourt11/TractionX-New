import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DIRECTORY_HUBS, hubsOfKind } from "@/lib/show-directory";
import { SHOWS } from "@/data/shows";
import { upcomingOccurrences, formatRange, CALENDAR_YEARS } from "@/lib/show-calendar";
import { robotsMeta, absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/trade-shows";
const TITLE = "Trade Show Directory: Dates, Venues & Booth Rentals";
const DESC =
  "Browse every trade show we cover by city, sector and country — dates, venues, move-in realities and custom booth rental pricing from a single North American build team.";

export const Route = createFileRoute("/trade-shows/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...robotsMeta(),
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl(PATH) },
    ],
    links: [{ rel: "canonical", href: absUrl(PATH) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESC,
          url: absUrl(PATH),
          isPartOf: { "@type": "WebSite", name: "Traction X", url: SITE.url },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
            { "@type": "ListItem", position: 2, name: "Trade show directory", item: absUrl(PATH) },
          ],
        }),
      },
    ],
  }),
  component: DirectoryIndex,
});

function HubGrid({ slugs }: { slugs: { slug: string; label: string; count: number }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {slugs.map((h) => (
        <Link
          key={h.slug}
          to="/trade-shows/$slug"
          params={{ slug: h.slug }}
          className="flex items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3.5 hover:border-[oklch(0.78_0.13_300)]/60 hover:bg-white/[0.03] transition"
        >
          <span className="text-sm text-white/85">{h.label}</span>
          <span className="text-xs text-white/40 shrink-0">{h.count}</span>
        </Link>
      ))}
    </div>
  );
}

function DirectoryIndex() {
  const cities = hubsOfKind("city");
  const sectors = hubsOfKind("sector");
  const countries = hubsOfKind("country");
  const combos = hubsOfKind("combo");
  const next = upcomingOccurrences().slice(0, 12);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Trade show directory"
        title="Every show we cover,"
        accent="with the booth to match."
        intro={`${SHOWS.length} North American trade shows indexed by city, sector and country — each with dates, venue logistics, booking windows and custom booth rental pricing. We are not a listings site: every show below is one we quote, build, ship and install.`}
      />

      <Section eyebrow="Next up" title="Shows opening soon">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {next.map((o) => (
            <Link
              key={o.label + o.show.slug}
              to={o.href}
              className="rounded-xl border border-white/10 p-4 hover:border-[oklch(0.78_0.13_300)]/60 transition"
            >
              <div className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)]">
                {formatRange(o)}
              </div>
              <div className="mt-1.5 font-semibold">{o.show.name}</div>
              <div className="text-sm text-white/55">
                {o.city} · {o.show.industry}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link to="/trade-show-calendar" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Full calendar →
          </Link>
          {CALENDAR_YEARS.map((y) => (
            <Link
              key={y}
              to="/trade-show-calendar/$year"
              params={{ year: String(y) }}
              className="text-white/60 hover:text-white"
            >
              {y}
            </Link>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="By country"
        title="Trade shows by country"
        bg="muted"
        intro="Cross-border freight, customs brokerage and labour jurisdictions are handled in-house on both sides of the border."
      >
        <HubGrid
          slugs={countries.map((h) => ({
            slug: h.slug,
            label: h.h1.replace(" — booth rentals city by city", ""),
            count: h.shows.length,
          }))}
        />
      </Section>

      <Section eyebrow="By sector" title="Trade shows by industry sector">
        <HubGrid
          slugs={sectors.map((h) => ({
            slug: h.slug,
            label: h.sector?.label ?? h.slug,
            count: h.shows.length,
          }))}
        />
      </Section>

      <Section eyebrow="By city" title="Trade shows city by city" bg="muted">
        <HubGrid
          slugs={cities.map((h) => ({
            slug: h.slug,
            label: h.cityName ?? h.slug,
            count: h.shows.length,
          }))}
        />
      </Section>

      {combos.length > 0 && (
        <Section
          eyebrow="Sector × city"
          title="The combinations exhibitors actually search"
          intro="Only built where we cover three or more shows — no filler pages."
        >
          <HubGrid
            slugs={combos.map((h) => ({
              slug: h.slug,
              label: `${h.sector?.label} in ${h.cityName}`,
              count: h.shows.length,
            }))}
          />
        </Section>
      )}

      <CTABand heading="Exhibiting at one of these? Get a real number." />
    </PageLayout>
  );
}
