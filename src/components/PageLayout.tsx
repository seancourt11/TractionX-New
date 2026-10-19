import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Design3DButton, BookMeetingButton, QuoteButton, CtaNote } from "./GlobalCta";
import { PromiseBar, PromiseStrip } from "./Promises";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-black text-white font-sans antialiased flex flex-col">
      <SiteHeader />
      {/* pb-16 on mobile keeps the fixed CTA bar from covering footer content. */}
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <SiteFooter />
    </div>
  );
}


export function PageHero({
  eyebrow,
  title,
  accent,
  children,
  intro,
  promiseBar = true,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  intro?: string;
  children?: ReactNode;
  /** Set false on pages that already carry the promise content. */
  promiseBar?: boolean;
}) {
  return (
    <>
    <section className="relative border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.78_0.13_300)]/[0.08] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-5">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.04] max-w-4xl">
          {title}
          {accent && (
            <>
              <br />
              <span className="text-[oklch(0.78_0.13_300)]">{accent}</span>
            </>
          )}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-white/75 text-base md:text-lg leading-relaxed">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
    {promiseBar ? <PromiseBar /> : null}
    </>
  );
}

export function Section({
  eyebrow,
  title,
  intro,
  children,
  bg,
  id,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  bg?: "muted" | "default";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`border-b border-white/10 ${bg === "muted" ? "bg-white/[0.02]" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-4">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight max-w-3xl">
            {title}
          </h2>
        )}
        {intro && (
          <p className="mt-4 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed">
            {intro}
          </p>
        )}
        <div className={title || intro ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function CTABand({ heading = "Get your exact booth quote" }: { heading?: string }) {
  return (
    <section className="border-b border-white/10 bg-[oklch(0.78_0.13_300)]/[0.08]">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">{heading}</h2>
          <p className="mt-3 text-white/70 text-sm md:text-base">
            Anything you see online is a starting range only. Send us your show, footprint and dates and a Traction X
            designer sends preliminary concept direction and investment within two business days. Full photoreal design,
            floor plans and a costed BOM follow in roughly one to two weeks as the scope develops.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap gap-3">
            <QuoteButton source="cta-band" />
            <Design3DButton source="cta-band" variant="outline" />
          </div>
          <CtaNote kind="quote" />
          <PromiseStrip />
          {/* Booking stays a text link, not a third peer button. */}
          <BookMeetingButton
            source="cta-band"
            variant="ghost"
            className="self-start !px-0 !py-0 text-sm text-white/60 underline underline-offset-4 hover:text-white"
          />
        </div>
      </div>
    </section>
  );
}


export function FAQBlock({ items, title = "Frequently asked" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <Section eyebrow="FAQ" title={title}>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {items.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
              <span className="font-display text-lg md:text-xl font-semibold">{f.q}</span>
              <span className="text-white/50 mt-1 group-open:rotate-45 transition-transform">＋</span>
            </summary>
            <p className="mt-3 text-white/70 leading-relaxed max-w-3xl">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
