"use client";

import React from "react";

/* ── DATA ───────────────────────────────────────────── */
type Level = "daily" | "confident" | "familiar";
type Item  = { label: string; level: Level };
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
      { label: "Caching & pagination", level: "confident" },
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
      { label: "ESLint / Prettier", level: "daily" },
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

/* ── VISUAL META ────────────────────────────────────── */
const LEVELS = {
  daily: {
    title: "Daily",
    note: "use all the time",
    chip: "border-emerald-300/30 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20",
    dot:  "bg-emerald-400",
    arrow:"from-emerald-400/60 to-cyan-400/60",
  },
  confident: {
    title: "Confident",
    note: "ship independently",
    chip: "border-sky-300/25 bg-gradient-to-r from-sky-400/15 to-indigo-400/15",
    dot:  "bg-sky-400",
    arrow:"from-sky-400/60 to-indigo-400/60",
  },
  familiar: {
    title: "Familiar",
    note: "ramp fast",
    chip: "border-white/15 bg-white/5",
    dot:  "bg-white/40",
    arrow:"from-zinc-200/40 to-white/30",
  },
} as const;

function Chip({ text, chipClass, dotClass, i }: { text: string; chipClass: string; dotClass: string; i: number }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs whitespace-nowrap leading-none",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_6px_16px_-10px_rgba(0,0,0,0.6)] backdrop-blur",
        "hover:scale-[1.05] transition-transform duration-150",
        chipClass,
      ].join(" ")}
      style={{ animation: "chipIn .35s both", animationDelay: `${i * 28}ms` }}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      <span>{text}</span>
      <svg className="ml-1 opacity-70" width="12" height="12" viewBox="0 0 24 24"
           stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function ArrowBtn({ dir, onClick, gradient }: { dir: "left" | "right"; onClick: () => void; gradient: string }) {
  const icon = dir === "left"
    ? (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>)
    : (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>);

  return (
    <button
      aria-label={dir === "left" ? "Previous" : "Next"}
      onClick={onClick}
      className="relative pointer-events-auto rounded-full p-2 md:p-2.5 border border-white/15 bg-white/10 backdrop-blur shadow transition hover:bg-white/20"
    >
      <span className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-0 blur group-hover:opacity-40`} />
      {icon}
    </button>
  );
}

/* ── HELPERS ────────────────────────────────────────── */
const byLevel = (lvl: Level) =>
  STACK.map((g) => ({ title: g.title, labels: g.items.filter((it) => it.level === lvl).map((it) => it.label) }))
       .filter((g) => g.labels.length);

/* ── MAIN ───────────────────────────────────────────── */
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
  const [i, setI] = React.useState(0);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const groups = byLevel(level);
  const meta   = LEVELS[level];
  const canPrev = groups.length > 1;
  const canNext = groups.length > 1;

  // auto-advance
  const [auto, setAuto] = React.useState(true);
  React.useEffect(() => {
    if (!auto || reduceMotion || groups.length <= 1) return;
    const id = setInterval(() => setI((x) => (x + 1) % groups.length), 5200);
    return () => clearInterval(id);
  }, [auto, reduceMotion, groups.length]);

  // resize-safe arrows outside the slide
  const touchRef = React.useRef<{x:number;y:number}|null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]; touchRef.current = {x:t.clientX,y:t.clientY};
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchRef.current; if (!s) return;
    const t = e.changedTouches[0]; const dx = t.clientX - s.x; const dy = t.clientY - s.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 28) {
      setI((x) => dx < 0 ? (x + 1) % groups.length : (x - 1 + groups.length) % groups.length);
      setAuto(false);
    }
    touchRef.current = null;
  };

  // snippets
  const [lang, setLang] = React.useState<"ts"|"py">("ts");
  const code = lang === "ts" ? tsSnippet : pySnippet;
  const copy = async () => { try { await navigator.clipboard.writeText(code); } catch {} };

  // when switching level, reset index
  React.useEffect(() => setI(0), [level]);

  return (
    <aside
      className="relative isolate min-w-0 w-full max-w-[720px] rounded-3xl border border-white/10 bg-black/30 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur overflow-hidden"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Programming Showcase</h3>
        <div className="flex items-center gap-3 text-[11px] text-gray-300">
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Daily</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> Confident</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-white/40" /> Familiar</span>
        </div>
      </div>

      {/* level tabs (full-width segmented control) */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-1 grid grid-cols-3 gap-1">
        {(["daily","confident","familiar"] as Level[]).map((lv) => (
          <button
            key={lv}
            className={`text-xs px-3 py-2 rounded-lg border transition w-full ${
              lv === level ? "border-white/25 bg-white/15" : "border-white/10 hover:bg-white/10"
            }`}
            onClick={() => { setLevel(lv); setAuto(false); }}
          >
            {LEVELS[lv].title}
          </button>
        ))}
      </div>

      {/* carousel of groups for the chosen level */}
      <div className="relative mt-4 select-none" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="relative">
          <div
            className="flex transition-transform duration-500 will-change-transform"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {groups.map((g, gi) => (
              <div key={g.title} className="shrink-0 w-full px-1">
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur overflow-hidden">
                  {/* clipped glow for the level */}
                  <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${LEVELS[level].arrow} opacity-20`} />
                  <div className="flex items-baseline justify-between">
                    <div className="text-lg font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                      {g.title}
                    </div>
                    <div className="text-xs text-gray-300">{LEVELS[level].note}</div>
                  </div>
                  <div key={String(gi)} className="mt-4 flex flex-wrap gap-2">
                    {g.labels.map((label, idx) => (
                      <Chip
                        key={label}
                        text={label}
                        chipClass={LEVELS[level].chip}
                        dotClass={LEVELS[level].dot}
                        i={idx}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* arrows outside; wrappers non-blocking */}
          {canPrev && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center -translate-x-2 sm:-translate-x-3 md:-translate-x-4">
              <ArrowBtn
                dir="left"
                gradient={meta.arrow}
                onClick={() => { setI((x) => (x - 1 + groups.length) % groups.length); setAuto(false); }}
              />
            </div>
          )}
          {canNext && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center translate-x-2 sm:translate-x-3 md:translate-x-4">
              <ArrowBtn
                dir="right"
                gradient={meta.arrow}
                onClick={() => { setI((x) => (x + 1) % groups.length); setAuto(false); }}
              />
            </div>
          )}
        </div>
      </div>

      {/* extras: collapsible to save space */}
      <details className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <summary className="cursor-pointer text-xs text-gray-300">Activity & snippets</summary>
        <div className="mt-3">
          <div className="mb-2 text-xs text-gray-400">Recent commits</div>
          <div className="flex h-10 items-end gap-1">
            {sparklineHeights.map((h, idx) => (
              <div
                key={idx}
                className="w-2 rounded-sm bg-emerald-400/70 animate-pulse"
                style={{ height: `${h * 0.22}rem`, animationDelay: `${idx * 120}ms` }}
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
