export type ProductEntry = {
  slug: string;
  label: string;
  short: string;
  hero: { title: string; accent?: string; intro: string };
  bullets: { title: string; body: string }[];
  bestFor: string[];
  seo: { title: string; description: string };
};

export const PRODUCTS: ProductEntry[] = [
  {
    slug: "trade-show-exhibit-rentals",
    label: "Trade Show Exhibit Rentals",
    short: "Premium rental exhibits from 10×10 in-lines to 30×50 islands.",
    hero: {
      title: "Trade Show",
      accent: "Exhibit Rentals",
      intro:
        "A rental program that looks nothing like a rental. Modular aluminium framing with custom graphics, real millwork counters, backlit tension fabric and integrated AV — configured 10×10 through 30×50, delivered globally.",
    },
    bullets: [
      { title: "10×10 in-lines from $16,250", body: "Backlit fabric header, reception counter, storage closet, LED-lit shelving, monitor mount." },
      { title: "10×20 endcaps from $22,750", body: "Two-open-side traffic flow, hero graphic wall, integrated demo counter, meeting stools." },
      { title: "20×20 islands from $39,000", body: "Four-side visibility, central hanging structure, hospitality counter, private meeting nook." },
      { title: "Custom rentals", body: "Millwork counters, textured wall finishes, real wood veneer — a bespoke look on a rental budget." },
    ],
    bestFor: ["Multi-city programs", "First-time exhibitors", "One-off shows", "Rescue builds"],
    seo: {
      title: "Trade Show Exhibit Rentals — 10×10 to 30×50 | Traction X",
      description: "Premium trade show exhibit rentals: 10×10 from $16,250, 10×20 from $22,750, 20×20 from $39,000. Custom graphics, integrated AV, delivered globally.",
    },
  },
  {
    slug: "custom-trade-show-exhibits",
    label: "Custom Trade Show Exhibits",
    short: "Bespoke booths, double-decks, hospitality lounges and sponsor takeovers.",
    hero: {
      title: "Custom Trade Show",
      accent: "Exhibits",
      intro:
        "One-of-a-kind exhibits engineered to reconfigure and re-ship. From 20×20 hero booths to 50×80 double-deck brand houses — millwork, welded steel, LED walls and hospitality lounges built in-house.",
    },
    bullets: [
      { title: "Bespoke architecture", body: "Real millwork, welded steel, machined aluminium, CNC-cut acrylic — engineered for repeat shows." },
      { title: "Double-decks & lofts", body: "Second-storey meeting decks with permitted engineering drawings for major convention centres." },
      { title: "Hospitality & lounges", body: "Full-service bars, seated dining, private meeting rooms — for exhibitors hosting VIP programs." },
      { title: "Sponsor takeovers", body: "Registration arches, keynote stages, wayfinding, branded corridors and lobby activations." },
    ],
    bestFor: ["Flagship exhibitors", "Sponsor-tier brand takeovers", "Multi-show custom programs", "Product launches & keynotes"],
    seo: {
      title: "Custom Trade Show Exhibits & Double-Deck Booths | Traction X",
      description: "Custom trade show exhibits, double-decks and hospitality lounges — millwork, welded steel, LED walls and integrated AV engineered to reconfigure and re-ship.",
    },
  },
  {
    slug: "portable-displays",
    label: "Portable Trade Show Displays",
    short: "Backwalls, banner stands, counters and tents — carry-on ready.",
    hero: {
      title: "Portable Trade Show",
      accent: "Displays",
      intro:
        "Ship-in-a-case exhibits that set up in under an hour. Backwalls, banner stands, counters, hanging banners and printed tents — ideal for regional roadshows, sales meetings and pop-up activations.",
    },
    bullets: [
      { title: "Pop-up backwalls", body: "8ft, 10ft and 20ft tension-fabric walls with hard case that doubles as a counter." },
      { title: "Retractable banner stands", body: "Single, double and premium wide-format retractables — swap graphics per event." },
      { title: "Portable counters & kiosks", body: "Foldable reception counters with lockable storage and printed graphic wrap." },
      { title: "Printed tents & flags", body: "10×10 and 10×20 tents, teardrop flags and printed table covers for outdoor activations." },
    ],
    bestFor: ["Regional roadshows", "Sales enablement events", "Recruiting fairs", "Small budget one-offs"],
    seo: {
      title: "Portable Trade Show Displays — Backwalls, Banners & Tents | Traction X",
      description: "Portable trade show displays: pop-up backwalls, retractable banner stands, portable counters, printed tents and table covers. Ship-in-a-case, set up in under an hour.",
    },
  },
  {
    slug: "modular-catalog",
    label: "Modular Booth Catalog",
    short: "700+ pre-engineered modular booth designs ready to configure.",
    hero: {
      title: "Modular Booth",
      accent: "Catalog",
      intro:
        "Over 700 pre-engineered modular designs — 10×10 to 30×50 — ready to configure with your graphics. Aluminium extrusion framing that ships in road cases and reconfigures show-to-show.",
    },
    bullets: [
      { title: "Aluminium extrusion framing", body: "Beam-based structural system — the same booth reconfigured 10×10 → 10×20 → 20×20 across your program." },
      { title: "Tension-fabric graphics", body: "Silicone-edge SEG graphics, backlit or front-lit, quick-swap between shows." },
      { title: "Integrated counters & storage", body: "Locking storage closets, tablet mounts, monitor arms, LED-lit shelves." },
      { title: "Freight-friendly crates", body: "Sized to standard road cases — no oversized LTL surcharges." },
    ],
    bestFor: ["Repeat-show programs", "Marketing teams standardising the look", "Distributors and multi-region rollouts"],
    seo: {
      title: "Modular Trade Show Booth Catalog — 700+ Designs | Traction X",
      description: "700+ pre-engineered modular trade show booth designs from 10×10 to 30×50. Aluminium framing, tension-fabric graphics, ready to configure with your brand.",
    },
  },
];

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));
