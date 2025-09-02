"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "@/components/Header";

/**
 * Keeps your <Header /> exactly as-is, but sticky.
 * Also measures its height and exposes it as --header-h on :root,
 * so we can offset in-page scrolling (anchors, scrollIntoView) cleanly.
 */
export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Track scroll to apply the glass/border when not at the very top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure header height and write to :root as --header-h
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };

    setVar();

    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={[
        "sticky top-0 z-50 transition-colors",
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
