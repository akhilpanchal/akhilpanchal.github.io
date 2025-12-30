import { useEffect, useRef, useState } from 'react';
import {
  getPlayerState,
  subscribeToPlayerState,
  togglePlayPause,
  toggleMinimize,
  closePlayer,
  updateCurrentTime,
  type VideoPlayerState,
} from '../lib/videoPlayerState';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function PersistentVideoPlayer() {
  const [state, setState] = useState<VideoPlayerState>(getPlayerState());
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      setIsReady(true);
      return;
    }

    // Load the API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Set up callback
    window.onYouTubeIframeAPIReady = () => {
      setIsReady(true);
    };
  }, []);

  // Subscribe to state changes
  useEffect(() => {
    const unsubscribe = subscribeToPlayerState((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, []);

  // Initialize or update player when video changes
  useEffect(() => {
    if (!isReady || !state.currentVideoId) return;

    // Create new player if it doesn't exist
    if (!playerRef.current) {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: state.currentVideoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            if (state.currentTime) {
              event.target.seekTo(state.currentTime);
            }
          },
          onStateChange: (event: any) => {
            // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
            if (event.data === 1) {
              startTimeTracking();
            } else {
              stopTimeTracking();
            }
          },
        },
      });
    } else {
      // Update existing player with new video
      playerRef.current.loadVideoById(state.currentVideoId);
    }
  }, [isReady, state.currentVideoId]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!playerRef.current) return;

    try {
      if (state.isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (error) {
      console.error('Error controlling player:', error);
    }
  }, [state.isPlaying]);

  // Track current time
  const startTimeTracking = () => {
    stopTimeTracking();
    timeUpdateIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        updateCurrentTime(currentTime);
      }
    }, 1000);
  };

  const stopTimeTracking = () => {
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
      timeUpdateIntervalRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimeTracking();
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Error destroying player:', error);
        }
      }
    };
  }, []);

  if (!state.isOpen || !state.currentVideoId) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`
        fixed z-50 transition-all duration-300 ease-in-out
        ${state.isMinimized 
          ? 'bottom-4 right-4 w-80 h-48' 
          : 'bottom-0 right-0 w-full md:w-[600px] md:h-[400px] h-[300px] md:bottom-4 md:right-4'
        }
        shadow-2xl rounded-t-lg md:rounded-lg overflow-hidden
        bg-black
      `}
      style={{
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground truncate">
            {state.currentVideoTitle || 'Now Playing'}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 ml-2">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="p-1.5 hover:bg-muted rounded transition-colors"
            aria-label={state.isPlaying ? 'Pause' : 'Play'}
          >
            {state.isPlaying ? (
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
            aria-label={state.isMinimized ? 'Maximize' : 'Minimize'}
          >
            {state.isMinimized ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
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

      {/* Video Player */}
      <div className="relative w-full h-[calc(100%-44px)] bg-black">
        <div id="youtube-player" className="w-full h-full"></div>
      </div>
    </div>
  );
}
