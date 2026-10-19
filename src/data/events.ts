/**
 * Upcoming shows Traction X is actively taking booth briefs for.
 *
 * The dates here are the SHOW dates. Everything the marketing surfaces show —
 * the urgency line on a social graphic, the countdown on /events — is a BOOTH
 * BOOKING deadline derived from the show start date, never the show date
 * itself:
 *
 *   Leading activations ...................... show date minus 120 days
 *   Custom booth rentals ..................... show date minus 75 days
 *   45 days or less out ...................... rescue-build territory

 */

export type UpcomingEvent = {
  /** Matches a slug in src/data/shows.ts */
  showSlug: string;
  name: string;
  /** Edition label used in copy, e.g. "CES 2027". */
  edition: string;
  /** ISO start / end dates of the show itself. */
  start: string;
  end: string;
  /** Human date range, e.g. "January 6 – 9, 2027". */
  dateLabel: string;
  venue: string;
  city: string;
  /** Matches a slug in src/data/cities.ts (used to build the city page link). */
  citySlug: string;
  /** Overrides the /city/<slug> link when the city has a bespoke landing page. */
  cityHref?: string;
  region: string;
  /** Local-market angle. Every graphic and card speaks to this city, not "global". */
  localLine: string;
  /** Short reason an exhibitor at this specific show should call us. */
  hook: string;
  confirmed: boolean;
};

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    showSlug: "ces-las-vegas",
    name: "CES",
    edition: "CES 2027",
    start: "2027-01-06",
    end: "2027-01-09",
    dateLabel: "January 6 – 9, 2027",
    venue: "Las Vegas Convention Center",
    city: "Las Vegas, NV",
    citySlug: "las-vegas",
    cityHref: "/las-vegas-modular-trade-show-booth-rentals",
    region: "Nevada",
    localLine:
      "Las Vegas booth rentals built for LVCC — West, Central and North Hall move-in, Teamsters I&D and local marshalling.",
    hook: "CES move-in windows are the tightest in Las Vegas. We build to the LVCC dock schedule, not around it.",
    confirmed: true,
  },
  {
    showSlug: "nrf-big-show",
    name: "NRF Big Show",
    edition: "NRF 2027",
    start: "2027-01-10",
    end: "2027-01-12",
    dateLabel: "January 10 – 12, 2027",
    venue: "Jacob K. Javits Convention Center",
    city: "New York, NY",
    citySlug: "new-york-city",
    region: "New York",
    localLine:
      "NYC booth rentals staged for Javits — union labour rules, Manhattan freight windows and local storage.",
    hook: "Javits is a union house with unforgiving freight windows. Our NYC crews work it every January.",
    confirmed: true,
  },
  {
    showSlug: "pdac",
    name: "PDAC Convention",
    edition: "PDAC 2027",
    start: "2027-03-07",
    end: "2027-03-10",
    dateLabel: "March 7 – 10, 2027",
    venue: "Metro Toronto Convention Centre",
    city: "Toronto, ON",
    citySlug: "toronto",
    region: "Ontario",
    localLine:
      "Toronto booth rentals delivered to the MTCC South Building — local build, local install, no cross-border freight.",
    hook: "PDAC floors reward heavy-looking builds on light structures. We build ours in Canada and truck them in.",
    confirmed: true,
  },
  {
    showSlug: "himss-global",
    name: "HIMSS Global Health Conference",
    edition: "HIMSS27",
    start: "2027-04-05",
    end: "2027-04-08",
    dateLabel: "April 5 – 8, 2027",
    venue: "Chicago, IL",
    city: "Chicago, IL",
    citySlug: "chicago",
    region: "Illinois",
    localLine:
      "Chicago booth rentals priced with local union labour built in — McCormick-market rules, Chicago crews.",
    hook: "HIMSS moves to Chicago in 2027. New city, new labour rules — we quote them in, not after.",
    confirmed: true,
  },
  {
    showSlug: "web-summit-vancouver",
    name: "Web Summit Vancouver",
    edition: "Web Summit Vancouver 2027",
    start: "2027-05-25",
    end: "2027-05-28",
    dateLabel: "May 25 – 28, 2027",
    venue: "Vancouver Convention Centre",
    city: "Vancouver, BC",
    citySlug: "vancouver",
    cityHref: "/web-summit-vancouver-booth-rentals",
    region: "British Columbia",
    localLine:
      "Vancouver booth rentals for the Convention Centre — preferred-vendor program, local install, no border delays.",
    hook: "We run a rental program tailored to Web Summit exhibitors, delivered locally in Vancouver.",
    confirmed: true,
  },
  {
    showSlug: "defsec-atlantic",
    name: "DEFSEC Atlantic",
    edition: "DEFSEC Atlantic 2026",
    start: "2026-10-06",
    end: "2026-10-08",
    dateLabel: "October 6 – 8, 2026",
    venue: "Halifax Convention Centre",
    city: "Halifax, NS",
    citySlug: "halifax",
    cityHref: "/defsec-atlantic-booth-rentals",
    region: "Nova Scotia",
    localLine:
      "Halifax booth rentals built 15 minutes from the Convention Centre — our own shop, our own install crew.",
    hook: "We're Halifax-based. Your DEFSEC booth is built here and walked in the door.",
    confirmed: true,
  },
];

