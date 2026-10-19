/**
 * Long-form content for /double-deck-trade-show-booths.
 *
 * Quote-only by decision: no dollar figures anywhere in this file. The cost
 * question is answered with cost drivers and a CTA. Traction X both rents and
 * builds double decks — keep both paths visible in the copy.
 */

export const DD_PATH = "/double-deck-trade-show-booths";

export const DD_TITLE =
  "Double Deck Trade Show Booths — Two-Story Exhibit Rentals & Builds | Traction X";

export const DD_DESC =
  "Double deck and two-story trade show exhibits, rented or built. Engineering, stamped drawings, venue permits, occupancy sign-off, install and dismantle — managed end to end by Traction X.";

/** Extractable answer for #tldr and AI/voice results. */
export const DD_SHORT_ANSWER =
  "A double deck trade show booth — also called a two-story exhibit or double decker — adds a structurally engineered second level above your booth floor, typically used for private meetings, VIP hospitality or a presentation overlook. It needs an island space: 20×20 is the practical minimum, 20×30 and 30×30 are the common sizes, and the deck itself usually covers 40–70% of the footprint. Traction X both rents and builds double decks, and manages the part most exhibitors underestimate: stamped structural drawings, venue technical review, fire-marshal occupancy sign-off and egress compliance.";

export const DD_SPEC: { label: string; value: string }[] = [
  { label: "Space type", value: "Island only. Almost no show permits a second level over in-line or peninsula space." },
  { label: "Minimum footprint", value: "20×20 (400 sq ft) is workable; 20×30 and 30×30 are where a deck stops compromising the ground floor." },
  { label: "Deck coverage", value: "Typically 40–70% of the footprint — the rest stays open so the ground level doesn't feel like a basement." },
  { label: "Overall height", value: "Commonly 16–20 ft to the top of the deck rail; some halls allow more. Ceiling height and the show's display rules govern, not the design." },
  { label: "Deck clearance", value: "Roughly 8 ft of headroom below and 7–8 ft above — this is what drives total height more than anything else." },
  { label: "Occupancy", value: "Set by the fire marshal from deck area and egress width. Plan on posted maximum occupancy signage and a staff member enforcing it." },
  { label: "Access", value: "One stair minimum; two stairs or a stair plus lift once occupancy rises. Stair width, rise/run and handrails are code items, not design choices." },
  { label: "Accessibility", value: "If the upper level offers something the ground level doesn't, an accessible route may be required — plan a lift or duplicate the function below." },
  { label: "Weight & load", value: "Engineered point loads on the hall floor; some venues cap PSI and require load-spreading plates. Freight weight and drayage rise materially." },
  { label: "Approvals lead time", value: "Stamped drawings submitted 60–90 days before move-in at most major venues. This is the schedule driver, not fabrication." },
  { label: "Install time", value: "Typically two to three days of supervised install versus one for a single-level island of the same footprint." },
  { label: "In our price", value: "Design, engineering coordination, fabrication or rental structure, graphics, warehouse pre-build with photo approval, freight, supervised install and dismantle, project management." },
  { label: "Billed by the show", value: "Drayage, electrical, rigging, permit and plan-review fees, fire watch where required, cleaning and internet. We file the forms and estimate the cost before you commit." },
];

export type DDSection = {
  heading: string;
  eyebrow?: string;
  body: string[];
  bullets?: { lead: string; text: string }[];
};

