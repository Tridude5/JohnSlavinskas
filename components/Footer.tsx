import Link from "next/link";
import EmailLink from "./EmailLink";
import { useI18n } from '@/components/i18n/I18nProvider';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800/60 mt-16">
      <div className="container py-10 text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} John Slavinskas</p>
        <div className="flex items-center gap-4">
          <EmailLink className="fancy-underline" />
          <Link className="fancy-underline" href="/legal/imprint">{t('footer.imprint')}</Link>
          <Link className="fancy-underline" href="/legal/privacy">{t('footer.privacy')}</Link>
        </div>
      </div>
    </footer>
  );
}
