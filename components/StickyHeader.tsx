"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";

/**
 * Makes your existing <Header /> sticky (not fixed), so spacing stays exactly as before.
 * Adds a subtle glass/border only after you start scrolling.
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
    <div
      className={[
        "sticky top-0 z-50 transition-all",
        "border-b",
        scrolled
          ? "backdrop-blur bg-black/40 border-white/10"
          : "bg-transparent border-transparent",
      ].join(" ")}
    >
      <Header />
    </div>
  );
}
