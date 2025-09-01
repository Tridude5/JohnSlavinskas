"use client";
import React from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ImprintClient({
  // Fixed date
  lastUpdatedISO = "2025-09-01",
}: { lastUpdatedISO?: string }) {
  const { t, locale } = useI18n() as { t: (k: string, o?: any) => string; locale?: string };
  const tt = (k: string, o?: any) => t(`imprint.${k}`, o); // namespaced helper

  const me = {
    name: "John Slavinskas",
    street: "Lissi Kaeser Straße 8",
    postalCode: "80797",
    city: "München",
    country: "Germany",
    phone: "+49 1575 4805360",
    email: "Slavinskasjack@gmail.com",
  } as const;

  // Robust UTC parsing to avoid off-by-one issues across timezones
  const [y, m, d] = lastUpdatedISO.split("-").map(Number);
  const dateUtc = new Date(Date.UTC(y, (m || 1) - 1, d || 1));

  // Force English long date so it reads "September 1, 2025"
  const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(dateUtc);
  // If you prefer locale-aware formatting instead, use:
  // const formattedDate = new Intl.DateTimeFormat(locale || undefined, { dateStyle: "long" }).format(dateUtc);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 text-zinc-900 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold tracking-tight">{tt("title")}</h1>
      <p className="mt-2 text-sm opacity-70">{tt("lastUpdated", { date: formattedDate })}</p>

      <section className="mt-8 space-y-2">
        <h2 className="text-xl font-medium">{tt("serviceProviderHeading")}</h2>
        <address className="not-italic leading-7">
          <div>{me.name}</div>
          <div>{me.street}</div>
          <div>
            {me.postalCode} {me.city}, {me.country}
          </div>
        </address>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="text-xl font-medium">{tt("contactHeading")}</h2>
        <p>
          {tt("phoneLabel")}{" "}
          <a className="underline underline-offset-2" href={`tel:${me.phone.replace(/[^\d+]/g, "")}`}>
            {me.phone}
          </a>
        </p>
        <p>
          {tt("emailLabel")}{" "}
          <a className="underline underline-offset-2" href={`mailto:${me.email}`}>
            {me.email}
          </a>
        </p>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="text-xl font-medium">{tt("responsibleHeading")}</h2>
        <p>{me.name}</p>
      </section>

      <hr className="my-8 border-zinc-200 dark:border-zinc-800" />

      <section className="space-y-4 leading-7">
        <h2 className="text-xl font-medium">{tt("liabilityContentHeading")}</h2>
        <p>{tt("liabilityContent")}</p>
        <h3 className="text-lg font-medium">{tt("linksLiabilityHeading")}</h3>
        <p>{tt("linksLiability")}</p>
      </section>

      <section className="mt-8 space-y-4 leading-7">
        <h2 className="text-xl font-medium">{tt("copyrightHeading")}</h2>
        <p>{tt("copyright")}</p>
      </section>
    </main>
  );
}
