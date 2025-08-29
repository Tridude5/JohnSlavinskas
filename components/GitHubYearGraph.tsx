"use client";

import React from "react";

type Props = {
  githubUser: string;      // e.g., "Tridude5"
  heightRem?: number;      // default 8
  rounded?: boolean;       // default true
};

export default function GitHubYearGraph({
  githubUser,
  heightRem = 8,
  rounded = true,
}: Props) {
  const [weeks, setWeeks] = React.useState<number[] | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    let alive = true;
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const urls = [
      `${base}/github-contrib.json?cb=${Date.now()}`,
      `https://tridude5.github.io/JohnSlavinskas/github-contrib.json?cb=${Date.now()}`
    ];
    (async () => {
      for (const u of urls) {
        try {
          const r = await fetch(u, { cache: "no-store" });
          if (!r.ok) continue;
          const j = await r.json();
          if (alive && Array.isArray(j?.weeks)) { setWeeks(j.weeks); return; }
        } catch {}
      }
      if (alive) setErr("Failed to load");
    })();
    return () => { alive = false; };
  }, [githubUser]);

  if (err) return <div className="h-8 text-xs text-red-300">Couldn’t load contributions.</div>;
  if (!weeks) return <div className="h-8 text-xs text-gray-400">Loading contributions…</div>;

  const total = weeks.reduce((s, x) => s + x, 0);
  const avg = weeks.length ? Math.round((total / weeks.length) * 10) / 10 : 0;
  const max = weeks.length ? Math.max(...weeks) : 0;
  const allZero = weeks.every(n => n === 0);

  return (
    <a
      href={`https://github.com/${githubUser}`}
      target="_blank"
      rel="noreferrer"
      className="block group"
      aria-label={`Open ${githubUser} on GitHub`}
    >
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
                rounded ? "rounded-sm" : "",
              ].join(" ")}
              style={style}
              title={`Week ${i + 1}: ${count} contribution${count === 1 ? "" : "s"}`}
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
      {allZero && (
        <div className="mt-2 text-[11px] text-gray-400">
          No public contributions detected in the last year (or token/private access not enabled).
        </div>
      )}
    </a>
  );
}
