import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import {
  occurrencesInMonth,
  formatRange,
  isoDate,
  daysUntil,
  monthLabel,
  MONTHS,
  CALENDAR_YEARS,
  type MonthSlug,
} from "@/lib/show-calendar";
import { getVenue } from "@/data/venues";
import { cityHubLink } from "@/lib/show-directory";
import { robotsMeta, noindexMeta, absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/trade-show-calendar/$year/$month")({
  loader: ({ params }) => {
    const year = Number(params.year);
    const month = params.month.toLowerCase() as MonthSlug;
    if (!CALENDAR_YEARS.includes(year) || !MONTHS.includes(month)) throw notFound();
    if (!occurrencesInMonth(year, month).length) throw notFound();
    return { year, month };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Trade show calendar" }, ...noindexMeta()] };
    const { year, month } = loaderData;
    const list = occurrencesInMonth(year, month);
    const label = `${monthLabel(month)} ${year}`;
    const title = `${label} Trade Shows: Dates, Venues & Booths`;
    const desc = `${list.length} trade shows running in ${label} across North America — dates, venues, cities and custom booth rental pricing from Traction X.`;
    const url = absUrl(`/trade-show-calendar/${year}/${month}`);
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
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: list.length,
              itemListElement: list.map((o, i) => ({
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
              {
                "@type": "ListItem",
                position: 3,
                name: String(year),
                item: absUrl(`/trade-show-calendar/${year}`),
              },
              { "@type": "ListItem", position: 4, name: monthLabel(month), item: url },
            ],
          }),
        },
      ],
    };
  },
  component: MonthPage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero
        eyebrow="Trade show calendar"
        title="Nothing scheduled that month"
        intro="Browse the months we currently track."
      />
      <Section>
        <Link to="/trade-show-calendar" className="text-[oklch(0.78_0.13_300)] hover:underline">
          Trade show calendar →
        </Link>
      </Section>
    </PageLayout>
  ),
});

function MonthPage() {
  const { year, month } = Route.useLoaderData();
  const list = occurrencesInMonth(year, month);
  const label = `${monthLabel(month)} ${year}`;
  const cities = Array.from(new Set(list.map((o) => o.show.citySlug)));
  const idx = MONTHS.indexOf(month);
  const prev = idx > 0 ? MONTHS[idx - 1] : MONTHS[11];
  const prevYear = idx > 0 ? year : year - 1;
  const next = idx < 11 ? MONTHS[idx + 1] : MONTHS[0];
  const nextYear = idx < 11 ? year : year + 1;

  const earliest = list[0];
  const lead = earliest ? daysUntil(earliest) : 0;

  return (
    <PageLayout>
      <PageHero
        eyebrow={`${label} calendar`}
        title={`Trade shows in ${label}`}
        intro={`${list.length} show${list.length === 1 ? "" : "s"} across ${cities.length} cit${cities.length === 1 ? "y" : "ies"}. ${
          lead > 0
            ? `The first one opens in ${lead} days — a custom booth for it needs to start now if it hasn't already.`
            : "This month is already underway; rescue builds and last-minute rentals are still possible."
        }`}
      />

      <Section eyebrow="Schedule" title={`${label} show dates`}>
        <ul className="divide-y divide-white/[0.07] border-y border-white/10">
          {list.map((o) => {
            const v = getVenue(o.show.venueSlug);
            const d = daysUntil(o);
            return (
              <li key={o.show.slug + o.label} className="py-5">
                <Link to={o.href} className="group block">
                  <div className="flex flex-wrap gap-x-6 gap-y-1.5 items-baseline">
                    <time
                      dateTime={isoDate(o.start)}
                      className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)] w-44 shrink-0"
                    >
                      {formatRange(o)}
                    </time>
                    <span className="font-display text-lg font-semibold group-hover:text-[oklch(0.78_0.13_300)] transition">
                      {o.show.name}
                    </span>
                    <span className="text-sm text-white/50">
                      {v?.shortName ?? o.city} · {o.city}, {o.show.state}
                    </span>
                    <span className="text-xs text-white/35 ml-auto">
                      {d > 0 ? `${d} days out` : "in progress"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/60 max-w-3xl line-clamp-2">{o.show.intro}</p>
                  <p className="mt-1.5 text-xs text-white/40">{o.show.bookingWindow}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section eyebrow="Nearby" title="Other months and cities" bg="muted">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            to="/trade-show-calendar/$year/$month"
            params={{ year: String(prevYear), month: prev }}
            className="rounded-full border border-white/15 px-4 py-2 hover:border-[oklch(0.78_0.13_300)] transition"
          >
            ← {monthLabel(prev)} {prevYear}
          </Link>
          <Link
            to="/trade-show-calendar/$year"
            params={{ year: String(year) }}
            className="rounded-full border border-white/15 px-4 py-2 hover:border-[oklch(0.78_0.13_300)] transition"
          >
            All of {year}
          </Link>
          <Link
            to="/trade-show-calendar/$year/$month"
            params={{ year: String(nextYear), month: next }}
            className="rounded-full border border-white/15 px-4 py-2 hover:border-[oklch(0.78_0.13_300)] transition"
          >
            {monthLabel(next)} {nextYear} →
          </Link>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {cities
            .map((c) => cityHubLink(c))
            .filter(Boolean)
            .map((l) => (
              <Link
                key={l!.href}
                to={l!.href}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80 hover:border-[oklch(0.78_0.13_300)]/60 transition"
              >
                {l!.label}
                <span className="block text-xs text-white/40 mt-1">{l!.note}</span>
              </Link>
            ))}
        </div>
      </Section>

      <DesignCtaBand source="page" />
      <CTABand heading={`Exhibiting in ${label}? Let's lock the build.`} />
    </PageLayout>
  );
}
