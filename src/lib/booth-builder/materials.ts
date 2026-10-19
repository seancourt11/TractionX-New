/**
 * Procedural surface textures for the 3D view.
 *
 * Real exhibit renders read as convincing because every surface has a grain:
 * carpet has a weave, vinyl has plank joints, laminate has a soft sheen and
 * aluminium is brushed. We draw those on a canvas at load time rather than
 * shipping texture files, so the builder stays fast and every colour in the
 * swatch list works.
 */

import * as THREE from "three";

type Ctx = CanvasRenderingContext2D;

const cache = new Map<string, THREE.Texture | null>();

function makeCanvas(size: number): { canvas: HTMLCanvasElement; ctx: Ctx } | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  return { canvas, ctx };
}

function finish(canvas: HTMLCanvasElement, repeat: number): THREE.Texture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Slight per-pixel lightness jitter — the base of every fabric-like surface. */
function speckle(ctx: Ctx, size: number, strength: number) {
  const img = ctx.getImageData(0, 0, size, size);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * strength;
    d[i] = Math.max(0, Math.min(255, (d[i] ?? 0) + n));
    d[i + 1] = Math.max(0, Math.min(255, (d[i + 1] ?? 0) + n));
    d[i + 2] = Math.max(0, Math.min(255, (d[i + 2] ?? 0) + n));
  }
  ctx.putImageData(img, 0, 0);
}

function build(key: string, draw: (ctx: Ctx, size: number) => void, size = 256, repeat = 1): THREE.Texture | null {
  const cacheKey = `${key}|${size}|${repeat}`;
  const hit = cache.get(cacheKey);
  if (hit !== undefined) return hit;
  const made = makeCanvas(size);
  if (!made) {
    cache.set(cacheKey, null);
    return null;
  }
  draw(made.ctx, size);
  const tex = finish(made.canvas, repeat);
  cache.set(cacheKey, tex);
  return tex;
}

/* --------------------------------------------------------------- weaves -- */

/** Trade show carpet: a tight woven grid over the swatch colour. */
export function carpetTexture(hex: string, repeat: number): THREE.Texture | null {
  return build(
    `carpet:${hex}`,
    (ctx, size) => {
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, size, size);
      ctx.globalAlpha = 0.08;
      const step = 4;
      for (let y = 0; y < size; y += step) {
        ctx.fillStyle = y % (step * 2) === 0 ? "#ffffff" : "#000000";
        for (let x = (y / step) % 2 === 0 ? 0 : step / 2; x < size; x += step * 2) {
          ctx.fillRect(x, y, step, step / 2);
        }
      }
      ctx.globalAlpha = 1;
      speckle(ctx, size, 16);
    },
    256,
    repeat,
  );
}

/** Rolled vinyl plank: soft grain plus the joint lines between boards. */
export function plankTexture(hex: string, repeat: number): THREE.Texture | null {
  return build(
    `plank:${hex}`,
    (ctx, size) => {
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, size, size);
      const planks = 4;
      const h = size / planks;
      for (let p = 0; p < planks; p++) {
        const y = p * h;
        ctx.globalAlpha = 0.06 + Math.random() * 0.05;
        ctx.fillStyle = p % 2 === 0 ? "#ffffff" : "#000000";
        ctx.fillRect(0, y, size, h);
        ctx.globalAlpha = 0.16;
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
        // Grain streaks along the board.
        ctx.globalAlpha = 0.05;
        for (let g = 0; g < 26; g++) {
          ctx.strokeStyle = Math.random() > 0.5 ? "#ffffff" : "#000000";
          const gy = y + Math.random() * h;
          ctx.beginPath();
          ctx.moveTo(0, gy);
          ctx.bezierCurveTo(size * 0.3, gy + 2, size * 0.6, gy - 2, size, gy);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      speckle(ctx, size, 6);
    },
    256,
    repeat,
  );
}

/** Polished concrete / stone: cloudy mottling, no repeating pattern. */
export function concreteTexture(hex: string, repeat: number): THREE.Texture | null {
  return build(
    `concrete:${hex}`,
    (ctx, size) => {
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, size, size);
      for (let i = 0; i < 140; i++) {
        const r = 8 + Math.random() * 46;
        const g = ctx.createRadialGradient(
          Math.random() * size,
          Math.random() * size,
          0,
          Math.random() * size,
          Math.random() * size,
          r,
        );
        const light = Math.random() > 0.5;
        g.addColorStop(0, light ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);
      }
      speckle(ctx, size, 10);
    },
    256,
    repeat,
  );
}

/** Tensioned SEG fabric / painted panel: barely-there texture that kills flatness. */
export function panelTexture(hex: string): THREE.Texture | null {
  return build(
    `panel:${hex}`,
    (ctx, size) => {
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, size, size);
      ctx.globalAlpha = 0.03;
      for (let y = 0; y < size; y += 3) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, y, size, 1);
      }
      ctx.globalAlpha = 1;
      speckle(ctx, size, 5);
    },
    128,
    6,
  );
}

/** Brushed aluminium for extrusion edges and counter trim. */
export function brushedTexture(hex: string): THREE.Texture | null {
  return build(
    `brushed:${hex}`,
    (ctx, size) => {
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, size, size);
      for (let i = 0; i < 600; i++) {
        ctx.globalAlpha = 0.04 + Math.random() * 0.05;
        ctx.strokeStyle = Math.random() > 0.5 ? "#ffffff" : "#000000";
        const y = Math.random() * size;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y + (Math.random() - 0.5) * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    },
    128,
    2,
  );
}

/* -------------------------------------------------------------- flooring -- */

export type SurfaceLook = {
  map: THREE.Texture | null;
  roughness: number;
  metalness: number;
};

/**
 * The look of the booth floor for a given swatch. Carpet is matte and woven,
 * vinyl planks catch a little light, gloss vinyl behaves almost like a mirror
 * and polished concrete sits between the two.
 */
export function flooringLook(swatchId: string | null, hex: string, areaM: number): SurfaceLook {
  const repeat = Math.max(3, Math.round(areaM * 1.6));
  if (!swatchId) return { map: concreteTexture("#2a2a2a", repeat), roughness: 0.8, metalness: 0.1 };
  if (swatchId.startsWith("carpet")) {
    return { map: carpetTexture(hex, repeat * 2), roughness: 0.95, metalness: 0 };
  }
  if (swatchId.includes("concrete")) {
    return { map: concreteTexture(hex, Math.max(2, Math.round(repeat / 3))), roughness: 0.42, metalness: 0.12 };
  }
  if (swatchId.includes("white") || swatchId.includes("black")) {
    // Gloss rolled vinyl — the reflective show-floor look.
    return { map: plankTexture(hex, Math.max(2, Math.round(repeat / 4))), roughness: 0.16, metalness: 0.22 };
  }
  return { map: plankTexture(hex, Math.max(3, Math.round(repeat / 2))), roughness: 0.35, metalness: 0.08 };
}

/** Panel look for walls and structures: printed fabric, laminate or lit SEG. */
export function panelLook(hex: string, lit: boolean): SurfaceLook {
  return {
    map: panelTexture(hex),
    roughness: lit ? 0.42 : 0.74,
    metalness: 0.02,
  };
}

/** The always-white laminate top every Traction X counter is built with. */
export const COUNTER_TOP_HEX = "#f6f6f4";
