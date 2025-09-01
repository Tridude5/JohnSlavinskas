import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy — John Slavinskas",
  description: "How personal data is processed and protected on this website."
};

export default function Page() {
  // Update this date whenever you change the policy text
  return <PrivacyClient lastUpdatedISO="2025-09-01" />;
}
