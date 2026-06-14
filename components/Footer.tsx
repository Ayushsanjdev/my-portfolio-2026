export default function Footer() {
  return (
    <footer style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '24px var(--pad)' }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
        textAlign: 'center', letterSpacing: '0.08em', marginBottom: 20,
        fontStyle: 'italic',
      }}>
        yes, an AI helped. no, it doesn&apos;t matter.
      </p>

      {/* Decorative SVG rule with accent diamond */}
      <svg
        aria-hidden="true"
        style={{ display: 'block', width: '100%', marginBottom: 20 }}
        height="12"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="1" x2="44%" y2="1" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <polygon points="48%,0 52%,0 50%,8" fill="rgba(200,241,63,0.3)" />
        <circle cx="50%" cy="4" r="1.5" fill="rgba(200,241,63,0.5)" />
        <line x1="56%" y1="1" x2="100%" y2="1" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      </svg>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
          © 2026 Ayush Sanj
        </span>
<div style={{ display: 'flex', gap: 20 }}>
          {[
            { href: 'https://github.com/ayushsanjdev', label: 'GitHub' },
            { href: 'https://linkedin.com/in/ayushsanj', label: 'LinkedIn' },
          ].map(({ href, label }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="muted-to-text" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
