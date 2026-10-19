/**
 * Camera presets for the 3D view.
 *
 * Renders only look composed if the camera is placed deliberately, so the
 * builder offers the same handful of angles our design team shoots: a hero
 * three-quarter, the view an attendee gets walking the aisle, the opposite
 * corner, an eye-level walk-in and a plan view. The concept pack uses the
 * same list so the PDF matches what the customer saw on screen.
 *
 * All numbers are metres, in world space, with the booth centred on the
 * origin and the aisle side at +Z.
 */

export type CameraViewId = "hero" | "aisle" | "corner" | "walkin" | "plan";

export type CameraView = {
  id: CameraViewId;
  label: string;
  /** Short line printed under the render in the concept pack. */
  caption: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

export const CAMERA_VIEW_IDS: CameraViewId[] = ["hero", "aisle", "corner", "walkin", "plan"];

/** Angles used for the concept pack, in page order. */
export const PACK_VIEW_IDS: CameraViewId[] = ["hero", "aisle", "corner", "walkin"];

/**
 * Builds the preset for a booth of this footprint. Widths and depths are in
 * metres; every angle is scaled off the footprint so a 10×10 and a 20×30 both
 * fill the frame.
 */
export function cameraView(id: CameraViewId, widthM: number, depthM: number): CameraView {
  const span = Math.max(widthM, depthM);
  const centre: [number, number, number] = [0, Math.min(1.6, span * 0.22), 0];

  switch (id) {
    case "aisle":
      return {
        id,
        label: "Aisle view",
        caption: "What an attendee sees walking the aisle.",
        position: [0, 1.75, depthM / 2 + span * 1.15],
        target: [0, 1.5, 0],
        fov: 42,
      };
    case "corner":
      return {
        id,
        label: "Opposite corner",
        caption: "The approach from the other end of the aisle.",
        position: [-widthM * 0.95 - span * 0.35, span * 0.8, depthM * 0.85 + span * 0.4],
        target: centre,
        fov: 40,
      };
    case "walkin":
      return {
        id,
        label: "Walk-in (eye level)",
        caption: "Standing inside the booth, at eye height.",
        position: [widthM * 0.22, 1.65, depthM * 0.35],
        target: [-widthM * 0.1, 1.5, -depthM * 0.45],
        fov: 55,
      };
    case "plan":
      return {
        id,
        label: "Top down",
        caption: "Layout and circulation from above.",
        position: [0.001, span * 2.1, 0.001],
        target: [0, 0, 0],
        fov: 38,
      };
    case "hero":
    default:
      return {
        id: "hero",
        label: "Hero three-quarter",
        caption: "The main presentation angle.",
        position: [widthM * 0.85 + span * 0.35, span * 0.85, depthM * 0.9 + span * 0.5],
        target: centre,
        fov: 40,
      };
  }
}
