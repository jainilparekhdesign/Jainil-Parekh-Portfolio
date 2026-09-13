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
    <Link href={href} className="group flex flex-col text-left no-underline">
      <div className="aspect-[8/5] w-full overflow-hidden rounded-xl bg-pill-bg">
        <img
          src={thumbnail}
          alt={thumbnailAlt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col pt-4">
        <span className="font-geist text-card-tag uppercase text-blue">
          {type} · {topics.join(" · ")}
        </span>
        <h3 className="font-newsreader mt-2 min-h-[60px] text-card-title text-ink transition-colors group-hover:text-nav-active">
          {title}
        </h3>
        <p className="font-geist mt-1 min-h-[52px] text-body text-body-text">
          {description}
        </p>
        <p className="font-geist-mono mt-3 text-caption text-graphite-70">
          {readTime}
        </p>
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
        <div className="grid w-full max-w-[1080px] gap-8 text-left lg:grid-cols-3">
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
