"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "@/components/Header";

/**
 * Fixed, glassy header that auto-reserves space below it.
 * Adds a small base gap so content sits a little under the header.
 */
export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [height, setHeight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 👇 tweak this to taste (px)
  const BASE_GAP = 10; // small extra padding below the header

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        // Respect iOS notch
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <Header />
      </div>

      {/* Spacer equals measured header height + a little extra */}
      <div
        aria-hidden="true"
        style={{ height: height + BASE_GAP }}
        className="min-h-14 sm:min-h-16"
      />
    </>
  );
}
