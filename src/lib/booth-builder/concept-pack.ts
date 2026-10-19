/**
 * Concept pack — the document a customer actually forwards internally.
 *
 * Built in the browser from the live project so it always matches what is on
 * screen: cover, four render angles, a dimensioned plan drawn from the project
 * JSON, the component list, and the Traction X promises.
 */

import { jsPDF } from "jspdf";

import { PROMISES } from "@/data/promises";
import { SITE } from "@/lib/site";

import { FLOORING_SWATCHES, HEIGHTS, mmToFt } from "./presets";
import { isWall, mmLabel, wallBounds, wallWidthMm } from "./project";
import { buildSummary } from "./summary";
import type { BoothProject, ItemObject } from "./types";

export type PackShot = { id: string; label: string; caption: string; dataUrl: string };

const PAGE_W = 297; // A4 landscape
const PAGE_H = 210;
const M = 14;
const CONTENT_W = PAGE_W - M * 2;

const PURPLE: [number, number, number] = [124, 77, 190];
const INK: [number, number, number] = [24, 24, 27];
const MUTED: [number, number, number] = [110, 110, 120];
const RULE: [number, number, number] = [222, 222, 230];

const ft1 = (mm: number) => `${Math.round(mmToFt(mm) * 10) / 10} ft`;

function pageFooter(pdf: jsPDF, project: BoothProject) {
  const pages = pdf.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    pdf.setDrawColor(...RULE);
    pdf.setLineWidth(0.2);
    pdf.line(M, PAGE_H - 12, PAGE_W - M, PAGE_H - 12);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(...MUTED);
    pdf.text(
      `${SITE.name} · ${SITE.phoneDisplay} · ${SITE.email} · ${project.project.projectName}`,
      M,
      PAGE_H - 7.5,
    );
    pdf.text(`Page ${i} of ${pages}`, PAGE_W - M, PAGE_H - 7.5, { align: "right" });
  }
}

function pageHeading(pdf: jsPDF, title: string, sub?: string) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.setTextColor(...INK);
  pdf.text(title.toUpperCase(), M, M + 6);
  pdf.setDrawColor(...PURPLE);
  pdf.setLineWidth(0.6);
  pdf.line(M, M + 9, M + 24, M + 9);
  if (sub) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(...MUTED);
    pdf.text(sub, PAGE_W - M, M + 6, { align: "right" });
  }
}

/* -------------------------------------------------------------------------- */
/* Dimensioned plan, drawn straight from the project                           */
/* -------------------------------------------------------------------------- */

function drawPlan(pdf: jsPDF, project: BoothProject, box: { x: number; y: number; w: number; h: number }) {
  const W = project.project.widthMm;
  const D = project.project.depthMm;
  const scale = Math.min(box.w / W, box.h / D);
  const planW = W * scale;
  const planD = D * scale;
  const ox = box.x + (box.w - planW) / 2;
  const oy = box.y + (box.h - planD) / 2;

  const px = (mm: number) => ox + mm * scale;
  const py = (mm: number) => oy + mm * scale;

  // Booth outline
  pdf.setFillColor(248, 248, 251);
  pdf.setDrawColor(...INK);
  pdf.setLineWidth(0.5);
  pdf.rect(ox, oy, planW, planD, "FD");

  // Objects
  for (const o of project.design.objects) {
    const b = wallBounds(o);
    const x = px(b.minX);
    const y = py(b.minZ);
    const w = Math.max(0.8, (b.maxX - b.minX) * scale);
    const h = Math.max(0.8, (b.maxZ - b.minZ) * scale);
    const hanging = !isWall(o) && o.kind === "hanging";

    if (hanging) {
      pdf.setDrawColor(...PURPLE);
      pdf.setLineWidth(0.3);
      pdf.setLineDashPattern([1.2, 1], 0);
      pdf.rect(x, y, w, h, "D");
      pdf.setLineDashPattern([], 0);
    } else {
      pdf.setFillColor(isWall(o) ? 40 : 150, isWall(o) ? 40 : 150, isWall(o) ? 46 : 158);
      pdf.rect(x, y, w, h, "F");
    }

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(5.6);
    pdf.setTextColor(...MUTED);
    const label = isWall(o) ? `${o.name} ${ft1(wallWidthMm(o))}` : `${o.name} ${ft1(o.widthMm)}`;
    pdf.text(label, x + w / 2, y + h + 2.6, { align: "center", maxWidth: 60 });
  }

  // Overall dimensions
  pdf.setDrawColor(...PURPLE);
  pdf.setLineWidth(0.3);
  pdf.line(ox, oy - 4, ox + planW, oy - 4);
  pdf.line(ox - 4, oy, ox - 4, oy + planD);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(...PURPLE);
  pdf.text(`${Math.round(mmToFt(W))} ft`, ox + planW / 2, oy - 5.5, { align: "center" });
  pdf.text(`${Math.round(mmToFt(D))} ft`, ox - 5.5, oy + planD / 2, { align: "center", angle: 90 });

  // Aisle marker
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.5);
  pdf.setTextColor(...MUTED);
  pdf.text("AISLE", ox + planW / 2, oy + planD + 7, { align: "center" });
}

