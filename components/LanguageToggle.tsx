'use client';

import { useEffect, useCallback } from 'react';
import { useI18n } from '@/components/i18n/I18nProvider';

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const next = lang === 'en' ? 'de' : 'en';

  // Keep <html lang="…"> in sync for a11y, screen readers, and SEO hints
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang);
    }
  }, [lang]);

  const toggle = useCallback(() => {
    setLang(next as any); // updates your i18n context

    // Persist selection so it sticks across routes/refresh
    try {
      localStorage.setItem('lang', next);
      // helpful if any middleware / server bits look for a cookie
      document.cookie = `lang=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    } catch {
      /* no-op if storage unavailable */
    }
  }, [next, setLang]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === 'en' ? 'Auf Deutsch umschalten' : 'Switch to English'}
      title={lang === 'en' ? 'Auf Deutsch umschalten' : 'Switch to English'}
      aria-pressed={lang === 'de'}
      className="px-3 py-1 rounded-lg border border-gray-300/50 dark:border-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium"
    >
      {/* Show the NEXT language so users know what they'll get */}
      {next.toUpperCase()}
    </button>
  );
}
