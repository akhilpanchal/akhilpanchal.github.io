import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { stopAllOtherPlayers, onStopAllPlayers } from '@/lib/mediaPlayerState';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
    const computedStyle = getComputedStyle(document.documentElement);
    const foreground = computedStyle.getPropertyValue('--foreground').trim();
    const mutedForeground = computedStyle.getPropertyValue('--muted-foreground').trim();
    
    // Convert oklch to rgb for wavesurfer (with fallback)
    const waveColor = mutedForeground || 'rgba(0, 0, 0, 0.3)';
    const progressColor = foreground || 'rgba(0, 0, 0, 0.8)';
    const cursorColor = foreground || 'rgba(0, 0, 0, 0.5)';

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor,
      progressColor,
      cursorColor,
      cursorWidth: 2,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 80,
      normalize: true,
      backend: 'WebAudio',
      interact: true, // Enable seeking by clicking on the waveform
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
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleMute}
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
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
        <Button
          onClick={togglePlayPause}
          disabled={isLoading}
          size="icon"
          className="shrink-0 rounded-full w-12 h-12"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </Button>
        <div className="relative flex-1">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded">
              <span className="text-sm text-muted-foreground">Loading audio...</span>
            </div>
          )}
          <div 
            ref={waveformRef} 
            className="rounded overflow-hidden bg-muted/30 cursor-pointer" 
            title="Click to seek to any position"
          />
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </div>
        </div>
      </CardContent>
    </Card>
  );
}
