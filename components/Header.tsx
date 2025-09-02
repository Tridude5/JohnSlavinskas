"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import Tx from "@/components/i18n/Tx";

const NAV = [
  { href: "/#about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
];

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const navRef = React.useRef<HTMLElement>(null);

  // close mobile menu on route change
  React.useEffect(() => setOpen(false), [pathname]);

  // Measure actual header height -> CSS var for anchor/scroll offset
  React.useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };

    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60"
    >
      <div className="container">
        {/* Top row */}
        <div className="flex items-center justify-between gap-3 py-3">
          {/* Brand */}
          <Link href="/" className="min-w-0 text-lg sm:text-xl font-semibold tracking-tight">
            <span className="text-emerald-500">John</span> Slavinskas
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="fancy-underline text-sm">
                <Tx>{n.label}</Tx>
              </Link>
            ))}
          </div>

          {/* Right group: Menu (mobile) then DE toggle (always) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="md:hidden inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/90 hover:bg-white/5"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Toggle menu"
            >
              <Tx>Menu</Tx>
              <svg
                className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.292 4.293a1 1 0 011.416 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.416-1.414L10.586 10 6.292 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Language toggle */}
            <div className="shrink-0">
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Mobile panel (links only) */}
        <div
          id="mobile-nav"
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-3">
            <div className="flex flex-col gap-2">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  <Tx>{n.label}</Tx>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
