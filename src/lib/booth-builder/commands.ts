/**
 * The approved command list the AI assistant is allowed to emit.
 *
 * The model never produces geometry — it returns commands from this list and
 * they are applied here, against the same helpers the UI uses, as one
 * undoable transaction.
 */

import {
  FLOORING_SWATCHES,
  GRAPHIC_TYPES,
  HEIGHTS,
  ITEM_PRESETS,
  WALL_PRESETS,
  heightMm,
} from "./presets";
import { createItemFromPreset, createModularWall, createWallFromPreset, isWall } from "./project";
import { applyBrandKit } from "./brandkit";
import type {
  BoothObject,
  BoothProject,
  BrandMode,
  GraphicType,
  HeightPreset,
  ItemKind,
} from "./types";

/** Which objects a command applies to. */
export type CommandTarget =
  | "all"
  | "walls"
  | "selected"
  | "storage"
  | "tower"
  | "counter"
  | "tv"
  | "furniture"
  | "hanging";

export type BoothCommand =
  | { action: "addWallPreset"; presetId: string }
  | { action: "addModularWall"; widthMm: number }
  | { action: "addItem"; presetId: string }
  | { action: "setHeight"; target: CommandTarget; heightPreset: HeightPreset }
  | { action: "setGraphicType"; target: CommandTarget; graphicType: GraphicType; color?: string }
  | { action: "setLightbox"; target: CommandTarget; on: boolean }
  | { action: "setWholeBoothLight"; on: boolean }
  | { action: "setFlooring"; swatchId: string | null }
  | { action: "setFinish"; target: CommandTarget; finish: "white" | "black" | "wood" | "brand" }
  | { action: "setEdgeColor"; target: CommandTarget; edgeColor: "white" | "black" | "brand" }
  | { action: "setBrandColor"; primaryColor?: string; secondaryColor?: string }
  /** Read a website and dress the booth with what it finds. Resolved before the commit. */
  | { action: "brandFromWebsite"; url: string; mode?: BrandMode }
  /** Re-dress the booth with the brand already loaded. */
  | { action: "applyBrandKit"; mode?: BrandMode }
  /** Put one of the pulled photographs on a specific surface. */
  | { action: "setSurfaceImage"; target: CommandTarget; imageIndex: number }
  | { action: "removeObjects"; target: CommandTarget };

export const COMMAND_ACTIONS = [
  "addWallPreset",
  "addModularWall",
  "addItem",
  "setHeight",
  "setGraphicType",
  "setLightbox",
  "setWholeBoothLight",
  "setFlooring",
  "setFinish",
  "setEdgeColor",
  "setBrandColor",
  "brandFromWebsite",
  "applyBrandKit",
  "setSurfaceImage",
  "removeObjects",
] as const;


const ITEM_KINDS: ItemKind[] = ["storage", "tower", "counter", "tv", "furniture", "hanging"];

function matches(o: BoothObject, target: CommandTarget, selectedId: string | null): boolean {
  if (target === "all") return true;
  if (target === "walls") return o.type === "wall";
  if (target === "selected") return o.id === selectedId;
  return o.type === "item" && o.kind === (target as ItemKind);
}

function resolve(draft: BoothProject, target: CommandTarget, selectedId: string | null): BoothObject[] {
  const hit = draft.design.objects.filter((o) => matches(o, target, selectedId));
  // "selected" with nothing selected falls back to everything, which is what
  // people mean when they say "make it taller" without clicking first.
  if (target === "selected" && hit.length === 0) return draft.design.objects;
  return hit;
}

const validHeight = (h: string): h is HeightPreset => HEIGHTS.some((x) => x.id === h);
const validGraphic = (g: string): g is GraphicType => GRAPHIC_TYPES.some((x) => x.id === g);

