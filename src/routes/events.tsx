import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand, Design3DButton, BookMeetingButton, QuoteButton } from "@/components/GlobalCta";
import {
  BOOKING_TRACKS,
  cityHrefFor,
  currentDeadline,
  deadlinesFor,
  formatDeadline,
  upcomingEvents,
} from "@/data/events";
import { getShow, showUrlSlug } from "@/data/shows";
import { robotsMeta, absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";

const TITLE = "Where You'll Find Traction X — Upcoming Trade Shows";
const DESC =
  "The shows Traction X is building custom booth rentals for next, with the booth booking deadline for each one — 120 days out for leading activations, 75 days for custom booth rentals, 45 days for rescue builds.";


export const Route = createFileRoute("/events")({
  head: () => {
    const events = upcomingEvents();
    const eventLd = events.map((e) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: e.edition,
      startDate: e.start,
      endDate: e.end,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: e.venue,
        address: { "@type": "PostalAddress", addressLocality: e.city.split(",")[0], addressRegion: e.region },
      },
      description: e.localLine,
      url: absUrl(`/shows/${showUrlSlug(e.showSlug)}`),
      organizer: { "@type": "Organization", name: e.name },
    }));
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
        { "@type": "ListItem", position: 2, name: "Upcoming shows", item: absUrl("/events") },
      ],
    };
    return {
      meta: [
        { title: `${TITLE} | Traction X` },
        { name: "description", content: DESC },
        ...robotsMeta(),
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        { property: "og:type", content: "website" },
        { property: "og:url", content: absUrl("/events") },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: absUrl("/events") }],
      scripts: [...eventLd, breadcrumb].map((ld) => ({
        type: "application/ld+json",
        children: JSON.stringify(ld),
      })),
    };
  },
  component: EventsPage,
});

function EventsPage() {
  const events = upcomingEvents();

  return (
    <PageLayout>
      <PageHero
        eyebrow="Upcoming shows"
        title="Where you'll find"
        accent="Traction X next"
        intro="These are the shows we're taking booth briefs for right now. Every date below is a booth booking deadline, not the show date — because the day that decides whether you get the booth you want is the day you start, not the day the doors open."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Design3DButton source="events-hero" />
          <BookMeetingButton source="events-hero" variant="outline" />
        </div>
      </PageHero>

      <Section
        eyebrow="How the deadlines work"
        title="Book back from show day, not forward from today"
        intro="Every build level has its own lead time. Miss it and the design gets simplified, not the deadline moved."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {BOOKING_TRACKS.map((t) => (
            <div key={t.key} className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
              <div className="text-[oklch(0.78_0.13_300)] font-display text-2xl font-bold">
                {t.key === "rescue" ? `${t.days} days or less` : `${t.days} days out`}
              </div>
              <h3 className="mt-3 font-semibold">{t.label}</h3>

              <p className="mt-2 text-sm text-white/65 leading-relaxed">{t.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Show calendar" title="Booking deadlines by show" bg="muted">
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((e) => {
            const show = getShow(e.showSlug);
            const dl = deadlinesFor(e);
            const now = currentDeadline(e);
            return (
              <article
                key={e.showSlug}
                className="rounded-2xl border border-white/10 p-6 hover:border-[oklch(0.78_0.13_300)]/60 transition"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">{e.city}</p>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">{e.edition}</h3>
                <p className="mt-1 text-white/60 text-sm">
                  {e.dateLabel} · {e.venue}
                </p>

                <div className="mt-5 rounded-xl bg-[oklch(0.78_0.13_300)]/[0.12] border border-[oklch(0.78_0.13_300)]/30 px-4 py-3">
                  <p className="text-sm font-semibold text-[oklch(0.86_0.09_300)]">{now.line}</p>
                </div>

                <dl className="mt-4 space-y-1.5 text-sm text-white/65">
                  <div className="flex justify-between gap-4">
                    <dt>Leading activations (120 days)</dt>
                    <dd className="text-white/85">{formatDeadline(dl.leading)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Custom booth rentals (75 days)</dt>
                    <dd className="text-white/85">{formatDeadline(dl.custom)}</dd>
                  </div>

                  <div className="flex justify-between gap-4">
                    <dt>Rescue-build cutoff</dt>
                    <dd className="text-white/85">{formatDeadline(dl.rescueCutoff)}</dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm text-white/70 leading-relaxed">{e.localLine}</p>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{e.hook}</p>

                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  {show && (
                    <Link
                      to="/shows/$slug"
                      params={{ slug: showUrlSlug(e.showSlug) }}
                      className="text-[oklch(0.78_0.13_300)] hover:underline"
                    >
                      {e.name} booth guide →
                    </Link>
                  )}
                  <Link to={cityHrefFor(e) as never} className="text-[oklch(0.78_0.13_300)] hover:underline">
                    {e.city.split(",")[0]} booth rentals →
                  </Link>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <QuoteButton source={`events-${e.showSlug}`} />
                  <Design3DButton source={`events-${e.showSlug}`} variant="outline" />
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Not on the list?" title="We build at every major show floor in North America">
        <p className="max-w-3xl text-white/70 leading-relaxed">
          The calendar above is where we're already committed. We build for hundreds of other shows every year —
          browse the{" "}
          <Link to="/shows" className="text-[oklch(0.78_0.13_300)] hover:underline">
            full show directory
          </Link>{" "}
          or the{" "}
          <Link to="/venues" className="text-[oklch(0.78_0.13_300)] hover:underline">
            convention centre guides
          </Link>
          , then tell us your city and dates and we'll work the deadline back from show day for you. Reach us at{" "}
          <a href={`tel:${SITE.phone}`} className="text-[oklch(0.78_0.13_300)] hover:underline">
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      </Section>

      <DesignCtaBand source="events" />
      <CTABand heading="Tell us your show and we'll date the deadline" />
    </PageLayout>
  );
}
