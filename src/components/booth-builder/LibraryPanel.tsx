import { useState } from "react";

import {
  AV_PRESETS,
  GRAPHIC_TYPES,
  HANGING_PRESETS,
  FLOORING_SWATCHES,
  FURNITURE_PRESETS,
  COUNTER_PRESETS,
  MODULAR_PIECES,
  STORAGE_PRESETS,
  TOWER_PRESETS,
  WALL_PRESETS,
  type ItemPreset,
} from "@/lib/booth-builder/presets";
import {
  createItemFromPreset,
  createModularWall,
  createWallFromPreset,
  mmLabel,
} from "@/lib/booth-builder/project";
import { useBuilder } from "@/lib/booth-builder/store";
import { AiPanel } from "./AiPanel";
import { BrandPanel } from "./BrandPanel";

const CATEGORIES = [
  "Ask AI",
  "Walls",
  "Structures",
  "Counters",
  "AV",
  "Furniture",
  "Flooring",
  "Graphics",
  "Lighting",
  "Overhead",
  "Branding",
] as const;

type Category = (typeof CATEGORIES)[number];

/** Left panel — the object library. */
export function LibraryPanel() {
  const { project, addObject, commit, selectedId } = useBuilder();
  const walls = project.design.objects.filter((o) => o.type === "wall");
  const selectedWall = walls.find((w) => w.id === selectedId);
  const target = selectedWall ? [selectedWall.id] : walls.map((w) => w.id);
  const scope = selectedWall ? "the selected wall" : "every wall";
  const [active, setActive] = useState<Category>("Walls");

  const groups = ["Backwalls", "Side / Return Walls", "Feature Walls"] as const;

  function ItemList({ title, blurb, items }: { title: string; blurb?: string; items: ItemPreset[] }) {
    return (
      <div className="mt-5 first:mt-0">
        <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-white/30">{title}</p>
        {blurb && <p className="mb-2 text-[11px] text-white/40">{blurb}</p>}
        <div className="grid gap-2">
          {items.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => addObject(createItemFromPreset(p.id, project), `Added a ${p.label}`)}
              className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left transition hover:border-white/30 hover:bg-white/[0.05]"
            >
              <span className="flex items-center justify-between text-sm text-white/85">
                {p.label}
                <span className="text-[11px] text-white/35">
                  {mmLabel(p.widthMm)} × {mmLabel(p.depthMm)}
                </span>
              </span>
              {p.note && <span className="mt-0.5 block text-[11px] text-white/40">{p.note}</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap gap-1.5 border-b border-white/10 p-3">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium transition ${
              active === c ? "bg-white text-black" : "bg-white/[0.04] text-white/60 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {active === "Ask AI" && <AiPanel />}

        {active === "Branding" && <BrandPanel />}

        {active === "Walls" && (
          <>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Full walls</p>
            <p className="mt-1 text-[11px] text-white/40">Fastest way to build.</p>
            {groups.map((g) => (
              <div key={g} className="mt-5">
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">{g}</p>
                <div className="grid gap-2">
                  {WALL_PRESETS.filter((p) => p.group === g).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => addObject(createWallFromPreset(p.id, project), `Added a ${p.label}`)}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left text-sm text-white/85 transition hover:border-white/30 hover:bg-white/[0.05]"
                    >
                      <span>{p.label}</span>
                      <span className="text-[11px] text-white/35">{p.hint ?? "Add"}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Modular pieces</p>
              <p className="mt-1 text-[11px] text-white/40">Build a custom configuration.</p>
              <div className="mt-3 grid gap-2">
                {MODULAR_PIECES.map((m) => (
                  <button
                    key={m.widthMm}
                    type="button"
                    onClick={() =>
                      addObject(createModularWall(m.widthMm, project), `Added a ${m.label} module`)
                    }
                    className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left transition ${
                      m.primary
                        ? "border-[oklch(0.78_0.13_300)]/50 bg-[oklch(0.78_0.13_300)]/10 hover:bg-[oklch(0.78_0.13_300)]/15"
                        : "border-white/10 bg-white/[0.02] hover:border-white/30"
                    }`}
                  >
                    <span className={m.primary ? "text-sm font-semibold text-white" : "text-sm text-white/80"}>
                      {m.label}
                    </span>
                    <span className="text-[11px] text-white/40">{m.note}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {active === "Structures" && (
          <>
            <ItemList
              title="Storage rooms"
              blurb={
                project.project.boothType === "island" || project.project.boothType === "peninsula"
                  ? "Size freely in both directions."
                  : "Kept shallow for inline and corner booths — you can override the depth once it's placed."
              }
              items={STORAGE_PRESETS}
            />
            <ItemList title="Towers" blurb="Height on the modular grid." items={TOWER_PRESETS} />
          </>
        )}

        {active === "Counters" && (
          <ItemList
            title="Counters and pedestals"
            blurb="Any width from 24 to 96 inches — adjust after placing."
            items={COUNTER_PRESETS}
          />
        )}

        {active === "AV" && (
          <ItemList
            title="Screens"
            blurb="Real product sizes. Drag a screen against a wall and it snaps to it."
            items={AV_PRESETS}
          />
        )}

        {active === "Furniture" && <ItemList title="Furniture" items={FURNITURE_PRESETS} />}

        {active === "Flooring" && (
          <>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Flooring</p>
            <p className="mt-1 text-[11px] text-white/40">Covers the whole booth footprint.</p>
            <button
              type="button"
              onClick={() =>
                commit("Removed flooring", (d) => {
                  d.design.flooring.swatchId = null;
                })
              }
              className={`mt-3 w-full rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                project.design.flooring.swatchId === null
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 text-white"
                  : "border-white/10 text-white/70 hover:border-white/30"
              }`}
            >
              Show floor (no covering)
            </button>

            {(["Carpet", "Rolled Vinyl"] as const).map((family) => (
              <div key={family} className="mt-5">
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">{family}</p>
                <div className="grid grid-cols-2 gap-2">
                  {FLOORING_SWATCHES.filter((f) => f.family === family).map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() =>
                        commit(`Flooring set to ${f.label}`, (d) => {
                          d.design.flooring.swatchId = f.id;
                        })
                      }
                      className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs transition ${
                        project.design.flooring.swatchId === f.id
                          ? "border-[oklch(0.78_0.13_300)] text-white"
                          : "border-white/10 text-white/65 hover:border-white/30"
                      }`}
                    >
                      <span
                        className="h-5 w-5 shrink-0 rounded border border-white/20"
                        style={{ background: f.hex }}
                      />
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {active === "Graphics" && (
          <>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Graphic treatments</p>
            <p className="mt-1 text-[11px] text-white/40">
              {walls.length === 0
                ? "Add a wall first, then choose how it's finished."
                : `Applies to ${scope}. Select a wall on the plan to treat it on its own.`}
            </p>
            <div className="mt-3 grid gap-2">
              {GRAPHIC_TYPES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  disabled={walls.length === 0}
                  onClick={() =>
                    commit(`${g.label} applied`, (d) => {
                      for (const o of d.design.objects) {
                        if (o.type !== "wall" || !target.includes(o.id)) continue;
                        o.graphicType = g.id;
                        if (g.id === "solid_color" && !o.graphicColor)
                          o.graphicColor = d.branding.primaryColor;
                        if (g.id === "backlit_graphic") {
                          o.lightbox = true;
                          for (const s of o.sections) s.lightbox = true;
                        }
                      }
                    })
                  }
                  className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left transition hover:border-white/30 hover:bg-white/[0.05] disabled:opacity-30"
                >
                  <span className="block text-sm text-white/85">{g.label}</span>
                  <span className="mt-0.5 block text-[11px] text-white/40">{g.note}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-white/35">
              Concept graphics only — our designers build the print-ready artwork from your brand.
            </p>
          </>
        )}

        {active === "Lighting" && (
          <>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Lighting</p>
            <p className="mt-1 text-[11px] text-white/40">Backlit fabric glows from the inside.</p>

            <button
              type="button"
              onClick={() =>
                commit(
                  project.design.wholeBoothIlluminated ? "Booth lighting off" : "Whole booth backlit",
                  (d) => {
                    const on = !d.design.wholeBoothIlluminated;
                    d.design.wholeBoothIlluminated = on;
                    for (const o of d.design.objects) {
                      if (o.type === "wall") {
                        o.lightbox = on;
                        for (const s of o.sections) s.lightbox = on;
                      } else if (o.kind !== "tv" && o.kind !== "furniture") {
                        o.lightbox = on;
                      }
                    }
                  },
                )
              }
              className={`mt-4 w-full rounded-lg border px-3 py-3 text-left transition ${
                project.design.wholeBoothIlluminated
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/12"
                  : "border-white/10 bg-white/[0.02] hover:border-white/30"
              }`}
            >
              <span className="block text-sm font-semibold text-white">
                {project.design.wholeBoothIlluminated ? "Whole booth is lit" : "Light the whole booth"}
              </span>
              <span className="mt-1 block text-[11px] leading-relaxed text-white/45">
                Every wall, tower, counter and sign becomes a lightbox.
              </span>
            </button>

            <div className="mt-3 grid gap-2">
              <button
                type="button"
                onClick={() =>
                  commit("Walls backlit", (d) => {
                    for (const o of d.design.objects) {
                      if (o.type !== "wall" || !target.includes(o.id)) continue;
                      o.lightbox = true;
                      for (const s of o.sections) s.lightbox = true;
                    }
                  })
                }
                className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left text-sm text-white/85 transition hover:border-white/30"
              >
                Light {scope}
              </button>
              <button
                type="button"
                onClick={() =>
                  commit("Backlighting off", (d) => {
                    d.design.wholeBoothIlluminated = false;
                    for (const o of d.design.objects) {
                      o.lightbox = false;
                      if (o.type === "wall") for (const s of o.sections) s.lightbox = false;
                    }
                  })
                }
                className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left text-sm text-white/70 transition hover:border-white/30"
              >
                Turn all backlighting off
              </button>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-white/35">
              Want just half a wall lit? Select the wall and pick the sections in the panel on the right.
            </p>
          </>
        )}

        {active === "Overhead" && (
          <>
            <ItemList
              title="Hanging signs"
              blurb={
                project.project.boothType === "inline" || project.project.boothType === "corner"
                  ? "Most shows only allow overhead signs for peninsula and island booths — we'll confirm with your show."
                  : "Sized to your booth, hung above the aisle sightlines."
              }
              items={HANGING_PRESETS}
            />
            <p className="mt-4 text-[11px] leading-relaxed text-white/35">
              Signs can be single or double-sided and lit from the inside — set that after placing one.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
