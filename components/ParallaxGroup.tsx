"use client";
import { useEffect } from "react";

export default function ParallaxGroup({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-parallax]");
    const onScroll = () => {
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      if (reduce) return;
      const y = window.scrollY;
      els.forEach((el) => {
        const speed = Number(el.dataset.parallax || 0.15);
        el.style.transform = `translateY(${y * speed * 0.05}px)`; // subtle
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <>{children}</>;
}
