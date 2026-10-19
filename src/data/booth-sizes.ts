export type BoothSizeEntry = {
  slug: string;
  label: string;
  category: "size" | "type";
  short: string;
  hero: { title: string; accent?: string; intro: string };
  bullets: { title: string; body: string }[];
  /** Rental starting-from price. */
  starting?: string;
  /** Purchase starting-from price for the same booth design. */
  purchaseFrom?: string;
  /** Matching filter value on /gallery (e.g. "10x10"). */
  gallerySize?: string;
  seo: { title: string; description: string };
};

/** Purchase starting points, kept in step with PRICING_TIERS in pricing-tiers.ts. */
const PURCHASE_FROM: Record<string, string> = {
  "8×10": "$16,500",
  "10×10": "$22,000",
  "10×20": "$32,000",
  "20×20": "$60,000",
};

const size = (slug: string, label: string, dim: string, priceFrom: string, intro: string, bullets: BoothSizeEntry["bullets"]): BoothSizeEntry => ({
  slug,
  label,
  category: "size",
  short: `${dim} booths from ${priceFrom} to rent or ${PURCHASE_FROM[dim] ?? priceFrom} to buy.`,
  starting: priceFrom,
  purchaseFrom: PURCHASE_FROM[dim],
  gallerySize: dim.replace("×", "x"),
  hero: { title: `${dim} Trade Show`, accent: "Booths", intro },
  bullets,
  seo: {
    title: `${dim} Trade Show Booths — Rent or Buy from ${priceFrom} | Traction X`,
    description: `${dim} trade show booths from ${priceFrom} to rent and ${PURCHASE_FROM[dim] ?? priceFrom} to buy — the same custom designs either way, with graphics, AV and lighting. Delivered and installed globally.`,
  },
});


const type_ = (slug: string, label: string, intro: string, bullets: BoothSizeEntry["bullets"]): BoothSizeEntry => ({
  slug,
  label,
  category: "type",
  short: intro.slice(0, 140),
  hero: { title: label.split(" ")[0], accent: label.split(" ").slice(1).join(" "), intro },
  bullets,
  seo: {
    title: `${label} for Trade Shows | Traction X`,
    description: `${label} for trade shows and events — rental and custom options, printed to your brand, shipped and installed globally.`,
  },
});

