import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton, BookMeetingButton } from "@/components/GlobalCta";
import { SITE } from "@/lib/site";

const PATH = "/trade-show-marketing-benchmark-report-2026";
const TITLE = "2026 Trade Show Marketing Benchmark Report | Traction X";
const DESC =
  "Original benchmark data on 2026 trade show budgets: booth cost per square foot, show-services load, lead cost, staffing ratios and cost-per-qualified-conversation across Canadian and US shows.";

const BENCHMARKS = [
  { metric: "Booth cost per sq ft (custom rental)", inline: "$110 – $145", island: "$85 – $130", note: "Islands buy square footage more efficiently; in-lines carry a fixed backwall cost over less floor." },
  { metric: "Show services as % of booth cost", inline: "35 – 60%", island: "40 – 70%", note: "Drayage, electrical, rigging and labour. Islands add rigging and heavier power loads." },
  { metric: "Total programme cost per show", inline: "$28K – $48K", island: "$70K – $160K", note: "Booth, services, freight, travel and collateral for a mid-size exhibitor." },
  { metric: "Staff per shift", inline: "2 – 3", island: "6 – 10", note: "Understaffing is the most common and least expensive-to-fix mistake on the floor." },
  { metric: "Qualified conversations per show day", inline: "18 – 35", island: "55 – 120", note: "Qualified means budget, authority or timeline surfaced — not a badge scan." },
  { metric: "Cost per qualified conversation", inline: "$180 – $420", island: "$150 – $380", note: "Still materially cheaper than most paid-media equivalents in B2B." },
];

const FINDINGS = [
  {
    h: "Show services are the budget, not the booth",
    b: "Across the programmes we ran, drayage, electrical, rigging and labour averaged 35–70% on top of booth cost. Exhibitors who budgeted booth-only were over budget before the doors opened. The single highest-leverage planning act is estimating services first and sizing the booth to what's left.",
  },
  {
    h: "Advance-order deadlines are worth more than negotiation",
    b: "Ordering electrical, rigging and labour before the advance deadline saved 20–35% versus on-site rates. No amount of vendor negotiation matches simply filing the paperwork three weeks earlier — and the deadline is usually 30–45 days before move-in, not the week before.",
  },
  {
    h: "Crate weight, not booth design, drives drayage",
    b: "Two booths of identical footprint varied by more than 60% in drayage because one shipped in right-sized crates with foam packing and the other in over-built timber. Weight optimisation at the crating stage is the cheapest cost reduction available to any exhibitor.",
  },
  {
    h: "Renting wins below five shows a year",
    b: "Compared over a three-year window including storage, refurbishment, graphics refresh and round-trip freight, ownership only beat renting at five or more shows per year at a stable footprint. Most exhibitors we surveyed planned for more shows than they ultimately attended.",
  },
  {
    h: "Meeting space out-earns open floor",
    b: "Booths with an enclosed or semi-private meeting area produced materially more qualified conversations per square foot than fully open plans at the same footprint. Buyers disclose budget sitting down and in private, not standing in an aisle.",
  },
  {
    h: "Lead follow-up speed beats lead volume",
    b: "Exhibitors who contacted scanned leads within 48 hours converted at multiples of those who waited until the following week. The booth generates the opportunity; the calendar decides whether it becomes pipeline.",
  },
];

const FAQS = [
  { q: "Where does this data come from?", a: "It is drawn from Traction X exhibit programmes and quoted budgets across Canadian and US shows, combined with published general-contractor rate cards and venue service kits. It is directional industry benchmarking, not an audited statistical survey." },
  { q: "How much should I budget for a first trade show?", a: "For a 10×10 in-line: booth from $16,250, plus 35–60% again for show services, plus freight and travel. A realistic all-in first-show budget in a major city is $25,000–$52,000." },
  { q: "What percentage of budget should show services be?", a: "Plan 35–60% of booth cost for an in-line and 40–70% for an island. If your plan assumes less, it is almost certainly missing drayage, rigging or overtime labour." },
  { q: "How do I lower my trade show costs without shrinking the booth?", a: "Ship lighter and consolidate into one bill of lading, hit every advance-order deadline, source heavy consumables in the show city, and rent rather than own if you exhibit fewer than five times a year." },
];

