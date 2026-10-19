import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/lib/site";

const TITLE = "Trade Show Displays — Rentals, Custom, Portable, Modular | Traction X";
const DESC = "Every display format under one roof: exhibit rentals, custom trade show exhibits, portable displays and 700+ modular booth designs. Delivered globally.";

export const Route = createFileRoute("/trade-show-displays")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/trade-show-displays` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/trade-show-displays` }],
  }),
  component: TradeShowDisplays,
});

function TradeShowDisplays() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Displays"
        title="Trade Show"
        accent="Displays"
        intro="Rentals, custom exhibits, portable displays and modular systems — from 10×10 in-lines to 30×50 island builds. One partner, every format."
      />
      <Section eyebrow="Choose your format" title="Four ways to exhibit">
        <div className="grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <h3 className="font-display text-2xl font-semibold">{p.label}</h3>
              <p className="mt-3 text-white/70 leading-relaxed">{p.short}</p>
              <span className="mt-4 inline-block text-sm text-[oklch(0.78_0.13_300)] group-hover:underline">
                Explore {p.label.toLowerCase()} →
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-white/70 max-w-3xl leading-relaxed">
          Need the same booth to be a 10×10 next show and a 20×20 the one after?{" "}
          <Link to="/reconfigurable-trade-show-booths" className="text-[oklch(0.78_0.13_300)] hover:underline">
            See our reconfigurable trade show booths
          </Link>{" "}
          — one inventory that re-frames to any footprint.
        </p>
      </Section>
      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
