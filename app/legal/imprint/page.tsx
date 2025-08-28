"use client";
import { useI18n } from "@/components/i18n/I18nProvider";

export const metadata = { title: "Imprint — John Slavinskas" };

export default function Imprint(){
  const { t } = useI18n();
  return (
    <div className="container py-12">
      <div className="max-w-3xl prose prose-emerald dark:prose-invert">
        <h1>{t('imprint.title')}</h1>
        <p><strong>{t('imprint.serviceprovider')}:</strong><br/>
        John Slavinskas<br/>
        Lissi Kaeser Straße 8<br/>
        80797 München, Germany</p>
        <p><strong>{t('imprint.contact')}:</strong><br/>
        Phone: +49 1575 4805360<br/>
        Email: <a href="mailto:Slavinskasjack@gmail.com">Slavinskasjack@gmail.com</a></p>
        <h2>{t('imprint.responsible')}</h2>
        <p>John Slavinskas</p>
        <h2>{t('imprint.liability')}</h2>
        <p>{t('imprint.liabilityText')}</p>
        <h2>{t('imprint.copyright')}</h2>
        <p>{t('imprint.copyrightText')}</p>
      </div>
    </div>
  )
}
