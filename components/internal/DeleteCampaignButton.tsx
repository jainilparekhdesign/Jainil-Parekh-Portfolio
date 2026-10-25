"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteCampaignButton({
  slug,
  companyName,
}: {
  slug: string;
  companyName: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete the tracked link for "${companyName}"? The link will stop working. This can't be undone.`,
    );
    if (!confirmed) return;

    setDeleting(true);
    await fetch(`/api/internal/campaigns/${slug}`, { method: "DELETE" });
    setDeleting(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="font-geist-mono text-caption text-rust underline-offset-2 hover:underline disabled:opacity-50"
    >
      {deleting ? "Deleting…" : "Delete"}
    </button>
  );
}
