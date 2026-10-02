import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const kvRows = [
  { k: 'Location', v: 'Patna, Bihar, India' },
  { k: 'Email',    v: <a href="mailto:ayushsanjpro@gmail.com" className="accent-link">ayushsanjpro@gmail.com</a> },
  { k: 'GitHub',   v: <a href="https://github.com/ayushsanjdev" target="_blank" rel="noopener noreferrer" className="accent-link">github.com/ayushsanjdev</a> },
  { k: 'LinkedIn', v: <a href="https://linkedin.com/in/ayushsanj" target="_blank" rel="noopener noreferrer" className="accent-link">linkedin.com/in/ayushsanj</a> },
  { k: 'Status',   v: <span style={{ color: 'var(--accent)' }}>● Open to work</span> },
];

export default function About() {
  return (
    <div className="page">
      <PageHeader label="03 / About" title="Who I am." />
      <div className="about-layout">
        <p className="about-lead">A software engineer with a frontend focus who cares how the whole product feels<span>.</span></p>
        <RevealBlock delay={0.05}>
          <div className="about-story">
          <p>
            I&apos;m a software engineer with a frontend focus and <strong style={{ color: 'var(--text)', fontWeight: 600 }}>4+ years of experience</strong> at startups — agritech, fitness, telecom, recruitment. Owning the frontend end-to-end: <strong style={{ color: 'var(--text)', fontWeight: 600 }}>React, React Native, TypeScript</strong>. UI components, pixel precision, performance, responsiveness. The things that make an interface feel right rather than just work.
          </p>
          <p>
            That&apos;s where I am. How I got here is less conventional. I grew up in <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Patna, Bihar</strong> with a childhood pull toward computers — but ended up with a <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Bachelor&apos;s in Arts</strong>, not Computer Science. No formal training. Just curiosity, the internet, and the kind of communities where you learn by doing. I taught myself, showed up, stayed consistent, and eventually turned that into my first internship — then a full-time role.
          </p>
          <p>
            I want to be a <strong style={{ color: 'var(--text)', fontWeight: 600 }}>software engineer</strong> — building products that make things genuinely easier for people, and that other developers actually enjoy working with. Frontend is my strongest area, and I&apos;m growing my experience in backend development. That&apos;s the long game. Outside of screens: I&apos;m at the gym every day, always up for a coffee run, and at my best when I&apos;m out with friends catching a film or just going somewhere new.
          </p>
          </div>
        </RevealBlock>
      </div>
      <RevealBlock delay={0.1} className="detail-list">
        {kvRows.map(({ k, v }) => (
          <div className="detail-row" key={k}>
            <span className="detail-label">{k}</span>
            <span className="detail-value">{v}</span>
          </div>
        ))}
      </RevealBlock>
    </div>
  );
}
