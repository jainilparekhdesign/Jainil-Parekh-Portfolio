import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "AI: An Escape from Illusion | Jainil Parekh",
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-geist text-eyebrow uppercase text-blue">
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
      className={`font-newsreader mt-3 text-section-heading text-ink ${className}`}
    >
      {children}
    </h2>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-geist-mono text-caption text-body-text">{label}</p>
      <p className="font-geist mt-1 text-ui text-ink">{value}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-5">
      <p className="font-geist-mono text-metric text-rust">{value}</p>
      <p className="font-geist mt-2 text-ui font-normal text-body-text">
        {label}
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
      <p className="font-geist-mono text-metric text-blue">{number}</p>
      <div>
        <p className="font-newsreader text-subheading text-ink">{title}</p>
        <p className="font-geist mt-2 max-w-[620px] text-ui font-normal text-body-text">
          {description}
        </p>
      </div>
    </div>
  );
}

function Quote({
  text,
  attribution,
}: {
  text: string;
  attribution: string;
}) {
  return (
    <div className="rounded-2xl bg-[var(--rust-wash)] p-8 sm:p-10">
      <p className="font-newsreader text-subheading leading-[1.4] text-ink">
        &ldquo;{text}&rdquo;
      </p>
      <p className="font-geist-mono mt-4 text-caption text-body-text">
        — {attribution}
      </p>
    </div>
  );
}

function RecCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card p-6">
      <p className="font-newsreader text-subheading text-ink">{title}</p>
      <p className="font-geist mt-2 text-ui font-normal text-body-text">
        {description}
      </p>
    </div>
  );
}

function MetricCard({
  icon,
  title,
  headline,
  detail,
  caption,
}: {
  icon: string;
  title: string;
  headline: string;
  detail: string;
  caption: string;
}) {
  return (
    <div className="card p-6">
      <p className="text-[1.5em]">{icon}</p>
      <p className="font-geist mt-3 text-ui font-semibold text-ink">
        {title}
      </p>
      <p className="font-newsreader mt-1 text-subheading text-blue">
        {headline}
      </p>
      <p className="font-geist mt-2 text-caption text-body-text">{detail}</p>
      <p className="font-geist mt-3 text-caption italic text-body-text">
        {caption}
      </p>
    </div>
  );
}

