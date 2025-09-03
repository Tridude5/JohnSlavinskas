import type { Metadata } from "next";
import ImprintClient from "./ImprintClient";

const SITE = "https://tridude5.github.io";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";     // "/JohnSlavinskas" on CI
const CANONICAL = `${SITE}${BASE}/legal/imprint/`;        // trailing slash!

export const metadata: Metadata = {
  title: "Imprint — John Slavinskas",
  description: "Legal disclosure (Impressum) for John Slavinskas' website.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ImprintClient lastUpdatedISO="2025-09-01" />;
}
