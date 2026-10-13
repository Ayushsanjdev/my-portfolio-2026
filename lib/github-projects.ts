export type GitHubProject = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics: string[];
  homepage: string | null;
  pushed_at: string | null;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
};

export function selectProjects(projects: GitHubProject[]) {
  return projects.filter(p => !p.fork && !p.archived && !p.disabled)
    .sort((a, b) => Date.parse(b.pushed_at || '') - Date.parse(a.pushed_at || ''));
}

export function isRecentlyActive(pushedAt: string | null, now: number) {
  const age = now - Date.parse(pushedAt || '');
  return age >= 0 && age <= 90 * 24 * 60 * 60 * 1000;
}

export function searchProjects(projects: GitHubProject[], query: string) {
  const term = query.trim().toLowerCase();
  return projects.filter(p => [p.name, p.description, p.language, ...(p.topics || [])].join(' ').toLowerCase().includes(term));
}

export function safeHomepage(homepage: string | null) {
  try {
    const url = new URL(homepage || '');
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}
