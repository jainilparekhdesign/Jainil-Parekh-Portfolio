"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CampaignGenerator() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim()) return;

    setLoading(true);
    setError("");
    setCopied(false);

    const res = await fetch("/api/internal/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyName }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Couldn't generate the link.");
      return;
    }

    const { campaign } = await res.json();
    setLink(`${window.location.origin}/?ref=${campaign.slug}`);
    setCompanyName("");
    router.refresh();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard failures
    }
  }

  return (
    <div className="card p-6">
      <p className="font-geist-mono text-eyebrow uppercase text-blue">
        Generate a tracked link
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-3">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company name, e.g. Acme Corp"
          className="font-geist min-w-[220px] flex-1 rounded-lg border border-toolbar-outline bg-bg px-3 py-2.5 text-ui text-ink outline-none focus-visible:border-blue"
        />
        <button
          type="submit"
          disabled={loading || !companyName.trim()}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate link"}
        </button>
      </form>

      {error && (
        <p className="font-geist mt-2 text-caption text-rust">{error}</p>
      )}

      {link && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-pill-bg px-4 py-3">
          <code className="font-geist-mono flex-1 break-all text-caption text-ink">
            {link}
          </code>
          <button type="button" onClick={handleCopy} className="btn-secondary">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
