import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | undefined;

function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  if (!client) {
    client = neon(process.env.POSTGRES_URL!);
  }
  return client(strings, ...values);
}

let schemaReady: Promise<unknown> | null = null;

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
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
      await sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS campaign TEXT`;
      await sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS device_type TEXT`;
      await sql`
        CREATE TABLE IF NOT EXISTS campaigns (
          slug TEXT PRIMARY KEY,
          company_name TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })();
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
  campaign?: string | null;
  deviceType?: string | null;
};

export type RawEvent = {
  event_type: string;
  path: string;
  referrer: string | null;
  session_id: string;
  country: string | null;
  city: string | null;
  duration_ms: number | null;
  campaign: string | null;
  device_type: string | null;
  created_at: string;
};

export async function getAllEvents(): Promise<RawEvent[]> {
  await ensureSchema();
  return (await sql`
    SELECT event_type, path, referrer, session_id, country, city, duration_ms, campaign, device_type, created_at
    FROM events
    ORDER BY created_at DESC
  `) as RawEvent[];
}

export async function resetEvents() {
  await ensureSchema();
  await sql`TRUNCATE TABLE events`;
}

export async function recordEvent(event: EventInput) {
  await ensureSchema();
  await sql`
    INSERT INTO events (event_type, path, referrer, session_id, country, city, duration_ms, campaign, device_type)
    VALUES (
      ${event.type},
      ${event.path},
      ${event.referrer ?? null},
      ${event.sessionId},
      ${event.country ?? null},
      ${event.city ?? null},
      ${event.durationMs ?? null},
      ${event.campaign ?? null},
      ${event.deviceType ?? null}
    )
  `;
}

export type Campaign = {
  slug: string;
  companyName: string;
  createdAt: string;
};

export async function createCampaign(
  slug: string,
  companyName: string,
): Promise<Campaign | null> {
  await ensureSchema();
  const rows = (await sql`
    INSERT INTO campaigns (slug, company_name)
    VALUES (${slug}, ${companyName})
    ON CONFLICT (slug) DO NOTHING
    RETURNING slug, company_name, created_at
  `) as { slug: string; company_name: string; created_at: string }[];
  const row = rows[0];
  if (!row) return null;
  return { slug: row.slug, companyName: row.company_name, createdAt: row.created_at };
}

export async function deleteCampaign(slug: string) {
  await ensureSchema();
  await sql`DELETE FROM campaigns WHERE slug = ${slug}`;
}

export type CampaignStats = {
  slug: string;
  companyName: string;
  createdAt: string;
  sessions: number;
  pageviews: number;
  downloads: number;
  totalDurationMs: number;
  lastSeen: string | null;
};

export async function getCampaignStats(): Promise<CampaignStats[]> {
  await ensureSchema();
  const rows = (await sql`
    SELECT
      c.slug,
      c.company_name,
      c.created_at,
      COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_type = 'pageview')::int AS sessions,
      COUNT(*) FILTER (WHERE e.event_type = 'pageview')::int AS pageviews,
      COUNT(*) FILTER (WHERE e.event_type = 'download_click')::int AS downloads,
      COALESCE(SUM(e.duration_ms) FILTER (WHERE e.event_type = 'duration'), 0)::int AS total_duration_ms,
      MAX(e.created_at) AS last_seen
    FROM campaigns c
    LEFT JOIN events e ON e.campaign = c.slug
    GROUP BY c.slug, c.company_name, c.created_at
    ORDER BY MAX(e.created_at) DESC NULLS LAST, c.created_at DESC
  `) as {
    slug: string;
    company_name: string;
    created_at: string;
    sessions: number;
    pageviews: number;
    downloads: number;
    total_duration_ms: number;
    last_seen: string | null;
  }[];

  return rows.map((row) => ({
    slug: row.slug,
    companyName: row.company_name,
    createdAt: row.created_at,
    sessions: row.sessions,
    pageviews: row.pageviews,
    downloads: row.downloads,
    totalDurationMs: row.total_duration_ms,
    lastSeen: row.last_seen,
  }));
}

export type SessionSummary = {
  sessionId: string;
  firstSeen: string;
  lastSeen: string;
  country: string | null;
  city: string | null;
  deviceType: string | null;
  totalDurationMs: number;
  downloadedResume: boolean;
  pages: { path: string; durationMs: number }[];
};

export type DashboardData = {
  totalPageviews: number;
  totalDownloads: number;
  avgDurationMs: number | null;
  dailyViews: { day: string; views: number }[];
  topReferrers: { referrer: string; visits: number }[];
  topCountries: { country: string; visits: number }[];
  topDevices: { device: string; visits: number }[];
  caseStudyViews: { path: string; views: number }[];
  recentSessions: SessionSummary[];
};

const CASE_STUDY_PATHS = [
  "/projects/read",
  "/projects/ai-research",
  "/projects/read-validation",
];

export async function getDashboardData(): Promise<DashboardData> {
  await ensureSchema();

  const [
    totalPageviewsRows,
    totalDownloadsRows,
    avgDurationRows,
    dailyViewsRows,
    topReferrersRows,
    topCountriesRows,
    topDevicesRows,
    caseStudyViewsRows,
    sessionsRows,
    sessionPagesRows,
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
      SELECT device_type, COUNT(*)::int AS visits
      FROM events
      WHERE event_type = 'pageview' AND device_type IS NOT NULL AND device_type <> ''
      GROUP BY device_type
      ORDER BY visits DESC
    `,
    sql`
      SELECT path, COUNT(*)::int AS views
      FROM events
      WHERE event_type = 'pageview'
        AND path IN (${CASE_STUDY_PATHS[0]}, ${CASE_STUDY_PATHS[1]}, ${CASE_STUDY_PATHS[2]})
      GROUP BY path
    `,
    sql`
      SELECT
        session_id,
        MIN(created_at) AS first_seen,
        MAX(created_at) AS last_seen,
        MAX(country) FILTER (WHERE country IS NOT NULL) AS country,
        MAX(city) FILTER (WHERE city IS NOT NULL) AS city,
        MAX(device_type) FILTER (WHERE device_type IS NOT NULL) AS device_type,
        COALESCE(SUM(duration_ms) FILTER (WHERE event_type = 'duration'), 0)::int AS total_duration_ms,
        BOOL_OR(event_type = 'download_click') AS downloaded_resume
      FROM events
      GROUP BY session_id
      ORDER BY MAX(created_at) DESC
      LIMIT 30
    `,
    sql`
      SELECT session_id, path, SUM(duration_ms)::int AS duration_ms
      FROM events
      WHERE event_type = 'duration'
      GROUP BY session_id, path
    `,
  ]);

  const sessionIds = new Set(
    (sessionsRows as { session_id: string }[]).map((r) => r.session_id),
  );
  const pagesBySession = new Map<string, { path: string; durationMs: number }[]>();
  for (const row of sessionPagesRows as {
    session_id: string;
    path: string;
    duration_ms: number;
  }[]) {
    if (!sessionIds.has(row.session_id)) continue;
    const list = pagesBySession.get(row.session_id) ?? [];
    list.push({ path: row.path, durationMs: row.duration_ms });
    pagesBySession.set(row.session_id, list);
  }
  for (const pages of pagesBySession.values()) {
    pages.sort((a, b) => b.durationMs - a.durationMs);
  }

  const recentSessions: SessionSummary[] = (
    sessionsRows as {
      session_id: string;
      first_seen: string;
      last_seen: string;
      country: string | null;
      city: string | null;
      device_type: string | null;
      total_duration_ms: number;
      downloaded_resume: boolean;
    }[]
  ).map((row) => ({
    sessionId: row.session_id,
    firstSeen: row.first_seen,
    lastSeen: row.last_seen,
    country: row.country,
    city: row.city,
    deviceType: row.device_type,
    totalDurationMs: row.total_duration_ms,
    downloadedResume: row.downloaded_resume,
    pages: pagesBySession.get(row.session_id) ?? [],
  }));

  return {
    totalPageviews: (totalPageviewsRows[0] as { count: number })?.count ?? 0,
    totalDownloads: (totalDownloadsRows[0] as { count: number })?.count ?? 0,
    avgDurationMs: (avgDurationRows[0] as { avg: number | null })?.avg ?? null,
    dailyViews: dailyViewsRows as { day: string; views: number }[],
    topReferrers: topReferrersRows as { referrer: string; visits: number }[],
    topCountries: topCountriesRows as { country: string; visits: number }[],
    topDevices: (topDevicesRows as { device_type: string; visits: number }[]).map(
      (row) => ({ device: row.device_type, visits: row.visits }),
    ),
    caseStudyViews: caseStudyViewsRows as { path: string; views: number }[],
    recentSessions,
  };
}
