/**
 * Plain-language concept summary.
 *
 * Reads the project JSON and produces the lines shown in the hand-off panel and
 * attached to the lead, so a customer (and our team) can read a design back
 * without opening the editor.
 */

import { brandSummaryLine } from "./brandkit";
import { FLOORING_SWATCHES, HEIGHTS, mmToFt } from "./presets";
import { isWall, mmLabel, wallWidthMm } from "./project";
import type { BoothProject, ItemObject } from "./types";

export type SummarySection = { title: string; lines: string[] };

const KIND_LABEL: Record<string, [string, string]> = {
  storage: ["storage room", "storage rooms"],
  tower: ["tower", "towers"],
  counter: ["counter", "counters"],
  tv: ["screen", "screens"],
  furniture: ["furniture piece", "furniture pieces"],
  hanging: ["hanging sign", "hanging signs"],
};

const plural = (n: number, kind: string) =>
  `${n} ${KIND_LABEL[kind]?.[n === 1 ? 0 : 1] ?? (n === 1 ? "item" : "items")}`;

export function buildSummary(project: BoothProject): SummarySection[] {
  const { widthMm, depthMm, boothType, boothSize } = project.project;
  const objects = project.design.objects;
  const walls = objects.filter(isWall);
  const items = objects.filter((o): o is ItemObject => o.type === "item");
  const sections: SummarySection[] = [];

  sections.push({
    title: "The space",
    lines: [
      `${Math.round(mmToFt(widthMm))} ft × ${Math.round(mmToFt(depthMm))} ft ${boothType} booth (${boothSize}).`,
      project.project.showName ? `For ${project.project.showName}.` : "Show not set yet.",
    ],
  });

  if (walls.length) {
    const runMm = walls.reduce((s, w) => s + wallWidthMm(w), 0);
    const heights = [...new Set(walls.map((w) => HEIGHTS.find((h) => h.id === w.heightPreset)?.label ?? "Standard"))];
    const lit = walls.filter((w) => w.lightbox || w.sections.some((s) => s.lightbox)).length;
    const logo = walls.find((w) => w.logo && w.logo.treatment !== "none")?.logo?.treatment;
    sections.push({
      title: "Walls",
      lines: [
        `${walls.length} wall${walls.length === 1 ? "" : "s"}, ${mmLabel(runMm)} of frontage in total.`,
        `Height${heights.length === 1 ? "" : "s"}: ${heights.join(", ").toLowerCase()}.`,
        lit ? `${lit} backlit.` : "No backlighting on the walls.",
        logo
          ? `Logo treatment: ${logo.replace(/_/g, " ")}.`
          : "No logo treatment chosen yet.",
      ],
    });
  }

  const byKind = items.reduce<Record<string, ItemObject[]>>((acc, o) => {
    (acc[o.kind] ??= []).push(o);
    return acc;
  }, {});

  const structureLines = ["storage", "tower", "counter"]
    .filter((k) => byKind[k]?.length)
    .map((k) => {
      const list = byKind[k]!;
      const lit = list.filter((o) => o.lightbox).length;
      return `${plural(list.length, k)}${lit ? ` (${lit} illuminated)` : ""} — ${list
        .map((o) => `${o.name} ${mmLabel(o.widthMm)} wide`)
        .join(", ")}.`;
    });
  if (structureLines.length) sections.push({ title: "Structures", lines: structureLines });

  const kitLines = ["tv", "furniture"]
    .filter((k) => byKind[k]?.length)
    .map((k) => `${plural(byKind[k]!.length, k)} — ${byKind[k]!.map((o) => o.name).join(", ")}.`);
  if (kitLines.length) sections.push({ title: "Screens & furniture", lines: kitLines });

  if (byKind["hanging"]?.length) {
    sections.push({
      title: "Overhead",
      lines: byKind["hanging"]!.map(
        (o) =>
          `${o.name}, ${mmLabel(o.widthMm)} wide, bottom at ${mmLabel(o.hangHeightMm ?? 3660)}${
            o.doubleSided ? ", double-sided" : ", single-sided"
          }${o.lightbox ? ", internally lit" : ""}.`,
      ),
    });
  }

  const floor = FLOORING_SWATCHES.find((f) => f.id === project.design.flooring.swatchId);
  sections.push({
    title: "Finishes & light",
    lines: [
      floor ? `${floor.family}: ${floor.label}.` : "Bare show floor — no flooring chosen.",
      project.design.wholeBoothIlluminated
        ? "Whole booth set to illuminated."
        : "Lighting applied piece by piece.",
      `Visible edges: ${[...new Set(walls.map((w) => w.edgeColor))].join(", ") || "white"}.`,
    ],
  });

  const assets = project.branding.assets ?? [];
  if (project.branding.website || project.branding.logoUrl || assets.length) {
    const branded = objects.filter((o) => o.graphic?.imageUrl || (o.graphic?.logoPlacement ?? "none") !== "none");
    sections.push({
      title: "Branding",
      lines: [
        project.branding.website ? `Pulled from ${project.branding.website}.` : "Colours set manually.",
        `Primary ${project.branding.primaryColor}, secondary ${project.branding.secondaryColor}.`,
        brandSummaryLine(project),
        ...(project.branding.hero?.headline
          ? [
              `Hero message on the main wall: "${project.branding.hero.headline}"${
                project.branding.hero.cta ? ` with a "${project.branding.hero.cta}" call to action.` : "."
              }`,
            ]
          : []),
        branded.length
          ? `${branded.length} surface${branded.length === 1 ? "" : "s"} carry brand artwork.`
          : "Brand artwork not applied to the surfaces yet.",
        ...(assets.length
          ? [`Files attached: ${assets.map((a) => `${a.name} (${a.kind})`).join(", ")}.`]
          : []),
      ],
    });
  }

  return sections;
}

/** One-line description used in saved-design lists and the lead subject. */
export function summaryHeadline(project: BoothProject): string {
  const n = project.design.objects.length;
  return `${project.project.boothSize} ${project.project.boothType} · ${n} object${n === 1 ? "" : "s"}`;
}
