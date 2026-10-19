import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, FAQBlock, CTABand } from "@/components/PageLayout";
import { SITE } from "@/lib/site";
import { absUrl, robotsMeta } from "@/lib/seo";

const PATH = "/suppliers";
const TITLE = "Suppliers & Subcontractors — Work With Traction X";
const DESC =
  "Traction X works with fabrication shops, install and dismantle crews, graphics printers, AV suppliers and freight partners across North America. See what we source, our standards, and how to get on our vendor list.";

const CATEGORIES = [
  {
    title: "Fabrication & millwork shops",
    body: "Overflow custom booth fabrication — millwork, welded aluminium and steel frames, CNC, laminate and paint finishing, crating. Most valuable to us near major show markets where trucking a build across a continent makes no sense.",
    need: "Shop drawings read, tolerances held, and crates that survive a fourth show.",
  },
  {
    title: "Install & dismantle crews",
    body: "Supervised I&D labour at convention centres, including union and non-union markets. We schedule to the general service contractor's targets and expect crews on the floor when the dock window opens, not an hour after.",
    need: "Certificates of insurance on file, EAC paperwork filed on time, foreman reachable by phone.",
  },
  {
    title: "Large-format graphics & print",
    body: "Direct-print rigid substrates, tension fabric (SEG) with silicone edge sewn to spec, backlit film, floor vinyl and dye-sublimation textiles. Colour consistency across reprints matters more to us than a slightly lower unit price.",
    need: "Fire-retardancy certificates supplied with every order, proofs before production.",
  },
  {
    title: "AV & technology",
    body: "Display rentals, LED wall supply and technical set-up, touchscreens, media players, sound, lighting and show-day tech support in specific cities.",
    need: "Same-day on-floor swap capability during show hours.",
  },
  {
    title: "Freight & logistics",
    body: "Trade show freight specialists, van lines, cross-border customs brokerage and warehouse partners near major convention markets. Advance warehouse and direct-to-show delivery experience is essential.",
    need: "Guaranteed delivery windows, live tracking, and a human answering during move-in.",
  },
  {
    title: "Specialty trades",
    body: "Rigging engineering, structural stamping, custom lighting, furniture rental, live foliage, flooring, hospitality build-out and specialty finishes for high-end brand activations.",
    need: "Stamped drawings where the venue requires them.",
  },
];

const STANDARDS = [
  {
    title: "Insurance and documentation",
    body: "Current commercial general liability and workers' compensation coverage, with certificates naming the required parties. Venues and general service contractors gate floor access on this, and we cannot fix missing paperwork at the dock.",
  },
  {
    title: "Deadline reality, not deadline optimism",
    body: "We plan builds backwards from move-in. A supplier who tells us early that a date is tight is worth far more than one who agrees to everything and calls the week of the show. Nothing about that conversation is held against you.",
  },
  {
    title: "Compliance with venue rules",
    body: "Fire-retardancy certificates for fabrics and substrates, rigging within the hall's published points and heights, and materials that pass inspection in the specific building — not in general.",
  },
  {
    title: "One named contact",
    body: "A person, with a phone number, who is accountable for our jobs. Shared inboxes do not work during a 6am move-in.",
  },
  {
    title: "Sustainable material options",
    body: "Where you can offer reusable, recyclable or lower-waste alternatives, we want them on the quote — a growing share of our clients specify them.",
  },
  {
    title: "Confidentiality",
    body: "Client brands, drawings and pricing stay confidential. Many of our builds are unannounced product launches.",
  },
];

const STEPS = [
  {
    title: "Send your capability summary",
    body: "Email us your company name, location, trade category, capacity, the venues or markets you cover, and three to five examples of comparable work.",
  },
  {
    title: "Documentation review",
    body: "We review insurance certificates, licences and any union or EAC status relevant to the markets you work in.",
  },
  {
    title: "A first job, deliberately small",
    body: "New suppliers usually start with a contained scope — one crate, one graphic package, one install — where a problem is recoverable and we can see how you communicate under a real deadline.",
  },
  {
    title: "Rate card and onboarding",
    body: "If the first job goes well, we set standing rates, payment terms and a direct line into our project management team so you're quoted on future work automatically.",
  },
  {
    title: "Ongoing work",
    body: "Suppliers who deliver consistently get first call in their market and visibility of our show calendar ahead of the season, so you can plan capacity rather than react.",
  },
];

const FAQS = [
  {
    q: "What regions do you source suppliers in?",
    a: "Across North America, with the heaviest demand in Las Vegas, Orlando, Chicago, New York, Toronto, Vancouver and Halifax. We also work with in-region fabrication partners internationally where shipping a build overseas doesn't make sense for the client.",
  },
  {
    q: "Do you need suppliers year-round or only in peak season?",
    a: "Year-round, but demand concentrates around the spring and fall show seasons. Suppliers already on our list get visibility of the calendar ahead of those peaks so capacity can be planned rather than scrambled.",
  },
  {
    q: "What are your payment terms?",
    a: "Standard terms are set during onboarding and confirmed on each purchase order. We pay against a PO and a completed scope; we do not hold supplier payment hostage to a client's payment cycle.",
  },
  {
    q: "Do I need to be a union contractor?",
    a: "It depends on the market. Several major convention cities require union labour for install and dismantle, and in those markets we need suppliers with the appropriate status. In non-union markets it isn't a requirement.",
  },
  {
    q: "Can I supply just one city or one trade?",
    a: "Yes — specialists are often more useful than generalists. A crew that knows one convention centre's docks, freight routes and inspectors is worth more to us there than a national vendor who has never worked the building.",
  },
  {
    q: "We're a manufacturer, not a service supplier. Are you interested?",
    a: "Yes. We source extrusion systems, hardware, lighting, flooring, substrates, textiles and furniture. Send product catalogues and dealer pricing structure along with your capability summary.",
  },
  {
    q: "How quickly will I hear back?",
    a: "We acknowledge complete submissions within a few business days. If there's no immediate need in your category or market, we keep the file and come back when there is — that is a genuine outcome, not a polite decline.",
  },
];

