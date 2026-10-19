/**
 * Brand image proxy.
 *
 * Artwork pulled from a customer's own website almost always blocks other
 * sites from re-using it (no CORS header, or hotlink protection). Without a
 * proxy the booth surfaces silently fall back to flat colour. This route
 * fetches the image server-side and serves it from our own origin so the 3D
 * view and the panel composer can actually use it.
 */

import { createFileRoute } from "@tanstack/react-router";

const MAX_BYTES = 8 * 1024 * 1024;

const PRIVATE_HOST =
  /^(localhost$|127\.|10\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[?::1\]?$)/i;

function safeUrl(raw: string | null): URL | null {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (PRIVATE_HOST.test(url.hostname)) return null;
    if (!url.hostname.includes(".")) return null;
    return url;
  } catch {
    return null;
  }
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/brand-image")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      GET: async ({ request }) => {
        const url = safeUrl(new URL(request.url).searchParams.get("url"));
        if (!url) return new Response("Bad image address", { status: 400, headers: CORS });

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 10_000);
        try {
          const upstream = await fetch(url.toString(), {
            signal: controller.signal,
            redirect: "follow",
            headers: {
              // Some hosts refuse requests with no referer or a foreign one.
              Referer: url.origin,
              Accept: "image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8,*/*;q=0.5",
              "User-Agent":
                "Mozilla/5.0 (compatible; TractionXBoothBuilder/1.0; +https://tractionx.ca)",
            },
          });
          if (!upstream.ok) return new Response("Image not available", { status: 502, headers: CORS });

          const type = upstream.headers.get("content-type") ?? "";
          if (!type.startsWith("image/")) {
            return new Response("Not an image", { status: 415, headers: CORS });
          }
          const declared = Number.parseInt(upstream.headers.get("content-length") ?? "0", 10);
          if (declared > MAX_BYTES) return new Response("Image too large", { status: 413, headers: CORS });

          const buffer = await upstream.arrayBuffer();
          if (buffer.byteLength > MAX_BYTES) {
            return new Response("Image too large", { status: 413, headers: CORS });
          }

          return new Response(buffer, {
            status: 200,
            headers: {
              ...CORS,
              "Content-Type": type,
              "Cache-Control": "public, max-age=86400, s-maxage=604800",
            },
          });
        } catch {
          return new Response("Image fetch failed", { status: 504, headers: CORS });
        } finally {
          clearTimeout(timer);
        }
      },
    },
  },
});
