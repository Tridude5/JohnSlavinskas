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

  // Match your /public/favicons files exactly
  icons: {
    icon: [
      { url: "/favicons/favicon-32.png?v=9", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16.png?v=9", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon.ico?v=9" }, // classic fallback
    ],
    apple: [{ url: "/favicons/apple-touch-icon.png?v=9", sizes: "180x180" }],
  },
  manifest: "/favicons/manifest.json?v=9",
  themeColor: "#0B0F1A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Extra insurance: explicit <link>s */}
      <head>
        <link rel="icon" href="/favicons/favicon-32.png?v=9" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicons/favicon-16.png?v=9" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicons/favicon.ico?v=9" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png?v=9" />
        <link rel="manifest" href="/favicons/manifest.json?v=9" />
        <meta name="theme-color" content="#0B0F1A" />
      </head>

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
