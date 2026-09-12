# Changelog

All notable changes to this project are documented here, newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/); versions follow semver in `package.json`.

## [0.4.2] - 2026-09-11

### Fixed
- Root cause of every deployment since v0.3.0 getting auto-canceled: Vercel's deployment protection requires verified commit signatures, and commits made from this machine weren't signed. Configured git to sign commits with the existing SSH key (`gpg.format=ssh`, `commit.gpgsign=true`) and registered it as a GitHub Signing Key. This commit should be the first one to actually build.

## [0.4.1] - 2026-09-11

### Note
No source changes — version bump to force a fresh Vercel build after
v0.3.1, v0.4.0, and an empty retrigger commit were all auto-canceled
("Canceled from the Vercel Dashboard") immediately on push. Root
cause not yet identified from the git/GitHub side; likely a Vercel
account-level setting (build quota, ignored-build-step script, or
similar) that needs checking directly in the dashboard if this one
cancels too.

## [0.4.0] - 2026-09-11

### Added
- Real type-scale tokens in `app/globals.css` (`--text-hero`, `--text-case-cover`, `--text-section-heading`, `--text-subheading`, `--text-body`, `--text-ui`, `--text-eyebrow`, `--text-caption`, `--text-metric`, `--text-greeting`, `--text-lede`, `--text-nav-wordmark`), matching the v3.0 design system's literal pixel/line-height/letter-spacing values (fluid `clamp()` for the four sizes the spec gives explicit mobile values for: hero, case-study cover, section heading, metric callout).
- Semantic component classes (`.btn-primary`, `.btn-secondary`, `.card`, `.tag`, `.t-emphasis`) and motion tokens (`--dur-micro`, `--dur-page`, `--ease-page`) plus a global `:focus-visible` ring, per the spec's component and accessibility sections.

### Changed
- Migrated typography across the Home hero, Nav, Toolbar, Projects index, and the entire Read case study off arbitrary Tailwind bracket values (`text-[1.75em]`, etc.) onto the new named scale — this is a real visual size change in places (e.g. the homepage H1 grows from ~32px to the spec's 48px greeting size), not just a code-quality pass.
- Removed ~26 redundant manual dark-mode text-color overrides (`dark:text-[#f2f2f0]`) across Nav, Toolbar, Projects index, and the Read case study — the `text-ink` token already flips correctly in dark mode, so these were dead duplicate rules (and in a couple of spots, papering over a `text-black` base that wasn't theme-aware at all in dark mode).

### Known gaps
- The Resume page keeps its own distinct print-document design language (Instrument Serif/DM Sans, warm tan palette) and was intentionally left untouched.
- A handful of small illustrative UI-mockup snippets inside "The solution" section's three example cards still use one-off arbitrary sizes — low priority, not part of the case study's real content.

## [0.3.1] - 2026-09-11

### Fixed
- "The solution" section's example cards still showed the old fabricated 12-day streak and 15-minute goal, contradicting the real 6-day-streak/10-minute-goal dashboard screenshot now used in the hero. Updated the goal-time chips (now 1/5/10/15/30/60, matching the real Combine iteration) and the badge card (now a real reward name — "Indiana Jones · 200 pts" — and the real 6-day streak).

### Added
- An estimated read time ("8 min read") next to the case study's eyebrow line, based on an actual word count of the page's content.

## [0.3.0] - 2026-09-11

### Changed
- Rebuilt the `/projects/read` case study's hero mockup, three-iteration "before/after" section, research-insights section, and usability-testing stats to use real screens and real data pulled from the actual Read Figma file and the project's usability-test readout deck, replacing invented copy and hand-drawn wireframes.
- Hero now shows the real splash and home-dashboard screens (exported from Figma) instead of a fabricated phone mockup.
- The three "iteration" before/afters are now four real SCAMPER before/afters (Modify, Adapt, Combine, Substitute) with real cropped screenshots, sourced from the usability-test readout.
- "Research insights" replaced with three real usability findings, including a real anonymized participant quote (P1) — the fabricated "MK" quote is gone.
- Usability-testing stats section now includes NPS (60) and issues-found-and-triaged (28) alongside the existing participant/task-success/confidence numbers, plus a methodology line (5 moderated Zoom sessions, 2 weeks, Hook-Model task structure).
- "Biggest learning" now reflects a real retro insight (naming/labeling issues mattered more than structural ones) instead of an invented closing line.

### Added
- `public/projects/read/` image assets: `splash.png`, `dashboard.png`, and eight `scamper-*-before/after.png` crops extracted from the usability-test deck.

## [0.2.0] - 2026-09-11

### Changed
- Dark-mode color tokens now match the locked v3.0 design system exactly (lifted/desaturated Forest and Rust, AAA-verified surfaces) instead of the earlier ad-hoc dark palette.
- Favicon (`app/icon.tsx`, `app/apple-icon.tsx`) recolored from the old brand blue to Graphite, per the design system's rule that the monogram is never an accent color.
- Resume "Download PDF" now triggers the browser's print dialog against the page's existing print stylesheet (`app/resume/DownloadButton.tsx`), instead of linking to a static `/resume.pdf` that didn't exist.

### Moved
- Pre-Next static prototype (`index.html`, `projects-coming-soon.html`, `accessibility-spec.html`/`.pdf`, `files.zip`) into `legacy/`, out of the repo root.

### Added
- This changelog, and a versioning process going forward: meaningful pushes bump `package.json` and get a dated entry here.

## [0.1.0] - prior history

Baseline before this changelog started: Next.js 16 App Router portfolio (Home, Projects, Projects/Read case study, Resume), Graphite/Forest/Rust palette and Figtree rebrand, logo mark and favicon work. See `git log` for commit-level detail predating this file.
