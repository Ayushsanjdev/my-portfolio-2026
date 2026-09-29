import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const projects = [
  {
    number: '01',
    name: 'RSVP',
    url: 'https://rsvp.kim',
    urlLabel: 'rsvp.kim ↗',
    contribution: 'API-driven location autocomplete',
    delay: 0,
  },
  {
    number: '02',
    name: 'Evaltech',
    url: 'https://evaltech.ai',
    urlLabel: 'evaltech.ai ↗',
    contribution: 'Dynamic form system & API integration',
    delay: 0.05,
  },
];

export default function Projects() {
  return (
    <div className="interior-page interior-page--dark">
      <div className="page">
        <PageHeader label="01 / Projects" title="Things I've contributed to." />
        <div className="editorial-list">
          {projects.map(({ number, name, url, urlLabel, contribution, delay }) => (
            <article className="editorial-row" key={name}>
              <RevealBlock delay={delay} className="editorial-row-inner">
                <span className="editorial-number">{number}</span>
                <div className="editorial-main">
                  <p className="editorial-kicker">Contributor</p>
                  <h2><a href={url} target="_blank" rel="noopener noreferrer">{name}<span aria-hidden="true">↗</span></a></h2>
                </div>
                <div className="editorial-aside">
                  <p>{contribution}</p>
                  <span>{urlLabel}</span>
                </div>
              </RevealBlock>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
