import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const kvRows = [
  { k: 'Location', v: 'Patna, Bihar, India' },
  { k: 'Email',    v: <a href="mailto:ayushsanjpro@gmail.com" className="accent-link">ayushsanjpro@gmail.com</a> },
  { k: 'Phone',    v: <a href="tel:+918595720727" className="accent-link">+91 859 572 0727</a> },
  { k: 'GitHub',   v: <a href="https://github.com/ayushsanjdev" target="_blank" rel="noopener noreferrer" className="accent-link">github.com/ayushsanjdev</a> },
  { k: 'LinkedIn', v: <a href="https://linkedin.com/in/ayushsanj" target="_blank" rel="noopener noreferrer" className="accent-link">linkedin.com/in/ayushsanj</a> },
  { k: 'Status',   v: <span style={{ color: 'var(--accent)' }}>● Open to work</span> },
];

export default function About() {
  return (
    <div className="page">
      <PageHeader label="About" title="Who I am." />
      <RevealBlock delay={0.05}>
        <div style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--soft)', marginBottom: 52, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p>
            I grew up in <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Patna, Bihar</strong> with a childhood fascination for computers and no clear path into tech. Life had other plans — I ended up with a <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Bachelor's in Arts</strong>, not Computer Science. But the interest never left. I started teaching myself online, got obsessed, showed up in developer communities, stayed active, and eventually turned that into my first internship — then a job.
          </p>
          <p>
            No formal training. Just curiosity, the internet, and the kind of communities where you learn by doing. I've been in the game for <strong style={{ color: 'var(--text)', fontWeight: 600 }}>3+ years</strong> now — mostly at startups, where I owned frontend end-to-end across agritech, fitness, telecom, and recruitment. <strong style={{ color: 'var(--text)', fontWeight: 600 }}>React, React Native, TypeScript</strong> — UI components, pixel precision, performance, responsiveness. The things that make an interface feel right rather than just work.
          </p>
          <p>
            I want to be a <strong style={{ color: 'var(--text)', fontWeight: 600 }}>frontend engineer for life</strong> — building products that make things genuinely easier for people, and that other developers actually enjoy working with. That's the long game. Outside of screens: I'm at the gym every day, always up for a coffee run, and at my best when I'm out with friends catching a film or just going somewhere new.
          </p>
        </div>
      </RevealBlock>
      <RevealBlock delay={0.1}>
        {kvRows.map(({ k, v }, i) => (
          <div key={k} style={{
            display: 'flex', gap: 24, padding: '14px 0',
            borderTop: i === 0 ? '1px solid var(--border)' : undefined,
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase', minWidth: 120, flexShrink: 0, paddingTop: 2 }}>
              {k}
            </span>
            <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>{v}</span>
          </div>
        ))}
      </RevealBlock>
    </div>
  );
}
