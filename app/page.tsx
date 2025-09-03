import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const SITE = "https://tridude5.github.io";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";   // "/JohnSlavinskas" on GH Pages
const CANONICAL = `${SITE}${BASE}/`;                    // trailing slash matters

export const metadata: Metadata = {
  title: "John Slavinskas — Materials × Software × Finance",
  description:
    "I work at the overlap of materials and software. Lignin & biobased materials, Python/ML, and small tools that help teams decide faster.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    url: CANONICAL,
    title: "John Slavinskas — Materials × Software × Finance",
    description:
      "Lignin & biobased materials, Python/ML, and useful tools for faster decisions.",
    siteName: "John Slavinskas",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "John Slavinskas — Materials × Software × Finance",
    description:
      "Lignin & biobased materials, Python/ML, and useful tools for faster decisions."
  }
};

export default function Page() {
  return <HomeClient />;
}
