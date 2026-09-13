import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Read — Risky Assumption Report | Jainil Parekh",
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

function AssumptionCard({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="card p-6">
      <div className="h-[3px] w-8 bg-blue" />
      <p className="font-geist-mono mt-3 text-metric text-blue">{number}</p>
      <p className="font-geist mt-2 text-ui font-normal text-body-text">
        {children}
      </p>
    </div>
  );
}

function TestCard({
  step,
  name,
  strategy,
  hypothesis,
  artifacts,
}: {
  step: string;
  name: string;
  strategy: string;
  hypothesis: string;
  artifacts?: { src: string; alt: string; caption: string }[];
}) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-toolbar-outline bg-pill-bg px-6 py-4">
        <p className="font-geist-mono text-caption text-blue">{step}</p>
        <p className="font-newsreader text-subheading text-ink">{name}</p>
      </div>
      <div className="grid gap-6 p-6 sm:grid-cols-2">
        <div>
          <p className="font-geist-mono text-caption uppercase tracking-[0.04em] text-body-text">
            Pretotyping strategy
          </p>
          <p className="font-geist mt-2 text-ui font-normal text-body-text">
            {strategy}
          </p>
        </div>
        <div>
          <p className="font-geist-mono text-caption uppercase tracking-[0.04em] text-rust">
            Hypothesis (XYZ)
          </p>
          <p className="font-geist mt-2 text-ui font-semibold text-ink">
            {hypothesis}
          </p>
        </div>
      </div>
      {artifacts && (
        <div className="border-t border-toolbar-outline bg-pill-bg px-6 py-6">
          <p className="font-geist-mono mb-4 text-caption uppercase tracking-[0.04em] text-body-text">
            Artifact
          </p>
          <div
            className={`grid gap-4 ${
              artifacts.length > 1 ? "sm:grid-cols-2" : ""
            } ${artifacts.length > 2 ? "lg:grid-cols-3" : ""}`}
          >
            {artifacts.map((a) => (
              <figure key={a.src} className="m-0">
                <img
                  src={a.src}
                  alt={a.alt}
                  className="w-full rounded-xl border border-toolbar-outline"
                />
                <figcaption className="font-geist-mono mt-2 text-center text-caption text-body-text">
                  {a.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-geist-mono text-metric text-rust">{value}</p>
      <p className="font-geist mt-1 text-caption text-body-text">{label}</p>
    </div>
  );
}

function ProvenBadge() {
  return (
    <span className="font-geist-mono inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-3 py-1 text-caption font-medium text-blue">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      Hypothesis proven
    </span>
  );
}

function ResultBlock({
  stats,
  insights,
}: {
  stats: ReactNode;
  insights: { title: string; description: string }[];
}) {
  return (
    <div className="mt-6 grid gap-8 rounded-2xl bg-pill-bg p-6 sm:grid-cols-[180px_1fr] sm:p-8">
      <div className="flex flex-col gap-4">
        {stats}
        <ProvenBadge />
      </div>
      <div className="flex flex-col gap-5">
        {insights.map((insight, i) => (
          <div key={insight.title} className="flex gap-4">
            <span className="font-geist-mono mt-0.5 text-ui text-blue">
              {i + 1}
            </span>
            <div>
              <p className="font-geist text-ui font-semibold text-ink">
                {insight.title}
              </p>
              <p className="font-geist mt-1 text-ui font-normal text-body-text">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const divider = <hr className="my-20 border-t border-toolbar-outline" />;

export default function ReadValidationCaseStudy() {
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
          <SectionLabel>
            Academic project · Design business · 6 min read
          </SectionLabel>
          <h1 className="font-newsreader mt-3 text-case-cover text-ink">
            Read — Risky Assumption Report
          </h1>
          <p className="font-geist mt-6 max-w-[544px] text-lede text-body-text">
            Validating demand, habit formation, and willingness to pay for
            Read — before writing a line of production code.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            <MetaItem label="Role" value="Lean validation" />
            <MetaItem label="Timeline" value="2.5 weeks testing" />
            <MetaItem label="Course" value="INDD-701 Design Business" />
            <MetaItem label="Tools" value="Lovable · Supabase · Sheets" />
          </div>
        </div>

        {divider}

        <section>
          <SectionLabel>Product recap</SectionLabel>
          <SectionHeading>Read: a reading habit tracker.</SectionHeading>
          <p className="font-geist mt-4 max-w-[620px] text-body text-body-text">
            Read helps casual readers build and keep a daily reading habit
            by turning short sessions into visible progress. Using the Hook
            Model (trigger → action → variable reward → investment), the app
            nudges users back each day through streaks, gentle reminders,
            and a clean, low-pressure reading experience.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="card p-5">
              <p className="font-geist-mono text-caption uppercase text-blue">
                Revenue
              </p>
              <p className="font-geist mt-1 text-ui font-normal text-body-text">
                Freemium ($2–5/mo) + publisher partnerships
              </p>
            </div>
            <div className="card p-5">
              <p className="font-geist-mono text-caption uppercase text-blue">
                Channels
              </p>
              <p className="font-geist mt-1 text-ui font-normal text-body-text">
                App stores, university partnerships, book communities
              </p>
            </div>
            <div className="card p-5">
              <p className="font-geist-mono text-caption uppercase text-blue">
                Key costs
              </p>
              <p className="font-geist mt-1 text-ui font-normal text-body-text">
                Development, hosting, marketing
              </p>
            </div>
            <div className="card p-5">
              <p className="font-geist-mono text-caption uppercase text-blue">
                Partners
              </p>
              <p className="font-geist mt-1 text-ui font-normal text-body-text">
                Publishers, universities, book influencers
              </p>
            </div>
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>What could kill this idea</SectionLabel>
          <SectionHeading>Three risky assumptions.</SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <AssumptionCard number="01">
              Users will actually use the app — if prospective readers are
              exposed to Read&rsquo;s value prop, they&rsquo;ll sign up.
            </AssumptionCard>
            <AssumptionCard number="02">
              Users will form a daily reading habit — new users will log
              reading sessions for 7 consecutive days within their first 30.
            </AssumptionCard>
            <AssumptionCard number="03">
              Users will commit to pay or pre-reserve — beyond a waitlist, a
              meaningful share will pledge or reserve a paid tier before the
              product exists.
            </AssumptionCard>
          </div>
          <p className="font-geist mt-6 max-w-[620px] text-ui font-normal text-body-text">
            All three landed in the same quadrant of the impact ×
            uncertainty matrix — high impact, high uncertainty — meaning all
            three needed testing before any product got built, not just the
            riskiest one.
          </p>
        </section>

        {divider}

        <section>
          <SectionLabel>From assumption to test</SectionLabel>
          <SectionHeading>Three pretotypes, three signals.</SectionHeading>
          <p className="font-geist mt-4 max-w-[620px] text-body text-body-text">
            Each assumption got its own pretotyping experiment — a
            classic Savoia-style approach: real signal, no product built.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            <TestCard
              step="Test 1"
              name="Fake Front Door"
              strategy="A Coming Soon landing page pitching Read, funneling visitors into a single low-friction waitlist signup capturing name, email, and reading interest. Shared organically for 2.5 weeks to measure raw demand — does anyone outside my immediate circle even want this?"
              hypothesis="If prospective customers are exposed to the product and the value it provides, they will sign up for the waitlist — a baseline demand signal."
              artifacts={[
                {
                  src: "/projects/read-validation/test1-landing.png",
                  alt: "Coming Soon landing page pitching Read with a 'Join the Waitlist' CTA",
                  caption: "Landing page",
                },
                {
                  src: "/projects/read-validation/test1-waitlist.png",
                  alt: "Waitlist signup form capturing name, email, and reading interest",
                  caption: "Waitlist form",
                },
                {
                  src: "/projects/read-validation/test1-features.png",
                  alt: "Features section listing flexible time, smart reminders, streak tracking, and read anything",
                  caption: "Features section",
                },
              ]}
            />
            <ResultBlock
              stats={
                <>
                  <ResultStat value="2.5 wks" label="Timeframe" />
                  <ResultStat value="10" label="Waitlist signups" />
                </>
              }
              insights={[
                {
                  title: "Fiction leads early demand (50% of signups).",
                  description:
                    "5 of 10 signups chose Fiction as their primary interest; Self Help was second. Next: lead v1 onboarding with fiction-first framing.",
                },
                {
                  title: "Two acquisition spikes point to one real channel.",
                  description:
                    "Signups clustered around network sharing and a fresh interactive prototype demo. Next: treat the prototype demo as a primary acquisition channel, not just a research tool.",
                },
              ]}
            />

            <TestCard
              step="Test 2"
              name="Mechanical Turk"
              strategy="A 7-Day Reading Challenge via a Google Form embedded on the landing page. Participants logged a daily check-in; I manually ran the loop — nudging, reviewing, encouraging — so the 'app' was me behind the scenes."
              hypothesis="At least 40% of new users will log a reading session for 7 consecutive days within their first 30 days."
              artifacts={[
                {
                  src: "/projects/read-validation/test2-challenge.png",
                  alt: "7-Day Reading Challenge CTA embedded on the landing page",
                  caption: "Challenge CTA · on landing page",
                },
                {
                  src: "/projects/read-validation/test2-sheet.png",
                  alt: "Google Sheet of daily check-in responses from two participants",
                  caption: "Daily check-in responses · Google Sheet",
                },
              ]}
            />
            <ResultBlock
              stats={
                <>
                  <ResultStat value="2" label="Participants" />
                  <ResultStat value="50%" label="Hit a perfect streak" />
                </>
              }
              insights={[
                {
                  title: "The habit loop works with only human support.",
                  description:
                    "9 of 10 sessions logged, 17-minute average. 50% hit a perfect consecutive streak — clearing the 40% threshold with nothing but a Google Form and daily nudges.",
                },
                {
                  title: "Book attachment is a leading indicator.",
                  description:
                    "Both participants stuck with one book the entire challenge, no switching. The habit forms around a specific book commitment, not the app itself — next: make 'what are you reading right now' a first-class onboarding question.",
                },
              ]}
            />

            <TestCard
              step="Test 3"
              name="Smoke Test · Pre-Sale"
              strategy="Two pre-sale mechanisms layered onto the landing page: a voluntary pledge with an open-text reason, and a two-tier pricing reservation ($1.99 early-bird / $3.99 regular) — no card, no charge, just intent."
              hypothesis="At least 30% of waitlist signups will take a pre-sale action — pledging or reserving a paid tier — a meaningfully stronger commitment than joining a waitlist."
              artifacts={[
                {
                  src: "/projects/read-validation/test3-pricing.png",
                  alt: "Pricing tiers screen comparing Free and Pro at $1.99/month",
                  caption: "Pricing tiers · Free vs Pro ($1.99/$3.99)",
                },
                {
                  src: "/projects/read-validation/test3-pledge.png",
                  alt: "Pledge form asking for an email address and why the user wants Read to exist",
                  caption: "Pledge form · email + open-text reason",
                },
              ]}
            />
            <ResultBlock
              stats={
                <>
                  <ResultStat value="10" label="Waitlist pool" />
                  <ResultStat value="40%" label="Committed beyond waitlist" />
                </>
              }
              insights={[
                {
                  title: "Two signals, one clear story.",
                  description:
                    "3 waitlisters wrote a pledge (30%), 4 reserved a paid tier (40%), 3 did both. 40% of the waitlist took at least one pre-sale action — a real willingness-to-pay signal.",
                },
                {
                  title: "A 50/50 price split validates the tier boundary.",
                  description:
                    "2 users chose $1–2/mo and 2 chose $3–5/mo — no one priced out, no one undervaluing it. Next: launch v1 at $1.99 with a clear premium tier at $3.99.",
                },
              ]}
            />
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>What the tests taught us</SectionLabel>
          <SectionHeading>Three green lights.</SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="card p-6">
              <p className="font-geist-mono text-caption text-blue">Test 1</p>
              <p className="font-newsreader mt-1 text-subheading text-ink">
                Fake Front Door
              </p>
              <div className="mt-2">
                <ProvenBadge />
              </div>
              <p className="font-geist mt-3 text-ui font-normal text-body-text">
                10 waitlist signups in 2.5 weeks on organic sharing alone.
              </p>
            </div>
            <div className="card p-6">
              <p className="font-geist-mono text-caption text-blue">Test 2</p>
              <p className="font-newsreader mt-1 text-subheading text-ink">
                Mechanical Turk
              </p>
              <div className="mt-2">
                <ProvenBadge />
              </div>
              <p className="font-geist mt-3 text-ui font-normal text-body-text">
                50% hit a perfect consecutive streak with only human
                support — no app needed.
              </p>
            </div>
            <div className="card p-6">
              <p className="font-geist-mono text-caption text-blue">Test 3</p>
              <p className="font-newsreader mt-1 text-subheading text-ink">
                Smoke Test
              </p>
              <div className="mt-2">
                <ProvenBadge />
              </div>
              <p className="font-geist mt-3 text-ui font-normal text-body-text">
                40% of waitlisters took a real pre-sale action, split evenly
                across two price tiers.
              </p>
            </div>
          </div>
        </section>

        {divider}

        <section>
          <SectionLabel>Back to the reader</SectionLabel>
          <p className="font-newsreader mt-3 max-w-[700px] text-section-heading text-ink">
            Demand is real. The habit works. People will pay.
          </p>
          <p className="font-geist mt-6 max-w-[680px] text-body text-body-text">
            Test 1 validated raw demand. Test 2 validated the habit loop
            itself, with book attachment as the leading indicator. Test 3
            validated willingness to pay, with a clean 50/50 split between
            the $1.99 and $3.99 tiers. The idea has demand, commitment, and
            a working habit loop — time to build v1: fiction-first
            onboarding, book-level tracking, and a $1.99 launch tier with a
            clear premium at $3.99.
          </p>
        </section>
      </main>
    </PageShell>
  );
}
