import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, Design3DButton, BookMeetingButton, QuoteButton } from "@/components/GlobalCta";
import { PortableCatalog, CategoryTiles } from "@/components/PortableCatalog";
import { PORTABLE_FOOTPRINTS, productsInFootprint, primaryFootprint } from "@/lib/portable-size";
import { metricSize } from "@/lib/units";
import { portableImage } from "@/data/portable-images";
import { QuoteForm } from "@/components/QuoteForm";
import { BOOTH_SIZES } from "@/data/booth-sizes";
import { PORTABLE_CATEGORIES, PORTABLE_PRODUCTS, productsInCategory } from "@/data/portable-products";
import { SITE } from "@/lib/site";

const TITLE = "Portable Trade Show Displays from $2,000 | Traction X";
const DESC =
  "Portable trade show display packages start at $2,000. Most complete portable booth packages range from $5,000–$15,000, with free 3D design, printed graphics and typical production in 7–12 business days.";

const FAQS = [
  {
    q: "What counts as a portable trade show display?",
    a: "Anything that ships in a case or bag and assembles without tools or a labour call: tension fabric backwalls, pop-up displays, banner stands, portable counters, lightboxes, printed tents, flags and table covers. If two people can set it up in under two hours, it's portable.",
  },
  {
    q: "How much does a portable trade show booth cost?",
    a: "Portable display packages start at approximately $2,000. Most complete portable booth packages range from $5,000 to $15,000, depending on the footprint, graphics, lighting, counters, storage and AV. Larger 20×20 portable island packages are quoted separately because they include substantially more structure and shipping hardware.",
  },
  {
    q: "Do you rent portable displays?",
    a: "No — portable displays are purchase-only. They're priced to be owned: the hardware is reusable show after show and only the graphic is consumable, so buying beats renting on almost any repeat schedule. If you need something for a single event, our custom booth rental program is the right route — that's a separate product line.",
  },
  {
    q: "How long does a portable display take to produce?",
    a: "Typical production is 7–12 business days from artwork approval. Rush production is available on banner stands, table covers and fabric backwalls at a surcharge — send us your show date and we'll confirm the timeline in writing.",
  },
  {
    q: "Do you design the graphics?",
    a: "Yes. Every order includes print-ready artwork setup and a complimentary 3D visual of your finished display. If you don't have brand-ready artwork, our design team builds it from your logo, product photography and messaging.",
  },
  {
    q: "Can portable displays be reconfigured between shows?",
    a: "Modular and SEG systems can. A 10×20 extrusion wall splits into two 10×10s, lightbox panels restack into different configurations, and counters and towers move between footprints. We flag which of our systems reconfigure before you buy.",
  },
  {
    q: "Do you ship to shows across Canada and the USA?",
    a: "Yes — direct-to-venue or advance warehouse, with labels and material handling paperwork prepared for you. Drayage and electrical are billed by the venue or general contractor on actual weight and usage, never bundled into our pricing.",
  },
  {
    q: "What's the difference between SEG fabric and a pop-up display?",
    a: "SEG (silicone edge graphic) frames hold a taut, seamless fabric panel in an extruded aluminium channel — the premium look, and the graphic swaps in minutes. A pop-up uses a magnetic accordion frame with the graphic pre-attached: cheaper and faster to set up, slightly less crisp up close.",
  },
];

