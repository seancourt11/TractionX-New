# Complete booth branding and realistic furnishings

The booth designer will brand every graphic-bearing structure and replace the current box-shaped screens and furniture with realistic, lightweight 3D pieces. We will use a hybrid library: polished standard products now, with exact Traction X rental items able to replace them later.

## 1. Brand every structure

- Keep walls, counters, towers, storage closets, and overhead signs in the automatic “Brand my booth” pass.
- Give each of those structures the same manual controls: image/colour treatment, logo on/off, logo position, and logo size.
- Apply artwork to the correct visible faces rather than only one generic face:
  - counters: customer-facing front;
  - storage closets: aisle-facing wall;
  - towers: visible primary faces without excessive logo repetition;
  - rectangular and square hanging signs: each enabled printed side;
  - halo signs: artwork and logo repeated cleanly around the curved face.
- Keep TVs and ordinary furniture unbranded by default because they are products rather than graphic surfaces. Branded kiosks or custom furniture can be added later as dedicated products.
- Ensure newly added structures receive the active brand treatment automatically instead of requiring “Brand my booth” to be pressed again.

## 2. Make TVs look real

- Replace solid boxes with detailed screen assemblies: slim bezel, dark glass display, rear casing, wall bracket or freestanding kiosk base, and correct proportions for each listed screen size.
- Show tasteful neutral sample content on the display so it reads as a working TV, while keeping the screen distinct from booth graphics.
- Preserve current screen size, position, rotation, and mounting-height controls.

## 3. Add a realistic furniture library

- Replace generic blocks with lightweight, commercially usable CC0 3D models for stools, side chairs, café tables, coffee tables, meeting tables, lounge chairs, sofas, and literature racks.
- Normalize every model to the dimensions already shown in the library, clone repeated pieces safely, and enable appropriate shadows and materials.
- Keep loading isolated to each model so the booth remains visible while furnishings load, with a simple fallback if an asset fails.
- Add clear library thumbnails so customers can recognize each item before placing it.

## 4. Prepare for exact Traction X inventory

- Add a model reference to furniture and AV presets so a standard asset can later be replaced without changing saved booth layouts.
- Preserve dimensions and product identifiers when replacements are made.
- When exact matching is ready, the best source is a GLB/GLTF model. If unavailable, front, side, back, and three-quarter product photos on a plain background are useful references; a single photo can guide appearance but cannot create an exact interactive 3D match reliably.

## 5. Match the look of your renderings

Your reference images set the target: a dark exhibit hall, a ceiling grid of warm lights, a polished reflective floor, soft shadows, glowing screens and crisp graphics. The live designer will be taken toward that look:

- Dark hall environment with a ceiling light grid and subtle hall walls behind the booth.
- Polished floor with soft reflections and grounded contact shadows under every structure.
- Warmer, softer lighting instead of the current flat studio lighting, plus accent lights over graphic walls and glowing screens and lightboxes.
- A clean presentation view that hides grid lines and editing handles for screenshots and sharing.

Honest limit: the designer runs live in a web browser, so it will look very good but not identical to a studio rendering like the ones you sent, which are produced offline by our design team. To bridge that, the tool will offer a high-quality still-image export that renders more slowly and looks noticeably sharper than the interactive view, and every concept can still be finished by our designers at full rendering quality.

## 6. Visual and interaction checks

- Test automatic and manual branding on every supported structure in both photo and colour modes.
- Check square, rectangular, double-sided, and halo hanging signs from multiple camera angles.
- Verify every TV and furniture item at desktop and mobile sizes, including duplicate items, rotation, shadows, loading, selection, and saved-design restoration.
- Keep the complete scene within a lightweight web performance budget and confirm no missing-model, rendering, or browser errors.
- Compare the live view against the supplied renderings and tune lighting, reflection and contrast until they read as the same style family.

## Technical details

- Use compact, locally hosted CC0 GLB assets for recognizable furniture; verify each licence before inclusion and do not hotlink third-party models.
- Use optimized procedural geometry for TVs because their exact dimensions and mounting variants matter more than model complexity.
- Load GLBs inside per-model Suspense boundaries, clone cached scenes for repeated objects, normalize their bounds, and retain procedural fallbacks.
- Extend the preset data with stable visual/model keys rather than embedding rendering decisions in saved projects.
- Build the hall look with a locally defined environment (no third-party CDN presets), soft shadow maps, tone mapping, contact shadows, a reflective floor and a light bloom pass, with quality scaling to protect mobile performance.
- High-quality export renders at higher pixel density with heavier settings on demand rather than continuously.
