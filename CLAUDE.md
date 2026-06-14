# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

No test framework is configured.

## Stack

- **Next.js 16** with App Router — this is a version with breaking API changes from what Claude was trained on. Before writing any routing, data-fetching, or Server Component code, read `node_modules/next/dist/docs/01-app/` for current conventions.
- **React 19** + **TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/postcss` — config is in `postcss.config.mjs`, not `tailwind.config.js`. The v4 API differs significantly from v3.

## Architecture

The site is a personal portfolio with an App Router layout:

- `app/layout.tsx` — root layout wrapping every page with `<Nav>` and `<Footer>`
- `app/page.tsx` — home/hero page (marked `'use client'` for hover interactions)
- `app/work/`, `app/projects/`, `app/skills/`, `app/about/`, `app/resume/`, `app/contact/` — each is a standalone `page.tsx`
- `components/Nav.tsx`, `components/Footer.tsx` — shared shell components

## Styling Conventions

All styling uses **inline `style` props with CSS custom properties** — not Tailwind utility classes. The design tokens are defined in `app/globals.css`:

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#0d0c09` | Page background |
| `--surface` | `#141310` | Card/section background |
| `--accent` | `#c8f13f` | Brand yellow-green |
| `--text` | `#ede8da` | Primary text |
| `--soft` | `#898060` | Secondary text |
| `--muted` | `#4a4535` | Dimmed text |
| `--border` | `rgba(255,255,255,0.07)` | Subtle borders |
| `--max` | `840px` | Content max-width |
| `--nav-h` | `52px` | Nav height offset |

**Font variables:**
- `--font-body`: Bricolage Grotesque (sans-serif)
- `--font-disp`: Instrument Serif (display/headings, used italic + large)
- `--font-mono`: DM Mono

**Animations:** `fadeUp` and `blink` keyframes are defined globally. Use `animation: 'fadeUp 0.Xs ease Ys both'` with staggered delays for entrance sequences. Pages use `'use client'` when they need hover state or event handlers inline.
