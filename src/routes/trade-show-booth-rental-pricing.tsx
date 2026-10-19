import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { CostEstimator } from "@/components/CostEstimator";
import { ESTIMATE_DISCLAIMER } from "@/components/QuoteModal";
import { PricingGuideGate } from "@/components/PricingGuideGate";
import { PRICING_TIERS, PRICING_INCLUDED, PRICING_NOT_INCLUDED, SPEC_TIERS, tierPrice } from "@/data/pricing-tiers";
import { SITE } from "@/lib/site";

const PATH = "/trade-show-booth-rental-pricing";
const TITLE = "Custom Trade Show Booth Rental Pricing 2026 — Real Costs by Size | Traction X";
const DESC =
  "Published custom trade show booth rental prices: 10×10 from $16,250, 10×20 from $22,750, 20×20 island from $39,000. What's included, what isn't, and what show services really add.";

// Shared with the downloadable pricing guide PDF so the two can never drift.
const TIERS = PRICING_TIERS;
const INCLUDED = PRICING_INCLUDED;
const NOT_INCLUDED = PRICING_NOT_INCLUDED;

const FAQS = [
  { q: "How much does a trade show booth rental cost?", a: "A custom 10×10 rental starts at $16,250, a 10×20 at $22,750 and a 20×20 island at $39,000. These are starting points for a fully custom-fabricated rental — design, structure, graphics, standard lighting, install and dismantle, and project management included. Show services such as drayage and electrical are separate and typically add 30–60%." },
  { q: "Why do you publish prices when other exhibit houses don't?", a: "Because quote-gating wastes everyone's time. If our starting ranges don't fit your budget you should know that in thirty seconds, not after three meetings. Published ranges also mean the conversation starts at design rather than at price discovery." },
  { q: "What makes the price move within a range?", a: "The amount of structure in the design (walls, towers, enclosed rooms, overhead and second-storey elements), the depth of customisation, and how much AV and lighting is integrated. The show city matters too — we include install and dismantle labour, so strict union jurisdictions carry a higher built-in labour cost." },
  { q: "Is a custom rental really custom?", a: "Yes. We fabricate to your drawings in your finishes and geometry. The difference from an owned booth is what happens afterwards: we recover and remake the structure rather than shipping it to your warehouse." },
  { q: "Do you offer discounts for booking early?", a: "Yes — early commitments give us fabrication scheduling certainty, and we pass that back. Booking well ahead of the show also means you hit the venue's advance-order discount deadlines, which is worth 20–35% on show services by itself." },
  { q: "Can you work to a fixed budget?", a: "Almost always. Tell us the number and the objective and we design to it — that's a more productive starting point than a blank brief. Below about $6,000 a portable programme is usually the honest recommendation." },
];

