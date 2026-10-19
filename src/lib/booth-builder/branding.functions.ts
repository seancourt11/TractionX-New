/**
 * Website branding extraction.
 *
 * Fetches the customer's home page on the server and reads the obvious brand
 * signals out of the markup: logo image, brand colour, headline and a hero
 * image. Everything is a suggestion — the customer can override all of it, and
 * anything we pull is used for concept graphics only.
 */

import { createServerFn } from "@tanstack/react-start";

export type BrandingResult = {
  ok: boolean;
  message: string;
  website: string;
  logoUrl: string;
  /** Second logo candidate, used over light surfaces when we find one. */
  logoDarkUrl: string;
  primaryColor: string;
  secondaryColor: string;
  /** Up to six brand colours, most used first. */
  palette: string[];
  headline: string;
  /** Supporting line under the headline, when the page has one. */
  subhead: string;
  /** The site's main call-to-action wording. */
  cta: string;
  imageUrl: string;
  /** Ranked photography candidates for the photo look. */
  images: string[];
};


function normaliseUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

const attr = (tag: string, name: string): string => {
  const m = new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, "i").exec(tag);
  return m?.[1] ?? "";
};

function metaContent(html: string, keys: string[]): string {
  const tags = html.match(/<meta[^>]*>/gi) ?? [];
  for (const key of keys) {
    for (const tag of tags) {
      const id = (attr(tag, "property") || attr(tag, "name")).toLowerCase();
      if (id === key) {
        const content = attr(tag, "content").trim();
        if (content) return content;
      }
    }
  }
  return "";
}

const absolute = (candidate: string, base: string): string => {
  if (!candidate) return "";
  try {
    return new URL(candidate, base).toString();
  } catch {
    return "";
  }
};

/**
 * The company's real mark, not just any image on the page.
 *
 * Sites publish their logo in a handful of predictable places, and they are
 * not equally good: a header <img> that actually says "logo" is the mark the
 * company uses, a declared og:logo is next best, and a touch icon is the last
 * resort because it is usually a cropped app tile. Anything that looks like a
 * sprite sheet, a spacer or a payment/partner badge is thrown out. Two survive
 * — most brands ship a dark mark and a reversed white one.
 */
