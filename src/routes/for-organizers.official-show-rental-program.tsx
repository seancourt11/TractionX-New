import { createFileRoute } from "@tanstack/react-router";
import { OrganizerProgramPage, programSchema, type ProgramPageData } from "@/components/OrganizerProgramPage";
import { absUrl, robotsMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/for-organizers/official-show-rental-program";
const TITLE = "Official Show Booth Rental Program for Organizers | Traction X";
const DESC =
  "Turn exhibitor booth supply into a managed program: branded rental packages priced to your rate card, a co-branded order page, deadline-aware ordering, revenue share and an on-floor service desk. No fee to the show.";

const DATA: ProgramPageData = {
  path: PATH,
  eyebrow: "For show organizers",
  title: "Official Show",
  accent: "Booth Rental Program",
  intro:
    "A branded exhibitor rental program built on your floor plan and your rate card — so booth supply stops being 400 separate problems your operations team inherits six weeks out.",
  breadcrumb: "Official Show Rental Program",
  tldrHeading: "The short version",
  tldr:
    "Traction X becomes your show's official or preferred exhibit rental supplier. We render booth packages against your actual floor plan, publish them on a co-branded order page tied to your deadlines, fulfil every order with custom rentals (install and dismantle included), and staff a service desk during move-in. There is no fee to the show, agreements are non-exclusive by default, revenue share is supported where your model calls for it, and the program goes live four to six weeks after signature.",
  includes: [
    {
      title: "Packages priced to your rate card",
      body: "Tiers from a 10×10 in-line through 20×30 and sponsor-scale islands, priced against your booth rates so an exhibitor sees space plus booth as one coherent number instead of two unrelated invoices.",
    },
    {
      title: "Co-branded order page",
      body: "A landing page and order form carrying your show's identity, linked from your exhibitor portal and service kit, with rendered packages rather than stock booth photography.",
    },
    {
      title: "Deadline-aware ordering",
      body: "Order cut-offs mapped to your GC's graphics, electrical and freight deadlines, with reminders that go out before the date rather than after an exhibitor has missed it.",
    },
    {
      title: "Fulfilment end to end",
      body: "Design, fabrication, graphics, AV, freight coordination, install and dismantle. Install and dismantle labour is included in every published price.",
    },
    {
      title: "Revenue share",
      body: "Where your organization runs a sponsorship or commission model, standard revenue share on rental orders placed through the program is written into the agreement — not renegotiated each edition.",
    },
    {
      title: "Reporting your team can use",
      body: "Order volume, package mix and outstanding exhibitor actions, reported to your operations team on the cadence you set rather than pulled together the week of the show.",
    },
  ],
  detail: {
    eyebrow: "Why it matters",
    title: "Booth supply is an operations problem before it's a revenue one",
    body: (
      <>
        <p>
          Every show has a tail of exhibitors who booked space and then went quiet on the booth itself. They are
          rarely the sponsors — they are the 10×10s and 10×20s, first- and second-year exhibitors, the ones who
          discover in week three that their supplier stopped answering or that a 20-foot hanging sign was never
          going to clear the hall.
        </p>
        <p>
          That tail is what generates move-in day escalations, and it lands on your operations team because there
          is no one else for the exhibitor to call. An official rental program moves that call to us: the exhibitor
          has a published package, a deadline calendar, a project manager and a desk on the floor.
        </p>
        <p>
          It also raises the floor on how your show looks. A hall where the small stands are competently built
          photographs better, sells better to next year's prospects, and keeps first-time exhibitors coming back —
          which matters more to renewal rates than almost anything on the sponsorship deck.
        </p>
        <p>
          We do not take over your general service contractor's scope. Drayage, material handling, rigging dispatch
          and utilities stay with the GC, and we file through their forms and deadlines like any other
          exhibitor-appointed contractor.
        </p>
      </>
    ),
  },
  sequence: [
    {
      title: "Brief and outline",
      body: "Show name, dates, venue, exhibitor count and how booth supply works today. Complete briefs are acknowledged within one business day; a draft program outline follows within two.",
    },
    {
      title: "Package design against your plan",
      body: "Package tiers rendered to your hall's ceiling heights, rigging rules and booth dimensions — so nothing published can fail approval later.",
    },
    {
      title: "Order page and service kit content",
      body: "Co-branded page live, exhibitor service kit copy supplied, links placed in your exhibitor portal. Typically four to six weeks from signature.",
    },
    {
      title: "Ordering window",
      body: "Exhibitors order against your deadline calendar. Escalations, artwork chasing and change orders run through our project manager, not your inbox.",
    },
    {
      title: "Move-in and show days",
      body: "Service desk staffed on the floor, install crews scheduled to the GC's targets, and a named project manager reporting to your operations team.",
    },
    {
      title: "Post-show reporting and next edition",
      body: "Order mix, exhibitor feedback and what to change in the package tiers for the next edition, delivered while it's still fresh.",
    },
  ],
  faqs: [
    {
      q: "What does the program cost the show?",
      a: "Nothing. There is no fee to name Traction X as your official or preferred exhibit rental supplier. The program is funded out of exhibitor orders.",
    },
    {
      q: "Can we take revenue share on exhibitor orders?",
      a: "Yes. Standard revenue share on rental orders placed through the program is supported and written into the agreement, so it does not get renegotiated show by show.",
    },
    {
      q: "Is the agreement exclusive?",
      a: "Non-exclusive by default. Exhibitors are always free to bring their own supplier. We can go exclusive where your contract structure requires it.",
    },
    {
      q: "Do you replace our general service contractor?",
      a: "No. Your GC keeps drayage, material handling, rigging dispatch and utilities. We supply booths, graphics, AV and exhibitor-side install and dismantle, filing through their forms and deadlines.",
    },
    {
      q: "What booth sizes and budgets does the program cover?",
      a: "10×10 in-line rentals through 20×30 and up to six-figure custom islands, double decks and sponsor activations. Install and dismantle labour is included in every price; venue-billed items like drayage, electrical and rigging are ordered through the GC and billed separately.",
    },
    {
      q: "Our show is in under 60 days — is it too late?",
      a: "No. We run an accelerated version: a single-page rate sheet plus a direct order line for this edition, then build the full program for the next one.",
    },
    {
      q: "What happens if an exhibitor's own supplier falls through?",
      a: "That is exactly what the program's reserve capacity exists for. We hold rental inventory and fabrication capacity for partner shows and can stand up a replacement booth in as little as 45 days.",
    },
  ],
  ctaHeading: "Start an official rental program for your show",
  source: "organizers-official-rental-program",
};

export const Route = createFileRoute("/for-organizers/official-show-rental-program")({
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
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(programSchema(DATA, TITLE, DESC)) },
      ],
    };
  },
  component: () => <OrganizerProgramPage data={DATA} />,
});
