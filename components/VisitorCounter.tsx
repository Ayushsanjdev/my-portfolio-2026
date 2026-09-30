'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

// Share the request across Strict Mode effect replays; one visit increments once.
let visitorRequest: Promise<number | null> | undefined;
function getVisitorCount() {
  return visitorRequest ??= fetch('/api/visitors', { method: 'POST' })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error('Visitor count unavailable')))
    .then((data) => typeof data.count === 'number' && Number.isSafeInteger(data.count) && data.count >= 0 ? data.count : null)
    .catch(() => null);
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let active = true;
    getVisitorCount().then((value) => { if (active) setCount(value); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formatted = count === null ? '—' : count.toLocaleString('en-US');

  return (
    <span className="visitor-counter" ref={ref} aria-label={`${formatted} visitors`}>
      <span className="visitor-symbol" aria-hidden="true">◎</span>
      <span className="visitor-value" aria-hidden="true" data-roll={visible && count !== null}>
        {[...formatted].map((character, index) => /\d/.test(character) ? (
          <span className="visitor-digit" key={index}>
            <span className="visitor-digit-track" style={{ '--digit': Number(character), '--digit-delay': `${index * 25}ms` } as CSSProperties}>
              {Array.from({ length: 10 }, (_, digit) => <span key={digit}>{digit}</span>)}
            </span>
          </span>
        ) : <span key={index}>{character}</span>)}
      </span>
      <span aria-hidden="true"> visitors</span>
    </span>
  );
}
