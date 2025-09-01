// /app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { baseMetadata } from "@/app/seo.config";   // ⬅️ central SEO config
import JsonLdPerson from "@/components/JsonLd";     // ⬅️ JSON-LD <script/>

import { I18nProvider } from "@/components/i18n/I18nProvider";
import Footer from "@/components/Footer";
import AppEffects from "@/components/AppEffects";

// NEW: glassy sticky top nav
import TopNav from "@/components/TopNav";

// You can override parts of baseMetadata here if you want
export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: "John Slavinskas — Paper Engineer × Quant Technologist",
    template: "%s — John Slavinskas",
  },
  description:
    "Portfolio of John Slavinskas — Paper Engineer blending sustainable materials research, software/ML, and quantitative finance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* pt-16 offsets the fixed TopNav (h-14) for safe spacing */}
      <body className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased pt-16">
        <AppEffects />
        <I18nProvider>
          <TopNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
        {/* SEO: JSON-LD (Person) */}
        <JsonLdPerson />
      </body>
    </html>
  );
}
