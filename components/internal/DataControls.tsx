"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DataControls() {
  const router = useRouter();
  const [resetting, setResetting] = useState(false);

  async function handleReset() {
    const confirmed = window.confirm(
      "This permanently deletes all tracked analytics data. This cannot be undone. Continue?",
    );
    if (!confirmed) return;

    setResetting(true);
    await fetch("/api/internal/reset", { method: "POST" });
    setResetting(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <a href="/api/internal/export" className="btn-secondary">
        Download data
      </a>
      <button
        type="button"
        onClick={handleReset}
        disabled={resetting}
        className="btn-secondary disabled:opacity-50"
      >
        {resetting ? "Resetting…" : "Reset data"}
      </button>
    </div>
  );
}
