import { SITE } from "@/lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DesignCtaBand } from "@/components/GlobalCta";
import { VENUES, venueUrlSlug } from "@/data/venues";

const TITLE = "Top Trade Show Venues — Booth Rentals & I&D | Traction X";
const DESC =
  "Custom trade show booth rentals at the top convention centres in the US & Canada — LVCC, McCormick Place, Javits, OCCC, Mandalay Bay, Vancouver Convention Centre and more.";

export const Route = createFileRoute("/venues/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/venues` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/venues` }],
  }),
  component: VenuesIndex,
});

function VenuesIndex() {
  return (
    <div className="min-h-dvh bg-black text-white font-sans">
      <SiteHeader />
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-xs uppercase tracking-widest text-purple-300 mb-3">Convention centres</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Top trade show venues we work in.</h1>
        <p className="mt-6 text-white/70 max-w-2xl text-lg">
          Venue-specific rules — union jurisdictions, drayage, hanging-sign approvals — decide whether your booth
          arrives on time. Here's how we handle them at every major convention centre in North America.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VENUES.map((v) => (
            <Link
              key={v.slug}
              to="/venues/$slug"
              params={{ slug: venueUrlSlug(v.slug) }}
              className="block border border-white/10 rounded-2xl p-6 hover:border-purple-400/60 hover:bg-white/[0.02] transition"
            >
              <div className="text-xs text-purple-300 uppercase tracking-widest">
                {v.city}, {v.stateAbbr}
              </div>
              <h2 className="mt-2 text-xl font-semibold">{v.name}</h2>
              <p className="mt-3 text-sm text-white/60">{v.size} · {v.halls}</p>
              <p className="mt-4 text-sm text-white/70 line-clamp-3">{v.intro}</p>
              <div className="mt-5 text-sm text-purple-300">View venue guide →</div>
            </Link>
          ))}
        </div>
      </section>

      <DesignCtaBand source="page" />
      <SiteFooter />
    </div>
  );
}
