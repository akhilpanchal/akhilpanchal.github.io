import { useState, useEffect } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    SC: any;
  }
}

/**
 * Hook to load YouTube IFrame API
 */
export function useYouTubeAPI() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      setIsReady(true);
      return;
    }

    // Load the API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Set up callback
    window.onYouTubeIframeAPIReady = () => {
      setIsReady(true);
    };
  }, []);

  return isReady;
}

/**
 * Hook to load SoundCloud Widget API
 */
export function useSoundCloudAPI() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if API is already loaded
    if (window.SC && window.SC.Widget) {
      setIsReady(true);
      return;
    }

    // Load the API
    const tag = document.createElement('script');
    tag.src = 'https://w.soundcloud.com/player/api.js';
    tag.onload = () => {
      setIsReady(true);
    };
    document.head.appendChild(tag);
  }, []);

  return isReady;
}
