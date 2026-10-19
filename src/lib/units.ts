/**
 * Imperial ↔ metric helpers.
 *
 * North American shows quote booths in feet, but a large share of search
 * demand (and every international organizer) works in metres. We keep feet as
 * the primary label everywhere and add the metric equivalent where it helps a
 * reader or a crawler — meta descriptions, schema, one quiet line of UI —
 * rather than doubling every dimension in the layout.
 */

const FT_PER_M = 3.28084;

/** Feet → metres, rounded to a clean exhibition figure (10ft → 3, 8ft → 2.4). */
export function ftToM(ft: number): number {
  const m = ft / FT_PER_M;
  const rounded = Math.round(m * 10) / 10;
  // Whole-metre booth modules (3, 6, 9, 12…) read better than 3.0 / 6.1.
  const whole = Math.round(m);
  return Math.abs(m - whole) < 0.16 ? whole : rounded;
}

/** "10x20" | "10×20 ft" → "3 × 6 m". Returns undefined when there's no WxH. */
export function metricSize(dim: string): string | undefined {
  const m = dim.match(/(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)/i);
  if (!m) return undefined;
  return `${ftToM(Number(m[1]))} × ${ftToM(Number(m[2]))} m`;
}

/** "10×20 ft" → "10×20 ft (3 × 6 m)" — used in copy and metadata. */
export function withMetric(dim: string, { parens = true }: { parens?: boolean } = {}): string {
  const metric = metricSize(dim);
  if (!metric) return dim;
  return parens ? `${dim} (${metric})` : `${dim} / ${metric}`;
}

/** Search-friendly metric aliases for a footprint, e.g. "3x6m, 3 x 6 metre booth". */
export function metricKeywords(dim: string): string {
  const m = dim.match(/(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)/i);
  if (!m) return "";
  const a = ftToM(Number(m[1]));
  const b = ftToM(Number(m[2]));
  return `${a}x${b}m, ${a} × ${b} metre booth, ${a}m x ${b}m stand`;
}
