import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { RelatedDirectoryLinks } from "@/components/RelatedDirectoryLinks";
import { QuoteForm } from "@/components/QuoteForm";
import { DesignCtaBand } from "@/components/GlobalCta";
import { SITE } from "@/lib/site";
import { absUrl, robotsMeta, noindexMeta } from "@/lib/seo";
import { CITIES, getCity, cityUrlSlug, type City } from "@/data/cities";
import { VENUES, venueUrlSlug } from "@/data/venues";
import { SHOWS, showUrlSlug } from "@/data/shows";
import { getCityHero } from "@/data/hero-images";
import { getCityProof } from "@/data/page-proof";
import { ProofBlock, LastReviewed } from "@/components/UniqueProof";
import { RentalCatalog } from "@/components/RentalCatalog";
import { VenuePriceBands } from "@/components/VenuePriceBands";
import { LandedCostBand } from "@/components/LandedCostBand";
import { ShowCountdown } from "@/components/ShowCountdown";
import { marketTierForCity, priceBandFaq, landedCostFaq } from "@/lib/market-tier";
import { CaseProof } from "@/components/CaseProof";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { useMarkCityVisit } from "@/lib/city-context";

export const Route = createFileRoute("/city/$slug")({
  loader: ({ params }) => {
    const city = getCity(params.slug);
    if (!city) throw notFound();
    if (params.slug !== cityUrlSlug(city.slug)) {
      throw redirect({ to: "/city/$slug", params: { slug: cityUrlSlug(city.slug) }, statusCode: 301 });
    }
    return { city };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "City not found | Traction X" }, ...noindexMeta()],
      };
    }
    const c = loaderData.city;
    const canonical = absUrl(`/city/${cityUrlSlug(c.slug)}`);
    const heroUrl = absUrl(getCityHero(c.slug).src);
    const proof = getCityProof(c.slug);
    // Only city-specific questions carry FAQPage markup — the generic ones
    // live once on /faqs instead of being repeated across every city page.
    const schemaFaqs = buildLocalFAQs(c);
    return {
      meta: [
        { title: c.metaTitle },
        { name: "description", content: c.metaDesc },
        ...robotsMeta(),
        { property: "og:title", content: c.metaTitle },
        { property: "og:description", content: c.metaDesc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { property: "og:image", content: heroUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: c.metaTitle },
        { name: "twitter:description", content: c.metaDesc },
        { name: "twitter:image", content: heroUrl },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              // One real organization entity for Traction X. We are a
              // service-area business: no office is claimed in markets where
              // we do not have one, per Google's business-representation
              // guidelines. Local relevance is carried by `areaServed`.
              {
                "@type": "Organization",
                "@id": `${SITE.url}/#organization`,
                name: SITE.name,
                url: SITE.url,
                telephone: SITE.phone,
                email: SITE.email,
                ...(proof.sameAs && proof.sameAs.length ? { sameAs: proof.sameAs } : {}),
              },
              {
                "@type": "Service",
                "@id": canonical + "#service",
                name: `Custom Trade Show Booth Rentals — ${c.city}`,
                serviceType: "Trade show booth rental and exhibit design",
                image: heroUrl,
                areaServed: [
                  { "@type": "City", name: c.city },
                  ...c.neighborhoods.map((n) => ({ "@type": "Place", name: n })),
                ],
                provider: { "@id": `${SITE.url}/#organization` },
                description: c.metaDesc,
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  priceBandFaq(c.city, c.city, marketTierForCity(c.city), "in"),
                  landedCostFaq(c.city, c.city, marketTierForCity(c.city), "in"),
                  ...schemaFaqs,
                ].map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "WebPage",
                url: canonical,
                speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
                ...(proof.lastReviewed ? { dateModified: proof.lastReviewed } : {}),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: `${c.city} Custom Trade Show Booth Rentals`,
                    item: canonical,
                  },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: CityPage,
});

/** Venue and show pages that exist on this site for a given city. */
function cityEntities(c: City) {
  const venues = VENUES.filter((v) => v.citySlug === c.slug);
  const shows = SHOWS.filter((s) => s.citySlug === c.slug);
  return { venues, shows };
}

/**
 * City-specific FAQs only. Each answer is built from that market's own facts —
 * named venues, its labour jurisdictions, its neighbourhoods, its shows — so
 * no two city pages publish the same question/answer pair. Generic questions
 * (quote turnaround, modular vs custom) live once on /faqs.
 */
