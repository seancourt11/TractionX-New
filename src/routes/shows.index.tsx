import { SITE } from "@/lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DesignCtaBand } from "@/components/GlobalCta";
import { SHOWS, showUrlSlug } from "@/data/shows";

const TITLE = "Top Trade Show Booth Rentals by Show | Traction X";
const DESC =
  "Show-specific booth rental guides — CES, NAB, SEMA, HIMSS, IAAPA, IMTS, RSNA, NRF, Web Summit and more. Design, fab, and I&D from a single team.";

export const Route = createFileRoute("/shows/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/shows` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/shows` }],
  }),
  component: ShowsIndex,
});

function ShowsIndex() {
  return (
    <div className="min-h-dvh bg-black text-white font-sans">
      <SiteHeader />
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-xs uppercase tracking-widest text-purple-300 mb-3">Show guides</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Every major trade show, planned.</h1>
        <p className="mt-6 text-white/70 max-w-2xl text-lg">
          Booth logistics, booking windows, and field tips for the shows that decide your year. If you're
          exhibiting at one of these, we've done it before.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWS.map((s) => (
            <Link
              key={s.slug}
              to="/shows/$slug"
              params={{ slug: showUrlSlug(s.slug) }}
              className="block border border-white/10 rounded-2xl p-6 hover:border-purple-400/60 hover:bg-white/[0.02] transition"
            >
              <div className="text-xs text-purple-300 uppercase tracking-widest">{s.industry}</div>
              <h2 className="mt-2 text-xl font-semibold">{s.name}</h2>
              <p className="mt-3 text-sm text-white/60">
                {s.city} · {s.cadence}
              </p>
              <p className="mt-4 text-sm text-white/70 line-clamp-3">{s.intro}</p>
              <div className="mt-5 text-sm text-purple-300">Show guide →</div>
            </Link>
          ))}
        </div>
      </section>

      <DesignCtaBand source="page" />
      <SiteFooter />
    </div>
  );
}
