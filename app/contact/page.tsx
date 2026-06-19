import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const ICONS: Record<string, React.FC> = { Email: EmailIcon, LinkedIn: LinkedInIcon, GitHub: GitHubIcon };

const contactLinks = [
  { k: 'Email',    v: 'ayushsanjpro@gmail.com',   href: 'mailto:ayushsanjpro@gmail.com',    external: false },
  { k: 'LinkedIn', v: 'linkedin.com/in/ayushsanj', href: 'https://linkedin.com/in/ayushsanj', external: true },
  { k: 'GitHub',   v: 'github.com/ayushsanjdev',   href: 'https://github.com/ayushsanjdev',  external: true },
];

function ContactRow({ k, v, href, external }: { k: string; v: string; href: string; external: boolean }) {
  const Icon = ICONS[k];
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="contact-row">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {Icon && (
          <span style={{ color: 'var(--muted)', flexShrink: 0, display: 'flex', transition: 'color 0.18s' }} className="contact-icon">
            <Icon />
          </span>
        )}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
          <div style={{ fontSize: 15, color: 'var(--text)' }}>{v}</div>
        </div>
      </div>
      <span className="contact-arrow">→</span>
    </a>
  );
}

export default function Contact() {
  return (
    <div className="page">
      <PageHeader label="Contact" title={<>Let&apos;s build something<br />great together.</>} />
      <RevealBlock delay={0.05} style={{ marginBottom: 52 }}>
        <p style={{ fontSize: 16, color: 'var(--soft)', lineHeight: 1.75, maxWidth: 480 }}>
          Open to full-time roles, freelance projects, and interesting collaborations. I typically respond within 24 hours.
        </p>
      </RevealBlock>
      <RevealBlock delay={0.1}>
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {contactLinks.map(link => <ContactRow key={link.k} {...link} />)}
        </div>
      </RevealBlock>
    </div>
  );
}
