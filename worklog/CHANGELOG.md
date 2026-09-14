# Changelog

All notable changes to opnchat.net, reverse-chronological (newest first).

---

## 2026-08-23 — Pomodoro improvements + blog article + top banner removal

### Added
- **Pomodoro Timer: sidebar link** — was only in mobile drawer + hub, now in desktop ToolSidebar (Beta section) with pomodoro icon
- **Pomodoro: Session History** — new section below stats bar, records each completed work session (timestamp + task name + duration), shows today's sessions only, Clear button, persists in `localStorage('pomodoro-history')`, max 100 entries, 4 new i18n keys × 7 locales
- **Blog: Pomodoro Timer Guide** — 7-language SEO article (~2000 words each) with 9 CTA links to `/pomodoro/` per article, added to `blogRelated.ts` for related-tool-card rendering

### Removed
- **Top banner** — "100% Free • Fully Private" banner removed from all pages. Was visual clutter, privacy/free messaging already covered by footer + /privacy/ page. Deleted `TopBanner.astro` (207 lines), Layout import, 3 i18n keys × 7 locales

### Verified working (already existed)
- Pomodoro notifications (Notification API) — permission requested on first click, fires on session complete
- Pomodoro sound (Web Audio API oscillator) — toggle in settings
- Pomodoro keyboard shortcuts — Space/R/S
- Pomodoro wake lock — screen stays on during timer

---

## 2026-08-09 — PDF Merger tool

### Added
- **PDF Merger** (`/pdf-merger/`) — merge multiple PDF files into one, 100% client-side via `pdf-lib` library. Drag & drop upload, reorder files (up/down), remove individual files, merge + download. 52 i18n keys × 7 locales. Added to sidebar (Utilities), footer, hub card with 🆕 badge. Schema.org JSON-LD (WebApplication + BreadcrumbList + FAQPage).

---

## 2026-08-06 — Viber + Signal pages

### Added
- **Viber page** (`/viber/`) — message Viber numbers without saving, uses `viber://chat` deep link, desktop download hint, 7 locales
- **Signal page** (`/signal/`) — message Signal numbers without saving, uses `signal.me/#p/` link, 7 locales
- **Blog posts** for Viber (7 languages) and Signal (7 languages)

### Fixed
- Footer: added "More Messengers" section with Viber + Signal links (was missing)
- llms.txt: full rewrite from 2024 state — now lists all 19 tools, 7 languages, 4 protocols
- manifest.json: updated name + start_url from WhatsApp-only to all-tools
- sw.js: expanded precache from 13 URLs to 177 (all 7 locales × 19 tools + Cairo fonts + legal pages)

---

## 2026-08-05 — Timezone page improvements

### Added
- **Searchable city modal** — replaced 42-option `<select>` with live-filter listbox. Searches by localized name + English fallback + IANA code + UTC offset. Keyboard navigation (ArrowUp/Down/Enter/Escape). RTL support. 3 new i18n keys × 7 locales.
- **Base city badge** — shows city name next to current time in Step 2 (e.g. "Москва 14:32:05 GMT+3")
- **Quick-info card** — after clicking city in Step 3 search, shows current time in that city immediately (no need to scroll to timeline)
- **Meeting mode** — merged meeting-scheduler into timezone page as 4th mode toggle. Reuses Card 1 + Card 2 cities. Work-hours filter, slot picker, WhatsApp share, Copy button. 14 `tz.meeting.*` i18n keys × 7 locales.

### Fixed
- **Visual 24h timeline** — `.tl-*` CSS rules wrapped in `:global()` (Astro scoped CSS didn't match JS-created innerHTML elements). Timeline now renders correctly: grid layout, colored segments, now-marker, best-time badges.
- **Mobile burger menu** — died after View Transitions navigation. Fixed by switching from `element.addEventListener` to event delegation on `document`.

### Removed
- **privacy-badge** — removed from all 15 tool pages (was visual clutter, ~7KB saved)
- **meeting-scheduler** — merged into timezone page. Deleted `MeetingSchedulerContent.astro` (882 lines), page files, sidebar/footer entries. Net: -326 lines.

---

## 2026-07-30 — Language switcher + header fixes

### Fixed
- **Language switcher** — replaced inline button row with `<details>` dropdown + globe icon. Survives 6+ languages. RTL-aware via `inset-inline-end`. Keyboard navigation. 3 i18n keys × 7 locales.
- **Site header** — added `<header>` + `<nav aria-label="Language switcher">` with `<ul>/<li>` for accessibility. Applied to all pages.
- **Mobile layout** — header no longer overflows at 320px (iPhone 5). Logo hides on `<640px`.

---

## 2026-07-19 — Initial site review

### Found issues
- Viber/Signal buttons blue instead of brand colors
- H1 too small (32px → 48px)
- No country flag picker on WhatsApp input
- No dark mode
- No images on pages
- `output: 'server'` but all pages prerendered (unnecessary Cloudflare adapter)
- Service Worker v8 only cached 4 of 7 languages
- BreadcrumbList JSON-LD bug (missing tool slug)
- `document.documentElement.lang` sniffing in JS instead of i18n keys
- Times New Roman leaking (missing font-family on some elements)
- Root repo clutter (ping-result.json, whatsapp-direct/ subfolder, download/ screenshots)
