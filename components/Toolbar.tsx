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
<<<<<<< HEAD
    <div className="fixed z-[3] bottom-6 right-[clamp(24px,8vw,120px)] flex items-center gap-[22px] rounded-2xl bg-pill-bg px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] max-[640px]:px-4 max-[640px]:py-3 max-[640px]:gap-[14px] xl:top-1/2 xl:bottom-auto xl:right-[clamp(24px,8vw,98px)] xl:-translate-y-1/2 xl:flex-col xl:justify-center">
=======
    <div className="fixed z-[3] top-1/2 right-[clamp(24px,8vw,98px)] -translate-y-1/2 flex flex-col items-center justify-center gap-[22px] rounded-2xl bg-pill-bg px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] max-[640px]:px-4 max-[640px]:py-3 max-[640px]:gap-[14px]">
>>>>>>> 5f9b7a0b371f50a33f333de98dcae6bc698071a4
      <button
        type="button"
        onClick={handleTextSize}
        aria-label="Increase text size (accessibility)"
        title="Increase text size (accessibility)"
        className={`box-border flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-toolbar-outline bg-bg transition-transform active:scale-[0.92] ${
          sizeIndex !== 0 ? "text-toolbar-active" : "text-black dark:text-[#f2f2f0]"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="block h-full w-full">
          <path
            d="M15 16L17.536 8.672C17.6053 8.47151 17.7354 8.29762 17.9082 8.17454C18.081 8.05147 18.2879 7.98532 18.5 7.98532C18.7121 7.98532 18.919 8.05147 19.0918 8.17454C19.2646 8.29762 19.3947 8.47151 19.464 8.672L22 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15.697 14H21.303" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M2 16L6.039 6.31C6.07698 6.2189 6.14107 6.14109 6.22319 6.08635C6.30532 6.03161 6.4018 6.0024 6.5005 6.0024C6.5992 6.0024 6.69568 6.03161 6.77781 6.08635C6.85993 6.14109 6.92402 6.2189 6.962 6.31L11 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M3.304 13H9.696" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleTheme}
        aria-label="Toggle dark mode"
        title="Toggle theme"
        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-md transition-[background,transform] hover:bg-blue/[0.08] active:scale-[0.92] ${
          isDark ? "bg-[var(--toolbar-active-bg)] text-toolbar-active" : "text-black dark:text-[#f2f2f0]"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="block h-full w-full">
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12C18 10.4087 17.3679 8.88258 16.2426 7.75736C15.1174 6.63214 13.5913 6 12 6V18Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleAudio}
        aria-label="Read page aloud"
        title="Listen"
        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-md transition-[background,transform] hover:bg-blue/[0.08] active:scale-[0.92] ${
          isSpeaking ? "bg-[var(--toolbar-active-bg)] text-toolbar-active" : "text-black dark:text-[#f2f2f0]"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="block h-full w-full">
          <path
            d="M8.8 20V15.9L10.7 16.1C11.2531 16.0693 11.7766 15.8399 12.1742 15.4541C12.5717 15.0683 12.8167 14.552 12.864 14V8.3C12.8706 6.85934 12.3047 5.47506 11.2907 4.45167C10.2767 3.42829 8.89766 2.84963 7.457 2.843C6.01634 2.83637 4.63206 3.40231 3.60867 4.41632C2.58529 5.43033 2.00663 6.80934 2 8.25C2 11.05 2.656 11.304 3 12.8C3.23248 13.7035 3.24243 14.6498 3.029 15.558L2 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.8 17.8C21.2058 16.394 21.9958 14.4874 21.9964 12.4991C21.997 10.5109 21.208 8.60377 19.803 7.197"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 15C17.3272 14.6729 17.5863 14.2842 17.7622 13.8563C17.9382 13.4284 18.0277 12.9699 18.0253 12.5073C18.023 12.0446 17.929 11.5871 17.7487 11.161C17.5684 10.7349 17.3054 10.3488 16.975 10.025"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