export const BOOTH_SIZES: BoothSizeEntry[] = [
  size("8x10-booths", "8×10 Booths", "8×10", "$12,350", "Compact in-line trade show booths in an 8ft × 10ft footprint. Backlit graphics, reception counter, tablet or monitor mount and storage — sized for regional shows and constrained floor grids.", [
    { title: "8ft backwall", body: "Tension-fabric backlit graphic or SEG-framed hero image." },
    { title: "Reception counter", body: "Printed graphic wrap with locking storage." },
    { title: "Monitor / tablet mount", body: "Product demo or lead-capture station." },
    { title: "Carpet & lighting", body: "Show-floor carpet and arm lights included." },
  ]),
  size("10x10-booths", "10×10 Booths", "10×10", "$16,250", "The workhorse trade show footprint. 10×10 in-lines with backlit hero graphics, reception counter, product shelving, monitor mount and lockable storage — rental or custom.", [
    { title: "10ft backwall", body: "Backlit tension fabric or millwork feature wall." },
    { title: "Reception counter", body: "Printed graphic or millwork, locking storage." },
    { title: "Shelving & product display", body: "LED-lit shelving and product plinths." },
    { title: "Meeting stools", body: "One meeting stool and cocktail table included." },
  ]),
  size("10x20-booths", "10×20 Booths", "10×20", "$22,750", "Endcap or in-line 10ft × 20ft booths — hero graphic wall, integrated demo counter, meeting nook and private storage. Big-brand presence at a modular price.", [
    { title: "20ft hero wall", body: "Full-length backlit graphic with brand messaging and hero product moment." },
    { title: "Demo counter", body: "Integrated demo station with tablet or product mount." },
    { title: "Meeting nook", body: "Two-to-four seat meeting area with cocktail table." },
    { title: "Private storage", body: "Locking storage closet with coat hooks and shelving." },
  ]),
  size("20x20-booths", "20×20 Booths", "20×20", "$39,000", "Four-side island booths — central hanging structure, hospitality counter, hero product plinths and private meeting nook. The standard for serious exhibitor presence.", [
    { title: "Hanging structure", body: "Overhead branded structure — printed fabric, backlit or open frame." },
    { title: "Hospitality counter", body: "Bar-height hospitality counter with LED lighting and locking storage." },
    { title: "Hero product plinths", body: "Two or more product plinths with directional lighting." },
    { title: "Private meeting nook", body: "Semi-private seated meeting area with acoustic separation." },
  ]),
  type_("accessories", "Trade Show Booth Accessories", "Everything that makes a booth work — carpet, arm lights, monitor mounts, iPad kiosks, meeting stools, hooks and hardware.", [
    { title: "Carpet & padding", body: "Standard show-floor carpet and comfort padding." },
    { title: "Arm & spot lights", body: "Directional lights for hero product and graphics." },
    { title: "Monitor & tablet mounts", body: "Wall, counter and kiosk mounts for demos." },
    { title: "Meeting furniture", body: "Stools, cocktail tables, lounge chairs and ottomans." },
  ]),
  type_("counters", "Trade Show Counters & Reception Desks", "Printed and millwork counters — reception, hospitality bar, demo station and lockable storage podium.", [
    { title: "Printed graphic counters", body: "Portable pop-up counters with printed graphic wrap." },
    { title: "Millwork counters", body: "Real millwork reception desks with brand-matched finishes." },
    { title: "Hospitality bars", body: "Bar-height counters with LED lighting and glass shelving." },
    { title: "Locking storage podium", body: "Podium counters with locking storage and cable pass-through." },
  ]),
  type_("banner-stands", "Retractable Banner Stands", "Single, double and premium wide-format retractable banner stands with printed cassettes — swap graphics per event.", [
    { title: "Standard retractable", body: "33″ × 80″ retractable banner with printed cassette." },
    { title: "Premium wide", body: "48″ × 80″ wide retractable for hero messaging." },
    { title: "Double-sided", body: "Print on both sides — high-traffic aisle placement." },
    { title: "Backwall banner walls", body: "Three-panel retractable wall for an 8ft backwall in a bag." },
  ]),
  type_("hanging-banners", "Hanging Banners & Overhead Structures", "Printed hanging signs — square, round, triangle, and shaped truss — for above-booth brand visibility.", [
    { title: "Round & square banners", body: "Printed tension-fabric hanging signs with rigging kit." },
    { title: "Triangular structures", body: "Three-sided rotating overhead structures for four-side visibility." },
    { title: "Shaped truss", body: "Custom truss + fabric skin for logo-shaped overhead structures." },
    { title: "Rigging coordination", body: "Rigging plan and venue rigging labor coordinated with show services." },
  ]),
  type_("literature-stands", "Literature Stands & Product Display", "Brochure holders, tablet kiosks and product shelving for lead capture and product education.", [
    { title: "Brochure holders", body: "Countertop and floor-standing literature stands with printed graphic wrap." },
    { title: "Tablet kiosks", body: "Locking tablet kiosks for lead capture and product configurators." },
    { title: "Product shelving", body: "LED-lit acrylic shelving for product display and merchandising." },
    { title: "Sample plinths", body: "Illuminated product plinths for hero SKU display." },
  ]),
  type_("printed-tents", "Printed Tents & Outdoor Activations", "10×10 and 10×20 printed pop-up tents, teardrop flags and printed table covers for outdoor events, expos and roadshows.", [
    { title: "10×10 printed tents", body: "Pop-up tent with full-colour printed canopy and side walls." },
    { title: "10×20 printed tents", body: "Larger footprint for hospitality, sampling and outdoor demos." },
    { title: "Teardrop flags", body: "Ground-anchored branded flags for wayfinding and entry activation." },
    { title: "Printed table covers", body: "Fitted or drape table covers, front-print or full-print." },
  ]),
  type_("private-enclosures", "Private Meeting Enclosures", "Semi-private and fully enclosed meeting rooms inside your booth — for NDAs, VIP briefings and product roadmap conversations.", [
    { title: "Semi-private nooks", body: "Half-wall enclosures with acoustic panels for informal meetings." },
    { title: "Fully enclosed rooms", body: "Ceiling'd meeting rooms with lockable doors — VIP program-ready." },
    { title: "Acoustic treatment", body: "Sound-absorbing wall panels for confidential conversation privacy." },
    { title: "AV-ready", body: "Wall-mounted display, HDMI + power, speakerphone for hybrid meetings." },
  ]),
  type_("table-covers", "Printed Table Covers", "Front-print, four-side print and fitted stretch table covers in 4ft, 6ft and 8ft sizes.", [
    { title: "Front-print table throws", body: "Printed logo on front panel, colour-matched drape on three sides." },
    { title: "Four-side print", body: "Full-colour print on all four sides for centre-aisle placement." },
    { title: "Fitted stretch covers", body: "Tailored fit — no wrinkles, no slippage during long show days." },
    { title: "Runners & drapes", body: "Table runners and coordinating drapes for brand-matched layouts." },
  ]),
];

export const BOOTH_SIZE_MAP = Object.fromEntries(BOOTH_SIZES.map((b) => [b.slug, b]));
