"use client";
import Link from "next/link";

import LanguageToggle from '@/components/LanguageToggle';
import { useI18n } from '@/components/i18n/I18nProvider';

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-gray-900/60 border-b border-gray-200/40 dark:border-gray-800/50">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          <span className="text-emerald-600">John</span> Slavinskas
        </Link>

        <details className="sm:hidden">
          <summary className="cursor-pointer px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Menu
          </summary>
          <div className="mt-2 space-y-2">
            <NavLinks />
          </div>
        </details>

        <div className="hidden sm:flex items-center gap-6">
          <NavLinks />
        </div>
            <LanguageToggle />
      </div>
    </nav>
  );
}

function NavLinks() {
  const { t } = useI18n();
  return (
    <>
      <Link href="/#about" className="fancy-underline">{t('nav.about')}</Link>
      <Link href="/resume" className="fancy-underline">{t('nav.resume')}</Link>
      <Link href="/projects" className="fancy-underline">{t('nav.projects')}</Link>
    </>
  );
}
