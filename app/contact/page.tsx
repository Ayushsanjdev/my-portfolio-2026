import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const contactLinks = [
  { label: 'Email', value: 'ayushsanjpro@gmail.com', href: 'mailto:ayushsanjpro@gmail.com', external: false },
  { label: 'LinkedIn', value: 'linkedin.com/in/ayushsanj', href: 'https://linkedin.com/in/ayushsanj', external: true },
  { label: 'GitHub', value: 'github.com/ayushsanjdev', href: 'https://github.com/ayushsanjdev', external: true },
];

export default function Contact() {
  return (
    <div className="interior-page interior-page--coral">
      <div className="page">
        <PageHeader label="06 / Contact" title={<>Let&apos;s build something<br />great together<span className="page-period">.</span></>} />
        <div className="contact-layout">
          <RevealBlock delay={0.05}>
            <p className="contact-intro">Open to full-time roles, freelance projects, and interesting collaborations. I typically respond within 24 hours.</p>
          </RevealBlock>
          <RevealBlock delay={0.1} className="contact-links">
            {contactLinks.map(({ label, value, href, external }) => (
              <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
                <span className="contact-label">{label}</span>
                <span className="contact-value">{value}</span>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </RevealBlock>
        </div>
      </div>
    </div>
  );
}
