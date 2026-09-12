"use client";

import { useEffect, useState, type ReactNode } from "react";

const SIZE_STEPS = ["", "112.5%", "125%"];
const SIZE_LABELS = ["A", "A", "A"];
const SIZE_SCALE = [0.8, 1, 1.2];
const THEME_KEY = "theme";
const TEXT_SIZE_KEY = "textSize";
const CONTRAST_KEY = "contrast";
const MOTION_KEY = "motion";

function AccessibilityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-6 w-6"
    >
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-4 w-4"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-[18px] w-[18px]"
    >
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
    </svg>
  );
}

function ContrastIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-[18px] w-[18px]"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 18a6 6 0 0 0 0-12v12z" />
    </svg>
  );
}

function ZapOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-[18px] w-[18px]"
    >
      <path d="M10.768 5.111 13.44 2.44a1.5 1.5 0 0 1 2.474 1.561l-1.633 4.625" />
      <path d="m18.889 13.232.672-.672A1.5 1.5 0 0 0 18.5 10h-2.844" />
      <path d="m2 2 20 20" />
      <path d="m7.94 7.94-3.5 3.499A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l5.5-5.5" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-[18px] w-[18px]"
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
    </svg>
  );
}

function Switch({ checked }: { checked: boolean }) {
  return (
    <span
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-blue" : "bg-toolbar-outline"
      }`}
    >
      <span
        className={`absolute h-4 w-4 rounded-full bg-bg transition-transform ${
          checked ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      />
    </span>
  );
}

function ToggleRow({
  icon,
  label,
  checked,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-blue/[0.08]"
    >
      <span className="flex items-center gap-2.5 text-ui font-normal text-ink">
        {icon}
        {label}
      </span>
      <Switch checked={checked} />
    </button>
  );
}

export default function Toolbar() {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Apply persisted preferences on mount. A lazy useState initializer would read
  // localStorage/matchMedia during the client hydration render (where `window`
  // already exists), producing different markup than the `window`-less server
  // render and triggering a hydration mismatch — so this intentionally defers
  // to a post-mount effect instead.
  useEffect(() => {
    const root = document.documentElement;

    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
      root.classList.add("dark");
    }

    const storedSizeIndex = Number(localStorage.getItem(TEXT_SIZE_KEY));
    if (storedSizeIndex > 0 && storedSizeIndex < SIZE_STEPS.length) {
      setSizeIndex(storedSizeIndex);
      root.style.fontSize = SIZE_STEPS[storedSizeIndex];
    }

    const storedContrast = localStorage.getItem(CONTRAST_KEY);
    const contrastOn = storedContrast
      ? storedContrast === "high"
      : window.matchMedia("(prefers-contrast: more)").matches;
    setIsHighContrast(contrastOn);
    root.setAttribute("data-contrast", contrastOn ? "high" : "normal");

    const storedMotion = localStorage.getItem(MOTION_KEY);
    const reducedOn = storedMotion
      ? storedMotion === "reduced"
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(reducedOn);
    root.setAttribute("data-motion", reducedOn ? "reduced" : "normal");
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (!isPanelOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsPanelOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isPanelOpen]);

  function handleTextSize(nextIndex: number) {
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

  function handleContrast() {
    const next = !isHighContrast;
    setIsHighContrast(next);
    document.documentElement.setAttribute("data-contrast", next ? "high" : "normal");
    localStorage.setItem(CONTRAST_KEY, next ? "high" : "normal");
  }

  function handleMotion() {
    const next = !isReducedMotion;
    setIsReducedMotion(next);
    document.documentElement.setAttribute("data-motion", next ? "reduced" : "normal");
    localStorage.setItem(MOTION_KEY, next ? "reduced" : "normal");
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

  function handleReset() {
    localStorage.removeItem(THEME_KEY);
    localStorage.removeItem(TEXT_SIZE_KEY);
    localStorage.removeItem(CONTRAST_KEY);
    localStorage.removeItem(MOTION_KEY);

    const root = document.documentElement;

    setIsDark(false);
    root.classList.remove("dark");

    setSizeIndex(0);
    root.style.fontSize = "";

    const systemContrast = window.matchMedia("(prefers-contrast: more)").matches;
    setIsHighContrast(systemContrast);
    root.setAttribute("data-contrast", systemContrast ? "high" : "normal");

    const systemMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(systemMotion);
    root.setAttribute("data-motion", systemMotion ? "reduced" : "normal");
  }

  return (
    <div className="fixed z-[3] bottom-6 right-[clamp(24px,8vw,120px)] print:hidden">
      {isPanelOpen && (
        <div
          role="dialog"
          aria-label="Accessibility options"
          className="absolute right-full bottom-0 mr-3 w-[272px] rounded-2xl border border-toolbar-outline bg-pill-bg p-4 shadow-[0_12px_40px_rgba(0,0,0,0.14)]"
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="font-geist text-ui font-semibold text-ink">
              Accessibility
            </p>
            <button
              type="button"
              onClick={() => setIsPanelOpen(false)}
              aria-label="Close accessibility panel"
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-body-text transition-colors hover:bg-blue/[0.08] hover:text-ink"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-lg px-2 py-2">
            <span className="text-ui font-normal text-ink">Text size</span>
            <div className="flex gap-1">
              {SIZE_LABELS.map((label, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Text size ${i + 1} of ${SIZE_LABELS.length}`}
                  aria-pressed={sizeIndex === i}
                  onClick={() => handleTextSize(i)}
                  className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border font-geist transition-colors ${
                    sizeIndex === i
                      ? "border-blue bg-blue/10 text-blue"
                      : "border-toolbar-outline text-body-text hover:bg-blue/[0.08]"
                  }`}
                  style={{ fontSize: `${SIZE_SCALE[i]}em` }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <ToggleRow
            icon={<MoonIcon />}
            label="Dark mode"
            checked={isDark}
            onClick={handleTheme}
          />
          <ToggleRow
            icon={<ContrastIcon />}
            label="High contrast"
            checked={isHighContrast}
            onClick={handleContrast}
          />
          <ToggleRow
            icon={<ZapOffIcon />}
            label="Reduced motion"
            checked={isReducedMotion}
            onClick={handleMotion}
          />

          <button
            type="button"
            onClick={handleAudio}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-left text-ui font-normal text-ink transition-colors hover:bg-blue/[0.08]"
          >
            <VolumeIcon />
            {isSpeaking ? "Stop reading" : "Read page aloud"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="font-geist-mono mt-2 w-full cursor-pointer rounded-lg px-2 py-2 text-left text-caption text-body-text underline decoration-toolbar-outline underline-offset-2 transition-colors hover:text-nav-active"
          >
            Reset to system preferences
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsPanelOpen((open) => !open)}
        aria-expanded={isPanelOpen}
        aria-label="Accessibility options"
        title="Accessibility options"
        className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-toolbar-outline bg-pill-bg shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[background,transform] active:scale-[0.92] ${
          isPanelOpen ? "text-toolbar-active" : "text-ink hover:bg-blue/[0.08]"
        }`}
      >
        <AccessibilityIcon />
      </button>
    </div>
  );
}
