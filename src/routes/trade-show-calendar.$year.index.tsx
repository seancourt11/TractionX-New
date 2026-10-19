import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import {
  occurrencesInYear,
  occurrencesInMonth,
  formatRange,
  isoDate,
  monthLabel,
  MONTHS,
  CALENDAR_YEARS,
} from "@/lib/show-calendar";
import { getVenue } from "@/data/venues";
import { robotsMeta, noindexMeta, absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/trade-show-calendar/$year/")({
  loader: ({ params }) => {
    const year = Number(params.year);
    if (!CALENDAR_YEARS.includes(year)) throw notFound();
    return { year };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Trade show calendar" }, ...noindexMeta()] };
    const { year } = loaderData;
    const list = occurrencesInYear(year);
    const title = `${year} Trade Show Calendar: Dates, Cities & Booths`;
    const desc = `${list.length} trade shows scheduled across North America in ${year}, with dates, venues, booking windows and custom booth rental pricing from Traction X.`;
    const url = absUrl(`/trade-show-calendar/${year}`);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        ...robotsMeta(),
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            description: desc,
            url,
            isPartOf: { "@type": "WebSite", name: "Traction X", url: SITE.url },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: list.length,
              itemListElement: list.slice(0, 100).map((o, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Event",
                  name: o.label,
                  startDate: isoDate(o.start),
                  endDate: isoDate(o.end),
                  eventStatus: "https://schema.org/EventScheduled",
                  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                  url: absUrl(o.href),
                  location: { "@type": "Place", name: o.city },
                },
              })),
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              {
                "@type": "ListItem",
                position: 2,
                name: "Trade show calendar",
                item: absUrl("/trade-show-calendar"),
              },
              { "@type": "ListItem", position: 3, name: String(year), item: url },
            ],
          }),
        },
      ],
    };
  },
  component: YearPage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero
        eyebrow="Trade show calendar"
        title="No calendar for that year yet"
        intro="Browse the years we currently track."
      />
      <Section>
        <Link to="/trade-show-calendar" className="text-[oklch(0.78_0.13_300)] hover:underline">
          Trade show calendar →
        </Link>
      </Section>
    </PageLayout>
  ),
});

function YearPage() {
  const { year } = Route.useLoaderData();
  const list = occurrencesInYear(year);
  const cities = new Set(list.map((o) => o.city));

  return (
    <PageLayout>
      <PageHero
        eyebrow={`${year} calendar`}
        title={`Trade shows in ${year}`}
        intro={`${list.length} show editions across ${cities.size} cities. Each entry carries the venue, the labour jurisdiction behind it and the date your booth build actually has to start.`}
      />

      <Section eyebrow="By month" title={`${year} month by month`} bg="muted">
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {MONTHS.map((m) => {
            const count = occurrencesInMonth(year, m).length;
            if (!count) return null;
            return (
              <Link
                key={m}
                to="/trade-show-calendar/$year/$month"
                params={{ year: String(year), month: m }}
                className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm hover:border-[oklch(0.78_0.13_300)]/60 transition"
              >
                <span className="text-white/85">{monthLabel(m)}</span>
                <span className="text-xs text-white/40">{count}</span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Full list" title={`Every ${year} edition we track`}>
        <ul className="divide-y divide-white/[0.07] border-y border-white/10">
          {list.map((o) => {
            const v = getVenue(o.show.venueSlug);
            return (
              <li key={o.show.slug + o.label} className="py-4">
                <Link to={o.href} className="group flex flex-wrap gap-x-6 gap-y-1.5 items-baseline">
                  <time
                    dateTime={isoDate(o.start)}
                    className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)] w-44 shrink-0"
                  >
                    {formatRange(o)}
                  </time>
                  <span className="font-semibold group-hover:text-[oklch(0.78_0.13_300)] transition">
                    {o.show.name}
                  </span>
                  <span className="text-sm text-white/50">
                    {v?.shortName ?? o.city} · {o.city}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          {CALENDAR_YEARS.filter((y) => y !== year).map((y) => (
            <Link
              key={y}
              to="/trade-show-calendar/$year"
              params={{ year: String(y) }}
              className="text-[oklch(0.78_0.13_300)] hover:underline"
            >
              {y} calendar →
            </Link>
          ))}
          <Link to="/trade-shows" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Browse by city and sector →
          </Link>
        </div>
      </Section>

      <CTABand heading={`Booking a ${year} show? Start the build now.`} />
    </PageLayout>
  );
}
