import { Link } from "@tanstack/react-router";

/**
 * Compact "run this show or venue?" band for exhibitor-facing pages
 * (show, venue and venue floor plan guides). Sits below the rental CTAs so it
 * never competes with exhibitor conversion — it only catches the organizer or
 * venue operator who arrived through an exhibitor query.
 */
export function OrganizerCrossLink({ context }: { context: string }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
        <div className="text-xs uppercase tracking-widest text-white/50">For organizers &amp; venues</div>
        <h2 className="mt-3 font-display text-xl md:text-2xl font-semibold">
          Do you run {context}?
        </h2>
        <p className="mt-3 text-white/70 leading-relaxed max-w-3xl text-sm md:text-base">
          We work the other side of the floor too. Traction X runs official exhibitor rental programs, interactive
          floor plan design and management, and on-floor service desks for show organizers, convention centres and
          associations. There is no fee to the show or venue, agreements are non-exclusive by default, and we work
          alongside your general service contractor rather than replacing them.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link to="/for-organizers" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Partner programs for shows &amp; venues
          </Link>
          <Link
            to="/for-organizers/official-show-rental-program"
            className="text-[oklch(0.78_0.13_300)] hover:underline"
          >
            Official show rental program
          </Link>
          <Link to="/custom-trade-show-floor-plans" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Floor plan design &amp; management
          </Link>
        </div>
      </div>
    </section>
  );
}
