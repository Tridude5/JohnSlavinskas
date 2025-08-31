"use client";

import React from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

/* ----------------------- Data ----------------------- */
type Level = "daily" | "confident" | "familiar";
type Item  = { label: string; level: Level };

const LANGUAGES: Item[] = [
  { label: "Python", level: "daily" },
  { label: "Dart", level: "daily" },
  { label: "TypeScript / JavaScript", level: "confident" },
  { label: "SQL", level: "confident" },
  { label: "MATLAB", level: "confident" },
  { label: "VBA", level: "familiar" },
  { label: "R", level: "familiar" },
  { label: "Java", level: "familiar" },
  { label: "PHP", level: "familiar" },
  { label: "Kotlin", level: "familiar" },
  { label: "Swift", level: "familiar" },
  { label: "HTML/CSS", level: "confident" }
];

const PACKAGES: Item[] = [
  { label: "Pandas", level: "daily" },
  { label: "NumPy", level: "daily" },
  { label: "TensorFlow / Keras", level: "daily" },
  { label: "Matplotlib", level: "daily" },
  { label: "scikit-learn", level: "confident" },
  { label: "SciPy", level: "confident" },
  { label: "statsmodels", level: "confident" },
  { label: "Plotly", level: "confident" },
  { label: "cvxpy", level: "confident" },
  { label: "PyTorch", level: "familiar" },
  { label: "QuantLib (basic)", level: "familiar" },
  { label: "Transformers (HF)", level: "confident" },
  { label: "Bayesian networks (pgmpy)", level: "confident" },
  { label: "Godot", level: "familiar" },
  { label: "ChemCAD", level: "confident" }
];

/* ---------------------- Styling --------------------- */
type LevelMeta = { title: string; note: string; chip: string; glow: string };

function getLevels(t: (k: string) => string): Record<Level, LevelMeta> {
  return {
    daily: {
      title: t("Daily"),
      note:  t("use all the time"),
      chip:  "border-emerald-300/30 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20",
      glow:  "from-emerald-400/60 to-cyan-400/60",
    },
    confident: {
      title: t("Confident"),
      note:  t("ship independently"),
      chip:  "border-sky-300/25 bg-gradient-to-r from-sky-400/15 to-indigo-400/15",
      glow:  "from-sky-400/60 to-indigo-400/60",
    },
    familiar: {
      title: t("Familiar"),
      note:  t("ramp fast"),
      chip:  "border-white/15 bg-white/5",
      glow:  "from-zinc-200/40 to-white/30",
    },
  };
}

function Chip({ text, chip, i }: { text: string; chip: string; i: number }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs whitespace-nowrap leading-none",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_6px_16px_-10px_rgba(0,0,0,0.6)] backdrop-blur",
        "hover:scale-[1.05] transition-transform duration-150",
        chip
      ].join(" ")}
      style={{ animation: "chipIn .35s both", animationDelay: `${i * 28}ms` }}
    >
      {text}
    </span>
  );
}

function GroupCard({
  title,
  items,
  level,
  meta,
}: {
  title: string;
  items: Item[];
  level: Level;
  meta: Record<Level, LevelMeta>;
}) {
  const m = meta[level];
  const labels = items.filter((it) => it.level === level).map((it) => it.label);
  if (!labels.length) return null;
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur overflow-hidden">
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${m.glow} opacity-15`} />
      <div className="mb-2 flex items-baseline justify-between">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[11px] text-gray-300">{m.note}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {labels.map((t, i) => <Chip key={t} text={t} chip={m.chip} i={i} />)}
      </div>
    </div>
  );
}

/* -------------------- Main component ----------------- */
export default function ProgrammingShowcase() {
  const { t } = useI18n();
  const meta = React.useMemo(() => getLevels(t), [t]);
  const [level, setLevel] = React.useState<Level>("daily");

  return (
    <aside className="relative isolate min-w-0 w-full max-w-none rounded-3xl border border-white/10 bg-black/30 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur overflow-hidden">
      <h3 className="font-semibold">{t("Programming Showcase")}</h3>

      {/* Level tabs */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-1 grid grid-cols-3 gap-1">
        {(["daily","confident","familiar"] as Level[]).map((lv) => (
          <button
            key={lv}
            className={`text-xs px-3 py-2 rounded-lg border transition w-full ${
              lv === level ? "border-white/25 bg-white/15" : "border-white/10 hover:bg-white/10"
            }`}
            onClick={() => setLevel(lv)}
          >
            {meta[lv].title}
          </button>
        ))}
      </div>

      {/* skills grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <GroupCard title={t("Languages")} items={LANGUAGES} level={level} meta={meta} />
        <GroupCard title={t("Packages")}  items={PACKAGES}  level={level} meta={meta} />
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
