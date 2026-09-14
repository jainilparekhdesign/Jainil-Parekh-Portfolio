# Changelog

All notable changes to this project are documented here, newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/); versions follow semver in `package.json`.

## [0.17.1] - 2026-09-13

### Fixed
- The Read case study's "Session complete" mockup had numbers that didn't reconcile: 18 min at 240 wpm works out to ~4,320 words over only 11 pages, or ~393 words/page — implausibly dense for a book page. Changed the pace to 170 wpm (~278 words/page, a normal density, and a more believable pace for the app's actual audience of casual/first-time readers).

## [0.17.0] - 2026-09-13

### Fixed
- The mobile menu wasn't tappable: `Nav` and every page's `<main>` both used `z-[2]` as siblings in the same stacking context, and `<main>` comes later in the DOM — so it silently painted (and captured taps) on top of anything from `Nav` that extended past its own 88px height, like the dropdown panel. Bumped `Nav` to `z-20` so it's unambiguously on top regardless of what any page renders below it.

### Added
- Device-type tracking: a lightweight user-agent check classifies each visit as Mobile, Tablet, or Desktop, stored per-event and shown as a "Devices" breakdown on the dashboard alongside referrers and locations, plus per-visitor in the "Recent visitors" table. Also backfilled into the CSV export, which was missing both `device_type` and the earlier-added `campaign` column.

## [0.16.0] - 2026-09-13

### Fixed
- `BgGrid`'s decorative pattern was stretching on narrow screens: it uses `preserveAspectRatio="none"` with a responsive width but a fixed 812px height, so on mobile the width shrank while the height didn't, distorting the diamond pattern. Replaced the fixed height with `aspect-[1354/812]` so the box always matches the source ratio.

### Changed
- Nav is now a real collapsible mobile menu instead of just hiding items to fit. Below 640px, the inline links are replaced by a hamburger button (Escape to close, matching the accessibility toolbar's existing panel pattern) that opens a dropdown with Home, Projects, and Resume — About Me stays out of it per the earlier "hide for now" request. Desktop nav (≥640px) is unchanged, all four links inline.

## [0.15.1] - 2026-09-13

### Fixed
- Nav overflow on mobile: "About Me" now hides below 640px (it also currently points at an `#about` section that doesn't exist on the homepage yet — hiding it removes a dead link too), the wordmark text ("Jainil Parekh") hides below 480px leaving just the logo mark, and the link gap tightens further on small screens.
- The homepage's greeting heading (`text-greeting`, "Hi I'm Jainil Parekh") was a fixed 48px regardless of screen size, unlike every other large heading token (`text-hero`, `text-case-cover`), which scale down via `clamp()`. Made it responsive the same way.

## [0.15.0] - 2026-09-13

### Added
- Delete button on each row of the "Tracked links" table (behind a confirm prompt) — removes the campaign record via a new `DELETE /api/internal/campaigns/[slug]`. Historical events already recorded under that link stay in the raw data; only the managed link entry is removed.
- Optional custom link text in the generator: instead of a random code, type your own word (e.g., "hello") and the link becomes `jainilparekh.design/r/hello` — reads as an ordinary short link when posted on social media or anywhere public, rather than a random string. Falls back to a random code if left blank. Custom text that's already taken is rejected with a clear error rather than silently overwriting the existing link.

### Changed
- `upsertCampaign` replaced with `createCampaign`, which never overwrites an existing campaign's company name on a slug collision — the old upsert behavior was unsafe now that custom (attacker-guessable-ish) slugs are supported.

## [0.14.1] - 2026-09-13

### Changed
- Tracked links no longer expose anything in the visible URL. Generated links are now `jainilparekh.design/r/<random-code>` — a new `/r/[code]` route sets a cookie and 307-redirects straight to `/`, so the address bar the visitor actually sees just shows the clean homepage URL. The code is random rather than derived from the company name, so even the short link itself carries no readable information.
- `EventTracker` now reads the campaign tag from that cookie (falling back to a `?ref=` query param if one's ever used directly), and `/r` is blocked in `robots.txt` alongside `/internal`.

## [0.14.0] - 2026-09-13

### Added
- Campaign-tagged link tracking, for identifying which company/application a visit came from without asking visitors anything. `EventTracker` captures a `?ref=` query param on first visit, persists it in `sessionStorage` for the rest of that session, and tags every event (pageview, duration, resume download) with it.
- A "Generate a tracked link" tool on the internal dashboard: type a company name, get back a link like `jainilparekh.design/?ref=acme-corp` to use in that application, with copy-to-clipboard. Backed by a new `campaigns` table (slug + display name) and `/api/internal/campaigns`.
- A "Tracked links" table on the dashboard showing, per company: visits, page views, resume downloads, and total time spent, updating automatically as that link gets used.
- `events` table gained a `campaign` column via an idempotent `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`, so this evolves the existing live table without losing any already-tracked data.

## [0.13.0] - 2026-09-13

### Changed
- Redesigned the "Three core experiences" section on the Read case study. It previously duplicated itself: a row of three mockup cards, then a separate row of "01/02/03" text blocks explaining the same three things again. Merged both into one unified card per step — number, icon (clock, check-circle, award), eyebrow, title, the mockup preview, and the explanatory copy all in one place — removing the redundant second row entirely.

## [0.12.3] - 2026-09-13

### Fixed
- Replaced the Read app's dashboard and splash screenshots with the actual full-resolution exports (1696×3584, down from 426×900) — the low-res versions were looking soft now that the hero and thumbnail images render larger. Downscaled to web-appropriate sizes (1000px wide for the individual screens, 1400px long edge for the composited thumbnail) while staying well above retina sharpness at display size.

## [0.12.2] - 2026-09-13

### Changed
- Removed the `bg-pill-bg` card wrapper behind each case study's hero thumbnail (Read, AI research, Read Validation) — the images now sit directly on the page with only their own shadows, no boxed background.
- Sized up all three hero thumbnails, since the side-by-side layout from v0.12.1 left them looking small and cramped next to the title block.

## [0.12.1] - 2026-09-13

### Changed
- Moved each case study's hero thumbnail from below the title block to beside it (right side on desktop, stacking above the title on mobile), across all three case studies.

## [0.12.0] - 2026-09-13

### Added
- Hero visual added to every case study, matching a pattern Read already had: a rounded image card right below the title/meta block. AI research now shows the Ben persona illustration; Read Validation shows the "Fake Front Door" Coming Soon landing page (with its editor watermark cleaned up, along with the other four Read Validation test-artifact screenshots that had the same watermark).
- Recomposed the Read project's index-card thumbnail: instead of a single flat screenshot, it now shows the app's splash screen and home screen layered together with soft shadows.
- Internal dashboard: "Download data" (exports the raw `events` table as CSV via `/api/internal/export`) and "Reset data" (permanently clears all tracked events via `/api/internal/reset`, behind a confirmation prompt) — both routes check the session cookie directly since `/api/internal/*` isn't covered by the proxy's route matcher.

### Changed
- Polished the "Three core experiences" cards on the Read case study (goal-setting, session-complete, badge-earned) with real elevation and an inset panel, rather than flat unstyled boxes. Kept these as styled components rather than flat image assets — no real screenshots exist for these three specific app moments, and a hand-composited mockup image would look worse than a well-crafted component; revisit if real screens become available.

## [0.11.0] - 2026-09-13

### Fixed
- Replaced `@vercel/postgres` with `@neondatabase/serverless`'s `neon()` directly: `@vercel/postgres`'s default client rejected this Neon marketplace integration's connection string as "meant for a direct connection," since it's built around Vercel's own Postgres product's pooled-URL convention. The neutral driver has no such restriction. The client is now constructed lazily (on first query) rather than at module load, so Next.js's build-time page-data collection step doesn't crash before env vars are available.
- Patched a critical Next.js RCE advisory and several other high-severity transitive vulnerabilities via `npm audit fix --force` (`next` 16.2.12 → 16.3.5, plus `postcss`, `sharp`, `js-yaml`, `nanoid`).
- Renamed `middleware.ts` to `proxy.ts` (and `middleware()` to `proxy()`) per Next.js 16's file convention change; functionally identical.
- Fixed three real `react-hooks` lint errors surfaced by the newer React Compiler–oriented ESLint rules: an impure `Date.now()` ref initializer in `EventTracker`, a synchronous `setState` call inside a mount effect in `DashboardSync`, and a pre-existing DOM-mutation false positive in `Toolbar`'s text-size handler (annotated, not changed).

### Added
- Per-visitor tracking on the internal dashboard: a "Recent visitors" table showing location (city/country), total time spent, per-page time breakdown, and whether they downloaded the resume, sourced from the same `events` table grouped by session.
- Auto-sync (every 30s) and a manual "Sync now" button on `/internal`, using `router.refresh()` against the `force-dynamic` dashboard route.
- `description`, Open Graph, and Twitter card metadata on every page (previously only a bare `<title>`); `robots.txt` and `sitemap.xml` via Next.js's metadata file conventions, with `/internal` explicitly disallowed from crawling as defense-in-depth on top of the password gate.

### Changed
- Scroll indicator (the animated mouse/scroll icon) is now off by default site-wide ahead of launch; the component is untouched so it can be re-enabled later.
- Removed all stylistic em dashes from visible site copy (titles, descriptions, case study body text) across every page, replacing each with the punctuation the sentence actually called for (colon, comma, semicolon, parentheses, or a period splitting it into two sentences).

## [0.10.1] - 2026-09-13

### Fixed
- Fixed a build failure in v0.10.0: the case-study-reads query passed a `string[]` as a `@vercel/postgres` template value, which only accepts primitives — switched to three interpolated placeholders in an `IN (...)` clause. Also marked `/internal` as `force-dynamic` so it always renders fresh data instead of Next.js attempting to statically prerender a page that queries the database.

## [0.10.0] - 2026-09-13

### Added
- Real event tracking wired into the internal dashboard: a `/api/track` endpoint writes to a Postgres (Neon) `events` table, capturing page views, resume-download clicks, and time-on-page, plus referrer and geo (country/city from Vercel's request headers). `EventTracker` is mounted site-wide and skips `/internal` itself.
- `/internal` now renders live metrics from that data: total page views, resume downloads, average time on page, a 14-day view trend, top referrers, top locations, and per-case-study read counts — with a graceful empty state before any data exists.
- Added `@vercel/postgres` as a dependency; requires the Postgres/Neon integration connected in Vercel's Storage tab (already provisioned) so `POSTGRES_URL` etc. are available at runtime.

## [0.9.0] - 2026-09-13

### Added
- Internal, password-gated `/internal` route for a future analytics dashboard. Next.js middleware (`middleware.ts`) protects `/internal/:path*`, redirecting unauthenticated visitors to `/internal/login`. Login posts a password to `/api/internal/login`, which checks it against the `INTERNAL_DASHBOARD_TOKEN` environment variable and sets an HttpOnly session cookie; `/api/internal/logout` clears it. `/internal` currently renders a placeholder page confirming the gate works — dashboard content/metrics to follow.
- Requires setting `INTERNAL_DASHBOARD_TOKEN` in Vercel's Project Settings → Environment Variables (and locally in `.env.local`) for the gate to function in production.

## [0.8.11] - 2026-09-13

### Changed
- Removed the neutral pill-bg letterbox and padding behind the thumbnail entirely — no background of any kind there now, just the image.

## [0.8.10] - 2026-09-13

### Changed
- Removed the Forest-green canvas from all three thumbnails — they now show the raw asset (phone mockup, browser mockup, persona illustration) directly, with a neutral pill-bg letterbox behind anything that doesn't fill the 280×175 box, instead of a colored background. Switched from `object-cover` to `object-contain` so the portrait phone mockup no longer gets cropped to fit a landscape frame. Also fixed a stale alt text left over from the triangle-icon thumbnail (replaced by the persona illustration back in v0.8.4).

## [0.8.9] - 2026-09-13

### Changed
- Removed the pill-bg fill from project cards — border only now, page background shows through instead of a filled card surface.

## [0.8.8] - 2026-09-13

### Changed
- Project cards rebuilt per explicit spec: horizontal layout with title, a "type · topic · read time" meta line, description, and a real "Read case study" button on the left, thumbnail fixed at 280×175px on the right (same size on every card regardless of content). Stacks to thumbnail-on-top on mobile. The whole card is no longer one giant link — only the button and thumbnail are real links (thumbnail is `tabIndex={-1}`/`aria-hidden` so it doesn't create a redundant keyboard/screen-reader stop alongside the button).

## [0.8.7] - 2026-09-13

### Fixed
- Pure whitespace-separated cards felt too plain/unstructured. Brought back a light `.card` border (thin stone border, pill-bg fill, no shadow — not the heavier boxed treatment from earlier) so each project reads as a distinct card again, while keeping the typography and spacing from the minimal direction.

## [0.8.6] - 2026-09-13

### Changed
- Projects page adopts the borderless/minimal card style (style 3 from the comparison) — dropped the `.card` border/shadow, separation now comes from whitespace alone, matching the borderless feel of the case studies themselves. Removed the now-decided `/projects/card-styles` comparison page.

## [0.8.5] - 2026-09-13

### Added
- `/projects/card-styles` — an internal comparison page (not linked from the site) showing the same three projects rendered in four different card styles: poster/overlay, horizontal row, borderless/minimal, and hover-reveal. For evaluating which direction to take the live Projects page in, not itself a permanent page.

## [0.8.4] - 2026-09-13

### Changed
- Made the three project card thumbnails actually feel like a set: all three now share the same Forest background (was 2 Forest + 1 Rust) and a similar visual fill-density (was a full-bleed browser screenshot next to a small centered icon). Replaced the AI Research thumbnail's flat triangle silhouette with the "Meet Ben" persona illustration from the research deck — a real asset with its background removed and recomposited on Forest, rather than a generated icon.
- Added minimum heights to each card's title and description blocks so differing text lengths no longer produce different internal card rhythms even though overall card height was already equalized.

## [0.8.3] - 2026-09-13

### Fixed
- The `SectionLabel` eyebrow used throughout all three case studies (the small label above every section heading, plus the case study hero's "Academic project · Mobile design · 8 min read" line) was styled as Geist Mono, 12px, gray, +0.04em tracking — a self-invented style that didn't match the locked spec's actual "Eyebrow" definition (Figtree 500, 11px, +0.14em, Forest). The Projects index page's own eyebrow already used the correct token, which is what made the mismatch visible. Fixed in all three case study files.

## [0.8.2] - 2026-09-13

### Fixed
- The type pill and topic tags wrapped onto one or two lines depending on how much text each card had (the AI Research card's shorter "UX Research · Methods" fit next to "Academic" on one line, while the other two cards' longer topic strings wrapped to a second) — different cards ended up with different header heights. Now stacked in a fixed column (type pill, then topics below it) always, regardless of text length.

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
