import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { COMPARISONS, COMPARISON_MAP, type Comparison } from "@/data/comparisons";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/compare/$slug")({
  loader: ({ params }): Comparison => {
    const c = COMPARISON_MAP[params.slug];
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Comparison" }, { name: "robots", content: "noindex" }] };
    const url = `${SITE.url}/compare/${params.slug}`;
    return {
      meta: [
        { title: loaderData.seo.title },
        { name: "description", content: loaderData.seo.description },
        { property: "og:title", content: loaderData.seo.title },
        { property: "og:description", content: loaderData.seo.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: loaderData.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE.url}/compare` },
                { "@type": "ListItem", position: 3, name: loaderData.label, item: url },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: loaderData.seo.title,
              description: loaderData.seo.description,
              url,
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["#tldr", "h1"],
              },
            },
          ]),
        },
      ],
    };
  },
  component: ComparisonPage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Comparison not found" intro="That comparison has moved." />
    </PageLayout>
  ),
});

function ComparisonPage() {
  const c = Route.useLoaderData() as Comparison;
  const others = COMPARISONS.filter((x) => x.slug !== c.slug);

  return (
    <PageLayout>
      <PageHero eyebrow="Decision guide" title={c.hero.title} accent={c.hero.accent} intro={c.hero.intro}>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source={`compare-${c.slug}`} label="Get a scoped quote" />
          <Link
            to="/trade-show-booth-rental-pricing"
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            See published pricing
          </Link>
        </div>
      </PageHero>

      <section id="tldr" className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">Short answer</p>
          <p className="text-white/85 text-lg leading-relaxed">{c.tldr}</p>
        </div>
      </section>

      <Section eyebrow="Side by side" title={`${c.optionA} vs. ${c.optionB}`}>
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-3 bg-white/[0.04] text-[11px] uppercase tracking-[0.16em] text-white/60">
            <div className="px-4 md:px-5 py-4">Factor</div>
            <div className="px-4 md:px-5 py-4 text-[oklch(0.85_0.13_300)]">{c.optionA}</div>
            <div className="px-4 md:px-5 py-4">{c.optionB}</div>
          </div>
          {c.rows.map((r) => (
            <div key={r.factor} className="grid grid-cols-3 border-t border-white/10 text-sm">
              <div className="px-4 md:px-5 py-4 font-semibold text-white/90">{r.factor}</div>
              <div className="px-4 md:px-5 py-4 text-white/75">{r.a}</div>
              <div className="px-4 md:px-5 py-4 text-white/75">{r.b}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="muted" eyebrow="Which one" title="Choosing between them">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.07] p-7">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight">{c.chooseA.heading}</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              {c.chooseA.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-[oklch(0.85_0.13_300)]">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/12 bg-black/40 p-7">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight">{c.chooseB.heading}</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              {c.chooseB.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-white/50">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-7">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-3">Our verdict</p>
          <p className="text-white/80 leading-relaxed">{c.verdict}</p>
        </div>
      </Section>

      {c.sections.map((s) => (
        <Section key={s.heading} title={s.heading}>
          <div className="max-w-3xl space-y-4">
            {s.body.map((p, i) => (
              <p key={i} className="text-white/72 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Section>
      ))}

      <FAQBlock items={c.faqs} title="Questions on this decision" />

      <Section eyebrow="Keep going" title="Other comparisons" bg="muted">
        <div className="grid md:grid-cols-3 gap-5">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/compare/$slug"
              params={{ slug: o.slug }}
              className="rounded-2xl border border-white/10 bg-black/40 p-6 hover:border-[oklch(0.78_0.13_300)]/50 transition"
            >
              <h3 className="font-display text-lg font-bold uppercase tracking-tight">{o.label}</h3>
              <p className="mt-2 text-sm text-white/60 line-clamp-3">{o.tldr}</p>
            </Link>
          ))}
        </div>
      </Section>

      <DesignCtaBand source={`compare-${c.slug}`} />
      <CTABand />
    </PageLayout>
  );
}