export const DD_SECTIONS: DDSection[] = [
  {
    eyebrow: "The case for going vertical",
    heading: "Why exhibitors build a second level",
    body: [
      "A double deck buys you square footage the show floor isn't selling you. Once a hall's island space is sold out — or once the price per square foot for a bigger island exceeds what a deck costs to engineer, ship and install — building upward is the cheaper way to add usable area. That calculation flips in your favour fastest at the large, space-constrained flagship shows where the footprint you want simply isn't available at any price.",
      "The second reason has nothing to do with area. A deck puts conversation above the noise floor. Show halls run at 75–85 dB during peak hours, which is fine for a demo and hostile to a contract discussion. Eight feet of elevation and a rail is enough to change the acoustics and the psychology — visitors who climb the stairs have self-selected, and they behave like people in a meeting rather than people in an aisle.",
      "The third is visibility. A two-story structure with an illuminated upper band is legible from anywhere in the hall, which is why sponsors and category leaders build them. If the goal is to be the thing people navigate by, height does that more reliably than any graphic at eye level.",
    ],
    bullets: [
      { lead: "Space economics", text: "Adding a deck is often less than the organizer's price for the next island size up, especially at sold-out flagship shows." },
      { lead: "Private meetings", text: "Elevation plus an enclosed room gets you a real conversation without renting off-floor meeting space." },
      { lead: "VIP hospitality", text: "A lounge, a bar and a view over the hall is the strongest reason a senior buyer stays in your booth for 40 minutes." },
      { lead: "Landmark presence", text: "Two stories reads across the hall and anchors a sponsorship package visually, not just in the programme." },
      { lead: "Staff relief", text: "Even a modest deck gives a team of twelve somewhere to brief, eat and store things that isn't the customer-facing floor." },
    ],
  },
  {
    eyebrow: "The honest counter-case",
    heading: "When a bigger single-level island is the better buy",
    body: [
      "We will tell you not to build one when the numbers don't hold up. A double deck adds engineering, permits, plan-review fees, heavier freight, higher drayage, longer install labour and — at many venues — a fire watch. Those costs are real and they recur at every show you take it to.",
      "If your programme is one show a year, if the hall's ceiling height forces an awkwardly low deck, if your team is under six people, or if the second level would only ever hold storage, the same money spent on a larger single-level island with better millwork, lighting and AV will out-perform the deck. Elevation is not automatically impressive; a badly proportioned deck on an undersized footprint reads as cramped from every aisle.",
      "The test we apply: can you name what happens upstairs and who it happens with? If the answer is a specific activity with specific people — executive briefings, distributor signings, analyst meetings, VIP hospitality — build it. If the answer is \"more space,\" buy more space.",
    ],
  },
  {
    eyebrow: "Upstairs",
    heading: "What actually goes on the second level",
    body: [
      "The deck is not a second booth. It has one job, and choosing that job before design starts is what separates a deck that earns its cost from one that sits empty by 11am on day two.",
      "Whatever it holds, plan the stair as part of the experience. A stair tucked in a back corner gets ignored; a stair that is visible, wide, well-lit and gated by a host reads as an invitation with a gatekeeper — which is exactly the signal you want.",
    ],
    bullets: [
      { lead: "Enclosed meeting room", text: "Walls, door, table for four to eight, wall display and acoustic treatment. The highest-value use and the most common." },
      { lead: "Open hospitality lounge", text: "Soft seating for eight to twelve, a bar or coffee station, and a view over the hall. Best where dwell time is the goal." },
      { lead: "Presentation overlook", text: "Seating along the rail facing a ground-level stage or LED wall — turns your demo into a scheduled event with an audience." },
      { lead: "Multiple small rooms", text: "Two or three four-person rooms on a 30×30 deck for back-to-back scheduled meetings across the show." },
      { lead: "Staff and storage", text: "Legitimate on a larger deck as a secondary zone, never as the primary reason to build one." },
    ],
  },
  {
    eyebrow: "The part nobody explains well",
    heading: "Engineering, permits and approvals",
    body: [
      "This is where double-deck projects fail, and it fails on the calendar rather than in the shop. A second level is a temporary structure with people on it, so it enters a review process that a single-level booth never touches. At most major North American venues that means stamped structural drawings sealed by a licensed engineer in the show's jurisdiction, submitted to the venue's technical services or the local fire marshal 60 to 90 days before move-in, with a plan-review fee and, in some jurisdictions, an inspection on the floor before the deck can be occupied.",
      "The reviewers look at specific things, and each of them constrains the design. Getting these right at the concept stage costs nothing; discovering them after fabrication costs a redesign or a show.",
      "Traction X runs this process as part of the project. We coordinate the engineer of record, produce the drawing package, submit to the venue on its deadline, respond to review comments, and have a producer on the floor for the inspection. You are not chasing a permit in a city you don't operate in three weeks before your show.",
    ],
    bullets: [
      { lead: "Stamped structural drawings", text: "Sealed by an engineer licensed where the show is held — a stamp from another state or province is frequently rejected." },
      { lead: "Live and dead loads", text: "Deck loading is calculated to code, usually 100 psf live load for assembly use, plus the structure's own weight and anything hung from it." },
      { lead: "Floor point loads", text: "Some halls cap floor PSI and require load-spreading plates; halls over parking or basement levels are the strictest." },
      { lead: "Egress and stairs", text: "Stair count, minimum width, rise and run, handrail height and landing dimensions are code, and the fire marshal measures them." },
      { lead: "Posted occupancy", text: "A maximum occupancy is assigned and must be posted and enforced. Design the deck for the number you actually need." },
      { lead: "Fire suppression and watch", text: "An enclosed, ceilinged area under a deck can trigger sprinkler or fire-watch requirements — an ongoing labour charge from the venue." },
      { lead: "Accessibility", text: "If the upper level offers a service the ground level doesn't, an accessible route or an equivalent ground-floor experience may be required." },
      { lead: "Rigging interaction", text: "Overhead signage above a deck changes rigging points and heights; it is ordered and hung by the venue's rigging crew." },
    ],
  },
  {
    eyebrow: "Venue reality",
    heading: "Not every hall — and not every hall within a venue",
    body: [
      "Double decks are routine at the large purpose-built convention centres: Las Vegas Convention Center, Mandalay Bay, McCormick Place, Orange County Convention Center, the Javits Center, Moscone and their international equivalents. Ceiling heights there are generous, technical services departments have a defined submission process, and the show's own display rules usually spell out multi-level requirements.",
      "They are restricted or banned at older halls, in specific low-ceiling halls inside otherwise capable venues, on floors with load limits, and in exhibition spaces built over parking or occupied levels. Some shows also prohibit them outright regardless of the venue, or gate them behind a sponsorship tier. We check the specific hall and the specific show's exhibitor manual before design begins — not the venue in general, because the answer often differs hall to hall inside the same building.",
      "Ceiling height is the practical filter. You need roughly 20 feet of clear height for a comfortable deck once you account for headroom above and below, deck structure thickness and rail. Below that, the deck gets squeezed and the ground floor feels compressed — and a compressed two-story booth performs worse than a well-lit single-level one.",
    ],
  },
  {
    eyebrow: "Rent or build",
    heading: "Renting a double deck vs. building one to own",
    body: [
      "We do both, and the right answer follows your show count rather than your budget.",
      "Renting is how most exhibitors should test vertical. The structural system already exists and is already engineered, so the drawing package is a variation rather than a first-principles design, which shortens the approval timeline. You get the deck for the show, we reconfigure and rebrand it around your programme, and it goes back to the warehouse afterwards — no crates, no storage, no refurbishment, no asset sitting idle for eleven months.",
      "Building to own makes sense when a double deck is a fixed part of your annual programme across multiple shows, when the design carries brand architecture you can't get from a rental system, or when the engineering approvals become reusable across editions of the same show. Owned decks carry real ongoing costs — crate maintenance, storage, refurbishment, re-engineering when a venue's rules change — so the threshold is higher than it is for a single-level island.",
      "The common pattern: rent the deck for the first flagship, prove the meetings happen upstairs, then build to own once the show calendar and the programme are settled.",
    ],
    bullets: [
      { lead: "Rent it", text: "One or two shows a year, first time going vertical, or a show where the footprint changes edition to edition." },
      { lead: "Build it", text: "Three or more shows a year with a stable footprint, or a design that has to be unmistakably yours." },
      { lead: "Either way", text: "Install and dismantle labour, freight, warehouse pre-build and project management are inside our price." },
    ],
  },
];

