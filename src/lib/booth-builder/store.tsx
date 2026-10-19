import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { BoothObject, BoothProject, ItemObject, WallObject } from "./types";
import { isWall, uid, wallWidthMm } from "./project";
import { brandNewObject } from "./brandkit";

/**
 * Editor state for the booth builder.
 *
 * One undo stack, one selected object, and the project JSON. Everything the
 * editor does goes through `commit()` so every change is undoable — which is
 * what lets an AI request later be treated as a single transaction.
 */

type Ctx = {
  project: BoothProject;
  selectedId: string | null;
  select: (id: string | null) => void;
  commit: (label: string, fn: (draft: BoothProject) => void) => void;
  /** Silent update used while dragging; folded into the last commit. */
  live: (fn: (draft: BoothProject) => void) => void;
  addObject: (obj: BoothObject, label?: string) => void;
  updateWall: (id: string, patch: Partial<WallObject> & Partial<ItemObject>, label?: string) => void;
  duplicateSelected: () => void;
  deleteSelected: () => void;
  groupSelected: (ids: string[]) => void;
  undo: () => void;
  canUndo: boolean;
  lastAction: string | null;
  reset: () => void;
};

const BuilderContext = createContext<Ctx | null>(null);

const clone = (p: BoothProject): BoothProject =>
  typeof structuredClone === "function" ? structuredClone(p) : (JSON.parse(JSON.stringify(p)) as BoothProject);

export function BuilderProvider({
  initial,
  onExit,
  children,
}: {
  initial: BoothProject;
  onExit?: () => void;
  children: ReactNode;
}) {
  const [project, setProject] = useState<BoothProject>(initial);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const history = useRef<BoothProject[]>([]);
  const [canUndo, setCanUndo] = useState(false);

  const commit = useCallback((label: string, fn: (draft: BoothProject) => void) => {
    setProject((current) => {
      history.current = [...history.current.slice(-49), clone(current)];
      const draft = clone(current);
      fn(draft);
      return draft;
    });
    setCanUndo(true);
    setLastAction(label);
  }, []);

  const live = useCallback((fn: (draft: BoothProject) => void) => {
    setProject((current) => {
      const draft = clone(current);
      fn(draft);
      return draft;
    });
  }, []);

  const undo = useCallback(() => {
    const prev = history.current.pop();
    if (!prev) return;
    setProject(prev);
    setCanUndo(history.current.length > 0);
    setLastAction("Undid last change");
  }, []);

  const addObject = useCallback(
    (obj: BoothObject, label?: string) => {
      commit(label ?? `Added ${obj.name}`, (d) => {
        d.design.objects.push(obj);
        // A booth that's already branded dresses new structures automatically.
        brandNewObject(d, obj.id);
      });
      setSelectedId(obj.id);
    },
    [commit],
  );

  const updateWall = useCallback(
    (id: string, patch: Partial<WallObject> & Partial<ItemObject>, label?: string) => {
      commit(label ?? "Updated wall", (d) => {
        const target = d.design.objects.find((o) => o.id === id);
        if (target) Object.assign(target, patch);
        if (target?.groupId && (patch.heightMm || patch.edgeColor || patch.graphicType)) {
          for (const o of d.design.objects) {
            if (o.groupId === target.groupId) Object.assign(o, patch);
          }
        }
      });
    },
    [commit],
  );

  const duplicateSelected = useCallback(() => {
    if (!selectedId) return;
    let newId = "";
    commit("Duplicated object", (d) => {
      const src = d.design.objects.find((o) => o.id === selectedId);
      if (!src) return;
      const copy = clone({ design: { objects: [src] } } as unknown as BoothProject) as unknown as {
        design: { objects: BoothObject[] };
      };
      const next = copy.design.objects[0];
      next.id = uid(next.type);
      next.groupId = undefined;
      if (isWall(next)) next.sections = next.sections.map((s) => ({ ...s, id: uid("wall_section") }));
      next.position = { x: src.position.x + 300, z: src.position.z + 300 };
      newId = next.id;
      d.design.objects.push(next);
    });
    if (newId) setSelectedId(newId);
  }, [commit, selectedId]);

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    commit("Deleted object", (d) => {
      d.design.objects = d.design.objects.filter((o) => o.id !== selectedId);
    });
    setSelectedId(null);
  }, [commit, selectedId]);

  const groupSelected = useCallback(
    (ids: string[]) => {
      if (ids.length < 2) return;
      const gid = uid("group");
      commit("Grouped walls", (d) => {
        for (const o of d.design.objects) if (ids.includes(o.id)) o.groupId = gid;
      });
    },
    [commit],
  );

  const reset = useCallback(() => {
    history.current = [];
    setCanUndo(false);
    setSelectedId(null);
    onExit?.();
  }, [onExit]);

  const value = useMemo<Ctx>(
    () => ({
      project,
      selectedId,
      select: setSelectedId,
      commit,
      live,
      addObject,
      updateWall,
      duplicateSelected,
      deleteSelected,
      groupSelected,
      undo,
      canUndo,
      lastAction,
      reset,
    }),
    [
      project,
      selectedId,
      commit,
      live,
      addObject,
      updateWall,
      duplicateSelected,
      deleteSelected,
      groupSelected,
      undo,
      canUndo,
      lastAction,
      reset,
    ],
  );

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}

export function useBuilder(): Ctx {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used inside BuilderProvider");
  return ctx;
}

/** Total linear wall run in the booth, used in the summary strip. */
export function totalWallRunMm(project: BoothProject): number {
  return project.design.objects.filter(isWall).reduce((sum, o) => sum + wallWidthMm(o), 0);
}