/* -------------------------------------------------------------------------- */
/* Component list                                                              */
/* -------------------------------------------------------------------------- */

function componentRows(project: BoothProject): [string, string, string][] {
  const rows: [string, string, string][] = [];
  for (const o of project.design.objects) {
    if (isWall(o)) {
      const height = HEIGHTS.find((h) => h.id === o.heightPreset)?.label ?? mmLabel(o.heightMm);
      const lit = o.lightbox || o.sections.some((s) => s.lightbox);
      rows.push([
        o.name,
        `${mmLabel(wallWidthMm(o))} wide · ${height} · ${o.sections.length} module${o.sections.length === 1 ? "" : "s"}`,
        `${o.edgeColor} edges${lit ? " · backlit" : ""}${o.graphic?.imageUrl ? " · brand artwork" : ""}`,
      ]);
    } else {
      const item = o as ItemObject;
      rows.push([
        item.name,
        `${mmLabel(item.widthMm)} × ${mmLabel(item.depthMm)} × ${mmLabel(item.heightMm)}`,
        `${item.finish} finish${item.lightbox ? " · illuminated" : ""}${item.graphic?.imageUrl ? " · brand artwork" : ""}`,
      ]);
    }
  }
  return rows;
}

/* -------------------------------------------------------------------------- */
/* Pack                                                                        */
/* -------------------------------------------------------------------------- */

