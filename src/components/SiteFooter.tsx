import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { Design3DButton, BookMeetingButton } from "@/components/GlobalCta";
import { CityFooterBlock } from "@/lib/city-context";
import { TOP_CITIES } from "@/data/cities";


const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Custom Exhibits",
    links: [
      { label: "Custom Trade Show Exhibits", href: "/products/custom-trade-show-exhibits" },
      { label: "Trade Show Displays", href: "/trade-show-displays" },
      { label: "Experience Studio", href: "/experience-studio" },
      { label: "Custom Floor Plans", href: "/custom-trade-show-floor-plans" },
      { label: "Venue Floor Plan Guides", href: "/venue-floor-plans" },
      { label: "Commercial Millwork", href: "/commercial-millwork-cabinetry" },
      { label: "Gallery", href: "/gallery" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Booth Rentals",
    links: [
      { label: "Trade Show Booth Rentals", href: "/rent-a-booth" },
      { label: "Exhibit Rentals", href: "/products/trade-show-exhibit-rentals" },
      { label: "Modular Catalog", href: "/products/modular-catalog" },
      { label: "Rentals by Industry", href: "/booth-rental" },
      { label: "8×10 Booths", href: "/booth-size/8x10-booths" },
      { label: "10×10 Booths", href: "/booth-size/10x10-booths" },
      { label: "10×20 Booths", href: "/booth-size/10x20-booths" },
      { label: "20×20 Booths", href: "/booth-size/20x20-booths" },
    ],
  },
  {
    title: "Portable Displays",
    links: [
      { label: "All Portable Displays", href: "/portable-booths" },
      { label: "Portable Trade Show Displays", href: "/products/portable-displays" },
      { label: "10×10 Booth Packages", href: "/portable-displays/10x10-booth-packages" },
      { label: "Tension Fabric Displays", href: "/portable-displays/tension-fabric-displays" },
      { label: "Backlit Lightboxes", href: "/portable-displays/backlit-lightbox-displays" },
      { label: "Banner Stands", href: "/portable-displays/banner-stands" },
      { label: "Counters & Kiosks", href: "/portable-displays/trade-show-counters" },
      { label: "Table Covers", href: "/portable-displays/table-covers" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Design", href: "/services/trade-show-display-design" },
      { label: "Construction", href: "/services/booth-construction" },
      { label: "Project Management", href: "/services/project-management" },
      { label: "Install & Dismantle", href: "/services/install-and-dismantle" },
      { label: "Logistics", href: "/services/shipping-and-logistics" },
      { label: "AV Rentals", href: "/services/audio-visual-rentals" },
      { label: "Booth Storage & Asset Mgmt", href: "/services/booth-storage-and-asset-management" },
      { label: "Graphics & Printing", href: "/services/trade-show-graphics-and-printing" },
      { label: "Preferred Vendor Program", href: "/preferred-vendor-program" },
      { label: "For Organizers & Venues", href: "/for-organizers" },
      { label: "Official Show Rental Program", href: "/for-organizers/official-show-rental-program" },
      { label: "Venue Exhibit Partner", href: "/for-organizers/venue-exhibit-partner" },
      { label: "Exhibitor Service Desk", href: "/for-organizers/exhibitor-service-desk" },
      { label: "Association Exhibitor Program", href: "/for-organizers/association-exhibitor-program" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Locations & Shows",
    links: [
      { label: "Convention Centre Guides", href: "/venues" },
      { label: "Trade Show Directory", href: "/trade-shows" },
      { label: "Trade Show Calendar", href: "/trade-show-calendar" },
      { label: "Shows We Serve", href: "/shows" },

      { label: "All Locations", href: "/global" },
      { label: "United States", href: "/regions/united-states" },
      { label: "Canada", href: "/regions/canada" },
      { label: "Europe", href: "/regions/europe" },
      { label: "Asia", href: "/regions/asia" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Booth Rental Pricing", href: "/trade-show-booth-rental-pricing" },
      { label: "Cost Calculator", href: "/booth-cost-calculator" },
      { label: "Rent vs. Buy", href: "/compare/rent-vs-buy-trade-show-booth" },
      { label: "Comparisons", href: "/compare" },
      { label: "Exhibitor Guides", href: "/guides" },
      { label: "How We Build", href: "/how-we-build" },
      { label: "Our Promise", href: "/our-promise" },
      { label: "Rescue Booth Builds", href: "/rescue-booth-builds" },
      { label: "Exhibit Glossary", href: "/resources/trade-show-exhibit-glossary" },
      { label: "2026 Benchmark Report", href: "/trade-show-marketing-benchmark-report-2026" },
      { label: "Industries", href: "/industries" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Suppliers", href: "/suppliers" },
      { label: "Site Map", href: "/site-map" },
    ],
  },
  {
    title: "Top Cities",
    links: TOP_CITIES,
  },
];



export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-white/70">
      <CityFooterBlock />
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-8 text-sm">

        <div className="col-span-2">
          <div className="text-white font-display text-2xl font-bold uppercase tracking-tight">
            {SITE.name}
          </div>
          <p className="mt-3 text-white/60 max-w-xs">
            Full-service trade show exhibits, custom fabrication, event tech and global logistics.
          </p>
          <div className="mt-6 space-y-1.5">
            <a href={`tel:${SITE.phone}`} className="block hover:text-white">
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="block hover:text-white">
              {SITE.email}
            </a>
            <BookMeetingButton label="Book a virtual meeting" variant="ghost" source="footer" className="block !no-underline text-white/70 hover:text-white font-normal" />
            <Design3DButton label="Start your free 3D design" variant="ghost" source="footer" className="block text-[oklch(0.78_0.13_300)] font-normal" />
          </div>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <div className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-3">
              {c.title}
            </div>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <Link to="/faqs" className="hover:text-white">FAQs</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>

          </div>
        </div>
      </div>
    </footer>
  );
}
