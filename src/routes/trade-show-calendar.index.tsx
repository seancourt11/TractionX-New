import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import {
  upcomingOccurrences,
  formatRange,
  isoDate,
  daysUntil,
  CALENDAR_YEARS,
  CALENDAR_MONTHS,
  monthLabel,
  MONTHS,
} from "@/lib/show-calendar";
import { getVenue } from "@/data/venues";
import { robotsMeta, absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/trade-show-calendar";
const TITLE = "Trade Show Calendar 2026–2028: Dates by Month & City";
const DESC =
  "Upcoming North American trade show dates by month, city and venue — plus the booking window and booth rental lead time for each show. Maintained by Traction X.";

export const Route = createFileRoute("/trade-show-calendar/")({
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
            { "@type": "ListItem", position: 2, name: "Trade show calendar", item: absUrl(PATH) },
          ],
        }),
      },
    ],
  }),
  component: CalendarIndex,
});

const FAQS = [
  {
    q: "How far in advance should a booth be booked for these dates?",
    a: "Work backwards from the show open: 120 days for a comfortable custom build, 75 days for a compressed design cycle, 45 days before rush fabrication and expedited freight start adding real cost. Hanging structures need engineered drawings approved by the general contractor about 60 days out.",
  },
  {
    q: "Are these dates official?",
    a: "They track each organiser's published or historically consistent dates and we review them regularly, but organisers do move shows. Always confirm against the official exhibitor kit before booking travel or freight.",
  },
  {
    q: "Can you cover several shows on this calendar with one booth?",
    a: "Yes — that is the standard programme for exhibitors running four or more shows a year. We store the structure between events, re-skin graphics per show and re-issue it to the next city, which typically costs far less than a second build.",
  },
  {
    q: "Do you work shows outside this list?",
    a: "Regularly. The calendar covers the venues and shows we work most, but we quote, build and install anywhere in North America — send us the show and the floor plan and we will price it.",
  },
];

function CalendarIndex() {
  const upcoming = upcomingOccurrences();
  const grouped = new Map<string, typeof upcoming>();
  for (const o of upcoming) {
    const key = `${o.start.getFullYear()}-${MONTHS[o.start.getMonth()]}`;
    const list = grouped.get(key) ?? [];
    list.push(o);
    grouped.set(key, list);
  }

  return (
    <PageLayout>
      <PageHero
        eyebrow="Trade show calendar"
        title="North American trade show dates,"
        accent="with lead times attached."
        intro={`${upcoming.length} upcoming show editions across ${new Set(upcoming.map((o) => o.city)).size} cities. Every entry links to the show's booth logistics — labour jurisdiction, move-in reality, booking window and rental pricing — because a date on its own doesn't help you plan a build.`}
      />

      <Section eyebrow="Jump to" title="Browse by year and month" bg="muted">
        <div className="flex flex-wrap gap-2.5">
          {CALENDAR_YEARS.map((y) => (
            <Link
              key={y}
              to="/trade-show-calendar/$year"
              params={{ year: String(y) }}
              className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-[oklch(0.78_0.13_300)] transition"
            >
              {y}
            </Link>
          ))}
        </div>
        <div className="mt-6 grid sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {CALENDAR_MONTHS.map((m) => (
            <Link
              key={`${m.year}-${m.month}`}
              to="/trade-show-calendar/$year/$month"
              params={{ year: String(m.year), month: m.month }}
              className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm hover:border-[oklch(0.78_0.13_300)]/60 transition"
            >
              <span className="text-white/85">
                {monthLabel(m.month)} {m.year}
              </span>
              <span className="text-xs text-white/40">{m.count}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Full list" title="Every upcoming edition">
        <div className="space-y-10">
          {Array.from(grouped.entries()).map(([key, list]) => {
            const [year, month] = key.split("-");
            return (
              <div key={key}>
                <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                  <h2 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight">
                    {monthLabel(month)} {year}
                  </h2>
                  <Link
                    to="/trade-show-calendar/$year/$month"
                    params={{ year, month }}
                    className="text-xs text-[oklch(0.78_0.13_300)] hover:underline"
                  >
                    Month page →
                  </Link>
                </div>
                <ul className="divide-y divide-white/[0.07]">
                  {list.map((o) => {
                    const v = getVenue(o.show.venueSlug);
                    const d = daysUntil(o);
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
                          <span className="text-xs text-white/35 ml-auto">
                            {d > 0 ? `${d} days out` : "in progress"}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <FAQBlock items={FAQS} title="Planning against these dates" />
      <DesignCtaBand source="page" />
      <CTABand heading="Pick your show — we'll price the booth" />
    </PageLayout>
  );
}
