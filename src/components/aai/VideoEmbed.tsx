import { useEffect, useRef } from 'react';
import { stopAllOtherPlayers, onStopAllPlayers } from '@/lib/mediaPlayerState';

interface VideoEmbedProps {
  src: string;
  caption: string;
}

export default function VideoEmbed({ src, caption }: VideoEmbedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerIdRef = useRef(`video-${src}`);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      stopAllOtherPlayers(playerIdRef.current);
    };

    video.addEventListener('play', handlePlay);

    // Listen for stop-all events
    const cleanup = onStopAllPlayers(playerIdRef.current, () => {
      if (!video.paused) {
        video.pause();
      }
    });

    return () => {
      video.removeEventListener('play', handlePlay);
      cleanup();
    };
  }, [src]);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
      <video
        ref={videoRef}
        controls
        className="w-full aspect-video bg-black"
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="p-4">
        <p className="text-sm text-foreground/80">{caption}</p>
      </div>
    </div>
  );
}
