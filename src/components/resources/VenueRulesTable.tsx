import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { VENUES, venueUrlSlug } from "@/data/venues";
import { marketTierForCity, cityCostIndex, cityIndexLabel } from "@/lib/market-tier";
import { QuoteButton } from "@/components/GlobalCta";

/**
 * Side-by-side exhibitor rules for every venue we hold data on. Everything
 * shown comes from the venue records — no invented dock counts.
 */
export function VenueRulesTable() {
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return VENUES.filter(
      (v) =>
        !needle ||
        v.name.toLowerCase().includes(needle) ||
        v.city.toLowerCase().includes(needle) ||
        (v.shortName ?? "").toLowerCase().includes(needle),
    ).map((v) => {
      const tier = marketTierForCity(v.city, v.union);
      const index = cityCostIndex(v.city, tier.id);
      return { v, tier, indexLabel: cityIndexLabel(index) };
    });
  }, [q]);

  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">Venue comparison</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
          Labour, freight and cost index by hall
        </h2>
        <p className="mt-3 max-w-3xl text-white/70">
          Search by venue or city. Labour jurisdiction and material-handling notes come from each hall's
          own record; always confirm against the exhibitor manual for your specific show.
        </p>

        <label className="mt-7 block max-w-md">
          <span className="block text-xs uppercase tracking-[0.18em] text-white/50 mb-2">Find a venue</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. Las Vegas, Orange County, LVCC"
            className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-white/30 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
          />
        </label>

        <div className="mt-8 rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.16em] text-white/60">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">Venue</th>
                <th className="px-5 py-4 text-left font-semibold">Labour jurisdiction</th>
                <th className="px-5 py-4 text-left font-semibold">Material handling</th>
                <th className="px-5 py-4 text-left font-semibold">Labour tier</th>
                <th className="px-5 py-4 text-left font-semibold">City cost index</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ v, tier, indexLabel }) => (
                <tr key={v.slug} className="border-t border-white/10 align-top">
                  <td className="px-5 py-4">
                    <Link
                      to="/venues/$slug"
                      params={{ slug: venueUrlSlug(v.slug) }}
                      className="font-semibold text-white hover:text-[oklch(0.85_0.13_300)]"
                    >
                      {v.shortName ?? v.name}
                    </Link>
                    <p className="mt-1 text-xs text-white/45">
                      {v.city}
                      {v.stateAbbr ? `, ${v.stateAbbr}` : ""}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-white/70">{v.union}</td>
                  <td className="px-5 py-4 text-white/70">{v.drayage}</td>
                  <td className="px-5 py-4 text-white/70">{tier.label}</td>
                  <td className="px-5 py-4 text-white/70">{indexLabel}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-white/45">
                    No venue matches that search — tell us the hall and we'll pull the rules for you.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <QuoteButton source="resource-venue-rules" label="Have us handle venue compliance" />
        </div>
      </div>
    </section>
  );
}
