/**
 * Project helpers — creating booths and walls, measuring them, and snapping.
 *
 * Booth floor space: origin (0,0) is the back-left corner of the booth,
 * x runs left→right across the frontage, z runs back→front toward the aisle.
 */

import {
  GRID_STEP_MM,
  WALL_PRESETS,
  ftToMm,
  heightMm,
  modulesForWidth,
} from "./presets";
import type {
  BoothObject,
  BoothProject,
  BoothType,
  HeightPreset,
  ItemObject,
  WallObject,
  WallSection,
} from "./types";
import { ITEM_PRESETS } from "./presets";

export const WALL_THICKNESS_MM = 100;

let seq = 0;
export function uid(prefix: string): string {
  seq += 1;
  return `${prefix}_${Date.now().toString(36)}${seq.toString(36)}`;
}

export function createProject(opts: {
  projectName: string;
  boothSize: string;
  boothType: BoothType;
  widthFt: number;
  depthFt: number;
  website?: string;
}): BoothProject {
  return {
    project: {
      projectName: opts.projectName || "Untitled booth",
      boothSize: opts.boothSize,
      boothType: opts.boothType,
      widthMm: ftToMm(opts.widthFt),
      depthMm: ftToMm(opts.depthFt),
      showName: "",
    },
    branding: {
      website: opts.website ?? "",
      logoUrl: "",
      logoDarkUrl: "",
      primaryColor: "#7C3AED",
      secondaryColor: "#111111",
      palette: [],
      images: [],
      assets: [],
      mode: "color",
    },
    regulations: {
      enabled: true,
      profile: "north_american_standard",
      maximumHeightMm: null,
    },
    design: {
      wholeBoothIlluminated: false,
      flooring: { swatchId: null },
      objects: [],
    },
  };
}

export function sectionsFor(widthMm: number): WallSection[] {
  return modulesForWidth(widthMm).map((w) => ({
    id: uid("wall_section"),
    widthMm: w,
    lightbox: false,
  }));
}

export function isWall(o: BoothObject): o is WallObject {
  return o.type === "wall";
}

export function isItem(o: BoothObject): o is ItemObject {
  return o.type === "item";
}

export function wallWidthMm(o: BoothObject): number {
  return isWall(o) ? o.sections.reduce((sum, s) => sum + s.widthMm, 0) : o.widthMm;
}

/** Un-rotated footprint of any object, in mm. */
export function objectFootprint(o: BoothObject): { widthMm: number; depthMm: number } {
  return isWall(o)
    ? { widthMm: wallWidthMm(o), depthMm: WALL_THICKNESS_MM }
    : { widthMm: o.widthMm, depthMm: o.depthMm };
}

/** Create any non-wall object from its library preset. */
/**
 * Find an open patch of floor for a newly added object, so pieces don't land
 * on top of each other. Walks the booth in a coarse grid and takes the first
 * clear spot, falling back to the centre.
 */
export function findFreeSpot(
  project: BoothProject,
  widthMm: number,
  depthMm: number,
): { x: number; z: number } {
  const halfX = widthMm / 2;
  const halfZ = depthMm / 2;
  const bw = project.project.widthMm;
  const bd = project.project.depthMm;
  const step = 300;
  const taken = project.design.objects
    .filter((o) => !(o.type === "item" && o.kind === "hanging"))
    .map((o) => wallBounds(o));
  const clear = (x: number, z: number) =>
    !taken.some(
      (t) => x + halfX > t.minX && x - halfX < t.maxX && z + halfZ > t.minZ && z - halfZ < t.maxZ,
    );

  for (let z = halfZ; z <= bd - halfZ; z += step) {
    for (let x = halfX; x <= bw - halfX; x += step) {
      if (clear(x, z)) return { x: Math.round(x), z: Math.round(z) };
    }
  }
  return { x: Math.min(Math.max(halfX, bw / 2), Math.max(halfX, bw - halfX)), z: Math.min(Math.max(halfZ, bd / 2), Math.max(halfZ, bd - halfZ)) };
}

export function createItemFromPreset(presetId: string, project: BoothProject): ItemObject {
  const p = ITEM_PRESETS.find((x) => x.id === presetId);
  const base = p ?? ITEM_PRESETS[0];
  const inlineStorage =
    base.kind === "storage" && (project.project.boothType === "inline" || project.project.boothType === "corner");
  const hanging = base.kind === "hanging";
  const depthMm = inlineStorage ? Math.min(base.depthMm, 992) : base.depthMm;

  return {
    id: uid(base.kind),
    type: "item",
    kind: base.kind,
    sizing: base.sizing,
    name: base.label,
    presetId: base.id,
    visualKey: base.visualKey ?? base.id,
    widthMm: base.widthMm,
    depthMm,
    heightMm: base.heightMm,
    elevationMm: base.elevationMm,
    finish: base.finish,
    lightbox: false,
    ...(hanging
      ? {
          shape: (base as { shape?: "square" | "rectangle" | "halo" }).shape ?? "square",
          doubleSided: true,
          hangHeightMm: base.elevationMm ?? 3660,
        }
      : {}),
    position: hanging
      ? { x: project.project.widthMm / 2, z: project.project.depthMm / 2 }
      : findFreeSpot(project, base.widthMm, depthMm),
    rotationDeg: 0,
  };
}

