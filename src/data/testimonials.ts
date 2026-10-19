export type Testimonial = {
  quote: string;
  /** Attribution — role/title where the client has not cleared their name. */
  name: string;
  role: string;
  /** Optional context used for matching a quote to a page. */
  industry?: string;
  city?: string;
  show?: string;
  /** Matching helper: lowercase keywords this quote is relevant to. */
  tags?: string[];
};

/**
 * Real client feedback. Names are held back where the client has not cleared
 * public attribution — do not invent names, companies or ratings.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I love working with the Traction X team; I know any project we run with them is in good hands. Professional, knowledgeable, great communicators — and their flexibility to work within our budget is always appreciated.",
    name: "Marketing Director",
    role: "Aerospace & Defense Client",
    industry: "Defence & Aerospace",
    tags: ["defence", "aerospace", "defense", "government", "budget"],
  },
  {
    quote:
      "They came through on a last-minute booth rental for a show in Atlanta — turned it around in less than three weeks, handled all logistics, and set us up in a professional-looking booth. Looking forward to more projects.",
    name: "Marketing Lead",
    role: "SaaS Client",
    industry: "Technology & SaaS",
    city: "Atlanta",
    tags: ["rescue", "rush", "last minute", "atlanta", "saas", "technology", "rental"],
  },
  {
    quote:
      "We worked with them for months on an extensive booth program in multiple locations. Always accommodating, always easy to reach. There truly wasn't anything they couldn't do.",
    name: "Producer",
    role: "Event Production Agency",
    industry: "Events & Agencies",
    tags: ["agency", "programme", "program", "multi-show", "events"],
  },
  {
    quote:
      "Third time using Traction X at our flagship event in San Diego, and it was outstanding start to finish. Their dedication to top-notch service made a real impact on our booth rental experience.",
    name: "Operations Coordinator",
    role: "Geospatial Software Client",
    industry: "Technology & SaaS",
    city: "San Diego",
    tags: ["san diego", "software", "geospatial", "repeat", "rental"],
  },
  {
    quote:
      "From concept to follow-through, they got it right. Excellent collaboration and support — the team kept the ball moving and got us across the finish line on time.",
    name: "Manager, Digital Media",
    role: "Public Sector Client",
    industry: "Government",
    tags: ["government", "public sector", "on time"],
  },
  {
    quote:
      "Very positive experience at the Vancouver Convention Centre. The booth was designed and installed on time and to the highest quality standard.",
    name: "Marketing",
    role: "International Development Bank",
    industry: "Financial Services",
    city: "Vancouver",
    show: "Vancouver Convention Centre",
    tags: ["vancouver", "convention centre", "finance", "bank", "quality"],
  },
];

/** Pick the testimonial that best matches a page's context. */
export function matchTestimonial(ctx: { industry?: string; city?: string; show?: string; text?: string }) {
  const hay = [ctx.industry, ctx.city, ctx.show, ctx.text].filter(Boolean).join(" ").toLowerCase();
  if (!hay) return TESTIMONIALS[0];
  let best: Testimonial | undefined;
  let bestScore = 0;
  for (const t of TESTIMONIALS) {
    let score = 0;
    if (t.city && hay.includes(t.city.toLowerCase())) score += 3;
    if (t.industry && hay.includes(t.industry.toLowerCase())) score += 3;
    for (const tag of t.tags ?? []) if (hay.includes(tag)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      best = t;
    }
  }
  return best ?? TESTIMONIALS[0];
}

/** schema.org Review nodes for the organization. No ratings — we don't have verified ones. */
export function reviewSchema(orgName: string, orgUrl: string) {
  return TESTIMONIALS.map((t) => ({
    "@type": "Review",
    reviewBody: t.quote,
    author: { "@type": "Person", name: `${t.name}, ${t.role}` },
    itemReviewed: { "@type": "Organization", name: orgName, url: orgUrl },
  }));
}
