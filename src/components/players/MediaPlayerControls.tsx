import { togglePlayPause, toggleMinimize, closePlayer } from '../../lib/mediaPlayerState';

interface MediaPlayerControlsProps {
  title: string;
  platform: 'youtube' | 'soundcloud';
  isPlaying: boolean;
  isMinimized: boolean;
}

export default function MediaPlayerControls({
  title,
  platform,
  isPlaying,
  isMinimized,
}: MediaPlayerControlsProps) {
  return (
    <div className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground truncate">
          {title || 'Now Playing'}
        </h3>
        <p className="text-xs text-muted-foreground capitalize">{platform}</p>
      </div>

      <div className="flex items-center gap-2 ml-2">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="p-1.5 hover:bg-muted rounded transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Minimize/Maximize Button */}
        <button
          onClick={toggleMinimize}
          className="p-1.5 hover:bg-muted rounded transition-colors"
          aria-label={isMinimized ? 'Maximize' : 'Minimize'}
        >
          {isMinimized ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          )}
        </button>

        {/* Close Button */}
        <button
          onClick={closePlayer}
          className="p-1.5 hover:bg-destructive hover:text-white rounded transition-colors"
          aria-label="Close player"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
