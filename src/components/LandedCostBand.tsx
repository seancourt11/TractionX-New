import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { QuoteButton } from "@/components/GlobalCta";
import {
  fmtMoney,
  marketTierForCity,
  priceBandsForTier,
  serviceRangeForDim,
} from "@/lib/market-tier";

/**
 * "What exhibiting actually lands at" — booth price plus the show-floor services
 * the general contractor bills (drayage, electrical, rigging, cleaning, labour),
 * shaded by the local market tier. Used on venue, city and show pages.
 */
export function LandedCostBand({
  place,
  city,
  unionNote,
  source,
  preposition: prepositionInput,
}: {
  place: string;
  city: string;
  unionNote?: string;
  source: string;
  preposition?: "at" | "in";
}) {
  const preposition =
    prepositionInput ?? (place.trim().toLowerCase() === city.trim().toLowerCase() ? "in" : "at");
  const tier = marketTierForCity(city, unionNote);
  const bands = priceBandsForTier(tier);
  const [dim, setDim] = useState(bands.find((b) => b.dim.startsWith("10×20"))?.dim ?? bands[0]?.dim ?? "10×10");

  const band = bands.find((b) => b.dim === dim) ?? bands[0];
  const svc = serviceRangeForDim(dim, tier);
  const totalLow = (band?.rentFrom ?? 0) + svc.low;
  const totalHigh = Math.round(((band?.rentFrom ?? 0) * 1.38 + svc.high) / 250) * 250;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="rounded-2xl border border-purple-400/30 bg-purple-400/[0.04] p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-purple-300">Landed budget</div>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold">
          What exhibiting {preposition} {place} actually costs
        </h2>
        <p className="mt-3 max-w-3xl text-white/75 leading-relaxed">
          Most budgets miss the second half. The booth is one invoice — ours, and it already includes
          install and dismantle. The show floor is another: drayage, electrical, rigging, cleaning and
          floor labour are billed by the general contractor at {city} rates.
        </p>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Choose a footprint">
          {bands.map((b) => (
            <button
              key={b.dim}
              type="button"
              onClick={() => setDim(b.dim)}
              aria-pressed={b.dim === dim}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                b.dim === dim
                  ? "bg-purple-400 text-black border-purple-400"
                  : "border-white/20 text-white/80 hover:border-white/50"
              }`}
            >
              {b.dim}
            </button>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Money
            label="Custom booth, from"
            value={fmtMoney(band?.rentFrom ?? 0)}
            note="Design, fabrication, graphics, freight, install & dismantle — one Traction X invoice."
          />
          <Money
            label="Show-floor services"
            value={`${fmtMoney(svc.low)} – ${fmtMoney(svc.high)}`}
            note={`Drayage, electrical, rigging, cleaning and floor labour, billed by the general contractor at ${city} rates.`}
          />
          <Money
            highlight
            label="Landed budget"
            value={`${fmtMoney(totalLow)} – ${fmtMoney(totalHigh)}`}
            note={`${svc.sqft.toLocaleString("en-US")} sq ft ${preposition} ${place}, ${tier.label.toLowerCase()}.`}
          />
        </div>

        <p className="mt-5 text-xs text-white/45 leading-relaxed max-w-3xl">
          Planning ranges, not quotes. The services line moves most with freight weight, advance-warehouse
          deadlines, hanging structures and overtime windows — the three levers we manage for you. Send us
          the space and we&apos;ll return a costed breakdown with {city} labour rates applied.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <QuoteButton source={`${source}-landed-cost`} label={`Get my ${dim} budget ${preposition} ${place}`} />
          <Link
            to="/booth-cost-calculator"
            className="inline-flex items-center border border-white/20 px-5 py-3 rounded-xl font-semibold hover:bg-white/5"
          >
            Build a full estimate →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Money({
  label,
  value,
  note,
  highlight,
}: {
  label: string;
  value: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        highlight ? "border-purple-400/50 bg-purple-400/[0.07]" : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <div className="text-xs uppercase tracking-widest text-purple-300">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      <p className="mt-2 text-sm text-white/60 leading-relaxed">{note}</p>
    </div>
  );
}
