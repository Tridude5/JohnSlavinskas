import fs from "node:fs/promises";
import path from "node:path";

const user  = process.env.GH_USER  || "Tridude5";
const token = process.env.GH_TOKEN;
if (!token) { console.error("GH_TOKEN missing"); process.exit(1); }

const to = new Date();
const from = new Date(to); from.setFullYear(to.getFullYear() - 1);

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

const r = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` },
  body: JSON.stringify({ query, variables: { login: user, from: from.toISOString(), to: to.toISOString() } }),
});
if (!r.ok) { console.error(await r.text()); process.exit(1); }

const data = await r.json();
const weeks = (data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [])
  .map(w => (w?.contributionDays ?? []).reduce((s,d)=>s+(d?.contributionCount||0),0))
  .slice(-52);

await fs.mkdir(path.join(process.cwd(), "public"), { recursive: true });
await fs.writeFile(path.join(process.cwd(), "public", "github-contrib.json"), JSON.stringify({ weeks }, null, 2));
console.log("✅ wrote public/github-contrib.json");
