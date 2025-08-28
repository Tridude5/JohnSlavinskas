import EmailLink from "@/components/EmailLink";

export const metadata = { title: "Resume — John Slavinskas" };

export default function ResumePage(){
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <div className="container py-12 print:py-0">
      <div className="card max-w-4xl mx-auto">
        <header>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold tracking-tight">John Slavinskas</h1>
            <div className="flex gap-2">
              <a href={`${base}/downloads/John_Slavinskas_Resume_1p.pdf`} className="btn-outline">Download 1‑page (PDF)</a>
              <a href={`${base}/downloads/John_Slavinskas_CV.pdf`} className="btn">Download CV (PDF)</a>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Lissi Kaeser Straße 8 · 80797 München · +49 1575 4805360 · <EmailLink />
          </p>
        </header>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Qualifications Summary</h2>
          <ul className="mt-2 grid sm:grid-cols-2 gap-2 text-sm list-disc pl-5">
            <li>Research in lignin chemistry, biopolymers & sustainable materials</li>
            <li>Python, TensorFlow/Keras, SQL, Java, HTML/CSS/JS, PHP, Kotlin, Swift</li>
            <li>Lab & pilot‑scale experience: GC, VOC analysis, optimization</li>
            <li>Co‑author on peer‑reviewed publications in fiber recycling & packaging</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Education</h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li><strong>WorldQuant University</strong> — M.S. Financial Engineering (Jan 2024 – Nov 2025)</li>
            <li><strong>HM Hochschule München</strong> — M.Eng. Paper Technology (Oct 2023 – Jul 2025)</li>
            <li><strong>University of the People</strong> — B.S. Computer Science, Data Science (Jun 2023 – Jun 2025)</li>
            <li><strong>SUNY-ESF</strong> — B.S. Paper Engineering; minors in Management & Physics (Aug 2020 – Aug 2023)</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Experience (selected)</h2>
          <div className="mt-2 space-y-4 text-sm">
            <div>
              <div className="font-medium">Lignopure — Technology Development (Working Student)</div>
              <div className="text-gray-500">Dec 2024 – Jun 2025</div>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Developed lignin‑based leather (extrusion, up to 70% lignin); optimized mechanical properties.</li>
                <li>Explored formulations to improve compatibility and strength.</li>
              </ul>
            </div>
            <div>
              <div className="font-medium">Master Thesis — Lignin Solubility for Cosmetics</div>
              <div className="text-gray-500">Nov 2024 – Jun 2025</div>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Solvent selection & optimization (temperature, ratios, surfactants); HSP estimation.</li>
                <li>Evaluated functional changes of lignin during dissolution.</li>
              </ul>
            </div>
            <div>
              <div className="font-medium">Sonoco — Emerging Leader</div>
              <div className="text-gray-500">May 2023 – Aug 2023</div>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Improved effluent treatment with cost‑effective solutions; enhanced compliance.</li>
                <li>Used sensors for real‑time visibility, improving quality control and uptime.</li>
              </ul>
            </div>
            <div>
              <div className="font-medium">Safar Partners — Intern</div>
              <div className="text-gray-500">Feb 2023 – Apr 2023</div>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Competitive analysis of biodegradable plastics; recommended investment in Radical Plastics.</li>
                <li>Evaluated polymerization processes vs competitors; prepared investor materials.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Publications</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Slavinskas, J., & Andrew, D. M. (2025). <em>Lignin‑Derived Carbon Fibres: Opportunities and Challenges</em>.</li>
            <li>Slavinskas, J. (2025). <em>Lignin Derived Chemicals and Aromatics: A Review</em>. ChemRxiv.</li>
            <li>Dölle, K., et al. (2024). <em>Sustainable Greeting Card – Paper Products Produced on a Laboratory Paper Machine</em>.</li>
            <li>Dölle, K., et al. (2023). <em>Characterization of Recycled Fiber Material...</em></li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Certifications</h2>
          <ul className="mt-2 grid sm:grid-cols-2 gap-2 text-sm list-disc pl-5">
            <li>SCE Incubator — Founding Your Own Startup (2024–2025)</li>
            <li>DeepLearning.AI — TensorFlow Developer (2023)</li>
            <li>IBM — AI Engineering (2023)</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
