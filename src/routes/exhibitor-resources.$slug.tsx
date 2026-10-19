import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { QuoteButton, BookMeetingButton, DesignCtaBand } from "@/components/GlobalCta";
import { EXHIBITOR_RESOURCES, RESOURCE_MAP, type ExhibitorResource } from "@/data/exhibitor-resources";
import { BudgetWorksheet } from "@/components/resources/BudgetWorksheet";
import { DeadlineTracker } from "@/components/resources/DeadlineTracker";
import { RoiCalculator } from "@/components/resources/RoiCalculator";
import { GraphicTemplatePicker } from "@/components/resources/GraphicTemplatePicker";
import { VenueRulesTable } from "@/components/resources/VenueRulesTable";
import { SITE } from "@/lib/site";
import { robotsMeta, absUrl } from "@/lib/seo";

export const Route = createFileRoute("/exhibitor-resources/$slug")({
  loader: ({ params }) => {
    const resource = RESOURCE_MAP[params.slug];
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Resource not found" }, { name: "robots", content: "noindex" }] };
    }
    const r = loaderData.resource;
    const url = absUrl(`/exhibitor-resources/${r.slug}`);
    return {
      meta: [
        { title: r.seo.title },
        { name: "description", content: r.seo.description },
        ...robotsMeta(),
        { property: "og:title", content: r.seo.title },
        { property: "og:description", content: r.seo.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: r.seo.title },
        { name: "twitter:description", content: r.seo.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": `${url}#article`,
                headline: r.seo.title,
                description: r.seo.description,
                url,
                author: { "@type": "Organization", name: SITE.name, url: SITE.url },
                publisher: {
                  "@type": "Organization",
                  name: SITE.name,
                  url: SITE.url,
                  telephone: SITE.phone,
                  email: SITE.email,
                },
                about: "Trade show exhibiting",
                isAccessibleForFree: true,
              },
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: r.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              ...(r.howTo
                ? [
                    {
                      "@type": "HowTo",
                      "@id": `${url}#howto`,
                      name: r.howTo.name,
                      step: r.howTo.steps.map((s, i) => ({
                        "@type": "HowToStep",
                        position: i + 1,
                        name: s.name,
                        text: s.text,
                      })),
                    },
                  ]
                : []),
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumbs`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Exhibitor Resources",
                    item: absUrl("/exhibitor-resources"),
                  },
                  { "@type": "ListItem", position: 3, name: r.label, item: url },
                ],
              },
              {
                "@type": "WebPage",
                "@id": url,
                name: r.seo.title,
                description: r.seo.description,
                speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
              },
            ],
          }),
        },
      ],
    };
  },
  component: ResourcePage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero
        title="Resource not found"
        intro="That resource has moved. Head back to the exhibitor resource center."
      >
        <Link
          to="/exhibitor-resources"
          className="mt-8 inline-block border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
        >
          All resources
        </Link>
      </PageHero>
    </PageLayout>
  ),
});

function ResourceTool({ resource }: { resource: ExhibitorResource }) {
  switch (resource.tool) {
    case "budget":
      return <BudgetWorksheet />;
    case "deadlines":
      return <DeadlineTracker />;
    case "roi":
      return <RoiCalculator />;
    case "specs":
      return <GraphicTemplatePicker />;
    case "venue-rules":
      return <VenueRulesTable />;
    default:
      return null;
  }
}

function ResourcePage() {
  const { resource: r } = Route.useLoaderData() as { resource: ExhibitorResource };
  const others = EXHIBITOR_RESOURCES.filter((x) => x.slug !== r.slug).slice(0, 4);

  return (
    <PageLayout>
      <PageHero eyebrow={r.eyebrow} title={r.hero.title} accent={r.hero.accent} intro={r.hero.intro}>
        <nav aria-label="Breadcrumb" className="mt-6 text-sm text-white/50">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/exhibitor-resources" className="hover:text-white">Exhibitor Resources</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{r.label}</span>
        </nav>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="resource-hero" />
          <BookMeetingButton source="resource-hero" />
        </div>
      </PageHero>

      <Section id="tldr">
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.06] p-6 md:p-8">
          <h2 className="font-display text-sm uppercase tracking-[0.28em] text-[oklch(0.78_0.13_300)]">
            Short answer
          </h2>
          <p className="mt-3 text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl">{r.tldr}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">
            {r.kind} · {r.readMinutes} min read
          </p>
        </div>
      </Section>

      <ResourceTool resource={r} />

      {r.sections.map((sec, i) => (
        <Section key={sec.heading} title={sec.heading} bg={i % 2 === 0 ? "muted" : "default"}>
          {sec.body?.map((p) => (
            <p key={p} className="max-w-3xl text-white/75 leading-relaxed text-base md:text-lg mb-4">
              {p}
            </p>
          ))}

          {sec.bullets && (
            <ul className="mt-4 grid md:grid-cols-2 gap-3 max-w-4xl">
              {sec.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-white/70 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.78_0.13_300)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {sec.checklist && (
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {sec.checklist.map((group) => (
                <div key={group.group} className="rounded-2xl border border-white/10 bg-black/30 p-6">
                  <h3 className="font-display text-lg font-semibold">{group.group}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-white/70 leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/25"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {sec.table && (
            <div className="mt-6 rounded-2xl border border-white/10 overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.16em] text-white/60">
                  <tr>
                    {sec.table.head.map((h) => (
                      <th key={h} className="px-5 py-4 text-left font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sec.table.rows.map((row) => (
                    <tr key={row.join("|")} className="border-t border-white/10 align-top">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`px-5 py-4 ${ci === 0 ? "font-semibold text-white/90" : "text-white/70"}`}
                        >
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

      <DesignCtaBand />
      <FAQBlock items={r.faqs} />

      <Section eyebrow="Keep planning" title="More exhibitor resources" bg="muted">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/exhibitor-resources/$slug"
              params={{ slug: o.slug }}
              className="group rounded-2xl border border-white/10 bg-black/30 p-6 hover:border-[oklch(0.78_0.13_300)]/50 transition"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">{o.eyebrow}</p>
              <h3 className="mt-3 font-display text-base font-semibold group-hover:text-[oklch(0.88_0.10_300)]">
                {o.label}
              </h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{o.summary}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTABand />
    </PageLayout>
  );
}