/** Longer than a standard build — engineering and permits set the pace. */
export const DD_COUNTDOWN: { when: string; what: string; detail: string }[] = [
  { when: "T−20 wks", what: "Feasibility check", detail: "Hall, ceiling height, floor loading, show display rules and whether a deck is permitted at all. Before any design work." },
  { when: "T−18 wks", what: "Concept & deck strategy", detail: "What happens upstairs, deck coverage, stair position, occupancy target — the decisions everything downstream depends on." },
  { when: "T−16 wks", what: "3D design approval", detail: "Photoreal renders and floor plans for both levels. Sign-off here locks scope and freezes the engineering brief." },
  { when: "T−14 wks", what: "Structural engineering", detail: "Engineer of record produces sealed drawings and load calculations for the show's jurisdiction." },
  { when: "T−12 wks", what: "Permit submission", detail: "Drawing package filed with venue technical services and the fire marshal, ahead of the show's stated deadline." },
  { when: "T−10 wks", what: "Fabrication begins", detail: "Structure, millwork and stairs into production while review comments are answered in parallel." },
  { when: "T−6 wks", what: "Approval in hand", detail: "Stamped approval and posted occupancy confirmed. Any conditions from the reviewer are built in, not bolted on." },
  { when: "T−4 wks", what: "Graphics files due", detail: "Templates and prepress check for both levels, including the upper band that reads across the hall." },
  { when: "T−3 wks", what: "Warehouse pre-build", detail: "The deck is erected complete in our shop and load-tested. You approve photos or walk it live before it crates." },
  { when: "T−2 wks", what: "Freight departs", detail: "Timed to advance-warehouse targets. Deck structure is heavy — early shipping protects the drayage bill." },
  { when: "T−3 days", what: "Supervised install", detail: "Two to three days on the floor with your producer present, plus the venue inspection before occupancy." },
  { when: "Show close", what: "Dismantle & outbound", detail: "Out before the forced-freight deadline, back to storage or straight to the next show." },
];

