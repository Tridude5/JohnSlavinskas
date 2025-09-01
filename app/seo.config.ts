// /app/seo.config.ts
import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://tridude5.github.io/JohnSlavinskas"; // keep the GitHub Pages base

const TITLE = "John Slavinskas — Portfolio";
const DESCRIPTION =
  "Materials × Software × Finance. I turn lignin & other biobased research into clean data, simple models, and small tools.";

const OG_IMAGE = "/downloads/og-card.jpg"; // 1200x630 is ideal

// helper to make absolute URLs
export const abs = (path = "/") => new URL(path, SITE_URL).toString();

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — John Slavinskas",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: abs("/"),
    // If you later publish a German route, point it here:
    // languages: { en: abs("/"), de: abs("/?lng=de") },
  },
  openGraph: {
    type: "website",
    url: abs("/"),
    siteName: "John Slavinskas",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: abs(OG_IMAGE), width: 1200, height: 630, alt: "John Slavinskas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [abs(OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // Fill these if you want file-free ownership verification:
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_CODE || undefined, // e.g. "abc123..."
    bing: process.env.NEXT_PUBLIC_BING_CODE || undefined,
  },
};
