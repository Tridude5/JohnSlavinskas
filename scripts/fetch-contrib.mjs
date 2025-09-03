// scripts/fetch-contrib.mjs
// Writes: public/github-contrib.json -> { total, weeks[52] }

import fs from "node:fs/promises";
import path from "node:path";

const login = process.env.GH_LOGIN || "Tridude5";
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || "";

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

const to = new Date();
const from = new Date(to);
from.setFullYear(from.getFullYear() - 1);

const QUERY = `
  query($login:String!,$from:DateTime!,$to:DateTime!){
    user(login:$login){
      contributionsCollection(from:$from,to:$to){
        totalCommitContributions
        contributionCalendar{ weeks{ contributionDays{ contributionCount } } }
      }
    }
  }
`;

function weeksFromCalendar(weeks) {
  if (!Array.isArray(weeks)) return Array(52).fill(0);
  return weeks.map(w => (w.contributionDays || [])
    .reduce((s, d) => s + (d?.contributionCount || 0), 0));
}

function pad52(arr) {
  if (!Array.isArray(arr)) return Array(52).fill(0);
  if (arr.length === 52) return arr;
  if (arr.length > 52) return arr.slice(arr.length - 52);
  return Array(52 - arr.length).fill(0).concat(arr);
}

async function fetchGraphQL() {
  if (!token) return null;
  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`,
      "User-Agent": "gh-contrib-fetch"
    },
    body: JSON.stringify({ query: QUERY, variables: {
      login, from: from.toISOString(), to: to.toISOString()
    }}),
  });
  if (!r.ok) {
    console.warn("GraphQL HTTP error:", r.status, await r.text());
    return null;
  }
  const j = await r.json();
  if (j?.errors?.length) {
    console.warn("GraphQL errors:", j.errors);
    return null;
  }
  const coll = j?.data?.user?.contributionsCollection;
  if (!coll) return null;
  const weeks = weeksFromCalendar(coll.contributionCalendar?.weeks);
  const total = Number(coll.totalCommitContributions) || weeks.reduce((a,b)=>a+b,0);
  return { total, weeks: pad52(weeks) };
}

async function fetchFromSVG() {
  const fromISO = from.toISOString().slice(0, 10);
  const toISO   = to.toISOString().slice(0, 10);
  const url = `https://github.com/users/${encodeURIComponent(login)}/contributions?from=${fromISO}&to=${toISO}`;
  const r = await fetch(url, { headers: { "User-Agent": "gh-contrib-fetch" } });
  if (!r.ok) {
    console.warn("SVG HTTP error:", r.status, await r.text());
    return null;
  }
  const svg = await r.text();
  // Sum data-counts per weekly <g> block
  const weekBlocks = svg.split('<g transform="translate(').slice(1);
  const weeks = weekBlocks.map(block =>
    Array.from(block.matchAll(/data-count="(\d+)"/g))
      .map(m => Number(m[1] || 0))
      .reduce((a,b)=>a+b,0)
  );
  const total = Array.from(svg.matchAll(/data-count="(\d+)"/g))
    .map(m => Number(m[1] || 0)).reduce((a,b)=>a+b,0);
  return { total, weeks: pad52(weeks) };
}

async function main() {
  let data = await fetchGraphQL();
  if (!data) {
    console.warn("Falling back to public SVG…");
    data = await fetchFromSVG();
  }
  if (!data) {
    console.warn("No data available; writing zeros.");
    data = { total: 0, weeks: Array(52).fill(0) };
  }
  await fs.writeFile(outPath, JSON.stringify(data, null, 2));
  console.log(`✅ Wrote ${outPath} (total=${data.total}) [${login}]`);
}

main().catch(async (e) => {
  console.error("❌ fetch-contrib failed:", e);
  await fs.writeFile(outPath, JSON.stringify({ total: 0, weeks: Array(52).fill(0) }, null, 2));
});
