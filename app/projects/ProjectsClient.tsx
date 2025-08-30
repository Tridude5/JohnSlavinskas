"use client";
import React from "react";

// Types
export type Link = { label: string; href: string };
export type Project = {
  title: string;
  subtitle?: string;
  period?: string;
  status: "Completed" | "In development" | "Private" | "Planned";
  summary: string;
  bullets?: string[];
  tags?: string[];
  links?: Link[];
};

// Data
const projects: Project[] = [
  {
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
    title: "Hansen Solubility Parameter Toolkit",
    subtitle: "Estimate HSPs for a specific lignin from bench solubility screens",
    status: "Private",
    period: "2024–2025 (private to Lignopure)",
    summary:
      "Ran a solvent screen (acetone, butanediol, ethanol, DMSO, etc.) and used %‑solubility data to estimate the lignin’s Hansen parameters (δD, δP, δH). The UI then matches the estimated HSP to a solvent database to rank candidate dissolvers/blends for that particular lignin (structure varies by source, so HSPs differ). Code/data are private to Lignopure.",
    tags: ["materials", "HSP", "lignin", "python", "ui"],
  },
  {
    title: "Prazise",
    subtitle: "Precision training micro‑tool",
    status: "In development",
    summary:
      "Prazise reads heart rate, HRV, sleep, and workouts to deliver precise training — personalized to you, not a template. It adapts sessions to recovery, explains the why, and keeps data private by design.",
    bullets: [
      "Reads HR, HRV, sleep, and recent sessions; calibrates to the athlete",
      "Daily precision session suggestions with targets, cues, and post‑run insights",
      "Recovery‑aware adjustments after tough/breakthrough days; overtraining risk signals",
      "Privacy‑first: encrypted at rest, deletable on request, never sold",
      "Device‑friendly: Garmin, Polar, Suunto, Apple Health, Fitbit (planned)",
    ],
    tags: ["software", "sports", "modeling", "product"],
  },
  {
    title: "WorldQuant University Capstone",
    subtitle: "M.S. Financial Engineering",
    status: "Planned",
    period: "Target: Dec 2025",
    summary:
      "Capstone slated for December 2025. Topic TBD; likely directions include portfolio optimization, time‑series modeling, or derivatives pricing.",
    tags: ["finance", "ml"],
  },
];

// UI helpers
function StatusBadge({ status }: { status: Project["status"] }) {
  const styles: Record<Project["status"], string> = {
    Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    "In development": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    Private: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
    Planned: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

function ProjectCard({ p, accentClass }: { p: Project; accentClass: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm">
      {/* colorful top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${accentClass}`} />

      <div className="p-6">
        {/* status pill pinned top-right */}
        <div className="absolute right-4 top-3"><StatusBadge status={p.status} /></div>

        <div className="flex flex-wrap items-start justify-between gap-3 pr-28">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
            {p.subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{p.subtitle}</p>
            )}
          </div>
          {p.period && (
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{p.period}</span>
          )}
        </div>

        <p className="mt-3 text-sm text-gray-700 dark:text-gray-200 leading-6">{p.summary}</p>

        {p.bullets && p.bullets.length > 0 && (
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
            {p.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {p.tags && p.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full px-2 py-0.5 text-xs bg-gray-100 text-gray-700 dark:bg-zinc-800/60 dark:text-gray-200"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {p.links && p.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} className="btn-outline text-sm">
                {l.label}
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

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p, i) => (
        <ProjectCard key={p.title} p={p} accentClass={accents[i % accents.length]} />
      ))}
    </div>
  );
}
