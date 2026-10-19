import { useMemo, useState } from "react";
import { QuoteButton } from "@/components/GlobalCta";

/** Weeks before show open, with what has to be true by then. */
export const COUNTDOWN_STEPS: { weeks: number; label: string; detail: string }[] = [
  {
    weeks: 20,
    label: "Space confirmed, goals locked",
    detail:
      "Booth number, footprint and neighbours known. We start from the aisle sightlines, not a template.",
  },
  {
    weeks: 16,
    label: "3D design approved",
    detail: "Concept, renders and floor plan signed off. This is the last cheap moment to change the layout.",
  },
  {
    weeks: 12,
    label: "Engineering and venue submissions",
    detail:
      "Structural drawings for hanging signs, double decks and enclosed rooms go to the venue and fire marshal.",
  },
  {
    weeks: 10,
    label: "Fabrication release",
    detail: "Millwork, metal and lighting go into production. Long-lead AV and LED are ordered here.",
  },
  {
    weeks: 8,
    label: "Show services ordered at advance rates",
    detail:
      "Electrical, rigging, internet and cleaning filed before the discount deadline — floor orders cost far more.",
  },
  {
    weeks: 6,
    label: "Graphics files due",
    detail: "Final artwork to print. Late files are the most common cause of on-site graphic swaps.",
  },
  {
    weeks: 4,
    label: "Warehouse pre-build and photo proof",
    detail: "The booth is assembled in our shop and photographed. You approve what you will actually see.",
  },
  {
    weeks: 2,
    label: "Freight to the advance warehouse",
    detail:
      "Crates dispatched to hit the advance window — cheaper drayage and a guaranteed spot on your target day.",
  },
  {
    weeks: 0,
    label: "Install and show open",
    detail: "Supervised install with a Traction X producer on site through doors open.",
  },
];

function addWeeks(iso: string, weeks: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - weeks * 7);
  return d;
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/**
 * Work-back schedule from a show date. Show pages pass the known edition date;
 * venue and city pages let the visitor type theirs.
 */
export function ShowCountdown({
  place,
  showDate,
  source,
  preposition: prepositionInput,
  city,
}: {
  /** "CES 2027", "LVCC", "Chicago". */
  place: string;
  city?: string;
  /** ISO date of show open, when known. */
  showDate?: string;
  source: string;
  preposition?: "at" | "in";
}) {
  const preposition =
    prepositionInput ??
    (city && place.trim().toLowerCase() === city.trim().toLowerCase() ? "in" : "at");
  const [typed, setTyped] = useState("");
  const date = showDate || typed;

  const rows = useMemo(
    () =>
      COUNTDOWN_STEPS.map((s) => ({
        ...s,
        when: date ? fmtDate(addWeeks(date, s.weeks)) : null,
      })),
    [date],
  );

  const past = (weeks: number) => {
    if (!date) return false;
    return addWeeks(date, weeks).getTime() < Date.now();
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-purple-300">Countdown to doors open</div>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold">
          Your work-back schedule {preposition} {place}
        </h2>
        <p className="mt-3 max-w-3xl text-white/75 leading-relaxed">
          Twenty weeks is a comfortable custom build; we regularly deliver in far less. What matters is which
          deadline you are already behind. {showDate ? "Dates below are calculated from show open." : "Enter your show date and the dates fill in."}
        </p>

        {!showDate && (
          <div className="mt-5 flex flex-wrap items-end gap-3">
            <label className="text-sm text-white/70">
              <span className="block mb-1.5">Show open date</span>
              <input
                type="date"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                className="bg-black border border-white/20 rounded-lg px-3 py-2 text-white focus:border-purple-400 outline-none"
              />
            </label>
            {date && (
              <span className="text-sm text-white/50 pb-2">
                Design should be approved by {fmtDate(addWeeks(date, 16))}.
              </span>
            )}
          </div>
        )}

        <ol className="mt-6 space-y-3">
          {rows.map((r) => (
            <li
              key={r.weeks}
              className={`grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-5 rounded-xl border p-4 ${
                past(r.weeks) ? "border-white/5 opacity-55" : "border-white/10"
              }`}
            >
              <div>
                <div className="text-sm font-semibold text-purple-300">
                  {r.weeks === 0 ? "Show week" : `${r.weeks} weeks out`}
                </div>
                {r.when && <div className="text-xs text-white/50 mt-0.5">{r.when}</div>}
              </div>
              <div>
                <div className="font-semibold">{r.label}</div>
                <p className="mt-1 text-sm text-white/65 leading-relaxed">{r.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-5 text-xs text-white/45 leading-relaxed max-w-3xl">
          Typical milestones. Each show kit sets its own advance-warehouse and discount-rate deadlines — we read
          yours and pin the real dates to your schedule before anything goes into production.
        </p>

        <div className="mt-6">
          <QuoteButton source={`${source}-countdown`} label="Pin these dates to my show" />
        </div>
      </div>
    </section>
  );
}
