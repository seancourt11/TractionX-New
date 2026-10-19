import { SITE } from "@/lib/site";
import { trackCall } from "@/lib/analytics";
import { PromiseStrip } from "@/components/Promises";

/**
 * Shared conversion furniture. These sit next to the ask — proximity is what
 * makes reassurance work, so they belong under buttons, not in a footer.
 */

const PURPLE = "oklch(0.78 0.13 300)";

/**
 * The standing response promise. Goes directly beneath every submit button.
 * One sentence, specific, and true to the process described on /contact.
 */
export function ResponsePromise({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-[11px] leading-relaxed text-white/65">
        <span className="text-white/85 font-medium">We reply within one business day</span> — preliminary concept
        direction and investment within two.
      </p>
      <PromiseStrip className="mt-1.5" ids={["prebuild", "fixed-scope", "id-included"]} />
    </div>
  );
}

const STEPS: { n: string; t: string; b: string }[] = [
  { n: "1", t: "You send the brief", b: "Show, footprint, dates and what the booth has to do." },
  { n: "2", t: "We reply in 1 business day", b: "A designer confirms scope, then sends direction + investment in 2." },
  { n: "3", t: "Design, build, install", b: "3D concept, costed scope, fabrication, shipping and on-site install." },
];

/** "What happens next" strip — shown on every success screen. */
export function WhatHappensNext({ className = "" }: { className?: string }) {
  return (
    <ol className={`grid gap-2.5 sm:grid-cols-3 ${className}`}>
      {STEPS.map((s) => (
        <li key={s.n} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-black"
            style={{ background: PURPLE }}
            aria-hidden
          >
            {s.n}
          </div>
          <div className="mt-2 text-[12px] font-semibold leading-snug text-white">{s.t}</div>
          <p className="mt-1 text-[11px] leading-relaxed text-white/60">{s.b}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Click-to-call with a stated answer window. Used in the header, the mobile
 * bar and on success screens — an urgent visitor should never have to hunt.
 */
export function CallCta({
  source,
  className = "",
  label = SITE.phoneDisplay,
  note = "Answered by a person, Mon–Fri 8am–6pm AT",
  showNote = true,
}: {
  source: string;
  className?: string;
  label?: string;
  note?: string;
  showNote?: boolean;
}) {
  return (
    <div className={className}>
      <a
        href={`tel:${SITE.phone}`}
        onClick={() => trackCall(source)}
        className="inline-flex items-center gap-2 font-semibold text-white hover:text-[oklch(0.78_0.13_300)]"
      >
        <span aria-hidden>📞</span> {label}
      </a>
      {showNote ? <p className="mt-1 text-[11px] text-white/60">{note}</p> : null}
    </div>
  );
}

/**
 * Success screen wrapper: confirmation, what happens next, and a real next
 * action. A submitted form should never be a dead end.
 */
export function SuccessPanel({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="py-2">
      <div className="rounded-xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 p-5">
        <div className="text-[11px] uppercase tracking-[0.24em] text-[oklch(0.78_0.13_300)]">{title}</div>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
      </div>
      <div className="mt-4">
        <div className="text-[11px] uppercase tracking-[0.24em] text-white/50">What happens next</div>
        <WhatHappensNext className="mt-2.5" />
      </div>
      {children ? <div className="mt-4 space-y-2.5">{children}</div> : null}
      <div className="mt-4 border-t border-white/10 pt-3">
        <CallCta source="success-panel" note="Need it sooner? Call and we'll pick it up today." />
      </div>
    </div>
  );
}

/** Step counter + progress bar for multi-step forms. */
export function StepProgress({
  step,
  total,
  estimate = "about 2 minutes",
  className = "",
}: {
  step: number;
  total: number;
  estimate?: string;
  className?: string;
}) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className={className}>
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/55">
        <span>
          Step {step} of {total}
        </span>
        <span>{estimate}</span>
      </div>
      <div
        className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: PURPLE }} />
      </div>
    </div>
  );
}
