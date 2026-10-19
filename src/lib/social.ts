/**
 * Helpers for the internal social library (/admin/social).
 *
 * Images and product facts are resolved from the live catalogues rather than
 * copied into the post data, so a renamed booth or a new photo flows straight
 * through to the caption card, the rendered visual and the CSV export.
 */

import {
  SOCIAL_POSTS,
  CTA_LINE,
  THEME_FORMAT,
  THEME_PROMISES,
  type SocialPost,
  type SocialFormat,
} from "@/data/social-posts";
import { RENTAL_BOOTHS } from "@/data/rental-booths";
import { PORTABLE_PRODUCTS } from "@/data/portable-products";
import { PORTABLE_IMAGES } from "@/data/portable-images";
import { PORTABLE_CATEGORY_FALLBACK_IMAGES } from "@/data/portable-fallback-images";
import { getVenueHero, getShowHero } from "@/data/hero-images";
import { PROMISES } from "@/data/promises";
import { SITE } from "@/lib/site";
import type { VisualSpec } from "@/lib/social-visual";

const galleryModules = import.meta.glob<{ default: { url: string } }>(
  "@/assets/gallery/*.asset.json",
  { eager: true },
);

/** Portfolio photography, keyed by file stem (`img-01` … `img-37`). */
export const GALLERY_IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(galleryModules).map(([path, mod]) => [
    path.split("/").pop()?.replace(".jpg.asset.json", "").replace(".asset.json", "") ?? path,
    mod.default.url,
  ]),
);

const GALLERY_KEYS = Object.keys(GALLERY_IMAGES).sort();

/** Stable pick so a post without an explicit asset still gets a consistent photo. */
function galleryFor(seed: string): string | undefined {
  if (!GALLERY_KEYS.length) return undefined;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return GALLERY_IMAGES[GALLERY_KEYS[h % GALLERY_KEYS.length]];
}

type AssetRef = {
  boothSlug?: string;
  productSlug?: string;
  gallerySlug?: string;
  venueSlug?: string;
  showSlug?: string;
  image?: string;
};

/** Resolve any asset pointer to a URL plus a human label. */
function resolveAsset(ref: AssetRef): { src?: string; label?: string } {
  if (ref.boothSlug) {
    const booth = RENTAL_BOOTHS.find((b) => b.slug === ref.boothSlug);
    if (booth) {
      return {
        src: booth.image,
        label: `${booth.name} · ${booth.size.replace("x", " × ")} ft rental`,
      };
    }
  }
  if (ref.productSlug) {
    const product = PORTABLE_PRODUCTS.find((p) => p.slug === ref.productSlug);
    if (product) {
      return {
        src: PORTABLE_IMAGES[product.slug] ?? PORTABLE_CATEGORY_FALLBACK_IMAGES[product.category],
        label: `${product.name} · from ${product.priceFrom} · ${product.setup}`,
      };
    }
  }
  if (ref.gallerySlug) {
    const src = GALLERY_IMAGES[ref.gallerySlug];
    if (src) return { src, label: "Traction X build photography" };
  }
  if (ref.venueSlug) {
    const hero = getVenueHero(ref.venueSlug);
    return { src: hero.src, label: "Venue photography" };
  }
  if (ref.showSlug) {
    const hero = getShowHero(ref.showSlug);
    return { src: hero.src, label: "Show photography" };
  }
  if (ref.image) return { src: ref.image };
  return {};
}

export type ResolvedPost = SocialPost & {
  /** Suggested image, resolved from the catalogue where possible. */
  imageSrc?: string;
  /** Short line describing the asset, shown under the thumbnail. */
  assetLabel?: string;
  /** Effective visual treatment (explicit, or the theme default). */
  visualFormat: SocialFormat;
  /** Effective promise badge texts. */
  promiseBadges: string[];
  /** Effective promise ids, for the CSV. */
  promises: string[];
  /** Second image for split visuals. */
  splitSrc?: string;
  /** Ordered carousel frames, primary first. */
  carouselFrames: { src?: string; caption?: string }[];
  /** Absolute URL for the caption. */
  url: string;
};

const PROMISE_BY_ID = Object.fromEntries(PROMISES.map((p) => [p.id, p]));

