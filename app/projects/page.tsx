import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Projects | Jainil Parekh",
};

export default function ProjectsIndex() {
  return (
    <PageShell active="projects">
      <main
        id="hero"
        className="relative z-[2] flex flex-col items-center text-center px-6 pt-[150px] font-newsreader"
      >
        <p className="font-geist m-0 mb-5 text-eyebrow uppercase text-blue">
          Projects
        </p>
        <Link
          href="/projects/read"
          className="group font-geist mb-10 flex w-full max-w-[620px] items-center justify-between gap-4 rounded-2xl border border-toolbar-outline bg-blue/[0.04] px-6 py-5 text-left no-underline transition-colors hover:bg-blue/[0.08]"
        >
          <span className="flex flex-col gap-1">
            <span className="text-body font-medium text-ink">
              Read — One page. At a time.
            </span>
            <span className="text-[0.8125em] text-body-text">
              A habit-forming reading app for first-time readers.
            </span>
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="block shrink-0 text-nav-active transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
        <h1 className="m-0 mb-6 text-[3.5em] italic leading-[1.1] text-ink max-[640px]:text-[2.25em]">
          Coming Soon
        </h1>
        <p className="font-geist m-0 mb-10 max-w-[620px] text-lede text-body-text">
          I&rsquo;m putting together case studies on the systems I&rsquo;ve
          redesigned — the trust drop-offs, activation loops, and retention
          gaps I&rsquo;ve traced and fixed. Check back shortly.
        </p>
        <Link
          href="/"
          className="font-geist inline-flex items-center gap-2 border-b border-blue pb-0.5 text-ui text-nav-active no-underline"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="block"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Home
        </Link>
      </main>
    </PageShell>
  );
}
