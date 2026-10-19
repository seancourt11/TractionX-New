import { useState } from "react";

import { validateBoothDesign } from "@/lib/booth-builder/rules";
import { useBuilder } from "@/lib/booth-builder/store";

/** Show-rule warnings. Never blocks — fix automatically or keep anyway. */
export function RulesBar() {
  const { project, commit } = useBuilder();
  const [kept, setKept] = useState<string[]>([]);
  const issues = validateBoothDesign(project).filter((i) => !kept.includes(i.id));

  if (!project.regulations.enabled)
    return (
      <div className="border-b border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] text-white/45">
        Show rule checks are off — turn them back on in the panel on the right.
      </div>
    );

  if (issues.length === 0)
    return (
      <div className="border-b border-white/10 bg-emerald-400/[0.06] px-4 py-2 text-[11px] text-emerald-300/80">
        Looks good against standard show rules.
      </div>
    );

  return (
    <div className="grid gap-2 border-b border-white/10 bg-amber-300/[0.05] px-4 py-3">
      {issues.map((issue) => (
        <div key={issue.id} className="flex flex-wrap items-start gap-3">
          <div className="min-w-[240px] flex-1">
            <p className="text-[12px] font-semibold text-amber-200/90">{issue.title}</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-white/50">{issue.detail}</p>
          </div>
          <div className="flex items-center gap-2">
            {issue.fix && (
              <button
                type="button"
                onClick={() => commit(issue.fixLabel ?? "Fixed automatically", (d) => issue.fix?.(d))}
                className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-black transition hover:bg-white/85"
              >
                {issue.fixLabel ?? "Fix automatically"}
              </button>
            )}
            <button
              type="button"
              onClick={() => setKept((k) => [...k, issue.id])}
              className="rounded-lg border border-white/15 px-3 py-1.5 text-[11px] text-white/60 transition hover:text-white"
            >
              Keep anyway
            </button>
          </div>
        </div>
      ))}
      <p className="text-[10px] text-white/35">
        Anything you keep, we review with your show before it's built — nothing here stops your design.
      </p>
    </div>
  );
}
