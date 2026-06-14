'use client';

import { useEffect, useRef } from 'react';

export default function Grain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d')!;
    const W = 256, H = 256;
    canvas.width = W; canvas.height = H;

    const img = ctx.createImageData(W, H);
    let raf = 0, frame = 0;

    const draw = () => {
      frame++;
      if (frame % 2 === 0) {
        for (let i = 0; i < img.data.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
          img.data[i + 3] = 18;
        }
        ctx.putImageData(img, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 200, pointerEvents: 'none',
        opacity: 0.045,
        imageRendering: 'pixelated',
      }}
    />
  );
}
