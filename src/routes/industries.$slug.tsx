import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { QuoteButton, BookMeetingButton, DesignCtaBand } from "@/components/GlobalCta";
import { ESTIMATE_DISCLAIMER } from "@/components/QuoteModal";
import { INDUSTRIES, INDUSTRY_MAP, type IndustryPage } from "@/data/industry-pages";
import { showUrlSlug, getShow } from "@/data/shows";
import { VENUES, venueUrlSlug } from "@/data/venues";
import { CaseProof } from "@/components/CaseProof";
import { SITE } from "@/lib/site";
import { robotsMeta } from "@/lib/seo";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }): IndustryPage => {
    const i = INDUSTRY_MAP[params.slug];
    if (!i) throw notFound();
    return i;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return { meta: [{ title: "Industry" }, { name: "robots", content: "noindex" }] };
    const i = loaderData;
    const url = `${SITE.url}/industries/${params.slug}`;
    return {
      meta: [
        { title: i.metaTitle },
        { name: "description", content: i.metaDesc },
        ...robotsMeta(),

        { property: "og:title", content: i.metaTitle },
        { property: "og:description", content: i.metaDesc },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: `${i.label} trade show booth rentals`,
              name: `${i.label} Trade Show Booth Rentals`,
              description: i.metaDesc,
              provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
              areaServed: ["United States", "Canada"],
              url,
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: i.faqs.map((f) => ({
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
                { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE.url}/industries` },
                { "@type": "ListItem", position: 3, name: i.label, item: url },
              ],
            },
          ]),
        },
      ],
    };
  },
  component: IndustryDetail,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Industry not found" intro="That page has moved — browse all industries instead." />
    </PageLayout>
  ),
});

function IndustryDetail() {
  const i = Route.useLoaderData() as IndustryPage;
  const related = INDUSTRIES.filter((x) => x.slug !== i.slug).slice(0, 6);
  const venueLinks = i.venues
    .map((name) => VENUES.find((v) => v.name === name || v.shortName === name))
    .filter((v): v is (typeof VENUES)[number] => Boolean(v));

  const faqs = [
    ...i.faqs,
    {
      q: `How much does a ${i.label.toLowerCase()} trade show booth rental cost?`,
      a: `${i.budget} Design, fabrication, graphics, standard lighting, install and dismantle, and project management are included. Show services such as drayage and electrical are billed separately by the venue contractor.`,
    },
    {
      q: `Do you build custom, or only modular, for ${i.plural}?`,
      a: `Both — and our rentals are 100% custom. We fabricate to your drawings and finishes, then recover and remake the structure after the show, so you carry no storage or refurbishment cost. Owned custom builds are available where the programme justifies them.`,
    },
    {
      q: `What is the lead time for a ${i.label.toLowerCase()} booth?`,
      a: `Four to eight weeks from approved design to crated build is comfortable. Rush programmes under three weeks are possible; we will tell you honestly if a date is not achievable rather than accept it and miss.`,
    },
  ];

  return (
    <PageLayout>
      <PageHero
        eyebrow={`Industry · ${i.label}`}
        title="Trade show booths for"
        accent={i.label}
        intro={i.intro}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source={`industry-${i.slug}`} label="Request a quote" />
          <BookMeetingButton variant="outline" source={`industry-${i.slug}`} />
        </div>
      </PageHero>

      <section id="tldr" className="border-b border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-white/50">Quick answer</p>
          <p className="text-lg leading-relaxed text-white/85">
            Traction X designs, fabricates and manages custom booth rentals for {i.plural}. Typical
            footprints are {i.recommendedSizes.join(", ")}, and pricing starts at{" "}
            <strong className="text-white">{i.budget}</strong> {i.proofAngle}
          </p>
          <p className="mt-4 text-xs text-white/45">{ESTIMATE_DISCLAIMER}</p>
        </div>
      </section>

      <Section
        eyebrow="Who you're selling to"
        title={`How ${i.plural} actually buy`}
        intro={`Your visitors are ${i.audience}.`}
      >
        <p className="max-w-3xl leading-relaxed text-white/75">{i.buyingCycle}</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-7">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[oklch(0.85_0.13_300)]">
              Priorities we design around
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/78">
              {i.priorities.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-[oklch(0.78_0.13_300)]">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-7">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight">Design notes</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/78">
              {i.designNotes.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="text-white/45">▸</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-[oklch(0.78_0.13_300)]/35 bg-[oklch(0.78_0.13_300)]/[0.07] p-7">
          <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/55">
            Compliance &amp; floor rules
          </p>
          <p className="max-w-3xl leading-relaxed text-white/80">{i.compliance}</p>
        </div>
      </Section>

      <Section bg="muted" eyebrow="Sizing & budget" title={`What ${i.plural} typically book`}>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Recommended footprints", i.recommendedSizes.join(" · ")],
            ["Budget guidance", i.budget],
            ["Lead time", "4–8 weeks from approved design"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">{k}</p>
              <p className="mt-2 leading-relaxed text-white/85">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/booth-cost-calculator"
            className="rounded-full border border-white/20 px-6 py-3 text-sm text-white/85 transition hover:border-[oklch(0.78_0.13_300)]/70"
          >
            Price it in the calculator →
          </Link>
          <Link
            to="/trade-show-booth-rental-pricing"
            className="rounded-full border border-white/20 px-6 py-3 text-sm text-white/85 transition hover:border-[oklch(0.78_0.13_300)]/70"
          >
            See full rental pricing →
          </Link>
        </div>
        <p className="mt-5 max-w-3xl text-xs text-white/45">{ESTIMATE_DISCLAIMER}</p>
      </Section>

      <Section eyebrow="Where we build these" title={`${i.label} shows we work`}>
        <div className="flex flex-wrap gap-3">
          {i.shows.map((s) =>
            s.slug && getShow(s.slug) ? (
              <Link
                key={s.name}
                to="/shows/$slug"
                params={{ slug: showUrlSlug(s.slug) }}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:border-[oklch(0.78_0.13_300)]/70 hover:text-white"
              >
                {s.name} →
              </Link>
            ) : (
              <span
                key={s.name}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/70"
              >
                {s.name}
              </span>
            ),
          )}
        </div>

        {venueLinks.length > 0 && (
          <>
            <h3 className="mt-10 font-display text-lg font-bold uppercase tracking-tight">
              Venues we run {i.label.toLowerCase()} programmes in
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {venueLinks.map((v) => (
                <Link
                  key={v.slug}
                  to="/venues/$slug"
                  params={{ slug: venueUrlSlug(v.slug) }}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:border-[oklch(0.78_0.13_300)]/70 hover:text-white"
                >
                  {v.shortName} · {v.city} →
                </Link>
              ))}
            </div>
          </>
        )}

        <p className="mt-8 max-w-3xl leading-relaxed text-white/70">
          Beyond those, we install across every major convention city in Canada and the United States.
          Cross-border freight, customs documentation and union-jurisdiction labour are handled by our
          project team, so the same booth travels your whole calendar without renegotiating logistics
          each time.
        </p>
      </Section>

      <Section bg="muted" eyebrow="Process" title="How a rental programme runs">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["01 Engage", "Footprint, objectives, budget and show calendar in a 10 or 30 minute call."],
            ["02 Design", `A complimentary photoreal 3D concept tuned to ${i.label.toLowerCase()} floor rules.`],
            ["03 Fabricate", "Built in our shop, pre-assembled, photographed and QC-checked before it ships."],
            ["04 Manage", "Freight, show services, install, on-site supervision, dismantle and recovery."],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[oklch(0.85_0.13_300)]">{k}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/78">{v}</p>
            </div>
          ))}
        </div>
      </Section>

      <CaseProof
        context={{ industry: i.label }}
        seed={i.slug}
        heading={`${i.label} exhibits we’ve delivered`}
      />

      <DesignCtaBand source={`industry-${i.slug}`} />

      <FAQBlock items={faqs} title={`${i.label} booth rental FAQs`} />

      <Section eyebrow="Other sectors" title="Industries we also build for">
        <div className="flex flex-wrap gap-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              to="/industries/$slug"
              params={{ slug: r.slug }}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:border-[oklch(0.78_0.13_300)]/70 hover:text-white"
            >
              {r.label} →
            </Link>
          ))}
          <Link
            to="/industries"
            className="rounded-full border border-[oklch(0.78_0.13_300)]/50 px-5 py-2.5 text-sm text-[oklch(0.85_0.13_300)]"
          >
            All industries →
          </Link>
        </div>
      </Section>

      <CTABand heading={`Planning a ${i.label.toLowerCase()} show? Let's scope the build.`} />
    </PageLayout>
  );
}
