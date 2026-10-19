# Booth Builder: match the quality bar of BoothDesign.app

Goal: keep our builder simple and client-facing, but adopt the few things that make competitor tools feel professional — shareable client presentations, AR/real-scale viewing, better camera work, and a proper concept pack output.

## What competitors do well

- Browser-based 3D design plus a real-scale AR walkthrough clients can open on a phone, nothing to install.
- Send-to-client links instead of file exports.
- Builder-ready plan output (dimensions, part list) alongside the pretty render.
- Camera/sightline tools so the render looks composed, not like a screenshot.

## What we add (in priority order)

### 1. Presentation views and better renders
- Preset camera angles: Front three-quarter, Aisle view, Corner, Eye-level walk-in, Top-down plan.
- Smooth transitions between angles, plus a slow turntable toggle for demos.
- Higher-resolution still export (2x/3x) with the current presentation styling; no UI elements in the image.

### 2. Concept pack (one click)
- Generates a multi-page PDF: cover with project/show name, 4 render angles, dimensioned 2D plan, component list with sizes and finishes, graphics list, and the Traction X promises block.
- Replaces "one PNG" as the main deliverable clients receive.

### 3. Share link for clients
- "Share with client" produces a read-only viewer link: 3D orbit, preset angles, summary, and the quote CTA — no editing tools.
- The design is stored so the link keeps working; requires turning on our backend (Lovable Cloud) for saved designs and share tokens.

### 4. AR / real-scale preview
- Export the booth as a 3D model file and open it in the phone's built-in AR viewer from the share link ("View at real scale").
- Works on iOS and Android without an app install; desktop falls back to the 3D viewer.

### 5. Small technical-soundness wins
- On-screen dimension labels in 2D plan (wall lengths, aisle openings, counter setbacks).
- Sightline check: flags when tall structures block the view from the main aisle.
- Snap guides and alignment hints while dragging.
- Height/regulation warnings shown inline on the object, not just in the rules bar.

## Technical notes

- Camera presets: animate the R3F camera to stored positions; turntable via a slow azimuth loop.
- High-res export: render off-screen at a scaled pixel ratio, then restore.
- Concept pack: compose pages client-side (canvas renders + jsPDF), reusing the existing summary data.
- Share link: new route `/booth-builder/view/$token`; project JSON + composed graphics stored in Cloud with a public read policy scoped to the token.
- AR: `GLTFExporter` from three to produce a `.glb`, served from storage and opened via `<model-viewer>` for Android Scene Viewer / iOS Quick Look.
- Sightlines: simple ray/occlusion test from aisle-facing sample points against object bounding boxes.

## Staging

- Stage A: camera presets, turntable, high-res export, dimension labels, snap guides.
- Stage B: concept pack PDF.
- Stage C: Cloud-backed save + client share link.
- Stage D: AR real-scale viewing from the share link.
- Stage E: sightline check and inline warnings.

Stages A, B and E need no backend. Stages C and D require enabling our backend.
