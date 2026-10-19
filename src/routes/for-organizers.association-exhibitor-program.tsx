import { createFileRoute } from "@tanstack/react-router";
import { OrganizerProgramPage, programSchema, type ProgramPageData } from "@/components/OrganizerProgramPage";
import { absUrl, robotsMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/for-organizers/association-exhibitor-program";
const TITLE = "Association & Society Exhibitor Booth Program | Traction X";
const DESC =
  "A member exhibitor booth program for associations and societies: tiered packages from a first-time in-line stand to a sponsor activation, so member exhibitors get a competent booth and renew their space next year.";

const DATA: ProgramPageData = {
  path: PATH,
  eyebrow: "For associations & societies",
  title: "Association Member",
  accent: "Exhibitor Program",
  intro:
    "Your annual meeting's exhibit hall is a member service before it's a revenue line. Tiered booth packages that fit a first-year member's budget as comfortably as a platinum sponsor's.",
  breadcrumb: "Association Exhibitor Program",
  tldrHeading: "The short version",
  tldr:
    "Traction X runs member-facing booth programs for associations and societies: a tiered package set from a simple in-line stand up to a sponsor-scale activation, priced to your rate card and published on a co-branded order page. The goal is renewal, not just an order — a first-year member exhibitor who gets a competent booth, clear deadlines and someone on the floor is a member who books space again. No fee to the association, non-exclusive by default.",
  includes: [
    {
      title: "Tiers that match member budgets",
      body: "An entry tier a first-year member can actually afford, a mid tier for regular exhibitors, and a sponsor tier that looks meaningfully different on the floor — so upgrading is an obvious next step rather than a cliff.",
    },
    {
      title: "Consistent hall look",
      body: "A coordinated design language across tiers so the hall reads as one curated exhibition rather than a patchwork, without forcing members into identical shell scheme.",
    },
    {
      title: "Co-branded ordering",
      body: "An order page carrying your association's identity, linked from the member portal and prospectus, with rendered packages and published prices.",
    },
    {
      title: "First-time exhibitor guidance",
      body: "Plain-language onboarding for members who've never exhibited: what a booth includes, what the venue charges separately, and what deadlines actually matter.",
    },
    {
      title: "Sponsor-level activations",
      body: "For your top sponsors, full custom fabrication — theatres, demo stations, hospitality — designed against the same floor plan so the hall stays coherent.",
    },
    {
      title: "Revenue share where it applies",
      body: "Where your model calls for it, standard revenue share on rental orders placed through the program, written into the agreement.",
    },
  ],
  detail: {
    eyebrow: "Why associations are different",
    title: "Your exhibitors are your members, so a bad booth costs you twice",
    body: (
      <>
        <p>
          At a commercial trade show, a disappointing exhibiting experience costs one booth sale. At an association
          meeting it costs a booth sale and strains a membership relationship — often with a smaller organization
          whose entire marketing budget went into that one stand.
        </p>
        <p>
          The most common failure is not price, it's the gap between tiers. A member who can't stretch to the
          sponsor package ends up with a table and a pull-up banner, looks out of place next to the industry
          players, gets few conversations, and quietly doesn't return the following year.
        </p>
        <p>
          A properly structured tier set fixes that. The entry tier has to be a real booth — built, lit, and
          designed to the same visual language as the rest of the hall — just smaller. Then upgrading feels like a
          logical step rather than a leap into a different category of spend.
        </p>
        <p>
          Install and dismantle labour is included in every package price, which matters disproportionately for
          small member exhibitors: it's the cost that most often surprises them and sours the experience.
        </p>
      </>
    ),
  },
  sequence: [
    {
      title: "Member profile review",
      body: "Who exhibits today, at what budgets, how many are first-timers, and where members drop out between editions.",
    },
    {
      title: "Tier design",
      body: "Package tiers designed against your floor plan and rate card, with a genuinely usable entry tier and clear upgrade steps.",
    },
    {
      title: "Prospectus and order page",
      body: "Rendered packages supplied for your prospectus, plus a co-branded order page linked from your member portal.",
    },
    {
      title: "Member onboarding",
      body: "First-time exhibitor guidance and a deadline calendar mapped to your general service contractor's cut-offs.",
    },
    {
      title: "On-site delivery",
      body: "Install to the GC's targets, a service desk during move-in, and a named project manager reporting to your meetings team.",
    },
    {
      title: "Renewal debrief",
      body: "Which tiers sold, which members struggled, and what to change before the next annual meeting.",
    },
  ],
  faqs: [
    {
      q: "Does the program cost the association anything?",
      a: "No. There is no fee to name Traction X as your official or preferred exhibit supplier — the program is funded out of member exhibitor orders, and revenue share is supported where your model calls for it.",
    },
    {
      q: "Can members still bring their own supplier?",
      a: "Yes. Agreements are non-exclusive by default; the program is a competent default, not a mandate.",
    },
    {
      q: "What does the entry tier actually get a first-time member?",
      a: "A built, lit and graphically designed in-line booth — typically a 10×10 custom rental starting around $16,250 — with install and dismantle labour included. Venue-billed items like drayage and electrical are ordered through the general service contractor and billed separately.",
    },
    {
      q: "Can you handle our top sponsors too?",
      a: "Yes. The same team builds six-figure custom islands, double decks and sponsor activations, designed against the same floor plan so the hall stays visually coherent across tiers.",
    },
    {
      q: "How far ahead do we need to start?",
      a: "Four to six weeks from a signed agreement to a live member order page. For meetings inside 60 days we run an accelerated rate sheet for this edition and build the full program for the next.",
    },
  ],
  ctaHeading: "Build a member exhibitor program",
  ctaBlurb:
    "Send your meeting name, dates, venue and approximate exhibitor count, plus how many are typically first-time exhibitors. We acknowledge a complete brief within one business day and send a draft tier structure within two.",
  source: "organizers-association-program",
};

export const Route = createFileRoute("/for-organizers/association-exhibitor-program")({
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
