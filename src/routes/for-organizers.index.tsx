import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, FAQBlock } from "@/components/PageLayout";
import { OrganizerCtaBand } from "@/components/OrganizerCtaBand";
import { BookMeetingButton } from "@/components/GlobalCta";
import { absUrl, robotsMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/for-organizers";
const TITLE = "For Show Organizers, Venues & Associations | Traction X Partner Programs";
const DESC =
  "Partner programs for trade show organizers, convention centres and associations: official exhibitor rental programs, interactive floor plan design and management, on-floor exhibitor service desks and rescue build capacity. No fee to the show.";

const FAQS = [
  {
    q: "Who are these programs for?",
    a: "Show organizers and event producers, convention centres and venue operators, and associations or societies that run an annual exhibition for their members. Exhibitors are served by the rest of the site — this section is for the people who run the floor.",
  },
  {
    q: "What does a partner program cost the show or venue?",
    a: "Nothing. There is no fee to name Traction X as a preferred or official exhibit vendor. The program is funded out of exhibitor orders, and where your organization runs a sponsorship or commission model we support standard revenue share on rental orders placed through the program.",
  },
  {
    q: "Do you replace our general service contractor?",
    a: "No. Your GC — Freeman, GES, Shepard, Nüvista or an in-house team — keeps drayage, material handling, rigging dispatch and utilities. We supply custom booth rentals, custom builds, graphics, AV and exhibitor-side install and dismantle, and we file through the GC's forms and deadlines like any other exhibitor-appointed contractor.",
  },
  {
    q: "Are agreements exclusive?",
    a: "Non-exclusive by default. We can go exclusive where your contract structure requires it, and that gets written into the agreement rather than negotiated show by show.",
  },
  {
    q: "How long does it take to stand a program up?",
    a: "Four to six weeks from a signed agreement to a live exhibitor order page with rendered packages and pricing. For shows inside 60 days we run an accelerated version — a single-page rate sheet plus a direct order line — and build the full program for the next edition.",
  },
  {
    q: "How do we start?",
    a: `Book a 10-minute call or email ${SITE.email} with your show name, dates, venue and approximate exhibitor count. A complete brief gets acknowledged within one business day and a draft program outline follows within two.`,
  },
];

const AUDIENCES = [
  {
    who: "Show organizers & event producers",
    problem:
      "Exhibitor booth problems land on your operations team. A supplier goes quiet in week three, a first-time exhibitor misses the graphics deadline, and it becomes a move-in day escalation.",
    program:
      "A named exhibit partner with published packages priced to your rate card, deadline-aware ordering, and a service desk on the floor so exhibitor escalations stop at us.",
    href: "/for-organizers/official-show-rental-program",
    cta: "Official show rental program",
  },
  {
    who: "Convention centres & venues",
    problem:
      "Small and mid-size exhibitors arrive under-built, over-freighted, or non-compliant with your rigging, ceiling height and fire-retardancy rules — and your in-house team absorbs the fix.",
    program:
      "Pre-approved booth designs that already clear your hall's specific rules before a crate ships, plus published floor plan guides for your building that exhibitors actually read.",
    href: "/for-organizers/venue-exhibit-partner",
    cta: "Venue exhibit partner program",
  },
  {
    who: "Associations & societies",
    problem:
      "Member exhibitors run wildly different budgets, and a bad first exhibiting experience quietly costs you a renewal — not just a booth sale.",
    program:
      "Tiered member packages from a simple in-line stand through a sponsor-level activation, so a first-year exhibitor gets a competent booth and comes back.",
    href: "/for-organizers/association-exhibitor-program",
    cta: "Association exhibitor program",
  },
];

const PILLARS = [
  {
    title: "Official exhibitor rental program",
    body: "Branded booth packages priced to your floor plan and rate card, a co-branded order page, and exhibitor service kit content written to your deadlines.",
    href: "/for-organizers/official-show-rental-program",
  },
  {
    title: "Floor plan design & management",
    body: "Venue CAD converted to an interactive plan, booth and sponsorship inventory structured, exhibitor onboarding run, and the plan kept accurate from first sale through move-in — on whichever platform you use.",
    href: "/custom-trade-show-floor-plans",
  },
  {
    title: "Exhibitor service desk",
    body: "A staffed desk during move-in and show days, a named project manager reporting to your operations team, and one escalation path instead of a switchboard.",
    href: "/for-organizers/exhibitor-service-desk",
  },
  {
    title: "Rescue capacity in reserve",
    body: "We hold rental inventory and fabrication capacity for partner shows and can stand up a replacement booth in as little as 45 days — so a failed supplier doesn't leave a hole on your floor.",
    href: "/rescue-booth-builds",
  },
];

export const Route = createFileRoute("/for-organizers/")({
  head: () => {
    const url = absUrl(PATH);
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
                "@type": "Service",
                "@id": `${url}#service`,
                name: "Trade show partner programs for organizers, venues and associations",
                serviceType: "Official exhibit vendor program",
                provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
                areaServed: "North America",
                description: DESC,
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumbs`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                  { "@type": "ListItem", position: 2, name: "For Organizers", item: url },
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
  component: OrganizersHub,
});

function OrganizersHub() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Partner programs"
        title="For Show Organizers,"
        accent="Venues & Associations"
        intro="Most of this site is written for exhibitors. This section is for the people who run the floor: official exhibitor rental programs, interactive floor plan design and management, on-floor service desks and reserve build capacity — with no fee to the show or venue."
      >
        <nav aria-label="Breadcrumb" className="mt-6 text-sm text-white/50">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">For Organizers</span>
        </nav>
        <div className="mt-8 flex flex-wrap gap-3">
          <BookMeetingButton source="organizers-hub-hero" variant="primary" label="Book a 10-minute call" />
          <Link
            to="/preferred-vendor-program"
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            Apply to the vendor program
          </Link>
        </div>
      </PageHero>

      <Section id="tldr">
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.06] p-6 md:p-8">
          <h2 className="font-display text-sm uppercase tracking-[0.28em] text-[oklch(0.78_0.13_300)]">
            The short version
          </h2>
          <p className="mt-3 text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl">
            Traction X partners with show organizers, convention centres and associations as an official or preferred
            exhibit vendor. We supply the exhibitor-facing booth program (custom rentals and builds, graphics, AV,
            install and dismantle), run interactive floor plan design and management on whichever platform you use,
            and staff an exhibitor service desk during move-in and show days. There is no fee to the show or venue,
            agreements are non-exclusive by default, and we work alongside your general service contractor rather
            than replacing them. A program takes four to six weeks from signature to a live exhibitor order page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookMeetingButton source="organizers-hub-tldr" variant="primary" label="Book a 10-minute call" />
          </div>
        </div>
      </Section>

      <Section eyebrow="Who this is for" title="Three partners, three different problems" bg="muted">
        <div className="grid md:grid-cols-3 gap-6">
          {AUDIENCES.map((a) => (
            <div key={a.who} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col">
              <h3 className="font-display text-xl font-semibold">{a.who}</h3>
              <p className="mt-4 text-sm text-white/60 leading-relaxed">
                <span className="text-white/40 uppercase tracking-widest text-[11px] block mb-2">The problem</span>
                {a.problem}
              </p>
              <p className="mt-5 text-sm text-white/75 leading-relaxed flex-1">
                <span className="text-white/40 uppercase tracking-widest text-[11px] block mb-2">What we run</span>
                {a.program}
              </p>
              <Link
                to={a.href}
                className="mt-6 inline-block text-sm text-[oklch(0.78_0.13_300)] hover:underline"
              >
                {a.cta} →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="What a program includes" title="Four things we bring to your floor">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {PILLARS.map((p) => (
            <Link
              key={p.title}
              to={p.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{p.body}</p>
              <span className="mt-4 inline-block text-sm text-[oklch(0.78_0.13_300)] group-hover:underline">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="How it starts" title="From first call to a live program" bg="muted">
        <ol className="max-w-3xl space-y-5">
          {[
            "A 10-minute call or an emailed brief: show name, dates, venue, approximate exhibitor count and how booth supply is handled today.",
            "We acknowledge a complete brief within one business day and send a draft program outline — package tiers, pricing, service desk scope and revenue share — within two.",
            "Agreement signed. Package designs are rendered against your actual floor plan and hall rules, not stock imagery.",
            "Co-branded order page and exhibitor service kit content go live, typically four to six weeks from signature.",
            "Move-in: our service desk and a named project manager are on the floor, reporting to your operations team.",
          ].map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-display text-[oklch(0.78_0.13_300)] text-lg shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-white/75 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Also useful" title="Related pages for partners">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link to="/preferred-vendor-program" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Preferred vendor program &amp; application
          </Link>
          <Link to="/custom-trade-show-floor-plans" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Custom floor plan design &amp; management
          </Link>
          <Link to="/venue-floor-plans" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Venue floor plan guides
          </Link>
          <Link to="/floor-plan-software-comparison" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Floor plan software comparison
          </Link>
          <Link
            to="/services/$slug"
            params={{ slug: "show-services-and-exhibitor-kits" }}
            className="text-[oklch(0.78_0.13_300)] hover:underline"
          >
            Show services &amp; exhibitor kits
          </Link>
          <Link to="/rescue-booth-builds" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Rescue booth builds
          </Link>
        </div>
      </Section>

      <FAQBlock items={FAQS} title="Partner program FAQs" />

      <OrganizerCtaBand source="organizers-hub" />
    </PageLayout>
  );
}
