/**
 * Every remote brand image goes through our own origin so the browser is
 * allowed to draw it onto a booth surface. Local files (uploads, data URLs)
 * are already same-origin and pass straight through.
 */
export function proxiedImage(url?: string): string | undefined {
  if (!url) return undefined;
  if (/^(data:|blob:|\/)/i.test(url)) return url;
  if (!/^https?:\/\//i.test(url)) return url;
  return `/api/public/brand-image?url=${encodeURIComponent(url)}`;
}
