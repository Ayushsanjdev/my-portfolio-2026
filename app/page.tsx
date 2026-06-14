import Link from "next/link";
import WebGLHero from "@/components/WebGLHero";
import HeroText from "@/components/HeroText";
import FloatingCode from "@/components/FloatingCode";
import VisitorCounter from "@/components/VisitorCounter";

const stack = ["Next.js", "React", "TypeScript", "GSAP", "Three.js"];

const corners: React.CSSProperties[] = [
  {
    top: "var(--nav-h)",
    left: 0,
    borderTop: "1px solid rgba(200,241,63,0.4)",
    borderLeft: "1px solid rgba(200,241,63,0.4)",
  },
  {
    top: "var(--nav-h)",
    right: 0,
    borderTop: "1px solid rgba(200,241,63,0.4)",
    borderRight: "1px solid rgba(200,241,63,0.4)",
  },
  {
    bottom: 0,
    left: 0,
    borderBottom: "1px solid rgba(200,241,63,0.4)",
    borderLeft: "1px solid rgba(200,241,63,0.4)",
  },
  {
    bottom: 0,
    right: 0,
    borderBottom: "1px solid rgba(200,241,63,0.4)",
    borderRight: "1px solid rgba(200,241,63,0.4)",
  },
];

export default function Home() {
  return (
    <>
      <WebGLHero />
      <FloatingCode />

      <div
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          padding: "0 var(--pad)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "var(--nav-h)",
          position: "relative",
        }}
      >
          {/* Corner crosshairs */}
          {corners.map((s, i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{ position: "absolute", width: 14, height: 14, ...s }}
            />
          ))}

          <p className="hero-tag">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
                display: "inline-block",
                animation: "blink 2.5s ease infinite",
              }}
            />
            Open to work · Frontend &amp; Mobile Engineer
          </p>

          <HeroText />

          <div
            className="hero-meta"
            style={{
              marginBottom: "clamp(32px, 5vw, 52px)",
              animation: "fadeUp 0.5s ease 0.65s both",
            }}
          >
            {[
              "India",
              "·",
              "3+ years React & React Native",
              "·",
              "TypeScript",
            ].map((item, i) => (
              <span
                key={i}
                className={item === "·" ? "hero-sep" : undefined}
                style={{
                  fontSize: 15,
                  color: item === "·" ? "var(--muted)" : "var(--soft)",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <div
            className="hero-cta"
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              animation: "fadeUp 0.5s ease 0.82s both",
            }}
          >
            <Link href="/work" className="btn-primary" data-magnetic>
              View Work
            </Link>
            <Link href="/resume" className="btn-outline" data-magnetic>
              Resume →
            </Link>
            <Link href="/contact" className="btn-outline" data-magnetic>
              Contact
            </Link>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border)",
              marginTop: "clamp(28px, 4vw, 44px)",
              paddingTop: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
              animation: "fadeUp 0.5s ease 0.96s both",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)", marginRight: 2 }}>
                built with
              </span>
              {stack.map((tool, i) => (
                <span key={tool} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "var(--font-mono)",
                      color: i === 0 ? "var(--accent)" : "var(--soft)",
                    }}
                  >
                    {tool}
                  </span>
                  {i < stack.length - 1 && (
                    <span style={{ color: "var(--muted)", fontSize: 10 }}>·</span>
                  )}
                </span>
              ))}
            </div>
            <VisitorCounter />
          </div>
      </div>
    </>
  );
}
