"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  return (
    <header className="site-nav">
      <nav className="site-nav-inner" aria-label="Main navigation">
        <Link className="site-brand" href="/" onClick={() => setOpen(false)} aria-label="Ayush Sanj, home">
          ayush<span>.</span>sanj
        </Link>
        <span className="site-nav-descriptor">Frontend engineer / India</span>
        <div className="site-nav-links">
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
