import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { askBoothAi } from "@/lib/booth-builder/ai.functions";
import { extractBranding } from "@/lib/booth-builder/branding.functions";
import { applyCommand } from "@/lib/booth-builder/commands";
import { applyPulledBrand } from "@/lib/booth-builder/brandkit";
import { useBuilder } from "@/lib/booth-builder/store";

const EXAMPLES = [
  "Brand this booth like apple.com",
  "Use our website colours only, no photos",
  "Add a 20 ft backwall and a reception counter",
  "Light the whole booth",
  "Give me dark grey carpet",
];

/** "Ask AI to update your booth" — one request, one undoable change. */
export function AiPanel() {
  const { project, selectedId, commit } = useBuilder();
  const ask = useServerFn(askBoothAi);
  const pullBrand = useServerFn(extractBranding);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<{ you: string; reply: string; changes: string[] }[]>([]);

  async function run(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setBusy(true);
    setPrompt("");
    try {
      const res = await ask({ data: { prompt: q, project, selectedId } });
      const changes: string[] = [];

      // A "brand from this website" request is read on the server first, so
      // the whole re-brand still lands as one undoable change.
      const site = res.commands.find((c) => c.action === "brandFromWebsite");
      let pulled: Awaited<ReturnType<typeof pullBrand>> | null = null;
      let brandNote = "";
      if (site && "url" in site && site.url) {
        pulled = await pullBrand({ data: { website: site.url } });
        if (!pulled.ok) {
          brandNote = pulled.message;
          pulled = null;
        } else if (!pulled.images.length) {
          brandNote =
            "That site didn't give us usable photography, so we've used its logo and colours.";
        }
      }

      if (res.commands.length) {
        const runAll = (draft: typeof project) => {
          if (pulled) applyPulledBrand(draft, pulled, site && "mode" in site ? site.mode : undefined);
          const done: string[] = [];
          for (const cmd of res.commands) {
            const label = applyCommand(draft, cmd, selectedId);
            if (label) done.push(label);
          }
          return done;
        };
        // Dry run on a copy first so the summary is collected exactly once.
        changes.push(...runAll(structuredClone(project)));
        commit(res.message, (draft) => {
          runAll(draft);
        });
      }
      setLog((l) => [
        ...l,
        { you: q, reply: [res.message, brandNote].filter(Boolean).join(" "), changes },
      ]);
    } catch {
      setLog((l) => [...l, { you: q, reply: "That didn't go through — please try again.", changes: [] }]);
    } finally {
      setBusy(false);
    }
  }


  return (
    <div className="flex h-full flex-col">
      <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Ask AI</p>
      <p className="mt-1 text-[11px] leading-relaxed text-white/40">
        Describe what you want and it changes the booth for you. Every change can be undone.
      </p>

      <div className="mt-4 grid gap-2">
        {EXAMPLES.map((e) => (
          <button
            key={e}
            type="button"
            disabled={busy}
            onClick={() => void run(e)}
            className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-left text-[12px] text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-40"
          >
            {e}
          </button>
        ))}
      </div>

      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          void run(prompt);
        }}
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="e.g. add a storage room in the back corner and light the walls"
          className="w-full resize-none rounded-lg border border-white/12 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy || !prompt.trim()}
          className="mt-2 w-full rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-black transition hover:bg-white/85 disabled:opacity-30"
        >
          {busy ? "Updating your booth…" : "Update my booth"}
        </button>
      </form>

      <div className="mt-5 grid gap-3">
        {log.map((entry, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[11px] text-white/40">You: {entry.you}</p>
            <p className="mt-1.5 text-[12px] text-white/85">{entry.reply}</p>
            {entry.changes.length > 0 && (
              <ul className="mt-2 grid gap-1">
                {entry.changes.map((c, j) => (
                  <li key={j} className="text-[11px] text-[oklch(0.82_0.11_300)]">
                    · {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-white/30">
        The assistant only works with our real modular parts — it can't invent pieces we don't build.
      </p>
    </div>
  );
}
