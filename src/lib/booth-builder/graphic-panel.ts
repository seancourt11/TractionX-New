/**
 * Composed booth graphics.
 *
 * A website photo stretched across a wall reads like a screenshot. A booth
 * graphic is a composition: the photograph, the brand's headline, the
 * call-to-action wording and the logo, laid out to the proportions of the
 * surface with enough contrast that everything stays legible.
 *
 * Composition happens on a browser canvas and the result is cached in memory,
 * so a surface is only drawn once per set of inputs.
 */

import { contrastRatio, isDarkSurface } from "./brandkit";
import { proxiedImage } from "./brand-image";

export type PanelSpec = {
  /** Remote or local photograph. Omitted for the colour-only look. */
  imageUrl?: string;
  headline?: string;
  cta?: string;
  logoUrl?: string;
  background: string;
  accent: string;
  /** Surface width divided by height. */
  aspect: number;
  /** "top_left" pushes the copy block off-centre, matching the logo rule. */
  align?: "left" | "center";
};

const cache = new Map<string, string>();
const pending = new Map<string, Promise<string | null>>();

const keyOf = (s: PanelSpec) =>
  [s.imageUrl, s.headline, s.cta, s.logoUrl, s.background, s.accent, s.aspect.toFixed(2), s.align].join("|");

function loadImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/** Cover-fit a source image into a box, like CSS object-fit: cover. */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
): void {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) return lines;
    } else {
      line = next;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

/**
 * Draw one surface. Returns a data URL, or null when there is nothing worth
 * composing (no photo, no copy, no logo) so the caller keeps its flat colour.
 */
export async function composePanel(spec: PanelSpec): Promise<string | null> {
  if (typeof document === "undefined") return null;
  const hasCopy = Boolean(spec.headline?.trim() || spec.cta?.trim());
  if (!spec.imageUrl && !hasCopy && !spec.logoUrl) return null;

  const key = keyOf(spec);
  const hit = cache.get(key);
  if (hit) return hit;
  const inflight = pending.get(key);
  if (inflight) return inflight;

  const job = (async () => {
    const aspect = Math.min(Math.max(spec.aspect || 2, 0.4), 6);
    const W = 2048;
    const H = Math.round(W / aspect);
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Base colour, so a failed photo still gives a branded surface.
    ctx.fillStyle = spec.background;
    ctx.fillRect(0, 0, W, H);

    let photoDrawn = false;
    if (spec.imageUrl) {
      const img = await loadImage(proxiedImage(spec.imageUrl) ?? spec.imageUrl);
      if (img) {
        drawCover(ctx, img, W, H);
        photoDrawn = true;
      }
    }

    const left = spec.align === "left";
    const pad = Math.round(W * 0.06);
    const textColor = photoDrawn || isDarkSurface(spec.background) ? "#ffffff" : "#0d0d0d";

    if (hasCopy && photoDrawn) {
      // A soft scrim keeps the copy readable over busy photography.
      const grad = ctx.createLinearGradient(0, H, 0, 0);
      grad.addColorStop(0, "rgba(0,0,0,0.72)");
      grad.addColorStop(0.55, "rgba(0,0,0,0.25)");
      grad.addColorStop(1, "rgba(0,0,0,0.05)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    let cursor = H - pad;

    if (spec.cta?.trim()) {
      const size = Math.round(H * 0.055);
      ctx.font = `600 ${size}px Inter, "Helvetica Neue", Arial, sans-serif`;
      const label = spec.cta.trim().slice(0, 40);
      const tw = ctx.measureText(label).width;
      const bw = tw + size * 1.6;
      const bh = size * 2.1;
      const bx = left ? pad : (W - bw) / 2;
      const by = cursor - bh;
      const chip = spec.accent;
      ctx.fillStyle = chip;
      const r = bh / 2;
      ctx.beginPath();
      ctx.moveTo(bx + r, by);
      ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
      ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
      ctx.arcTo(bx, by + bh, bx, by, r);
      ctx.arcTo(bx, by, bx + bw, by, r);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = contrastRatio(chip, "#ffffff") >= 3 ? "#ffffff" : "#0d0d0d";
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillText(label, bx + size * 0.8, by + bh / 2);
      cursor = by - pad * 0.7;
    }

    if (spec.headline?.trim()) {
      const size = Math.round(H * 0.115);
      ctx.font = `800 ${size}px Montserrat, Inter, "Helvetica Neue", Arial, sans-serif`;
      ctx.fillStyle = textColor;
      ctx.textAlign = left ? "left" : "center";
      ctx.textBaseline = "alphabetic";
      const lines = wrap(ctx, spec.headline.trim(), W - pad * 2, 3);
      const lh = size * 1.14;
      let y = cursor - (lines.length - 1) * lh;
      for (const line of lines) {
        ctx.fillText(line, left ? pad : W / 2, y);
        y += lh;
      }
      cursor = cursor - lines.length * lh - pad * 0.5;
    }

    if (spec.logoUrl) {
      const logo = await loadImage(proxiedImage(spec.logoUrl) ?? spec.logoUrl);
      if (logo && logo.width && logo.height) {
        const maxW = W * 0.3;
        const maxH = H * 0.2;
        const scale = Math.min(maxW / logo.width, maxH / logo.height);
        const lw = logo.width * scale;
        const lh = logo.height * scale;
        ctx.drawImage(logo, left ? pad : (W - lw) / 2, pad, lw, lh);
      }
    }

    try {
      const url = canvas.toDataURL("image/jpeg", 0.9);
      cache.set(key, url);
      return url;
    } catch {
      // A photo that slipped through without CORS taints the canvas.
      return null;
    }
  })().finally(() => pending.delete(key));

  pending.set(key, job);
  return job;
}
