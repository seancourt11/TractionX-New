import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, Design3DButton, BookMeetingButton, QuoteButton } from "@/components/GlobalCta";
import { absUrl, robotsMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/preferred-vendor-program";
const TITLE = "Preferred Exhibit Vendor Program for Shows & Venues | Traction X";
const DESC =
  "Traction X is the preferred trade show exhibit vendor for show organizers, convention venues and associations — official rental programs, exhibitor pricing tiers, on-site service desks and revenue share. Apply in one call.";

const FAQS = [
  {
    q: "What does a Traction X preferred vendor agreement actually include?",
    a: "A branded exhibitor rental program (booth packages priced for your floor plan and rate card), a co-branded landing page and order form, exhibitor service kit content, an on-site Traction X service desk during move-in and show days, and a named project manager who reports to your operations team — not just to exhibitors. Agreements are non-exclusive by default; we can go exclusive where your contract structure requires it.",
  },
  {
    q: "Does it cost the show or venue anything?",
    a: "No. There is no fee to name Traction X as a preferred or official exhibit vendor. We fund the program out of exhibitor orders. Where your organization runs a sponsorship or commission model, we support standard revenue share on rental orders placed through your program — the terms get written into the agreement, not negotiated show by show.",
  },
  {
    q: "Do you replace our general service contractor?",
    a: "No. We work alongside your GC — Freeman, GES, Shepard, Nüvista, or an in-house team. They keep drayage, material handling, rigging dispatch and utilities. We supply custom booth rentals, custom builds, graphics, AV and exhibitor-side install and dismantle, and we file through the GC's forms and deadlines like any other exhibitor-appointed contractor.",
  },
  {
    q: "How fast can a program be live for an upcoming show?",
    a: "Four to six weeks from a signed agreement to a live exhibitor order page with rendered packages and pricing. For shows inside 60 days we run an accelerated version: a single-page rate sheet plus a direct order line, and we build out the full program for the next edition.",
  },
  {
    q: "What sizes and budgets does the exhibitor program cover?",
    a: "Everything from a 10×10 in-line rental (from $16,250) through 10×20 (from $22,750), 20×20 (from $39,000) and 20×30 (from $65,000) up to six-figure custom islands, double decks and sponsor activations. Install and dismantle labour is included in every price. Venue-billed items like drayage, electrical and rigging are ordered through the GC and billed separately.",
  },
  {
    q: "Which venues and cities can you service?",
    a: "North America end to end, plus in-region fabrication partners across Europe, Latin America, Asia and Oceania. We work major convention properties year-round — LVCC, Mandalay Bay, McCormick Place, Javits, OCCC, Moscone, Vancouver Convention Centre, Metro Toronto Convention Centre, Halifax Convention Centre and more.",
  },
  {
    q: "What happens if an exhibitor's original supplier falls through?",
    a: "That's the case preferred vendor programs exist for. We hold rental inventory and fabrication capacity in reserve for partner shows and can stand up a rescue booth inside two to three weeks. Your operations team gets one number to call instead of an angry exhibitor with no stand.",
  },
  {
    q: "How do we start the conversation?",
    a: `Book a 10-minute call, or email ${SITE.email} with your show name, dates, venue and approximate exhibitor count. We acknowledge a complete brief within one business day, then send a draft program outline — package tiers, pricing, service desk scope and revenue share — within two business days.`, 
  },
];

const AUDIENCES = [
  {
    who: "Show organizers",
    pain: "Exhibitors call you when their booth supplier goes quiet. Missed deadlines become your problem on move-in day.",
    fix: "A named exhibit partner with published packages, deadline-aware ordering, and a service desk on the floor so exhibitor escalations never reach your ops team.",
  },
  {
    who: "Convention centres & venues",
    pain: "Small and mid-size exhibitors arrive under-built, over-freighted, or non-compliant with your rigging and fire rules.",
    fix: "Pre-approved booth designs that already clear your hall's ceiling heights, hanging-point rules and fire-retardancy requirements — before a single crate ships.",
  },
  {
    who: "Associations & societies",
    pain: "Member exhibitors have wildly different budgets, and a bad first exhibiting experience means they don't renew.",
    fix: "A tiered member rate card from entry-level in-lines to sponsor islands, with member-only pricing that makes exhibiting an easy renewal decision.",
  },
  {
    who: "Corporate event teams & agencies",
    pain: "One brand, twelve shows a year, twelve different local suppliers and twelve different quality bars.",
    fix: "One partner, one reusable asset kit, warehouse storage between shows, and consistent build quality on every floor in the program.",
  },
];

const PILLARS = [
  {
    n: "01",
    t: "Official rental program",
    d: "Booth packages sized and priced against your actual floor plan — in-lines, corners, peninsulas and islands. Rendered, spec'd and ready for your exhibitor kit.",
  },
  {
    n: "02",
    t: "Co-branded order page",
    d: "A landing page and order form carrying your show or venue branding, with deadline pricing tiers and early-bird windows that pull orders forward.",
  },
  {
    n: "03",
    t: "Exhibitor service desk",
    d: "Staffed Traction X presence during move-in and show days for graphics fixes, furniture swaps, last-minute rentals and dismantle coordination.",
  },
  {
    n: "04",
    t: "Custom fabrication capacity",
    d: "In-house CNC, metal, paint, carpentry, large-format print and AV integration for your sponsors' hero activations — not just modular kit.",
  },
  {
    n: "05",
    t: "Compliance handled",
    d: "Engineered hanging-sign drawings, fire-retardancy certs, load ratings and GC paperwork filed on your deadlines, not after them.",
  },
  {
    n: "06",
    t: "Reporting & revenue share",
    d: "Order volume, package mix and exhibitor satisfaction reported back to you after each edition, with revenue share on program orders where applicable.",
  },
];

const STEPS = [
  { n: "1", t: "Discovery call", d: "10 minutes on your show, venue, exhibitor mix and where the friction sits today." },
  { n: "2", t: "Program draft", d: "Within two business days: package tiers, exhibitor pricing, service desk scope and commercial terms." },
  { n: "3", t: "Agreement", d: "Non-exclusive or exclusive, one edition or multi-year. No cost to the show or venue." },
  { n: "4", t: "Launch", d: "Co-branded order page, exhibitor kit content, and an email sequence timed to your deadlines." },
  { n: "5", t: "Show delivery", d: "Freight, install, service desk, dismantle — with a named PM reporting to your operations lead." },
  { n: "6", t: "Debrief", d: "Post-show reporting, storage of reusable assets, and next-edition pricing locked early." },
];

const PROOF = [
  { k: "30+", v: "recurring North American shows serviced each year" },
  { k: "6", v: "continents covered through in-region fabrication partners" },
  { k: "24h", v: "typical exhibitor quote turnaround" },
  { k: "2–3 wk", v: "rescue-build turnaround when a supplier fails" },
];

export const Route = createFileRoute("/preferred-vendor-program")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...robotsMeta(),
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: absUrl(PATH) },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl(PATH) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Preferred Exhibit Vendor Program",
              serviceType: "Official trade show exhibit rental and fabrication partner program",
              provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
              areaServed: ["United States", "Canada", "Europe", "Latin America", "Asia", "Oceania"],
              audience: {
                "@type": "Audience",
                audienceType: "Trade show organizers, convention venues, associations and corporate event teams",
              },
              url: absUrl(PATH),
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
                { "@type": "ListItem", position: 2, name: "Preferred Vendor Program", item: absUrl(PATH) },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: PreferredVendorProgram,
});

