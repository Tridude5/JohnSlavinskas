// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

const writeZeros = async (why = "unknown") => {
  console.warn(`⚠ Writing zeros (${why}).`);
  await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0), total: 0 }, null, 2));
};

if (!token) {
  await writeZeros("no token");
  process.exit(0);
}

const to = new Date();
const from = new Date(to);
from.setFullYear(to.getFullYear() - 1);

// Primary: includePrivateContributions for token owner (viewer)
const QUERY_PRIVATE = `
  query($from:DateTime!, $to:DateTime!) {
    viewer {
      login
      contributionsCollection(from:$from, to:$to, includePrivateContributions:true) {
        totalCommitContributions
        contributionCalendar { weeks { contributionDays { contributionCount } } }
      }
    }
  }
`;

// Fallback: public-only
const QUERY_PUBLIC = `
  query($from:DateTime!, $to:DateTime!) {
    viewer {
      login
      contributionsCollection(from:$from, to:$to) {
        totalCommitContributions
        contributionCalendar { weeks { contributionDays { contributionCount } } }
      }
    }
  }
`;

async function call(query) {
  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` },
    body: JSON.stringify({ query, variables: { from: from.toISOString(), to: to.toISOString() } }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${await r.text()}`);
  return r.json();
}

function sumWeeks(weeks) {
  return Array.isArray(weeks)
    ? weeks.map(w => (w.contributionDays || []).reduce((s, d) => s + (d?.contributionCount || 0), 0))
    : Array(52).fill(0);
}

try {
  // Try private
  const j1 = await call(QUERY_PRIVATE);
  const viewer = j1?.data?.viewer?.login;
  const coll1 = j1?.data?.viewer?.contributionsCollection;
  const total1 = Number(coll1?.totalCommitContributions) || 0;
  const weeks1 = sumWeeks(coll1?.contributionCalendar?.weeks);
  console.log("viewer =", viewer);
  console.log("API totalCommitContributions (private) =", total1);

  if (total1 > 0) {
    await fs.writeFile(outPath, JSON.stringify({ weeks: weeks1, total: total1 }, null, 2));
    console.log(`✅ Wrote ${outPath} (total=${total1}) [private]`);
    process.exit(0);
  }

  // Fallback: public only
  const j2 = await call(QUERY_PUBLIC);
  const coll2 = j2?.data?.viewer?.contributionsCollection;
  const total2 = Number(coll2?.totalCommitContributions) || 0;
  const weeks2 = sumWeeks(coll2?.contributionCalendar?.weeks);
  console.log("API totalCommitContributions (public) =", total2);

  await fs.writeFile(outPath, JSON.stringify({ weeks: weeks2, total: total2 }, null, 2));
  console.log(`✅ Wrote ${outPath} (total=${total2}) [public]`);
} catch (e) {
  console.error("❌ fetch-contrib error:", e);
  await writeZeros("error");
  process.exit(1);
}
