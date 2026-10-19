import { SHOWS, showUrlSlug, type Show } from "@/data/shows";
import { SHOW_SECTORS, SHOW_SECTOR_MAP, type ShowSector } from "@/data/show-sectors";
import { getCity, cityUrlSlug } from "@/data/cities";
import { getVenue, venueUrlSlug } from "@/data/venues";
import { occurrencesFor, nextOccurrence, type ShowOccurrence } from "@/lib/show-calendar";

export type HubKind = "sector" | "city" | "country" | "combo";

export type DirectoryHub = {
  kind: HubKind;
  /** Public slug under /trade-shows/<slug> */
  slug: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  /** Two to three sentences of genuinely hub-specific copy. */
  intro: string;
  shows: Show[];
  sector?: ShowSector;
  citySlug?: string;
  cityName?: string;
  country?: "US" | "CA";
};

const MIN_SHOWS = 3;
const MAX_COMBOS = 40;

const cityNameFor = (citySlug: string): string =>
  SHOWS.find((s) => s.citySlug === citySlug)?.city ?? citySlug;

const listNames = (shows: Show[], n = 4) =>
  shows
    .slice(0, n)
    .map((s) => s.shortName)
    .join(", ");

const sectorsOf = (s: Show): string[] => s.sectorSlugs ?? [];

/* ------------------------------------------------------------------ *
 * Sector hubs — /trade-shows/technology-trade-shows
 * ------------------------------------------------------------------ */
function sectorHubs(): DirectoryHub[] {
  return SHOW_SECTORS.map((sector) => {
    const shows = SHOWS.filter((s) => sectorsOf(s).includes(sector.slug));
    if (shows.length < MIN_SHOWS) return null;
    const cities = Array.from(new Set(shows.map((s) => s.city)));
    return {
      kind: "sector" as const,
      slug: `${sector.slug}-trade-shows`,
      h1: `${sector.label} trade shows — booth rentals and custom builds`,
      metaTitle: `${sector.label} Trade Shows: Booth Rentals | Traction X`,
      metaDesc: `${shows.length} ${sector.plural} across ${cities.length} cities, with booth rental pricing, move-in realities and lead times for each. Custom exhibit rentals from Traction X.`,
      eyebrow: "Sector directory",
      intro: `${sector.blurb} We track ${shows.length} ${sector.plural} across ${cities.length} North American cities — ${listNames(shows)} among them — and we build and rent the booths that go on those floors.`,
      shows,
      sector,
    };
  }).filter(Boolean) as DirectoryHub[];
}

/* ------------------------------------------------------------------ *
 * City hubs — /trade-shows/trade-shows-in-chicago
 * ------------------------------------------------------------------ */
function cityHubs(): DirectoryHub[] {
  const bySlug = new Map<string, Show[]>();
  for (const s of SHOWS) {
    const list = bySlug.get(s.citySlug) ?? [];
    list.push(s);
    bySlug.set(s.citySlug, list);
  }

  return Array.from(bySlug.entries())
    .filter(([, shows]) => shows.length >= MIN_SHOWS)
    .map(([citySlug, shows]) => {
      const cityName = shows[0].city;
      const venues = Array.from(new Set(shows.map((s) => s.venueSlug)))
        .map((v) => getVenue(v)?.shortName)
        .filter(Boolean) as string[];
      return {
        kind: "city" as const,
        slug: `trade-shows-in-${citySlug}`,
        h1: `Trade shows in ${cityName} — full calendar and booth rentals`,
        metaTitle: `Trade Shows in ${cityName}: Calendar + Booth Rentals`,
        metaDesc: `Every major ${cityName} trade show we cover — ${shows.length} events across ${venues.length || 1} venue${venues.length === 1 ? "" : "s"} — with dates, move-in notes and custom booth rental pricing from Traction X.`,
        eyebrow: "City directory",
        intro: `${cityName} runs ${shows.length} of the shows we work${venues.length ? `, across ${venues.slice(0, 3).join(", ")}` : ""}. Each listing below carries the dates, the labour jurisdiction and the booking window that actually governs your build — and we rent and fabricate the booths for every one of them.`,
        shows,
        citySlug,
        cityName,
      };
    })
    .sort((a, b) => b.shows.length - a.shows.length);
}

/* ------------------------------------------------------------------ *
 * Country hubs
 * ------------------------------------------------------------------ */
function countryHubs(): DirectoryHub[] {
  const defs: { country: "US" | "CA"; slug: string; name: string }[] = [
    { country: "US", slug: "trade-shows-in-the-united-states", name: "the United States" },
    { country: "CA", slug: "trade-shows-in-canada", name: "Canada" },
  ];
  return defs.map(({ country, slug, name }) => {
    const shows = SHOWS.filter((s) => s.country === country);
    const cities = Array.from(new Set(shows.map((s) => s.city)));
    return {
      kind: "country" as const,
      slug,
      h1: `Trade shows in ${name} — booth rentals city by city`,
      metaTitle: `Trade Shows in ${name === "the United States" ? "the USA" : name} | Traction X`,
      metaDesc: `${shows.length} trade shows across ${cities.length} cities in ${name}, with dates, venues and custom booth rental pricing. One team for design, fabrication and I&D.`,
      eyebrow: "Country directory",
      intro: `We cover ${shows.length} shows in ${cities.length} ${name === "Canada" ? "Canadian" : "US"} cities. ${
        country === "CA"
          ? "We are Canadian-built, so cross-border freight, customs brokerage and provincial labour rules are handled in-house rather than subcontracted."
          : "Our crews work US floors weekly, so Teamsters, IATSE and Carpenters jurisdictions are priced into the quote before you sign anything."
      }`,
      shows,
      country,
    };
  });
}

