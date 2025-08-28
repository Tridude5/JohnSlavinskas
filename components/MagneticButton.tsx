"use client";
import { useRef } from "react";

export default function MagneticButton({ children, className = "", ...props }: any) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${mx * 0.06}px, ${my * 0.06}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };

  return (
    <a
      ref={ref as any}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`${className} transition-transform`}
      {...props}
    >
      {children}
    </a>
  );
}
