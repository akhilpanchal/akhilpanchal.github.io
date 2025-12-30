# algorythm.dev

Personal website built with Astro, featuring a music discography with dynamic YouTube integration.

## Features

- 🎵 **Music Discography**: Display YouTube videos with inline playback
- 📅 **Dynamic Release Dates**: Automatically fetched from YouTube API at build time
- 📝 **Blog**: Write posts in MDX with React components
- 🌗 **Dark Mode**: Theme toggle with system preference detection
- 🎨 **Design System**: Built with shadcn/ui and Tailwind CSS

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. YouTube API (Optional)

To fetch video release dates automatically, set up YouTube Data API:

```bash
# Copy example env file
cp .env.example .env

# Add your YouTube API key
YOUTUBE_API_KEY=your_key_here
```

See [YOUTUBE-API-SETUP.md](./YOUTUBE-API-SETUP.md) for detailed instructions.

**Note**: The site works without an API key - videos just won't show release dates.

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # Astro and React components
├── content/           # Blog posts and music content
├── data/              # Discography data
├── layouts/           # Page layouts
├── lib/               # Utilities (YouTube API, etc.)
├── pages/             # Route pages
└── styles/            # Global styles
```

## Adding Music

Add videos to `src/data/discography.ts`:

```typescript
{
  videoId: 'abc123xyz',     // From YouTube URL
  title: 'Song Title',
  category: 'original',     // or 'cover'
  description: 'Description',
  // releaseDate fetched automatically from YouTube!
}
```

## Documentation

- [YouTube API Setup](./YOUTUBE-API-SETUP.md) - Configure automatic date fetching
- [Inline Player Guide](./INLINE-PLAYER-GUIDE.md) - Persistent video player details
- [Discography Guide](./DISCOGRAPHY-README.md) - Complete discography documentation

