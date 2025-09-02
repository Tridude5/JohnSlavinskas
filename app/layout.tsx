// /app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { baseMetadata } from "@/app/seo.config";
import JsonLdPerson from "@/components/JsonLd";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import Header from "@/components/Header";
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

  // Files live in /public, so link with *relative* URLs (work under /JohnSlavinskas/)
  icons: {
    icon: [
      { url: "favicon-48.png", sizes: "48x48", type: "image/png" }, // Google Search prefers 48x48
      { url: "favicon.ico", sizes: "any" },                         // classic fallback
      // Optional extras:
      { url: "favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "apple-touch-icon.png", sizes: "180x180" }],     // optional
  },

  // Keep only if you placed a manifest at /public/manifest.json
  manifest: "manifest.json",
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
