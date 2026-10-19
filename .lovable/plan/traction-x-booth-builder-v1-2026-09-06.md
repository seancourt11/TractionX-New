# Traction X Booth Builder — V1

This replaces the earlier drafts as the active plan. The trade show intelligence platform and the nine intelligence tools stay parked until this ships.

## What it is

A customer-facing booth concept builder at `/booth-builder`: pick a footprint and configuration, drop in walls, storage, towers, counters, TVs, furniture, flooring, lighting and hanging signs, brand it, light it, see it in 2D and 3D, then hand the concept to Traction X with only email, phone and show name.

Canva plus a room planner plus AI — not CAD. No connectors, fasteners, SKUs, weights, power, rigging or drawings anywhere in the interface.

## The five build stages

**Stage 1 — the editor core**
Project start screen (8 footprints + custom, inline/corner/peninsula/island, project name, website). Three-panel editor: object library left, workspace centre with a 2D/3D toggle, properties right. Full wall presets (10/20/30/40 ft backwalls, side returns, feature walls) plus 310/496/992 mm modular pieces with snapping, grouping, stacking and the four height presets (Standard 2418 / Tall 3410 / Extra Tall 4402 / Double 4836 mm). Customers see "Medium", "Tall"; the millimetres stay secondary.

**Stage 2 — the rest of the objects**
Storage rooms whose sizing behaviour changes by booth type (inline locked to 992 mm depth with a friendly override, island free in both directions), towers on the same modular grid, freely parametric counters (24–96" wide, built from real geometry, not a stretched model), TVs and touchscreens at fixed real sizes with wall snapping, the eight furniture pieces, and the full carpet and rolled-vinyl swatch sets.

**Stage 3 — graphics and light**
Full-coverage SEG graphics, solid colours, printed and die-cut logos, 3D backlit channel letters, visible-edge colour (white default — raw aluminium never appears). Lightbox as a property, not a duplicate object: whole booth toggle, per-object toggle, and per-section so half a backwall can be backlit. Lit graphics render brighter with an internal glow and soft spill, never neon. Overhead category: square, rectangular and halo banners with sizes, heights, single/double-sided, scale-to-booth recommendations and internal illumination.

**Stage 4 — AI and rules**
"Ask AI to update your booth" as a first-class panel. The AI never generates geometry — it emits approved structured commands (addWallPreset, setStorageHeight, setObjectLightbox, addHangingBanner and the rest of the list), receives the current booth JSON each turn so "make it taller" works, prefers presets, and snaps structural resizes to the modular grid. Each request is one undoable transaction with a plain-language summary. Alongside it, one central `validateBoothDesign(project)` layer handling the Standard Trade Show Rules toggle, inline/corner/peninsula/island sight-line guidance and hanging-sign checks — always warn and offer "Fix automatically" or "Keep anyway (needs Traction X review)", never block or delete.

**Stage 5 — branding, summary, lead**
Website branding extraction (logo, colours, headline, imagery) with manual fallback and a permanent "concept graphics only" note. Save/load, the visual concept summary, the concept-to-finished-booth flow graphic, "Turn This Into a Real Booth", and a three-field form: email, phone, show name. Everything else — full project JSON, every dimension and setting, warnings, and a render where practical — attaches to the lead automatically so the design can be reopened.

## Technical notes

- Structured project JSON is the single source of truth, in the exact shape given in the brief; every renderer and the AI read from it.
- 3D via react-three-fiber; 2D on a canvas layer sharing the same scene model, with overhead objects dashed.
- Three sizing systems kept separate in the model: modular parametric (walls, storage, towers, headers), free parametric (counters, LED runs), fixed products (TVs, furniture).
- Regulation logic lives only in the validation layer, never inside components.
- Lightbox is a boolean property on objects and wall sections — no duplicate object types.
- AI runs server-side through Lovable's built-in AI with a strict command schema; the key never reaches the browser.
- Lead submission needs a backend to store the project JSON and render — I'll enable the built-in backend (database + storage) when we reach Stage 5.

## Deliberately not in V1

Connector/fastener/SKU logic, BOM, weights, electrical, LED power, rigging or structural engineering, fabrication drawings, cut lists, freight/drayage, inventory, scheduling, CAD export, exhibitor-manual parsing (the architecture leaves room for show-specific rule profiles later).

## Rough credits

| Stage | Approx. credits |
| --- | --- |
| 1 Editor core (2D/3D, walls, snapping, heights) | 90–140 |
| 2 Storage, towers, counters, AV, furniture, flooring | 70–110 |
| 3 Graphics, branding treatments, lightbox, overhead | 70–110 |
| 4 AI commands + regulations engine | 60–100 |
| 5 Website branding, summary, save, lead capture | 50–80 |

Roughly **340–540 credits** for the full V1, and Stage 1 alone gets you a usable editor to react to. AI usage afterwards costs a fraction of a cent to a few cents per command.

## Where it lives

`/booth-builder` on this site, linked from the header, homepage and the booth-size, show and city pages — it becomes the strongest lead magnet on the site. Start at Stage 1.
