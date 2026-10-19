import { Link } from "@tanstack/react-router";
import { QuoteButton } from "@/components/GlobalCta";
import { cityIndexLabel, fmtMoney, marketTierForCity, priceBandsForTier } from "@/lib/market-tier";

/**
 * "What a booth costs {preposition} {place}" — rent vs buy starting bands, shaded by the
 * local market tier. Used on venue, city and show pages.
 */
export function VenuePriceBands({
  place,
  city,
  unionNote,
  source,
  preposition: prepositionInput,
}: {
  /** Human label: "LVCC", "Chicago", "CES 2027". */
  place: string;
  city: string;
  /** The venue's labour note, used as a fallback signal for the tier. */
  unionNote?: string;
  source: string;
  /** "at LVCC" vs "in Chicago". */
  preposition?: "at" | "in";
}) {
  const preposition =
    prepositionInput ?? (place.trim().toLowerCase() === city.trim().toLowerCase() ? "in" : "at");
  const tier = marketTierForCity(city, unionNote);
  const bands = priceBandsForTier(tier);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-purple-300">Budget bands</div>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold">What a booth costs {preposition} {place}</h2>
        <p className="mt-3 max-w-3xl text-white/75 leading-relaxed">
          Starting points for a 100% custom exhibit {preposition} {place}, adjusted for {city} as a{" "}
          <strong className="text-white">{tier.label.toLowerCase()}</strong> ({tier.note}). Every
          band below includes design, fabrication, graphics, delivery and install &amp; dismantle labour — the
          costs some suppliers invoice after the show.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-white/60 leading-relaxed">
          <strong className="text-white/80">{city} cost index: {cityIndexLabel(tier.mult)}.</strong>{" "}
          We price every market off one national base and shade it by local hall labour, drayage and
          freight. No market moves more than 15% up or down, so you can compare cities honestly.
        </p>


        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left min-w-[520px]">
            <thead>
              <tr className="text-xs uppercase tracking-[0.16em] text-white/50">
                <th scope="col" className="py-3 pr-4 font-medium">Footprint</th>
                <th scope="col" className="py-3 pr-4 font-medium">Rent from</th>
                <th scope="col" className="py-3 pr-4 font-medium">Buy from</th>
                <th scope="col" className="py-3 font-medium">Typical use {preposition} {place}</th>
              </tr>
            </thead>
            <tbody>
              {bands.map((b, i) => (
                <tr key={b.slug} className={i % 2 ? "bg-white/[0.03]" : ""}>
                  <th scope="row" className="py-3 pr-4 font-semibold align-top">
                    <Link to="/booth-size/$slug" params={{ slug: b.slug }} className="hover:text-purple-300">
                      {b.dim}
                    </Link>
                  </th>
                  <td className="py-3 pr-4 text-white/85 align-top">{fmtMoney(b.rentFrom)}</td>
                  <td className="py-3 pr-4 text-white/65 align-top">{fmtMoney(b.buyFrom)}</td>
                  <td className="py-3 text-white/60 text-sm align-top">{USE_BY_DIM[b.dim] ?? "Custom footprint."}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-xs text-white/45 leading-relaxed max-w-3xl">
          Starting points, not quotes. Finish level, AV, hanging structures, enclosed rooms and show-specific
          drayage move the number. Send us the space and we&apos;ll return a costed breakdown with {city} labour
          rates applied.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <QuoteButton source={`${source}-price-bands`} label={`Price my booth ${preposition} ${place}`} />
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

const USE_BY_DIM: Record<string, string> = {
  "8×10": "In-line booth on a tight regional grid.",
  "10×10": "Single in-line — one demo point, one conversation at a time.",
  "10×20": "In-line with a private corner or a second demo station.",
  "20×20": "Island: four open aisles, meeting room and hanging sign.",
  "20×30": "Island with hospitality, storage and a presentation zone.",
  "30×30": "Flagship island — multiple rooms, LED and double-deck capable.",
};
