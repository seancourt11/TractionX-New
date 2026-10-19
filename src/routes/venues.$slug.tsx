import { useMarkCityVisit } from "@/lib/city-context";
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
import { CaseProof } from "@/components/CaseProof";
import { VENUES, getVenue, venueUrlSlug, type Venue } from "@/data/venues";
import { SHOWS, showUrlSlug } from "@/data/shows";
import { buildVenueLongform } from "@/data/venues-longform";
import { getVenueHero } from "@/data/hero-images";
import { getVenueProof } from "@/data/page-proof";
import { ProofBlock, LastReviewed } from "@/components/UniqueProof";
import { getCity, cityUrlSlug } from "@/data/cities";
import { robotsMeta, noindexMeta } from "@/lib/seo";

import { SITE } from "@/lib/site";

export const Route = createFileRoute("/venues/$slug")({
  loader: ({ params }): Venue => {
    const v = getVenue(params.slug);
    if (!v) throw notFound();
    if (params.slug !== venueUrlSlug(v.slug)) {
      throw redirect({ to: "/venues/$slug", params: { slug: venueUrlSlug(v.slug) }, statusCode: 301 });
    }
    return v;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return { meta: [{ title: "Venue" }, ...noindexMeta()] };
    const v = loaderData;
    const lf = buildVenueLongform(v);
    const url = `${SITE.url}/venues/${venueUrlSlug(loaderData.slug)}`;
    const heroUrl = `${SITE.url}${getVenueHero(v.slug).src}`;
    const proof = getVenueProof(v.slug);
    return {
      meta: [
        { title: v.metaTitle },
        { name: "description", content: v.metaDesc },
        ...robotsMeta(),
        { property: "og:title", content: v.metaTitle },
        { property: "og:description", content: v.metaDesc },
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
            geo: {
              "@type": "GeoCoordinates",
              latitude: v.latitude,
              longitude: v.longitude,
            },
            containedInPlace: { "@type": "City", name: v.city },
            ...(proof.sameAs && proof.sameAs.length ? { sameAs: proof.sameAs } : {}),
            amenityFeature: [
              { "@type": "LocationFeatureSpecification", name: "Exhibit space", value: v.size },
              { "@type": "LocationFeatureSpecification", name: "General contractor", value: v.drayage },
              { "@type": "LocationFeatureSpecification", name: "Labor", value: v.union },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              priceBandFaq(v.shortName, v.city, marketTierForCity(v.city, v.union)),
              landedCostFaq(v.shortName, v.city, marketTierForCity(v.city, v.union)),
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
              { "@type": "ListItem", position: 2, name: "Venues", item: `${SITE.url}/venues` },
              { "@type": "ListItem", position: 3, name: v.shortName, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
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
        <h1 className="text-2xl">Venue not found</h1>
        <Link to="/venues" className="text-purple-300 underline">Browse all venues</Link>
      </div>
    </div>
  ),
});

function Page() {
  const { openQuote } = useCta();
  const v = Route.useLoaderData() as Venue;
  useMarkCityVisit(v.citySlug as never);

  const lf = buildVenueLongform(v);
  const hero = getVenueHero(v.slug);
  const venueShows = SHOWS.filter((s) => s.venueSlug === v.slug);
  const otherVenues = VENUES.filter((x) => x.slug !== v.slug).slice(0, 6);
  const proof = getVenueProof(v.slug);
  const city = getCity(v.citySlug);


  return (
    <div className="min-h-dvh bg-black text-white font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={hero.src}
            alt={`${v.name} in ${v.city}, ${v.stateAbbr}`}
            width={1600}
            height={900}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16">
          <Link to="/venues" className="text-xs text-purple-300 hover:text-purple-200 uppercase tracking-widest">
            ← All venues
          </Link>
          <p className="mt-4 text-xs uppercase tracking-widest text-purple-300">
            {v.city}, {v.stateAbbr} · {v.country === "US" ? "United States" : "Canada"}
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">{v.name}</h1>
          <p className="mt-5 text-lg text-white/80 max-w-3xl">{v.hero}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openQuote({ source: `venue-${v.slug}` })}
              className="inline-flex items-center px-5 py-3 rounded-full bg-purple-400 text-black font-semibold hover:bg-purple-300"
            >
              Get a quote for {v.shortName}
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


      {/* TL;DR */}
      <section id="tldr" className="max-w-7xl mx-auto px-6 pb-12">
        <div className="border border-purple-400/40 bg-purple-400/[0.04] rounded-2xl p-6 md:p-8">
          <div className="text-xs uppercase tracking-widest text-purple-300">Quick answer</div>
          <p className="mt-3 text-lg md:text-xl text-white/90 leading-relaxed">{lf.tldr}</p>
        </div>
      </section>

      <ProofBlock proof={proof} subject={v.shortName} title={`What we know about ${v.shortName}`} />

      {/* Quick facts */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-4 gap-4">
          <Fact label="Size" value={v.size} />
          <Fact label="Halls" value={v.halls} />
          <Fact label="Labour" value={v.union} />
          <Fact label="Drayage" value={v.drayage} />
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="max-w-3xl">
          <p className="text-white/80 text-lg leading-relaxed">{v.intro}</p>
        </div>
      </section>

      {/* Project photography */}
      <ProjectShowcase seed={v.slug} locationLabel={v.shortName} />


      {/* Overview */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">About {v.shortName}</h2>
        <div className="mt-6 space-y-4 max-w-3xl">
          {lf.overview.map((p, i) => (
            <p key={i} className="text-white/80 leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* Hall strategy */}
      <Longform title={`Hall layout and floor strategy at ${v.shortName}`} body={lf.hallStrategy} />

      {/* Loading docks */}
      <Longform title="Loading docks, marshalling, and freight" body={lf.loadingDocks} />

      {/* Power / data table */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Power, data, rigging, and show services</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-widest text-purple-300">
              <tr>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">How it works at {v.shortName}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {lf.powerData.map((row) => (
                <tr key={row.label} className="text-white/80">
                  <td className="px-5 py-4 align-top font-medium text-white/90">{row.label}</td>
                  <td className="px-5 py-4 align-top">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rigging rules */}
      <BulletSection title={`Rigging & hanging sign rules at ${v.shortName}`} items={lf.riggingRules} />

      {/* Union rules */}
      <BulletSection title={`Union jurisdictions & labor at ${v.shortName}`} items={lf.unionRules} />

      {/* Logistics detail (existing) */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Venue logistics</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {v.logistics.map((l) => (
            <div key={l.label} className="border border-white/10 rounded-xl p-5">
              <div className="text-xs uppercase tracking-widest text-purple-300">{l.label}</div>
              <p className="mt-2 text-white/80">{l.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accessibility */}
      <Longform title="Accessibility" body={lf.accessibility} />

      {/* Sustainability */}
      <Longform title="Sustainability and booth reuse" body={lf.sustainability} />

      {/* Arrival guide */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Arrival, hotels, and freight</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {lf.arrivalGuide.map((a) => (
            <div key={a.from} className="border border-white/10 rounded-xl p-5">
              <div className="text-xs uppercase tracking-widest text-purple-300">{a.from}</div>
              <p className="mt-2 text-white/80 leading-relaxed">{a.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Weather */}
      <Longform title={`Weather and seasonality for ${v.city}`} body={lf.weatherSeason} />

      {/* Major shows */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Major shows at {v.shortName}</h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {v.majorShows.map((s) => (
            <div key={s} className="border border-white/10 rounded-xl px-4 py-3 text-sm">
              {s}
            </div>
          ))}
        </div>
        {venueShows.length > 0 && (
          <div className="mt-8">
            <p className="text-sm text-white/60 mb-3">Deep-dive show guides:</p>
            <div className="flex flex-wrap gap-2">
              {venueShows.map((s) => (
                <Link
                  key={s.slug}
                  to="/shows/$slug"
                  params={{ slug: showUrlSlug(s.slug) }}
                  className="inline-flex px-4 py-2 rounded-full border border-purple-400/40 text-purple-200 text-sm hover:bg-purple-400/10"
                >
                  {s.name} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Field tips (existing) */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Traction X field tips</h2>
        <ul className="mt-6 space-y-3">
          {v.tips.map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-purple-300">→</span>
              <span className="text-white/80">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Hotels */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Nearby hotels</h2>
        <p className="mt-2 text-white/60 text-sm">Where our PMs typically block rooms for install crews.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {v.nearbyHotels.map((h) => (
            <span key={h} className="px-3 py-1.5 text-sm border border-white/10 rounded-full text-white/80">
              {h}
            </span>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Frequently asked questions about {v.shortName}</h2>
        <div className="mt-6">
          <FaqAccordion faqs={[
            priceBandFaq(v.shortName, v.city, marketTierForCity(v.city, v.union)),
            landedCostFaq(v.shortName, v.city, marketTierForCity(v.city, v.union)),
            ...lf.faqs,
          ]} />
        </div>
      </section>

      <CaseProof
        context={{ city: v.city, show: v.shortName }}
        seed={v.slug}
        heading={`Exhibits we’ve built in ${v.city}`}
      />

      <VenuePriceBands place={v.shortName} city={v.city} unionNote={v.union} source={`venue-${v.slug}`} />

      <LandedCostBand place={v.shortName} city={v.city} unionNote={v.union} source={`venue-${v.slug}`} />

      <ShowCountdown place={v.shortName} city={v.city} source={`venue-${v.slug}`} />

      {/* Full rental catalogue, pre-filtered to this venue's city */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <RentalCatalog
          initialCity={v.city}
          heading={`Custom booth rentals for ${v.shortName}`}
          intro={`Every design below is a 100% custom rental we can deliver and install at ${v.name}. Toggle a footprint, then customize the layout, millwork, AV and lighting around your goals — install and dismantle labour is included.`}
        />
      </section>

      {/* Quote */}
      <section id="quote" className="max-w-7xl mx-auto px-6 pb-20">
        <QuoteForm
          heading={`Get a quote for ${v.shortName}`}
          intro={`Tell us your show, footprint, and target date. We'll send a costed BOM with venue-specific labour and drayage baked in.`}
          defaultCity={v.city}
        />
      </section>

      {/* Other venues */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-2xl md:text-3xl font-semibold">Other venues we work in</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {otherVenues.map((o) => (
            <Link
              key={o.slug}
              to="/venues/$slug"
              params={{ slug: venueUrlSlug(o.slug) }}
              className="block border border-white/10 rounded-xl p-5 hover:border-purple-400/60 hover:bg-white/[0.02] transition"
            >
              <div className="text-xs text-purple-300 uppercase tracking-widest">{o.city}</div>
              <div className="mt-1 font-semibold">{o.name}</div>
              <div className="mt-2 text-sm text-white/60">{o.size}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 text-sm text-white/60">
        Exhibiting at {v.shortName}? Browse the{" "}
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
