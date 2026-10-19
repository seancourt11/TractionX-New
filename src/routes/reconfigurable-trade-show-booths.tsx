import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, Design3DButton, BookMeetingButton, QuoteButton } from "@/components/GlobalCta";
import { PromiseGrid } from "@/components/Promises";
import { QuoteForm } from "@/components/QuoteForm";
import { absUrl, robotsMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/reconfigurable-trade-show-booths";
const TITLE = "Reconfigurable Trade Show Booths — Rent or Buy | Traction X";
const DESC =
  "A reconfigurable trade show booth re-frames from 10×10 to 10×20 to 20×20 between shows — same inventory, new layout. Rent from $16,250 or build from $12,500.";
const SHORT_ANSWER =
  "A reconfigurable trade show booth is a modular exhibit engineered to be taken apart and rebuilt in different sizes and layouts between shows. The same frame, counters and graphics that made a 10×10 inline re-combine into a 10×20 endcap or a 20×20 island — you add or remove sections instead of ordering a new booth each year.";

const FAQS = [
  {
    q: "What is a reconfigurable trade show booth?",
    a: SHORT_ANSWER,
  },
  {
    q: "Is reconfigurable the same as modular?",
    a: "Modular describes how the booth is built — aluminium extrusion framing with interchangeable sections instead of one-off wood construction. Reconfigurable describes what you can do with it: change the footprint, the shape and the component layout from show to show. Most modular booths are reconfigurable to a degree; the difference is whether the system was actually engineered and drawn for multiple layouts, which is how we spec every reconfigurable program at Traction X.",
  },
  {
    q: "Can a reconfigurable booth change size between shows?",
    a: "Yes. A single inventory of framing, SEG fabric and casework spans a 10×10 (3×3 m), a 10×20 (3×6 m) and a 20×20 (6×6 m). When the next show gives you more or less floor space, we add or remove sections and re-cut SEG graphics to the new walls — the core structure, counters and storage carry over unchanged.",
  },
  {
    q: "How much does a reconfigurable trade show booth cost?",
    a: "Reconfigurable rentals start at $16,250 for a 10×10, $22,750 for a 10×20 and $39,000 for a 20×20. If you'd rather own the system, custom-built reconfigurable exhibits start at $12,500 for a 10×10. Anything you see online is a starting range only — send us your show, footprint and dates and you get a real number within two business days.",
  },
  {
    q: "Should I rent or buy a reconfigurable exhibit?",
    a: "Renting suits one-off shows, first-time exhibitors and multi-city programs where you don't want to store, refurbish or re-permit anything between events. Owning pays off when your program repeats in the same footprint most of the year and you want the same booth re-graphed rather than re-rented. We build both, and our rent-vs-buy comparison walks the full math.",
  },
];

export const Route = createFileRoute("/reconfigurable-trade-show-booths")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...robotsMeta(),
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: absUrl(PATH) },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content:
          "reconfigurable trade show booth, reconfigurable booth rental, reconfigurable exhibit, modular trade show booth, modular exhibit system, reconfigurable trade show display, 10x10 to 20x20 booth",
      },
    ],
    links: [{ rel: "canonical", href: absUrl(PATH) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Product",
              name: "Reconfigurable Trade Show Booth",
              alternateName: ["Reconfigurable modular exhibit", "Modular trade show booth rental"],
              description: SHORT_ANSWER,
              brand: { "@type": "Brand", name: SITE.name },
              url: absUrl(PATH),
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "16250",
                availability: "https://schema.org/InStock",
                url: absUrl(PATH),
                seller: { "@type": "Organization", name: SITE.name, url: SITE.url },
              },
            },
            {
              "@type": "Service",
              name: "Reconfigurable Trade Show Booth Rentals & Custom Modular Exhibits",
              serviceType: "Reconfigurable and modular trade show booth rental, custom fabrication, show-to-show reconfiguration",
              description: DESC,
              provider: {
                "@type": "Organization",
                name: SITE.name,
                url: SITE.url,
                telephone: SITE.phone,
                email: SITE.email,
              },
              areaServed: ["United States", "Canada", "Europe", "Latin America", "Asia", "Oceania"],
              url: absUrl(PATH),
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "WebPage",
              name: TITLE,
              url: absUrl(PATH),
              speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
                { "@type": "ListItem", position: 2, name: "Trade show displays", item: absUrl("/trade-show-displays") },
                { "@type": "ListItem", position: 3, name: "Reconfigurable trade show booths", item: absUrl(PATH) },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: ReconfigurablePage,
});

