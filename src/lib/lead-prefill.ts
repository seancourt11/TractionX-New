import { useCityContext } from "@/lib/city-context";
import { useShowContext } from "@/lib/show-context";
import { timelineForDate } from "@/lib/place-suggest";

/**
 * Single source of truth for what a lead form should start with, based on
 * where the visitor has been. City pages remember the city, show pages
 * remember the show (and its host city + dates).
 *
 * Explicit props passed by the page always win — callers pass them first:
 *   const pre = useLeadPrefill();
 *   const [city, setCity] = useState(explicitCity ?? pre.city);
 */
export type LeadPrefill = {
  city: string;
  citySlug: string;
  show: string;
  showSlug: string;
  showDate: string;
  timeline: string;
};

const EMPTY: LeadPrefill = {
  city: "",
  citySlug: "",
  show: "",
  showSlug: "",
  showDate: "",
  timeline: "",
};

/** Union / major markets used by the cost estimator's city tier chips. */
const UNION_CITIES = new Set([
  "chicago",
  "new-york",
  "new-york-city",
  "san-francisco",
  "las-vegas",
  "boston",
  "detroit",
  "philadelphia",
]);
const MAJOR_CITIES = new Set([
  "toronto",
  "orlando",
  "atlanta",
  "vancouver",
  "los-angeles",
  "anaheim",
  "san-diego",
  "dallas",
  "houston",
  "montreal",
  "washington",
  "seattle",
  "denver",
  "nashville",
  "miami",
]);

export function cityTierFor(citySlug: string): "standard" | "major" | "union" {
  if (UNION_CITIES.has(citySlug)) return "union";
  if (MAJOR_CITIES.has(citySlug)) return "major";
  return "standard";
}

/** Canada vs USA guess for the pricing-guide region chips. */
const CA_CITIES = /^(toronto|vancouver|montreal|calgary|ottawa|edmonton|halifax|winnipeg|quebec|victoria|saskatoon|regina|mississauga|niagara)/;
export function regionForCity(citySlug: string): "us" | "ca" | null {
  if (!citySlug) return null;
  return CA_CITIES.test(citySlug) ? "ca" : "us";
}

export function useLeadPrefill(): LeadPrefill {
  const city = useCityContext();
  const show = useShowContext();

  if (!city && !show) return EMPTY;

  return {
    city: city?.label ?? show?.city ?? "",
    citySlug: city?.slug ?? show?.citySlug ?? "",
    show: show?.name ?? "",
    showSlug: show?.slug ?? "",
    showDate: show?.startDate ?? "",
    timeline: timelineForDate(show?.startDate) ?? "",
  };
}
