import { sql } from "@vercel/postgres";

let schemaReady: Promise<unknown> | null = null;

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS events (
        id BIGSERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        path TEXT NOT NULL,
        referrer TEXT,
        session_id TEXT NOT NULL,
        country TEXT,
        city TEXT,
        duration_ms INTEGER,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
  }
  return schemaReady;
}

export type EventInput = {
  type: "pageview" | "download_click" | "duration";
  path: string;
  referrer?: string | null;
  sessionId: string;
  country?: string | null;
  city?: string | null;
  durationMs?: number | null;
};

export async function recordEvent(event: EventInput) {
  await ensureSchema();
  await sql`
    INSERT INTO events (event_type, path, referrer, session_id, country, city, duration_ms)
    VALUES (
      ${event.type},
      ${event.path},
      ${event.referrer ?? null},
      ${event.sessionId},
      ${event.country ?? null},
      ${event.city ?? null},
      ${event.durationMs ?? null}
    )
  `;
}

export type DashboardData = {
  totalPageviews: number;
  totalDownloads: number;
  avgDurationMs: number | null;
  dailyViews: { day: string; views: number }[];
  topReferrers: { referrer: string; visits: number }[];
  topCountries: { country: string; visits: number }[];
  caseStudyViews: { path: string; views: number }[];
};

const CASE_STUDY_PATHS = [
  "/projects/read",
  "/projects/ai-research",
  "/projects/read-validation",
];

export async function getDashboardData(): Promise<DashboardData> {
  await ensureSchema();

  const [
    totalPageviewsRes,
    totalDownloadsRes,
    avgDurationRes,
    dailyViewsRes,
    topReferrersRes,
    topCountriesRes,
    caseStudyViewsRes,
  ] = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM events WHERE event_type = 'pageview'`,
    sql`SELECT COUNT(*)::int AS count FROM events WHERE event_type = 'download_click'`,
    sql`SELECT AVG(duration_ms)::int AS avg FROM events WHERE event_type = 'duration'`,
    sql`
      SELECT to_char(date_trunc('day', created_at), 'Mon DD') AS day, COUNT(*)::int AS views
      FROM events
      WHERE event_type = 'pageview' AND created_at > now() - interval '14 days'
      GROUP BY date_trunc('day', created_at)
      ORDER BY date_trunc('day', created_at) ASC
    `,
    sql`
      SELECT referrer, COUNT(*)::int AS visits
      FROM events
      WHERE event_type = 'pageview' AND referrer IS NOT NULL AND referrer <> ''
      GROUP BY referrer
      ORDER BY visits DESC
      LIMIT 8
    `,
    sql`
      SELECT country, COUNT(*)::int AS visits
      FROM events
      WHERE event_type = 'pageview' AND country IS NOT NULL AND country <> ''
      GROUP BY country
      ORDER BY visits DESC
      LIMIT 8
    `,
    sql`
      SELECT path, COUNT(*)::int AS views
      FROM events
      WHERE event_type = 'pageview' AND path = ANY(${CASE_STUDY_PATHS})
      GROUP BY path
    `,
  ]);

  return {
    totalPageviews: totalPageviewsRes.rows[0]?.count ?? 0,
    totalDownloads: totalDownloadsRes.rows[0]?.count ?? 0,
    avgDurationMs: avgDurationRes.rows[0]?.avg ?? null,
    dailyViews: dailyViewsRes.rows as { day: string; views: number }[],
    topReferrers: topReferrersRes.rows as { referrer: string; visits: number }[],
    topCountries: topCountriesRes.rows as { country: string; visits: number }[],
    caseStudyViews: caseStudyViewsRes.rows as { path: string; views: number }[],
  };
}
