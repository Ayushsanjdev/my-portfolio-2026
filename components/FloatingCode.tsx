'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const tokens: { text: string; dim?: boolean; style: React.CSSProperties }[] = [
  { text: 'const',       style: { top: '12%', left: '4%'   } },
  { text: '</>',         style: { top: '18%', right: '5%'  } },
  { text: 'useState()',  style: { top: '40%', left: '3%'   } },
  { text: 'import',      style: { top: '58%', left: '6%'   } },
  { text: 'async',       style: { top: '32%', right: '6%'  } },
  { text: 'return null', style: { top: '70%', right: '4%'  } },
  { text: '.map()',      style: { top: '50%', right: '8%'  } },
  { text: 'interface',   style: { top: '78%', left: '5%'   } },
  { text: '===',         style: { top: '86%', right: '6%'  } },

  // center tokens — very dim so they don't compete with hero text
  { text: '=>',          dim: true, style: { top: '22%', left: '18%'  } },
  { text: '{ }',         dim: true, style: { top: '8%',  right: '12%' } },
  { text: '.tsx',        dim: true, style: { top: '30%', left: '22%'  } },
  { text: 'export',      dim: true, style: { top: '48%', left: '28%'  } },
  { text: 'type',        dim: true, style: { top: '65%', right: '18%' } },
  { text: 'null',        dim: true, style: { top: '25%', left: '42%'  } },
  { text: 'useEffect()', dim: true, style: { top: '55%', left: '35%'  } },
  { text: '&&',          dim: true, style: { top: '75%', left: '48%'  } },
  { text: 'await',       dim: true, style: { top: '15%', left: '55%'  } },
  { text: '// dev',      dim: true, style: { top: '42%', right: '22%' } },
  { text: 'props',       dim: true, style: { top: '88%', left: '30%'  } },
];

export default function FloatingCode() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    tokens.forEach(({ dim }, i) => {
      const el = refs.current[i];
      if (!el) return;

      const peakOpacity = dim ? 0.1 : 0.38;
      const restOpacity = dim ? 0.04 : 0.15;

      gsap.fromTo(
        el,
        { opacity: 0, y: 10 },
        {
          opacity: peakOpacity,
          y: 0,
          duration: 1,
          delay: i * 0.1 + 0.4,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(el, {
              opacity: restOpacity,
              duration: 2.5 + Math.random() * 2,
              yoyo: true,
              repeat: -1,
              ease: 'sine.inOut',
              delay: Math.random() * 1.5,
            });
          },
        }
      );
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {tokens.map(({ text, style }, i) => (
        <span
          key={`${text}-${i}`}
          ref={el => { refs.current[i] = el; }}
          className={tokens[i].dim ? 'float-token-center' : undefined}
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(11px, 1.4vw, 14px)',
            color: 'var(--accent)',
            opacity: 0,
            letterSpacing: '0.06em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            ...style,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
