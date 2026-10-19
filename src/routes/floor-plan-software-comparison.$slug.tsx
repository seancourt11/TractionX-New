import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { FLOORPLAN_PLATFORMS, getFloorPlanPlatform } from "@/data/floorplan-platforms";
import { FloorPlanPartnerBooths } from "@/components/FloorPlanPartnerBooths";
import { SITE } from "@/lib/site";
import { noindexMeta, absUrl } from "@/lib/seo";

export const Route = createFileRoute("/floor-plan-software-comparison/$slug")({
  loader: ({ params }) => {
    const platform = getFloorPlanPlatform(params.slug);
    if (!platform) throw notFound();
    return { platform };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Platform not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.platform;
    const title = `${p.name} for Trade Show Floor Plans — Capabilities, Fit and Managed Support | Traction X`;
    const desc = `${p.name} for trade show floor plans: strengths, considerations, pricing transparency and who should pick it — plus how a managed partner keeps it running.`;
    const url = absUrl(`/floor-plan-software-comparison/${p.slug}`);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        ...noindexMeta(),
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumbs`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Floor Plan Software Comparison",
                    item: absUrl("/floor-plan-software-comparison"),
                  },
                  { "@type": "ListItem", position: 3, name: p.name, item: url },
                ],
              },
              {
                "@type": "WebPage",
                "@id": url,
                name: title,
                description: desc,
                dateModified: p.lastVerified,
              },
            ],
          }),
        },
      ],
    };
  },
  component: DetailPage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero
        title="Platform not found"
        intro="We don't have a comparison page for that platform yet. Head back to the floor plan software comparison hub."
      >
        <Link
          to="/floor-plan-software-comparison"
          className="mt-6 inline-block text-[oklch(0.78_0.13_300)] hover:underline"
        >
          ← All platforms
        </Link>
      </PageHero>
    </PageLayout>
  ),
});

function DetailPage() {
  const { platform: p } = Route.useLoaderData() as {
    platform: (typeof FLOORPLAN_PLATFORMS)[number];
  };
  const others = FLOORPLAN_PLATFORMS.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <PageLayout>
      <PageHero
        eyebrow={p.category}
        title={p.name}
        accent="for Trade Show Floor Plans"
        intro={p.bestFor}
      >
        <nav aria-label="Breadcrumb" className="mt-6 text-sm text-white/50">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/floor-plan-software-comparison" className="hover:text-white">
            Floor Plan Software Comparison
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{p.name}</span>
        </nav>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source={`floorplan-${p.slug}-hero`} />
          <Link
            to="/custom-trade-show-floor-plans"
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            See our managed floor plan service
          </Link>
        </div>
      </PageHero>

      <Section eyebrow="What it is" title={`What ${p.name} is`}>
        <p className="max-w-3xl text-white/75 leading-relaxed text-base md:text-lg">
          {p.name} is a {p.category.toLowerCase()} used by trade show and event organizers. {p.bestFor}
        </p>
      </Section>

      <Section eyebrow="Strengths" title={`Where ${p.name} stands out`} bg="muted">
        <ul className="grid md:grid-cols-2 gap-3 max-w-4xl">
          {p.strengths.map((s) => (
            <li key={s} className="flex gap-3 text-white/70 leading-relaxed">
              <span className="text-[oklch(0.78_0.13_300)]" aria-hidden="true">→</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Considerations" title="Fair considerations to weigh">
        <ul className="grid md:grid-cols-2 gap-3 max-w-4xl">
          {p.considerations.map((c) => (
            <li key={c} className="flex gap-3 text-white/70 leading-relaxed">
              <span className="text-white/40" aria-hidden="true">•</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Pricing transparency" title="What's publicly known about pricing" bg="muted">
        <p className="max-w-3xl text-white/75 leading-relaxed text-base md:text-lg">{p.pricingNote}</p>
      </Section>

      <Section eyebrow="Who should pick it" title={`When ${p.name} is the right call`}>
        <ul className="grid md:grid-cols-2 gap-3 max-w-4xl">
          {p.whoShouldPick.map((w) => (
            <li key={w} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-white/75">
              {w}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Where we fit" title={`How a managed partner works alongside ${p.name}`} bg="muted">
        <p className="max-w-3xl text-white/75 leading-relaxed text-base md:text-lg">{p.whereWeFit}</p>
        <p className="mt-6 max-w-2xl text-white/60 text-sm leading-relaxed">
          Last verified: {p.lastVerified}. Platform features and pricing change — always confirm current details
          directly with the vendor before purchasing.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <QuoteButton source={`floorplan-${p.slug}-fit`} />
          <Link
            to="/custom-trade-show-floor-plans"
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            Talk to our floor plan team
          </Link>
        </div>
      </Section>

      <FloorPlanPartnerBooths platformName={p.name} source={`floorplan-${p.slug}-booths`} />

      <Section eyebrow="Compare more" title="Other floor plan platforms">
        <div className="grid md:grid-cols-3 gap-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/floor-plan-software-comparison/$slug"
              params={{ slug: o.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="font-display font-semibold">{o.name}</div>
              <div className="mt-1 text-sm text-white/60">{o.bestFor}</div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/floor-plan-software-comparison" className="text-[oklch(0.78_0.13_300)] hover:underline text-sm">
            ← Back to the full comparison hub
          </Link>
        </div>
      </Section>

      <DesignCtaBand source={`floorplan-${p.slug}`} />
      <CTABand />
    </PageLayout>
  );
}
