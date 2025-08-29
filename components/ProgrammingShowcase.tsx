"use client";

import React from "react";

/* ----------------------- Data ----------------------- */
type Level = "daily" | "confident" | "familiar";
type Item  = { label: string; level: Level };

const LANGUAGES: Item[] = [
  { label: "Python",                   level: "daily" },
  { label: "Dart",                     level: "daily" },
  { label: "TypeScript / JavaScript",  level: "confident" },
  { label: "SQL",                      level: "confident" },
  { label: "MATLAB",                   level: "confident" },
  { label: "VBA",                      level: "familiar" },
  { label: "R",                        level: "familiar" },
  { label: "Java",                     level: "familiar" },
  { label: "PHP",                      level: "familiar" },
  { label: "Kotlin",                   level: "familiar" },
  { label: "Swift",                    level: "familiar" },
  { label: "HTML/CSS",                 level: "familiar" }
];

const PACKAGES: Item[] = [
  { label: "Pandas",                   level: "daily" },
  { label: "NumPy",                    level: "daily" },
  { label: "TensorFlow / Keras",       level: "daily" },
  { label: "Matplotlib",               level: "daily" },
  { label: "scikit-learn",             level: "confident" },
  { label: "SciPy",                    level: "confident" },
  { label: "statsmodels",              level: "confident" },
  { label: "Plotly",                   level: "confident" },
  { label: "cvxpy",                    level: "confident" },
  { label: "PyTorch",                  level: "familiar" },
  { label: "QuantLib (basic)",         level: "familiar" },
  { label: "Transformers (HF)",        level: "familiar" },
  { label: "Bayesian networks (pgmpy)",level: "familiar" },
  { label: "Godot",                    level: "familiar" },
  { label: "ChemCAD",                  level: "familiar" }
];

/* ---------------------- Styling --------------------- */
const LEVELS: Record<Level, { title: string; note: string; chip: string; dot: string; glow: string }> = {
  daily:     { title: "Daily",     note: "use all the time",  chip: "border-emerald-300/30 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20", dot: "bg-emerald-400", glow: "from-emerald-400/60 to-cyan-400/60" },
  confident: { title: "Confident", note: "ship independently",chip: "border-sky-300/25 bg-gradient-to-r from-sky-400/15 to-indigo-400/15",      dot: "bg-sky-400",     glow: "from-sky-400/60 to-indigo-400/60" },
  familiar:  { title: "Familiar",  note: "ramp fast",         chip: "border-white/15 bg-white/5",                                                 dot: "bg-white/40",    glow: "from-zinc-200/40 to-white/30" }
};

function Chip({ text, chip, dot, i }: { text: string; chip: string; dot: string; i: number }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap leading-none",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_6px_16px_-10px_rgba(0,0,0,0.6)] backdrop-blur",
        "hover:scale-[1.05] transition-transform duration-150",
        chip
      ].join(" ")}
      style={{ animation: "chipIn .35s both", animationDelay: `${i * 28}ms` }}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {text}
    </span>
  );
}

function GroupCard({ title, items, level }: { title: string; items: Item[]; level: Level }) {
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
        {labels.map((t, i) => <Chip key={t} text={t} chip={meta.chip} dot={meta.dot} i={i} />)}
      </div>
    </div>
  );
}

/* -------- Inline 52-week GitHub graph (reads static JSON) ---- */
function GitHubYearGraphInline({ githubUser = "Tridude5", heightRem = 10, rounded = true }:{
  githubUser?: string; heightRem?: number; rounded?: boolean;
}) {
  const [weeks, setWeeks] = React.useState<number[] | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
        const res = await fetch(`${base}/github-contrib.json`, { cache: "no-store" });
        if (!res.ok) throw new Error("not ok");
        const data = await res.json();
        if (alive) setWeeks(Array.isArray(data?.weeks) ? data.weeks : []);
      } catch (e: any) {
        if (alive) setErr(e?.message || "Failed to load");
      }
    })();
    return () => { alive = false; };
  }, []);

  const total = (weeks || []).reduce((s, x) => s + x, 0);
  const avg   = weeks && weeks.length ? Math.round((total / weeks.length) * 10) / 10 : 0;
  const max   = weeks && weeks.length ? Math.max(...weeks) : 0;

  if (err)     return <div className="text-xs text-red-300">Couldn’t load commits.</div>;
  if (!weeks)  return <div className="text-xs text-gray-400">Loading commits…</div>;

  return (
    <a href={`https://github.com/${githubUser}`} target="_blank" rel="noreferrer" className="block group" aria-label={`Open ${githubUser} on GitHub`}>
      <div className="flex items-end gap-[3px]" style={{ height: `${heightRem}rem` }}>
        {weeks.map((count, i) => {
          const hPx = max > 0 ? Math.max(2, Math.round((count / max) * heightRem * 16)) : 2;
          const style: React.CSSProperties = mounted
            ? { height: hPx, transition: "height 480ms cubic-bezier(.22,.8,.22,1)", transitionDelay: `${i * 8}ms` }
            : { height: 2 };
          return (
            <div
              key={i}
              className={[
                "w-[calc((100%/52)-2px)]",
                "bg-gradient-to-t from-emerald-500/65 to-cyan-400/65",
                "group-hover:from-emerald-400/75 group-hover:to-cyan-300/75",
                rounded ? "rounded-sm" : ""
              ].join(" ")}
              style={style}
              title={`Week ${i + 1}: ${count} commit${count === 1 ? "" : "s"}`}
            />
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-gray-300">
        <span className="opacity-80">0</span>
        <span className="opacity-60">max {max}</span>
        <span className="opacity-80">52w</span>
      </div>
      <div className="mt-2 flex items-center gap-3 text-xs text-gray-300">
        <span className="inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-0.5 bg-white/5">
          Total: <strong className="text-white">{total}</strong>
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-0.5 bg-white/5">
          Avg/wk: <strong className="text-white">{avg}</strong>
        </span>
        <span className="ml-auto opacity-70 group-hover:opacity-100 transition">Open GitHub →</span>
      </div>
    </a>
  );
}

/* -------------------- Main component ----------------- */
export default function ProgrammingShowcase() {
  const [level, setLevel] = React.useState<Level>("daily");

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

      {/* Level tabs */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-1 grid grid-cols-3 gap-1">
        {(["daily","confident","familiar"] as Level[]).map((lv) => (
          <button
            key={lv}
            className={`text-xs px-3 py-2 rounded-lg border transition w-full ${lv === level ? "border-white/25 bg-white/15" : "border-white/10 hover:bg-white/10"}`}
            onClick={() => setLevel(lv)}
          >
            {LEVELS[lv].title}
          </button>
        ))}
      </div>

      {/* skills grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <GroupCard title="Languages" items={LANGUAGES} level={level} />
        <GroupCard title="Packages"  items={PACKAGES}  level={level} />
      </div>

      {/* Full 52-week activity (always visible) */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <div className="text-xs text-gray-300 mb-2">GitHub Activity</div>
        <GitHubYearGraphInline githubUser="Tridude5" heightRem={10} />
      </div>

      {/* subtle shimmer accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm animate-[shimmer_3.6s_ease-in-out_infinite]" />

      <style jsx>{`
        @keyframes chipIn { from { opacity: 0; transform: translateY(6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes shimmer { 0% { transform: translateX(0) rotate(6deg); } 100% { transform: translateX(160%) rotate(6deg); } }
      `}</style>
    </aside>
  );
}
