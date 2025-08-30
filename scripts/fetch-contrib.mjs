import fs from "node:fs/promises";
import path from "node:path";

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

const zero = { weeks: Array(52).fill(0), total: 0, source: "none", viewer: null, restricted: 0 };
const write = async (data, note = "") => {
  await fs.writeFile(outPath, JSON.stringify(data, null, 2));
  console.log(`✅ Wrote ${outPath} ${note ? `(${note})` : ""}`);
};

if (!token) {
  console.warn("⚠ No GH_TOKEN found.");
  await write(zero, "no token");
  process.exit(0);
}

const to = new Date();
const from = new Date(to);
from.setFullYear(to.getFullYear() - 1);

const Q = (includePrivate) => `
  query($from:DateTime!, $to:DateTime!) {
    viewer {
      login
      contributionsCollection(from:$from, to:$to, includePrivateContributions:${includePrivate ? "true" : "false"}) {
        totalCommitContributions
        restrictedContributionsCount
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

const sumWeeks = (weeks) =>
  Array.isArray(weeks)
    ? weeks.map((w) => (w.contributionDays || []).reduce((s, d) => s + (d?.contributionCount || 0), 0))
    : Array(52).fill(0);

try {
  const priv = await call(Q(true));
  const viewer = priv?.data?.viewer?.login ?? null;
  const coll1 = priv?.data?.viewer?.contributionsCollection;
  const total1 = Number(coll1?.totalCommitContributions) || 0;
  const restr  = Number(coll1?.restrictedContributionsCount) || 0;
  const weeks1 = sumWeeks(coll1?.contributionCalendar?.weeks);

  console.log("viewer =", viewer);
  console.log("includePrivateContributions = true");
  console.log("restrictedContributionsCount =", restr);
  console.log("totalCommitContributions (private) =", total1);

  if (total1 > 0) {
    await write({ weeks: weeks1, total: total1, source: "private", viewer, restricted: restr }, "private");
    process.exit(0);
  }

  const pub = await call(Q(false));
  const coll2 = pub?.data?.viewer?.contributionsCollection;
  const total2 = Number(coll2?.totalCommitContributions) || 0;
  const weeks2 = sumWeeks(coll2?.contributionCalendar?.weeks);

  console.log("includePrivateContributions = false");
  console.log("totalCommitContributions (public) =", total2);

  await write({ weeks: weeks2, total: total2, source: "public", viewer, restricted: restr }, "public");
} catch (e) {
  console.error("❌ fetch-contrib error:", e);
  await write(zero, "error");
  process.exit(1);
}
