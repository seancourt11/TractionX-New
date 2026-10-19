import { Link } from "@tanstack/react-router";
import type { Show } from "@/data/shows";
import { getVenue, venueUrlSlug } from "@/data/venues";

/**
 * Show-level floor plan / exhibitor map content — approved plan section B (shows).
 * Derives every sentence from the show's own data (venue halls, booth sizes,
 * booking window, tips) so copy is unique per show, not boilerplate.
 */
export function ShowFloorPlanBlock({ show }: { show: Show }) {
  const venue = getVenue(show.venueSlug);
  if (!venue) return null;

  const hallTips = show.tips.filter((t) => /hall|dock|corridor|entrance|marshall/i.test(t));
  const islandSizes = show.boothSizes.filter((b) => /island|hero|activation/i.test(b));
  const inlineSizes = show.boothSizes.filter((b) => !/island|hero|activation/i.test(b));

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <h2 className="text-2xl md:text-3xl font-semibold">
        {show.shortName} floor plan and exhibitor map — what exhibitors need to know
      </h2>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="border border-white/10 rounded-2xl p-6">
          <div className="text-xs uppercase tracking-widest text-purple-300">Which halls {show.shortName} occupies</div>
          <p className="mt-3 text-white/80 leading-relaxed">
            {show.shortName} runs inside {venue.name}, which lays out exhibit space across {venue.halls}. Booth
            numbering at {venue.shortName} typically climbs in sequence along the aisle grid within each hall rather
            than continuously across the whole building, so the number range you're assigned tells you which hall
            and which side of the floor you're on before you ever look at a map. Cross-check your booth number
            against the current-year hall map the organizer publishes — hall assignments and exact numbering can
            shift year over year even at the same venue.
          </p>
          {hallTips.length > 0 && (
            <ul className="mt-4 space-y-2">
              {hallTips.map((t, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/70">
                  <span className="text-purple-300">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border border-white/10 rounded-2xl p-6">
          <div className="text-xs uppercase tracking-widest text-purple-300">Booth sizes and layout types offered</div>
          <p className="mt-3 text-white/80 leading-relaxed">
            {show.shortName} exhibitors typically book {show.boothSizes.join(", ")}. On the floor plan,
            {inlineSizes.length > 0 && (
              <>
                {" "}in-line footprints like {inlineSizes.join(" or ")} back onto neighboring booths on three sides
                and only face one aisle,
              </>
            )}
            {islandSizes.length > 0 && (
              <>
                {" "}while {islandSizes.join(" or ")} builds are open on all four sides — those are the corner and
                island positions worth paying attention to when the floor plan releases, since they take traffic
                from two or more aisles instead of one.
              </>
            )}
            {" "}Corner booths (open on two sides) split the difference and are usually the first upgrade worth
            requesting if a full island isn't in budget.
          </p>
        </div>
      </div>

      <div className="mt-6 border border-purple-400/40 bg-purple-400/[0.04] rounded-2xl p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-purple-300">Move-in, move-out and the booking window</div>
        <p className="mt-3 text-white/80 leading-relaxed">
          {show.bookingWindow} Once your space is confirmed, the floor plan drives everything downstream —
          your dock and freight schedule at {venue.name} are assigned by hall and booth location, and {" "}
          {venue.union.toLowerCase().includes("right-to-work") ? "labor rules at this venue" : "the union jurisdictions covering rigging, electrical and freight at this venue"}{" "}
          depend on exactly where on the plan you land. Pick your booth before you finalize booth design — the
          hall, aisle width and neighboring booths all constrain what you can build.
        </p>
      </div>

      <div className="mt-6 border border-white/10 rounded-2xl p-6">
        <div className="text-xs uppercase tracking-widest text-purple-300">How to read the plan when picking a booth</div>
        <ul className="mt-4 space-y-3 max-w-3xl">
          <li className="flex gap-3">
            <span className="text-purple-300 mt-1">→</span>
            <span className="text-white/80 leading-relaxed">
              Trace the main traffic corridors first — the widest aisles running from registration toward keynote
              stages or F&amp;B usually carry the heaviest foot traffic at {show.shortName}, and booths fronting
              those aisles outperform booths tucked in secondary rows of the same size.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-300 mt-1">→</span>
            <span className="text-white/80 leading-relaxed">
              Corner and island positions (open on two or four sides) read better on the plan than they look on
              paper — they're worth the premium at {show.shortName} because {show.audience.toLowerCase()} attendees
              tend to walk the perimeter loop before cutting through center aisles.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-300 mt-1">→</span>
            <span className="text-white/80 leading-relaxed">
              Proximity to hall entrances, registration, and F&amp;B courts drives dwell time; proximity to keynote
              or theater stages drives spikes right before and after sessions — decide which pattern fits your
              {" "}{show.industry.toLowerCase()} audience before requesting a spot.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-300 mt-1">→</span>
            <span className="text-white/80 leading-relaxed">
              Confirm ceiling height and column locations for your specific spot on the plan — {venue.shortName}'s
              hall-by-hall ceiling and rigging limits (see the venue guide below) can rule out taller builds even
              on an otherwise strong booth.
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-6 border border-white/10 rounded-2xl p-6">
        <div className="text-xs uppercase tracking-widest text-purple-300">
          Once you've picked your booth number
        </div>
        <p className="mt-3 text-white/80 leading-relaxed max-w-3xl">
          The plan dictates the build. Your hall's clear height and rigging rules set how tall you can go and
          whether a hanging sign is even possible; whether you're in-line, on a corner or on an island sets how
          many sides need to read as a front; and the aisle width in front of you sets how far back your
          messaging has to sit to be legible. We design and build to the exact footprint you were assigned at{" "}
          {venue.shortName} — custom rental or purchase, with install and dismantle included, and a project
          manager handling the venue paperwork that comes with your location on the plan.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/rent-a-booth"
          className="inline-flex px-5 py-3 rounded-full bg-purple-400 text-black font-semibold hover:bg-purple-300"
        >
          See booths available for {show.shortName}
        </Link>
        <Link
          to="/booth-cost-calculator"
          className="inline-flex px-5 py-3 rounded-full border border-purple-400/40 text-purple-200 hover:bg-purple-400/10"
        >
          Get my exact quote
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link
          to="/venues/$slug"
          params={{ slug: venueUrlSlug(venue.slug) }}
          className="text-purple-300 hover:underline"
        >
          {venue.shortName} venue guide
        </Link>
        <a href={`/venue-floor-plans/${venue.slug}`} className="text-purple-300 hover:underline">
          {venue.shortName} floor plan guide
        </a>
        <Link to="/custom-trade-show-floor-plans" className="text-purple-300 hover:underline">
          Floor plan design &amp; management
        </Link>
      </div>

      <p className="mt-6 text-xs text-white/40 max-w-3xl">
        Traction X doesn't publish or host the official {show.shortName} floor plan — the show organizer is the
        source of record for current hall maps, booth numbering and availability
        {show.website ? (
          <>
            {" "}
            (
            <a
              href={show.website}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="underline hover:text-white/70"
            >
              organizer site
            </a>
            ).
          </>
        ) : (
          " via their exhibitor portal."
        )}
      </p>
    </section>
  );
}
