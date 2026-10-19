export const SITE = {
  name: "Traction X",
  tagline: "Trade Show Exhibits & Brand Activations Globally",
  url: "https://tractionxtemp.lovable.app",
  phone: "+1-782-409-2527",
  phoneDisplay: "1-782-409-2527",
  email: "info@tractionx.ca",
  calendly: "https://calendly.com/seancourt/30min",
  /** 10-minute touch base — open to anyone. */
  calendly10: "https://calendly.com/seancourt/10min",
  /** 30-minute design strategy session — qualified projects ($10K+ budget). */
  calendly30: "https://calendly.com/seancourt/30min",
};

export type NavChild = { label: string; href: string; desc?: string; group?: string };
export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
  cta?: { label: string; href: string };
};

export const NAV: NavItem[] = [
  {
    label: "Custom Exhibits",
    href: "/products/custom-trade-show-exhibits",
    cta: { label: "Get my exact quote", href: "/contact" },
    children: [
      { group: "Custom exhibits", label: "Custom Trade Show Exhibits", href: "/products/custom-trade-show-exhibits" },
      { group: "Custom exhibits", label: "Trade Show Displays", href: "/trade-show-displays" },
      { group: "Custom exhibits", label: "Reconfigurable Booths", href: "/reconfigurable-trade-show-booths" },
      { group: "Custom exhibits", label: "Experience Studio", href: "/experience-studio" },
      { group: "Custom exhibits", label: "Double Deck Exhibits", href: "/double-deck-trade-show-booths" },
      { group: "Custom exhibits", label: "Custom Floor Plans", href: "/custom-trade-show-floor-plans" },
      { group: "Custom exhibits", label: "Commercial Millwork", href: "/commercial-millwork-cabinetry" },

      { group: "By booth size", label: "10×10 Booths", href: "/booth-size/10x10-booths" },
      { group: "By booth size", label: "10×20 Booths", href: "/booth-size/10x20-booths" },
      { group: "By booth size", label: "20×20 Booths", href: "/booth-size/20x20-booths" },
      { group: "By booth size", label: "8×10 Booths", href: "/booth-size/8x10-booths" },

      { group: "Proof & industries", label: "Gallery", href: "/gallery" },
      { group: "Proof & industries", label: "Case Studies", href: "/case-studies" },
      { group: "Proof & industries", label: "Testimonials", href: "/testimonials" },
      { group: "Proof & industries", label: "Exhibits by Industry", href: "/industries" },
    ],
  },
  {
    label: "Booth Rentals",
    href: "/rent-a-booth",
    cta: { label: "Get my rental quote", href: "/contact" },
    children: [
      { group: "Rent a booth", label: "Trade Show Booth Rentals", href: "/rent-a-booth" },
      { group: "Rent a booth", label: "Trade Show Exhibit Rentals", href: "/products/trade-show-exhibit-rentals" },
      { group: "Rent a booth", label: "Modular Rental Catalog", href: "/products/modular-catalog" },
      { group: "Rent a booth", label: "Rentals by Industry", href: "/booth-rental" },

      { group: "Rentals by size", label: "8×10 Booth Rentals", href: "/booth-size/8x10-booths" },
      { group: "Rentals by size", label: "10×10 Booth Rentals", href: "/booth-size/10x10-booths" },
      { group: "Rentals by size", label: "10×20 Booth Rentals", href: "/booth-size/10x20-booths" },
      { group: "Rentals by size", label: "20×20 Booth Rentals", href: "/booth-size/20x20-booths" },

      { group: "Rental pricing", label: "Custom Booth Rental Pricing", href: "/trade-show-booth-rental-pricing" },
      { group: "Rental pricing", label: "Booth Cost Calculator", href: "/booth-cost-calculator" },
      { group: "Rental pricing", label: "Build Your Booth Plan", href: "/build-your-booth-plan" },
      { group: "Rental pricing", label: "Rent vs. Buy", href: "/compare/rent-vs-buy-trade-show-booth" },
      { group: "Rental pricing", label: "Rent for a Specific Show", href: "/shows" },
    ],
  },
  {
    label: "Portable Displays",
    href: "/portable-booths",
    cta: { label: "See instant pricing", href: "/portable-booths" },
    children: [
      { group: "Portable booths", label: "All Portable Displays", href: "/portable-booths" },
      { group: "Portable booths", label: "Portable Trade Show Displays", href: "/products/portable-displays" },
      { group: "Portable booths", label: "10×10 Booth Packages", href: "/portable-displays/10x10-booth-packages" },
      { group: "Portable booths", label: "10×20 Booth Packages", href: "/portable-displays/10x20-booth-packages" },

      { group: "Walls & backdrops", label: "Tension Fabric Displays", href: "/portable-displays/tension-fabric-displays" },
      { group: "Walls & backdrops", label: "Backlit Lightboxes", href: "/portable-displays/backlit-lightbox-displays" },
      { group: "Walls & backdrops", label: "Pop-Up Displays", href: "/portable-displays/pop-up-displays" },
      { group: "Walls & backdrops", label: "Step & Repeat Backdrops", href: "/portable-displays/step-and-repeat-backdrops" },
      { group: "Walls & backdrops", label: "Hanging Banners & Towers", href: "/portable-displays/hanging-banners-towers" },

      { group: "Counters & accessories", label: "Counters & Kiosks", href: "/portable-displays/trade-show-counters" },
      { group: "Counters & accessories", label: "Banner Stands", href: "/portable-displays/banner-stands" },
      { group: "Counters & accessories", label: "Table Covers", href: "/portable-displays/table-covers" },
      { group: "Counters & accessories", label: "Literature Stands", href: "/booth-size/literature-stands" },
      { group: "Counters & accessories", label: "Accessories", href: "/booth-size/accessories" },
      { group: "Counters & accessories", label: "Counters", href: "/booth-size/counters" },
      { group: "Counters & accessories", label: "Banner Stand Range", href: "/booth-size/banner-stands" },
      { group: "Counters & accessories", label: "Hanging Banners", href: "/booth-size/hanging-banners" },
      { group: "Counters & accessories", label: "Table Cover Range", href: "/booth-size/table-covers" },

      { group: "Outdoor & events", label: "Printed Tents", href: "/portable-displays/event-tents-canopies" },
      { group: "Outdoor & events", label: "Outdoor Flags & Signage", href: "/portable-displays/outdoor-flags-signage" },
      { group: "Outdoor & events", label: "Tent Range", href: "/booth-size/printed-tents" },
      { group: "Outdoor & events", label: "Private Enclosures", href: "/booth-size/private-enclosures" },
    ],
  },
  {
    label: "Locations & Shows",
    href: "/global",
    cta: { label: "Book a virtual meeting", href: "/contact" },
    children: [
      { group: "Top cities", label: "Las Vegas, NV", href: "/las-vegas-modular-trade-show-booth-rentals" },
      { group: "Top cities", label: "Toronto, ON", href: "/city/toronto-trade-show-booth-rentals" },
      { group: "Top cities", label: "Chicago, IL", href: "/city/chicago-trade-show-booth-rentals" },
      { group: "Top cities", label: "Orlando, FL", href: "/city/orlando-trade-show-booth-rentals" },
      { group: "Top cities", label: "New York City, NY", href: "/city/new-york-city-trade-show-booth-rentals" },
      { group: "Top cities", label: "Vancouver, BC", href: "/city/vancouver-trade-show-booth-rentals" },
      { group: "Top cities", label: "Montréal, QC", href: "/city/montreal-trade-show-booth-rentals" },
      { group: "Top cities", label: "All Cities", href: "/global" },

      { group: "Venues", label: "Convention Centre Guides", href: "/venues" },
      { group: "Venues", label: "Venue Floor Plan Guides", href: "/venue-floor-plans" },
      { group: "Venues", label: "Custom Floor Plan Design", href: "/custom-trade-show-floor-plans" },
      { group: "Venues", label: "Floor Plan Software Comparison", href: "/floor-plan-software-comparison" },
      { group: "Venues", label: "Venue Exhibit Partner Program", href: "/for-organizers/venue-exhibit-partner" },

      { group: "Shows", label: "All Shows We Serve", href: "/shows" },
      { group: "Shows", label: "Trade Show Directory", href: "/trade-shows" },
      { group: "Shows", label: "Trade Show Calendar", href: "/trade-show-calendar" },
      { group: "Shows", label: "Upcoming Shows & Deadlines", href: "/events" },
      { group: "Shows", label: "CES Las Vegas", href: "/shows/ces-las-vegas" },
      { group: "Shows", label: "Web Summit Vancouver", href: "/shows/web-summit-vancouver" },
      { group: "Shows", label: "DEFSEC Atlantic", href: "/shows/defsec-atlantic" },
      { group: "Shows", label: "NAB Show", href: "/shows/nab-show" },
      { group: "Shows", label: "HIMSS Global", href: "/shows/himss-global" },
      { group: "Shows", label: "AWS re:Invent", href: "/shows/aws-reinvent" },
      { group: "Shows", label: "Microsoft Ignite", href: "/shows/microsoft-ignite" },
      { group: "Shows", label: "NRF Big Show", href: "/shows/nrf-big-show" },


      { group: "Regions", label: "United States", href: "/regions/united-states" },
      { group: "Regions", label: "Canada", href: "/regions/canada" },
      { group: "Regions", label: "Europe", href: "/regions/europe" },
      { group: "Regions", label: "Latin America", href: "/regions/latin-america" },
      { group: "Regions", label: "Asia", href: "/regions/asia" },
      { group: "Regions", label: "Oceania", href: "/regions/oceania" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    cta: { label: "Talk to a project manager", href: "/contact" },
    children: [
      { group: "Design & build", label: "Display Design", href: "/services/trade-show-display-design" },
      { group: "Design & build", label: "Booth Construction", href: "/services/booth-construction" },
      { group: "Design & build", label: "Double Deck Exhibits", href: "/double-deck-trade-show-booths" },
      { group: "Design & build", label: "Custom Floor Plans", href: "/custom-trade-show-floor-plans" },
      { group: "Design & build", label: "Venue Floor Plan Guides", href: "/venue-floor-plans" },
      { group: "Design & build", label: "Floor Plan Software Comparison", href: "/floor-plan-software-comparison" },
      { group: "Design & build", label: "Commercial Millwork", href: "/commercial-millwork-cabinetry" },

      { group: "On-site & logistics", label: "Project Management", href: "/services/project-management" },
      { group: "On-site & logistics", label: "Install & Dismantle", href: "/services/install-and-dismantle" },
      { group: "On-site & logistics", label: "Shipping & Logistics", href: "/services/shipping-and-logistics" },
      { group: "On-site & logistics", label: "Audio Visual Rentals", href: "/services/audio-visual-rentals" },
      { group: "On-site & logistics", label: "Booth Storage & Asset Management", href: "/services/booth-storage-and-asset-management" },
      { group: "On-site & logistics", label: "Show Services & Exhibitor Kits", href: "/services/show-services-and-exhibitor-kits" },

      { group: "Design & build", label: "Graphics & Printing", href: "/services/trade-show-graphics-and-printing" },

      { group: "Design & build", label: "How We Build", href: "/how-we-build" },
      { group: "Design & build", label: "Rescue Booth Builds", href: "/rescue-booth-builds" },

      { group: "Partners", label: "For Organizers & Venues", href: "/for-organizers" },
      { group: "Partners", label: "Official Show Rental Program", href: "/for-organizers/official-show-rental-program" },
      { group: "Partners", label: "Venue Exhibit Partner", href: "/for-organizers/venue-exhibit-partner" },
      { group: "Partners", label: "Exhibitor Service Desk", href: "/for-organizers/exhibitor-service-desk" },
      { group: "Partners", label: "Association Exhibitor Program", href: "/for-organizers/association-exhibitor-program" },
      { group: "Partners", label: "Preferred Vendor Program", href: "/preferred-vendor-program" },
      { group: "Partners", label: "About Traction X", href: "/about" },
      { group: "Partners", label: "Our Promise", href: "/our-promise" },
    ],
  },
  {
    label: "Resources",
    href: "/guides",
    cta: { label: "Download the 2027 pricing guide", href: "/trade-show-booth-rental-pricing" },
    children: [
      { group: "Pricing & planning", label: "Custom Booth Rental Pricing", href: "/trade-show-booth-rental-pricing" },
      { group: "Pricing & planning", label: "Booth Cost Calculator", href: "/booth-cost-calculator" },
      { group: "Pricing & planning", label: "Build Your Booth Plan", href: "/build-your-booth-plan" },
      { group: "Pricing & planning", label: "Rent vs. Buy", href: "/compare/rent-vs-buy-trade-show-booth" },
      { group: "Pricing & planning", label: "Exhibit Companies Compared", href: "/compare/trade-show-exhibit-rental-companies" },
      { group: "Pricing & planning", label: "Comparisons", href: "/compare" },

      { group: "Planning tools", label: "Exhibitor Resource Center", href: "/exhibitor-resources" },
      { group: "Planning tools", label: "Trade Show Budget Template", href: "/exhibitor-resources/trade-show-budget-template" },
      { group: "Planning tools", label: "Show Services Deadline Tracker", href: "/exhibitor-resources/show-services-deadline-tracker" },
      { group: "Planning tools", label: "Trade Show ROI Calculator", href: "/exhibitor-resources/trade-show-roi-calculator" },
      { group: "Planning tools", label: "Booth Graphic File Specs", href: "/exhibitor-resources/trade-show-booth-graphic-specs" },

      { group: "Guides & research", label: "Exhibitor Guides", href: "/guides" },
      { group: "Guides & research", label: "Booth Gallery", href: "/gallery" },
      { group: "Guides & research", label: "Exhibit Glossary", href: "/resources/trade-show-exhibit-glossary" },
      { group: "Guides & research", label: "2026 Benchmark Report", href: "/trade-show-marketing-benchmark-report-2026" },
      { group: "Guides & research", label: "Blog", href: "/blog" },


      { group: "Company", label: "Our Promise", href: "/our-promise" },
      { group: "Company", label: "Industries We Serve", href: "/industries" },
      { group: "Company", label: "Sustainability", href: "/sustainability" },
      { group: "Company", label: "FAQs", href: "/faqs" },
      { group: "Company", label: "Contact", href: "/contact" },
    ],
  },
];

