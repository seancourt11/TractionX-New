import type { City } from "./cities";
import { EUROPE_CITIES } from "./cities-europe";
import { ASIA_PACIFIC_CITIES } from "./cities-asia-pacific";
import { LATAM_MEA_CITIES } from "./cities-latam-mea";

/**
 * Markets outside the US and Canada. Traction X builds these through in-region
 * partner fabrication shops with a Traction X project manager on site, which is
 * how the page copy is framed — no claim of a local shop we don't own.
 *
 * Each of these existed as a beaumontandco.ca city URL, so every one now has a
 * real, topically matching destination rather than a redirect to /venues.
 */
export const INTERNATIONAL_CITIES: City[] = [
  ...EUROPE_CITIES,
  ...ASIA_PACIFIC_CITIES,
  ...LATAM_MEA_CITIES,
];