function buildLocalFAQs(c: City) {
  const { venues, shows } = cityEntities(c);
  const topVenue = c.venues[0]?.name ?? `the ${c.city} convention centre`;
  const proofFaqs = getCityProof(c.slug).faqs ?? [];

  const faqs = [
    {
      q: `Which ${c.city} venues does Traction X install at?`,
      a: `We deliver, install and dismantle at ${c.venues
        .map((v) => `${v.name} (${v.halls})`)
        .join(", ")}. Freight, labour, electrical and rigging are coordinated with the official general service contractor for each hall.`,
    },
    {
      q: `Who handles labour on the show floor in ${c.city}?`,
      a: `${c.unions}. We book every crew call against those work rules and keep a Traction X project manager on the floor each shift, which is what stops a booth from being red-tagged mid-install.`,
    },
    {
      q: `How far outside ${c.city} do you travel for installs?`,
      a: `Our ${c.city} coverage includes ${c.neighborhoods.join(", ")} — and any ${c.state} venue reachable inside a working day from the show site.`,
    },
    {
      q: `Which ${c.city} shows do you build for most often?`,
      a: `${c.shows.slice(0, 8).join(", ")}${c.shows.length > 8 ? " and others" : ""}. ${
        shows.length > 0
          ? `We publish detailed exhibitor guides for ${shows.slice(0, 3).map((s) => s.name).join(", ")}.`
          : ""
      }`.trim(),
    },
    {
      q: `How early should freight arrive for a ${c.city} show?`,
      a: `We target the advance warehouse for anything larger than an inline booth at ${topVenue}, shipping one to two weeks ahead of move-in and taking a scheduled dock window. Direct-to-show works for small inlines but risks long dock queues during peak move-in.`,
    },
    ...(venues.length
      ? [
          {
            q: `Do you have venue-specific guidance for ${c.city}?`,
            a: `Yes — we maintain working notes for ${venues
              .map((v) => v.name)
              .join(", ")}, covering dock access, rigging approvals, exclusive contractors and labour jurisdictions at each property.`,
          },
        ]
      : []),
    ...proofFaqs,
  ];

  return faqs;
}


function CityPage() {
  const { city } = Route.useLoaderData();
  const proof = getCityProof(city.slug);
  useMarkCityVisit(city.slug);
  return (
    <PageLayout>
      <CityHero city={city} />
      <TLDR city={city} />
      <LocalOperations city={city} />
      <ProofBlock proof={proof} subject={`exhibiting in ${city.city}`} />
      <Pricing city={city} />
      <section className="border-b border-white/10 py-20">
        <ProjectShowcase seed={city.slug} locationLabel={city.city} className="pb-0" />
      </section>
      <Venues city={city} />
      <Shows city={city} />
      <Neighborhoods city={city} />
      <Process city={city} />
      <Compare />
      <DriveTimes city={city} />
      <Playbook city={city} />
      <section className="border-b border-white/10 py-12">
        <CaseProof
          context={{ city: city.city }}
          seed={city.slug}
          heading={`Exhibits we’ve delivered in and around ${city.city}`}
        />

        <VenuePriceBands place={city.city} city={city.city} source={`city-${city.slug}`} preposition="in" />

        <LandedCostBand place={city.city} city={city.city} source={`city-${city.slug}`} preposition="in" />

        <ShowCountdown place={city.city} city={city.city} source={`city-${city.slug}`} preposition="in" />

        {/* Full rental catalogue, pre-filtered to this city */}
        <RentalCatalog
          initialCity={city.city}
          heading={`Custom booth rentals in ${city.city}`}
          intro={`Every design below is a 100% custom rental we deliver and install in ${city.city}. Toggle a footprint, then customize the layout, millwork, AV and lighting — install and dismantle labour is included.`}
        />
      </section>
      <FAQ city={city} />
      <LastReviewed date={proof.lastReviewed} />
      <RelatedDirectoryLinks citySlug={city.slug} />
      <OtherCities city={city} />

      <DesignCtaBand source="city" />
      <QuoteBand city={city} />
    </PageLayout>

  );
}

/**
 * Local presence without fabricated addresses. We are a service-area business:
 * the claims below (crew, warehouse partner, on-site producer, venue know-how)
 * are things we actually deliver in every market, so no page invents an office.
 */
