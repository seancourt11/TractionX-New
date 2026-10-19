import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/commercial-millwork-cabinetry`;
const TITLE = "Commercial Millwork & Cabinetry as a Service | Traction X";
const DESC =
  "White-glove commercial millwork and custom cabinetry as a service. Design, engineering, CNC fabrication, finishing and install for retail, hospitality, workplace and brand environments across North America.";

export const Route = createFileRoute("/commercial-millwork-cabinetry")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Commercial Millwork & Cabinetry as a Service",
          serviceType: "Commercial Millwork, Custom Cabinetry, Architectural Woodwork",
          description: DESC,
          provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
          areaServed: ["United States", "Canada"],
        }),
      },
    ],
  }),
  component: MillworkPage,
});

const CAPABILITIES = [
  {
    title: "Retail fixtures & displays",
    body: "Gondolas, wall systems, cash wraps, kiosks and product plinths engineered for rollout across multiple locations with consistent finish quality.",
  },
  {
    title: "Reception & feature walls",
    body: "Sculptural reception desks, backlit brand walls, slat systems and dimensional signage millwork with integrated lighting and cable management.",
  },
  {
    title: "Hospitality casework",
    body: "Bar fronts, banquettes, host stands, hotel headboards and F&B service casework built for daily commercial wear-and-tear.",
  },
  {
    title: "Workplace & office cabinetry",
    body: "Boardroom credenzas, tech walls, phone-booth interiors, café millwork and modular pantry systems for corporate fit-outs.",
  },
  {
    title: "Brand environments & pop-ups",
    body: "Flagship activations, showroom fixtures and permanent brand installs — same shop, same finish standards as our trade show custom builds.",
  },
  {
    title: "Architectural woodwork",
    body: "Paneling, ceiling features, curved veneer work, solid surface fabrication and AWI-grade specifications on request.",
  },
];

const MATERIALS = [
  "Veneered & laminated plywood",
  "Solid hardwoods (maple, oak, walnut, ash)",
  "HPL & TFL laminates",
  "Corian® / solid surface",
  "Powder-coated & anodized metals",
  "Backlit acrylic & LED integration",
  "Custom digital-print skins",
  "Sustainable FSC-certified stock",
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery & scoping",
    body: "We meet with your design lead, GC or brand team to walk the site or drawings. We confirm scope, quantities, finish level, budget range and target install window.",
  },
  {
    step: "02",
    title: "Design & engineering",
    body: "Our team develops shop drawings and 3D renders in-house. We value-engineer finishes and hardware to hit your budget without compromising the design intent.",
  },
  {
    step: "03",
    title: "Fixed quote & approvals",
    body: "You get a line-itemed fixed quote, a construction schedule and a finish sample kit for sign-off. No surprise change orders once drawings are approved.",
  },
  {
    step: "04",
    title: "CNC fabrication & finishing",
    body: "Precision CNC cutting, veneer lay-up, edgebanding, spray finishing and QC pre-assembly happen under one roof — the same shop that ships our high-end exhibits.",
  },
  {
    step: "05",
    title: "Delivery & install",
    body: "Blanket-wrapped delivery, site protection, coordination with your GC or store ops, and a supervised install by our own crew. We punch-list before we leave.",
  },
  {
    step: "06",
    title: "Warranty & rollout support",
    body: "12-month workmanship warranty, spare-parts kits and a re-order file so future locations match the pilot store — down to the pull, the finish and the LED strip.",
  },
];

const ENGAGEMENTS = [
  {
    title: "Project-based",
    price: "Fixed-fee",
    body: "One reception, one flagship, one restaurant. Scoped, quoted and delivered as a turnkey capital project.",
    bullets: ["Fixed quote", "Shop drawings included", "Supervised install", "12-mo warranty"],
  },
  {
    title: "Rollout program",
    price: "Per-location",
    body: "Prototype once, deploy across a network of stores, branches or hotels with locked unit pricing and a build schedule.",
    bullets: ["Prototype + kit-of-parts", "Locked per-unit pricing", "Regional install crews", "Reorder portal"],
  },
  {
    title: "Millwork as a Service",
    price: "Retainer",
    body: "A dedicated production slot each month for brands and agencies that need continuous fixture, activation and refresh work.",
    bullets: ["Reserved shop capacity", "Named project manager", "Priority scheduling", "Blended hourly rate"],
  },
];

const WHY = [
  {
    title: "One shop, one standard",
    body: "The same fabrication floor that builds our custom trade show exhibits — so finish quality, tolerances and lighting integration are event-grade, not big-box-grade.",
  },
  {
    title: "In-house design & engineering",
    body: "You don't pay a middleman to translate your architect's intent. Our designers and engineers work directly from your drawings or start from a brief.",
  },
  {
    title: "North America install network",
    body: "Union and non-union crews across the US and Canada. We handle permits, COIs, freight and site coordination as part of the scope.",
  },
  {
    title: "Built for brands",
    body: "We're used to Fortune 500 brand guidelines, NDA'd product launches and immovable event dates. Deadlines are treated as fixed, not aspirational.",
  },
];

const INDUSTRIES = [
  "Retail & flagship stores",
  "Hospitality & F&B",
  "Corporate workplace",
  "Museums & experiential",
  "Automotive & showrooms",
  "Healthcare & wellness",
  "Financial services branches",
  "Cannabis & regulated retail",
];

const FAQS = [
  {
    q: "How is this different from a traditional millwork shop?",
    a: "We combine a commercial millwork shop with our custom trade show fabrication team. That means we can move faster on brand activations, absorb tight event-driven deadlines, and deliver AV/lighting integration as part of the same scope.",
  },
  {
    q: "Do you work with architects and general contractors?",
    a: "Yes. We regularly bid off architectural drawings, produce AWI-grade shop drawings, carry commercial insurance and coordinate directly with your GC's superintendent on site.",
  },
  {
    q: "What's the minimum project size?",
    a: "Project-based work typically starts around $25,000 CAD. Rollout programs and Millwork-as-a-Service retainers scale from there. We can quote smaller one-off pieces if they sit inside an existing brand relationship.",
  },
  {
    q: "How long does a typical project take?",
    a: "A single reception desk or feature wall is usually 4–6 weeks from approved drawings to install. Retail rollouts and multi-location programs are scheduled in waves — we lock the schedule at the fixed-quote stage.",
  },
  {
    q: "Can you match an existing finish or fixture?",
    a: "Yes. Send us a sample, a spec sheet or even a photo and we'll match veneer, laminate, stain and hardware — that's a normal part of rollout and refresh work.",
  },
  {
    q: "Do you handle install and freight?",
    a: "Yes — blanket-wrapped freight, site protection, install and punch-list are all included in a turnkey quote. We use our own supervisors and vetted regional install crews.",
  },
];

function MillworkPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Millwork as a Service"
        title="COMMERCIAL MILLWORK & CUSTOM CABINETRY"
        accent="BUILT LIKE A BRAND EXHIBIT."
        intro="We design, engineer, fabricate and install commercial millwork across North America — from single reception desks to multi-location retail rollouts. Same shop, same finish standards as our high-end trade show exhibits."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#quote" className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90">
            Scope a project →
          </a>
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noreferrer"
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            Book a 30-min call
          </a>
          <a
            href={`tel:${SITE.phone}`}
            className="border border-white/15 text-white/80 px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            {SITE.phoneDisplay}
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
          {[
            ["1 shop", "Design → install"],
            ["50+", "Brands served"],
            ["12 mo", "Workmanship warranty"],
            ["US + CA", "Install network"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-xl border border-white/10 p-4">
              <div className="font-display text-2xl font-bold text-[oklch(0.78_0.13_300)]">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/60">{l}</div>
            </div>
          ))}
        </div>
      </PageHero>

      <Section eyebrow="Capabilities" title="What we build" intro="Commercial-grade millwork engineered for daily use, and detailed to a brand-experience standard.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why Traction X" title="Event-grade finish, commercial-grade durability" bg="muted">
        <div className="grid md:grid-cols-2 gap-6">
          {WHY.map((w) => (
            <div key={w.title} className="rounded-2xl border border-white/10 p-6">
              <h3 className="font-display text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Materials & finishes" title="A finish library, not a laminate catalog">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {MATERIALS.map((m) => (
            <div
              key={m}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80"
            >
              {m}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Process" title="From brief to install" bg="muted">
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS.map((p) => (
            <li key={p.step} className="rounded-2xl border border-white/10 p-6">
              <div className="font-display text-[oklch(0.78_0.13_300)] text-sm uppercase tracking-widest">
                Step {p.step}
              </div>
              <h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Engagement models" title="Three ways to work with us">
        <div className="grid md:grid-cols-3 gap-6">
          {ENGAGEMENTS.map((e) => (
            <div key={e.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col">
              <div className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)]">{e.price}</div>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">{e.title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed">{e.body}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/75">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-[oklch(0.78_0.13_300)]">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                className="mt-6 inline-flex items-center justify-center border border-white/20 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                Scope this →
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Industries" title="Where our millwork shows up" bg="muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {INDUSTRIES.map((i) => (
            <div key={i} className="rounded-xl border border-white/10 px-4 py-4 text-sm text-white/80">
              {i}
            </div>
          ))}
        </div>
      </Section>

      <FAQBlock items={FAQS} />

      <Section id="quote">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[oklch(0.78_0.13_300)]">Start a project</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
              Send drawings, a Pinterest board, or a napkin sketch.
            </h2>
            <p className="mt-4 text-white/70 max-w-md">
              Tell us the site, quantities and target install date. We'll respond within one business day with next steps
              and a scoped ballpark. Fixed quotes follow drawings and finish sign-off.
            </p>
            <div className="mt-6 space-y-2 text-white/80">
              <a href={`mailto:${SITE.email}`} className="block hover:text-white">
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone}`} className="block hover:text-white">
                {SITE.phoneDisplay}
              </a>
            </div>
            <div className="mt-8">
              <Link to="/case-studies" className="text-sm underline text-white/70 hover:text-white">
                See recent builds →
              </Link>
            </div>
          </div>
          <QuoteForm heading="Request a millwork quote" />
        </div>
      </Section>

      <DesignCtaBand source="page" />
      <CTABand heading="Have a rollout, a flagship or a reception to build?" />
    </PageLayout>
  );
}
