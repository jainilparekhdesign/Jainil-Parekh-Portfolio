"use client";

import { useRouter } from "next/navigation";

export default function InternalDashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/internal/logout", { method: "POST" });
    router.replace("/internal/login");
    router.refresh();
  }

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
        <button
          type="button"
          onClick={handleLogout}
          className="btn-secondary"
        >
          Log out
        </button>
      </div>

      <div className="card mt-10 max-w-[620px] p-8">
        <p className="font-geist text-body text-body-text">
          Access gate is working — you&rsquo;re in. Nothing tracked yet:
          tell me what you want on this dashboard (page views, referrers,
          which case studies get read, download-button clicks, etc.) and
          I&rsquo;ll wire up the data collection and build it out here.
        </p>
      </div>
    </div>
  );
}
