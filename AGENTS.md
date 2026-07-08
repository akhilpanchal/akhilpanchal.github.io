# Agents.md

## Project Overview

Personal website of Akhil Panchal — built with Astro 7, React 19, Tailwind CSS v4, TypeScript 6, and Vite 8. Content is authored in Markdown/MDX. Styling uses Tailwind CSS v4 with `@tailwindcss/typography`. Audio playback uses `wavesurfer.js`.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check (`astro check`) + build |
| `npm run preview` | Preview production build |
| `npm run astro` | Astro CLI passthrough |

## Commit Workflow

- Use **conventional commits** format: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, etc.
- **Always ask for approval** before committing or pushing to the `main` branch. Do not commit without an explicit yes.
- Stage files explicitly with `git add <file>`.
- Each logical change should be its own commit with a clear scope.

## Code & Content Conventions

- **No comments** in code unless the logic is non-obvious.
- **No emojis** in code or commits unless explicitly requested.
- **No `any` types** — prefer `unknown` + type narrowing.
- **Blog images** use `image.remotePatterns` in `astro.config.mjs` for any external image host.

## Build Verification

- Always run `npm run build` before committing to catch type errors and build failures.
- The build runs `astro check` (TypeScript checking) then `astro build`.
- Build output goes to `dist/` (gitignored).

## Stack

- Astro 7 (static site, no SSR adapter)
- React 19 with `@astrojs/react` v6
- Tailwind CSS v4 with `@tailwindcss/vite` plugin + `@tailwindcss/typography`
- TypeScript 6 (strict mode via `astro/tsconfigs/strict`)
- **Icons:** `lucide-react` 1.x for **UI icons** (e.g. `Moon`, `Sun`, `Play`, `Pause`, `Volume2`, `VolumeX`, `Minimize2`, `Maximize2`, `X`, `ChevronLeft`, `ChevronRight`). Use `simple-icons` npm package for **brand icons** (e.g. `Github`, `Instagram`, `Youtube`). LinkedIn logo not available in `simple-icons` — inline its SVG path directly. Future icon additions must follow this split: never use `lucide-react` for brand icons, and never use `simple-icons` for UI icons.
- wavesurfer.js 7.x
- shadcn/ui (dialog components using Radix UI primitives)
- Content collections via Astro Content Layer API (`src/content.config.ts` with `glob()` loader)
- i18n: English (default), Marathi, Gujarati, Hindi
- RSS feed via `@astrojs/rss`

## Known Maintenance Items

- `src/components/ui/dialog.tsx` uses deprecated `React.ElementRef` (should use `ComponentRef`) — from shadcn/ui.
- `src/components/aai/AudioCard.tsx` has unused `date` prop.
