import { useEffect, useMemo, useRef, useState } from "react";
import { useCityContext } from "@/lib/city-context";
import { Link } from "@tanstack/react-router";
import { RENTAL_BOOTHS, RENTAL_SIZES, type RentalBooth } from "@/data/rental-booths";
import { CITIES } from "@/data/cities";
import { CITY_SUGGESTIONS } from "@/lib/place-suggest";
import { QuoteModal, ESTIMATE_DISCLAIMER, type QuoteMode } from "@/components/QuoteModal";
import { QuoteButton } from "@/components/GlobalCta";
import { ShortlistButton } from "@/components/ShortlistButton";
import { boothPrice } from "@/lib/booth-pricing";

/** Starting rent/buy line shown on every design card, shaded by show city. */
export function BoothPriceLine({ size, city }: { size: string; city?: string }) {
  const p = boothPrice(size, city);
  if (!p.priced) {
    return <div className="mt-2 text-sm text-white/70">Priced on request — scoped to your plan.</div>;
  }
  return (
    <div className="mt-2 text-sm">
      <span className="font-semibold text-white">Rent {p.rentRange}</span>
      <span className="text-white/50"> · Buy from {p.buyLabel}</span>
      {city && p.index !== 1 && (
        <span className="block text-[11px] text-white/40 mt-0.5">
          Adjusted for {city} ({p.index > 1 ? "+" : ""}
          {Math.round((p.index - 1) * 100)}%)
        </span>
      )}
    </div>
  );
}

const PAGE = 24;

const CITY_OPTIONS = Array.from(
  new Set([
    ...CITY_SUGGESTIONS.map((c) => c.value),
    ...CITIES.map((c) => c.city),
    ...RENTAL_BOOTHS.flatMap((b) => b.cities),
  ]),
).sort();

function label(size: string) {
  return size === "Custom" || size === "Larger" ? size : `${size.replace("x", " × ")} ft`;
}

