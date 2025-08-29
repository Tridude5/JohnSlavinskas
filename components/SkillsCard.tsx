"use client";

import React from "react";

/** ========= DATA (edit freely) ========= */
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
  ],
  finance: [
    "Factor models (CAPM, Fama-French)",
    "Quadratic programming (portfolio)",
    "ML-driven modeling (AI-integrated)",
    "Python data science stack",
    "Backtesting pipelines",
    "Risk assessment (VaR/CVaR)",
    "Monte Carlo simulation",
    "Bayesian networks & transformers",
  ],
} as const;

type DomainKey = keyof typeof SKILLS;

const META: Record<DomainKey, { title: string; tagline: string }> = {
  paper:   { title: "Paper Engineering",       tagline: "materials • processes" },
  csai:    { title: "Computer Science / AI",   tagline: "software • data" },
  finance: { title: "Financial Engineering",   tagline: "models • markets" },
};

/** ========= SMALL BITS ========= */
function Chip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs leading-none whitespace-nowrap hover:scale-[1.05] transition">
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
  const { title, tagline } = META[domain];
  const items = SKILLS[domain];
  return (
    <div
      className="shrink-0 w-full px-1"
      aria-hidden={!active}
      role="group"
      aria-roledescription="slide"
    >
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-baseline justify-between">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-xs text-gray-400">{tagline}</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((t) => (
            <Chip key={t} text={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** ========= MAIN COMPONENT ========= */
export default function SkillsShowcaseCard() {
  const domains: DomainKey[] = ["paper", "csai", "finance"];
  const [index, setIndex] = React.useState(0);
  const [auto, setAuto] = React.useState(true);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Auto-advance (paused on hover or after manual interaction)
  React.useEffect(() => {
    if (!auto || prefersReducedMotion) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % domains.length),
      5200
    );
    return () => clearInterval(id);
  }, [auto, prefersReducedMotion]);

  // Keyboard + swipe support
  const touchRef = React.useRef<{ x: number; y: number } | null>(null);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setIndex((i) => (i + 1) % domains.length);
      setAuto(false);
    } else if (e.key === "ArrowLeft") {
      setIndex((i) => (i - 1 + domains.length) % domains.length);
      setAuto(false);
    }
  };

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
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      setIndex((i) =>
        dx < 0 ? (i + 1) % domains.length : (i - 1 + domains.length) % domains.length
      );
      setAuto(false);
    }
    touchRef.current = null;
  };

  // “All” view toggle
  const [showAll, setShowAll] = React.useState(false);

  return (
    <aside
      className="relative rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-5 shadow-xl overflow-hidden"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
      onKeyDown={onKey}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">Skills at a glance</h3>
        <div className="flex items-center gap-2">
          <button
            className="text-xs px-2 py-1 rounded-md border border-white/10 hover:bg-white/5 transition"
            onClick={() => setShowAll((s) => !s)}
            aria-pressed={showAll}
          >
            {showAll ? "Carousel view" : "Show all"}
          </button>
          <div className="text-xs text-gray-400">materials × data × finance</div>
        </div>
      </div>

      {showAll ? (
        // All three columns
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {domains.map((d) => (
            <div key={d} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm font-semibold">{META[d].title}</div>
              <div className="text-xs text-gray-400">{META[d].tagline}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SKILLS[d].map((t) => (
                  <Chip key={t} text={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Carousel
        <div
          className="mt-4"
          role="region"
          aria-label="Skills carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative">
            {/* Track */}
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {domains.map((d, i) => (
                <Slide key={d} domain={d} active={i === index} />
              ))}
            </div>

            {/* Arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                aria-label="Previous"
                className="rounded-full border border-white/15 bg-white/5 p-2 hover:bg-white/10 transition"
                onClick={() => {
                  setIndex((i) => (i - 1 + domains.length) % domains.length);
                  setAuto(false);
                }}
              >
                ‹
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                aria-label="Next"
                className="rounded-full border border-white/15 bg-white/5 p-2 hover:bg-white/10 transition"
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
                  className={`text-xs px-2 py-1 rounded-md border ${
                    i === index
                      ? "border-white/20 bg-white/10"
                      : "border-white/10 hover:bg-white/5"
                  } transition`}
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
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === index ? "bg-white/80" : "bg-white/25"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* subtle shimmer accent */}
      <div className="pointer-events-none absolute -left-20 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm animate-[shimmer_3.6s_ease-in-out_infinite]" />
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(0) rotate(6deg); }
          100% { transform: translateX(160%) rotate(6deg); }
        }
      `}</style>
    </aside>
  );
}
