import {
  getDashboardData,
  type DashboardData,
  type SessionSummary,
} from "@/lib/analytics-db";
import LogoutButton from "@/components/internal/LogoutButton";
import DashboardSync from "@/components/internal/DashboardSync";

export const dynamic = "force-dynamic";

const CASE_STUDY_TITLES: Record<string, string> = {
  "/projects/read": "Read",
  "/projects/ai-research": "AI: An Escape from Illusion",
  "/projects/read-validation": "Read: Risky Assumption Report",
};

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/projects": "Projects",
  "/resume": "Resume",
  ...CASE_STUDY_TITLES,
};

function formatDuration(ms: number | null) {
  if (!ms) return "-";
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}m ${remainder}s`;
}

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card p-6">
      <p className="font-geist-mono text-eyebrow uppercase text-blue">{label}</p>
      <p className="font-newsreader mt-2 text-metric text-ink">{value}</p>
    </div>
  );
}

function RankedList({
  title,
  rows,
  emptyLabel,
}: {
  title: string;
  rows: { label: string; value: number }[];
  emptyLabel: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="card p-6">
      <p className="font-geist-mono text-eyebrow uppercase text-blue">{title}</p>
      {rows.length === 0 ? (
        <p className="font-geist mt-4 text-body text-graphite-70">{emptyLabel}</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {rows.map((row) => (
            <li key={row.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-geist truncate text-ui text-ink">
                  {row.label}
                </span>
                <span className="font-geist-mono text-caption text-graphite-70">
                  {row.value}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-toolbar-outline">
                <div
                  className="h-full rounded-full bg-blue"
                  style={{ width: `${(row.value / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatTimestamp(iso: string) {
  return (
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(new Date(iso)) + " UTC"
  );
}

function locationLabel(country: string | null, city: string | null) {
  if (!country && !city) return "Unknown location";
  if (city && country) return `${city}, ${country}`;
  return city ?? country ?? "Unknown location";
}

function VisitorsTable({ sessions }: { sessions: SessionSummary[] }) {
  return (
    <div className="card p-6">
      <p className="font-geist-mono text-eyebrow uppercase text-blue">
        Recent visitors
      </p>
      {sessions.length === 0 ? (
        <p className="font-geist mt-4 text-body text-graphite-70">
          No visitors tracked yet.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col divide-y divide-toolbar-outline">
          {sessions.map((s) => (
            <li
              key={s.sessionId}
              className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p className="font-geist text-ui text-ink">
                  {locationLabel(s.country, s.city)}
                </p>
                <p className="font-geist-mono mt-1 text-caption text-graphite-70">
                  {formatTimestamp(s.lastSeen)}
                </p>
              </div>
              <div className="flex flex-col gap-1 sm:items-end">
                <div className="flex items-center gap-3">
                  <span className="font-geist-mono text-caption text-graphite-70">
                    {formatDuration(s.totalDurationMs)} total
                  </span>
                  <span
                    className={`font-geist-mono text-caption ${
                      s.downloadedResume ? "text-blue" : "text-graphite-70"
                    }`}
                  >
                    {s.downloadedResume ? "Downloaded resume" : "No download"}
                  </span>
                </div>
                {s.pages.length > 0 && (
                  <p className="font-geist text-caption text-graphite-70 sm:text-right">
                    {s.pages
                      .map(
                        (p) =>
                          `${PAGE_LABELS[p.path] ?? p.path} (${formatDuration(p.durationMs)})`,
                      )
                      .join(" · ")}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

async function loadData(): Promise<{ data: DashboardData | null; error: string | null }> {
  try {
    const data = await getDashboardData();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Failed to load analytics data.",
    };
  }
}

export default async function InternalDashboardPage() {
  const { data, error } = await loadData();

  return (
    <div className="font-geist min-h-screen bg-bg px-[clamp(24px,8vw,120px)] py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-geist-mono text-eyebrow uppercase text-blue">
            Internal
          </p>
          <h1 className="font-newsreader mt-2 text-section-heading text-ink">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <DashboardSync />
          <LogoutButton />
        </div>
      </div>

      {error && (
        <div className="card mt-10 max-w-[620px] p-8">
          <p className="font-geist text-body text-body-text">
            Couldn&rsquo;t load analytics data: {error}
          </p>
        </div>
      )}

      {data && (
        <div className="mt-10 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatTile label="Page views" value={data.totalPageviews} />
            <StatTile label="Resume downloads" value={data.totalDownloads} />
            <StatTile
              label="Avg. time on page"
              value={formatDuration(data.avgDurationMs)}
            />
            <StatTile
              label="Days tracked"
              value={data.dailyViews.length}
            />
          </div>

          <RankedList
            title="Page views: last 14 days"
            rows={data.dailyViews.map((d) => ({ label: d.day, value: d.views }))}
            emptyLabel="No page views recorded yet."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <RankedList
              title="Top referrers"
              rows={data.topReferrers.map((r) => ({
                label: r.referrer,
                value: r.visits,
              }))}
              emptyLabel="No referrers recorded yet (mostly direct traffic so far)."
            />
            <RankedList
              title="Top locations"
              rows={data.topCountries.map((c) => ({
                label: c.country,
                value: c.visits,
              }))}
              emptyLabel="No location data yet."
            />
          </div>

          <RankedList
            title="Case study reads"
            rows={Object.entries(CASE_STUDY_TITLES).map(([path, title]) => ({
              label: title,
              value:
                data.caseStudyViews.find((c) => c.path === path)?.views ?? 0,
            }))}
            emptyLabel="No case study views yet."
          />

          <VisitorsTable sessions={data.recentSessions} />
        </div>
      )}
    </div>
  );
}
