'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) {
      // Touch-only devices: show dot+ring on finger touch
      const dot  = document.getElementById('cursor-dot')!;
      const ring = document.getElementById('cursor-ring')!;
      if (!dot || !ring) return;
      gsap.set([dot, ring], { opacity: 0 });

      const onTouchStart = (e: TouchEvent) => {
        const t = e.touches[0];
        gsap.set(dot, { x: t.clientX, y: t.clientY });
        gsap.set(ring, { x: t.clientX, y: t.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.15 });
        dot.classList.add('hovered');
        ring.classList.add('hovered');
      };
      const onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0];
        gsap.set(dot,  { x: t.clientX, y: t.clientY });
        gsap.set(ring, { x: t.clientX, y: t.clientY });
      };
      const onTouchEnd = () => {
        dot.classList.remove('hovered');
        ring.classList.remove('hovered');
        gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      };

      document.addEventListener('touchstart', onTouchStart, { passive: true });
      document.addEventListener('touchmove',  onTouchMove,  { passive: true });
      document.addEventListener('touchend',   onTouchEnd);
      return () => {
        document.removeEventListener('touchstart', onTouchStart);
        document.removeEventListener('touchmove',  onTouchMove);
        document.removeEventListener('touchend',   onTouchEnd);
      };
    }

    const dot  = document.getElementById('cursor-dot')!;
    const ring = document.getElementById('cursor-ring')!;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let magnetics: HTMLElement[] = [];

    const refreshMagnetics = () => {
      magnetics = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    };
    refreshMagnetics();

    const mo = new MutationObserver(refreshMagnetics);
    mo.observe(document.body, { childList: true, subtree: true });

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { x: rx, y: ry });
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      gsap.set(dot, { x: mx, y: my });

      magnetics.forEach(el => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = mx - cx, dy = my - cy;
        const dist = Math.hypot(dx, dy);
        const pull = Math.max(r.width, r.height) * 1.5;
        if (dist < pull) {
          gsap.to(el, { x: dx * (1 - dist / pull) * 0.38, y: dy * (1 - dist / pull) * 0.38, duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
        }
      });
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) {
        dot.classList.add('hovered');
        ring.classList.add('hovered');
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) {
        dot.classList.remove('hovered');
        ring.classList.remove('hovered');
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return null;
}