export function resolvePost(post: SocialPost): ResolvedPost {
  const primary = resolveAsset(post);
  // Every post gets a visual: fall back to portfolio photography when the post
  // carries no catalogue pointer of its own.
  const imageSrc = primary.src ?? galleryFor(post.id);
  const assetLabel = primary.label;

  const visualFormat = post.format ?? THEME_FORMAT[post.theme];
  const promises = post.promiseIds ?? THEME_PROMISES[post.theme] ?? [];
  const promiseBadges = promises.map((id) => PROMISE_BY_ID[id]?.badge).filter(Boolean) as string[];

  const splitSrc =
    visualFormat === "split" && post.splitWith ? resolveAsset(post.splitWith).src : undefined;

  const carouselFrames =
    visualFormat === "carousel" && post.carousel?.length
      ? post.carousel.map((frame) => ({
          src: resolveAsset(frame).src ?? imageSrc,
          caption: frame.caption,
        }))
      : [{ src: imageSrc, caption: post.title }];

  return {
    ...post,
    imageSrc,
    assetLabel,
    visualFormat,
    promises,
    promiseBadges,
    splitSrc,
    carouselFrames,
    url: `${SITE.url}${post.href}`,
  };
}

export const RESOLVED_POSTS: ResolvedPost[] = SOCIAL_POSTS.map(resolvePost);

/**
 * Build the canvas spec for a post. `withPromises` mirrors the admin toggle so
 * the same post can be exported with or without the promise badges baked in.
 */
export function visualSpec(
  post: ResolvedPost,
  opts: { withPromises: boolean; frame?: number } = { withPromises: true },
): VisualSpec {
  const badges = opts.withPromises ? post.promiseBadges : undefined;

  if (post.visualFormat === "split") {
    return {
      src: post.imageSrc,
      splitSrc: post.splitSrc,
      splitLabels: post.splitLabels,
      headline: post.overlayText ?? post.title,
      subline: post.assetLabel,
      badges,
    };
  }

  if (post.visualFormat === "carousel") {
    const frame = post.carouselFrames[opts.frame ?? 0] ?? post.carouselFrames[0];
    return {
      src: frame?.src,
      headline: frame?.caption ?? post.title,
      subline: post.venue ?? post.city ?? post.assetLabel,
      badges: (opts.frame ?? 0) === 0 ? badges : undefined,
    };
  }

  if (post.visualFormat === "overlay") {
    return {
      src: post.imageSrc,
      headline: post.overlayText ?? post.title,
      subline: post.venue ?? post.city,
      badges,
    };
  }

  if (post.visualFormat === "promise") {
    return {
      src: post.imageSrc,
      headline: post.overlayText ?? post.title,
      subline: post.assetLabel,
      badges: post.promiseBadges,
    };
  }

  // photo
  return {
    src: post.imageSrc,
    headline: post.overlayText ?? post.title,
    subline: post.assetLabel ?? post.venue ?? post.city,
    badges,
  };
}

/** Caption exactly as it should be pasted, CTA line and link appended. */
export function fullCaption(post: ResolvedPost, platform: "linkedin" | "instagram"): string {
  const body = platform === "linkedin" ? post.linkedin : post.instagram;
  const tags = post.hashtags.join(" ");
  const cta = CTA_LINE[post.cta];
  return platform === "linkedin"
    ? `${body}\n${post.url}\n\n${cta}\n\n${tags}`
    : `${body}\n\n${cta}\n${post.url}\n\n${tags}`;
}

function cell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

/** CSV in the column shape Buffer / Later / Hootsuite bulk imports accept. */
export function postsToCsv(posts: ResolvedPost[]): string {
  const header = [
    "week",
    "theme",
    "platform",
    "title",
    "caption",
    "hashtags",
    "link",
    "image",
    "format",
    "promises",
    "linkedin_image",
    "instagram_square_image",
    "instagram_vertical_image",
    "carousel_count",
    "city",
    "venue",
    "cta",
  ];
  const rows: string[][] = [];
  for (const post of posts) {
    const carouselCount = post.visualFormat === "carousel" ? post.carouselFrames.length : 0;
    for (const platform of ["linkedin", "instagram"] as const) {
      rows.push([
        String(post.week),
        post.theme,
        platform,
        post.title,
        fullCaption(post, platform),
        post.hashtags.join(" "),
        post.url,
        post.imageSrc ?? "",
        post.visualFormat,
        post.promises.join(", "),
        `${post.id}-linkedin.png`,
        `${post.id}-instagram-square.png`,
        `${post.id}-instagram-vertical.png`,
        String(carouselCount),
        post.city ?? "",
        post.venue ?? "",
        post.cta,
      ]);
    }
  }
  return [header, ...rows].map((r) => r.map(cell).join(",")).join("\n");
}

export function downloadCsv(posts: ResolvedPost[], filename = "traction-x-social-calendar.csv") {
  const blob = new Blob([postsToCsv(posts)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Local "already posted" tracking — prototype-only, same pattern as the admin store. */
const POSTED_KEY = "tx-social-posted-v1";

export function readPosted(): string[] {
  try {
    const raw = window.localStorage.getItem(POSTED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function writePosted(ids: string[]) {
  try {
    window.localStorage.setItem(POSTED_KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable — tracking is best-effort */
  }
}
