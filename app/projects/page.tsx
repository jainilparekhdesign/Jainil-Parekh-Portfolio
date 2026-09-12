import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Projects | Jainil Parekh",
};

function ProjectCard({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group font-geist flex w-full items-center justify-between gap-4 rounded-2xl border border-toolbar-outline bg-blue/[0.04] px-6 py-5 text-left no-underline transition-colors hover:bg-blue/[0.08]"
    >
      <span className="flex flex-col gap-1">
        <span className="font-geist-mono text-caption uppercase tracking-[0.04em] text-blue">
          {eyebrow}
        </span>
        <span className="text-body font-medium text-ink">{title}</span>
        <span className="text-caption text-body-text">{description}</span>
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
  );
}

function BackArrow(): ReactNode {
  return (
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
  );
}

export default function ProjectsIndex() {
  return (
    <PageShell active="projects">
      <main
        id="hero"
        className="relative z-[2] flex flex-col items-center text-center px-6 pt-[150px] pb-24 font-newsreader"
      >
        <p className="font-geist m-0 mb-5 text-eyebrow uppercase text-blue">
          Projects
        </p>
        <h1 className="m-0 mb-6 max-w-[720px] text-case-cover text-ink">
          Case studies on the systems I&rsquo;ve redesigned.
        </h1>
        <p className="font-geist m-0 mb-12 max-w-[620px] text-lede text-body-text">
          Trust drop-offs, activation loops, retention gaps — traced,
          tested, and fixed.
        </p>
        <div className="flex w-full max-w-[620px] flex-col gap-4">
          <ProjectCard
            href="/projects/read"
            eyebrow="UX case study"
            title="Read — One page. At a time."
            description="A habit-forming reading app for first-time readers."
          />
          <ProjectCard
            href="/projects/read-validation"
            eyebrow="Design business"
            title="Read — Risky Assumption Report"
            description="Validating demand, habit, and willingness to pay before writing code."
          />
          <ProjectCard
            href="/projects/ai-research"
            eyebrow="Research · UX methods"
            title="AI: An Escape from Illusion"
            description="What AI does to trust, efficiency, and understanding while studying."
          />
        </div>
        <Link
          href="/"
          className="font-geist mt-12 inline-flex items-center gap-2 border-b border-blue pb-0.5 text-ui text-nav-active no-underline"
        >
          <BackArrow />
          Back to Home
        </Link>
      </main>
    </PageShell>
  );
}
