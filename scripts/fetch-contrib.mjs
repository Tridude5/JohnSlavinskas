// scripts/fetch-contrib.mjs
// Public contributions for a specific user via GitHub GraphQL (no private).
// Writes: public/github-contrib.json -> { total: number, weeks: number[] }

import fs from "node:fs/promises";
import path from "node:path";

const login = process.env.GH_LOGIN || "Tridude5";
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN; // GitHub Actions token

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

const to = new Date();
const from = new Date(to);
from.setFullYear(from.getFullYear() - 1);

const QUERY_PUBLIC_BY_USER = `
  query($login:String!, $from:DateTime!, $to:DateTime!) {
    user(login:$login) {
      contributionsCollection(from:$from, to:$to) {
        totalCommitContributions
        contributionCalendar {
          weeks { contributionDays { contributionCount } }
        }
      }
    }
  }
`;

function sumWeeks(weeks) {
  return Array.isArray(weeks)
    ? weeks.map(w => (w.contributionDays || []).reduce((s, d) => s + (d?.contributionCount || 0), 0))
    : Array(52).fill(0);
}

async function main() {
  if (!token) {
    console.warn("⚠ GH_TOKEN missing; writing zeros.");
    await fs.writeFile(outPath, JSON.stringify({ total: 0, weeks: Array(52).fill(0) }, null, 2));
    return;
  }

  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`,
      "User-Agent": "gh-contrib-fetch"
    },
    body: JSON.stringify({
      query: QUERY_PUBLIC_BY_USER,
      variables: { login, from: from.toISOString(), to: to.toISOString() }
    }),
  });

  if (!r.ok) {
    console.error("❌ GraphQL HTTP error:", r.status, await r.text());
    await fs.writeFile(outPath, JSON.stringify({ total: 0, weeks: Array(52).fill(0) }, null, 2));
    return;
  }

  const j = await r.json();
  const coll = j?.data?.user?.contributionsCollection;
  const total = Number(coll?.totalCommitContributions) || 0;
  const weeks = sumWeeks(coll?.contributionCalendar?.weeks);

  await fs.writeFile(outPath, JSON.stringify({ total, weeks }, null, 2));
  console.log(`✅ Wrote ${outPath} (total=${total}) [public for ${login}]`);
}

main().catch(async (e) => {
  console.error("❌ fetch-contrib error:", e);
  await fs.writeFile(outPath, JSON.stringify({ total: 0, weeks: Array(52).fill(0) }, null, 2));
});
