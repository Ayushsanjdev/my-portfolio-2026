# ayushsanj.com

Personal portfolio of Ayush Sanj — Frontend & Mobile Engineer based in India.

> Built with attention to motion, performance, and a distinct visual identity.

## Live

**[ayushsanj.com](https://ayushsanj.com)** *(coming soon)*

---

## What's inside

A dark, minimal portfolio with a WebGL noise background, a cycling 3D wireframe scene, custom cursor with magnetic buttons, Lenis smooth scrolling, and a live visitor counter — all running at 60fps.

- **WebGL shader** — fractional Brownian motion dust that fades in on load
- **3D shape carousel** — geodesic, torus knot, ring, sphere, pyramid, diamond — cycling via Three.js every 3s
- **Custom cursor** — dot + ring with magnetic pull; mirrors as a touch effect on mobile
- **Smooth scroll** — Lenis on desktop, native momentum on mobile
- **Live visitor counter** — Upstash Redis via a Next.js API route
- **Responsive** — clean mobile layout, floating code tokens hidden on small screens

## Tech

Next.js 16 · React 19 · TypeScript · GSAP · Three.js · Lenis · Tailwind CSS v4 · Upstash Redis · Claude

## Run locally

```bash
git clone https://github.com/ayushsanjdev/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> The visitor counter will show `—` locally unless you add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to a `.env.local` file.

## License

Feel free to take inspiration — just don't copy it wholesale and present it as your own.
