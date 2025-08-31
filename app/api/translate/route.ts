import { NextRequest } from 'next/server';

// Optional: protect or force certain terms (brand names, domain words)
const GLOSSARY: Array<{ from: string; to: string }> = [
  { from: 'Efficient Frontier', to: 'Efficient Frontier' },  // keep English
  { from: 'Paper Engineering',  to: 'Papiertechnik' },
  { from: 'Prazise',            to: 'Prazise' },             // product name
  { from: 'Lignopure',          to: 'Lignopure' },           // company name
];

function applyGlossary(s: string) {
  let out = s;
  for (const { from, to } of GLOSSARY) {
    // simple, case-sensitive replace; adjust if you need case-insensitive
    out = out.split(from).join(to);
  }
  return out;
}

export async function POST(req: NextRequest) {
  try {
    const { text, target = 'de' } = await req.json();
    if (!text || typeof text !== 'string') {
      return Response.json({ error: 'Missing text' }, { status: 400 });
    }
    const lang = String(target).toUpperCase();
    const key  = process.env.DEEPL_API_KEY;
    const url  = process.env.DEEPL_API_URL || 'https://api-free.deepl.com/v2/translate';

    // If no API key configured, just return the original (so the UI never breaks)
    if (!key) return Response.json({ translation: text });

    const body = new URLSearchParams({ text, target_lang: lang });
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!r.ok) {
      const err = await r.text().catch(() => '');
      return Response.json({ error: `MT failed: ${r.status} ${err}` }, { status: 502 });
    }

    const data: any = await r.json();
    const translated: string = data?.translations?.[0]?.text ?? text;

    return Response.json({ translation: applyGlossary(translated) });
  } catch (e: any) {
    return Response.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
