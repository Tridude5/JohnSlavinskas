// scripts/fetch-contrib.mjs
// Public-only GitHub contributions (no token needed).
// Writes: public/github-contrib.json -> { total: number, weeks: number[] }

import fs from "node:fs/promises";
import path from "node:path";

const USER = process.env.GH_LOGIN || "Tridude5";

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

const to = new Date();
const from = new Date(to);
from.setFullYear(from.getFullYear() - 1);

// YYYY-MM-DD
const fmt = (d) => d.toISOString().slice(0, 10);
const url = `https://github.com/users/${USER}/contributions?from=${fmt(from)}&to=${fmt(to)}`;

const toUTCDate = (dStr) => new Date(`${dStr}T00:00:00Z`); // ensure UTC when getting day-of-week

try {
  const res = await fetch(url, { headers: { "User-Agent": "public-contrib-fetch" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const svg = await res.text();

  // Parse the contribution cells
  const dayRegex = /data-count="(\d+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;
  const days = [];
  let m;
  while ((m = dayRegex.exec(svg))) {
    days.push({ date: m[2], count: Number(m[1]) });
  }
  if (days.length === 0) throw new Error("No contribution cells parsed");

  // Sort oldest -> newest
  days.sort((a, b) => a.date.localeCompare(b.date));

  // Group into calendar weeks (Sun..Sat) using UTC day-of-week
  const weeks = [];
  let running = 0;
  let first = true;
  for (const d of days) {
    const dow = toUTCDate(d.date).getUTCDay(); // 0 = Sunday, 6 = Saturday
    if (!first && dow === 0) { // new week starts
      weeks.push(running);
      running = 0;
    }
    running += d.count;
    first = false;
  }
  if (!first) weeks.push(running); // push the last partial week

  const total = days.reduce((s, d) => s + d.count, 0);

  await fs.writeFile(outPath, JSON.stringify({ total, weeks }, null, 2));
  console.log(`✅ Public contributions written: total=${total}, weeks=${weeks.length}`);
} catch (err) {
  console.warn("⚠ Failed to fetch public contributions; writing zeros.", err?.message || err);
  await fs.writeFile(outPath, JSON.stringify({ total: 0, weeks: Array(52).fill(0) }, null, 2));
}
