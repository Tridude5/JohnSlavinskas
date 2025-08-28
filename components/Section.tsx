export default function Section({ id, title, subtitle, children }:{ id?:string; title:string; subtitle?:string; children: React.ReactNode }){
  return (
    <section id={id} className="container py-14">
      <div className="max-w-2xl mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
        {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}