"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Brain,
  FlaskConical,
  Beaker,
  Cpu,
  GitBranch,
  Globe,
  Rocket,
} from "lucide-react";

/** Top skills shown as animated radial meters */
const TOP_SKILLS = [
  { label: "Python", pct: 90, icon: Code2 },
  { label: "TypeScript/JS", pct: 88, icon: Globe },
  { label: "TensorFlow/Keras", pct: 84, icon: Brain },
] as const;

/** Rotating badges — picked from your list (relevant subset) */
const BADGES = [
  // Languages & Data
  "SQL", "NoSQL", "R",
  // ML / AI stack
  "TensorFlow", "Keras", "PyTorch", "Deep Learning", "Machine Learning",
  // Web & Platform
  "Next.js", "Node", "Tailwind", "GitHub Actions", "HTML/CSS",
  // Tools & Eng
  "Pandas", "NumPy", "MATLAB", "VBA", "ChemCAD",
  // Mobile (lightweight)
  "Kotlin", "Swift",
];

/** Bars for a quick glance */
const BARS = [
  { label: "Data & ML (Py)", pct: 85 },
  { label: "Web (TS/Next.js)", pct: 82 },
  { label: "Databases (SQL/NoSQL)", pct: 78 },
  { label: "Quant/Tools (MATLAB/VBA)", pct: 70 },
];

function Radial({ pct, size = 64 }: { pct: number; size?: number }) {
  const r = (size - 8) / 2; // padding for stroke
  const c = 2 * Math.PI * r;
  const progress = Math.max(0, Math.min(100, pct)) / 100;
  return (
    <svg width={size} height={size} className="block">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        className="text-white/10"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        className="text-emerald-400"
        stroke="currentColor"
        initial={{ strokeDasharray: c, strokeDashoffset: c }}
        animate={{ strokeDasharray: c, strokeDashoffset: c * (1 - progress) }}
        transition={{ type: "spring", stiffness: 110, damping: 20 }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
    </svg>
  );
}

function Bar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs text-gray-400">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function SkillsCard() {
  const [start, setStart] = React.useState(0);

  // Rotate the badges every 2.6s
  React.useEffect(() => {
    const id = setInterval(() => setStart((s) => (s + 3) % BADGES.length), 2600);
    return () => clearInterval(id);
  }, []);

  const visible = [...BADGES, ...BADGES].slice(start, start + 10);

  return (
    <aside className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-5 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Skills at a glance</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <GitBranch className="size-4" />
          <span>builder mindset</span>
        </div>
      </div>

      {/* Top meters */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {TOP_SKILLS.map(({ label, pct, icon: Icon }) => (
          <motion.div
            key={label}
            className="group relative rounded-xl border border-white/10 bg-white/[0.04] p-3"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400/0 via-emerald-400/0 to-emerald-400/0 group-hover:from-emerald-400/10 group-hover:to-cyan-400/10 transition-colors" />
            <div className="flex items-center justify-between">
              <Icon className="size-4 text-emerald-300" />
              <span className="text-xs text-gray-400">{pct}%</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Radial pct={pct} size={50} />
              <div className="text-sm font-medium">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bars */}
      <div className="mt-4 space-y-3">
        {BARS.map((b) => (
          <Bar key={b.label} {...b} />
        ))}
      </div>

      {/* Rotating badges */}
      <div className="mt-4">
        <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
          <Cpu className="size-4" />
          <span>Stack highlights</span>
        </div>

        <div className="relative">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={start}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap gap-2"
            >
              {visible.map((b, i) => (
                <motion.span
                  key={`${b}-${i}`}
                  title={b}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs"
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  {b}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tiny “materials + data + lab” footer strip */}
      <div className="mt-5 grid grid-cols-3 gap-2 text-[11px] text-gray-400">
        <div className="flex items-center gap-1">
          <FlaskConical className="size-4 text-emerald-300" />
          <span>Process/Lab</span>
        </div>
        <div className="flex items-center gap-1">
          <Database className="size-4 text-emerald-300" />
          <span>Data/Backends</span>
        </div>
        <div className="flex items-center gap-1">
          <Beaker className="size-4 text-emerald-300" />
          <span>ChemCAD/MATLAB</span>
        </div>
      </div>

      {/* Shimmer accent */}
      <div className="pointer-events-none absolute -left-10 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm"
        animate={{ x: ["0%", "160%"] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </aside>
  );
}
