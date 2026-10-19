import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { resolveLegacyRedirect } from "../data/legacy-redirects";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { REGION_MAP, REGIONS } from "@/data/regions";
import { CITIES, cityUrlSlug } from "@/data/cities";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/regions/$slug")({
  loader: ({ params }) => {
    const region = REGION_MAP[params.slug];
    if (!region) {
      const legacy = resolveLegacyRedirect(`/regions/${params.slug}`);
      if (legacy) throw redirect({ href: legacy, statusCode: 301, throw: true });
      throw notFound();
    }
    return { region };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Region not found" }, { name: "robots", content: "noindex" }] };
    const r = loaderData.region;
    const url = `${SITE.url}/regions/${r.slug}`;
    return {
      meta: [
        { title: r.seo.title },
        { name: "description", content: r.seo.description },
        { property: "og:title", content: r.seo.title },
        { property: "og:description", content: r.seo.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: RegionPage,
  notFoundComponent: () => (
    <PageLayout>
      <PageHero title="Region not found" intro="That region page has moved." />
    </PageLayout>
  ),
});

/**
 * Curated city names for the region, plus every city page tagged to that region
 * so no published city page is orphaned from its regional hub.
 */
function regionCityNames(r: (typeof REGIONS)[number]): string[] {
  const names = [...r.cities];
  const seen = new Set(names.map((n) => n.toLowerCase()));
  for (const c of CITIES) {
    if (c.region === r.slug && !seen.has(c.city.toLowerCase())) {
      names.push(c.city);
      seen.add(c.city.toLowerCase());
    }
  }
  return names;
}

function RegionPage() {
  const { region: r } = Route.useLoaderData() as { region: (typeof REGIONS)[number] };
  return (
    <PageLayout>
      <PageHero eyebrow="Region" title="Trade Show Exhibits" accent={r.label} intro={r.intro}>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="hero" />
          <Link to="/global" className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10">
            All regions
          </Link>
        </div>
      </PageHero>

      <Section eyebrow="Cities" title={`Cities we serve in ${r.label}`}>
        <div className="flex flex-wrap gap-3">
          {regionCityNames(r).map((c) => {
            const match = CITIES.find((x) => x.city.toLowerCase() === c.toLowerCase());
            if (!match) {
              return (
                <span key={c} className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm">
                  {c}
                </span>
              );
            }
            return (
              <Link
                key={c}
                to="/city/$slug"
                params={{ slug: cityUrlSlug(match.slug) }}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm hover:border-[oklch(0.78_0.13_300)] hover:bg-white/10 transition"
              >
                {c} booth rentals →
              </Link>
            );
          })}
        </div>
      </Section>


      <Section eyebrow="Venues" title="Convention centres & event venues" bg="muted">
        <ul className="grid md:grid-cols-2 gap-3">
          {r.venues.map((v) => (
            <li key={v} className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-white/85">
              {v}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Other regions" title="We serve globally">
        <div className="grid md:grid-cols-3 gap-4">
          {REGIONS.filter((x) => x.slug !== r.slug).map((x) => (
            <Link
              key={x.slug}
              to="/regions/$slug"
              params={{ slug: x.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <div className="font-display font-semibold">{x.label}</div>
              <div className="mt-1 text-sm text-white/60">{x.cities.slice(0, 4).join(" · ")}…</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="contact">
        <QuoteForm heading={`Request a ${r.label} quote`} defaultCity={r.cities[0]} />
      </Section>

      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
