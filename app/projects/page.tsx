"use client";
import Section from "@/components/Section";
import { useI18n } from "@/components/i18n/I18nProvider";

export const metadata = { title: "Projects — John Slavinskas" };

function Tag({ children }: { children: string }){
  const name = children;
  const color = {
    "Materials": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    "Process": "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300",
    "ML/Data": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    "Quant": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    "Tool": "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300",
  }[name] || "bg-gray-100 text-gray-800 dark:bg-gray-800/40 dark:text-gray-300";
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>{name}</span>;
}

export default function ProjectsPage(){
  const { t } = useI18n();
  return (
    <Section title={t('sections.projects')}>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="card p-6">
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-lime-300" />
          <h3 className="mt-3 text-lg font-semibold">Lignin Solvent Explorer (Hansen-based)</h3>
          <div className="mt-2 flex gap-2 flex-wrap">
            <Tag>Materials</Tag><Tag>Process</Tag><Tag>Tool</Tag>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Estimator and visual helper to shortlist solvents and conditions for dissolving technical lignins; includes temperature/ratio knobs and notes.</p>
        </article>

        <article className="card p-6">
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-300" />
          <h3 className="mt-3 text-lg font-semibold">Efficient Frontier (CSV upload)</h3>
          <div className="mt-2 flex gap-2 flex-wrap">
            <Tag>ML/Data</Tag><Tag>Quant</Tag><Tag>Tool</Tag>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Portfolio optimizer and visualizer for uploaded return series; computes weights and plots frontier with basic constraints.</p>
        </article>

        <article className="card p-6">
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" />
          <h3 className="mt-3 text-lg font-semibold">Option Pricer Mini (Black–Scholes)</h3>
          <div className="mt-2 flex gap-2 flex-wrap">
            <Tag>Quant</Tag><Tag>Tool</Tag>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Interactive price & Greeks calculator with small sparkline; designed as a lightweight demo widget.</p>
        </article>

        <article className="card p-6">
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" />
          <h3 className="mt-3 text-lg font-semibold">VOC Analysis Notebook</h3>
          <div className="mt-2 flex gap-2 flex-wrap">
            <Tag>Materials</Tag><Tag>ML/Data</Tag>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Data processing & visualization toolkit for VOC emission testing of various lignins; assists in odor source identification.</p>
        </article>
      </div>
    </Section>
  )
}
