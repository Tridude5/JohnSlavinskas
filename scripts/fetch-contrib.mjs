// scripts/fetch-contrib.mjs
import fs from "node:fs/promises";
import path from "node:path";

const user  = process.env.GH_USER  || "Tridude5";
const token = process.env.GH_TOKEN;

if (!token) {
  console.error("GH_TOKEN missing. Set it in GitHub → Settings → Secrets and variables → Actions.");
  process.exit(1);
}

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
  process.exit(1);
}

const data = await res.json();
const weeksRaw = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
const weeks = weeksRaw
  .map(w => (w?.contributionDays ?? []).reduce((s, d) => s + (d?.contributionCount || 0), 0))
  .slice(-52);

// write public/github-contrib.json
const outPath = path.join(process.cwd(), "public", "github-contrib.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });
await fs.writeFile(outPath, JSON.stringify({ weeks }, null, 2));
console.log("✅ wrote", outPath, "for", user);
