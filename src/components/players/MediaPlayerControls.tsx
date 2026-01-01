import { togglePlayPause, toggleMinimize, closePlayer } from '../../lib/mediaPlayerState';
import { Play, Pause, Minimize2, Maximize2, X } from 'lucide-react';

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
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Minimize/Maximize Button */}
        <button
          onClick={toggleMinimize}
          className="p-1.5 hover:bg-muted rounded transition-colors"
          aria-label={isMinimized ? 'Maximize' : 'Minimize'}
        >
          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </button>

        {/* Close Button */}
        <button
          onClick={closePlayer}
          className="p-1.5 hover:bg-destructive hover:text-white rounded transition-colors"
          aria-label="Close player"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
