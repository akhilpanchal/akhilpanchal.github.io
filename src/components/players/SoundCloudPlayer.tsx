import { useEffect, useRef } from 'react';
import { updateCurrentTime } from '../../lib/mediaPlayerState';

declare global {
  interface Window {
    SC: any;
  }
}

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
  const widgetRef = useRef<any>(null);
  const timeUpdateIntervalRef = useRef<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isWidgetReady = useRef(false);

  // Initialize widget
  useEffect(() => {
    if (typeof window === 'undefined' || !window.SC || !trackUrl) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    widgetRef.current = window.SC.Widget(iframe);

    widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
      isWidgetReady.current = true;
      // Always set SoundCloud volume to 100%
      widgetRef.current.setVolume(volume);

      // Start playing
      widgetRef.current.play();
      onReady?.();
    });

    widgetRef.current.bind(window.SC.Widget.Events.PLAY, () => {
      startTimeTracking();
      onPlay?.();
    });

    widgetRef.current.bind(window.SC.Widget.Events.PAUSE, () => {
      stopTimeTracking();
      onPause?.();
    });

    return () => {
      stopTimeTracking();
      isWidgetReady.current = false;
      widgetRef.current = null;
    };
  }, [trackUrl]);

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
      console.error('Error controlling SoundCloud player:', error);
    }
  }, [isPlaying]);

  // Volume is always set to 100% for SoundCloud (handled on init)

  const startTimeTracking = () => {
    stopTimeTracking();
    timeUpdateIntervalRef.current = window.setInterval(() => {
      if (widgetRef.current) {
        widgetRef.current.getPosition((position: number) => {
          updateCurrentTime(position / 1000); // SoundCloud returns milliseconds
        });
      }
    }, 1000);
  };

  const stopTimeTracking = () => {
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
      timeUpdateIntervalRef.current = null;
    }
  };

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
