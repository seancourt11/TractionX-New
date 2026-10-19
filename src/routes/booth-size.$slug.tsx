import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { resolveLegacyRedirect } from "../data/legacy-redirects";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, useCta } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { BOOTH_SIZE_MAP, BOOTH_SIZES } from "@/data/booth-sizes";
import { RentalCatalog } from "@/components/RentalCatalog";
import { RENTAL_SIZES, RENTAL_BOOTHS } from "@/data/rental-booths";
import { CaseProof } from "@/components/CaseProof";
import {
  BOOTH_SIZE_DETAIL,
  SHARED_SIZE_FAQS,
  SHOW_COUNTDOWN,
  NOT_IN_THE_PRICE,
} from "@/data/booth-size-detail";
import { SITE } from "@/lib/site";
import { metricSize, metricKeywords } from "@/lib/units";

const FAQS = SHARED_SIZE_FAQS;

/** Footprint FAQs first (specific), shared promises after. */
function faqList(slug: string, gallerySize: string | undefined, metric: string | null | undefined) {
  const detail = BOOTH_SIZE_DETAIL[slug];
  if (detail) return [...detail.faqs, ...FAQS];
  return metric
    ? [
        {
          q: `What is a ${(gallerySize ?? "").replace("x", "×")} ft booth in metres?`,
          a: `A ${(gallerySize ?? "").replace("x", "×")} ft booth is ${metric}. North American shows sell space in feet, so if your organizer quoted you in metres we design to the metric dimension and confirm the exact aisle and neighbour lines on the floor plan before fabrication.`,
        },
        ...FAQS,
      ]
    : FAQS;
}




