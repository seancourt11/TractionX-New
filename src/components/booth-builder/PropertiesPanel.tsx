import {
  COUNTER_MAX_MM,
  COUNTER_MIN_MM,
  FINISH_HEX,
  GRAPHIC_TYPES,
  HANG_MAX_MM,
  HANG_MIN_MM,
  HEIGHTS,
  LOGO_TREATMENTS,
  mmToFt,
  recommendedHangingWidthMm,
} from "@/lib/booth-builder/presets";
import { isWall, mmLabel, sectionsFor, wallWidthMm } from "@/lib/booth-builder/project";
import { SurfaceBrandControls } from "./SurfaceBrandControls";
import { useBuilder } from "@/lib/booth-builder/store";
import type {
  EdgeColor,
  GraphicType,
  HangingShape,
  HeightPreset,
  ItemObject,
  LogoTreatment,
} from "@/lib/booth-builder/types";

const FINISHES: { id: ItemObject["finish"]; label: string }[] = [
  { id: "white", label: "White" },
  { id: "black", label: "Black" },
  { id: "wood", label: "Wood" },
  { id: "brand", label: "Brand" },
];

const KIND_LABEL: Record<ItemObject["kind"], string> = {
  storage: "Storage room",
  tower: "Tower",
  counter: "Counter",
  tv: "Screen",
  furniture: "Furniture",
  hanging: "Overhead sign",
};


const SHAPES: { id: HangingShape; label: string }[] = [
  { id: "square", label: "Square" },
  { id: "rectangle", label: "Rectangular" },
  { id: "halo", label: "Halo ring" },
];

/** Size, height, sides and illumination for an overhead sign. */
function HangingControls({ item }: { item: ItemObject }) {
  const { project, updateWall } = useBuilder();
  const recommended = recommendedHangingWidthMm(project.project.widthMm, project.project.depthMm);
  const oversize = item.widthMm > Math.min(project.project.widthMm, project.project.depthMm);
  const islandOnly =
    item.shape === "halo" && project.project.boothType !== "island" && project.project.boothType !== "peninsula";

  const setShape = (shape: HangingShape) =>
    updateWall(
      item.id,
      {
        shape,
        depthMm: shape === "rectangle" ? 610 : item.widthMm,
      },
      `Sign shape set to ${shape}`,
    );

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Shape</p>
        <div className="flex gap-2">
          {SHAPES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setShape(s.id)}
              className={`flex-1 rounded-lg border py-2 text-[11px] transition ${
                (item.shape ?? "square") === s.id
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 text-white"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Size across</p>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={HANG_MIN_MM}
            max={HANG_MAX_MM}
            step={305}
            value={Math.min(Math.max(item.widthMm, HANG_MIN_MM), HANG_MAX_MM)}
            onChange={(e) => {
              const v = Number(e.target.value);
              updateWall(
                item.id,
                { widthMm: v, depthMm: (item.shape ?? "square") === "rectangle" ? 610 : v },
                "Resized sign",
              );
            }}
            className="flex-1 accent-[oklch(0.78_0.13_300)]"
          />
          <span className="w-20 text-right text-xs text-white/60">{mmLabel(item.widthMm)}</span>
        </div>
        <p className="mt-1.5 text-[11px] text-white/35">
          For this booth we'd suggest about {mmLabel(recommended)} across.
        </p>
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Height off the floor</p>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={3050}
            max={6100}
            step={152}
            value={item.hangHeightMm ?? 3660}
            onChange={(e) =>
              updateWall(
                item.id,
                { hangHeightMm: Number(e.target.value), elevationMm: Number(e.target.value) },
                "Moved sign height",
              )
            }
            className="flex-1 accent-[oklch(0.78_0.13_300)]"
          />
          <span className="w-20 text-right text-xs text-white/60">{mmLabel(item.hangHeightMm ?? 3660)}</span>
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Printed sides</p>
        <div className="flex gap-2">
          {[
            { v: false, label: "Single-sided" },
            { v: true, label: "Double-sided" },
          ].map((o) => (
            <button
              key={String(o.v)}
              type="button"
              onClick={() => updateWall(item.id, { doubleSided: o.v }, o.label)}
              className={`flex-1 rounded-lg border py-2 text-[11px] transition ${
                (item.doubleSided ?? true) === o.v
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 text-white"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {(oversize || islandOnly) && (
        <p className="rounded-lg border border-amber-300/25 bg-amber-300/[0.06] p-3 text-[11px] leading-relaxed text-amber-100/80">
          {oversize
            ? "This sign is wider than your booth. Most shows want overhead signs to sit inside your own space — we can trim it on the design call, or keep it and we'll check the show rules for you."
            : "Halo rings usually need aisles on several sides. It still works here — we'll confirm the rigging with the show."}
        </p>
      )}
    </div>
  );
}

