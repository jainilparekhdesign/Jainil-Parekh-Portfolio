"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/internal/logout", { method: "POST" });
    router.replace("/internal/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleLogout} className="btn-secondary">
      Log out
    </button>
  );
}
