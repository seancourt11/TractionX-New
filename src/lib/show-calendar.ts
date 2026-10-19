import { SHOWS, showUrlSlug, type Show } from "@/data/shows";
import { editionsFor, type ShowEdition } from "@/data/show-editions";

export type ShowOccurrence = {
  show: Show;
  start: Date;
  end: Date;
  /** e.g. "CES 2027" */
  label: string;
  /** Host city for this edition (rotating shows can differ from show.city). */
  city: string;
  href: string;
};

export const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

export type MonthSlug = (typeof MONTHS)[number];

export const monthLabel = (m: string) => m.charAt(0).toUpperCase() + m.slice(1);

export const monthIndex = (slug: string) => MONTHS.indexOf(slug as MonthSlug);

/** Parses "2027-01-06" without timezone drift. */
function parseISO(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function toOccurrence(show: Show, e: ShowEdition): ShowOccurrence | null {
  const start = parseISO(e.start);
  const end = parseISO(e.end) ?? start;
  if (!start || !end) return null;
  return {
    show,
    start,
    end,
    label: e.label,
    city: e.city ?? show.city,
    href: `/shows/${showUrlSlug(show.slug)}`,
  };
}

/** Every dated edition we know about for a show, chronological. */
export function occurrencesFor(show: Show): ShowOccurrence[] {
  const editions = editionsFor(show.slug);
  const list: ShowOccurrence[] = [];

  for (const e of editions) {
    const occ = toOccurrence(show, e);
    if (occ) list.push(occ);
  }

  if (!list.length && show.startDate) {
    const occ = toOccurrence(show, {
      start: show.startDate,
      end: show.endDate ?? show.startDate,
      label: `${show.shortName} ${show.editionYear ?? new Date(show.startDate).getFullYear()}`,
    });
    if (occ) list.push(occ);
  }

  return list.sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** Flat, chronological list of every known edition across the directory. */
export const ALL_OCCURRENCES: ShowOccurrence[] = SHOWS.flatMap(occurrencesFor).sort(
  (a, b) => a.start.getTime() - b.start.getTime(),
);

/** Editions that have not finished yet. */
export function upcomingOccurrences(from: Date = new Date()): ShowOccurrence[] {
  const cutoff = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return ALL_OCCURRENCES.filter((o) => o.end.getTime() >= cutoff.getTime());
}

export function occurrencesInYear(year: number): ShowOccurrence[] {
  return ALL_OCCURRENCES.filter((o) => o.start.getFullYear() === year);
}

export function occurrencesInMonth(year: number, month: MonthSlug): ShowOccurrence[] {
  const idx = monthIndex(month);
  if (idx < 0) return [];
  return ALL_OCCURRENCES.filter(
    (o) => o.start.getFullYear() === year && o.start.getMonth() === idx,
  );
}

/** Years that actually have editions — drives the calendar routes and sitemap. */
export const CALENDAR_YEARS: number[] = Array.from(
  new Set(ALL_OCCURRENCES.map((o) => o.start.getFullYear())),
).sort((a, b) => a - b);

/** Year → months (slugs) that contain at least one edition. */
export const CALENDAR_MONTHS: { year: number; month: MonthSlug; count: number }[] =
  CALENDAR_YEARS.flatMap((year) =>
    MONTHS.map((month) => ({ year, month, count: occurrencesInMonth(year, month).length })).filter(
      (m) => m.count > 0,
    ),
  );

export function formatRange(o: ShowOccurrence): string {
  const sameMonth =
    o.start.getMonth() === o.end.getMonth() && o.start.getFullYear() === o.end.getFullYear();
  const monthName = (d: Date) => monthLabel(MONTHS[d.getMonth()]);
  if (sameMonth) {
    if (o.start.getDate() === o.end.getDate()) {
      return `${monthName(o.start)} ${o.start.getDate()}, ${o.start.getFullYear()}`;
    }
    return `${monthName(o.start)} ${o.start.getDate()}–${o.end.getDate()}, ${o.start.getFullYear()}`;
  }
  return `${monthName(o.start)} ${o.start.getDate()} – ${monthName(o.end)} ${o.end.getDate()}, ${o.end.getFullYear()}`;
}

export function isoDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Days until a show opens; negative once it has started. */
export function daysUntil(o: ShowOccurrence, from: Date = new Date()): number {
  const ms = o.start.getTime() - new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
  return Math.round(ms / 86_400_000);
}

/** Next edition of a given show, if any. */
export function nextOccurrence(show: Show, from: Date = new Date()): ShowOccurrence | undefined {
  return occurrencesFor(show).find(
    (o) => o.end.getTime() >= new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime(),
  );
}
