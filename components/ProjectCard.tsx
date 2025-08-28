"use client";

import React from "react";

/** Picked, relevant skills */
const TOP_SKILLS = [
  { label: "Python", pct: 90, emoji: "🐍" },
  { label: "TypeScript / JS", pct: 88, emoji: "🧩" },
  { label: "TensorFlow / Keras", pct: 84, emoji: "🧠" },
] as const;

const BARS = [
  { label: "Data & ML (Py)", pct: 85 },
  { label: "Web (Next.js/TS)", pct: 82 },
  { label: "Databases (SQL/NoSQL)", pct: 78 },
  { label: "Quant & Tools (MATLAB/VBA)", pct: 70 },
];

const BADGES = [
  "TensorFlow", "Keras", "PyTorch", "Pandas", "NumPy",
  "Next.js", "Node", "Tailwind", "HTML/CSS", "GitHub Actions",
  "SQL", "NoSQL",
  "MATLAB", "VBA", "ChemCAD",
  "Kotlin", "Swift",
  "Wireshark",
];

function Radial({ pct, size = 56 }: { pct: number; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const progress = Math.max(0, Math.min(100, pct)) / 100;

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <svg width={size} height={size} className="block">
      <circle cx={size/2} cy={size/2} r={r} stroke="currentColor" className="text-white/10" strokeWidth="6" fill="none" />
      <circle
        cx={size/2} cy={size/2} r={r} stroke="currentColor"
        className="text-emerald-400"
        strokeWidth="6" fill="none" strokeLinecap="round"
        style={{
          transform: "rotate(-90deg)", transformOrigin: "50% 50%",
          strokeDasharray: c,
          strokeDashoffset: mounted ? c * (1 - progress) : c,
          transition: "stroke-dashoffset 900ms cubic-bezier(.22,.8,.22,1)",
        }}
      />
    </svg>
  );
}

function Bar({ label, pct }: { label: string; pct: number }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs text-gray-400">
        <span>{label}</span><span>{pct}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
          style={{ width: mounted ? `${pct}%` : 0, transition: "width 800ms ease-out" }}
        />
      </div>
    </div>
  );
}

export default function SkillsCard() {
  const [start, setStart] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setStart((s) => (s + 3) % BADGES.length), 2600);
    return () => clearInterval(id);
  }, []);
  const visible = [...BADGES, ...BADGES].slice(start, start + 10);

  return (
    <aside className="relative rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-5 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Skills at a glance</h3>
        <div className="text-xs text-gray-400">materials × data × web</div>
      </div>

      {/* Top meters */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {TOP_SKILLS.map(({ label, pct, emoji }) => (
          <div key={label} className="group relative rounded-xl border border-white/10 bg-white/[0.04] p-3 hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{emoji}</span><span>{pct}%</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Radial pct={pct} size={52} />
              <div className="text-sm font-medium">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bars */}
      <div className="mt-4 space-y-3">
        {BARS.map((b) => <Bar key={b.label} {...b} />)}
      </div>

      {/* Rotating badges */}
      <div className="mt-4">
        <div className="text-xs text-gray-400 mb-2">Stack highlights</div>
        <div className="relative">
          <div className="flex flex-wrap gap-2 transition-opacity duration-200">
            {visible.map((b, i) => (
              <span key={`${b}-${i}`} className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs hover:scale-[1.06] transition-transform">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Shimmer accent */}
      <div className="pointer-events-none absolute -left-10 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm" />
      <div className="pointer-events-none absolute -left-20 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm animate-[shimmer_3.6s_ease-in-out_infinite]" />

      {/* inline keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(0) rotate(6deg); }
          100% { transform: translateX(160%) rotate(6deg); }
        }
      `}</style>
    </aside>
  );
}
