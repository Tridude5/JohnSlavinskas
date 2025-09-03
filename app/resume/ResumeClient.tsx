"use client";

import React from "react";
import EmailLink from "@/components/EmailLink";
import Tx from "@/components/i18n/Tx";

export default function ResumeClient() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="container py-12 print:py-0">
      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm print:shadow-none">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">John Slavinskas</h1>
            <div className="flex gap-2 print:hidden">
              <a
                href={`${base}/downloads/Resume%20P.pdf`}
                download="John_Slavinskas_Resume_1p.pdf"
                className="btn-outline"
              >
                <Tx>Download 1-page (PDF)</Tx>
              </a>
              <a
                href={`${base}/downloads/CV-P.pdf`}
                download="John_Slavinskas_CV.pdf"
                className="btn"
              >
                <Tx>Download CV (PDF)</Tx>
              </a>
            </div>
          </div>

          {/* Personal details */}
          <section className="mt-8">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                <Tx>Personal Details</Tx>
              </h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <dl className="mt-4 space-y-3">
              <div className="grid grid-cols-[140px,1fr] gap-x-4">
                <dt className="text-gray-500 dark:text-gray-400 text-sm"><Tx>Name</Tx></dt>
                <dd className="text-gray-900 dark:text-gray-100 text-sm">John Slavinskas</dd>
              </div>
              <div className="grid grid-cols-[140px,1fr] gap-x-4">
                <dt className="text-gray-500 dark:text-gray-400 text-sm"><Tx>Phone</Tx></dt>
                <dd className="text-gray-900 dark:text-gray-100 text-sm">+49 1575 4805360</dd>
              </div>
              <div className="grid grid-cols-[140px,1fr] gap-x-4">
                <dt className="text-gray-500 dark:text-gray-400 text-sm"><Tx>Email</Tx></dt>
                <dd className="text-gray-900 dark:text-gray-100 text-sm"><EmailLink /></dd>
              </div>
              <div className="grid grid-cols-[140px,1fr] gap-x-4">
                <dt className="text-gray-500 dark:text-gray-400 text-sm"><Tx>Location</Tx></dt>
                <dd className="text-gray-900 dark:text-gray-100 text-sm">
                  <Tx>Munich, Germany (EU work-authorized)</Tx>
                </dd>
              </div>
            </dl>
          </section>

          {/* Qualifications */}
          <section className="mt-12">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                <Tx>Qualifications Summary</Tx>
              </h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm list-disc pl-5">
              <li><Tx>Research in lignin chemistry, biopolymers & sustainable materials</Tx></li>
              <li><Tx>Python, TensorFlow/Keras, SQL, Java, HTML/CSS/JS, PHP, Kotlin, Swift</Tx></li>
              <li><Tx>Lab & pilot-scale experience: GC, VOC analysis, optimization</Tx></li>
              <li><Tx>Co-author on peer-reviewed publications in fiber recycling & packaging</Tx></li>
            </ul>
          </section>

          {/* Education */}
          <section className="mt-10">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                <Tx>Education</Tx>
              </h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <strong>WorldQuant University</strong> — <Tx>M.S. Financial Engineering (Jan 2024 – Nov 2025)</Tx>
              </li>
              <li>
                <strong>HM Hochschule München</strong> — <Tx>M.Eng. Paper Technology (Oct 2023 – Jul 2025)</Tx>
              </li>
              <li>
                <strong>University of the People</strong> — <Tx>B.S. Computer Science, Data Science (Jun 2023 – Jun 2025)</Tx>
              </li>
              <li>
                <strong>SUNY-ESF</strong> — <Tx>B.S. Paper Engineering; minors in Management & Physics (Aug 2020 – Aug 2023)</Tx>
              </li>
            </ul>
          </section>

          {/* Experience */}
          <section className="mt-10">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                <Tx>Experience (selected)</Tx>
              </h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="mt-4 space-y-6 text-sm">
              <div>
                <div className="font-medium"><Tx>Lignopure — Technology Development (Working Student)</Tx></div>
                <div className="text-gray-500 dark:text-gray-400"><Tx>Dec 2024 – Jun 2025</Tx></div>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><Tx>Developed lignin-based leather (extrusion, up to 70% lignin); optimized mechanical properties.</Tx></li>
                  <li><Tx>Explored formulations to improve compatibility and strength.</Tx></li>
                </ul>
              </div>
              <div>
                <div className="font-medium"><Tx>Master Thesis — Lignin Solubility for Cosmetics</Tx></div>
                <div className="text-gray-500 dark:text-gray-400"><Tx>Nov 2024 – Jun 2025</Tx></div>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><Tx>Solvent selection & optimization (temperature, ratios, surfactants); HSP estimation.</Tx></li>
                  <li><Tx>Evaluated functional changes of lignin during dissolution.</Tx></li>
                </ul>
              </div>
              <div>
                <div className="font-medium"><Tx>Sonoco — Emerging Leader</Tx></div>
                <div className="text-gray-500 dark:text-gray-400"><Tx>May 2023 – Aug 2023</Tx></div>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><Tx>Improved effluent treatment with cost-effective solutions; enhanced compliance.</Tx></li>
                  <li><Tx>Used sensors for real-time visibility, improving quality control and uptime.</Tx></li>
                </ul>
              </div>
              <div>
                <div className="font-medium"><Tx>Safar Partners — Intern</Tx></div>
                <div className="text-gray-500 dark:text-gray-400"><Tx>Feb 2023 – Apr 2023</Tx></div>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><Tx>Competitive analysis of biodegradable plastics; recommended investment in Radical Plastics.</Tx></li>
                  <li><Tx>Evaluated polymerization processes vs competitors; prepared investor materials.</Tx></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Publications */}
          <section className="mt-10">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                <Tx>Publications</Tx>
              </h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-6">
              <li>Slavinskas, John, and Donald M Andrew. 2025. “Lignin-Derived Carbon Fibres: Opportunities and Challenges”. <em>Journal of Materials Science Research and Reviews</em> 8 (3):571–80.</li>
              <li>Slavinskas, John. 2025. “Lignin Derived Chemicals and Aromatics: A Review.” <em>ChemRxiv</em>. April 24, 2025. doi:10.26434/chemrxiv-2025-cprrn</li>
              <li>Dölle, Klaus, <em>et al.</em> 2024. “Sustainable Greeting Card – Paper Products Produced on a Laboratory Paper Machine”. <em>Journal of Engineering Research and Reports</em> 26 (6):198–211.</li>
              <li>Dölle, K., <em>et al.</em> (2023). Characterization of Recycled Fiber Material Made from Liquid Containerboard (LCB) and/or Old Corrugated Containers (OCC) – Evaluation of its Use by a Handsheet Study. <em>Journal of Materials Science Research and Reviews</em>, 6(3), 341–353.</li>
              <li>Dölle, K., <em>et al.</em> (2022). Upgrading of Old Corrugated Container Board with Aseptic Packaging Container for Paper Board Applications – A Laboratory Handsheet Study. <em>Journal of Materials Science Research and Reviews</em>, 5(4), 42–.</li>
              <li>Dölle, K., <em>et al.</em> (2022). A Global Look at the Market Potential of Liquid Container Board and Its Ability to Reduce Plastic Waste – A Brief Review. <em>Journal of Engineering Research and Reports</em>, 23(12), 223–235.</li>
            </ul>
          </section>

          {/* Certifications */}
          <section className="mt-10">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                <Tx>Certifications</Tx>
              </h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm list-disc pl-5">
              <li><Tx>SCE Incubator — Founding Your Own Startup (2024–2025)</Tx></li>
              <li><Tx>DeepLearning.AI — TensorFlow Developer (2023)</Tx></li>
              <li><Tx>IBM — AI Engineering (2023)</Tx></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
