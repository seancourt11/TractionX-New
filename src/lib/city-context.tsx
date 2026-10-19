import { useEffect, useState } from "react";
import { CITIES as CITY_DATA, cityUrlSlug } from "@/data/cities";

// ---------------------------------------------------------------------------
// City registry
// ---------------------------------------------------------------------------

export type CitySlug = string;

export interface CityConfig {
  slug: CitySlug;
  label: string;
  venues: string[];
  ribbonText: string;
  ctaText: string;
  contactHeading: string;
  href: string;
  footerBlurb: string;
}

const BESPOKE: Record<string, CityConfig> = {
  "las-vegas": {
    slug: "las-vegas",
    label: "Las Vegas",
    venues: ["LVCC", "Mandalay Bay", "Venetian Expo", "Caesars Forum"],
    ribbonText: "Serving Las Vegas exhibitors",
    ctaText: "Get a Las Vegas quote",
    contactHeading: "Request a Las Vegas quote",
    href: "/las-vegas-modular-trade-show-booth-rentals",
    footerBlurb:
      "Trusted partner for exhibitors at LVCC, Mandalay Bay, Venetian Expo and Caesars Forum.",
  },
  vancouver: {
    slug: "vancouver",
    label: "Vancouver",
    venues: ["Vancouver Convention Centre", "Web Summit Vancouver"],
    ribbonText: "Serving Vancouver & Web Summit exhibitors",
    ctaText: "Get a Vancouver quote",
    contactHeading: "Request a Vancouver quote",
    href: "/web-summit-vancouver-booth-rentals",
    footerBlurb:
      "Preferred rental partner for Web Summit Vancouver and Vancouver Convention Centre shows.",
  },
};

/** Every city page on the site — bespoke landing pages plus the /city/$slug registry. */
export const CITIES: Record<string, CityConfig> = (() => {
  const out: Record<string, CityConfig> = {};
  for (const c of CITY_DATA) {
    const venues = c.venues.slice(0, 4).map((v) => v.name);
    out[c.slug] = {
      slug: c.slug,
      label: c.city,
      venues,
      ribbonText: `Serving ${c.city} exhibitors`,
      ctaText: `Get a ${c.city} quote`,
      contactHeading: `Request a ${c.city} quote`,
      href: `/city/${cityUrlSlug(c.slug)}`,
      footerBlurb: venues.length
        ? `Design, fabrication, install and on-site PM at ${venues.slice(0, 3).join(", ")} and every major ${c.city} venue.`
        : `Custom exhibit rentals, install and on-site project management across ${c.city}.`,
    };
  }
  for (const [slug, cfg] of Object.entries(BESPOKE)) {
    out[slug] = { ...out[slug], ...cfg };
  }
  return out;
})();


// ---------------------------------------------------------------------------
// Storage — client-only, SSR-safe
// ---------------------------------------------------------------------------

const STORAGE_KEY = "tx.cityContext.v1";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const EVENT = "tx:cityContextChange";

interface Stored {
  slug: CitySlug;
  ts: number;
}

function readStored(): CityConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed?.slug || !CITIES[parsed.slug]) return null;
    if (Date.now() - (parsed.ts ?? 0) > TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return CITIES[parsed.slug];
  } catch {
    return null;
  }
}

function writeStored(slug: CitySlug) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ slug, ts: Date.now() } satisfies Stored)
    );
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* ignore */
  }
}

function clearStored() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* ignore */
  }
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Returns the visitor's current "session city" — or null during SSR / before
 * hydration / when unset. Personalized UI must always render a neutral
 * fallback when this is null so Googlebot's rendered HTML stays canonical.
 */
export function useCityContext(): CityConfig | null {
  const [city, setCity] = useState<CityConfig | null>(null);

  useEffect(() => {
    setCity(readStored());
    const onChange = () => setCity(readStored());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return city;
}

/** Call from a city page's component to remember the visitor's city. */
export function useMarkCityVisit(slug: CitySlug) {
  useEffect(() => {
    if (slug && CITIES[slug]) writeStored(slug);
  }, [slug]);
}

/** Resolve a free-text city name ("Las Vegas", "las vegas, NV") to a config. */
export function findCityByLabel(input: string | null | undefined): CityConfig | null {
  if (!input) return null;
  const n = input.trim().toLowerCase().split(",")[0]!.trim();
  if (!n) return null;
  if (CITIES[n]) return CITIES[n];
  for (const cfg of Object.values(CITIES)) {
    if (cfg.label.toLowerCase() === n) return cfg;
  }
  return null;
}

/**
 * Imperatively set the session city — used by the booth finder, venue and show
 * pages, and `?city=` links so the whole site speaks the visitor's market.
 */
export function setCityContext(input: string | null | undefined) {
  const cfg = findCityByLabel(input);
  if (cfg) writeStored(cfg.slug);
}

/**
 * The visitor's city name, or `fallback` during SSR / before hydration.
 * Use for headline and form personalization — never for canonical content.
 */
export function useCityLabel(fallback = ""): string {
  const city = useCityContext();
  return city?.label ?? fallback;
}

// ---------------------------------------------------------------------------
// Ribbon
// ---------------------------------------------------------------------------

export function CityRibbon() {
  const city = useCityContext();
  if (!city) return null;

  return (
    <div className="w-full bg-[oklch(0.78_0.13_300)] text-black">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4 text-xs md:text-sm font-medium">
        <div className="flex items-center gap-2 min-w-0">
          <span aria-hidden>📍</span>
          <span className="truncate">
            {city.ribbonText} —{" "}
            <a href={city.href} className="underline underline-offset-2 hover:no-underline">
              see our {city.label} services
            </a>
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a href="tel:+17824092527" className="hidden sm:inline hover:underline">
            {city.label} project line: +1-782-409-2527
          </a>
          <button
            type="button"
            onClick={clearStored}
            aria-label="Dismiss location banner"
            className="opacity-70 hover:opacity-100 text-base leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Footer block
// ---------------------------------------------------------------------------

export function CityFooterBlock() {
  const city = useCityContext();
  if (!city) return null;

  return (
    <div className="border-t border-white/10 bg-[oklch(0.78_0.13_300)]/[0.08]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="text-white/85">
          <span className="font-semibold text-white">Serving {city.label}.</span>{" "}
          {city.footerBlurb}
        </div>
        <a
          href={city.href}
          className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-white hover:bg-white/10 whitespace-nowrap"
        >
          {city.label} services →
        </a>
      </div>
    </div>
  );
}
