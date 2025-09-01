"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function ImprintClient({
  lastUpdatedISO = new Date().toISOString().slice(0, 10),
}: { lastUpdatedISO?: string }) {
  const t = useTranslations("imprint");
  const locale = useLocale();

  const me = {
    name: "John Slavinskas",
    street: "Lissi Kaeser Straße 8",
    postalCode: "80797",
    city: "München",
    country: "Germany",
    phone: "+49 1575 4805360",
    email: "Slavinskasjack@gmail.com",
  } as const;

  const lastUpdatedPretty = new Intl.DateTimeFormat(locale, { dateStyle: "long" })
    .format(new Date(lastUpdatedISO));

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 text-zinc-900 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-2 text-sm opacity-70">
        {t("lastUpdated", { date: lastUpdatedPretty })}
      </p>

      <section className="mt-8 space-y-2">
        <h2 className="text-xl font-medium">{t("serviceProviderHeading")}</h2>
        <address className="not-italic leading-7">
          <div>{me.name}</div>
          <div>{me.street}</div>
          <div>{me.postalCode} {me.city}, {me.country}</div>
        </address>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="text-xl font-medium">{t("contactHeading")}</h2>
        <p>
          {t("phoneLabel")}{" "}
          <a
            className="underline underline-offset-2"
            href={`tel:${me.phone.replace(/[^\d+]/g, "")}`}
          >
            {me.phone}
          </a>
        </p>
        <p>
          {t("emailLabel")}{" "}
          <a
            className="underline underline-offset-2"
            href={`mailto:${me.email}`}
          >
            {me.email}
          </a>
        </p>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="text-xl font-medium">{t("responsibleHeading")}</h2>
        <p>{me.name}</p>
      </section>

      <hr className="my-8 border-zinc-200 dark:border-zinc-800" />

      <section className="space-y-4 leading-7">
        <h2 className="text-xl font-medium">{t("liabilityContentHeading")}</h2>
        <p>{t("liabilityContent")}</p>
        <h3 className="text-lg font-medium">{t("linksLiabilityHeading")}</h3>
        <p>{t("linksLiability")}</p>
      </section>

      <section className="mt-8 space-y-4 leading-7">
        <h2 className="text-xl font-medium">{t("copyrightHeading")}</h2>
        <p>{t("copyright")}</p>
      </section>

      <footer className="mt-10 text-sm opacity-70">
        <p>© {new Date().getFullYear()} {me.name}</p>
      </footer>
    </main>
  );
}
