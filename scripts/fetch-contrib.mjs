// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";

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

// Use the *viewer* (the token owner) so private contributions are included when possible.
const query = `
  query($from:DateTime!, $to:DateTime!) {
    viewer {
      login
      contributionsCollection(from:$from, to:$to, includePrivateContributions:true) {
        totalCommitContributions
        contributionCalendar {
          weeks { contributionDays { contributionCount } }
        }
      }
    }
  }
`;

async function run() {
  const resp = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` },
    body: JSON.stringify({ query, variables: { from: from.toISOString(), to: to.toISOString() } }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("❌ GitHub GraphQL HTTP error:", resp.status, text);
    // Write zeros so the site still builds
    await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0), total: 0 }, null, 2));
    process.exit(1);
  }

  const json = await resp.json();
  const viewer = json?.data?.viewer?.login;
  const coll = json?.data?.viewer?.contributionsCollection;

  console.log("viewer =", viewer);
  console.log("API totalCommitContributions =", coll?.totalCommitContributions);

  const weeks = Array.isArray(coll?.contributionCalendar?.weeks)
    ? coll.contributionCalendar.weeks.map(
        (w) => (w.contributionDays || []).reduce((s, d) => s + (d?.contributionCount || 0), 0)
      )
    : Array(52).fill(0);

  const total = Number.isFinite(coll?.totalCommitContributions)
    ? coll.totalCommitContributions
    : weeks.reduce((a, b) => a + b, 0);

  await fs.writeFile(outPath, JSON.stringify({ weeks, total }, null, 2));
  console.log(`✅ Wrote ${outPath} (total=${total})`);
}

try {
  await run();
} catch (e) {
  console.error("❌ Unexpected error:", e);
  await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0), total: 0 }, null, 2));
  console.log(`✅ Wrote ${outPath} (total=0) due to error.`);
  process.exit(1);
}
