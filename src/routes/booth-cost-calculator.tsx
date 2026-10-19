import { SITE } from "@/lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DesignCtaBand } from "@/components/GlobalCta";

import { CostEstimator } from "@/components/CostEstimator";
import { PricingGuideGate } from "@/components/PricingGuideGate";

const TITLE = "Trade Show Booth Cost Calculator (2026) | Traction X";
const DESC =
  "How much does a trade show booth cost? Real 2026 ranges for 10×10, 10×20, 20×20 and island booths — rental vs custom, with add-ons, freight, drayage and venue services.";

export const Route = createFileRoute("/booth-cost-calculator")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/booth-cost-calculator` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/booth-cost-calculator` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How much does a 10×10 trade show booth cost?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A 10×10 custom rental typically starts around $12,500 USD, with a fully custom build starting around $18,000 USD. Freight, drayage and install are additional.",
              },
            },
            {
              "@type": "Question",
              name: "How much does a 20×20 island booth cost?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A 20×20 island rental typically starts around $30,000 USD; a custom-built 20×20 island typically runs $43,000–$84,000+ USD depending on graphics, AV and hanging structures.",
              },
            },
            {
              "@type": "Question",
              name: "Is renting or buying a booth cheaper?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For exhibitors doing 1–3 shows per year, custom rentals are usually more cost-effective than owning — no storage, refurbishment or shipping-back costs. Frequent exhibitors (5+ shows/year with the same design) often break even on a purchased booth in year two.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

const ROWS = [
  { size: "10×10 Inline", rental: "$12,500 – $24,400", custom: "$18,000 – $35,000", notes: "1 backwall + counter" },
  { size: "10×20 Inline", rental: "$17,500 – $34,100", custom: "$25,000 – $48,800", notes: "Meeting nook + demo" },
  { size: "10×30 Inline", rental: "$21,000 – $41,000", custom: "$30,000 – $58,500", notes: "Long-form demos + storage" },
  { size: "10×40 Inline", rental: "$25,000 – $48,800", custom: "$36,000 – $70,300", notes: "Large inline experience" },
  { size: "20×20 Island", rental: "$30,000 – $58,500", custom: "$43,000 – $84,000", notes: "Rigging optional" },
  { size: "20×30 Island", rental: "$42,000 – $82,000", custom: "$60,000 – $117,000", notes: "Meeting rooms + AV" },
  { size: "20×40 Island", rental: "$54,000 – $105,300", custom: "$78,000 – $152,100", notes: "Multi-zone brand experience" },
  { size: "30×30+ Island", rental: "$62,000 – $121,000", custom: "$90,000 – $175,000", notes: "Double-deck capable" },
  { size: "Large Activation · 1,000+ sq ft", rental: "$78,000 – $152,100", custom: "$112,000 – $218,400", notes: "Custom experiential program" },
];

const ADDONS = [
  ["AV package (monitors, playback + audio)", "$1,900 – $4,500"],
  ["LED wall + processor (Premium / Architect)", "$8,000 – $25,000+"],
  ["Hanging sign / rigged truss", "$3,500 – $8,000"],
  ["Private meeting room", "$3,500 – $7,500"],
  ["Storage closet + lockable cabinets", "$1,200 – $2,400"],
  ["Lead capture + demo stations", "$2,000 – $4,500"],
  ["Show services (freight, drayage, electrical)", "Quoted by show and venue"],
];

function Page() {
  return (
    <div className="min-h-dvh bg-black text-white font-sans antialiased">
      <SiteHeader />

      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-5">
            2026 Cost Guide
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.02] max-w-4xl">
            How much does a{" "}
            <span className="text-[oklch(0.78_0.13_300)]">trade show booth</span> cost?
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed">
            Real, current ranges from projects we quote every week — 10×10 to island builds, rental vs custom, plus the add-ons and show services that move the number. Use the live estimator below: no email, no gate.
          </p>
        </div>
      </section>

      {/* Live interactive estimator */}
      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <CostEstimator />
        </div>
      </section>

      {/* Table */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-4 bg-white/[0.03] text-xs uppercase tracking-[0.18em] text-white/60">
            <div className="px-5 py-4">Booth</div>
            <div className="px-5 py-4">Custom rental</div>
            <div className="px-5 py-4">Custom build</div>
            <div className="px-5 py-4 hidden md:block">Typical inclusions</div>
          </div>
          {ROWS.map((r) => (
            <div key={r.size} className="grid grid-cols-4 border-t border-white/10 text-sm">
              <div className="px-5 py-4 font-semibold">{r.size}</div>
              <div className="px-5 py-4 text-white/80">{r.rental}</div>
              <div className="px-5 py-4 text-white/80">{r.custom}</div>
              <div className="px-5 py-4 text-white/60 hidden md:block">{r.notes}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/50">
          Ranges in USD. Directional only — final quotes depend on show, city and finish level.
        </p>
      </section>

      {/* Add-ons */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
            Common add-ons
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/55">
            Ranges below are the <strong className="text-white/80">10×20 baseline</strong>. Add-ons scale with
            footprint — roughly 40% less on a 10×10 and up to 3× on a 30×30 island. Use the estimator above
            for size-accurate numbers.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-3">
            {ADDONS.map(([label, price]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-5 py-4"
              >
                <span className="text-sm text-white/80">{label}</span>
                <span className="text-sm text-[oklch(0.78_0.13_300)] font-semibold">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Booth planner cross-link */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/35 bg-[oklch(0.78_0.13_300)]/[0.07] p-8 md:flex md:items-center md:justify-between md:gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
                Not sure what to build yet?
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-white/70">
                The booth planner asks a few questions about your event, goals and budget and recommends the
                exhibit approach — booth type, components, service level and investment range — in under three
                minutes.
              </p>
            </div>
            <Link
              to="/build-your-booth-plan"
              className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-xl bg-[oklch(0.78_0.13_300)] px-6 py-3 font-semibold text-black md:mt-0"
            >
              Build my booth plan <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing guide download */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <PricingGuideGate />
        </div>
      </section>

      {/* Rent vs Buy */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
          <h3 className="font-display text-xl font-bold uppercase tracking-tight">Rent when…</h3>
          <ul className="mt-4 space-y-2 text-white/75 text-sm">
            <li>• You exhibit 1–3 shows per year</li>
            <li>• Booth footprint changes between shows</li>
            <li>• You want new visuals per show without refurb costs</li>
            <li>• You need multi-city delivery handled for you</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
          <h3 className="font-display text-xl font-bold uppercase tracking-tight">Buy custom when…</h3>
          <ul className="mt-4 space-y-2 text-white/75 text-sm">
            <li>• You exhibit 5+ shows/year with the same footprint</li>
            <li>• Brand demands proprietary fabrication + finishes</li>
            <li>• You have a storage/refurb partner (we do this)</li>
            <li>• Long-term amortization &lt; annual rental cost</li>
          </ul>
        </div>
      </section>

      <DesignCtaBand source="page" />
      <SiteFooter />
    </div>
  );
}
