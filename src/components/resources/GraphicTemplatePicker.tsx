import { useMemo, useState } from "react";
import { ChoiceChips } from "@/components/ChoiceChips";
import { QuoteButton } from "@/components/GlobalCta";

type Panel = { name: string; finished: string; bleed: string; safe: string; material: string };

const SPECS: Record<string, { label: string; panels: Panel[] }> = {
  "10x10": {
    label: "10×10 inline",
    panels: [
      { name: "Back wall", finished: '116" × 89"', bleed: '2" all round', safe: '3" inside trim', material: "Tension fabric, dye-sub" },
      { name: "Counter wrap", finished: '38" × 36"', bleed: '0.25" all round', safe: '1" inside trim', material: "Direct print on rigid" },
      { name: "Header (optional)", finished: '60" × 24"', bleed: '2" all round', safe: '3" inside trim', material: "Tension fabric" },
    ],
  },
  "10x20": {
    label: "10×20 inline",
    panels: [
      { name: "Back wall (2 panels)", finished: '118" × 89" each', bleed: '2" all round', safe: '3" inside trim', material: "Tension fabric, dye-sub" },
      { name: "Header", finished: '94" × 24"', bleed: '2" all round', safe: '3" inside trim', material: "Tension fabric" },
      { name: "Counter wrap", finished: '38" × 36"', bleed: '0.25" all round', safe: '1" inside trim', material: "Direct print on rigid" },
      { name: "Monitor surround", finished: '48" × 60"', bleed: '0.25" all round', safe: '1" inside trim', material: "Rigid panel" },
    ],
  },
  "20x20": {
    label: "20×20 island",
    panels: [
      { name: "Tower faces (×4)", finished: '46" × 118"', bleed: '2" all round', safe: '3" inside trim', material: "Tension fabric" },
      { name: "Meeting room walls", finished: '92" × 89"', bleed: '2" all round', safe: '3" inside trim', material: "Tension fabric, double-sided" },
      { name: "Hanging sign (4 faces)", finished: '96" × 36"', bleed: '3" all round', safe: '4" inside trim', material: "Double-sided blockout fabric" },
      { name: "Reception counter", finished: '72" × 40"', bleed: '0.25" all round', safe: '1" inside trim', material: "Direct print on rigid" },
    ],
  },
  "20x30": {
    label: "20×30 island",
    panels: [
      { name: "Feature wall", finished: '236" × 118"', bleed: '2" all round', safe: '3" inside trim', material: "Tension fabric, seamed" },
      { name: "Storage room walls", finished: '92" × 89"', bleed: '2" all round', safe: '3" inside trim', material: "Tension fabric" },
      { name: "Ring hanging sign", finished: '144" dia × 36"', bleed: '3" all round', safe: '4" inside trim', material: "Double-sided blockout fabric" },
      { name: "Demo pods (×3)", finished: '40" × 38"', bleed: '0.25" all round', safe: '1" inside trim', material: "Direct print on rigid" },
    ],
  },
  "double-deck": {
    label: "Double deck",
    panels: [
      { name: "Deck fascia", finished: '236" × 42"', bleed: '2" all round', safe: '4" inside trim', material: "Tension fabric or rigid" },
      { name: "Stair surround", finished: '48" × 89"', bleed: '0.25" all round', safe: '1" inside trim', material: "Rigid panel" },
      { name: "Ground-level walls", finished: '92" × 89"', bleed: '2" all round', safe: '3" inside trim', material: "Tension fabric" },
      { name: "Upper-level signage", finished: "To venue approval", bleed: '2" all round', safe: '4" inside trim', material: "Per engineered drawing" },
    ],
  },
};

const ORDER = ["10x10", "10x20", "20x20", "20x30", "double-deck"];

/** Panel-by-panel artwork specs for the selected footprint, copyable for designers. */
export function GraphicTemplatePicker() {
  const [id, setId] = useState("10x20");
  const spec = SPECS[id] ?? SPECS["10x20"]!;
  const [copied, setCopied] = useState(false);

  const text = useMemo(
    () =>
      [
        `Traction X — artwork specs · ${spec.label}`,
        "Colour: CMYK, US Web Coated (SWOP) v2. Resolution: 100 ppi at 100% size.",
        "Format: PDF/X-4 or packaged AI/INDD. Fonts outlined, images embedded.",
        "",
        ...spec.panels.map(
          (p) => `${p.name} — finished ${p.finished} · bleed ${p.bleed} · safe ${p.safe} · ${p.material}`,
        ),
      ].join("\n"),
    [spec],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — the table is on screen anyway */
    }
  }

  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">Spec picker</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
          Specs for your footprint
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Pick your booth size and send these numbers straight to your designer. Custom builds get a
          dimensioned template from your approved drawings — always print from that when you have it.
        </p>

        <div className="mt-7">
          <ChoiceChips
            label="Footprint"
            options={ORDER.map((k) => ({ value: k, label: SPECS[k]!.label }))}
            value={id}
            onChange={setId}
            size="sm"
          />
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.16em] text-white/60">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">Panel</th>
                <th className="px-5 py-4 text-left font-semibold">Finished size</th>
                <th className="px-5 py-4 text-left font-semibold">Bleed</th>
                <th className="px-5 py-4 text-left font-semibold">Safe area</th>
                <th className="px-5 py-4 text-left font-semibold">Material</th>
              </tr>
            </thead>
            <tbody>
              {spec.panels.map((p) => (
                <tr key={p.name} className="border-t border-white/10">
                  <td className="px-5 py-4 font-semibold text-white/90">{p.name}</td>
                  <td className="px-5 py-4 text-white/70">{p.finished}</td>
                  <td className="px-5 py-4 text-white/70">{p.bleed}</td>
                  <td className="px-5 py-4 text-white/70">{p.safe}</td>
                  <td className="px-5 py-4 text-white/70">{p.material}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copy}
            className="rounded-xl border border-white/25 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            {copied ? "Copied to clipboard" : "Copy specs for my designer"}
          </button>
          <QuoteButton source="resource-graphic-specs" label="Request a dimensioned template" />
        </div>
      </div>
    </section>
  );
}
