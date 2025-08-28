"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import KPIs from "@/components/KPIs";
import BlueprintFX from "@/components/BlueprintFX";
import ParallaxGroup from "@/components/ParallaxGroup";

/* Magnetic hero buttons */
const MagneticButton = dynamic(() => import("@/components/MagneticButton"), { ssr: false });

/* ---------------- types ---------------- */
type TLItem = { role: string; org: string; period: string; loc?: string; bullets: string[] };

/* ---------------- Experience timeline (no boxes, single line) ---------------- */
function GreenTimeline({ items }: { items: TLItem[] }) {
  return (
    <ol
      className="
        relative pl-9 space-y-8
        before:absolute before:left-3 before:top-0 before:bottom-0
        before:w-[2px] before:bg-emerald-500/40 before:content-['']
      "
    >
      {items.map((it, i) => (
        <li key={i} className="relative">
          {/* dot (centered on the line) */}
          <span
            aria-hidden
            className="absolute left-3 -translate-x-1/2 top-1 h-3 w-3 rounded-full
                       bg-emerald-500 ring-4 ring-emerald-500/20"
          />
          <div className="pt-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="font-semibold">
                {it.role} — <span className="text-emerald-400">{it.org}</span>
              </h3>
              <span className="text-xs text-gray-400">
                · {it.period}
                {it.loc ? ` · ${it.loc}` : ""}
              </span>
            </div>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-800 dark:text-gray-200">
              {it.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- Fancy programming sidebar ---------------- */
function Bar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs text-gray-400">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

function ProgrammingShowcase() {
  return (
    <aside className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-5 shadow-xl">
      <h3 className="font-semibold">Programming Showcase</h3>

      {/* language bars */}
      <div className="mt-4 space-y-3">
        <Bar label="TypeScript / JavaScript" pct={88} />
        <Bar label="Python (data/ML)" pct={85} />
        <Bar label="SQL / NoSQL" pct={78} />
        <Bar label="Kotlin / Swift (lightweight)" pct={55} />
      </div>

      {/* stack badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>Next.js</Badge>
        <Badge>Node</Badge>
        <Badge>Tailwind</Badge>
        <Badge>Firebase</Badge>
        <Badge>TensorFlow</Badge>
        <Badge>Keras</Badge>
        <Badge>Pandas</Badge>
        <Badge>NumPy</Badge>
        <Badge>GitHub Actions</Badge>
      </div>

      {/* mini activity sparkline (pure CSS) */}
      <div className="mt-5">
        <div className="text-xs text-gray-400 mb-2">Recent commits</div>
        <div className="flex items-end gap-1 h-10">
          {[4, 7, 2, 9, 6, 10, 5, 8, 3, 9, 7, 11].map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-sm bg-emerald-400/70 animate-pulse"
              style={{ height: `${h * 0.22}rem`, animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </div>

      {/* tiny code card */}
      <div className="mt-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4 font-mono text-xs">
        <div className="flex gap-1 mb-2">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-yellow-400" />
          <span className="size-2 rounded-full bg-green-400" />
        </div>
        <pre className="whitespace-pre-wrap">
{`// quick HSP proximity demo (pseudo)
const toRadius = (x:number[]) => Math.hypot(...x);
function proximity(sample:number[], solvent:number[]) {
  const diff = sample.map((v, i) => v - solvent[i]);
  return (1 - toRadius(diff)/toRadius(sample)).toFixed(2);
}
console.log('HSP proximity:', proximity([18,10,7],[17.8,8.5,6.8]));`}
        </pre>
      </div>
    </aside>
  );
}

/* ---------------- Publications (fancier spacing & badges) ---------------- */
function Publications() {
  return (
    <ul className="mt-3 divide-y divide-white/10">
      <li className="py-4">
        <a
          href="https://journaljmsrr.com/index.php/JMSRR/article/view/425"
          className="fancy-underline group inline-flex items-start"
          target="_blank"
          rel="noreferrer"
        >
          <span className="font-medium">Lignin-Derived Carbon Fibres: Opportunities and Challenges</span>
          <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">↗</span>
        </a>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold">
            JMSRR
          </span>
          <span>2025</span>
        </div>
      </li>

      <li className="py-4">
        <a
          href="https://chemrxiv.org/engage/chemrxiv/article-details/6809454b927d1c2e6670bc80"
          className="fancy-underline group inline-flex items-start"
          target="_blank"
          rel="noreferrer"
        >
          <span className="font-medium">Lignin Derived Chemicals and Aromatics: A Review</span>
          <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">↗</span>
        </a>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold">
            ChemRxiv
          </span>
          <span>Apr 24, 2025</span>
        </div>
      </li>

      <li className="py-4">
        <a
          href="https://journaljerr.com/index.php/JERR/article/view/1174"
          className="fancy-underline group inline-flex items-start"
          target="_blank"
          rel="noreferrer"
        >
          <span className="font-medium">
            Sustainable Greeting Card – Paper Products Produced on a Laboratory Paper Machine
          </span>
          <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">↗</span>
        </a>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold">
            J. Engineering Research & Reports
          </span>
          <span>2024</span>
        </div>
      </li>

      <li className="py-4">
        <a
          href="https://journaljmsrr.com/index.php/JMSRR/article/view/251"
          className="fancy-underline group inline-flex items-start"
          target="_blank"
          rel="noreferrer"
        >
          <span className="font-medium">
            Characterization of Recycled Fiber Material Made from LCB and/or OCC – Handsheet Study
          </span>
          <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">↗</span>
        </a>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold">
            JMSRR
          </span>
          <span>2023</span>
        </div>
      </li>

      <li className="py-4">
        <a
          href="https://journaljmsrr.com/index.php/JMSRR/article/view/225"
          className="fancy-underline group inline-flex items-start"
          target="_blank"
          rel="noreferrer"
        >
          <span className="font-medium">Upgrading of OCC with Aseptic Packaging for Paper Board Applications</span>
          <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">↗</span>
        </a>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold">
            JMSRR
          </span>
          <span>2022</span>
        </div>
      </li>

      <li className="py-4">
        <a
          href="https://journaljerr.com/index.php/JERR/article/view/780"
          className="fancy-underline group inline-flex items-start"
          target="_blank"
          rel="noreferrer"
        >
          <span className="font-medium">
            A Global Look at the Market Potential of Liquid Container Board and Its Ability to Reduce Plastic
            Waste – A Brief Review
          </span>
          <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">↗</span>
        </a>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold">
            J. Engineering Research & Reports
          </span>
          <span>2022</span>
        </div>
      </li>
    </ul>
  );
}

/* ------------------- PAGE ------------------- */
export default function Page() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // hero KPIs
  const heroKpis = [
    { label: "Publications", value: 6, spark: [1, 2, 3, 4, 5, 6] },
    { label: "Pilot/Lab Projects", value: 12, spark: [2, 3, 5, 7, 10, 12] },
  ];

  const interests = [
    { label: "Triathlon (swim • bike • run)", emoji: "🏊🚴🏃" },
    { label: "Ultimate", emoji: "🥏" },
    { label: "Programming & Making", emoji: "💻" },
    { label: "Entrepreneurship", emoji: "🚀" },
    { label: "Travel", emoji: "✈️" },
    { label: "Birdwatching", emoji: "🪶" },
    { label: "Fishing", emoji: "🎣" },
    { label: "Geocaching", emoji: "📍" },
    { label: "Model Kits", emoji: "🧩" },
  ];

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
      {/* HERO */}
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
              Researcher and builder at the intersection of lignin &amp; biobased materials, Python/ML data
              pipelines, and small interactive quant apps.
            </p>

            <div className="mt-6 max-w-xl">
              <KPIs items={heroKpis} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton href="/resume" className="btn inline-block">
                Resume
              </MagneticButton>
              <MagneticButton
                href={`${base}/downloads/Resume%20P.pdf`}
                download="John_Slavinskas_Resume_1p.pdf"
                className="btn-outline inline-block"
              >
                Download 1-pager
              </MagneticButton>
              <MagneticButton
                href={`${base}/downloads/CV-P.pdf`}
                download="John_Slavinskas_CV.pdf"
                className="btn-outline inline-block"
              >
                Download CV
              </MagneticButton>
              <Link href="/projects" className="btn-outline">
                View Projects
              </Link>
            </div>
          </div>

          {/* Right: programming showcase */}
          <div className="md:col-span-5">
            <div className="card card-gradient">
              <ProgrammingShowcase />
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
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

          <ParallaxGroup>
            <figure
              data-parallax="0.12"
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200/30 dark:border-gray-800/50"
            >
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

      {/* FEATURED PROJECTS */}
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

      {/* EXPERIENCE */}
      <Section title="Experience">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <GreenTimeline items={exp} />
          </div>
          <aside className="md:col-span-4">
            <ProgrammingShowcase />
          </aside>
        </div>
      </Section>

      {/* EDUCATION & RESEARCH */}
      <Section title="Education & Research">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          <div className="card">
            <h3 className="font-semibold">Education</h3>
            <ul className="mt-3 space-y-4 text-sm">
              <li>
                <div className="font-medium flex items-center gap-2">
                  <span className="text-xl">📈</span> MS Financial Engineering
                </div>
                <div className="text-gray-500">WorldQuant University · Jan 2024 – Dec 2025 (DEAC)</div>
                <div className="mt-1 text-gray-400">
                  <span className="font-medium text-gray-300">Capstone:</span> Sustainability (TBD).
                </div>
              </li>

              <li>
                <div className="font-medium flex items-center gap-2">
                  <span className="text-xl">🧻</span> MEng Paper Technology
                </div>
                <div className="text-gray-500">Hochschule München (HM) · Oct 2023 – Jul 2025 (ZEvA)</div>
                <div className="mt-1 text-gray-400">
                  <span className="font-medium text-gray-300">Thesis:</span>{" "}
                  <em>
                    Solubility Evaluation of Technical Lignins in Organic Solvents for the Development of a
                    Lignin-Based Extract
                  </em>
                </div>
              </li>

              <li>
                <div className="font-medium flex items-center gap-2">
                  <span className="text-xl">💻</span> BS Computer Science
                </div>
                <div className="text-gray-500">University of the People · Jun 2023 – Jun 2025 (WASC)</div>
                <div className="mt-1 text-gray-400">
                  <span className="font-medium text-gray-300">Concentrations:</span> Data Science, Network &
                  Application Security
                </div>
              </li>

              <li>
                <div className="font-medium flex items-center gap-2">
                  <span className="text-xl">📄</span> BS Paper Engineering
                </div>
                <div className="text-gray-500">SUNY ESF · Aug 2020 – Aug 2023 (ABET)</div>
                <div className="mt-1 text-gray-400">
                  <span className="font-medium text-gray-300">Minors:</span> Management, Physics
                </div>
              </li>
            </ul>
          </div>

          {/* Research & Publications */}
          <div className="card">
            <h3 className="font-semibold">Research & Publications</h3>
            <Publications />
          </div>
        </div>
      </Section>
    </>
  );
}
