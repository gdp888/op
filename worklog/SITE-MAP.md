# Site Map

Current inventory of all pages, tools, and languages on opnchat.net.

## Languages (7)

| Code | Language | URL prefix | RTL |
|------|----------|------------|-----|
| `en` | English | `/` (root) | No |
| `es` | Español | `/es/` | No |
| `pt` | Português | `/pt/` | No |
| `id` | Bahasa Indonesia | `/id/` | No |
| `ru` | Русский | `/ru/` | No |
| `de` | Deutsch | `/de/` | No |
| `ar` | العربية | `/ar/` | Yes |

## Tools (19)

### Messengers (7)
| Slug | Component | Brand color | Deep link protocol |
|------|-----------|-------------|-------------------|
| `whatsapp` | PageContent.astro | `#25D366` | `wa.me` |
| `wa-link` | LinkContent.astro | `#25D366` | `wa.me` |
| `wa-widget` | WidgetContent.astro | `#25D366` | `wa.me` |
| `whatsapp-text-formatter` | FormatterContent.astro | `#25D366` | — |
| `telegram` | TelegramContent.astro | `#2AABEE` | `t.me` |
| `tg-link` | TgLinkContent.astro | `#2AABEE` | `t.me` |
| `viber` | ViberContent.astro | `#7360F2` | `viber://chat` |
| `signal` | SignalContent.astro | `#3A76F0` | `signal.me/#p/` |
| `kakaotalk` | KakaoTalkContent.astro | `#FEE500` | `kakaolink` |
| `instagram` | InstagramContent.astro | `#E1306C` | `instagram.com` |

### Text Tools (4)
| Slug | Component |
|------|-----------|
| `fancy-text` | FancyTextContent.astro |
| `word-counter` | WordCounterContent.astro |
| `notepad` | NotepadContent.astro |
| `quick-replies` | QuickRepliesContent.astro |

### Utilities (6)
| Slug | Component | Notes |
|------|-----------|-------|
| `qr-code` | QrContent.astro | Uses easyqrcodejs |
| `password` | PasswordContent.astro | Uses crypto.getRandomValues |
| `unit-converter` | ConverterContent.astro | — |
| `emoji-picker` | EmojiPickerContent.astro | — |
| `pdf-merger` | PDFMergerContent.astro | Uses pdf-lib |
| `broadcast` | BroadcastContent.astro | — |

### Productivity / Beta (3)
| Slug | Component | Notes |
|------|-----------|-------|
| `timezone` | TimeZoneContent.astro | 4 modes: Compare / World Clock / Converter / Meeting |
| `pomodoro` | PomodoroContent.astro | History + notifications + sound + wake lock |
| `scheduler` | SchedulerContent.astro | ⚠️ Non-functional (needs server) |

### Other pages
| URL | Component |
|-----|-----------|
| `/` | HubContent.astro |
| `/blog/` | blog/index.astro |
| `/blog/[slug]` | blog/[slug].astro |
| `/privacy/` | PrivacyContent.astro |
| `/disclaimer/` | DisclaimerContent.astro |
| `404` | 404.astro |

## Blog posts (51 files)

### English (7)
- whatsapp-without-saving-number
- whatsapp-direct-message
- whatsapp-click-to-chat-guide
- whatsapp-link-generator
- whatsapp-text-formatting
- whatsapp-widget-website
- telegram-without-saving-number
- viber-without-saving-number
- signal-without-saving-number
- pomodoro-timer-guide

Each article translated to all 7 languages (slug + `-ru`, `-es`, `-pt`, `-id`, `-de`, `-ar`).

## Tech stack

| Component | Technology |
|-----------|-----------|
| Framework | Astro 5.18 |
| Output | Static |
| Deploy | Vercel |
| i18n | Custom (src/i18n/locales/*.ts) |
| Routing | File-based + `[lang]` dynamic |
| CSS | Scoped `<style>` in .astro + `:global()` for JS elements |
| JS | `<script is:inline>` (event delegation) + `<script>` (modules) |
| Fonts | Self-hosted Inter (Latin) + Cairo (Arabic) |
| PWA | manifest.json + sw.js (v9) |
| Analytics | Umami (self-hosted, privacy-friendly) |
| Content | Astro Content Collections (blog/*.md) |
| Libraries | pdf-lib, easyqrcodejs, jspodf, spacetime |

## Total pages built

~309 HTML pages (7 locales × ~19 tools + blog + legal + hub + 404)
