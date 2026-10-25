"use client";

import { trackDownload } from "@/components/EventTracker";

export default function DownloadButton() {
  return (
    <button
      type="button"
      onClick={() => {
        trackDownload("/resume");
        window.print();
      }}
      className="btn-primary"
    >
      Download PDF
    </button>
  );
}
