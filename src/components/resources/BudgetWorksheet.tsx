import { useMemo, useState } from "react";
import { FOOTPRINTS, money } from "@/lib/estimator";
import { ChoiceChips } from "@/components/ChoiceChips";
import { QuoteButton, Design3DButton } from "@/components/GlobalCta";
import { ResourceLeadGate } from "@/components/resources/ResourceLeadGate";

type Line = {
  id: string;
  group: string;
  label: string;
  hint: string;
  /** Dollars per square foot used to pre-fill the line. */
  perSqft?: number;
  /** Flat pre-fill when the line doesn't scale with footprint. */
  flat?: number;
};

const LINES: Line[] = [
  { id: "space", group: "Space", label: "Booth space rental", hint: "Your per-sq-ft space contract with the organiser", perSqft: 42 },
  { id: "corner", group: "Space", label: "Corner / island premium", hint: "Charged by many shows on end-cap and island space", perSqft: 3 },

  { id: "exhibit", group: "Exhibit", label: "Booth design, fabrication or rental", hint: "Includes install & dismantle labour in every Traction X price", perSqft: 105 },
  { id: "graphics", group: "Exhibit", label: "Graphics and print", hint: "Large-format panels, counters, hanging sign faces", perSqft: 11 },
  { id: "furniture", group: "Exhibit", label: "Furniture, flooring and AV rental", hint: "Screens, seating, padded flooring, lighting upgrades", perSqft: 14 },

  { id: "drayage", group: "Show services", label: "Drayage / material handling", hint: "Billed by hundredweight on crated weight, with a minimum", perSqft: 11 },
  { id: "electrical", group: "Show services", label: "Electrical and rigging", hint: "Power drops, 24-hour service, hanging sign rigging labour", perSqft: 9 },
  { id: "internet", group: "Show services", label: "Internet, cleaning and water", hint: "Hardwired internet is expensive; vacuuming is nightly", perSqft: 5 },
  { id: "leadretrieval", group: "Show services", label: "Lead retrieval", hint: "Per-device licence from the show's registration partner", flat: 750 },

  { id: "freightin", group: "Freight", label: "Inbound freight", hint: "To the advance warehouse inside the discount window", perSqft: 7 },
  { id: "freightout", group: "Freight", label: "Outbound freight and storage", hint: "Return leg plus between-show storage", perSqft: 6 },

  { id: "travel", group: "Travel & staff", label: "Flights and ground", hint: "Per traveller, booked early", flat: 3200 },
  { id: "hotel", group: "Travel & staff", label: "Hotel and per diems", hint: "Room block rate beats rack rate by 40%+", flat: 4800 },
  { id: "stafftime", group: "Travel & staff", label: "Loaded staff time", hint: "Hours on the floor and travelling, at fully loaded cost", flat: 9000 },

  { id: "marketing", group: "Marketing", label: "Pre-show campaign and meetings", hint: "Email, paid, outreach to book the calendar before doors", flat: 4000 },
  { id: "collateral", group: "Marketing", label: "Collateral and giveaways", hint: "Print, samples, branded items, shipping them separately", flat: 2500 },
];

const GROUPS = ["Space", "Exhibit", "Show services", "Freight", "Travel & staff", "Marketing"];

const CONTINGENCY = 0.1;

function prefillFor(sqft: number): Record<string, number> {
  const out: Record<string, number> = {};
  for (const l of LINES) {
    out[l.id] = l.perSqft ? Math.round((l.perSqft * sqft) / 50) * 50 : (l.flat ?? 0);
  }
  return out;
}

/**
 * Interactive trade show budget worksheet. Pre-fills every line from the
 * chosen footprint, totals live, and gates the CSV export behind an email so
 * the download doubles as a lead.
 */
