/**
 * Global Video Player State Management
 * 
 * This module manages the persistent video player state across page navigations.
 * Uses browser localStorage and custom events for real-time synchronization.
 */

export interface VideoPlayerState {
  isOpen: boolean;
  isPlaying: boolean;
  isMinimized: boolean;
  currentVideoId: string | null;
  currentVideoTitle: string | null;
  currentTime?: number;
}

const STORAGE_KEY = 'video-player-state';
const EVENT_NAME = 'video-player-state-change';

// Default state
const defaultState: VideoPlayerState = {
  isOpen: false,
  isPlaying: false,
  isMinimized: false,
  currentVideoId: null,
  currentVideoTitle: null,
  currentTime: 0,
};

/**
 * Get current player state from localStorage
 */
export function getPlayerState(): VideoPlayerState {
  if (typeof window === 'undefined') return defaultState;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultState, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error reading player state:', error);
  }
  
  return defaultState;
}

/**
 * Save player state to localStorage and notify listeners
 */
export function setPlayerState(updates: Partial<VideoPlayerState>): void {
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
    console.error('Error saving player state:', error);
  }
}

/**
 * Subscribe to player state changes
 */
export function subscribeToPlayerState(
  callback: (state: VideoPlayerState) => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<VideoPlayerState>;
    callback(customEvent.detail);
  };
  
  window.addEventListener(EVENT_NAME, handler);
  
  // Return unsubscribe function
  return () => window.removeEventListener(EVENT_NAME, handler);
}

/**
 * Play a new video
 */
export function playVideo(videoId: string, title: string): void {
  setPlayerState({
    isOpen: true,
    isPlaying: true,
    isMinimized: false,
    currentVideoId: videoId,
    currentVideoTitle: title,
    currentTime: 0,
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
    currentVideoId: null,
    currentVideoTitle: null,
    currentTime: 0,
  });
}

/**
 * Update current playback time
 */
export function updateCurrentTime(time: number): void {
  setPlayerState({ currentTime: time });
}
