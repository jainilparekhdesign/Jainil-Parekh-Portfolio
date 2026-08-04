import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Projects — Coming Soon | Jainil Parekh",
};

export default function ProjectsComingSoon() {
  return (
    <PageShell active="projects">
      <main
        id="hero"
        className="relative z-[2] flex flex-col items-center text-center px-6 pt-[150px] font-newsreader"
      >
        <p className="font-geist m-0 mb-5 text-[0.875em] font-medium uppercase tracking-[0.12em] text-blue">
          Projects
        </p>
        <h1 className="m-0 mb-6 text-[3.5em] italic leading-[1.1] text-black max-[640px]:text-[2.25em] dark:text-[#f2f2f0]">
          Coming Soon
        </h1>
        <p className="m-0 mb-10 max-w-[620px] text-[1.375em] leading-[1.5455] text-body-text max-[640px]:text-[1.125em] max-[640px]:leading-[1.5556]">
          I&rsquo;m putting together case studies on the systems I&rsquo;ve
          redesigned — the trust drop-offs, activation loops, and retention
          gaps I&rsquo;ve traced and fixed. Check back shortly.
        </p>
        <Link
          href="/"
          className="font-geist inline-flex items-center gap-2 border-b border-blue pb-0.5 text-[1em] font-medium text-nav-active no-underline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="block">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </Link>
      </main>
    </PageShell>
  );
}
