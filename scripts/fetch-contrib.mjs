// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";

const user  = process.env.GH_USER || "Tridude5";
// Prefer your PAT (GH_TOKEN). Fallback to the repo's GITHUB_TOKEN (public only).
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

// If no token at all, don't fail the build — write zeros or keep previous.
if (!token) {
  console.warn("⚠ No GH_TOKEN/GITHUB_TOKEN available. Writing zeros.");
  await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0) }, null, 2));
  process.exit(0);
}

const to = new Date();
const from = new Date(to);
from.setFullYear(to.getFullYear() - 1);

// NOTE: includeRestrictedContributions:true asks GitHub to include private
// contributions when the viewer == user AND the user's profile setting
// “Include private contributions on my profile” is enabled.
// If your token lacks permission, GitHub will just omit them.
const query = `
  query($login:String!, $from:DateTime!, $to:DateTime!) {
    user(login:$login) {
      contributionsCollection(from:$from, to:$to, includeRestrictedContributions:true) {
        hasAnyRestrictedContributions
        contributionCalendar {
          weeks { contributionDays { contributionCount } }
        }
      }
    }
  }
`;

let res;
try {
  res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { login: user, from: from.toISOString(), to: to.toISOString() },
    }),
  });
} catch (e) {
  console.error("❌ Network error calling GitHub GraphQL:", e?.message || e);
  await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0) }, null, 2));
  process.exit(0);
}

if (!res.ok) {
  const text = await res.text();
  console.error("❌ GitHub GraphQL error:", text);
  await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0) }, null, 2));
  process.exit(0);
}

const data = await res.json();
const weeksRaw =
  data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
const weeks = weeksRaw
  .map((w) => (w?.contributionDays ?? [])
    .reduce((s, d) => s + (d?.contributionCount || 0), 0))
  .slice(-52);

await fs.writeFile(outPath, JSON.stringify({ weeks }, null, 2));
console.log(`✅ wrote ${outPath} for ${user} (total ${weeks.reduce((s,x)=>s+x,0)})`);