export function generateConceptPack(project: BoothProject, shots: PackShot[]): void {
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
  const dated = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const p = project.project;

  /* ---- cover ----------------------------------------------------------- */
  pdf.setFillColor(...INK);
  pdf.rect(0, 0, PAGE_W, PAGE_H, "F");

  const cover = shots[0];
  if (cover) {
    try {
      pdf.addImage(cover.dataUrl, "JPEG", PAGE_W * 0.36, 0, PAGE_W * 0.64, PAGE_H, undefined, "FAST");
    } catch {
      /* a failed still should never block the document */
    }
  }

  pdf.setFillColor(...INK);
  pdf.rect(0, 0, PAGE_W * 0.42, PAGE_H, "F");

  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text(SITE.name.toUpperCase(), M, 26);

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.text(pdf.splitTextToSize(p.projectName, PAGE_W * 0.34) as string[], M, 44);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(200, 200, 210);
  pdf.text(
    `${Math.round(mmToFt(p.widthMm))} ft × ${Math.round(mmToFt(p.depthMm))} ft ${p.boothType} booth`,
    M,
    68,
  );
  if (p.showName) pdf.text(p.showName, M, 75);
  pdf.setFontSize(8);
  pdf.setTextColor(160, 160, 172);
  pdf.text(`Concept pack · ${dated}`, M, 88);

  pdf.setFontSize(8.5);
  pdf.setTextColor(220, 220, 230);
  pdf.text(
    pdf.splitTextToSize(
      "Designed in the Traction X booth builder. Everything shown is buildable from our modular system and finished as a custom booth.",
      PAGE_W * 0.34,
    ) as string[],
    M,
    104,
  );

  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text(SITE.phoneDisplay, M, PAGE_H - 26);
  pdf.text(SITE.email, M, PAGE_H - 20);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(150, 150, 162);
  pdf.setFontSize(7.5);
  pdf.text(SITE.url.replace(/^https?:\/\//, ""), M, PAGE_H - 14);

  /* ---- render pages ---------------------------------------------------- */
  for (const shot of shots) {
    pdf.addPage();
    pageHeading(pdf, shot.label, p.projectName);
    const top = M + 14;
    const h = PAGE_H - top - 22;
    try {
      pdf.addImage(shot.dataUrl, "JPEG", M, top, CONTENT_W, h, undefined, "FAST");
    } catch {
      /* skip a still that failed to capture */
    }
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...MUTED);
    pdf.text(shot.caption, M, PAGE_H - 17);
  }

  /* ---- plan ------------------------------------------------------------ */
  pdf.addPage();
  pageHeading(pdf, "Floor plan", `${Math.round(mmToFt(p.widthMm))} × ${Math.round(mmToFt(p.depthMm))} ft`);
  drawPlan(pdf, project, { x: M, y: M + 22, w: CONTENT_W * 0.62, h: PAGE_H - M * 2 - 34 });

  // Key figures beside the plan
  const kx = M + CONTENT_W * 0.66;
  let ky = M + 26;
  const walls = project.design.objects.filter(isWall);
  const runMm = walls.reduce((s, w) => s + wallWidthMm(w), 0);
  const floor = FLOORING_SWATCHES.find((f) => f.id === project.design.flooring.swatchId);
  const facts: [string, string][] = [
    ["Footprint", `${Math.round(mmToFt(p.widthMm))} ft × ${Math.round(mmToFt(p.depthMm))} ft`],
    ["Booth type", p.boothType],
    ["Wall frontage", runMm ? mmLabel(runMm) : "None"],
    ["Pieces", String(project.design.objects.length)],
    ["Flooring", floor ? floor.label : "Show floor"],
    ["Show", p.showName || "To be confirmed"],
  ];
  for (const [label, value] of facts) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...MUTED);
    pdf.text(label, kx, ky);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...INK);
    pdf.text(String(value), PAGE_W - M, ky, { align: "right" });
    ky += 4;
    pdf.setDrawColor(...RULE);
    pdf.setLineWidth(0.2);
    pdf.line(kx, ky - 1.4, PAGE_W - M, ky - 1.4);
    ky += 3;
  }

  /* ---- components ------------------------------------------------------ */
  pdf.addPage();
  pageHeading(pdf, "Components", p.projectName);
  let y = M + 22;
  pdf.setFillColor(...INK);
  pdf.rect(M, y - 4.5, CONTENT_W, 7, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(255, 255, 255);
  pdf.text("PIECE", M + 2, y);
  pdf.text("SIZE", M + CONTENT_W * 0.36, y);
  pdf.text("FINISH & GRAPHICS", M + CONTENT_W * 0.68, y);
  y += 7;

  for (const [name, size, finish] of componentRows(project)) {
    if (y > PAGE_H - 24) {
      pdf.addPage();
      pageHeading(pdf, "Components (continued)", p.projectName);
      y = M + 22;
    }
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.setTextColor(...INK);
    pdf.text(name, M + 2, y, { maxWidth: CONTENT_W * 0.33 });
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(...MUTED);
    pdf.text(size, M + CONTENT_W * 0.36, y, { maxWidth: CONTENT_W * 0.3 });
    pdf.text(finish, M + CONTENT_W * 0.68, y, { maxWidth: CONTENT_W * 0.3 });
    y += 5;
    pdf.setDrawColor(...RULE);
    pdf.setLineWidth(0.2);
    pdf.line(M, y - 2, PAGE_W - M, y - 2);
  }

  /* ---- written summary -------------------------------------------------- */
  pdf.addPage();
  pageHeading(pdf, "The concept in words", p.projectName);
  y = M + 22;
  let column = 0;
  const colW = CONTENT_W / 2 - 6;
  for (const section of buildSummary(project)) {
    const lines = section.lines.filter(Boolean);
    const needed = 6 + lines.length * 8;
    if (y + needed > PAGE_H - 20) {
      if (column === 0) {
        column = 1;
        y = M + 22;
      } else {
        pdf.addPage();
        pageHeading(pdf, "The concept in words (continued)", p.projectName);
        column = 0;
        y = M + 22;
      }
    }
    const x = M + column * (colW + 12);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(...PURPLE);
    pdf.text(section.title.toUpperCase(), x, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...MUTED);
    for (const line of lines) {
      const wrapped = pdf.splitTextToSize(line, colW) as string[];
      pdf.text(wrapped, x, y);
      y += wrapped.length * 3.6 + 1.4;
    }
    y += 4;
  }

  /* ---- promises --------------------------------------------------------- */
  pdf.addPage();
  pageHeading(pdf, "The Traction X promise", "What you get, in writing");
  y = M + 24;
  for (const promise of PROMISES.slice(0, 6)) {
    if (y > PAGE_H - 30) break;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    pdf.setTextColor(...INK);
    pdf.text(promise.title, M, y);
    y += 4.4;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...MUTED);
    const wrapped = pdf.splitTextToSize(promise.short, CONTENT_W) as string[];
    pdf.text(wrapped, M, y);
    y += wrapped.length * 3.6 + 4;
  }

  pdf.setFillColor(...INK);
  pdf.rect(M, PAGE_H - 42, CONTENT_W, 24, "F");
  pdf.setFillColor(...PURPLE);
  pdf.rect(M, PAGE_H - 42, 1.6, 24, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(255, 255, 255);
  pdf.text("Turn this concept into a real booth", M + 7, PAGE_H - 33);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(200, 200, 210);
  pdf.text(
    "Send this pack back to us and a designer confirms buildability, freight and investment within two business days.",
    M + 7,
    PAGE_H - 27,
  );
  pdf.setTextColor(...PURPLE);
  pdf.setFont("helvetica", "bold");
  pdf.text(`${SITE.phoneDisplay}  ·  ${SITE.email}`, M + 7, PAGE_H - 22);

  pageFooter(pdf, project);
  pdf.save(
    `${(p.projectName || "booth").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-concept-pack.pdf`,
  );
}
