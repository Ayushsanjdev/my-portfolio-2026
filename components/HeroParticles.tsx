'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ACCENT_R = 0xc8 / 255;
const ACCENT_G = 0xf1 / 255;
const ACCENT_B = 0x3f / 255;

const ENTRANCE_S  = 1.8;   // seconds to reach target
const IDLE_AMP    = 4;     // px of vertical sine wave
const REPEL_R     = 90;    // px radius of mouse repulsion
const REPEL_STR   = 55;    // repulsion force strength

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

export default function HeroParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let dead = false;

    const run = async () => {
      // Wait for both fonts AND the loading screen to finish.
      // On SPA back-navigation the loader is already gone, so we check the
      // flag first and skip the event listener.
      await document.fonts.ready;
      if (dead) return;

      if (!(window as any).__loaderDone) {
        await new Promise<void>(resolve => {
          window.addEventListener('loader:done', () => resolve(), { once: true });
        });
      }
      if (dead) return;

      // ── dimensions ──────────────────────────────────────────────
      const W        = mount.clientWidth || 640;
      const fontSize = Math.min(160, Math.max(78, W * 0.15));
      const lineGap  = fontSize * 0.92;
      const H        = Math.ceil(fontSize * 2.1);

      // Sample at 2× scale so thin Instrument Serif strokes produce
      // enough pixels even at weight 400. Coordinates are halved back
      // to screen space after sampling.
      const SCALE    = 2;
      const SW       = W    * SCALE;
      const SH       = H    * SCALE;
      const STEP     = W < 500 ? 4 : 2;  // tighter step on desktop

      // ── sample letterforms via offscreen canvas ─────────────────
      const off     = document.createElement('canvas');
      off.width  = SW;
      off.height = SH;
      const ctx  = off.getContext('2d')!;
      ctx.fillStyle    = '#fff';
      // Weight 400 — the only weight loaded for Instrument Serif
      ctx.font         = `italic 400 ${fontSize * SCALE}px "Instrument Serif", Georgia, serif`;
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('Ayush', 0, lineGap * SCALE);
      ctx.fillText('Sanj',  0, (lineGap + fontSize * 0.97) * SCALE);

      const imgData = ctx.getImageData(0, 0, SW, SH);
      const txArr: number[] = [];
      const tyArr: number[] = [];

      for (let py = 0; py < SH; py += STEP) {
        for (let px = 0; px < SW; px += STEP) {
          if (imgData.data[(py * SW + px) * 4 + 3] > 60) {
            // halve back to screen-space coordinates
            txArr.push(px / SCALE);
            tyArr.push(py / SCALE);
          }
        }
      }
      if (!txArr.length || dead) return;

      const count = txArr.length;

      // ── Three.js ─────────────────────────────────────────────────
      // OrthographicCamera: left=0, right=W, top=0 (screen-top), bottom=H
      // Three.js Y increases upward, but we set top < bottom so Y=0 is
      // visually top-of-canvas and Y=H is visually bottom-of-canvas.
      const scene  = new THREE.Scene();
      const cam    = new THREE.OrthographicCamera(0, W, 0, H, 0.1, 200);
      cam.position.z = 100;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0, 0);
      renderer.domElement.style.display = 'block';
      mount.appendChild(renderer.domElement);

      // geometry buffers
      const posArr = new Float32Array(count * 3);
      const colArr = new Float32Array(count * 3);
      const sxArr  = new Float32Array(count);
      const syArr  = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        // random scatter start
        sxArr[i] = Math.random() * W;
        syArr[i] = Math.random() * H;

        posArr[i * 3]     = sxArr[i];
        posArr[i * 3 + 1] = syArr[i];
        posArr[i * 3 + 2] = 0;

        // slight per-particle brightness variation
        const v = 0.75 + Math.random() * 0.25;
        colArr[i * 3]     = ACCENT_R * v;
        colArr[i * 3 + 1] = ACCENT_G * v;
        colArr[i * 3 + 2] = ACCENT_B * v;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(colArr, 3));

      const mat = new THREE.PointsMaterial({
        size:            W < 500 ? 2.5 : 2,
        vertexColors:    true,
        transparent:     true,
        opacity:         0.92,
        sizeAttenuation: false,
      });

      scene.add(new THREE.Points(geo, mat));

      // ── mouse ────────────────────────────────────────────────────
      let mx = -9999, my = -9999;
      const onMove  = (e: MouseEvent) => {
        const r = mount.getBoundingClientRect();
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
      };
      const onLeave = () => { mx = -9999; my = -9999; };
      mount.addEventListener('mousemove', onMove);
      mount.addEventListener('mouseleave', onLeave);

      // ── render loop ───────────────────────────────────────────────
      const pos   = geo.attributes.position as THREE.BufferAttribute;
      const t0    = performance.now();

      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);

        const elapsed = (now - t0) / 1000;
        const progress = reduced ? 1 : Math.min(1, elapsed / ENTRANCE_S);
        const ease     = easeOutCubic(progress);
        const settled  = progress >= 1;

        for (let i = 0; i < count; i++) {
          const tx = txArr[i];
          const ty = tyArr[i];

          // idle wave (only after entrance)
          const wave = settled
            ? Math.sin(now * 0.0014 + i * 0.055) * IDLE_AMP
            : 0;

          let fx = tx;
          let fy = ty + wave;

          // mouse repulsion
          if (settled && mx > 0) {
            const dx = tx - mx;
            const dy = ty - my;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d < REPEL_R && d > 0) {
              const force = (1 - d / REPEL_R) * REPEL_STR;
              fx += (dx / d) * force;
              fy += (dy / d) * force;
            }
          }

          pos.setXYZ(
            i,
            sxArr[i] + (fx - sxArr[i]) * ease,
            syArr[i] + (fy - syArr[i]) * ease,
            0,
          );
        }

        pos.needsUpdate = true;
        renderer.render(scene, cam);
      };

      raf = requestAnimationFrame(tick);

      // stash cleanup on the element
      (mount as any)._particleCleanup = () => {
        mount.removeEventListener('mousemove', onMove);
        mount.removeEventListener('mouseleave', onLeave);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    };

    run();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      (mountRef.current as any)?._particleCleanup?.();
    };
  }, []);

  return (
    <>
      {/* Accessible fallback for screen readers / SEO */}
      <h1
        aria-label="Ayush Sanj"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}
      />
      <div
        ref={mountRef}
        aria-hidden="true"
        style={{
          width: '100%',
          marginBottom: 'clamp(24px, 4vw, 44px)',
          userSelect: 'none',
        }}
      />
    </>
  );
}
