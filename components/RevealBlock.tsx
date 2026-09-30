'use client';

import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function RevealBlock({ children, delay = 0, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (media.matches) return;
      animation = element.animate([
        { opacity: 0.65, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], {
        duration: 450,
        delay: Math.min(Math.max(delay, 0), 0.15) * 1000,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    const onPreferenceChange = () => {
      if (media.matches) animation?.cancel();
    };
    observer.observe(element);
    media.addEventListener('change', onPreferenceChange);
    return () => {
      observer.disconnect();
      animation?.cancel();
      media.removeEventListener('change', onPreferenceChange);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
