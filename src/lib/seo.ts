import { SITE } from "@/lib/site";

/**
 * Single switch for site-wide indexability.
 *
 * The site is intentionally hidden from search until the tractionx.ca launch.
 * Flip this to `true` (and update public/robots.txt) on launch day — every
 * route reads its robots meta from here, so nothing gets left behind with a
 * stale page-level `noindex`.
 */
export const INDEXABLE = false;

/** Robots meta for a normal, indexable content page. */
export function robotsMeta(): { name: string; content: string }[] {
  return [{ name: "robots", content: INDEXABLE ? "index, follow" : "noindex, nofollow" }];
}

/** Robots meta for pages that should stay out of the index even after launch. */
export function noindexMeta(): { name: string; content: string }[] {
  return [{ name: "robots", content: "noindex, nofollow" }];
}

/** Absolute URL for canonical / og:url / schema `item` values. */
export function absUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
