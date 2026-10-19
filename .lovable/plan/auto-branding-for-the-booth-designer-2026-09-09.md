# Auto-branding for the booth designer

Today the designer pulls a logo and two colours from a website and can flood every wall with one colour. This makes it do what a real booth designer does: put the brand on the booth, in the right places, on every structure — with two simple looks to choose from.

## Two looks

When someone enters their website (or uploads assets), they pick one of two directions:

1. **Photo look** — hero/lifestyle imagery from their site fills the large wall panels, with the logo placed over a clean area and a colour band anchoring counters and towers.
2. **Colour look** — no photography. Brand colours only: primary on the main graphic surfaces, secondary as accent bands and returns, logo reversed in white or dark depending on contrast.

Either look can be re-applied at any time with one button ("Brand my booth"), and every individual surface can still be changed by hand afterwards.

## Where the logo goes (design rules, not random)

Standard exhibit practice, applied automatically:

- Back wall: logo top-centre, sized to about 1/3 of the wall width, kept above eye level (roughly 1.5–2.4 m off the floor).
- If the wall carries a photo whose busy side is centre or right, the logo shifts to top-left with a clear margin — same rule a designer uses to keep the mark legible.
- Side/return walls: logo omitted or small at the top outer corner, so it isn't repeated three times in one sightline.
- Counters: logo centred on the front face, sized to the counter width, never wrapping the corner.
- Towers: logo near the top, vertical stack of colour below.
- Storage room: treated as a full graphic surface — brand colour or photo, logo centred on the aisle-facing side only.
- Overhead sign: logo centred, one per face, largest permitted size.
- Contrast is checked automatically; the logo flips between the light and dark version of the mark so it never sits dark-on-dark.

## Pulling assets from the website

The existing website reader is extended to also collect candidate photography (hero/OG images and the largest in-page images), a wider colour set, and both light and dark logo candidates. The customer sees the pulled images as thumbnails and can deselect any that shouldn't be used, or drop in their own.

## Attaching brand assets

A "Brand kit" area in the Branding tab accepts:

- Photos (JPG/PNG/WebP)
- Logo (PNG/SVG, transparent preferred)
- Brand guidelines (PDF)

Uploaded photos and logos are usable immediately in the mockup. Guidelines PDFs aren't parsed — they're carried through and delivered to our design team with the enquiry.

## Keeping it simple

- One "Brand my booth" button plus a Photo/Colour toggle is the whole primary interface.
- Per-surface overrides live where they already do, in the right-hand properties panel: image or colour, logo on/off, logo position (auto, top-centre, top-left, centred).
- Copy makes clear these are concept mockups; final print artwork is produced with our designers.

## Technical notes

- `types.ts`: extend `branding` with `mode: "photo" | "color"`, `logoLightUrl` / `logoDarkUrl`, `palette: string[]`, `images: {url, role}[]`, and `assets` (uploaded file metadata). Add per-object `graphic` fields: `imageUrl`, `logoPlacement` ("auto" | "top_center" | "top_left" | "center" | "none"), `logoScale`. Items (`ItemObject`) gain the same graphic block so counters, towers and storage rooms are brandable.
- New `src/lib/booth-builder/brandkit.ts`: pure functions for palette contrast/WCAG check, logo-placement resolution per object type and booth type, and image-role assignment (which photo goes on which wall by aspect ratio).
- `branding.functions.ts`: also return ranked image candidates (og:image, `<img>` over a size threshold, CSS background URLs), a colour palette of up to 6, and a second logo candidate; keep the 8s timeout and the existing failure messages. Images are referenced by URL, not proxied.
- New server helper for a "Brand my booth" apply pass, implemented client-side as a single `commit()` transaction over all objects so Undo reverts the whole re-brand.
- Uploads use the existing `FileAttach` component, held as object URLs in browser memory and passed as file metadata through `HandoffDialog`'s lead payload. Note: with no backend connected, uploaded files are not stored server-side; only their names/sizes reach the enquiry until Cloud storage is enabled.
- `Plan2D` shows a small logo marker and fill colour per object; `View3D` maps photo/colour and a logo decal plane onto wall, counter, tower, storage and hanging-sign meshes, with `THREE.TextureLoader` and `anisotropy` set, images loaded with `crossOrigin="anonymous"` and a graceful fallback to colour when a remote image blocks CORS.
- `summary.ts` gains a line describing the brand treatment for the hand-off.

## Out of scope

- Parsing brand guideline PDFs into rules.
- Font matching / typography rendering on walls.
- Persistent asset storage (needs Cloud).
