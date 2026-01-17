import { useEffect, useRef } from 'react';
import { stopAllOtherPlayers, onStopAllPlayers } from '@/lib/mediaPlayerState';

interface Props {
  id: string;
  title?: string;
}

export default function YouTube({ id, title = 'YouTube video' }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerIdRef = useRef(`youtube-${id}`);

  useEffect(() => {
    // Stop other players when this YouTube video starts playing
    // Note: We can't detect YouTube iframe play events without the YouTube API,
    // so we stop others when the component is interacted with
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleClick = () => {
      // Delay to allow the click to register with YouTube iframe
      setTimeout(() => {
        stopAllOtherPlayers(playerIdRef.current);
      }, 100);
    };

    iframe.addEventListener('click', handleClick);

    // Listen for stop-all events
    const cleanup = onStopAllPlayers(playerIdRef.current, () => {
      // Reload iframe to stop playback (YouTube iframe doesn't allow pause without API)
      const src = iframe.src;
      iframe.src = '';
      iframe.src = src;
    });

    return () => {
      iframe.removeEventListener('click', handleClick);
      cleanup();
    };
  }, [id]);

  return (
    <div className="relative w-full my-6" style={{ paddingBottom: '56.25%' }}>
      <iframe
        ref={iframeRef}
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
