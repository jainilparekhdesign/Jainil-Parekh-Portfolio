"use client";

export default function DownloadButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-primary">
      Download PDF
    </button>
  );
}
