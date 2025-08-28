import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppEffects from "@/components/AppEffects"; // ⟵ client CSS injector

export const metadata: Metadata = {
  title: "John Slavinskas — Paper Engineer × Quant Technologist",
  description:
    "Portfolio of John Slavinskas — Paper Engineer blending sustainable materials research, software/ML, and quantitative finance.",
  // TODO: set to real production domain when ready
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "John Slavinskas — Paper Engineer × Quant Technologist",
    description: "Finance & Data Analyst | SAP • Python • VBA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased">
        {/* Global micro-effects (client-side) */}
        <AppEffects />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      <I18nProvider>{children}</I18nProvider></body>
    </html>
  );
}
