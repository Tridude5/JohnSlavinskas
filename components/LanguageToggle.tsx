'use client';
import { useI18n } from '@/components/i18n/I18nProvider';

export default function LanguageToggle(){
  const { lang, setLang } = useI18n();
  const next = lang === 'en' ? 'de' : 'en';
  return (
    <button
      className="px-3 py-1 rounded-lg border border-gray-300/50 dark:border-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs"
      onClick={()=> setLang(next as any)}
      aria-label="Toggle language"
      title={lang === 'en' ? 'Auf Deutsch umschalten' : 'Switch to English'}
    >
      {lang.toUpperCase()}
    </button>
  );
}
