"use client";
import * as React from "react";
import KPIs from "@/components/KPIs";
import { useI18n } from "@/components/i18n/I18nProvider";

type Props = { publicationsCount?: number; label?: string };

export default function DynamicHeroKpis({
  publicationsCount = 6,
  label = "Open-source Commits (12 mo)",
}: Props) {
  const { t } = useI18n();
  const [total, setTotal] = React.useState(0);
  const [spark, setSpark] = React.useState<number[]>([0, 0, 0, 0, 0, 0]);

  React.useEffect(() => {
    let cancelled = false;

    // Respect GitHub Pages base path (e.g. /JohnSlavinskas)
    const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
    const url = `${base}/github-contrib.json`;

    // Seed from localStorage to avoid a flash of 0
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

    // Live fetch (no-store); only update if payload is valid
    fetch(url, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d) => {
        const weeks: number[] | undefined = Array.isArray(d?.weeks) ? d.weeks : undefined;
        const totalNum = typeof d?.total === "number" ? d.total : undefined;
        if (!weeks || totalNum === undefined) return;

        const bucket = Math.max(1, Math.ceil(weeks.length / 6));
        const cumul = Array.from({ length: 6 }, (_, i) =>
          weeks.slice(0, (i + 1) * bucket).reduce((a: number, b: number) => a + b, 0)
        ).slice(0, 6);

        if (!cancelled) {
          setTotal(totalNum);
          setSpark(cumul.length === 6 ? cumul : [0, 0, 0, 0, 0, 0]);
        }

        try {
          localStorage.setItem("ghContrib", JSON.stringify({ total: totalNum, weeks }));
        } catch {
          // ignore
        }
      })
      .catch(() => {
        // don't overwrite with zeros on fetch errors
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const pubsLabel = t("Publications");         // expects key in en.ts/de.ts
  const commitsLabel = t(label);               // "Open-source Commits (12 mo)" key

  return (
    <KPIs
      items={[
        { label: pubsLabel, value: publicationsCount, spark: [1, 2, 3, 4, 5, publicationsCount] },
        { label: commitsLabel, value: total, spark },
      ]}
    />
  );
}