export function RentalCatalog({
  initialSize = "",
  initialCity = "",
  heading = "Rent a booth by size",
  intro = "Every design below is a 100% custom rental — we rebrand, reconfigure and rebuild it around your goals. Toggle a footprint, choose your show city, then customize further with millwork, AV, lighting and storage.",
  showQuotePaths = true,
}: {
  initialSize?: string;
  /** Pre-select a show city (venue, city and show pages pass their own city). */
  initialCity?: string;
  heading?: string;
  intro?: string;
  showQuotePaths?: boolean;
}) {
  const cityCtx = useCityContext();
  const [size, setSize] = useState(initialSize);
  const [city, setCity] = useState(initialCity);
  const [cityTouched, setCityTouched] = useState(false);
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const [quote, setQuote] = useState<{ mode: QuoteMode; booth?: RentalBooth } | null>(null);

  // Pre-select the visitor's city when they arrived from one of our city pages.
  useEffect(() => {
    if (cityTouched || initialCity || !cityCtx) return;
    if (CITY_OPTIONS.includes(cityCtx.label)) setCity(cityCtx.label);
  }, [cityCtx, cityTouched, initialCity]);

  const chooseCity = (v: string) => {
    setCityTouched(true);
    setCity(v);
    setLimit(PAGE);
  };

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    // City is a delivery market, not an inventory filter — every design ships and
    // installs anywhere we serve, so it drives copy and pricing, never exclusions.
    return RENTAL_BOOTHS.filter(
      (b) =>
        (!size || b.size === size) &&
        (!needle || b.name.toLowerCase().includes(needle) || b.code.toLowerCase().includes(needle)),
    );
  }, [size, q]);


  const shown = results.slice(0, limit);

  const openQuote = (mode: QuoteMode, booth?: RentalBooth) => setQuote({ mode, booth });

  return (
    <div>
      <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-6 md:p-10">
        <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">{heading}</h2>
        <p className="mt-3 text-white/65 max-w-3xl md:text-lg">{intro}</p>
        <p className="mt-2 text-xs text-white/45">
          {RENTAL_BOOTHS.length} custom rental designs in the catalog
          {cityCtx ? ` — delivered and installed in ${cityCtx.label}` : ""}.
        </p>

        {/* Size toggles */}
        <div className="mt-8">
          <span className="block text-xs md:text-sm uppercase tracking-[0.24em] text-white/70 mb-3 font-semibold">
            1 · Booth size
          </span>
          <div className="flex flex-wrap gap-2.5">
            <SizeChip active={size === ""} onClick={() => { setSize(""); setLimit(PAGE); }}>
              All sizes
            </SizeChip>
            {RENTAL_SIZES.map((s) => (
              <SizeChip key={s} active={size === s} onClick={() => { setSize(s); setLimit(PAGE); }}>
                {label(s)}
              </SizeChip>
            ))}
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <Field label="2 · Show city">
            <CityTypeahead value={city} onChange={chooseCity} />
            {cityCtx && city === cityCtx.label && !cityTouched && (
              <span className="mt-2 block text-xs text-[oklch(0.78_0.13_300)]">
                Pre-selected from your {cityCtx.label} visit — change it anytime.
              </span>
            )}
          </Field>
          <Field label="3 · Search designs">
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setLimit(PAGE);
              }}
              placeholder="Design name or code"
              className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-4 text-base md:text-lg placeholder:text-white/30 placeholder:font-normal font-semibold focus:outline-none focus:border-[oklch(0.78_0.13_300)] hover:border-white/35 transition"
            />
          </Field>
        </div>

        {showQuotePaths && (
          <>
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="relative rounded-xl border-2 border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 p-5">
                <span className="absolute -top-2.5 left-5 bg-[oklch(0.78_0.13_300)] text-black text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded">
                  Recommended · fastest
                </span>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">Instant quote</h3>
                <p className="mt-1 text-sm text-white/70">
                  See your price range on screen right away. Takes 20 seconds — email and phone so a designer can confirm and customize further.
                </p>
                <button
                  type="button"
                  onClick={() => openQuote("instant")}
                  className="mt-4 w-full bg-[oklch(0.78_0.13_300)] text-black px-5 py-3 rounded-lg font-semibold hover:opacity-90"
                >
                  Get my instant quote →
                </button>
              </div>
              <div className="rounded-xl border border-white/12 bg-white/[0.02] p-5">
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">Email me a quote</h3>
                <p className="mt-1 text-sm text-white/70">
                  Prefer email? Pick a size, drop your address, and we&apos;ll send a tailored custom-rental quote within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => openQuote("email")}
                  className="mt-4 w-full border border-white/20 px-5 py-3 rounded-lg font-semibold hover:bg-white/5"
                >
                  Request a quote by email
                </button>
              </div>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-white/40">{ESTIMATE_DISCLAIMER}</p>
          </>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <span className="text-sm text-white/70">
            Showing <strong className="text-white">{shown.length}</strong> of {results.length} custom rental designs
            {size ? ` at ${label(size)}` : ""}
            {city ? ` — delivered and installed in ${city}` : ""}. Every one is rebranded and can be customized further.
          </span>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openQuote("instant")}
              className="px-5 py-2.5 rounded-xl bg-[oklch(0.78_0.13_300)] text-black text-sm font-semibold hover:opacity-90"
            >
              Instant quote →
            </button>
            <button
              type="button"
              onClick={() => {
                setSize("");
                setCityTouched(true);
                setCity("");
                setQ("");
                setLimit(PAGE);
              }}
              className="px-4 py-2.5 rounded-xl border border-white/20 text-sm hover:bg-white/5"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>


      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((b) => (
          <BoothCard key={b.slug} booth={b} city={city} onQuote={openQuote} />
        ))}
        {results.length === 0 && (
          <div className="col-span-full text-center py-16 border border-dashed border-white/15 rounded-2xl text-white/60">
            No designs match that search.{" "}
            <Link to="/contact" className="text-[oklch(0.78_0.13_300)] underline">
              Ask us to build one
            </Link>
            .
          </div>
        )}
      </div>

      {limit < results.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="px-8 py-3 rounded-xl border border-white/20 font-semibold hover:bg-white/5"
          >
            Load more designs
          </button>
        </div>
      )}

      <QuoteModal
        open={quote !== null}
        onOpenChange={(v) => !v && setQuote(null)}
        mode={quote?.mode ?? "instant"}
        boothName={quote?.booth?.name}
        boothSize={quote?.booth?.size ?? size}
        city={city}
      />
    </div>
  );
}

function SizeChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "px-5 py-2.5 rounded-full text-base font-bold bg-[oklch(0.78_0.13_300)] text-black shadow-[0_0_24px_-6px_oklch(0.78_0.13_300)]"
          : "px-5 py-2.5 rounded-full text-base font-semibold border border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40 transition"
      }
    >
      {children}
    </button>
  );
}


