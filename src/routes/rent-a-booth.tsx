import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, useCta } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { RentalCatalog, InstantQuoteBar } from "@/components/RentalCatalog";
import { ESTIMATE_DISCLAIMER } from "@/components/QuoteModal";
import { useCityContext } from "@/lib/city-context";
import { BOOTH_SIZES } from "@/data/booth-sizes";

import { SITE } from "@/lib/site";

type CatalogSearch = { size?: string; city?: string; budget?: string };

const TITLE = "Trade Show Booth Rentals — 10×10 to 30×50 | Traction X";
const DESC = "Rent a trade show booth: 10×10 from $16,250, 10×20 from $22,750, 20×20 from $39,000. Custom graphics, integrated AV, delivered and installed globally.";

const FAQS = [
  { q: "How much does it cost to rent a trade show booth?", a: "10×10 rentals start around $16,250, 10×20 around $22,750 and 20×20 islands around $39,000 for a well-appointed configuration. Custom rentals with millwork and hospitality run higher." },
  { q: "What's included in a rental?", a: "Structure, printed graphics, standard lighting, one counter or reception station, monitor mount, meeting stool and setup drawings. Freight, drayage and I&D are quoted as separate lines." },
  { q: "Do you deliver internationally?", a: "Yes — North America, Europe, Latin America, Asia and Oceania. In-country partner shops keep freight economics sensible on non-domestic shows." },
  { q: "How far in advance should I book?", a: "6–10 weeks is the healthy planning window. Rescue rentals inside 4 weeks are possible when catalog inventory allows." },
];

export const Route = createFileRoute("/rent-a-booth")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/rent-a-booth` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/rent-a-booth` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  // Booth Finder deep-links land here: /rent-a-booth?size=10x20&city=Las%20Vegas
  validateSearch: (search: Record<string, unknown>): CatalogSearch => {
    const str = (k: string) => (typeof search[k] === "string" ? (search[k] as string) : undefined);
    const out: CatalogSearch = {};
    const size = str("size");
    const city = str("city");
    const budget = str("budget");
    if (size) out.size = size;
    if (city) out.city = city;
    if (budget) out.budget = budget;
    return out;
  },
  component: RentABooth,
});

function RentABooth() {
  const { openQuote } = useCta();
  const sizes = BOOTH_SIZES.filter((b) => b.category === "size");
  const cityCtx = useCityContext();
  const search = Route.useSearch();
  return (
    <PageLayout>
      <PageHero
        eyebrow={cityCtx ? `Rentals · ${cityCtx.label}` : "Rentals"}
        title="Rent a Trade"
        accent="Show Booth"
        intro={
          cityCtx
            ? `A rental program that doesn't look like a rental. Modular aluminium framing, custom graphics, real millwork counters and integrated AV — delivered, installed and managed on the show floor in ${cityCtx.label}.`
            : "A rental program that doesn't look like a rental. Modular aluminium framing, custom graphics, real millwork counters and integrated AV — delivered and installed on your show floor globally."
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => openQuote({ source: "rent-a-booth-hero" })}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90"
          >
            {cityCtx ? cityCtx.ctaText + " →" : "Get a rental quote →"}
          </button>
          {cityCtx && (
            <a
              href={cityCtx.href}
              className="border border-white/25 px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
            >
              {cityCtx.label} exhibit services →
            </a>
          )}
        </div>
        {cityCtx && cityCtx.venues.length > 0 && (
          <p className="mt-4 text-sm text-white/60">
            Installing at {cityCtx.venues.slice(0, 3).join(", ")} and every major {cityCtx.label} venue.
          </p>
        )}
      </PageHero>

      <Section bg="muted">
        <InstantQuoteBar />
      </Section>

      <Section id="catalog" eyebrow="Catalog">
        <RentalCatalog showQuotePaths={false} initialSize={search.size ?? ""} initialCity={search.city ?? ""} />
      </Section>



      <Section eyebrow="Why rent" title="When a rental is the right call">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "One-to-three shows / year", b: "Rentals beat ownership on total-cost-per-show below four exhibits per year." },
            { t: "Changing footprint", b: "Same partner scales 10×10 → 20×20 → 30×30 without a new capex line." },
            { t: "Rescue projects", b: "Supplier fell through? Rentals can ship inside 4 weeks with catalog inventory." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-white/10 p-6">
              <h3 className="font-display text-xl font-semibold">{x.t}</h3>
              <p className="mt-2 text-white/70">{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Quick answer" title="Rental pricing at a glance" bg="muted">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sizes.map((s) => (
            <Link
              key={s.slug}
              to="/booth-size/$slug"
              params={{ slug: s.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="font-display text-xl font-semibold">{s.label}</div>
              {s.starting && (
                <div className="mt-1 text-[oklch(0.78_0.13_300)] font-semibold">from {s.starting}</div>
              )}
              <div className="mt-2 text-sm text-white/60">{s.short}</div>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-white/40">{ESTIMATE_DISCLAIMER}</p>
      </Section>

      <FAQBlock items={FAQS} />


      <Section id="contact">
        <QuoteForm heading={cityCtx ? cityCtx.contactHeading : "Request a rental quote"} />
      </Section>
      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
