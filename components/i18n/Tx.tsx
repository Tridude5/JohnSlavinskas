'use client';
import React from 'react';
import { useI18n } from './I18nProvider';

// in-memory cache across the session
const mem = new Map<string, string>();

export default function Tx<E extends keyof JSX.IntrinsicElements = 'span'>(
  { as, className, children, ...rest }:
  { as?: E; className?: string; children: string } & Omit<JSX.IntrinsicElements[E], 'children'>
) {
  const { t, lang } = useI18n();
  const Tag: any = as ?? 'span';
  const key = children;

  // 1) dictionary wins (and EN just uses the key)
  const dictVal = t(key);
  const hasDict = lang === 'en' || dictVal !== key;

  // 2) read cached MT
  const cacheKey = `mt:${lang}:${key}`;
  const [auto, setAuto] = React.useState<string | null>(() => {
    if (lang === 'en' || hasDict) return null;
    const m = mem.get(cacheKey);
    if (m) return m;
    try {
      const ls = localStorage.getItem(cacheKey);
      if (ls) { mem.set(cacheKey, ls); return ls; }
    } catch {}
    return null;
  });

  // 3) fetch MT once if missing
  React.useEffect(() => {
    if (lang === 'en' || hasDict || auto) return;
    let aborted = false;

    (async () => {
      try {
        const res = await fetch(`/api/translate?target=${encodeURIComponent(lang)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: key }),
        });
        const data = await res.json();
        const txt: string | undefined = data?.translation?.trim();
        if (!aborted && txt) {
          mem.set(cacheKey, txt);
          try { localStorage.setItem(cacheKey, txt); } catch {}
          setAuto(txt);
        }
      } catch {/* fall back to EN */}
    })();

    return () => { aborted = true; };
  }, [lang, hasDict, auto, cacheKey, key]);

  const out = lang === 'en' ? key : (hasDict ? dictVal : (auto ?? key));
  return <Tag className={className} {...rest}>{out}</Tag>;
}
