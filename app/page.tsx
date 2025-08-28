"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import Section from "@/components/Section";
import KPIs from "@/components/KPIs";
import { useI18n } from "@/components/i18n/I18nProvider";

// Optional: existing components used in dev-only checks (keep if you like)
import ProjectCard from "@/components/ProjectCard";
import EmailLink from "@/components/EmailLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Client-only components
const MagneticButton = dynamic(() => import("@/components/MagneticButton"), { ssr: false });
// (Dev gallery bits, keep if helpful)
const ParallaxGroup = dynamic(() => import("@/components/ParallaxGroup"), { ssr: false });
const BlueprintFX = dynamic(() => import("@/components/BlueprintFX"), { ssr: false });
const AppEffects = dynamic(() => import("@/components/AppEffects"), { ssr: false });
const AutomationShowcase = dynamic(() => import("@/components/AutomationShowcase"), { ssr: false });
const LanguageToggle = dynamic(() => import("@/components/LanguageToggle"), { ssr: false });

/* ---------- tiny error boundary for the dev-only gallery ---------- */
class ErrorBoundary extends React.Component<{ name: string; children: React.ReactNode }, { error?: Error }> {
  state = { error: undefined as Error | undefined };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch() {}
  render() {
    if (this.state.error) {
      return (
        <div className="border rounded-lg p-3 bg-red-50 dark:bg-red-950">
          <div className="font-semibold">🔴 {this.props.name} failed to render</div>
          <pre className="mt-2 text-xs whitespace-pre-wrap">
            {String(this.state.error?.stack || this.state.error?.message)}
          </pre>
        </div>
      );
    }
    return this.props.children as any;
  }
}

/* ---------- small local UI helpers (chips & timeline) ---------- */
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
          {/* dot */}
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

/* ============================== PAGE ============================== */
export default function Page() {
  const { t } = useI18n();
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const isDev = process.env.NODE_ENV !== "production";

  const kpis = [
    { label: "Publications", value: 6 },
    { label: "Pilot / Lab Projects", value: 12 },
    { label: "ML / Data Projects", value: 8, spark: [1, 2, 3, 2, 4, 5, 7, 6, 8] },
    { label: "Quant Demos", value: 3, spark: [10, 9, 11, 12, 10, 13, 12, 14] },
  ];

  // Interests: edit freely (these render as “pills”)
  const interests = ["🏃 Running", "🧗 Bouldering", "🎾 Padel", "🏊 Swimming", "🏋️ Strength Training", "✈️ Travel", "📷 Photography", "🎬 Video Editing"];

  // Experience items for the green timeline
  const exp: TLItem[] = [
    {
      role: "Technology Development (Working Student)",
      org: "Lignopure",
      period: "Dec 2024 – Jun 2025",
      loc: "Hamburg",
      bullets: [
        "Developed lignin-based leather (up to 70% lignin) via extrusion; optimized strength.",
        "Experimented with new lignin formulations to improve compatibility and properties.",
      ],
    },
    {
      role: "Master Thesis — Lignin Solubility for Cosmetics",
      org: "HM Munich",
      period: "Nov 2024 – Jun 2025",
      bullets: [
        "Solvent selection & optimization (temperature, ratios, surfactants).",
        "Estimated Hansen Solubility Parameters; evaluated functional changes post-dissolution.",
      ],
    },
    {
      role: "Emerging Leader (Intern)",
      org: "Sonoco",
      period: "May 2023 – Aug 2023",
      bullets: [
        "Analyzed effluent treatment; implemented cost-effective process improvements.",
        "Deployed sensors (Parcview/Everactive) for real-time visualization & quality control.",
      ],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              {t("hero.tagline")}{" "}
              I work at the intersection of lignin chemistry &amp; biopolymers, pragmatic software/ML, and finance/analytics.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {/* Magnetic hero buttons */}
              <MagneticButton href="/resume" className="btn inline-block" aria-label="View resume">
                {t("hero.viewResume")}
              </MagneticButton>
              <MagneticButton
                href={`${base}/downloads/Resume%20P.pdf`}
                download="John_Slavinskas_Resume_1p.pdf"
                className="btn-outline inline-block"
                aria-label="Download 1-page resume PDF"
              >
                {t("hero.download1p")}
              </MagneticButton>
              <MagneticButton
                href={`${base}/downloads/CV-P.pdf`}
                download="John_Slavinskas_CV.pdf"
                className="btn-outline inline-block"
                aria-label="Download full CV PDF"
              >
                {t("hero.downloadCV")}
              </MagneticButton>
            </div>
          </div>
        </div>
        {/* blueprint micro-grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      </section>

      {/* Skills at a Glance */}
      <Section title="Skills at a Glance">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="mb-2 font-semibold">Paper &amp; Materials</div>
            <div className="flex flex-wrap gap-2">
              <Chip>Lignin</Chip><Chip>Biopolymers</Chip><Chip>Pulp &amp; Paper</Chip>
              <Chip>DOE/SPC</Chip><Chip>FTIR</Chip><Chip>NMR</Chip><Chip>Rheology</Chip>
            </div>
          </div>
          <div className="card p-4">
            <div className="mb-2 font-semibold">Software &amp; Data</div>
            <div className="flex flex-wrap gap-2">
              <Chip>TypeScript</Chip><Chip>React/Next.js</Chip><Chip>Flutter/Dart</Chip>
              <Chip>Firebase (Auth/Firestore)</Chip><Chip>Python (pandas)</Chip><Chip>SQL</Chip>
            </div>
          </div>
          <div className="card p-4">
            <div className="mb-2 font-semibold">Finance &amp; Analytics</div>
            <div className="flex flex-wrap gap-2">
              <Chip>DCF</Chip><Chip>NPV/IRR</Chip><Chip>WACC</Chip>
              <Chip ghost>Sensitivity</Chip><Chip ghost>Monte Carlo</Chip><Chip ghost>Unit Economics</Chip>
            </div>
          </div>
        </div>
      </Section>

      {/* KPIs (keep your numbers) */}
      <Section title={t("sections.at_a_glance")}>
        <KPIs items={kpis} />
      </Section>

      {/* About (with Interests pills) */}
      <Section id="about" title={t("sections.about")}>
        <div className="prose prose-emerald dark:prose-invert">
          <p>
            I’m John Slavinskas — materials researcher with a strong software/analytics toolkit and finance fluency.
            I turn lab results and app telemetry into decisions that improve performance, throughput, and ROI.
          </p>
          <p>
            Recent work spans lignin fractionation/derivatization, solubility for cosmetics, and role-aware apps
            (Flutter + Firebase) that capture data and surface insights.
          </p>
        </div>
        <div className="mt-4">
          <div className="text-sm font-semibold tracking-wide text-gray-500">Interests</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {interests.map((it) => <Chip key={it} ghost>{it}</Chip>)}
          </div>
        </div>
      </Section>

      {/* Experience — emerald (green) timeline */}
      <Section title={t("sections.recent_experience")}>
        <GreenTimeline items={exp} />
        <div className="mt-6">
          <Link className="fancy-underline" href="/projects">See projects →</Link>
        </div>
      </Section>

      {/* Education & Research (two-up cards) */}
      <Section title="Education & Research">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-semibold">Education</h3>
            <ul className="mt-2 text-sm space-y-1.5">
              <li><strong>HM Munich</strong> — Master Thesis (Lignin Solubility for Cosmetics), 2024–2025.</li>
              <li><em>[Add degree/institution here]</em> — e.g., B.S. Chemistry / Materials — <span className="text-gray-500">Institution, Year</span></li>
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold">Research & Publications</h3>
            <ul className="mt-2 text-sm space-y-1.5">
              <li><strong>Lignin-Derived Carbon Fibres: Opportunities and Challenges</strong>, JMSRR, 2025.</li>
              <li><strong>Lignin Derived Chemicals and Aromatics: A Review</strong>, ChemRxiv, Apr 24, 2025.</li>
              <li><strong>Sustainable Greeting Card – Paper Products Produced on a Laboratory Paper Machine</strong>, JERR, 2024.</li>
              <li><strong>Characterization of Recycled Fiber Material...</strong>, JMSRR, 2023.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ============ DEV/QUERY-GATED: small components check (optional) ============ */}
      <Suspense fallback={null}>
        <ComponentsCheckGate isDev={isDev} />
      </Suspense>
    </>
  );
}

