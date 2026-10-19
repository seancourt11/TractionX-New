import { createFileRoute } from "@tanstack/react-router";
import { OrganizerProgramPage, programSchema, type ProgramPageData } from "@/components/OrganizerProgramPage";
import { absUrl, robotsMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/for-organizers/exhibitor-service-desk";
const TITLE = "Exhibitor Service Desk & Service Kit Support for Shows | Traction X";
const DESC =
  "An on-floor exhibitor service desk plus written exhibitor service kit content and a named project manager reporting to your operations team — so booth escalations stop before they reach show management.";

const DATA: ProgramPageData = {
  path: PATH,
  eyebrow: "For show organizers",
  title: "Exhibitor Service Desk",
  accent: "& Service Kit Support",
  intro:
    "A staffed desk on your floor during move-in and show days, exhibitor service kit content written to your deadlines, and one escalation path instead of a switchboard.",
  breadcrumb: "Exhibitor Service Desk",
  tldrHeading: "The short version",
  tldr:
    "Traction X staffs an exhibitor service desk during move-in and show days for partner shows, backed by a named project manager who reports to your operations team. We write the booth-related sections of your exhibitor service kit, run the deadline reminders, absorb exhibitor questions that would otherwise reach show management, and keep reserve build capacity for the stand that arrives broken or never arrives at all. There is no fee to the show.",
  includes: [
    {
      title: "Staffed desk on the floor",
      body: "Physically present during move-in and show days, in the location your operations team assigns, with the crew and tools to fix small problems rather than log them.",
    },
    {
      title: "Named project manager",
      body: "One person accountable to your operations team — not a shared inbox — with a direct line and a documented escalation path.",
    },
    {
      title: "Service kit content",
      body: "The booth, graphics, AV and install sections of your exhibitor service kit written in plain language, mapped to your GC's forms and cut-off dates.",
    },
    {
      title: "Deadline reminders",
      body: "Reminders that go out before an exhibitor misses a date, not a report afterwards showing that 60 of them did.",
    },
    {
      title: "On-floor repairs and fixes",
      body: "Graphics damaged in transit, a missing shelf, a monitor mount that doesn't fit — handled at the desk rather than becoming an ops escalation.",
    },
    {
      title: "Reserve capacity",
      body: "Rental inventory and fabrication capacity held for partner shows, so a failed supplier or a lost crate has a same-show answer.",
    },
  ],
  detail: {
    eyebrow: "Why it works",
    title: "Most exhibitor calls to show management are not really for show management",
    body: (
      <>
        <p>
          Walk any move-in and the questions arriving at the organizer's office are overwhelmingly booth questions:
          where is my crate, can I hang this, my graphic is torn, my supplier isn't answering, who do I pay for
          labour. None of those need a decision from show management — they need someone with a truck, a crew and
          the GC's phone number.
        </p>
        <p>
          A service desk exists to intercept that traffic. It also produces something your team currently has to
          assemble by hand: an accurate, real-time picture of which stands are actually going to be ready when the
          hall opens.
        </p>
        <p>
          The desk is not a replacement for your general service contractor's exhibitor services counter. The GC
          keeps drayage, material handling, rigging dispatch and utilities; we cover the booth itself — structure,
          graphics, AV, install and dismantle — and route anything else to the right counter instead of back to you.
        </p>
      </>
    ),
  },
  sequence: [
    {
      title: "Scope set with your ops team",
      body: "Desk location, staffed hours across move-in and show days, escalation path, and what your team wants routed versus resolved.",
    },
    {
      title: "Service kit content delivered",
      body: "Booth-related sections written and handed to you in time for the kit's publication date, mapped to your GC's forms.",
    },
    {
      title: "Pre-show reminder cycle",
      body: "Deadline reminders to exhibitors ordering through the program, plus a flag list of stands that look likely to arrive incomplete.",
    },
    {
      title: "Move-in",
      body: "Desk staffed, install crews scheduled to the GC's targets, on-floor fixes handled, and a readiness picture reported to your operations team.",
    },
    {
      title: "Show days and dismantle",
      body: "Desk stays open for show-day issues, then coordinates dismantle and outbound freight against the GC's schedule.",
    },
    {
      title: "Debrief",
      body: "What broke, what got asked repeatedly, and which service kit sections to rewrite before the next edition.",
    },
  ],
  faqs: [
    {
      q: "Is the service desk an extra cost to the show?",
      a: "No. For partner shows the desk is part of the program and funded out of exhibitor orders. There is no fee to the show or venue.",
    },
    {
      q: "Does the desk conflict with the GC's exhibitor services counter?",
      a: "No. The GC keeps drayage, material handling, rigging dispatch and utilities. We handle the booth itself and route anything in the GC's scope to their counter rather than back to your office.",
    },
    {
      q: "Do you help exhibitors who didn't order through the program?",
      a: "Yes for triage and routing — that's the point of intercepting the call. Physical work for a non-program exhibitor is quoted on the spot as a normal exhibitor engagement.",
    },
    {
      q: "Who writes the exhibitor service kit content?",
      a: "We write the booth, graphics, AV and install and dismantle sections and hand them to you for approval before your kit's publication date. You keep editorial control and your own voice.",
    },
    {
      q: "What hours is the desk staffed?",
      a: "Set with your operations team — typically the full move-in window plus show-day open hours, with dismantle coverage at the end.",
    },
  ],
  ctaHeading: "Put a service desk on your floor",
  ctaBlurb:
    "Send your show name, dates, venue and move-in schedule. We acknowledge a complete brief within one business day and come back with desk scope, staffing hours and service kit content plan within two.",
  source: "organizers-service-desk",
};

export const Route = createFileRoute("/for-organizers/exhibitor-service-desk")({
  head: () => {
    const url = absUrl(PATH);
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        ...robotsMeta(),
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESC },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(programSchema(DATA, TITLE, DESC)) }],
    };
  },
  component: () => <OrganizerProgramPage data={DATA} />,
});
