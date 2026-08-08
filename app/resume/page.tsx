import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume — Jainil Parekh",
};

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

export default function ResumePage() {
  return (
    <div className={`${styles.shell} ${instrumentSerif.variable} ${dmSans.variable}`}>
      <div className={styles.downloadWrap}>
        <a href="/resume.pdf" download className={styles.downloadBtn}>
          Download PDF
        </a>
      </div>

      <div className={styles.page}>
        <div className={styles.resumeHeader}>
          <div className={styles.headerLeft}>
            <h1>Jainil Parekh</h1>
            <div className={styles.headerRole}>Product Designer</div>
          </div>
          <div className={styles.headerContact}>
            <a
              href="https://jainilparekhdesign.notion.site"
              target="_blank"
              rel="noopener noreferrer"
            >
              jainilparekhdesign.notion.site
            </a>
            <a href="mailto:jainilparekh.design@gmail.com">
              jainilparekh.design@gmail.com
            </a>
            <a href="tel:+17736968289">(+1) 773-696-8289</a>
          </div>
        </div>

        <hr className={styles.hr} />

        <div className={styles.resumeBody}>
          <div>
            <div className={styles.sectionLabel}>Experience</div>

            <div className={styles.expItem}>
              <div className={styles.expHeader}>
                <div className={styles.expTitle}>
                  Associate Product Designer
                  <span className={styles.sep}>·</span>
                  <span className={styles.company}>Kuhoo Finance</span>
                </div>
                <div className={styles.expDate}>Jan 2024 – Mar 2025</div>
              </div>
              <ul className={styles.expBullets}>
                <li>
                  Identified negative rating bias caused by absence of in-app
                  feedback capture; designed contextual rating prompts
                  triggered at key task completion states.
                </li>
                <li>
                  Led structured A/B testing to evaluate timing and placement
                  of feedback interventions, increasing review engagement by
                  135%.
                </li>
                <li>
                  Built and implemented a scalable responsive design system
                  to standardize components across core loan workflows.
                </li>
                <li>
                  Partnered with product managers and engineers to align UX
                  decisions with growth, retention, and conversion metrics.
                </li>
              </ul>
            </div>

            <div className={styles.expItem}>
              <div className={styles.expHeader}>
                <div className={styles.expTitle}>
                  Product Design Intern
                  <span className={styles.sep}>·</span>
                  <span className={styles.company}>Nuvama Wealth</span>
                </div>
                <div className={styles.expDate}>Jan 2023 – Dec 2023</div>
              </div>
              <ul className={styles.expBullets}>
                <li>
                  Designed mobile and web workflows for internal CRM systems
                  informed by user research and usability testing.
                </li>
                <li>
                  Architected a lead management portal that improved
                  internal processing efficiency by ~30%.
                </li>
                <li>
                  Translated complex business requirements into structured
                  interaction flows under stakeholder and compliance
                  constraints.
                </li>
              </ul>
            </div>

            <div className={styles.expItem}>
              <div className={styles.expHeader}>
                <div className={styles.expTitle}>
                  Accessibility Services Proctor
                  <span className={styles.sep}>·</span>
                  <span className={styles.company}>
                    Thomas Jefferson University
                  </span>
                </div>
                <div className={styles.expDate}>Nov 2025 – Present</div>
              </div>
              <ul className={styles.expBullets}>
                <li>
                  Operationalized ADA accommodation requirements into
                  repeatable, time-sensitive exam workflows.
                </li>
                <li>
                  Managed edge-case scenarios to ensure equitable testing
                  experiences under strict compliance standards.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div>
              <div className={styles.sectionLabel}>Education</div>
              <div className={styles.eduItem}>
                <div className={styles.eduSchool}>
                  Thomas Jefferson University
                </div>
                <div className={styles.eduDegree}>
                  M.S. Interaction Design
                </div>
                <div className={styles.eduCourses}>
                  User Research &amp; Usability Testing, UX Writing, Digital
                  Communication Design, Mobile Communication, Human-Centered
                  Product Strategy
                </div>
                <div className={styles.eduDate}>
                  Aug 2025 – Present · Philadelphia, PA
                </div>
              </div>
              <div className={styles.eduItem}>
                <div className={styles.eduSchool}>VJTI Mumbai</div>
                <div className={styles.eduDegree}>
                  B.E. Information Technology
                </div>
                <div className={styles.eduCourses}>
                  Information Architecture, Frontend Development,
                  Information Systems
                </div>
                <div className={styles.eduDate}>Graduated 2024</div>
              </div>
            </div>

            <div>
              <div className={styles.sectionLabel}>Skills</div>
              <div className={styles.skillsBlock}>
                <div>
                  <div className={styles.skillGroupLabel}>Core</div>
                  <ul className={styles.skillList}>
                    <li>Interaction Design</li>
                    <li>Product Strategy</li>
                    <li>Experimentation &amp; A/B Testing</li>
                    <li>Behavioral UX &amp; Engagement</li>
                  </ul>
                </div>
                <div>
                  <div className={styles.skillGroupLabel}>Systems</div>
                  <ul className={styles.skillList}>
                    <li>Responsive Design</li>
                    <li>Information Architecture</li>
                    <li>Component &amp; Token Systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.sectionLabel}>Tools</div>
              <div className={styles.toolsList}>
                <span className={styles.toolTag}>Figma</span>
                <span className={styles.toolTag}>ProtoPie</span>
                <span className={styles.toolTag}>Framer</span>
                <span className={styles.toolTag}>Webflow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