function TrendBars({
  title,
  series,
  phases,
  maxValue = 10,
}: {
  title: string;
  series: { label: string; color: "blue" | "rust"; values: number[] }[];
  phases: string[];
  maxValue?: number;
}) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <p className="font-geist text-ui font-semibold text-ink">{title}</p>
        {series.map((s) => (
          <span
            key={s.label}
            className="flex items-center gap-2 font-geist-mono text-caption text-body-text"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                s.color === "blue" ? "bg-blue" : "bg-rust"
              }`}
            />
            {s.label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(var(--cols),1fr)]" style={{ ["--cols" as string]: phases.length }}>
        {phases.map((phase, i) => (
          <div key={phase} className="flex flex-col items-center gap-2">
            <div className="flex h-[140px] items-end gap-1.5">
              {series.map((s) => (
                <div
                  key={s.label}
                  className="flex w-6 flex-col items-center justify-end gap-1"
                >
                  <span className="font-geist-mono text-[0.6875em] text-body-text">
                    {s.values[i]}
                  </span>
                  <div
                    className={`w-full rounded-t-sm ${
                      s.color === "blue" ? "bg-blue" : "bg-rust"
                    }`}
                    style={{
                      height: `${(s.values[i] / maxValue) * 100}px`,
                      opacity: s.color === "blue" ? 0.85 : 0.85,
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="font-geist-mono text-center text-[0.6875em] leading-tight text-body-text">
              {phase}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const divider = <hr className="my-20 border-t border-toolbar-outline" />;

export default function AIResearchCaseStudy() {
  return (
    <PageShell active="projects" showScrollIndicator={false}>
      <main
        id="hero"
        className="font-geist relative z-[2] pt-12 pb-24 pl-[clamp(24px,8vw,120px)] pr-[clamp(24px,8vw,120px)] xl:pr-[210px]"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-ui font-normal text-ink no-underline transition-colors hover:text-nav-active"
        >
          <svg
            width="24"
            height="24"
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
          All Projects
        </Link>

        <div className="mt-12 max-w-[620px]">
          <SectionLabel>Research · UX methods · 5 min read</SectionLabel>
          <h1 className="font-newsreader mt-3 text-case-cover text-ink">
            AI: An Escape from Illusion
          </h1>
          <p className="font-geist mt-6 max-w-[544px] text-lede text-body-text">
            A UX research study on trust, efficiency, and understanding —
            what happens to learning when AI makes studying feel effortless.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            <MetaItem label="Role" value="UX Researcher" />
            <MetaItem label="Method" value="1:1 interview" />
            <MetaItem label="Type" value="Academic research" />
            <MetaItem label="Focus" value="Trust · Efficiency" />
          </div>
        </div>

        {divider}

        <section>
          <SectionLabel>User persona</SectionLabel>
          <SectionHeading>Meet Ben.</SectionHeading>
          <div className="mt-8 grid gap-8 sm:grid-cols-[200px_1fr] sm:items-center">
            <div className="flex h-[160px] w-[160px] items-center justify-center rounded-full bg-blue/10">
              <span className="font-newsreader text-[3em] text-blue">B</span>
            </div>
            <div>
              <p className="font-geist text-ui font-semibold text-ink">
                Graduate student — International Relations &amp; Law
              </p>
              <p className="font-geist mt-2 max-w-[560px] text-ui font-normal text-body-text">
                An ambitious learner searching for clarity in complexity.
                Ben&rsquo;s coursework runs 80–120 pages of reading a week,
                with heavy conceptual loads and a real need for precise
                understanding — exactly the conditions where AI promises the
                most help.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Quote
              text="AI made studying fast.. but it made me question my understanding"
              attribution="Ben"
            />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>Habits &amp; frustrations</SectionLabel>
          <SectionHeading>
            A full AI toolkit — and a full list of ways it fails him.
          </SectionHeading>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-geist-mono text-caption text-blue uppercase tracking-[0.04em]">
                How Ben uses AI
              </p>
              <ul className="font-geist mt-4 flex flex-col gap-3 text-ui font-normal text-body-text">
                <li>NotebookLM for structured summaries</li>
                <li>ChatGPT for clarifications</li>
                <li>Perplexity for verified citations</li>
                <li>AI-generated study plans</li>
              </ul>
            </div>
            <div>
              <p className="font-geist-mono text-caption text-rust uppercase tracking-[0.04em]">
                Where AI fails him
              </p>
              <ul className="font-geist mt-4 flex flex-col gap-3 text-ui font-normal text-body-text">
                <li>Wrong interpretations</li>
                <li>Hallucinated examples</li>
                <li>Missing required angles</li>
                <li>Verification burden</li>
                <li>Shallow explanations</li>
              </ul>
            </div>
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>Setting</SectionLabel>
          <SectionHeading>Before AI: learning was slow, but deep.</SectionHeading>
          <p className="font-geist mt-4 max-w-[620px] text-body text-body-text">
            Ben&rsquo;s work was extremely text-heavy — books, articles,
            reports. He spent hours synthesizing them by hand. Slow, but the
            understanding stuck.
          </p>
          <div className="mt-8">
            <Quote
              text="My work was extremely text-heavy — books, articles, reports. I spent hours synthesizing them."
              attribution="Ben"
            />
          </div>
          <div className="mt-10 rounded-2xl bg-pill-bg p-8 sm:p-10">
            <p className="font-geist-mono text-caption uppercase tracking-[0.04em] text-blue">
              The real challenge
            </p>
            <p className="font-newsreader mt-3 text-subheading text-ink">
              Processing, not the content.
            </p>
            <ul className="font-geist mt-4 grid gap-2 text-ui font-normal text-body-text sm:grid-cols-2">
              <li>Synthesizing multiple sources</li>
              <li>Limited time for deeper reflection</li>
              <li>Cognitive fatigue</li>
              <li>FOMO of missing a key detail</li>
            </ul>
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>What changed</SectionLabel>
          <SectionHeading>
            Efficiency rose. Engagement — and understanding — fell.
          </SectionHeading>
          <div className="mt-10">
            <InsightItem
              number="01"
              title="Mental effort dropped fast, then had to be earned back."
              description="Self-reported mental effort fell from a 9 (before AI) to a 4 during over-reliance, bottoming out at 3.5 during an engagement dip — before climbing back to 5.5 once Ben deliberately rebalanced his usage."
            />
            <InsightItem
              number="02"
              title="AI made studying easier, but learning weaker."
              description={
                '"I wasn’t reading, I was just skimming summaries," Ben said. Fluency with the material came from the AI’s explanation, not from his own processing of the source.'
              }
            />
            <InsightItem
              number="03"
              title="The hidden cost was verification time, not reading time."
              description="Students re-check everything AI gives out. Time saved in reading became time lost in verifying — and trust in the tool fluctuated session to session rather than settling."
            />
          </div>
          <div className="mt-10">
            <TrendBars
              title="Mental effort across AI adoption phases"
              phases={[
                "Before AI",
                "First use",
                "Over-reliance",
                "Engagement dip",
                "Balanced",
              ]}
              series={[
                { label: "Mental effort", color: "rust", values: [9, 6, 4, 3.5, 5.5] },
              ]}
            />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>By the numbers</SectionLabel>
          <SectionHeading>
            The adoption is universal. So is the doubt.
          </SectionHeading>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value="92%" label="use AI regularly for academic work" />
            <Stat value="75%" label="reduced study time — without deepening learning" />
            <Stat value="83%" label="worry about AI accuracy" />
            <Stat value="58%" label="fear losing critical thinking skills" />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>The aha moment</SectionLabel>
          <SectionHeading>
            AI wasn&rsquo;t helping him think faster. It was helping him
            think later.
          </SectionHeading>
          <p className="font-geist mt-4 max-w-[620px] text-body text-body-text">
            Even when AI made work quicker, Ben consistently reported the
            same pattern: revising faster, but understanding less; feeling
            productive, but unable to explain the content afterward;
            depending on AI more than he realized. The real problem
            wasn&rsquo;t time pressure — it was a hidden erosion of
            understanding.
          </p>
          <div className="mt-8">
            <TrendBars
              title="Efficiency vs. understanding across AI adoption phases"
              maxValue={10}
              phases={[
                "Before AI",
                "First use",
                "Over-reliance",
                "Aha moment",
                "Balanced use",
              ]}
              series={[
                { label: "AI efficiency", color: "blue", values: [4, 7, 9, 9, 7] },
                { label: "Understanding", color: "rust", values: [8, 6, 5, 3, 6] },
              ]}
            />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>What the research revealed</SectionLabel>
          <SectionHeading className="max-w-[620px]">
            Fluency isn&rsquo;t mastery.
          </SectionHeading>
          <ul className="font-geist mt-6 grid gap-3 text-ui font-normal text-body-text sm:grid-cols-2">
            <li>AI hides its reasoning steps</li>
            <li>Fluency ≠ mastery</li>
            <li>Over-reliance leads to shallow understanding</li>
            <li>Students mistake speed for depth</li>
          </ul>
        </section>

        {divider}

        <section>
          <SectionLabel>Resolution</SectionLabel>
          <SectionHeading>
            AI that supports thinking, not replaces it.
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <RecCard
              title="Think First, Ask AI Second"
              description="Students jump to AI because it saves time — but that also turns it into a shortcut through reasoning. Have people draft their own take before the AI weighs in."
            />
            <RecCard
              title="Structured verification over blind trust"
              description="Across interviews, students said AI sounds confident even when wrong. Build in a deliberate check step, not just a chat window."
            />
            <RecCard
              title="Reveal the reasoning path"
              description="The biggest aha moment was realizing AI hides the work — it gives answers, not reasoning. Tools that show the path let students catch errors and actually learn from them."
            />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>Measuring healthy AI use</SectionLabel>
          <SectionHeading>
            What success looks like, if these recommendations work.
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <MetricCard
              icon="🧠"
              title="Think First → Ask AI Second"
              headline="70%+ tasks start with a student-generated draft"
              detail="Independent reasoning attempts ↑30% · AI-first prompting ↓40%"
              caption="Builds reasoning before using AI."
            />
            <MetricCard
              icon="🔎"
              title="Structured verification"
              headline="Verification actions ↑40%"
              detail="AI errors caught ↑25% · trust–accuracy deviation <10%"
              caption="Reduces blind acceptance of AI."
            />
            <MetricCard
              icon="🧭"
              title="Show reasoning path"
              headline="Reasoning mode use ≥60%"
              detail="Understanding score ↑20% · reasoning clarity ↑25%"
              caption="Makes AI's thinking visible."
            />
            <MetricCard
              icon="📖"
              title="Reinforce deep reading"
              headline="Deep reading completion ≥80%"
              detail="Shortcut substitution ↓40% · interpretation accuracy ↑25%"
              caption="Keeps comprehension rooted in the source text."
            />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>Biggest learning</SectionLabel>
          <p className="font-newsreader mt-3 max-w-[700px] text-section-heading text-ink">
            Students don&rsquo;t need AI that makes studying easy. They need
            AI that makes learning meaningful.
          </p>
          <div className="mt-10">
            <Quote
              text="AI can improve great lawyers, but it cannot replace them."
              attribution="Ralph Losey"
            />
          </div>
        </section>
      </main>
    </PageShell>
  );
}
