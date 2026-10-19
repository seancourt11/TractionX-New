import type { Show } from "./shows";
import type { Venue } from "./venues";

// Long-form SEO content generators for /shows/$slug pages.
// Pulls per-entity nouns (industry, city, cadence, audience, booth sizes,
// venue rules) so each page reads uniquely without hand-authoring 1,500
// words per show. Flagship shows can extend via SHOW_OVERRIDES.

export type Faq = { q: string; a: string };
export type Milestone = { weeks: string; milestone: string };
export type CostRow = { label: string; value: string };
export type ShowLongform = {
  tldr: string;
  whyItMatters: string;
  whoExhibits: string[];
  whoAttends: string[];
  hallStrategy: string;
  moveIn: string;
  moveOut: string;
  costFactors: CostRow[];
  timeline: Milestone[];
  designPrinciples: string[];
  commonMistakes: string[];
  roiPlaybook: string[];
  sustainability: string;
  localPartners: string;
  faqs: Faq[];
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function inferMonth(cadence: string): string {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  for (const m of months) if (cadence.toLowerCase().includes(m.toLowerCase())) return m;
  if (/spring/i.test(cadence)) return "Spring";
  if (/fall|autumn/i.test(cadence)) return "Fall";
  if (/summer/i.test(cadence)) return "Summer";
  if (/winter/i.test(cadence)) return "Winter";
  return "each year";
}

export function buildShowLongform(s: Show, v?: Venue): ShowLongform {
  const override = SHOW_OVERRIDES[s.slug] ?? {};
  const month = inferMonth(s.cadence);
  const venueName = v?.name ?? `the ${s.city} convention center`;
  const venueShort = v?.shortName ?? s.city;
  const unionLine = v?.union
    ? `Labor jurisdictions at ${venueShort} — ${v.union} — dictate who touches freight, rigging, electrical, and carpentry, and Traction X integrates that reality into every quote before you commit.`
    : `Labor jurisdictions at ${venueShort} dictate who touches freight, rigging, electrical, and carpentry, and Traction X integrates that reality into every quote before you commit.`;

  const base: ShowLongform = {
    tldr:
      override.tldr ??
      `${s.name} is a ${s.cadence.toLowerCase()} ${s.industry.toLowerCase()} event drawing ${s.attendance} attendees to ${s.city}. Traction X delivers turnkey custom booth rentals and full-service exhibits for ${s.shortName} — design, fabrication, freight, AV, and on-site project management — with pricing that ranges from about $16,250 for a 10×10 rental up to hero islands beyond $130,000, depending on materials and scope. Booth space usually opens 10–12 months in advance; production sequencing generally starts 12–16 weeks before move-in.`,
    whyItMatters:
      override.whyItMatters ??
      `For companies selling into ${s.audience.toLowerCase()}, ${s.name} is the highest-density room your buyers walk in a given year. A single ${month} week in ${s.city} compresses the pipeline motion that would otherwise take six months of outbound — provided your booth actually converts. That is where most ${s.shortName} exhibitors leak spend: a beautiful graphic package that never nudges a stranger into a demo, a floor plan that hides the meeting area, or an AV rig the audience cannot see from 20 feet away. Traction X approaches every ${s.shortName} project as a conversion problem first, then a fabrication problem — the exhibit exists to move badges into meetings and meetings into signed opportunities.`,
    whoExhibits:
      override.whoExhibits ??
      [
        `${s.industry} OEMs and platform vendors`,
        `Channel partners, VARs, and systems integrators`,
        `Startups launching new products in the ${s.industry.toLowerCase()} category`,
        `Enterprise brands running executive briefing programs`,
        `Component and materials suppliers targeting downstream buyers`,
        `Services firms (consulting, integration, managed) chasing enterprise pipeline`,
        `International brands entering the North American market`,
      ],
    whoAttends:
      override.whoAttends ??
      [
        `${s.audience} decision-makers and buyers`,
        `Directors of procurement and category managers`,
        `Product, engineering, and R&D leaders scouting suppliers`,
        `Analysts, press, and industry media`,
        `Investors and corporate-development scouts`,
        `Downstream integrators and channel resellers`,
        `Existing customers using the show as an annual account review`,
      ],
    hallStrategy:
      override.hallStrategy ??
      `${venueName} lays out ${s.shortName} across ${v?.halls ?? "several exhibit halls"}. Traffic patterns matter more than absolute floor position — booths near category "anchors," registration ingress, and food & beverage clusters consistently outperform equal-sized booths tucked into perimeter corners. When you engage Traction X early we will read the current floor plan against your goals, flag columns and sightline breaks that would kill your hero graphic, and give you a defensible booth-selection rationale before you sign the space contract.`,
    moveIn:
      override.moveIn ??
      `Move-in for ${s.shortName} typically runs across three to five days ahead of show open, with targeted move-in slots assigned to island booths over roughly 200 square feet. Larger builds (30×40 and up) commonly get earlier windows so structural elements, rigging, and hanging signs can go up before smaller neighbors arrive. Traction X sequences freight to hit your specific target — ship-to-warehouse via the show's advance freight yard whenever possible, because it consistently saves a full day of on-site chaos versus direct-to-show shipments.`,
    moveOut:
      override.moveOut ??
      `Move-out for ${s.shortName} starts within an hour of show close. Empty containers return to the dock in a first-in / last-out sequence, which means a booth that took two days to install can spend eight hours waiting for empties before it can even begin to strike. Traction X keeps a supervisor on site through tear-down, files bills of lading before the final show floor announcement, and re-routes freight back to our warehouse for storage, refurb, or refresh cycles between shows.`,
    costFactors:
      override.costFactors ??
      [
        { label: "Booth space (paid to show organizer)", value: `$28–$65 per sq ft depending on booth type and location at ${s.shortName}` },
        { label: "Custom rental exhibit (Traction X)", value: `$16,250 (10×10) → $39,000 (20×20) → $65,000+ (larger islands); custom purchase adds ~30–60%` },
        { label: "Graphics & print", value: `$8–$18 per sq ft of printed surface; large-format backwalls and hanging signs priced separately` },
        { label: "Freight (round trip)", value: `$3,500–$18,000 depending on origin, weight, and whether you use advance warehouse` },
        { label: "Drayage (venue material handling)", value: `Billed by the GC per cwt; usually 15–25% of freight budget. Coordinated by Traction X, invoiced by venue.` },
        { label: "Labor (I&D)", value: `Union or right-to-work rates at ${venueShort}; expect $95–$180/hr straight time, with overtime and premium multipliers.` },
        { label: "AV & rigging", value: `$3,500 for a single 4K display up to $50,000+ for LED walls, projection mapping, or truss + hanging signs` },
        { label: "Electrical, internet, cleaning", value: `Order early through venue's exclusive contractors — advance pricing is usually 20–40% cheaper than on-site` },
      ],
    timeline:
      override.timeline ??
      [
        { weeks: "10–12 months out", milestone: `Book booth space with ${s.shortName} organizer; lock target size and hall preference` },
        { weeks: "6–9 months out", milestone: `Kick off design with Traction X — discovery, brand assets, demo requirements, meeting-space math` },
        { weeks: "16 weeks out", milestone: `Sign off on final 3D renders and construction drawings; place long-lead material orders` },
        { weeks: "12 weeks out", milestone: `Book freight, order show services (power, internet, rigging, cleaning) at advance rates` },
        { weeks: "10 weeks out", milestone: `Graphics files due; press-check large-format print samples` },
        { weeks: "6 weeks out", milestone: `Confirm labor call with GC; lock hanging sign engineered drawings and rigging plot` },
        { weeks: "3 weeks out", milestone: `Pre-show meeting: booth staff training, demo scripts, lead-capture tool test, badge scanning` },
        { weeks: "2 weeks out", milestone: `Freight ships to advance warehouse; on-site PM contacts assigned` },
        { weeks: "Show week", milestone: `Traction X supervisor on site through install, show days, and tear-down` },
        { weeks: "Show + 2 weeks", milestone: `Post-show debrief, ROI report, refurb decisions, and calendar for next occurrence` },
      ],
    designPrinciples:
      override.designPrinciples ??
      [
        `Design for the 20-foot read first — booth identity and category promise must be legible from across the aisle before graphics detail matters.`,
        `Route traffic on purpose: give a walking attendee an obvious entry, one hero demo, and a clear exit into a meeting space or lead-capture point.`,
        `Reserve at least 15–20% of floor area for private conversations, even in a 10×20 — the booth exists to book meetings, not to broadcast.`,
        `Elevate demo interactions off the aisle so passing traffic can see engagement without disrupting the person in the demo seat.`,
        `Light the product, not the ceiling — booth-owned overhead lighting outperforms house lighting in every hall we work.`,
        `Standardize a re-usable rental kit for repeatable elements (reception counter, meeting pods, storage) and reserve custom fabrication for the hero moments.`,
        `Prototype the lead-capture flow before you ship — a beautiful booth with a broken badge scanner still costs you the pipeline.`,
      ],
    commonMistakes:
      override.commonMistakes ??
      [
        `Booking booth space before the story is written — floor position drives what design is even possible.`,
        `Under-budgeting drayage and labor — they routinely run 20–35% of total show spend and surprise first-time exhibitors.`,
        `Choosing a purchase build for a booth used once a year instead of a custom rental that refreshes graphics and hero moments annually.`,
        `Under-lighting the demo zone and over-lighting the graphics, which flattens product presence on camera and in person.`,
        `Skipping the pre-show staff training — the same booth converts 2–3× better with a rehearsed opening line and demo hand-off.`,
        `Waiting until move-in day to discover your hanging sign was never approved by the GC's engineering desk.`,
        `Treating post-show follow-up as an afterthought — scans that are not qualified and routed within 48 hours decay fast.`,
      ],
    roiPlaybook:
      override.roiPlaybook ??
      [
        `Define one primary conversion event (booked meeting, qualified demo, opportunity created) and instrument every booth interaction against it.`,
        `Pre-book at least 60% of your target meetings before you arrive — booth traffic should top up the calendar, not fill it.`,
        `Use scannable QR flows tied directly to your CRM instead of relying only on the show's lead-retrieval device.`,
        `Assign a "closer" role to one senior team member per shift — someone whose only job is qualifying warm scans into next-step meetings.`,
        `Run a nightly stand-up during show week to reassign staff, tune the demo script, and flag stuck opportunities to executives.`,
        `Ship a personalized outbound sequence within 48 hours of show close — decay curves after ${s.shortName} are steep.`,
        `Track cost-per-qualified-meeting, not cost-per-scan, and reuse that number to justify next year's exhibit budget internally.`,
      ],
    sustainability:
      override.sustainability ??
      `Traction X treats every ${s.shortName} exhibit as a candidate for reuse. Rental frames, modular walls, and reception furniture return to our warehouse for refurbishment and redeploy on other shows, which shrinks per-show waste and keeps your capex profile flat. When you own booth properties, we build with modular tolerances so hero moments can be re-skinned each year with new graphics rather than rebuilt from scratch — a small design decision at kickoff that pays back for the life of the booth.`,
    localPartners:
      override.localPartners ??
      `${unionLine} We manage the relationships with the show's general contractor (${v?.drayage ?? "the venue's exclusive GC"}), the venue's exclusive electrical and internet vendors, and the local AV and freight ecosystem so exhibitors are not chasing six different account managers the week before ${s.shortName} opens.`,
    faqs:
      override.faqs ??
      [
        {
          q: `How much does a booth rental at ${s.shortName} cost?`,
          a: `Traction X custom rentals typically start around $16,250 for a 10×10, $22,750 for a 10×20, $39,000 for a 20×20, and scale from $65,000 for larger islands into six figures for hero activations. That covers design, fabrication, graphics, and I&D — space fees, drayage, electrical, and AV are additional and vary by ${s.shortName} year.`,
        },
        {
          q: `When should I start planning our ${s.shortName} booth?`,
          a: `Ideally 6–9 months before ${month}. Design typically takes 4–6 weeks, fabrication 6–10 weeks, and graphics 2–3 weeks. Starting earlier gets you better floor position, better labor availability, and advance-pricing rates on show services.`,
        },
        {
          q: `Do you handle freight, drayage, and on-site labor for ${s.shortName}?`,
          a: `Yes. Traction X coordinates freight to the advance warehouse, files material handling forms with the GC, books union or right-to-work labor at ${venueShort}, and keeps a project manager on site through install, show days, and tear-down.`,
        },
        {
          q: `Can we ship our existing booth to ${s.shortName} instead of renting?`,
          a: `Absolutely — Traction X will refresh, refit, or supplement an owned booth. We often propose a hybrid: refresh the hero graphics and hanging sign, rent additional footprint or private meeting rooms for the show, and store everything between events.`,
        },
        {
          q: `How does drayage work at ${s.shortName}?`,
          a: `Drayage is charged by the GC to move your freight from the dock into your booth space and to return empties after the show. It is billed by weight, typically per hundredweight (cwt). Advance-warehouse shipments are usually cheaper per cwt than direct-to-show and cut same-day dock congestion.`,
        },
        {
          q: `What is the difference between a custom rental and a custom purchase for ${s.shortName}?`,
          a: `A custom rental gives you a one-off exhibit designed for this show, then returns to our warehouse — you pay only for the show, and the graphics refresh next year. A custom purchase is asset-owned by you and typically pays back if you exhibit at three or more shows over its lifetime.`,
        },
        {
          q: `Can Traction X manage AV, lighting, and hanging signs for ${s.shortName}?`,
          a: `Yes. AV, rigging, and lighting are usually the highest-visibility elements of a booth; Traction X sources, integrates, and rigs them alongside the exhibit build so you have one accountable partner instead of a stack of separate contractors.`,
        },
        {
          q: `Do you support exhibitors coming from outside the US or Canada?`,
          a: `Yes. Traction X regularly supports international exhibitors at ${s.shortName} — we handle inbound freight coordination, customs paperwork with your broker, and on-site translation of GC forms and labor calls.`,
        },
      ],
  };

  return base;
}

// Flagship overrides for the most-visited show pages. Kept small on purpose:
// the generator gives every show a strong baseline, and overrides layer in
// specifics we know cold.
const SHOW_OVERRIDES: Record<string, Partial<ShowLongform>> = {
  "ces-las-vegas": {
    tldr:
      "CES is the world's largest consumer technology show, drawing 115,000+ attendees to the Las Vegas Convention Center every January. Traction X delivers custom booth rentals and full-service exhibits for CES — West Hall mobility, Central Hall consumer tech, and North Hall enterprise — with turnkey pricing from $16,250 for a 10×10 rental up through six-figure hero activations. Booth space contracts open a full year out; production for CES typically starts 16–20 weeks pre-show.",
    whyItMatters:
      "CES is where consumer, automotive, AI, and enterprise technology categories set the year's narrative. Coverage from CES seeds every downstream media cycle, and the show floor is where retail buyers, automotive OEMs, distributors, and enterprise procurement teams do their annual scouting in one week. For most brands with a hardware, mobility, or AI story, missing CES means ceding the visual airtime to competitors who did show up.",
  },
  "web-summit-vancouver": {
    tldr:
      "Web Summit Vancouver is Web Summit's flagship North American event, hosted at the Vancouver Convention Centre. Traction X is a preferred exhibit partner for Web Summit exhibitors, delivering turnkey rental packages tailored to the Alpha, Beta, Growth, and Scale tiers, plus custom-fabricated brand activations for headline sponsors. Package ranges start around $20,500 for a 3×3m footprint and scale beyond $130,000 for partner-tier activations.",
  },
  "defsec-atlantic": {
    tldr:
      "DEFSEC Atlantic is Atlantic Canada's flagship defence and security tradeshow, hosted every October at the Halifax Convention Centre. Traction X is the official custom exhibit rental supplier for DEFSEC — booth design, fabrication, AV, install and dismantle, and on-site project management are handled under a single scope. Book rental scope by the first week of August for October move-in.",
  },
};
