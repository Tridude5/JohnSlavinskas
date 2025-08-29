// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";

const user  = process.env.GH_USER || "Tridude5";
// Fallback to the built-in Actions token if GH_TOKEN isn't set
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });

// If still no token, don't fail the build — keep old data or write zeros
if (!token) {
  console.warn("⚠ No GH_TOKEN/GITHUB_TOKEN available. Skipping fetch.");
  try {
    // Keep existing file if it exists
    await fs.access(outPath);
    console.log("ℹ Using existing public/github-contrib.json");
  } catch {
    // Or write zeros to avoid breaking the UI
    await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0) }, null, 2));
    console.log("ℹ Wrote zeros to public/github-contrib.json");
  }
  process.exit(0);
}

// --- rest of the script unchanged ---
const to = new Date();
const from = new Date(to);
from.setFullYear(to.getFullYear() - 1);

const query = `
  query($login:String!, $from:DateTime!, $to:DateTime!) {
    user(login:$login) {
      contributionsCollection(from:$from, to:$to) {
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

if (!res.ok) {
  console.error("GitHub GraphQL error:", await res.text());
  // Fall back to zeros to keep the build green
  await fs.writeFile(outPath, JSON.stringify({ weeks: Array(52).fill(0) }, null, 2));
  process.exit(0);
}

const data = await res.json();
const weeksRaw = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
const weeks = weeksRaw.map(w => (w?.contributionDays ?? [])
  .reduce((s, d) => s + (d?.contributionCount || 0), 0)).slice(-52);

await fs.writeFile(outPath, JSON.stringify({ weeks }, null, 2));
console.log("✅ wrote", outPath, "for", user);
