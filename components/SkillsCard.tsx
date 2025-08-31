"use client";

import React from "react";
import Tx from "@/components/i18n/Tx";
import { useI18n } from "@/components/i18n/I18nProvider";

/* ============ DATA (English keys; translated via t()) ============ */
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
    "Web development (HTML/CSS/JS)",
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
  { title: string; tagline: string; chipGradient: string; ringGradient: string; arrowGradient: string }
> = {
  paper: {
    title: "Paper Engineering",
    tagline: "materials • processes",
    chipGradient: "from-emerald-400/25 to-lime-400/25",
    ringGradient: "from-emerald-500/35 via-lime-400/25 to-teal-400/25",
    arrowGradient: "from-emerald-400/60 to-lime-400/60",
  },
  csai: {
    title: "Computer Science / AI",
    tagline: "software • data",
    chipGradient: "from-cyan-400/25 to-indigo-400/25",
    ringGradient: "from-cyan-500/35 via-sky-400/25 to-indigo-500/25",
    arrowGradient: "from-cyan-400/60 to-indigo-400/60",
  },
  finance: {
    title: "Financial Engineering",
    tagline: "models • markets",
    chipGradient: "from-amber-400/25 to-fuchsia-400/25",
    ringGradient: "from-amber-500/35 via-orange-400/25 to-fuchsia-500/25",
    arrowGradient: "from-amber-400/60 to-fuchsia-400/60",
  },
};

/* ============ UI bits ============ */
function Chip({
  text,
  gradient,
  i,
  animate,
}: {
  text: string;
  gradient: string;
  i: number;
  animate: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs whitespace-nowrap leading-none",
        "border-white/15 bg-white/5 bg-gradient-to-r",
        gradient,
        "shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_8px_20px_-10px_rgba(0,0,0,0.6)]",
        "backdrop-blur hover:scale-[1.06] transition-transform duration-200",
        animate ? "animate-[chipIn_.45s_both]" : "",
      ].join(" ")}
      style={animate ? { animationDelay: `${i * 45}ms` } : undefined}
    >
      {text}
    </span>
  );
}

function ArrowBtn({
  dir,
  onClick,
  gradient,
}: {
  dir: "left" | "right";
  onClick: () => void;
  gradient: string;
}) {
  const { t } = useI18n();
  const icon =
    dir === "left" ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    );

  return (
    <button
      aria-label={dir === "left" ? t("Previous") : t("Next")}
      onClick={onClick}
      className="relative pointer-events-auto rounded-full p-2 md:p-2.5 border border-white/15 bg-white/10 backdrop-blur shadow transition hover:bg-white/20"
    >
      {/* domain-colored glow ring */}
      <span className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-0 blur group-hover:opacity-40`} />
      {icon}
    </button>
  );
}

function Slide({ domain, active, reduceMotion }: { domain: DomainKey; active: boolean; reduceMotion: boolean }) {
  const { t } = useI18n();
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
            WebkitMaskImage: "radial-gradient(60% 60% at 50% 35%, black 0%, transparent 70%)",
            maskImage: "radial-gradient(60% 60% at 50% 35%, black 0%, transparent 70%)",
            background: "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent 70%)",
          }}
        />
        <div className="flex items-baseline justify-between">
          <div className="text-lg font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            <Tx>{title}</Tx>
          </div>
          <div className="text-xs text-gray-300">
            <Tx>{tagline}</Tx>
          </div>
        </div>
        <div key={String(active)} className="mt-4 flex flex-wrap gap-2">
          {items.map((key, i) => (
            <Chip key={key} text={t(key)} gradient={chipGradient} i={i} animate={active && !reduceMotion} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ Main ============ */
export default function SkillsShowcaseCardFancy() {
  const { t } = useI18n();
  const domains: DomainKey[] = ["paper", "csai", "finance"];
  const [index, setIndex] = React.useState(0);
  const [auto, setAuto] = React.useState(true);
  const containerRef = React.useRef<HTMLElement>(null);

  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Auto-advance
  React.useEffect(() => {
    if (!auto || reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % domains.length), 5200);
    return () => clearInterval(id);
  }, [auto, reduceMotion]);

  // Pause when tab hidden
  React.useEffect(() => {
    const onVis = () => setAuto(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Pause when card off-screen
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAuto(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
    const tch = e.changedTouches[0];
    const dx = tch.clientX - s.x;
    const dy = tch.clientY - s.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 28) {
      setIndex((i) => (dx < 0 ? (i + 1) % domains.length : (i - 1 + domains.length) % domains.length));
      setAuto(false);
    }
    touchRef.current = null;
  };

  const activeDomain = domains[index];
  const arrowGrad = META[activeDomain].arrowGradient;

  return (
    <aside
      ref={containerRef as any}
      className="relative isolate min-w-0 w-full max-w-[720px] rounded-3xl border border-white/10 bg-black/30 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur overflow-hidden"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
      onKeyDown={onKey}
      role="region"
      aria-label={t("Skills showcase")}
    >
      {/* clipped shimmer */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm animate-[shimmer_3.6s_ease-in-out_infinite]" />

      <div className="relative z-[1] flex items-center justify-between gap-2">
        <h3 className="font-semibold text-lg">
          <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            <Tx>Skills at a glance</Tx>
          </span>
        </h3>
        <div className="text-xs text-gray-400">
          <Tx>materials × data × finance</Tx>
        </div>
      </div>

      <div className="relative z-[1] mt-4 select-none" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="relative">
          {/* Track */}
          <div className="flex transition-transform duration-500 will-change-transform" style={{ transform: `translateX(-${index * 100}%)` }}>
            {domains.map((d, i) => (
              <Slide key={d} domain={d} active={i === index} reduceMotion={reduceMotion} />
            ))}
          </div>

          {/* Arrows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center -translate-x-2 sm:-translate-x-3 md:-translate-x-4">
            <ArrowBtn
              dir="left"
              gradient={arrowGrad}
              onClick={() => {
                setIndex((i) => (i - 1 + domains.length) % domains.length);
                setAuto(false);
              }}
            />
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center translate-x-2 sm:translate-x-3 md:translate-x-4">
            <ArrowBtn
              dir="right"
              gradient={arrowGrad}
              onClick={() => {
                setIndex((i) => (i + 1) % domains.length);
                setAuto(false);
              }}
            />
          </div>
        </div>

        {/* Segmented tabs */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-1 grid grid-cols-3 gap-1">
          {domains.map((d, i) => (
            <button
              key={d}
              className={[
                "text-xs px-3 py-2 rounded-lg border transition w-full",
                i === index ? "border-white/25 bg-white/15" : "border-white/10 hover:bg-white/10",
              ].join(" ")}
              onClick={() => {
                setIndex(i);
                setAuto(false);
              }}
            >
              <Tx>{META[d].title}</Tx>
            </button>
          ))}
        </div>
      </div>

      {/* keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(0) rotate(6deg);
          }
          100% {
            transform: translateX(160%) rotate(6deg);
          }
        }
        @keyframes chipIn {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </aside>
  );
}
