# Dev Tips & Gotchas

Lessons learned from working on opnchat.net. Read before starting a new task.

---

## Astro View Transitions (ClientRouter)

### Rule: Always use event delegation
`<ClientRouter />` swaps the DOM on navigation. Old elements (with listeners) are destroyed. New elements have no listeners. Only `document`-level listeners survive.

```js
// ❌ Dies after first View Transitions swap:
hamburger.addEventListener('click', toggle);

// ✅ Survives all swaps:
document.addEventListener('click', (e) => {
  if (e.target.closest('#hamburger')) toggle();
});
```

### Rule: `<script is:inline>` re-runs on every page load
`is:inline` scripts execute on every full page load. They do NOT re-run after View Transitions swap. Use `astro:page-load` event for that.

### Rule: `<script define:vars={{ lang }}>` doesn't survive View Transitions
The script runs once, captures `lang` from SSR. After VT swap, the new page's `lang` is different but the script doesn't re-execute. Solution: read `lang` from `document.documentElement.lang` or `data-*` attributes instead.

---

## Astro Scoped CSS

### Rule: `:global()` for JS-created elements
Elements created via `innerHTML` in `<script>` lack the `data-astro-cid-XXX` attribute. Scoped CSS rules don't match them. Wrap in `:global()`:

```css
/* ❌ Doesn't match JS innerHTML elements: */
.tl-bar { display: grid; }

/* ✅ Works: */
:global(.tl-bar) { display: grid; }
```

This bug affected: timeline (`TimeZoneContent.astro`), meeting scheduler, and slot picker. Same pattern — all fixed by `:global()`.

---

## i18n

### Variable name: `i18nData` (not `tzI18nEl`)
The i18n data element is: `const i18nData = document.getElementById('tz-i18n')`.  
If you use `tzI18nEl` (doesn't exist) → ReferenceError → entire module breaks → all buttons stop working.

### Pattern: pass strings via `data-*` attributes
For JS-rendered content, pass i18n strings through data attributes on a hidden div:

```astro
<div id="tz-i18n"
  data-meeting-at={t('tz.meeting.result.meeting_at')}
  data-no-overlap={t('tz.meeting.result.no_overlap')}
  style="display:none"></div>
```

Then in JS:
```js
const i18nData = document.getElementById('tz-i18n');
const meetingAt = i18nData?.dataset?.meetingAt || 'Meeting at';
```

### Adding i18n keys to all 7 locales
Use a Python script (see `scripts/add_*.py`). Pattern:
1. Find insertion point (after a known key, or before `// Language switcher`)
2. Build the key-value block
3. Insert into each locale file

---

## Testing

### Local server that survives sandbox
```bash
cd dist && python3 -m http.server 3000 &
```
Astro `dev` and `preview` servers die between bash commands in this sandbox. Python http.server survives.

### Agent-browser can't change `<select>` via JS `element.value = ...`
Use `agent-browser select @eXX "value"` instead. Or use `agent-browser find label "..." focus` + real click.

### Check production HTML without browser
```bash
curl -s https://opnchat.net/ru/timezone/ | grep -o "pattern"
```

---

## Git / GitHub

### Token in git remote URL
```bash
git remote set-url origin "https://x-access-token:TOKEN@github.com/gdp888/4.git"
git push origin HEAD
git remote set-url origin "https://github.com/gdp888/4.git"  # clean up
```

### Generate patch when push fails (token revoked)
```bash
git format-patch -1 HEAD --output /home/z/my-project/download/0001-description.patch
```
User applies locally: `git apply 0001-description.patch && git commit && git push`

---

## Performance

### Self-hosted fonts with `unicode-range`
Split font files by Unicode range to avoid loading Arabic fonts on non-Arabic pages:

```css
@font-face {
  font-family: 'Cairo';
  src: url('/fonts/Cairo-Regular-Latin.woff2') format('woff2');
  unicode-range: U+0000-024F, U+0300-036F; /* Latin only */
}
@font-face {
  font-family: 'Cairo';
  src: url('/fonts/Cairo-Regular.woff2') format('woff2');
  unicode-range: U+0600-06FF, U+FB50-FDFF; /* Arabic only */
}
```

### Service Worker versioning
Bump `CACHE_NAME = 'opnchat-cache-vN'` on every SW change. Old cache auto-deleted on activate.

---

## Reusable patterns

### Tool page structure
Every tool follows this pattern:
1. `src/components/<Tool>Content.astro` — component with UI + JS + CSS
2. `src/pages/<tool>/index.astro` — EN wrapper (3 lines)
3. `src/pages/[lang]/<tool>/index.astro` — locale wrapper with `getStaticPaths`
4. `src/i18n/locales/*.ts` — i18n keys
5. `src/components/ToolSidebar.astro` — add to sidebar + icon
6. `src/components/SiteHeader.astro` — add to mobile nav + icon
7. `src/components/Footer.astro` — add to footer
8. `src/components/HubContent.astro` — add card on hub page

### Schema.org JSON-LD
Every tool page includes `WebApplication` + `BreadcrumbList` + `FAQPage` schema.
