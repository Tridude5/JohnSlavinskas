"use client";
import React from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function PrivacyClient({
  lastUpdatedISO = new Date().toISOString().slice(0, 10),
}: { lastUpdatedISO?: string }) {
  const { t, locale } = useI18n() as { t: (k: string, o?: any) => string; locale?: string };

  // UTC-parse to avoid off-by-one in some timezones
  const [y, m, d] = lastUpdatedISO.split("-").map(Number);
  const formattedDate = new Intl.DateTimeFormat(locale || undefined, { dateStyle: "long" })
    .format(new Date(Date.UTC(y, (m || 1) - 1, d || 1)));

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article
        className="
          prose prose-emerald dark:prose-invert
          prose-h1:mb-2 prose-h2:mt-10 prose-h2:mb-3
          prose-p:my-4 prose-a:break-words
          hyphens-auto
        "
        lang={locale || undefined}
      >
        <h1>{t("privacy.title")}</h1>
        <p>
          <strong>
            {t("privacy.updated")}: {formattedDate}
          </strong>
        </p>

        <p>{t("privacy.body")}</p>

        <section id="contact">
          <h2>{t("privacy.contact")}</h2>
          <address className="not-italic leading-7">
            <div><strong>John Slavinskas</strong></div>
            <div>Lissi Kaeser Straße 8</div>
            <div>80797 München, Germany</div>

            <div className="flex gap-2">
              <span>{t("privacy.phoneLabel", { default: "Phone:" })}</span>
              <a
                className="underline underline-offset-2"
                href={`tel:${"+49 1575 4805360".replace(/[^\d+]/g, "")}`}
              >
                +49 1575 4805360
              </a>
            </div>

            <div className="flex gap-2">
              <span>{t("privacy.emailLabel", { default: "Email:" })}</span>
              <a className="underline underline-offset-2" href="mailto:Slavinskasjack@gmail.com">
                Slavinskasjack@gmail.com
              </a>
            </div>
          </address>
        </section>

        <section id="emails">
          <h2>{t("privacy.emailsHeading")}</h2>
          <p>{t("privacy.emails")}</p>
        </section>

        <section id="eurights">
          <h2>{t("privacy.eurightsHeading")}</h2>
          <p>{t("privacy.eurights")}</p>
        </section>

        <section id="embeds">
          <h2>{t("privacy.embedsHeading")}</h2>
          <p>{t("privacy.embeds")}</p>
        </section>

        <section id="changes">
          <h2>{t("privacy.changesHeading")}</h2>
          <p>{t("privacy.changes")}</p>
        </section>
      </article>
    </main>
  );
}
