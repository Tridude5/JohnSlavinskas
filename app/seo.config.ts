// /app/seo.config.ts
import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://tridude5.github.io/JohnSlavinskas";

const TITLE = "John Slavinskas — Portfolio";
const DESCRIPTION =
  "Materials × Software × Finance. I turn lignin & other biobased research into clean data, simple models, and small tools.";

const OG_IMAGE = "/downloads/og-card.jpg"; // 1200x630

export const abs = (path = "/") => new URL(path, SITE_URL).toString();

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — John Slavinskas" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
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
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};
