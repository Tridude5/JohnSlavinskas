// app/projects/page.tsx
import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

const SITE = "https://tridude5.github.io";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";   // "/JohnSlavinskas" on GH Pages build
const CANONICAL = `${SITE}${BASE}/projects/`;           // note the trailing slash

export const metadata: Metadata = {
  title: "Projects — John Slavinskas",
  description: "Selected projects by John Slavinskas across Flutter/Firebase and sustainable materials.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    url: CANONICAL,
    title: "Projects — John Slavinskas",
    description: "Selected projects by John Slavinskas.",
    siteName: "John Slavinskas",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — John Slavinskas",
    description: "Selected projects by John Slavinskas."
  }
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
