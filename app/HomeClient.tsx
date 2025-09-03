"use client";

import React from "react";

import Section from "@/components/Section";
import BlueprintFX from "@/components/BlueprintFX";
import ParallaxGroup from "@/components/ParallaxGroup";
import SkillsCard from "@/components/SkillsCard";
import ProgrammingShowcase from "@/components/ProgrammingShowcase";
import DynamicHeroKpis from "@/components/DynamicHeroKpis";

import Tx from "@/components/i18n/Tx";
import { useI18n } from "@/components/i18n/I18nProvider";

import PhotoTile from "@/components/PhotoTile";
import Timeline from "@/components/Timeline";
import Publications from "@/components/Publications";
import FeaturedCard from "@/components/FeaturedCard";
import MagneticButton from "@/components/MagneticButton";

/* ---------- Local types ---------- */
type TLItem = { role: string; org: string; period: string; loc?: string; bullets: string[] };

/* ---------- Local data ---------- */
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

/* ---------- Page ---------- */
export default function HomeClient() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const { t } = useI18n();

  const EXTERNAL_RESUME_URL = "https://tridude5.github.io/JohnSlavinskas/resume/";

  return (
    <>
      {/* HERO — trimmed spacing so CTAs show sooner */}
      <header className="container relative overflow-hidden pt-6 sm:pt-6 md:pt-5 lg:pt-4 pb-4">
        <div className="absolute inset-0 -z-10">
          <BlueprintFX />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          {/* slightly shorter fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-18 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-12 items-start relative">
          {/* Left */}
          <div className="min-w-0 md:col-span-7">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              <Tx>Materials × Software × Finance</Tx>
            </p>

            {/* mt-0 (was mt-1) */}
            <h1 className="mt-0 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent break-words">
              John (Jack) Slavinskas
            </h1>

            {/* mt-3 (was mt-2/3/4 previously) */}
            <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-200 max-w-2xl">
              <Tx>
                I work at the overlap of materials and software. International experience (Europe & North America).
                I turn lignin and other biobased research into clean data, simple models, and small tools that help teams decide faster.
              </Tx>
            </p>

            {/* mt-4 (was mt-6/5) */}
            <div className="mt-4 max-w-xl min-w-0 overflow-hidden">
              <DynamicHeroKpis publicationsCount={6} />
            </div>

            {/* CTAs — mt-3 (was mt-4/5/6) */}
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[3.25rem]">
              <MagneticButton
                href={EXTERNAL_RESUME_URL}
                className="btn w-full h-full inline-flex justify-center text-center text-[13px] sm:text-sm
                           rounded-full border border-white/10 shadow-sm
                           hover:shadow-lg hover:border-white/20 transition"
              >
                <Tx>See Resume</Tx>
              </MagneticButton>

              <MagneticButton
                href={"downloads/Resume%20P.pdf"}
                download="John_Slavinskas_Resume_1p.pdf"
                className="btn-outline w-full h-full inline-flex justify-center text-center text-[13px] sm:text-sm
                           rounded-full border border-white/15 hover:border-white/25
                           hover:shadow-md hover:bg-white/10 transition"
              >
                <Tx>Download 1-pager</Tx>
              </MagneticButton>

              <MagneticButton
                href={"downloads/CV-P.pdf"}
                download="John_Slavinskas_CV.pdf"
                className="btn-outline w-full h-full inline-flex justify-center text-center text-[13px] sm:text-sm
                           rounded-full border border-white/15 hover:border-white/25
                           hover:shadow-md hover:bg-white/10 transition"
              >
                <Tx>Download CV</Tx>
              </MagneticButton>

              <MagneticButton
                href={"projects"}
                className="btn-outline w-full h-full inline-flex justify-center text-center text-[13px] sm:text-sm
                           rounded-full border border-white/15 hover:border-white/25
                           hover:shadow-md hover:bg-white/10 transition"
              >
                <Tx>View Projects</Tx>
              </MagneticButton>

              {/* Bottom row */}
              <a
                href="https://github.com/Tridude5"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full h-full col-span-2 inline-flex items-center justify-center gap-2 px-3 sm:px-4 min-w-0 whitespace-normal break-words leading-snug text-[13px] sm:text-sm
                           rounded-full border border-white/15 hover:border-white/25 hover:shadow-md hover:bg-white/10 transition"
                aria-label={t("Open my GitHub profile in a new tab")}
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1 .11-.79.42-1.32.76-1.62-2.67-.31-5.48-1.34-5.48-5.96 0-1.32.47-2.39 1.24-3.23-.13-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.69.25 2.94.12 3.25.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.64-5.49 5.95.44.38.83 1.12.83 2.26v3.35c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
                  />
                </svg>
                <span><Tx>GitHub</Tx></span>
              </a>

              <a
                href="https://www.linkedin.com/in/john-slavinskas/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full h-full col-span-2 inline-flex items-center justify-center gap-2 px-3 sm:px-4 min-w-0 whitespace-normal break-words leading-snug text-[13px] sm:text-sm
                           rounded-full border border-white/15 hover:border-white/25 hover:shadow-md hover:bg-white/10 transition"
                aria-label={t("Open my LinkedIn profile in a new tab")}
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.62-1.85 3.33-1.85 3.56 0 4.22 2.34 4.22 5.39v6.35ZM5.34 7.44A2.06 2.06 0 1 1 5.33 3.3a2.06 2.06 0 0 1 .01 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"
                  />
                </svg>
                <span><Tx>LinkedIn</Tx></span>
              </a>
            </div>
          </div>

          {/* Right: Skills at a glance */}
          <div className="min-w-0 md:col-span-5">
            <div className="card card-gradient overflow-hidden">
              <SkillsCard />
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <Section
        id="about"
        title={t("About")}
        subtitle={t("Materials, data, and a big soft spot for useful tools.")}
      >
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="card">
            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p>
                <Tx>
                  Endurance sports are a big part of my life. I train year round and finished an Ironman. Long swims, windy bike rides, and quiet miles teach patience and grit. The plan matters, but so do the small choices inside the plan. Fuel on time. Keep the cadence. Fix little problems early.
                </Tx>
              </p>
              <p>
                <Tx>
                  I came to Europe to study in Munich and work with teams building real materials, not just slides. Germany gave me new labs, bilingual meetings, and a useful kind of humility. Learn fast. Ask clear questions. Write things down so the next person does not have to guess.
                </Tx>
              </p>
              <p>
                <Tx>
                  That mindset shows up in my work. I break big goals into blocks I can finish this week. I keep clean notebooks and short scripts that anyone can run. I like small tools that make decisions easier for the whole team. If a teammate can pick up my work without me in the room, that is success.
                </Tx>
              </p>
              <p>
                <Tx>
                  Day to day I move between lignin and other biobased materials, Python and ML pipelines, and little interactive apps. Give me a fuzzy problem, a pile of notes, and a deadline and I am happy.
                </Tx>
              </p>

              <div className="pt-4 border-t border-gray-200/50 dark:border-gray-800/60 text-center">
                <h3 className="font-semibold text-base uppercase tracking-wide"><Tx>Interests</Tx></h3>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
                  {interests.map(({ label, emoji }) => (
                    <span
                      key={label}
                      className="w-full h-[3.25rem] inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 text-[13px] sm:text-sm font-medium text-center whitespace-normal break-words leading-snug"
                    >
                      <span aria-hidden className="shrink-0">{emoji}</span>
                      <span className="block">{t(label)}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: photo mosaic */}
          <ParallaxGroup>
            <div
              className="
                grid gap-4
                grid-cols-2 auto-rows-[180px]
                sm:grid-cols-4 sm:auto-rows-[220px]
                md:auto-rows-[260px]
                lg:auto-rows-[300px]
              "
            >
              <PhotoTile
                src={`${base}/downloads/1683206302513.jfif`}
                alt="Resume picture — headshot"
                label="Resume picture"
                parallax="0.12"
                className="col-span-2 row-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
              />

              <PhotoTile
                src={`${base}/downloads/Christmas_Market_Munich.jpg`}
                alt="Christmas Market with friends in Munich"
                label="Christmas Market — Munich"
                parallax="0.08"
                className="col-span-2 row-span-1 rounded-2xl overflow-hidden ring-1 ring-white/10"
                sizes="(max-width: 640px) 100vw, 50vw"
              />

              <PhotoTile
                src={`${base}/downloads/Caving_Syracuse.jpg`}
                alt="Caving in Syracuse"
                label="Caving — Syracuse"
                parallax="0.06"
                className="col-span-1 row-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10"
                sizes="(max-width: 640px) 50vw, 25vw"
                objectPosition="50% 45%"
              />

              <PhotoTile
                src={`${base}/downloads/Salzburg.jpg`}
                alt="Salzburg, Austria"
                label="Salzburg, Austria"
                parallax="0.10"
                className="col-span-1 row-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          </ParallaxGroup>
        </div>
      </Section>

      {/* PROJECTS — Featured */}
      <Section id="projects" title={t("Featured projects")} subtitle={t("Hands-on tools and experiments.")}>
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
      <Section title={t("Experience")}>
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <Timeline items={exp} />
          </div>
          <aside className="md:col-span-5">
            <div className="sticky top-24">
              <ProgrammingShowcase />
            </div>
          </aside>
        </div>
      </Section>

      {/* EDUCATION & RESEARCH */}
      <Section title={t("Education & Research")}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold"><Tx>Education</Tx></h3>
            <ul className="mt-3 space-y-4 text-sm">
              <li>
                <div className="font-medium flex items-center gap-2">
                  <span className="text-xl">📈</span> <Tx>MS Financial Engineering</Tx>
                </div>
                <div className="text-gray-500"><Tx>WorldQuant University · Jan 2024 – Dec 2025 (DEAC)</Tx></div>
                <div className="mt-1 text-gray-400">
                  <span className="font-medium text-gray-300"><Tx>Capstone:</Tx></span>{" "}
                  <Tx>Sustainability (TBD).</Tx>
                </div>
              </li>
              <li>
                <div className="font-medium flex items-center gap-2">
                  <span className="text-xl">🧻</span> <Tx>MEng Paper Technology</Tx>
                </div>
                <div className="text-gray-500"><Tx>Hochschule München (HM) · Oct 2023 – Jul 2025 (ZEvA)</Tx></div>
                <div className="mt-1 text-gray-400">
                  <span className="font-medium text-gray-300"><Tx>Thesis:</Tx></span>{" "}
                  <em><Tx>Solubility Evaluation of Technical Lignins in Organic Solvents for the Development of a Lignin-Based Extract</Tx></em>
                </div>
              </li>
              <li>
                <div className="font-medium flex items-center gap-2">
                  <span className="text-xl">💻</span> <Tx>BS Computer Science</Tx>
                </div>
                <div className="text-gray-500"><Tx>University of the People · Jun 2023 – Jun 2025 (WASC)</Tx></div>
                <div className="mt-1 text-gray-400">
                  <span className="font-medium text-gray-300"><Tx>Concentrations:</Tx></span>{" "}
                  <Tx>Data Science, Network & Application Security</Tx>
                </div>
              </li>
              <li>
                <div className="font-medium flex items-center gap-2">
                  <span className="text-xl">📄</span> <Tx>BS Paper Engineering</Tx>
                </div>
                <div className="text-gray-500"><Tx>SUNY ESF · Aug 2020 – Aug 2023 (ABET)</Tx></div>
                <div className="mt-1 text-gray-400">
                  <span className="font-medium text-gray-300"><Tx>Minors:</Tx></span>{" "}
                  <Tx>Management, Physics</Tx>
                </div>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold"><Tx>Research & Publications</Tx></h3>
            <Publications />
          </div>
        </div>
      </Section>
    </>
  );
}
