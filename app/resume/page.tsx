import PrintButton from '@/components/PrintButton';

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
      letterSpacing: '0.22em', textTransform: 'uppercase',
      borderBottom: '1px solid var(--border)', paddingBottom: 10, marginBottom: 24,
    }}>
      {children}
    </div>
  );
}

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Kraftbase',
    location: 'Vadodara',
    date: 'Dec 2025 – May 2026',
    bullets: [
      <>Improved landing page load times by <strong>35%</strong> by refactoring GSAP animation sequences and implementing a critical CSS delivery strategy.</>,
      <>Engineered an AI-driven EEG dashboard using React and Tailwind, reducing event detection latency by <strong>15%</strong> through optimized TypeScript visualization components.</>,
      <>Implemented Stripe-based dispute resolution and a real-time transaction UI, reducing payment-related support tickets by <strong>20%</strong> via optimistic UI updates.</>,
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Mera Farmhouse',
    location: 'Chandigarh',
    date: 'Sep 2024 – Jul 2025',
    bullets: [
      <>Accelerated product delivery by <strong>30%</strong> by architecting a shared component library between Next.js and React Native for an international agricultural marketplace.</>,
      <>Achieved <strong>100% on-time delivery</strong> for 5+ major releases across iOS and Android deployments.</>,
    ],
  },
  {
    role: 'Software Developer',
    company: 'Team Geek Solutions',
    location: 'Pune',
    date: 'Oct 2021 – Jul 2024',
    bullets: [
      <>Architected an automated interview management system that reduced manual overhead by <strong>50%</strong> through custom API integrations.</>,
      <>Designed a centralized Storybook component library across <strong>three platforms</strong>, ensuring UI consistency and expediting developer ramp-up.</>,
      <>Reduced user-facing lag by <strong>25%</strong> by implementing React Query for standardized data fetching across 3 production environments.</>,
    ],
  },
];

const projectItems = [
  {
    name: 'RSVP',
    url: 'rsvp.kim',
    role: 'Open Source Developer',
    bullets: [
      <>Reduced location search latency by <strong>60%</strong> with API-driven autocomplete supporting 10k+ city queries.</>,
      <>Established unit testing infrastructure for architectural consistency and maintainability.</>,
    ],
  },
  {
    name: 'Evaltech',
    url: 'evaltech.ai',
    role: 'Frontend Developer',
    bullets: [
      <>Built a dynamic form interface that automated interview question management via API, eliminating manual admin workflows.</>,
    ],
  },
];

const skillRows = [
  { k: 'Languages',    v: 'JavaScript, TypeScript' },
  { k: 'Frameworks',   v: 'React.js, Next.js, React Native, Node.js, Framer' },
  { k: 'State & Data', v: 'Zustand, React Query, Redux Toolkit' },
  { k: 'Styling',      v: 'Tailwind CSS, MUI' },
  { k: 'Testing',      v: 'Vitest, Jest' },
];

const education = [
  { name: 'Frontend Development Certification', inst: 'ZTM Academy', year: '2021' },
  { name: 'BA English Honours', inst: 'Magadh University', year: '2017 – 2020' },
];

export default function Resume() {
  return (
    <div className="resume-wrap">
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', gap: 24, marginBottom: 40, flexWrap: 'wrap',
        animation: 'fadeUp 0.5s ease 0.1s both',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-disp)', fontSize: 'clamp(32px,5vw,48px)',
            fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 6,
          }}>
            Ayush Sanj
          </div>
          <div style={{ fontSize: 15, color: 'var(--soft)' }}>
            Frontend &amp; Mobile Engineer
          </div>
        </div>
        <PrintButton />
      </div>

      {/* Contact strip */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px 24px', marginBottom: 40,
        fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)',
        animation: 'fadeUp 0.5s ease 0.2s both',
      }}>
        {[
          { label: 'India', href: null },
          { label: 'ayushsanjpro@gmail.com', href: 'mailto:ayushsanjpro@gmail.com' },
          { label: 'github.com/ayushsanjdev', href: 'https://github.com/ayushsanjdev' },
          { label: 'linkedin.com/in/ayushsanj', href: 'https://linkedin.com/in/ayushsanj' },
        ].map(({ label, href }) =>
          href ? (
            <a key={label} href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="resume-contact-link"
            >
              {label}
            </a>
          ) : <span key={label}>{label}</span>
        )}
      </div>

      {/* Summary */}
      <div style={{ marginBottom: 40, animation: 'fadeUp 0.5s ease 0.25s both' }}>
        <SectionHead>Summary</SectionHead>
        <p style={{ fontSize: 15, color: 'var(--soft)', lineHeight: 1.8 }}>
          Frontend and Mobile Engineer with 3+ years building production-grade interfaces across agritech, fitness, telecom, and recruitment. Specialized in React, React Native, and TypeScript — from pixel-perfect landing pages and complex data dashboards to cross-platform mobile apps shipped on both stores. Proven track record of owning entire frontend slices end-to-end, from architecture to deployment.
        </p>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: 40, animation: 'fadeUp 0.5s ease 0.32s both' }}>
        <SectionHead>Experience</SectionHead>
        {experiences.map(({ role, company, location, date, bullets }) => (
          <div key={company} style={{ marginBottom: 28 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', gap: 16, marginBottom: 4, flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{role}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{date}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', marginBottom: 12 }}>
              {company} &nbsp;·&nbsp; {location}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, padding: 0 }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ fontSize: 14, color: 'var(--soft)', lineHeight: 1.7, paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--muted)', fontSize: 12 }}>—</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div style={{ marginBottom: 40, animation: 'fadeUp 0.5s ease 0.39s both' }}>
        <SectionHead>Projects</SectionHead>
        {projectItems.map(({ name, url, role, bullets }) => (
          <div key={name} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
              {name}{' '}
              <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: 13 }}>— {url}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', marginBottom: 12 }}>{role}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, padding: 0 }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ fontSize: 14, color: 'var(--soft)', lineHeight: 1.7, paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--muted)', fontSize: 12 }}>—</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div style={{ marginBottom: 40, animation: 'fadeUp 0.5s ease 0.46s both' }}>
        <SectionHead>Skills</SectionHead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {skillRows.map(({ k, v }) => (
            <div key={k} style={{ display: 'flex', gap: 16, fontSize: 14, alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', minWidth: 100, flexShrink: 0 }}>{k}</span>
              <span style={{ color: 'var(--soft)', lineHeight: 1.6 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div style={{ animation: 'fadeUp 0.5s ease 0.52s both' }}>
        <SectionHead>Education</SectionHead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {education.map(({ name, inst, year }) => (
            <div key={name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{year}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{inst}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
