"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import Section from "@/components/Section";
// (KPIs import not needed anymore on this page)
import BlueprintFX from "@/components/BlueprintFX";
import ParallaxGroup from "@/components/ParallaxGroup";
import SkillsCard from "@/components/SkillsCard";
import ProgrammingShowcase from "@/components/ProgrammingShowcase";
import DynamicHeroKpis from "@/components/DynamicHeroKpis";

const MagneticButton = dynamic(() => import("@/components/MagneticButton"), { ssr: false });

type TLItem = { role: string; org: string; period: string; loc?: string; bullets: string[] };

/* ---------- Experience timeline (gray line, bigger dot, close to text, shifted right) ---------- */
function GreenTimeline({ items }: { items: TLItem[] }) {
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
              {it.role} — <span className="text-emerald-400">{it.org}</span>
            </h3>
            <div className="mt-1 text-sm text-gray-400">
              {it.period}
              {it.loc ? ` · ${it.loc}` : ""}
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

/* ---------- Publications ---------- */
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
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold">JMSRR</span>
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
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold">ChemRxiv</span>
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
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold">JMSRR</span>
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
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold">JMSRR</span>
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
            A Global Look at the Market Potential of Liquid Container Board and Its Ability to Reduce Plastic Waste – A Brief Review
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

/* ---------- Featured helper (shimmer + blueprint grid, no pills) ---------- */
function FeaturedCard({
  title,
  blurb,
  href,
  accent = "from-emerald-400 via-cyan-400 to-emerald-500",
}: {
  title: string;
  blurb: string;
  href: string;
  accent?: string;
}) {
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
      {/* gradient topper */}
      <div className={`h-1 w-full bg-gradient-to-r ${accent} opacity-80 group-hover:opacity-100`} />

      {/* soft mouse glimmer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(360px circle at var(--x) var(--y), rgba(255,255,255,0.12), transparent 40%)" }}
      />

      {/* faint blueprint grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:22px_22px] text-gray-700 dark:text-white" />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <span aria-hidden className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-300">
            Featured
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-200">{blurb}</p>
        <div className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-300">
          View project
        </div>
      </div>
    </Link>
  );
}

/* ---------- Page ---------- */
export default function Page() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const interests = [
    { label: "Triathlon", emoji: "🏊🚴🏃" },
    { label: "Ultimate", emoji: "🥏" },
    { label: "Programming", emoji: "💻" },
    { label: "Entrepreneurship", emoji: "🚀" },
    { label: "Travel", emoji: "✈️" },
    { label: "Birdwatching", emoji: "🪶" },
    { label: "Fishing", emoji: "🎣" },
    { label: "Geocaching", emoji: "📍" },
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
      {/* HERO — shorter intro with intl experience */}
      <header className="container pt-10 pb-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-70">
          <BlueprintFX />
        </div>

        <div className="grid gap-8 md:grid-cols-12 items-center relative">
          {/* Left */}
          <div className="md:col-span-7">
            <p className="text-sm uppercase tracking-widest text-gray-500">Materials × Software × Finance</p>

            <h1 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              John (Jack) Slavinskas
            </h1>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              I work at the overlap of materials and software. International experience (Europe & North America).
              I turn lignin and other biobased research into clean data, simple models, and small tools that help teams decide faster.
            </p>

            <div className="mt-6 max-w-xl">
              {/* Dynamic commits KPI (no basePath prop) */}
              <DynamicHeroKpis publicationsCount={6} />
            </div>

            {/* CTAs — now all magnetic + shiny */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <MagneticButton href={`${base}/resume`} className="btn w-full inline-flex justify-center text-center">
                See Resume
              </MagneticButton>

              <MagneticButton
                href={`${base}/downloads/Resume%20P.pdf`}
                download="John_Slavinskas_Resume_1p.pdf"
                className="btn-outline w-full inline-flex justify-center text-center"
              >
                Download 1-pager
              </MagneticButton>

              <MagneticButton
                href={`${base}/downloads/CV-P.pdf`}
                download="John_Slavinskas_CV.pdf"
                className="btn-outline w-full inline-flex justify-center text-center"
              >
                Download CV
              </MagneticButton>

              <MagneticButton href="/projects" className="btn-outline w-full inline-flex justify-center text-center">
                View Projects
              </MagneticButton>

              {/* Grid span must be on wrapper; add a small div for layout */}
              <div className="col-span-2">
                <MagneticButton
                  href="https://github.com/Tridude5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full inline-flex items-center justify-center gap-2 px-4 py-2.5"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1 .11-.79.42-1.32.76-1.62-2.67-.31-5.48-1.34-5.48-5.96 0-1.32.47-2.39 1.24-3.23-.13-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.69.25 2.94.12 3.25.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.64-5.49 5.95.44.38.83 1.12.83 2.26v3.35c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
                    />
                  </svg>
                  <span>GitHub</span>
                </MagneticButton>
              </div>

              <div className="col-span-2">
                <MagneticButton
                  href="https://www.linkedin.com/in/john-slavinskas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full inline-flex items-center justify-center gap-2 px-4 py-2.5"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.62-1.85 3.33-1.85 3.56 0 4.22 2.34 4.22 5.39v6.35ZM5.34 7.44A2.06 2.06 0 1 1 5.33 3.3a2.06 2.06 0 0 1 .01 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"
                    />
                  </svg>
                  <span>LinkedIn</span>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right: Skills at a glance */}
          <div className="md:col-span-5">
            <div className="card card-gradient">
              <SkillsCard />
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT — endurance, Ironman, Europe, and translation to work (friendly, no long dashes) */}
      <Section id="about" title="About" subtitle="Materials, data, and a big soft spot for useful tools.">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="card">
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Endurance sports are a big part of my life. I train year round and finished an Ironman. Long swims, windy bike rides, and quiet miles teach patience and grit. The plan matters, but so do the small choices inside the plan. Fuel on time. Keep the cadence. Fix little problems early.
              </p>
              <p>
                I came to Europe to study in Munich and work with teams building real materials, not just slides. Germany gave me new labs, bilingual meetings, and a useful kind of humility. Learn fast. Ask clear questions. Write things down so the next person does not have to guess.
              </p>
              <p>
                That mindset shows up in my work. I break big goals into blocks I can finish this week. I keep clean notebooks and short scripts that anyone can run. I like small tools that make decisions easier for the whole team. If a teammate can pick up my work without me in the room, that is success.
              </p>
              <p>
                Day to day I move between lignin and other biobased materials, Python and ML pipelines, and little interactive apps. Give me a fuzzy problem, a pile of notes, and a deadline and I am happy.
              </p>

              <div className="pt-4 border-t border-gray-200/50 dark:border-gray-800/60 text-center">
                <h3 className="font-semibold text-base uppercase tracking-wide">Interests</h3>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
                  {interests.map(({ label, emoji }) => (
                    <span
                      key={label}
                      className="w-full h-[3.25rem] inline-flex items-center justify-center gap-2 rounded-full border border-gray-200/40 dark:border-gray-800/60 bg-white/5 px-3 text-[13px] sm:text-sm font-medium text-center whitespace-normal break-words leading-snug"
                    >
                      <span aria-hidden className="shrink-0">{emoji}</span>
                      <span className="block">{label}</span>
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

      {/* PROJECTS — Featured */}
      <Section id="projects" title="Featured projects" subtitle="Hands-on tools and experiments.">
        <div className="grid md:grid-cols-3 gap-6">
          <FeaturedCard
            title="Eagle Scout Project"
            blurb="Custom dugout gear systems for John Glenn High School. Scoped, permitted, fundraised, and led volunteers — built to last, delivered on time."
            href="/projects#eagle-scout"
            accent="from-emerald-400 via-teal-400 to-emerald-500"
          />

          <FeaturedCard
            title="Prazise"
            blurb="Recovery-aware training engine. Reads HR/HRV, sleep, and recent load to auto-calibrate targets and adjust sessions — private by design. In active development."
            href="/projects#prazise"
            accent="from-amber-400 via-orange-400 to-yellow-500"
          />

          <FeaturedCard
            title="Efficient Frontier App"
            blurb="Interactive mean-variance explorer with factor tilts, constraints, and stress tests — compare to benchmarks and export in one click."
            href="/projects"
            accent="from-violet-400 via-fuchsia-400 to-pink-500"
          />
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <GreenTimeline items={exp} />
          </div>
          <aside className="md:col-span-5">
            <div className="sticky top-24">
              <ProgrammingShowcase />
            </div>
          </aside>
        </div>
      </Section>

      {/* EDUCATION & RESEARCH */}
      <Section title="Education & Research">
        <div className="grid md:grid-cols-2 gap-6">
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
                    Solubility Evaluation of Technical Lignins in Organic Solvents for the Development of a Lignin-Based Extract
                  </em>
                </div>
              </li>
              <li>
                <div className="font-medium flex items-center gap-2">
                  <span className="text-xl">💻</span> BS Computer Science
                </div>
                <div className="text-gray-500">University of the People · Jun 2023 – Jun 2025 (WASC)</div>
                <div className="mt-1 text-gray-400">
                  <span className="font-medium text-gray-300">Concentrations:</span> Data Science, Network & Application Security
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

          <div className="card">
            <h3 className="font-semibold">Research & Publications</h3>
            <Publications />
          </div>
        </div>
      </Section>
    </>
  );
}
