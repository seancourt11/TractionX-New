import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BoothBuilder } from "@/components/booth-builder/BoothBuilder";
import { absUrl, robotsMeta } from "@/lib/seo";

const TITLE = "Booth Builder — Design Your Trade Show Booth Online | Traction X";
const DESC =
  "Build your trade show booth concept in minutes: choose a footprint, add walls, set heights and see it in 2D and 3D. Then let Traction X turn it into a full booth plan and rental quote.";
const PATH = "/booth-builder";

export const Route = createFileRoute("/booth-builder")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...robotsMeta(),
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl(PATH) },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl(PATH) }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-dvh bg-black text-white font-sans antialiased">
      <SiteHeader />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-white/50">Booth builder</p>
          <h1 className="max-w-4xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl">
            Design your <span className="text-[oklch(0.78_0.13_300)]">booth concept</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            Pick your space, drop in walls, set the heights, and see the whole thing in 2D and 3D. No CAD
            experience needed — our team turns your concept into the finished design and rental quote.
          </p>
        </div>
      </section>

      <BoothBuilder />

      <SiteFooter />
    </div>
  );
}
