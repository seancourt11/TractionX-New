import { Link } from "@tanstack/react-router";
import { CASE_STUDIES, type CaseStudy } from "@/data/case-studies";
import { matchTestimonial } from "@/data/testimonials";

const portfolio = import.meta.glob<{ default: { url: string } }>(
  "@/assets/portfolio/*.asset.json",
  { eager: true },
);
const imgUrl = (name: string) => {
  const key = Object.keys(portfolio).find((k) => k.endsWith(`/${name}.asset.json`));
  return key ? portfolio[key].default.url : "";
};

/** Stable hash so SSR and hydration agree on the fallback selection. */
function seedOf(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function scoreStudy(cs: CaseStudy, ctx: { industry?: string; city?: string; show?: string }) {
  let score = 0;
  const eq = (a?: string, b?: string) =>
    !!a && !!b && (a.toLowerCase().includes(b.toLowerCase()) || b.toLowerCase().includes(a.toLowerCase()));
  if (eq(cs.show, ctx.show)) score += 5;
  if (eq(cs.city, ctx.city)) score += 3;
  if (eq(cs.industry, ctx.industry)) score += 4;
  return score;
}

export function pickCaseStudies(
  ctx: { industry?: string; city?: string; show?: string },
  seed: string,
  count = 2,
) {
  const scored = CASE_STUDIES.map((cs) => ({ cs, score: scoreStudy(cs, ctx) }));
  const matched = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).map((s) => s.cs);
  if (matched.length >= count) return matched.slice(0, count);
  const n = seedOf(seed);
  const rest = CASE_STUDIES.filter((cs) => !matched.includes(cs));
  const filler: CaseStudy[] = [];
  for (let i = 0; filler.length < count - matched.length && i < rest.length; i++) {
    filler.push(rest[(n + i * 7919) % rest.length]);
  }
  return [...matched, ...filler.filter((c, i, a) => a.indexOf(c) === i)].slice(0, count);
}

/**
 * Proof band — real builds plus a matching client quote, placed next to the
 * decision point on city, show, venue and industry pages.
 */
export function CaseProof({
  context,
  seed,
  heading,
}: {
  context: { industry?: string; city?: string; show?: string };
  seed: string;
  heading?: string;
}) {
  const studies = pickCaseStudies(context, seed, 2);
  const testimonial = matchTestimonial(context);
  if (!studies.length) return null;

  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-4">Proof</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight max-w-3xl">
          {heading ?? "Builds we've delivered"}
        </h2>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {studies.map((cs) => (
            <Link
              key={cs.slug}
              to="/case-studies/$slug"
              params={{ slug: cs.slug }}
              className="group rounded-2xl border border-white/10 bg-black overflow-hidden hover:border-[oklch(0.78_0.13_300)]/60 transition-colors"
            >
              {imgUrl(cs.heroImage) && (
                <img
                  src={imgUrl(cs.heroImage)}
                  alt={`${cs.client} trade show exhibit at ${cs.show} in ${cs.city}`}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              )}
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                  {cs.show} · {cs.city} · {cs.size}
                </div>
                <div className="mt-2 font-display text-lg font-semibold group-hover:text-[oklch(0.78_0.13_300)]">
                  {cs.client}
                </div>
                <p className="mt-2 text-sm text-white/65 leading-relaxed line-clamp-3">{cs.summary}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/55">
                  {cs.results.slice(0, 2).map((r) => (
                    <span key={r.label}>
                      <span className="text-white font-semibold">{r.value}</span> {r.label.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}

          <figure className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between">
            <blockquote className="text-white/85 leading-relaxed">"{testimonial.quote}"</blockquote>
            <figcaption className="mt-5 text-sm text-white/60">
              <span className="font-semibold text-white">{testimonial.name}</span> — {testimonial.role}
              <Link to="/testimonials" className="block mt-3 text-[oklch(0.78_0.13_300)] hover:underline">
                Read more client feedback →
              </Link>
            </figcaption>
          </figure>
        </div>

        <div className="mt-8">
          <Link to="/case-studies" className="text-sm text-white/70 hover:text-white underline underline-offset-4">
            See all case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
