import ProjectPreview from '@/components/ProjectPreview';
import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';
import GitHubProjects from '@/components/GitHubProjects';
import { getGitHubProjects } from '@/lib/github';

export const revalidate = 3600;

const projects = [
  {
    number: '01',
    name: 'FrontlaneJobs',
    slug: 'frontlanejobs',
    url: 'https://frontlanejobs.vercel.app',
    urlLabel: 'frontlanejobs.vercel.app ↗',
    contribution: 'Frontend job discovery & application tracking',
    delay: 0,
  },
  {
    number: '02',
    slug: 'rsvp',
    name: 'RSVP',
    url: 'https://rsvp.kim',
    urlLabel: 'rsvp.kim ↗',
    contribution: 'API-driven location autocomplete',
    delay: 0,
  },
  {
    number: '03',
    slug: 'evaltech',
    name: 'Evaltech',
    url: 'https://evaltech.ai',
    urlLabel: 'evaltech.ai ↗',
    contribution: 'Dynamic form system & API integration',
    delay: 0.05,
  },
];

export default async function Projects() {
  const { projects: githubProjects, fetchedAt } = await getGitHubProjects();
  return (
    <div className="interior-page interior-page--dark">
      <div className="page">
        <PageHeader label="01 / Projects" title="Things I've built & contributed to." />
        <div className="editorial-list">
          {projects.map(({ number, name, slug, url, urlLabel, contribution, delay }) => (
            <article className="editorial-row editorial-row--preview" key={name}>
              <RevealBlock delay={delay} className="editorial-row-inner">
                <span className="editorial-number">{number}</span>
                <div className="editorial-main">
                  <p className="editorial-kicker">{slug === 'frontlanejobs' ? 'Personal project' : 'Contributor'}</p>
                  <h2><a href={url} target="_blank" rel="noopener noreferrer">{name}<span aria-hidden="true">↗</span></a></h2>
                </div>
                <div className="editorial-aside">
                  <p>{contribution}</p>
                  <span>{urlLabel}</span>
                </div>
                <ProjectPreview name={name} slug={slug} />
              </RevealBlock>
            </article>
          ))}
        </div>
        <GitHubProjects projects={githubProjects} fetchedAt={fetchedAt} />
      </div>
    </div>
  );
}
