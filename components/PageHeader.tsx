export default function PageHeader({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
        letterSpacing: '0.22em', textTransform: 'uppercase' as const, marginBottom: 14,
        animation: 'fadeUp 0.5s ease 0.05s both',
      }}>
        {label}
      </p>
      <h1 style={{
        fontFamily: 'var(--font-disp)', fontSize: 'clamp(36px,5.5vw,58px)',
        fontWeight: 600, fontStyle: 'italic' as const, letterSpacing: '-0.01em',
        color: 'var(--text)', lineHeight: 1.06, marginBottom: 52,
        animation: 'fadeUp 0.55s ease 0.12s both',
      }}>
        {title}
      </h1>
    </>
  );
}
