"use client";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function PrivacyClient(){
  const { t } = useI18n();
  return (
    <div className="container py-12">
      <div className="max-w-3xl prose prose-emerald dark:prose-invert">
        <h1>{t('privacy.title')}</h1>
        <p><strong>{t('privacy.updated')}: {new Date().toISOString().slice(0,10)}</strong></p>
        <p>{t('privacy.body')}</p>
        <h2>{t('privacy.contact')}</h2>
        <p><strong>John Slavinskas</strong><br/>
        Lissi Kaeser Straße 8, 80797 München, Germany<br/>
        Phone: +49 1575 4805360<br/>
        Email: <a href="mailto:Slavinskasjack@gmail.com">Slavinskasjack@gmail.com</a></p>
        <h2>Emails</h2>
        <p>{t('privacy.emails')}</p>
        <h2>EU/EEA</h2>
        <p>{t('privacy.eurights')}</p>
        <h2>Third-party embeds</h2>
        <p>{t('privacy.embeds')}</p>
        <h2>Changes</h2>
        <p>{t('privacy.changes')}</p>
      </div>
    </div>
  );
}
