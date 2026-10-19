import { useEffect, useState } from "react";
import { submitLead } from "@/lib/leads";
import { generatePricingGuide } from "@/lib/pdf-lazy";
import { GUIDE_YEAR, type PricingRegion } from "@/data/pricing-tiers";
import { ChoiceChips } from "@/components/ChoiceChips";
import { FOOTPRINT_OPTIONS, TIMELINE_OPTIONS } from "@/data/lead-options";
import { useLeadPrefill, regionForCity } from "@/lib/lead-prefill";



const YEAR = GUIDE_YEAR;

const CONTENTS = [
  "Starting prices for every footprint — 10×10 through 30×30 islands",
  "Custom rental vs. owned build, compared line by line",
  "What's included in the booth price, and what the venue bills you for",
  "Show-service budgeting by market type, including union cities",
  "The advance-order deadlines that quietly save 20–35%",
];

const REGIONS: { value: PricingRegion; label: string; note: string }[] = [
  { value: "us", label: "USA shows", note: "USD" },
  { value: "ca", label: "Canadian shows", note: "CAD" },
];

/**
 * Lead-gated download for the annual booth rental pricing guide PDF.
 * The PDF is generated in the browser from the same data the pricing page renders.
 */
export function PricingGuideGate({
  heading = `Download the ${YEAR} Custom Booth Rental Pricing Guide`,
  intro = "Every starting price we publish, plus the costs most exhibit companies leave off the quote — in one PDF you can forward to finance. Available for US and Canadian shows.",
}: {
  heading?: string;
  intro?: string;
}) {
  const pre = useLeadPrefill();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [region, setRegion] = useState<PricingRegion>("us");
  const [error, setError] = useState<string | null>(null);
  const [footprint, setFootprint] = useState("");
  const [timeline, setTimeline] = useState("");

  // Prefill from the city/show the visitor arrived on.
  useEffect(() => {
    const r = regionForCity(pre.citySlug);
    if (r) setRegion(r);
    if (pre.timeline) setTimeline((t) => t || pre.timeline);
  }, [pre.citySlug, pre.timeline]);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const leadName = String(form.get("name") ?? "").trim();
    setSending(true);

    const result = await submitLead({
      source: "pricing-guide-download",
      name: leadName,
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      footprint,
      message: `Requested the ${YEAR} Custom Booth Rental Pricing Guide PDF (${region === "ca" ? "Canada" : "USA"} edition).`,
      meta: {
        ...(footprint ? { footprint } : {}),
        ...(timeline ? { timeline } : {}),
      },
    });


    setSending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setName(leadName);
    setDone(true);
    generatePricingGuide(leadName || undefined, region);
  }


  return (
    <div className="rounded-3xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.06] p-6 md:p-10">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[oklch(0.85_0.13_300)]">
            Free download · PDF
          </p>
          <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold uppercase tracking-tight">
            {heading}
          </h2>
          <p className="mt-3 max-w-xl text-white/65 text-sm md:text-base leading-relaxed">{intro}</p>

          <ul className="mt-6 space-y-2.5">
            {CONTENTS.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-white/70">
                <span aria-hidden="true" className="text-[oklch(0.85_0.13_300)]">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full rounded-2xl border border-white/15 bg-black/50 p-6">
          {done ? (
            <div>
              <p className="font-display text-xl font-bold text-white">
                {name ? `Thanks, ${name.split(" ")[0]} —` : "Thanks —"} your guide is downloading.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                If it didn't start automatically, use the button below. A project manager will follow up
                only if you ask — no drip sequence.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {REGIONS.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => generatePricingGuide(name || undefined, r.value)}
                    className="rounded-lg bg-[oklch(0.78_0.13_300)] py-3 text-sm font-semibold text-black hover:opacity-90"
                  >
                    {r.label} ({r.note})
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <ChoiceChips
                label="Where should we send it?"
                options={REGIONS.map((r) => ({ value: r.value, label: `${r.label} ${r.note}` }))}
                value={region}
                onChange={(v: string) => setRegion(v as (typeof REGIONS)[number]["value"])}
                size="sm"
              />


              <ChoiceChips
                label="Booth footprint"
                options={FOOTPRINT_OPTIONS}
                value={footprint}
                onChange={setFootprint}
                size="sm"
              />

              <ChoiceChips
                label="Timeline"
                options={TIMELINE_OPTIONS}
                value={timeline}
                onChange={setTimeline}
                size="sm"
              />


              <input
                required
                name="name"
                type="text"
                maxLength={100}
                placeholder="Name"
                className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm placeholder:text-white/30 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
              />
              <input
                required
                name="email"
                type="email"
                maxLength={255}
                placeholder="Work email"
                className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm placeholder:text-white/30 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
              />
              <input
                name="company"
                type="text"
                maxLength={120}
                placeholder="Company (optional)"
                className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm placeholder:text-white/30 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
              />
              {error && (
                <p role="alert" className="text-[11px] text-red-300">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-lg bg-[oklch(0.78_0.13_300)] py-3 font-semibold text-black hover:opacity-90 disabled:opacity-60"
              >
                {sending ? "Preparing your PDF…" : "Download the guide →"}
              </button>
              <p className="text-[10px] leading-relaxed text-white/40">
                The PDF downloads instantly. No spam, no drip sequence — we follow up only if you ask.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
