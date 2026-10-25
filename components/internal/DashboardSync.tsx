"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const AUTO_SYNC_INTERVAL_MS = 30_000;

export default function DashboardSync() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [lastSyncedLabel, setLastSyncedLabel] = useState("");

  function sync() {
    startTransition(() => router.refresh());
    setLastSyncedLabel(
      new Date().toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }),
    );
  }

  useEffect(() => {
    const id = setInterval(sync, AUTO_SYNC_INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span className="font-geist-mono text-caption text-graphite-70">
        {isPending
          ? "Syncing…"
          : lastSyncedLabel
            ? `Synced ${lastSyncedLabel}`
            : ""}
      </span>
      <button
        type="button"
        onClick={sync}
        disabled={isPending}
        className="btn-secondary disabled:opacity-50"
      >
        Sync now
      </button>
    </div>
  );
}
