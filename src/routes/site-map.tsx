import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { SITE } from "@/lib/site";
import { absUrl, robotsMeta } from "@/lib/seo";
import { SERVICES } from "@/data/services";
import { PRODUCTS } from "@/data/products";
import { BOOTH_SIZES } from "@/data/booth-sizes";
import { REGIONS } from "@/data/regions";
import { BLOG_POSTS } from "@/data/blog-posts";
import { CASE_STUDIES } from "@/data/case-studies";
import { VENUES, venueUrlSlug } from "@/data/venues";
import { SHOWS, showUrlSlug } from "@/data/shows";
import { CITIES, cityUrlSlug, cityLabel } from "@/data/cities";
import { COMPARISONS } from "@/data/comparisons";
import { GUIDES } from "@/data/guides";
import { INDUSTRIES } from "@/data/industry-pages";
import { PORTABLE_CATEGORIES } from "@/data/portable-products";

const TITLE = "Site Map | Traction X";
const DESC = "Every section of the Traction X site — services, products, booth sizes, cities, shows, venues, industries, comparisons, guides and more.";

export const Route = createFileRoute("/site-map")({
  head: () => {
    const url = absUrl("/site-map");
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        ...robotsMeta(),
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESC },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: SiteMap,
});

type LinkItem = { label: string; to: string; params?: Record<string, string> };

function LinkGroup({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-white mb-3">{title}</h3>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        {items.map((it) => (
          <li key={it.to + JSON.stringify(it.params ?? {}) + it.label}>
            {it.params ? (
              <Link to={it.to} params={it.params} className="text-white/70 hover:text-[oklch(0.78_0.13_300)] text-sm">
                {it.label}
              </Link>
            ) : (
              <Link to={it.to} className="text-white/70 hover:text-[oklch(0.78_0.13_300)] text-sm">
                {it.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SiteMap() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Site map"
        title="Every Page,"
        accent="One List"
        intro="A full HTML index of Traction X — services, products, booth sizes, locations, shows, venues, industries, comparisons, guides and more."
      />

      <Section eyebrow="Main sections" title="Core pages">
        <LinkGroup
          title="Main"
          items={[
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
            { label: "Careers", to: "/careers" },
            { label: "Gallery", to: "/gallery" },
            { label: "Case Studies", to: "/case-studies" },
            { label: "Testimonials", to: "/testimonials" },
            { label: "FAQs", to: "/faqs" },
            { label: "Blog", to: "/blog" },
            { label: "Sustainability", to: "/sustainability" },
            { label: "Preferred Vendor Program", to: "/preferred-vendor-program" },
            { label: "Privacy Policy", to: "/privacy-policy" },
            { label: "Terms of Service", to: "/terms-of-service" },
            { label: "Booth Cost Calculator", to: "/booth-cost-calculator" },
            { label: "Trade Show Booth Rental Pricing", to: "/trade-show-booth-rental-pricing" },
            { label: "Custom Trade Show Floor Plans", to: "/custom-trade-show-floor-plans" },
            { label: "Commercial Millwork & Cabinetry", to: "/commercial-millwork-cabinetry" },
            { label: "Experience Studio", to: "/experience-studio" },
            { label: "Trade Show Displays", to: "/trade-show-displays" },
            { label: "Rent a Booth", to: "/rent-a-booth" },
            { label: "Portable Booths", to: "/portable-booths" },
            { label: "Global Locations", to: "/global" },
            { label: "Upcoming Shows & Deadlines", to: "/events" },
            { label: "2026 Benchmark Report", to: "/trade-show-marketing-benchmark-report-2026" },
            { label: "Exhibit Glossary", to: "/resources/trade-show-exhibit-glossary" },
          ]}
        />
      </Section>

      <Section title="Services" bg="muted">
        <LinkGroup
          title="Services"
          items={[
            { label: "All Services", to: "/services" },
            ...SERVICES.map((s) => ({ label: s.label, to: "/services/$slug", params: { slug: s.slug } })),
          ]}
        />
      </Section>

      <Section title="Products & Booth Sizes">
        <div className="space-y-10">
          <LinkGroup
            title="Products"
            items={PRODUCTS.map((p) => ({ label: p.label, to: "/products/$slug", params: { slug: p.slug } }))}
          />
          <LinkGroup
            title="Booth Sizes & Types"
            items={BOOTH_SIZES.map((b) => ({ label: b.label, to: "/booth-size/$slug", params: { slug: b.slug } }))}
          />
          <LinkGroup
            title="Portable Display Categories"
            items={[
              { label: "All Portable Displays", to: "/portable-booths" },
              ...PORTABLE_CATEGORIES.map((c) => ({ label: c.label, to: "/portable-displays/$category", params: { category: c.slug } })),
            ]}
          />
        </div>
      </Section>

      <Section title="Locations & Shows" bg="muted">
        <div className="space-y-10">
          <LinkGroup title="Regions" items={REGIONS.map((r) => ({ label: r.label, to: "/regions/$slug", params: { slug: r.slug } }))} />
          <LinkGroup
            title="Cities"
            items={CITIES.map((c) => ({ label: cityLabel(c), to: "/city/$slug", params: { slug: cityUrlSlug(c.slug) } }))}
          />
          <LinkGroup
            title="Venues"
            items={[
              { label: "All Venues", to: "/venues" },
              ...VENUES.map((v) => ({ label: v.name, to: "/venues/$slug", params: { slug: venueUrlSlug(v.slug) } })),
            ]}
          />
          <LinkGroup
            title="Shows"
            items={[
              { label: "All Shows", to: "/shows" },
              ...SHOWS.map((s) => ({ label: s.name, to: "/shows/$slug", params: { slug: showUrlSlug(s.slug) } })),
            ]}
          />
        </div>
      </Section>

      <Section title="Industries & Comparisons">
        <div className="space-y-10">
          <LinkGroup
            title="Industries"
            items={[
              { label: "All Industries", to: "/industries" },
              ...INDUSTRIES.map((i) => ({ label: i.label, to: "/industries/$slug", params: { slug: i.slug } })),
            ]}
          />
          <LinkGroup
            title="Comparisons"
            items={[
              { label: "All Comparisons", to: "/compare" },
              ...COMPARISONS.map((c) => ({ label: c.label, to: "/compare/$slug", params: { slug: c.slug } })),
            ]}
          />
          <LinkGroup title="Rentals by Industry" items={[{ label: "Rentals by Industry Hub", to: "/booth-rental" }]} />
        </div>
      </Section>

      <Section title="Guides, Blog & Case Studies" bg="muted">
        <div className="space-y-10">
          <LinkGroup
            title="Guides"
            items={[
              { label: "All Guides", to: "/guides" },
              ...GUIDES.map((g) => ({ label: g.label, to: "/guides/$slug", params: { slug: g.slug } })),
            ]}
          />
          <LinkGroup
            title="Blog"
            items={[
              { label: "All Blog Posts", to: "/blog" },
              ...BLOG_POSTS.map((p) => ({ label: p.title, to: "/blog/$slug", params: { slug: p.slug } })),
            ]}
          />
          <LinkGroup
            title="Case Studies"
            items={[
              { label: "All Case Studies", to: "/case-studies" },
              ...CASE_STUDIES.map((c) => ({ label: c.title, to: "/case-studies/$slug", params: { slug: c.slug } })),
            ]}
          />
        </div>
      </Section>

      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
