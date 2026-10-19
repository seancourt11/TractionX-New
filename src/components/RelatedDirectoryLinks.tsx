import { Link } from "@tanstack/react-router";
import type { Show } from "@/data/shows";
import {
  showHref,
  cityHubLink,
  sectorLinksForShow,
  sameVenueShows,
  sameSectorShows,
  cityPageHref,
  venuePageHref,
  getHub,
  nextEdition,
  type DirectoryLink,
} from "@/lib/show-directory";
import { formatRange } from "@/lib/show-calendar";
import { getVenue } from "@/data/venues";

function LinkCard({ label, href, note }: DirectoryLink) {
  return (
    <Link
      to={href}
      className="block rounded-xl border border-white/10 px-4 py-3 hover:border-[oklch(0.78_0.13_300)]/60 hover:bg-white/[0.03] transition"
    >
      <span className="text-sm text-white/85">{label}</span>
      {note && <span className="block text-xs text-white/45 mt-1">{note}</span>}
    </Link>
  );
}

function Group({ title, links }: { title: string; links: DirectoryLink[] }) {
  if (!links.length) return null;
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-3">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-2.5">
        {links.map((l) => (
          <LinkCard key={l.href + l.label} {...l} />
        ))}
      </div>
    </div>
  );
}

/**
 * Directory-grade internal linking block. Dropped at the bottom of show,
 * city and venue pages so every leaf connects to its siblings, its sector,
 * its city hub and the calendar.
 */
export function RelatedDirectoryLinks({
  show,
  citySlug,
  venueSlug,
  heading = "Keep exploring",
}: {
  show?: Show;
  citySlug?: string;
  venueSlug?: string;
  heading?: string;
}) {
  const resolvedCity = show?.citySlug ?? citySlug;
  const resolvedVenue = show?.venueSlug ?? venueSlug;

  const hubLinks: DirectoryLink[] = [];
  if (resolvedCity) {
    const c = cityHubLink(resolvedCity);
    if (c) hubLinks.push(c);
    const cityPage = cityPageHref(resolvedCity);
    if (cityPage)
      hubLinks.push({
        label: `Booth rentals in ${show?.city ?? resolvedCity}`,
        href: cityPage,
        note: "City service page",
      });
  }
  if (resolvedVenue) {
    const v = getVenue(resolvedVenue);
    const vp = venuePageHref(resolvedVenue);
    if (v && vp) hubLinks.push({ label: `${v.shortName} exhibitor guide`, href: vp, note: "Venue page" });
  }
  if (show) {
    hubLinks.push(...sectorLinksForShow(show));
    const country = getHub(
      show.country === "CA" ? "trade-shows-in-canada" : "trade-shows-in-the-united-states",
    );
    if (country)
      hubLinks.push({
        label: country.h1.replace(" — booth rentals city by city", ""),
        href: `/trade-shows/${country.slug}`,
        note: `${country.shows.length} shows`,
      });
  }

  const venueSiblings = show ? sameVenueShows(show, 6) : [];
  const sectorSiblings = show ? sameSectorShows(show, 6) : [];

  const toShowLink = (s: Show): DirectoryLink => {
    const occ = nextEdition(s);
    return {
      label: `${s.shortName} booth rentals`,
      href: showHref(s),
      note: occ ? formatRange(occ) : s.cadence,
    };
  };

  const anything =
    hubLinks.length || venueSiblings.length || sectorSiblings.length;
  if (!anything) return null;

  const venueName = resolvedVenue ? getVenue(resolvedVenue)?.shortName : undefined;

  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
          {heading}
        </h2>
        <div className="mt-8 grid lg:grid-cols-3 gap-10">
          <Group title="Directory" links={hubLinks} />
          <Group
            title={venueName ? `Also at ${venueName}` : "Nearby shows"}
            links={venueSiblings.map(toShowLink)}
          />
          <Group title="Same sector" links={sectorSiblings.map(toShowLink)} />
        </div>
        <div className="mt-8 text-sm">
          <Link
            to="/trade-show-calendar"
            className="text-[oklch(0.78_0.13_300)] hover:underline"
          >
            See the full trade show calendar →
          </Link>
        </div>
      </div>
    </section>
  );
}
