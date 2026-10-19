import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { GLOSSARY, GLOSSARY_LETTERS } from "@/data/glossary";
import { SITE } from "@/lib/site";

const PATH = "/resources/trade-show-exhibit-glossary";
const TITLE = "Trade Show Exhibit Glossary — 40+ Terms Defined | Traction X";
const DESC =
  "Drayage, CWT, EAC, bone yard, rigging, I&D — every trade show exhibit and show-services term defined in plain language by the team that ships the crates.";

export const Route = createFileRoute("/resources/trade-show-exhibit-glossary")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}${PATH}` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            name: "Trade Show Exhibit Glossary",
            description: DESC,
            url: `${SITE.url}${PATH}`,
            hasDefinedTerm: GLOSSARY.map((g) => ({
              "@type": "DefinedTerm",
              name: g.term,
              description: g.definition,
              url: `${SITE.url}${PATH}#${g.slug}`,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE.url}${PATH}` },
            ],
          },
        ]),
      },
    ],
  }),
  component: GlossaryPage,
});

const CATEGORIES = ["All", "Logistics", "Structure", "Show services", "Graphics", "Commercial"] as const;

function GlossaryPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GLOSSARY.filter(
      (g) =>
        (cat === "All" || g.category === cat) &&
        (!needle || g.term.toLowerCase().includes(needle) || g.definition.toLowerCase().includes(needle)),
    ).sort((a, b) => a.term.localeCompare(b.term));
  }, [q, cat]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof GLOSSARY> = {};
    filtered.forEach((g) => {
      (map[g.letter] ||= []).push(g);
    });
    return map;
  }, [filtered]);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Reference"
        title="Trade Show Exhibit"
        accent="Glossary"
        intro="Show-services paperwork is written in an industry dialect that costs first-time exhibitors real money. Here is every term you'll meet — drayage, CWT, EAC, bone yard, I&D — defined the way we'd explain it on a call."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="glossary-hero" label="Have us handle the jargon" />
          <Link
            to="/guides/$slug"
            params={{ slug: "trade-show-drayage-and-union-labor-explained" }}
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            Read the drayage guide
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-white/10 sticky top-0 z-30 bg-black/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-4 md:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms…"
            className="w-full md:w-72 bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  cat === c
                    ? "bg-[oklch(0.78_0.13_300)] text-black border-transparent"
                    : "border-white/15 text-white/65 hover:border-white/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <span className="text-xs text-white/40 md:ml-auto">{filtered.length} terms</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-4 flex flex-wrap gap-1.5">
          {GLOSSARY_LETTERS.map((l) => (
            <a
              key={l}
              href={`#letter-${l}`}
              className="w-7 h-7 grid place-items-center rounded text-xs font-bold text-white/55 hover:text-black hover:bg-[oklch(0.78_0.13_300)]"
            >
              {l}
            </a>
          ))}
        </div>
      </section>

      <Section>
        {Object.keys(grouped).length === 0 && (
          <p className="text-white/55">No terms match that search.</p>
        )}
        <div className="space-y-12">
          {Object.entries(grouped).map(([letter, terms]) => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-40">
              <h2 className="font-display text-4xl font-bold text-[oklch(0.78_0.13_300)] mb-6">{letter}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {terms.map((t) => (
                  <div
                    key={t.slug}
                    id={t.slug}
                    className="scroll-mt-44 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg font-bold uppercase tracking-tight">{t.term}</h3>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 border border-white/15 rounded-full px-2.5 py-1 whitespace-nowrap">
                        {t.category}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-white/75 leading-relaxed">{t.definition}</p>
                    {t.detail && <p className="mt-3 text-sm text-white/55 leading-relaxed">{t.detail}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Go deeper" title="Guides that use these terms" bg="muted">
        <div className="flex flex-wrap gap-4">
          <Link to="/guides" className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60">
            All exhibitor guides →
          </Link>
          <Link to="/trade-show-booth-rental-pricing" className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60">
            What a booth actually costs →
          </Link>
          <Link to="/compare" className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60">
            Rent vs. buy and other comparisons →
          </Link>
        </div>
      </Section>

      <DesignCtaBand source="glossary" />
      <CTABand />
    </PageLayout>
  );
}
