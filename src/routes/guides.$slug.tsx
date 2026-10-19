import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton, BookMeetingButton } from "@/components/GlobalCta";
import { GUIDES, GUIDE_MAP, type Guide } from "@/data/guides";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }): Guide => {
    const g = GUIDE_MAP[params.slug];
    if (!g) throw notFound();
    return g;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Guide" }, { name: "robots", content: "noindex" }] };
    const url = `${SITE.url}/guides/${params.slug}`;
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
              "@type": "Article",
              headline: loaderData.seo.title,
              description: loaderData.seo.description,
              author: { "@type": "Organization", name: SITE.name, url: SITE.url },
              publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
              mainEntityOfPage: url,
              articleSection: loaderData.eyebrow,
            },
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
                { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE.url}/guides` },
                { "@type": "ListItem", position: 3, name: loaderData.label, item: url },
              ],
            },
          ]),
        },
      ],
    };
  },
  component: GuidePage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Guide not found" intro="That guide has moved." />
    </PageLayout>
  ),
});

function GuidePage() {
  const g = Route.useLoaderData() as Guide;
  const others = GUIDES.filter((x) => x.slug !== g.slug);

  return (
    <PageLayout>
      <PageHero
        eyebrow={`${g.eyebrow} · ${g.readMinutes} min read`}
        title={g.hero.title}
        accent={g.hero.accent}
        intro={g.hero.intro}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source={`guide-${g.slug}`} label="Get this handled for you" />
          <BookMeetingButton variant="outline" source={`guide-${g.slug}`} />
        </div>
      </PageHero>

      <section id="tldr" className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">The short version</p>
          <p className="text-white/85 text-lg leading-relaxed">{g.tldr}</p>
        </div>
      </section>

      {/* On-page contents for crawl depth + UX */}
      <section className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">In this guide</p>
          <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/70 list-decimal list-inside">
            {g.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${slugify(s.heading)}`} className="hover:text-[oklch(0.85_0.13_300)]">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {g.sections.map((s, idx) => (
        <Section key={s.heading} id={slugify(s.heading)} title={s.heading} bg={idx % 2 === 1 ? "muted" : "default"}>
          <div className="max-w-3xl space-y-4">
            {s.body.map((p, i) => (
              <p key={i} className="text-white/72 leading-relaxed">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-6 space-y-2.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-white/75">
                    <span className="text-[oklch(0.78_0.13_300)]">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {s.table && (
            <div className="mt-8 rounded-2xl border border-white/10 overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.16em] text-white/60">
                  <tr>
                    {s.table.head.map((h) => (
                      <th key={h} className="px-5 py-4 text-left font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((r, i) => (
                    <tr key={i} className="border-t border-white/10">
                      {r.map((cell, j) => (
                        <td key={j} className={`px-5 py-4 ${j === 0 ? "font-semibold text-white/90" : "text-white/70"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      ))}

      <FAQBlock items={g.faqs} title="Questions we get on this" />

      <Section eyebrow="Keep reading" title="Other exhibitor guides" bg="muted">
        <div className="grid md:grid-cols-2 gap-5">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/guides/$slug"
              params={{ slug: o.slug }}
              className="rounded-2xl border border-white/10 bg-black/40 p-6 hover:border-[oklch(0.78_0.13_300)]/50 transition"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">{o.eyebrow}</span>
              <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-tight">{o.label}</h3>
              <p className="mt-2 text-sm text-white/60">{o.tldr.slice(0, 150)}…</p>
            </Link>
          ))}
          <Link
            to="/resources/trade-show-exhibit-glossary"
            className="rounded-2xl border border-white/10 bg-black/40 p-6 hover:border-[oklch(0.78_0.13_300)]/50 transition"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">Reference</span>
            <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-tight">
              Trade Show Exhibit Glossary
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Every term on your show-services order form, defined in plain language.
            </p>
          </Link>
        </div>
      </Section>

      <DesignCtaBand source={`guide-${g.slug}`} />
      <CTABand heading="Want us to run the logistics instead?" />
    </PageLayout>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
