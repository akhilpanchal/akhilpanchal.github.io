import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { stopAllOtherPlayers, onStopAllPlayers } from '@/lib/mediaPlayerState';

interface AudioCardProps {
  src: string;
  title: string;
  note: string;
  date: string;
}

export default function AudioCard({ src, title, note, date }: AudioCardProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const playerIdRef = useRef(`audio-${src}`);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!waveformRef.current) return;

    // Get theme colors from CSS variables
    const isDark = document.documentElement.classList.contains('dark');
    const waveColor = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
    const progressColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor,
      progressColor,
      cursorColor: 'transparent',
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 80,
      normalize: true,
      backend: 'WebAudio',
    });

    ws.load(src);

    ws.on('ready', () => {
      setIsLoading(false);
      setDuration(formatTime(ws.getDuration()));
      ws.setVolume(0.6);
    });

    ws.on('audioprocess', () => {
      setCurrentTime(formatTime(ws.getCurrentTime()));
    });

    ws.on('play', () => {
      setIsPlaying(true);
      // Stop all other media players when this one starts
      stopAllOtherPlayers(playerIdRef.current);
    });
    ws.on('pause', () => setIsPlaying(false));
    ws.on('finish', () => setIsPlaying(false));

    wavesurferRef.current = ws;

    // Listen for stop-all events
    const cleanup = onStopAllPlayers(playerIdRef.current, () => {
      if (ws.isPlaying()) {
        ws.pause();
      }
    });

    return () => {
      cleanup();
      ws.destroy();
    };
  }, [src]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (wavesurferRef.current) {
      if (isMuted) {
        wavesurferRef.current.setVolume(volume);
        setIsMuted(false);
      } else {
        wavesurferRef.current.setVolume(0);
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 hover:text-foreground transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              aria-label="Volume control"
            />
          </div>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{note}</p>
      </div>

      <div className="flex gap-4 items-center">
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="shrink-0 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground w-12 h-12 hover:opacity-90 transition-opacity disabled:opacity-50"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>
        <div className="relative flex-1">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded">
              <span className="text-sm text-muted-foreground">Loading audio...</span>
            </div>
          )}
          <div ref={waveformRef} className="rounded overflow-hidden bg-muted/30" />
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
