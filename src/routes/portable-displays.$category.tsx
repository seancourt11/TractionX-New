import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, Design3DButton, BookMeetingButton, QuoteButton } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { ProductCard, FootprintChips } from "@/components/PortableCatalog";
import { PORTABLE_CATEGORIES, PORTABLE_CATEGORY_MAP, productsInCategory } from "@/data/portable-products";
import { SITE } from "@/lib/site";

const FAQS = [
  {
    q: "Do I buy these outright or rent them?",
    a: "Purchase only. Portable displays are sold, not rented — the hardware pays for itself in two or three shows and only the printed graphic is consumable. If you need something for a single event, our custom booth rental program covers that instead.",
  },
  {
    q: "Is graphic design included?",
    a: "Yes. Every portable order includes print-ready artwork setup and a complimentary 3D visual of your display before anything goes to press, so you approve exactly what arrives.",
  },
  {
    q: "How fast can portable displays ship?",
    a: "Typical production is 7–12 business days from artwork approval. Rush production is available on most banner stands, table covers and fabric backwalls at a surcharge.",
  },
  {
    q: "Can I reprint graphics and keep the frame?",
    a: "That's the point of SEG and cassette systems. Frames last for years; you swap only the printed skin when your brand, product or messaging changes — usually 20–35% of the original package cost.",
  },
  {
    q: "Do you ship across Canada and the United States?",
    a: "Yes. We ship portable displays anywhere in North America and handle advance-warehouse delivery to show venues when you'd rather it arrive before you do.",
  },
  {
    q: "What about show services like drayage and electrical?",
    a: "We coordinate the paperwork and file advance forms on your behalf. Drayage and electrical are billed directly by the venue or general contractor on actual weight and usage — never bundled into our pricing.",
  },
];

export const Route = createFileRoute("/portable-displays/$category")({
  loader: ({ params }) => {
    const category = PORTABLE_CATEGORY_MAP[params.category];
    if (!category) throw notFound();
    return { category, products: productsInCategory(params.category) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.category;
    const url = `${SITE.url}/portable-displays/${params.category}`;
    return {
      meta: [
        { title: c.metaTitle },
        { name: "description", content: c.metaDesc },
        { property: "og:title", content: c.metaTitle },
        { property: "og:description", content: c.metaDesc },
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
            name: c.label,
            description: c.metaDesc,
            numberOfItems: loaderData.products.length,
            itemListElement: loaderData.products.slice(0, 40).map((p, i) => ({
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
              { "@type": "ListItem", position: 3, name: c.label, item: url },
            ],
          }),
        },
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
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Category not found" intro="That portable display category has moved — browse the full catalog instead." />
      <Section>
        <Link to="/portable-booths" className="text-[oklch(0.78_0.13_300)] hover:underline">
          ← Back to portable displays
        </Link>
      </Section>
    </PageLayout>
  ),
});

function CategoryPage() {
  const { category: c, products } = Route.useLoaderData() as {
    category: (typeof PORTABLE_CATEGORIES)[number];
    products: ReturnType<typeof productsInCategory>;
  };

  const others = PORTABLE_CATEGORIES.filter((x) => x.slug !== c.slug);

  return (
    <PageLayout>
      <PageHero eyebrow="Portable displays" title={c.label} intro={c.intro}>
        <p className="mt-4 text-sm text-white/55">
          {products.length} products in this category
          {" · pricing by quote · free 3D design with every order"}
        </p>
        <div className="mt-6">
          <FootprintChips />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Design3DButton source={`portable-${c.slug}`} />
          <QuoteButton source={`portable-${c.slug}`} label="Request a quote" />
          <BookMeetingButton source={`portable-${c.slug}`} />
        </div>
      </PageHero>

      <Section eyebrow="Catalog" title={`Every ${c.label.toLowerCase()} we build`}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </Section>

      <Section eyebrow="What's included" title="Every portable order ships the same way" bg="muted">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { t: "Free 3D visual", b: "You approve a rendered visual of your display before we print a single square foot." },
            { t: "Print-ready artwork setup", b: "Our prepress team fixes bleeds, resolution and colour so the graphic matches your brand book." },
            { t: "Hard cases & bags", b: "Roto-moulded wheeled cases or padded bags sized for airline and LTL freight." },
            { t: "Setup instructions", b: "Numbered, photo-based instructions plus a short setup video for your booth staff." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-lg font-semibold">{x.t}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Also browse" title="Other portable display categories">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {others.map((x) => (
            <Link
              key={x.slug}
              to="/portable-displays/$category"
              params={{ category: x.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <span className="font-display font-semibold">{x.label}</span>
              <span className="mt-1 block text-white/50">{productsInCategory(x.slug).length} products</span>
            </Link>
          ))}
        </div>
      </Section>

      <FAQBlock items={FAQS} />

      <Section id="contact" bg="muted">
        <QuoteForm heading={`Request ${c.label.toLowerCase()} pricing`} />
      </Section>

      <DesignCtaBand source={`portable-${c.slug}`} />
      <CTABand />
    </PageLayout>
  );
}
