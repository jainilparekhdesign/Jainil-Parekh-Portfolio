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
          <SectionLabel>Academic project · Mobile design · 8 min read</SectionLabel>
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
          <div className="relative mx-auto flex w-full max-w-[440px] items-end justify-center gap-3 sm:gap-4">
            <img
              src="/projects/read/splash.png"
              alt="Read app splash screen with the wordmark and the tagline “One page. At a time.”"
              className="w-[34%] max-w-[160px] -rotate-6 rounded-[26px] shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
            />
            <img
              src="/projects/read/dashboard.png"
              alt="Read app home screen showing a 6-day streak, 500 pages read, today's reading goal, and rewards progress"
              className="relative z-[1] w-[54%] max-w-[240px] rounded-[26px] shadow-[0_20px_48px_rgba(0,0,0,0.22)]"
            />
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
                <div className="flex flex-wrap gap-2">
                  {["1", "5", "10", "15", "30", "60"].map((m) => (
                    <span
                      key={m}
                      className={`font-geist-mono rounded-lg px-2.5 py-1.5 text-[0.8125em] ${
                        m === "10"
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
                    10 min
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
                      6
                    </span>
                  </div>
                  <p className="font-geist mt-2 text-[0.8125em] text-body-text">
                    Day streak
                  </p>
                </div>
                <div className="mt-3 rounded-xl bg-blue/10 px-4 py-3">
                  <p className="font-geist text-[0.8125em] text-blue">
                    Badge unlocked
                  </p>
                  <p className="font-geist text-[0.8125em] text-blue">
                    Indiana Jones · 200 pts
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
          <SectionLabel>Usability findings</SectionLabel>
          <SectionHeading>
            What testing surfaced that research alone wouldn&rsquo;t have.
          </SectionHeading>
          <div className="mt-10">
            <InsightItem
              number="01"
              title="The features that mattered most were already invisible."
              description={
                'The reading timer, the current book, and the daily goal all existed in the prototype — participants simply never noticed them. "It also has a timer, so I get to know I reached my goal, but I had to ask," one participant said. The fix wasn’t new features. It was surfacing what had already shipped.'
              }
            />
            <InsightItem
              number="02"
              title="Settings hid behind Rewards, and no one found their way back."
              description={
                'Updating a daily goal meant guessing it lived inside the Rewards tab. "I went to rewards to see if there were different ways to go for my rewards… that opened to Settings," one participant said — flagged as a real open issue for the next round, not one fixed in this pass.'
              }
            />
            <InsightItem
              number="03"
              title="Confidence and task success aren't the same signal."
              description="Participants rated themselves 4-5 out of 5 on tasks they only partially completed. Self-reported ease has to be triangulated against what people actually did, not just what they say they felt."
            />
          </div>

          <div className="mt-10 rounded-2xl bg-[var(--rust-wash)] p-8 sm:p-10">
            <p className="font-geist-mono text-[0.8125em] text-body-text">
              From the usability study
            </p>
            <p className="font-newsreader mt-4 text-[1.375em] leading-[1.4] text-ink dark:text-[#f2f2f0]">
              &ldquo;I went to rewards to see if there were different ways to
              go for my rewards&hellip; that opened to Settings.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="font-geist-mono flex h-9 w-9 items-center justify-center rounded-full bg-rust text-[0.8125em] text-white">
                P1
              </span>
              <div>
                <p className="font-geist text-[0.9375em] font-semibold text-ink dark:text-[#f2f2f0]">
                  Participant · Usability study
                </p>
                <p className="font-geist text-[0.8125em] text-body-text">
                  5-participant moderated study, April 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {divider}

        <IterationBlock
          number="01 · Modify"
          title="The reading timer wasn't doing its job."
          description="The timer is the clearest live signal that a session is being tracked, but it sat small and bottom-anchored. Participants didn't notice it mid-session and didn't trust their progress was being recorded."
          changeCaption="Moved the timer to the top of the reading screen, paired it with the book title and chapter, and wrapped it in a progress ring so the in-progress state is impossible to miss."
          before={
            <img
              src="/projects/read/scamper-modify-before.png"
              alt="Before: reading screen with a small timer pill in the bottom-right corner"
              className="w-full max-w-[200px] rounded-2xl"
            />
          }
          after={
            <img
              src="/projects/read/scamper-modify-after.png"
              alt="After: reading screen with the timer moved to the top next to the book title and chapter"
              className="w-full max-w-[200px] rounded-2xl"
            />
          }
        />

        {divider}

        <IterationBlock
          number="02 · Adapt"
          title="The home screen didn't say what you were reading."
          description="The hero card on Home is the first thing every visit shows, but it only displayed the daily goal — not which book was in progress. Participants said this would confuse them if they were reading more than one book at a time."
          changeCaption="Rebuilt the hero card to lead with the book itself — cover, title, chapter, and a day-by-day streak strip — alongside the daily goal."
          before={
            <img
              src="/projects/read/scamper-adapt-before.png"
              alt="Before: home screen hero card showing only the daily goal, with no book information"
              className="w-full max-w-[200px] rounded-2xl"
            />
          }
          after={
            <img
              src="/projects/read/scamper-adapt-after.png"
              alt="After: home screen hero card showing the book cover, title, chapter, and streak"
              className="w-full max-w-[200px] rounded-2xl"
            />
          }
        />

        {divider}

        <IterationBlock
          number="03 · Combine"
          title="Setting a daily goal meant typing a number into an empty field."
          description="Onboarding asked people to set a reading goal with no guidance on what a reasonable number even was — every participant had to guess."
          changeCaption="Combined preset pills (1–60 minutes) with the free-text field, so most people tap once while anyone with a different routine can still type their own value."
          before={
            <img
              src="/projects/read/scamper-combine-before.png"
              alt="Before: goal-setting screen with only an empty minutes field"
              className="w-full max-w-[200px] rounded-2xl"
            />
          }
          after={
            <img
              src="/projects/read/scamper-combine-after.png"
              alt="After: goal-setting screen with preset minute pills added above the field"
              className="w-full max-w-[200px] rounded-2xl"
            />
          }
        />

        {divider}

        <IterationBlock
          number="04 · Substitute"
          title="“Claim It” promised a prize and delivered a share sheet."
          description="The rewards screen's top CTA read “Claim It,” but tapping it opened a social-share flow, not a reward. Participants expected points, not a prompt to post."
          changeCaption="Renamed the CTA to “Share” and surfaced the points-for-sharing value inline, so the label matches exactly what happens next."
          before={
            <img
              src="/projects/read/scamper-substitute-before.png"
              alt="Before: rewards screen with a 'Claim It' button that actually opens a share sheet"
              className="w-full max-w-[200px] rounded-2xl"
            />
          }
          after={
            <img
              src="/projects/read/scamper-substitute-after.png"
              alt="After: rewards screen with the button relabeled to 'Share'"
              className="w-full max-w-[200px] rounded-2xl"
            />
          }
        />

        {divider}

        <section>
          <SectionLabel>Usability testing</SectionLabel>
          <SectionHeading>
            Validated with real readers, not assumptions.
          </SectionHeading>
          <p className="font-geist mt-4 max-w-[620px] text-[1em] text-body-text">
            5 moderated sessions over 2 weeks, run over Zoom against a Figma
            prototype. Tasks were structured around the Hook Model —
            Trigger, Action, Variable Reward, Investment — so testing
            covered the full habit loop, not just individual screens.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <UsabilityStat value="5" label="Participants" />
            <UsabilityStat value="76%" label="Task success rate" />
            <UsabilityStat value="85%" label="Avg. confidence & ease" />
            <UsabilityStat value="10" label="Core tasks" />
            <UsabilityStat value="60" label="Net Promoter Score" />
            <UsabilityStat
              value="28"
              label="Issues found & triaged by severity"
            />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>Biggest learning</SectionLabel>
          <p className="font-newsreader mt-3 max-w-[700px] text-[1.75em] leading-[1.3] text-ink dark:text-[#f2f2f0]">
            The most damaging issues weren&rsquo;t structural — they were
            one-word labels that mismatched what people expected. Words ship
            cheaper than rebuilds.
          </p>
        </section>
      </main>
    </PageShell>
  );
}
