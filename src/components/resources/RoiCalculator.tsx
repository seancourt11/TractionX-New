import { useMemo, useState } from "react";
import { money } from "@/lib/estimator";
import { QuoteButton } from "@/components/GlobalCta";
import { ResourceLeadGate } from "@/components/resources/ResourceLeadGate";

type Field = { id: string; label: string; hint: string; suffix?: string; step?: number };

const SPEND: Field[] = [
  { id: "space", label: "Space rental", hint: "What the organiser invoices for the floor space" },
  { id: "exhibit", label: "Exhibit (booth, graphics, I&D)", hint: "Traction X pricing includes install and dismantle" },
  { id: "services", label: "Show services", hint: "Drayage, electrical, rigging, internet, cleaning" },
  { id: "travelStaff", label: "Travel, hotel and loaded staff time", hint: "The line most teams leave out of ROI" },
  { id: "marketing", label: "Pre-show marketing and collateral", hint: "Campaigns, giveaways, printed material" },
];

const DEFAULTS: Record<string, number> = {
  space: 9000,
  exhibit: 18500,
  services: 7500,
  travelStaff: 12000,
  marketing: 4000,
  leads: 140,
  qualifyRate: 30,
  closeRate: 20,
  dealValue: 25000,
  margin: 55,
};

export function RoiCalculator() {
  const [v, setV] = useState<Record<string, number>>(DEFAULTS);
  const set = (id: string, n: number) => setV((s) => ({ ...s, [id]: Math.max(0, n) }));

  const calc = useMemo(() => {
    const investment = SPEND.reduce((a, f) => a + (v[f.id] ?? 0), 0);
    const leads = v.leads ?? 0;
    const qualified = Math.round((leads * (v.qualifyRate ?? 0)) / 100);
    const deals = (qualified * (v.closeRate ?? 0)) / 100;
    const revenue = deals * (v.dealValue ?? 0);
    const grossProfit = (revenue * (v.margin ?? 0)) / 100;
    const cpl = leads ? investment / leads : 0;
    const cpq = qualified ? investment / qualified : 0;
    const perDealProfit = ((v.dealValue ?? 0) * (v.margin ?? 0)) / 100;
    const breakEven = perDealProfit ? investment / perDealProfit : 0;
    const roi = investment ? (grossProfit - investment) / investment : 0;
    return { investment, leads, qualified, deals, revenue, grossProfit, cpl, cpq, breakEven, roi };
  }, [v]);

  const summaryCsv = useMemo(
    () =>
      [
        ["Traction X — Trade Show ROI Model"],
        ...SPEND.map((f) => [f.label, String(v[f.id] ?? 0)]),
        ["Total investment", String(Math.round(calc.investment))],
        ["Leads captured", String(calc.leads)],
        ["Qualified leads", String(calc.qualified)],
        ["Cost per lead", String(Math.round(calc.cpl))],
        ["Cost per qualified lead", String(Math.round(calc.cpq))],
        ["Deals closed", calc.deals.toFixed(1)],
        ["Attributed revenue", String(Math.round(calc.revenue))],
        ["Gross profit", String(Math.round(calc.grossProfit))],
        ["Break-even deals", calc.breakEven.toFixed(1)],
        ["Return on investment", `${Math.round(calc.roi * 100)}%`],
      ]
        .map((r) => r.map((c) => `"${c}"`).join(","))
        .join("\n"),
    [v, calc],
  );

  function download() {
    const blob = new Blob([summaryCsv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "traction-x-trade-show-roi-model.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const num = (id: string, suffix?: string, step = 1) => (
    <div className="flex items-center gap-1 shrink-0">
      <input
        id={`roi-${id}`}
        type="number"
        min={0}
        step={step}
        inputMode="numeric"
        value={v[id] ?? 0}
        onChange={(e) => set(id, Number(e.target.value) || 0)}
        className="w-28 rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-right text-sm text-white focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
      />
      {suffix && <span className="text-white/40 text-sm w-4">{suffix}</span>}
    </div>
  );

  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">Interactive calculator</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
          Model the return before you book
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Enter your full show investment and your funnel assumptions. Everything on the right updates
          live — including the number of deals you need just to break even.
        </p>

        <div className="mt-8 grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
              <div className="px-5 py-3 bg-white/[0.04] text-[11px] uppercase tracking-[0.2em] text-white/60">
                Show investment
              </div>
              <div className="divide-y divide-white/8">
                {SPEND.map((f) => (
                  <div key={f.id} className="flex items-center gap-4 px-5 py-3.5">
                    <div className="min-w-0 flex-1">
                      <label htmlFor={`roi-${f.id}`} className="block text-sm text-white/85">{f.label}</label>
                      <p className="text-xs text-white/45 mt-0.5">{f.hint}</p>
                    </div>
                    {num(f.id, "$", 100)}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
              <div className="px-5 py-3 bg-white/[0.04] text-[11px] uppercase tracking-[0.2em] text-white/60">
                Funnel assumptions
              </div>
              <div className="divide-y divide-white/8">
                {[
                  { id: "leads", label: "Leads captured at the show", hint: "Badge scans plus manual captures", suffix: "" },
                  { id: "qualifyRate", label: "Percent genuinely qualified", hint: "Right need, timing and authority", suffix: "%" },
                  { id: "closeRate", label: "Close rate on qualified leads", hint: "Over your agreed attribution window", suffix: "%" },
                  { id: "dealValue", label: "Average deal value", hint: "First-year contract value", suffix: "$" },
                  { id: "margin", label: "Gross margin", hint: "Used for break-even and profit", suffix: "%" },
                ].map((f) => (
                  <div key={f.id} className="flex items-center gap-4 px-5 py-3.5">
                    <div className="min-w-0 flex-1">
                      <label htmlFor={`roi-${f.id}`} className="block text-sm text-white/85">{f.label}</label>
                      <p className="text-xs text-white/45 mt-0.5">{f.hint}</p>
                    </div>
                    {num(f.id, f.suffix || undefined, f.id === "dealValue" ? 500 : 1)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 rounded-2xl border border-[oklch(0.78_0.13_300)]/35 bg-[oklch(0.78_0.13_300)]/[0.06] p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Return on investment</p>
            <p className="mt-2 font-display text-4xl font-bold text-[oklch(0.85_0.13_300)]">
              {calc.investment ? `${(calc.roi * 100).toFixed(0)}%` : "—"}
            </p>
            <p className="mt-1 text-xs text-white/55">
              On {money(Math.round(calc.investment))} invested, using gross profit
            </p>

            <dl className="mt-6 space-y-2.5 text-sm">
              {[
                ["Cost per lead", money(Math.round(calc.cpl))],
                ["Cost per qualified lead", money(Math.round(calc.cpq))],
                ["Qualified leads", String(calc.qualified)],
                ["Deals closed", calc.deals.toFixed(1)],
                ["Attributed revenue", money(Math.round(calc.revenue))],
                ["Gross profit", money(Math.round(calc.grossProfit))],
                ["Break-even deals", calc.breakEven.toFixed(1)],
              ].map(([k, val]) => (
                <div key={k} className="flex items-baseline justify-between gap-3">
                  <dt className="text-white/60">{k}</dt>
                  <dd className="text-white/90 tabular-nums">{val}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 space-y-3">
              <ResourceLeadGate
                source="resource-roi-calculator"
                ctaLabel="Email me this ROI model"
                blurb="We'll send the model and sanity-check the booth line against real pricing for your show."
                meta={{ investment: Math.round(calc.investment), roi: Math.round(calc.roi * 100), inputs: v }}
                onUnlocked={download}
              />
              <QuoteButton
                source="resource-roi-calculator"
                label="Price the exhibit line properly"
                className="w-full justify-center"
              />
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-white/45">
              Break-even assumes gross profit per deal. Agree your attribution window with sales before
              the show, not after it.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
