import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { NAV, SITE, type NavChild, type NavItem } from "@/lib/site";
import { useCityContext } from "@/lib/city-context";
import { Design3DButton, BookMeetingButton, useCta } from "@/components/GlobalCta";
import { openSiteSearch } from "@/components/SiteSearch";
import { useShortlist } from "@/lib/shortlist";

/** Saved-designs counter. Renders nothing until the visitor saves a booth. */
function ShortlistLink() {
  const { count } = useShortlist();
  if (!count) return null;
  return (
    <Link
      to="/shortlist"
      className="hidden md:inline-flex items-center gap-2 whitespace-nowrap border border-[oklch(0.78_0.13_300)] text-[oklch(0.78_0.13_300)] px-3 py-2 rounded-lg text-sm hover:bg-[oklch(0.78_0.13_300)]/10"
    >
      ★ Saved
      <span className="rounded-full bg-[oklch(0.78_0.13_300)] text-black text-[11px] font-bold px-1.5">{count}</span>
    </Link>
  );
}

function groupChildren(children: NavChild[]) {
  const groups: { title: string; links: NavChild[] }[] = [];
  for (const c of children) {
    const title = c.group ?? "";
    let g = groups.find((x) => x.title === title);
    if (!g) {
      g = { title, links: [] };
      groups.push(g);
    }
    g.links.push(c);
  }
  return groups;
}

export function SiteHeader() {
  const { openQuote } = useCta();
  const city = useCityContext();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const ctaLabel = city ? city.ctaText : "Request a Quote";
  const panelCols = (item: NavItem) =>
    (item.children?.length ?? 0) > 14 ? "md:grid-cols-3" : "md:grid-cols-2";


  return (
    <>
      <div className="hidden md:block border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phoneDisplay}</a>
            <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
          </div>
          <span className="text-white/40">Global trade show exhibits & activations</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Traction X" className="h-12 w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center gap-5 text-sm text-white/80">
            {NAV.map((item, i) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                {item.href ? (
                  <Link to={item.href} className="hover:text-white transition-colors py-2 whitespace-nowrap">
                    {item.label}
                  </Link>
                ) : (
                  <button className="hover:text-white transition-colors py-2">{item.label}</button>
                )}
                {item.children && (
                  <div
                    className={`absolute top-full pt-3 ${i >= NAV.length - 2 ? "right-0" : "left-0"} ${
                      open === item.label ? "" : "pointer-events-none hidden opacity-0"
                    }`}
                  >
                    <div className="rounded-2xl border border-white/10 bg-black/95 backdrop-blur shadow-2xl p-6 w-max max-w-[min(90vw,900px)]">
                      <div className={`grid grid-cols-1 ${panelCols(item)} gap-x-10 gap-y-6`}>
                        {groupChildren(item.children).map((g) => (
                          <div key={g.title} className="min-w-[200px]">
                            {g.title && (
                              <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2">
                                {g.title}
                              </div>
                            )}
                            <ul className="space-y-1">
                              {g.links.map((c) => (
                                <li key={c.href}>
                                  <Link
                                    to={c.href}
                                    className="block px-2 py-1.5 -mx-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md"
                                  >
                                    {c.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {item.cta && (
                        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => openQuote({ source: `nav-${item.label}` })}
                            className="bg-[oklch(0.78_0.13_300)] text-black px-4 py-2 rounded-lg font-semibold text-sm"
                          >
                            {item.cta.label}
                          </button>
                          <Design3DButton
                            label="Free 3D design"
                            variant="ghost"
                            source={`nav-${item.label}`}
                            className="text-sm text-white/70"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openSiteSearch}
              aria-label="Search"
              className="hidden md:inline-flex items-center gap-2 whitespace-nowrap border border-white/15 text-white/70 px-3 py-2 rounded-lg text-sm hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.78_0.13_300)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <span className="hidden 2xl:inline">Search</span>
              <span className="hidden 2xl:inline text-[10px] text-white/40 border border-white/15 rounded px-1 py-0.5">⌘K</span>
            </button>
            <ShortlistLink />
            {/* Meeting booking deliberately lives in the mobile menu and inside the
                quote/design modals — a third peer button here splits attention. */}
            <Design3DButton
              label="Free 3D design"
              source="header"
              className="hidden lg:inline-flex whitespace-nowrap !px-4 !py-2 !rounded-lg text-sm"
            />
            <button
              type="button"
              onClick={() => openQuote({ source: "header" })}
              className="hidden sm:inline-flex whitespace-nowrap border border-white/25 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.78_0.13_300)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {ctaLabel}
            </button>

            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className="h-0.5 bg-white" />
                <span className="h-0.5 bg-white" />
                <span className="h-0.5 bg-white" />
              </div>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black max-h-[70vh] overflow-y-auto">
            <div className="px-6 py-4 space-y-4">
              <div className="flex flex-col gap-2 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openSiteSearch();
                  }}
                  className="flex items-center justify-center gap-2 border border-white/15 text-white/80 rounded-lg !py-2.5 text-sm"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  Search
                </button>
                <Design3DButton source="mobile-nav" className="justify-center !py-2.5 text-sm" />
                <BookMeetingButton source="mobile-nav" className="justify-center !py-2.5 text-sm" />
              </div>
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-white/10 pb-3">
                  <div className="flex items-center justify-between gap-3">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="block font-semibold text-white py-1"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div className="font-semibold text-white py-1">{item.label}</div>
                    )}
                    {item.children && (
                      <button
                        type="button"
                        aria-expanded={mobileSection === item.label}
                        aria-label={`Toggle ${item.label} menu`}
                        onClick={() =>
                          setMobileSection((v) => (v === item.label ? null : item.label))
                        }
                        className="text-white/60 px-2 py-1 text-lg leading-none"
                      >
                        {mobileSection === item.label ? "−" : "+"}
                      </button>
                    )}
                  </div>
                  {item.children && mobileSection === item.label && (
                    <div className="mt-2 ml-1 space-y-4">
                      {groupChildren(item.children).map((g) => (
                        <div key={g.title}>
                          {g.title && (
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-1.5">
                              {g.title}
                            </div>
                          )}
                          <div className="space-y-1.5">
                            {g.links.map((c) => (
                              <Link
                                key={c.href}
                                to={c.href}
                                className="block text-sm text-white/70"
                                onClick={() => setMobileOpen(false)}
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>
        )}
      </header>
    </>
  );
}
