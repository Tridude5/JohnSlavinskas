import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = req.nextUrl.searchParams.get("user");
  if (!user) return NextResponse.json({ error: "user required" }, { status: 400 });

  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) return NextResponse.json({ error: "no token" }, { status: 401 });

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
  const body = JSON.stringify({
    query,
    variables: { login: user, from: from.toISOString(), to: to.toISOString() },
  });

  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` },
    body,
    next: { revalidate: 3600 }, // cache 1h
  });

  if (!r.ok) return NextResponse.json({ error: "github error" }, { status: 502 });
  const data = await r.json();

  const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const bars: number[] = weeks.map((w: any) =>
    (w.contributionDays || []).reduce((s: number, d: any) => s + (d?.contributionCount || 0), 0)
  );

  return NextResponse.json({ weeks: bars });
}
