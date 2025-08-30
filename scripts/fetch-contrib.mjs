// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";

const user = process.env.GH_USER || "Tridude5";
// Use your personal PAT for private contribs. Fallback to repo token (public-only) with a warning.
const ghPat = process.env.GH_TOKEN || "";
const repoToken = process.env.GITHUB_TOKEN || "";
const usingRepoToken = !ghPat && !!repoToken;
const token = ghPat || repoToken;

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

// Require *some* token. If only repo token is present, proceed but warn (private contribs won't show).
if (!token) {
  console.error("❌ No GH_TOKEN/GITHUB_TOKEN in the environment. Cannot fetch contributions.");
  process.exit(1);
}

if (usingRepoToken) {
  console.warn("⚠ Using GITHUB_TOKEN (repo token). Private contributions will NOT be included.");
}

const to = new Date();
const from = new Date(to);
from.setFullYear(to.getFullYear() - 1);

// Ask GitHub for contribution weeks (includeRestrictedContributions tries to include private if viewer==user)
const query = `
  query($login:String!, $from:DateTime!, $to:DateTime!) {
    viewer { login }
    user(login:$login) {
      login
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
  process.exit(1);
}

if (!res.ok) {
  const text = await res.text();
  console.error("❌ GitHub GraphQL returned non-OK:", res.status, res.statusText, text);
  process.exit(1);
}

const data = await res.json();

const viewerLogin = data?.data?.viewer?.login;
const weeksRaw = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
const weeks = weeksRaw
  .map(w => (w?.contributionDays ?? []).reduce((s, d) => s + (d?.contributionCount || 0), 0))
  .slice(-52);

await fs.writeFile(outPath, JSON.stringify({ weeks }, null, 2));

const total = weeks.reduce((s, x) => s + x, 0);
const hasRestricted = data?.data?.user?.contributionsCollection?.hasAnyRestrictedContributions;

console.log(`✅ wrote ${outPath} for ${user} (total ${total})`);
if (usingRepoToken) {
  console.log("ℹ️ Used GITHUB_TOKEN (repo token). Only public contributions are counted.");
} else {
  if (viewerLogin !== user) {
    console.warn(`⚠ PAT viewer is '${viewerLogin}', but GH_USER is '${user}'. Private contributions will NOT be included.`);
  } else if (hasRestricted) {
    console.log("🎉 Private contributions were included (viewer matches user and profile setting allows it).");
  } else {
    console.log("ℹ️ No restricted contributions detected. If you expected them, ensure your profile setting 'Include private contributions on my profile' is enabled.");
  }
}
