"use client";
import Link from "next/link";
import Section from "@/components/Section";
import KPIs from "@/components/KPIs";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function Page() {
  const { t } = useI18n();
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const kpis = [
    { label: "Publications", value: 6 },
    { label: "Pilot / Lab Projects", value: 12 },
    { label: "ML / Data Projects", value: 8, spark: [1, 2, 3, 2, 4, 5, 7, 6, 8] },
    { label: "Quant Demos", value: 3, spark: [10, 9, 11, 12, 10, 13, 12, 14] },
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
              My current work spans lignin chemistry & biopolymers, Python/TF pipelines, and small interactive quant apps.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/resume" className="btn">
                {t("hero.viewResume")}
              </Link>

              {/* Force file download (GitHub Pages-safe via base path) */}
              <a
                href={`${base}/downloads/Resume%20P.pdf`}
                download="John_Slavinskas_Resume_1p.pdf"
                className="btn-outline"
              >
                {t("hero.download1p")}
              </a>
              <a
                href={`${base}/downloads/CV-P.pdf`}
                download="John_Slavinskas_CV.pdf"
                className="btn-outline"
              >
                {t("hero.downloadCV")}
              </a>
            </div>
          </div>
        </div>
        {/* blueprint micro-grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      </section>

      {/* KPIs */}
      <Section title={t("sections.at_a_glance")}>
        <KPIs items={kpis} />
      </Section>

      {/* About */}
      <Section id="about" title={t("sections.about")}>
        <div className="prose prose-emerald dark:prose-invert">
          <p>
            I’m John Slavinskas, a researcher and engineer focused on <strong>lignin &amp; biobased materials</strong> with a parallel track in
            <strong> software/ML</strong> and <strong>quant finance</strong>. I enjoy building practical tools—from solvent-selection helpers
            for lignin chemistry to small option-pricing and portfolio demos.
          </p>
          <ul>
            <li><strong>Paper &amp; Materials:</strong> solubility, process optimization, pilot scale, VOC analysis.</li>
            <li><strong>Software:</strong> Python, TensorFlow/Keras, SQL, Java, JS/TS; light Kotlin/Swift.</li>
            <li><strong>Quant:</strong> option pricing, efficient frontier, factor backtests.</li>
          </ul>
        </div>
      </Section>

      {/* Experience highlights */}
      <Section title={t("sections.recent_experience")}>
        <div className="grid gap-6">
          <article className="card p-6">
            <h3 className="font-semibold">Lignopure — Technology Development (Working Student)</h3>
            <p className="mt-1 text-sm text-gray-500">Dec 2024 – Jun 2025 · Hamburg</p>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
              <li>Developed lignin-based leather (up to 70% lignin) via extrusion; optimized strength.</li>
              <li>Experimented with new lignin formulations to improve compatibility and properties.</li>
            </ul>
          </article>
          <article className="card p-6">
            <h3 className="font-semibold">Master Thesis — Lignin Solubility for Cosmetics</h3>
            <p className="mt-1 text-sm text-gray-500">Nov 2024 – Jun 2025 · HM Munich</p>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
              <li>Solvent selection &amp; optimization (temperature, ratios, surfactants).</li>
              <li>Estimated Hansen Solubility Parameters; evaluated functional changes post-dissolution.</li>
            </ul>
          </article>
          <article className="card p-6">
            <h3 className="font-semibold">Sonoco — Emerging Leader</h3>
            <p className="mt-1 text-sm text-gray-500">May 2023 – Aug 2023</p>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
              <li>Analyzed effluent treatment; implemented cost-effective process improvements.</li>
              <li>Deployed sensors (Parcview/Everactive) for real-time visualization &amp; quality control.</li>
            </ul>
          </article>
        </div>
        <div className="mt-6">
          <Link className="fancy-underline" href="/projects">See projects →</Link>
        </div>
      </Section>

      {/* Publications (short) */}
      <Section title={t("sections.selected_publications")}>
        <ul className="space-y-2 text-sm">
          <li><strong>Lignin-Derived Carbon Fibres: Opportunities and Challenges</strong>, Journal of Materials Science Research and Reviews, 2025.</li>
          <li><strong>Lignin Derived Chemicals and Aromatics: A Review</strong>, ChemRxiv, Apr 24, 2025.</li>
          <li><strong>Sustainable Greeting Card – Paper Products Produced on a Laboratory Paper Machine</strong>, J. Engineering Research and Reports, 2024.</li>
          <li><strong>Characterization of Recycled Fiber Material...</strong>, JMSRR, 2023.</li>
        </ul>
      </Section>
    </>
  );
}
