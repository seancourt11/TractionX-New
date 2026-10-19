import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, FAQBlock, CTABand } from "@/components/PageLayout";
import { PromiseGrid, PromiseStrip } from "@/components/Promises";
import { DesignCtaBand, QuoteButton, BookMeetingButton } from "@/components/GlobalCta";
import { PROMISES, PROMISE_FAQS } from "@/data/promises";
import { SITE } from "@/lib/site";

const TITLE = "Our Promise — What Traction X Guarantees Exhibitors";
const DESC =
  "Six commitments behind every Traction X booth: pre-build with photo proof, one contract and one producer, fixed scope with written change orders, install and dismantle included, a reply in one business day, and a producer on the show floor.";
const URL = `${SITE.url}/our-promise`;

export const Route = createFileRoute("/our-promise")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PROMISE_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: OurPromise,
});

const STAGES: { n: string; t: string; b: string; promise: string }[] = [
  {
    n: "01",
    t: "Brief & response",
    b: "You send show, footprint, dates and objective. A designer confirms fit and flags what's missing.",
    promise: "We answer, fast",
  },
  {
    n: "02",
    t: "Design & investment",
    b: "Preliminary direction and investment in two business days; photoreal 3D, layout and costed scope as it develops.",
    promise: "We answer, fast",
  },
  {
    n: "03",
    t: "Scope & agreement",
    b: "A written statement of work with fixed pricing, deliverables and milestone dates — signed after you've seen the design.",
    promise: "Fixed scope, no surprise line items",
  },
  {
    n: "04",
    t: "Production & show coordination",
    b: "Fabrication, graphics, freight booking, and coordination with show management and the general contractor.",
    promise: "One contract, one invoice, one producer",
  },
  {
    n: "05",
    t: "Pre-build & photo proof",
    b: "The booth stands in our shop. You approve photographs of the real build before anything ships.",
    promise: "Pre-build and photo proof",
  },
  {
    n: "06",
    t: "Install, show, dismantle",
    b: "Your producer is on the floor for install and show open, then handles dismantle and return.",
    promise: "On the floor, not on the phone",
  },
];

function OurPromise() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="The Traction X Promise"
        title="Six Commitments"
        accent="Behind Every Booth."
        promiseBar={false}
        intro="Most exhibit companies sell you a render and hand you an invoice you didn't expect. These are the things we commit to in writing, on every project, whether you rent or build."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="our-promise-hero" />
          <BookMeetingButton source="our-promise-hero" variant="outline" />
        </div>
        <PromiseStrip className="mt-4" withLink={false} />
      </PageHero>

      <Section eyebrow="The promise" title="What you get, every time">
        <PromiseGrid />
      </Section>

      <Section eyebrow="How it's kept" title="Where each promise shows up in your project" bg="muted">
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((s) => (
            <li key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="font-display text-3xl font-bold text-[oklch(0.78_0.13_300)]">{s.n}</div>
              <div className="mt-2 font-semibold">{s.t}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.b}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/40">Promise: {s.promise}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-white/60">
          More detail on fabrication and QA in{" "}
          <Link to="/how-we-build" className="text-[oklch(0.78_0.13_300)] hover:underline">
            how we build
          </Link>
          , and on deadline recovery in{" "}
          <Link to="/rescue-booth-builds" className="text-[oklch(0.78_0.13_300)] hover:underline">
            rescue booth builds
          </Link>
          .
        </p>
      </Section>

      <Section eyebrow="In short" title="The promise in one line each">
        <ul className="grid gap-3 md:grid-cols-2">
          {PROMISES.map((p) => (
            <li key={p.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/80">
              <span className="mr-2 text-[oklch(0.78_0.13_300)]" aria-hidden>
                ✓
              </span>
              <span className="font-semibold">{p.title}:</span> {p.short}
            </li>
          ))}
        </ul>
      </Section>

      <FAQBlock items={PROMISE_FAQS} title="Questions about the promise" />

      <DesignCtaBand source="our-promise" />
      <CTABand />
    </PageLayout>
  );
}
