import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { QuoteButton, BookMeetingButton, DesignCtaBand } from "@/components/GlobalCta";
import { EXHIBITOR_RESOURCES } from "@/data/exhibitor-resources";
import { SITE } from "@/lib/site";
import { robotsMeta, absUrl } from "@/lib/seo";

const TITLE = "Exhibitor Resource Center — Budget, Deadline, ROI & Graphic Tools | Traction X";
const DESC =
  "Free trade show planning tools: budget template with hidden line items, show services deadline tracker, booth graphic specs, ROI calculator, staffing playbook, shipping and setup checklists, and venue rules by hall.";

const HUB_FAQS = [
  {
    q: "What do exhibitors most often forget to budget for?",
    a: "Drayage, electrical, rigging, internet, cleaning, outbound freight and loaded staff time. Together they routinely add 30–40% on top of space and booth cost, which is why our budget template pre-fills all of them.",
  },
  {
    q: "How far ahead should trade show planning start?",
    a: "Sixteen to twenty weeks for a custom build, eight to twelve for a rental. Advance-order discounts on show services typically close three to four weeks before move-in, and rigging submissions often close sixty days out.",
  },
  {
    q: "Are these resources free?",
    a: "Yes. The tools run in your browser and nothing is required to use them. A few exports ask for an email so we can send the file and sanity-check your booth line against real pricing.",
  },
];

export const Route = createFileRoute("/exhibitor-resources/")({
  head: () => {
    const url = absUrl("/exhibitor-resources");
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        ...robotsMeta(),
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
                "@type": "CollectionPage",
                "@id": url,
                name: TITLE,
                description: DESC,
                url,
                speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
              },
              {
                "@type": "ItemList",
                "@id": `${url}#list`,
                itemListElement: EXHIBITOR_RESOURCES.map((r, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: r.label,
                  url: absUrl(`/exhibitor-resources/${r.slug}`),
                })),
              },
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: HUB_FAQS.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumbs`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                  { "@type": "ListItem", position: 2, name: "Exhibitor Resources", item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: ResourceHub,
});

function ResourceHub() {
  const tools = EXHIBITOR_RESOURCES.filter((r) => r.tool);
  const reading = EXHIBITOR_RESOURCES.filter((r) => !r.tool);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Exhibitor resource center"
        title="Everything you need"
        accent="to plan a show properly"
        intro="Eight practical resources built from the projects we install every week: interactive budgeting, deadline back-calculation, ROI modelling, artwork specs, and the checklists our own producers run."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="resources-hero" />
          <BookMeetingButton source="resources-hero" />
        </div>
      </PageHero>

      <Section id="tldr">
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.06] p-6 md:p-8">
          <h2 className="font-display text-sm uppercase tracking-[0.28em] text-[oklch(0.78_0.13_300)]">
            Short answer
          </h2>
          <p className="mt-3 text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl">
            A trade show programme runs on four numbers and one calendar: the all-in budget including
            show services, the deadlines that price those services, the artwork specs your designer
            needs, and the return you can defend to finance. Each tool below produces one of them in a
            couple of minutes.
          </p>
        </div>
      </Section>

      <Section eyebrow="Interactive" title="Tools that calculate for you" bg="muted">
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((r) => (
            <Link
              key={r.slug}
              to="/exhibitor-resources/$slug"
              params={{ slug: r.slug }}
              className="group rounded-2xl border border-white/10 bg-black/40 p-6 hover:border-[oklch(0.78_0.13_300)]/50 transition"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-[oklch(0.82_0.13_300)]">{r.eyebrow}</p>
              <h3 className="mt-3 font-display text-xl font-semibold group-hover:text-[oklch(0.88_0.10_300)]">
                {r.label}
              </h3>
              <p className="mt-2 text-white/70 leading-relaxed text-sm">{r.summary}</p>
              <p className="mt-4 text-xs text-white/40">
                {r.kind} · {r.readMinutes} min
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Checklists & playbooks" title="What our producers actually run">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reading.map((r) => (
            <Link
              key={r.slug}
              to="/exhibitor-resources/$slug"
              params={{ slug: r.slug }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[oklch(0.78_0.13_300)]/50 transition"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">{r.eyebrow}</p>
              <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-[oklch(0.88_0.10_300)]">
                {r.label}
              </h3>
              <p className="mt-2 text-white/65 leading-relaxed text-sm">{r.summary}</p>
              <p className="mt-4 text-xs text-white/40">
                {r.kind} · {r.readMinutes} min
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <DesignCtaBand />
      <FAQBlock items={HUB_FAQS} title="About these resources" />
      <CTABand heading="Want us to run the plan with you?" />
    </PageLayout>
  );
}