/* ------------------------------------------------------------------ *
 * Sector × city combos — capped, only where real depth exists
 * ------------------------------------------------------------------ */
function comboHubs(): DirectoryHub[] {
  const combos: DirectoryHub[] = [];

  for (const sector of SHOW_SECTORS) {
    const sectorShows = SHOWS.filter((s) => sectorsOf(s).includes(sector.slug));
    const byCity = new Map<string, Show[]>();
    for (const s of sectorShows) {
      const list = byCity.get(s.citySlug) ?? [];
      list.push(s);
      byCity.set(s.citySlug, list);
    }
    for (const [citySlug, shows] of byCity) {
      if (shows.length < MIN_SHOWS) continue;
      const cityName = shows[0].city;
      combos.push({
        kind: "combo",
        slug: `${sector.slug}-trade-shows-in-${citySlug}`,
        h1: `${sector.label} trade shows in ${cityName}`,
        metaTitle: `${sector.label} Trade Shows in ${cityName} | Traction X`,
        metaDesc: `${shows.length} ${sector.plural} in ${cityName} with dates, venues and custom booth rental pricing — ${listNames(shows, 3)}.`,
        eyebrow: `${cityName} · ${sector.label}`,
        intro: `${cityName} hosts ${shows.length} of the ${sector.plural} we work. ${sector.blurb} Everything below is a show we can quote, build, ship and install without handing you off to a third party.`,
        shows,
        sector,
        citySlug,
        cityName,
      });
    }
  }

  return combos.sort((a, b) => b.shows.length - a.shows.length).slice(0, MAX_COMBOS);
}

export const DIRECTORY_HUBS: DirectoryHub[] = [
  ...countryHubs(),
  ...sectorHubs(),
  ...cityHubs(),
  ...comboHubs(),
];

export const HUB_MAP: Record<string, DirectoryHub> = Object.fromEntries(
  DIRECTORY_HUBS.map((h) => [h.slug, h]),
);

export const getHub = (slug: string) => HUB_MAP[slug];

export const hubsOfKind = (kind: HubKind) => DIRECTORY_HUBS.filter((h) => h.kind === kind);

/* ------------------------------------------------------------------ *
 * Related-link helpers used by show / city / venue pages
 * ------------------------------------------------------------------ */

export type DirectoryLink = { label: string; href: string; note?: string };

export function sectorLinksForShow(show: Show): DirectoryLink[] {
  return sectorsOf(show)
    .map((slug) => SHOW_SECTOR_MAP[slug])
    .filter(Boolean)
    .map((sector) => ({
      label: `${sector.label} trade shows`,
      href: `/trade-shows/${sector.slug}-trade-shows`,
    }))
    .filter((l) => Boolean(getHub(l.href.replace("/trade-shows/", ""))));
}

export function cityHubLink(citySlug: string): DirectoryLink | undefined {
  const hub = getHub(`trade-shows-in-${citySlug}`);
  if (!hub) return undefined;
  return {
    label: `All trade shows in ${hub.cityName}`,
    href: `/trade-shows/${hub.slug}`,
    note: `${hub.shows.length} shows`,
  };
}

export function sameVenueShows(show: Show, limit = 6): Show[] {
  return SHOWS.filter((s) => s.venueSlug === show.venueSlug && s.slug !== show.slug).slice(0, limit);
}

export function sameSectorShows(show: Show, limit = 6): Show[] {
  const sectors = sectorsOf(show);
  if (!sectors.length) return [];
  return SHOWS.filter(
    (s) => s.slug !== show.slug && sectorsOf(s).some((x) => sectors.includes(x)),
  ).slice(0, limit);
}

export function showsInCity(citySlug: string, limit?: number): Show[] {
  const list = SHOWS.filter((s) => s.citySlug === citySlug);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function showsAtVenue(venueSlug: string, limit?: number): Show[] {
  const list = SHOWS.filter((s) => s.venueSlug === venueSlug);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function showHref(show: Show) {
  return `/shows/${showUrlSlug(show.slug)}`;
}

export function cityPageHref(citySlug: string): string | undefined {
  return getCity(citySlug) ? `/city/${cityUrlSlug(citySlug)}` : undefined;
}

export function venuePageHref(venueSlug: string): string | undefined {
  return getVenue(venueSlug) ? `/venues/${venueUrlSlug(venueSlug)}` : undefined;
}

/** Next dated edition for a show, used across hub cards. */
export function nextEdition(show: Show): ShowOccurrence | undefined {
  return nextOccurrence(show);
}

export function editionCount(show: Show): number {
  return occurrencesFor(show).length;
}