export function createWallFromPreset(presetId: string, project: BoothProject): WallObject {
  const preset = WALL_PRESETS.find((p) => p.id === presetId);
  const ft = preset?.ft ?? 10;
  const heightPreset: HeightPreset = presetId === "tall_feature_wall" ? "extra_tall" : "standard";
  const sections = sectionsFor(ftToMm(ft));
  const width = sections.reduce((s, x) => s + x.widthMm, 0);
  const isSide = preset?.group === "Side / Return Walls";

  return {
    id: uid("wall"),
    type: "wall",
    name: preset?.label ?? "Wall",
    buildMode: "preset",
    preset: presetId,
    heightMm: heightMm(heightPreset),
    heightPreset,
    edgeColor: "white",
    graphicType: "full_seg_graphic",
    sections,
    logo: { treatment: "none", scale: 1 },
    position: isSide
      ? { x: WALL_THICKNESS_MM / 2, z: Math.min(width / 2, project.project.depthMm / 2) }
      : {
          x: Math.min(width / 2, project.project.widthMm / 2),
          z: WALL_THICKNESS_MM / 2,
        },
    rotationDeg: isSide ? 90 : 0,
  };
}

export function createModularWall(widthMm: number, project: BoothProject): WallObject {
  const sections: WallSection[] = [{ id: uid("wall_section"), widthMm, lightbox: false }];
  return {
    id: uid("wall"),
    type: "wall",
    name: `${widthMm} mm module`,
    buildMode: "modular",
    heightMm: heightMm("standard"),
    heightPreset: "standard",
    edgeColor: "white",
    graphicType: "full_seg_graphic",
    sections,
    logo: { treatment: "none", scale: 1 },
    position: { x: project.project.widthMm / 2, z: project.project.depthMm / 2 },
    rotationDeg: 0,
  };
}

/** Axis-aligned footprint of any object in booth space. */
export function wallBounds(obj: BoothObject) {
  const { widthMm: w, depthMm: d } = objectFootprint(obj);
  const along = Math.abs(Math.sin((obj.rotationDeg * Math.PI) / 180)) > 0.5;
  const halfX = (along ? d : w) / 2;
  const halfZ = (along ? w : d) / 2;
  return {
    minX: obj.position.x - halfX,
    maxX: obj.position.x + halfX,
    minZ: obj.position.z - halfZ,
    maxZ: obj.position.z + halfZ,
    halfX,
    halfZ,
    along,
    widthMm: w,
  };
}

const snapTo = (v: number, step: number) => Math.round(v / step) * step;

/**
 * Snap a dragged wall centre: booth boundaries first, then other walls'
 * edges and endpoints, then the modular grid.
 */
export function snapWall(
  wall: BoothObject,
  desired: { x: number; z: number },
  project: BoothProject,
  others: BoothObject[],
): { x: number; z: number; guides: { x?: number; z?: number } } {
  const b = wallBounds({ ...wall, position: desired });
  const tol = 140;
  let x = desired.x;
  let z = desired.z;
  const guides: { x?: number; z?: number } = {};

  const xTargets = [b.halfX, project.project.widthMm - b.halfX];
  const zTargets = [b.halfZ, project.project.depthMm - b.halfZ];

  for (const o of others) {
    const ob = wallBounds(o);
    xTargets.push(ob.minX - b.halfX, ob.maxX + b.halfX, o.position.x);
    zTargets.push(ob.minZ - b.halfZ, ob.maxZ + b.halfZ, o.position.z);
  }

  let best = tol;
  for (const t of xTargets) {
    const d = Math.abs(t - desired.x);
    if (d < best) {
      best = d;
      x = t;
      guides.x = t;
    }
  }
  best = tol;
  for (const t of zTargets) {
    const d = Math.abs(t - desired.z);
    if (d < best) {
      best = d;
      z = t;
      guides.z = t;
    }
  }

  if (guides.x === undefined) x = snapTo(desired.x, GRID_STEP_MM);
  if (guides.z === undefined) z = snapTo(desired.z, GRID_STEP_MM);

  // Keep the wall inside the booth footprint.
  x = Math.min(Math.max(x, b.halfX), Math.max(b.halfX, project.project.widthMm - b.halfX));
  z = Math.min(Math.max(z, b.halfZ), Math.max(b.halfZ, project.project.depthMm - b.halfZ));

  return { x, z, guides };
}

/** "20 ft 0 in" style label for a millimetre run. */
export function mmLabel(mm: number): string {
  const totalIn = mm / 25.4;
  const ft = Math.floor(totalIn / 12);
  const inch = Math.round(totalIn - ft * 12);
  return inch === 0 ? `${ft} ft` : `${ft} ft ${inch} in`;
}
