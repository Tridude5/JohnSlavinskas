// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";

const user  = process.env.GH_USER || "Tridude5";
// Prefer your PAT (repo secret); fall back to GitHub Actions token
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

const write = (weeks) =>
  fs.writeFile(outPath, JSON.stringify({ weeks }, null, 2));

const writeZeros = async (why = "no data") => {
  const weeks = Array(52).fill(0);
  await write(weeks);
  console.log(`ℹ Wrote zeros to ${outPath} (${why}).`);
};

if (!token) {
  console.warn("⚠ No GH_TOKEN/GITHUB_TOKEN available. Skipping fetch.");
  try { await fs.access(outPath); console.log("ℹ Using existing public/github-contrib.json"); }
  catch { await writeZeros("no token"); }
  process.exit(0);
}

const to = new Date();
const from = new Date(to);
from.setFullYear(to.getFullYear() - 1);

async function fetchWeeks(includePrivate) {
  const query = `
    query($login:String!, $from:DateTime!, $to:DateTime!) {
      user(login:$login) {
        contributionsCollection(
          from: $from,
          to: $to,
          includePrivateContributions: ${includePrivate ? "true" : "false"}
        ) {
          contributionCalendar {
            weeks { contributionDays { contributionCount } }
          }
        }
      }
    }
  `;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` },
    body: JSON.stringify({ query, variables: { login: user, from: from.toISOString(), to: to.toISOString() } }),
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const weeksRaw = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  return weeksRaw.map(w => (w?.contributionDays ?? [])
    .reduce((s, d) => s + (d?.contributionCount || 0), 0)).slice(-52);
}

let weeks;
try {
  // Try private+public first
  weeks = await fetchWeeks(true);
  const total = weeks.reduce((a,b)=>a+b,0);
  console.log(`✓ Private-inclusive fetch total: ${total}`);
  if (total === 0) {
    console.warn("↪ Private-inclusive returned 0; retrying public-only…");
    weeks = await fetchWeeks(false);
  }
} catch (e) {
  console.error("GitHub GraphQL error:", e.message);
  console.warn("↪ Falling back to zeros to keep the build green.");
  await writeZeros("GraphQL error");
  process.exit(0);
}

const finalTotal = weeks?.reduce?.((a,b)=>a+b,0) ?? 0;
if (!weeks || weeks.length === 0) {
  await writeZeros("empty weeks");
  process.exit(0);
}

await write(weeks);
console.log(`✅ wrote ${outPath} for ${user} (total ${finalTotal})`);
