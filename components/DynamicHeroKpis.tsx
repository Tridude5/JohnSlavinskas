"use client";
import * as React from "react";
import KPIs from "@/components/KPIs";

type Props = { publicationsCount?: number; label?: string };

export default function DynamicHeroKpis({
  publicationsCount = 6,
  label = "Open-source Commits (12 mo)",
}: Props) {
  const [total, setTotal] = React.useState(0);
  const [spark, setSpark] = React.useState<number[]>([0, 0, 0, 0, 0, 0]);

  React.useEffect(() => {
    let cancelled = false;

    // Build a safe URL that respects GitHub Pages base path
    const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
    const url = `${base}/github-contrib.json`;

    // 1) Seed from localStorage to avoid a flash of 0
    try {
      const saved = localStorage.getItem("ghContrib");
      if (saved) {
        const j = JSON.parse(saved);
        if (typeof j?.total === "number" && Array.isArray(j?.weeks)) {
          const weeks: number[] = j.weeks;
          const bucket = Math.max(1, Math.ceil(weeks.length / 6));
          const cumul = Array.from({ length: 6 }, (_, i) =>
            weeks.slice(0, (i + 1) * bucket).reduce((a: number, b: number) => a + b, 0)
          ).slice(0, 6);

          if (!cancelled) {
            setTotal(j.total);
            setSpark(cumul.length === 6 ? cumul : [0, 0, 0, 0, 0, 0]);
          }
        }
      }
    } catch {
      // ignore
    }

    // 2) Live fetch (no-store) and only replace when valid
    fetch(url, { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then((d) => {
        const weeks: number[] | undefined = Array.isArray(d?.weeks) ? d.weeks : undefined;
        const totalNum = typeof d?.total === "number" ? d.total : undefined;
        if (!weeks || totalNum === undefined) return; // ignore bad payloads

        const bucket = Math.max(1, Math.ceil(weeks.length / 6));
        const cumul = Array.from({ length: 6 }, (_, i) =>
          weeks.slice(0, (i + 1) * bucket).reduce((a: number, b: number) => a + b, 0)
        ).slice(0, 6);

        if (!cancelled) {
          setTotal(totalNum);
          setSpark(cumul.length === 6 ? cumul : [0, 0, 0, 0, 0, 0]);
        }

        // save good data for instant load next time
        try {
          localStorage.setItem("ghContrib", JSON.stringify({ total: totalNum, weeks }));
        } catch { /* ignore */ }
      })
      .catch(() => {
        // don’t clobber existing state with zeros on fetch errors
      });

    return () => { cancelled = true; };
  }, []);

  return (
    <KPIs
      items={[
        { label: "Publications", value: publicationsCount, spark: [1, 2, 3, 4, 5, publicationsCount] },
        { label, value: total, spark },
      ]}
    />
  );
}
