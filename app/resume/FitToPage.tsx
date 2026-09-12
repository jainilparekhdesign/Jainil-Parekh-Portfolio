"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Below this scale the text would be too small to read comfortably —
// fall back to normal page scrolling instead of shrinking further.
// (0.82 of a 14px body size is still ~11.5px; anything smaller stops
// being comfortably readable.)
const MIN_SCALE = 0.82;
const BOTTOM_MARGIN = 16;

export default function FitToPage({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    function fit() {
      const el = contentRef.current;
      if (!el) return;

      // transform: scale() doesn't affect layout box dimensions, so these
      // reads stay accurate regardless of any previously-applied scale —
      // transform-origin "top" also keeps the top edge stationary.
      const top = el.getBoundingClientRect().top;
      const available = window.innerHeight - top - BOTTOM_MARGIN;
      const natural = el.scrollHeight;
      const next = Math.min(1, available / natural);

      if (next < MIN_SCALE) {
        setScale(1);
        setBoxHeight(undefined);
      } else {
        setScale(next);
        setBoxHeight(natural * next);
      }
    }

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div style={{ height: boxHeight }} className="fit-to-page-box">
      <div
        ref={contentRef}
        style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
        className="fit-to-page-content"
      >
        {children}
      </div>
    </div>
  );
}
