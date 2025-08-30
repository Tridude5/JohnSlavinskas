// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";
// Optional: enable .env locally via `node -r dotenv/config scripts/fetch-contrib.mjs`
// import "dotenv/config";

const user  = process.env.GH_USER || "Tridude5";
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
    viewer { login }
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

async function main() {
  const resp = await fetch("https://api.github.com/graphql", {
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

  if (!resp.ok) {
    const text = await resp.text();
    console.error("❌ GitHub GraphQL HTTP error:", resp.status, text);
    process.exit(1);
  }

  const json = await resp.json();

  if (json.errors && json.errors.length) {
    console.error("❌ GitHub GraphQL returned errors:", JSON.stringify(json.errors, null, 2));
    // continue, but likely totals will be zero
  }

  const viewerLogin = json?.data?.viewer?.login;
  if (viewerLogin && viewerLogin !== user) {
    console.warn(`⚠ GH_USER (${user}) != token owner (${viewerLogin}). Private contributions may be excluded.`);
  }

  const coll = json?.data?.user?.contributionsCollection;
  if (!coll) {
    console.warn("⚠ No contributionsCollection in response. Writing zeros.");
    await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0), total: 0 }, null, 2));
    console.log(`✅ Wrote ${outPath} (total=0)`);
    return;
  }

  const weeks = Array.isArray(coll?.contributionCalendar?.weeks)
    ? coll.contributionCalendar.weeks.map(
        w => (w.contributionDays || []).reduce((s, d) => s + (d?.contributionCount || 0), 0)
      )
    : Array(52).fill(0);

  const total = Number.isFinite(coll?.totalCommitContributions)
    ? coll.totalCommitContributions
    : weeks.reduce((a, b) => a + b, 0);

  await fs.writeFile(outPath, JSON.stringify({ weeks, total }, null, 2));
  console.log(`✅ Wrote ${outPath} (total=${total})`);
}

try {
  await main();
} catch (err) {
  console.error("❌ Unexpected error:", err);
  await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0), total: 0 }, null, 2));
  console.log(`✅ Wrote ${outPath} (total=0) due to error.`);
  process.exit(1);
}
