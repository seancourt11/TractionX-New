import { useMarkShowVisit } from "@/lib/show-context";
import { findCityByLabel, useMarkCityVisit } from "@/lib/city-context";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DesignCtaBand, useCta } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { RentalCatalog } from "@/components/RentalCatalog";
import { VenuePriceBands } from "@/components/VenuePriceBands";
import { LandedCostBand } from "@/components/LandedCostBand";
import { ShowCountdown } from "@/components/ShowCountdown";
import { marketTierForCity, priceBandFaq, landedCostFaq } from "@/lib/market-tier";
import { ShowFloorPlanBlock } from "@/components/ShowFloorPlanBlock";
import { CaseProof } from "@/components/CaseProof";
import { SHOWS, getShow, showUrlSlug, type Show } from "@/data/shows";
import { getVenue, venueUrlSlug } from "@/data/venues";
import { buildShowLongform } from "@/data/shows-longform";
import { eventForShow, deadlinesFor, currentDeadline, formatDeadline } from "@/data/events";
import { getShowHero } from "@/data/hero-images";
import { getShowProof } from "@/data/page-proof";
import { ProofBlock, LastReviewed } from "@/components/UniqueProof";
import { robotsMeta, noindexMeta } from "@/lib/seo";

import { SITE } from "@/lib/site";
import { RelatedDirectoryLinks } from "@/components/RelatedDirectoryLinks";
import { nextOccurrence, isoDate } from "@/lib/show-calendar";

export const Route = createFileRoute("/shows/$slug")({
  loader: ({ params }): Show => {
    const s = getShow(params.slug);
    if (!s) throw notFound();
    if (params.slug !== showUrlSlug(s.slug)) {
      throw redirect({ to: "/shows/$slug", params: { slug: showUrlSlug(s.slug) }, statusCode: 301 });
    }
    return s;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return { meta: [{ title: "Show" }, ...noindexMeta()] };
    const s = loaderData;
    const v = getVenue(s.venueSlug);
    const lf = buildShowLongform(s, v);
    const url = `${SITE.url}/shows/${showUrlSlug(loaderData.slug)}`;
    const heroUrl = `${SITE.url}${getShowHero(s.slug, s.venueSlug).src}`;
    const proof = getShowProof(s.slug);
    return {
      meta: [
        { title: s.metaTitle },
        { name: "description", content: s.metaDesc },
        ...robotsMeta(),
        { property: "og:title", content: s.metaTitle },
        { property: "og:description", content: s.metaDesc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: heroUrl },
        { name: "twitter:image", content: heroUrl },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],

      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: s.name,
            ...(() => {
              const occ = nextOccurrence(s);
              return occ
                ? { startDate: isoDate(occ.start), endDate: isoDate(occ.end) }
                : {};
            })(),
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: v
              ? {
                  "@type": "Place",
                  name: v.name,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: v.address,
                    addressLocality: v.city,
                    addressRegion: v.stateAbbr,
                    postalCode: v.postalCode,
                    addressCountry: v.country,
                  },
                }
              : {
                  "@type": "Place",
                  name: s.city,
                  address: `${s.city}, ${s.state}`,
                },
            description: s.metaDesc,
            url,
            organizer: { "@type": "Organization", name: "Traction X", url: SITE.url },
            ...(proof.sameAs && proof.sameAs.length ? { sameAs: proof.sameAs } : s.website ? { sameAs: [s.website] } : {}),
            offers: {
              "@type": "Offer",
              url: `${SITE.url}/contact`,
              availability: "https://schema.org/InStock",
              category: "Exhibit rental",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              priceBandFaq(s.shortName, s.city, marketTierForCity(s.city)),
              landedCostFaq(s.shortName, s.city, marketTierForCity(s.city)),
              ...lf.faqs,
            ].map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Shows", item: `${SITE.url}/shows` },
              { "@type": "ListItem", position: 3, name: s.shortName, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["#tldr", "h1"],
            },
            url,
            ...(proof.lastReviewed ? { dateModified: proof.lastReviewed } : {}),
          }),
        },
      ],
    };
  },
  component: Page,
  notFoundComponent: () => (
    <div className="min-h-dvh bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl">Show not found</h1>
        <Link to="/shows" className="text-purple-300 underline">Browse all shows</Link>
      </div>
    </div>
  ),
});

