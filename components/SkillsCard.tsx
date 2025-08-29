"use client";

import React from "react";

/* ============ DATA (same as before, incl. extra Paper skill) ============ */
const SKILLS = {
  paper: [
    "Lignin valorization",
    "Biopolymer & fiber composites",
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
    "Quadratic programming",
    "Transformers & Bayesian networks",
  ],
  finance: [
    "Factor models (CAPM, Fama-French)",
    "ML-driven modeling (AI-integrated)",
    "Python data science stack",
    "Backtesting pipelines",
    "Risk assessment (VaR/CVaR)",
    "Monte Carlo simulation",
  ],
} as const;

type DomainKey = keyof typeof SKILLS;

const META: Record<
  DomainKey,
  { title: string; tagline: string; chipGradient: string; ringGradient: string }
> = {
  paper: {
    title: "Paper Engineering",
    tagline: "materials • processes",
    chipGradient: "from-emerald-400/25 to-lime-400/25",
    ringGradient: "from-emerald-500/35 via-lime-400/25 to-teal-400/25",
  },
  csai: {
    title: "Computer Science / AI",
    tagline: "software • data",
    chipGradient: "from-cyan-400/25 to-indigo-400/25",
    ringGradient: "from-cyan-500/35 via-sky-400/25 to-indigo-500/25",
  },
  finance: {
    title: "Financial Engineering",
    tagline: "models • markets",
    chipGradient: "from-amber-400/25 to-fuchsia-400/25",
    ringGradient: "from-amber-500/35 via-orange-400/25 to-fuchsia-500/25",
  },
};

/* ============ UI bits ============ */
function Chip({ text, gradient }: { text: string; gradient: string }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs whitespace-nowrap leading-none",
        "border-white/15 bg-white/5 bg-gradient-to-r",
        gradient,
        "shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_8px_20px_-10px_rgba(0,0,0,0.6)]",
        "backdrop-blur hover:scale-[1.06] transition-transform duration-200",
      ].join(" ")}
    >
      {text}
    </span>
  );
}

function ArrowBtn({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) {
  const icon =
    dir === "left" ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    );

  return (
    <button
      aria-label={dir === "left" ? "Previous" : "Next"}
      onClick={onClick}
      className="relative group rounded-full p-2 md:p-2.5 border border-white/15 bg-white/10 backdrop-blur shadow transition hover:bg-white/20"
    >
      {/* glow ring */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 to-fuchsia-400/40 opacity-0 blur group-hover:opacity-30 transition" />
      {icon}
    </button>
  );
}

function Slide({ domain, active }: { domain: DomainKey; active: boolean }) {
  const { title, tagline, chipGradient, ringGradient } = META[domain];
  const items = SKILLS[domain];

  return (
    <div className="shrink-0 w-full px-1" aria-hidden={!active} role="group">
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur overflow-hidden">
        {/* Clipped inner glow */}
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${ringGradient} opacity-20`} />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            WebkitMaskImage:
              "radial-gradient(60% 60% at 50% 35%, black 0%, transparent 70%)",
            maskImage:
              "radial-gradient(60% 60% at 50% 35%, black 0%, transparent 70%)",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent 70%)",
          }}
        />
        <div className="flex items-baseline justify-between">
          <div className="text-lg font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {title}
          </div>
          <div className="text-xs text-gray-300">{tagline}</div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((t) => (
            <Chip key={t} text={t} gradient={chipGradient} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ Main (isolated, fancy arrows, full-width tabs) ============ */
export default function SkillsShowcaseCardFancy() {
  const domains: DomainKey[] = ["paper", "csai", "finance"];
  const [index, setIndex] = React.useState(0);
  const [auto, setAuto] = React.useState(true);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    if (!auto || prefersReducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % domains.length), 5200);
    return () => clearInterval(id);
  }, [auto, prefersReducedMotion]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setIndex((i) => (i + 1) % domains.length);
      setAuto(false);
    } else if (e.key === "ArrowLeft") {
      setIndex((i) => (i - 1 + domains.length) % domains.length);
      setAuto(false);
    }
  };

  // Swipe
  const touchRef = React.useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchRef.current;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 28) {
      setIndex((i) => (dx < 0 ? (i + 1) % domains.length : (i - 1 + domains.length) % domains.length));
      setAuto(false);
    }
    touchRef.current = null;
  };

  return (
    <aside
      className="relative isolate min-w-0 w-full max-w-[720px] rounded-3xl border border-white/10 bg-black/30 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur overflow-hidden"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
      onKeyDown={onKey}
      role="region"
      aria-label="Skills showcase"
    >
      {/* clipped shimmer */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm animate-[shimmer_3.6s_ease-in-out_infinite]" />

      <div className="relative z-[1] flex items-center justify-between gap-2">
        <h3 className="font-semibold text-lg">
          <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Skills at a glance
          </span>
        </h3>
        <div className="text-xs text-gray-400">materials × data × finance</div>
      </div>

      <div
        className="relative z-[1] mt-4 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative">
          {/* Track */}
          <div
            className="flex transition-transform duration-500 will-change-transform"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {domains.map((d, i) => (
              <Slide key={d} domain={d} active={i === index} />
            ))}
          </div>

          {/* Fancy arrows */}
          <div className="absolute inset-y-0 left-1 flex items-center">
            <ArrowBtn
              dir="left"
              onClick={() => {
                setIndex((i) => (i - 1 + domains.length) % domains.length);
                setAuto(false);
              }}
            />
          </div>
          <div className="absolute inset-y-0 right-1 flex items-center">
            <ArrowBtn
              dir="right"
              onClick={() => {
                setIndex((i) => (i + 1) % domains.length);
                setAuto(false);
              }}
            />
          </div>
        </div>

        {/* Full-width segmented tabs (no extra bars/dots) */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-1 grid grid-cols-3 gap-1">
          {domains.map((d, i) => (
            <button
              key={d}
              className={[
                "text-xs px-3 py-2 rounded-lg border transition w-full",
                i === index
                  ? "border-white/25 bg-white/15"
                  : "border-white/10 hover:bg-white/10",
              ].join(" ")}
              onClick={() => {
                setIndex(i);
                setAuto(false);
              }}
            >
              {META[d].title}
            </button>
          ))}
        </div>
      </div>

      {/* shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(0) rotate(6deg); }
          100% { transform: translateX(160%) rotate(6deg); }
        }
      `}</style>
    </aside>
  );
}
