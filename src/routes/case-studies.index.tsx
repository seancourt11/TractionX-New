import { SITE } from "@/lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DesignCtaBand } from "@/components/GlobalCta";
import { CASE_STUDIES } from "@/data/case-studies";

const portfolio = import.meta.glob<{ default: { url: string } }>(
  "@/assets/portfolio/*.asset.json",
  { eager: true }
);
const imgUrl = (name: string) => {
  const key = Object.keys(portfolio).find((k) => k.endsWith(`/${name}.asset.json`));
  return key ? portfolio[key].default.url : "";
};

const TITLE = "Trade Show Booth Case Studies | Traction X";
const DESC =
  "Real projects from Traction X — Thales, Accenture, Canada Pavilion, Web Summit Vancouver and Netflix. See how we design, build and manage exhibits that convert.";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/case-studies` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/case-studies` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-dvh bg-black text-white font-sans antialiased">
      <SiteHeader />

      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-5">
            Case studies
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.02] max-w-4xl">
            Booths that moved <span className="text-[oklch(0.78_0.13_300)]">pipeline</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed">
            A cross-section of exhibits we've designed, fabricated and run on-site — for
            defence primes, federal consultants, governments, tech startups and global media brands.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {CASE_STUDIES.map((c) => (
            <Link
              key={c.slug}
              to="/case-studies/$slug"
              params={{ slug: c.slug }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[oklch(0.78_0.13_300)]/50 transition"
            >
              <div className="aspect-[16/10] overflow-hidden bg-white/[0.03]">
                <img
                  src={imgUrl(c.heroImage)}
                  alt={`${c.client} booth at ${c.show}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.78_0.13_300)]">
                  {c.client} · {c.show} · {c.year}
                </div>
                <h2 className="mt-2 font-display text-xl md:text-2xl font-bold uppercase tracking-tight">
                  {c.title}
                </h2>
                <p className="mt-3 text-sm text-white/60">{c.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/60">
                  <span className="border border-white/15 rounded-full px-2.5 py-1">{c.size}</span>
                  <span className="border border-white/15 rounded-full px-2.5 py-1">{c.city}</span>
                  <span className="border border-white/15 rounded-full px-2.5 py-1">{c.industry}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DesignCtaBand source="page" />
      <SiteFooter />
    </div>
  );
}
