import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const projects = [
  {
    name: 'RSVP',
    url: 'https://rsvp.kim',
    urlLabel: 'rsvp.kim ↗',
    contribution: 'API-driven location autocomplete',
    delay: 0,
  },
  {
    name: 'Evaltech',
    url: 'https://evaltech.ai',
    urlLabel: 'evaltech.ai ↗',
    contribution: 'Dynamic form system & API integration',
    delay: 0.05,
  },
];

export default function Projects() {
  return (
    <div className="page">
      <PageHeader label="Projects" title="Things I've contributed to." />
      <div style={{ height: 1, background: 'var(--border)' }} />
      {projects.map(({ name, url, urlLabel, contribution, delay }) => (
        <article key={name}>
          <RevealBlock delay={delay} style={{ padding: '40px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Contributor
                </p>
                <div style={{ fontFamily: 'var(--font-disp)', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 600, fontStyle: 'italic', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 14 }}>
                  {name}
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--soft)', letterSpacing: '0.02em' }}>
                  {contribution}
                </p>
              </div>
              <a href={url} target="_blank" rel="noopener noreferrer" className="project-link" style={{ flexShrink: 0 }}>
                {urlLabel}
              </a>
            </div>
          </RevealBlock>
          <div style={{ height: 1, background: 'var(--border)' }} />
        </article>
      ))}
    </div>
  );
}
