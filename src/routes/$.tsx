import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { resolveLegacyRedirect } from "../data/legacy-redirects";

/**
 * Catch-all route. Any URL that doesn't match a real route is checked against
 * the beaumontandco.ca legacy URL map and 301-redirected to its closest
 * current equivalent, so link equity survives the move to tractionx.ca.
 */
export const Route = createFileRoute("/$")({
  loader: ({ params }) => {
    const raw = "/" + ((params as { _splat?: string })._splat ?? "");
    const to = resolveLegacyRedirect(raw);
    if (to && to !== raw) {
      throw redirect({ href: to, statusCode: 301, throw: true });
    }
    throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Page not found | Traction X" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => null,
});
