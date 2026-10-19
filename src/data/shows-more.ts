import type { Show } from "./shows";
import { EAST_SHOWS } from "./shows-more-east";
import { CENTRAL_SHOWS } from "./shows-more-central";
import { CANADA_SHOWS } from "./shows-more-canada";
import { WEST_SHOWS } from "./shows-more-west";

/**
 * Expanded trade-show index. These entries are shorter than the flagship
 * guides in shows.ts but carry the same fields, so every directory hub,
 * calendar page and Event schema block works identically.
 *
 * Populated in batches — see shows-more-*.ts.
 */
const RAW: Show[] = [...EAST_SHOWS, ...CENTRAL_SHOWS, ...CANADA_SHOWS, ...WEST_SHOWS];

const seen = new Set<string>();
export const MORE_SHOWS: Show[] = RAW.filter((s) => {
  if (seen.has(s.slug)) return false;
  seen.add(s.slug);
  return true;
});
