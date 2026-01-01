import { useCallback, useEffect, useRef, useState } from 'react';
import { updateCurrentTime } from '../../lib/mediaPlayerState';

interface TimeTrackingOptions {
  getTime: () => number | Promise<number>;
  onTimeUpdate?: (time: number) => void;
  interval?: number; // milliseconds
}

/**
 * Declarative interval hook.
 * Re-runs the latest callback on the given delay while active.
 */
function useInterval(callback: () => void | Promise<void>, delay: number | null) {
  const savedCallback = useRef(callback);

  // Always keep latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => {
      void savedCallback.current();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
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
  const [isTracking, setIsTracking] = useState(false);

  // Wire the interval to our tracking flag
  useInterval(
    async () => {
      try {
        const time = await Promise.resolve(getTime());
        updateCurrentTime(time);
        onTimeUpdate?.(time);
      } catch (error) {
        console.error('Error getting playback time:', error);
      }
    },
    isTracking ? interval : null
  );

  const startTracking = useCallback(() => {
    setIsTracking(true);
  }, []);

  const stopTracking = useCallback(() => {
    setIsTracking(false);
  }, []);

  // Ensure tracking stops when the component using this hook unmounts
  useEffect(() => {
    return () => setIsTracking(false);
  }, []);

  return { startTracking, stopTracking };
}
