"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type KPIItem = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  spark?: number[];
};

export default function KPIs({ items }: { items: KPIItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(true)),
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((it) => (
        <KpiCard key={it.label} active={active} {...it} />
      ))}
    </div>
  );
}

function KpiCard({
  label, value, prefix = "", suffix = "", decimals = 0, spark = [], active
}: KPIItem & { active: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) { setDisplay(value); return; }

    let raf = 0;
    const start = performance.now(), dur = 1200;
    const from = 0, to = value;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  const { min, max } = useMemo(() => {
    if (!spark.length) return { min: 0, max: 0 };
    let mi = spark[0], ma = spark[0];
    for (const v of spark) { if (v < mi) mi = v; if (v > ma) ma = v; }
    if (mi === ma) ma = mi + 1;
    return { min: mi, max: ma };
  }, [spark]);

  const path = useMemo(() => {
    if (!spark.length) return "";
    const W = 120, H = 36, P = 4;
    const rng = max - min;
    const step = (W - P * 2) / (spark.length - 1 || 1);
    const y = (v: number) => H - P - ((v - min) / rng) * (H - P * 2);
    return spark.map((v, i) => `${i ? "L" : "M"} ${P + i * step} ${y(v)}`).join(" ");
  }, [spark, min, max]);

  return (
    <div className="card-gradient rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-4 bg-white/40 dark:bg-gray-900/30 backdrop-blur-sm">
      <div className="text-2xl font-semibold">
        {prefix}
        {display.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
        {suffix}
      </div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
      {spark.length > 0 && (
        <svg viewBox="0 0 120 36" className="mt-3 w-full">
          <path d={path} fill="none" className="stroke-emerald-500 dark:stroke-emerald-400" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
}
