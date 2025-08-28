import Link from "next/link";

export default function ProjectCard({
  title,
  subtitle,
  kpi,
  tags,
  href,
  cta = "View project",
}: {
  title: string;
  subtitle: string;
  kpi?: string;
  tags?: string[];
  href?: string;
  cta?: string;
}) {
  return (
    <div className="card hover:shadow-md transition group">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
        </div>
        {kpi && (
          <span className="text-emerald-700 dark:text-emerald-300 text-sm font-medium">
            {kpi}
          </span>
        )}
      </div>

      {tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 text-xs"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {href && (
        <Link href={href} className="btn-outline mt-5 inline-flex">
          {cta}
        </Link>
      )}
    </div>
  );
}
