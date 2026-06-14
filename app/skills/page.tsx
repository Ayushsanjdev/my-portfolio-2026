import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const skillGroups = [
  { label: 'Languages',    items: [{ t: 'JavaScript', hi: true }, { t: 'TypeScript', hi: true }] },
  { label: 'Frameworks',   items: [{ t: 'React.js', hi: true }, { t: 'React Native', hi: true }, { t: 'Next.js', hi: true }, { t: 'Node.js' }, { t: 'Framer' }] },
  { label: 'State & Data', items: [{ t: 'Zustand' }, { t: 'React Query' }, { t: 'Redux Toolkit' }] },
  { label: 'Styling',      items: [{ t: 'Tailwind CSS' }, { t: 'MUI' }] },
  { label: 'Testing',      items: [{ t: 'Vitest' }, { t: 'Jest' }] },
  { label: 'Platforms',    items: [{ t: 'iOS' }, { t: 'Android' }, { t: 'Web' }] },
];

export default function Skills() {
  return (
    <div className="page">
      <PageHeader label="Skills" title="What I work with." />
      <RevealBlock delay={0.05}>
        {skillGroups.map(({ label, items }, i) => (
          <div key={label} style={{
            display: 'flex', gap: 24, padding: '18px 0',
            borderTop: i === 0 ? '1px solid var(--border)' : undefined,
            borderBottom: '1px solid var(--border)',
            alignItems: 'baseline',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.16em', textTransform: 'uppercase', minWidth: 120, flexShrink: 0, paddingTop: 3 }}>
              {label}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
              {items.map(({ t, hi }) => (
                <span key={t} style={{ fontSize: 14, color: hi ? 'var(--text)' : 'var(--soft)', cursor: 'default' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </RevealBlock>
    </div>
  );
}
