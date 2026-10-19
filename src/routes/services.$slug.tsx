import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { resolveLegacyRedirect } from "../data/legacy-redirects";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton, BookMeetingButton } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { SERVICE_MAP, SERVICES } from "@/data/services";
import { SITE } from "@/lib/site";
import { robotsMeta, absUrl } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICE_MAP[params.slug];
    if (!service) {
      const legacy = resolveLegacyRedirect(`/services/${params.slug}`);
      if (legacy) throw redirect({ href: legacy, statusCode: 301, throw: true });
      throw notFound();
    }
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.service;
    const url = absUrl(`/services/${s.slug}`);
    return {
      meta: [
        { title: s.seo.title },
        { name: "description", content: s.seo.description },
        ...robotsMeta(),
        { property: "og:title", content: s.seo.title },
        { property: "og:description", content: s.seo.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: s.seo.title },
        { name: "twitter:description", content: s.seo.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": `${url}#service`,
                name: s.h1 ?? s.label,
                serviceType: s.label,
                description: s.answer ?? s.seo.description,
                url,
                provider: {
                  "@type": "Organization",
                  name: SITE.name,
                  url: SITE.url,
                  telephone: SITE.phone,
                  email: SITE.email,
                },
                areaServed: ["Canada", "United States", "Europe", "Asia", "Oceania", "Latin America"],
                audience: { "@type": "BusinessAudience", audienceType: "Trade show exhibitors and event marketers" },
                termsOfService: absUrl("/terms-of-service"),
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: `${s.label} deliverables`,
                  itemListElement: (s.deliverables ?? s.keyPoints.map((k) => k.title)).map((d, i) => ({
                    "@type": "Offer",
                    position: i + 1,
                    itemOffered: { "@type": "Service", name: d },
                  })),
                },
                potentialAction: {
                  "@type": "ContactAction",
                  target: absUrl("/contact"),
                  name: "Request a quote",
                },
              },
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: s.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "HowTo",
                "@id": `${url}#process`,
                name: `How ${s.label.toLowerCase()} works with ${SITE.name}`,
                step: s.process.map((p, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: p.title,
                  text: p.body,
                })),
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumbs`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                  { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
                  { "@type": "ListItem", position: 3, name: s.label, item: url },
                ],
              },
              {
                "@type": "WebPage",
                "@id": url,
                name: s.seo.title,
                description: s.seo.description,
                speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
              },
            ],
          }),
        },
      ],
    };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Service not found" intro="That service page has moved. Head back to the services hub." />
    </PageLayout>
  ),
});

function ServicePage() {
  const { service: s } = Route.useLoaderData() as { service: (typeof SERVICES)[number] };
  return (
    <PageLayout>
      <PageHero
        eyebrow="Trade show services"
        title={s.h1 ?? s.hero.title}
        accent={s.h1 ? undefined : s.hero.accent}
        intro={s.hero.intro}
      >
        <nav aria-label="Breadcrumb" className="mt-6 text-sm text-white/50">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-white">Services</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{s.label}</span>
        </nav>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="hero" />
          <BookMeetingButton source="hero" />
          <Link to="/services" className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10">
            All services
          </Link>
        </div>
      </PageHero>

      {s.answer && (
        <Section id="tldr">
          <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.06] p-6 md:p-8">
            <h2 className="font-display text-sm uppercase tracking-[0.28em] text-[oklch(0.78_0.13_300)]">
              Short answer
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl">{s.answer}</p>
            {s.quickFacts && (
              <dl className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {s.quickFacts.map((f) => (
                  <div key={f.label} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <dt className="text-xs uppercase tracking-widest text-white/50">{f.label}</dt>
                    <dd className="mt-1 font-display font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <QuoteButton source="tldr" />
              <Link
                to="/booth-cost-calculator"
                className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
              >
                Estimate my booth cost
              </Link>
            </div>
          </div>
        </Section>
      )}

      <Section eyebrow="What you get" title={`What our ${s.label.toLowerCase()} includes`}>
        <div className="grid md:grid-cols-2 gap-6">
          {s.keyPoints.map((k) => (
            <div key={k.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-xl font-semibold">{k.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{k.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {s.sections?.map((sec, i) => (
        <Section key={sec.heading} title={sec.heading} bg={i % 2 === 0 ? "muted" : "default"}>
          <p className="max-w-3xl text-white/75 leading-relaxed text-base md:text-lg">{sec.body}</p>
          {sec.bullets && (
            <ul className="mt-6 grid md:grid-cols-2 gap-3 max-w-4xl">
              {sec.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-white/70 leading-relaxed">
                  <span className="text-[oklch(0.78_0.13_300)]" aria-hidden="true">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </Section>
      ))}

      {s.deliverables && (
        <Section eyebrow="Deliverables" title="Exactly what you receive">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {s.deliverables.map((d) => (
              <li key={d} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-white/75">
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <QuoteButton source="deliverables" />
          </div>
        </Section>
      )}

      {s.pricing && (
        <Section
          eyebrow="Pricing"
          title={`${s.label} pricing`}
          bg="muted"
          intro={s.pricing.note}
        >
          {s.pricing.rows && (
            <div className="overflow-x-auto">
              <table className="w-full max-w-3xl text-left border-collapse">
                <caption className="sr-only">Starting price ranges for {s.label.toLowerCase()}</caption>
                <thead>
                  <tr className="border-b border-white/15 text-xs uppercase tracking-widest text-white/50">
                    <th scope="col" className="py-3 pr-6 font-medium">Item</th>
                    <th scope="col" className="py-3 font-medium">Starting from</th>
                  </tr>
                </thead>
                <tbody>
                  {s.pricing.rows.map((r) => (
                    <tr key={r.label} className="border-b border-white/10">
                      <th scope="row" className="py-3 pr-6 font-normal text-white/75">{r.label}</th>
                      <td className="py-3 font-display font-semibold">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-6 max-w-2xl text-white/60 text-sm leading-relaxed">
            Ranges are starting points, not quotes. Send your show, dates and booth size and we'll come back with an
            exact number — usually within one business day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <QuoteButton source="pricing" />
            <Link
              to="/trade-show-booth-rental-pricing"
              className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
            >
              See rental pricing guide
            </Link>
          </div>
        </Section>
      )}

      <Section eyebrow="Process" title={`How ${s.label.toLowerCase()} runs, step by step`}>
        <ol className="grid md:grid-cols-2 gap-6">
          {s.process.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-white/10 p-6">
              <div className="text-[oklch(0.78_0.13_300)] font-display text-sm uppercase tracking-widest">Step {i + 1}</div>
              <h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Other services" title="Related trade show capabilities" bg="muted">
        <div className="grid md:grid-cols-3 gap-4">
          {SERVICES.filter((x) => x.slug !== s.slug).slice(0, 6).map((x) => (
            <Link
              key={x.slug}
              to="/services/$slug"
              params={{ slug: x.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="font-display font-semibold">{x.label}</div>
              <div className="mt-1 text-sm text-white/60">{x.short}</div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link to="/gallery" search={{ size: undefined }} className="text-[oklch(0.78_0.13_300)] hover:underline">
            See booths we designed and built
          </Link>
          <span className="text-white/25">·</span>
          <Link to="/case-studies" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Read exhibit case studies
          </Link>
          <span className="text-white/25">·</span>
          <Link to="/industries" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Trade show exhibits by industry
          </Link>
          <span className="text-white/25">·</span>
          <Link to="/shows" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Exhibiting at a specific show
          </Link>
        </div>
        {s.relatedTerms && (
          <p className="mt-8 text-sm text-white/45 max-w-3xl">
            Also searched as: {s.relatedTerms.join(" · ")}.
          </p>
        )}
      </Section>

      <FAQBlock items={s.faqs} title={`${s.label} FAQs`} />

      <Section id="contact">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
              Get a scoped {s.label.toLowerCase()} estimate
            </h2>
            <p className="mt-4 text-white/70 max-w-md">
              Tell us the show, dates and objectives. We'll reply within one business day with a scoped quote and next
              steps — and a complimentary 3D concept if you're ready to design.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookMeetingButton source="service-contact" />
            </div>
            <p className="mt-6 text-sm text-white/50">
              Prefer to talk now? Call{" "}
              <a href={`tel:${SITE.phone}`} className="text-white hover:underline">{SITE.phoneDisplay}</a> or email{" "}
              <a href={`mailto:${SITE.email}`} className="text-white hover:underline">{SITE.email}</a>.
            </p>
          </div>
          <QuoteForm heading={`Request a ${s.label.toLowerCase()} quote`} />
        </div>
      </Section>

      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
