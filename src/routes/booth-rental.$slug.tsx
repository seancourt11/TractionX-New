import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton, BookMeetingButton } from "@/components/GlobalCta";
import { ESTIMATE_DISCLAIMER } from "@/components/QuoteModal";
import { COMBOS, COMBO_MAP, type Combo } from "@/data/industries";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/booth-rental/$slug")({
  loader: ({ params }): Combo => {
    const c = COMBO_MAP[params.slug];
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Booth rental" }, { name: "robots", content: "noindex" }] };
    const { size, industry } = loaderData;
    const url = `${SITE.url}/booth-rental/${params.slug}`;
    const title = `${size.label} Trade Show Booth Rental for ${industry.label} Companies | Traction X`;
    const description = `Custom ${size.label} (${size.dims}) trade show booth rentals built for ${industry.plural}. From ${size.rentalFrom} — design, fabrication, graphics, install and show management included.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: `${size.label} Trade Show Booth Rental for ${industry.label}`,
              description,
              brand: { "@type": "Brand", name: SITE.name },
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: size.rentalFrom.replace(/[^0-9]/g, ""),
                availability: "https://schema.org/InStock",
                url,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                { "@type": "ListItem", position: 2, name: "Booth Rentals", item: `${SITE.url}/booth-rental` },
                { "@type": "ListItem", position: 3, name: `${size.label} for ${industry.label}`, item: url },
              ],
            },
          ]),
        },
      ],
    };
  },
  component: ComboPage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Page not found" intro="That combination has moved." />
    </PageLayout>
  ),
});

function ComboPage() {
  const { size, industry, slug } = Route.useLoaderData() as Combo;

  const related = COMBOS.filter(
    (c) => c.slug !== slug && (c.industry.slug === industry.slug || c.size.slug === size.slug),
  );

  const faqs = [
    {
      q: `How much does a ${size.label} booth rental cost for ${industry.plural}?`,
      a: `A custom ${size.label} rental starts at ${size.rentalFrom}, covering design, fabrication, graphics, standard lighting, install and dismantle, and project management. ${industry.label} builds often add secure storage, private meeting space and integrated AV, which move the number upward. Show services such as drayage and electrical are billed separately by the venue contractor.`,
    },
    {
      q: `Is the ${size.label} rental actually custom?`,
      a: `Yes. Traction X is a 100% custom rental company — we fabricate to your drawings, your geometry and your finishes. The difference from an owned build is that we recover and remake the structure afterwards, so you carry no storage, refurbishment or asset cost.`,
    },
    {
      q: `What's the lead time for a ${size.label} ${industry.label.toLowerCase()} booth?`,
      a: `Four to eight weeks is comfortable from approved design to crated build. We regularly run rush programmes in under three weeks, and we will tell you honestly if a timeline is not achievable rather than accept it and miss.`,
    },
    {
      q: `Which shows do you build ${industry.plural} for?`,
      a: `Recent ${industry.label.toLowerCase()} programmes include ${industry.shows.join(", ")}, alongside regional shows across Canada and the United States. We handle install and dismantle in every major convention city on both sides of the border.`,
    },
  ];

  return (
    <PageLayout>
      <PageHero
        eyebrow={`${size.label} · ${industry.label}`}
        title={`${size.label} Booth Rental for`}
        accent={`${industry.label} Companies`}
        intro={`A ${size.dims} custom rental engineered around how ${industry.plural} actually sell on a show floor — ${industry.audience}. From ${size.rentalFrom}, with design, fabrication, graphics, install and on-site management handled end to end.`}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source={`combo-${slug}`} size={size.label} label={`Quote a ${size.label}`} />
          <BookMeetingButton variant="outline" source={`combo-${slug}`} />
        </div>
      </PageHero>

      <section id="tldr" className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">Quick answer</p>
          <p className="text-white/85 text-lg leading-relaxed">
            A custom {size.label} ({size.dims}, {size.sqft} sq ft) rental for {industry.plural} starts at{" "}
            <strong className="text-white">{size.rentalFrom}</strong>. That is a{" "}
            {size.layout.toLowerCase()} configuration comfortably staffed by {size.staffCount}, built to your
            brand and recovered by us after the show.
          </p>
        </div>
      </section>

      <Section eyebrow="The footprint" title={`What a ${size.label} gives you`}>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["Dimensions", `${size.dims} · ${size.sqft} sq ft`],
            ["Configuration", size.layout],
            ["Staffing", size.staffCount],
            ["Custom rental from", size.rentalFrom],
            ["Owned build from", size.customFrom],
            ["Lead time", "4–8 weeks from approved design"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">{k}</p>
              <p className="mt-2 text-white/85 leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-white/45 max-w-3xl">{ESTIMATE_DISCLAIMER}</p>
      </Section>

      <Section
        bg="muted"
        eyebrow={industry.label}
        title={`What ${industry.plural} need from ${size.label} of floor`}
        intro={`Your buyers are ${industry.audience}. That changes the layout before it changes the graphics.`}
      >
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-7">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[oklch(0.85_0.13_300)]">
              Priorities we design around
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/78">
              {industry.priorities.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-[oklch(0.78_0.13_300)]">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-7">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight">Design notes for this build</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/78">
              {industry.designNotes.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="text-white/45">▸</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-[oklch(0.78_0.13_300)]/35 bg-[oklch(0.78_0.13_300)]/[0.07] p-7">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/55 mb-3">
            Compliance & floor rules
          </p>
          <p className="text-white/80 leading-relaxed max-w-3xl">{industry.compliance}</p>
        </div>
      </Section>

      <Section eyebrow="Where we build these" title={`${industry.label} shows we work`}>
        <div className="flex flex-wrap gap-3">
          {industry.shows.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/75"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-white/70 leading-relaxed">
          Beyond those, we install across every major convention city in Canada and the United States —
          Las Vegas, Orlando, Chicago, Toronto, Vancouver, Halifax and more. Cross-border freight,
          customs documentation and union-jurisdiction labour are handled by our project team, so the
          same booth travels your whole calendar without you renegotiating logistics each time.
        </p>
      </Section>

      <Section bg="muted" eyebrow="Process" title="How the rental runs">
        <div className="grid md:grid-cols-4 gap-5">
          {[
            ["01 Engage", "Footprint, objectives, budget and show calendar in a 10 or 30 minute call."],
            ["02 Design", `A complimentary photoreal 3D concept of your ${size.label}, revised until it's right.`],
            ["03 Fabricate", "Built in our shop to your finishes, quality-checked and crated."],
            ["04 Manage", "Freight, drayage coordination, install, on-site supervision, dismantle and recovery."],
          ].map(([h, b]) => (
            <div key={h} className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <p className="font-display text-lg font-bold uppercase tracking-tight text-[oklch(0.85_0.13_300)]">
                {h}
              </p>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <FAQBlock items={faqs} title={`${size.label} for ${industry.label} — questions`} />

      <Section eyebrow="Related" title="Other sizes and sectors" bg="muted">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((r) => (
            <Link
              key={r.slug}
              to="/booth-rental/$slug"
              params={{ slug: r.slug }}
              className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white/75 hover:border-[oklch(0.78_0.13_300)]/50 hover:text-white transition"
            >
              {r.size.label} booth rental for {r.industry.label} →
            </Link>
          ))}
        </div>
      </Section>

      <DesignCtaBand source={`combo-${slug}`} />
      <CTABand heading={`Ready to design your ${size.label}?`} />
    </PageLayout>
  );
}
