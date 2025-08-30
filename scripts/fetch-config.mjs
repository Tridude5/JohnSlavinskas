// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";

const user  = process.env.GH_USER || "Tridude5";
// Use your personal PAT (classic) in GH_TOKEN. GITHUB_TOKEN usually can't see private.
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

if (!token) {
  console.warn("⚠ No GH_TOKEN found. Writing zeros.");
  await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0), total: 0 }, null, 2));
  process.exit(0);
}

const to = new Date();
const from = new Date(to);
from.setFullYear(to.getFullYear() - 1);

const query = `
  query($login:String!, $from:DateTime!, $to:DateTime!) {
    user(login:$login) {
      contributionsCollection(from:$from, to:$to, includePrivateContributions:true) {
        totalCommitContributions
        contributionCalendar {
          weeks { contributionDays { contributionCount } }
        }
      }
    }
  }
`;

const resp = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` },
  body: JSON.stringify({ query, variables: { login: user, from: from.toISOString(), to: to.toISOString() } }),
});

if (!resp.ok) {
  const text = await resp.text();
  console.error("GitHub GraphQL error:", text);
  process.exit(1);
}

const json = await resp.json();
const coll = json?.data?.user?.contributionsCollection;
const weeks = (coll?.contributionCalendar?.weeks || []).map(
  (w) => w.contributionDays.reduce((s, d) => s + (d.contributionCount || 0), 0)
);
const total = coll?.totalCommitContributions ?? weeks.reduce((a, b) => a + b, 0);

await fs.writeFile(outPath, JSON.stringify({ weeks, total }, null, 2));
console.log(`✅ Wrote ${outPath} (total=${total})`);