export const Route = createFileRoute("/trade-show-marketing-benchmark-report-2026")({
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
            "@type": "Report",
            name: "2026 Trade Show Marketing Benchmark Report",
            description: DESC,
            datePublished: "2026-01-15",
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
            url: `${SITE.url}${PATH}`,
          },
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
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "2026 Benchmark Report", item: `${SITE.url}${PATH}` },
            ],
          },
        ]),
      },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Original research · 2026"
        title="Trade Show Marketing"
        accent="Benchmark Report"
        intro="What exhibiting actually costs in 2026 — booth cost per square foot, the show-services load nobody budgets for, staffing ratios, and cost per qualified conversation. Free to read, free to cite."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="report-hero" label="Benchmark my programme" />
          <BookMeetingButton variant="outline" source="report-hero" label="Talk through your numbers" />
        </div>
      </PageHero>

      <section id="tldr" className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">Headline finding</p>
          <p className="text-white/85 text-lg leading-relaxed">
            Show services — drayage, electrical, rigging and labour — add{" "}
            <strong className="text-white">35–70% on top of booth cost</strong>, and they are the line most
            exhibitors leave out of the plan. Custom booth cost itself runs{" "}
            <strong className="text-white">$85–$145 per square foot</strong>, and a qualified conversation
            costs <strong className="text-white">$150–$420</strong> — still cheaper than most B2B paid media.
          </p>
        </div>
      </section>

      <Section
        eyebrow="The numbers"
        title="2026 benchmark table"
        intro="Ranges across Canadian and US shows for a mid-market exhibitor. In-line covers 10×10 and 10×20; island covers 20×20 and above."
      >
        <div className="rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.16em] text-white/60">
              <tr>
                <th className="px-5 py-4 text-left">Metric</th>
                <th className="px-5 py-4 text-left">In-line</th>
                <th className="px-5 py-4 text-left">Island</th>
                <th className="px-5 py-4 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARKS.map((b) => (
                <tr key={b.metric} className="border-t border-white/10">
                  <td className="px-5 py-4 font-semibold text-white/90">{b.metric}</td>
                  <td className="px-5 py-4 text-[oklch(0.85_0.13_300)] font-semibold whitespace-nowrap">{b.inline}</td>
                  <td className="px-5 py-4 text-[oklch(0.85_0.13_300)] font-semibold whitespace-nowrap">{b.island}</td>
                  <td className="px-5 py-4 text-white/65">{b.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-xs text-white/45 max-w-3xl">
          Directional benchmarks drawn from Traction X programmes, quoted budgets and published contractor
          rate cards. Your show, city and union jurisdiction will move these figures. Cite freely with a
          link to this page.
        </p>
      </Section>

      <Section bg="muted" eyebrow="What we found" title="Six findings that change budgets">
        <div className="grid md:grid-cols-2 gap-6">
          {FINDINGS.map((f, i) => (
            <div key={f.h} className="rounded-2xl border border-white/10 bg-black/40 p-7">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                Finding {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-[oklch(0.85_0.13_300)]">
                {f.h}
              </h3>
              <p className="mt-3 text-sm text-white/72 leading-relaxed">{f.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Apply it" title="Use the benchmarks on your own plan">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { to: "/booth-cost-calculator", h: "Cost estimator", b: "Model your footprint, finish level, city and add-ons with live math." },
            { to: "/trade-show-booth-rental-pricing", h: "Published pricing", b: "Real starting prices by size, and exactly what is and isn't included." },
            { to: "/guides", h: "Exhibitor guides", b: "Drayage, union labour and cross-border customs explained properly." },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[oklch(0.78_0.13_300)]/50 transition"
            >
              <h3 className="font-display text-lg font-bold uppercase tracking-tight">{c.h}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{c.b}</p>
              <span className="mt-4 inline-block text-sm text-[oklch(0.78_0.13_300)]">Open →</span>
            </Link>
          ))}
        </div>
      </Section>

      <FAQBlock items={FAQS} title="Benchmark questions" />
      <DesignCtaBand source="report" />
      <CTABand heading="Want your programme benchmarked?" />
    </PageLayout>
  );
}
