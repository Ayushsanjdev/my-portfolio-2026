"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/work", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Writing" },
  { href: "/resume", label: "Résumé" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const linksRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  function moveMarker(link: HTMLElement | null) {
    const marker = markerRef.current;
    if (!marker) return;
    if (!link) {
      marker.style.opacity = "0";
      return;
    }
    marker.style.transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth})`;
    marker.style.opacity = "1";
  }

  function restoreMarker() {
    const container = linksRef.current;
    if (!container) return;
    const focused = container.contains(document.activeElement)
      ? document.activeElement as HTMLElement : null;
    moveMarker(focused ?? container.querySelector('[aria-current="page"]'));
  }

  useEffect(() => {
    const container = linksRef.current;
    if (!container) return;
    const restore = () => {
      const focused = container.contains(document.activeElement)
        ? document.activeElement as HTMLElement : null;
      moveMarker(focused ?? container.querySelector('[aria-current="page"]'));
    };
    restore();
    const observer = new ResizeObserver(restore);
    container.querySelectorAll('a').forEach((link) => observer.observe(link));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="site-nav">
      <nav className="site-nav-inner" aria-label="Main navigation">
        <Link className="site-brand" href="/" onClick={() => setOpen(false)} aria-label="Ayush Sanj, home">
          ayush<span>.</span>sanj
        </Link>
        <span className="site-nav-descriptor">Software Engineer · Frontend Focus</span>
        <div
          className="site-nav-links"
          ref={linksRef}
          onPointerOver={(event) => {
            if (event.pointerType === "touch") return;
            const link = (event.target as HTMLElement).closest("a");
            if (link) moveMarker(link);
          }}
          onPointerLeave={restoreMarker}
          onFocusCapture={(event) => moveMarker(event.target.closest("a"))}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              moveMarker(event.currentTarget.querySelector('[aria-current="page"]'));
            }
          }}
        >
          <span className="site-nav-marker" aria-hidden="true" ref={markerRef} />
          {links.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
          <Link className="site-nav-contact" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>
            Contact ↗
          </Link>
        </div>
        <button
          className="site-menu-button"
          type="button"
          aria-controls="site-mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
      </nav>
      <nav className="site-mobile-menu" id="site-mobile-menu" aria-label="Mobile navigation" hidden={!open}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={() => setOpen(false)}>
          Contact ↗
        </Link>
      </nav>
    </header>
  );
}