export const Route = createFileRoute("/booth-size/$slug")({
  loader: ({ params }) => {
    const entry = BOOTH_SIZE_MAP[params.slug];
    if (!entry) {
      const legacy = resolveLegacyRedirect(`/booth-size/${params.slug}`);
      if (legacy) throw redirect({ href: legacy, statusCode: 301, throw: true });
      throw notFound();
    }
    return { entry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const e = loaderData.entry;
    const url = `${SITE.url}/booth-size/${e.slug}`;
    const metric = metricSize(e.gallerySize ?? e.label);
    const description = metric
      ? `${e.seo.description} Metric equivalent: ${metric}.`
      : e.seo.description;
    return {
      meta: [
        { title: e.seo.title },
        { name: "description", content: description },
        { property: "og:title", content: e.seo.title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        ...(metric ? [{ name: "keywords", content: metricKeywords(e.gallerySize ?? e.label) }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: e.label,
            ...(metric && { alternateName: `${metric} trade show booth` }),
            description,
            brand: { "@type": "Brand", name: SITE.name },
            ...(metric && {
              additionalProperty: [
                { "@type": "PropertyValue", name: "Footprint (imperial)", value: (e.gallerySize ?? "").replace("x", "×") + " ft" },
                { "@type": "PropertyValue", name: "Footprint (metric)", value: metric },
              ],
            }),
            ...(e.starting && {
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: e.starting.replace(/[^\d]/g, ""),
                availability: "https://schema.org/InStock",
              },
            }),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqList(e.slug, e.gallerySize, metric).map((f) => ({
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
            "@type": "WebPage",
            name: e.seo.title,
            url,
            speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
          }),
        },
      ],

    };
  },
  component: BoothSizePage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Not found" intro="That page has moved." />
    </PageLayout>
  ),
});

function BoothSizePage() {
  const { openQuote } = useCta();
  const { entry: e } = Route.useLoaderData() as { entry: (typeof BOOTH_SIZES)[number] };
  const metric = metricSize(e.gallerySize ?? e.label);
  const detail = BOOTH_SIZE_DETAIL[e.slug];
  const pretty = (e.gallerySize ?? "").replace("x", "×");
  const inventoryCount = detail
    ? RENTAL_BOOTHS.filter((b) => b.size === detail.dim).length
    : 0;
  const sameCategory = BOOTH_SIZES.filter((x) => x.category === e.category && x.slug !== e.slug);
  return (
    <PageLayout>
      <PageHero eyebrow={e.category === "size" ? "Booth size" : "Booth accessory"} title={e.hero.title} accent={e.hero.accent} intro={e.hero.intro}>
        {metric && (
          <p className="mt-3 text-sm text-white/45">
            {(e.gallerySize ?? "").replace("x", "×")} ft · {metric} — the same footprint in metric for international organizers.
          </p>
        )}
        {e.starting && (
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 px-4 py-1.5 text-sm">
              Rent from {e.starting}
            </span>
            {e.purchaseFrom && (
              <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm">
                Buy from {e.purchaseFrom}
              </span>
            )}
          </div>
        )}
        {e.category === "size" && (
          <p className="mt-4 max-w-2xl text-sm text-white/60 leading-relaxed">
            Same booths either way — every design in our catalog can be rented for the show or purchased outright.
            Renting reconfigures an existing build around your brand; buying keeps it. Both are starting-from prices;
            your exact number comes back after a designer reviews the brief.
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => openQuote({ source: "booth-size" })} className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90">
            Get my exact quote →
          </button>
          <Link
            to="/gallery"
            search={{ size: e.gallerySize }}
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            {e.gallerySize ? `See ${e.gallerySize.replace("x", "×")} booths we've built` : "See booth photos"}
          </Link>
        </div>
      </PageHero>

      {detail && (
        <>
          <section id="tldr" className="border-b border-white/10 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-14 grid lg:grid-cols-[1.4fr_1fr] gap-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-4">The short answer</p>
                <p className="text-lg md:text-xl text-white/85 leading-relaxed">{detail.shortAnswer}</p>
                <p className="mt-4 text-sm text-white/55 leading-relaxed">{NOT_IN_THE_PRICE}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">Right now</div>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm text-white/55">{pretty} designs in the rental catalogue</dt>
                    <dd className="font-display text-3xl font-bold">{inventoryCount}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/55">Comfortable lead time</dt>
                    <dd className="font-display text-3xl font-bold">12 weeks</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/55">Rush turnaround achieved</dt>
                    <dd className="font-display text-3xl font-bold">Under 4 weeks</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={() => openQuote({ source: "booth-size" })}
                  className="mt-6 w-full bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-white/90"
                >
                  Check availability for my show →
                </button>
              </div>
            </div>
          </section>

          <Section eyebrow="Planner's brief" title={`${pretty} specifications at a glance`}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left">
                <tbody>
                  {detail.spec.map((row, i) => (
                    <tr key={row.label} className={i % 2 ? "bg-white/[0.03]" : "bg-white/[0.01]"}>
                      <th scope="row" className="align-top px-5 py-4 w-56 text-sm uppercase tracking-[0.14em] text-white/55 font-medium">
                        {row.label}
                      </th>
                      <td className="px-5 py-4 text-white/80 leading-relaxed">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </>
      )}


      <Section eyebrow="What's included" title={`${e.label} — standard package`}>
        <div className="grid md:grid-cols-2 gap-6">
          {e.bullets.map((b) => (
            <div key={b.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-xl font-semibold">{b.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {e.category === "size" && (() => {
        const dim = e.gallerySize ?? "";
        const catalogSize = RENTAL_SIZES.includes(dim) ? dim : "10x10";
        const pretty = dim.replace("x", "×");
        return (
          <Section
            id="rental-catalog"
            eyebrow="Browse the catalogue"
            title={`${pretty} custom rental booths — pick a design, pick your city`}
          >
            <RentalCatalog
              initialSize={catalogSize}
              heading={`${pretty} rental designs`}
              intro={
                RENTAL_SIZES.includes(dim)
                  ? `Every ${pretty} design below is a 100% custom rental — we rebrand, reconfigure and rebuild it around your goals. Switch the footprint, choose your show city, then customize with millwork, AV, lighting and storage.`
                  : `${pretty} in-line booths are built from the same 10×10 designs, trimmed to your ${pretty} space. Browse the catalogue below, choose your show city, and we'll adapt any design to the footprint.`
              }
              showQuotePaths={false}
            />
          </Section>
        );
      })()}

      {detail && (
        <>
          {detail.sections.map((s) => (
            <Section key={s.heading} title={s.heading} bg="muted">
              <div className="max-w-3xl space-y-5">
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)} className="text-white/75 leading-relaxed text-[17px]">
                    {p}
                  </p>
                ))}
              </div>
              {s.bullets && (
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  {s.bullets.map((b) => (
                    <div key={b.lead} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                      <span className="font-display font-semibold text-[oklch(0.78_0.13_300)]">{b.lead}</span>
                      <span className="text-white/70 leading-relaxed"> — {b.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          ))}

          <Section
            eyebrow="Countdown to show open"
            title={`How a ${pretty} booth gets built — week by week`}
          >
            <p className="max-w-3xl text-white/70 leading-relaxed">
              Twelve weeks is the comfortable version of this schedule and the cheapest. We compress it
              routinely — the stages stay the same, the gaps get shorter.
            </p>
            <ol className="mt-10 space-y-3">
              {SHOW_COUNTDOWN.map((s) => (
                <li key={s.when} className="grid md:grid-cols-[120px_200px_1fr] gap-2 md:gap-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <span className="font-display font-bold text-[oklch(0.78_0.13_300)]">{s.when}</span>
                  <span className="font-semibold">{s.what}</span>
                  <span className="text-white/65 leading-relaxed">{s.detail}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openQuote({ source: "booth-size" })}
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90"
              >
                Start the {pretty} brief →
              </button>
              <Link to="/our-promise" className="border border-white/25 px-6 py-3 rounded-xl font-semibold hover:bg-white/10">
                Read the Traction X promise
              </Link>
            </div>
          </Section>

          {detail.dim === "20x20" && (
            <Section eyebrow="Going vertical" title="A 20×20 is the smallest island that can carry a second level">
              <div className="max-w-3xl space-y-5">
                <p className="text-white/75 leading-relaxed text-[17px]">
                  If the meetings matter more than the floor space, a double deck puts a private room or a
                  hospitality lounge above the noise of the hall. At 20×20 it is tight — the stair eats ground-floor
                  area — but it is done, and 20×30 upward it stops compromising the level below.
                </p>
                <p className="text-white/75 leading-relaxed text-[17px]">
                  We rent double decks and build them to own, and we manage the stamped engineering, venue technical
                  review and fire-marshal occupancy sign-off that a second level triggers.
                </p>
              </div>
              <Link
                to="/double-deck-trade-show-booths"
                className="mt-6 inline-block border border-white/25 px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
              >
                Double deck &amp; two-story exhibits →
              </Link>
            </Section>
          )}



          <CaseProof
            context={{}}
            seed={`booth-size-${e.slug}`}
            heading={`${pretty} builds we've delivered`}
          />
        </>
      )}


      {sameCategory.length > 0 && (
        <Section eyebrow="Also available" title={e.category === "size" ? "Other booth sizes" : "Other booth accessories"} bg="muted">
          <div className="grid md:grid-cols-3 gap-4">
            {sameCategory.map((x) => (
              <Link
                key={x.slug}
                to="/booth-size/$slug"
                params={{ slug: x.slug }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[oklch(0.78_0.13_300)] transition"
              >
                <div className="font-display font-semibold">{x.label}</div>
                <div className="mt-1 text-sm text-white/60">{x.short}</div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <FAQBlock items={faqList(e.slug, e.gallerySize, metric)} />


      <Section id="contact">
        <QuoteForm heading={`Request a ${e.label.toLowerCase()} quote`} />
      </Section>

      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
