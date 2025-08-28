"use client";

import React from "react";

type BarItem = { label: string; pct: number };

type Props = {
  bars?: BarItem[];
  badges?: string[];
  tsSnippet?: string;
  pySnippet?: string;
  sparklineHeights?: number[];
};

function Bar({ label, pct }: BarItem) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs text-gray-400">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

export default function ProgrammingShowcase({
  bars = [
    { label: "TypeScript / JavaScript", pct: 88 },
    { label: "Python (data/ML)", pct: 85 },
    { label: "SQL / NoSQL", pct: 78 },
    { label: "Kotlin / Swift (lightweight)", pct: 55 },
  ],
  badges = [
    "Next.js",
    "Node",
    "Tailwind",
    "Firebase",
    "TensorFlow",
    "Keras",
    "Pandas",
    "NumPy",
    "GitHub Actions",
  ],
  tsSnippet = `// HSP proximity demo (TS)
const r = (x:number[]) => Math.hypot(...x);
function proximity(a:number[], b:number[]) {
  const d = a.map((v,i)=>v-b[i]);
  return +(1 - r(d)/r(a)).toFixed(2);
}
console.log('HSP:', proximity([18,10,7],[17.8,8.5,6.8]));`,
  pySnippet = `# HSP proximity demo (Py)
import math
def proximity(a,b):
    d=[ai-bi for ai,bi in zip(a,b)]
    r=lambda x: math.hypot(*x)
    return round(1 - r(d)/r(a), 2)
print("HSP:", proximity([18,10,7],[17.8,8.5,6.8]))`,
  sparklineHeights = [4, 7, 2, 9, 6, 10, 5, 8, 3, 9, 7, 11],
}: Props) {
  const [lang, setLang] = React.useState<"ts" | "py">("ts");

  return (
    <aside className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-5 shadow-xl">
      <h3 className="font-semibold">Programming Showcase</h3>

      {/* language bars */}
      <div className="mt-4 space-y-3">
        {bars.map((b) => (
          <Bar key={b.label} {...b} />
        ))}
      </div>

      {/* stack badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {badges.map((b) => (
          <Badge key={b}>{b}</Badge>
        ))}
      </div>

      {/* mini activity sparkline (pure CSS) */}
      <div className="mt-5">
        <div className="text-xs text-gray-400 mb-2">Recent commits</div>
        <div className="flex items-end gap-1 h-10">
          {sparklineHeights.map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-sm bg-emerald-400/70 animate-pulse"
              style={{ height: `${h * 0.22}rem`, animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </div>

      {/* tiny code tabs */}
      <div className="mt-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-3">
        <div className="flex gap-2">
          <button
            onClick={() => setLang("ts")}
            className={`px-2 py-1 text-xs rounded ${
              lang === "ts" ? "bg-emerald-500/20 border border-emerald-500/40" : "border border-white/10"
            }`}
          >
            TypeScript
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setLang("py")}
            className={`px-2 py-1 text-xs rounded ${
              lang === "py" ? "bg-emerald-500/20 border border-emerald-500/40" : "border border-white/10"
            }`}
          >
            Python
          </button>
        </div>
        <pre className="mt-2 font-mono text-xs whitespace-pre-wrap">
          {lang === "ts" ? tsSnippet : pySnippet}
        </pre>
      </div>
    </aside>
  );
}
