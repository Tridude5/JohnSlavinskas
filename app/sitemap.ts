import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tridude5.github.io/JohnSlavinskas";
  const pages = ["", "/resume", "/projects", "/legal/imprint", "/legal/privacy"];
  const now = new Date();
  return pages.map(p => ({ url: `${base}${p}`, lastModified: now }));
}
