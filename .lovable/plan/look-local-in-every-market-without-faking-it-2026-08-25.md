# Look local in every market — without faking it

Goal: an exhibitor in Chicago, Orlando or Toronto should feel Traction X is *their* local
exhibit house, not a Halifax company shipping in. Two things have to happen at once: remove
the one thing that is currently a real risk, and add the things that actually make a vendor
read as local.

## First: one thing has to change before anything else

Every city page today publishes a `LocalBusiness` schema block with a street address, postal
code and GPS coordinates for that city — 140 of them. Those addresses are landmarks and venue
buildings, not Traction X locations (Orlando is listed at 9800 International Dr, Chicago at
2301 S King Dr).

That is the one tactic Google names explicitly in its business-representation guidelines, and
scaled fake-location pages are exactly what the 2024–2025 spam policy targets. It also fails
the moment a buyer maps the address and finds a convention centre.

It gets replaced with the version that is both legal and stronger: one real Traction X
organization entity, and a per-city `Service` node scoped with `areaServed: {City}`. Same
local relevance to Google, no false claim. Sources: Google's "Guidelines for representing your
business" and "Manage your business address" (service-area businesses hide the address and
declare service areas instead).

Everything below is what replaces that signal — and local *evidence* outranks a fake address
anyway.

## The local presence layer

The honest, high-converting frame is **"local delivery, national capability"** — never "our
Orlando office."

Standard local language per city page, applied consistently:

- "Installing at {venue} since {year}" — first-person familiarity with the actual hall
- A named crew line: local install crew and union labour contracted in {city}, with an on-site
  producer who travels with the build (this is already the Traction X Promise — it just isn't
  said in local terms)
- Freight framed as solved, not as distance: "delivered to the {venue} advance warehouse" —
  never "shipped from Halifax." Exhibitors don't care where the shop is; they care who is on
  the floor at 7am.
- A "what we know about this hall" block: dock and marshalling rules, union jurisdiction,
  ceiling and rigging limits, target times, drive time from the airport

## Local evidence — the part that actually does the work

Right now exactly **one** of ~140 cities (Halifax) has any unique proof content. Every other
city page renders an empty proof block. That is the doorway-page pattern the sources warn
about, and it is also why the pages don't feel local.

Fill the top markets first with real material:

- Recent builds **in that hall**, pulled from the gallery by city, captioned with the venue and
  show name
- A city-attributed testimonial where one exists (real ones only — I will ask you for these
  rather than write them)
- Show count / footprint delivered in that market
- The venue-specific operational facts above

Tier 1 (do first): Las Vegas, Orlando, Chicago, Toronto, Vancouver, Atlanta, San Diego,
New York, Boston, Nashville. Tier 2 follows the same template.

For any city with no real proof yet, the page shows the venue-logistics facts only, and does
not imply a track record it doesn't have.

## Homepage and site shell — drop the Canadian framing

You're right that the homepage shouldn't announce a nationality. It currently reads
Canada-first in places, and Toronto/Vancouver page copy literally opens "As a Canadian
company."

- Homepage voice becomes continental and neutral: North American show floors, cities named
  before countries. No "Canadian company," no flag-planting.
- The country-of-origin line disappears from city intros. Where origin matters (Halifax,
  DEFSEC Atlantic), it stays — it's a genuine advantage there.
- Footer and contact page keep one number, 1-782-409-2527, with no address block. Worth
  knowing: a 782 area code reads as Atlantic Canada to a US buyer who checks. A single toll-free
  line would remove that tell entirely — say the word and I'll wire it in; otherwise nothing
  changes here.

## Making the whole site adapt to the visitor's city

The city-memory system already exists but only kicks in *after* someone visits a city page,
and only shows a ribbon and a footer blurb.

Extend it so the visitor's market carries through the whole site:

- Set the city from the Booth Finder, from a show or venue page, and from a `?city=` link — not
  just city pages
- Homepage hero, the CTA bands and the quote form headline adopt the city ("Trade show booths
  for {city} exhibitors", "Request a {city} quote", city pre-filled in the form)
- The venues named in the promise/proof strips switch to that city's halls
- Falls back to neutral copy when unknown, and stays neutral in the server-rendered HTML so
  Google keeps seeing the canonical page

## What I need from you

- Any real city testimonials or named clients per market (I won't invent these)
- Confirmation on the toll-free number question
- Whether there is any market where you *do* have a warehouse or standing partner shop — those
  can make a stronger claim than the rest

## Technical notes

- `city.$slug.tsx`: drop the `LocalBusiness` + `PostalAddress` + `geo` node; emit
  `Service` with `areaServed` scoped to the city, keep `FAQPage`/`BreadcrumbList`; audit
  `venues.$slug.tsx`, `shows.$slug.tsx`, industry routes for the same pattern.
- `cities.ts`: retire `streetAddress`/`postalCode`/`latitude`/`longitude` usage for schema;
  keep lat/long only if used for drive-time display.
- `page-proof.ts`: populate `CITY_PROOF` and `VENUE_PROOF` for the tier-1 markets using
  `facts`, `firstHand`, `contact`, `trackRecord`.
- `city-context.tsx`: add setters from BoothFinder / venue / show routes and a `?city=` param;
  export a `useCityLabel()` for copy interpolation; keep SSR-null behaviour.
- `index.tsx`, `PageLayout.tsx`, `QuoteForm.tsx`, `SiteFooter.tsx`: consume the city label for
  headlines and form defaults, neutral fallback everywhere.
- Copy pass across `cities.ts` intros, `regions.ts`, `events.ts` to remove nationality-first
  phrasing outside Atlantic Canada.
