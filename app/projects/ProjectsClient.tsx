"use client";
import React from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

// Types
export type Link = { label: string; href: string };
export type Project = {
  id?: string; // anchor id for deep-links like /projects#eagle-scout
  title: string;
  subtitle?: string;
  period?: string;
  status: "Completed" | "In development" | "Private" | "Planned";
  summary: string;
  bullets?: string[];
  tags?: string[];
  links?: Link[];
  compact?: boolean; // smaller vertical rhythm to vary card heights
};

// Data (keep English; we translate on render)
const projects: Project[] = [
  {
    id: "eagle-scout",
    title: "Eagle Scout — Helmet & Bat Racks for John Glenn High School",
    subtitle: "Boy Scouts of America • Rank awarded Mar 2020",
    period: "2019–2020",
    status: "Completed",
    summary:
      "Eagle Scout is the highest rank in Scouting and requires sustained leadership, community service, and a capstone project. I proposed, planned, fundraised, and led the construction of custom helmet and bat racks for the baseball and softball dugouts at John Glenn High School.",
    bullets: [
      "Defined scope and design; coordinated with school staff and coaches",
      "Raised funds, sourced materials, created a detailed bill of materials",
      "Scheduled and led volunteer crews; safety briefing and task breakdown",
      "Managed timeline and budget; delivered durable, finished racks on time",
    ],
    tags: ["leadership", "community", "operations", "fabrication"],
  },
  {
    id: "hsp-toolkit",
    title: "Hansen Solubility Parameter Toolkit",
    subtitle: "Estimate HSPs for a specific lignin from bench solubility screens",
    status: "Private",
    period: "2024–2025 (private to Lignopure)",
    compact: true,
    summary:
      "Ran a solvent screen (acetone, butanediol, ethanol, DMSO, etc.) and used %-solubility data to estimate the lignin’s Hansen parameters (δD, δP, δH). The UI then matches the estimated HSP to a solvent database to rank candidate dissolvers/blends for that particular lignin (structure varies by source, so HSPs differ). Code/data are private to Lignopure.",
    tags: ["materials", "HSP", "lignin", "python", "ui"],
  },
  {
    id: "prazise",
    title: "Prazise",
    subtitle: "Precision training micro-tool",
    status: "In development",
    summary:
      "Prazise reads heart rate, HRV, sleep, and workouts to deliver precise training — personalized to you, not a template. It adapts sessions to recovery, explains the why, and keeps data private by design.",
    bullets: [
      "Reads HR, HRV, sleep, and recent sessions; calibrates to the athlete",
      "Daily precision session suggestions with targets, cues, and post-run insights",
      "Recovery-aware adjustments after tough/breakthrough days; overtraining risk signals",
      "Privacy-first: encrypted at rest, deletable on request, never sold",
      "Device-friendly: Garmin, Polar, Suunto, Apple Health, Fitbit (planned)",
    ],
    tags: ["software", "sports", "modeling", "product"],
  },
  {
    id: "wqu-capstone",
    title: "WorldQuant University Capstone",
    subtitle: "M.S. Financial Engineering",
    status: "Planned",
    period: "Target: Dec 2025",
    summary:
      "Capstone slated for December 2025. Topic TBD; likely directions include portfolio optimization, time-series modeling, or derivatives pricing.",
    tags: ["finance", "ml"],
  },
];

// UI helpers
function StatusBadge({ status }: { status: Project["status"] }) {
  const { t } = useI18n();
  const styles: Record<Project["status"], string> = {
    Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    "In development": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    Private: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
    Planned: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {t(status)}
    </span>
  );
}

function ProjectCard({ p, accentClass }: { p: Project; accentClass: string }) {
  const { t } = useI18n();

  // track mouse position for a soft glimmer effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  const padding = p.compact ? "p-5" : "p-6";
  const titleSize = p.compact ? "text-base" : "text-lg";
  const gapRight = p.compact ? "pr-24" : "pr-28";

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:shadow-xl"
    >
      {/* colorful top bar */}
      <div className={`h-1 w-full bg-gradient-to-r transition-opacity duration-300 group-hover:opacity-90 ${accentClass}`} />

      {/* soft glimmer following cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(360px circle at var(--x) var(--y), rgba(255,255,255,0.12), transparent 40%)",
        }}
      />

      <div className={`${padding} relative`}>
        {/* status pill pinned top-right */}
        <div className="absolute right-4 top-3 z-10"><StatusBadge status={p.status} /></div>

        <div className={`flex flex-wrap items-start justify-between gap-3 ${gapRight}`}>
          <div>
            <h3 className={`${titleSize} font-semibold tracking-tight`}>{t(p.title)}</h3>
            {p.subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{t(p.subtitle)}</p>
            )}
          </div>
          {p.period && (
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{t(p.period)}</span>
          )}
        </div>

        <p className="mt-3 text-sm text-gray-700 dark:text-gray-200 leading-6">{t(p.summary)}</p>

        {p.bullets && p.bullets.length > 0 && (
          <ul className={`mt-3 list-disc pl-5 space-y-1 text-sm ${p.compact ? "hidden md:block md:space-y-0 md:list-none md:pl-0" : ""}`}>
            {p.bullets.map((b, i) => (
              <li key={i}>{t(b)}</li>
            ))}
          </ul>
        )}

        {p.tags && p.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2 py-0.5 text-xs bg-gray-100 text-gray-700 dark:bg-zinc-800/60 dark:text-gray-200"
              >
                {t(tag)}
              </span>
            ))}
          </div>
        )}

        {p.links && p.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} className="btn-outline text-sm">
                {t(l.label)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsClient() {
  const accents = [
    "from-emerald-400 via-teal-400 to-emerald-500",
    "from-violet-400 via-fuchsia-400 to-pink-500",
    "from-amber-400 via-orange-400 to-yellow-500",
    "from-sky-400 via-cyan-400 to-blue-500",
  ];

  // Masonry-style layout using CSS columns. Cards get natural, uneven stacking.
  return (
    <div className="columns-1 md:columns-2 gap-6 [column-fill:_balance]">
      {projects.map((p, i) => (
        <div
          key={p.id ?? p.title}
          id={p.id}
          className="mb-6 break-inside-avoid scroll-mt-24"
        >
          <ProjectCard p={p} accentClass={accents[i % accents.length]} />
        </div>
      ))}
    </div>
  );
}
