/**
 * Brand kit — turning a customer's colours, logo and photography into a booth
 * that looks like a designer dressed it.
 *
 * Two looks: "photo" puts their imagery on the big surfaces, "color" keeps it
 * to brand colour only. Logo placement follows the same rules a designer uses:
 * high and centred on the back wall, off to the top-left when the artwork
 * behind it is busy, once per sightline on returns, centred on counter fronts.
 */

import { isWall, wallBounds, wallWidthMm } from "./project";
import type {
  BoothObject,
  BoothProject,
  BrandImage,
  BrandMode,
  ItemObject,
  LogoPlacement,
  WallObject,
} from "./types";

/* ---------------------------------------------------------------- colour -- */

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = Number.parseInt(full.slice(0, 6) || "000000", 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const channel = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** True when a surface is dark enough that a white logo reads best on it. */
export function isDarkSurface(hex: string): boolean {
  return luminance(hex) < 0.4;
}

/** Nudge a colour lighter or darker — used for accent bands on structures. */
export function shade(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const mix = (c: number) =>
    Math.round(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount))
      .toString(16)
      .padStart(2, "0");
  return `#${mix(r)}${mix(g)}${mix(b)}`;
}

/**
 * Which version of the mark to show over a given background. Falls back to the
 * one logo we have when only one was supplied.
 */
export function logoForBackground(project: BoothProject, backgroundHex: string): string {
  const { logoUrl, logoDarkUrl } = project.branding;
  if (!logoUrl && !logoDarkUrl) return "";
  if (!logoDarkUrl) return logoUrl;
  if (!logoUrl) return logoDarkUrl;
  return isDarkSurface(backgroundHex) ? logoUrl : logoDarkUrl;
}

/* -------------------------------------------------------------- surfaces -- */

/** The flat colour a surface is currently showing, used for contrast checks. */
export function surfaceColor(obj: BoothObject, project: BoothProject): string {
  if (isWall(obj)) {
    if (obj.graphicType === "solid_color") return obj.graphicColor ?? project.branding.primaryColor;
    return "#ededed";
  }
  if (obj.finish === "brand") return project.branding.primaryColor;
  if (obj.finish === "black") return "#141414";
  if (obj.finish === "wood") return "#8a6a45";
  return "#ededed";
}

