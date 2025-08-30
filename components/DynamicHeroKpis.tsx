// components/DynamicHeroKpis.tsx
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
    // Plain relative path works locally and on GitHub Pages subpaths
    fetch("github-contrib.json")
      .then((r) => r.json())
      .then((d) => {
        const weeks: number[] = Array.isArray(d.weeks) ? d.weeks : [];
        const bucket = Math.max(1, Math.ceil(weeks.length / 6));
        const cumul = Array.from({ length: 6 }, (_, i) =>
          weeks.slice(0, (i + 1) * bucket).reduce((a, b) => a + b, 0)
        ).slice(0, 6);
        setTotal(typeof d.total === "number" ? d.total : cumul.at(-1) ?? 0);
        setSpark(cumul.length === 6 ? cumul : [0, 0, 0, 0, 0, 0]);
      })
      .catch(() => {
        setTotal(0);
        setSpark([0, 0, 0, 0, 0, 0]);
      });
  }, []);

  const items = [
    { label: "Publications", value: publicationsCount, spark: [1, 2, 3, 4, 5, publicationsCount] },
    { label, value: total, spark },
  ];

  return <KPIs items={items} />;
}
