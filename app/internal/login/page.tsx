"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/internal/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Incorrect password.");
      return;
    }

    const next = searchParams.get("next") || "/internal";
    router.replace(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="card w-full max-w-[360px] p-8">
      <p className="font-geist-mono text-eyebrow uppercase text-blue">
        Internal
      </p>
      <h1 className="font-newsreader mt-2 text-subheading text-ink">
        Enter password
      </h1>
      <input
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="font-geist mt-6 w-full rounded-lg border border-toolbar-outline bg-bg px-3 py-2.5 text-ui text-ink outline-none focus-visible:border-blue"
      />
      {error && (
        <p className="font-geist mt-2 text-caption text-rust">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading || !password}
        className="btn-primary mt-5 w-full disabled:opacity-50"
      >
        {loading ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}

export default function InternalLoginPage() {
  return (
    <div className="font-geist flex min-h-screen items-center justify-center bg-bg px-6">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
