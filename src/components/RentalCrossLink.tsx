import { Link } from "@tanstack/react-router";
import { useCta } from "@/components/GlobalCta";
import { BoothCard } from "@/components/RentalCatalog";
import { RENTAL_BOOTHS } from "@/data/rental-booths";
import { BOOTH_SIZES } from "@/data/booth-sizes";

/** Stable string hash so SSR and hydration pick the same booths. */
function seedOf(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const FEATURED_SIZES = ["10x10", "10x20", "20x20", "20x30"];

/** Deterministically pick one booth per featured size, seeded off the page slug. */
function pickBooths(seed: string) {
  const n = seedOf(seed);
  const picked: typeof RENTAL_BOOTHS = [];
  FEATURED_SIZES.forEach((size, i) => {
    const pool = RENTAL_BOOTHS.filter((b) => b.size === size);
    if (!pool.length) return;
    picked.push(pool[(n + i * 7919) % pool.length]);
  });
  return picked.slice(0, 4);
}

/**
 * "Available for rent in {place}" cross-link band — used on city, show and
 * venue pages so every local landing page reaches the rental catalogue.
 */
export function RentalCrossLink({
  place,
  seed,
  source,
  city,
}: {
  /** Human label: "Chicago", "CES", "Las Vegas Convention Center". */
  place: string;
  /** Page slug — keeps the booth selection stable and varied per page. */
  seed: string;
  /** Lead attribution source, e.g. "city-chicago". */
  source: string;
  /** City for image alt text, when known. */
  city?: string;
}) {
  const { openQuote } = useCta();
  const booths = pickBooths(seed);
  const sizes = BOOTH_SIZES.filter((b) => b.category === "size");

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-purple-300">Available for rent</div>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold">Custom booth rentals for {place}</h2>
        <p className="mt-3 text-white/80 leading-relaxed max-w-3xl">
          Every booth below is available as a custom rental for {place} — designed, built, delivered,
          installed and dismantled by our own team. Same designs are available to buy outright.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <Link
              key={s.slug}
              to="/booth-size/$slug"
              params={{ slug: s.slug }}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-purple-400/60 hover:text-white transition"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {booths.map((b) => (
            <BoothCard key={b.slug} booth={b} city={city} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/rent-a-booth"
            className="inline-flex items-center px-5 py-3 rounded-full bg-purple-400 text-black font-semibold hover:bg-purple-300"
          >
            See all custom rental booths
          </Link>
          <button
            type="button"
            onClick={() => openQuote({ source })}
            className="inline-flex items-center px-5 py-3 rounded-full border border-white/20 hover:border-white/60"
          >
            Get my exact quote
          </button>
        </div>
      </div>
    </section>
  );
}
