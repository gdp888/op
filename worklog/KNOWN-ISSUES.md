# Known Issues

Bugs, tech debt, and things that need fixing. Updated as we discover them.

## 🔴 Active bugs

### Mobile 320px horizontal overflow
**Where:** `/timezone/` and possibly other pages
**Cause:** `.timeline-header` has `min-width: 480px`, `.tl-bar` has `flex: 0 0 480px` — forces horizontal scroll on screens < 480px.
**Fix:** Add `overflow-x: auto` to `.timeline-wrapper` (already done) + reduce `min-width` to `360px` on `@media (max-width: 520px)`.
**Status:** Partially fixed (timeline-wrapper has overflow-x: auto). Still overflows slightly on 320px.

### `/scheduler/` page is non-functional
**Where:** `/scheduler/` (WhatsApp Scheduler)
**Cause:** Tries to POST to `/api/scheduler` (doesn't exist, static output). Falls back to localStorage — but nobody sends the message. User thinks they scheduled a message, but nothing happens.
**Fix:** Either delete the page, or rewrite as "WhatsApp Reminder" (browser Notification API + setTimeout, user manually sends).
**Status:** User decision pending. See DECISIONS.md D2.

## 🟡 Tech debt

### Duplicate page wrappers (src/pages/ + src/pages/[lang]/)
**Issue:** Each tool has 2 files: `src/pages/<tool>/index.astro` (EN) + `src/pages/[lang]/<tool>/index.astro` (6 locales). 40+ files that do the same thing.
**Fix:** Merge into single file per tool using `getStaticPaths` with `params: { lang: lang === defaultLang ? undefined : lang }`.
**Status:** Not urgent, but adds maintenance overhead.

### Content collections on deprecated API
**Issue:** `src/content/config.ts` uses `type: 'content'` (Astro 5 deprecated). Should use Content Layer API with `loader: glob()`.
**Fix:** Migrate to `glob({ pattern: '**/*.md', base: './src/content/blog' })`.
**Status:** Works for now, will break in Astro 6.

### `useTranslations` has no type safety for missing keys
**Issue:** `ui[lang][key] || ui[defaultLang][key]` returns `undefined` if key missing in both. Renders as empty string. No warning in dev.
**Fix:** Add console.warn in dev mode when key is missing.
**Status:** Low priority — most keys exist in all locales.

### i18n keys not fully translated in all locales
**Issue:** `footer.section.*` keys (whatsapp, telegram, texttools, utilities) only exist in `en.ts`. Other locales fall back to English.
**Fix:** Add translations to all 7 locales.
**Status:** Cosmetic — English labels in footer on non-EN pages.

### og:image missing on all pages
**Issue:** No `<meta property="og:image">` on any page. Social sharing shows text-only preview.
**Fix:** Use `astro-og-canvas` or `@vercel/og` to generate 1200×630 PNG per page.
**Status:** Medium priority — affects social media CTR.

### Service Worker precache is hardcoded
**Issue:** `public/sw.js` has a hardcoded list of 177 URLs. Adding a new tool or locale requires manually updating the SW.
**Fix:** Generate precache list at build time via Astro endpoint that reads `Astro.glob`.
**Status:** Low priority — works, just annoying to maintain.

## 🟢 Minor issues

### Phone placeholder is Moscow number on all locales
**Issue:** WhatsApp/Viber/Signal pages show placeholder `7 951 899 4988` (Moscow) on all language variants.
**Fix:** Use locale-specific placeholder (e.g., `55 1234 5678` for ES, `11 91234 5678` for PT).

### `chatLabel = 'Viber'` hardcoded
**Issue:** In ViberContent.astro, `const chatLabel = 'Viber'` is not translated. History button shows "Viber" even on Arabic pages.
**Fix:** Use `t('vb.history.chatBtn')` or just remove the constant.

### `langCodes` uses 3-letter codes (ENG/ESP/POR)
**Issue:** Language switcher shows "ENG" instead of "EN", "ESP" instead of "ES". Non-standard — GitHub/Apple use 2-letter.
**Fix:** Change `langCodes` to 2-letter: `{ en: 'EN', es: 'ES', ... }`.

### `tsconfig.json` not strict
**Issue:** Extends `astro/tsconfigs/base` instead of `astro/tsconfigs/strict`.
**Fix:** Switch to `strict` and fix type errors.
**Status:** Low priority but improves code quality.
