# Architecture & Product Decisions

Record of significant decisions, with rationale, so we don't relitigate.

---

## D1: Static output, no SSR adapter
**Date:** 2026-07-19
**Decision:** Use `output: 'static'` in astro.config.mjs, no Cloudflare adapter.
**Rationale:** All tools are 100% client-side. No dynamic server-side logic needed. Static output deploys to Vercel edge CDN with sub-second TTFB. Previously had `output: 'server'` with Cloudflare adapter — added ~30-50ms cold-start per request for no benefit.
**Trade-off:** If we ever need geo-based locale detection or A/B testing, we'd need to switch back. But middleware can handle that via edge functions if needed.

---

## D2: Privacy-first — no server data processing
**Date:** 2026-07-19
**Decision:** No tool ever sends user data to a server. All processing happens in the browser.
**Rationale:** Core brand differentiator. Users trust OPN Chat because their phone numbers, messages, PDFs, and passwords never leave their device. This is stated in the name (OPN = Online Privacy Network) and reinforced throughout the UI.
**Trade-off:** Some features are impossible (e.g., WhatsApp auto-scheduling requires a server to send messages at a set time). We accept this limitation.

---

## D3: 7 languages, i18n via JSON-in-data-attributes
**Date:** 2026-07-19
**Decision:** 7 locales (en, es, pt, id, ru, de, ar). Translations in `src/i18n/locales/*.ts`. Client-side JS reads strings via `data-*` attributes on a hidden `<div id="tz-i18n">`.
**Rationale:** Server-side `t()` handles static HTML. For JS-rendered content (dynamic HTML), we pass strings through `data-*` attributes because `<script define:vars>` doesn't survive View Transitions.
**Gotcha:** Variable name is `i18nData` (not `tzI18nEl` — that caused a ReferenceError that broke the entire timezone module).

---

## D4: View Transitions (ClientRouter) — event delegation required
**Date:** 2026-07-30
**Decision:** All interactive JS must use event delegation on `document` (not direct `element.addEventListener`), because View Transitions swap the DOM and destroy element references.
**Rationale:** Astro `<ClientRouter />` enables SPA-like navigation. After each swap, old elements (with their listeners) are removed. New elements have no listeners. Only `document`-level listeners survive.
**Pattern:**
```js
// ❌ Breaks after View Transitions:
hamburger.addEventListener('click', toggle);

// ✅ Survives View Transitions:
document.addEventListener('click', (e) => {
  if (e.target.closest('#hamburger')) toggle();
});
```

---

## D5: Scoped CSS + `:global()` for JS-created elements
**Date:** 2026-08-05
**Decision:** Elements created via `innerHTML` in `<script>` need their CSS rules wrapped in `:global()`.
**Rationale:** Astro scoped CSS adds `data-astro-cid-XXX` attribute to elements in `.astro` files. Elements created via JS `innerHTML` lack this attribute, so scoped CSS rules don't match them. This caused the timeline to render as 0-height invisible blocks.
**Pattern:**
```css
/* ❌ Doesn't match JS-created elements: */
.tl-bar { display: grid; }

/* ✅ Matches regardless of Astro scoping: */
:global(.tl-bar) { display: grid; }
```

---

## D6: Merge meeting-scheduler into timezone
**Date:** 2026-08-05
**Decision:** Delete `/meeting-scheduler/` page, merge its functionality as 4th mode in `/timezone/`.
**Rationale:** Both pages did the same thing (compare timezones) with different UI. Two half-finished pages split SEO strength and duplicated code (timeline, best-time, city search). One unified page with 4 modes (Compare / World Clock / Converter / Meeting) is better.
**Trade-off:** `/meeting-scheduler/` URL returns 404. No redirect needed — site is 3 weeks old, not yet indexed by Google.

---

## D7: Remove privacy-badge and top-banner
**Date:** 2026-08-23
**Decision:** Remove "100% Free • Fully Private" banner from all pages, and `privacy-badge` from tool hero sections.
**Rationale:** Privacy is the default, not a feature to advertise on every screen. Repeating it adds visual clutter without adding value. Privacy info lives in footer + `/privacy/` page. Users don't choose tools based on a "100% private" badge — they choose based on functionality.
**Trade-off:** Slightly less "privacy marketing" on first impression. Acceptable — the brand name (OPN = Online Privacy Network) already communicates this.

---

## D8: Blog articles for SEO → tool CTA
**Date:** 2026-08-23
**Decision:** Write long-form blog articles (~2000 words) for each major tool, with multiple CTA links to the tool page. Articles are translated to all 7 languages.
**Rationale:** Google indexes blog content. Users searching for "how to merge PDF" or "pomodoro technique" find the article, then click through to the tool. This is more effective than relying on tool-page SEO alone.
**Pattern:** Each article entry in `blogRelated.ts` maps to `toolPage` + `toolNameKey`, which renders a "Try the Tool" CTA card at the bottom of the article automatically.