const ACCENT = "text-[oklch(0.78_0.13_300)]";

const DIMENSIONS = [
  {
    lead: "Reconfigure the size",
    text: "The same beam inventory spans a 10×10 (3×3 m), a 10×20 (3×6 m) and a 20×20 (6×6 m). When the next show hands you more or less floor space, you add or remove sections — you don't order a new exhibit.",
  },
  {
    lead: "Reconfigure the shape",
    text: "Inline, endcap or island: the frame re-corners and re-orientates to whatever configuration the floor plan assigns you, with open sides moved to the aisle the traffic is on.",
  },
  {
    lead: "Reconfigure the components",
    text: "Reception counters, storage closets, towers, lightboxes, LED-lit shelving and monitor mounts all detach and re-mount in the next layout. AV and furniture re-book per show instead of riding in your crate.",
  },
];

const PROGRAM = [
  {
    show: "CES — Las Vegas",
    size: "10×20 inline",
    changes: "Both 10-ft sections up, demo counter centre, backlit SEG header over the aisle",
    carries: "Full frame, counter, storage closet, road cases",
  },
  {
    show: "HIMSS — regional stop",
    size: "10×10 inline",
    changes: "Second section cased; single-section layout, SEG graphics re-hung to the shorter wall",
    carries: "Same inventory, minus one case in the truck",
  },
  {
    show: "DEFSEC Atlantic",
    size: "20×20 island",
    changes: "Corner returns and tower added, counter rotated onto the main aisle",
    carries: "Same core frame, counter and storage, plus the tower",
  },
  {
    show: "Web Summit — Vancouver",
    size: "10×20 endcap",
    changes: "Back to both sections, open sides flipped to the endcap's two aisles",
    carries: "Everything, re-graphed for the new walls",
  },
];

const PRICING = [
  { t: "Rental 10×10", p: "from $16,250", d: "Backlit fabric header, reception counter, storage closet, LED shelving, monitor mount." },
  { t: "Rental 10×20", p: "from $22,750", d: "Endcap and inline layouts from the same inventory, hero graphic wall, demo counter." },
  { t: "Rental 20×20", p: "from $39,000", d: "Island configuration with central hanging structure and hospitality counter." },
  { t: "Custom build 10×10", p: "from $12,500", d: "Own the system: millwork counters, textured finishes, engineered to reconfigure and re-ship." },
];

const RELATED = [
  { to: "/products/modular-catalog", t: "Modular booth catalog", d: "700+ pre-engineered modular designs, 10×10 to 30×50, ready to configure." },
  { to: "/products/custom-trade-show-exhibits", t: "Custom exhibits", d: "Ground-up fabrication when you'd rather own the system outright." },
  { to: "/trade-show-booth-rental-pricing", t: "Rental pricing", d: "What a reconfigurable rental costs by footprint and finish level." },
  { to: "/booth-cost-calculator", t: "Booth cost calculator", d: "Price your footprint, add-ons and finish tier in a couple of minutes." },
  { to: "/compare/rent-vs-buy-trade-show-booth", t: "Rent vs. buy", d: "The full math on renting a system versus building one to own." },
  { to: "/gallery", t: "Project gallery", d: "Modular and custom booths we've delivered, by footprint." },
];

