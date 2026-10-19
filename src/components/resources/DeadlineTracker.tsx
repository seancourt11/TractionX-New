import { useMemo, useState } from "react";
import { COUNTDOWN_STEPS } from "@/components/ShowCountdown";
import { QuoteButton, BookMeetingButton } from "@/components/GlobalCta";

/** Additional show-services deadlines that sit alongside the build schedule. */
const SERVICE_STEPS: { weeks: number; label: string; detail: string }[] = [
  { weeks: 18, label: "Exhibitor manual downloaded", detail: "Read the labour, height and rigging rules before design is approved." },
  { weeks: 14, label: "Hotel room block booked", detail: "Block rates disappear first at large shows; rack rates run 40–80% higher." },
  { weeks: 7, label: "Lead retrieval ordered", detail: "Devices and licences sell out at big shows, and on-site pricing is worse." },
  { weeks: 3, label: "Staff briefed and shifts published", detail: "Roles, scripts, qualifying questions and follow-up ownership agreed." },
];

type Step = { weeks: number; label: string; detail: string; kind: "build" | "services" };

const ALL: Step[] = [
  ...COUNTDOWN_STEPS.map((s) => ({ ...s, kind: "build" as const })),
  ...SERVICE_STEPS.map((s) => ({ ...s, kind: "services" as const })),
].sort((a, b) => b.weeks - a.weeks);

function dateFor(iso: string, weeks: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - weeks * 7);
  return d;
}

const fmt = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

const icsStamp = (d: Date) =>
  `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;

/**
 * Back-calculates every exhibitor deadline from a show date and exports the
 * schedule as an .ics file the visitor can drop into their calendar.
 */
export function DeadlineTracker({ initialDate = "", showName = "" }: { initialDate?: string; showName?: string }) {
  const [date, setDate] = useState(initialDate);
  const [name, setName] = useState(showName);

  const rows = useMemo(() => {
    if (!date) return [];
    const today = new Date();
    return ALL.map((s) => {
      const d = dateFor(date, s.weeks);
      const daysAway = Math.round((d.getTime() - today.getTime()) / 86_400_000);
      return { ...s, date: d, past: daysAway < 0, daysAway };
    });
  }, [date]);

  function downloadIcs() {
    const label = name.trim() || "our show";
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Traction X//Exhibitor Deadlines//EN",
      "CALSCALE:GREGORIAN",
      ...rows.flatMap((r) => [
        "BEGIN:VEVENT",
        `UID:txd-${r.weeks}-${icsStamp(r.date)}@tractionx.ca`,
        `DTSTAMP:${icsStamp(new Date())}T090000Z`,
        `DTSTART;VALUE=DATE:${icsStamp(r.date)}`,
        `SUMMARY:${r.label} — ${label}`,
        `DESCRIPTION:${r.detail.replace(/,/g, "\\,")}`,
        "END:VEVENT",
      ]),
      "END:VCALENDAR",
    ];
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "traction-x-exhibitor-deadlines.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">Interactive tracker</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
          Your deadlines, back-calculated
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Enter the first day of your show. Every order-by date below is derived from it — then export
          the lot to your calendar.
        </p>

        <div className="mt-7 grid sm:grid-cols-2 gap-4 max-w-2xl">
          <label className="block">
            <span className="block text-xs uppercase tracking-[0.18em] text-white/50 mb-2">Show opens</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-white focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="block text-xs uppercase tracking-[0.18em] text-white/50 mb-2">Show name (optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. CES 2027"
              className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-white/30 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
            />
          </label>
        </div>

        {rows.length > 0 ? (
          <>
            <ol className="mt-10 space-y-3">
              {rows.map((r) => (
                <li
                  key={`${r.kind}-${r.weeks}-${r.label}`}
                  className={`rounded-2xl border p-5 transition ${
                    r.past
                      ? "border-white/8 bg-black/20 opacity-50"
                      : "border-white/12 bg-black/40"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[oklch(0.82_0.13_300)]">
                        {r.weeks === 0 ? "Show open" : `${r.weeks} weeks out`}
                      </span>
                      <h3 className="font-semibold text-white/90">{r.label}</h3>
                    </div>
                    <span className="text-sm text-white/60 tabular-nums">
                      {fmt(r.date)}
                      {!r.past && r.daysAway >= 0 && (
                        <span className="text-white/35"> · in {r.daysAway} days</span>
                      )}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{r.detail}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={downloadIcs}
                className="rounded-xl bg-[oklch(0.78_0.13_300)] px-6 py-3 font-semibold text-black hover:opacity-90"
              >
                Add all deadlines to my calendar
              </button>
              <QuoteButton source="resource-deadline-tracker" label="Have us run this schedule" variant="outline" />
              <BookMeetingButton source="resource-deadline-tracker" />
            </div>
          </>
        ) : (
          <p className="mt-8 text-sm text-white/45">Pick a show date to generate the schedule.</p>
        )}
      </div>
    </section>
  );
}