function LocalOperations({ city }: { city: City }) {
  const items = [
    {
      title: `${city.city} install crews`,
      body: `We book local I&D labour in ${city.city} under the work rules that apply in each hall — ${city.unions}. Your crew call is placed against the show's target move-in time, not the show open.`,
    },
    {
      title: `Warehouse & freight into ${city.city}`,
      body: `Freight is routed to the ${city.city} advance warehouse or direct-to-show depending on your target date, with the Material Handling Agreement filed before the truck rolls.`,
    },
    {
      title: `On-site producer, every shift`,
      body: `A Traction X project manager is on the ${city.city} floor for every install and dismantle shift — the person who solves a missing power drop or a re-marshalled crate before it costs you a show day.`,
    },
    {
      title: `${city.state} venue know-how`,
      body: city.venues.length
        ? `We hold current exhibitor-kit details for ${city.venues.slice(0, 3).map((v) => v.name).join(", ")} — dock rules, rigging limits and fire-marshal review timing.`
        : `We hold current exhibitor-kit details for the ${city.city} halls we build in — dock rules, rigging limits and fire-marshal review timing.`,
    },
  ];
  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">
          On the ground in {city.city}
        </h2>
        <p className="mt-3 max-w-3xl text-white/70">
          Traction X works {city.city} as a home floor: local crews, local freight staging and
          a producer in the hall — coordinated by one team on one contract.
        </p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((i) => (
            <div key={i.title} className="border border-white/10 p-6">
              <div className="text-white font-semibold uppercase tracking-wide text-sm">{i.title}</div>
              <p className="mt-2 text-sm text-white/70">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CityHero({ city }: { city: City }) {
  return (
    <section className="relative border-b border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">
          {city.hero}
        </div>
        <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.05]">
          Custom Trade Show Booth Rentals in {city.city}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-white/70">
          {city.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-primary text-black font-semibold px-6 py-3 uppercase tracking-wider text-sm hover:bg-primary/90"
          >
            Get My Two-Day Estimate →
          </a>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 uppercase tracking-wider text-sm hover:bg-white/5"
          >
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

function TLDR({ city }: { city: City }) {
  return (
    <section id="tldr" className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="text-primary uppercase tracking-widest text-xs mb-2">Coverage</div>
          <div className="text-white/80">{city.city}, {city.state} + {city.neighborhoods.slice(0, 3).join(", ")}</div>
        </div>
        <div>
          <div className="text-primary uppercase tracking-widest text-xs mb-2">Starting Prices</div>
          <div className="text-white/80">10×10 from $16,250 · 10×20 from $22,750 · 20×20 from $39,000</div>
        </div>
        <div>
          <div className="text-primary uppercase tracking-widest text-xs mb-2">Quote Turnaround</div>
          <div className="text-white/80">Preliminary concept direction + investment within two business days</div>
        </div>
        <div>
          <div className="text-primary uppercase tracking-widest text-xs mb-2">Labor</div>
          <div className="text-white/80">{city.unions}</div>
        </div>
      </div>
    </section>
  );
}

function Pricing({ city }: { city: City }) {
  const tiers = [
    { size: "10×10 Inline", price: "$16,250+", specs: ["Backlit SEG header", "Locking counter + lit shelving", "55\" monitor + mount", "Design, I&D, on-site PM"] },
    { size: "10×20 Inline", price: "$22,750+", specs: ["Full backwall + demo counter", "Two 55\" monitors", "Storage closet", "Design, I&D, on-site PM"] },
    { size: "20×20 Island", price: "$39,000+", specs: ["Hanging sign + programmable LED", "Meeting room + demo pods", "Multi-zone AV package", "Design, I&D, on-site PM"] },
    { size: "Custom Build", price: "Quoted to spec", specs: ["Fully custom architecture", "CNC millwork + premium finishes", "Integrated tech + interactive", "Buy or rent — you own the IP"] },
  ];
  return (
    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white">{city.city} booth rental pricing</h2>
        <p className="mt-3 text-white/70 max-w-3xl">Starting-at ranges for turnkey rentals in {city.city}. Drayage is coordinated but billed separately by the venue/GSC.</p>
        <div className="mt-10 grid md:grid-cols-4 gap-5">
          {tiers.map((t) => (
            <div key={t.size} className="border border-white/10 bg-white/[0.02] p-6">
              <div className="text-primary text-xs uppercase tracking-widest">{t.size}</div>
              <div className="mt-2 text-white font-display text-2xl font-bold">{t.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {t.specs.map((s) => <li key={s}>· {s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Venues({ city }: { city: City }) {
  const { venues } = cityEntities(city);
  const guideFor = (name: string) =>
    venues.find((v) => v.name === name || v.shortName === name || name.includes(v.shortName));
  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white">{city.city} convention venues we service</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {city.venues.map((v) => {
            const guide = guideFor(v.name);
            return (
              <div key={v.name} className="border border-white/10 p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-white font-semibold">{v.name}</div>
                  <div className="text-primary text-xs uppercase tracking-widest">{v.halls}</div>
                </div>
                <p className="mt-2 text-sm text-white/70">{v.blurb}</p>
                {guide && (
                  <Link
                    to="/venues/$slug"
                    params={{ slug: venueUrlSlug(guide.slug) }}
                    className="mt-3 inline-block text-sm text-primary hover:underline"
                  >
                    {guide.shortName} exhibitor guide — docks, rigging and labour rules →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Shows({ city }: { city: City }) {
  const { shows } = cityEntities(city);
  const guideFor = (name: string) =>
    shows.find((s) => s.name === name || s.shortName === name);
  return (
    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white">Shows we build for in {city.city}</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {city.shows.map((s) => {
            const guide = guideFor(s);
            return guide ? (
              <Link
                key={s}
                to="/shows/$slug"
                params={{ slug: showUrlSlug(guide.slug) }}
                className="border border-primary/40 px-4 py-2 text-sm uppercase tracking-wider text-primary hover:bg-primary/10"
              >
                {s} booth rentals →
              </Link>
            ) : (
              <span key={s} className="border border-white/10 px-4 py-2 text-sm text-white/80 uppercase tracking-wider">{s}</span>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function Neighborhoods({ city }: { city: City }) {
  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">Serving greater {city.city}</h2>
        <p className="mt-3 text-white/70 max-w-3xl">On-site coverage across every major {city.state} corridor for exhibit installs, staging, and brand activations.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {city.neighborhoods.map((n) => (
            <span key={n} className="border border-primary/40 text-primary px-3 py-1 text-xs uppercase tracking-wider">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ city }: { city: City }) {
  const steps = [
    { n: "01", name: "Discovery & Brief", text: `30-minute call to map goals, booth number, sponsorship deliverables and lead-capture stack for your ${city.city} show.` },
    { n: "02", name: "Design & 3D Renderings", text: "Preliminary concept direction and investment within two business days; full photoreal 3D renderings, floor plan and costed BOM follow over roughly one to two weeks." },
    { n: "03", name: "Engineering & Production", text: "Engineered to venue rules, SEG graphics printed, pre-built in-shop for quality assurance." },
    { n: "04", name: "Freight & Warehouse Coordination", text: "Palletized to the advance warehouse, MHA filed, target move-in coordinated with the GSC. Drayage billed by venue as a separate line item." },
    { n: "05", name: "Install & On-Site PM", text: `${city.unions} crews install the booth with a Traction X PM supervising every shift.` },
    { n: "06", name: "Dismantle & Store", text: "Tear down, ship back, refresh graphics, and store the modular kit for the next city." },
  ];
  return (
    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white">How we deliver in {city.city}</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="border border-white/10 p-6">
              <div className="text-primary font-display text-3xl font-bold">{s.n}</div>
              <div className="mt-2 text-white font-semibold uppercase tracking-wide text-sm">{s.name}</div>
              <p className="mt-2 text-sm text-white/70">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Compare() {
  const rows = [
    ["Investment", "$$$", "$$$$$", "$"],
    ["Design freedom", "High", "Total", "Limited"],
    ["Reusable across shows", "Yes", "Partially", "Yes"],
    ["Setup time", "Fast", "Slow", "Fastest"],
    ["Best for", "Repeat exhibitors", "Flagship activations", "One-off inline"],
  ];
  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white">Modular vs. Custom vs. Portable</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm border border-white/10">
            <thead>
              <tr className="bg-white/[0.03] text-white uppercase tracking-widest text-xs">
                <th className="text-left p-3 border-b border-white/10"></th>
                <th className="text-left p-3 border-b border-white/10">Modular Rental</th>
                <th className="text-left p-3 border-b border-white/10">Custom Build</th>
                <th className="text-left p-3 border-b border-white/10">Portable</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-b border-white/10">
                  <td className="p-3 text-white/80 font-semibold">{r[0]}</td>
                  <td className="p-3 text-white/70">{r[1]}</td>
                  <td className="p-3 text-white/70">{r[2]}</td>
                  <td className="p-3 text-white/70">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function DriveTimes({ city }: { city: City }) {
  return (
    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">Drive times to {city.city} convention district</h2>
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          {city.driveTimes.map((d) => (
            <div key={d.from} className="border border-white/10 p-5">
              <div className="text-primary text-xs uppercase tracking-widest">{d.minutes}</div>
              <div className="mt-1 text-white/80 text-sm">{d.from}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Playbook({ city }: { city: City }) {
  const items = [
    { t: "Advance warehouse", d: `Ship to the advance warehouse 14 days before move-in to avoid marshalling-yard queues in ${city.city}.` },
    { t: "Union work rules", d: `${city.unions} handle install. We file all crew calls, MHAs, and electrical orders so nothing gets red-tagged.` },
    { t: "Electrical & rigging", d: "Deadlines run 30 days out for discount pricing. We submit the orders on your behalf so you don't miss the window." },
    { t: "Lead capture", d: "We integrate your CRM or lead-retrieval hardware into demo pods and meeting rooms — leads flow into your pipeline in real time." },
    { t: "Sustainability", d: "Reusable aluminum extrusion, reprinted SEG graphics, and pack-and-store between shows dramatically cut per-event carbon vs. one-off custom." },
    { t: "On-site PM", d: `A dedicated Traction X PM is on the floor every day of your ${city.city} show — burned-out lightbox, last-minute graphic swap, extra chairs — handled.` },
  ];
  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white">{city.city} exhibitor playbook</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {items.map((i) => (
            <div key={i.t} className="border border-white/10 p-6">
              <div className="text-white font-semibold uppercase text-sm tracking-wide">{i.t}</div>
              <p className="mt-2 text-sm text-white/70">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ city }: { city: City }) {
  const faqs = [
    priceBandFaq(city.city, city.city, marketTierForCity(city.city), "in"),
    landedCostFaq(city.city, city.city, marketTierForCity(city.city), "in"),
    ...buildLocalFAQs(city),
  ];
  return (
    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white">{city.city} booth rental FAQs</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {faqs.map((f) => (
            <div key={f.q} className="border border-white/10 p-6">
              <div className="faq-question text-white font-semibold">{f.q}</div>
              <p className="mt-2 text-sm text-white/70">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/60">
          Pricing, lead times and how our rentals differ from an owned build are answered once on our{" "}
          <Link to="/faqs" className="text-primary hover:underline">
            general exhibitor FAQ
          </Link>{" "}
          and{" "}
          <Link to="/trade-show-booth-rental-pricing" className="text-primary hover:underline">
            booth rental pricing guide
          </Link>
          . You can also browse the{" "}
          <Link to="/rent-a-booth" className="text-primary hover:underline">
            full custom rental catalogue
          </Link>
          .
        </p>
      </div>
    </section>
  );
}


function QuoteBand({ city }: { city: City }) {
  return (
    <section id="quote" className="bg-black">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white">Get your {city.city} booth estimate</h2>
          <p className="mt-4 text-white/70 max-w-lg">
            Send us your booth number, show dates, and any brand assets. We acknowledge complete briefs within one business day, then send preliminary concept direction and investment within two business days. Full photoreal design follows as the scope develops.
          </p>
          <div className="mt-6 space-y-2 text-white/80">
            <a href={`tel:${SITE.phone}`} className="block hover:text-primary">📞 {SITE.phoneDisplay}</a>
            <a href={`mailto:${SITE.email}`} className="block hover:text-primary">✉ {SITE.email}</a>
            <Link to="/contact" className="block hover:text-primary">→ Full contact page</Link>
          </div>
        </div>
        <QuoteForm defaultCity={city.city} />
      </div>
    </section>
  );
}

function OtherCities({ city }: { city: City }) {
  const others = CITIES.filter((c) => c.slug !== city.slug);
  const canada = others.filter((c) => c.country === "CA");
  const usa = others.filter((c) => c.country === "US");
  const group = (label: string, list: City[]) => (
    <div>
      <div className="text-xs uppercase tracking-widest text-primary">{label}</div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {list.map((c) => (
          <Link
            key={c.slug}
            to="/city/$slug"
            params={{ slug: cityUrlSlug(c.slug) }}
            className="text-white/70 hover:text-primary"
          >
            {c.city}, {c.stateAbbr}
          </Link>
        ))}
      </div>
    </div>
  );
  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="font-display text-2xl font-bold uppercase text-white">
          Booth rentals in other cities
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {group("Canada", canada)}
          {group("United States", usa)}
        </div>
        <p className="mt-6 text-sm text-white/60">
          Also see{" "}
          <Link to="/las-vegas-modular-trade-show-booth-rentals" className="text-primary hover:underline">
            Las Vegas booth rentals
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
