"use client";

import { useEffect, useRef } from "react";

export default function HomeMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!('IntersectionObserver' in window)) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (media.matches) return;
        animations.push(target.animate([
          { opacity: 0.65, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }));
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

    root.querySelectorAll(".work-index-heading, .work-row, .home-experience-intro, .experience-row, .home-contact h2")
      .forEach((element) => observer.observe(element));

    const onPreferenceChange = () => {
      if (media.matches) animations.forEach((animation) => animation.cancel());
    };
    media.addEventListener('change', onPreferenceChange);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener('change', onPreferenceChange);
    };
  }, []);

  return <div className="home-page" ref={ref}>{children}</div>;
}
