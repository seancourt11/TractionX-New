# Autocomplete for city and show fields in forms

## Current state

The "Show city" fields in the quote modal, 3D design modal and multi-step quote form are plain free-text inputs with a "Las Vegas" placeholder. Typing "las" shows no suggestions. Only the cost estimator uses fixed city-tier chips, and the Cmd+K site search has real matching — the lead forms do not.

Prefill is also inconsistent: the 3D design modal and quick-quote modal read the remembered city from the city-context (set when someone lands on a city page) and pre-populate the field. The main quote modal only prefills when a page explicitly passes a city prop, and the multi-step quote form, cost estimator and pricing-guide gate never prefill.


## What to build

A reusable typeahead input used by every lead form where someone types a place or a show.

- Type 2+ characters to see a dropdown of matches, ranked with exact prefix matches first ("las" -> Las Vegas, Las Palmas).
- Suggestions come from the existing city list (139 cities, with country/region shown as a subtitle) and, in the show field, the show dataset.
- Keyboard support: arrow keys, Enter to pick, Escape to close; mouse/tap works too.
- Free text is always allowed — a visitor can type a city that isn't in our list and still submit. Nothing becomes a required dropdown.
- Picking a known city stores its slug in the lead metadata, so the admin lead view and routing know exactly which market it is.
- Matches the existing dark purple-accent styling and chip form language.

## Consistent city and show prefill

Every lead form reads the remembered city from the city-context so a visitor who arrived on a city page sees it already filled in — quote modal, quick quote, 3D design modal, multi-step quote form, cost estimator (auto-selects the matching city tier) and pricing-guide gate (auto-selects USA/Canada region). The value stays editable, and an explicit prop from the page still wins over the remembered city.

Shows and venues get the same memory. Landing on a show page, venue page or directory/calendar entry remembers that show (name, slug, host city and dates) the same way city pages do today, so:

- The show/event field prefills with the show name.
- The city field prefills with that show's host city when no city is already remembered.
- Timeline chips preselect the band matching how far out the show is (e.g. a show 6 weeks away preselects the rush band).
- Venue pages remember their city, and a show remembered from any page beats a stale one.

Opening a form from a show or venue page always wins over the remembered value, and the lead metadata records the show slug so the admin lead view shows which show drove it.


## Where it applies

- Quote modal (instant + customize)
- 3D design modal and quick quote modal in the global CTA
- Multi-step quote form's city step
- Booth finder city filter stays a select, but gains type-to-filter
- Show/event fields where a show name is typed get the same treatment against the show list


## Technical notes

- New `src/components/Autocomplete.tsx` (combobox semantics: `role="combobox"`, `aria-expanded`, `aria-activedescendant`) plus `src/lib/place-suggest.ts` holding the matcher over `CITIES` from `src/data/cities.ts` and shows from the show data, reusing the scoring approach in `src/lib/search-index.ts`.
- Matching is client-side over already-bundled data — no network calls, no backend, no third-party places API.
- Callers pass `value`/`onChange` plus an optional `onSelectEntry` to capture the matched slug into lead `meta`.
- Show memory extends the existing `src/lib/city-context.tsx` pattern: a parallel localStorage entry with the same 30-day TTL and change-event, set by a `useMarkShowVisit(slug)` hook called from show, venue and directory pages, read by a `useShowContext()` hook. SSR-safe — null until hydration, so rendered HTML stays canonical.
