"use client";

import * as React from "react";
import Link from "next/link";

type Props = {
  href?: string;
  as?: "a" | "button";        // default "a"
  className?: string;         // <-- put your hover styles here (applies to the OUTER element now)
  target?: string;
  rel?: string;
  download?: string | boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  strength?: number;          // px of travel, default 16
  children: React.ReactNode;
};

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
  const wrapperRef = React.useRef<HTMLElement>(null);
  const moverRef = React.useRef<HTMLSpanElement>(null);

  const prefersReducedMotion = React.useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const wrapper = wrapperRef.current;
    const mover = moverRef.current;
    if (!wrapper || !mover) return;

    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    // shine position
    mover.style.setProperty("--x", `${x}px`);
    mover.style.setProperty("--y", `${y}px`);

    // magnet translation (on inner)
    const dx = (x - r.width / 2) / (r.width / 2);
    const dy = (y - r.height / 2) / (r.height / 2);
    mover.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const onLeave = () => {
    const mover = moverRef.current;
    if (!mover) return;
    mover.style.transform = "translate(0,0)";
  };

  // Inner moving content (no hover classes here)
  const inner = (
    <span
      ref={moverRef}
      className={[
        "relative inline-flex w-full h-full items-center justify-center rounded-full",
        "transition-transform duration-150 will-change-transform [--x:50%] [--y:50%]",
      ].join(" ")}
    >
      {/* Shine layer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{
          background:
            "radial-gradient(140px 140px at var(--x) var(--y), rgba(255,255,255,0.35), rgba(255,255,255,0) 60%)",
        }}
      />
      {/* Gloss layer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-60 mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.05) 40%, rgba(0,0,0,0) 60%)",
        }}
      />
      <span className="relative z-[1]">{children}</span>
    </span>
  );

  // Common props for the OUTER element (gets your hover classes)
  const outerProps = {
    ref: wrapperRef as any,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    // outer gets the hover styles + group for inner shine
    className: [
      "inline-block group rounded-full", // base
      className,                         // your hover styles, e.g. shadow/border/bg
    ].join(" "),
  };

  // Internal routes → Next Link (when starting with "/")
  if (href && href.startsWith("/")) {
    return (
      <Link href={href} {...(outerProps as any)}>
        {inner}
      </Link>
    );
  }

  // Button variant (no href)
  if (as === "button" || !href) {
    return (
      <button type="button" {...(outerProps as any)}>
        {inner}
      </button>
    );
  }

  // External / relative links (incl. "projects", "downloads/..")
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? rel ?? "noopener noreferrer" : rel}
      download={download as any}
      {...(outerProps as any)}
    >
      {inner}
    </a>
  );
}
