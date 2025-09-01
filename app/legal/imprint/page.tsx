import type { Metadata } from "next";
import ImprintClient from "./ImprintClient";

export const metadata: Metadata = {
  title: "Imprint — John Slavinskas",
  description: "Legal disclosure (Impressum) for John Slavinskas' website."
};

export default function Page() {
  return <ImprintClient lastUpdatedISO="2025-09-01" />;
}
