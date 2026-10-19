import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { SITE } from "@/lib/site";

const TITLE = "About Traction X — Trade Show Exhibits & Brand Activations";
const DESC = "Traction X is a full-service exhibit house: design, custom fabrication, event tech, freight and I&D — with in-region fabrication across six continents.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/about` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/about` }],
  }),
  component: About,
});

function About() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="About"
        title="One Team,"
        accent="One Contract, Every Floor."
        intro="Traction X was founded to fix the thing exhibitors complain about most: too many vendors, too many surprises, and too many late nights before doors open."
      />

      <Section eyebrow="The company" title="What we do differently">
        <div className="grid md:grid-cols-2 gap-8 text-white/75 leading-relaxed">
          <p>
            We're a full-service exhibit house. Design and photoreal 3D renders, custom fabrication in wood, metal and aluminium, backlit textile printing, event technology, freight and drayage coordination, and union-jurisdiction install and dismantle — all under one contract with one accountable producer.
          </p>
          <p>
            Our clients typically come to us after being burned by the multi-vendor model. Six invoices, three phone numbers, four different people to yell at when something's wrong. We collapse that into one relationship, one project tracker and one number to call.
          </p>
        </div>
      </Section>

      <Section eyebrow="Numbers" title="What that looks like" bg="muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "700+", l: "designs in the catalog" },
            { n: "6", l: "continents served" },
            { n: "15+", l: "years on the floor" },
            { n: "1", l: "producer per project" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="font-display text-4xl md:text-5xl font-bold text-[oklch(0.78_0.13_300)]">{s.n}</div>
              <div className="mt-2 text-white/60 text-sm">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Capabilities" title="Everything a booth program needs">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Photoreal 3D booth design",
            "Custom fabrication (wood, metal, aluminium)",
            "Modular rental program (700+ designs)",
            "LED walls, displays, PA & lighting",
            "Interactive touchscreens & lead capture",
            "Union-jurisdiction I&D",
            "Cross-border & international freight",
            "Advance forms & show-services coordination",
            "Post-show debrief & drayage audit",
          ].map((x) => (
            <div key={x} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-white/85 text-sm">
              {x}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">Ready to talk?</h2>
            <p className="mt-2 text-white/70 max-w-lg">Shoot us a brief. We reply within one business day.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90">Contact us →</Link>
            <a href={SITE.calendly} target="_blank" rel="noreferrer" className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10">Book a call</a>
          </div>
        </div>
      </Section>

      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
