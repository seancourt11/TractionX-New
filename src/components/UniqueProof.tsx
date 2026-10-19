import type { PageProof } from "@/data/page-proof";
import { hasProof } from "@/data/page-proof";

/**
 * Renders the optional "unique proof" block for a city / venue / show /
 * industry page. Returns null when there is nothing to show, so pages without
 * material yet simply skip the section instead of showing empty headings.
 */
export function ProofBlock({
  proof,
  title,
  subject,
}: {
  proof: PageProof;
  title?: string;
  subject: string;
}) {
  if (!hasProof(proof)) return null;

  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">
          {title ?? `What we know about ${subject}`}
        </h2>

        {proof.trackRecord && (
          <p className="mt-3 text-sm uppercase tracking-widest text-primary">{proof.trackRecord}</p>
        )}

        {proof.facts && proof.facts.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {proof.facts.map((f) => (
              <div key={f.label} className="border border-white/10 p-6">
                <div className="text-xs uppercase tracking-widest text-primary">{f.label}</div>
                <p className="mt-2 text-white/80 leading-relaxed">{f.value}</p>
                {f.source && <p className="mt-2 text-xs text-white/40">Source: {f.source}</p>}
              </div>
            ))}
          </div>
        )}

        {proof.firstHand && (
          <figure className="mt-8 max-w-3xl border-l-2 border-primary/60 pl-5">
            <blockquote className="text-white/85 leading-relaxed italic">{proof.firstHand}</blockquote>
            <figcaption className="mt-2 text-xs uppercase tracking-widest text-white/40">
              From the Traction X floor crew
            </figcaption>
          </figure>
        )}

        {proof.contact && (
          <div className="mt-8 border border-white/10 p-6 md:max-w-md">
            <div className="text-xs uppercase tracking-widest text-primary">Your point of contact</div>
            <div className="mt-2 font-semibold text-white">{proof.contact.name}</div>
            <div className="text-sm text-white/60">{proof.contact.role}</div>
            {proof.contact.email && (
              <a
                href={`mailto:${proof.contact.email}`}
                className="mt-2 inline-block text-sm text-primary hover:underline"
              >
                {proof.contact.email}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/** Small "last reviewed" line. Renders nothing when no date is set. */
export function LastReviewed({ date }: { date?: string }) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return (
    <p className="mx-auto max-w-7xl px-6 pb-10 text-xs uppercase tracking-widest text-white/35">
      Page facts last reviewed{" "}
      <time dateTime={date}>
        {parsed.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
      </time>
    </p>
  );
}
