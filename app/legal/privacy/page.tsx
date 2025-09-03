import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

const SITE = "https://tridude5.github.io";                      // <- your GH Pages origin
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";            // "/JohnSlavinskas" at build on GH Actions
const CANONICAL = `${SITE}${BASE}/legal/privacy/`;               // trailing slash!

export const metadata: Metadata = {
  title: "Privacy — John Slavinskas",
  description: "How personal data is processed and protected on this website.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyClient lastUpdatedISO="2025-09-01" />;
}
