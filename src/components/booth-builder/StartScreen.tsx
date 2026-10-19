import { useEffect, useState } from "react";

import { BOOTH_SIZES, BOOTH_TYPES } from "@/lib/booth-builder/presets";
import { createProject } from "@/lib/booth-builder/project";
import { deleteDesign, listSavedDesigns, type SavedDesign } from "@/lib/booth-builder/storage";
import { summaryHeadline } from "@/lib/booth-builder/summary";
import type { BoothProject, BoothType } from "@/lib/booth-builder/types";

/** Project setup — footprint, configuration and a couple of optional details. */
export function StartScreen({ onStart }: { onStart: (p: BoothProject, savedId?: string) => void }) {
  const [size, setSize] = useState("20x20");
  const [type, setType] = useState<BoothType>("island");
  const [customW, setCustomW] = useState(20);
  const [customD, setCustomD] = useState(20);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [saved, setSaved] = useState<SavedDesign[]>([]);

  // Saved designs live in the browser, so they're only read after hydration.
  useEffect(() => setSaved(listSavedDesigns()), []);

  const custom = size === "custom";
  const chosen = BOOTH_SIZES.find((s) => s.id === size);

  function start() {
    onStart(
      createProject({
        projectName: name,
        boothSize: custom ? `${customW}x${customD}` : size,
        boothType: type,
        widthFt: custom ? customW : (chosen?.widthFt ?? 20),
        depthFt: custom ? customD : (chosen?.depthFt ?? 20),
        website,
      }),
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <p className="text-[11px] uppercase tracking-[0.32em] text-white/50">Step 1 of 2</p>
      <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
        Start your booth
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
        Choose your space and we&apos;ll draw the floor for you. You can change any of this later.
      </p>

      {saved.length > 0 && (
        <section className="mt-8 rounded-xl border border-white/12 bg-white/[0.02] p-4">
          <h3 className="text-[11px] uppercase tracking-[0.24em] text-white/45">Pick up where you left off</h3>
          <div className="mt-3 grid gap-2">
            {saved.map((d) => (
              <div key={d.id} className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onStart(d.project, d.id)}
                  className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left transition hover:border-white/30"
                >
                  <span className="block text-sm text-white/85">{d.name}</span>
                  <span className="mt-0.5 block text-[11px] capitalize text-white/40">
                    {summaryHeadline(d.project)} · saved {new Date(d.savedAt).toLocaleDateString()}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteDesign(d.id);
                    setSaved(listSavedDesigns());
                  }}
                  className="text-[11px] text-white/35 transition hover:text-white/70"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      )}



      <section className="mt-10">
        <h3 className="text-[11px] uppercase tracking-[0.24em] text-white/45">Booth size</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {BOOTH_SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSize(s.id)}
              className={`rounded-xl border px-4 py-4 text-left transition ${
                size === s.id
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10"
                  : "border-white/12 bg-white/[0.02] hover:border-white/30"
              }`}
            >
              <span className="block text-sm font-semibold text-white">{s.label}</span>
              <span className="mt-1 block text-[11px] text-white/45">
                {s.widthFt * s.depthFt} sq ft
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSize("custom")}
            className={`rounded-xl border px-4 py-4 text-left transition ${
              custom
                ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10"
                : "border-white/12 bg-white/[0.02] hover:border-white/30"
            }`}
          >
            <span className="block text-sm font-semibold text-white">Custom</span>
            <span className="mt-1 block text-[11px] text-white/45">Set your own</span>
          </button>
        </div>

        {custom && (
          <div className="mt-4 flex flex-wrap items-end gap-4">
            <label className="text-xs text-white/60">
              Width (ft)
              <input
                type="number"
                min={8}
                max={200}
                value={customW}
                onChange={(e) => setCustomW(Number(e.target.value) || 10)}
                className="mt-1 block w-28 rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="text-xs text-white/60">
              Depth (ft)
              <input
                type="number"
                min={8}
                max={200}
                value={customD}
                onChange={(e) => setCustomD(Number(e.target.value) || 10)}
                className="mt-1 block w-28 rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-sm text-white"
              />
            </label>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h3 className="text-[11px] uppercase tracking-[0.24em] text-white/45">Booth configuration</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BOOTH_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={`rounded-xl border px-4 py-4 text-left transition ${
                type === t.id
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10"
                  : "border-white/12 bg-white/[0.02] hover:border-white/30"
              }`}
            >
              <span className="block text-sm font-semibold text-white">{t.label}</span>
              <span className="mt-1 block text-[11px] leading-relaxed text-white/50">{t.blurb}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <label className="text-xs text-white/60">
          Project name (optional)
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. DEFSEC 2027 booth"
            className="mt-1 block w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white placeholder:text-white/30"
          />
        </label>
        <label className="text-xs text-white/60">
          Company website (optional)
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="yourcompany.com"
            className="mt-1 block w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white placeholder:text-white/30"
          />
        </label>
      </section>

      <button
        type="button"
        onClick={start}
        className="mt-10 rounded-xl bg-[oklch(0.78_0.13_300)] px-7 py-3.5 font-semibold text-black transition hover:opacity-90"
      >
        Start building
      </button>
    </div>
  );
}
