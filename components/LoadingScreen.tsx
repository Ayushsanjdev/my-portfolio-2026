'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const chars = [
  { ch: '<',  accent: true  },
  { ch: ' ',  accent: false },
  { ch: 'h',  accent: false },
  { ch: 'e',  accent: false },
  { ch: 'l',  accent: false },
  { ch: 'l',  accent: false },
  { ch: 'o',  accent: false },
  { ch: ' ',  accent: false },
  { ch: '/',  accent: true  },
  { ch: '>',  accent: true  },
];

export default function LoadingScreen() {
  const [visible, setVisible]   = useState(true);
  const topRef                  = useRef<HTMLDivElement>(null);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const wrapRef                 = useRef<HTMLDivElement>(null);
  const cursorRef               = useRef<HTMLSpanElement>(null);
  const charRefs                = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const charEls = charRefs.current.filter(Boolean);

    // fast cursor blink — runs independently throughout
    const blinkTween = gsap.to(cursor, {
      opacity: 0,
      duration: 0.18,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });

    const tl = gsap.timeline({
      onComplete: () => {
        blinkTween.kill();
        setVisible(false);
      },
    });

    // type characters in one by one
    tl.fromTo(charEls,
      { opacity: 0 },
      { opacity: 1, duration: 0.06, stagger: 0.05, ease: 'power1.out' }
    )
    // hold for 2s after typing finishes
    .to(wrapRef.current, { opacity: 1, duration: 2.0 })
    // fade out text
    .to(wrapRef.current, { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in' })
    // panels fold away
    .to([topRef.current, bottomRef.current],
      { scaleY: 0, duration: 0.65, ease: 'power3.inOut' },
      '-=0.05'
    );
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={topRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '50vh',
        background: 'var(--bg)', zIndex: 999, transformOrigin: 'top',
      }} />
      <div ref={bottomRef} style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '50vh',
        background: 'var(--bg)', zIndex: 999, transformOrigin: 'bottom',
      }} />

      <div ref={wrapRef} style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-disp)',
          fontSize: 'clamp(52px, 9vw, 100px)',
          fontStyle: 'italic',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          display: 'inline-flex',
          alignItems: 'center',
        }}>
          {chars.map(({ ch, accent }, i) => (
            <span
              key={i}
              ref={el => { charRefs.current[i] = el; }}
              style={{
                opacity: 0,
                color: accent ? 'var(--accent)' : 'var(--text)',
                whiteSpace: 'pre',
              }}
            >
              {ch}
            </span>
          ))}
          <span ref={cursorRef} style={{
            display: 'inline-block',
            width: 3,
            height: '0.75em',
            background: 'var(--accent)',
            marginLeft: 5,
            verticalAlign: 'middle',
            borderRadius: 1,
          }} />
        </span>
      </div>
    </>
  );
}
