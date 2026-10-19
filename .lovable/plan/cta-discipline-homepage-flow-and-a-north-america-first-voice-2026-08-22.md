&nbsp;

# CTA discipline, homepage flow, and a North America first voice

Four changes, all on the homepage and shared header/CTA components. No pricing, data or backend changes.

## 1. Fewer competing asks in the same spot

The number of CTAs down a long page is right for this market. The problem is how many
different asks sit side by side in one place.

- **Header goes from five actions to two.** Keep Search (icon), the Saved counter (only
when something is saved) and one primary button: Free 3D design. "Request a Quote" stays
as a quieter outline button; "Book a 10-min call" drops out of the bar and moves into the
mobile menu and the quote/design modals, where it already lives as a secondary path.
- **CTA band goes from three peers to two.** Free 3D design (primary) + Get quote
(secondary). Booking stays as a small text link under them, not a third button. This band
appears on 52 pages, so the fix applies everywhere at once.
- **Stop stacking prompts.** The first-visit session nudge is suppressed once a visitor has
already opened a quote or design modal, saved a booth, or used the Booth Finder — so no
one gets the same offer four ways in thirty seconds.
- Mobile bottom bar stays at three actions. It is already correct.

Net effect: the same coverage, one obvious primary action per screen.

## 2. Move the Booth Finder

Today it sits inside the hero, below three CTAs and the city badge — buried on mobile,
where the current viewport puts it well below the fold.

Move it to its own full-width band directly under the hero, above the promise bar, with a
short heading ("Find your booth: city, size, budget"). It becomes the first thing after the
headline instead of the fifth thing in it, and the hero is left with the headline, one
primary button and one secondary.

## 3. Resources on the homepage

Yes — worth adding, and we already have the content. A new section after the "Which is
right for me?" triage, before the client logos:

- Four cards pulled from `EXHIBITOR_RESOURCES` — Budget Template, Deadline Tracker, ROI
Calculator, and the booth-size pricing guide — each with its kind, read time and a link
to its own indexable URL.
- One link to the full `/exhibitor-resources` hub.

This gives the homepage an internal-link path into the resource cluster (currently reachable
only from the nav), and gives non-ready visitors somewhere to go that isn't a form.

## 4. North America first voice

The homepage currently says "Globally" in the H1, "6 continents", "bespoke projects
globally", and an "international trade show services" section. That reads like a broker,
not the Canadian/US builder you are, and it dilutes the city pages we rank with.

- H1 becomes Canada/US led — trade show exhibits and brand activations across Canada and
the United States — with global capability stated as a supporting line, not the headline.
- Hero subhead and intro lead with North American show floors (Las Vegas, Toronto,
Chicago, Vancouver, Orlando, Halifax) and keep one sentence noting we ship worldwide.
- The "international services" section is reframed as coverage: a Canada/US map-style list
of our core markets linking to existing city pages, with international handled in a short
closing paragraph.
- Stat strip swaps "6 continents served" for something North American and true — number of
cities we deliver to across Canada and the US.
- Title, meta description and the short-answer block follow the same order: Canada and the
US first, global second.

Nothing about the actual service claim changes — we still say we deliver worldwide, it just
stops being the first thing every visitor and crawler reads.

## Technical notes

- `SiteHeader.tsx`: remove the header `BookMeetingButton`, keep it in the mobile menu.
- `PageLayout.tsx` `CTABand`: demote `BookMeetingButton` to a text link, keep `QuoteButton`
  - `Design3DButton`.
- `GlobalCta.tsx`: the session-nudge effect gains a suppression flag written when any modal
opens, a booth is saved, or the finder is submitted; stored per session like the current
flag.
- `index.tsx`: lift `<BoothFinder />` out of the hero into its own `<section>`; add the
resources section reading from `src/data/exhibitor-resources.ts`; rewrite hero, intro,
global-reach section, stats, `SEO_TITLE`, `SEO_DESCRIPTION` and `SHORT_ANSWER` copy.
- Homepage FAQ answer about where we work is reworded to lead with Canada and the US.