function PreferredVendorProgram() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="For shows, venues & associations"
        title="Become a Traction X"
        accent="Preferred Vendor Show"
        intro="Give your exhibitors one accountable exhibit partner — official rental packages priced for your floor plan, a service desk on your show floor, and custom fabrication for your sponsors. No cost to the show or venue."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <BookMeetingButton source="preferred-vendor-hero" />
          <QuoteButton source="preferred-vendor-hero" label="Request a program outline" />
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
          {PROOF.map((p) => (
            <div key={p.k} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="font-display text-2xl font-bold text-[oklch(0.78_0.13_300)]">{p.k}</div>
              <div className="mt-1 text-sm text-white/65 leading-snug">{p.v}</div>
            </div>
          ))}
        </div>
      </PageHero>

      <Section id="tldr" eyebrow="In short" title="What the program is">
        <p className="max-w-3xl text-white/75 text-lg leading-relaxed">
          Traction X partners with show organizers, convention venues, associations and corporate event teams as their
          named preferred — or official — exhibit vendor. We publish a branded rental program for your exhibitors,
          build custom stands and sponsor activations, staff a service desk during move-in and show days, and file all
          venue and general-contractor paperwork on deadline. There is no fee to the show or venue; the program is
          funded by exhibitor orders and supports revenue share where your commercial model calls for it. This is the
          general program — individual event pages, like{" "}
          <Link to="/web-summit-vancouver-booth-rentals" className="text-[oklch(0.78_0.13_300)] underline">
            Web Summit Vancouver
          </Link>{" "}
          and{" "}
          <Link to="/defsec-atlantic-booth-rentals" className="text-[oklch(0.78_0.13_300)] underline">
            DEFSEC Atlantic
          </Link>
          , are live examples of it running.
        </p>
      </Section>

      <Section eyebrow="Who it's for" title="Four kinds of partner, one problem" bg="muted">
        <div className="grid md:grid-cols-2 gap-6">
          {AUDIENCES.map((a) => (
            <div key={a.who} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-xl font-semibold">{a.who}</h3>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">
                <span className="text-white/40 uppercase tracking-widest text-[10px] block mb-1">The friction</span>
                {a.pain}
              </p>
              <p className="mt-4 text-sm text-white/75 leading-relaxed">
                <span className="text-[oklch(0.78_0.13_300)] uppercase tracking-widest text-[10px] block mb-1">
                  What we put in place
                </span>
                {a.fix}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Inclusions" title="What a partner show gets">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div key={p.n} className="rounded-2xl border border-white/10 p-6 hover:border-[oklch(0.78_0.13_300)] transition">
              <div className="font-display text-sm text-[oklch(0.78_0.13_300)]">{p.n}</div>
              <h3 className="mt-2 font-display text-lg font-semibold">{p.t}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Exhibitor pricing" title="Published tiers your exhibitors can plan against" bg="muted"
        intro="Starting rates for partner-show exhibitors. Install and dismantle labour is included in every price. Drayage, electrical, rigging and utilities are ordered through the show's general contractor and billed separately by the venue.">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-y border-white/10">
            <thead className="text-white/50 uppercase tracking-widest text-[11px]">
              <tr>
                <th className="py-4 pr-6">Footprint</th>
                <th className="py-4 pr-6">Custom rental from</th>
                <th className="py-4">Typical fit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {[
                ["10×10", "$16,250", "First-time and member exhibitors"],
                ["10×20", "$22,750", "Established exhibitors with demo needs"],
                ["20×20", "$39,000", "Island presence, meeting space"],
                ["20×30", "$65,000", "Anchor exhibitors and mid-tier sponsors"],
                ["30×30+ / custom", "$130,000+", "Title sponsors and hero activations"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="py-4 pr-6 font-display font-semibold">{r[0]}</td>
                  <td className="py-4 pr-6 text-[oklch(0.78_0.13_300)]">{r[1]}</td>
                  <td className="py-4 text-white/65">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-white/50 max-w-3xl">
          These are starting ranges only. Final pricing depends on structural depth, level of customization, and AV and
          lighting integration — a Traction X designer confirms exact numbers within one business day. Full detail on
          the{" "}
          <Link to="/trade-show-booth-rental-pricing" className="text-[oklch(0.78_0.13_300)] underline">
            booth rental pricing hub
          </Link>{" "}
          and the{" "}
          <Link to="/booth-cost-calculator" className="text-[oklch(0.78_0.13_300)] underline">
            cost calculator
          </Link>
          .
        </p>
      </Section>

      <Section eyebrow="How it works" title="From first call to post-show debrief">
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="h-9 w-9 rounded-full bg-[oklch(0.78_0.13_300)]/15 text-[oklch(0.78_0.13_300)] font-display font-bold flex items-center justify-center">
                {s.n}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <DesignCtaBand source="preferred-vendor" />

      <Section eyebrow="Where we work" title="Venues and shows already in the rotation" bg="muted">
        <p className="max-w-3xl text-white/70 leading-relaxed">
          Our project managers work major convention properties year-round, which is why we can price a program
          accurately and put a supervisor on your floor who has already met the venue's stewards. Browse the{" "}
          <Link to="/venues" className="text-[oklch(0.78_0.13_300)] underline">
            venue guides
          </Link>{" "}
          and{" "}
          <Link to="/shows" className="text-[oklch(0.78_0.13_300)] underline">
            show guides
          </Link>{" "}
          for the union jurisdictions, drayage and rigging rules we manage on each floor — or the{" "}
          <Link to="/global" className="text-[oklch(0.78_0.13_300)] underline">
            global coverage map
          </Link>{" "}
          for in-region fabrication outside North America.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Design3DButton source="preferred-vendor-venues" />
          <BookMeetingButton source="preferred-vendor-venues" />
        </div>
      </Section>

      <FAQBlock items={FAQS} title="Preferred vendor program FAQs" />

      <CTABand heading="Talk to us about naming Traction X your preferred exhibit vendor" />
    </PageLayout>
  );
}
