import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, Design3DButton, BookMeetingButton, QuoteButton } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { ProductCard, FootprintChips } from "@/components/PortableCatalog";
import { PORTABLE_CATEGORY_MAP } from "@/data/portable-products";
import { FOOTPRINT_MAP, PORTABLE_FOOTPRINTS, productsInFootprint, isCoreForFootprint, primaryFootprint } from "@/lib/portable-size";
import { SITE } from "@/lib/site";
import { metricSize, metricKeywords } from "@/lib/units";

export const Route = createFileRoute("/portable-displays/size/$size")({
  loader: ({ params }) => {
    const fp = FOOTPRINT_MAP[params.size];
    if (!fp) throw notFound();
    return { fp, products: productsInFootprint(params.size) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { fp, products } = loaderData;
    const url = `${SITE.url}/portable-displays/size/${params.size}`;
    const metric = metricSize(fp.short);
    const metaDesc = metric ? `${fp.metaDesc} ${fp.short} is ${metric} in metric.` : fp.metaDesc;
    return {
      meta: [
        { title: fp.metaTitle },
        { name: "description", content: metaDesc },
        { property: "og:title", content: fp.metaTitle },
        { property: "og:description", content: metaDesc },
        ...(metric ? [{ name: "keywords", content: metricKeywords(fp.short) }] : []),
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: fp.label,
            ...(metric && { alternateName: `${metric} portable display booth` }),
            description: metaDesc,
            numberOfItems: products.length,
            itemListElement: products.slice(0, 40).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `${SITE.url}/portable-displays/${p.category}/${p.slug}`,
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
              { "@type": "ListItem", position: 2, name: "Portable Displays", item: `${SITE.url}/portable-booths` },
              { "@type": "ListItem", position: 3, name: fp.label, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: SizePage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Size not found" intro="Browse the full portable display catalog instead." />
      <Section>
        <Link to="/portable-booths" className="text-[oklch(0.78_0.13_300)] hover:underline">
          ← Back to portable displays
        </Link>
      </Section>
    </PageLayout>
  ),
});

function SizePage() {
  const { fp, products } = Route.useLoaderData();
  const metric = metricSize(fp.short);

  const core = products
    .filter(isCoreForFootprint)
    .slice()
    .sort((a, b) => Number(primaryFootprint(b) === fp.slug) - Number(primaryFootprint(a) === fp.slug));
  const addons = products.filter((p) => !isCoreForFootprint(p));

  const byCategory = (list: typeof products) => {
    const map = new Map<string, typeof products>();
    const exact = list.filter((p) => primaryFootprint(p) === fp.slug);
    const rest = list.filter((p) => primaryFootprint(p) !== fp.slug);
    for (const p of [...exact, ...rest]) {
      const arr = map.get(p.category) ?? [];
      arr.push(p);
      map.set(p.category, arr);
    }
    return [...map.entries()];
  };

  const faqs = [
    {
      q: `What fits in a ${fp.short}${metric ? ` (${metric})` : ""} booth?`,
      a: `Everything on this page. We list ${products.length} portable products that work in a ${fp.short} footprint — complete packages, backwalls and the counters, lighting and banner stands that finish the space. Every order includes a complimentary 3D visual so you see the whole footprint laid out before you buy.`,
    },
    {
      q: `How much does a ${fp.short} portable display cost?`,
      a: `Pricing is quoted per project. Send us your artwork, graphics count, lighting, counters, storage and AV needs and we will return a complete written quote for your ${fp.short} package within one business day.`,
    },
    {
      q: "How fast can it ship?",
      a: "Typical production is 7–12 business days from artwork approval. Rush production is available on most banner stands, table covers and fabric backwalls at a surcharge.",
    },
    {
      q: "Do you rent portable displays?",
      a: "No — portables are purchase-only. If you want a rental for a single show, our custom booth rental program covers that instead.",
    },
  ];

  return (
    <PageLayout>
      <PageHero eyebrow="Shop by size" title={fp.label} intro={fp.intro}>
        <p className="mt-4 text-sm text-white/55">
          {metric ? `${fp.short} · ${metric} · ` : ""}{products.length} products fit this footprint
          {" · pricing by quote · free 3D design with every order"}
        </p>
        <div className="mt-6">
          <FootprintChips active={fp.slug} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Design3DButton source={`portable-size-${fp.slug}`} />
          <QuoteButton source={`portable-size-${fp.slug}`} label="Request a quote" />
          <BookMeetingButton source={`portable-size-${fp.slug}`} />
        </div>
      </PageHero>

      <Section eyebrow="Displays" title={`${fp.short} displays and packages`}>
        {byCategory(core).map(([catSlug, items]) => (
          <div key={catSlug} className="mb-12">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-xl font-semibold">{PORTABLE_CATEGORY_MAP[catSlug]?.label ?? catSlug}</h3>
              <Link
                to="/portable-displays/$category"
                params={{ category: catSlug }}
                className="text-sm text-[oklch(0.78_0.13_300)] hover:underline"
              >
                See the whole category →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        ))}
      </Section>

      {addons.length > 0 && (
        <Section eyebrow="Add-ons" title={`Counters, lighting and accessories for a ${fp.short}`} bg="muted">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow="Other sizes" title="Shop another footprint">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PORTABLE_FOOTPRINTS.filter((x) => x.slug !== fp.slug).map((x) => (
            <Link
              key={x.slug}
              to="/portable-displays/size/$size"
              params={{ size: x.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <span className="font-display font-semibold">{x.label}</span>
              <span className="mt-1 block text-white/50">{productsInFootprint(x.slug).length} products</span>
            </Link>
          ))}
        </div>
      </Section>

      <FAQBlock items={faqs} />

      <Section id="contact" bg="muted">
        <QuoteForm heading={`Request ${fp.short} portable display pricing`} />
      </Section>

      <DesignCtaBand source={`portable-size-${fp.slug}`} />
      <CTABand />
    </PageLayout>
  );
}
