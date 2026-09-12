"use client";

import { useEffect, useState } from "react";

const SIZE_STEPS = ["", "112.5%", "125%"];
const THEME_KEY = "theme";
const TEXT_SIZE_KEY = "textSize";

export default function Toolbar() {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Apply persisted preferences on mount. A lazy useState initializer would read
  // localStorage during the client hydration render (where `window` already exists),
  // producing different markup than the `window`-less server render and triggering a
  // hydration mismatch — so this intentionally defers to a post-mount effect instead.
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }

    const storedSizeIndex = Number(localStorage.getItem(TEXT_SIZE_KEY));
    if (storedSizeIndex > 0 && storedSizeIndex < SIZE_STEPS.length) {
      setSizeIndex(storedSizeIndex);
      document.documentElement.style.fontSize = SIZE_STEPS[storedSizeIndex];
    }
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function handleTextSize() {
    const nextIndex = (sizeIndex + 1) % SIZE_STEPS.length;
    setSizeIndex(nextIndex);
    document.documentElement.style.fontSize = SIZE_STEPS[nextIndex];
    localStorage.setItem(TEXT_SIZE_KEY, String(nextIndex));
  }

  function handleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  }

  function handleAudio() {
    if (!("speechSynthesis" in window)) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const heroText = document.getElementById("hero")?.innerText ?? "";
    const utterance = new SpeechSynthesisUtterance(heroText);
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="fixed z-[3] bottom-6 right-[clamp(24px,8vw,120px)] flex items-center gap-[22px] rounded-2xl bg-pill-bg px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] max-[640px]:px-4 max-[640px]:py-3 max-[640px]:gap-[14px] xl:top-1/2 xl:bottom-auto xl:right-[clamp(24px,8vw,98px)] xl:-translate-y-1/2 xl:flex-col xl:justify-center">
      <button
        type="button"
        onClick={handleTextSize}
        aria-label="Increase text size (accessibility)"
        title="Increase text size (accessibility)"
        className={`box-border flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-toolbar-outline bg-bg transition-transform active:scale-[0.92] ${
          sizeIndex !== 0 ? "text-toolbar-active" : "text-ink"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block h-full w-full"
        >
          <path d="m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16" />
          <path d="M15.697 14h5.606" />
          <path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" />
          <path d="M3.304 13h6.392" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleTheme}
        aria-label="Toggle dark mode"
        title="Toggle theme"
        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-md transition-[background,transform] hover:bg-blue/[0.08] active:scale-[0.92] ${
          isDark ? "bg-[var(--toolbar-active-bg)] text-toolbar-active" : "text-ink"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block h-full w-full"
        >
          <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleAudio}
        aria-label="Read page aloud"
        title="Listen"
        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-md transition-[background,transform] hover:bg-blue/[0.08] active:scale-[0.92] ${
          isSpeaking ? "bg-[var(--toolbar-active-bg)] text-toolbar-active" : "text-ink"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block h-full w-full"
        >
          <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
          <path d="M16 9a5 5 0 0 1 0 6" />
          <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
        </svg>
      </button>
    </div>
  );
}
