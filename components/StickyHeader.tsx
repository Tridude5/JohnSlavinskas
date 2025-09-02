"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";

/**
 * Fixed, glassy header with a deterministic spacer:
 * - Uses CSS vars for height (no JS measuring -> no jumps)
 * - Spacer includes iOS safe-area and a small base gap
 */
export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Fixed header */}
      <div
        className={[
          "fixed top-0 inset-x-0 z-50 border-b transition-all",
          scrolled
            ? "backdrop-blur bg-black/40 border-white/10"
            : "bg-transparent border-transparent",
        ].join(" ")}
        // Respect iOS notch
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {/* Force a known header height at each breakpoint */}
        <div className="h-[var(--header-h)] flex items-center">
          <Header />
        </div>
      </div>

      {/* Exact spacer: header height + safe-area + small base gap */}
      <div
        aria-hidden="true"
        className="w-full"
        style={{
          height:
            "calc(var(--header-h) + env(safe-area-inset-top) + var(--header-gap))",
        }}
      />
    </>
  );
}
