// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";

const user = process.env.GH_USER || "Tridude5";

// Prefer PAT for private; fallback to repo token (public-only)
const ghPat = process.env.GH_TOKEN || "";
const repoToken = process.env.GITHUB_TOKEN || "";
const usingRepoToken = !ghPat && !!repoToken;
const token = ghPat || repoToken;

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

const inCI = String(process.env.CI).toLowerCase() === "true";
async function writeZeros(reason) {
  console.warn(`⚠ Writing zeros for contributions: ${reason}`);
  const zeros = Array(52).fill(0);
  await fs.writeFile(outPath, JSON.stringify({
    weeks: zeros, weeksPublic: zeros, weeksPrivate: zeros,
    meta: { reason, user, from: null, to: null }
  }, null, 2));
}

if (!token) {
  if (inCI) {
    console.error("❌ No GH_TOKEN/GITHUB_TOKEN in the environment. Cannot fetch contributions.");
    process.exit(1);
  } else {
    await writeZeros("no token in local/dev env");
    process.exit(0);
  }
}

if (usingRepoToken) {
  console.warn("⚠ Using GITHUB_TOKEN (repo token). Private contributions will NOT be included.");
}

const to = new Date();
const from = new Date(to);
from.setFullYear(to.getFullYear() - 1);

const query = `
  query($login:String!, $from:DateTime!, $to:DateTime!) {
    viewer { login }
    user(login:$login) {
      login
      publicOnly: contributionsCollection(from:$from, to:$to, includeRestrictedContributions:false) {
        contributionCalendar {
          weeks { contributionDays { contributionCount } }
        }
      }
      all: contributionsCollection(from:$from, to:$to, includeRestrictedContributions:true) {
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
      "User-Agent": "fetch-contrib-script",
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: { login: user, from: from.toISOString(), to: to.toISOString() } }),
  });
} catch (e) {
  console.error("❌ Network error calling GitHub GraphQL:", e?.message || e);
  if (inCI) process.exit(1);
  await writeZeros("network error (non-CI)");
  process.exit(0);
}

if (!res.ok) {
  const text = await res.text();
  console.error("❌ GitHub GraphQL returned non-OK:", res.status, res.statusText, text);
  if (inCI) process.exit(1);
  await writeZeros("non-OK GraphQL response (non-CI)");
  process.exit(0);
}

const data = await res.json();
if (data?.errors?.length) {
  console.error("❌ GraphQL errors:", JSON.stringify(data.errors));
  if (inCI) process.exit(1);
  await writeZeros("GraphQL errors (non-CI)");
  process.exit(0);
}

const weeksSum = (node) =>
  (node?.contributionCalendar?.weeks ?? [])
    .map(w => (w?.contributionDays ?? []).reduce((s, d) => s + (d?.contributionCount || 0), 0));

const weeksAllRaw = weeksSum(data?.data?.user?.all);
const weeksPubRaw = weeksSum(data?.data?.user?.publicOnly);

// Align to the last 52 weeks from the end of each array
const last52 = (arr) => arr.slice(-52);
const weeksPublic = last52(weeksPubRaw);
const weeksTotal  = last52(weeksAllRaw);

// Pad to equal length if needed
const len = Math.max(weeksPublic.length, weeksTotal.length, 52);
const pad = (arr) => Array(len - arr.length).fill(0).concat(arr);
const pub = pad(weeksPublic);
const tot = pad(weeksTotal);

// Private = Total - Public (clamped to 0)
const pri = tot.map((t, i) => Math.max(0, t - (pub[i] || 0)));

await fs.writeFile(outPath, JSON.stringify({
  weeks: tot,                 // Back-compat: total weeks
  weeksPublic: pub,           // New: public only
  weeksPrivate: pri,          // New: private only
  meta: {
    user,
    from: from.toISOString(),
    to: to.toISOString(),
    includesPrivate: !usingRepoToken && (data?.data?.user?.all?.hasAnyRestrictedContributions ?? false),
    viewer: data?.data?.viewer?.login || null
  }
}, null, 2));

const sum = (a) => a.reduce((s, x) => s + x, 0);
console.log(`✅ wrote ${outPath} for ${user} — total:${sum(tot)} public:${sum(pub)} private:${sum(pri)}`);
if (usingRepoToken) console.log("ℹ️ Used GITHUB_TOKEN (repo token). Only public contributions counted.");
