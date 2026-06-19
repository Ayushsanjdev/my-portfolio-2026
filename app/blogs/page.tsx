import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const blogs: { name: string; url: string; description: string; delay: number }[] = [
  {
    name: 'JavaScript Increment Operators & Closures',
    url: 'https://medium.com/@ayushsanj/javascript-increment-operators-closures-a-developers-quick-guide-b9f43c0889aa',
    description: "A developer's quick guide",
    delay: 0,
  },
  {
    name: 'Hosting and Deploying — Firebase',
    url: 'https://learnwithayush.hashnode.dev/hosting-and-deploying-step-by-step-explained-firebase-2021',
    description: 'Step-by-step explained',
    delay: 0.05,
  },
  {
    name: 'Git Commits as a Beginner',
    url: 'https://learnwithayush.hashnode.dev/git-commits-as-a-beginner-best-practices-2021-1',
    description: 'Best practices for writing meaningful commits',
    delay: 0.1,
  },
];

export default function Blogs() {
  return (
    <div className="page">
      <PageHeader label="Writing" title="Thoughts I've put to paper." />
      <div style={{ height: 1, background: 'var(--border)' }} />
      {blogs.length === 0 ? (
        <RevealBlock delay={0} style={{ padding: '48px 0' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', letterSpacing: '0.06em' }}>
            Coming soon.
          </p>
        </RevealBlock>
      ) : (
        blogs.map(({ name, url, description, delay }) => (
          <article key={name}>
            <RevealBlock delay={delay} style={{ padding: '40px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
                    letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8,
                  }}>
                    Blog Post
                  </p>
                  <div style={{
                    fontFamily: 'var(--font-disp)', fontSize: 'clamp(22px,3vw,32px)',
                    fontWeight: 600, fontStyle: 'italic', color: 'var(--text)',
                    letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 14,
                  }}>
                    {name}
                  </div>
                  {description && (
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--soft)', letterSpacing: '0.02em' }}>
                      {description}
                    </p>
                  )}
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  style={{ marginTop: 6, flexShrink: 0 }}
                >
                  Read ↗
                </a>
              </div>
            </RevealBlock>
            <div style={{ height: 1, background: 'var(--border)' }} />
          </article>
        ))
      )}
    </div>
  );
}