/** Build levels and how far ahead of the show each one needs to be booked. */
export type BookingTrack = {
  key: "leading" | "custom" | "rescue";
  label: string;
  /** Days of lead time ahead of the show start. */
  days: number;
  note: string;
};

export const BOOKING_TRACKS: BookingTrack[] = [
  {
    key: "leading",
    label: "Leading activations",
    days: 120,
    note: "Flagship, engineered one-off builds — second storeys, bespoke materials and full AV integration.",
  },
  {
    key: "custom",
    label: "Custom booth rentals",
    days: 75,
    note: "100% custom layout and graphics on our rental architecture, or a booth you own outright.",
  },
  {
    key: "rescue",
    label: "Rescue builds",
    days: 45,
    note: "45 days or less to show day. Tighter material palette, but we still build and install it.",
  },
];

function addDays(iso: string, days: number): Date {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - days);
  return d;
}

export function formatDeadline(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export type EventDeadlines = {
  leading: Date;
  custom: Date;
  rescueCutoff: Date;
};

/** The three booking deadlines derived from a show's start date. */
export function deadlinesFor(event: UpcomingEvent): EventDeadlines {
  return {
    leading: addDays(event.start, 120),
    custom: addDays(event.start, 75),
    rescueCutoff: addDays(event.start, 45),
  };
}

export type DeadlineState = {
  /** The next deadline still ahead of `now`, or null once inside 45 days. */
  track: BookingTrack;
  date: Date | null;
  /** Ready-to-use urgency line for cards and graphics. */
  line: string;
};

/**
 * Which booking deadline should be shown today.
 *
 * Always a booking deadline — never the show date. Inside 45 days the message
 * flips to the rescue-build line instead of a deadline that has already passed.
 */
export function currentDeadline(event: UpcomingEvent, now: Date = new Date()): DeadlineState {
  const d = deadlinesFor(event);
  const [leading, custom, rescue] = BOOKING_TRACKS;
  if (now < d.leading) {
    return {
      track: leading!,
      date: d.leading,
      line: `Book leading activations by ${formatDeadline(d.leading)}`,
    };
  }
  if (now < d.custom) {
    return {
      track: custom!,
      date: d.custom,
      line: `Book custom booth rentals by ${formatDeadline(d.custom)}`,
    };
  }
  if (now < d.rescueCutoff) {
    return {
      track: custom!,
      date: d.rescueCutoff,
      line: `Last call — ${formatDeadline(d.rescueCutoff)} before this becomes a rescue build`,
    };
  }
  return {
    track: rescue!,
    date: null,
    line: "Under 45 days out? We still build these — ask about a rescue build",
  };
}


/** Events still ahead of today, soonest first. */
export function upcomingEvents(now: Date = new Date()): UpcomingEvent[] {
  return UPCOMING_EVENTS.filter((e) => new Date(`${e.end}T23:59:59Z`) >= now).sort((a, b) =>
    a.start.localeCompare(b.start),
  );
}

export function eventForShow(showSlug: string): UpcomingEvent | undefined {
  return UPCOMING_EVENTS.find((e) => e.showSlug === showSlug);
}

export function cityHrefFor(e: UpcomingEvent): string {
  return e.cityHref ?? `/city/${e.citySlug}-trade-show-booth-rentals`;
}
