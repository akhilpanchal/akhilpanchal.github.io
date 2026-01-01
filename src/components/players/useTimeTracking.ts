import { useRef, useCallback, useEffect } from 'react';
import { updateCurrentTime } from '../../lib/mediaPlayerState';

interface TimeTrackingOptions {
  getTime: () => number | Promise<number>;
  onTimeUpdate?: (time: number) => void;
  interval?: number; // milliseconds
}

/**
 * Shared hook for tracking playback time across media players
 * Handles both sync and async time getters
 */
export function useTimeTracking({ 
  getTime, 
  onTimeUpdate, 
  interval = 1000 
}: TimeTrackingOptions) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTracking = useCallback(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(async () => {
      try {
        const time = await Promise.resolve(getTime());
        updateCurrentTime(time);
        onTimeUpdate?.(time);
      } catch (error) {
        console.error('Error getting playback time:', error);
      }
    }, interval);
  }, [getTime, onTimeUpdate, interval]);

  const stopTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return { startTracking, stopTracking };
}