export function BoothCard({
  booth,
  city,
  onQuote,
}: {
  booth: RentalBooth;
  city?: string;
  onQuote?: (mode: QuoteMode, booth?: RentalBooth) => void;
}) {
  return (
    <article className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-[oklch(0.78_0.13_300)] transition">
      <Link to="/rent-booth/$slug" params={{ slug: booth.slug }} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-black">
          <img
            src={booth.image}
            alt={`${booth.name} ${label(booth.size)} trade show booth rental${city ? ` in ${city}` : ""}`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight">{booth.name}</h3>
          <span className="shrink-0 text-[11px] uppercase tracking-widest text-[oklch(0.78_0.13_300)]">
            {label(booth.size)}
          </span>
        </div>
        <div className="mt-1 text-white/50 text-xs tracking-widest uppercase">{booth.code}</div>
        <BoothPriceLine size={booth.size} city={city} />
        <p className="mt-2 text-xs text-white/50">100% custom — rent it or buy it, same design and build quality. Install &amp; dismantle included.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            to="/rent-booth/$slug"
            params={{ slug: booth.slug }}
            className="text-sm text-[oklch(0.78_0.13_300)] group-hover:underline"
          >
            View booth →
          </Link>
          <ShortlistButton slug={booth.slug} />
          <Link
            to="/gallery"
            search={{ size: booth.size }}
            className="text-sm text-white/55 hover:text-white underline"
          >
            More {label(booth.size)} photos
          </Link>


          {onQuote ? (
            <>
              <button
                type="button"
                onClick={() => onQuote("instant", booth)}
                className="text-sm bg-[oklch(0.78_0.13_300)] text-black px-3 py-1.5 rounded-lg font-semibold hover:opacity-90"
              >
                Instant quote
              </button>
              <button
                type="button"
                onClick={() => onQuote("customize", booth)}
                className="text-sm border border-white/20 px-3 py-1.5 rounded-lg font-semibold hover:bg-white/5"
              >
                Customize this booth
              </button>
              <button
                type="button"
                onClick={() => onQuote("email", booth)}
                className="text-sm text-white/60 hover:text-white underline"
              >
                Email quote
              </button>
            </>
          ) : (
            <QuoteButton
              variant="ghost"
              label="Request a quote"
              booth={booth.name}
              size={booth.size}
              source="rental-card"
              className="text-sm"
            />
          )}
        </div>
      </div>
    </article>
  );
}

/** Type-to-filter city input with a live suggestion list drawn from the catalog. */
function CityTypeahead({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const matches = useMemo(() => {
    const needle = value.trim().toLowerCase();
    if (!needle) return CITY_OPTIONS.slice(0, 8);
    const starts = CITY_OPTIONS.filter((c) => c.toLowerCase().startsWith(needle));
    const contains = CITY_OPTIONS.filter(
      (c) => !c.toLowerCase().startsWith(needle) && c.toLowerCase().includes(needle),
    );
    return [...starts, ...contains].slice(0, 8);
  }, [value]);

  const visible = open && matches.length > 0;

  const pick = (c: string) => {
    onChange(c);
    setOpen(false);
    setActive(0);
  };

  return (
    <div className="relative">
      <input
        value={value}
        autoComplete="off"
        role="combobox"
        aria-expanded={visible}
        aria-autocomplete="list"
        placeholder="Start typing a city — e.g. Las Vegas"
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          blurTimer.current = setTimeout(() => setOpen(false), 120);
        }}
        onKeyDown={(e) => {
          if (!visible) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => (a + 1) % matches.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => (a - 1 + matches.length) % matches.length);
          } else if (e.key === "Enter") {
            e.preventDefault();
            pick(matches[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-4 text-base md:text-lg font-semibold placeholder:text-white/30 placeholder:font-normal focus:outline-none focus:border-[oklch(0.78_0.13_300)] hover:border-white/35 transition"
      />
      {value && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => pick("")}
          aria-label="Clear city"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 hover:text-white text-sm"
        >
          ✕
        </button>
      )}
      {visible && (
        <ul className="absolute z-30 mt-1 w-full max-h-64 overflow-auto rounded-xl border border-white/15 bg-black/95 backdrop-blur py-1 shadow-2xl">
          {matches.map((c, i) => (
            <li key={c}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (blurTimer.current) clearTimeout(blurTimer.current);
                }}
                onClick={() => pick(c)}
                onMouseEnter={() => setActive(i)}
                className={`w-full text-left px-4 py-2.5 text-sm ${i === active ? "bg-[oklch(0.78_0.13_300)]/20 text-white" : "text-white/75"}`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({ label: l, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.24em] text-white/60 mb-1.5">{l}</span>
      {children}
    </label>
  );
}


/** Prominent instant-quote band for placement in/near a page hero. */
export function InstantQuoteBar({ boothSize = "" }: { boothSize?: string }) {
  const cityCtx = useCityContext();
  const [mode, setMode] = useState<QuoteMode | null>(null);
  return (
    <div className="rounded-3xl border-2 border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 p-6 md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1">
          <span className="inline-block bg-[oklch(0.78_0.13_300)] text-black text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded">
            Recommended · fastest
          </span>
          <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold uppercase tracking-tight">
            Get an instant rental quote
          </h2>
          <p className="mt-2 text-white/75 max-w-2xl">
            See your price range on screen in about 20 seconds
            {cityCtx ? ` for your ${cityCtx.label} show` : ""}. Email and phone so a designer can confirm the details and
            customize the booth further — millwork, AV, lighting, storage.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:w-72 shrink-0">
          <button
            type="button"
            onClick={() => setMode("instant")}
            className="w-full bg-[oklch(0.78_0.13_300)] text-black px-6 py-4 rounded-xl text-lg font-semibold hover:opacity-90"
          >
            Get my instant quote →
          </button>
          <button
            type="button"
            onClick={() => setMode("email")}
            className="w-full border border-white/25 px-6 py-3 rounded-xl font-semibold hover:bg-white/5"
          >
            Email me a quote instead
          </button>
        </div>
      </div>
      <p className="mt-5 text-[11px] leading-relaxed text-white/45">{ESTIMATE_DISCLAIMER}</p>
      <QuoteModal
        open={mode !== null}
        onOpenChange={(v) => !v && setMode(null)}
        mode={mode ?? "instant"}
        boothSize={boothSize}
        city={cityCtx?.label ?? ""}
      />
    </div>
  );
}
