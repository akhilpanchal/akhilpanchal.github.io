# Media Player Components

This directory contains the refactored media player components for handling both YouTube and SoundCloud playback.

## Architecture

The media player is split into focused, single-responsibility components:

### Core Components

#### `PersistentMediaPlayer.tsx` (Main Orchestrator)
- **Purpose**: Main container component that orchestrates the player UI
- **Responsibilities**:
  - Subscribes to global media player state
  - Conditionally renders YouTube or SoundCloud player based on platform
  - Manages player visibility and positioning (minimized/maximized)
  - Loads platform APIs via custom hooks
- **Dependencies**: Uses state from `mediaPlayerState.ts`

#### `YouTubePlayer.tsx`
- **Purpose**: Handles YouTube video playback
- **Responsibilities**:
  - Initializes YouTube IFrame API player
  - Manages video playback controls (play/pause/volume)
  - Tracks playback time and syncs with global state
  - Handles player lifecycle (create/update/destroy)
- **Props**:
  - `videoId`: YouTube video ID
  - `isPlaying`: Playback state
  - `volume`: Volume level (0-100)
  - `currentTime`: Optional resume time
  - Event callbacks: `onReady`, `onPlay`, `onPause`

#### `SoundCloudPlayer.tsx`
- **Purpose**: Handles SoundCloud track playback
- **Responsibilities**:
  - Initializes SoundCloud Widget API
  - Manages audio playback controls
  - Tracks playback position and syncs with global state
  - Handles widget lifecycle
- **Props**:
  - `trackUrl`: Full SoundCloud track URL
  - `isPlaying`: Playback state
  - `volume`: Volume level (0-100)
  - Event callbacks: `onReady`, `onPlay`, `onPause`

#### `MediaPlayerControls.tsx`
- **Purpose**: Reusable player control header
- **Responsibilities**:
  - Displays track title and platform
  - Provides play/pause button
  - Provides minimize/maximize button
  - Provides close button
- **Props**:
  - `title`: Track title
  - `platform`: 'youtube' | 'soundcloud'
  - `isPlaying`: Current playback state
  - `isMinimized`: Minimized state

### Utilities

#### `useMediaPlayerAPI.ts`
- **Purpose**: Custom React hooks for loading external APIs
- **Exports**:
  - `useYouTubeAPI()`: Loads YouTube IFrame API, returns ready state
  - `useSoundCloudAPI()`: Loads SoundCloud Widget API, returns ready state

## Benefits of This Architecture

1. **Separation of Concerns**: Each component has a single, well-defined responsibility
2. **Maintainability**: Platform-specific logic is isolated in dedicated files
3. **Testability**: Each component can be tested independently
4. **Reusability**: Player components can be reused in other contexts
5. **Readability**: Smaller, focused files are easier to understand
6. **Extensibility**: Adding new platforms (Spotify, Bandcamp) follows the same pattern

## Adding a New Platform

To add support for a new streaming platform:

1. Create a new player component (e.g., `SpotifyPlayer.tsx`)
2. Implement the same interface as YouTube/SoundCloud players
3. Add a hook to `useMediaPlayerAPI.ts` if the platform requires API loading
4. Update `PersistentMediaPlayer.tsx` to conditionally render the new player
5. Update the `Platform` type in `mediaPlayerState.ts`

## State Management

All players sync their state with the global `mediaPlayerState` via:
- `updateCurrentTime()`: Updates playback position
- `updateVolume()`: Syncs volume changes
- Player state (isPlaying, platform, trackId) flows down as props

## Volume Handling

- **YouTube**: Uses 0-100 scale directly
- **SoundCloud**: Converts between 0-1 (API) and 0-100 (state)
- Volume is synced when switching between platforms

## Time Tracking

Both players implement interval-based time tracking:
- Updates every 1 second
- Syncs current position to global state
- Pauses tracking when playback stops
- Cleans up intervals on unmount