export const Route = createFileRoute("/portable-booths")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/portable-booths` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/portable-booths` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Portable Trade Show Displays",
          description: DESC,
          url: `${SITE.url}/portable-booths`,
          hasPart: PORTABLE_CATEGORIES.map((c) => ({
            "@type": "CollectionPage",
            name: c.label,
            url: `${SITE.url}/portable-displays/${c.slug}`,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: PortableBooths,
});

function PortableBooths() {
  const sizes = BOOTH_SIZES.filter((b) => b.category === "size");
  const types = BOOTH_SIZES.filter((b) => b.category === "type");

  return (
    <PageLayout>
      <PageHero
        eyebrow="Portable displays"
        title="Portable Trade Show"
        accent="Displays & Booths"
        intro={`${PORTABLE_PRODUCTS.length} portable products in ${PORTABLE_CATEGORIES.length} categories — complete 10×10, 10×20 and 20×20 booth packages plus the backwalls, lightboxes, counters, banner stands, tents, flags and table covers that go with them. Portable display packages start at approximately $2,000, with most complete packages ranging from $5,000–$15,000. Every order includes a free 3D visual before we print.`}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Design3DButton source="portable-hub" />
          <QuoteButton source="portable-hub" label="Get pricing" />
          <BookMeetingButton source="portable-hub" />
        </div>
      </PageHero>

      <Section id="tldr" eyebrow="Short version" title="Portable displays, in one paragraph">
        <p className="max-w-4xl text-white/75 text-lg leading-relaxed">
          Portable display packages start at approximately $2,000, and most complete portable booth packages range from $5,000–$15,000 depending on footprint, graphics, lighting, counters, storage and AV. They travel in cases instead of crates, set up without a labour call, and can be re-skinned with new graphics. Traction X prints, packs and supports all {PORTABLE_PRODUCTS.length} products below, from individual banner stands and table covers to full portable booth packages. Every order starts with a complimentary 3D visual so you approve the look before anything goes to press.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { k: "$2,000+", v: "Portable display packages start from" },
            { k: "$5–15k", v: "Typical range for most complete packages" },
            { k: "7–12 days", v: "Typical production from artwork approval" },
            { k: "Purchase only", v: "Portable displays are sold, not rented" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="font-display text-2xl font-bold text-[oklch(0.78_0.13_300)]">{s.k}</div>
              <div className="mt-2 text-sm text-white/65">{s.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Shop by size" title="Portable displays that fit your booth" bg="muted">
        <p className="max-w-3xl text-white/70 leading-relaxed">
          Booked a 10×10? A 10×20? A tabletop at a partner event? Pick the footprint and we'll show every display, package and accessory in the catalog that fits it.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PORTABLE_FOOTPRINTS.map((f) => {
            const items = productsInFootprint(f.slug);
            const preferred: Record<string, string[]> = {
              "10x10": ["10x10-booth-packages"],
              "10x20": ["10x20-booth-packages"],
              "20x20": ["20x20-booth-packages"],
              tabletop: ["table-covers-runners", "tension-fabric-displays"],
              outdoor: ["event-tents-canopies", "outdoor-flags-signage"],
            };
            const pool =
              items.filter((p) => (preferred[f.slug] ?? []).includes(p.category)) ||
              [];
            const exact = pool.length ? pool : items.filter((p) => primaryFootprint(p) === f.slug);
            const hero = (exact.length ? exact : items).map((p) => portableImage(p.slug, p.category)).find(Boolean);
            return (
              <Link
                key={f.slug}
                to="/portable-displays/size/$size"
                params={{ size: f.slug }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-[oklch(0.78_0.13_300)]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-white">
                  {hero && (
                    <img
                      src={hero}
                      alt={`${f.label} — portable trade show displays`}
                      loading="lazy"
                      width={900}
                      height={563}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                    />
                  )}
                </div>
                <div className="p-5">
                  <div className="font-display text-xl font-bold">
                    {f.short}
                    {metricSize(f.short) && (
                      <span className="ml-2 align-middle text-xs font-normal text-white/40">{metricSize(f.short)}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-3">{f.intro}</p>
                  <div className="mt-3 text-xs uppercase tracking-[0.2em] text-white/40">{items.length} products</div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Categories" title="Shop portable displays by category">
        <CategoryTiles />
      </Section>


      <Section id="catalog">
        <PortableCatalog />
      </Section>

      <Section eyebrow="How to choose" title="Picking the right portable display" bg="muted">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              t: "Start with the footprint you actually booked",
              b: "A 10×10 in-line and a 10×20 endcap need different hardware. Buy for the footprint you exhibit in most, then add modular pieces — a tower, a counter, a hanging sign — for the bigger shows.",
            },
            {
              t: "Decide how bright the hall is",
              b: "Convention halls wash out matte graphics. If your competitors run backlit walls, an edge-lit SEG lightbox is the single highest-impact upgrade you can make for the money.",
            },
            {
              t: "Count the people, not the props",
              b: "Two staff need one counter and one demo point. Four staff need a bar, a meeting nook and storage. Buy the furniture your staffing plan requires before you buy more graphic square footage.",
            },
            {
              t: "Plan the graphic refresh, not just the build",
              b: "Frames last five to ten years; messaging lasts one. Choose systems where the skin swaps cheaply — SEG channels and banner cassettes — so a rebrand doesn't mean new hardware.",
            },
            {
              t: "Check the freight math",
              b: "A portable kit that fits two wheeled cases can fly with your team as checked baggage. One extra crate can cost more per show than the hardware saved you.",
            },
            {
              t: "Get the 3D visual first",
              b: "Every mistake is cheaper on screen. We render your display with your artwork before production so you catch a cropped logo or a low-resolution photo while it still costs nothing to fix.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-xl font-semibold">{x.t}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Pricing" title="What portable displays cost">
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-white/60 uppercase text-xs tracking-[0.16em]">
              <tr>
                <th className="px-5 py-4">Format</th>
                <th className="px-5 py-4">Typical range</th>
                <th className="px-5 py-4">Setup</th>
                <th className="px-5 py-4">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {[
                ["Banner stands & table covers", "$85 – $520", "2 min", "Sales meetings, lobbies, career fairs"],
                ["Tension fabric & pop-up backwalls", "$690 – $2,450", "5 – 20 min", "First booth, tabletop and 10ft walls"],
                ["Backlit lightbox displays", "$1,180 – $7,400", "30 – 90 min", "Standing out in bright halls"],
                ["Portable counters & kiosks", "$690 – $1,560", "15 min", "Greeting, demos, hidden storage"],
                ["10×10 booth packages", "$5,000 – $10,000", "30 – 120 min", "Complete in-line exhibits"],
                ["10×20 booth packages", "$9,000 – $15,000", "2 – 3.5 hrs", "Endcaps and double in-lines"],
                ["20×20 portable islands", "$28,500 – $44,000", "5 – 7 hrs", "Four-sided island presence"],
                ["Printed tents & outdoor signage", "$28 – $2,190", "5 – 25 min", "Festivals, roadshows, outdoor activations"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-5 py-4 font-semibold">{r[0]}</td>
                  <td className="px-5 py-4 text-[oklch(0.78_0.13_300)]">{r[1]}</td>
                  <td className="px-5 py-4 text-white/70">{r[2]}</td>
                  <td className="px-5 py-4 text-white/70">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-white/50">
          Most complete portable booth packages fall between $5,000 and $15,000. Individual accessories and smaller display components can cost less, while larger island packages cost more. Ranges include printed graphics, hardware and cases. Freight, drayage and electrical are quoted separately and billed on actuals.{" "}
          <Link to="/booth-cost-calculator" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Price your exact configuration →
          </Link>
        </p>
      </Section>

      <Section eyebrow="By size" title="Trade show booths by footprint" bg="muted">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sizes.map((s) => (
            <Link
              key={s.slug}
              to="/booth-size/$slug"
              params={{ slug: s.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="font-display text-lg font-semibold">{s.label}</div>
              {s.starting && <div className="mt-1 text-sm text-[oklch(0.78_0.13_300)]">from {s.starting}</div>}
              <div className="mt-2 text-sm text-white/60">{s.short}</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="By type" title="Accessories & display types">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {types.map((s) => (
            <Link
              key={s.slug}
              to="/booth-size/$slug"
              params={{ slug: s.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="font-display text-lg font-semibold">{s.label}</div>
              <div className="mt-2 text-sm text-white/60">{s.short}</div>
            </Link>
          ))}
        </div>
      </Section>

      <FAQBlock items={FAQS} title="Portable trade show display FAQs" />

      <Section id="contact" bg="muted">
        <QuoteForm heading="Tell us your show, footprint and deadline" />
      </Section>

      <DesignCtaBand source="portable-hub" />
      <CTABand />
    </PageLayout>
  );
}
