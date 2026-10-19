# Traction X Booth Designer — bring the builder up to the spec

The booth builder at `/booth-builder` already covers a large part of this brief: a real React Three Fiber editor (not a mockup), booth sizes and types, parametric walls, storage, towers, counters, screens, furniture, flooring, graphics and lightboxes, brand extraction from a website, AI commands, warnings, camera presets, high-res render capture and a concept-pack PDF. So this is not a rebuild — it is finishing the gaps and lifting the visual quality, keeping the same URL and saved projects.

Also folded in: the outstanding notes from the last message — every structure fully branded, counter tops always white, real company logos, and higher-end flooring and materials.

## Stage 1 — Photorealism and materials (highest impact)

- Real material library instead of flat colours: matte white, matte black, custom paint, light/white/dark oak, walnut, black wood, concrete, brushed aluminium, fabric, SEG fabric, gloss and frosted acrylic — each with proper roughness, sheen and reflection so wood reads as wood and metal as metal.
- Higher-end flooring: real carpet weave and vinyl/wood plank surfaces with correct scale and subtle reflection, replacing the current tinted plane.
- Better light: a higher-resolution hall environment, softer and more accurate shadows, ambient occlusion, gentler bloom used only on lit graphics and screens, and a small exposure/white-balance pass so renders look shot rather than lit by a game engine.
- Convention hall dressing: neutral distant architecture, ceiling light grids, optional neighbouring booths and optional people, with an on/off toggle.
- Quality modes in the toolbar: Fast while editing, High, and Presentation for stills; automatic step-down on weak machines.

## Stage 2 — Branding correctness

- Every structure branded by default when a brand kit is applied or the AI builds a booth: closets, towers, counters, headers, hanging signs, plinths — not just walls.
- Counter tops always white, regardless of the brand colour or finish.
- Real logos: prefer the site's own SVG/high-resolution mark (favicons, `<link rel="icon">`, inline SVG, `og:logo`, common logo paths) instead of a generic hero image, keep transparency, never stretch it, and offer manual upload/replace when the site hides its mark behind JavaScript.
- Graphic controls per surface: Fit / Fill / Stretch / Centre, nudge and scale, separate artwork per wall face, logo placed independently of a full-wall file.

## Stage 3 — Editing feel

- Drag-and-drop from the library into the 3D view, plus on-object move/rotate handles with snapping to floor, walls, footprint edges, neighbouring objects and a grid; nothing floats, nothing leaves the booth unless the user overrides.
- Simple Width / Height / Depth / Rotation fields; X/Z hidden behind "Advanced".
- Redo alongside undo, with Cmd/Ctrl+Z and Cmd/Ctrl+Shift+Z.
- Starter templates (Minimal, Modern Tech, Warm Wood, Corporate, Luxury, Product Demo, Meeting Focused, LED, Open Lounge, Storage + Reception) built from the same parametric parts, offered next to "Start from empty".
- Walkthrough mode at eye level with an obvious exit, and Front / Left / Right / Top / Perspective / Reset buttons beside the existing angles.
- Library gaps to add: half wall, arch, overhead beam, column, door, slat wall, curved and lightbox counters, plinths, LED wall, touchscreen, shelving, literature rack, iPad stand, glass case, plants and planters, spotlights and LED strip.

## Stage 4 — Accounts, saving, sharing, quoting (needs Lovable Cloud)

Turning on our backend gives us logins, stored projects, uploads and share links.

- Design first, sign in only when saving, sharing or submitting. Email/password plus magic link.
- Projects with name, company, show, booth number, size, type, scene, thumbnail and status (Draft / Submitted / In Review / Quoted).
- Uploaded logos and artwork stored per project so a design reopens exactly as it was.
- Render gallery: every high-resolution image kept with the project.
- Read-only share link at `/design/view/<token>` — orbit, zoom, walkthrough, fullscreen, renders, "Designed with Traction X" and a contact button; no editing, no account needed.
- Request Quote form (name, company, email, phone, show, booth number, date, budget, comments) that automatically attaches the design, dimensions, renders and uploaded artwork, so the customer never re-explains the booth.
- Review screen before submitting: details plus three auto-generated views.

## Stage 5 — Assistant and rules

- "Design my booth" free-text panel that produces a real editable booth, not a picture — building on the AI command layer already in place.
- Warnings extended: blocked entrances and storage doors, unusable aisles, odd screen heights, low hanging structures, objects outside the footprint. Always advisory.

## Technical notes

- Stack stays React + TypeScript + R3F + drei + postprocessing; state stays in the existing store (same behaviour as Zustand, no rewrite needed).
- Scene remains structured JSON as the single source of truth; new material and graphic fields are added to the existing object model so saved designs keep working.
- Furniture and detailed props move to GLB assets with Draco/KTX2 where it helps, loaded per category rather than all at once; parametric structures stay procedural. Assets are served from our own asset storage, with room to move to R2 later.
- Photorealistic AI enhancement is left as a provider interface only — no image model wired up in this version.

## Order and cost

Stages 1 and 2 first (they are what makes the tool feel professional), then 3, then 4 once you confirm turning the backend on, then 5.

| Stage | Credits |
| --- | --- |
| 1 — Photorealism, materials, flooring, hall, quality modes | 90–140 |
| 2 — Branding on every structure, white counter tops, real logos, graphic controls | 40–70 |
| 3 — Drag/drop, snapping, redo, templates, walkthrough, extra library items | 90–140 |
| 4 — Backend: logins, saved projects, uploads, renders, share links, quote requests | 90–150 |
| 5 — Design assistant panel and extended warnings | 40–70 |
| **Total** | **350–570** |

These are build estimates and depend on how many rounds of visual tuning you want — photorealism is the one stage where extra passes are likely, so budget nearer the top of its range. Running costs afterwards are small: the backend has a free monthly allowance, and each AI design request costs a fraction of a cent to a few cents.

Not in this version: fabrication drawings, BOM, cut lists, extrusion/electrical/rigging engineering, pricing algorithms, CAD export, inventory, scheduling, freight.
