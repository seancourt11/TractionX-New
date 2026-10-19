import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AdminProvider, useAdmin } from "@/lib/admin/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Users, FileText, Settings, ExternalLink, RotateCcw, KanbanSquare, Megaphone } from "lucide-react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/pipeline", label: "Pipeline", icon: KanbanSquare },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/documents", label: "Documents", icon: FileText },
  { to: "/admin/social", label: "Social", icon: Megaphone },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function Shell() {
  const { pathname } = useRouterState({ select: (s) => s.location });
  const { reset } = useAdmin();

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="flex min-h-dvh">
        <aside className="hidden w-60 shrink-0 border-r border-border/60 bg-card/40 lg:flex lg:flex-col">
          <div className="border-b border-border/60 px-5 py-5">
            <Link to="/" className="font-heading text-sm font-bold uppercase tracking-[0.2em]">
              Traction X
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">Internal workspace</p>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="space-y-3 border-t border-border/60 p-3">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" /> Reset sample data
            </Button>
            <Link
              to="/"
              className="flex items-center gap-2 px-3 pb-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Back to website
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto lg:hidden">
              {NAV.map((item) => {
                const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`whitespace-nowrap text-xs font-medium ${active ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <Badge variant="outline" className="ml-auto shrink-0 border-primary/40 text-[10px] uppercase tracking-wider text-primary">
              Design prototype — no live data
            </Badge>
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                SC
              </div>
              <div className="leading-tight">
                <p className="text-xs font-medium">Sean Court</p>
                <p className="text-[10px] text-muted-foreground">Principal</p>
              </div>
            </div>
          </header>
          <main className="px-4 py-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export function AdminLayout() {
  return (
    <AdminProvider>
      <Shell />
    </AdminProvider>
  );
}

export function PageHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