function Page() {
  const { openQuote } = useCta();
  const s = Route.useLoaderData() as Show;
  useMarkShowVisit(s.slug);
  // A show visit is a city signal too — the rest of the site adopts that market.
  useMarkCityVisit(findCityByLabel(s.city)?.slug ?? "");
  const venue = getVenue(s.venueSlug);

  const lf = buildShowLongform(s, venue);
  const hero = getShowHero(s.slug, s.venueSlug);
  const relatedShows = SHOWS.filter((x) => x.slug !== s.slug && x.venueSlug === s.venueSlug).slice(0, 3);
  const proof = getShowProof(s.slug);

  return (
    <div className="min-h-dvh bg-black text-white font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={hero.src}
            alt={`${s.name} exhibit floor in ${s.city}, ${s.state}`}
            width={1600}
            height={900}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16">
          <Link to="/shows" className="text-xs text-purple-300 hover:text-purple-200 uppercase tracking-widest">
            ← All shows
          </Link>
          <p className="mt-4 text-xs uppercase tracking-widest text-purple-300">{s.industry}</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">{s.name}</h1>
          <p className="mt-5 text-lg text-white/80 max-w-3xl">{s.hero}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openQuote({ source: `show-${s.slug}` })}
              className="inline-flex items-center px-5 py-3 rounded-full bg-purple-400 text-black font-semibold hover:bg-purple-300"
            >
              Quick quote for {s.shortName}
            </button>
            <a
              href="tel:+17824092527"
              className="inline-flex items-center px-5 py-3 rounded-full border border-white/20 hover:border-white/60"
            >
              Call +1 (782) 409-2527
            </a>
          </div>
        </div>
      </section>


      {/* TL;DR Quick Answer */}
      <section id="tldr" className="max-w-7xl mx-auto px-6 pb-12">
        <div className="border border-purple-400/40 bg-purple-400/[0.04] rounded-2xl p-6 md:p-8">
          <div className="text-xs uppercase tracking-widest text-purple-300">Quick answer</div>
          <p className="mt-3 text-lg md:text-xl text-white/90 leading-relaxed">{lf.tldr}</p>
        </div>
      </section>

      <ProofBlock proof={proof} subject={s.name} title={`What we know about ${s.shortName}`} />

      <MeetUsBlock showSlug={s.slug} />





      {/* Quick facts */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-4 gap-4">
          <Fact label="Cadence" value={s.cadence} />
          <Fact label="Attendance" value={s.attendance} />
          <Fact label="Audience" value={s.audience} />
          <Fact label="Venue" value={venue?.name ?? s.city} />
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="max-w-3xl">
          <p className="text-white/80 text-lg leading-relaxed">{s.intro}</p>
        </div>
      </section>

      {/* Project photography */}
      <ProjectShowcase seed={s.slug} locationLabel={s.shortName} heading={`Booths we've built for ${s.shortName}-scale exhibitors`} intro={`Real Traction X exhibits — designed, fabricated, and installed in-house. The same custom build and custom rental programs are available for ${s.shortName}.`} />

      {/* Why it matters */}
      <Longform title={`Why ${s.shortName} matters`} body={lf.whyItMatters} />

      {/* Who exhibits / attends */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Who exhibits and who attends</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <TwoCol title="Who exhibits" items={lf.whoExhibits} />
          <TwoCol title="Who attends" items={lf.whoAttends} />
        </div>
      </section>

      {/* Hall strategy */}
      <Longform title={`Hall layout and floor strategy at ${s.shortName}`} body={lf.hallStrategy} />

      {/* Move-in / move-out */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Move-in and move-out logistics</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Card label="Move-in">{lf.moveIn}</Card>
          <Card label="Move-out">{lf.moveOut}</Card>
        </div>
      </section>

      {/* Booking window callout */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="border border-purple-400/40 bg-purple-400/[0.04] rounded-2xl p-6 md:p-8">
          <div className="text-xs uppercase tracking-widest text-purple-300">Booking window</div>
          <p className="mt-3 text-xl md:text-2xl">{s.bookingWindow}</p>
        </div>
      </section>

      {/* Cost factors */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">
          What does a {s.shortName} booth actually cost?
        </h2>
        <p className="mt-3 text-white/70 max-w-3xl">
          A rough working budget for {s.shortName}, based on Traction X projects delivered over the last several show cycles. Precise pricing is quoted against your specific footprint, materials, and AV scope.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-widest text-purple-300">
              <tr>
                <th className="px-5 py-3 font-medium">Line item</th>
                <th className="px-5 py-3 font-medium">Typical range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {lf.costFactors.map((c) => (
                <tr key={c.label} className="text-white/80">
                  <td className="px-5 py-4 align-top font-medium text-white/90">{c.label}</td>
                  <td className="px-5 py-4 align-top">{c.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5">
          <Link
            to="/booth-cost-calculator"
            className="inline-flex px-5 py-3 rounded-full border border-purple-400/40 text-purple-200 hover:bg-purple-400/10"
          >
            Try the booth cost calculator →
          </Link>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Work-back timeline for {s.shortName}
        </h2>
        <div className="mt-6 divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {lf.timeline.map((t, i) => (
            <div key={i} className="grid md:grid-cols-[220px_1fr] px-5 py-4 hover:bg-white/[0.02]">
              <div className="text-purple-300 uppercase tracking-widest text-xs md:text-sm">{t.weeks}</div>
              <div className="text-white/85 mt-1 md:mt-0">{t.milestone}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Booth sizes */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Common booth sizes at {s.shortName}</h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {s.boothSizes.map((b) => (
            <div key={b} className="border border-white/10 rounded-xl px-4 py-3 text-sm">
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* Design principles */}
      <BulletSection title={`Booth design principles for ${s.shortName}`} items={lf.designPrinciples} />

      {/* Common mistakes */}
      <BulletSection
        title={`Common ${s.shortName} exhibitor mistakes (and how we avoid them)`}
        items={lf.commonMistakes}
      />

      {/* ROI playbook */}
      <BulletSection title={`ROI and lead-capture playbook for ${s.shortName}`} items={lf.roiPlaybook} />

      {/* Field tips */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Traction X field tips</h2>
        <ul className="mt-6 space-y-3">
          {s.tips.map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-purple-300">→</span>
              <span className="text-white/80">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Sustainability */}
      <Longform title="Sustainability and reuse" body={lf.sustainability} />

      {/* Local partners */}
      <Longform title={`Local partners and jurisdictions at ${s.shortName}`} body={lf.localPartners} />

      {/* Venue */}
      {venue && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Held at {venue.name}</h2>
          <p className="mt-3 text-white/70 max-w-2xl">{venue.intro}</p>
          <div className="mt-5">
            <Link
              to="/venues/$slug"
              params={{ slug: venueUrlSlug(venue.slug) }}
              className="inline-flex px-5 py-3 rounded-full border border-purple-400/40 text-purple-200 hover:bg-purple-400/10"
            >
              Venue guide: {venue.shortName} →
            </Link>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Frequently asked questions about {s.shortName}</h2>
        <div className="mt-6">
          <FaqAccordion faqs={[
            priceBandFaq(s.shortName, s.city, marketTierForCity(s.city)),
            landedCostFaq(s.shortName, s.city, marketTierForCity(s.city)),
            ...lf.faqs,
          ]} />
        </div>
      </section>

      <CaseProof
        context={{ show: s.shortName, city: s.city, industry: s.industry }}
        seed={s.slug}
        heading={`Exhibits we've built for shows like ${s.shortName}`}
      />

      <VenuePriceBands place={s.shortName} city={s.city} source={`show-${s.slug}`} />

      <LandedCostBand place={s.shortName} city={s.city} source={`show-${s.slug}`} />

      <ShowCountdown place={s.shortName} city={s.city} showDate={s.startDate} source={`show-${s.slug}`} />

      {/* Full rental catalogue, pre-filtered to this show's city */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <RentalCatalog
          initialCity={s.city}
          heading={`Custom booth rentals for ${s.shortName}`}
          intro={`Every design below is a 100% custom rental we can deliver and install for ${s.name} in ${s.city}. Toggle a footprint, then customize the layout, millwork, AV and lighting — install and dismantle labour is included.`}
        />
      </section>

      <ShowFloorPlanBlock show={s} />


      {/* Quote */}
      <section id="quote" className="max-w-7xl mx-auto px-6 pb-20">
        <QuoteForm
          heading={`Get a quote for ${s.shortName}`}
          intro={`Tell us your footprint and design direction. We'll return a costed BOM with venue-specific labour and drayage built in.`}
          defaultCity={s.city}
        />
      </section>

      {/* Related */}
      {relatedShows.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Also at {venue?.shortName ?? s.city}</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {relatedShows.map((o) => (
              <Link
                key={o.slug}
                to="/shows/$slug"
                params={{ slug: showUrlSlug(o.slug) }}
                className="block border border-white/10 rounded-xl p-5 hover:border-purple-400/60 hover:bg-white/[0.02] transition"
              >
                <div className="text-xs text-purple-300 uppercase tracking-widest">{o.industry}</div>
                <div className="mt-1 font-semibold">{o.name}</div>
                <div className="mt-2 text-sm text-white/60">{o.cadence}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 pb-16 text-sm text-white/60">
        Browsing options for {s.shortName}? See the{" "}
        <Link to="/rent-a-booth" className="text-purple-300 hover:underline">
          full custom rental catalogue
        </Link>{" "}
        or the{" "}
        <Link to="/gallery" search={{ size: undefined }} className="text-purple-300 hover:underline">
          project gallery
        </Link>
        .
      </section>

      <LastReviewed date={proof.lastReviewed} />
      <DesignCtaBand source="page" />
      <RelatedDirectoryLinks show={s} />
      <SiteFooter />
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 rounded-xl p-5">
      <div className="text-xs uppercase tracking-widest text-purple-300">{label}</div>
      <div className="mt-2 text-white/90 text-sm">{value}</div>
    </div>
  );
}

/** "Meet us at this show" — booking deadlines worked back from show day. */
function MeetUsBlock({ showSlug }: { showSlug: string }) {
  const e = eventForShow(showSlug);
  if (!e) return null;
  const dl = deadlinesFor(e);
  const now = currentDeadline(e);
  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="rounded-2xl border border-purple-400/30 bg-white/[0.02] p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-purple-300">Meet us at this show</div>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold">
          {e.edition} · {e.dateLabel}
        </h2>
        <p className="mt-2 text-white/60 text-sm">
          {e.venue} · {e.city}
        </p>
        <p className="mt-4 text-white/80 leading-relaxed max-w-3xl">{e.localLine}</p>
        <div className="mt-6 grid sm:grid-cols-3 gap-4 max-w-3xl">
          <DeadlineCard label="Leading activations" value={formatDeadline(dl.leading)} note="120 days out" />
          <DeadlineCard label="Custom booth rentals" value={formatDeadline(dl.custom)} note="75 days out" />
          <DeadlineCard label="Rescue-build cutoff" value={formatDeadline(dl.rescueCutoff)} note="45 days out" />

        </div>
        <p className="mt-5 text-purple-200 font-semibold text-sm">{now.line}</p>
        <div className="mt-5">
          <Link to="/events" className="text-purple-300 hover:underline text-sm">
            See every upcoming show and deadline →
          </Link>
        </div>
      </div>
    </section>
  );
}

function DeadlineCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border border-white/10 p-4">
      <div className="text-[11px] uppercase tracking-widest text-white/45">{label}</div>
      <div className="mt-1.5 text-white/90 font-semibold">{value}</div>
      <div className="mt-0.5 text-xs text-white/50">{note}</div>
    </div>
  );
}

function Longform({ title, body }: { title: string; body: string }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
      <p className="mt-4 text-white/80 leading-relaxed max-w-3xl">{body}</p>
    </section>
  );
}

function BulletSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
      <ul className="mt-6 space-y-3 max-w-3xl">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-purple-300 mt-1">→</span>
            <span className="text-white/80 leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TwoCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-white/10 rounded-2xl p-6">
      <div className="text-xs uppercase tracking-widest text-purple-300">{title}</div>
      <ul className="mt-4 space-y-2">
        {items.map((t, i) => (
          <li key={i} className="text-white/85 flex gap-2">
            <span className="text-purple-300">•</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-white/10 rounded-2xl p-6">
      <div className="text-xs uppercase tracking-widest text-purple-300">{label}</div>
      <p className="mt-3 text-white/80 leading-relaxed">{children}</p>
    </div>
  );
}
