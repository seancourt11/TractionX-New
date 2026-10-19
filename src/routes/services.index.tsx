import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton, BookMeetingButton } from "@/components/GlobalCta";
import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/site";
import { robotsMeta, absUrl } from "@/lib/seo";

const TITLE = "Trade Show Services — Exhibit Design, Booth Build & I&D | Traction X";
const DESC =
  "End-to-end trade show services: exhibit design with 3D renders, custom booth construction, project management, install & dismantle, freight and AV rentals. Install and dismantle included.";
const URL = absUrl("/services");

const HUB_FAQS = [
  {
    q: "What trade show services does Traction X provide?",
    a: "Exhibit and display design with 3D renders, custom booth construction and fabrication, trade show project management, install and dismantle (I&D), shipping, freight and drayage coordination, and audio-visual rentals — under one contract with one producer.",
  },
  {
    q: "Do I have to buy all your services together?",
    a: "No. Each service can be bought standalone — we regularly manage, install or ship exhibits that were built by another company.",
  },
  {
    q: "What is included in your booth pricing?",
    a: "Design, fabrication, project management and install and dismantle labour are included. Drayage and venue-billed show services such as electrical and rigging are billed separately by the show's general contractor.",
  },
  {
    q: "Where do you work?",
    a: "Every major North American convention centre from a Canadian HQ, with partner shops in Las Vegas, Orlando, Frankfurt and Sydney for regional builds and international shows.",
  },
  {
    q: "How fast can you turn around a booth?",
    a: "A designer sends preliminary concept direction and investment within two business days of a complete brief. Full photoreal concepts, production planning and a costed BOM typically develop over one to two weeks, followed by a 6–10 week custom build from approved drawings. Rush timelines are possible; a rush fee may apply inside 30 days and can sometimes be waived by a project manager.",
  },
];

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...robotsMeta(),
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
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
          "@graph": [
            {
              "@type": "ItemList",
              "@id": `${URL}#services`,
              name: "Trade show services",
              itemListElement: SERVICES.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.label,
                url: absUrl(`/services/${s.slug}`),
              })),
            },
            {
              "@type": "FAQPage",
              "@id": `${URL}#faq`,
              mainEntity: HUB_FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${URL}#breadcrumbs`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                { "@type": "ListItem", position: 2, name: "Services", item: URL },
              ],
            },
            {
              "@type": "WebPage",
              "@id": URL,
              name: TITLE,
              description: DESC,
              speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
            },
          ],
        }),
      },
    ],
  }),
  component: ServicesHub,
});

function ServicesHub() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Services"
        title="Trade Show Services: Design, Build, Ship, Install"
        intro="Exhibit design, custom fabrication, project management, install and dismantle, freight and event technology — under one contract, with one accountable producer."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="services-hero" />
          <BookMeetingButton source="services-hero" />
        </div>
      </PageHero>

      <Section id="tldr">
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.06] p-6 md:p-8">
          <h2 className="font-display text-sm uppercase tracking-[0.28em] text-[oklch(0.78_0.13_300)]">
            Short answer
          </h2>
          <p className="mt-3 text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl">
            Traction X provides six trade show services: exhibit and display design with photoreal 3D renders, custom
            booth construction, project management, install and dismantle (I&amp;D), shipping and freight logistics, and
            audio-visual rentals. Buy them together as a turnkey exhibit program, or hire any one of them for a booth
            built elsewhere. Install and dismantle labour is included in our booth pricing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteButton source="services-tldr" />
            <Link
              to="/booth-cost-calculator"
              className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
            >
              Estimate my booth cost
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="What we do" title="Every trade show capability under one roof">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <h3 className="font-display text-xl font-semibold">{s.label}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{s.short}</p>
              <span className="mt-4 inline-block text-sm text-[oklch(0.78_0.13_300)] group-hover:underline">
                {s.label} details →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="How it fits together" title="One producer from brief to outbound freight" bg="muted">
        <p className="max-w-3xl text-white/75 leading-relaxed text-base md:text-lg">
          Most exhibit problems happen at the handoffs — designer to fabricator, fabricator to freight, freight to labour
          crew. Running the whole chain in-house removes those seams: the team that drew the booth is the team that
          builds it, crates it, ships it and sets it on the floor. That's why our pricing includes install and dismantle
          labour, and why the drayage bill gets audited by the same producer who booked the freight.
        </p>
        <ul className="mt-6 grid md:grid-cols-2 gap-3 max-w-4xl">
          {[
            "Design credited against any booth we build or rent",
            "Shop pre-build and photo record before anything ships",
            "Advance forms filed before early-bird discount cutoffs",
            "Certified union and non-union I&D crews nationwide",
            "Install and dismantle labour included in booth pricing",
            "Post-show debrief, photo package and invoice reconciliation",
          ].map((b) => (
            <li key={b} className="flex gap-3 text-white/70 leading-relaxed">
              <span className="text-[oklch(0.78_0.13_300)]" aria-hidden="true">→</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Keep exploring" title="Related pages">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link to="/rent-a-booth" className="text-[oklch(0.78_0.13_300)] hover:underline">Trade show booth rentals</Link>
          <span className="text-white/25">·</span>
          <Link to="/trade-show-booth-rental-pricing" className="text-[oklch(0.78_0.13_300)] hover:underline">Custom booth rental pricing</Link>
          <span className="text-white/25">·</span>
          <Link to="/gallery" search={{ size: undefined }} className="text-[oklch(0.78_0.13_300)] hover:underline">Booth gallery</Link>
          <span className="text-white/25">·</span>
          <Link to="/industries" className="text-[oklch(0.78_0.13_300)] hover:underline">Exhibits by industry</Link>
          <span className="text-white/25">·</span>
          <Link to="/shows" className="text-[oklch(0.78_0.13_300)] hover:underline">Exhibiting at a specific show</Link>
        </div>
      </Section>

      <FAQBlock items={HUB_FAQS} title="Trade show services FAQs" />

      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
