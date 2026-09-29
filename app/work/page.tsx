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
      <PageHeader label="02 / Experience" title="Where I've worked." />
      <div className="editorial-list">
        {jobs.map(({ company, role, location, date, stack, delay }, index) => (
          <article className="editorial-row editorial-row--work" key={company}>
            <RevealBlock delay={delay} className="editorial-row-inner">
              <span className="editorial-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="editorial-main">
                <p className="editorial-kicker">{role} / {location}</p>
                <h2>{company}</h2>
              </div>
              <div className="editorial-aside">
                <time>{date}</time>
                <p className="editorial-stack">{stack.join(' · ')}</p>
              </div>
            </RevealBlock>
          </article>
        ))}
      </div>
    </div>
  );
}
