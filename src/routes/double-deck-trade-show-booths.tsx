import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, Design3DButton, BookMeetingButton, QuoteButton } from "@/components/GlobalCta";
import { PromiseGrid } from "@/components/Promises";
import { QuoteForm } from "@/components/QuoteForm";
import { CaseProof } from "@/components/CaseProof";
import { absUrl, robotsMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import {
  DD_PATH,
  DD_TITLE,
  DD_DESC,
  DD_SHORT_ANSWER,
  DD_SPEC,
  DD_SECTIONS,
  DD_COUNTDOWN,
  DD_FAQS,
} from "@/data/double-deck";

export const Route = createFileRoute("/double-deck-trade-show-booths")({
  head: () => ({
    meta: [
      { title: DD_TITLE },
      { name: "description", content: DD_DESC },
      ...robotsMeta(),
      { property: "og:title", content: DD_TITLE },
      { property: "og:description", content: DD_DESC },
      { property: "og:url", content: absUrl(DD_PATH) },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content:
          "double deck trade show booth, two story trade show exhibit, double decker booth rental, two level exhibit, double deck booth engineering, two story booth permit",
      },
    ],
    links: [{ rel: "canonical", href: absUrl(DD_PATH) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Double Deck & Two-Story Trade Show Exhibits",
              serviceType: "Double deck trade show booth rental, custom fabrication, engineering and permitting",
              alternateName: ["Two-story trade show exhibit", "Double decker booth", "Two level exhibit"],
              description: DD_SHORT_ANSWER,
              provider: {
                "@type": "Organization",
                name: SITE.name,
                url: SITE.url,
                telephone: SITE.phone,
                email: SITE.email,
              },
              areaServed: ["United States", "Canada", "Europe", "Latin America", "Asia", "Oceania"],
              url: absUrl(DD_PATH),
            },
            {
              "@type": "FAQPage",
              mainEntity: DD_FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "WebPage",
              name: DD_TITLE,
              url: absUrl(DD_PATH),
              speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
                { "@type": "ListItem", position: 2, name: "Custom exhibits", item: absUrl("/custom-exhibits") },
                { "@type": "ListItem", position: 3, name: "Double deck exhibits", item: absUrl(DD_PATH) },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: DoubleDeckPage,
});

const ACCENT = "text-[oklch(0.78_0.13_300)]";

function DoubleDeckPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Custom exhibits"
        title="Double deck &amp; two-story trade show exhibits —"
        accent="rented or built"
        intro="A second level puts private meetings, VIP hospitality and a presentation overlook above the noise of the hall — and makes your booth the thing people navigate by. Traction X rents double decks and builds them to own, and manages the part exhibitors underestimate: stamped engineering, venue technical review and fire-marshal occupancy sign-off."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 px-4 py-1.5 text-sm">
            Available to rent
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm">
            Or built to own
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm">
            Engineering &amp; permits managed
          </span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="double-deck-hero" label="Get a double-deck quote" />
          <Design3DButton source="double-deck-hero" />
          <BookMeetingButton source="double-deck-hero" />
        </div>
        <p className="mt-5 max-w-2xl text-sm text-white/55 leading-relaxed">
          Double decks are quoted to spec — the spread between a modest deck on a 20×20 and an engineered
          hospitality structure on a 30×30 is too wide for a published starting price to mean anything. Tell us
          the show, the space and what happens upstairs and you get a real number, not a range.
        </p>
      </PageHero>

      <section id="tldr" className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-14 grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-4">The short answer</p>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed">{DD_SHORT_ANSWER}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black p-6">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">Plan around this</div>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-sm text-white/55">Start the project by</dt>
                <dd className="font-display text-3xl font-bold">20 weeks out</dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Permit review window</dt>
                <dd className="font-display text-3xl font-bold">60–90 days</dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Practical minimum footprint</dt>
                <dd className="font-display text-3xl font-bold">20×20 island</dd>
              </div>
            </dl>
            <div className="mt-6">
              <QuoteButton source="double-deck-tldr" label="Check my show's feasibility" />
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Planner's brief" title="Double deck specifications at a glance">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left">
            <tbody>
              {DD_SPEC.map((row, i) => (
                <tr key={row.label} className={i % 2 ? "bg-white/[0.03]" : "bg-white/[0.01]"}>
                  <th
                    scope="row"
                    className="align-top px-5 py-4 w-60 text-sm uppercase tracking-[0.14em] text-white/55 font-medium"
                  >
                    {row.label}
                  </th>
                  <td className="px-5 py-4 text-white/80 leading-relaxed">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm text-white/50 max-w-3xl leading-relaxed">
          Every figure above is a planning benchmark. The binding numbers come from your specific hall and the
          show's exhibitor manual, which we read before design begins — the answer often differs hall to hall
          inside the same venue.
        </p>
      </Section>

      {DD_SECTIONS.map((s, idx) => (
        <Section key={s.heading} eyebrow={s.eyebrow} title={s.heading} bg={idx % 2 === 0 ? "muted" : undefined}>
          <div className="max-w-3xl space-y-5">
            {s.body.map((p) => (
              <p key={p.slice(0, 40)} className="text-white/75 leading-relaxed text-[17px]">
                {p}
              </p>
            ))}
          </div>
          {s.bullets && (
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              {s.bullets.map((b) => (
                <div key={b.lead} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <span className={`font-display font-semibold ${ACCENT}`}>{b.lead}</span>
                  <span className="text-white/70 leading-relaxed"> — {b.text}</span>
                </div>
              ))}
            </div>
          )}
        </Section>
      ))}

      <Section eyebrow="Countdown to show open" title="How a double deck gets delivered — week by week">
        <p className="max-w-3xl text-white/70 leading-relaxed">
          The permit is the critical path on a two-story exhibit, not the fabrication. This is why we start a
          double-deck project around 20 weeks out. Inside that window a rental structure with existing
          engineering is sometimes still possible — call rather than email.
        </p>
        <ol className="mt-10 space-y-3">
          {DD_COUNTDOWN.map((s) => (
            <li
              key={s.when}
              className="grid md:grid-cols-[120px_220px_1fr] gap-2 md:gap-6 rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <span className={`font-display font-bold ${ACCENT}`}>{s.when}</span>
              <span className="font-semibold">{s.what}</span>
              <span className="text-white/65 leading-relaxed">{s.detail}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="double-deck-countdown" label="Start my double-deck brief" />
          <BookMeetingButton source="double-deck-countdown" />
        </div>
      </Section>

      <Section eyebrow="What's included either way" title="One agreement, one accountable partner" bg="muted">
        <PromiseGrid />
      </Section>

      <CaseProof context={{}} seed="double-deck" heading="Large-format builds we've delivered" />

      <Section eyebrow="Related" title="Keep planning">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { to: "/booth-size/20x20-booths", t: "20×20 island booths", d: "The smallest footprint a deck can sit on — specs, layouts and pricing." },
            { to: "/custom-exhibits", t: "Custom exhibits", d: "Ground-up fabrication: millwork, welded steel, LED and hospitality builds." },
            { to: "/rent-a-booth", t: "Rental catalogue", d: "700+ custom rental designs, filtered by footprint and show city." },
            { to: "/gallery", t: "Project gallery", d: "Islands, hospitality builds and sponsor activations from our shop." },
            { to: "/pricing", t: "Pricing & tiers", d: "How structure, finish level and AV move an exhibit budget." },
            { to: "/our-promise", t: "The Traction X promise", d: "Pre-build photo approval, fixed scope, I&D included, a producer on the floor." },
          ].map((l) => (
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

      <FAQBlock items={DD_FAQS} />

      <Section id="contact">
        <QuoteForm heading="Request a double-deck quote" />
      </Section>

      <DesignCtaBand source="double-deck" />
      <CTABand />
    </PageLayout>
  );
}
