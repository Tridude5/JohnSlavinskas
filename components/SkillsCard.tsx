"use client";

import React from "react";

/* =========================
   DATA — your chosen skills
   ========================= */
const SKILLS = {
  paper: [
    "Lignin valorization",
    "Barrier coatings & surface chemistry",
    "Wet-end chemistry",
    "Fiber morphology & testing",
    "Paper physics & mechanical testing",
  ],
  csai: [
    "Python",
    "TensorFlow / Keras",
    "Flutter / Dart",
    "SQL / NoSQL",
    "Firebase (Auth/Firestore)",
    "Web development (Next.js/TS)",
  ],
  finance: [
    "Factor models (CAPM, Fama-French)",
    "Quadratic programming (portfolio)",
    "ML-driven modeling (AI-integrated)",
    "Python data science stack",
    "Backtesting pipelines",
    "Risk assessment (VaR/CVaR)",
    "Monte Carlo simulation",
    "Bayesian networks & transformers",
  ],
} as const;

type DomainKey = keyof typeof SKILLS;

const DOMAIN_META: Record<
  DomainKey,
  { label: string; startDeg: number; endDeg: number }
> = {
  paper:   { label: "Paper Engineering",         startDeg: 150, endDeg: 255 },
  csai:    { label: "Computer Science / AI",     startDeg: -75, endDeg:  35 },
  finance: { label: "Financial Engineering",     startDeg:  15, endDeg: 165 },
};

/* =========================
   UTIL
   ========================= */
const toRad = (d: number) => (d * Math.PI) / 180;
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const t = toRad(deg);
  return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) };
};
const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} ${sweep} ${p1.x} ${p1.y}`;
};

function Chip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs whitespace-nowrap leading-none shadow-sm hover:scale-[1.04] transition">
      {text}
    </span>
  );
}

/* ResizeObserver hook so the SVG scales with the card */
function useContainerWidth<T extends HTMLElement>(initial = 480) {
  const ref = React.useRef<T>(null);
  const [w, setW] = React.useState(initial);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(e.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width: w };
}

/* =========================
   SMALL-SCREEN TRI-CARDS
   ========================= */
function TriCards() {
  const groups: { k: DomainKey; title: string; items: readonly string[] }[] = [
    { k: "paper", title: DOMAIN_META.paper.label, items: SKILLS.paper },
    { k: "csai", title: DOMAIN_META.csai.label, items: SKILLS.csai },
    { k: "finance", title: DOMAIN_META.finance.label, items: SKILLS.finance },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {groups.map(({ k, title, items }) => (
        <div key={k} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="text-sm font-semibold mb-2">{title}</div>
          <div className="flex flex-wrap gap-2">
            {items.map((t) => (
              <Chip key={t} text={t} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================
   MAIN COMPONENT (Orbit v2)
   ========================= */
export default function OrbitSkillsCardV2() {
  const { ref, width } = useContainerWidth<HTMLDivElement>(520);

  // switch to Tri-Cards under ~420px
  const compact = width < 420;

  // size scales with container, capped for aesthetic
  const size = Math.min(Math.max(width, 360), 560);
  const cx = size / 2;
  const cy = size / 2;
  const orbitR = size * 0.34;  // smaller ring to keep chips well inside
  const hubR = size * 0.15;

  const chipPositions = (k: DomainKey) => {
    const items = SKILLS[k];
    const { startDeg, endDeg } = DOMAIN_META[k];
    const span = endDeg - startDeg;
    const n = items.length;
    const margin = 0.06 * Math.abs(span);
    const s = span > 0 ? startDeg + margin : startDeg - margin;
    const e = span > 0 ? endDeg - margin : endDeg + margin;

    return items.map((label, i) => {
      const deg = s + ((e - s) * (i + 1)) / (n + 1);
      // place chips INSIDE the ring
      const { x, y } = polar(cx, cy, orbitR - 18, deg);
      return { label, x, y };
    });
  };

  return (
    <aside className="relative rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-5 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Skills at a glance</h3>
        <div className="text-xs text-gray-400">materials × data × finance</div>
      </div>

      <div ref={ref} className="mt-4">
        {compact ? (
          <TriCards />
        ) : (
          <div className="relative mx-auto" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
              {/* Center hub */}
              <circle cx={cx} cy={cy} r={hubR} stroke="currentColor" strokeWidth={2} fill="none" />
              <text x={cx} y={cy - 6} textAnchor="middle" className="fill-current" style={{ fontSize: 14, fontWeight: 700 }}>
                Optimization •
              </text>
              <text x={cx} y={cy + 12} textAnchor="middle" className="fill-current" style={{ fontSize: 14, fontWeight: 700 }}>
                Modeling • Data
              </text>

              {/* Orbit arcs + labels (labels now INSIDE ring) */}
              {(Object.keys(DOMAIN_META) as DomainKey[]).map((k) => {
                const { startDeg, endDeg, label } = DOMAIN_META[k];
                const path = arc(cx, cy, orbitR, startDeg, endDeg);
                const mid = (startDeg + endDeg) / 2;
                const { x, y } = polar(cx, cy, orbitR - 44, mid);
                return (
                  <g key={k}>
                    <path d={path} stroke="currentColor" strokeWidth={2} fill="none" opacity={0.9} />
                    <text x={x} y={y} textAnchor="middle" dominantBaseline="central" className="fill-current" style={{ fontSize: 13, fontWeight: 700 }}>
                      {label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Chips (HTML overlay positioned INSIDE the ring) */}
            {(Object.keys(DOMAIN_META) as DomainKey[]).map((k) =>
              chipPositions(k).map(({ label, x, y }) => (
                <div
                  key={`${k}-${label}`}
                  className="absolute"
                  style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
                >
                  <Chip text={label} />
                </div>
              ))
            )}

            {/* Soft shimmer */}
            <div className="pointer-events-none absolute -left-16 top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm animate-[shimmer_3.6s_ease-in-out_infinite]" />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(0) rotate(6deg); }
          100% { transform: translateX(160%) rotate(6deg); }
        }
      `}</style>
    </aside>
  );
}
