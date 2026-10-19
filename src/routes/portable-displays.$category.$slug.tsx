import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, Design3DButton, BookMeetingButton, QuoteButton } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { ProductCard } from "@/components/PortableCatalog";
import {
  PORTABLE_CATEGORY_MAP,
  PORTABLE_PRODUCT_MAP,
  productsInCategory,
  type PortableCategory,
  type PortableProduct,
} from "@/data/portable-products";
import { portableImage } from "@/data/portable-images";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/portable-displays/$category/$slug")({
  loader: ({ params }) => {
    const product = PORTABLE_PRODUCT_MAP[params.slug];
    const category = PORTABLE_CATEGORY_MAP[params.category];
    if (!product || !category || product.category !== category.slug) throw notFound();
    return {
      product,
      category,
      related: productsInCategory(category.slug)
        .filter((p) => p.slug !== product.slug)
        .slice(0, 6),
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const c = loaderData.category;
    const url = `${SITE.url}/portable-displays/${params.category}/${params.slug}`;
    const title = `${p.name} — ${c.label} | Traction X`;
    const desc = `${p.blurb} Pricing by quote. ${p.setup} setup. Free 3D design, print-ready artwork setup and North American shipping.`.slice(0, 158);
    const img = portableImage(p.slug);
    const imgUrl = img ? `${SITE.url}${img}` : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "product" },
        ...(imgUrl
          ? [
              { property: "og:image", content: imgUrl },
              { name: "twitter:image", content: imgUrl },
              { name: "twitter:card", content: "summary_large_image" },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.blurb,
            category: c.label,
            ...(imgUrl ? { image: [imgUrl] } : {}),
            brand: { "@type": "Brand", name: SITE.name },
            offers: {
              "@type": "Offer",
              priceCurrency: "CAD",
              availability: "https://schema.org/InStock",
              url,
              seller: { "@type": "Organization", name: SITE.name },
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
              { "@type": "ListItem", position: 2, name: "Portable Displays", item: `${SITE.url}/portable-booths` },
              { "@type": "ListItem", position: 3, name: c.label, item: `${SITE.url}/portable-displays/${c.slug}` },
              { "@type": "ListItem", position: 4, name: p.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Product not found" intro="That item has moved — browse the full portable catalog instead." />
      <Section>
        <Link to="/portable-booths" className="text-[oklch(0.78_0.13_300)] hover:underline">
          ← Back to portable displays
        </Link>
      </Section>
    </PageLayout>
  ),
});

function ProductPage() {
  const { product: p, category: c, related } = Route.useLoaderData() as {
    product: PortableProduct;
    category: PortableCategory;
    related: PortableProduct[];
  };

  const faqs = [
    {
      q: `What does the ${p.name} cost?`,
      a: `We quote the ${p.name} per project. Pricing depends on print sides, lighting, rush timing and delivery address — send us your artwork and show date and we'll return a complete written quote within one business day, with printed graphics, hardware and a carry case or bag included.`, 
    },
    {
      q: `How long does the ${p.name} take to set up?`,
      a: `${p.setup}. It ships with numbered, photo-based instructions and a short setup video so booth staff can assemble it without a labour call.`,
    },
    {
      q: "Can I reprint the graphic later and keep the hardware?",
      a: "Yes. The frame or base is the durable investment; graphics are consumable. We keep your dielines on file so a reprint is a single email with new artwork.",
    },
    {
      q: "Can this be rented for one show instead of purchased?",
      a: `No — portable displays are purchase-only. The ${p.name} is priced to be owned: hardware is reusable show after show and only the graphic is consumable. If you need a rental for a single event, that's our custom booth rental program, which is a different product line.`,
    },
    {
      q: `How long does the ${p.name} take to produce?`,
      a: "Typical production is 7–12 business days from artwork approval. Rush production is available on most banner stands, table covers and fabric backwalls at a surcharge — tell us your show date and we'll confirm the timeline in writing.",
    },
    {
      q: "Do you ship to the show venue directly?",
      a: "Yes — direct-to-show or advance warehouse, whichever the venue prefers. We prepare the labels and the material handling paperwork; drayage is billed by the venue on actual weight.",
    },
  ];

  const photo = portableImage(p.slug);

  return (
    <PageLayout>
      <PageHero eyebrow={c.label} title={p.name} intro={p.blurb}>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 px-4 py-1.5">
            Pricing by quote
          </span>
          <span className="rounded-full border border-white/15 px-4 py-1.5 text-white/70">Setup: {p.setup}</span>
          <span className="rounded-full border border-white/15 px-4 py-1.5 text-white/70">Best for: {p.bestFor}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Design3DButton source={`portable-product-${p.slug}`} label="Start your free 3D design" />
          <QuoteButton source={`portable-product-${p.slug}`} label="Request a quote" />
          <BookMeetingButton source={`portable-product-${p.slug}`} />
        </div>
        {photo && (
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white">
            <img
              src={photo}
              alt={`${p.name} — ${c.label} shown set up for a trade show booth`}
              width={900}
              height={675}
              className="mx-auto h-auto w-full max-w-3xl object-contain"
            />
          </div>
        )}
      </PageHero>



      <Section eyebrow="Specification" title="What ships in the box">
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="space-y-3">
            {p.specs.map((s) => (
              <li key={s} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <span className="text-[oklch(0.78_0.13_300)]">▪</span>
                <span className="text-white/75">{s}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-display text-xl font-semibold">Included with every order</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Complimentary 3D visual before print</li>
              <li>Print-ready artwork setup and colour matching</li>
              <li>Dye-sublimated graphics on flame-certified fabric</li>
              <li>Case or padded bag sized for freight and airline travel</li>
              <li>Photo setup instructions and a walkthrough video</li>
              <li>Lifetime hardware support and reprint dielines on file</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Design3DButton source={`portable-spec-${p.slug}`} label="See it in 3D first" />
            </div>
          </div>
        </div>
      </Section>

      {p.addons && p.addons.length > 0 && (
        <Section eyebrow="Upgrades" title="Available add-ons">
          <div className="grid md:grid-cols-2 gap-4">
            {p.addons.map((a) => (
              <div
                key={a.label}
                className="rounded-2xl border border-[oklch(0.78_0.13_300)]/30 bg-[oklch(0.78_0.13_300)]/5 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold">{a.label}</h3>
                  <span className="whitespace-nowrap rounded-full border border-[oklch(0.78_0.13_300)]/40 px-3 py-1 text-sm text-[oklch(0.78_0.13_300)]">
                    {a.price}
                  </span>
                </div>
                {a.description && <p className="mt-2 text-white/70 leading-relaxed">{a.description}</p>}
                {a.image && (
                  <figure className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black">
                    <img
                      src={a.image}
                      alt={`${p.name} shown with the ${a.label.toLowerCase()} illuminated`}
                      width={900}
                      height={675}
                      loading="lazy"
                      className="h-auto w-full object-contain"
                    />
                    <figcaption className="px-4 py-3 text-xs uppercase tracking-[0.18em] text-[oklch(0.78_0.13_300)]">
                      Shown with the LED lightbox lit
                    </figcaption>
                  </figure>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/50">
            Add-on pricing is added to the package quote before taxes, graphics changes and freight.
          </p>
          <div className="mt-6">
            <QuoteButton source={`portable-addons-${p.slug}`} label="Quote this with add-ons" />
          </div>
        </Section>
      )}

      <Section eyebrow="Buying guide" title={`Is the ${p.name} the right choice?`} bg="muted">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-display text-lg font-semibold">Choose it when</h3>
            <p className="mt-2 text-white/70 leading-relaxed">
              You're planning for {p.bestFor.toLowerCase()} and need hardware that travels as luggage or LTL freight rather than a
              crated custom build.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-display text-lg font-semibold">Think twice when</h3>
            <p className="mt-2 text-white/70 leading-relaxed">
              Your programme needs bonded millwork, a double-deck or engineered structural elements. That's a custom build — we do
              those too, and we'll tell you honestly which side of the line you're on.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-display text-lg font-semibold">Total cost of ownership</h3>
            <p className="mt-2 text-white/70 leading-relaxed">
              Hardware is the one-time investment; each future graphic refresh is roughly 20–35% of the hardware quote. Portable displays are
              sold, not rented — the hardware is yours and typically pays for itself across two or three shows.
            </p>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section eyebrow="Compare" title={`Other ${c.label.toLowerCase()}`}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/portable-displays/$category"
              params={{ category: c.slug }}
              className="text-[oklch(0.78_0.13_300)] hover:underline"
            >
              See all {c.label.toLowerCase()} →
            </Link>
          </div>
        </Section>
      )}

      <FAQBlock items={faqs} title={`${p.name} — questions exhibitors ask`} />

      <Section id="contact" bg="muted">
        <QuoteForm heading={`Request a quote for the ${p.name}`} />
      </Section>

      <DesignCtaBand source={`portable-product-${p.slug}`} />
      <CTABand />
    </PageLayout>
  );
}
