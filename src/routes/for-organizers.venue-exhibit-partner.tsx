import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/PageLayout";
import { OrganizerProgramPage, programSchema, type ProgramPageData } from "@/components/OrganizerProgramPage";
import { VENUES } from "@/data/venues";
import { VENUE_FLOOR_PLANS } from "@/data/venue-floor-plans";
import { absUrl, robotsMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/for-organizers/venue-exhibit-partner";
const TITLE = "Exhibit Partner Program for Convention Centres & Venues | Traction X";
const DESC =
  "A preferred exhibit partner for convention centres and venues: booth designs pre-approved against your ceiling, rigging and fire rules, published floor plan guides for your halls, and fewer exhibitor compliance escalations on move-in.";

const DATA: ProgramPageData = {
  path: PATH,
  eyebrow: "For convention centres & venues",
  title: "Venue Exhibit",
  accent: "Partner Program",
  intro:
    "Fewer non-compliant stands arriving at your docks. Booth designs cleared against your building's actual ceiling heights, hanging-point rules and fire-retardancy requirements before a single crate ships.",
  breadcrumb: "Venue Exhibit Partner",
  tldrHeading: "The short version",
  tldr:
    "Traction X partners with convention centres and venue operators as a preferred exhibit supplier. We build a set of booth designs pre-checked against your building's rules, publish a public floor plan guide for your halls so exhibitors plan correctly before they arrive, and keep a named project manager reachable by your event services team during move-in. There is no fee to the venue, the agreement is non-exclusive by default, and we work through whichever general service contractor each show appoints.",
  includes: [
    {
      title: "Pre-approved design set",
      body: "A library of booth designs checked against your published hall heights, rigging and hanging-point rules, fire-retardancy requirements and aisle standards — so approval isn't a surprise at move-in.",
    },
    {
      title: "Public floor plan guide for your halls",
      body: "We publish and maintain a detailed guide to your building's halls, clear heights, dock access, freight routes and numbering conventions, so exhibitors arrive having read something accurate.",
    },
    {
      title: "Compliance-first fabrication",
      body: "Materials specified to your fire code requirements, structures engineered for your rigging points, and drawings supplied in the format your event services team asks for.",
    },
    {
      title: "Freight discipline",
      body: "Consolidated shipments and crate counts that suit your docks rather than 40 individual courier deliveries in the same two-hour window.",
    },
    {
      title: "A number to call during move-in",
      body: "A named project manager on the floor who reports to your event services team, not only to exhibitors — so a problem stand gets fixed instead of escalated.",
    },
    {
      title: "Referral without exclusivity",
      body: "Your team can point under-prepared exhibitors somewhere concrete. Agreements are non-exclusive by default and cost the venue nothing.",
    },
  ],
  detail: {
    eyebrow: "Why venues care",
    title: "Most move-in friction traces back to a booth that was designed without the building in mind",
    body: (
      <>
        <p>
          A hall's clear height under the beam is not the same as its clear height at the perimeter. A hanging sign
          needs a rigging point that exists. Fabric needs a certificate. Aisle lines are not negotiable at 6am.
          None of this is obscure — but exhibitors buying a booth online rarely see it until it's a problem on your
          floor, and by then the only people available to solve it are yours.
        </p>
        <p>
          Working with a partner that designs against your specific building removes that category of problem
          before it ships. It also gives your event services team somewhere to send the exhibitor who calls two
          weeks out having realized their stand won't clear.
        </p>
        <p>
          We already publish detailed floor plan guides for major convention properties across North America — hall
          dimensions, clear heights, dock and freight notes, booth numbering and rigging rules. A partner venue gets
          that guide maintained with your input, and gets its exhibitors reading it.
        </p>
      </>
    ),
  },
  sequence: [
    {
      title: "Rules intake",
      body: "We collect your published exhibitor rules, hall specs, rigging and fire requirements, and dock procedures — and confirm the details that only your team actually knows.",
    },
    {
      title: "Design set cleared",
      body: "Booth designs adjusted and documented against those rules, with drawings supplied in the format your event services team reviews.",
    },
    {
      title: "Floor plan guide published",
      body: "A public guide to your halls goes live and gets linked from the shows that use your building.",
    },
    {
      title: "Per-show coordination",
      body: "For each show at your venue, we work through that show's appointed general service contractor for drayage, rigging dispatch and utilities.",
    },
    {
      title: "Move-in support",
      body: "A named project manager on the floor, reachable by your team, with reserve capacity if an exhibitor's own supplier fails.",
    },
  ],
  faqs: [
    {
      q: "Does this cost the venue anything?",
      a: "No. There is no fee to name Traction X as a preferred exhibit partner. The program is funded out of exhibitor orders.",
    },
    {
      q: "Does it conflict with our in-house services or our GC relationships?",
      a: "No. Drayage, material handling, rigging dispatch and utilities stay with the show's appointed general service contractor or your in-house team. We supply exhibitor-side booths, graphics, AV, install and dismantle.",
    },
    {
      q: "Do we have to make it exclusive?",
      a: "No — non-exclusive by default. Exhibitors keep full freedom of supplier choice; the program simply gives your team a competent default to point at.",
    },
    {
      q: "What do you need from us to pre-approve designs?",
      a: "Your current exhibitor rules and hall specifications, plus a contact on your event services team who can confirm the details that aren't in the public document. That's usually a single call plus a document exchange.",
    },
    {
      q: "Which venues do you already work in?",
      a: "Major convention properties across North America year-round, including LVCC, Mandalay Bay, McCormick Place, Javits, OCCC, Moscone, Vancouver Convention Centre, Metro Toronto Convention Centre and Halifax Convention Centre, plus in-region fabrication partners internationally.",
    },
  ],
  ctaHeading: "Make Traction X a preferred exhibit partner at your venue",
  ctaBlurb:
    "Send your building name, hall list and a contact on your event services team. We acknowledge a complete brief within one business day and come back with a draft partner outline — design set scope, floor plan guide plan and move-in support — within two.",
  source: "organizers-venue-partner",
};

export const Route = createFileRoute("/for-organizers/venue-exhibit-partner")({
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
  component: VenuePartnerPage,
});

function VenuePartnerPage() {
  const venues = VENUES.filter((v) => VENUE_FLOOR_PLANS[v.slug]);
  return (
    <OrganizerProgramPage data={DATA}>
      <Section
        eyebrow="Already published"
        title="Floor plan guides we maintain for convention properties"
        intro="Each guide covers hall dimensions and clear heights, booth numbering, dock and freight routes, rigging rules and the planning notes exhibitors miss. This is the format a partner venue's guide takes."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {venues.map((v) => (
            <a
              key={v.slug}
              href={`/venue-floor-plans/${v.slug}`}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/75 hover:border-[oklch(0.78_0.13_300)]/50 hover:text-white transition"
            >
              {v.shortName}
              <span className="block text-white/40 text-xs mt-1">{v.city}</span>
            </a>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/venue-floor-plans" className="text-[oklch(0.78_0.13_300)] hover:underline text-sm">
            All venue floor plan guides →
          </Link>
        </div>
      </Section>
    </OrganizerProgramPage>
  );
}
