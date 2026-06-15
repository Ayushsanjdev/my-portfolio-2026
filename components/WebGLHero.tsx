'use client';

import { useEffect, useRef } from 'react';

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
  precision mediump float;
  uniform float u_time;
  uniform float u_fade;
  uniform vec2  u_res;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
               mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p  = rot * p * 2.0 + vec2(100.0);
      a *= 0.5;
    }
    return v;
  }
  void main() {
    vec2 st = gl_FragCoord.xy / u_res;
    float t  = u_time * 0.08;
    vec2 q = vec2(fbm(st + t), fbm(st + vec2(1.0)));
    vec2 r = vec2(fbm(st + q + vec2(1.7, 9.2) + 0.15 * t),
                  fbm(st + q + vec2(8.3, 2.8) + 0.13 * t));
    float f = fbm(st + r);

    vec3 accent  = vec3(0.784, 0.945, 0.247);
    vec3 midtone = vec3(0.10,  0.18,  0.04);
    vec3 col = mix(midtone, accent, clamp(f * 1.6 - 0.5, 0.0, 1.0));
    col = mix(col, accent * 0.9, clamp(length(q) * 0.3, 0.0, 0.35));

    float a = clamp(f * 0.5 + length(q) * 0.08, 0.0, 0.22) * u_fade;
    // premultiplied alpha — required for correct compositing in Chrome
    gl_FragColor = vec4(col * a, a);
  }
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

export default function WebGLHero() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    // low-power: forces macOS to use integrated GPU instead of discrete Radeon
    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      powerPreference: 'low-power',
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uFade = gl.getUniformLocation(prog, 'u_fade');
    const uRes  = gl.getUniformLocation(prog, 'u_res');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // 24fps cap — animation is slow-moving so this is visually lossless
    const TARGET_MS = 1000 / 24;
    let raf = 0, start = performance.now(), paused = false, last = 0;
    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (paused || now - last < TARGET_MS) return;
      last = now;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const elapsed = (now - start) / 1000;
      const t = Math.min(1, elapsed / 0.5);
      const fade = t * t * (3 - 2 * t); // smoothstep ease-out
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uFade, fade);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    requestAnimationFrame(render);

    const onVis = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: -1, pointerEvents: 'none',
      }}
    />
  );
}
