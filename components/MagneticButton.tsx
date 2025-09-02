"use client";

import * as React from "react";
import Link from "next/link";

type Props = {
  href?: string;
  as?: "a" | "button";        // default "a"
  className?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  strength?: number;          // how “magnetic” (px of travel), default 16
  children: React.ReactNode;
};

/**
 * Magnetic + shiny button (simple version you had):
 * - Slightly follows the cursor (magnet).
 * - Radial shine that tracks mouse (using CSS vars --x/--y).
 * - Works for internal & external links and for downloads.
 * - Your `className` applies to the INNER span (so put hover styles there).
 */
export default function MagneticButton({
  href,
  as = "a",
  className = "",
  target,
  rel,
  download,
  onClick,
  strength = 16,
  children,
}: Props) {
  const ref = React.useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    // shine position
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);

    // magnet translation
    const dx = (x - r.width / 2) / (r.width / 2);
    const dy = (y - r.height / 2) / (r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  const content = (
    <span
      ref={ref as any}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      // base styles; keep your .btn/.btn-outline via className
      className={[
        "relative inline-flex items-center justify-center rounded-full transition-transform duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
        // enable shine variables with a default so SSR is fine
        "[--x:50%] [--y:50%]",
        "will-change-transform group", // group for hover effects
        className,
      ].join(" ")}
    >
      {/* Shine layer that follows the cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{
          background:
            "radial-gradient(140px 140px at var(--x) var(--y), rgba(255,255,255,0.35), rgba(255,255,255,0) 60%)",
        }}
      />
      {/* Subtle glossy top edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-60 mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.05) 40%, rgba(0,0,0,0) 60%)",
        }}
      />
      {/* actual label/content */}
      <span className="relative z-[1]">{children}</span>
    </span>
  );

  // Prefer Next <Link> for internal routes that start with "/"
  if (href && href.startsWith("/")) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  // Button variant (no href)
  if (as === "button" || !href) {
    return content;
  }

  // External or relative link <a>
  const safeRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel;
  return (
    <a href={href} target={target} rel={safeRel} download={download as any} className="inline-block">
      {content}
    </a>
  );
}
