"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "analytics_session_id";
const CAMPAIGN_KEY = "analytics_campaign";

function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

function getCampaign(): string | undefined {
  try {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) {
      sessionStorage.setItem(CAMPAIGN_KEY, ref);
      return ref;
    }
    return sessionStorage.getItem(CAMPAIGN_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

function send(type: string, path: string, extra?: Record<string, unknown>) {
  const payload = JSON.stringify({
    type,
    path,
    sessionId: getSessionId(),
    campaign: getCampaign(),
    ...extra,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/track",
      new Blob([payload], { type: "application/json" }),
    );
  } else {
    fetch("/api/track", { method: "POST", body: payload, keepalive: true });
  }
}

export function trackDownload(path: string) {
  send("download_click", path);
}

export default function EventTracker() {
  const pathname = usePathname();
  const startRef = useRef(0);
  const pathRef = useRef(pathname);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/internal")) return;

    send("pageview", pathname, {
      referrer: document.referrer || undefined,
    });
    startRef.current = Date.now();
    pathRef.current = pathname;

    function flushDuration() {
      const elapsed = Date.now() - startRef.current;
      if (elapsed > 500 && pathRef.current) {
        send("duration", pathRef.current, { durationMs: elapsed });
      }
    }

    function handleVisibility() {
      if (document.visibilityState === "hidden") flushDuration();
    }

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", flushDuration);

    return () => {
      flushDuration();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", flushDuration);
    };
  }, [pathname]);

  return null;
}
