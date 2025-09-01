// /components/JsonLd.tsx
import Script from "next/script";
import { SITE_URL, abs } from "@/app/seo.config";

export default function JsonLdPerson() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "John (Jack) Slavinskas",
    url: SITE_URL,
    image: abs("/downloads/1683206302513.jfif"),
    sameAs: [
      "https://github.com/Tridude5",
      "https://www.linkedin.com/in/john-slavinskas/",
    ],
    jobTitle: "Materials × Software × Finance",
    worksFor: { "@type": "Organization", name: "Lignopure" },
  };

  return (
    <Script
      id="ld-person"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
