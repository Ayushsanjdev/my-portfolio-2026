'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SHAPES = [
  () => new THREE.IcosahedronGeometry(1.5, 1),           // geodesic
  () => new THREE.TorusKnotGeometry(0.9, 0.28, 60, 6, 2, 3), // organic knot
  () => new THREE.TorusGeometry(1.3, 0.45, 6, 14),       // ring
  () => new THREE.SphereGeometry(1.5, 7, 5),             // low-poly sphere
  () => new THREE.ConeGeometry(1.3, 2.4, 4),             // pyramid
  () => new THREE.OctahedronGeometry(1.7),                // diamond
];

const SWAP_EVERY = 3;      // seconds between swaps
const FADE_DUR  = 0.7;     // seconds to fade out / in

export default function PolyhedronScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(420);

  useEffect(() => {
    const update = () => setSize(window.innerWidth < 640 ? 240 : 420);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.domElement.style.width  = '100%';
    renderer.domElement.style.height = '100%';
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const lineMat = new THREE.LineBasicMaterial({ color: 0xc8f13f, transparent: true, opacity: 0.45 });
    const solidMat = new THREE.MeshBasicMaterial({ color: 0xc8f13f, transparent: true, opacity: 0.03, side: THREE.DoubleSide });

    let geoIndex  = 0;
    let currentGeo = SHAPES[0]();
    const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(currentGeo), lineMat);
    const solid     = new THREE.Mesh(currentGeo, solidMat);

    const group = new THREE.Group();
    group.add(solid, wireframe);
    scene.add(group);

    let mouseX = 0, mouseY = 0, tiltX = 0, tiltY = 0;
    let autoRotY = 0, autoRotX = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      mouseX = (t.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (t.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Fade state
    let fadeVal   = 1;       // 0..1
    let fadingOut = false;
    let timer     = 0;
    let prevTime  = performance.now();

    let raf: number;
    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);

      const delta = Math.min((now - prevTime) / 1000, 0.1);
      prevTime = now;

      // Rotation
      autoRotY += 0.0028;
      autoRotX += 0.0011;
      tiltX += (mouseX * 0.28 - tiltX) * 0.04;
      tiltY += (-mouseY * 0.28 - tiltY) * 0.04;
      group.rotation.y = autoRotY + tiltX;
      group.rotation.x = autoRotX + tiltY;

      // Swap timer
      if (!fadingOut) {
        timer += delta;
        if (timer >= SWAP_EVERY) {
          timer = 0;
          fadingOut = true;
        }
      }

      // Fade out → swap → fade in
      if (fadingOut) {
        fadeVal -= delta / FADE_DUR;
        if (fadeVal <= 0) {
          fadeVal = 0;
          fadingOut = false;
          // Swap geometry
          geoIndex = (geoIndex + 1) % SHAPES.length;
          const nextGeo = SHAPES[geoIndex]();
          wireframe.geometry.dispose();
          wireframe.geometry = new THREE.EdgesGeometry(nextGeo);
          solid.geometry.dispose();
          solid.geometry = nextGeo;
        }
      } else {
        fadeVal = Math.min(1, fadeVal + delta / FADE_DUR);
      }

      lineMat.opacity  = 0.32 * fadeVal;
      solidMat.opacity = 0.025 * fadeVal;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [size]);

  const isMobile = size === 240;

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        ...(isMobile
          ? { left: '50%', transform: 'translateX(-50%) translateY(-50%)' }
          : { right: '14vw', transform: 'translateY(-50%)' }
        ),
        top: '50%',
        width: size,
        height: size,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: isMobile ? 0.5 : 1,
      }}
    />
  );
}
