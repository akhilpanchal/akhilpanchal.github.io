import { useEffect, useRef } from 'react';
import { logError } from '../../lib/utils';
import { useTimeTracking } from './useTimeTracking';
import type { SoundCloudWidget } from '../../types/player';

interface SoundCloudPlayerProps {
  trackUrl: string;
  isPlaying: boolean;
  volume?: number;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export default function SoundCloudPlayer({
  trackUrl,
  isPlaying,
  volume = 100,
  onReady,
  onPlay,
  onPause,
}: SoundCloudPlayerProps) {
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isWidgetReady = useRef(false);

  // Use shared time tracking hook
  const { startTracking, stopTracking } = useTimeTracking({
    getTime: () => new Promise<number>((resolve) => {
      widgetRef.current?.getPosition((position: number) => {
        resolve(position / 1000); // SoundCloud returns milliseconds
      });
    }),
  });

  // Initialize widget
  useEffect(() => {
    if (typeof window === 'undefined' || !window.SC || !trackUrl) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      widgetRef.current = new window.SC.Widget(iframe);

      widgetRef.current.bind(window.SC.Events.READY, () => {
        isWidgetReady.current = true;
        // Always set SoundCloud volume to 100%
        widgetRef.current?.setVolume(volume);

        // Start playing
        widgetRef.current?.play();
        onReady?.();
      });

      widgetRef.current.bind(window.SC.Events.PLAY, () => {
        startTracking();
        onPlay?.();
      });

      widgetRef.current.bind(window.SC.Events.PAUSE, () => {
        stopTracking();
        onPause?.();
      });
    } catch (error) {
      logError('SoundCloudPlayer initialization', error);
    }

    return () => {
      stopTracking();
      isWidgetReady.current = false;
      widgetRef.current = null;
    };
  }, [trackUrl, volume, startTracking, stopTracking, onReady, onPlay, onPause]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!widgetRef.current || !isWidgetReady.current) return;

    try {
      if (isPlaying) {
        widgetRef.current.play();
      } else {
        widgetRef.current.pause();
      }
    } catch (error) {
      logError('SoundCloud player control', error);
    }
  }, [isPlaying]);

  // Volume is always set to 100% for SoundCloud (handled on init)

  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    trackUrl
  )}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

  return (
    <iframe
      ref={iframeRef}
      id="soundcloud-player"
      width="100%"
      height="100%"
      allow="autoplay"
      src={embedUrl}
    />
  );
}