/* ---------- Dev-only gallery to make sure components render ---------- */
function ComponentsCheckGate({ isDev }: { isDev: boolean }) {
  const searchParams = useSearchParams();
  const showChecks = isDev || searchParams.get("check") === "1";
  if (!showChecks) return null;

  return (
    <Section title="Components Check (dev only)">
      <p className="text-sm text-gray-500 mb-3">
        Visible in development or with <code>?check=1</code>. Each card is an isolated render with an error boundary.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Smoke name="Header"><Header /></Smoke>
        <Smoke name="Footer"><Footer /></Smoke>
        <Smoke name="EmailLink"><EmailLink /></Smoke>
        <Smoke name="LanguageToggle"><LanguageToggle /></Smoke>
        <Smoke name="MagneticButton"><MagneticButton className="btn inline-block">Hover me</MagneticButton></Smoke>

        <Smoke name="ProjectCard">
          <div className="max-w-sm">
            <ProjectCard title="Example Project" subtitle="Short blurb" href="#" cta="Open" tags={["demo"]} />
          </div>
        </Smoke>

        <Smoke name="ParallaxGroup (client)">
          <ParallaxGroup>
            <div className="h-24 w-full flex items-center justify-center border rounded-lg">Parallax content</div>
          </ParallaxGroup>
        </Smoke>

        <Smoke name="BlueprintFX (client)">
          <div className="relative h-40 overflow-hidden rounded-lg"><BlueprintFX /></div>
        </Smoke>

        <Smoke name="AppEffects (client)">
          <div className="relative h-24 overflow-hidden rounded-lg"><AppEffects /></div>
        </Smoke>

        <Smoke name="AutomationShowcase (client)"><AutomationShowcase /></Smoke>
      </div>
    </Section>
  );
}

function Smoke({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">{name}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full border">smoke test</span>
      </div>
      <ErrorBoundary name={name}>
        <div className="p-4 border rounded-lg min-h-[80px] flex items-center justify-center">
          {children}
        </div>
      </ErrorBoundary>
    </div>
  );
}
