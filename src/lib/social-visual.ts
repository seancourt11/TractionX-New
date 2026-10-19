/**
 * Canvas compositor for the internal social library.
 *
 * Everything here runs in the browser and only ever reads images that already
 * exist in the site's own asset pipeline — rental catalogue photos, portable
 * product shots, venue/show heroes and the portfolio gallery. Nothing is
 * generated; we crop, scrim and label existing photography so a post can be
 * downloaded at the exact size LinkedIn and Instagram want.
 */

export type SocialSize = "linkedin" | "ig_square" | "ig_vertical";

export const SOCIAL_SIZES: Record<SocialSize, { w: number; h: number; label: string }> = {
  linkedin: { w: 1200, h: 627, label: "LinkedIn 1200×627" },
  ig_square: { w: 1080, h: 1080, label: "Instagram 1080×1080" },
  ig_vertical: { w: 1080, h: 1350, label: "Instagram 1080×1350" },
};

export const SOCIAL_SIZE_ORDER: SocialSize[] = ["linkedin", "ig_square", "ig_vertical"];

/** Brand values mirrored from the site tokens so exports look native. */
const INK = "#0a0a0a";
const PAPER = "#ffffff";
const ACCENT = "#c8b6ff";
const HEADING_FONT = "Montserrat, 'Helvetica Neue', Arial, sans-serif";
const BODY_FONT = "Inter, 'Helvetica Neue', Arial, sans-serif";

export type VisualSpec = {
  /** Primary image URL. */
  src?: string;
  /** Second image, drawn beside the first for split visuals. */
  splitSrc?: string;
  /** Captions painted beneath each half of a split visual. */
  splitLabels?: [string, string];
  /** Headline painted over the image. */
  headline?: string;
  /** Small line under the headline (asset label, size, price). */
  subline?: string;
  /** Promise badge texts baked into the lower strip. */
  badges?: string[];
  /** Wordmark painted in the corner. */
  wordmark?: string;
};

const imageCache = new Map<string, Promise<HTMLImageElement | null>>();

function loadImage(src: string): Promise<HTMLImageElement | null> {
  const cached = imageCache.get(src);
  if (cached) return cached;
  const p = new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
  imageCache.set(src, p);
  return p;
}

/** Cover-fit an image into a rect, centre-cropped. */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

/** Word-wrap `text` to `maxWidth`, returning at most `maxLines` lines. */
function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth || !line) {
      line = next;
    } else {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    }
  }
  if (lines.length < maxLines && line) lines.push(line);
  if (lines.length === maxLines && words.length) {
    let last = lines[maxLines - 1];
    while (last.length > 4 && ctx.measureText(`${last}…`).width > maxWidth) {
      last = last.slice(0, -1);
    }
    const joined = lines.join(" ");
    if (joined.split(/\s+/).length < words.length) lines[maxLines - 1] = `${last.trimEnd()}…`;
  }
  return lines;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Render one spec at one platform size and return the canvas. */
