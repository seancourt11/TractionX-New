import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { SEED } from "@/data/admin-demo/seed";
import type { AdminData, DocumentRecord, DocumentTemplate, Lead } from "@/data/admin-demo/types";

/**
 * Prototype state for the internal workspace.
 *
 * Persists to localStorage so clicking around feels real; there is no server.
 * When the Next.js backend is built, this provider is the single seam to
 * replace — every screen reads from `useAdmin()`, not from storage directly.
 */

const KEY = "tx-admin-prototype-v1";

type AdminContextValue = AdminData & {
  hydrated: boolean;
  updateLead: (id: string, patch: Partial<Lead>) => void;
  retrySync: (id: string) => void;
  createDocument: (doc: DocumentRecord) => void;
  updateDocument: (id: string, patch: Partial<DocumentRecord>) => void;
  deleteDocument: (id: string) => void;
  logEvent: (id: string, label: string) => void;
  updateSettings: (patch: Partial<AdminData["settings"]>) => void;
  saveTemplate: (name: string, doc: DocumentRecord) => void;
  deleteTemplate: (id: string) => void;
  reset: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AdminData>(SEED);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AdminData;
        if (parsed?.leads && parsed?.documents) setData({ ...parsed, templates: parsed.templates ?? [] });
      }
    } catch {
      /* corrupt payload — fall back to seed */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      /* storage full or blocked — prototype still works in memory */
    }
  }, [data, hydrated]);

  const updateLead = useCallback((id: string, patch: Partial<Lead>) => {
    setData((d) => ({ ...d, leads: d.leads.map((l) => (l.id === id ? { ...l, ...patch } : l)) }));
  }, []);

  const retrySync = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      leads: d.leads.map((l) =>
        l.id === id
          ? {
              ...l,
              sync: {
                status: "synced",
                jobforgeId: l.sync.jobforgeId ?? `JF-${Math.floor(8000 + Math.random() * 999)}`,
                lastAttempt: new Date().toISOString(),
              },
            }
          : l,
      ),
    }));
  }, []);

  const createDocument = useCallback((doc: DocumentRecord) => {
    setData((d) => ({ ...d, documents: [doc, ...d.documents] }));
  }, []);

  const updateDocument = useCallback((id: string, patch: Partial<DocumentRecord>) => {
    setData((d) => ({
      ...d,
      documents: d.documents.map((doc) =>
        doc.id === id ? { ...doc, ...patch, updatedAt: new Date().toISOString() } : doc,
      ),
    }));
  }, []);

  const deleteDocument = useCallback((id: string) => {
    setData((d) => ({ ...d, documents: d.documents.filter((doc) => doc.id !== id) }));
  }, []);

  const logEvent = useCallback((id: string, label: string) => {
    setData((d) => ({
      ...d,
      documents: d.documents.map((doc) =>
        doc.id === id ? { ...doc, events: [...doc.events, { at: new Date().toISOString(), label }] } : doc,
      ),
    }));
  }, []);

  const updateSettings = useCallback((patch: Partial<AdminData["settings"]>) => {
    setData((d) => ({ ...d, settings: { ...d.settings, ...patch } }));
  }, []);

  const saveTemplate = useCallback((name: string, doc: DocumentRecord) => {
    setData((d) => ({
      ...d,
      templates: [
        { id: `tpl-${Date.now()}`, name, createdAt: new Date().toISOString(), doc },
        ...d.templates,
      ],
    }));
  }, []);

  const deleteTemplate = useCallback((id: string) => {
    setData((d) => ({ ...d, templates: d.templates.filter((t) => t.id !== id) }));
  }, []);

  const reset = useCallback(() => {
    setData(SEED);
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({
      ...data,
      hydrated,
      updateLead,
      retrySync,
      createDocument,
      updateDocument,
      deleteDocument,
      logEvent,
      updateSettings,
      saveTemplate,
      deleteTemplate,
      reset,
    }),
    [
      data,
      hydrated,
      updateLead,
      retrySync,
      createDocument,
      updateDocument,
      deleteDocument,
      logEvent,
      updateSettings,
      saveTemplate,
      deleteTemplate,
      reset,
    ],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
