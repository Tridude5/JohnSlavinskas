"use client";

import React from "react";

/** ──────────────────────────────────────────────────────────────────────────
 *  SKILL LEVELS (no percentages)
 *  - daily     = you use it constantly
 *  - confident = you can ship with it solo
 *  - familiar  = you’ve used it, can ramp quickly
 *  Edit freely below.
 *  ────────────────────────────────────────────────────────────────────────── */
type Level = "daily" | "confident" | "familiar";

type Item = { label: string; level: Level };
type Group = { key: string; title: string; items: Item[] };

const STACK: Group[] = [
  {
    key: "languages",
    title: "Languages",
    items: [
      { label: "TypeScript / JavaScript", level: "daily" },
      { label: "Python", level: "daily" },
      { label: "Dart", level: "confident" },
      { label: "SQL", level: "confident" },
      { label: "Kotlin", level: "familiar" },
      { label: "Swift", level: "familiar" },
    ],
  },
  {
    key: "web",
    title: "Web & APIs",
    items: [
      { label: "Next.js / React", level: "daily" },
      { label: "Node / Express", level: "confident" },
      { label: "FastAPI", level: "confident" },
      { label: "Tailwind CSS", level: "daily" },
      { label: "REST design", level: "confident" },
      { label: "Auth (JWT/OAuth)", level: "confident" },
    ],
  },
  {
    key: "mobile",
    title: "Mobile",
    items: [
      { label: "Flutter / Dart", level: "confident" },
      { label: "State mgmt (Provider/Bloc)", level: "familiar" },
    ],
  },
  {
    key: "data_ml",
    title: "Data & ML",
    items: [
      { label: "Pandas / NumPy", level: "daily" },
      { label: "TensorFlow / Keras", level: "confident" },
      { label: "scikit-learn", level: "confident" },
      { label: "SciPy / statsmodels", level: "confident" },
      { label: "Transformers & Bayesian nets", level: "familiar" },
      { label: "Matplotlib / Plotly", level: "confident" },
    ],
  },
  {
    key: "db_cloud",
    title: "Databases & Cloud",
    items: [
      { label: "Postgres (SQL)", level: "confident" },
      { label: "Firestore (NoSQL)", level: "daily" },
      { label: "Firebase Auth/Storage", level: "daily" },
      { label: "Caching & pagination patterns", level: "confident" },
      { label: "Schema design", level: "confident" },
    ],
  },
  {
    key: "devops",
    title: "DevOps & Tooling",
    items: [
      { label: "Git / GitHub", level: "daily" },
      { label: "GitHub Actions (CI)", level: "daily" },
      { label: "Vercel deploys", level: "confident" },
      { label: "Docker (light)", level: "familiar" },
      { label: "Testing (jest/pytest)", level: "confident" },
      { label: "Linting/format (ESLint/Prettier)", level: "daily" },
    ],
  },
  {
    key: "quant",
    title: "Quant & Optimization (code)",
    items: [
      { label: "cvxpy / optimization", level: "confident" },
      { label: "Backtesting pipelines", level: "confident" },
      { label: "Monte Carlo engines", level: "confident" },
      { label: "Risk metrics (VaR/CVaR)", level: "confident" },
      { label: "QuantLib (basic)", level: "familiar" },
    ],
  },
];

/** ──────────────────────────────────────────────────────────────────────────
 *  VISUALS
 *  ────────────────────────────────────────────────────────────────────────── */
function lvlClasses(level: Level) {
  switch (level) {
    case "daily":
      return "border-emerald-300/30 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20";
    case "confident":
      return "border-sky-300/25 bg-gradient-to-r from-sky-400/15 to-indigo-400/15";
    default:
      return "border-white/15 bg-white/5";
  }
}
function LvlDot({ level }: { level: Level }) {
  const fill =
    level === "daily"
      ? "bg-emerald-400"
      : level === "confident"
      ? "bg-sky-400"
      : "bg-white/40";
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${fill}`} />;
}

function Chip({ item, i }: { item: Item; i: number }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs whitespace-nowrap leading-none",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_6px_16px_-10px_rgba(0,0,0,0.6)] backdrop-blur",
        "hover:scale-[1.05] transition-transform duration-150",
        lvlClasses(item.level),
      ].join(" ")}
      style={{ animation: "chipIn .35s both", animationDelay: `${i * 30}ms` }}
    >
      <LvlDot level={item.level} />
      {item.label}
    </span>
  );
}

function GroupCard({ g }: { g: Group }) {
  const [open, setOpen] = React.useState(true); // show all by default
  const limit = 6;
  const items = open ? g.items : g.items.slice(0, limit);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur">
      <div className="mb-2 flex items-baseline justify-between">
        <div className="text-sm font-semibold">{g.title}</div>
        {g.items.length > limit && (
          <button
            onClick={() => setOpen((s) => !s)}
            className="text-[11px] rounded-md border border-white/10 px-2 py-0.5 hover:bg-white/10 transition"
          >
            {open ? "Collapse" : "Show all"}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <Chip key={it.label} item={it} i={i} />
        ))}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-300">
      <span className="opacity-80">Legend:</span>
      <span className="inline-flex items-center gap-1">
        <LvlDot level="daily" /> Daily
      </span>
      <span className="inline-flex items-center gap-1">
        <LvlDot level="confident" /> Confident
      </span>
      <span className="inline-flex items-center gap-1">
        <LvlDot level="familiar" /> Familiar
      </span>
    </div>
  );
}

/** ──────────────────────────────────────────────────────────────────────────
 *  MAIN
 *  ────────────────────────────────────────────────────────────────────────── */
type Props = {
  tsSnippet?: string;
  pySnippet?: string;
  sparklineHeights?: number[];
};

export default function ProgrammingShowcase({
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
  const code = lang === "ts" ? tsSnippet : pySnippet;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {}
  };

  return (
    <aside className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-5 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Programming Showcase</h3>
        <Legend />
      </div>

      {/* Stack matrix */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {STACK.map((g) => (
          <GroupCard key={g.key} g={g} />
        ))}
      </div>

      {/* activity sparkline */}
      <div className="mt-5">
        <div className="mb-2 text-xs text-gray-400">Recent commits</div>
        <div className="flex h-10 items-end gap-1">
          {sparklineHeights.map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-sm bg-emerald-400/70 animate-pulse"
              style={{ height: `${h * 0.22}rem`, animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </div>

      {/* code snippets */}
      <div className="mt-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang("ts")}
            className={`px-2 py-1 text-xs rounded border ${
              lang === "ts" ? "bg-emerald-500/20 border-emerald-500/40" : "border-white/10 hover:bg-white/10"
            }`}
          >
            TypeScript
          </button>
          <button
            onClick={() => setLang("py")}
            className={`px-2 py-1 text-xs rounded border ${
              lang === "py" ? "bg-emerald-500/20 border-emerald-500/40" : "border-white/10 hover:bg-white/10"
            }`}
          >
            Python
          </button>

          <div className="ml-auto">
            <button
              onClick={copy}
              className="text-xs rounded-md border border-white/10 px-2 py-1 hover:bg-white/10 transition"
              aria-label="Copy code"
            >
              Copy
            </button>
          </div>
        </div>
        <pre className="mt-2 font-mono text-xs whitespace-pre-wrap leading-relaxed">
{code}
        </pre>
      </div>

      <style jsx>{`
        @keyframes chipIn {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </aside>
  );
}
