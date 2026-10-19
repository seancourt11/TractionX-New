import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SITE } from "@/lib/site";
import {
  EXHIBIT_COMPANIES,
  COMPANY_COMPARE_ROWS,
  COMPANY_FAQS,
  VENDOR_QUESTIONS,
} from "@/data/exhibit-companies";

const PATH = "/compare/trade-show-exhibit-rental-companies";
const TITLE = "Trade Show Exhibit Rental Companies Compared (2026) | Traction X";
const DESC =
  "An honest comparison of trade show booth rental companies — Freeman, GES, Czarnowski, Skyline, Nimlok/Orbus and regional exhibit houses. Pros, cons, best fit and what to ask before you sign.";

export const Route = createFileRoute("/compare/trade-show-exhibit-rental-companies")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}${PATH}` },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: COMPANY_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Trade show exhibit rental companies",
          itemListElement: EXHIBIT_COMPANIES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            description: c.summary,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
            { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE.url}/compare` },
            {
              "@type": "ListItem",
              position: 3,
              name: "Exhibit rental companies compared",
              item: `${SITE.url}${PATH}`,
            },
          ],
        }),
      },
    ],
  }),
  component: CompaniesPage,
});

const ACCENT = "text-[oklch(0.78_0.13_300)]";

function CompaniesPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Buyer's guide · 2026"
        title="Trade Show Exhibit Rental"
        accent="Companies Compared"
        intro="There is no single best exhibit company — there's the right one for your show, your footprint and how much of the work you want handled. Here's what the major players are genuinely good at, where exhibitors get frustrated, and how to compare quotes fairly."
      />

      {/* TL;DR */}
      <Section id="tldr" bg="muted">
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/30 bg-[oklch(0.78_0.13_300)]/[0.06] p-7 md:p-9">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">The short answer</p>
          <p className="mt-4 max-w-4xl text-base md:text-lg leading-relaxed text-white/85">
            Use a <strong className="text-white">general service contractor</strong> (Freeman, GES) when you want
            the booth, the freight, the rigging and the labour on one show invoice, especially at very large shows.
            Use a <strong className="text-white">national exhibit house</strong> (Czarnowski and peers) when you run
            an enterprise programme across many shows a year and want owned assets managed for you. Use a{" "}
            <strong className="text-white">specialist custom-rental partner</strong> like Traction X when the booth
            has to look purpose-built for your brand, install and dismantle should already be in the price, and the
            budget needs to be respected to the dollar.
          </p>
        </div>
      </Section>

      {/* Comparison table */}
      <Section
        eyebrow="At a glance"
        title="Four ways to buy an exhibit"
        intro="Comparing service models is more useful than comparing logos — most companies fall into one of these four patterns."
      >
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="bg-white/[0.04] text-left text-[11px] uppercase tracking-[0.18em] text-white/60">
                <th className="px-5 py-4 font-medium">Factor</th>
                <th className="px-5 py-4 font-medium">General service contractor</th>
                <th className="px-5 py-4 font-medium">National exhibit house</th>
                <th className="px-5 py-4 font-medium">Modular / portable systems</th>
                <th className={`px-5 py-4 font-medium ${ACCENT}`}>Traction X</th>
              </tr>
            </thead>
            <tbody>
              {COMPANY_COMPARE_ROWS.map((r) => (
                <tr key={r.factor} className="border-t border-white/10 align-top">
                  <th scope="row" className="px-5 py-4 text-left font-semibold text-white">
                    {r.factor}
                  </th>
                  <td className="px-5 py-4 text-white/70">{r.gsc}</td>
                  <td className="px-5 py-4 text-white/70">{r.house}</td>
                  <td className="px-5 py-4 text-white/70">{r.system}</td>
                  <td className="bg-[oklch(0.78_0.13_300)]/[0.06] px-5 py-4 text-white/85">{r.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-white/50">
          Generalised service-model comparison. Individual offices, franchises and divisions vary — vet the team
          servicing your specific show.
        </p>
      </Section>

      {/* Profiles */}
      <Section
        eyebrow="Company by company"
        title="Pros and cons of the major exhibit companies"
        intro="Fair assessments, written for exhibitors who have to defend the decision internally."
        bg="muted"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {EXHIBIT_COMPANIES.map((c) => (
            <article
              key={c.id}
              className={`rounded-2xl border p-7 ${
                c.us
                  ? "border-[oklch(0.78_0.13_300)]/45 bg-[oklch(0.78_0.13_300)]/[0.07]"
                  : "border-white/10 bg-black/40"
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">{c.category}</p>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">{c.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{c.summary}</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.82_0.14_150)]">
                    What they do well
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-white/75">
                    {c.pros.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span aria-hidden className="text-[oklch(0.82_0.14_150)]">
                          +
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Trade-offs</p>
                  <ul className="mt-3 space-y-2 text-sm text-white/60">
                    {c.cons.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span aria-hidden className="text-white/35">
                          −
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-6 border-t border-white/10 pt-4 text-sm">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Best for · </span>
                <span className="text-white/80">{c.bestFor}</span>
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Decision framework */}
      <Section
        eyebrow="How to choose"
        title="Five questions that settle it"
        intro="Work through these in order. By the fourth one, the shortlist is usually down to a single model."
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {[
            {
              h: "How big is the footprint?",
              b: "Under 10×20, a portable or modular system is often the honest answer. 10×20 through 20×20 is the custom-rental sweet spot. Beyond 30×30 with rigging and general-session tie-ins, a general service contractor's floor access starts to matter.",
            },
            {
              h: "How many shows a year?",
              b: "One to four shows a year almost always favours renting. Five or more at a consistent footprint starts to justify owning an asset — and an exhibit house that stores and refurbishes it.",
            },
            {
              h: "How custom does it need to look?",
              b: "If your brand team will reject a recognisable system kit, the decision is already made: you need a shop that fabricates, not a catalogue that configures.",
            },
            {
              h: "Do you want show services bundled?",
              b: "If a single invoice covering drayage, rigging and electrical is worth more to you than design flexibility, the official contractor wins. If not, you're paying a premium for convenience you won't use.",
            },
            {
              h: "Who owns the design?",
              b: "Ask before you sign. If the drawings stay with the vendor, every future show is a negotiation with the same company at their price.",
            },
          ].map((s, i) => (
            <li key={s.h} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className={`font-display text-3xl font-bold ${ACCENT}`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-tight">{s.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Procurement checklist */}
      <Section
        eyebrow="Due diligence"
        title="Ten questions to ask any exhibit partner"
        intro="Including us. The answers tell you more about a vendor than any capabilities deck."
        bg="muted"
      >
        <div className="grid gap-3 md:grid-cols-2">
          {VENDOR_QUESTIONS.map((q, i) => (
            <div key={q.q} className="rounded-xl border border-white/10 bg-black/40 p-5">
              <p className="text-sm font-semibold text-white">
                <span className={`mr-2 ${ACCENT}`}>{i + 1}.</span>
                {q.q}
              </p>
              <p className="mt-2 text-sm text-white/60">{q.why}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Where we fit */}
      <Section eyebrow="Where we fit" title="What Traction X does differently — and when we're not the answer">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-4 text-white/75 leading-relaxed">
            <p>
              We're a custom exhibit partner, not a general service contractor and not a systems dealer. Every rental
              we deliver is fabricated to your drawings — your geometry, your finishes, your millwork — then recovered
              and remade for the next client. That means you get a booth that reads as purpose-built for your brand
              without a capital purchase.
            </p>
            <p>
              Install and dismantle labour is included in the exhibit price rather than appearing later as a surprise.
              Pricing is tiered and à la carte, so we design to your precise budget by trading scope deliberately
              instead of quoting one number and hoping. And before you commit anything, we build a complimentary
              photoreal 3D concept of your space.
            </p>
            <p className="text-white/60">
              Where we're not the answer: if you need one invoice covering the whole show floor, or you're running
              general sessions and show-wide production, the official contractor is genuinely simpler. If you need an
              inexpensive pop-up banner shipped this week, a portable dealer will beat us on both price and speed.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/build-your-booth-plan"
                className="rounded-xl bg-[oklch(0.78_0.13_300)] px-6 py-3 font-semibold text-black"
              >
                Build my booth plan →
              </Link>
              <Link
                to="/booth-cost-calculator"
                className="rounded-xl border border-white/15 px-6 py-3 hover:border-[oklch(0.78_0.13_300)]/60"
              >
                Live cost estimator →
              </Link>
              <Link
                to="/rent-a-booth"
                className="rounded-xl border border-white/15 px-6 py-3 hover:border-[oklch(0.78_0.13_300)]/60"
              >
                Browse rental booths →
              </Link>
            </div>
          </div>
          <ul className="space-y-3 rounded-2xl border border-[oklch(0.78_0.13_300)]/30 bg-[oklch(0.78_0.13_300)]/[0.06] p-7 text-sm text-white/85">
            {[
              "100% custom rentals — never a kit with your logo on it",
              "Install and dismantle labour included in the exhibit price",
              "Complimentary photoreal 3D design, yours to keep",
              "Tiered and à la carte pricing — designed to your exact budget",
              "Direct access to the designer and the shop floor",
              "In-house custom fabrication and millwork",
              "EAC paperwork and show-service coordination handled",
            ].map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden className={ACCENT}>
                  ✓
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Exhibit company questions, answered" bg="muted">
        <FaqAccordion faqs={COMPANY_FAQS} />
        <p className="mt-8 text-sm text-white/60">
          Still deciding?{" "}
          <Link to="/compare" className={`${ACCENT} font-semibold`}>
            See the other exhibit comparisons
          </Link>{" "}
          — rent vs. buy, custom vs. modular, portable vs. custom rental and full-service vs. self-managed.
        </p>
      </Section>

      <DesignCtaBand source="compare-companies" />
      <CTABand />
    </PageLayout>
  );
}
