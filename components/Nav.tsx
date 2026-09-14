"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoMark from "./LogoMark";

type NavProps = {
  active: "home" | "projects" | "resume";
};

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-5 w-5"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
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
      className="block h-5 w-5"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function NavLink({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string;
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative no-underline transition-colors hover:text-nav-active ${
        isActive
          ? "font-medium text-nav-active after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-px after:bg-blue"
          : "font-normal text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Nav({ active }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  return (
    <nav className="relative z-20 flex items-center justify-between h-[88px] px-[clamp(24px,8vw,120px)] py-5 print:hidden">
      <div className="font-newsreader flex items-center gap-2 text-nav-wordmark whitespace-nowrap text-ink">
        <LogoMark className="h-10 w-auto text-blue" />
        <span className="max-[480px]:hidden">Jainil Parekh</span>
      </div>

      <div className="flex items-center gap-4 sm:gap-8">
        <div className="hidden items-center gap-12 text-ui whitespace-nowrap sm:flex">
          <NavLink href="/" isActive={active === "home"}>
            Home
          </NavLink>
          <NavLink href="/projects" isActive={active === "projects"}>
            Projects
          </NavLink>
          <NavLink href="/#about">About Me</NavLink>
          <NavLink href="/resume" isActive={active === "resume"}>
            Resume
          </NavLink>
        </div>

        <a
          href="mailto:jainilparekh.design@gmail.com"
          className="btn-primary shrink-0 whitespace-nowrap max-[380px]:px-3 max-[380px]:text-caption"
        >
          Get in touch
        </a>

        <div className="sm:hidden">
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-toolbar-outline bg-pill-bg text-ink"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {isMenuOpen && (
            <div
              role="dialog"
              aria-label="Site navigation"
              className="absolute right-[clamp(24px,8vw,120px)] top-[72px] w-[200px] rounded-2xl border border-toolbar-outline bg-pill-bg p-4 shadow-[0_12px_40px_rgba(0,0,0,0.14)]"
            >
              <div className="flex flex-col gap-4 text-ui">
                <NavLink
                  href="/"
                  isActive={active === "home"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  href="/projects"
                  isActive={active === "projects"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </NavLink>
                <NavLink
                  href="/resume"
                  isActive={active === "resume"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Resume
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
