"use client";

import * as React from "react";
import KPIs from "@/components/KPIs";
import Tx from "@/components/i18n/Tx";

type Props = { publicationsCount?: number; label?: string };

export default function DynamicHeroKpis({
  publicationsCount = 6,
  label = "Open-source Commits (12 mo)",
}: Props) {
  const [total, setTotal] = React.useState(0);
  const [spark, setSpark] = React.useState<number[]>([0, 0, 0, 0, 0, 0]);

  React.useEffect(() => {
    // no-store avoids stale cached JSON
    fetch("github-contrib.json", { cache: "no-store" })
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

  return (
    <KPIs
      items={[
        {
          label: <Tx>Publications</Tx>,
          value: publicationsCount,
          spark: [1, 2, 3, 4, 5, publicationsCount],
        },
        {
          label: <Tx>{label}</Tx>, // translates whatever label you pass in
          value: total,
          spark,
        },
      ]}
    />
  );
}
