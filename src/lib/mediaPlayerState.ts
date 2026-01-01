/**
 * Global Media Player State Management
 * 
 * This module manages the persistent media player state across page navigations.
 * Supports both YouTube and SoundCloud platforms.
 * Uses browser localStorage and custom events for real-time synchronization.
 */

import { logError, isValidNumber } from './utils';

export type Platform = 'youtube' | 'soundcloud';

export interface MediaPlayerState {
  isOpen: boolean;
  isPlaying: boolean;
  isMinimized: boolean;
  platform: Platform | null;
  currentTrackId: string | null;
  currentTrackTitle: string | null;
  currentTime?: number;
  volume?: number; // 0-100
}

const STORAGE_KEY = 'media-player-state';
const EVENT_NAME = 'media-player-state-change';

// Default state
const defaultState: MediaPlayerState = {
  isOpen: false,
  isPlaying: false,
  isMinimized: false,
  platform: null,
  currentTrackId: null,
  currentTrackTitle: null,
  currentTime: 0,
  volume: 100,
};

/**
 * Get current player state from localStorage
 */
export function getPlayerState(): MediaPlayerState {
  if (typeof window === 'undefined') return defaultState;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultState, ...JSON.parse(stored) };
    }
  } catch (error) {
    logError('mediaPlayerState.getPlayerState', error);
  }
  
  return defaultState;
}

/**
 * Save player state to localStorage and notify listeners
 */
export function setPlayerState(updates: Partial<MediaPlayerState>): void {
  if (typeof window === 'undefined') return;
  
  const currentState = getPlayerState();
  const newState = { ...currentState, ...updates };
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    
    // Dispatch custom event for real-time sync
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { 
      detail: newState 
    }));
  } catch (error) {
    logError('mediaPlayerState.setPlayerState', error);
  }
}

/**
 * Subscribe to player state changes
 */
export function subscribeToPlayerState(
  callback: (state: MediaPlayerState) => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<MediaPlayerState>;
    callback(customEvent.detail);
  };
  
  window.addEventListener(EVENT_NAME, handler);
  
  // Return unsubscribe function
  return () => window.removeEventListener(EVENT_NAME, handler);
}

/**
 * Play a new track
 */
export function playTrack(platform: Platform, trackId: string, title: string): void {
  // Get current state before switching
  const currentState = getPlayerState();
  const currentVolume =
    typeof currentState.volume === 'number' ? currentState.volume : 100;
  
  setPlayerState({
    isOpen: true,
    isPlaying: true,
    // Preserve minimized state so new tracks respect the user's preference
    isMinimized: currentState.isMinimized,
    platform,
    currentTrackId: trackId,
    currentTrackTitle: title,
    currentTime: 0,
    volume: currentVolume, // Preserve volume (including mute at 0)
  });
}

/**
 * Toggle play/pause
 */
export function togglePlayPause(): void {
  const state = getPlayerState();
  setPlayerState({ isPlaying: !state.isPlaying });
}

/**
 * Toggle minimize/maximize
 */
export function toggleMinimize(): void {
  const state = getPlayerState();
  setPlayerState({ isMinimized: !state.isMinimized });
}

/**
 * Close player
 */
export function closePlayer(): void {
  setPlayerState({
    isOpen: false,
    isPlaying: false,
    isMinimized: false,
    platform: null,
    currentTrackId: null,
    currentTrackTitle: null,
    currentTime: 0,
  });
}

/**
 * Update current playback time
 */
export function updateCurrentTime(time: number): void {
  setPlayerState({ currentTime: time });
}

/**
 * Update volume (0-100)
 */
export function updateVolume(volume: number): void {
  if (!isValidNumber(volume)) {
    logError('mediaPlayerState.updateVolume', new Error(`Invalid volume: ${volume}`));
    return;
  }
  setPlayerState({ volume: Math.max(0, Math.min(100, volume)) });
}
