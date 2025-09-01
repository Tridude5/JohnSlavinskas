"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

type TLItem = {
  role: string;
  org: string;
  period: string;
  loc?: string;
  bullets: string[];
};

export default function Timeline({ items }: { items: TLItem[] }) {
  const { t } = useI18n();
  return (
    <ol className="relative ml-[14px] pl-8 md:pl-9 border-l-2 border-gray-400/30 dark:border-white/10">
      {items.map((it, i) => (
        <li key={i} className="relative pb-8 last:pb-0">
          <span
            aria-hidden
            className="absolute top-1 h-4 w-4 rounded-full bg-emerald-500 ring-[3px] ring-emerald-500/25"
            style={{ left: 0, transform: "translateX(calc(-50% - 47px))" }}
          />
          <div className="pt-0.5">
            <h3 className="font-semibold">
              {t(it.role)} — <span className="text-emerald-400">{t(it.org)}</span>
            </h3>
            <div className="mt-1 text-sm text-gray-400">
              {t(it.period)}
              {it.loc ? ` · ${t(it.loc)}` : ""}
            </div>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-800 dark:text-gray-200">
              {it.bullets.map((b, j) => (
                <li key={j}>{t(b)}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
