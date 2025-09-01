"use client";
import React from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function PrivacyClient({
  lastUpdatedISO = new Date().toISOString().slice(0, 10),
}: { lastUpdatedISO?: string }) {
  const { t, locale } = useI18n() as { t: (k: string, o?: any) => string; locale?: string };

  const formattedDate = new Intl.DateTimeFormat(locale || undefined, { dateStyle: "long" })
    .format(new Date(lastUpdatedISO));

  return (
    <div className="container py-12">
      <div className="max-w-3xl prose prose-emerald dark:prose-invert">
        <h1>{t("privacy.title")}</h1>
        <p><strong>{t("privacy.updated")}: {formattedDate}</strong></p>

        <p>{t("privacy.body")}</p>

        <h2 id="contact">{t("privacy.contact")}</h2>
        <p>
          <strong>John Slavinskas</strong><br/>
          Lissi Kaeser Straße 8, 80797 München, Germany<br/>
          {t("privacy.phoneLabel", { default: "Phone:" })}{" "}
          <a href={`tel:${"+49 1575 4805360".replace(/[^\d+]/g, "")}`}>+49 1575 4805360</a><br/>
          {t("privacy.emailLabel", { default: "Email:" })}{" "}
          <a href="mailto:Slavinskasjack@gmail.com">Slavinskasjack@gmail.com</a>
        </p>

        <h2 id="emails">{t("privacy.emailsHeading")}</h2>
        <p>{t("privacy.emails")}</p>

        <h2 id="eurights">{t("privacy.eurightsHeading")}</h2>
        <p>{t("privacy.eurights")}</p>

        <h2 id="embeds">{t("privacy.embedsHeading")}</h2>
        <p>{t("privacy.embeds")}</p>

        <h2 id="changes">{t("privacy.changesHeading")}</h2>
        <p>{t("privacy.changes")}</p>
      </div>
    </div>
  );
}
