export type GlossaryTerm = {
  term: string;
  slug: string;
  letter: string;
  category: "Logistics" | "Structure" | "Show services" | "Graphics" | "Commercial";
  definition: string;
  detail?: string;
};

const t = (
  term: string,
  category: GlossaryTerm["category"],
  definition: string,
  detail?: string,
): GlossaryTerm => ({
  term,
  slug: term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  letter: term[0].toUpperCase(),
  category,
  definition,
  detail,
});

export const GLOSSARY: GlossaryTerm[] = [
  t("Advance warehouse", "Logistics", "A general contractor's off-site warehouse that receives your freight in the weeks before a show and delivers it to your booth space on move-in day.", "Shipping to the advance warehouse is usually safer and cheaper than direct-to-show, because your crates are already in the building queue rather than sitting in a marshalling yard."),
  t("Aisle carpet", "Show services", "The carpet the show organiser lays in the walkways between booths. It is not your booth carpet — flooring inside your space is your responsibility unless the package says otherwise."),
  t("ATA carnet", "Logistics", "An international customs document that lets exhibit materials enter a foreign country temporarily without paying duty, provided everything leaves again.", "Essential for European and Asian shows. Mis-declared carnet items are one of the most common causes of freight being held at the border."),
  t("Backwall", "Structure", "The rear wall of an in-line booth, typically 8ft or 10ft high, carrying your primary graphic message."),
  t("Booth package", "Commercial", "What the organiser includes with your space rental — usually pipe and drape, a sign and sometimes carpet. Almost never includes electrical, internet, furniture or labour."),
  t("Bone yard", "Logistics", "The area of the show floor where empty crates are stored during the show. Access is controlled and retrieval on teardown night takes hours."),
  t("CAD drawings", "Structure", "Scaled technical drawings of the booth used for fabrication, venue approval and rigging permits."),
  t("Carpet padding", "Show services", "Foam underlay beneath booth flooring. Ordered separately from carpet and worth every dollar for staff who stand for eight hours."),
  t("Ceiling height limit", "Structure", "The maximum build height permitted in your space, set by the show's display rules. Commonly 8ft for in-line, 16–20ft+ for islands."),
  t("Corner booth", "Structure", "An in-line booth exposed to aisles on two sides. Usually costs more and converts better than a standard in-line."),
  t("Crate", "Logistics", "The reusable wooden shipping container your exhibit travels in. Crate weight counts toward drayage, which is why weight-optimised crating matters."),
  t("Dead load", "Structure", "The static weight a rigging point or structure must carry — hanging signs, lighting, ceiling elements. Venues require certified dead-load calculations."),
  t("Double-deck", "Structure", "A two-storey exhibit. Requires engineered drawings, venue approval, a permit and usually a substantially larger footprint."),
  t("Drayage", "Show services", "The venue or general contractor charge for moving your freight from the loading dock to your booth space and back, plus empty crate storage during the show.", "Billed by hundredweight (CWT) on actual crated weight with a minimum, not as a flat fee. It is frequently the single largest surprise line on a show bill."),
  t("Electrical drop", "Show services", "The power feed brought to your booth. Must be ordered in advance with a floor plan showing exactly where each drop lands — under carpet, before install."),
  t("Empty sticker", "Logistics", "The label placed on crates so show labour can move them to the bone yard once unpacked. No sticker means the crate stays in your booth."),
  t("EAC", "Show services", "Exhibitor Appointed Contractor — a non-official contractor you bring in to install your booth. Requires advance notification and certificates of insurance."),
  t("Exhibitor manual", "Commercial", "The organiser's rulebook and order forms for a show: deadlines, display regulations, service order forms and shipping addresses. Read it the week you book."),
  t("Fascia", "Structure", "A horizontal band across the top of a booth structure, typically carrying the company name."),
  t("Freight forwarder", "Logistics", "The company that moves your crated exhibit between your shop, the warehouse and the venue — distinct from drayage, which happens inside the venue."),
  t("General contractor", "Show services", "The organiser's official service provider (Freeman, GES and similar) handling drayage, labour, furniture and utilities for the whole show."),
  t("Hanging sign", "Structure", "A suspended overhead sign above an island booth. Requires rigging labour, dead-load certification and advance approval; usually restricted to islands."),
  t("Hardwall", "Structure", "Solid panel booth construction, as opposed to fabric. Delivers a cleaner, more premium finish and supports mounted shelving and monitors."),
  t("Header", "Structure", "The upper branded element of a display, above eye level, designed to be legible from across the hall."),
  t("I&D", "Show services", "Install and Dismantle — the labour of building your booth before the show and taking it down after. Billed hourly, at overtime rates outside standard windows."),
  t("In-line booth", "Structure", "A booth in a row with neighbours on both sides and one open aisle side. Typically 10×10 or 10×20."),
  t("Island booth", "Structure", "A booth with aisles on all four sides, usually 20×20 or larger. Allows taller structures, hanging signs and 360-degree design."),
  t("Lead retrieval", "Commercial", "The organiser's badge-scanning system for capturing attendee contact details. Rented per unit, per show; order early."),
  t("Lightbox", "Graphics", "A backlit fabric graphic frame. The highest-impact graphic format per dollar on a show floor."),
  t("Marshalling yard", "Logistics", "The off-site staging lot where trucks wait for a dock slot on move-in day. Direct-to-show freight often sits here for hours."),
  t("Material handling", "Show services", "The formal name for drayage. If you see 'material handling' on a service kit, it is the same charge."),
  t("Move-in / move-out", "Logistics", "The scheduled windows for building and dismantling booths. Missing your target window means paying overtime or losing your slot."),
  t("Peninsula booth", "Structure", "A booth with aisles on three sides, backing onto another booth. Between an in-line and an island in both visibility and cost."),
  t("Pipe and drape", "Structure", "The basic fabric-and-pole divider the organiser provides between in-line booths. Functional, not attractive — cover it."),
  t("Pop-up display", "Structure", "A collapsible portable frame with a fabric or panel graphic. Sets up in minutes without tools; suited to tabletop and 10×10 spaces."),
  t("Rigging", "Show services", "The venue-controlled work of suspending anything from the ceiling. Union-controlled almost everywhere, requires certified drawings and advance orders."),
  t("Show services", "Commercial", "The catch-all for everything the venue and general contractor charge on top of your booth: drayage, electrical, rigging, cleaning, internet, furniture and labour. Budget 30–60% of booth cost."),
  t("Target move-in", "Logistics", "An assigned time slot for your freight to arrive at the dock. Shows with target dates penalise early and late arrivals."),
  t("Tension fabric", "Graphics", "A dye-sublimated stretch graphic pulled over an aluminium frame. Lightweight, seamless, washable and the backbone of modern modular exhibits."),
  t("Truss", "Structure", "Modular metal framework used for overhead structures, lighting rigs and hanging signs."),
  t("Union jurisdiction", "Show services", "A venue or city where specific trades — electrical, rigging, carpentry, freight — must be performed by union labour. Chicago, New York, Las Vegas, San Francisco and Toronto have the strictest rules."),
  t("Vinyl graphic", "Graphics", "Printed adhesive film applied to panels, walls or floors. Durable and precise, but heavier and less reusable than fabric."),
  t("Wayfinding", "Graphics", "Signage and floor-plan design that helps attendees navigate a hall or a large booth to the right destination."),
  t("Wide-format printing", "Graphics", "Large-scale printing used for booth graphics, backwalls, banners and floor decals."),
];

export const GLOSSARY_LETTERS = Array.from(new Set(GLOSSARY.map((g) => g.letter))).sort();
