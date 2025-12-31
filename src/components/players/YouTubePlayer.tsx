import { useEffect, useRef } from 'react';
import { updateCurrentTime, updateVolume } from '../../lib/mediaPlayerState';

declare global {
  interface Window {
    YT: any;
  }
}

interface YouTubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  volume?: number;
  currentTime?: number;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export default function YouTubePlayer({
  videoId,
  isPlaying,
  volume = 100,
  currentTime,
  onReady,
  onPlay,
  onPause,
}: YouTubePlayerProps) {
  const playerRef = useRef<any>(null);
  const timeUpdateIntervalRef = useRef<number | null>(null);
  const isPlayerReady = useRef(false);

  // Initialize player
  useEffect(() => {
    if (typeof window === 'undefined' || !window.YT || !videoId) return;

    // Create new player if it doesn't exist
    if (!playerRef.current) {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            isPlayerReady.current = true;
            if (currentTime) {
              event.target.seekTo(currentTime);
            }
            if (volume !== undefined) {
              event.target.setVolume(volume);
            }
            onReady?.();
          },
          onStateChange: (event: any) => {
            // YouTube player states: 1 (playing), 2 (paused)
            if (event.data === 1) {
              startTimeTracking();
              onPlay?.();
            } else if (event.data === 2) {
              stopTimeTracking();
              onPause?.();
            }
          },
        },
      });
    } else {
      // Update existing player with new video
      playerRef.current.loadVideoById(videoId);
      if (volume !== undefined) {
        playerRef.current.setVolume(volume);
      }
    }

    return () => {
      stopTimeTracking();
    };
  }, [videoId]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!playerRef.current || !isPlayerReady.current) return;

    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (error) {
      console.error('Error controlling YouTube player:', error);
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!playerRef.current || !isPlayerReady.current || volume === undefined) return;

    try {
      playerRef.current.setVolume(volume);
    } catch (error) {
      console.error('Error setting YouTube volume:', error);
    }
  }, [volume]);

  const startTimeTracking = () => {
    stopTimeTracking();
    timeUpdateIntervalRef.current = window.setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        updateCurrentTime(currentTime);

        // Sync volume
        const currentVolume = playerRef.current.getVolume();
        if (currentVolume !== undefined && currentVolume !== volume) {
          updateVolume(currentVolume);
        }
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
      isPlayerReady.current = false;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Error destroying YouTube player:', error);
        }
      }
    };
  }, []);

  return <div id="youtube-player" className="w-full h-full"></div>;
}
