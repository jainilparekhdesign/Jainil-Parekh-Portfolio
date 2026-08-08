import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PhoneMockup from "@/components/PhoneMockup";

export const metadata: Metadata = {
  title: "Read — Case Study | Jainil Parekh",
};

function RoleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="block">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="block">
      <path d="M6.66667 29.3333H25.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66667 2.66667H25.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22.6667 29.3333V23.7707C22.6665 23.0635 22.3855 22.3853 21.8853 21.8853L16 16L10.1147 21.8853C9.61453 22.3853 9.33348 23.0635 9.33333 23.7707V29.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.33333 2.66667V8.22933C9.33348 8.93652 9.61453 9.61469 10.1147 10.1147L16 16L21.8853 10.1147C22.3855 9.61469 22.6665 8.93652 22.6667 8.22933V2.66667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="block">
      <path d="M13.3333 4H10.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.0093 6.67733L25.3253 11.992" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.6667 20V25.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28.232 9.084C28.9045 8.37269 29.2731 7.42717 29.2594 6.44839C29.2457 5.46961 28.8509 4.53474 28.1588 3.84249C27.4667 3.15023 26.532 2.75516 25.5532 2.74126C24.5744 2.72735 23.6288 3.09569 22.9173 3.768L5.12267 21.5667C4.81309 21.8753 4.58415 22.2554 4.456 22.6733L2.69467 28.476C2.66021 28.5913 2.6576 28.7138 2.68713 28.8305C2.71667 28.9471 2.77723 29.0536 2.86239 29.1387C2.94756 29.2237 3.05416 29.2841 3.17088 29.3134C3.2876 29.3428 3.41008 29.34 3.52533 29.3053L9.32933 27.5453C9.74689 27.4183 10.1269 27.1908 10.436 26.8827L28.232 9.084Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29.3333 22.6667H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.33333 6.66667V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 9.33333H2.66667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2.66667V5.33333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-ink dark:text-[#f2f2f0]">
        <span className="text-blue">{icon}</span>
        <span className="font-geist text-[1em]">{label}</span>
      </div>
      <p className="font-geist ml-8 text-[0.875em] text-body-text">{value}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-geist-mono text-[2.25em] font-semibold text-blue">
        {value}
      </p>
      <p className="font-geist-mono mt-2 max-w-[240px] text-[1.125em] text-ink dark:text-[#f2f2f0]">
        {label}
      </p>
    </div>
  );
}

function Feature({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[253px]">
      <p className="font-geist-mono text-[2.25em] font-semibold text-blue">
        {number}
      </p>
      <p className="font-geist-mono mt-2 text-[1.125em] font-bold text-ink dark:text-[#f2f2f0]">
        {title}
      </p>
      <p className="font-geist-mono mt-2 text-[1.125em] text-ink dark:text-[#f2f2f0]">
        {description}
      </p>
    </div>
  );
}

export default function ReadCaseStudy() {
  return (
    <PageShell active="projects" showScrollIndicator={false}>
      <main
        id="hero"
        className="font-geist relative z-[2] pt-12 pb-24 pl-[clamp(24px,8vw,120px)] pr-[clamp(24px,8vw,120px)] xl:pr-[210px]"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[1em] text-ink no-underline transition-colors hover:text-nav-active dark:text-[#f2f2f0] dark:hover:text-nav-active"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="block">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All Projects
        </Link>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <div className="max-w-[620px]">
            <div className="inline-block rounded-2xl bg-blue/10 px-3 py-2 text-[1em] text-blue">
              ACADEMIC PROJECT . MOBILE DESIGN
            </div>

            <h1 className="font-newsreader mt-6 text-[2.75em] leading-[1.1] text-ink sm:text-[3.75em] dark:text-[#f2f2f0]">
              <span className="text-blue">Read</span> One page. At a time.
            </h1>

            <p className="mt-6 max-w-[544px] text-[1.375em] leading-[1.4] text-ink dark:text-[#f2f2f0]">
              A habit-forming reading app built for first-time readers
              designed around{" "}
              <span className="text-blue">
                small daily goals, visible progress, and earned rewards.
              </span>
            </p>

            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              <MetaItem icon={<RoleIcon />} label="Role" value="End-to-end UX Designer" />
              <MetaItem icon={<TimelineIcon />} label="Timeline" value="16 Weeks" />
              <MetaItem icon={<ToolsIcon />} label="Tools" value="Figma. Miro. Claude. Lovable" />
            </div>
          </div>

          <div className="flex justify-center gap-6 lg:justify-end">
            <PhoneMockup
              screenshotSrc="/projects/read/hero-screen-1.jpg"
              alt="Read app splash screen with the Read wordmark"
              className="w-[150px] sm:w-[190px] lg:w-[210px]"
            />
            <PhoneMockup
              screenshotSrc="/projects/read/hero-screen-2.jpg"
              alt="Read app home screen showing streak, pages read, and today's reading goal"
              className="w-[150px] sm:w-[190px] lg:mt-10 lg:w-[210px]"
            />
          </div>
        </div>

        <hr className="my-20 border-t border-toolbar-outline" />

        <section>
          <p className="font-newsreader text-[1.5em] text-blue">The Gap</p>
          <h2 className="font-geist mt-4 max-w-[615px] text-[1.75em] font-semibold text-ink dark:text-[#f2f2f0]">
            The data shows a quiet crisis of unread books.
          </h2>
          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            <Stat value="63%" label="of adults want to read more than they currently do" />
            <Stat value="29%" label="of started books are abandoned before completion" />
            <Stat value="12" label="Average books per year and declining" />
            <Stat value="63%" label="of readers feel guilty about unfinished books" />
          </div>
        </section>

        <hr className="my-20 border-t border-toolbar-outline" />

        <section>
          <p className="font-newsreader text-[1.5em] text-blue">The Solution</p>
          <h2 className="font-geist mt-4 max-w-[681px] text-[1.75em] font-semibold text-ink dark:text-[#f2f2f0]">
            Don&rsquo;t sell them books. Help them become readers
          </h2>
          <p className="font-geist-mono mt-6 max-w-[1058px] text-[1.25em] text-ink dark:text-[#f2f2f0]">
            Three core experiences across the daily reading loop, each making
            progress visible at a different scale.
          </p>

          <div className="mt-16 grid gap-12 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16">
            <div className="flex flex-col gap-14">
              <Feature
                number="01"
                title="Small target goals"
                description="Daily target from 1 min to 60. Calibrated to the users pace"
              />
              <Feature
                number="02"
                title="Daily Stats"
                description="Invisible progress made visible- Minutes,Pace, pages."
              />
              <Feature
                number="03"
                title="Rewards & Growth"
                description="Streaks, Badges and curated rewards over time"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
              <PhoneMockup
                screenshotSrc="/projects/read/hero-screen-2.jpg"
                alt="Read app home screen with today's goal and rewards progress"
                className="w-[180px] sm:w-[200px]"
              />
              <PhoneMockup
                screenshotSrc="/projects/read/hero-screen-2.jpg"
                alt="Read app home screen with today's goal and rewards progress"
                className="w-[180px] sm:w-[200px]"
              />
              <PhoneMockup
                screenshotSrc="/projects/read/hero-screen-2.jpg"
                alt="Read app home screen with today's goal and rewards progress"
                className="w-[180px] sm:w-[200px]"
              />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
