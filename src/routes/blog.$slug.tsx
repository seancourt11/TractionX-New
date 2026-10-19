import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { resolveLegacyRedirect } from "../data/legacy-redirects";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { BLOG_MAP, BLOG_POSTS } from "@/data/blog-posts";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG_MAP[params.slug];
    if (!post) {
      const legacy = resolveLegacyRedirect(`/blog/${params.slug}`);
      if (legacy) throw redirect({ href: legacy, statusCode: 301, throw: true });
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Post not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    const url = `${SITE.url}/blog/${p.slug}`;
    return {
      meta: [
        { title: p.seo.title },
        { name: "description", content: p.seo.description },
        { property: "og:title", content: p.seo.title },
        { property: "og:description", content: p.seo.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
            author: { "@type": "Organization", name: SITE.name },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Post not found" intro="That article has moved." />
    </PageLayout>
  ),
});

function PostPage() {
  const { post: p } = Route.useLoaderData() as { post: (typeof BLOG_POSTS)[number] };
  const related = BLOG_POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <PageLayout>
      <PageHero eyebrow={`Blog · ${p.readMinutes} min read`} title={p.title} intro={p.excerpt} />

      <Section>
        <article className="prose prose-invert max-w-3xl">
          {p.sections.map((s) => (
            <div key={s.heading} className="mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
                {s.heading}
              </h2>
              {s.body.map((para, i) => (
                <p key={i} className="mt-4 text-white/75 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </article>
      </Section>

      <Section eyebrow="Related reading" title="More from the blog" bg="muted">
        <div className="grid md:grid-cols-3 gap-4">
          {related.map((x) => (
            <Link
              key={x.slug}
              to="/blog/$slug"
              params={{ slug: x.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="font-display font-semibold">{x.title}</div>
              <div className="mt-2 text-sm text-white/60">{x.excerpt}</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="contact">
        <QuoteForm heading="Request a quote" />
      </Section>

      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
