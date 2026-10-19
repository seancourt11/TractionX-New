import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton, BookMeetingButton, CtaNote } from "@/components/GlobalCta";
import { CaseProof } from "@/components/CaseProof";
import { SITE } from "@/lib/site";
import { robotsMeta } from "@/lib/seo";

const TITLE = "Rescue Booth Builds — Last-Minute Trade Show Exhibits | Traction X";
const DESC =
  "Supplier fell through or your show moved up? Traction X delivers rescue trade show booth builds in as little as 45 days, with install and dismantle included across the US and Canada.";

const ANSWER =
  "A rescue build is a complete custom exhibit delivered on a compressed timeline — typically 45 days, and in emergencies less — after another supplier failed, a design was rejected, or a show date moved. Traction X takes the space contract and whatever assets exist, re-engineers around what is actually buildable in the time left, and installs it. Rush work carries a premium, but a project manager can waive part of it depending on the show, the size, and the shop calendar.";

const SITUATIONS = [
  {
    t: "Your supplier went quiet",
    b: "Deposits paid, drawings never came, and nobody is answering. We start from your space contract and exhibitor kit rather than waiting for files that may never arrive.",
  },
  {
    t: "The design got rejected",
    b: "Show management or the venue flagged a height, hanging sign, or fire-rating issue. We re-engineer to the actual rules in the exhibitor manual and resubmit.",
  },
  {
    t: "Your show moved up",
    b: "A schedule change, a last-minute upgrade to a larger footprint, or a sponsorship that came through late. We scope to the footprint you now hold.",
  },
  {
    t: "The crates arrived damaged",
    b: "Freight damage, missing hardware, or graphics that no longer match the brand. We rebuild the failed elements and reprint the graphics package.",
  },
  {
    t: "You inherited someone else's booth",
    b: "A booth from a previous team or agency with no drawings and no manual. We inventory it, document it, and make it standable again.",
  },
  {
    t: "You have no exhibit at all",
    b: "The decision to exhibit came late. Custom rental structure plus a fresh graphic package is the fastest credible route to a floor-ready booth.",
  },
];

const TIMELINE = [
  { d: "Day 0", t: "Triage call", b: "A 10-minute call covering footprint, show, venue, deadline and what assets exist. You leave the call knowing whether the date is achievable." },
  { d: "Day 1", t: "Feasibility and range", b: "We confirm what is buildable in the time left and give you a starting range plus any rush premium in writing. No obligation to proceed." },
  { d: "Day 2–4", t: "Concept", b: "A preliminary 3D concept built around proven structure — the elements we can guarantee in the window rather than what looks best in a render." },
  { d: "Day 5–10", t: "Approval and engineering", b: "Design sign-off, production drawings, graphics files and venue submissions all move in parallel instead of in sequence." },
  { d: "Day 10–35", t: "Fabrication", b: "Millwork, structure and graphics in production, with a pre-ship set-up and photographed QA before crating." },
  { d: "Day 35–45", t: "Ship and install", b: "Crates routed to the advance warehouse or direct to show site, install and dismantle labour included, project manager on the floor." },
];

const FAQS = [
  {
    q: "What is the fastest you can deliver a booth?",
    a: "Forty-five days is our standard rescue window for a full custom build. Tighter than that is possible with custom rental structure and a fresh graphic package — we have delivered floor-ready booths in under three weeks — but the design has to bend toward proven components.",
  },
  {
    q: "How much more does a rush build cost?",
    a: "Rush work inside 30 days carries a 30% premium on the booth. A project manager can waive part or all of it depending on the show, the footprint and where the shop calendar sits — ask, because it is frequently negotiable.",
  },
  {
    q: "Can you work with the design my previous supplier produced?",
    a: "Often yes, if the drawings are complete enough to build from and the design is achievable in the time left. If not, we reuse the intent and re-engineer the structure. Either way you own the outcome, not the leftover paperwork.",
  },
  {
    q: "Do you handle the venue paperwork too?",
    a: "Yes. Exhibitor kit deadlines, hanging sign approvals, electrical and rigging orders, and general contractor coordination are all part of project management. Missing a discount deadline is one of the most common — and most expensive — rescue costs.",
  },
  {
    q: "Which cities can you rescue a build in?",
    a: "Across the United States and Canada. Las Vegas, Orlando, Chicago, Toronto, Vancouver and Halifax move fastest because of shipping lanes and labour relationships, but we install nationwide.",
  },
];

