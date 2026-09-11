"use client";

import styles from "./resume.module.css";

export default function DownloadButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={styles.downloadBtn}
    >
      Download PDF
    </button>
  );
}