/** Properties for storage, towers, counters, screens, furniture and signs. */
function ItemProperties({ item }: { item: ItemObject }) {
  const { project, updateWall, duplicateSelected, deleteSelected } = useBuilder();
  const fixed = item.sizing === "fixed";
  const grid = item.sizing === "modular" ? 496 : 50;
  const maxW = item.kind === "counter" ? COUNTER_MAX_MM : project.project.widthMm;
  const minW = item.kind === "counter" ? COUNTER_MIN_MM : 310;
  const inlineDepthLock =
    item.kind === "storage" &&
    (project.project.boothType === "inline" || project.project.boothType === "corner");

  const sizeRow = (
    label: string,
    value: number,
    min: number,
    max: number,
    apply: (v: number) => void,
  ) => (
    <div>
      <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">{label}</p>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={grid}
          value={Math.min(Math.max(value, min), max)}
          onChange={(e) => apply(Math.round(Number(e.target.value) / grid) * grid)}
          className="flex-1 accent-[oklch(0.78_0.13_300)]"
        />
        <span className="w-20 text-right text-xs text-white/60">{mmLabel(value)}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">{KIND_LABEL[item.kind]}</p>
        <p className="mt-2 text-lg font-semibold text-white">{item.name}</p>
        <p className="mt-1 text-xs text-white/45">
          {mmLabel(item.widthMm)} × {mmLabel(item.depthMm)} · {mmLabel(item.heightMm)} tall
        </p>
      </div>

      {item.kind === "hanging" ? (
        <HangingControls item={item} />
      ) : fixed ? (
        <p className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-[11px] leading-relaxed text-white/50">
          This is a real product at its actual size, so it can't be stretched. Swap it for a different
          size from the library if you need bigger or smaller.
        </p>
      ) : (
        <>
          {sizeRow("Width", item.widthMm, minW, maxW, (v) =>
            updateWall(item.id, { widthMm: v }, "Resized"),
          )}
          {sizeRow(
            "Depth",
            item.depthMm,
            310,
            inlineDepthLock ? 992 : Math.round(project.project.depthMm / 2),
            (v) => updateWall(item.id, { depthMm: v }, "Resized"),
          )}
          {inlineDepthLock && (
            <p className="-mt-3 text-[11px] leading-relaxed text-white/40">
              Inline and corner booths are kept shallow so the storage room doesn't eat the whole booth.
              Need it deeper? Move it into an island layout, or we'll sort it on the design call.
            </p>
          )}
          {sizeRow("Height", item.heightMm, 750, 4402, (v) =>
            updateWall(item.id, { heightMm: v }, "Changed height"),
          )}
        </>
      )}

      {item.kind === "tv" && (
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Mounting height</p>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={2400}
              step={50}
              value={item.elevationMm ?? 0}
              onChange={(e) =>
                updateWall(item.id, { elevationMm: Number(e.target.value) }, "Moved screen")
              }
              className="flex-1 accent-[oklch(0.78_0.13_300)]"
            />
            <span className="w-20 text-right text-xs text-white/60">
              {(item.elevationMm ?? 0) === 0 ? "On the floor" : mmLabel(item.elevationMm ?? 0)}
            </span>
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Rotation</p>
        <div className="flex gap-2">
          {[0, 90, 180, 270].map((deg) => (
            <button
              key={deg}
              type="button"
              onClick={() => updateWall(item.id, { rotationDeg: deg }, "Rotated")}
              className={`flex-1 rounded-lg border py-2 text-xs transition ${
                item.rotationDeg === deg
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 text-white"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {deg}°
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Finish</p>
        <div className="grid grid-cols-2 gap-2">
          {FINISHES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => updateWall(item.id, { finish: f.id }, `Finish set to ${f.label}`)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${
                item.finish === f.id
                  ? "border-[oklch(0.78_0.13_300)] text-white"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              <span className="h-3 w-3 rounded-sm" style={{ background: FINISH_HEX[f.id] }} />
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {item.kind !== "tv" && item.kind !== "furniture" && (
        <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <input
            type="checkbox"
            checked={item.lightbox ?? false}
            onChange={(e) => updateWall(item.id, { lightbox: e.target.checked }, "Backlighting")}
            className="mt-0.5 h-4 w-4 accent-[oklch(0.78_0.13_300)]"
          />
          <span>
            <span className="block text-sm font-medium text-white">Backlit graphic</span>
            <span className="mt-1 block text-[11px] leading-relaxed text-white/45">
              Lit from the inside so the artwork glows on the show floor.
            </span>
          </span>
        </label>
      )}

      {item.kind !== "tv" && item.kind !== "furniture" && <SurfaceBrandControls object={item} />}

      <div className="flex gap-2 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={duplicateSelected}
          className="flex-1 rounded-lg border border-white/15 py-2.5 text-xs text-white/80 transition hover:border-white/40"
        >
          Duplicate
        </button>
        <button
          type="button"
          onClick={deleteSelected}
          className="flex-1 rounded-lg border border-red-400/30 py-2.5 text-xs text-red-300 transition hover:border-red-400/60"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const EDGE_COLORS: { id: EdgeColor; label: string; swatch: string }[] = [
  { id: "white", label: "White", swatch: "#ffffff" },
  { id: "black", label: "Black", swatch: "#111111" },
  { id: "brand", label: "Brand", swatch: "oklch(0.78 0.13 300)" },
];

/** Right panel — properties for the selected object, or the project itself. */
export function PropertiesPanel() {
  const { project, selectedId, updateWall, duplicateSelected, deleteSelected, commit } = useBuilder();
  const wall = project.design.objects.find((o) => o.id === selectedId);

  if (!wall) {
    return (
      <div className="space-y-6 p-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Project</p>
          <p className="mt-2 text-lg font-semibold text-white">{project.project.projectName}</p>
          <p className="mt-1 text-xs capitalize text-white/50">
            {Math.round(mmToFt(project.project.widthMm))} × {Math.round(mmToFt(project.project.depthMm))} ft ·{" "}
            {project.project.boothType} booth
          </p>
        </div>

        <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <input
            type="checkbox"
            checked={project.regulations.enabled}
            onChange={(e) =>
              commit(e.target.checked ? "Standard rules on" : "Flexible event mode", (d) => {
                d.regulations.enabled = e.target.checked;
                d.regulations.profile = e.target.checked ? "north_american_standard" : "flexible_event";
              })
            }
            className="mt-0.5 h-4 w-4 accent-[oklch(0.78_0.13_300)]"
          />
          <span>
            <span className="block text-sm font-medium text-white">
              {project.regulations.enabled ? "Standard trade show rules" : "Flexible event mode"}
            </span>
            <span className="mt-1 block text-[11px] leading-relaxed text-white/45">
              {project.regulations.enabled
                ? "Uses common North American display guidelines to help avoid obvious layout, height and sight-line issues. Final requirements vary by event."
                : "Traditional trade show display-layout restrictions are off. Useful for conferences, corporate events, activations and hotel events."}
            </span>
          </span>
        </label>

        <p className="text-xs leading-relaxed text-white/45">
          Select a wall on the floor plan to change its size, height, finish and position.
        </p>
      </div>
    );
  }

  if (!isWall(wall)) return <ItemProperties item={wall} />;

  const width = wallWidthMm(wall);
  const widthFt = Math.round(mmToFt(width) * 10) / 10;


  return (
    <div className="space-y-6 p-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Selected</p>
        <p className="mt-2 text-lg font-semibold text-white">{wall.name}</p>
        <p className="mt-1 text-xs text-white/45">
          {mmLabel(width)} wide · {width} mm · {wall.sections.length} module
          {wall.sections.length === 1 ? "" : "s"}
        </p>
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Width</p>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={3}
            max={40}
            step={0.5}
            value={widthFt}
            onChange={(e) =>
              updateWall(
                wall.id,
                { sections: sectionsFor(Number(e.target.value) * 304.8) },
                "Resized wall",
              )
            }
            className="flex-1 accent-[oklch(0.78_0.13_300)]"
          />
          <span className="w-16 text-right text-xs text-white/60">{widthFt} ft</span>
        </div>
        <p className="mt-1.5 text-[11px] text-white/35">
          Snaps to modular sections so it can actually be built.
        </p>
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Height</p>
        <div className="grid grid-cols-2 gap-2">
          {HEIGHTS.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() =>
                updateWall(
                  wall.id,
                  { heightPreset: h.id as HeightPreset, heightMm: h.mm },
                  `Set height to ${h.label}`,
                )
              }
              className={`rounded-lg border px-3 py-2.5 text-left transition ${
                wall.heightPreset === h.id
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/30"
              }`}
            >
              <span className="block text-xs font-semibold text-white">{h.label}</span>
              <span className="mt-0.5 block text-[10px] text-white/40">{h.approx}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Rotation</p>
        <div className="flex gap-2">
          {[0, 90, 180, 270].map((deg) => (
            <button
              key={deg}
              type="button"
              onClick={() => updateWall(wall.id, { rotationDeg: deg }, "Rotated wall")}
              className={`flex-1 rounded-lg border py-2 text-xs transition ${
                wall.rotationDeg === deg
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10 text-white"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {deg}°
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Visible edge colour</p>
        <div className="flex gap-2">
          {EDGE_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => updateWall(wall.id, { edgeColor: c.id }, `Edges set to ${c.label}`)}
              className={`flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${
                wall.edgeColor === c.id
                  ? "border-[oklch(0.78_0.13_300)] text-white"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              <span className="h-3 w-3 rounded-sm" style={{ background: c.swatch }} />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Graphics</p>
        <div className="grid grid-cols-2 gap-2">
          {GRAPHIC_TYPES.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() =>
                updateWall(
                  wall.id,
                  {
                    graphicType: g.id as GraphicType,
                    ...(g.id === "backlit_graphic" ? { lightbox: true } : {}),
                  },
                  `Graphic set to ${g.label}`,
                )
              }
              className={`rounded-lg border px-3 py-2.5 text-left transition ${
                wall.graphicType === g.id
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/30"
              }`}
            >
              <span className="block text-xs font-semibold text-white">{g.label}</span>
              <span className="mt-0.5 block text-[10px] leading-snug text-white/40">{g.note}</span>
            </button>
          ))}
        </div>
      </div>

      {wall.graphicType === "solid_color" && (
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Colour</p>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={wall.graphicColor ?? project.branding.primaryColor}
              onChange={(e) => updateWall(wall.id, { graphicColor: e.target.value }, "Wall colour")}
              className="h-9 w-14 cursor-pointer rounded border border-white/15 bg-transparent"
            />
            <button
              type="button"
              onClick={() =>
                updateWall(wall.id, { graphicColor: project.branding.primaryColor }, "Brand colour")
              }
              className="rounded-lg border border-white/15 px-3 py-2 text-[11px] text-white/70 transition hover:border-white/40"
            >
              Use brand colour
            </button>
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Logo treatment</p>
        <div className="grid grid-cols-2 gap-2">
          {LOGO_TREATMENTS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() =>
                updateWall(
                  wall.id,
                  { logo: { ...(wall.logo ?? { scale: 1 }), treatment: t.id as LogoTreatment } },
                  `Logo: ${t.label}`,
                )
              }
              className={`rounded-lg border px-3 py-2 text-xs transition ${
                (wall.logo?.treatment ?? "none") === t.id
                  ? "border-[oklch(0.78_0.13_300)] text-white"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-white/35">
          Concept graphics only — our designers produce the real artwork.
        </p>
      </div>

      <SurfaceBrandControls object={wall} />


      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Backlighting</p>
        <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <input
            type="checkbox"
            checked={wall.lightbox ?? false}
            onChange={(e) =>
              commit(e.target.checked ? "Wall backlit" : "Backlighting off", (d) => {
                const t = d.design.objects.find((o) => o.id === wall.id);
                if (t && t.type === "wall") {
                  t.lightbox = e.target.checked;
                  for (const s of t.sections) s.lightbox = e.target.checked;
                }
              })
            }
            className="mt-0.5 h-4 w-4 accent-[oklch(0.78_0.13_300)]"
          />
          <span>
            <span className="block text-sm font-medium text-white">Light the whole wall</span>
            <span className="mt-1 block text-[11px] leading-relaxed text-white/45">
              The fabric glows evenly from inside — bright, not neon.
            </span>
          </span>
        </label>

        {wall.sections.length > 1 && (
          <div className="mt-3">
            <p className="mb-2 text-[11px] text-white/40">Or light individual sections:</p>
            <div className="flex flex-wrap gap-2">
              {wall.sections.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() =>
                    commit(s.lightbox ? "Section unlit" : "Section backlit", (d) => {
                      const t = d.design.objects.find((o) => o.id === wall.id);
                      if (t && t.type === "wall") {
                        const target = t.sections.find((x) => x.id === s.id);
                        if (target) target.lightbox = !target.lightbox;
                        t.lightbox = t.sections.every((x) => x.lightbox);
                      }
                    })
                  }
                  className={`rounded-lg border px-3 py-2 text-[11px] transition ${
                    s.lightbox
                      ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/15 text-white"
                      : "border-white/10 text-white/55 hover:border-white/30"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>



      <div className="flex gap-2 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={duplicateSelected}
          className="flex-1 rounded-lg border border-white/15 py-2.5 text-xs text-white/80 transition hover:border-white/40"
        >
          Duplicate
        </button>
        <button
          type="button"
          onClick={deleteSelected}
          className="flex-1 rounded-lg border border-red-400/30 py-2.5 text-xs text-red-300 transition hover:border-red-400/60"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
