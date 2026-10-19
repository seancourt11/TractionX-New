import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { FLOORPLAN_PLATFORMS } from "@/data/floorplan-platforms";
import { FloorPlanPartnerBooths } from "@/components/FloorPlanPartnerBooths";
import { SITE } from "@/lib/site";
import { noindexMeta, absUrl } from "@/lib/seo";

const TITLE = "Floor Plan Software Comparison for Trade Shows — ExpoFP, Cvent, EXPOCAD & More | Traction X";
const DESC =
  "An honest buyer's guide to interactive floor plan platforms for trade show organizers: ExpoFP, Map Your Show, EXPOCAD, A2Z Events, Cvent, MapD Events and ExpoPlatform — compared by fit, strengths and pricing transparency.";

const FAQS = [
  {
    q: "Do you sell one of these floor plan platforms?",
    a: "No. Traction X isn't a floor plan software vendor and doesn't compete with these platforms. We're a managed operations partner: we build, populate and run the floor plan for your show on whichever platform you choose (or help you choose one), so your team isn't doing the day-to-day map maintenance in-house.",
  },
  {
    q: "How should we choose a floor plan platform?",
    a: "Start with three questions: how much of your event workflow (registration, booth sales, exhibitor resources) do you want in the same system as the floor plan; whether pricing transparency matters more to you than a fully custom quote; and how much of the ongoing plan management your own team wants to own versus hand off. Floor-plan-first tools like ExpoFP suit organizers who want a standalone, polished map. Trade show operating systems like Map Your Show, EXPOCAD and A2Z Events suit organizers who want booth sales and exhibitor tools bundled in. Enterprise suites like Cvent and ExpoPlatform suit organizers already invested in a wider platform ecosystem.",
  },
  {
    q: "Is pricing for these platforms public?",
    a: "It varies. ExpoFP, Cvent's diagramming tool, MapD Events and ExpoPlatform publish starting prices or tiers online. Map Your Show, EXPOCAD and A2Z Events by Personify quote per organization and don't publish rate cards. We note what's publicly available on each platform's detail page and flag where you'll need a sales conversation to get real numbers.",
  },
  {
    q: "Can Traction X run our floor plan on a platform we've already licensed?",
    a: "Yes. Most of our floor plan engagements start with an organizer who already has a platform contract and needs someone to build the plan, structure inventory, onboard exhibitors and keep it accurate through move-in. See our managed floor plan services for detail on that scope.",
  },
];

export const Route = createFileRoute("/floor-plan-software-comparison/")({
  head: () => {
    const url = absUrl("/floor-plan-software-comparison");
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        ...noindexMeta(),
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESC },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumbs`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Floor Plan Software Comparison",
                    item: url,
                  },
                ],
              },
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: FAQS.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "WebPage",
                "@id": url,
                name: TITLE,
                description: DESC,
                speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
              },
            ],
          }),
        },
      ],
    };
  },
  component: HubPage,
});

function HubPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Buyer's guide"
        title="Floor Plan Software"
        accent="Comparison"
        intro="An honest, non-vendor-biased guide to interactive floor plan platforms for trade show organizers — written by the team that runs floor plan operations on any of them, day to day, show after show."
      >
        <nav aria-label="Breadcrumb" className="mt-6 text-sm text-white/50">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">Floor Plan Software Comparison</span>
        </nav>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="floorplan-comparison-hero" />
          <Link
            to="/custom-trade-show-floor-plans"
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            See our managed floor plan service
          </Link>
        </div>
      </PageHero>

      <Section id="tldr">
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.06] p-6 md:p-8">
          <h2 className="font-display text-sm uppercase tracking-[0.28em] text-[oklch(0.78_0.13_300)]">
            How to choose
          </h2>
          <p className="mt-3 text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl">
            Start with how much of your event workflow you want in one system. Want the floor plan to be a
            standalone, polished, exhibitor-friendly map? Look at floor-plan-first tools like ExpoFP. Want booth
            sales, exhibitor resources and the plan connected in one platform? Look at trade show operating systems
            like Map Your Show, EXPOCAD or A2Z Events by Personify. Already running registration or venue sourcing
            through an enterprise suite? Cvent or ExpoPlatform may extend that investment. Whichever you pick, someone
            still has to build the plan, structure inventory, onboard exhibitors and keep it current — that's the
            part Traction X runs for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteButton source="floorplan-comparison-tldr" />
          </div>
        </div>
      </Section>

      <Section eyebrow="At a glance" title="Compare floor plan platforms">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/15 text-xs uppercase tracking-widest text-white/50">
                <th scope="col" className="py-3 pr-6 font-medium">Platform</th>
                <th scope="col" className="py-3 pr-6 font-medium">Category</th>
                <th scope="col" className="py-3 pr-6 font-medium">Best for</th>
                <th scope="col" className="py-3 font-medium">Pricing transparency</th>
              </tr>
            </thead>
            <tbody>
              {FLOORPLAN_PLATFORMS.map((p) => (
                <tr key={p.slug} className="border-b border-white/10 align-top">
                  <th scope="row" className="py-4 pr-6 font-normal">
                    <Link
                      to="/floor-plan-software-comparison/$slug"
                      params={{ slug: p.slug }}
                      className="text-white hover:text-[oklch(0.78_0.13_300)] font-semibold"
                    >
                      {p.name}
                    </Link>
                  </th>
                  <td className="py-4 pr-6 text-white/70">{p.category}</td>
                  <td className="py-4 pr-6 text-white/70 max-w-xs">{p.bestFor}</td>
                  <td className="py-4 text-white/70 max-w-xs">
                    {p.pricingNote.startsWith("Pricing on request") ? "Quote-based" : "Published starting pricing"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Platform profiles" title="Read the full breakdown" bg="muted">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLOORPLAN_PLATFORMS.map((p) => (
            <Link
              key={p.slug}
              to="/floor-plan-software-comparison/$slug"
              params={{ slug: p.slug }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="text-xs uppercase tracking-widest text-white/50">{p.category}</div>
              <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-3 text-white/70 leading-relaxed text-sm">{p.bestFor}</p>
              <span className="mt-4 inline-block text-sm text-[oklch(0.78_0.13_300)] group-hover:underline">
                Full comparison →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Where we fit" title="We run the floor plan — on whichever platform you pick">
        <p className="max-w-3xl text-white/75 leading-relaxed text-base md:text-lg">
          Traction X isn't a floor plan software company and doesn't compete with any platform on this page. We're a
          managed operations partner: converting your venue drawing into the platform of your choice, structuring
          booth and sponsorship inventory, onboarding exhibitors, and keeping the plan accurate from first sale
          through move-in. That means you get the platform's technology without your team carrying the day-to-day
          build and maintenance workload.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="floorplan-comparison-fit" />
          <Link
            to="/custom-trade-show-floor-plans"
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            See our managed floor plan service
          </Link>
        </div>
      </Section>

      <FloorPlanPartnerBooths source="floorplan-comparison-booths" bg="muted" />

      <FAQBlock items={FAQS} title="Floor plan platform FAQs" />

      <DesignCtaBand source="floorplan-comparison" />
      <CTABand />
    </PageLayout>
  );
}
