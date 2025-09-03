import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

const SITE = "https://tridude5.github.io";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";   // "/JohnSlavinskas" on GH Pages build
const CANONICAL = `${SITE}${BASE}/resume/`;            // trailing slash is important

export const metadata: Metadata = {
  title: "Resume — John Slavinskas",
  description: "Curriculum vitae of John Slavinskas covering lignin chemistry, biopolymers, and Flutter/Firebase projects.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    url: CANONICAL,
    title: "Resume — John Slavinskas",
    description: "Curriculum vitae of John Slavinskas.",
    siteName: "John Slavinskas",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Resume — John Slavinskas",
    description: "Curriculum vitae of John Slavinskas."
  }
};

export default function ResumePage() {
  return <ResumeClient />;
}
