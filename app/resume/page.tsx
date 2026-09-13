import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import DownloadButton from "./DownloadButton";
import FitToPage from "./FitToPage";

export const metadata: Metadata = {
  title: "Resume — Jainil Parekh",
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-geist-mono mb-2 border-b border-toolbar-outline pb-1 text-caption tracking-[0.04em] text-blue uppercase">
      {children}
    </p>
  );
}

function ExperienceItem({
  title,
  company,
  location,
  date,
  bullets,
}: {
  title: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <p className="font-geist text-ui font-semibold text-ink">
          {title} <span className="text-body-text">· {company}</span>
        </p>
        <p className="font-geist-mono text-caption whitespace-nowrap text-body-text">
          {date}
        </p>
      </div>
      <p className="font-geist-mono text-caption text-body-text">{location}</p>
      <ul className="mt-1 flex flex-col gap-0.5">
        {bullets.map((b) => (
          <li
            key={b}
            className="font-geist relative pl-4 text-caption font-normal text-body-text"
          >
            <span className="absolute left-0 text-blue">·</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectItem({
  title,
  href,
  bullets,
}: {
  title: string;
  href?: string;
  bullets: string[];
}) {
  const heading = href ? (
    <Link
      href={href}
      className="font-geist text-ui font-semibold text-ink no-underline hover:text-nav-active"
    >
      {title}
    </Link>
  ) : (
    <p className="font-geist text-ui font-semibold text-ink">{title}</p>
  );
  return (
    <div className="mb-3 last:mb-0">
      {heading}
      <ul className="mt-1 flex flex-col gap-0.5">
        {bullets.map((b) => (
          <li
            key={b}
            className="font-geist relative pl-4 text-caption font-normal text-body-text"
          >
            <span className="absolute left-0 text-blue">·</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EduItem({
  degree,
  school,
  location,
  date,
  detail,
}: {
  degree: string;
  school: string;
  location: string;
  date: string;
  detail?: string;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="font-geist text-ui font-semibold text-ink">{degree}</p>
      <p className="font-geist-mono text-caption text-body-text">
        {school}, {location}
      </p>
      <p className="font-geist-mono text-caption text-body-text">{date}</p>
      {detail && (
        <p className="font-geist mt-1 text-caption text-body-text">
          {detail}
        </p>
      )}
    </div>
  );
}

function SkillGroup({ label, items }: { label: string; items: string }) {
  return (
    <div className="mb-2 last:mb-0">
      <p className="font-geist-mono text-caption uppercase tracking-[0.04em] text-blue">
        {label}
      </p>
      <p className="font-geist mt-0.5 text-caption font-normal text-body-text">
        {items}
      </p>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`card p-5 print:border ${className}`}>{children}</section>;
}

export default function ResumePage() {
  return (
    <PageShell active="resume" showScrollIndicator={false} showBgGrid={false}>
      <main className="font-geist relative z-[2] pt-4 pb-6 pl-[clamp(24px,8vw,120px)] pr-[clamp(24px,8vw,120px)] print:p-0">
        <div className="print:hidden">
        <FitToPage className="mx-auto max-w-[900px]">
          <div className="mt-4 flex flex-col gap-4">
            <Card className="print:p-0">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-newsreader text-section-heading text-ink">
                    Jainil Parekh
                  </h1>
                  <p className="font-geist mt-0.5 text-ui font-medium text-blue">
                    Product Designer — Fintech &amp; Behavioral Systems
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <DownloadButton />
                  <div className="font-geist-mono flex flex-col items-end gap-0.5 text-caption text-body-text">
                    <span>(773) 696-8289</span>
                    <span>Philadelphia, PA (open to relocate)</span>
                    <a
                      href="mailto:jainilparekh.design@gmail.com"
                      className="text-body-text no-underline hover:text-nav-active"
                    >
                      jainilparekh.design@gmail.com
                    </a>
                    <a
                      href="https://jainilparekh.design"
                      className="text-body-text no-underline hover:text-nav-active"
                    >
                      jainilparekh.design
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <SectionLabel>Objective</SectionLabel>
              <p className="font-geist text-caption text-body-text">
                Product Designer specializing in fintech and behavioral
                interaction systems. Experienced in driving measurable
                engagement improvements through experimentation, design
                systems, and cross-functional collaboration.
              </p>
            </Card>

            <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
              <div className="flex flex-col gap-4">
                <Card>
                  <SectionLabel>Experience</SectionLabel>
                  <ExperienceItem
                    title="Product Designer"
                    company="Kuhoo Finance Pvt. Ltd."
                    location="Mumbai, IN"
                    date="Jan 2024 – Mar 2025"
                    bullets={[
                      "Increased in-app engagement by 135% through personalized onboarding and contextual prompts.",
                      "Conducted A/B testing on rating and feedback flows, improving app review volume and sentiment.",
                      "Designed and maintained a scalable design system, improving navigation consistency.",
                      "Collaborated with product managers and engineers to translate business goals into user flows.",
                    ]}
                  />
                  <ExperienceItem
                    title="Product Design Intern"
                    company="Nuvama Wealth"
                    location="Mumbai, IN"
                    date="Feb 2023 – Dec 2023"
                    bullets={[
                      "Designed mobile and web interfaces informed by user research and usability testing.",
                      "Built an internal CRM portal improving lead-management efficiency by 30%.",
                      "Contributed to a modular design system ensuring UI consistency across products.",
                    ]}
                  />
                  <ExperienceItem
                    title="Freelance UX / Product Designer"
                    company="Independent"
                    location="Mumbai, IN"
                    date="May 2021 – Jan 2024"
                    bullets={[
                      "Designed end-to-end digital products for startups and small businesses, from discovery through handoff.",
                      "Created scalable UI systems and brand identities used across web and product experiences.",
                    ]}
                  />
                </Card>

                <Card>
                  <SectionLabel>Projects</SectionLabel>
                  <ProjectItem
                    title="Habit Forming Application — Read"
                    href="/projects/read"
                    bullets={[
                      "Designed a habit-forming reading app that helps users build a daily reading habit without pressure.",
                      "Conducted user research, defined personas, and prioritized features using MoSCoW analysis.",
                    ]}
                  />
                  <ProjectItem
                    title='Astrobrights E-Commerce "Astroverse" UX Concept'
                    bullets={[
                      "Designed an e-commerce experience integrated with an AR-based storytelling concept.",
                      "Conducted user research, defined personas, and prioritized features using MoSCoW analysis.",
                    ]}
                  />
                </Card>
              </div>

              <div className="flex flex-col gap-4">
                <Card>
                  <SectionLabel>Education</SectionLabel>
                  <EduItem
                    degree="M.S. User Experience & Interaction Design"
                    school="Thomas Jefferson University"
                    location="Philadelphia, PA"
                    date="Expected 2027"
                    detail="UX Design Studio · Interaction Design · User Research & Usability Testing · Information Architecture · Prototyping · Accessibility & Inclusive Design · Product Strategy"
                  />
                  <EduItem
                    degree="B.Tech Information Technology"
                    school="VJTI"
                    location="Mumbai, IN"
                    date="2018 – 2024"
                  />
                </Card>

                <Card>
                  <SectionLabel>Skills</SectionLabel>
                  <SkillGroup
                    label="UX & Product"
                    items="UX Research, User Interviews, Usability Testing, A/B Testing, Prototyping"
                  />
                  <SkillGroup
                    label="Tools"
                    items="Figma, Adobe XD, Sketch, FigJam, Miro, Notion"
                  />
                  <SkillGroup
                    label="Collaboration"
                    items="Product Thinking, Cross-Functional Collaboration, Stakeholder Communication, Agile/Scrum"
                  />
                </Card>
              </div>
            </div>
          </div>
        </FitToPage>
        </div>

        <div className="hidden print:block">
          <div className="mx-auto max-w-[820px]">
            <h1 className="font-newsreader text-section-heading text-ink">
              Jainil Parekh
            </h1>
            <p className="font-geist mt-0.5 text-ui font-medium text-blue">
              Product Designer — Fintech &amp; Behavioral Systems
            </p>
            <div className="font-geist-mono mt-2 flex flex-wrap gap-x-4 gap-y-1 text-caption text-body-text">
              <span>(773) 696-8289</span>
              <span>·</span>
              <span>Philadelphia, PA (open to relocate)</span>
              <span>·</span>
              <span>jainilparekh.design@gmail.com</span>
              <span>·</span>
              <span>LinkedIn</span>
              <span>·</span>
              <span>jainilparekh.design</span>
            </div>

            <hr className="my-4 border-t border-toolbar-outline" />

            <section className="mb-5">
              <SectionLabel>Objective</SectionLabel>
              <p className="font-geist text-caption text-body-text">
                Product Designer specializing in fintech and behavioral
                interaction systems. Experienced in driving measurable
                engagement improvements through experimentation, design
                systems, and cross-functional collaboration.
              </p>
            </section>

            <div className="grid gap-6 sm:grid-cols-[1fr_260px]">
              <div>
                <section className="mb-5">
                  <SectionLabel>Experience</SectionLabel>
                  <ExperienceItem
                    title="Product Designer"
                    company="Kuhoo Finance Pvt. Ltd."
                    location="Mumbai, IN"
                    date="Jan 2024 – Mar 2025"
                    bullets={[
                      "Increased in-app engagement by 135% through personalized onboarding and contextual prompts.",
                      "Conducted A/B testing on rating and feedback flows, improving app review volume and sentiment.",
                      "Designed and maintained a scalable design system, improving navigation consistency.",
                      "Collaborated with product managers and engineers to translate business goals into user flows.",
                    ]}
                  />
                  <ExperienceItem
                    title="Product Design Intern"
                    company="Nuvama Wealth"
                    location="Mumbai, IN"
                    date="Feb 2023 – Dec 2023"
                    bullets={[
                      "Designed mobile and web interfaces informed by user research and usability testing.",
                      "Built an internal CRM portal improving lead-management efficiency by 30%.",
                      "Contributed to a modular design system ensuring UI consistency across products.",
                    ]}
                  />
                  <ExperienceItem
                    title="Freelance UX / Product Designer"
                    company="Independent"
                    location="Mumbai, IN"
                    date="May 2021 – Jan 2024"
                    bullets={[
                      "Designed end-to-end digital products for startups and small businesses, from discovery through handoff.",
                      "Created scalable UI systems and brand identities used across web and product experiences.",
                    ]}
                  />
                </section>

                <section>
                  <SectionLabel>Projects</SectionLabel>
                  <ProjectItem
                    title="Habit Forming Application — Read"
                    bullets={[
                      "Designed a habit-forming reading app that helps users build a daily reading habit without pressure.",
                      "Conducted user research, defined personas, and prioritized features using MoSCoW analysis.",
                    ]}
                  />
                  <ProjectItem
                    title='Astrobrights E-Commerce "Astroverse" UX Concept'
                    bullets={[
                      "Designed an e-commerce experience integrated with an AR-based storytelling concept.",
                      "Conducted user research, defined personas, and prioritized features using MoSCoW analysis.",
                    ]}
                  />
                </section>
              </div>

              <div>
                <section className="mb-5">
                  <SectionLabel>Education</SectionLabel>
                  <EduItem
                    degree="M.S. User Experience & Interaction Design"
                    school="Thomas Jefferson University"
                    location="Philadelphia, PA"
                    date="Expected 2027"
                    detail="UX Design Studio · Interaction Design · User Research & Usability Testing · Information Architecture · Prototyping · Accessibility & Inclusive Design · Product Strategy"
                  />
                  <EduItem
                    degree="B.Tech Information Technology"
                    school="VJTI"
                    location="Mumbai, IN"
                    date="2018 – 2024"
                  />
                </section>

                <section>
                  <SectionLabel>Skills</SectionLabel>
                  <SkillGroup
                    label="UX & Product"
                    items="UX Research, User Interviews, Usability Testing, A/B Testing, Prototyping"
                  />
                  <SkillGroup
                    label="Tools"
                    items="Figma, Adobe XD, Sketch, FigJam, Miro, Notion"
                  />
                  <SkillGroup
                    label="Collaboration"
                    items="Product Thinking, Cross-Functional Collaboration, Stakeholder Communication, Agile/Scrum"
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