export function BudgetWorksheet() {
  const [footprintId, setFootprintId] = useState("10x20");
  const fp = FOOTPRINTS.find((f) => f.id === footprintId) ?? FOOTPRINTS[1]!;
  const [values, setValues] = useState<Record<string, number>>(() => prefillFor(fp.sqft));
  const [touched, setTouched] = useState(false);

  function changeFootprint(id: string) {
    setFootprintId(id);
    const next = FOOTPRINTS.find((f) => f.id === id);
    if (next && !touched) setValues(prefillFor(next.sqft));
  }

  const groupTotals = useMemo(() => {
    const t: Record<string, number> = {};
    for (const l of LINES) t[l.group] = (t[l.group] ?? 0) + (values[l.id] ?? 0);
    return t;
  }, [values]);

  const subtotal = useMemo(() => Object.values(groupTotals).reduce((a, b) => a + b, 0), [groupTotals]);
  const contingency = Math.round(subtotal * CONTINGENCY);
  const total = subtotal + contingency;

  const csv = useMemo(() => {
    const rows = [
      ["Traction X — Trade Show Budget Worksheet"],
      ["Footprint", fp.label, `${fp.sqft} sq ft`],
      [],
      ["Category", "Line item", "Budget (USD)"],
      ...LINES.map((l) => [l.group, l.label, String(values[l.id] ?? 0)]),
      [],
      ["", "Subtotal", String(subtotal)],
      ["", `Contingency (${Math.round(CONTINGENCY * 100)}%)`, String(contingency)],
      ["", "Total show investment", String(total)],
    ];
    return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  }, [values, fp, subtotal, contingency, total]);

  function download() {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `traction-x-trade-show-budget-${fp.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">Interactive worksheet</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
          Build your show budget
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Pick your footprint and every line pre-fills with a realistic starting figure. Overwrite any
          number with a real quote — the totals update as you type.
        </p>

        <div className="mt-8">
          <ChoiceChips
            label="Booth footprint"
            options={FOOTPRINTS.map((f) => ({ value: f.id, label: f.label }))}
            value={footprintId}
            onChange={changeFootprint}
            size="sm"
          />
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="space-y-6">
            {GROUPS.map((g) => (
              <div key={g} className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 bg-white/[0.04]">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">{g}</span>
                  <span className="text-sm font-semibold text-white/85">{money(groupTotals[g] ?? 0)}</span>
                </div>
                <div className="divide-y divide-white/8">
                  {LINES.filter((l) => l.group === g).map((l) => (
                    <div key={l.id} className="flex items-center gap-4 px-5 py-3.5">
                      <div className="min-w-0 flex-1">
                        <label htmlFor={`budget-${l.id}`} className="block text-sm text-white/85">
                          {l.label}
                        </label>
                        <p className="text-xs text-white/45 mt-0.5">{l.hint}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-white/40 text-sm">$</span>
                        <input
                          id={`budget-${l.id}`}
                          type="number"
                          inputMode="numeric"
                          min={0}
                          value={values[l.id] ?? 0}
                          onChange={(e) => {
                            setTouched(true);
                            setValues((v) => ({ ...v, [l.id]: Math.max(0, Number(e.target.value) || 0) }));
                          }}
                          className="w-28 rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-right text-sm text-white focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 rounded-2xl border border-[oklch(0.78_0.13_300)]/35 bg-[oklch(0.78_0.13_300)]/[0.06] p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Total show investment</p>
            <p className="mt-2 font-display text-4xl font-bold text-[oklch(0.85_0.13_300)]">{money(total)}</p>
            <p className="mt-1 text-xs text-white/55">
              {fp.label} · {fp.sqft} sq ft · {money(Math.round(total / Math.max(fp.sqft, 1)))} per sq ft
            </p>

            <dl className="mt-6 space-y-2 text-sm">
              {GROUPS.map((g) => {
                const v = groupTotals[g] ?? 0;
                const pct = subtotal ? Math.round((v / subtotal) * 100) : 0;
                return (
                  <div key={g} className="flex items-baseline justify-between gap-3">
                    <dt className="text-white/60">{g}</dt>
                    <dd className="text-white/85 tabular-nums">
                      {money(v)} <span className="text-white/40 text-xs">{pct}%</span>
                    </dd>
                  </div>
                );
              })}
              <div className="flex items-baseline justify-between gap-3 border-t border-white/10 pt-2">
                <dt className="text-white/60">Contingency (10%)</dt>
                <dd className="text-white/85 tabular-nums">{money(contingency)}</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-3">
              <ResourceLeadGate
                source="resource-budget-worksheet"
                ctaLabel="Download the worksheet (CSV)"
                unlockedLabel="Download the worksheet (CSV)"
                blurb="Send it to yourself and we'll include the 2027 pricing bands for your footprint."
                meta={{ footprint: fp.label, total, lines: values }}
                onUnlocked={download}
              />
              <QuoteButton source="resource-budget-worksheet" label="Get the exhibit line quoted exactly" className="w-full justify-center" />
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-white/45">
              Every Traction X exhibit price includes design, fabrication, graphics, delivery and install
              &amp; dismantle labour. Show services are billed by the venue's contractor.
            </p>
          </aside>
        </div>

        <div className="mt-8">
          <Design3DButton source="resource-budget-worksheet" variant="outline" />
        </div>
      </div>
    </section>
  );
}