/** The wall that reads as the back wall: the widest one nearest the back edge. */
export function backWallId(project: BoothProject): string | null {
  const walls = project.design.objects.filter(isWall);
  if (!walls.length) return null;
  const scored = walls.map((w) => ({
    id: w.id,
    score: wallWidthMm(w) * 2 - wallBounds(w).minZ,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.id ?? null;
}

const isSideWall = (w: WallObject) => Math.abs(Math.sin((w.rotationDeg * Math.PI) / 180)) > 0.5;

/**
 * Where the mark belongs on this object. Photography that runs wide across a
 * wall usually has its subject centre-right, so the mark moves to the top-left
 * and keeps its clear space.
 */
export function resolveLogoPlacement(
  obj: BoothObject,
  project: BoothProject,
  opts: { hasImage: boolean; isBackWall: boolean; sideWallIndex: number },
): LogoPlacement {
  if (isWall(obj)) {
    if (opts.isBackWall) {
      const wide = wallWidthMm(obj) / Math.max(obj.heightMm, 1) > 2.4;
      return opts.hasImage && wide ? "top_left" : "top_center";
    }
    if (isSideWall(obj)) return opts.sideWallIndex === 0 ? "top_left" : "none";
    return "top_center";
  }
  const item = obj as ItemObject;
  switch (item.kind) {
    case "counter":
      return "center";
    case "tower":
      return "top_center";
    case "storage":
      return "center";
    case "hanging":
      return "center";
    default:
      return "none";
  }
}

/** Logo width as a fraction of the surface width, by object type. */
export function logoScaleFor(obj: BoothObject): number {
  if (isWall(obj)) return 0.32;
  const item = obj as ItemObject;
  if (item.kind === "counter") return 0.55;
  if (item.kind === "tower") return 0.7;
  if (item.kind === "storage") return 0.4;
  if (item.kind === "hanging") return 0.72;
  return 0.5;
}

/** Photography that's ticked for use, hero images first. */
export function usableImages(project: BoothProject): BrandImage[] {
  return (project.branding.images ?? []).filter((i) => i.use);
}

/* ------------------------------------------------------------ website in -- */

/** What the website reader hands back. */
export type PulledBrand = {
  website: string;
  logoUrl: string;
  logoDarkUrl: string;
  primaryColor: string;
  secondaryColor: string;
  palette: string[];
  headline: string;
  subhead: string;
  cta: string;
  images: string[];
};

/**
 * Fold what we read off a website into the project: colours, both logos, the
 * hero messaging and the photography, keeping anything the customer uploaded.
 */
export function applyPulledBrand(draft: BoothProject, res: PulledBrand, mode?: BrandMode): void {
  draft.branding.website = res.website;
  if (res.logoUrl) draft.branding.logoUrl = res.logoUrl;
  draft.branding.logoDarkUrl = res.logoDarkUrl;
  draft.branding.primaryColor = res.primaryColor;
  draft.branding.secondaryColor = res.secondaryColor;
  draft.branding.palette = res.palette;
  draft.branding.hero = { headline: res.headline, subhead: res.subhead, cta: res.cta };

  const uploads = (draft.branding.images ?? []).filter((i) => i.source === "upload");
  const pulled: BrandImage[] = res.images.map((url, i) => ({
    url,
    role: i < 2 ? "hero" : "secondary",
    source: "website",
    use: i < 4,
  }));
  draft.branding.images = [...pulled, ...uploads];
  draft.branding.mode = mode ?? (res.images.length ? "photo" : "color");
}

/* ----------------------------------------------------------------- apply -- */


/** True once a booth has been dressed, so new pieces can match automatically. */
export function hasBrandTreatment(project: BoothProject): boolean {
  return project.design.objects.some((o) => Boolean(o.graphic?.logoPlacement));
}

/**
 * Dress a single structure. Used both by the whole-booth pass and when a new
 * structure is dropped into an already-branded booth.
 */
export function brandObject(
  draft: BoothProject,
  obj: BoothObject,
  ctx: { isBackWall: boolean; sideWallIndex: number; nextImage: () => string | undefined; hasImages: boolean },
): void {
  const mode = draft.branding.mode ?? "color";
  const primary = draft.branding.primaryColor;
  const secondary = draft.branding.secondaryColor;

  if (isWall(obj)) {
    const side = isSideWall(obj);
    const useImage = mode === "photo" && ctx.hasImages && (ctx.isBackWall || !side);
    const imageUrl = useImage ? ctx.nextImage() : undefined;

    if (imageUrl) {
      obj.graphicType = "full_seg_graphic";
    } else {
      obj.graphicType = "solid_color";
      obj.graphicColor = side ? secondary : primary;
    }

    const placement = resolveLogoPlacement(obj, draft, {
      hasImage: Boolean(imageUrl),
      isBackWall: ctx.isBackWall,
      sideWallIndex: ctx.sideWallIndex,
    });

    // Hero messaging belongs on the one wall the aisle reads first.
    const hero = draft.branding.hero;
    obj.graphic = {
      imageUrl,
      logoPlacement: placement,
      logoScale: logoScaleFor(obj),
      headline: ctx.isBackWall ? hero?.headline : undefined,
      cta: ctx.isBackWall ? hero?.cta : undefined,
    };

    obj.logo = {
      treatment:
        placement === "none"
          ? "none"
          : obj.logo?.treatment === "none"
            ? "printed"
            : (obj.logo?.treatment ?? "printed"),
      scale: obj.logo?.scale ?? 1,
    };
    return;
  }

  // Screens and furniture are products, not printed surfaces.
  if (obj.kind === "tv" || obj.kind === "furniture") return;

  // Every other structure — storage rooms, towers, counters, hanging signs —
  // is a printed surface and gets dressed like the walls do.
  const photoKinds: ItemObject["kind"][] = ["storage", "tower", "counter", "hanging"];
  const wantsPhoto = mode === "photo" && photoKinds.includes(obj.kind) && ctx.hasImages;
  const imageUrl = wantsPhoto ? ctx.nextImage() : undefined;

  obj.finish = "brand";
  obj.graphic = {
    imageUrl,
    logoPlacement: resolveLogoPlacement(obj, draft, {
      hasImage: Boolean(imageUrl),
      isBackWall: false,
      sideWallIndex: 0,
    }),
    logoScale: logoScaleFor(obj),
  };
}


/**
 * Dress the whole booth in one pass. Called inside a single commit so Undo
 * takes the entire re-brand back at once.
 */
export function applyBrandKit(draft: BoothProject): void {
  const images = usableImages(draft);
  const heroes = images
    .filter((i) => i.role === "hero")
    .concat(images.filter((i) => i.role !== "hero"));
  const back = backWallId(draft);

  let heroIndex = 0;
  let sideWallIndex = 0;
  const nextImage = () => {
    if (!heroes.length) return undefined;
    const img = heroes[heroIndex % heroes.length];
    heroIndex += 1;
    return img?.url;
  };

  for (const obj of draft.design.objects) {
    const side = isWall(obj) && isSideWall(obj);
    brandObject(draft, obj, {
      isBackWall: isWall(obj) && obj.id === back,
      sideWallIndex: side ? sideWallIndex : 0,
      nextImage,
      hasImages: heroes.length > 0,
    });
    if (side) sideWallIndex += 1;
  }
}

/**
 * Dress one newly added structure so it matches a booth that has already been
 * branded, without disturbing anything else.
 */
export function brandNewObject(draft: BoothProject, id: string): void {
  if (!hasBrandTreatment(draft)) return;
  const obj = draft.design.objects.find((o) => o.id === id);
  if (!obj) return;

  const images = usableImages(draft);
  const heroes = images
    .filter((i) => i.role === "hero")
    .concat(images.filter((i) => i.role !== "hero"));
  const used = new Set(
    draft.design.objects.map((o) => o.graphic?.imageUrl).filter(Boolean) as string[],
  );
  const fresh = heroes.find((i) => !used.has(i.url)) ?? heroes[0];
  let taken = false;
  const nextImage = () => {
    if (taken) return undefined;
    taken = true;
    return fresh?.url;
  };

  const sideCount = draft.design.objects.filter((o) => isWall(o) && isSideWall(o) && o.id !== id).length;
  brandObject(draft, obj, {
    isBackWall: isWall(obj) && backWallId(draft) === obj.id,
    sideWallIndex: sideCount,
    nextImage,
    hasImages: heroes.length > 0,
  });
}

/** Plain-language description of what the brand pass did, for the hand-off. */
export function brandSummaryLine(project: BoothProject): string {
  const mode = project.branding.mode ?? "color";
  const imgs = usableImages(project).length;
  return mode === "photo"
    ? `Photo look: ${imgs} brand image${imgs === 1 ? "" : "s"} on the main surfaces, logo placed to standard exhibit positions.`
    : "Colour look: brand colour on the main surfaces, secondary on returns, logo placed to standard exhibit positions.";
}