export const DD_FAQS: { q: string; a: string }[] = [
  {
    q: "How much does a double deck trade show booth cost?",
    a: "We quote double decks to spec rather than publishing a starting price, because the spread between a modest deck on a 20×20 and an engineered two-story hospitality structure on a 30×30 is enormous. The cost drivers are: footprint and deck coverage, whether the upper level is open or enclosed, stair versus stair-plus-lift, structural system and finish level, AV and lighting, the show city's labour and drayage rates, and rental versus build-to-own. Send us the show, the space and what needs to happen upstairs and you'll have a real number — not a range — quickly.",
  },
  {
    q: "Can you rent a double deck, or do you have to buy one?",
    a: "You can rent. Traction X rents double-deck structures and builds them to own, from the same design conversation. Renting is usually the right first move: the structural system is already engineered, which shortens the permit timeline, and you avoid storage, crate maintenance and refurbishment between shows.",
  },
  {
    q: "What is the minimum booth size for a double deck?",
    a: "A 20×20 island is the practical minimum, and it's tight — the stair consumes ground-floor space that a 400 sq ft booth can't easily spare. 20×30 and 30×30 are where a deck stops compromising the level below. Second levels are effectively never permitted over in-line or peninsula space; you need island space with all four sides open.",
  },
  {
    q: "Do you need an engineer and a permit for a two-story exhibit?",
    a: "Yes, at essentially every major venue. You need structural drawings sealed by an engineer licensed in the show's jurisdiction, submitted to venue technical services and/or the fire marshal — typically 60 to 90 days before move-in — with a plan-review fee and often a floor inspection before the deck can be occupied. Traction X coordinates the engineer, produces and files the package, answers review comments and has a producer on site for the inspection.",
  },
  {
    q: "How long does double-deck approval take?",
    a: "Plan on 60 to 90 days between submission and approval at most major North American venues, which is why our double-deck schedule starts about 20 weeks out. The permit, not the fabrication, is the critical path. Shows inside that window are sometimes still possible with a rental structure whose engineering already exists — call rather than email if that's your situation.",
  },
  {
    q: "How tall is a double deck booth?",
    a: "Commonly 16 to 20 feet to the top of the rail, driven by headroom: roughly 8 feet of clearance below the deck and 7 to 8 feet above, plus the thickness of the deck structure. You need about 20 feet of clear ceiling height in the hall for a deck that doesn't feel compressed, and the show's display rules set the hard maximum.",
  },
  {
    q: "Can the upper level be an enclosed meeting room?",
    a: "Yes, and it's the most common use. Walls, a door, seating for four to eight, a wall-mounted display and acoustic treatment fit comfortably. Enclosing space — upstairs or underneath — can trigger fire suppression or fire-watch requirements from the venue, which we identify at the feasibility stage rather than after your drawings are sealed.",
  },
  {
    q: "How many people can be on the deck at once?",
    a: "The fire marshal assigns a maximum occupancy from the deck area and your egress width, and it has to be posted and enforced during the show. We design to the number you actually need — if you want twenty people upstairs, that requirement shapes the stair count and width from day one rather than being discovered at inspection.",
  },
  {
    q: "What extra costs does the venue charge for a double deck?",
    a: "Beyond our scope, expect: plan-review and permit fees, higher drayage on a substantially heavier shipment, additional electrical for the upper level, rigging if you're hanging signage above it, more install and dismantle hours, and a fire watch where the venue requires one. We estimate all of it and file the forms before you commit, so the total floor cost is visible up front.",
  },
  {
    q: "Does a double deck need to be wheelchair accessible?",
    a: "It depends on what the upper level offers. If it provides a service or experience not available at ground level, an accessible route — a lift — or an equivalent ground-floor version of that experience may be required. We flag it during feasibility because a lift changes both the footprint and the budget, and retrofitting one is not practical.",
  },
];
