import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { resolveLegacyRedirect } from "../data/legacy-redirects";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DesignCtaBand } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";
import { SITE } from "@/lib/site";

const portfolio = import.meta.glob<{ default: { url: string } }>(
  "@/assets/portfolio/*.asset.json",
  { eager: true }
);
const imgUrl = (name: string) => {
  const key = Object.keys(portfolio).find((k) => k.endsWith(`/${name}.asset.json`));
  return key ? portfolio[key].default.url : "";
};

import type { CaseStudy } from "@/data/case-studies";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }): CaseStudy => {
    const cs = getCaseStudy(params.slug);
    if (!cs) {
      const legacy = resolveLegacyRedirect(`/case-studies/${params.slug}`);
      if (legacy) throw redirect({ href: legacy, statusCode: 301, throw: true });
      throw notFound();
    }
    return cs;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Case study" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.client} — ${loaderData.show} | Traction X Case Study`;
    const desc = loaderData.summary;
    const url = `${SITE.url}/case-studies/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
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
              headline: title,
              description: desc,
              about: `${loaderData.client} trade show exhibit at ${loaderData.show}`,
              datePublished: `${loaderData.year}-01-01`,
              author: { "@type": "Organization", name: SITE.name, url: SITE.url },
              publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
              mainEntityOfPage: url,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE.url}/case-studies` },
                { "@type": "ListItem", position: 3, name: loaderData.client, item: url },
              ],
            },
            ...(loaderData.quote
              ? [
                  {
                    "@context": "https://schema.org",
                    "@type": "Review",
                    reviewBody: loaderData.quote.text,
                    author: { "@type": "Person", name: loaderData.quote.who },
                    itemReviewed: { "@type": "Organization", name: SITE.name, url: SITE.url },
                  },
                ]
              : []),
          ]),

        },
      ],
    };
  },

  component: Page,
  notFoundComponent: () => (
    <div className="min-h-dvh bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-3xl uppercase">Case study not found</h1>
        <Link to="/case-studies" className="text-[oklch(0.78_0.13_300)] hover:underline mt-4 inline-block">
          ← All case studies
        </Link>
      </div>
    </div>
  ),
});

function Page() {
  const cs = Route.useLoaderData() as CaseStudy;
  const others = CASE_STUDIES.filter((c) => c.slug !== cs.slug).slice(0, 3);

  return (
    <div className="min-h-dvh bg-black text-white font-sans antialiased">
      <SiteHeader />

      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[oklch(0.78_0.13_300)] mb-5">
              {cs.client} · {cs.show} · {cs.year}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[1.05]">
              {cs.title}
            </h1>
            <p className="mt-5 text-white/70 text-base md:text-lg">{cs.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
              <span className="border border-white/15 rounded-full px-3 py-1.5">{cs.size}</span>
              <span className="border border-white/15 rounded-full px-3 py-1.5">{cs.city}</span>
              <span className="border border-white/15 rounded-full px-3 py-1.5">{cs.industry}</span>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
            <img src={imgUrl(cs.heroImage)} alt={`${cs.client} booth`} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {cs.results.map((r) => (
          <div key={r.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="font-display text-4xl md:text-5xl font-bold text-[oklch(0.78_0.13_300)]">
              {r.value}
            </div>
            <div className="mt-2 text-sm uppercase tracking-widest text-white/60">{r.label}</div>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-10">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">Challenge</div>
          <ul className="space-y-3 text-white/75">
            {cs.challenge.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="text-[oklch(0.78_0.13_300)]">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">Our approach</div>
          <ul className="space-y-3 text-white/75">
            {cs.approach.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="text-[oklch(0.78_0.13_300)]">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {cs.gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cs.gallery.map((g) => (
              <div key={g} className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]">
                <img src={imgUrl(g)} alt={g} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {cs.quote && (
        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <div className="text-[oklch(0.78_0.13_300)] text-4xl leading-none">"</div>
            <p className="mt-4 font-display text-2xl md:text-3xl leading-snug tracking-tight">
              {cs.quote.text}
            </p>
            <div className="mt-6 text-sm uppercase tracking-widest text-white/60">
              — {cs.quote.who}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 py-16">
        <QuoteForm
          heading={`Plan your ${cs.industry.toLowerCase()} exhibit`}
          intro={`Same brief, same crew that delivered ${cs.client}'s ${cs.size} booth. Get a same-day directional estimate.`}
          defaultCity={cs.city}
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">More case studies</div>
        <div className="grid md:grid-cols-3 gap-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/case-studies/$slug"
              params={{ slug: o.slug }}
              className="group rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[oklch(0.78_0.13_300)]/50 transition"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={imgUrl(o.heroImage)} alt={o.client} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-widest text-[oklch(0.78_0.13_300)]">{o.client}</div>
                <div className="mt-1 font-display font-bold uppercase tracking-tight text-sm">{o.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DesignCtaBand source="page" />
      <SiteFooter />
    </div>
  );
}
