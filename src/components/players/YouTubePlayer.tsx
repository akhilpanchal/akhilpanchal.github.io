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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeUpdateIntervalRef = useRef<number | null>(null);
  const isPlayerReady = useRef(false);

  // Initialize player
  useEffect(() => {
    if (typeof window === 'undefined' || !window.YT || !videoId) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    // YouTube API requires the iframe to have an id
    playerRef.current = new window.YT.Player(iframe, {
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

    return () => {
      stopTimeTracking();
      isPlayerReady.current = false;
      playerRef.current = null;
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

  // Generate YouTube embed URL - React will create fresh iframe when videoId changes
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&modestbranding=1&rel=0`;

  return (
    <iframe
      ref={iframeRef}
      id={`youtube-player-${videoId}`}
      width="100%"
      height="100%"
      src={embedUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
