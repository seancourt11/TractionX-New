import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { COMBO_SIZES, COMBO_INDUSTRIES, COMBOS } from "@/data/industries";
import { SITE } from "@/lib/site";

const TITLE = "Trade Show Booth Rentals by Size & Industry | Traction X";
const DESC =
  "Custom 10×10, 10×20 and 20×20 trade show booth rentals built for medical device, technology, defence, industrial, food & beverage, energy, finance and cannabis exhibitors.";

export const Route = createFileRoute("/booth-rental/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/booth-rental` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/booth-rental` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Trade show booth rentals by size and industry",
          itemListElement: COMBOS.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${c.size.label} booth rental for ${c.industry.label}`,
            url: `${SITE.url}/booth-rental/${c.slug}`,
          })),
        }),
      },
    ],
  }),
  component: ComboIndex,
});

function ComboIndex() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Rentals by size & sector"
        title="Booth Rentals Built"
        accent="For Your Industry"
        intro="A 10×20 for a medical device launch and a 10×20 for a SaaS demo floor are not the same booth. Pick your footprint and your sector for the layout, compliance notes and pricing that actually apply."
      >
        <div className="mt-8">
          <QuoteButton source="combo-index" />
        </div>
      </PageHero>

      {COMBO_SIZES.map((size, i) => (
        <Section
          key={size.slug}
          bg={i % 2 === 1 ? "muted" : "default"}
          eyebrow={`${size.dims} · ${size.sqft} sq ft · from ${size.rentalFrom}`}
          title={`${size.label} booth rentals`}
          intro={size.layout}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMBO_INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                to="/booth-rental/$slug"
                params={{ slug: `${size.slug}-booth-rental-for-${ind.slug}` }}
                className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 hover:border-[oklch(0.78_0.13_300)]/60 transition"
              >
                <p className="font-semibold text-white/90">{ind.label}</p>
                <p className="mt-1 text-xs text-white/50">{size.label} rental →</p>
              </Link>
            ))}
          </div>
        </Section>
      ))}

      <Section eyebrow="Also" title="Price it and compare it" bg="muted">
        <div className="flex flex-wrap gap-4">
          <Link to="/trade-show-booth-rental-pricing" className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60">
            Published pricing →
          </Link>
          <Link to="/rent-a-booth" className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60">
            Browse the rental catalog →
          </Link>
          <Link to="/compare" className="rounded-xl border border-white/15 px-6 py-4 hover:border-[oklch(0.78_0.13_300)]/60">
            Rent vs. buy →
          </Link>
        </div>
      </Section>

      <DesignCtaBand source="combo-index" />
      <CTABand />
    </PageLayout>
  );
}
