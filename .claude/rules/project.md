# Project Passport — LARO

> Values here override global rules (`~/.claude/rules/frontend.md`, `seo.md`).
> An empty field takes the default named in its hint; with no default in the hint it is **not decided** — ask the user. `<!-- -->` comments are hints, never values.

## Identity

- Project / client: LARO
- Hand-off: static delivery

## Stack

- Build tool: PostCSS (`@tailwindcss/postcss` + `postcss-cli`) → `dist/styles.css`
- CSS approach: Tailwind v4
- Browser support target: last 2 versions of Chrome / Edge / Firefox, Safari & iOS >= 16.4 (required by Tailwind v4)
- SEO: theme
- Core Web Vitals budget: <!-- default per `seo.md`: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 — write stricter values only -->

## Breakpoints (REQUIRED)

Widths the design is made for. Build and verify these first.

- Min (mobile design width): 320
- Intermediate (if any): none
- Max (desktop design width): 1280

## Layout

- Container max width: 1280px
- Container gutter: `px-3 sm:px-4` (12px, 16px from 640px)

## Typography

- Fonts (family → weights → files): Inter (variable, latin) → 300–700 → `assets/fonts/inter-latin.woff2`

## Deployment

- Target: GitHub Pages via GitHub Actions (`.github/workflows/pages.yml`), https://den-dev-web.github.io/laro/
- Local URL: http://localhost:8000

## Deviations from Global Rules

| Global rule | What differs | Why |
| :---------- | :----------- | :-- |
| `tailwind.md`: Standalone CLI | PostCSS + `@tailwindcss/postcss` | Static site, CSS is built by GitHub Actions on deploy (Node available) |
| `tailwind.md`: compiled CSS committed | `dist/` is ignored; CSS is built in CI | GitHub Pages deploy builds CSS in Actions, no build on hosting |
| `frontend.md`: fluid `clamp()` gutter | `px-3 sm:px-4` | Existing design: fixed 12/16px steps |
