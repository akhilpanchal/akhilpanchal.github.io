/**
 * Type definitions for third-party media player APIs
 */

// YouTube IFrame API Types
export interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  setVolume(volume: number): void;
  getVolume(): number;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
}

export interface YouTubePlayerEvent {
  target: YouTubePlayer;
  data: number;
}

export interface YouTubePlayerOptions {
  events?: {
    onReady?: (event: YouTubePlayerEvent) => void;
    onStateChange?: (event: YouTubePlayerEvent) => void;
    onError?: (event: YouTubePlayerEvent) => void;
  };
}

export interface YouTubeIFrameAPI {
  Player: new (
    element: HTMLIFrameElement,
    options: YouTubePlayerOptions
  ) => YouTubePlayer;
}

// YouTube player states
export enum YouTubePlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

// SoundCloud Widget API Types
export interface SoundCloudWidget {
  bind(event: string, callback: () => void): void;
  unbind(event: string): void;
  load(url: string, options?: Record<string, unknown>): void;
  play(): void;
  pause(): void;
  toggle(): void;
  seekTo(milliseconds: number): void;
  setVolume(volume: number): void;
  getVolume(callback: (volume: number) => void): void;
  getPosition(callback: (position: number) => void): void;
  getDuration(callback: (duration: number) => void): void;
  isPaused(callback: (paused: boolean) => void): void;
}

export interface SoundCloudWidgetConstructor {
  new (element: HTMLIFrameElement | string): SoundCloudWidget;
  Events: {
    READY: string;
    PLAY: string;
    PAUSE: string;
    FINISH: string;
    SEEK: string;
    LOAD_PROGRESS: string;
    PLAY_PROGRESS: string;
  };
}

export interface SoundCloudWidgetAPI {
  Widget: SoundCloudWidgetConstructor;
}

// Global window extensions
declare global {
  interface Window {
    YT?: YouTubeIFrameAPI;
    onYouTubeIframeAPIReady?: () => void;
    SC?: SoundCloudWidgetAPI;
  }
}
