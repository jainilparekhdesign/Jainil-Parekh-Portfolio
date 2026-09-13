# Changelog

All notable changes to this project are documented here, newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/); versions follow semver in `package.json`.

## [0.8.1] - 2026-09-13

### Fixed
- The AI Research card sat alone, misaligned, on tablet-width screens — the grid went 1→2→3 columns, and 3 cards in a 2-column grid always strands the last one alone on its own row. Removed the 2-column intermediate step (now 1 column until it jumps straight to 3), and pinned each card's read-time/CTA footer to the bottom (`mt-auto`) so uneven description lengths no longer leave cards visually unbalanced.
- Card typography wasn't actually using the locked design system's card-specific type scale — title and description were borrowing generic subheading/UI tokens instead of the spec's dedicated "Card title" (24px) and "Card deck" (16px) values, and the topic tags weren't styled per the spec's "Card tag" role (11px, uppercase, forest) at all. Added `--text-card-title` and `--text-card-tag` tokens and applied them correctly, and the read-time meta now uses the spec's gr-70 color instead of the default body-text shade.

## [0.8.0] - 2026-09-13

### Added
- Real thumbnails for all three case studies, composed on brand-colored canvases (matching the site's Forest/Rust semantic roles — Forest for the two Read projects, Rust for the research piece): the Read home-screen phone mockup, the Risky Assumption Report's landing-page mockup, and a white impossible-triangle silhouette extracted from the AI research deck (ties directly to the case study's "illusion" title) recolored and composited rather than left as a raw slide screenshot.
- Redesigned Projects index cards: each now shows a thumbnail, project type (as a `.tag` pill — Academic/Work), topic tags, the project name, a one-line description, estimated read time, and a "Read case study" affordance — replacing the previous plain link-row layout with a proper 3-column card grid.

## [0.7.12] - 2026-09-13

### Changed
- Download button moved back out of the header card into its own row above — the ask was for it to sit outside the card but aligned with its edge (the v0.7.10 fix), not literally inside it.

## [0.7.11] - 2026-09-13

### Changed
- Moved the Download button inside the header card (above the contact info) instead of floating in its own row above the resume — it's now visually part of the card rather than a separate element sitting on top of it.

## [0.7.10] - 2026-09-12

### Fixed
- The Download button drifted out of alignment with the resume card whenever `FitToPage` shrank it — the card scaled down from its horizontal *center*, pulling its right edge inward, while the unscaled, right-aligned button stayed put. `FitToPage` now accepts a `className` applied directly to the scaled element (instead of the width/centering living on an inner child), and scales from `top right` instead of `top center`, so the card's right edge stays anchored to the same position as the button at any scale.

## [0.7.9] - 2026-09-12

### Changed
- `/resume` now renders two versions in the same page: the sectioned-cards layout on screen (hidden when printing), and the original single-card layout only when printing/downloading (hidden on screen). Reuses the same content components either way, so the two never drift apart. Clicking "Download PDF" now produces the original layout even though the page displays the new one.

## [0.7.8] - 2026-09-12

### Removed
- `/resume/v1` — the single-card layout is retired now that sectioned cards is the confirmed direction. Dropped the now-dead "View v1" link from `/resume`.

## [0.7.7] - 2026-09-12

### Changed
- Sectioned cards won the comparison — `/resume` is now that layout (previously at `/resume/v2`). The old single-card layout moved to `/resume/v1` for reference. Both still cross-link to each other.

## [0.7.6] - 2026-09-12

### Added
- `/resume/v2` — an alternative resume layout where every section (header/contact, Objective, Experience, Projects, Education, Skills) is its own bordered card in a bento-style grid, instead of one unified card. Same content, same fit-to-page/download behavior as v1. Cross-linked both directions ("View v2" from v1, "Back to resume (v1)" from v2) so they're easy to compare side by side.

## [0.7.5] - 2026-09-12

### Added
- A "paper card" treatment for the resume: the content now sits in a bordered, softly-shadowed card (the existing `.card` style — pill-bg fill, stone border) on the page's plain background, instead of floating with no defined edge. Reverts to a flat, borderless layout when printing.

## [0.7.4] - 2026-09-12

### Fixed
- The decorative background grid pattern (`BgGrid`) was showing behind the resume, competing with a dense reference document for attention. Added a `showBgGrid` prop to `PageShell` (defaults to `true`, matching every other page) and turned it off for the resume specifically.

## [0.7.3] - 2026-09-12

### Fixed
- v0.7.2's fit-to-page shrank the resume to illegible text — the 0.55× minimum scale allowed ~9px body text. Raised the floor to 0.82× (~11.5px minimum) and, more importantly, tightened the resume's own spacing and reduced the oversized 48px name heading to 28px, so the natural content is short enough to actually fit most screens near full scale instead of relying on aggressive shrinking.

## [0.7.2] - 2026-09-12

### Added
- `FitToPage`: the resume now fits within one screen instead of requiring a page scroll — it measures its own rendered height on load and scales down to fit the space below the nav (`transform: scale()`, capped at a minimum of 0.55× before it would fall back to normal scrolling rather than shrink to illegible text). Print is unaffected — it renders at natural size, sized by the existing `@page` margins.

## [0.7.1] - 2026-09-12

### Fixed
- Resume content and the download button row are now centered on the page (`mx-auto` on the max-width wrappers) instead of sitting flush left.

## [0.7.0] - 2026-09-12

### Added
- Real artifact screenshots (extracted from the source deck) in `/projects/read-validation`: the Fake Front Door landing page + waitlist form + features section, the Mechanical Turk challenge CTA + Google Sheet check-in log, and the Smoke Test pricing tiers + pledge form — the case study no longer reads as text-only.
- Resume rebuilt from the actual current résumé PDF (the on-site version had drifted — wrong degree program dates, missing the Freelance role and Projects section) and moved into the site's real design system: lives inside the normal `PageShell` (Nav + accessibility toolbar) instead of a standalone bespoke page, set in Figtree/Newsreader with the site's Forest/Rust tokens instead of its own Instrument Serif/DM Sans palette. "Resume" in the nav now gets the same active-state underline as Home/Projects.

### Changed
- The accessibility toolbar stays bottom-anchored at every screen size now, instead of relocating to a vertical-centered side rail on extra-large screens.
- Site chrome (Nav, the accessibility toolbar, the decorative background grid) is now hidden when printing, and printing forces light-mode colors regardless of the active theme — dark-mode text would otherwise print unreadably light against the forced-white page. This benefits every page's print/PDF output, not just the resume.
- The resume's "Download PDF" now uses the shared `.btn-primary` style instead of its own bespoke button, and its print-to-PDF flow reuses this same light-mode-forcing print CSS.

### Removed
- `app/resume/resume.module.css` — no longer needed now that the resume uses the site's shared token system instead of a standalone stylesheet.

### Known gap
- The résumé's LinkedIn reference is shown as plain text, not a link — I don't have the real profile URL and didn't want to guess and risk linking to the wrong person. Give me the URL and I'll wire it up.

## [0.6.0] - 2026-09-12

### Added
- Two new case studies, built from real source decks:
  - `/projects/ai-research` — "AI: An Escape from Illusion," a UX research study on trust, efficiency, and understanding in AI-assisted studying (persona, real quotes, adoption-phase data visualized as bar comparisons, recommendations with target metrics). ~5 min read.
  - `/projects/read-validation` — "Read — Risky Assumption Report," the Lean/pretotyping validation work for Read (three risky assumptions, three tests — Fake Front Door, Mechanical Turk, Smoke Test — each with real results and a hypothesis-proven outcome). ~6 min read.
- Projects index now lists all three case studies as cards instead of one card plus a "Coming Soon" placeholder.
- A real accessibility system, replacing the always-visible three-icon toolbar: a single Accessibility icon opens a panel with text size (3-step), dark mode, **high contrast** (new), and **reduced motion** (new) as independent, labeled toggles, plus the existing read-aloud feature and a "Reset to system preferences" action. High contrast and reduced motion default to the OS-level `prefers-contrast`/`prefers-reduced-motion` settings when the user hasn't chosen explicitly, and `[data-contrast="high"]` / `[data-motion="reduced"]` styling was added to `globals.css` to back both.

## [0.5.1] - 2026-09-12

### Changed
- Homepage headline back to the v3.0 spec's 48px greeting size (reverting the 32px rollback from v0.5.0) — now rendered in the real Newsreader serif from v0.5.0, at the new spec's size. Removed the mobile-specific override that came with the old size.

## [0.5.0] - 2026-09-12

### Changed
- Final font/size decision from the homepage comparison, applied site-wide: real Newsreader serif loaded and wired back into the `font-newsreader` class (previously aliased to Figtree post-rebrand) — every element already tagged `font-newsreader` across the whole site (headings, section titles, pull quotes, the nav wordmark) now renders in genuine Newsreader, not Figtree. `font-geist`-tagged body/UI text stays Figtree.
- The homepage headline reverts to its original 32px/26px-mobile size (`text-greeting` token updated) — the v3.0 spec's 48px greeting read too big on review.
- Removed the temporary three-column New/Old/Hybrid comparison scaffold from the homepage now that a decision's been made; the homepage is back to a single, final hero.

### Fixed
- Two spots (`app/page.tsx`'s body paragraph, `app/projects/page.tsx`'s deck paragraph) were relying on inherited font from a `font-newsreader`-tagged wrapper rather than declaring `font-geist` themselves — harmless while both aliases pointed at Figtree, but would have silently flipped that body text to serif now that the alias points at real Newsreader. Made both explicit.

## [0.4.5] - 2026-09-12

### Added
- A third homepage comparison column: "Hybrid — serif heading, Figtree body" — the headline set in real Newsreader at the new 48px size, with a Figtree body sample underneath, to test a serif-heading/sans-body pairing against the pure-Figtree New and pure-Newsreader/Geist Old variants.

## [0.4.4] - 2026-09-12

### Changed
- The homepage "New vs Old" comparison is now genuinely side by side (two columns, divider between) instead of stacked, and each side now actually uses its real fonts: New renders in Figtree with a Geist Mono secondary-font sample line; Old now loads and renders in the real Newsreader serif (previously both sides silently rendered in Figtree, since the `font-newsreader` class is aliased to Figtree post-rebrand — the comparison wasn't showing a real font difference before this). Each side also shows its background/accent color swatches (Snow bg is unchanged between the two; accent is Forest `#2A5548` vs the old Cobalt `#1F38A8`).

### Added
- All UI icons (text-size, dark-mode toggle, listen, scroll indicator, and the arrow icons on the Projects index and Read case study) are now sourced directly from Lucide (lucide.dev), replacing hand-drawn SVG paths. The scroll indicator also picked up a latent bug fix in the process — it was hardcoded to `stroke="black"`, which never adapted to dark mode. The brand mark (`LogoMark`) and the decorative background grid (`BgGrid`) are intentionally left as custom art, not Lucide icons.

## [0.4.3] - 2026-09-11

### Added
- Temporary side-by-side comparison on the homepage: the "Hi I'm Jainil Parekh" headline now renders twice, labeled "New — v3.0 spec" (the `text-greeting` token, 48px) and "Old — previous size" (the original `text-[2em]` styling, ~32px), so the new type-scale size can be judged directly against the old one before deciding whether to keep it. Meant to be removed once a decision is made.

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
