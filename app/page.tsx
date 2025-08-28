"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import Timeline from "@/components/Timeline";
import KPIs from "@/components/KPIs";
import BlueprintFX from "@/components/BlueprintFX";
import ParallaxGroup from "@/components/ParallaxGroup";
import AutomationShowcase from "@/components/AutomationShowcase";

/* Magnetic hero buttons */
const MagneticButton = dynamic(() => import("@/components/MagneticButton"), { ssr: false });

/* ---------------- little UI helpers ---------------- */
function SkillsCard() {
  return (
    <aside className="rounded-2xl border bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30 p-5 shadow-xl">
      <h3 className="font-semibold">Skills at a glance</h3>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-gray-500">Materials</div>
          <ul className="mt-1 space-y-1">
            <li>Lignin · Biopolymers</li>
            <li>Pulp &amp; Paper</li>
            <li>DOE/SPC · Rheology</li>
          </ul>
        </div>
        <div>
          <div className="text-gray-500">Programming</div>
          <ul className="mt-1 space-y-1">
            <li>Python · JS/TS · Java</li>
            <li>TensorFlow · Keras</li>
            <li>SQL / NoSQL</li>
          </ul>
        </div>
        <div>
          <div className="text-gray-500">Quant</div>
          <ul className="mt-1 space-y-1">
            <li>Option Pricing</li>
            <li>Efficient Frontier</li>
            <li>Backtesting</li>
          </ul>
        </div>
        <div>
          <div className="text-gray-500">Lab &amp; Tools</div>
          <ul className="mt-1 space-y-1">
            <li>FTIR · NMR · GC/VOC</li>
            <li>MATLAB · VBA</li>
            <li>Firebase</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

type TLItem = { role: string; org: string; period: string; loc?: string; bullets: string[] };
function GreenTimeline({ items }: { items: TLItem[] }) {
  return (
    <ol className="relative border-l-2 border-emerald-500/40 pl-6 space-y-6">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-3 top-1 size-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          <div className="card p-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="font-semibold">
                {it.role} — <span className="text-emerald-400">{it.org}</span>
              </h3>
              <span className="text-xs text-gray-400">· {it.period}{it.loc ? ` · ${it.loc}` : ""}</span>
            </div>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
              {it.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* -------------------- PAGE -------------------- */
export default function Page() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // hero KPIs (two cards like hers)
  const heroKpis = [
    { label: "Publications", value: 6, spark: [1, 2, 3, 4, 5, 6] },
    { label: "Pilot/Lab Projects", value: 12, spark: [2, 3, 5, 7, 10, 12] },
  ];

  // Interests for pills (kept simple)
  const interests = [
    { label: "Running", emoji: "🏃" },
    { label: "Bouldering", emoji: "🧗" },
    { label: "Padel", emoji: "🎾" },
    { label: "Swimming", emoji: "🏊" },
    { label: "Strength Training", emoji: "🏋️" },
    { label: "Travel", emoji: "✈️" },
    { label: "Photography", emoji: "📷" },
    { label: "Video Editing", emoji: "🎬" },
  ];

  // Experience (timeline shape used by your <Timeline/>)
  const exp: TLItem[] = [
    {
      role: "Technology Development — Working Student",
      org: "Lignopure",
      period: "Dec 2024 – Jun 2025",
      loc: "Hamburg",
      bullets: [
        "Developed lignin-based leather via extrusion (≤70% lignin).",
        "Optimized properties; achieved industry-leading strength.",
        "Experimented with new lignin formulations for compatibility.",
      ],
    },
    {
      role: "Master Thesis Researcher",
      org: "HM Munich (with Lignopure)",
      period: "Nov 2024 – Jun 2025",
      bullets: [
        "Solvent selection & optimization (temperature, ratios, surfactants).",
        "Estimated Hansen Solubility Parameters for solvent selection.",
        "Evaluated functional changes during dissolution.",
      ],
    },
    {
      role: "Technology Development Intern",
      org: "Lignopure",
      period: "Aug 2024 – Nov 2024",
      bullets: [
        "Lignin processing & drying method studies.",
        "Contributed to “ForFun” functional materials project.",
        "With Univ. of Helsinki: VOC testing; identified odor sources & mitigations.",
      ],
    },
    {
      role: "Emerging Leader (Intern)",
      org: "Sonoco Product Co.",
      period: "May 2023 – Aug 2023",
      bullets: [
        "Analyzed effluent treatment; implemented cost-effective improvements.",
        "Deployed Parcview/Everactive sensors for real-time QC.",
      ],
    },
  ];

  return (
    <>
      {/* HERO (with grid + right skills card) */}
      <header className="container pt-14 pb-10 relative overflow-hidden">
        {/* Subtle blueprint background */}
        <div className="absolute inset-0 -z-10 opacity-70">
          <BlueprintFX />
        </div>

        <div className="grid gap-8 md:grid-cols-12 items-center relative">
          {/* Left: name, blurb, KPIs, CTAs */}
          <div className="md:col-span-7">
            <p className="text-sm uppercase tracking-widest text-gray-500">Materials × Software × Finance</p>

            <h1
              className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight
              bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent"
            >
              John (Jack) Slavinskas
            </h1>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Researcher and builder at the intersection of lignin &amp; biobased materials,
              Python/ML data pipelines, and small interactive quant apps.
            </p>

            <div className="mt-6 max-w-xl">
              <KPIs items={heroKpis} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton href="/resume" className="btn inline-block">Resume</MagneticButton>
              <MagneticButton href={`${base}/downloads/Resume%20P.pdf`} download="John_Slavinskas_Resume_1p.pdf" className="btn-outline inline-block">Download 1-pager</MagneticButton>
              <MagneticButton href={`${base}/downloads/CV-P.pdf`} download="John_Slavinskas_CV.pdf" className="btn-outline inline-block">Download CV</MagneticButton>
              <Link href="/projects" className="btn-outline">View Projects</Link>
            </div>
          </div>

          {/* Right: skills card (sticky look on desktop) */}
          <div className="md:col-span-5">
            <div className="card card-gradient">
              <SkillsCard />
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT (50/50: text + your photo from /downloads) */}
      <Section id="about" title="About" subtitle="Who I am and what I bring to materials + data + finance.">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="card">
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Strong research background in lignin chemistry, biopolymers, and sustainable materials.
                Comfortable moving between lab trials, pilot scale, and code: Python/TensorFlow/Keras, SQL,
                Java/TypeScript, and lightweight mobile (Kotlin/Swift). I like building practical tools—from
                solvent-selection helpers to option-pricing and portfolio demos.
              </p>

              {/* Interests pills */}
              <div className="pt-4 border-t border-gray-200/50 dark:border-gray-800/60">
                <h3 className="font-semibold text-base uppercase tracking-wide">Interests</h3>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                  {interests.map(({ label, emoji }) => (
                    <span
                      key={label}
                      className="h-[3.0rem] inline-flex items-center justify-center gap-2 rounded-full border border-gray-200/40 dark:border-gray-800/60 bg-white/5 text-sm font-medium px-3 text-center"
                    >
                      <span aria-hidden>{emoji}</span>
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right image (served from public/downloads/, allow JFIF) */}
          <ParallaxGroup>
            <figure data-parallax="0.12" className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200/30 dark:border-gray-800/50">
              <Image
                src={`${base}/downloads/1683206302513.jfif`}
                alt="John Slavinskas"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </figure>
          </ParallaxGroup>
        </div>
      </Section>

      {/* FEATURED PROJECTS (3-up) */}
      <Section id="projects" title="Featured projects" subtitle="Hands-on tools & experiments.">
        <div className="grid md:grid-cols-3 gap-6">
          <ProjectCard
            title="Lignin Solvent Helper"
            subtitle="Estimate HSP proximity and suggest candidate solvents/ratios"
            kpi="Faster solvent screening"
            tags={["Lignin", "HSP", "Python"]}
            href="/projects#lignin-solvent-helper"
            cta="View project"
          />
          <ProjectCard
            title="Option Pricing Demos"
            subtitle="Greeks + Black–Scholes visualizations and sanity tests"
            tags={["Finance", "Python", "Interactive"]}
            href="/projects#options"
            cta="Open demo"
          />
          <ProjectCard
            title="Efficient Frontier App"
            subtitle="Mean–variance portfolios with factor tilts & constraints"
            tags={["Portfolio", "Python", "Data"]}
            href="/projects#frontier"
            cta="Open app"
          />
        </div>
      </Section>

      {/* EXPERIENCE (timeline + automation showcase) */}
      <Section title="Experience">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <GreenTimeline items={exp} />
          </div>
          <aside className="md:col-span-4">
            <AutomationShowcase />
          </aside>
        </div>
      </Section>

      {/* EDUCATION & RESEARCH (two-up cards like hers) */}
      <Section title="Education & Leadership">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold">Education</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <div className="font-medium">MEng Paper Technology</div>
                <div className="text-gray-500">Hochschule München (HM) · Oct 2023 – Jul 2025</div>
                <div className="text-gray-500">Thesis: Solubility Evaluation of Technical Lignins…</div>
              </li>
              <li>
                <div className="font-medium">MS Financial Engineering</div>
                <div className="text-gray-500">WorldQuant University · Jan 2024 – Dec 2025</div>
              </li>
              <li>
                <div className="font-medium">BS Computer Science</div>
                <div className="text-gray-500">University of the People · Jun 2023 – Jun 2025</div>
              </li>
              <li>
                <div className="font-medium">BS Paper Engineering</div>
                <div className="text-gray-500">SUNY ESF · Aug 2020 – Aug 2023</div>
              </li>
            </ul>
          </div>
          <div className="card">
            <h3 className="font-semibold">Leadership & Research</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Co-author on 4+ peer-reviewed papers: fiber recycling &amp; sustainable packaging.</li>
              <li>Sensor deployments (Parcview/Everactive) for real-time QC dashboards.</li>
              <li>Incubator participant (SCE), and ML/AI certs (DeepLearning.AI, IBM).</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
