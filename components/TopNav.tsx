// /components/StickyHeader.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";

/**
 * Wraps your existing <Header /> so:
 * - Content/design (branding, language switch, etc.) stay EXACTLY the same.
 * - Adds fixed-on-top + glass background on scroll.
 */
export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // set initial state on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all",
        "border-b",
        scrolled
          ? "backdrop-blur bg-black/40 border-white/10"
          : "bg-transparent border-transparent",
      ].join(" ")}
    >
      {/* Your original header renders inside unchanged */}
      <Header />
    </div>
  );
}
