"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const midRef = useRef<HTMLSpanElement>(null);
  const shortRef = useRef<HTMLSpanElement>(null);
  const fullRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mid = midRef.current;
    const short = shortRef.current;
    const full = fullRef.current;
    if (!mid || !short || !full) return;
    gsap.set(full, { opacity: 0, x: 6, position: 'absolute', left: 0, top: '50%', yPercent: -50, whiteSpace: 'nowrap' });
    gsap.set(mid, { width: short.offsetWidth });
  }, []);

  const handleLogoEnter = () => {
    const mid = midRef.current;
    const short = shortRef.current;
    const full = fullRef.current;
    if (!mid || !short || !full) return;
    gsap.to(short, { opacity: 0, x: -6, duration: 0.18, ease: 'power2.in' });
    gsap.to(mid, { width: full.offsetWidth, duration: 0.28, ease: 'power2.inOut' });
    gsap.to(full, { opacity: 1, x: 0, duration: 0.22, delay: 0.14, ease: 'power2.out' });
  };

  const handleLogoLeave = () => {
    const mid = midRef.current;
    const short = shortRef.current;
    const full = fullRef.current;
    if (!mid || !short || !full) return;
    gsap.to(full, { opacity: 0, x: 6, duration: 0.18, ease: 'power2.in' });
    gsap.to(mid, { width: short.offsetWidth, duration: 0.28, delay: 0.1, ease: 'power2.inOut' });
    gsap.to(short, { opacity: 1, x: 0, duration: 0.22, delay: 0.14, ease: 'power2.out' });
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "var(--nav-h)",
          background: "rgba(13,12,9,0.25)",
          backdropFilter: "blur(10px) saturate(1.3)",
          WebkitBackdropFilter: "blur(10px) saturate(1.3)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--max)",
            margin: "0 auto",
            padding: "0 var(--pad)",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.05em",
              color: "var(--text)",
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>&lt;</span>
            <span ref={midRef} style={{ position: 'relative', display: 'inline-block', overflow: 'hidden' }}>
              <span ref={shortRef} style={{ display: 'inline-block' }}>AS</span>
              <span ref={fullRef}>Ayush Sanj</span>
            </span>
            <span style={{ color: 'var(--accent)' }}> /&gt;</span>
          </Link>

          {/* Desktop links */}
          <ul
            className="nav-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {links.slice(0, 6).map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="muted-to-text"
                  style={{
                    fontSize: 13,
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                    ...(pathname === href && { color: "var(--text)" }),
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resume"
                className="accent-to-text"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  ...(pathname === "/resume" && { color: "var(--text)" }),
                }}
              >
                Resume
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "none",
              flexDirection: "column",
              gap: 5,
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                display: "block",
                height: 1.5,
                width: 22,
                background: "var(--text)",
                borderRadius: 2,
                transformOrigin: "center",
                transition: "transform 0.22s ease",
                transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: 1.5,
                width: 14,
                background: "var(--text)",
                borderRadius: 2,
                transition: "opacity 0.15s ease, width 0.22s ease",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                height: 1.5,
                width: 22,
                background: "var(--text)",
                borderRadius: 2,
                transformOrigin: "center",
                transition: "transform 0.22s ease",
                transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className="nav-mobile-menu"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(13,12,9,0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          flexDirection: "column",
          justifyContent: "center",
          padding: "calc(var(--nav-h) + 24px) var(--pad) 40px",
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(({ href, label }, i) => (
            <li
              key={href}
              style={{
                borderBottom: "1px solid var(--border)",
                transform: open ? "translateY(0)" : "translateY(16px)",
                opacity: open ? 1 : 0,
                transition: `transform 0.3s ease ${i * 0.04}s, opacity 0.3s ease ${i * 0.04}s`,
              }}
            >
              <Link
                href={href}
                style={{
                  display: "block",
                  fontFamily: "var(--font-disp)",
                  fontSize: "clamp(32px, 9vw, 52px)",
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: pathname === href ? "var(--accent)" : "var(--text)",
                  lineHeight: 1,
                  padding: "18px 0",
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 32,
            display: "flex",
            gap: 24,
          }}
        >
          {[
            { href: "https://github.com/ayushsanjdev", label: "GitHub" },
            { href: "https://linkedin.com/in/ayushsanj", label: "LinkedIn" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.1em",
              }}
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
