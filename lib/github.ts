import { selectProjects, type GitHubProject } from './github-projects';

export async function getGitHubProjects(): Promise<{ projects: GitHubProject[] | null; fetchedAt: number }> {
  const fetchedAt = Date.now();
  try {
    const projects: GitHubProject[] = [];
    let page = 1;
    let hasNext = true;
    while (hasNext) {
      const response = await fetch(`https://api.github.com/users/ayushsanjdev/repos?sort=pushed&direction=desc&per_page=100&page=${page}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const batch: GitHubProject[] = await response.json();
      if (!Array.isArray(batch)) throw new Error('Invalid GitHub response');
      projects.push(...batch);
      hasNext = Boolean(response.headers.get('link')?.includes('rel="next"'));
      page++;
    }
    return { projects: selectProjects(projects), fetchedAt };
  } catch {
    return { projects: null, fetchedAt };
  }
}
