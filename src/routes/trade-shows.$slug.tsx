import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import {
  getHub,
  showHref,
  cityPageHref,
  venuePageHref,
  DIRECTORY_HUBS,
  type DirectoryHub,
} from "@/lib/show-directory";
import { getVenue } from "@/data/venues";
import { nextOccurrence, formatRange, occurrencesFor, isoDate } from "@/lib/show-calendar";
import { robotsMeta, noindexMeta, absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";
import type { Show } from "@/data/shows";

export const Route = createFileRoute("/trade-shows/$slug")({
  loader: ({ params }): DirectoryHub => {
    const hub = getHub(params.slug);
    if (!hub) throw notFound();
    return hub;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Trade shows" }, ...noindexMeta()] };
    const hub = loaderData;
    const url = absUrl(`/trade-shows/${hub.slug}`);
    return {
      meta: [
        { title: hub.metaTitle },
        { name: "description", content: hub.metaDesc },
        ...robotsMeta(),
        { property: "og:title", content: hub.metaTitle },
        { property: "og:description", content: hub.metaDesc },
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
            name: hub.metaTitle,
            description: hub.metaDesc,
            url,
            isPartOf: { "@type": "WebSite", name: "Traction X", url: SITE.url },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: hub.shows.length,
              itemListElement: hub.shows.slice(0, 60).map((s, i) => {
                const occ = nextOccurrence(s);
                return {
                  "@type": "ListItem",
                  position: i + 1,
                  item: {
                    "@type": "Event",
                    name: s.name,
                    url: absUrl(showHref(s)),
                    eventStatus: "https://schema.org/EventScheduled",
                    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                    ...(occ
                      ? { startDate: isoDate(occ.start), endDate: isoDate(occ.end) }
                      : {}),
                    location: {
                      "@type": "Place",
                      name: getVenue(s.venueSlug)?.name ?? s.city,
                      address: {
                        "@type": "PostalAddress",
                        addressLocality: s.city,
                        addressRegion: s.state,
                        addressCountry: s.country,
                      },
                    },
                  },
                };
              }),
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
              { "@type": "ListItem", position: 2, name: "Trade shows", item: absUrl("/trade-shows") },
              { "@type": "ListItem", position: 3, name: hub.h1, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqsFor(loaderData).map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: HubPage,
  notFoundComponent: HubNotFound,
});

function faqsFor(hub: DirectoryHub): { q: string; a: string }[] {
  const scope =
    hub.kind === "city"
      ? hub.cityName
      : hub.kind === "sector"
        ? hub.sector?.label.toLowerCase()
        : hub.kind === "combo"
          ? `${hub.sector?.label.toLowerCase()} shows in ${hub.cityName}`
          : hub.country === "CA"
            ? "Canada"
            : "the United States";

  return [
    {
      q: `How much does a booth rental cost for these shows?`,
      a: `A 10×10 custom rental typically starts around $12,500, a 10×20 around $17,500 and a 20×20 island around $30,000 — all inclusive of design, fabrication, graphics, install and dismantle. Tiering, hanging structure, AV and storage move the number, so we quote against your specific show and footprint rather than a catalogue price.`,
    },
    {
      q: `How far ahead should we book for ${scope}?`,
      a: `120 days out is the comfortable window for a custom build, 75 days is workable with a tighter design cycle, and 45 days is the practical floor before rush fabrication and expedited freight start adding cost. Shows with hanging signs or heavy rigging need engineering drawings approved by the general contractor roughly 60 days out.`,
    },
    {
      q: `Do you handle install and dismantle at these venues?`,
      a: `Yes. Install and dismantle labour is included in every quote, and we work within each venue's labour jurisdiction — Teamsters, IATSE, Carpenters or the local equivalent — rather than leaving you to sort it out with the general contractor on move-in day.`,
    },
    {
      q: `Can we reuse the same booth across multiple shows on this list?`,
      a: `That is the point of renting from a custom shop. We store the structure between shows, re-skin graphics for each event and re-issue it to the next city, which usually lands well under the cost of a second build.`,
    },
  ];
}

function ShowRow({ show }: { show: Show }) {
  const occ = nextOccurrence(show);
  const venue = getVenue(show.venueSlug);
  return (
    <Link
      to={showHref(show)}
      className="block rounded-2xl border border-white/10 p-5 hover:border-[oklch(0.78_0.13_300)]/60 hover:bg-white/[0.02] transition"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-semibold">{show.name}</h3>
        <span className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)]">
          {occ ? formatRange(occ) : show.cadence}
        </span>
      </div>
      <p className="mt-1.5 text-sm text-white/55">
        {venue?.shortName ?? show.city} · {show.city}, {show.state} · {show.industry}
      </p>
      <p className="mt-3 text-sm text-white/70 line-clamp-2">{show.intro}</p>
      <p className="mt-3 text-xs text-white/45">
        Attendance {show.attendance} · {show.bookingWindow}
      </p>
    </Link>
  );
}

function HubPage() {
  const hub = Route.useLoaderData();
  const faqs = faqsFor(hub);

  const venues = Array.from(new Set(hub.shows.map((s) => s.venueSlug)))
    .map((v) => getVenue(v))
    .filter(Boolean);
  const cities = Array.from(new Set(hub.shows.map((s) => s.citySlug)));
  const dated = hub.shows
    .map((s) => ({ show: s, occ: nextOccurrence(s) }))
    .filter((x) => x.occ)
    .sort((a, b) => a.occ!.start.getTime() - b.occ!.start.getTime());

  const related = DIRECTORY_HUBS.filter(
    (h) =>
      h.slug !== hub.slug &&
      (h.kind === hub.kind ||
        (hub.citySlug && h.citySlug === hub.citySlug) ||
        (hub.sector && h.sector?.slug === hub.sector.slug)),
  ).slice(0, 12);

  return (
    <PageLayout>
      <PageHero eyebrow={hub.eyebrow} title={hub.h1} intro={hub.intro} />

      <Section eyebrow="At a glance" title="What this directory covers" bg="muted">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { k: "Shows tracked", v: String(hub.shows.length) },
            { k: "Cities", v: String(cities.length) },
            { k: "Venues", v: String(venues.length) },
            { k: "Dated editions", v: String(dated.length) },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-white/10 p-5">
              <div className="font-display text-3xl font-bold text-[oklch(0.78_0.13_300)]">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/50">{s.k}</div>
            </div>
          ))}
        </div>

        {dated.length > 0 && (
          <div className="mt-8">
            <h3 className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-3">
              Next dates on this list
            </h3>
            <div className="flex flex-wrap gap-2">
              {dated.slice(0, 10).map(({ show, occ }) => (
                <Link
                  key={show.slug}
                  to={showHref(show)}
                  className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/70 hover:border-[oklch(0.78_0.13_300)] hover:text-white transition"
                >
                  {show.shortName} · {formatRange(occ!)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section eyebrow="The list" title={`All ${hub.shows.length} shows`}>
        <div className="grid md:grid-cols-2 gap-4">
          {hub.shows.map((s) => (
            <ShowRow key={s.slug} show={s} />
          ))}
        </div>
      </Section>

      {venues.length > 0 && (
        <Section eyebrow="Venues" title="Where these shows load in" bg="muted">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {venues.map((v) => {
              const href = venuePageHref(v!.slug);
              const inner = (
                <>
                  <div className="text-sm text-white/85">{v!.name}</div>
                  <div className="mt-1 text-xs text-white/45">{v!.union}</div>
                </>
              );
              return href ? (
                <Link
                  key={v!.slug}
                  to={href}
                  className="rounded-xl border border-white/10 p-4 hover:border-[oklch(0.78_0.13_300)]/60 transition"
                >
                  {inner}
                </Link>
              ) : (
                <div key={v!.slug} className="rounded-xl border border-white/10 p-4">
                  {inner}
                </div>
              );
            })}
          </div>
        </Section>
      )}

      <Section
        eyebrow="Why exhibitors rent from us"
        title="One team from concept to crate"
        intro="We are the manufacturer, not a broker reselling someone else's inventory. Design, fabrication, graphics, freight, install and dismantle sit under one contract and one project manager."
      >
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              t: "Custom, not catalogue",
              d: "Every rental is built to your footprint and brand — not pulled from a modular kit and re-skinned. You get 3D design before you commit a dollar.",
            },
            {
              t: "Labour priced in",
              d: "Install and dismantle labour is in the quote from day one, matched to the venue's jurisdiction so there is no move-in day surprise.",
            },
            {
              t: "Store and re-issue",
              d: "Exhibit at several of these shows a year and we warehouse the structure between them, re-skinning graphics per event instead of rebuilding.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 p-6">
              <h3 className="font-display text-lg font-semibold">{c.t}</h3>
              <p className="mt-2.5 text-sm text-white/70 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <FAQBlock items={faqs} title={`${hub.eyebrow} — common questions`} />

      {related.length > 0 && (
        <Section eyebrow="Related" title="Keep browsing the directory" bg="muted">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {related.map((h) => (
              <Link
                key={h.slug}
                to="/trade-shows/$slug"
                params={{ slug: h.slug }}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80 hover:border-[oklch(0.78_0.13_300)]/60 transition"
              >
                {h.kind === "sector"
                  ? h.sector?.label
                  : h.kind === "city"
                    ? `Trade shows in ${h.cityName}`
                    : h.kind === "combo"
                      ? `${h.sector?.label} in ${h.cityName}`
                      : h.h1}
                <span className="block text-xs text-white/40 mt-1">{h.shows.length} shows</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link to="/trade-shows" className="text-[oklch(0.78_0.13_300)] hover:underline">
              Full directory →
            </Link>
            <Link to="/trade-show-calendar" className="text-[oklch(0.78_0.13_300)] hover:underline">
              Trade show calendar →
            </Link>
            {hub.citySlug && cityPageHref(hub.citySlug) && (
              <Link to={cityPageHref(hub.citySlug)!} className="text-[oklch(0.78_0.13_300)] hover:underline">
                Booth rentals in {hub.cityName} →
              </Link>
            )}
          </div>
        </Section>
      )}

      <DesignCtaBand source="page" />
      <CTABand heading="Get pricing for any show on this list" />
    </PageLayout>
  );
}

function HubNotFound() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Trade show directory"
        title="That directory page doesn't exist"
        intro="Browse the full trade show directory instead — by city, sector or country."
      />
      <Section>
        <Link to="/trade-shows" className="text-[oklch(0.78_0.13_300)] hover:underline">
          Go to the trade show directory →
        </Link>
      </Section>
    </PageLayout>
  );
}