function schema() {
  const url = absUrl(PATH);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: TITLE,
        description: DESC,
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Suppliers", item: url },
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
    ],
  };
}

export const Route = createFileRoute("/suppliers")({
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
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema()) }],
    };
  },
  component: Suppliers,
});

const MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent("Supplier submission — ")}`;

function Suppliers() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Suppliers & subcontractors"
        title="Work With"
        accent="Traction X"
        intro="We build custom exhibits across North America, and no exhibit house does all of it alone. If you fabricate, print, install, ship or supply for the trade show industry, we want to know what you do and where you do it."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={MAILTO} className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90">
            Submit your company
          </a>
          <a
            href={`tel:${SITE.phone.replace(/[^0-9+]/g, "")}`}
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            Call {SITE.phone}
          </a>
        </div>
      </PageHero>

      <Section id="tldr" eyebrow="The short version" title="What we source and how to get on the list">
        <p className="max-w-3xl text-white/75 text-lg leading-relaxed">
          Traction X sources fabrication and millwork, install and dismantle crews, large-format graphics, AV, freight
          and specialty trades across North America — most heavily in Las Vegas, Orlando, Chicago, New York, Toronto,
          Vancouver and Halifax. To be considered, email a capability summary with your trade, coverage area, capacity
          and examples of comparable work to{" "}
          <a href={`mailto:${SITE.email}`} className="text-white hover:underline">{SITE.email}</a>. We review
          insurance and licensing, start new suppliers on a deliberately small first job, then set standing rates and
          onboard you into our project management workflow. Complete submissions are acknowledged within a few
          business days.
        </p>
      </Section>

      <Section
        eyebrow="Categories"
        title="What we source"
        intro="Each category below is live work, not a wish list. If your trade sits next to one of these rather than inside it, send it anyway — specialty scopes come up constantly on high-end activations."
        bg="muted"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col">
              <h3 className="font-display text-xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed text-sm flex-1">{c.body}</p>
              <p className="mt-4 pt-4 border-t border-white/10 text-white/55 text-xs leading-relaxed">
                <span className="text-[oklch(0.78_0.13_300)] uppercase tracking-[0.2em] text-[10px] block mb-1.5">
                  What matters most
                </span>
                {c.need}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Our standards"
        title="What we expect from a supplier"
        intro="Exhibits are unforgiving work: a booth either goes up correctly on a fixed date in a fixed building, or it doesn't. These are the things that decide whether a supplier relationship lasts past the first job."
      >
        <div className="grid md:grid-cols-2 gap-6">
          {STANDARDS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Process" title="How supplier onboarding works" bg="muted">
        <ol className="grid md:grid-cols-2 gap-6">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className="text-[oklch(0.78_0.13_300)] font-display text-sm tracking-[0.2em]">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed text-sm">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Submit" title="Get on our vendor list">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 max-w-3xl">
          <p className="text-white/75 leading-relaxed">
            Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-white hover:underline">{SITE.email}</a> with
            &ldquo;Supplier submission&rdquo; and your trade in the subject line. Include:
          </p>
          <ul className="mt-5 space-y-2.5 text-white/70 text-sm leading-relaxed">
            {[
              "Company name, location and years in business",
              "Trade category and the specific services you self-perform versus subcontract",
              "Cities, venues or regions you cover",
              "Typical capacity and lead times, plus your busiest and quietest months",
              "Three to five examples of comparable work, with photos where relevant",
              "Insurance certificates, licences, and union or EAC status where applicable",
              "Rate structure or a sample quote for a representative scope",
              "One named contact with a direct phone number",
            ].map((li) => (
              <li key={li} className="flex gap-3">
                <span className="text-[oklch(0.78_0.13_300)] mt-0.5">—</span>
                <span>{li}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={MAILTO} className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90">
              Email your submission
            </a>
            <Link
              to="/how-we-build"
              className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
            >
              See how we build
            </Link>
          </div>
        </div>
      </Section>

      <FAQBlock items={FAQS} title="Supplier questions" />

      <Section eyebrow="Related" title="Other ways to work with us">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { to: "/careers" as const, label: "Careers", note: "Roles we hire for directly — fabrication, design, PM, install and sales." },
            { to: "/for-organizers" as const, label: "For organizers & venues", note: "Partner programs for shows, convention centres and associations." },
            { to: "/preferred-vendor-program" as const, label: "Preferred vendor program", note: "Become a preferred exhibit supplier for your show or venue." },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[oklch(0.78_0.13_300)]/50 transition"
            >
              <h3 className="font-display text-lg font-semibold">{l.label}</h3>
              <p className="mt-2 text-white/60 text-sm leading-relaxed">{l.note}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTABand />
    </PageLayout>
  );
}
