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
      <PageHeader label="04 / Writing" title="Thoughts I've put to paper." />
      {blogs.length === 0 ? (
        <p className="empty-note">Coming soon.</p>
      ) : (
        <div className="editorial-list">
          {blogs.map(({ name, url, description, delay }, index) => (
            <article className="editorial-row editorial-row--writing" key={name}>
              <RevealBlock delay={delay} className="editorial-row-inner">
                <span className="editorial-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="editorial-main">
                  <p className="editorial-kicker">Article</p>
                  <h2><a href={url} target="_blank" rel="noopener noreferrer">{name}<span aria-hidden="true">↗</span></a></h2>
                </div>
                <div className="editorial-aside"><p>{description}</p><span>Read article ↗</span></div>
              </RevealBlock>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
