"use client";

import React from "react";

type Props = {
  githubUser: string;          // e.g., "jack-slavinskas"
  heightRem?: number;          // visual height of bars (default ~8rem)
  rounded?: boolean;           // rounded bar tips
};

export default function GitHubYearGraph({
  githubUser,
  heightRem = 8,
  rounded = true,
}: Props) {
  const [weeks, setWeeks] = React.useState<number[] | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`/api/github/contrib?user=${githubUser}`);
        if (!r.ok) throw new Error("GitHub API error");
        const data = await r.json();
        if (!Array.isArray(data?.weeks)) throw new Error("Bad payload");
        if (alive) setWeeks(data.weeks.slice(-52)); // ensure 52 bars
      } catch (e: any) {
        if (alive) setErr(e?.message || "Failed to load");
      }
    })();
    return () => {
      alive = false;
    };
  }, [githubUser]);

  const total = (weeks || []).reduce((s, x) => s + x, 0);
  const avg = weeks && weeks.length ? Math.round((total / weeks.length) * 10) / 10 : 0;
  const max = weeks && weeks.length ? Math.max(...weeks) : 0;

  return (
    <aside className="relative isolate min-w-0 w-full max-w-[720px] rounded-3xl border border-white/10 bg-black/30 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">GitHub Activity</h3>
        <div className="text-xs text-gray-400">
          Last 52 weeks
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {/* Loading / error */}
        {!weeks && !err && (
          <div className="h-8 text-xs text-gray-400">Loading commits…</div>
        )}
        {err && (
          <div className="h-8 text-xs text-red-300">Couldn’t load commits.</div>
        )}

        {/* Bars (clickable to profile) */}
        {weeks && (
          <a
            href={`https://github.com/${githubUser}`}
            target="_blank"
            rel="noreferrer"
            className="block group"
            aria-label={`Open ${githubUser} on GitHub`}
            title="View GitHub profile"
          >
            <div
              className="flex items-end gap-[3px]"
              style={{ height: `${heightRem}rem` }}
            >
              {weeks.map((count, i) => {
                // normalize height against max (fallback to minimal visual)
                const h =
                  max > 0 ? Math.max(2, Math.round((count / max) * heightRem * 16)) : 2; // px
                // subtle “grow in” on mount
                const style: React.CSSProperties = mounted
                  ? {
                      height: h,
                      transition: "height 500ms cubic-bezier(.22,.8,.22,1)",
                      transitionDelay: `${i * 8}ms`,
                    }
                  : { height: 2 };

                return (
                  <div
                    key={i}
                    className={[
                      "w-[calc((100%/52)-2px)]",
                      "bg-gradient-to-t from-emerald-500/65 to-cyan-400/65",
                      "group-hover:from-emerald-400/75 group-hover:to-cyan-300/75",
                      rounded ? "rounded-sm" : "",
                    ].join(" ")}
                    style={style}
                    title={`Week ${i + 1}: ${count} commit${count === 1 ? "" : "s"}`}
                  />
                );
              })}
            </div>

            {/* Tiny axis & stats */}
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
              <span className="ml-auto opacity-70 group-hover:opacity-100 transition">
                Click to open GitHub →
              </span>
            </div>
          </a>
        )}
      </div>

      {/* clipped shimmer accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-6 blur-sm animate-[shimmer_3.6s_ease-in-out_infinite]" />

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(0) rotate(6deg); }
          100% { transform: translateX(160%) rotate(6deg); }
        }
      `}</style>
    </aside>
  );
}
