import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, FAQBlock, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { SITE } from "@/lib/site";
import { absUrl, robotsMeta } from "@/lib/seo";

const TITLE = "Careers at Traction X — Trade Show Exhibit Jobs";
const DESC =
  "Traction X hires for fabrication, design, project management, install crews and sales. See the roles we hire for and how to apply.";

export const Route = createFileRoute("/careers")({
  head: () => {
    const url = absUrl("/careers");
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
      scripts: [{ type: "application/ld+json", children: JSON.stringify(careersSchema(url)) }],
    };
  },
  component: Careers,
});

const FAQS = [
  {
    q: "Do you post specific open positions?",
    a: "Not usually. We hire against the role categories on this page as project volume dictates, and strong general applications are kept on file. If a specific opening exists when you reach out, we'll tell you.",
  },
  {
    q: "Where are the roles based?",
    a: "Design, project management, fabrication and sales work out of our shop and office. Install crew work is on the road at convention centres across North America, concentrated in Las Vegas, Orlando, Chicago, New York, Toronto and Vancouver.",
  },
  {
    q: "How much travel is involved?",
    a: "It varies by role. Install crew and some project management roles travel to shows through the spring and fall seasons; fabrication, design and most office roles do not travel regularly.",
  },
  {
    q: "Do I need trade show experience?",
    a: "It helps but isn't required for fabrication, millwork, graphics or AV roles — the underlying trades transfer. Project management and sales roles are much easier with prior exhibit, event or agency production experience.",
  },
  {
    q: "Do you take co-op students or apprentices?",
    a: "Yes, in fabrication and design. Send your program, term dates and any portfolio work with your application.",
  },
  {
    q: "I run a company rather than looking for a job — can we work with you?",
    a: "Yes. Fabrication shops, install crews, printers, AV suppliers and freight partners should go to our suppliers page instead of applying here.",
  },
];

function careersSchema(url: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: TITLE,
        description: DESC,
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1"] },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Careers", item: url },
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

const ROLES = [
  {
    title: "Fabrication",
    body: "Millwork, welding, CNC operation, finishing and textile print for custom booth structures built in-house.",
  },
  {
    title: "Design",
    body: "Booth design, 3D rendering and production drawings — turning exhibit objectives into a buildable, freight-ready exhibit.",
  },
  {
    title: "Project Management",
    body: "Owning a show from kickoff through advance forms, freight timing and post-show wrap for clients across multiple industries.",
  },
  {
    title: "Install Crew",
    body: "On-site install and dismantle at convention centres — structure, graphics, AV and show-day support.",
  },
  {
    title: "Sales",
    body: "Scoping exhibit programs, quoting custom builds and rentals, and managing client relationships across the show calendar.",
  },
];

function Careers() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Careers"
        title="Build the Booths"
        accent="Exhibitors Remember"
        intro="Traction X is a full-service exhibit house — design, fabrication, project management, install crews and sales all under one roof. We're always open to hearing from people who do this work well."
      />

      <Section eyebrow="Why work here" title="What it's like on this team">
        <div className="grid md:grid-cols-2 gap-8 text-white/75 leading-relaxed max-w-4xl">
          <p>
            Exhibits are unforgiving: a booth either goes up correctly on a fixed date at a fixed venue, or it
            doesn't. That pressure shapes the team — people who take ownership, communicate early when something's
            off, and care about the difference between a booth that looks right in a render and one that survives a
            four-day show floor.
          </p>
          <p>
            We work across design, fabrication, project management, install and sales — which means people on this
            team see a project from concept sketch through to the crate coming home. If you'd rather own one piece of
            a process start to finish than hand it off and move on, this is that kind of company.
          </p>
        </div>
      </Section>

      <Section eyebrow="Roles we hire for" title="The kinds of roles we hire for" bg="muted">
        <div className="grid md:grid-cols-2 gap-6">
          {ROLES.map((r) => (
            <div key={r.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-xl font-semibold">{r.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-white/60 max-w-2xl text-sm leading-relaxed">
          We don't publish a running list of open positions here — instead, we invite general applications against
          the roles above. If a specific opening exists when you reach out, we'll tell you; if not, strong
          applications are kept on file for when the work picks up.
        </p>
      </Section>

      <Section eyebrow="How to apply" title="Send us your background">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 max-w-2xl">
          <p className="text-white/75 leading-relaxed">
            Email a resume, portfolio or work samples (whichever applies to the role) to{" "}
            <a href={`mailto:${SITE.email}`} className="text-white hover:underline">{SITE.email}</a> with the role
            you're interested in in the subject line. Tell us plainly what you've built, managed or sold, and where
            you've worked before — we read every application ourselves.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent("Application — ")}`}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90"
            >
              Email {SITE.email}
            </a>
            <Link to="/about" className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10">
              Learn about Traction X
            </Link>
          </div>
        </div>
      </Section>

      <FAQBlock items={FAQS} title="Careers questions" />

      <Section eyebrow="Not a job seeker?" title="Suppliers and subcontractors" bg="muted">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 max-w-3xl">
          <p className="text-white/75 leading-relaxed">
            If you run a fabrication shop, install and dismantle crew, print house, AV company or freight operation
            rather than looking for a role, we source all of those across North America. Our supplier page covers
            what we buy, the standards we hold vendors to and how onboarding works.
          </p>
          <Link
            to="/suppliers"
            className="mt-6 inline-block border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            Suppliers &amp; subcontractors →
          </Link>
        </div>
      </Section>

      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
