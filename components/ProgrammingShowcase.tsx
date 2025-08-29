"use client";

import React from "react";

/* ── Data: reorder freely ───────────────────────────── */
type Level = "daily" | "confident" | "familiar";
type Item  = { label: string; level: Level };

const LANGUAGES: Item[] = [
  { label: "TypeScript / JavaScript", level: "daily" },
  { label: "Python",                   level: "daily" },
  { label: "SQL",                      level: "confident" },
  { label: "Dart",                     level: "confident" },
  { label: "Kotlin",                   level: "familiar" },
  { label: "Swift",                    level: "familiar" },
];

const PACKAGES: Item[] = [
  // data / ML
  { label: "Pandas",                   level: "daily" },
  { label: "NumPy",                    level: "daily" },
  { label: "TensorFlow / Keras",       level: "confident" },
  { label: "scikit-learn",             level: "confident" },
  { label: "SciPy",                    level: "confident" },
  { label: "statsmodels",              level: "confident" },
  { label: "Matplotlib",               level: "confident" },
  { label: "Plotly",                   level: "confident" },
  // quant / opt
  { label: "cvxpy",                    level: "confident" },
  { label: "QuantLib (basic)",         level: "familiar" },
  // modeling families
  { label: "Transformers (HF)",        level: "familiar" },
  { label: "Bayesian networks (pgmpy)",level: "familiar" },
];

/* ── Visual meta (3 colors) ─────────────────────────── */
const LEVELS: Record<Level, { title: string; note: string; chip: string; dot: string; glow: string }> = {
  daily: {
    title: "Daily", note: "use all the time",
    chip: "border-emerald-300/30 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20",
    dot:  "bg-emerald-400",
    glow: "from-emerald-400/60 to-cyan-400/60",
  },
  confident: {
    title: "Confident", note: "ship independently",
    chip: "border-sky-300/25 bg-gradient-to-r from-sky-400/15 to-indigo-400/15",
    dot:  "bg-sky-400",
    glow: "from-sky-400/60 to-indigo-400/60",
  },
  familiar: {
    title: "Familiar", note: "ramp fast",
    chip: "border-white/15 bg-white/5",
    dot:  "bg-white/40",
    glow: "from-zinc-200/40 to-white/30",
  },
};

function Chip({ text, chip, dot, i }: { text: string; chip: string; dot: string; i: number }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap leading-none",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_6px_16px_-10px_rgba(0,0,0,0.6)] backdrop-blur",
        "hover:scale-[1.05] transition-transform duration-150",
        chip,
      ].join(" ")}
      style={{ animation: "chipIn .35s both", animationDelay: `${i * 28}ms` }}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {text}
    </span>
  );
}

function GroupCard({
  title, items, level,
}: {
  title: string; items: Item[]; level: Level;
}) {
  const meta = LEVELS[level];
  const labels = items.filter((it) => it.level === level).map((it) => it.label);
  if (!labels.length) return null;

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur overflow-hidden">
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${meta.glow} opacity-15`} />
      <div className="mb-2 flex items-baseline justify-between">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[11px] text-gray-300">{meta.note}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {labels.map((t, i) => (
          <Chip key={t} text={t} chip={meta.chip} dot={meta.dot} i={i} />
        ))}
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────── */
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
  sparklineHeights = [4,7,2,9,6,10,5,8,3,9,7,11],
}: Props) {
  const [level, setLevel] = React.useState<Level>("daily");
  const [lang, setLang] = React.useState<"ts" | "py">("ts");
  const code = lang === "ts" ? tsSnippet : pySnippet;

  const copy = async () => { try { await navigator.clipboard.writeText(code); } catch {} };

  return (
    <aside className="relative isolate min-w-0 w-full max-w-[720px] rounded-3xl border border-white/10 bg-black/30 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Programming Showcase</h3>
        <div className="flex items-center gap-3 text-[11px] text-gray-300">
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Daily</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> Confident</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-white/40" /> Familiar</span>
        </div>
      </div>

      {/* full-width level tabs */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-1 grid grid-cols-3 gap-1">
        {(["daily","confident","familiar"] as Level[]).map((lv) => (
          <button
            key={lv}
            className={`text-xs px-3 py-2 rounded-lg border transition w-full ${
              lv === level ? "border-white/25 bg-white/15" : "border-white/10 hover:bg-white/10"
            }`}
            onClick={() => setLevel(lv)}
          >
            {LEVELS[lv].title}
          </button>
        ))}
      </div>

      {/* two simple cards that always fit */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <GroupCard title="Languages" items={LANGUAGES} level={level} />
        <GroupCard title="Packages"  items={PACKAGES}  level={level} />
      </div>

      {/* extras (kept compact) */}
      <details className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <summary className="cursor-pointer text-xs text-gray-300">Activity & snippets</summary>
        <div className="mt-3">
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
        <div className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-3">
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
            <button
              onClick={copy}
              className="ml-auto text-xs rounded-md border border-white/10 px-2 py-1 hover:bg-white/10 transition"
              aria-label="Copy code"
            >
              Copy
            </button>
          </div>
          <pre className="mt-2 font-mono text-xs whitespace-pre-wrap leading-relaxed">
{code}
          </pre>
        </div>
      </details>

      <style jsx>{`
        @keyframes chipIn {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </aside>
  );
}
