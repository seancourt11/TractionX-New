import { useEffect, useMemo, useState } from "react";
import { FileAttach } from "./FileAttach";
import { ResponsePromise, WhatHappensNext } from "./Conversion";
import { trackFormStep } from "@/lib/analytics";
import { Autocomplete } from "./Autocomplete";
import { useLeadPrefill } from "@/lib/lead-prefill";
import { SmsOptIn, SmsOptInConfirmation } from "@/components/SmsOptIn";


type Size = "10x10" | "10x20" | "20x20" | "20x30" | "island" | "unsure";
type Style = "rental" | "custom" | "hybrid" | "unsure";

const SIZE_LABEL: Record<Size, string> = {
  "10x10": "10×10 Inline",
  "10x20": "10×20 Inline",
  "20x20": "20×20 Island",
  "20x30": "20×30 / 30×30 Island",
  island: "Larger Island / Double-Deck",
  unsure: "Not sure yet",
};

const STYLE_LABEL: Record<Style, string> = {
  rental: "Custom Rental",
  custom: "Custom Build",
  hybrid: "Hybrid",
  unsure: "Not sure yet",
};

// Rough starting ranges (USD) used only as directional estimates.
const BASE: Record<Size, { rental: [number, number]; custom: [number, number] }> = {
  "10x10": { rental: [12_500, 22_000], custom: [22_000, 45_000] },
  "10x20": { rental: [17_500, 32_000], custom: [32_000, 65_000] },
  "20x20": { rental: [30_000, 60_000], custom: [60_000, 120_000] },
  "20x30": { rental: [55_000, 95_000], custom: [95_000, 180_000] },
  island: { rental: [90_000, 180_000], custom: [180_000, 400_000] },
  unsure: { rental: [15_000, 60_000], custom: [30_000, 150_000] },
};

