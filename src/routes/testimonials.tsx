import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { TESTIMONIALS, reviewSchema } from "@/data/testimonials";
import { SITE } from "@/lib/site";

const TITLE = "Client Testimonials — Trade Show Exhibitors | Traction X";
const DESC = "What clients say about working with Traction X — aerospace, defense, SaaS, event agencies and international development banks.";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/testimonials` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/testimonials` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          email: SITE.email,
          telephone: SITE.phone,
          review: reviewSchema(SITE.name, SITE.url),
        }),
      },
    ],
  }),
  component: Testimonials,
});


function Testimonials() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Testimonials"
        title="What Clients"
        accent="Say About Us"
        intro="Aerospace, defense, SaaS, event agencies and international development banks — real feedback from real programs."
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure key={t.quote} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <blockquote className="text-white/85 leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm text-white/60">
                <span className="font-semibold text-white">{t.name}</span> — {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
