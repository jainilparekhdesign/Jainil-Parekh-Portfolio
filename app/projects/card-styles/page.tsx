import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Card style comparison | Jainil Parekh",
};

type Project = {
  href: string;
  thumbnail: string;
  type: string;
  topics: string[];
  title: string;
  description: string;
  readTime: string;
};

const projects: Project[] = [
  {
    href: "/projects/read",
    thumbnail: "/projects/thumbnails/read.png",
    type: "Academic",
    topics: ["UX Design", "Interaction Design"],
    title: "Read — One page. At a time.",
    description: "A habit-forming reading app for first-time readers.",
    readTime: "8 min read",
  },
  {
    href: "/projects/read-validation",
    thumbnail: "/projects/thumbnails/read-validation.png",
    type: "Academic",
    topics: ["Design Business", "Lean Validation"],
    title: "Read — Risky Assumption Report",
    description:
      "Validating demand, habit, and willingness to pay before writing code.",
    readTime: "6 min read",
  },
  {
    href: "/projects/ai-research",
    thumbnail: "/projects/thumbnails/ai-research.png",
    type: "Academic",
    topics: ["UX Research", "Methods"],
    title: "AI: An Escape from Illusion",
    description:
      "What AI does to trust, efficiency, and understanding while studying.",
    readTime: "5 min read",
  },
];

function StyleLabel({ number, name, note }: { number: string; name: string; note: string }) {
  return (
    <div className="mb-6">
      <p className="font-geist-mono text-eyebrow uppercase text-blue">
        Style {number}
      </p>
      <h2 className="font-newsreader mt-1 text-section-heading text-ink">
        {name}
      </h2>
      <p className="font-geist mt-1 max-w-[620px] text-ui font-normal text-body-text">
        {note}
      </p>
    </div>
  );
}

/* 1 — Poster / overlay */
function PosterCard({ p }: { p: Project }) {
  return (
    <Link
      href={p.href}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl no-underline"
    >
      <img
        src={p.thumbnail}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="font-geist-mono rounded-full bg-white/15 px-2.5 py-1 text-card-tag uppercase text-white backdrop-blur-sm">
          {p.type}
        </span>
        <h3 className="font-newsreader mt-2 text-card-title text-white">
          {p.title}
        </h3>
        <p className="font-geist mt-1 text-ui font-normal text-white/80">
          {p.description}
        </p>
        <p className="font-geist-mono mt-3 text-caption text-white/60">
          {p.readTime}
        </p>
      </div>
    </Link>
  );
}

/* 2 — Horizontal row */
function RowCard({ p }: { p: Project }) {
  return (
    <Link
      href={p.href}
      className="card flex items-center gap-4 p-4 no-underline"
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-pill-bg sm:h-24 sm:w-24">
        <img src={p.thumbnail} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag">{p.type}</span>
          <span className="font-geist text-card-tag uppercase text-blue">
            {p.topics.join(" · ")}
          </span>
        </div>
        <h3 className="font-newsreader mt-1 truncate text-ui font-semibold text-ink sm:text-subheading">
          {p.title}
        </h3>
        <p className="font-geist mt-0.5 truncate text-caption font-normal text-body-text sm:text-ui">
          {p.description}
        </p>
      </div>
      <span className="font-geist-mono hidden shrink-0 text-caption text-graphite-70 sm:block">
        {p.readTime}
      </span>
    </Link>
  );
}

/* 3 — Borderless / minimal */
function MinimalCard({ p }: { p: Project }) {
  return (
    <Link href={p.href} className="group flex flex-col no-underline">
      <div className="aspect-[8/5] w-full overflow-hidden rounded-xl bg-pill-bg">
        <img
          src={p.thumbnail}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col pt-4">
        <span className="font-geist text-card-tag uppercase text-blue">
          {p.type} · {p.topics.join(" · ")}
        </span>
        <h3 className="font-newsreader mt-2 text-card-title text-ink transition-colors group-hover:text-nav-active">
          {p.title}
        </h3>
        <p className="font-geist mt-1 text-body text-body-text">
          {p.description}
        </p>
        <p className="font-geist-mono mt-3 text-caption text-graphite-70">
          {p.readTime}
        </p>
      </div>
    </Link>
  );
}

/* 5 — Hover reveal */
function HoverCard({ p }: { p: Project }) {
  return (
    <Link
      href={p.href}
      className="group relative block aspect-[8/5] overflow-hidden rounded-2xl no-underline"
    >
      <img src={p.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/55" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-newsreader text-card-title text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          {p.title}
        </h3>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="font-geist mt-2 text-ui font-normal text-white/85">
              {p.description}
            </p>
            <p className="font-geist-mono mt-2 text-caption text-white/70">
              {p.type} · {p.readTime}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

const divider = <hr className="my-16 border-t border-toolbar-outline" />;

export default function CardStylesComparison() {
  return (
    <PageShell active="projects" showScrollIndicator={false}>
      <main className="font-geist relative z-[2] pt-12 pb-24 pl-[clamp(24px,8vw,120px)] pr-[clamp(24px,8vw,120px)]">
        <p className="font-geist-mono text-eyebrow uppercase text-rust">
          Internal comparison — not linked from the site
        </p>
        <h1 className="font-newsreader mt-3 text-case-cover text-ink">
          Project card style options
        </h1>
        <p className="font-geist mt-4 max-w-[620px] text-lede text-body-text">
          Four directions for the same three projects, so they can be judged
          side by side instead of one at a time.
        </p>

        {divider}

        <section>
          <StyleLabel
            number="1"
            name="Poster / overlay"
            note="Text sits directly on the thumbnail with a gradient scrim. More editorial, saves vertical space — legibility depends on the image underneath."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {projects.map((p) => (
              <PosterCard key={p.href} p={p} />
            ))}
          </div>
        </section>

        {divider}

        <section>
          <StyleLabel
            number="2"
            name="Horizontal row"
            note="Small thumbnail, all text to the right. Compact and scannable — closer to a list than a gallery."
          />
          <div className="flex flex-col gap-4">
            {projects.map((p) => (
              <RowCard key={p.href} p={p} />
            ))}
          </div>
        </section>

        {divider}

        <section>
          <StyleLabel
            number="3"
            name="Borderless / minimal"
            note="No card border or shadow — separation comes from whitespace alone. Matches the borderless feel of the case studies themselves."
          />
          <div className="grid gap-8 sm:grid-cols-3">
            {projects.map((p) => (
              <MinimalCard key={p.href} p={p} />
            ))}
          </div>
        </section>

        {divider}

        <section>
          <StyleLabel
            number="5"
            name="Hover reveal"
            note="Full-bleed thumbnail with just the title visible; description and meta expand on hover. Strongly visual, but hides information with no hover on touch devices — worth weighing against that."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {projects.map((p) => (
              <HoverCard key={p.href} p={p} />
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
