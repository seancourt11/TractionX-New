import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { BoothCard } from "@/components/RentalCatalog";
import { QuoteModal, ESTIMATE_DISCLAIMER, type QuoteMode } from "@/components/QuoteModal";
import { useCityContext } from "@/lib/city-context";
import { RENTAL_BOOTHS, getRentalBooth, type RentalBooth } from "@/data/rental-booths";
import { SITE } from "@/lib/site";
import { boothPrice } from "@/lib/booth-pricing";
import { ShortlistButton } from "@/components/ShortlistButton";


function sizeLabel(size: string) {
  return size === "Custom" || size === "Larger" ? size : `${size.replace("x", " × ")} ft`;
}

// Starting rent/buy pricing comes from src/lib/booth-pricing.ts so the card,
// this page and the Product schema below can never disagree.


export const Route = createFileRoute("/rent-booth/$slug")({
  loader: ({ params }) => {
    const booth = getRentalBooth(params.slug);
    if (!booth) throw notFound();
    const related = RENTAL_BOOTHS.filter((b) => b.size === booth.size && b.slug !== booth.slug).slice(0, 3);
    return { booth, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Booth not found" }, { name: "robots", content: "noindex" }] };
    const b = loaderData.booth;
    const title = `${b.name} — ${sizeLabel(b.size)} Trade Show Booth Rental | Traction X`;
    const desc = `Rent the ${b.name} ${sizeLabel(b.size)} trade show booth (${b.code}). Custom graphics, lighting, AV and millwork — designed, shipped and installed by Traction X.`;
    const url = `${SITE.url}/rent-booth/${b.slug}`;
    const img = `${SITE.url}${b.image}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "product" },
        { property: "og:image", content: img },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${b.name} ${sizeLabel(b.size)} trade show booth rental`,
            sku: b.code,
            image: img,
            description: desc,
            brand: { "@type": "Brand", name: "Traction X" },
            offers: boothPrice(b.size).priced
              ? {
                  "@type": "AggregateOffer",
                  url,
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  lowPrice: boothPrice(b.size).rentLow,
                  highPrice: boothPrice(b.size).buyFrom,
                  offerCount: 2,
                }
              : {
                  "@type": "Offer",
                  url,
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
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
              { "@type": "ListItem", position: 2, name: "Rentals", item: `${SITE.url}/rent-a-booth` },
              { "@type": "ListItem", position: 3, name: b.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: RentBoothPage,
  notFoundComponent: () => (
    <PageLayout>
      <Section title="Booth not found">
        <p className="text-white/70">
          That design isn&apos;t in the catalog.{" "}
          <Link to="/rent-a-booth" className="text-[oklch(0.78_0.13_300)] underline">
            Browse all rental booths
          </Link>
          .
        </p>
      </Section>
    </PageLayout>
  ),
});

function RentBoothPage() {
  const { booth: b, related } = Route.useLoaderData() as { booth: RentalBooth; related: RentalBooth[] };
  const cityCtxForPrice = useCityContext();
  const price = boothPrice(b.size, cityCtxForPrice?.label);
  const [quoteMode, setQuoteMode] = useState<QuoteMode | null>(null);
  const cityCtx = useCityContext();


  return (
    <PageLayout>
      <Section>
        <nav className="text-xs uppercase tracking-widest text-white/45 mb-6">
          <Link to="/" className="hover:text-white">Home</Link> <span className="mx-2">/</span>
          <Link to="/rent-a-booth" className="hover:text-white">Rentals</Link> <span className="mx-2">/</span>
          <span className="text-white/70">{b.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
            <img
              src={b.image}
              alt={`${b.name} ${sizeLabel(b.size)} trade show booth rental by Traction X`}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[oklch(0.78_0.13_300)]">
              {b.code} · {sizeLabel(b.size)} rental
            </div>
            <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">
              {b.name}
            </h1>
            <p className="mt-4 text-white/70 text-lg">
              A {sizeLabel(b.size)} exhibit you can rent or buy — the same build either way, rebuilt around your brand,
              reskinned with your graphics, lit properly and installed by our crew. Customize further with millwork,
              hospitality, demo stations and AV.
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
              {price.priced ? (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Rent</div>
                      <div className="font-display text-2xl font-bold">{price.rentRange}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Buy from</div>
                      <div className="font-display text-2xl font-bold">{price.buyLabel}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-white/50">
                    Starting ranges including design, fabrication, graphics and install &amp; dismantle
                    {cityCtxForPrice && price.index !== 1
                      ? `, adjusted for ${cityCtxForPrice.label} (${price.index > 1 ? "+" : ""}${Math.round((price.index - 1) * 100)}% vs. our national base).`
                      : "."}{" "}
                    Freight, drayage and show services are quoted separately.
                  </p>
                </>
              ) : (
                <p className="text-sm text-white/70">
                  This footprint is priced on request — send us your show, dates and scope and we&apos;ll come back with
                  a firm range in two business days.
                </p>
              )}
              <div className="mt-4">
                <ShortlistButton slug={b.slug} size="lg" />
              </div>
            </div>
            <p className="mt-3 text-sm text-white/55">
              <Link to="/gallery" search={{ size: b.size }} className="text-[oklch(0.78_0.13_300)] underline">
                See more {sizeLabel(b.size)} booths we&apos;ve built →
              </Link>
            </p>


            <dl className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["Footprint", sizeLabel(b.size)],
                ["Design code", b.code],
                ["Availability", "Rent or purchase"],
                ["Lead time", "6–10 weeks (rush possible)"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-white/50">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-xl border-2 border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[oklch(0.78_0.13_300)]">
                Recommended · fastest
              </div>
              <p className="mt-1 text-sm text-white/75">
                Get your {sizeLabel(b.size)} range on screen in 20 seconds — email and phone so a designer can confirm and customize further.
              </p>
              <button
                type="button"
                onClick={() => setQuoteMode("instant")}
                className="mt-4 w-full bg-[oklch(0.78_0.13_300)] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90"
              >
                Get my instant quote →
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setQuoteMode("customize")}
                className="border border-[oklch(0.78_0.13_300)] text-[oklch(0.78_0.13_300)] px-6 py-3 rounded-xl font-semibold hover:bg-[oklch(0.78_0.13_300)]/10"
              >
                Customize this booth
              </button>
              <button
                type="button"
                onClick={() => setQuoteMode("email")}
                className="border border-white/25 px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
              >
                Email me a quote
              </button>
              <a
                href={`tel:${SITE.phone}`}
                className="border border-white/25 px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
              >
                Call {SITE.phone}
              </a>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-white/40">{ESTIMATE_DISCLAIMER}</p>



            <ul className="mt-8 space-y-2 text-white/70 text-sm">
              {[
                "Custom printed graphics and brand finishes",
                "LED lighting package and monitor mounts",
                "Millwork counters, storage and reception options",
                "Design renders and setup drawings before you approve",
                "Install, dismantle and on-site supervision available",
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="text-[oklch(0.78_0.13_300)]">▸</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section eyebrow="More options" title={`Other ${sizeLabel(b.size)} rentals`} bg="muted">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <BoothCard key={r.slug} booth={r} />
            ))}
          </div>
          <div className="mt-8">
            <Link to="/rent-a-booth" className="text-[oklch(0.78_0.13_300)] underline">
              Browse the full rental catalog →
            </Link>
          </div>
        </Section>
      )}

      <Section id="quote">
        <QuoteForm
          heading={
            cityCtx ? `Request pricing on ${b.name} for ${cityCtx.label}` : `Request pricing on ${b.name}`
          }
        />
      </Section>
      <DesignCtaBand source="page" />
      <CTABand />
      <QuoteModal
        open={quoteMode !== null}
        onOpenChange={(v) => !v && setQuoteMode(null)}
        mode={quoteMode ?? "instant"}
        boothName={b.name}
        boothSize={b.size}
        city={cityCtx?.label}
      />

    </PageLayout>
  );
}
