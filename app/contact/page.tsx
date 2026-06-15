import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const contactLinks = [
  { k: 'Email',    v: 'ayushsanjpro@gmail.com',   href: 'mailto:ayushsanjpro@gmail.com',    external: false },
  { k: 'LinkedIn', v: 'linkedin.com/in/ayushsanj', href: 'https://linkedin.com/in/ayushsanj', external: true },
  { k: 'GitHub',   v: 'github.com/ayushsanjdev',   href: 'https://github.com/ayushsanjdev',  external: true },
];

function ContactRow({ k, v, href, external }: { k: string; v: string; href: string; external: boolean }) {
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="contact-row">
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
        <div style={{ fontSize: 15, color: 'var(--text)' }}>{v}</div>
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
