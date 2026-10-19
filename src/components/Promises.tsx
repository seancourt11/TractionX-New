import { Link } from "@tanstack/react-router";
import { PROMISES, CTA_PROMISE_IDS } from "@/data/promises";

/**
 * Trust surfaces for the Traction X Promise. All copy comes from
 * src/data/promises.ts — never hardcode a promise string in a page.
 */

const PURPLE = "oklch(0.78 0.13 300)";

const byId = (id: string) => PROMISES.find((p) => p.id === id)!;

/** Compact badge row shown directly beneath CTAs and form submit buttons. */
export function PromiseStrip({
  ids = [...CTA_PROMISE_IDS],
  className = "",
  withLink = true,
}: {
  ids?: string[];
  className?: string;
  withLink?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] leading-tight text-white/60 ${className}`}>
      {ids.map((id) => {
        const p = byId(id);
        return (
          <span key={id} className="inline-flex items-center gap-1.5" title={p.short}>
            <span aria-hidden style={{ color: PURPLE }}>
              ✓
            </span>
            {p.badge}
          </span>
        );
      })}
      {withLink ? (
        <Link to="/our-promise" className="underline decoration-white/25 underline-offset-2 hover:text-white">
          Our promise
        </Link>
      ) : null}
    </div>
  );
}

/** Thin full-width bar placed under a page hero. */
export function PromiseBar({ className = "" }: { className?: string }) {
  const ids = ["prebuild", "fixed-scope", "id-included", "response"];
  return (
    <section className={`border-b border-white/10 bg-white/[0.02] ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="text-[10px] uppercase tracking-[0.24em] text-white/45">The Traction X Promise</span>
        {ids.map((id) => {
          const p = byId(id);
          return (
            <span key={id} className="inline-flex items-center gap-1.5 text-[12px] text-white/70">
              <span aria-hidden style={{ color: PURPLE }}>
                ✓
              </span>
              {p.badge}
            </span>
          );
        })}
        <Link
          to="/our-promise"
          className="text-[12px] font-semibold text-[oklch(0.78_0.13_300)] hover:underline ml-auto"
        >
          See all six →
        </Link>
      </div>
    </section>
  );
}

/** Full grid of promises — used on /our-promise and anywhere we need the long form. */
export function PromiseGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {PROMISES.map((p, i) => (
        <div key={p.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold text-black"
              style={{ background: PURPLE }}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight">{p.title}</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{compact ? p.short : p.body}</p>
        </div>
      ))}
    </div>
  );
}
