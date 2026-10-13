'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hover = window.matchMedia('(hover: hover)');
    let lenis: Lenis | undefined;

    const syncPreferences = () => {
      lenis?.destroy();
      lenis = undefined;
      // Keep native momentum on touch devices and honor motion preferences.
      if (reducedMotion.matches || !hover.matches) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        autoRaf: true,
        anchors: true,
      });
    };

    syncPreferences();
    reducedMotion.addEventListener('change', syncPreferences);
    hover.addEventListener('change', syncPreferences);

    return () => {
      reducedMotion.removeEventListener('change', syncPreferences);
      hover.removeEventListener('change', syncPreferences);
      lenis?.destroy();
    };
  }, []);

  return null;
}
