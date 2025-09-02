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

  // ✅ Robust favicon wiring (PNG + ICO + legacy "shortcut" + Apple + Safari pinned)
  icons: {
    icon: [
      { url: "/favicons/favicon-32.png?v=6", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16.png?v=6", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon.ico?v=6" }, // some browsers prefer .ico
    ],
    shortcut: ["/favicons/favicon.ico?v=6"], // legacy alias some UAs still read
    apple: [{ url: "/favicons/apple-touch-icon.png?v=6", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/favicons/safari-pinned-tab.svg?v=6" }], // Safari pinned tab
  },

  manifest: "/favicons/manifest.json?v=6",
  // Nice touch for mobile status bar / PWA
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B0F1A" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F1A" },
  ],
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
