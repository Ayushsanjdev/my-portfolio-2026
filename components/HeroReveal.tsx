'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function HeroReveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      const tag   = document.querySelector<HTMLElement>('[data-hero="tag"]');
      const meta  = document.querySelector<HTMLElement>('[data-hero="meta"]');
      const cta   = document.querySelector<HTMLElement>('[data-hero="cta"]');
      const strip = document.querySelector<HTMLElement>('[data-hero="strip"]');
      if (!tag) return;

      // ── hero-tag: split text span into chars ─────────────────────
      const textSpan = tag.querySelector<HTMLElement>('[data-tag-text]');
      if (textSpan) {
        const raw = textSpan.textContent ?? '';
        textSpan.innerHTML = raw
          .split('')
          .map(ch => `<span style="display:inline-block">${ch === ' ' ? '&nbsp;' : ch}</span>`)
          .join('');
      }
      const tagChars = Array.from(tag.querySelectorAll<HTMLElement>('[data-tag-text] span'));

      const tl = gsap.timeline();

      if (reduced) {
        // skip all easing, just show everything instantly
        tl.set([tag, meta, cta, strip].filter(Boolean), { opacity: 1 });
        return;
      }

      // 1. hero-tag dot + chars
      tl.to(tag, { opacity: 1, duration: 0 })
        .fromTo(
          tagChars,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.38, stagger: 0.018, ease: 'power3.out' },
        );

      // 2. meta words
      if (meta) {
        const metaItems = Array.from(meta.children) as HTMLElement[];
        tl.fromTo(
          meta,
          { opacity: 0 },
          { opacity: 1, duration: 0 },
          '-=0.1',
        ).fromTo(
          metaItems,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.38, stagger: 0.1, ease: 'power3.out' },
          '<',
        );
      }

      // 3. CTA buttons
      if (cta) {
        const btns = Array.from(cta.children) as HTMLElement[];
        tl.fromTo(
          cta,
          { opacity: 0 },
          { opacity: 1, duration: 0 },
          '-=0.1',
        ).fromTo(
          btns,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' },
          '<',
        );
      }

      // 4. bottom strip
      if (strip) {
        tl.fromTo(
          strip,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.15',
        );
      }
    };

    if ((window as any).__loaderDone) {
      animate();
    } else {
      window.addEventListener('loader:done', animate, { once: true });
    }

    return () => window.removeEventListener('loader:done', animate);
  }, []);

  return null;
}
