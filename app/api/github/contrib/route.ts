import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = req.nextUrl.searchParams.get("user");
  if (!user) return NextResponse.json({ error: "user required" }, { status: 400 });

  const token = process.env.GH_TOKEN;
  if (!token) return NextResponse.json({ error: "GH_TOKEN missing" }, { status: 500 });

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

  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` },
    body: JSON.stringify({
      query,
      variables: { login: user, from: from.toISOString(), to: to.toISOString() },
    }),
    // Cache for 1 hour
    next: { revalidate: 3600 },
  });

  if (!r.ok) {
    const text = await r.text();
    return NextResponse.json({ error: "github error", text }, { status: 502 });
  }

  const data = await r.json();
  const weeksRaw = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const weeks: number[] = weeksRaw.map((w: any) =>
    (w?.contributionDays ?? []).reduce((s: number, d: any) => s + (d?.contributionCount || 0), 0)
  );

  return NextResponse.json({ weeks: weeks.slice(-52) });
}
