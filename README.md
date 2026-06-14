# Ayush Sanj — Portfolio

Personal portfolio of Ayush Sanj, Frontend & Mobile Engineer. Built with a focus on performance, motion, and a distinct visual identity.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animations | GSAP 3 |
| 3D / WebGL | Three.js + raw WebGL shaders |
| Smooth scroll | Lenis |
| Fonts | Instrument Serif · Bricolage Grotesque · DM Mono |
| Visitor counter | Upstash Redis (via API route) |
| AI assistance | Claude (Anthropic) |
| Deployment | Vercel |

## Features

- **WebGL shader background** — fractional Brownian motion noise, fades in on load
- **3D shape carousel** — Six wireframe shapes (geodesic, torus knot, ring, low-poly sphere, pyramid, diamond) cycling every 3 seconds via Three.js
- **Custom cursor** — dot + ring with magnetic pull on buttons; touch equivalent on mobile
- **Lenis smooth scroll** — desktop only, native scroll preserved on touch devices
- **Visitor counter** — live count stored in Upstash Redis, incremented on each visit
- **Responsive** — mobile-first layout, floating code tokens hidden on small screens
- **Custom `<AS/>` favicon** — SVG icon in brand accent colour

## Pages

- `/` — Hero with WebGL background, 3D shape, built-with strip, visitor count
- `/work` — Work experience
- `/projects` — Side projects
- `/skills` — Technical skills
- `/about` — About me
- `/contact` — Contact links
- `/resume` — Printable resume

## Commands

```bash
npm run dev      # Dev server → http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

## Design Tokens

```css
--bg:      #0d0c09   /* page background */
--surface: #141310   /* card background */
--accent:  #c8f13f   /* brand yellow-green */
--text:    #ede8da   /* primary text */
--soft:    #898060   /* secondary text */
--muted:   #4a4535   /* dimmed text */
--max:     840px     /* content max-width */
```

## Visitor Counter Setup (Vercel)

After deploying, activate the live visitor counter:

1. Vercel dashboard → your project → **Storage** → **Create Database** → **Upstash Redis**
2. Connect to project — Vercel auto-injects `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
3. Redeploy — counter starts from that point

## Deployment

Push to GitHub, import on [vercel.com](https://vercel.com), connect your Hostinger domain via DNS:

- **A record** → `@` → `76.76.21.21`
- **CNAME** → `www` → `cname.vercel-dns.com`