export const Route = createFileRoute("/trade-show-booth-rental-pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}${PATH}` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Custom Trade Show Booth Rental",
            description: DESC,
            brand: { "@type": "Brand", name: SITE.name },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "USD",
              lowPrice: "16250",
              highPrice: "180000",
              offerCount: TIERS.length,
              availability: "https://schema.org/InStock",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Booth Rental Pricing", item: `${SITE.url}${PATH}` },
            ],
          },
        ]),
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="2026 Pricing"
        title="Custom Trade Show"
        accent="Booth Rental Pricing"
        intro="Most exhibit companies make you request a quote to learn anything. We publish our starting ranges so you can budget today — but every booth is custom, so the only way to get an accurate number is to send us your show, footprint and dates. Most quotes go back within one business day."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="pricing-hero" label="Get my exact quote" />

          <a
            href="#estimator"
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            Use the live estimator ↓
          </a>
        </div>
      </PageHero>

      {/* Quick answer block for AI/answer engines */}
      <section id="tldr" className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">Quick answer</p>
          <p className="text-white/85 text-lg leading-relaxed">
            Custom trade show booth rentals from Traction X start at{" "}
            <strong className="text-white">$16,250 for a 10×10</strong>,{" "}
            <strong className="text-white">$22,750 for a 10×20</strong> and{" "}
            <strong className="text-white">$39,000 for a 20×20 island</strong>. Those figures cover design,
            fabrication, graphics, standard lighting, install and dismantle labour, and project management.
            Show services — drayage, electrical and rigging — are billed separately by the venue's contractor
            and typically add another 30–60% of booth cost.

          </p>
        </div>
      </section>

      <Section
        eyebrow="By footprint"
        title="Starting-from prices by booth size"
        intro="Every footprint comes at three build levels — standard, premium and flagship — and every figure is a starting-from price. Cost moves with the amount of structure, the depth of customisation, and how much AV and lighting is integrated. Rental and purchase pricing shown side by side."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {TIERS.map((t) => (
            <div
              key={t.size}
              className={`rounded-2xl border p-6 flex flex-col ${
                t.featured
                  ? "border-[oklch(0.78_0.13_300)]/60 bg-[oklch(0.78_0.13_300)]/[0.08]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {t.featured && (
                <span className="self-start mb-3 text-[10px] uppercase tracking-[0.2em] bg-[oklch(0.78_0.13_300)] text-black px-2.5 py-1 rounded-full font-bold">
                  Most requested
                </span>
              )}
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">{t.size}</h3>
              <p className="text-xs text-white/45 mt-1">{t.sqft}</p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-white/50">Custom rental starting from</p>
              <p className="font-display text-3xl font-bold text-[oklch(0.85_0.13_300)]">{t.rental}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/50">Owned build starting from</p>
              <p className="font-display text-xl font-bold text-white/75">{t.custom}</p>

              <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Build levels</p>
                <table className="mt-2 w-full text-xs">
                  <thead>
                    <tr className="text-white/45">
                      <th className="text-left font-medium pb-1">Build</th>
                      <th className="text-right font-medium pb-1">Rental from</th>
                      <th className="text-right font-medium pb-1">Purchase from</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SPEC_TIERS.map((s) => (
                      <tr key={s.level} className="border-t border-white/10">
                        <td className="py-1.5 text-white/70">{s.short}</td>
                        <td className="py-1.5 text-right font-semibold text-[oklch(0.85_0.13_300)]">
                          {tierPrice(t.rental, s.multiplier)}
                        </td>
                        <td className="py-1.5 text-right font-semibold text-white/80">
                          {tierPrice(t.custom, s.multiplier)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

                            <ul className="mt-4 space-y-1.5 text-sm text-white/70 flex-1">
                {t.includes.map((i) => (
                  <li key={i}>✓ {i}</li>
                ))}
              </ul>



              <div className="mt-6">
                <QuoteButton source={`pricing-${t.size}`} size={t.size} label="Quote this size" variant="outline" className="w-full justify-center" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPEC_TIERS.map((s) => (
            <div key={s.level} className="rounded-xl border border-white/10 bg-black/30 p-5">
              <p className="font-display text-sm font-bold uppercase tracking-tight text-[oklch(0.85_0.13_300)]">
                {s.label}
              </p>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{s.blurb}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-white/45 max-w-3xl">{ESTIMATE_DISCLAIMER}</p>
      </Section>

      <Section eyebrow="Transparency" title="What's included — and what isn't" bg="muted">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-7">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[oklch(0.85_0.13_300)]">
              Included in every rental price
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {INCLUDED.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[oklch(0.78_0.13_300)]">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-7">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight">
              Billed separately — and why
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              {NOT_INCLUDED.map(([label, note]) => (
                <li key={label}>
                  <span className="font-semibold text-white">{label}</span>
                  <p className="text-white/60 mt-0.5 leading-relaxed">{note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/45 leading-relaxed">
              We don't mark up show services. Bundling them into a booth price would make the number look
              tidier and cost you more — read the{" "}
              <Link to="/guides/$slug" params={{ slug: "trade-show-drayage-and-union-labor-explained" }} className="text-[oklch(0.78_0.13_300)] hover:underline">
                drayage and union labour guide
              </Link>{" "}
              for how these charges actually work.
            </p>
          </div>
        </div>
      </Section>

      <section id="estimator" className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <CostEstimator />
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <PricingGuideGate />
        </div>
      </section>

      <Section eyebrow="Next" title="Work out which model fits" bg="muted">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { slug: "rent-vs-buy-trade-show-booth", title: "Rent vs. buy", body: "Break-even show counts and the ownership costs that never make the model." },
            { slug: "custom-vs-modular-trade-show-exhibits", title: "Custom vs. modular", body: "Where the 35–50% cost gap comes from, and why hybrids usually win." },
            { slug: "portable-vs-custom-booth-rental", title: "Portable vs. custom rental", body: "The honest breakpoint between a pop-up and a fabricated build." },
          ].map((c) => (
            <Link
              key={c.slug}
              to="/compare/$slug"
              params={{ slug: c.slug }}
              className="rounded-2xl border border-white/10 bg-black/40 p-6 hover:border-[oklch(0.78_0.13_300)]/50 transition"
            >
              <h3 className="font-display text-lg font-bold uppercase tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{c.body}</p>
              <span className="mt-4 inline-block text-sm text-[oklch(0.78_0.13_300)]">Compare →</span>
            </Link>
          ))}
        </div>
      </Section>

      <FAQBlock items={FAQS} title="Pricing questions" />
      <DesignCtaBand source="pricing" />
      <CTABand heading="Know your budget? Let's design to it." />
    </PageLayout>
  );
}
