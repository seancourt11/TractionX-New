// Hero imagery for show and venue pages.
// Primary source: official venue / show photography.
// Fallback: Traction X portfolio photography from the gallery library.

import showNab from "@/assets/heroes/show-nab-show.jpg";
import showMjbiz from "@/assets/heroes/show-mjbizcon.jpg";
import showHimss from "@/assets/heroes/show-himss-global.jpg";
import showWebSummit from "@/assets/heroes/show-web-summit-vancouver.jpg";
import showDefsec from "@/assets/heroes/show-defsec-atlantic.jpg";
import showFabtech from "@/assets/heroes/show-fabtech.jpg";

import venueLvcc from "@/assets/heroes/venue-las-vegas-convention-center.jpg";
import venueMandalay from "@/assets/heroes/venue-mandalay-bay-convention-center.jpg";
import venueMccormick from "@/assets/heroes/venue-mccormick-place.jpg";
import venueJavits from "@/assets/heroes/venue-javits-center.jpg";
import venueMtcc from "@/assets/heroes/venue-metro-toronto-convention-centre.jpg";
import venueHalifax from "@/assets/heroes/venue-halifax-convention-centre.jpg";
import venueLongBeach from "@/assets/heroes/venue-long-beach-convention-center.jpg";
import venueGaylord from "@/assets/heroes/venue-gaylord-national.jpg";
import venueSanJose from "@/assets/heroes/venue-san-jose-mcenery-convention-center.jpg";
import venueAnaheim from "@/assets/heroes/venue-anaheim-convention-center.jpg";
import venuePalais from "@/assets/heroes/venue-palais-des-congres-montreal.jpg";

import img01 from "@/assets/gallery/img-01.jpg.asset.json";
import img05 from "@/assets/gallery/img-05.jpg.asset.json";
import img09 from "@/assets/gallery/img-09.jpg.asset.json";
import img13 from "@/assets/gallery/img-13.jpg.asset.json";
import img17 from "@/assets/gallery/img-17.jpg.asset.json";
import img21 from "@/assets/gallery/img-21.jpg.asset.json";
import img25 from "@/assets/gallery/img-25.jpg.asset.json";
import img29 from "@/assets/gallery/img-29.jpg.asset.json";

export const SHOW_HERO_IMAGES: Record<string, string> = {
  "nab-show": showNab,
  mjbizcon: showMjbiz,
  "himss-global": showHimss,
  "web-summit-vancouver": showWebSummit,
  "defsec-atlantic": showDefsec,
  fabtech: showFabtech,
};

export const VENUE_HERO_IMAGES: Record<string, string> = {
  "las-vegas-convention-center": venueLvcc,
  "mandalay-bay-convention-center": venueMandalay,
  "mccormick-place": venueMccormick,
  "javits-center": venueJavits,
  "metro-toronto-convention-centre": venueMtcc,
  "halifax-convention-centre": venueHalifax,
  "long-beach-convention-center": venueLongBeach,
  "gaylord-national": venueGaylord,
  "san-jose-mcenery-convention-center": venueSanJose,
  "anaheim-convention-center": venueAnaheim,
  "palais-des-congres-montreal": venuePalais,
};

/** Traction X build photography used when no official venue/show photo exists. */
const FALLBACKS: string[] = [
  img01.url,
  img05.url,
  img09.url,
  img13.url,
  img17.url,
  img21.url,
  img25.url,
  img29.url,
];

function pickFallback(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return FALLBACKS[h % FALLBACKS.length];
}

export type HeroImage = { src: string; isOfficial: boolean };

export function getShowHero(slug: string, venueSlug?: string): HeroImage {
  const official = SHOW_HERO_IMAGES[slug];
  if (official) return { src: official, isOfficial: true };
  // Next best: a photo of the venue the show runs in.
  const venuePhoto = venueSlug ? VENUE_HERO_IMAGES[venueSlug] : undefined;
  if (venuePhoto) return { src: venuePhoto, isOfficial: true };
  return { src: pickFallback(slug), isOfficial: false };
}

export function getVenueHero(slug: string): HeroImage {
  const official = VENUE_HERO_IMAGES[slug];
  return official
    ? { src: official, isOfficial: true }
    : { src: pickFallback(slug), isOfficial: false };
}

/**
 * Hero image for a city page: prefer official photography of a venue in that
 * city, otherwise fall back to Traction X build photography.
 */
export function getCityHero(citySlug: string): HeroImage {
  const venueSlug = Object.keys(VENUE_HERO_IMAGES).find((slug) =>
    CITY_VENUE_HINTS[citySlug]?.includes(slug),
  );
  if (venueSlug) return { src: VENUE_HERO_IMAGES[venueSlug], isOfficial: true };
  return { src: pickFallback(citySlug), isOfficial: false };
}

/** City slug -> venue slugs whose official photo represents that city. */
const CITY_VENUE_HINTS: Record<string, string[]> = {
  "las-vegas": ["las-vegas-convention-center", "mandalay-bay-convention-center"],
  chicago: ["mccormick-place"],
  "new-york": ["javits-center"],
  toronto: ["metro-toronto-convention-centre"],
  halifax: ["halifax-convention-centre"],
  "long-beach": ["long-beach-convention-center"],
  "washington-dc": ["gaylord-national"],
  "san-jose": ["san-jose-mcenery-convention-center"],
  anaheim: ["anaheim-convention-center"],
  montreal: ["palais-des-congres-montreal"],
};
