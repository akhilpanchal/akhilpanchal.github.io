import { useEffect, useRef } from 'react';
import { updateVolume } from '../../lib/mediaPlayerState';
import { logError } from '../../lib/utils';
import { useTimeTracking } from './useTimeTracking';
import type { YouTubePlayer, YouTubePlayerEvent } from '../../types/player';
import { YouTubePlayerState } from '../../types/player';

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
  const playerRef = useRef<YouTubePlayer | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isPlayerReady = useRef(false);

  // Use shared time tracking hook
  const { startTracking, stopTracking } = useTimeTracking({
    getTime: () => isPlayerReady.current ?playerRef.current?.getCurrentTime() : 0,
    onTimeUpdate: () => {
      // Sync volume when tracking time
      const currentVolume = playerRef.current?.getVolume();
      if (currentVolume !== undefined && currentVolume !== volume) {
        updateVolume(currentVolume);
      }
    },
  });

  // Initialize player
  useEffect(() => {
    if (typeof window === 'undefined' || !window.YT || !videoId) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      // YouTube API requires the iframe to have an id
      playerRef.current = new window.YT.Player(iframe, {
        events: {
          onReady: (event: YouTubePlayerEvent) => {
            isPlayerReady.current = true;
            if (currentTime) {
              event.target.seekTo(currentTime);
            }
            if (volume !== undefined) {
              event.target.setVolume(volume);
            }
            onReady?.();
          },
          onStateChange: (event: YouTubePlayerEvent) => {
            if (event.data === YouTubePlayerState.PLAYING) {
              startTracking();
              onPlay?.();
            } else if (event.data === YouTubePlayerState.PAUSED) {
              stopTracking();
              onPause?.();
            }
          },
        },
      });
    } catch (error) {
      logError('YouTubePlayer initialization', error);
    }

    return () => {
      stopTracking();
      isPlayerReady.current = false;
      playerRef.current = null;
    };
  }, [videoId, startTracking, stopTracking, currentTime, volume, onReady, onPlay, onPause]);

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
      logError('YouTube player control', error);
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!playerRef.current || !isPlayerReady.current || volume === undefined) return;

    try {
      playerRef.current.setVolume(volume);
    } catch (error) {
      logError('YouTube volume control', error);
    }
  }, [volume]);

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
