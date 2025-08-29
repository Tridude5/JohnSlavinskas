"use client";

import React from "react";

/* =========================
   DATA — edit freely
   ========================= */
const SKILLS = {
  paper: [
    "Lignin valorization",
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
  {
    title: string;
    tagline: string;
    chipGradient: string; // tailwind classes
    ringGradient: string;
  }
> = {
  paper: {
    title: "Paper Engineering",
    tagline: "materials • processes",
    chipGradient: "from-emerald-400/25 to-lime-400/25",
    ringGradient: "from-emerald-500/40 via-lime-400/30 to-teal-400/30",
  },
  csai: {
    title: "Computer Science / AI",
    tagline: "software • data",
    chipGradient: "from-cyan-400/25 to-indigo-400/25",
    ringGradient: "from-cyan-500/40 via-sky-400/30 to-indigo-500/30",
  },
  finance: {
    title: "Financial Engineering",
    tagline: "models • markets",
    chipGradient: "from-amber-400/25 to-fuchsia-400/25",
    ringGradient: "from-amber-500/40 via-orange-400/30 to-fuchsia-500/30",
  },
};

/* =========================
   UI bits
   ========================= */
function Chip({
  text,
  gradient,
}: {
  text: string;
  gradient: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs leading-none whitespace-nowrap",
        "border-white/15 bg-white/5",
        "bg-gradient-to-r",
        gradient,
        "shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_6px_18px_-8px_rgba(0,0,0,0.6)]",
        "backdrop-blur",
        "hover:scale-[1.06] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_10px_24px_-8px_rgba(0,0,0,0.7)]",
        "transition-transform duration-200",
      ].join(" ")}
    >
      {text}
    </span>
  );
}

function Slide({
  domain,
  active,
}: {
  domain: DomainKey;
  active: boolean;
}) {
  const { title, tagline, chipGradient, ringGradient } = META[domain];
  const items = SKILLS[domain];

  return (
    <div
      className="shrink-0 w-full px-1"
      aria-hidden={!active}
      role="group"
      aria-roledescription="slide"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur">
        {/* Glow ring */}
        <div
          className={[
            "pointer-events-none absolute -inset-24 rounded-[40px] opacity-60 blur-2xl",
            "bg-[radial-gradient(60%_60%_at_50%_50%,var(--ring)_0%,transparent_60%)]",
          ].join(" ")}
          style={
            {
              // @ts-ignore custom CSS var for the radial gradient
              "--ring": `linear-gradient(to right, var(--tw-gradient-stops))`,
            } as React.CSSProperties
          }
        />
        <div className={`absolute inset-0 -z-10 bg-gradient-to-r ${ringGradient} opacity-[0.08]`} />

        <div className="relative flex items-baseline justify-between">
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

/* =========================
   Main component (carousel-only)
   ========================= */
export default function SkillsShowcaseCardFancy() {
  const domains: DomainKey[] = ["paper", "csai", "finance"];
  const [index, setIndex] = React.useState(0);
  const [auto, setAuto] = React.useState(true);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Auto-advance with pause on interaction/hover
  React.useEffect(() => {
    if (!auto || prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % domains.length);
    }, 5200);
    return () => clearInterval(id);
  }, [auto, prefersReducedMotion]);

  // A11y: arrow keys
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setIndex((i) => (i + 1) % domains.length);
      setAuto(false);
    } else if (e.key === "ArrowLeft") {
      setIndex((i) => (i - 1 + domains.length) % domains.length);
      setAuto(false);
    }
  };

  // Swipe gestures
  const touchRef = React.useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 28) {
      setIndex((i) => (dx < 0 ? (i + 1) % domains.length : (i - 1 + domains.length) % domains.length));
      setAuto(false);
    }
    touchRef.current = null;
  };

  return (
    <aside
      className="relative rounded-3xl border border-white/10 bg-black/30 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
      onKeyDown={onKey}
      role="region"
      aria-label="Skills showcase"
    >
      {/* Fancy border glow */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-400/20 via-emerald-400/20 to-fuchsia-400/20 blur-[2px]" />

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

          {/* Arrows */}
          <div className="absolute inset-y-0 left-1 flex items-center">
            <button
              aria-label="Previous"
              className="rounded-full border border-white/15 bg-white/10 p-2 hover:bg-white/20 transition shadow"
              onClick={() => {
                setIndex((i) => (i - 1 + domains.length) % domains.length);
                setAuto(false);
              }}
            >
              ‹
            </button>
          </div>
          <div className="absolute inset-y-0 right-1 flex items-center">
            <button
              aria-label="Next"
              className="rounded-full border border-white/15 bg-white/10 p-2 hover:bg-white/20 transition shadow"
              onClick={() => {
                setIndex((i) => (i + 1) % domains.length);
                setAuto(false);
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* Tabs + dots */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2">
            {domains.map((d, i) => (
              <button
                key={d}
                className={`text-xs px-2 py-1 rounded-md border transition ${
                  i === index
                    ? "border-white/25 bg-white/15"
                    : "border-white/10 hover:bg-white/10"
                }`}
                onClick={() => {
                  setIndex(i);
                  setAuto(false);
                }}
              >
                {META[d].title}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {domains.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-4 rounded-full transition-all ${
                  i === index ? "bg-white/80" : "bg-white/25"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* shimmer accent */}
      <div className="pointer-events-none absolute -left-24 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm animate-[shimmer_3.6s_ease-in-out_infinite]" />
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(0) rotate(6deg); }
          100% { transform: translateX(160%) rotate(6deg); }
        }
      `}</style>
    </aside>
  );
}
