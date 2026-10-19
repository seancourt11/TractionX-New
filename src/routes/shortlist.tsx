import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section } from "@/components/PageLayout";
import { QuoteModal } from "@/components/QuoteModal";
import { Design3DButton } from "@/components/GlobalCta";
import { useShortlist } from "@/lib/shortlist";
import { useCityContext } from "@/lib/city-context";
import { getRentalBooth } from "@/data/rental-booths";
import { boothPrice } from "@/lib/booth-pricing";
import { noindexMeta } from "@/lib/seo";

export const Route = createFileRoute("/shortlist")({
  head: () => ({
    meta: [
      { title: "Your saved booth designs — Traction X" },
      {
        name: "description",
        content:
          "Compare the trade show booth designs you saved, side by side, then send the whole shortlist to our team as one quote request.",
      },
      { property: "og:title", content: "Your saved booth designs — Traction X" },
      {
        property: "og:description",
        content: "Compare saved booth designs and request one quote for the whole shortlist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...noindexMeta(),
    ],
  }),
  component: ShortlistPage,
});

function sizeLabel(size: string) {
  return size === "Custom" || size === "Larger" ? size : `${size.replace("x", " × ")} ft`;
}

function ShortlistPage() {
  const { slugs, remove, clear, count } = useShortlist();
  const city = useCityContext();
  const [quote, setQuote] = useState(false);
  const booths = slugs.map(getRentalBooth).filter((b): b is NonNullable<typeof b> => Boolean(b));
  const cityLabel = city?.label ?? "";

  return (
    <PageLayout>
      <PageHero
        eyebrow="Saved designs"
        title="Your booth shortlist"
        intro="Everything you saved while browsing, side by side. Send the whole list to our team and we'll come back with pricing, availability and a 3D concept for the direction you like most."
      />

      <Section>
        {count === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
            <p className="text-white/70">
              You haven't saved any designs yet. Browse the rental catalogue and hit{" "}
              <span className="text-[oklch(0.78_0.13_300)] font-semibold">☆ Save</span> on anything you like.
            </p>
            <Link
              to="/rent-a-booth"
              className="mt-6 inline-block bg-[oklch(0.78_0.13_300)] text-black px-6 py-3 rounded-xl font-semibold"
            >
              Browse booth rentals
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-white/70 text-sm">
                {count} design{count === 1 ? "" : "s"} saved
                {cityLabel ? ` · priced for ${cityLabel}` : ""}
              </p>
              <button type="button" onClick={clear} className="text-sm text-white/50 hover:text-white underline">
                Clear shortlist
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-widest text-white/45 border-b border-white/10">
                    <th className="py-3 pr-4 font-semibold">Design</th>
                    <th className="py-3 pr-4 font-semibold">Footprint</th>
                    <th className="py-3 pr-4 font-semibold">Rent from</th>
                    <th className="py-3 pr-4 font-semibold">Buy from</th>
                    <th className="py-3 pr-4 font-semibold">Available cities</th>
                    <th className="py-3 font-semibold" />
                  </tr>
                </thead>
                <tbody>
                  {booths.map((b) => {
                    const p = boothPrice(b.size, cityLabel);
                    return (
                      <tr key={b.slug} className="border-b border-white/10 align-top">
                        <td className="py-4 pr-4">
                          <Link
                            to="/rent-booth/$slug"
                            params={{ slug: b.slug }}
                            className="flex items-center gap-3 hover:text-[oklch(0.78_0.13_300)]"
                          >
                            <img
                              src={b.image}
                              alt={`${b.name} ${sizeLabel(b.size)} booth rental`}
                              loading="lazy"
                              className="h-14 w-20 object-cover rounded-lg border border-white/10"
                            />
                            <span>
                              <span className="block font-semibold">{b.name}</span>
                              <span className="block text-[11px] uppercase tracking-widest text-white/45">{b.code}</span>
                            </span>
                          </Link>
                        </td>
                        <td className="py-4 pr-4 text-white/75">{sizeLabel(b.size)}</td>
                        <td className="py-4 pr-4 text-white/75">{p.priced ? p.rentRange : "On request"}</td>
                        <td className="py-4 pr-4 text-white/75">{p.priced ? p.buyLabel : "On request"}</td>
                        <td className="py-4 pr-4 text-white/55 text-xs max-w-[220px]">
                          {b.cities.slice(0, 5).join(", ")}
                          {b.cities.length > 5 ? ` +${b.cities.length - 5} more` : ""}
                        </td>
                        <td className="py-4">
                          <button
                            type="button"
                            onClick={() => remove(b.slug)}
                            className="text-xs text-white/45 hover:text-white underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                Send this shortlist as one quote
              </h2>
              <p className="mt-3 text-white/70 text-sm max-w-2xl">
                We'll price each saved design for your show city and dates, confirm availability, and recommend the
                direction that fits your budget. Install and dismantle are included in every number we send.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setQuote(true)}
                  className="bg-[oklch(0.78_0.13_300)] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90"
                >
                  Quote my {count} saved design{count === 1 ? "" : "s"}
                </button>
                <Design3DButton source="shortlist" variant="outline" />
              </div>
            </div>
          </>
        )}
      </Section>

      <QuoteModal
        open={quote}
        onOpenChange={setQuote}
        mode="customize"
        boothName={booths.map((b) => `${b.name} (${b.code})`).join(", ")}
        boothSize={booths[0]?.size}
        city={cityLabel}
      />
    </PageLayout>
  );
}
