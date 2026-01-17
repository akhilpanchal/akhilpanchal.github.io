# algorythm.dev

Personal website for Akhil Panchal, built with Astro and featuring a blog, music discography, and a persistent media player.

## Features

- 🎵 **Music Discography**: Centralized discography powered by a persistent YouTube/SoundCloud player
- 📅 **Release Dates**: Manually curated release dates stored in the discography data and sorted newest-first
- 📝 **Blog**: Content collections for blog and music posts, with MDX support for React components
- 🌗 **Dark Mode**: Theme toggle with system preference detection and local storage persistence
- 🎨 **Design System**: Tailwind CSS 4 with shadcn-style UI components

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

## Project structure

```text
src/
├── components/         # Astro and React components (UI, discography, media player, etc.)
├── content/            # Content collections: blog/ and music/
├── data/               # Discography data (YouTube + SoundCloud tracks)
├── layouts/            # Page layouts and base layout
├── lib/                # Utilities (media player state, date formatting, helpers)
├── pages/              # Route pages (index, posts, music, about, rss, etc.)
├── styles/             # Global styles and typography configuration
└── types/              # Shared TypeScript types (media player, YouTube IFrame API)
```

## Managing the discography

Tracks are defined in `src/data/discography.ts` using the `MediaTrack` type:

```ts
export interface MediaTrack {
  platform: 'youtube' | 'soundcloud';
  trackId: string;      // YouTube videoId or SoundCloud track URL
  title: string;
  releaseDate?: Date | string; // Manually specified
  description?: string;
  category?: 'original' | 'cover';
  thumbnailUrl?: string;
}
```

To add a new track:

1. Add a new `MediaTrack` entry to the `discographyData` array in `src/data/discography.ts`.
2. Set `platform` to `'youtube'` or `'soundcloud'`.
3. Set `trackId` to the YouTube video ID or full SoundCloud URL.
4. Provide `releaseDate` as `YYYY-MM-DD` so sorting works correctly.
5. Optionally set `category` (`'original'` or `'cover'`) and `description`.

Helper functions like `getOriginalSongs`, `getCoverSongs`, and `getAllTracksSorted` are exported from the same file for use in components.

