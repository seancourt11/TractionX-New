/**
 * Long-form, per-footprint detail for /booth-size/{slug}.
 *
 * Everything here is footprint-specific on purpose — spec numbers, who buys
 * this size, what physically fits, layout strategy and cost drivers. Do not
 * template this copy across sizes; a generic paragraph on four pages is a
 * doorway page.
 */

export type SpecRow = { label: string; value: string };
export type LongSection = { heading: string; body: string[]; bullets?: { lead: string; text: string }[] };

export type BoothSizeDetail = {
  /** Gallery/rental dimension key, e.g. "10x20". */
  dim: string;
  /** One-paragraph extractable answer for the #tldr block and AI answers. */
  shortAnswer: string;
  /** Planner's Brief table. */
  spec: SpecRow[];
  /** Long-form body. */
  sections: LongSection[];
  /** Footprint-specific FAQs, appended to the shared set. */
  faqs: { q: string; a: string }[];
  /** Industry slugs to cross-link from the "who chooses this" section. */
  industrySlugs: string[];
};

/** What every Traction X price includes, stated once. */
export const IN_THE_PRICE =
  "Design · fabrication · graphics · warehouse pre-build with photo approval · freight · supervised install and dismantle · project management — one fixed scope.";

/** Not ours to bill — stated once, so no page implies otherwise. */
export const NOT_IN_THE_PRICE =
  "Drayage/material handling, electrical, rigging labour, internet and cleaning are ordered through the show contractor and billed by them. We file the forms and estimate the cost before you commit.";

/** Shared countdown — the same eight-stage process behind every footprint. */
export const SHOW_COUNTDOWN: { when: string; what: string; detail: string }[] = [
  { when: "T−12 wks", what: "Brief & budget call", detail: "Show, space, objective and budget band. Ten or thirty minutes, your choice." },
  { when: "T−10 wks", what: "3D design approval", detail: "Photoreal renders and floor plan signed off — this locks scope and your fixed price." },
  { when: "T−8 wks", what: "Fabrication begins", detail: "Millwork, metal and structure into production; long-lead AV reserved." },
  { when: "T−4 wks", what: "Graphics files due", detail: "Templates and a prepress check are provided; we fix bleed and resolution issues before print." },
  { when: "T−2–3 wks", what: "Warehouse pre-build", detail: "Your booth stands complete in our shop. You approve photos — or a live walkthrough — before anything ships." },
  { when: "T−10 days", what: "Freight departs", detail: "Timed to your show's advance-warehouse target dates to avoid late fees." },
  { when: "T−1–2 days", what: "Supervised install", detail: "Your producer is on the floor; most booths are show-ready inside the first labour call." },
  { when: "Show close", what: "Dismantle & outbound", detail: "Repacked and out before the forced-freight deadline, then back to storage or your next show." },
];

