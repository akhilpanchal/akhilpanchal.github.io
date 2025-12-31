import { useEffect, useState } from 'react';
import {
  getPlayerState,
  subscribeToPlayerState,
  type MediaPlayerState,
} from '../lib/mediaPlayerState';
import { useYouTubeAPI, useSoundCloudAPI } from './players/useMediaPlayerAPI';
import YouTubePlayer from './players/YouTubePlayer';
import SoundCloudPlayer from './players/SoundCloudPlayer';
import MediaPlayerControls from './players/MediaPlayerControls';

export default function PersistentMediaPlayer() {
  const [state, setState] = useState<MediaPlayerState>(getPlayerState());
  const isYouTubeReady = useYouTubeAPI();
  const isSoundCloudReady = useSoundCloudAPI();

  // Subscribe to state changes
  useEffect(() => {
    const unsubscribe = subscribeToPlayerState((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, []);

  // Don't render if player is not open or no track selected
  if (!state.isOpen || !state.currentTrackId || !state.platform) {
    return null;
  }

  const containerClassName = `
    fixed z-50 transition-all duration-300 ease-in-out
    ${
      state.isMinimized
        ? 'bottom-4 right-4 w-80 h-48'
        : 'bottom-0 right-0 w-full md:w-[600px] md:h-[400px] h-[300px] md:bottom-4 md:right-4'
    }
    shadow-2xl rounded-t-lg md:rounded-lg overflow-hidden
    bg-black
  `;

  return (
    <div className={containerClassName} style={{ backdropFilter: 'blur(10px)' }}>
      {/* Player Controls Header */}
      <MediaPlayerControls
        title={state.currentTrackTitle || 'Now Playing'}
        platform={state.platform}
        isPlaying={state.isPlaying}
        isMinimized={state.isMinimized}
      />

      {/* Media Player Container */}
      <div className="relative w-full h-[calc(100%-44px)] bg-black">
        {state.platform === 'youtube' && isYouTubeReady && (
          <YouTubePlayer
            videoId={state.currentTrackId}
            isPlaying={state.isPlaying}
            volume={state.volume}
            currentTime={state.currentTime}
          />
        )}

        {state.platform === 'soundcloud' && isSoundCloudReady && (
          <SoundCloudPlayer
            trackUrl={state.currentTrackId}
            isPlaying={state.isPlaying}
            volume={state.volume}
          />
        )}
      </div>
    </div>
  );
}
