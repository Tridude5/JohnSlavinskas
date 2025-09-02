// /app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { baseMetadata } from "@/app/seo.config";
import JsonLdPerson from "@/components/JsonLd";

import { I18nProvider } from "@/components/i18n/I18nProvider";
import Header from "@/components/Header";           // ⬅️ use Header (not StickyHeader)
import Footer from "@/components/Footer";
import AppEffects from "@/components/AppEffects";

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
      {/* Header is sticky itself, so no special padding needed here */}
      <body className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased">
        <AppEffects />
        <I18nProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
        <JsonLdPerson />
      </body>
    </html>
  );
}
