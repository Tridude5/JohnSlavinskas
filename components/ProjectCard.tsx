"use client";

import React from "react";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  subtitle?: string;
  tags?: string[];
  href?: string;
  cta?: string;
  kpi?: string; // optional small highlight (e.g., "Faster solvent screening")
};

export default function ProjectCard({
  title,
  subtitle,
  tags = [],
  href = "#",
  cta = "View project",
  kpi,
}: ProjectCardProps) {
  return (
    <article className="card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-transform hover:-translate-y-0.5 hover:shadow-xl">
      {/* subtle gradient accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-cyan-400/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-400/5 transition-colors" />

      {/* KPI badge (optional) */}
      {kpi && (
        <span className="absolute right-4 top-4 inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs font-semibold text-emerald-300">
          {kpi}
        </span>
      )}

      <h3 className="relative z-[1] text-lg font-semibold">{title}</h3>

      {subtitle && (
        <p className="relative z-[1] mt-1 text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}

      {/* tags */}
      {tags.length > 0 && (
        <div className="relative z-[1] mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="relative z-[1] mt-4">
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium fancy-underline"
        >
          {cta} <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
        </Link>
      </div>
    </article>
  );
}
