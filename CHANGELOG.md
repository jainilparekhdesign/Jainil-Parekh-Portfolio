# Changelog

All notable changes to this project are documented here, newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/); versions follow semver in `package.json`.

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