const ADDONS: { id: string; label: string; add: number }[] = [
  { id: "av", label: "AV package (monitors, playback + audio)", add: 6_500 },
  { id: "hangingsign", label: "Hanging sign / truss", add: 4_500 },
  { id: "meeting", label: "Private meeting room / enclosure", add: 5_000 },
  { id: "storage", label: "Storage closet + lockable cabinets", add: 1_800 },
  { id: "lead", label: "Lead capture + demo stations", add: 2_500 },
  { id: "graphics", label: "Full-height fabric graphics refresh", add: 3_200 },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function QuoteForm({
  heading = "Get an instant estimate",
  intro = "Answer 4 quick questions for a same-day estimate range. A senior PM follows up within one business day with a costed BOM.",
  defaultCity = "",
}: {
  heading?: string;
  intro?: string;
  defaultCity?: string;
}) {
  const pre = useLeadPrefill();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  const [size, setSize] = useState<Size | null>(null);
  const [style, setStyle] = useState<Style | null>(null);
  const [addons, setAddons] = useState<string[]>([]);
  const [city, setCity] = useState(defaultCity || pre.city);
  const [show, setShow] = useState(pre.show);
  const [date, setDate] = useState(pre.showDate);

  // Remembered city/show arrive after hydration — fill empty fields once.
  useEffect(() => {
    if (!defaultCity && pre.city) setCity((c) => c || pre.city);
    if (pre.show) setShow((s) => s || pre.show);
    if (pre.showDate) setDate((d) => d || pre.showDate);
  }, [defaultCity, pre.city, pre.show, pre.showDate]);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(false);

  const estimate = useMemo(() => {
    if (!size) return null;
    const kind: "rental" | "custom" =
      style === "custom" || style === "hybrid" ? "custom" : "rental";
    const [lo, hi] = BASE[size][kind];
    const addOnTotal = ADDONS.filter((a) => addons.includes(a.id)).reduce((s, a) => s + a.add, 0);
    return { low: lo + addOnTotal, high: hi + addOnTotal, kind };
  }, [size, style, addons]);

  const toggle = (id: string) =>
    setAddons((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const canNext =
    (step === 0 && size !== null) ||
    (step === 1 && style !== null) ||
    step === 2 ||
    (step === 3 && city.trim().length > 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
            {heading}
          </h2>
          <p className="mt-2 text-white/60 text-sm max-w-xl">{intro}</p>
        </div>
        {!sent && (
          <div className="hidden md:block text-right text-[11px] uppercase tracking-widest text-white/40">
            Step {Math.min(step + 1, 5)} / 5
          </div>
        )}
      </div>

      {!sent && (
        <div className="mt-5 h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[oklch(0.78_0.13_300)] transition-all"
            style={{ width: `${((step + 1) / 5) * 100}%` }}
          />
        </div>
      )}

      {sent ? (
        <div className="mt-6 rounded-xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 p-6 text-white">
          <div className="font-display text-xl font-bold uppercase tracking-tight">
            Brief received.
          </div>
          <p className="mt-2 text-white/80 text-sm">
            A senior project manager will follow up within one business day with a scoped estimate and next-step questions.
          </p>
          {estimate && (
            <div className="mt-4 text-sm text-white/70">
              Directional range from your inputs:{" "}
              <span className="text-white font-semibold">
                {fmt(estimate.low)} – {fmt(estimate.high)}
              </span>{" "}
              <span className="text-white/50">({STYLE_LABEL[style ?? "unsure"]})</span>
            </div>
          )}
          {smsOptIn && <SmsOptInConfirmation phone={phone} className="mt-4" />}
          <WhatHappensNext className="mt-5" />
        </div>

      ) : (
        <div className="mt-6">
          {/* Step 0 — Size */}
          {step === 0 && (
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
                Booth footprint
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(Object.keys(SIZE_LABEL) as Size[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`text-left px-4 py-3 rounded-xl border text-sm transition ${
                      size === s
                        ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 text-white"
                        : "border-white/12 bg-white/[0.02] text-white/80 hover:border-white/25"
                    }`}
                  >
                    {SIZE_LABEL[s]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 — Style */}
          {step === 1 && (
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
                Build style
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(STYLE_LABEL) as Style[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStyle(s)}
                    className={`text-left px-4 py-3 rounded-xl border text-sm transition ${
                      style === s
                        ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 text-white"
                        : "border-white/12 bg-white/[0.02] text-white/80 hover:border-white/25"
                    }`}
                  >
                    {STYLE_LABEL[s]}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-white/50">
                Rental = reconfigurable systems, faster turnaround. Custom = ground-up fabrication.
              </p>
            </div>
          )}

          {/* Step 2 — Add-ons */}
          {step === 2 && (
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
                Add-ons (optional)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {ADDONS.map((a) => {
                  const on = addons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggle(a.id)}
                      className={`text-left px-4 py-3 rounded-xl border text-sm transition ${
                        on
                          ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 text-white"
                          : "border-white/12 bg-white/[0.02] text-white/80 hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>{a.label}</span>
                        <span className="text-xs text-white/50">+{fmt(a.add)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3 — Show details + live estimate */}
          {step === 3 && (
            <div className="space-y-4">
              {estimate && (
                <div className="rounded-xl border border-[oklch(0.78_0.13_300)]/30 bg-[oklch(0.78_0.13_300)]/5 p-5">
                  <div className="text-[11px] uppercase tracking-widest text-[oklch(0.78_0.13_300)]">
                    Instant estimate range
                  </div>
                  <div className="mt-1 font-display text-3xl md:text-4xl font-bold text-white">
                    {fmt(estimate.low)} <span className="text-white/40">–</span> {fmt(estimate.high)}
                  </div>
                  <div className="mt-1 text-xs text-white/50">
                    {SIZE_LABEL[size!]} · {STYLE_LABEL[style ?? "unsure"]}
                    {addons.length > 0 && ` · ${addons.length} add-on${addons.length > 1 ? "s" : ""}`}
                  </div>
                  <p className="mt-3 text-xs text-white/50">
                    Approximate, non-binding estimate — not a final quote. Final pricing depends on your approved design
                    and includes graphics, freight, drayage (billed by venue), install/dismantle and taxes, confirmed in
                    writing by a Traction X designer.
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Autocomplete kind="city" value={city} onChange={setCity} placeholder="City" className="input" />
                <Autocomplete
                  kind="show"
                  value={show}
                  onChange={setShow}
                  onSelectEntry={(entry) => {
                    if (!city && entry.city) setCity(entry.city);
                    if (!date && entry.startDate) setDate(entry.startDate);
                  }}
                  placeholder="Show name"
                  className="input"
                />
                <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Show dates" className="input md:col-span-2" />
              </div>

            </div>
          )}

          {/* Step 4 — Contact */}
          {step === 4 && (
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" className="input" />
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="input" />
              <input required={smsOptIn} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={smsOptIn ? "Mobile number" : "Phone"} className="input" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Objectives, key features, budget band"
                className="input md:col-span-2 resize-none"
              />
              <div className="md:col-span-2">
                <SmsOptIn
                  checked={smsOptIn}
                  onChange={setSmsOptIn}
                  needsPhone={!phone.trim()}
                />
              </div>
              <div className="md:col-span-2">
                <FileAttach />
              </div>
              <button
                type="submit"
                className="md:col-span-2 mt-1 bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-white/90"
              >
                Send brief →
              </button>
              <ResponsePromise className="md:col-span-2" />

            </form>
          )}

          {step < 4 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-sm text-white/60 hover:text-white disabled:opacity-30"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() =>
                  setStep((s) => {
                    trackFormStep("quote_form", s + 2, 5);
                    return s + 1;
                  })
                }
                disabled={!canNext}

                className="bg-white text-black font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-white/90 disabled:opacity-40 disabled:hover:bg-white"
              >
                Continue →
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="text-sm text-white/60 hover:text-white"
              >
                ← Back
              </button>
            </div>
          )}

          <style>{`
            .input {
              background: rgba(255,255,255,0.05);
              border: 1px solid rgba(255,255,255,0.12);
              border-radius: 10px;
              padding: 12px 14px;
              color: white;
              font-size: 14px;
              outline: none;
              width: 100%;
            }
            .input::placeholder { color: rgba(255,255,255,0.4); }
            .input:focus { border-color: oklch(0.78 0.13 300); }
          `}</style>
        </div>
      )}
    </div>
  );
}