export async function renderVisual(spec: VisualSpec, size: SocialSize): Promise<HTMLCanvasElement> {
  const { w, h } = SOCIAL_SIZES[size];
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Base
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, w, h);

  const [primary, secondary] = await Promise.all([
    spec.src ? loadImage(spec.src) : Promise.resolve(null),
    spec.splitSrc ? loadImage(spec.splitSrc) : Promise.resolve(null),
  ]);

  const pad = Math.round(w * 0.055);

  if (secondary && primary) {
    const gap = Math.round(w * 0.012);
    const half = (w - gap) / 2;
    drawCover(ctx, primary, 0, 0, half, h);
    drawCover(ctx, secondary, half + gap, 0, half, h);
    ctx.fillStyle = INK;
    ctx.fillRect(half, 0, gap, h);
  } else if (primary) {
    drawCover(ctx, primary, 0, 0, w, h);
  } else {
    // No photo resolved — fall back to a clean brand card rather than a blank.
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#111111");
    g.addColorStop(1, "#1d1a26");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  // Scrim so text always reads, top and bottom.
  const top = ctx.createLinearGradient(0, 0, 0, h * 0.55);
  top.addColorStop(0, "rgba(10,10,10,0.82)");
  top.addColorStop(1, "rgba(10,10,10,0)");
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, w, h * 0.55);

  const bottom = ctx.createLinearGradient(0, h, 0, h * 0.4);
  bottom.addColorStop(0, "rgba(10,10,10,0.92)");
  bottom.addColorStop(1, "rgba(10,10,10,0)");
  ctx.fillStyle = bottom;
  ctx.fillRect(0, h * 0.4, w, h * 0.6);

  // Wordmark, top-left.
  const markSize = Math.round(w * 0.026);
  ctx.font = `700 ${markSize}px ${HEADING_FONT}`;
  ctx.fillStyle = PAPER;
  ctx.textBaseline = "top";
  ctx.letterSpacing = `${Math.round(markSize * 0.18)}px`;
  ctx.fillText((spec.wordmark ?? "TRACTION X").toUpperCase(), pad, pad);
  ctx.letterSpacing = "0px";

  // Split labels sit just under the wordmark line, centred over each half.
  if (spec.splitLabels && secondary && primary) {
    const labelSize = Math.round(w * 0.038);
    ctx.font = `700 ${labelSize}px ${HEADING_FONT}`;
    ctx.textAlign = "center";
    ctx.fillStyle = ACCENT;
    const y = pad + markSize * 2.4;
    ctx.fillText(spec.splitLabels[0].toUpperCase(), w * 0.25, y);
    ctx.fillText(spec.splitLabels[1].toUpperCase(), w * 0.75, y);
    ctx.textAlign = "left";
  }

  // Bottom stack: badges, then subline, then headline (drawn upward).
  let cursor = h - pad;

  if (spec.badges?.length) {
    const badgeSize = Math.round(w * 0.021);
    ctx.font = `600 ${badgeSize}px ${BODY_FONT}`;
    const padX = Math.round(badgeSize * 0.85);
    const badgeH = Math.round(badgeSize * 2.3);
    let bx = pad;
    let by = cursor - badgeH;
    let rowUsed = false;
    for (const badge of spec.badges.slice(0, 3)) {
      const text = badge.toUpperCase();
      const bw = ctx.measureText(text).width + padX * 2;
      if (rowUsed && bx + bw > w - pad) {
        by -= badgeH + Math.round(badgeH * 0.28);
        bx = pad;
      }
      if (bx + bw > w - pad && !rowUsed) {
        // Single badge wider than the canvas — skip rather than overflow.
        continue;
      }
      ctx.fillStyle = ACCENT;
      roundRect(ctx, bx, by, bw, badgeH, badgeH / 2);
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.textBaseline = "middle";
      ctx.fillText(text, bx + padX, by + badgeH / 2 + 1);
      ctx.textBaseline = "top";
      bx += bw + Math.round(badgeH * 0.3);
      rowUsed = true;
    }
    cursor = by - Math.round(badgeH * 0.7);
  }

  if (spec.subline) {
    const subSize = Math.round(w * 0.022);
    ctx.font = `500 ${subSize}px ${BODY_FONT}`;
    const lines = wrap(ctx, spec.subline, w - pad * 2, 2);
    const blockH = lines.length * subSize * 1.4;
    let y = cursor - blockH;
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    for (const line of lines) {
      ctx.fillText(line, pad, y);
      y += subSize * 1.4;
    }
    cursor -= blockH + Math.round(subSize * 0.9);
  }

  if (spec.headline) {
    const headSize = Math.round(w * (size === "linkedin" ? 0.055 : 0.062));
    ctx.font = `700 ${headSize}px ${HEADING_FONT}`;
    const maxLines = size === "linkedin" ? 2 : 3;
    const lines = wrap(ctx, spec.headline, w - pad * 2, maxLines);
    const lineH = headSize * 1.15;
    let y = cursor - lines.length * lineH;
    ctx.fillStyle = PAPER;
    for (const line of lines) {
      ctx.fillText(line, pad, y);
      y += lineH;
    }
    cursor -= lines.length * lineH;

    // Accent rule above the headline.
    const ruleW = Math.round(w * 0.09);
    const ruleY = cursor - Math.round(headSize * 0.55);
    if (ruleY > pad + markSize * 3) {
      ctx.fillStyle = ACCENT;
      ctx.fillRect(pad, ruleY, ruleW, Math.max(3, Math.round(w * 0.004)));
    }
  }

  return canvas;
}

/** Render and return a data URL, for previews. */
export async function renderDataUrl(spec: VisualSpec, size: SocialSize): Promise<string> {
  const canvas = await renderVisual(spec, size);
  return canvas.toDataURL("image/png");
}

/** Render and trigger a browser download. */
export async function downloadVisual(spec: VisualSpec, size: SocialSize, filename: string) {
  const canvas = await renderVisual(spec, size);
  await new Promise<void>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename.endsWith(".png") ? filename : `${filename}.png`;
      a.click();
      URL.revokeObjectURL(url);
      resolve();
    }, "image/png");
  });
}
