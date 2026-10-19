import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { GUIDES } from "@/data/guides";
import { SITE } from "@/lib/site";

const TITLE = "Trade Show Exhibitor Guides — Drayage, Customs & Planning | Traction X";
const DESC =
  "Practical exhibitor guides from the people who ship the crates: drayage and union labour explained, cross-border customs between Canada and the USA, and a first-time exhibitor checklist.";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/guides` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/guides` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Trade show exhibitor guides",
          itemListElement: GUIDES.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: g.label,
            url: `${SITE.url}/guides/${g.slug}`,
          })),
        }),
      },
    ],
  }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Resources"
        title="Exhibitor"
        accent="Guides"
        intro="The operational detail nobody publishes: how drayage is actually billed, what union jurisdictions permit, how exhibits clear the Canada–US border, and what a first show really costs."
      />

      <Section eyebrow="Guides" title="Read before you book the space">
        <div className="grid md:grid-cols-3 gap-6">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              to="/guides/$slug"
              params={{ slug: g.slug }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-[oklch(0.78_0.13_300)]/60 transition group flex flex-col"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                {g.eyebrow} · {g.readMinutes} min
              </span>
              <h2 className="mt-4 font-display text-xl font-bold uppercase tracking-tight group-hover:text-[oklch(0.85_0.13_300)]">
                {g.label}
              </h2>
              <p className="mt-3 text-sm text-white/65 leading-relaxed flex-1">{g.tldr}</p>
              <span className="mt-5 text-sm text-[oklch(0.78_0.13_300)] font-semibold">Read the guide →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="More" title="Related resources" bg="muted">
        <div className="flex flex-wrap gap-4">
          <Link to="/resources/trade-show-exhibit-glossary" className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60">
            Exhibit glossary →
          </Link>
          <Link to="/compare" className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60">
            Comparison guides →
          </Link>
          <Link to="/trade-show-booth-rental-pricing" className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60">
            Published pricing →
          </Link>
          <Link to="/trade-show-marketing-benchmark-report-2026" className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60">
            2026 benchmark report →
          </Link>
        </div>
      </Section>

      <DesignCtaBand source="guides-index" />
      <CTABand />
    </PageLayout>
  );
}