function findLogos(html: string, base: string): string[] {
  const BAD = /(sprite|spacer|placeholder|payment|partner|award|rating|star|flag|social|app-store|google-play)/i;
  const ranked: { url: string; score: number }[] = [];

  const add = (raw: string, score: number) => {
    const url = absolute(raw, base);
    if (!url || BAD.test(url)) return;
    const existing = ranked.find((r) => r.url === url);
    if (existing) {
      existing.score = Math.max(existing.score, score);
      return;
    }
    ranked.push({ url, score });
  };

  // 1. Inline marks: the strongest signal is markup that names it a logo.
  for (const tag of html.match(/<img[^>]*>/gi) ?? []) {
    const src = attr(tag, "src") || attr(tag, "data-src") || attr(tag, "data-lazy-src");
    if (!src) continue;
    const alt = attr(tag, "alt").toLowerCase();
    const cls = `${attr(tag, "class")} ${attr(tag, "id")}`.toLowerCase();
    const path = src.toLowerCase();
    const named = /logo|wordmark|brandmark/.test(`${alt} ${cls} ${path}`);
    if (!named) continue;

    let score = 60;
    // A mark inside the header/nav is the one the company leads with.
    if (/header|nav|masthead|topbar|brand/.test(cls)) score += 15;
    // Vector marks are the official artwork and stay crisp at booth scale.
    if (/\.svg($|\?)/i.test(path)) score += 12;
    // A reversed/white mark is worth keeping as the second candidate.
    if (/white|light|reverse|inverted|dark-?bg/.test(`${alt} ${cls} ${path}`)) score += 4;
    add(src, score);
  }

  // 2. Declared marks in metadata.
  const declared = metaContent(html, ["og:logo", "twitter:image:src"]);
  if (declared && /logo/i.test(declared)) add(declared, 55);

  // 3. Inline <svg> wrapped in a link home — extracted as a data URL.
  const inlineSvg = /<svg[^>]*(?:class|id)=["'][^"']*logo[^"']*["'][\s\S]{0,4000}?<\/svg>/i.exec(html)?.[0];
  if (inlineSvg && inlineSvg.includes("viewBox")) {
    add(`data:image/svg+xml;utf8,${encodeURIComponent(inlineSvg)}`, 50);
  }

  // 4. Icons: real artwork, but usually square and cropped, so ranked last.
  for (const tag of html.match(/<link[^>]*>/gi) ?? []) {
    const rel = attr(tag, "rel").toLowerCase();
    const href = attr(tag, "href");
    if (!href) continue;
    if (rel.includes("apple-touch-icon")) add(href, 30);
    else if (rel.includes("mask-icon")) add(href, 25);
    else if (rel.includes("icon") && !rel.includes("shortcut")) add(href, 20);
  }

  return ranked
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((r) => r.url);
}


const SKIP_IMAGE = /(logo|icon|sprite|favicon|avatar|badge|\.svg($|\?))/i;

/**
 * Photography candidates for the photo look: social preview images first, then
 * large in-page images and CSS background images. Marks and icons are skipped.
 */
function findImages(html: string, base: string, ogImages: string[]): string[] {
  const out: string[] = [];
  const push = (raw: string) => {
    const url = absolute(raw, base);
    if (!url || out.includes(url) || SKIP_IMAGE.test(url)) return;
    out.push(url);
  };

  ogImages.forEach(push);

  for (const tag of html.match(/<img[^>]*>/gi) ?? []) {
    if (out.length >= 10) break;
    const width = Number.parseInt(attr(tag, "width") || "0", 10);
    const cls = `${attr(tag, "class")} ${attr(tag, "id")}`.toLowerCase();
    const big = width >= 600 || /hero|banner|cover|feature|masthead|slide/.test(cls);
    if (!big) continue;
    const srcset = attr(tag, "srcset").split(",").pop()?.trim().split(" ")[0] ?? "";
    push(srcset || attr(tag, "src") || attr(tag, "data-src"));
  }

  for (const m of html.match(/background-image\s*:\s*url\(([^)]+)\)/gi) ?? []) {
    if (out.length >= 10) break;
    const raw = /url\(([^)]+)\)/i.exec(m)?.[1]?.replace(/["']/g, "").trim() ?? "";
    push(raw);
  }

  // Modern sites often only reference the hero image in a preload hint or a
  // <picture> source, so read those too.
  for (const tag of html.match(/<link[^>]*rel=["']preload["'][^>]*>/gi) ?? []) {
    if (attr(tag, "as").toLowerCase() !== "image") continue;
    const set = attr(tag, "imagesrcset").split(",").pop()?.trim().split(" ")[0] ?? "";
    push(set || attr(tag, "href"));
  }
  for (const tag of html.match(/<source[^>]*>/gi) ?? []) {
    if (out.length >= 12) break;
    const set = attr(tag, "srcset").split(",").pop()?.trim().split(" ")[0] ?? "";
    if (set) push(set);
  }

  return out.slice(0, 8);
}

const stripTags = (s: string) =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&rsquo;/gi, "’")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();

const CTA_WORDS =
  /^(shop|buy|learn more|get started|start|book|try|explore|discover|request|contact|watch|see|find out|order|sign up|join|download|talk to|schedule)/i;

/**
 * The advertising message at the top of the page: the main headline, the line
 * under it, and the wording on the first real call-to-action button.
 */
function findHero(html: string): { headline: string; subhead: string; cta: string } {
  const head = html.slice(0, 200_000);

  const h1 = stripTags(/<h1[^>]*>([\s\S]{2,300}?)<\/h1>/i.exec(head)?.[1] ?? "");
  const h2 = stripTags(/<h2[^>]*>([\s\S]{2,300}?)<\/h2>/i.exec(head)?.[1] ?? "");
  const para = stripTags(/<p[^>]*>([\s\S]{20,300}?)<\/p>/i.exec(head)?.[1] ?? "");

  let cta = "";
  const buttons = head.match(/<(a|button)[^>]*>([\s\S]{2,60}?)<\/(a|button)>/gi) ?? [];
  for (const tag of buttons) {
    const text = stripTags(tag.replace(/<\/?(a|button)[^>]*>/gi, " "));
    if (!text || text.length > 32) continue;
    if (CTA_WORDS.test(text)) {
      cta = text;
      break;
    }
  }

  return {
    headline: (h1 || h2).slice(0, 90),
    subhead: para.slice(0, 140),
    cta: cta.slice(0, 30),
  };
}


const NEUTRAL = /^#(f{3,6}|0{3,6}|fff(fff)?|000(000)?)$/i;

/** Most frequently used non-neutral hex colours in the page's inline styles. */
function findColors(html: string): { primary: string; secondary: string; palette: string[] } {
  const counts = new Map<string, number>();
  for (const raw of html.match(/#[0-9a-f]{6}\b|#[0-9a-f]{3}\b/gi) ?? []) {
    const hex = raw.toLowerCase();
    if (NEUTRAL.test(hex)) continue;
    counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }
  const expand = (h: string) =>
    h.length === 4 ? `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}` : h;
  const ranked = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([hex]) => expand(hex))
    .slice(0, 6);
  return {
    primary: ranked[0] ?? "#7C3AED",
    secondary: ranked[1] ?? "#111111",
    palette: ranked,
  };
}

export const extractBranding = createServerFn({ method: "POST" })
  .inputValidator((data: { website: string }) => {
    if (!data || typeof data.website !== "string") throw new Error("Bad request");
    return { website: data.website.slice(0, 300) };
  })
  .handler(async ({ data }): Promise<BrandingResult> => {
    const empty: BrandingResult = {
      ok: false,
      message: "",
      website: data.website,
      logoUrl: "",
      logoDarkUrl: "",
      primaryColor: "#7C3AED",
      secondaryColor: "#111111",
      palette: [],
      headline: "",
      subhead: "",
      cta: "",
      imageUrl: "",
      images: [],
    };


    const url = normaliseUrl(data.website);
    if (!url) return { ...empty, message: "That doesn't look like a website address." };

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(url, {
        signal: controller.signal,
        redirect: "follow",
        headers: { "User-Agent": "TractionXBoothBuilder/1.0", Accept: "text/html" },
      });
      clearTimeout(timer);

      if (!res.ok) return { ...empty, message: "We couldn't open that website." };

      const html = (await res.text()).slice(0, 600_000);
      const base = res.url || url;
      const colors = findColors(html);
      const title = /<title[^>]*>([^<]{2,160})<\/title>/i.exec(html)?.[1]?.trim() ?? "";
      const logos = findLogos(html, base);
      const og = [metaContent(html, ["og:image"]), metaContent(html, ["twitter:image"])].filter(Boolean);
      const images = findImages(html, base, og);
      const hero = findHero(html);

      return {
        ok: true,
        message: logos.length
          ? "Pulled your brand from your website. Change anything that isn't right."
          : "Pulled your colours and imagery. We couldn't find your logo file — upload it below.",
        website: base,
        // Only a real mark goes on the booth; we never substitute a hero photo.
        logoUrl: logos[0] ?? "",
        logoDarkUrl: logos[1] ?? "",

        primaryColor: metaContent(html, ["theme-color"]) || colors.primary,
        secondaryColor: colors.secondary,
        palette: colors.palette,
        headline:
          hero.headline || metaContent(html, ["og:title", "og:site_name"]) || title,
        subhead: hero.subhead || metaContent(html, ["og:description", "description"]).slice(0, 140),
        cta: hero.cta,
        imageUrl: images[0] ?? absolute(metaContent(html, ["og:image", "twitter:image"]), base),
        images,
      };

    } catch {
      return { ...empty, message: "That website didn't respond — enter your colours below instead." };
    }
  });
