# Roadmap

Planned features, ideas, and priorities for opnchat.net.

## 🔴 High priority

### Timezone page
- [ ] **URL state sync** — save base TZ + cities + custom time in URL hash, so users can share a link to a specific comparison
- [ ] **Auto-detect timezone** — button "Use my timezone" via `Intl.DateTimeFormat().resolvedOptions().timeZone`
- [ ] **localStorage persistence** — save base TZ + added cities between sessions
- [ ] **Sweet spot finder** — algorithm to find best meeting window across 3+ timezones (not just 2)
- [ ] **Timeline for 3+ cities** — currently only shows 2 rows (Card 1 + Card 2); expand to all added cities

### Mobile UX
- [ ] **Fix 320px overflow** — timeline `min-width: 480px` causes horizontal scroll on old iPhones
- [ ] **Bottom nav bar** — consider tab bar for mobile instead of hamburger drawer

## 🟡 Medium priority

### New tools
- [ ] **Image compressor** — client-side via Canvas API, no upload (like Squoosh)
- [ ] **Color picker / converter** — HEX ↔ RGB ↔ HSL, palette generator
- [ ] **JSON formatter** — pretty-print, validate, minify
- [ ] **Base64 encoder/decoder** — text ↔ base64, file ↔ base64
- [ ] **Markdown previewer** — live preview, export HTML
- [ ] **Hash generator** — MD5, SHA-1, SHA-256, SHA-512

### Existing tool improvements
- [ ] **Pomodoro: weekly history chart** — visualize sessions over 7 days
- [ ] **Pomodoro: PWA install** — add to manifest.json as standalone app
- [ ] **PDF Merger: split PDF** — extract specific pages to new PDF
- [ ] **PDF Merger: rotate pages** — 90°/180°/270° rotation
- [ ] **QR Code: WiFi QR** — SSID + password → scannable WiFi QR
- [ ] **Password: strength meter** — visual feedback (weak/fair/strong)
- [ ] **Notepad: markdown support** — render markdown in preview pane

### SEO
- [ ] **OG images** — generate 1200×630 PNG per page via `astro-og-canvas` or `@vercel/og`
- [ ] **Twitter cards** — switch from `summary` to `summary_large_image`
- [ ] **Blog: more articles** — timezone guide, PDF merging guide, password security guide

## 🟢 Low priority / ideas

- [ ] **PWA offline mode** — cache all tool pages in Service Worker for full offline
- [ ] **Dark/light/auto theme** — add "auto" option that follows system preference
- [ ] **Keyboard shortcuts** — site-wide `/` to focus search, `g` then `h` for home
- [ ] **Export settings** — download all localStorage data as JSON backup
- [ ] **Multi-language blog** — currently blog listing is EN-only; add locale-specific listings
- [ ] **Analytics dashboard** — privacy-friendly self-hosted analytics (Umami already installed)

## ❌ Rejected / not doing

- **WhatsApp auto-scheduler** (`/scheduler/`) — requires server + WhatsApp Business API, contradicts privacy-first. Current page is non-functional (localStorage only, no actual sending). Recommend delete.
- **Server-side rendering** — all tools are client-side, no need for SSR/Cloudflare adapter
- **User accounts** — contradicts privacy-first, no sign-up philosophy
