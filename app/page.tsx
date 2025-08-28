"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Section from "@/components/Section";
import KPIs from "@/components/KPIs";
import { useI18n } from "@/components/i18n/I18nProvider";

/* Magnetic hero buttons (already in your /components folder) */
const MagneticButton = dynamic(() => import("@/components/MagneticButton"), { ssr: false });

/* ---------- small UI helpers ---------- */
function Chip({ children, ghost = false }: { children: React.ReactNode; ghost?: boolean }) {
  return (
    <span
      className={
        ghost
          ? "inline-flex items-center rounded-full border px-3 py-1 text-sm text-gray-300 border-white/15 bg-white/[0.04]"
          : "inline-flex items-center rounded-full border px-3 py-1 text-sm border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      }
    >
      {children}
    </span>
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

function SkillsCard() {
  return (
    <aside className="rounded-2xl border bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30 p-5 shadow-xl">
      <h3 className="text-lg font-semibold mb-3">Skills at a glance</h3>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
        <div>
          <div className="text-gray-400 font-medium">Finance</div>
          <div className="mt-1 space-y-1">
            <div>Financial Econometrics</div>
            <div>Derivative Pricing</div>
            <div>Stochastic Modeling</div>
            <div>Portfolio & Risk</div>
          </div>
        </div>
        <div>
          <div className="text-gray-400 font-medium">Programming</div>
          <div className="mt-1 space-y-1">
            <div>Python · R · SQL</div>
            <div>TensorFlow · Keras</div>
            <div>Java · JS/TS</div>
          </div>
        </div>
        <div>
          <div className="text-gray-400 font-medium">Materials</div>
          <div className="mt-1 space-y-1">
            <div>Lignin · Biopolymers</div>
            <div>Pulp & Paper</div>
            <div>DOE/SPC · Rheology</div>
          </div>
        </div>
        <div>
          <div className="text-gray-400 font-medium">Tools</div>
          <div className="mt-1 space-y-1">
            <div>FTIR · NMR · GC/VOC</div>
            <div>Firebase · SQL/NoSQL</div>
            <div>MATLAB · VBA</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ============================== PAGE ============================== */
export default function Page() {
  const { t } = useI18n();
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const kpis = [
    { label: "Publications", value: 6 },
    { label: "Pilot / Lab Projects", value: 12 },
    { label: "ML / Data Projects", value: 8, spark: [1, 2, 3, 2, 4, 5, 7, 6, 8] },
    { label: "Quant Demos", value: 3, spark: [10, 9, 11, 12, 10, 13, 12, 14] },
  ];

  const interests = [
    "🏃 Running", "🧗 Bouldering", "🎾 Padel", "🏊 Swimming",
    "🏋️ Strength Training", "✈️ Travel", "📷 Photography", "🎬 Video Editing",
  ];

  const exp: TLItem[] = [
    {
      role: "Technology Development — Working Student",
      org: "Lignopure",
      period: "Dec 2024 – Jun 2025",
      loc: "Hamburg",
      bullets: [
        "Developed lignin-based leather via extrusion with up to 70% lignin.",
        "Optimized material properties; achieved industry-leading strength.",
        "Experimented with new lignin formulations to improve compatibility.",
      ],
    },
    {
      role: "Master Thesis Researcher",
      org: "HM Munich (with Lignopure)",
      period: "Nov 2024 – Jun 2025",
      bullets: [
        "Solvent selection & optimization (temperature, ratios, surfactants).",
        "Estimated Hansen Solubility Parameters for lignin solvent selection.",
        "Evaluated changes in functional properties during dissolution.",
      ],
    },
    {
      role: "Technology Development Intern",
      org: "Lignopure",
      period: "Aug 2024 – Nov 2024",
      bullets: [
        "Lab research on lignin processing and drying methods.",
        "Contributed to “ForFun” functional materials project.",
        "Partnered with University of Helsinki for VOC emission testing; identified odor sources and neutralization strategies.",
      ],
    },
    {
      role: "Emerging Leader (Intern)",
      org: "Sonoco Product Co.",
      period: "May 2023 – Aug 2023",
      bullets: [
        "Analyzed effluent treatment; implemented cost-effective improvements.",
        "Used Parcview/Everactive sensors for real-time visualization and quality control.",
      ],
    },
    {
      role: "Intern",
      org: "Safar Partners",
      period: "Feb 2023 – Apr 2023",
      bullets: [
        "Competitive analysis of biodegradable plastics; recommended Radical Plastics to PE investors.",
        "Built market + polymer process comparison presentation for investment evaluation.",
      ],
    },
    {
      role: "Undergraduate Student Researcher",
      org: "Dept. of Chemistry (ESF)",
      period: "Feb 2022 – Feb 2023",
      bullets: [
        "Synthesized biodegradable bioplastics from genetically modified E. coli.",
        "Hands-on GC, NMR, electroporation, lyophilization, and plastics testing.",
        "Collaborated with Envision Biopolymers to scale promising polymer.",
      ],
    },
    {
      role: "Paper Making Processes — Student Participant",
      org: "ESF",
      period: "Jan 2023 – May 2023",
      bullets: [
        "Selected raw materials and scaled paper grades; managed work plan and reports.",
      ],
    },
    {
      role: "Engineering Design — Student Participant",
      org: "ESF / WestRock",
      period: "Sep 2022 – Dec 2022",
      bullets: [
        "Vendor outreach and mill measurements for pocket conveyor CAPEX study.",
        "Delivered cost analysis to corporate managers.",
      ],
    },
  ];

  return (
    <>
      {/* Hero with right-side skills card */}
      <section className="relative overflow-hidden">
        <div className="container relative py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              {t("hero.tagline")}{" "}
              I work at the intersection of lignin &amp; biobased materials, pragmatic software/ML, and finance/analytics.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton href="/resume" className="btn inline-block">
                {t("hero.viewResume")}
              </MagneticButton>
              <MagneticButton
                href={`${base}/downloads/Resume%20P.pdf`}
                download="John_Slavinskas_Resume_1p.pdf"
                className="btn-outline inline-block"
              >
                {t("hero.download1p")}
              </MagneticButton>
              <MagneticButton
                href={`${base}/downloads/CV-P.pdf`}
                download="John_Slavinskas_CV.pdf"
                className="btn-outline inline-block"
              >
                {t("hero.downloadCV")}
              </MagneticButton>
            </div>
          </div>

          {/* Right-side skills card (desktop) */}
          <div className="hidden lg:block absolute right-0 top-6 w-[440px]">
            <SkillsCard />
          </div>

          {/* Stacked under hero (mobile) */}
          <div className="mt-8 lg:hidden">
            <SkillsCard />
          </div>
        </div>

        {/* blueprint micro-grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      </section>

      {/* Skills at a Glance (keep the full grid too if you like) */}
      <Section title="Skills at a Glance">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="mb-2 font-semibold">Paper &amp; Materials</div>
            <div className="flex flex-wrap gap-2">
              <Chip>Lignin</Chip><Chip>Biopolymers</Chip><Chip>Pulp &amp; Paper</Chip>
              <Chip>VOC &amp; GC</Chip><Chip>DOE/SPC</Chip><Chip>FTIR</Chip><Chip>NMR</Chip><Chip>Rheology</Chip>
            </div>
          </div>
          <div className="card p-4">
            <div className="mb-2 font-semibold">Software &amp; Data</div>
            <div className="flex flex-wrap gap-2">
              <Chip>Python</Chip><Chip>TensorFlow</Chip><Chip>Keras</Chip>
              <Chip>SQL/NoSQL</Chip><Chip>Java</Chip><Chip>JS/TS</Chip><Chip>HTML/CSS</Chip>
              <Chip ghost>PHP</Chip><Chip ghost>Kotlin</Chip><Chip ghost>Swift</Chip><Chip ghost>R</Chip>
            </div>
          </div>
          <div className="card p-4">
            <div className="mb-2 font-semibold">Finance &amp; Analytics</div>
            <div className="flex flex-wrap gap-2">
              <Chip>Financial Econometrics</Chip><Chip>Derivative Pricing</Chip><Chip>Stochastic Modeling</Chip>
              <Chip>Portfolio &amp; Risk</Chip><Chip ghost>ML/DL in Finance</Chip>
            </div>
          </div>
        </div>
      </Section>

      {/* KPIs */}
      <Section title={t("sections.at_a_glance")}>
        <KPIs items={kpis} />
      </Section>

      {/* About + Interests, with photo on the right from /downloads */}
      <Section id="about" title={t("sections.about")}>
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div>
            <div className="prose prose-emerald dark:prose-invert">
              <p>
                Strong research background in lignin chemistry, biopolymers, and sustainable materials.
                Operational Python/TensorFlow/Keras + SQL/Java/JS stack. Experienced from lab to pilot scale
                (GC/VOC analysis, optimization) with four peer-reviewed publications on fiber recycling and sustainable packaging.
                Native English; A2 German.
              </p>
            </div>
            <div className="mt-4">
              <div className="text-sm font-semibold tracking-wide text-gray-500">Interests</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {interests.map((it) => <Chip key={it} ghost>{it}</Chip>)}
              </div>
            </div>
          </div>

          {/* Photo on the right (from public/downloads/...) */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border">
            <Image
              src={`${base}/downloads/1683206302513.jfif`}
              alt="John Slavinskas"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </Section>

      {/* Experience — green timeline */}
      <Section title={t("sections.recent_experience")}>
        <GreenTimeline items={exp} />
      </Section>

      {/* Education & Research (two-up) */}
      <Section title="Education & Research">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-semibold">Education</h3>
            <ul className="mt-2 text-sm space-y-2">
              <li>
                <strong>WorldQuant University</strong> — MS Financial Engineering, <em>Jan 2024 – Dec 2025</em> (DEAC).<br />
                <span className="text-gray-500">Financial Markets · Financial Data · Econometrics · Derivative Pricing · Stochastic Modeling · ML/DL in Finance · Portfolio & Risk · Capstone</span>
              </li>
              <li>
                <strong>Hochschule München (HM)</strong> — MEng Paper Technology, <em>Oct 2023 – Jul 2025</em> (ZEvA).<br />
                Thesis: <em>Solubility Evaluation of Technical Lignins in Organic Solvents for the Development of a Lignin-Based Extract</em>.
              </li>
              <li>
                <strong>University of the People</strong> — BS Computer Science, <em>Jun 2023 – Jun 2025</em> (WASC).<br />
                Concentrations: Data Science; Network & Application Security.
              </li>
              <li>
                <strong>SUNY ESF</strong> — BS Paper Engineering, <em>Aug 2020 – Aug 2023</em> (ABET).<br />
                Minors: Management, Physics. Skills: MATLAB · VBA · Python · ChemCAD.
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium">Certifications</h4>
              <ul className="mt-1 text-sm space-y-1">
                <li>Strascheg Center for Entrepreneurship — Incubator: Founding Your Own Startup (<em>Feb 2024 – Feb 2025</em>).</li>
                <li>DeepLearning.AI — Professional Certificate in TensorFlow Development (<em>Nov 2023</em>).</li>
                <li>IBM — Professional Certificate in AI Engineering (<em>Sep 2023</em>).</li>
              </ul>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold">Research & Publications</h3>
            <ul className="mt-2 text-sm space-y-2">
              <li>
                Slavinskas, J.; Andrew, D. M. (2025). <em>Lignin-Derived Carbon Fibres: Opportunities and Challenges</em>. <strong>JMSRR</strong> 8(3):571–580.
              </li>
              <li>
                Slavinskas, J. (2025). <em>Lignin Derived Chemicals and Aromatics: A Review</em>. <strong>ChemRxiv</strong>, Apr 24, 2025. doi:10.26434/chemrxiv-2025-cprrn.
              </li>
              <li>
                Dölle, K. <em>et al.</em> incl. J. Slavinskas (2024). <em>Sustainable Greeting Card – Paper Products Produced on a Laboratory Paper Machine</em>. <strong>J. Eng. Research & Reports</strong>.
              </li>
              <li>
                Dölle, K. <em>et al.</em> incl. J. Slavinskas (2023). <em>Characterization of Recycled Fiber Material…</em> <strong>JMSRR</strong> 6(3):341–353.
              </li>
              <li>
                Dölle, K. <em>et al.</em> incl. J. Slavinskas (2022). <em>Upgrading of OCC with Aseptic Packaging…</em> <strong>JMSRR</strong> 5(4):42–[…].</li>
              <li>
                Dölle, K. <em>et al.</em> incl. J. Slavinskas (2022). <em>A Global Look at the Market Potential of Liquid Container Board…</em> <strong>J. Eng. Research & Reports</strong> 23(12):223–235.
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
