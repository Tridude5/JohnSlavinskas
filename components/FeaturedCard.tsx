"use client";

import Link from "next/link";
import Tx from "@/components/i18n/Tx";

type Props = {
  title: string; // english key
  blurb: string; // english key
  href: string;
  accent?: string;
};

export default function FeaturedCard({
  title,
  blurb,
  href,
  accent = "from-emerald-400 via-cyan-400 to-emerald-500",
}: Props) {
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      href={href}
      onMouseMove={onMove}
      className="group relative block overflow-hidden rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
    >
      <div className={`h-1 w-full bg-gradient-to-r ${accent} opacity-80 group-hover:opacity-100`} />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(360px circle at var(--x) var(--y), rgba(255,255,255,0.12), transparent 40%)" }}
      />
      <div className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:22px_22px] text-gray-700 dark:text-white" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight"><Tx>{title}</Tx></h3>
          <span aria-hidden className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-300">
            <Tx>Featured</Tx>
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-200"><Tx>{blurb}</Tx></p>
        <div className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-300"><Tx>View project</Tx></div>
      </div>
    </Link>
  );
}
