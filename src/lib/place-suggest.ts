import { CITIES } from "@/data/cities";
import { SHOWS } from "@/data/shows";

/**
 * Client-side typeahead data for the lead forms.
 *
 * Everything here is matched against data already bundled with the app — no
 * network calls and no third-party places API. Free text always remains valid;
 * suggestions are a convenience, never a constraint.
 */

export type SuggestKind = "city" | "show";

export type Suggestion = {
  kind: SuggestKind;
  /** Text written into the input when the entry is picked. */
  value: string;
  /** Secondary line shown in the dropdown. */
  hint: string;
  /** Data slug, stored in lead meta when picked. */
  slug: string;
  /** For shows: the host city, used to co-fill the city field. */
  city?: string;
  citySlug?: string;
  /** ISO start date when known, used to preselect a timeline chip. */
  startDate?: string;
  /** Lowercased haystack of aliases. */
  terms: string[];
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

/** Cities with bespoke landing pages that live outside the /city registry. */
const EXTRA_CITIES: Suggestion[] = [
  {
    kind: "city",
    value: "Las Vegas",
    hint: "Nevada, United States",
    slug: "las-vegas",
    citySlug: "las-vegas",
    terms: ["las vegas", "las vegas nv", "nevada", "vegas", "las-vegas"],
  },
];

export const CITY_SUGGESTIONS: Suggestion[] = [
  ...EXTRA_CITIES,
  ...CITIES.filter((c) => c.slug !== "las-vegas").map((c) => {
    const value = c.city;
    const hint = [c.state, c.countryName].filter(Boolean).join(", ");
    return {
      kind: "city" as const,
      value,
      hint,
      slug: c.slug,
      citySlug: c.slug,
      terms: [norm(c.city), norm(`${c.city} ${c.stateAbbr}`), norm(c.state), norm(c.slug)],
    };
  }),
];


export const SHOW_SUGGESTIONS: Suggestion[] = SHOWS.map((s) => ({
  kind: "show" as const,
  value: s.name,
  hint: [s.city, s.state, s.cadence].filter(Boolean).join(" · "),
  slug: s.slug,
  city: s.city,
  citySlug: s.citySlug,
  startDate: s.startDate,
  terms: [norm(s.name), norm(s.shortName), norm(s.slug), norm(`${s.name} ${s.city}`)],
}));

/**
 * Rank matches: exact match first, then prefix matches, then word-start,
 * then substring. Shorter names win ties so "las" surfaces Las Vegas first.
 */
function score(entry: Suggestion, q: string): number {
  let best = 0;
  for (const term of entry.terms) {
    if (!term) continue;
    let s = 0;
    if (term === q) s = 100;
    else if (term.startsWith(q)) s = 80;
    else if (term.includes(` ${q}`)) s = 60;
    else if (term.includes(q)) s = 30;
    if (s > best) best = s;
  }
  if (!best) return 0;
  return best - Math.min(entry.value.length, 40) / 100;
}

export function suggest(pool: Suggestion[], query: string, limit = 6): Suggestion[] {
  const q = norm(query);
  if (q.length < 2) return [];
  return pool
    .map((e) => ({ e, s: score(e, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.e);
}

export const suggestCities = (q: string, limit?: number) => suggest(CITY_SUGGESTIONS, q, limit);
export const suggestShows = (q: string, limit?: number) => suggest(SHOW_SUGGESTIONS, q, limit);

/** Exact (case-insensitive) lookup so typed-out names still capture a slug. */
export function matchExact(pool: Suggestion[], value: string): Suggestion | null {
  const q = norm(value);
  if (!q) return null;
  return pool.find((e) => e.terms.includes(q)) ?? null;
}

/** Map an ISO show date to one of the TIMELINE_OPTIONS values. */
export function timelineForDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  const days = (d.getTime() - Date.now()) / 86_400_000;
  if (days < 0) return null;
  if (days <= 30) return "Under 30 days";
  if (days <= 92) return "1–3 months";
  if (days <= 183) return "3–6 months";
  return "6+ months";
}
