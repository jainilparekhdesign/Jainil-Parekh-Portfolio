# Changelog

All notable changes to this project are documented here, newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/); versions follow semver in `package.json`.

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
