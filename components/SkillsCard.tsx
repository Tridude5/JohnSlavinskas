"use client";

import React from "react";

/** =========================
 *  DATA — EDIT FREELY
 *  ========================= */
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
  // Angles define the arc along a ring around the center (clockwise, degrees)
  paper: { label: "Paper Engineering", startDeg: 140, endDeg: 260 },
  csai: { label: "Computer Science / AI", startDeg: -80, endDeg: 40 },
  finance: { label: "Financial Engineering", startDeg: 20, endDeg: 160 },
};

/** =========================
 *  UTIL
 *  ========================= */
function degToRad(d: number) {
  return (d * Math.PI) / 180;
}
function polarToXY(
  cx: number,
  cy: number,
  r: number,
  deg: number
): { x: number; y: number } {
  const t = degToRad(deg);
  return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) };
}
function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
) {
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  const p0 = polarToXY(cx, cy, r, startDeg);
  const p1 = polarToXY(cx, cy, r, endDeg);
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${p1.x} ${p1.y}`;
}

/** =========================
 *  CHIP
 *  ========================= */
function Chip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs leading-none whitespace-nowrap hover:scale-[1.05] transition-transform">
      {text}
    </span>
  );
}

/** =========================
 *  MAIN CARD
 *  ========================= */
export default function OrbitSkillsCard() {
  // Canvas size (px). Scales responsively via CSS but keeps a stable internal coordinate system.
  const size = 420; // tweak if you want it larger
  const cx = size / 2;
  const cy = size / 2;
  const orbitR = size * 0.38; // orbit ring radius
  const hubR = size * 0.14; // center hub radius

  // For each domain, compute even angles along its arc (skip endpoints slightly)
  function chipPositions(domain: DomainKey) {
    const items = SKILLS[domain];
    const { startDeg, endDeg } = DOMAIN_META[domain];
    const span = endDeg - startDeg;
    const n = items.length;
    // leave small margins (5%) on each end of the arc
    const margin = 0.05 * Math.abs(span);
    const s = span > 0 ? startDeg + margin : startDeg - margin;
    const e = span > 0 ? endDeg - margin : endDeg + margin;

    return items.map((label, i) => {
      const t = i + 1;
      const T = n + 1;
      const deg = s + ((e - s) * t) / T;
      const { x, y } = polarToXY(cx, cy, orbitR, deg);
      // Pull chips slightly outward so they don't sit on the line
      const { x: xOut, y: yOut } = polarToXY(cx, cy, orbitR + 14, deg);
      return { label, x: xOut, y: yOut };
    });
  }

  return (
    <aside className="relative rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-5 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Skills at a glance</h3>
        <div className="text-xs text-gray-400">materials × data × finance</div>
      </div>

      <div className="mt-4 relative w-full">
        {/* SVG canvas (square) */}
        <div className="mx-auto" style={{ width: "100%", maxWidth: size }}>
          <div
            className="relative"
            style={{ width: size, height: size, margin: "0 auto" }}
          >
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="block"
            >
              {/* Hub circle */}
              <circle
                cx={cx}
                cy={cy}
                r={hubR}
                className="fill-transparent"
                stroke="currentColor"
                strokeWidth={2}
                opacity={0.9}
              />
              {/* Hub label */}
              <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-current"
                style={{ fontSize: 14, fontWeight: 700 }}
              >
                {"Optimization •"}
              </text>
              <text
                x={cx}
                y={cy + 16}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-current"
                style={{ fontSize: 14, fontWeight: 700 }}
              >
                {"Modeling • Data"}
              </text>

              {/* Orbit rings (three arcs) */}
              {(Object.keys(DOMAIN_META) as DomainKey[]).map((k) => {
                const { startDeg, endDeg, label } = DOMAIN_META[k];
                const path = arcPath(cx, cy, orbitR, startDeg, endDeg);
                // Arc title position (midpoint of arc + small offset outward)
                const mid = (startDeg + endDeg) / 2;
                const { x, y } = polarToXY(cx, cy, orbitR + 42, mid);

                return (
                  <g key={k}>
                    <path
                      d={path}
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      opacity={0.9}
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-current"
                      style={{ fontSize: 13, fontWeight: 700 }}
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Chips (HTML for easy styling) */}
            {(Object.keys(DOMAIN_META) as DomainKey[]).map((k) =>
              chipPositions(k).map(({ label, x, y }) => (
                <div
                  key={`${k}-${label}`}
                  className="absolute"
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "auto",
                  }}
                >
                  <Chip text={label} />
                </div>
              ))
            )}

            {/* Subtle shimmer accent */}
            <div className="pointer-events-none absolute -left-16 top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm animate-[shimmer_3.6s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* inline keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(0) rotate(6deg);
          }
          100% {
            transform: translateX(160%) rotate(6deg);
          }
        }
      `}</style>
    </aside>
  );
}
