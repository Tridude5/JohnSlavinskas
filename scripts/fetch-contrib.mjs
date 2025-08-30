// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";

const user = process.env.GH_USER || "Tridude5";

// Prefer PAT for private contribs; fallback to repo token (public-only)
const ghPat = process.env.GH_TOKEN || "";
const repoToken = process.env.GITHUB_TOKEN || "";
const usingRepoToken = !ghPat && !!repoToken;
const token = ghPat || repoToken;

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

const inCI = String(process.env.CI).toLowerCase() === "true";
async function writeZeros(reason) {
  const zeros = Array(52).fill(0);
  await fs.writeFile(
    outPath,
    JSON.stringify(
      {
        weeks: zeros,
        totals: { total: 0, public: 0, private: 0 },
        meta: { reason, user, from: null, to: null, viewer: null, includesPrivate: false },
      },
      null,
      2
    )
  );
}

if (!token) {
  console.error("❌ No GH_TOKEN/GITHUB_TOKEN in the environment.");
  if (inCI) process.exit(1);
  await writeZeros("no token (non-CI)");
  process.exit(0);
}

const to = new Date();
const from = new Date(to);
from.setFullYear(to.getFullYear() - 1);

// NOTE: No includeRestrictedContributions arg here; the calendar already reflects what the viewer may see.
// We also get restrictedContributionsCount for overall private total in the range.  (No per-day/private split.)
const query = `
  query($login:String!, $from:DateTime!, $to:DateTime!) {
    viewer { login }
    user(login:$login) {
      contributionsCollection(from:$from, to:$to) {
        hasAnyRestrictedContributions
        restrictedContributionsCount
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
    body: JSON.stringify({
      query,
      variables: { login: user, from: from.toISOString(), to: to.toISOString() },
    }),
  });
} catch (e) {
  console.error("❌ Network error calling GitHub GraphQL:", e?.message || e);
  if (inCI) process.exit(1);
  await writeZeros("network error (non-CI)");
  process.exit(0);
}

if (!res.ok) {
  const text = await res.text();
  console.error("❌ GitHub GraphQL non-OK:", res.status, res.statusText, text);
  if (inCI) process.exit(1);
  await writeZeros("non-OK GraphQL (non-CI)");
  process.exit(0);
}

const data = await res.json();
if (data?.errors?.length) {
  console.error("❌ GraphQL errors:", JSON.stringify(data.errors));
  if (inCI) process.exit(1);
  await writeZeros("GraphQL errors (non-CI)");
  process.exit(0);
}

const viewerLogin = data?.data?.viewer?.login || null;
const cc = data?.data?.user?.contributionsCollection;

const weeksRaw =
  cc?.contributionCalendar?.weeks?.map(
    (w) => (w?.contributionDays ?? []).reduce((s, d) => s + (d?.contributionCount || 0), 0)
  ) ?? [];

const weeks = weeksRaw.slice(-52);
const total = weeks.reduce((s, x) => s + x, 0);
const privateTotal = Math.max(0, Math.min(total, cc?.restrictedContributionsCount ?? 0));
const publicTotal = Math.max(0, total - privateTotal);

await fs.writeFile(
  outPath,
  JSON.stringify(
    {
      weeks, // weekly totals (public+private as visible to the viewer)
      totals: { total, public: publicTotal, private: privateTotal },
      meta: {
        user,
        viewer: viewerLogin,
        from: from.toISOString(),
        to: to.toISOString(),
        includesPrivate: !!cc?.hasAnyRestrictedContributions && !usingRepoToken,
        usingRepoToken,
      },
    },
    null,
    2
  )
);

console.log(
  `✅ wrote ${outPath} for ${user} — total:${total} public:${publicTotal} private:${privateTotal}${
    usingRepoToken ? " (used GITHUB_TOKEN; private counts excluded)" : ""
  }`
);