function ReconfigurablePage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Modular exhibits"
        title="Reconfigurable"
        accent="Trade Show Booths"
        intro="One inventory of aluminium framing, SEG fabric and casework that re-frames show to show — a 10×10 in the spring, a 10×20 mid-season, a 20×20 island by fall. Traction X rents reconfigurable modular booths and builds them to own, so your exhibit grows and shrinks with the program instead of being rebuilt every year."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 px-4 py-1.5 text-sm">
            Available to rent
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm">
            Or built to own
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm">
            Same inventory, every show
          </span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="reconfigurable-hero" label="Get my reconfigurable booth quote" />
          <Design3DButton source="reconfigurable-hero" />
          <BookMeetingButton source="reconfigurable-hero" />
        </div>
      </PageHero>

      <section id="tldr" className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-14 grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-4">The short answer</p>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed">{SHORT_ANSWER}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black p-6">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">How it works</div>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-sm text-white/55">Framing</dt>
                <dd className="font-display text-xl font-bold">Reused every show</dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Graphics</dt>
                <dd className="font-display text-xl font-bold">Re-cut SEG, not rebuilt</dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Between shows</dt>
                <dd className="font-display text-xl font-bold">Road cases, zero venue fees</dd>
              </div>
            </dl>
            <div className="mt-6">
              <QuoteButton source="reconfigurable-tldr" label="Price my program" />
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="What reconfigurable really means" title="Three ways the same booth changes">
        <div className="grid md:grid-cols-3 gap-6">
          {DIMENSIONS.map((d) => (
            <div key={d.lead} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className={`font-display text-xl font-semibold ${ACCENT}`}>{d.lead}</h3>
              <p className="mt-3 text-white/70 leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Show-to-show program"
        title="One inventory across a four-show season"
        intro="This is what reconfigurable actually buys you: the same crate inventory, re-drawn for each show's floor plan. Graphics are the only recurring line item."
      >
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-white/[0.04] text-[11px] uppercase tracking-[0.14em] text-white/55">
                <th scope="col" className="px-5 py-4">Show</th>
                <th scope="col" className="px-5 py-4">Footprint</th>
                <th scope="col" className="px-5 py-4">What changes</th>
                <th scope="col" className="px-5 py-4">What carries over</th>
              </tr>
            </thead>
            <tbody>
              {PROGRAM.map((row, i) => (
                <tr key={row.show} className={i % 2 ? "bg-white/[0.03]" : "bg-white/[0.01]"}>
                  <th scope="row" className="px-5 py-4 font-semibold align-top">{row.show}</th>
                  <td className="px-5 py-4 align-top whitespace-nowrap">{row.size}</td>
                  <td className="px-5 py-4 text-white/70 leading-relaxed">{row.changes}</td>
                  <td className="px-5 py-4 text-white/70 leading-relaxed">{row.carries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm text-white/50 max-w-3xl leading-relaxed">
          An example program, not a promise — your show calendar sets the footprints. Send us the list of shows
          and we draw the reconfiguration map before you commit to anything.
        </p>
      </Section>

      <Section eyebrow="Rent or buy" title="Two ways to run a reconfigurable program" bg="muted">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-display text-xl font-semibold">Rent it</h3>
            <p className="mt-3 text-white/70 leading-relaxed">
              The structure, I&amp;D, graphics installation and return freight come as one agreement — nothing to
              store, refurbish or re-permit between shows. The right fit for one-off shows, first-time exhibitors
              and multi-city programs where each stop needs a different footprint.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/rent-a-booth"
                className="border border-white/25 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10"
              >
                Explore booth rentals
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-display text-xl font-semibold">Build it to own</h3>
            <p className="mt-3 text-white/70 leading-relaxed">
              We fabricate the system, draw every configuration it will ever take, and you re-graph it show to
              show. The right fit when your program repeats in similar footprints most of the year and you want
              the asset — not the rental line — on your books.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/products/$slug"
                params={{ slug: "custom-trade-show-exhibits" }}
                className="border border-white/25 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10"
              >
                Explore custom exhibits
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-6 text-white/70 max-w-3xl leading-relaxed">
          Undecided? <Link to="/compare/$slug" params={{ slug: "rent-vs-buy-trade-show-booth" }} className={`${ACCENT} hover:underline`}>Our rent-vs-buy comparison</Link>{" "}
          walks the full math for both routes.
        </p>
      </Section>

      <Section eyebrow="Starting points" title="What a reconfigurable booth costs">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING.map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-sm uppercase tracking-[0.14em] text-white/55">{c.t}</div>
              <div className={`mt-2 font-display text-2xl font-bold ${ACCENT}`}>{c.p}</div>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-white/50 max-w-3xl leading-relaxed">
          Starting ranges only — final pricing depends on the show city, finish level and AV. Send your show,
          footprint and dates and a designer replies with a real number within two business days.
        </p>
      </Section>

      <Section eyebrow="Included either way" title="The same promises on every configuration" bg="muted">
        <PromiseGrid />
      </Section>

      <Section eyebrow="Related" title="Keep planning">
        <div className="grid md:grid-cols-3 gap-4">
          {RELATED.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="font-display font-semibold">{l.t}</div>
              <div className="mt-1 text-sm text-white/60 leading-relaxed">{l.d}</div>
            </Link>
          ))}
        </div>
      </Section>

      <FAQBlock items={FAQS} title="Reconfigurable booth questions" />

      <Section id="contact">
        <QuoteForm heading="Request a reconfigurable booth quote" />
      </Section>

      <DesignCtaBand source="reconfigurable" />
      <CTABand />
    </PageLayout>
  );
}
