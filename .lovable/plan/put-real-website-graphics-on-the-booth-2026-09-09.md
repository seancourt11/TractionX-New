# Put real website graphics on the booth

Right now the builder does read a website, but the artwork never appears on the booth. Two reasons:

1. Pictures are pulled straight from the customer's own website address. Most big sites (Apple included) block other sites from re-using their images that way, so the booth surface silently falls back to plain colour.
2. The "Ask AI" box has no way to brand a booth at all — it can add walls and change colours, but it cannot fetch a website or place artwork.

This plan fixes both and makes the AI box the main way to do it.

## What the customer will be able to do

Type into Ask AI:

> "Brand this booth like apple.com"

and the builder will:

- read that website,
- pull the logo, brand colours, hero photography, hero headline and the call-to-action wording,
- build proper booth panels from it, and
- place them the way an exhibit designer would.

The Branding tab keeps its website box and the Photo / Colour toggle — same engine, two front doors.

## What goes where

- **Back wall** — the main hero panel: photo, headline, call-to-action line, logo high and clear.
- **Other walls** — supporting photography or brand colour, logo used sparingly so it isn't repeated across one sightline.
- **Counters** — logo centred on the front face over a brand-colour band.
- **Towers** — logo near the top, brand colour below.
- **Storage rooms and hanging signs** — full brand surface, logo centred on the aisle-facing side.

Everything remains editable by hand afterwards, and one Undo takes the whole re-brand back.

## Panels, not just raw photos

Instead of stretching a website photo onto a wall, each large surface gets a composed panel: the photo, a readable headline, the call-to-action wording, and the logo, laid out to booth proportions with contrast checked so text and logo never sit dark-on-dark. That is what makes it read as a booth graphic rather than a screenshot. Surfaces with no suitable photo fall back to a colour panel with the same headline and logo treatment.

## Honest limits

- Some sites load their imagery only after the page runs in a browser; for those we fall back to the social-preview image, the logo and the colours, and say so in plain language rather than failing silently.
- Pulled artwork is for concept mockups only — the copy on screen already says final print artwork is produced with our designers.

## Technical notes

- **New image proxy** `src/routes/api/public/brand-image.ts`: server route that takes a `url`, validates it is http/https and not a private address, fetches with a timeout, rejects non-image content types and anything over ~8 MB, and streams it back with permissive CORS and a long cache header. Every remote brand image (site photos and logos) is referenced through this route in `<img>` previews and in the 3D `THREE.TextureLoader`, which is what actually makes the graphics show up.
- **Stronger extraction** in `branding.functions.ts`: add `<link rel=preload as=image>`, `<picture>/<source srcset>` largest candidate, JSON-LD `image`, `og:image:secure_url`; capture hero text (first `<h1>`, its following paragraph, and the first prominent anchor/button label) and return it as `hero: { headline, subhead, cta }`; widen colour detection to `rgb()/rgba()`, CSS custom properties, and gradients, and optionally fetch the first same-origin stylesheet (same 8 s budget) for colour and logo hints.
- **Panel composition** — new `src/lib/booth-builder/graphic-panel.ts`: browser-canvas composition (same approach as `social-visual.ts`) producing a data-URL texture per surface from `{ imageUrl (proxied), headline, cta, logoUrl, palette, aspect }`, with WCAG contrast checks reusing `brandkit.ts` helpers, a dark scrim behind text over busy photos, and a colour-only variant. Results cached per surface in the project object's `graphic.composedUrl` so re-renders don't recompose.
- **Types** (`types.ts`): `branding.hero?: { headline; subhead; cta }`; per-object `graphic.composedUrl?`, `graphic.headline?`, `graphic.cta?`.
- **Brand kit** (`brandkit.ts`): `applyBrandKit` assigns hero copy to the back wall only, supporting photos elsewhere, and marks which surfaces need composition. Placement rules already implemented stay as they are.
- **AI commands** (`commands.ts` + `ai.functions.ts` prompt): add `brandFromWebsite { url, mode? }` and `applyBrandKit { mode }`, plus `setSurfaceImage { target, imageIndex }`. `brandFromWebsite` is resolved in `AiPanel.tsx` by calling `extractBranding` before the commit, so the whole re-brand is still one undoable transaction; the AI prompt gains examples ("brand this booth like apple.com", "use colours only").
- **3D** (`View3D.tsx`): texture URLs prefer `composedUrl`, then the proxied image; keep `crossOrigin="anonymous"`, add `SRGBColorSpace`, anisotropy, and colour fallback on load error.
- **Summary** (`summary.ts`): mention the source website and the treatment in the hand-off text.

## Out of scope

- Rendering the customer's actual brand typeface (we use our stack fonts on composed panels).
- Running websites in a real browser to capture late-loading imagery.
- Storing pulled or uploaded artwork server-side — still session-only until Cloud is enabled.