export const Route = createFileRoute("/rescue-booth-builds")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...robotsMeta(),
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/rescue-booth-builds` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/rescue-booth-builds` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Rescue trade show booth builds",
            serviceType: "Emergency custom trade show exhibit fabrication",
            description: ANSWER,
            provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone },
            areaServed: [
              { "@type": "Country", name: "United States" },
              { "@type": "Country", name: "Canada" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]),
      },
    ],
  }),
  component: RescueBuilds,
});

function RescueBuilds() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="45-day delivery"
        title="Rescue Booth"
        accent="Builds"
        intro="Supplier fell through, design got rejected, or the show moved up. We take the show date you are stuck with and build to it — install and dismantle included."
      >
        <div className="mt-8 flex flex-col gap-2.5 max-w-md">
          <div className="flex flex-wrap gap-3">
            <QuoteButton source="rescue-hero" label="Get a rescue quote" />
            <BookMeetingButton source="rescue-hero" variant="outline" />
          </div>
          <CtaNote kind="quote" />
          <p className="text-sm text-white/60">
            Urgent?{" "}
            <a href={`tel:${SITE.phone}`} className="text-[oklch(0.85_0.13_300)] hover:underline">
              {SITE.phoneDisplay}
            </a>{" "}
            or{" "}
            <a href={`mailto:${SITE.email}`} className="text-[oklch(0.85_0.13_300)] hover:underline">
              {SITE.email}
            </a>
          </p>
        </div>
      </PageHero>

      <Section>
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/30 bg-[oklch(0.78_0.13_300)]/[0.06] p-6 md:p-8">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[oklch(0.85_0.13_300)] mb-3">
            Short answer
          </div>
          <p className="text-white/85 text-lg leading-relaxed max-w-4xl">{ANSWER}</p>
        </div>
      </Section>

      <Section eyebrow="Who calls us" title="Six situations we take over">
        <div className="grid md:grid-cols-3 gap-6">
          {SITUATIONS.map((s) => (
            <div key={s.t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="muted" eyebrow="Compressed schedule" title="What 45 days actually looks like">
        <div className="space-y-4">
          {TIMELINE.map((t) => (
            <div
              key={t.d}
              className="rounded-2xl border border-white/10 bg-black p-6 grid md:grid-cols-[130px_1fr] gap-4 md:gap-8"
            >
              <div className="text-[11px] uppercase tracking-[0.22em] text-[oklch(0.85_0.13_300)] pt-1">
                {t.d}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{t.t}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed max-w-3xl">{t.b}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/60">
          Full detail on the standard process:{" "}
          <Link to="/how-we-build" className="text-[oklch(0.85_0.13_300)] hover:underline">
            how we build your exhibit
          </Link>
          .
        </p>
      </Section>

      <Section eyebrow="Straight talk" title="What a rush costs — and when it doesn't">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold">The rush premium</h3>
            <p className="mt-3 text-white/70 leading-relaxed">
              Builds inside 30 days carry a 30% premium. It pays for shop resequencing, expedited
              print and freight that cannot wait for a consolidated truck. It is a real cost, not a
              penalty for panicking.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              A project manager can waive part or all of it — most often on larger footprints, on
              shows where we already have crews and freight moving, or when the shop calendar has
              room. Ask before you assume the number is fixed.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold">What we won't do</h3>
            <ul className="mt-3 space-y-3 text-white/70">
              <li className="flex gap-2">
                <span className="text-[oklch(0.78_0.13_300)]">—</span>
                Promise a date the shop calendar can't hold. If it isn't buildable, you hear that on
                the first call, while you still have other options.
              </li>
              <li className="flex gap-2">
                <span className="text-[oklch(0.78_0.13_300)]">—</span>
                Skip the pre-ship set-up. Rescue builds get assembled and photographed before crating
                like every other exhibit — the compressed ones need it most.
              </li>
              <li className="flex gap-2">
                <span className="text-[oklch(0.78_0.13_300)]">—</span>
                Hide show-service costs. Drayage, electrical and rigging are billed by the venue; we
                coordinate and forecast them, but they are never buried in the booth price.
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="rescue-cost" label="Get a rescue quote" />
          <BookMeetingButton source="rescue-cost" variant="outline" />
        </div>
      </Section>

      <CaseProof context={{}} seed="rescue-builds" heading="Builds delivered under pressure" />

      <FAQBlock items={FAQS} title="Rescue build FAQs" />

      <DesignCtaBand source="rescue-builds" />
      <CTABand heading="Tell us your show date — we'll tell you if it's doable" />
    </PageLayout>
  );
}
