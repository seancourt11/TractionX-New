import { Link } from "@tanstack/react-router";
import { BookMeetingButton } from "@/components/GlobalCta";
import { SITE } from "@/lib/site";
import { PromiseStrip } from "@/components/Promises";

/**
 * B2B closing band for the /for-organizers cluster.
 * Deliberately does NOT open the exhibitor quote modal — organizers, venues
 * and associations want a conversation and a program outline, not a booth price.
 */
export function OrganizerCtaBand({
  heading = "Talk to us about a partner program",
  blurb,
  source,
}: {
  heading?: string;
  blurb?: string;
  source: string;
}) {
  return (
    <section className="border-b border-white/10 bg-[oklch(0.78_0.13_300)]/[0.08]">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-wrap items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">{heading}</h2>
          <p className="mt-3 text-white/70 text-sm md:text-base leading-relaxed">
            {blurb ??
              "Send your show name, dates, venue and approximate exhibitor count. We acknowledge a complete brief within one business day and send a draft program outline — package tiers, pricing, service desk scope and revenue share — within two business days. There is no fee to the show or venue."}
          </p>
          <p className="mt-4 text-sm text-white/60">
            <a href={`mailto:${SITE.email}`} className="text-[oklch(0.78_0.13_300)] hover:underline">
              {SITE.email}
            </a>
            <span className="mx-3 text-white/25">·</span>
            <a href={`tel:${SITE.phone}`} className="text-[oklch(0.78_0.13_300)] hover:underline">
              {SITE.phoneDisplay}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <BookMeetingButton source={source} variant="primary" label="Book a 10-minute call" />
          <Link
            to="/preferred-vendor-program"
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 text-center"
          >
            Apply to the vendor program
          </Link>
          <PromiseStrip ids={["response", "one-contract", "fixed-scope"]} />
        </div>
      </div>
    </section>
  );
}
