"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "@/components/Header";

/**
 * Renders your original <Header /> fixed at the top, with a glassy background on scroll.
 * Automatically inserts a spacer div matching the header's real height,
 * so you never have to guess padding in the layout.
 */
export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [height, setHeight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Track scroll for the glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure header height and update on resize/content changes
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => setHeight(el.getBoundingClientRect().height);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div
        ref={wrapRef}
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all border-b",
          scrolled
            ? "backdrop-blur bg-black/40 border-white/10"
            : "bg-transparent border-transparent",
        ].join(" ")}
      >
        {/* Your original header content (branding + language switch) */}
        <Header />
      </div>

      {/* Exact spacer so content starts right below the fixed header */}
      <div aria-hidden="true" style={{ height }} />
    </>
  );
}
