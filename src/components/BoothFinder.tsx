import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { RENTAL_BOOTHS } from "@/data/rental-booths";
import { CITIES } from "@/data/cities";
import { CITY_SUGGESTIONS } from "@/lib/place-suggest";
import { setCityContext, useCityContext } from "@/lib/city-context";
import { boothPrice } from "@/lib/booth-pricing";
import { suppressCtaNudge } from "@/components/GlobalCta";

const SIZES = ["10x10", "10x20", "10x30", "20x20", "20x30", "20x40"];
const BUDGETS = ["Under $20K", "$20K – $50K", "$50K – $100K", "$100K+"];

const CITY_OPTIONS = Array.from(
  new Set([
    ...CITY_SUGGESTIONS.map((c) => c.value),
    ...CITIES.map((c) => c.city),
    ...RENTAL_BOOTHS.flatMap((b) => b.cities),
  ]),
).sort();

const fmtSize = (s: string) => `${s.replace("x", " × ")} ft`;

/**
 * Homepage search: city + footprint + budget, landing on the pre-filtered
 * rental catalog. Inherits the visitor's city when they arrived from a city page.
 */
export function BoothFinder() {
  const navigate = useNavigate();
  const cityCtx = useCityContext();
  const [city, setCity] = useState("");
  const [touched, setTouched] = useState(false);
  const [size, setSize] = useState("");
  const [budget, setBudget] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (touched || !cityCtx) return;
    if (CITY_OPTIONS.includes(cityCtx.label)) setCity(cityCtx.label);
  }, [cityCtx, touched]);

  const suggestions = useMemo(() => {
    const n = city.trim().toLowerCase();
    if (!n) return CITY_OPTIONS.slice(0, 8);
    // Prefix matches first — typing "las" should surface Las Vegas before Dallas.
    const hits = CITY_OPTIONS.filter((c) => c.toLowerCase().includes(n));
    hits.sort((a, b) => {
      const ap = a.toLowerCase().startsWith(n) ? 0 : 1;
      const bp = b.toLowerCase().startsWith(n) ? 0 : 1;
      return ap - bp || a.localeCompare(b);
    });
    return hits.slice(0, 8);
  }, [city]);

  // Every design ships anywhere we serve, so city shapes pricing and copy — not the count.
  const matches = useMemo(
    () => RENTAL_BOOTHS.filter((b) => !size || b.size === size).length,
    [size],
  );

  const price = size ? boothPrice(size, city) : null;

  const submit = () => {
    // Using the finder counts as engagement — don't nudge this visitor afterwards.
    suppressCtaNudge();
    // Adopt the searched market so header, footer and forms speak that city.
    setCityContext(city);
    const search: { size?: string; city?: string; budget?: string } = {};
    if (size) search.size = size;
    if (city.trim()) search.city = city.trim();
    if (budget) search.budget = budget;
    void navigate({ to: "/rent-a-booth", search, hash: "catalog" });
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-black/70 backdrop-blur p-5 md:p-6 max-w-3xl">
      <div className="text-[11px] uppercase tracking-[0.24em] text-[oklch(0.78_0.13_300)]">
        Find your booth
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="relative">
          <label className="block text-[11px] uppercase tracking-[0.18em] text-white/50 mb-1.5" htmlFor="finder-city">
            Show city
          </label>
          <input
            id="finder-city"
            value={city}
            onChange={(e) => {
              setTouched(true);
              setCity(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              blurTimer.current = setTimeout(() => setOpen(false), 120);
            }}
            placeholder="Start typing — e.g. Las Vegas"
            autoComplete="off"
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
          />
          {open && suggestions.length > 0 && (
            <ul className="absolute z-20 mt-1 w-full max-h-56 overflow-auto rounded-xl border border-white/15 bg-black/95 backdrop-blur py-1 text-sm shadow-2xl">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      if (blurTimer.current) clearTimeout(blurTimer.current);
                      setTouched(true);
                      setCity(s);
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] text-white/50 mb-1.5" htmlFor="finder-size">
            Booth size
          </label>
          <select
            id="finder-size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
          >
            <option value="">Any footprint</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {fmtSize(s)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] text-white/50 mb-1.5" htmlFor="finder-budget">
            Budget <span className="normal-case tracking-normal text-white/35">(optional)</span>
          </label>
          <select
            id="finder-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
          >
            <option value="">Not sure yet</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={submit}
          className="bg-[oklch(0.78_0.13_300)] text-black px-7 py-3.5 rounded-xl font-semibold hover:opacity-90"
        >
          Show {matches} matching design{matches === 1 ? "" : "s"} →
        </button>
        {price?.priced && (
          <p className="text-sm text-white/60">
            {fmtSize(size)}
            {city ? ` in ${city}` : ""}: rent {price.rentRange} · buy from {price.buyLabel}
          </p>
        )}
      </div>
      <p className="mt-3 text-[11px] text-white/40">
        Starting ranges include design, fabrication, graphics and install &amp; dismantle. Freight, drayage and show
        services are quoted separately.
      </p>
    </div>
  );
}
