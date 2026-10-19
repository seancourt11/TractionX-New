/**
 * "Ask AI to update your booth".
 *
 * The model never draws anything — it reads the current booth JSON and returns
 * commands from the approved list in commands.ts, which the editor applies as
 * one undoable change.
 */

import { createServerFn } from "@tanstack/react-start";

import { commandVocabulary, type BoothCommand } from "./commands";
import type { BoothProject } from "./types";

export type AiResult = {
  ok: boolean;
  message: string;
  commands: BoothCommand[];
};

type Input = { prompt: string; project: BoothProject; selectedId: string | null };

export const askBoothAi = createServerFn({ method: "POST" })
  .inputValidator((data: Input) => {
    if (!data || typeof data.prompt !== "string" || !data.project) throw new Error("Bad request");
    return { prompt: data.prompt.slice(0, 600), project: data.project, selectedId: data.selectedId ?? null };
  })
  .handler(async ({ data }): Promise<AiResult> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false, message: "The design assistant isn't available right now.", commands: [] };

    const vocab = commandVocabulary();
    const system = [
      "You are the design assistant inside a trade show booth builder.",
      "You never invent geometry. You reply with JSON only, in the shape:",
      '{"summary":"one short sentence in plain language","commands":[ ... ]}',
      "Every command must use one of these actions and only these fields:",
      'addWallPreset{presetId} · addModularWall{widthMm} · addItem{presetId} · setHeight{target,heightPreset} · setGraphicType{target,graphicType,color?} · setLightbox{target,on} · setWholeBoothLight{on} · setFlooring{swatchId|null} · setFinish{target,finish} · setEdgeColor{target,edgeColor} · setBrandColor{primaryColor?,secondaryColor?} · brandFromWebsite{url,mode?} · applyBrandKit{mode?} · setSurfaceImage{target,imageIndex} · removeObjects{target}',
      'target is one of: all, walls, selected, storage, tower, counter, tv, furniture, hanging.',
      "Branding: when the request names a website or company (e.g. 'brand this like apple.com', 'use Shopify's branding'), return brandFromWebsite with the bare domain as url. mode is 'photo' to use their imagery or 'color' for brand colour only; default to photo unless they say no photos or colours only.",
      "If a brand has already been loaded and they ask to re-dress or switch look, use applyBrandKit with the mode.",
      "If the booth is empty and they ask for branding, add a sensible structure first (a back wall and a counter), then the branding command.",
      "Prefer presets over modular pieces. Use only ids from the vocabulary below.",

      "If the request is unclear or outside the builder, return an empty commands array and explain in the summary.",
      `Vocabulary: ${JSON.stringify(vocab)}`,
    ].join("\n");

    const user = [
      `Current booth: ${JSON.stringify(data.project)}`,
      `Selected object id: ${data.selectedId ?? "none"}`,
      `Request: ${data.prompt}`,
    ].join("\n\n");

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { "Lovable-API-Key": key, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3.8-flash",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });

      if (res.status === 429)
        return { ok: false, message: "The assistant is busy — try again in a moment.", commands: [] };
      if (!res.ok) return { ok: false, message: "The assistant couldn't be reached just now.", commands: [] };

      const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const raw = json.choices?.[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(raw) as { summary?: string; commands?: BoothCommand[] };
      const seen = new Set<string>();
      const commands = Array.isArray(parsed.commands)
        ? parsed.commands
            .filter((c) => c && vocab.actions.includes(c.action as never))
            // Models sometimes repeat the same command; apply each one once.
            .filter((c) => {
              const k = JSON.stringify(c);
              if (seen.has(k)) return false;
              seen.add(k);
              return true;
            })
            .slice(0, 20)
        : [];
      return {
        ok: true,
        message: parsed.summary?.trim() || (commands.length ? "Updated your booth." : "I wasn't sure what to change."),
        commands,
      };
    } catch {
      return { ok: false, message: "Something went wrong reading that request.", commands: [] };
    }
  });