export const BOOTH_SIZE_DETAIL: Record<string, BoothSizeDetail> = {
  "8x10-booths": {
    dim: "8x10",
    shortAnswer:
      "An 8×10 trade show booth is an 80 square foot in-line space — the smallest standard footprint most North American shows sell, and common on European and Asian floor grids sold in metres (2.4m × 3m). It holds one backwall, a reception counter, one demo or lead-capture station and two staff comfortably. Traction X rents 8×10 booths from $12,350 and builds them to own from $16,500, with install and dismantle labour inside the price.",
    spec: [
      { label: "Footprint", value: "80 sq ft · in-line · one open side (8 ft frontage)" },
      { label: "Metric equivalent", value: "2.4 m × 3 m — the size most non-US organizers quote" },
      { label: "Staffing plan", value: "2 staff at a time; 3 feels crowded and blocks the aisle" },
      { label: "Capacity", value: "3–4 concurrent visitors before conversations start colliding" },
      { label: "What fits", value: "1 backwall · 1 reception counter · 1 monitor or tablet station · locking storage" },
      { label: "Overhead", value: "No hanging sign — most shows restrict rigging over in-line space" },
      { label: "Height limit", value: "8 ft typical in-line maximum; confirm on the show's display rules" },
      { label: "In the price", value: IN_THE_PRICE },
    ],
    sections: [
      {
        heading: "Who chooses an 8×10 trade show booth",
        body: [
          "The 8×10 is a deliberate choice, not a compromise, in three situations: a regional or association show where the whole hall is in-line space, a first appearance at a show you intend to grow into, and a satellite presence at a secondary event while your budget concentrates on one flagship. It is also the default in venues whose floor grid is metric — many European and Asian organizers sell 2.4m × 3m and 3m × 3m stands, and the 8×10 maps directly onto the smaller of the two.",
          "At 80 square feet the booth cannot be a destination, so it has to be a filter. The job is to make the right visitor stop and the wrong one keep walking, then move the qualified conversation somewhere it can continue — a meeting room, a coffee, a calendar invite. Exhibitors who treat the 8×10 as a lead-qualification station outperform exhibitors who try to fit a product showcase into it.",
        ],
        bullets: [
          { lead: "First-time exhibitors", text: "testing a show's audience before committing to a 10×20 or an island the following year." },
          { lead: "Regional and association shows", text: "where the entire hall is in-line and an 8×10 sits level with every competitor." },
          { lead: "Channel and partner programs", text: "exhibiting alongside a distributor's larger stand." },
          { lead: "Recruiting and university programs", text: "where the conversation, not the product, is the exhibit." },
        ],
      },
      {
        heading: "What actually fits in 80 square feet",
        body: [
          "Eight by ten leaves roughly 6 feet of usable depth once the backwall structure and storage are in. That is one clear zone, not several, and every element you add costs you standing room for visitors.",
          "The configuration that works: a backlit 8 ft backwall carrying one message readable from three aisles away, a reception counter angled to open the corner rather than block it, one monitor or tablet at standing height, and lockable storage built into the counter. Anything more — a second monitor, a seating group, a product wall — makes the booth feel full when two visitors are inside, which reads as busy to nobody and cramped to everybody.",
        ],
        bullets: [
          { lead: "Backwall", text: "8 ft backlit tension fabric or SEG-framed graphic. Backlighting is the single highest-return upgrade at this size — it is what makes an in-line read as considered rather than rented." },
          { lead: "Counter", text: "Printed or millwork reception counter with locking storage underneath; doubles as your literature and giveaway surface." },
          { lead: "Demo station", text: "One tablet or monitor at standing height. Seated demos do not work in an in-line — they turn your only staff position into a bottleneck." },
          { lead: "Storage", text: "Inside the counter. There is no room for a closet, so cases ship back to the warehouse or go under-counter." },
        ],
      },
      {
        heading: "Layout strategy for an in-line booth",
        body: [
          "In-line space is seen at an angle, not head-on. Visitors approach from the aisle at roughly 30 degrees, which means the corner of your booth does more work than the centre of your backwall. Push the counter off-centre to open one corner as an entry, and place your hero message on the half of the backwall that faces oncoming traffic in the busier direction — usually toward the hall entrance or the nearest food and coffee service.",
          "Height is your other lever. Most shows cap in-line displays at 8 feet with a rear setback rule for anything taller, so vertical brand presence comes from lighting and contrast rather than structure. A backlit wall at full brightness reads from further down the aisle than a taller unlit one.",
          "Finally, leave the floor clear. The most common 8×10 mistake is filling the footprint with furniture until there is nowhere for a visitor to stand inside the space. A visitor standing inside your booth is not walking past a competitor's.",
        ],
      },
      {
        heading: "Rent or buy an 8×10",
        body: [
          "At this size the arithmetic is straightforward. Renting from $12,350 covers a fully custom-configured booth for the show, including install and dismantle. Buying the same design from $16,500 makes sense at roughly three shows a year or more, once you factor storage, refurbishment and graphics reprints between events.",
          "The pattern we see most: rent for the first year while the show calendar is still moving, buy once two or three annual events are locked. Because our rental and purchase catalogues are the same designs, the booth you rented in year one can be built to own in year two without redesigning anything.",
        ],
      },
      {
        heading: "What moves the price on an 8×10",
        body: [
          "The base configuration covers structure, graphics, counter, lighting, carpet, freight and I&D. Costs move from there for reasons you can control:",
        ],
        bullets: [
          { lead: "Backlighting", text: "A backlit fabric wall costs more than a front-lit graphic and is almost always worth it at this size." },
          { lead: "Millwork vs. fabric", text: "Real millwork counters and feature panels raise the finish level and the price; tension fabric keeps both lower." },
          { lead: "Show city", text: "Labour rates and drayage vary widely by venue and jurisdiction — Las Vegas, Chicago and New York carry the highest floor costs in North America." },
          { lead: "Timeline", text: "Inside 30 days to show, rush fabrication and expedited freight add to the total. Twelve weeks out costs the least." },
          { lead: "Graphics reprints", text: "New messaging each show is a per-event graphics cost, not a new booth." },
        ],
      },
    ],
    faqs: [
      { q: "How many staff should work an 8×10 booth?", a: "Two at a time. A third person inside 80 square feet blocks the entry and makes the booth look closed to approaching visitors — rotate staff rather than stacking them." },
      { q: "Can I have a hanging sign above an 8×10?", a: "Almost never. Most shows restrict overhead rigging to island space, and in-line booths are capped at 8 feet with a rear setback for anything taller. We confirm the display rules for your specific show before design." },
      { q: "What is an 8×10 booth in metres?", a: "2.4 m × 3 m, or about 7.4 square metres. If your organizer sold you a 3m × 3m stand, that is closer to a 10×10 — we design to the metric dimension and confirm the aisle lines on the floor plan." },
    ],
    industrySlugs: [],
  },

  "10x10-booths": {
    dim: "10x10",
    shortAnswer:
      "A 10×10 trade show booth is a 100 square foot in-line space and the most common footprint on North American show floors. It holds a 10 ft backwall, a reception counter, product shelving or a demo monitor, and two to three staff. Traction X rents 10×10 booths from $16,250 and builds them to own from $22,000, with install and dismantle labour inside the price.",
    spec: [
      { label: "Footprint", value: "100 sq ft · in-line or corner · 10 ft frontage" },
      { label: "Metric equivalent", value: "3 m × 3 m — the standard European and Asian shell scheme size" },
      { label: "Staffing plan", value: "2–3 staff working comfortably" },
      { label: "Capacity", value: "4–6 concurrent visitors" },
      { label: "What fits", value: "10 ft backwall · counter · shelving or plinth · 1–2 demo stations · seated corner or storage (pick one)" },
      { label: "Overhead", value: "No hanging sign on in-line space; a corner booth gains a second open side instead" },
      { label: "Height limit", value: "8 ft typical, with a 4 ft height limit in the front half at many shows" },
      { label: "In the price", value: IN_THE_PRICE },
    ],
    sections: [
      {
        heading: "Who chooses a 10×10 trade show booth",
        body: [
          "The 10×10 is the working footprint of the trade show industry. It is what most exhibitors buy at most shows, which cuts both ways: the price of entry is low, and so is the differentiation, because you are standing in a row of identical spaces with identical dimensions. Everything that makes a 10×10 work is design, lighting and staffing — not square footage.",
          "It is the right choice for companies running a multi-show calendar where breadth beats depth: eight regional shows at 10×10 will out-produce one island for many mid-market B2B products, especially where the sale is relationship-led and the show's value is meetings booked rather than crowds attracted.",
        ],
        bullets: [
          { lead: "Mid-market B2B", text: "running six to twelve shows a year across regions rather than one flagship." },
          { lead: "Professional services", text: "where the exhibit hosts conversations and the booth's job is credibility." },
          { lead: "Component and industrial suppliers", text: "showing a physical part or sample rather than a large machine." },
          { lead: "Growth-stage technology", text: "at vertical conferences, before a flagship show justifies an island." },
        ],
      },
      {
        heading: "What actually fits in 100 square feet",
        body: [
          "A hundred square feet gives you about 7 feet of usable depth and one important choice: seating or storage. You can have a two-stool meeting corner, or a locking closet — attempting both leaves no room for visitors.",
          "The strongest 10×10 configuration we build pairs a full-width backlit hero wall with an angled counter, LED-lit shelving or a single product plinth, and one standing demo position. Where the client needs privacy more than product display, the shelving becomes a two-seat corner with a cocktail table and the counter shrinks to a podium.",
        ],
        bullets: [
          { lead: "Hero wall", text: "10 ft backlit tension fabric or a millwork feature wall. One message, product-level not company-level." },
          { lead: "Counter", text: "Reception or demo counter with locking storage; angled to open a corner entry." },
          { lead: "Product display", text: "LED-lit shelving, an illuminated plinth, or a wall-mounted sample board." },
          { lead: "Demo", text: "One monitor or tablet at standing height, positioned so a demo does not block the entry." },
          { lead: "Choose one", text: "Two meeting stools and a cocktail table, or a locking storage closet." },
        ],
      },
      {
        heading: "Corner booths change the math",
        body: [
          "If you can buy a corner 10×10, buy it. Two open sides roughly doubles the number of visitors who see into the space rather than past it, and it lets you place the counter on the diagonal so the booth reads as open from both aisles. Organizers usually charge a premium of a few hundred dollars for corner space — it is the cheapest traffic increase available to a small-footprint exhibitor.",
          "Design changes with the corner: the backwall carries the message, the side becomes the entry, and the counter moves off the corner rather than onto it. We design corner and standard in-line versions of the same booth so you are not redesigning if your space assignment changes.",
        ],
      },
      {
        heading: "Rent or buy a 10×10",
        body: [
          "Renting from $16,250 puts a fully custom-configured 10×10 on the floor with install and dismantle included. Buying the same design from $22,000 pays back at roughly three to four shows a year, allowing for storage, refurbishment and per-show graphics.",
          "Because we run one catalogue for both, the decision does not have to be made at design time. Exhibitors regularly rent the same design twice, then buy it in year two when the show calendar firms up — the third build is the one that pays for itself.",
        ],
      },
      {
        heading: "What moves the price on a 10×10",
        body: [
          "Base pricing covers structure, graphics, counter, lighting, carpet, freight and supervised I&D. From there:",
        ],
        bullets: [
          { lead: "Millwork content", text: "Real millwork walls, counters and finishes carry the largest single price swing at this size." },
          { lead: "Backlighting and lighting", text: "Backlit fabric and directional product lighting add cost and are the most visible upgrades on the floor." },
          { lead: "AV", text: "A 55-inch display and mount is modest; touchscreen configurators and lead-capture software are not." },
          { lead: "Show city and jurisdiction", text: "Union labour rules and drayage rates vary by venue; we quote the floor cost with the booth so the total is visible up front." },
          { lead: "Rush", text: "Inside 30 days, fabrication and freight are expedited and priced accordingly." },
        ],
      },
    ],
    faqs: [
      { q: "How much does a 10×10 trade show booth cost?", a: "Traction X 10×10 rentals start at $16,250 and purchases at $22,000, both including design, fabrication, graphics, warehouse pre-build, freight and supervised install and dismantle. Show-floor services ordered from the general contractor — drayage, electrical, rigging — are billed by them and estimated for you before you commit." },
      { q: "Is a corner 10×10 worth the upcharge?", a: "Yes, in almost every case. A second open side materially increases how many attendees can see into the booth, and the organizer premium is typically a few hundred dollars — the cheapest traffic you can buy at this footprint." },
      { q: "Can a 10×10 booth expand to a 10×20 later?", a: "Ours can. We build in-line booths so the backwall system and counters carry forward, and the second 10 feet is added as a new module rather than a new booth." },
    ],
    industrySlugs: [],
  },

  "10x20-booths": {
    dim: "10x20",
    shortAnswer:
      "A 10×20 trade show booth is a 200 square foot in-line or endcap space — twice the frontage of a 10×10 and the first footprint that supports separate zones. It holds a 20 ft hero wall, a demo counter, a seated meeting area and a locking storage closet, and works with four to six staff. Traction X rents 10×20 booths from $22,750 and builds them to own from $32,000, with install and dismantle labour inside the price.",
    spec: [
      { label: "Footprint", value: "200 sq ft · in-line, endcap or peninsula · 20 ft frontage" },
      { label: "Metric equivalent", value: "3 m × 6 m — roughly 18.6 square metres" },
      { label: "Staffing plan", value: "4–6 staff working comfortably at peak traffic" },
      { label: "Capacity", value: "8–12 concurrent visitors without crowding" },
      { label: "What fits", value: "20 ft hero wall · 2 demo stations · seated meeting nook (2–4) · reception counter · locking storage closet" },
      { label: "Overhead", value: "No hanging sign on in-line space; endcap and peninsula assignments sometimes allow it — we confirm per show" },
      { label: "Height limit", value: "8 ft in-line typical; 12–16 ft where the space is sold as a peninsula" },
      { label: "In the price", value: IN_THE_PRICE },
    ],
    sections: [
      {
        heading: "Who chooses a 10×20 trade show booth",
        body: [
          "The 10×20 is the step where a booth stops being a display and starts being a workspace. Two hundred square feet is the first footprint that can run two activities at once — a demo out front and a seated conversation behind it — without the two interfering. For most B2B exhibitors it is the point at which show ROI becomes measurable in booked meetings rather than badge scans.",
          "It is chosen by companies whose sales cycle needs a private-ish conversation on the floor, by exhibitors with a product that needs to be seen working, and by teams big enough that four to six people are on site and need somewhere to stand that is not the aisle.",
        ],
        bullets: [
          { lead: "Enterprise software and SaaS", text: "running scheduled demos alongside walk-up traffic at vertical conferences." },
          { lead: "Medical device and diagnostics", text: "where equipment demonstration and a quiet clinical conversation happen side by side." },
          { lead: "Manufacturing and industrial", text: "with a physical product that needs floor space and a spec conversation." },
          { lead: "Financial and professional services", text: "using the seated area as the actual product." },
        ],
      },
      {
        heading: "What actually fits in 200 square feet",
        body: [
          "Twenty feet of frontage divides naturally into three bands of roughly seven feet: an open front third for approach and demo, a middle third for the counter and product, and a rear third for meeting and storage. That division is the whole design problem — everything else is finish level.",
          "A 10×20 is also the first size where a locking storage closet stops being a luxury. Six staff generate coats, cases, giveaways and lunch, and a booth with nowhere to put them looks like a stockroom by day two.",
        ],
        bullets: [
          { lead: "20 ft hero wall", text: "Full-length backlit graphic, usually split into a brand statement and a product proof panel." },
          { lead: "Two demo stations", text: "Separate monitors or product positions so two conversations run without cross-talk." },
          { lead: "Meeting nook", text: "Two to four seats with a cocktail table, set back from the aisle with a half-wall or product wall for acoustic separation." },
          { lead: "Reception counter", text: "Front-of-booth greeting and lead-capture position with locking storage." },
          { lead: "Storage closet", text: "A real closet with a door, coat hooks and shelving — roughly 4×4 ft out of the rear corner." },
        ],
      },
      {
        heading: "Layout strategies for a 10×20",
        body: [
          "Three layouts cover most 10×20 projects, and the choice should follow your sales process rather than a floor-plan aesthetic.",
          "The split layout puts demo on one half and meeting on the other, divided by a central product wall. It is the most flexible and the easiest to staff. The funnel layout runs front-to-back — hero message and greeting at the aisle, demo in the middle, seated conversation at the rear — and works best where the sale is consultative and the goal is to move people deeper into the space. The open-plan layout keeps the whole footprint clear with a perimeter of product and a single central counter; it maximises throughput at high-traffic consumer-facing shows and sacrifices privacy entirely.",
          "If your space is sold as an endcap or peninsula, treat it as an island with a back wall: two or three open sides means the hero graphic works harder and the counter should move off the corners.",
        ],
      },
      {
        heading: "Rent or buy a 10×20",
        body: [
          "Renting from $22,750 covers a fully custom-configured 10×20 with install and dismantle. Buying from $32,000 typically pays back at three or more shows a year once storage and refurbishment are counted, and sooner if your graphics stay stable between events.",
          "The wrinkle at this size is variation: many 10×20 exhibitors also work 10×10 spaces at smaller shows. We design the 10×20 so the front half stands alone as a 10×10, which means one purchase covers both footprints and the smaller show costs you a graphics swap rather than a second booth.",
        ],
      },
      {
        heading: "What moves the price on a 10×20",
        body: [
          "Base pricing covers structure, graphics, counters, lighting, carpet, freight and supervised install and dismantle. The levers:",
        ],
        bullets: [
          { lead: "Enclosed storage", text: "A built closet with a locking door costs more than a curtained corner and is worth it above four staff." },
          { lead: "AV scale", text: "One 65-inch display is modest; a 2×2 video wall, touchscreens and a lead-capture stack are a meaningful line item." },
          { lead: "Millwork and finish", text: "Real veneer, solid surface and custom paint carry a premium over laminate and fabric." },
          { lead: "Peninsula upgrades", text: "If your space has more than one open side, expect additional graphics and finished returns — no unfinished back panels facing an aisle." },
          { lead: "Show city and timeline", text: "Labour jurisdiction, drayage rates and how far out you start all move the total; twelve weeks out is the cheapest version of any project." },
        ],
      },
    ],
    faqs: [
      { q: "How many staff can work a 10×20 booth?", a: "Four to six comfortably at peak traffic, with two conversations running in parallel — one at the demo stations, one seated in the meeting nook. Above six the booth reads as staffed rather than busy, which discourages approach." },
      { q: "Can a 10×20 booth have a private meeting room?", a: "Semi-private, yes — a half-walled, acoustically treated nook set behind a product wall. A fully enclosed, ceilinged room needs a 20×20 or larger; at 200 square feet an enclosed room consumes the space the rest of the booth needs." },
      { q: "What is a 10×20 booth in metres?", a: "3 m × 6 m, about 18.6 square metres. Organizers selling metric space often offer 3m × 6m directly, and our 10×20 designs adapt to that dimension without redesign." },
    ],
    industrySlugs: [],
  },

  "20x20-booths": {
    dim: "20x20",
    shortAnswer:
      "A 20×20 trade show booth is a 400 square foot island with four open sides — the smallest footprint that supports an overhead hanging sign, an enclosed meeting room and a real hospitality zone at the same time. It works with six to ten staff and 15 to 20 concurrent visitors. Traction X rents 20×20 islands from $39,000 and builds them to own from $60,000, with install and dismantle labour inside the price.",
    spec: [
      { label: "Footprint", value: "400 sq ft · island · 4 open sides" },
      { label: "Metric equivalent", value: "6 m × 6 m — roughly 37 square metres" },
      { label: "Staffing plan", value: "6–10 staff working comfortably at peak traffic" },
      { label: "Capacity", value: "15–20 concurrent visitors without feeling crowded" },
      { label: "What fits", value: "Hanging sign · 2–4 demo stations · 1 enclosed or semi-private meeting room · hospitality counter · product plinths · storage" },
      { label: "Overhead", value: "Hanging sign supported and effectively expected; rigging ordered and supervised by your producer" },
      { label: "Height limit", value: "16–20 ft typical for island space; confirmed against the show's display rules at design stage" },
      { label: "In the price", value: IN_THE_PRICE },
    ],
    sections: [
      {
        heading: "Who chooses a 20×20 island",
        body: [
          "Four hundred square feet is the threshold at which a booth becomes a venue. It is the smallest island most shows sell, and the first footprint where the exhibit can host a scheduled programme — meetings on the calendar, demos on a rotation, hospitality between them — rather than react to whoever walks up.",
          "Companies at this size are usually defending or claiming a category position at one or two flagship shows a year. The exhibit budget stops being a marketing line item and starts being measured against pipeline: at 20×20, a show week that produces twenty senior meetings pays for the booth several times over in most B2B categories.",
        ],
        bullets: [
          { lead: "Enterprise technology and cybersecurity", text: "anchoring a vertical flagship with concurrent demos and executive briefings." },
          { lead: "Medical device and pharmaceutical", text: "separating clinical evidence conversations from general floor traffic." },
          { lead: "Industrial and automation", text: "running working equipment alongside a spec-level meeting space." },
          { lead: "Defence and aerospace", text: "where controlled, semi-private conversation space is a requirement, not a preference." },
        ],
      },
      {
        heading: "What actually fits in 400 square feet",
        body: [
          "The island format changes the design problem completely. There is no back wall to carry your message, so identity moves overhead and to the vertical elements inside the footprint — a hanging sign, a central tower, or an enclosed room whose exterior walls become your graphic surface.",
          "A 20×20 that tries to be open on all four sides with nothing in the middle looks empty from the aisle. The strongest islands at this size build mass in the centre and keep the corners open for entry.",
        ],
        bullets: [
          { lead: "Overhead hanging sign", text: "Double-sided or four-sided, at 16–20 ft. This is what makes the booth findable from across the hall and is effectively mandatory on island space." },
          { lead: "Enclosed or semi-private meeting room", text: "Roughly 8×10 with seating for four to six, a wall-mounted display and acoustic treatment. Its outer walls carry brand graphics." },
          { lead: "Two to four demo stations", text: "Each with a monitor, counter and staff position, spaced so simultaneous demos do not compete." },
          { lead: "Hospitality counter", text: "Bar-height with LED lighting and locking storage — coffee or a drink is the reason a qualified visitor stays past the demo." },
          { lead: "Product plinths", text: "Illuminated plinths at the open corners, pulling traffic in from the aisle rather than blocking it." },
          { lead: "Storage", text: "Built into the meeting room footprint or the hospitality counter; 400 sq ft with six-plus staff needs a real closet." },
        ],
      },
      {
        heading: "Layout strategies for a 20×20",
        body: [
          "Centre-mass is the default: an enclosed meeting room or a central tower sits in the middle of the footprint, demo stations and plinths line the perimeter, and all four corners stay open as entries. It gives you brand height, privacy and open access at once, and it is the layout most 20×20 clients end up with.",
          "Quadrant layout divides the footprint into four functional zones — demo, hospitality, meeting, product — each addressing one aisle. It suits exhibitors whose visitors come from clearly different directions or with clearly different needs, and it staffs cleanly with one lead per quadrant.",
          "Open theatre trades the meeting room for a presentation area with eight to ten seats and a large display, and works where the show's value is audience rather than one-to-one conversation. Scheduled 10-minute presentations every 20–30 minutes will reliably out-draw an unstructured booth at a busy conference.",
          "Whichever you choose, sightlines matter more here than at any smaller size. A visitor standing in any aisle should be able to see through at least one open corner into activity — an island that reads as a solid block from three sides is a 20×20 performing like a 10×20.",
        ],
      },
      {
        heading: "Rent or buy a 20×20 island",
        body: [
          "Renting from $39,000 covers a fully custom-configured island with design, fabrication, graphics, freight and supervised install and dismantle. Buying the same design from $60,000 changes the calculation more than at smaller sizes, because island exhibits also carry storage, refurbishment, crate maintenance and a heavier freight profile between shows.",
          "The honest rule: below three island shows a year, rent. At three or more with a stable design, buy — and plan on a graphics refresh every cycle and a structural refurbishment every two to three years. Exhibitors running one flagship island plus several smaller in-line shows are usually best served buying the in-line kit and renting the island.",
        ],
      },
      {
        heading: "What moves the price on a 20×20",
        body: [
          "Base pricing covers structure, graphics, counters, lighting, carpet, freight and supervised install and dismantle. At island scale, four things drive the spread:",
        ],
        bullets: [
          { lead: "Overhead structure", text: "A simple printed hanging sign versus a shaped, backlit or truss-mounted structure is one of the largest single line items — and rigging labour is ordered from the venue on top." },
          { lead: "Enclosed room construction", text: "A ceilinged, acoustically treated room with a lockable door costs substantially more than a half-wall nook." },
          { lead: "AV and interactive", text: "LED video walls, touchscreen configurators and presentation audio scale quickly at this size; a 2×2 wall and a theatre display are different orders of magnitude." },
          { lead: "Millwork and finish level", text: "Solid surface, veneer, custom paint and detailed lighting integration separate a strong island from an adequate one." },
          { lead: "Show city, rigging and labour", text: "Island space carries rigging, electrical and higher drayage, all billed by the show contractor. We estimate and file them so the full floor cost is visible before you sign." },
        ],
      },
    ],
    faqs: [
      { q: "Do I need a hanging sign on a 20×20 island?", a: "Practically, yes. On island space with no back wall, the overhead sign is what makes the booth locatable from across a large hall. It also has to be ordered through venue rigging, which your Traction X producer arranges and supervises — rigging labour is billed by the show contractor." },
      { q: "Can a 20×20 booth have a fully enclosed meeting room?", a: "Yes. Roughly 8×10 with seating for four to six, a wall display and acoustic treatment fits comfortably and still leaves room for demos and hospitality. Some shows restrict ceilinged structures or require a fire-marshal review — we check that during design." },
      { q: "How many leads should a 20×20 generate?", a: "It depends entirely on the show and how the booth is staffed and programmed, so we won't quote a number we can't stand behind. What we will do is design the footprint around your target — number of scheduled meetings, demo throughput per hour, and hospitality dwell time — and tell you honestly if the space and staffing plan support it." },
      { q: "What is a 20×20 booth in metres?", a: "6 m × 6 m, about 37 square metres. Many international organizers sell 6m × 6m island space directly, and our 20×20 designs map onto it without redesign." },
    ],
    industrySlugs: [],
  },
};

/** Shared FAQs that apply to every footprint. Kept in step with the promise page. */
export const SHARED_SIZE_FAQS = [
  { q: "Do you rent or sell?", a: "Both, from the same catalogue. Every design can be rented for a show or built to own, quoted side by side on the same brief so you can compare the real numbers rather than guess." },
  { q: "Is install and dismantle included?", a: "Yes. Install and dismantle labour is inside every booth price we publish, along with design, fabrication, graphics, warehouse pre-build and freight. Drayage, electrical, rigging, internet and cleaning are ordered from the show contractor and billed by them — we file the forms and estimate the cost before you commit." },
  { q: "How fast can it ship?", a: "Twelve weeks is the comfortable timeline and the cheapest version of any project. Six to ten weeks is standard. We have turned booths around in under four weeks when catalogue inventory and a fabrication slot allow — call rather than email if your show is inside 30 days." },
  { q: "Will I see the booth before it ships?", a: "Yes. Every booth is assembled in our shop two to three weeks before the show and you approve photographs — or a live walkthrough — before anything is crated. Problems get solved on our floor instead of on move-in morning." },
];
