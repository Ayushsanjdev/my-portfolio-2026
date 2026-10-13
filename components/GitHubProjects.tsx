'use client';

import { useState } from 'react';
import { isRecentlyActive, safeHomepage, searchProjects, type GitHubProject } from '@/lib/github-projects';

export default function GitHubProjects({ projects, fetchedAt }: { projects: GitHubProject[] | null; fetchedAt: number }) {
  const [query, setQuery] = useState('');
  const [activeOnly, setActiveOnly] = useState(false);
  const [limit, setLimit] = useState(12);
  const all = projects || [];
  const activeCount = all.filter(p => isRecentlyActive(p.pushed_at, fetchedAt)).length;
  const filtered = searchProjects(all, query).filter(p => !activeOnly || isRecentlyActive(p.pushed_at, fetchedAt));

  return (
    <section className="github-projects" aria-labelledby="github-heading">
      <div className="github-heading">
        <div><h2 id="github-heading">On GitHub.</h2><p>Side projects, experiments, and things I’m working on.</p></div>
        <a className="github-profile" href="https://github.com/ayushsanjdev?tab=repositories" target="_blank" rel="noopener noreferrer">@ayushsanjdev ↗</a>
      </div>
      {projects === null ? (
        <p className="github-empty">Projects couldn’t be loaded right now. <a href="https://github.com/ayushsanjdev?tab=repositories" target="_blank" rel="noopener noreferrer">Browse them on GitHub ↗</a></p>
      ) : (
        <>
          <div className="github-toolbar">
            <div className="github-filters" aria-label="Filter projects">
              <button type="button" aria-pressed={!activeOnly} onClick={() => { setActiveOnly(false); setLimit(12); }}>All projects <span>{all.length}</span></button>
              <button type="button" aria-pressed={activeOnly} onClick={() => { setActiveOnly(true); setLimit(12); }}>Recently active <span>{activeCount}</span></button>
            </div>
            <label className="github-search"><span className="github-sr-only">Search GitHub projects</span><input type="search" placeholder="Search projects…" value={query} onChange={e => { setQuery(e.target.value); setLimit(12); }} /></label>
          </div>
          <p className="github-activity-note">Newest pushes first. Recently active = a push in the last 90 days.</p>
          <div className="github-list">
            {filtered.slice(0, limit).map(project => {
              const active = isRecentlyActive(project.pushed_at, fetchedAt);
              const homepage = safeHomepage(project.homepage);
              return (
                <article className="github-row" key={project.id}>
                  <div className="github-row-main">
                    <h3><a href={project.html_url} target="_blank" rel="noopener noreferrer">{project.name}<span aria-hidden="true">↗</span></a></h3>
                    {project.description && <p>{project.description}</p>}
                    <div className="github-meta">{project.language && <span>{project.language}</span>}{active && <span className="github-active">Recently active</span>}{project.pushed_at && <span>Last push <time dateTime={project.pushed_at}>{new Date(project.pushed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</time></span>}</div>
                  </div>
                  <div className="github-links"><a href={project.html_url} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} on GitHub`}>Code ↗</a>{homepage && <a href={homepage} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} live demo`}>Live demo ↗</a>}</div>
                </article>
              );
            })}
          </div>
          {filtered.length === 0 && <p className="github-empty">{all.length === 0 ? 'No public projects to show yet.' : 'No projects match these filters.'} {all.length > 0 && <button type="button" onClick={() => { setQuery(''); setActiveOnly(false); setLimit(12); }}>Clear filters</button>}</p>}
          <div className="github-bottom"><p role="status">Showing {Math.min(limit, filtered.length)} of {filtered.length} projects</p>{limit < filtered.length && <button type="button" className="github-more" onClick={() => setLimit(value => value + 12)}>Show more <span aria-hidden="true">+</span></button>}</div>
        </>
      )}
    </section>
  );
}
