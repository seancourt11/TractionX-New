import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { REGIONS } from "@/data/regions";
import { CITIES, cityUrlSlug, type City } from "@/data/cities";
import { SITE } from "@/lib/site";

/** City directory grouped by country, US/Canada first, then A-Z. */
const CITY_GROUPS: { country: string; cities: City[] }[] = (() => {
  const byCountry = new Map<string, City[]>();
  for (const c of CITIES) {
    const list = byCountry.get(c.countryName) ?? [];
    list.push(c);
    byCountry.set(c.countryName, list);
  }
  const order = (name: string) =>
    name === "United States" ? 0 : name === "Canada" ? 1 : 2;
  return [...byCountry.entries()]
    .sort(([a], [b]) => order(a) - order(b) || a.localeCompare(b))
    .map(([country, cities]) => ({
      country,
      cities: [...cities].sort((a, b) => a.city.localeCompare(b.city)),
    }));
})();

const TITLE = "Global Trade Show Exhibits & Booth Rentals | Traction X";
const DESC = "Trade show booth rentals and custom exhibits on six continents — with in-region fabrication partners across North America, Europe, Latin America, Asia and Oceania.";

export const Route = createFileRoute("/global")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/global` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/global` }],
  }),
  component: GlobalHub,
});

function GlobalHub() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Global"
        title="Trade Show Exhibits"
        accent="Six Continents"
        intro="One partner across every major show floor. In-region fabrication in North America, Europe, Latin America, Asia and Oceania — with cross-border freight, customs and drayage handled end-to-end."
      />
      <Section eyebrow="Regions" title="Where we deliver">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGIONS.map((r) => (
            <Link
              key={r.slug}
              to="/regions/$slug"
              params={{ slug: r.slug }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[oklch(0.78_0.13_300)] transition"
            >
              <h3 className="font-display text-xl font-semibold">{r.label}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{r.intro}</p>
              <span className="mt-4 inline-block text-sm text-[oklch(0.78_0.13_300)] group-hover:underline">
                Explore {r.label} →
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <Section eyebrow="Cities" title="Every city we build in" bg="muted" intro="Local venue rules, labour and freight differ in every market. Each city page covers the halls, the contractor rules and the shows we build for there.">
        <div className="space-y-8">
          {CITY_GROUPS.map((g) => (
            <div key={g.country}>
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-white/50">{g.country}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.cities.map((c) => (
                  <Link
                    key={c.slug}
                    to="/city/$slug"
                    params={{ slug: cityUrlSlug(c.slug) }}
                    className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-sm hover:border-[oklch(0.78_0.13_300)] hover:bg-white/10 transition"
                  >
                    {c.city}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}

