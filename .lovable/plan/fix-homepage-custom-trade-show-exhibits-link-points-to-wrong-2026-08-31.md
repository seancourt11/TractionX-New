# Fix: Homepage "Custom Trade Show Exhibits" link points to wrong page

## Problem
On the homepage, the first offering card titled **"Custom Trade Show Exhibits"** currently links to `/custom-trade-show-floor-plans` (the floor plan design/management service page). It should link to the custom exhibits product page.

## Proposed change
In `src/routes/index.tsx`, change the `to` value for the "Custom Trade Show Exhibits" offering from:

```tsx
to: "/custom-trade-show-floor-plans" as const,
```

to:

```tsx
to: "/products/custom-trade-show-exhibits" as const,
```

This matches the route used elsewhere on the site (e.g., `experience-studio.tsx`) and correctly sends visitors interested in custom exhibit builds to the custom exhibits page, while leaving the floor plan service page linked from its own CTAs and navigation.

## Verification
- Confirm the link resolves to the existing `/products/custom-trade-show-exhibits` route.
- Smoke-test the homepage card click in the preview.
