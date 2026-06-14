'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroText() {
  const lineA = useRef<HTMLSpanElement>(null);
  const lineB = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const splitLine = (el: HTMLSpanElement | null) => {
      if (!el) return [];
      const text = el.textContent ?? '';
      el.innerHTML = text
        .split('')
        .map(ch => `<span style="display:inline-block;will-change:transform,opacity,filter">${ch === ' ' ? '&nbsp;' : ch}</span>`)
        .join('');
      return Array.from(el.children) as HTMLElement[];
    };

    const charsA = splitLine(lineA.current);
    const charsB = splitLine(lineB.current);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.fromTo(
      [...charsA, ...charsB],
      { y: 44, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: reduced ? 0 : 0.72,
        stagger: reduced ? 0 : 0.038,
        ease: 'power3.out',
        delay: 0.25,
      }
    );
  }, []);

  return (
    <h1 style={{
      fontFamily: 'var(--font-disp)',
      fontSize: 'clamp(78px, 15vw, 160px)',
      fontWeight: 700, lineHeight: 0.88,
      letterSpacing: '-0.01em', marginBottom: 'clamp(24px, 4vw, 44px)',
      fontStyle: 'italic',
    }}>
      <span ref={lineA} style={{ display: 'block', color: 'var(--text)' }}>
        Ayush
      </span>
      <span ref={lineB} style={{
        display: 'block', color: 'transparent',
        WebkitTextStroke: '1px rgba(210,195,140,0.22)',
      }}>
        Sanj
      </span>
    </h1>
  );
}
