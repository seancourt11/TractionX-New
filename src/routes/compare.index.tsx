import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { COMPARISONS } from "@/data/comparisons";
import { SITE } from "@/lib/site";

const TITLE = "Trade Show Exhibit Comparisons — Rent vs Buy, Custom vs Modular | Traction X";
const DESC =
  "Straight comparisons for exhibit buyers: rent vs. buy, custom vs. modular, portable vs. custom rental, and full-service vs. self-managed — with real costs on both sides.";

export const Route = createFileRoute("/compare/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/compare` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/compare` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Trade show exhibit comparisons",
          itemListElement: COMPARISONS.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            url: `${SITE.url}/compare/${c.slug}`,
          })),
        }),
      },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Decision guides"
        title="Compare Your"
        accent="Exhibit Options"
        intro="Four decisions shape almost every exhibit budget. Here's each one with the real numbers on both sides — including the cases where the answer isn't us."
      />

      <Section eyebrow="Comparisons" title="Pick the decision you're facing">
        <div className="grid md:grid-cols-2 gap-6">
          {COMPARISONS.map((c) => (
            <Link
              key={c.slug}
              to="/compare/$slug"
              params={{ slug: c.slug }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-[oklch(0.78_0.13_300)]/60 transition group"
            >
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/50">
                <span>{c.optionA}</span>
                <span className="text-[oklch(0.78_0.13_300)]">vs</span>
                <span>{c.optionB}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight group-hover:text-[oklch(0.85_0.13_300)]">
                {c.label}
              </h2>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">{c.tldr}</p>
              <span className="mt-5 inline-block text-sm text-[oklch(0.78_0.13_300)] font-semibold">
                Read the comparison →
              </span>
            </Link>
          ))}
        </div>

        <Link
          to="/compare/trade-show-exhibit-rental-companies"
          className="group mt-6 block rounded-2xl border border-[oklch(0.78_0.13_300)]/35 bg-[oklch(0.78_0.13_300)]/[0.07] p-7 transition hover:border-[oklch(0.78_0.13_300)]/70"
        >
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">
            Vendor landscape · Freeman · GES · Czarnowski · Skyline · Nimlok
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight group-hover:text-[oklch(0.85_0.13_300)]">
            Exhibit rental companies compared
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65">
            Honest pros and cons for the major exhibit companies and service models — general service contractors,
            national exhibit houses, systems dealers and specialist custom-rental partners — plus ten questions to
            ask any vendor before you sign.
          </p>
          <span className="mt-5 inline-block text-sm font-semibold text-[oklch(0.78_0.13_300)]">
            Read the comparison →
          </span>
        </Link>
      </Section>

      <Section eyebrow="Also useful" title="Price it while you decide" bg="muted">
        <div className="flex flex-wrap gap-4">
          <Link
            to="/trade-show-booth-rental-pricing"
            className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60"
          >
            Published rental pricing →
          </Link>
          <Link
            to="/booth-cost-calculator"
            className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60"
          >
            Live cost estimator →
          </Link>
          <Link
            to="/guides"
            className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60"
          >
            Exhibitor guides →
          </Link>
        </div>
      </Section>

      <DesignCtaBand source="compare-index" />
      <CTABand />
    </PageLayout>
  );
}
