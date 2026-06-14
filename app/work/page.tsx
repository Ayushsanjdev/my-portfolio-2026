import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const jobs = [
  {
    company: 'Kraftbase',
    role: 'Software Engineer',
    location: 'Vadodara',
    date: 'Dec 2025 – May 2026',
    delay: 0,
    stack: ['React', 'React Native', 'Next.js', 'GSAP', 'Tailwind', 'React Query'],
  },
  {
    company: 'Mera Farmhouse',
    role: 'Frontend Developer',
    location: 'Chandigarh',
    date: 'Sep 2024 – Jul 2025',
    delay: 0.05,
    stack: ['React Native'],
  },
  {
    company: 'Team Geek Solutions',
    role: 'Software Developer',
    location: 'Pune',
    date: 'Oct 2021 – Jul 2024',
    delay: 0.1,
    stack: ['React', 'Next.js', 'JavaScript', 'Redux', 'Material UI', 'Python'],
  },
];

export default function Work() {
  return (
    <div className="page">
      <PageHeader label="Work Experience" title="Where I've worked." />
      <div style={{ height: 1, background: 'var(--border)' }} />
      {jobs.map(({ company, role, location, date, stack, delay }) => (
        <article key={company}>
          <RevealBlock delay={delay} style={{ padding: '44px 0' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', gap: 20, marginBottom: 8, flexWrap: 'wrap',
            }}>
              <div style={{
                fontFamily: 'var(--font-disp)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 600, fontStyle: 'italic', color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1,
              }}>
                {company}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="6" height="6" aria-hidden="true">
                  <circle cx="3" cy="3" r="2" fill="rgba(200,241,63,0.5)" />
                </svg>
                <time style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {date}
                </time>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.06em', marginBottom: 20 }}>
              {role} &nbsp;·&nbsp; {location}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {stack.map(tech => (
                <span key={tech} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--soft)',
                  border: '1px solid var(--border)', borderRadius: 4,
                  padding: '4px 10px', letterSpacing: '0.04em',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </RevealBlock>
          <div style={{ height: 1, background: 'var(--border)' }} />
        </article>
      ))}
    </div>
  );
}
