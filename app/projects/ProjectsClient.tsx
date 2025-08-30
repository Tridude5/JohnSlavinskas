import React from "react";

export const metadata = { title: "Projects — John Slavinskas" };

type Link = { label: string; href: string };

type Project = {
  title: string;
  subtitle?: string;
  period?: string;
  status: "Completed" | "In development" | "Private" | "Planned";
  summary: string;
  bullets?: string[];
  tags?: string[];
  links?: Link[];
};

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
      "Building a small app to turn personal/coach data into adaptive training decisions. Goal: detect when things drift (injury risk, illness, life stress), estimate overtraining risk, and suggest simple adjustments to keep progress smooth.",
    bullets: [
      "Data ingestion pipeline for workouts and basic biometrics",
      "Model prototypes for readiness/overtraining indicators",
      "Interactive charts and lightweight plan adjustments (Next.js + backend)",
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

function StatusBadge({ status }: { status: Project["status"] }) {
  const styles: Record<Project["status"], string> = {
    Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    "In development": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    Private: "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-200",
    Planned: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="card p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
          {p.subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{p.subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {p.period && (
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{p.period}</span>
          )}
          <StatusBadge status={p.status} />
        </div>
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
              className="rounded-full border border-gray-200 dark:border-gray-700 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300"
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
  );
}

export default function ProjectsPage() {
  return (
    <div className="container py-12">
      <header className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </div>
  );
}
