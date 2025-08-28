'use client';
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import en from '@/messages/en';
import de from '@/messages/de';

export type Lang = 'en' | 'de';
type Ctx = { lang: Lang; setLang: (l: Lang)=>void; t: (k: string)=>string; };

const I18nCtx = createContext<Ctx>({ lang: 'en', setLang: ()=>{}, t: (k)=>k });

export function I18nProvider({children}:{children: React.ReactNode}){
  const [lang, setLang] = useState<Lang>('en');
  // initial from localStorage / navigator
  useEffect(()=>{
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
    if (stored === 'de' || stored === 'en') setLang(stored);
    else if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('de')) setLang('de');
  }, []);
  useEffect(()=>{
    if (typeof window !== 'undefined') window.localStorage.setItem('lang', lang);
  }, [lang]);
  const dict = lang === 'de' ? de : en;
  const t = useMemo(()=> (k: string)=> dict[k] ?? en[k] ?? k, [dict]);
  const value = useMemo(()=>({lang, setLang, t}), [lang, t]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n(){ return useContext(I18nCtx); }