/** Apply one command to a draft project. Returns a plain-language summary. */
export function applyCommand(
  draft: BoothProject,
  cmd: BoothCommand,
  selectedId: string | null,
): string | null {
  switch (cmd.action) {
    case "addWallPreset": {
      const preset = WALL_PRESETS.find((p) => p.id === cmd.presetId);
      if (!preset) return null;
      draft.design.objects.push(createWallFromPreset(preset.id, draft));
      return `Added a ${preset.label}`;
    }
    case "addModularWall": {
      const w = [992, 496, 310].reduce((best, m) =>
        Math.abs(m - cmd.widthMm) < Math.abs(best - cmd.widthMm) ? m : best,
      );
      draft.design.objects.push(createModularWall(w, draft));
      return `Added a ${w} mm wall module`;
    }
    case "addItem": {
      const preset = ITEM_PRESETS.find((p) => p.id === cmd.presetId);
      if (!preset) return null;
      draft.design.objects.push(createItemFromPreset(preset.id, draft));
      return `Added a ${preset.label}`;
    }
    case "setHeight": {
      if (!validHeight(cmd.heightPreset)) return null;
      const mm = heightMm(cmd.heightPreset);
      const label = HEIGHTS.find((h) => h.id === cmd.heightPreset)?.label ?? "Standard";
      let n = 0;
      for (const o of resolve(draft, cmd.target, selectedId)) {
        if (o.type === "item" && (o.kind === "furniture" || o.kind === "tv" || o.kind === "hanging")) continue;
        o.heightMm = mm;
        if (isWall(o)) o.heightPreset = cmd.heightPreset;
        n += 1;
      }
      return n ? `Set ${n} piece${n === 1 ? "" : "s"} to ${label} height` : null;
    }
    case "setGraphicType": {
      if (!validGraphic(cmd.graphicType)) return null;
      const label = GRAPHIC_TYPES.find((g) => g.id === cmd.graphicType)?.label ?? "graphic";
      let n = 0;
      for (const o of resolve(draft, cmd.target, selectedId)) {
        if (!isWall(o)) continue;
        o.graphicType = cmd.graphicType;
        if (cmd.graphicType === "solid_color") o.graphicColor = cmd.color || draft.branding.primaryColor;
        if (cmd.graphicType === "backlit_graphic") {
          o.lightbox = true;
          for (const s of o.sections) s.lightbox = true;
        }
        n += 1;
      }
      return n ? `${label} applied to ${n} wall${n === 1 ? "" : "s"}` : null;
    }
    case "setLightbox": {
      let n = 0;
      for (const o of resolve(draft, cmd.target, selectedId)) {
        if (o.type === "item" && (o.kind === "tv" || o.kind === "furniture")) continue;
        o.lightbox = cmd.on;
        if (isWall(o)) for (const s of o.sections) s.lightbox = cmd.on;
        n += 1;
      }
      if (!cmd.on) draft.design.wholeBoothIlluminated = false;
      return n ? `${cmd.on ? "Lit" : "Turned off the light on"} ${n} piece${n === 1 ? "" : "s"}` : null;
    }
    case "setWholeBoothLight": {
      draft.design.wholeBoothIlluminated = cmd.on;
      for (const o of draft.design.objects) {
        if (isWall(o)) {
          o.lightbox = cmd.on;
          for (const s of o.sections) s.lightbox = cmd.on;
        } else if (o.kind !== "tv" && o.kind !== "furniture") {
          o.lightbox = cmd.on;
        }
      }
      return cmd.on ? "Lit the whole booth" : "Turned all backlighting off";
    }
    case "setFlooring": {
      if (cmd.swatchId === null) {
        draft.design.flooring.swatchId = null;
        return "Removed the flooring";
      }
      const swatch = FLOORING_SWATCHES.find((f) => f.id === cmd.swatchId);
      if (!swatch) return null;
      draft.design.flooring.swatchId = swatch.id;
      return `Flooring set to ${swatch.label} ${swatch.family.toLowerCase()}`;
    }
    case "setFinish": {
      let n = 0;
      for (const o of resolve(draft, cmd.target, selectedId)) {
        if (o.type !== "item") continue;
        o.finish = cmd.finish;
        n += 1;
      }
      return n ? `Changed the finish on ${n} piece${n === 1 ? "" : "s"}` : null;
    }
    case "setEdgeColor": {
      let n = 0;
      for (const o of resolve(draft, cmd.target, selectedId)) {
        if (!isWall(o)) continue;
        o.edgeColor = cmd.edgeColor;
        n += 1;
      }
      return n ? `Frame edges set to ${cmd.edgeColor}` : null;
    }
    case "setBrandColor": {
      if (cmd.primaryColor) draft.branding.primaryColor = cmd.primaryColor;
      if (cmd.secondaryColor) draft.branding.secondaryColor = cmd.secondaryColor;
      for (const o of draft.design.objects) {
        if (isWall(o) && o.graphicType === "solid_color" && cmd.primaryColor) o.graphicColor = cmd.primaryColor;
      }
      return "Updated your brand colours";
    }
    case "brandFromWebsite": {
      // The website is read before the commit; by the time we get here the
      // brand is already on the project, so this just dresses the booth.
      if (cmd.mode) draft.branding.mode = cmd.mode;
      applyBrandKit(draft);
      return "Branded the booth from your website";
    }
    case "applyBrandKit": {
      if (cmd.mode) draft.branding.mode = cmd.mode;
      applyBrandKit(draft);
      return cmd.mode === "color" ? "Dressed the booth in brand colour" : "Dressed the booth in your brand";
    }
    case "setSurfaceImage": {
      const images = (draft.branding.images ?? []).filter((i) => i.use);
      const img = images[Math.max(0, Math.min(images.length - 1, cmd.imageIndex ?? 0))];
      if (!img) return null;
      let n = 0;
      for (const o of resolve(draft, cmd.target, selectedId)) {
        if (o.type === "item" && (o.kind === "tv" || o.kind === "furniture")) continue;
        o.graphic = { ...(o.graphic ?? {}), imageUrl: img.url, logoPlacement: o.graphic?.logoPlacement ?? "top_left" };
        if (isWall(o)) o.graphicType = "full_seg_graphic";
        n += 1;
      }
      return n ? `Put your photography on ${n} surface${n === 1 ? "" : "s"}` : null;
    }
    case "removeObjects": {
      const doomed = new Set(resolve(draft, cmd.target, selectedId).map((o) => o.id));
      if (!doomed.size) return null;
      draft.design.objects = draft.design.objects.filter((o) => !doomed.has(o.id));
      return `Removed ${doomed.size} piece${doomed.size === 1 ? "" : "s"}`;
    }
    default:
      return null;
  }
}

/** Everything the model is allowed to reference, sent with each request. */
export function commandVocabulary() {
  return {
    wallPresets: WALL_PRESETS.map((p) => ({ id: p.id, label: p.label })),
    itemPresets: ITEM_PRESETS.map((p) => ({ id: p.id, label: p.label, kind: p.kind })),
    heightPresets: HEIGHTS.map((h) => ({ id: h.id, label: h.label, mm: h.mm })),
    graphicTypes: GRAPHIC_TYPES.map((g) => ({ id: g.id, label: g.label })),
    flooring: FLOORING_SWATCHES.map((f) => ({ id: f.id, label: `${f.label} ${f.family}` })),
    itemKinds: ITEM_KINDS,
    actions: COMMAND_ACTIONS,
  };
}
