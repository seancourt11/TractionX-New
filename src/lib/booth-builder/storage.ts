/**
 * Saved booth concepts.
 *
 * Designs live in the visitor's own browser until they hand the concept to us,
 * so nothing is lost between sessions and no account is needed.
 */

import type { BoothProject } from "./types";

const KEY = "tx.boothBuilder.saves.v1";
const MAX = 20;

export type SavedDesign = {
  id: string;
  name: string;
  savedAt: string;
  project: BoothProject;
};

function readAll(): SavedDesign[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as SavedDesign[]) : [];
  } catch {
    return [];
  }
}

function writeAll(list: SavedDesign[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX)));
  } catch {
    /* private mode or quota — saving is best-effort */
  }
}

export function listSavedDesigns(): SavedDesign[] {
  return readAll().sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

/** Save under the project name, replacing an earlier save of the same design. */
export function saveDesign(project: BoothProject, existingId?: string): SavedDesign {
  const entry: SavedDesign = {
    id: existingId ?? `booth_${Date.now().toString(36)}`,
    name: project.project.projectName || "Untitled booth",
    savedAt: new Date().toISOString(),
    project,
  };
  writeAll([...readAll().filter((d) => d.id !== entry.id), entry]);
  return entry;
}

export function deleteDesign(id: string): void {
  writeAll(readAll().filter((d) => d.id !== id));
}
