import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Projects | Jainil Parekh",
};

function ProjectCard({
  href,
  thumbnail,
  thumbnailAlt,
  type,
  topics,
  title,
  description,
  readTime,
}: {
  href: string;
  thumbnail: string;
  thumbnailAlt: string;
  type: string;
  topics: string[];
  title: string;
  description: string;
  readTime: string;
}) {
  return (
    <Link
      href={href}
      className="card group flex flex-col overflow-hidden text-left no-underline"
    >
      <div className="aspect-[8/5] w-full overflow-hidden bg-pill-bg">
        <img
          src={thumbnail}
          alt={thumbnailAlt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-col items-start gap-1.5">
          <span className="tag">{type}</span>
          <span className="font-geist text-card-tag uppercase text-blue">
            {topics.join(" · ")}
          </span>
        </div>
        <h3 className="font-newsreader mt-3 text-card-title text-ink">
          {title}
        </h3>
        <p className="font-geist mt-1 text-body text-body-text">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-toolbar-outline pt-3">
          <span className="font-geist-mono text-caption text-graphite-70">
            {readTime}
          </span>
          <span className="inline-flex items-center gap-1.5 text-caption font-medium text-nav-active">
            Read case study
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="block transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
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
        <div className="grid w-full max-w-[1080px] gap-6 text-left lg:grid-cols-3">
          <ProjectCard
            href="/projects/read"
            thumbnail="/projects/thumbnails/read.png"
            thumbnailAlt="Read app home screen showing a reading streak, daily goal, and rewards progress"
            type="Academic"
            topics={["UX Design", "Interaction Design"]}
            title="Read — One page. At a time."
            description="A habit-forming reading app for first-time readers."
            readTime="8 min read"
          />
          <ProjectCard
            href="/projects/read-validation"
            thumbnail="/projects/thumbnails/read-validation.png"
            thumbnailAlt="Read app Coming Soon landing page used to validate demand"
            type="Academic"
            topics={["Design Business", "Lean Validation"]}
            title="Read — Risky Assumption Report"
            description="Validating demand, habit, and willingness to pay before writing code."
            readTime="6 min read"
          />
          <ProjectCard
            href="/projects/ai-research"
            thumbnail="/projects/thumbnails/ai-research.png"
            thumbnailAlt="An impossible-triangle illusion, representing the case study's theme"
            type="Academic"
            topics={["UX Research", "Methods"]}
            title="AI: An Escape from Illusion"
            description="What AI does to trust, efficiency, and understanding while studying."
            readTime="5 min read"
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
