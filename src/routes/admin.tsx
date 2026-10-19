import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { noindexMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Traction X — Internal Workspace" }, ...noindexMeta()],
  }),
  component: AdminLayout,
});
