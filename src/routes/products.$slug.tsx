import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { resolveLegacyRedirect } from "../data/legacy-redirects";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { PRODUCT_MAP, PRODUCTS } from "@/data/products";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCT_MAP[params.slug];
    if (!product) {
      const legacy = resolveLegacyRedirect(`/products/${params.slug}`);
      if (legacy) throw redirect({ href: legacy, statusCode: 301, throw: true });
      throw notFound();
    }
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const url = `${SITE.url}/products/${p.slug}`;
    return {
      meta: [
        { title: p.seo.title },
        { name: "description", content: p.seo.description },
        { property: "og:title", content: p.seo.title },
        { property: "og:description", content: p.seo.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: p.hero.title + (p.hero.accent ? ` ${p.hero.accent}` : ""),
              description: p.seo.description,
              brand: { "@type": "Brand", name: SITE.name },
              url,
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "16250",
                availability: "https://schema.org/InStock",
                url,
                seller: { "@type": "Organization", name: SITE.name, url: SITE.url },
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                { "@type": "ListItem", position: 2, name: "Trade Show Displays", item: `${SITE.url}/trade-show-displays` },
                { "@type": "ListItem", position: 3, name: p.seo.title, item: url },
              ],
            },
          ]),
        },
      ],
    };
  },

  component: ProductPage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Product not found" intro="That product page has moved." />
    </PageLayout>
  ),
});

function ProductPage() {
  const { product: p } = Route.useLoaderData() as { product: (typeof PRODUCTS)[number] };
  return (
    <PageLayout>
      <PageHero eyebrow="Displays" title={p.hero.title} accent={p.hero.accent} intro={p.hero.intro}>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="hero" />
          <Link to="/gallery" search={{ size: undefined }} className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10">
            See the gallery
          </Link>
        </div>
      </PageHero>

      <Section eyebrow="Included" title="What's in the program">
        <div className="grid md:grid-cols-2 gap-6">
          {p.bullets.map((b) => (
            <div key={b.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-xl font-semibold">{b.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {p.slug === "modular-catalog" && (
        <Section eyebrow="Reconfigures between shows" title="One inventory, many floor plans" bg="muted">
          <p className="max-w-3xl text-white/75 leading-relaxed text-[17px]">
            The same aluminium framing that builds today&apos;s 10×10 re-frames into a 10×20 or a 20×20 next
            quarter — size, shape and components all reconfigure show to show, with SEG graphics re-cut to fit.
            We draw the reconfiguration map for your show calendar before you commit.
          </p>
          <div className="mt-6">
            <Link
              to="/reconfigurable-trade-show-booths"
              className="font-display font-semibold text-[oklch(0.78_0.13_300)] hover:underline"
            >
              See how reconfigurable trade show booths work →
            </Link>
          </div>
        </Section>
      )}

      <Section eyebrow="Best for" title="Who this is built for" bg="muted">
        <div className="flex flex-wrap gap-3">
          {p.bestFor.map((x) => (
            <span key={x} className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm">
              {x}
            </span>
          ))}
        </div>
      </Section>

      <Section eyebrow="Other options" title="Explore more">
        <div className="grid md:grid-cols-3 gap-4">
          {PRODUCTS.filter((x) => x.slug !== p.slug).map((x) => (
            <Link
              key={x.slug}
              to="/products/$slug"
              params={{ slug: x.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="font-display font-semibold">{x.label}</div>
              <div className="mt-1 text-sm text-white/60">{x.short}</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="contact">
        <QuoteForm heading={`Request a ${p.label.toLowerCase()} quote`} />
      </Section>

      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
