import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { SITE } from "@/lib/site";

const PATH = "/sustainability";
const TITLE = "Sustainable Trade Show Exhibits & Reusable Booth Rentals | Traction X";
const DESC =
  "How Traction X reduces exhibit waste: reusable custom rental structures, recyclable graphics, weight-optimised freight, LED lighting and reporting you can put in an ESG or RFP response.";

const PILLARS = [
  {
    h: "Rental is the sustainability strategy",
    b: "The single largest source of exhibit waste is one-use custom builds sent to landfill after a single show. Our custom rental model fabricates to your brand, then recovers the structure and returns components to inventory. You get a bespoke booth; the materials get a second, third and fourth life.",
    stats: ["Structures recovered after every show", "Components re-milled rather than scrapped", "No client-side storage footprint"],
  },
  {
    h: "Materials chosen to be recovered",
    b: "We specify aluminium extrusion, modular substrates and tension fabric where the design allows, because those materials survive repeated builds. Where millwork is required for the look, we detail it for disassembly rather than as a single glued assembly.",
    stats: ["Aluminium framing — indefinitely reusable", "Tension fabric over rigid print where possible", "Detailed for disassembly, not demolition"],
  },
  {
    h: "Graphics with an end-of-life plan",
    b: "Graphics are the most disposable element of any booth. We print on recyclable substrates, avoid PVC where an alternative performs, and design graphic zones so a message change reprints one panel instead of an entire wall.",
    stats: ["PVC-free substrates where performance allows", "Zoned graphics for partial reprints", "Latex and UV inks over solvent"],
  },
  {
    h: "Lighter freight, lower emissions",
    b: "Weight optimisation reduces drayage cost and freight emissions at the same time — one of the rare places where the cheaper decision is also the greener one. Right-sized crating, foam over timber packing, and consolidated shipments cut both.",
    stats: ["Right-sized crating on every build", "Consolidated shipments per show", "Regional sourcing of heavy consumables"],
  },
  {
    h: "Power and lighting",
    b: "All booth lighting we supply is LED. Beyond the energy load, it reduces the electrical order you place with the venue — which is a real line item, not a gesture.",
    stats: ["100% LED booth lighting", "Right-sized electrical orders", "Timers on non-show-hours loads"],
  },
  {
    h: "Reporting for your ESG and RFP responses",
    b: "Sustainability questions now appear in procurement documents and internal reporting. On request we provide a per-programme summary covering reuse of structure, material specification, freight consolidation and graphics disposition — in a form you can hand to procurement.",
    stats: ["Per-programme sustainability summary", "Material specification disclosure", "Supports supplier ESG questionnaires"],
  },
];

const FAQS = [
  { q: "Are rental booths actually more sustainable than owned booths?", a: "Generally yes, because the structure is reused across many clients and shows rather than sitting in storage between two annual appearances or being scrapped after one. The comparison flips only if you exhibit very frequently and genuinely reuse an owned build many times without refabrication." },
  { q: "Can you provide sustainability documentation for our RFP or ESG report?", a: "Yes. On request we provide a per-programme summary covering structure reuse, material specification, graphics substrate and disposition, freight consolidation and lighting load. Tell us the format your procurement team needs." },
  { q: "Do sustainable materials cost more?", a: "Rarely in a rental context. Reusable aluminium and fabric systems are the same materials that make rental economics work, and weight reduction lowers your drayage and freight bills. Where a specific low-impact specification does cost more, we flag it as a line item so you can decide." },
  { q: "What happens to our graphics after the show?", a: "Graphics are brand-specific and cannot be reused by another client. We print on recyclable substrates where performance allows and route them for recycling, or ship them back to you if you want them for a subsequent show or internal use." },
];

export const Route = createFileRoute("/sustainability")({
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
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "Sustainability", item: `${SITE.url}${PATH}` },
            ],
          },
        ]),
      },
    ],
  }),
  component: SustainabilityPage,
});

function SustainabilityPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Sustainability"
        title="Exhibits That Don't"
        accent="End Up In Landfill"
        intro="The trade show industry has a waste problem, and most of it is single-use custom builds. Our answer isn't a badge — it's a business model where the structure comes back to us after every show and gets built again."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="sustainability-hero" label="Ask for a sustainability summary" />
          <Link
            to="/compare/$slug"
            params={{ slug: "rent-vs-buy-trade-show-booth" }}
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            Rent vs. buy impact
          </Link>
        </div>
      </PageHero>

      <section id="tldr" className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">In short</p>
          <p className="text-white/85 text-lg leading-relaxed">
            A custom rental is the lowest-waste way to exhibit at a high standard: the structure is recovered
            and rebuilt rather than scrapped, graphics use recyclable substrates, freight is weight-optimised,
            and lighting is entirely LED. We'll document all of it for your ESG report or RFP response.
          </p>
        </div>
      </section>

      <Section eyebrow="How we do it" title="Six practical commitments">
        <div className="grid md:grid-cols-2 gap-6">
          {PILLARS.map((p) => (
            <div key={p.h} className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-[oklch(0.85_0.13_300)]">
                {p.h}
              </h2>
              <p className="mt-3 text-sm text-white/72 leading-relaxed">{p.b}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/65">
                {p.stats.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="text-[oklch(0.78_0.13_300)]">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="muted" eyebrow="Honesty" title="What we won't claim">
        <div className="max-w-3xl space-y-4 text-white/72 leading-relaxed">
          <p>
            Exhibiting has a footprint. Freight moves, crates are built, people fly. We are not going to call
            a trade show booth carbon neutral, and we are not going to sell you an offset certificate as a
            substitute for reducing what actually gets shipped and thrown away.
          </p>
          <p>
            What we will do is make the two decisions that move the number most: reuse the structure rather
            than build it twice, and ship less weight. Everything else — substrate choice, LED lighting,
            regional sourcing — is real but secondary, and we'll tell you which is which when you ask.
          </p>
          <p>
            If your procurement team needs specific documentation, tell us what it asks for. We would rather
            answer the actual question than publish a page of ambient green language.
          </p>
        </div>
      </Section>

      <FAQBlock items={FAQS} title="Sustainability questions" />
      <DesignCtaBand source="sustainability" />
      <CTABand heading="Build it once, use it many times." />
    </PageLayout>
  );
}
