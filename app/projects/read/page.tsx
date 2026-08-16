import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Read — Case Study | Jainil Parekh",
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-geist-mono text-[0.8125em] tracking-[0.04em] text-body-text uppercase">
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-newsreader mt-3 text-[1.75em] leading-[1.2] text-ink dark:text-[#f2f2f0] ${className}`}
    >
      {children}
    </h2>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-geist-mono text-[0.8125em] text-body-text">{label}</p>
      <p className="font-geist mt-1 text-[1em] text-ink dark:text-[#f2f2f0]">
        {value}
      </p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-geist-mono text-[2em] font-semibold text-rust">
        {value}
      </p>
      <p className="font-geist mt-2 max-w-[220px] text-[0.9375em] text-body-text">
        {label}
      </p>
    </div>
  );
}

function SolutionCard({
  step,
  eyebrow,
  title,
  children,
}: {
  step: number;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-toolbar-outline bg-bg p-5">
      <div className="flex items-center gap-2">
        <span className="font-geist-mono flex h-6 w-6 items-center justify-center rounded-full bg-blue text-[0.75em] text-white">
          {step}
        </span>
        <span className="font-geist-mono text-[0.75em] text-body-text">
          {eyebrow}
        </span>
      </div>
      <p className="font-newsreader mt-3 text-[1.125em] text-ink dark:text-[#f2f2f0]">
        {title}
      </p>
      <div className="mt-4">{children}</div>
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
    <div>
      <p className="font-geist-mono text-[1.5em] font-semibold text-blue">
        {number}
      </p>
      <p className="font-geist mt-2 text-[1.0625em] font-bold text-ink dark:text-[#f2f2f0]">
        {title}
      </p>
      <p className="font-geist mt-2 text-[0.9375em] text-body-text">
        {description}
      </p>
    </div>
  );
}

function StrategyCard({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-pill-bg p-6">
      <p className="font-geist-mono text-[0.8125em] text-blue">{label}</p>
      <p className="font-geist mt-2 text-[1.125em] font-semibold text-ink dark:text-[#f2f2f0]">
        {title}
      </p>
      <p className="font-geist mt-2 text-[0.9375em] text-body-text">
        {description}
      </p>
    </div>
  );
}

function InsightItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-2 border-t border-toolbar-outline py-8 first:border-t-0 sm:grid-cols-[64px_1fr] sm:gap-8">
      <p className="font-geist-mono text-[1.5em] font-semibold text-blue">
        {number}
      </p>
      <div>
        <p className="font-newsreader text-[1.25em] text-ink dark:text-[#f2f2f0]">
          {title}
        </p>
        <p className="font-geist mt-2 max-w-[620px] text-[0.9375em] text-body-text">
          {description}
        </p>
      </div>
    </div>
  );
}

function WireframeCard({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-[140px] w-[160px] flex-col justify-center gap-2 rounded-2xl border border-toolbar-outline bg-bg p-4">
      {children}
    </div>
  );
}

function WireLine({ width = "100%" }: { width?: string }) {
  return (
    <div className="h-2 rounded-full bg-toolbar-outline" style={{ width }} />
  );
}

function IterationBlock({
  number,
  title,
  description,
  changeCaption,
  before,
  after,
}: {
  number: string;
  title: string;
  description: string;
  changeCaption: string;
  before: ReactNode;
  after: ReactNode;
}) {
  return (
    <section>
      <SectionLabel>Iteration {number}</SectionLabel>
      <h3 className="font-newsreader mt-3 text-[1.5em] text-ink dark:text-[#f2f2f0]">
        {title}
      </h3>
      <p className="font-geist mt-3 max-w-[620px] text-[0.9375em] text-body-text">
        {description}
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="font-geist-mono text-[0.75em] text-body-text">
            Before
          </p>
          <div className="mt-2 flex justify-center rounded-2xl bg-pill-bg p-6">
            {before}
          </div>
        </div>
        <div>
          <p className="font-geist-mono text-[0.75em] text-blue">After</p>
          <div className="mt-2 flex justify-center rounded-2xl bg-pill-bg p-6">
            {after}
          </div>
        </div>
      </div>
      <p className="font-geist mt-4 text-[0.9375em] text-body-text">
        <span className="font-semibold text-ink dark:text-[#f2f2f0]">
          What changed —{" "}
        </span>
        {changeCaption}
      </p>
    </section>
  );
}

function UsabilityStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-pill-bg p-5">
      <p className="font-newsreader text-[1.75em] text-rust">
        {value}
      </p>
      <p className="font-geist mt-1 text-[0.8125em] text-body-text">
        {label}
      </p>
    </div>
  );
}

const divider = <hr className="my-20 border-t border-toolbar-outline" />;

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

        <div className="mt-12 max-w-[620px]">
          <SectionLabel>Academic project · Mobile design</SectionLabel>
          <h1 className="font-newsreader mt-3 text-[2.5em] leading-[1.1] text-ink sm:text-[3em] dark:text-[#f2f2f0]">
            Read — One page. At a time.
          </h1>
          <p className="font-geist mt-6 max-w-[544px] text-[1.125em] leading-[1.5] text-body-text">
            A habit-forming reading app for first-time readers — designed
            around small daily goals, visible progress, and earned rewards.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            <MetaItem label="Role" value="End-to-end UX" />
            <MetaItem label="Timeline" value="16 weeks" />
            <MetaItem label="Type" value="Academic project" />
            <MetaItem label="Tools" value="Figma · Miro · Lovable" />
          </div>
        </div>

        <div className="mt-12 rounded-[24px] bg-pill-bg p-8 sm:p-12">
          <div className="dark:bg-[#1e1f24] mx-auto w-full max-w-[340px] rounded-[28px] border border-toolbar-outline bg-bg p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between">
              <span className="font-geist text-[0.9375em] text-body-text">
                Good morning
              </span>
              <span className="font-geist rounded-full bg-blue/10 px-3 py-1 text-[0.8125em] text-blue">
                12-day streak
              </span>
            </div>
            <p className="font-newsreader mt-4 text-[1.5em] text-ink dark:text-[#f2f2f0]">
              Today&rsquo;s goal
            </p>
            <div className="mt-4 rounded-2xl bg-blue/10 px-5 py-4">
              <p className="font-geist-mono text-[0.8125em] text-blue">
                Read for
              </p>
              <p className="font-newsreader text-[2em] text-blue">15 min</p>
            </div>
            <div className="mt-5">
              <p className="font-geist-mono text-[0.8125em] text-body-text">
                Currently reading
              </p>
              <p className="font-geist mt-1 text-[1em] font-semibold text-ink dark:text-[#f2f2f0]">
                Atomic Habits
              </p>
              <p className="font-geist text-[0.875em] text-body-text">
                Page 42 of 320
              </p>
            </div>
            <div className="font-geist dark:text-[#17181c] mt-6 w-full rounded-full bg-ink py-3 text-center text-[0.9375em] font-medium text-bg">
              Start reading
            </div>
          </div>
        </div>

        {divider}

        <section>
          <SectionLabel>The gap</SectionLabel>
          <SectionHeading>
            The data shows a quiet crisis of unread books.
          </SectionHeading>
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-toolbar-outline pt-10 sm:grid-cols-4">
            <Stat
              value="63%"
              label="of adults want to read more than they currently do"
            />
            <Stat
              value="29%"
              label="of started books are abandoned before completion"
            />
            <Stat value="12" label="average books per year — and declining" />
            <Stat
              value="30%"
              label="of readers feel guilty about unfinished books"
            />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>The solution</SectionLabel>
          <SectionHeading className="max-w-[681px]">
            Don&rsquo;t sell them books. Help them become readers.
          </SectionHeading>
          <p className="font-geist mt-4 max-w-[620px] text-[1em] text-body-text">
            Three core experiences across the daily reading loop — each
            making progress visible at a different scale.
          </p>

          <div className="mt-10 rounded-[24px] bg-pill-bg p-6 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-3">
              <SolutionCard step={1} eyebrow="Set today" title="How long today?">
                <div className="flex gap-2">
                  {["5", "15", "30", "60"].map((m) => (
                    <span
                      key={m}
                      className={`font-geist-mono rounded-lg px-2.5 py-1.5 text-[0.8125em] ${
                        m === "15"
                          ? "bg-blue/15 text-blue"
                          : "bg-pill-bg text-body-text"
                      }`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-blue/10 px-4 py-3">
                  <p className="font-geist-mono text-[0.75em] text-blue">
                    Today
                  </p>
                  <p className="font-newsreader text-[1.25em] text-blue">
                    15 min
                  </p>
                </div>
              </SolutionCard>

              <SolutionCard
                step={2}
                eyebrow="Session complete"
                title="Nice work today."
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-geist-mono text-[0.75em] text-body-text">
                      Time
                    </p>
                    <p className="font-geist text-[1.125em] font-semibold text-ink dark:text-[#f2f2f0]">
                      18 min
                    </p>
                  </div>
                  <div>
                    <p className="font-geist-mono text-[0.75em] text-body-text">
                      Pace
                    </p>
                    <p className="font-geist text-[1.125em] font-semibold text-ink dark:text-[#f2f2f0]">
                      240 wpm
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-geist-mono text-[0.75em] text-body-text">
                    Pages read
                  </p>
                  <p className="font-geist text-[1.125em] font-semibold text-ink dark:text-[#f2f2f0]">
                    11 pages
                  </p>
                </div>
              </SolutionCard>

              <SolutionCard step={3} eyebrow="You earned" title="A new badge.">
                <div className="flex flex-col items-center py-1">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue/10">
                    <span className="font-geist-mono text-[1.25em] font-semibold text-blue">
                      12
                    </span>
                  </div>
                  <p className="font-geist mt-2 text-[0.8125em] text-body-text">
                    Day streak
                  </p>
                </div>
                <div className="mt-3 rounded-xl bg-blue/10 px-4 py-3">
                  <p className="font-geist text-[0.8125em] text-blue">
                    Reward unlocked
                  </p>
                  <p className="font-geist text-[0.8125em] text-blue">
                    15% off Penguin Classics
                  </p>
                </div>
              </SolutionCard>
            </div>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            <Feature
              number="01"
              title="Small target goals"
              description="Daily target from 1 min to 60. Calibrated to the user's pace."
            />
            <Feature
              number="02"
              title="Daily stats"
              description="Invisible progress made visible — minutes, pace, pages."
            />
            <Feature
              number="03"
              title="Rewards & growth"
              description="Streaks, badges, and curated rewards compound over time."
            />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>Design strategy</SectionLabel>
          <SectionHeading>
            Designing for habit formation, not consumption.
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <StrategyCard
              label="Trigger"
              title="What brings them back"
              description="Internal: the pull of an unfinished book. External: timed pushes and home-screen widgets."
            />
            <StrategyCard
              label="Action"
              title="The simplest behavior"
              description="Open the app, hit start, read. One button press to a daily session."
            />
            <StrategyCard
              label="Variable reward"
              title="Fulfilling, never the same"
              description="Stats, streak status, an occasional gift card or new badge — different feedback each time."
            />
            <StrategyCard
              label="Investment"
              title="Why the next session is richer"
              description="Streaks accumulate. Stats build a profile. Monthly summaries show the reader being formed."
            />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>Research insights</SectionLabel>
          <SectionHeading>
            Three findings that shaped every design decision.
          </SectionHeading>
          <div className="mt-10">
            <InsightItem
              number="01"
              title="Early readers don't fail at reading. They fail at starting."
              description="The most common pattern in interviews wasn't lack of interest — it was decision fatigue at the entry point. Which book, which app, what time of day. Removing those choices mattered more than any feature."
            />
            <InsightItem
              number="02"
              title="The subscription is a commitment trap."
              description={
                'Paid reading apps assume their users already identify as readers. For people still forming the habit, paying upfront creates a "what if I waste this money" anxiety that stops them before they start.'
              }
            />
            <InsightItem
              number="03"
              title="Reading is the rare habit with no visible evidence."
              description="Unlike exercise or journaling, reading produces nothing external. Without a system that surfaces minutes read or progress made, every session feels like nothing happened."
            />
          </div>

          <div className="mt-10 rounded-2xl bg-[var(--rust-wash)] p-8 sm:p-10">
            <p className="font-geist-mono text-[0.8125em] text-body-text">
              From the research
            </p>
            <p className="font-newsreader mt-4 text-[1.375em] leading-[1.4] text-ink dark:text-[#f2f2f0]">
              &ldquo;I keep starting new books because I feel guilty about the
              ones on my shelf. None of them actually feel like a reading
              habit — they feel like a list of things I haven&rsquo;t done
              yet.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="font-geist-mono flex h-9 w-9 items-center justify-center rounded-full bg-rust text-[0.8125em] text-white">
                MK
              </span>
              <div>
                <p className="font-geist text-[0.9375em] font-semibold text-ink dark:text-[#f2f2f0]">
                  Participant · Usability study
                </p>
                <p className="font-geist text-[0.8125em] text-body-text">
                  Aspiring reader, 28
                </p>
              </div>
            </div>
          </div>
        </section>

        {divider}

        <IterationBlock
          number="01"
          title="The timer wasn't doing its work."
          description="Participants didn't notice the reading timer during sessions — and the timer is the most important live signal that a habit is in progress."
          changeCaption="Repositioned and color-coded the timer so the in-progress reading state becomes a visible reward in itself."
          before={
            <WireframeCard>
              <div className="flex justify-end">
                <span className="font-geist-mono text-[0.6875em] text-body-text">
                  0:32
                </span>
              </div>
              <WireLine />
              <WireLine width="80%" />
              <WireLine width="60%" />
            </WireframeCard>
          }
          after={
            <WireframeCard>
              <div className="flex justify-start">
                <span className="font-geist-mono rounded-full bg-blue/15 px-2 py-0.5 text-[0.6875em] text-blue">
                  0:32
                </span>
              </div>
              <WireLine />
              <WireLine width="80%" />
              <WireLine width="60%" />
            </WireframeCard>
          }
        />

        {divider}

        <IterationBlock
          number="02"
          title="Rewards were invisible to the surfaces that needed them."
          description="The rewards system is core to the variable-reward loop, but participants weren't aware of what they could earn — weakening the loop before it could compound."
          changeCaption="Pulled rewards onto the home screen and post-session screen, so users see what's available before, during, and after each reading window."
          before={
            <WireframeCard>
              <WireLine />
              <WireLine width="70%" />
              <div className="mt-2 h-4 w-4 rounded bg-toolbar-outline" />
            </WireframeCard>
          }
          after={
            <WireframeCard>
              <div className="rounded-lg bg-blue/10 p-2">
                <p className="font-geist text-[0.625em] text-blue">
                  Reward ready
                </p>
                <p className="font-geist text-[0.625em] text-blue">
                  15% off books
                </p>
              </div>
              <div className="mt-1 flex gap-1">
                <div className="h-5 w-5 rounded bg-blue/20" />
                <div className="h-5 w-5 rounded bg-blue/20" />
                <div className="h-5 w-5 rounded bg-blue/20" />
              </div>
            </WireframeCard>
          }
        />

        {divider}

        <IterationBlock
          number="03"
          title="The hero card wasn't pulling its weight."
          description="The home screen's hero card needed to be the single most important glanceable surface — and it wasn't clearly communicating the user's current state."
          changeCaption="Redesigned the hero card to lead with the user's today-state — current goal, progress, and active streak — making the first screen of every visit a snapshot of the habit in progress."
          before={
            <WireframeCard>
              <WireLine />
              <WireLine width="90%" />
              <WireLine width="70%" />
            </WireframeCard>
          }
          after={
            <WireframeCard>
              <div className="rounded-lg bg-blue/10 p-2">
                <p className="font-geist-mono text-[0.625em] text-blue">
                  Today
                </p>
                <p className="font-newsreader text-[1em] text-blue">
                  15 min
                </p>
              </div>
              <WireLine width="60%" />
            </WireframeCard>
          }
        />

        {divider}

        <section>
          <SectionLabel>Usability testing</SectionLabel>
          <SectionHeading>
            Validated with real readers, not assumptions.
          </SectionHeading>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <UsabilityStat value="5" label="Participants" />
            <UsabilityStat value="76%" label="Task success" />
            <UsabilityStat value="85%" label="Confidence" />
            <UsabilityStat value="10" label="Core tasks" />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>Biggest learning</SectionLabel>
          <p className="font-newsreader mt-3 max-w-[700px] text-[1.75em] leading-[1.3] text-ink dark:text-[#f2f2f0]">
            The hardest part of building a reading habit isn&rsquo;t reading
            — it&rsquo;s removing every reason not to start.
          </p>
        </section>
      </main>
    </PageShell>
  );
}
