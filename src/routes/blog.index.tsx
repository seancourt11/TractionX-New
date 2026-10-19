import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { BLOG_POSTS } from "@/data/blog-posts";
import { SITE } from "@/lib/site";

const TITLE = "Trade Show Booth Blog — Cost, Design & Planning | Traction X";
const DESC = "Insights on trade show booth costs, rental vs. custom, planning timelines, AI search visibility and ROI metrics for exhibit programs.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/blog` }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Blog"
        title="Trade Show"
        accent="Insights"
        intro="Cost guides, planning workbacks, ROI frameworks and AI-search visibility — practical writing for exhibitor marketing teams."
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="text-xs uppercase tracking-widest text-white/50">
                {new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {p.readMinutes} min read
              </div>
              <h2 className="mt-2 font-display text-xl md:text-2xl font-semibold">{p.title}</h2>
              <p className="mt-3 text-white/70 leading-relaxed">{p.excerpt}</p>
              <span className="mt-4 inline-block text-sm text-[oklch(0.78_0.13_300)] group-hover:underline">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
