'use client';
import React, {createContext, useContext, useMemo, useCallback, useEffect, useState} from 'react';
import en from '@/messages/en';
import de from '@/messages/de';

export type Lang = 'en' | 'de';
type Ctx = { lang: Lang; setLang: (l: Lang)=>void; t: (k: string)=>string };

const I18nCtx = createContext<Ctx>({ lang: 'en', setLang: ()=>{}, t: (k)=>k });

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem('lang');
  if (stored === 'de' || stored === 'en') return stored;
  const cookie = document.cookie.match(/(?:^|; )lang=(en|de)/)?.[1];
  if (cookie === 'de' || cookie === 'en') return cookie as Lang;
  if (navigator.language?.toLowerCase().startsWith('de')) return 'de';
  return 'en';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // 👇 avoid “flash” by reading initial value synchronously
  const [lang, setLangState] = useState<Lang>(() => getInitialLang());

  // keep <html lang> accurate for a11y/SEO
  useEffect(() => { document.documentElement.setAttribute('lang', lang); }, [lang]);

  const persist = (l: Lang) => {
    try {
      localStorage.setItem('lang', l);
      document.cookie = `lang=${l}; Path=/; Max-Age=31536000; SameSite=Lax`;
    } catch {/* ignore */}
  };

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    persist(l);
  }, []);

  // select dictionary + safe fallback to EN
  const dict = lang === 'de' ? (de as Record<string,string>) : (en as Record<string,string>);
  const base = en as Record<string,string>;

  const t = useMemo(() => (k: string) => dict[k] ?? base[k] ?? k, [dict, base]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n(){ return useContext(I18nCtx); }
