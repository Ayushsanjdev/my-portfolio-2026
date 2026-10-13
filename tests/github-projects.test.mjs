import test from 'node:test';
import assert from 'node:assert/strict';
import { selectProjects, isRecentlyActive, searchProjects, safeHomepage } from '../lib/github-projects.ts';

const repo = (name, extra = {}) => ({ id: name, name, description: null, language: null, topics: [], fork: false, archived: false, disabled: false, pushed_at: '2026-10-01T00:00:00Z', ...extra });

test('only original, available projects appear, newest push first', () => {
  const selected = selectProjects([repo('old', { pushed_at: '2025-01-01T00:00:00Z' }), repo('fork', { fork: true }), repo('archive', { archived: true }), repo('disabled', { disabled: true }), repo('new')]);
  assert.deepEqual(selected.map(p => p.name), ['new', 'old']);
});

test('activity includes the 90-day boundary and excludes older or future pushes', () => {
  const now = Date.parse('2026-10-13T00:00:00Z');
  assert.equal(isRecentlyActive('2026-07-15T00:00:00Z', now), true);
  assert.equal(isRecentlyActive('2026-07-14T23:59:59Z', now), false);
  assert.equal(isRecentlyActive('2026-10-14T00:00:00Z', now), false);
  assert.equal(isRecentlyActive(null, now), false);
});

test('search finds names, descriptions, languages and topics without case sensitivity', () => {
  const projects = [repo('portfolio', { language: 'TypeScript', topics: ['nextjs'] }), repo('api', { description: 'Weather service' })];
  for (const query of [' PORTFOLIO ', 'typescript', 'NextJS']) assert.equal(searchProjects(projects, query)[0].name, 'portfolio');
  assert.equal(searchProjects(projects, 'weather')[0].name, 'api');
  assert.equal(searchProjects(projects, 'missing').length, 0);
});

test('demo links only allow HTTP and HTTPS', () => {
  assert.equal(safeHomepage('https://example.com'), 'https://example.com/');
  assert.equal(safeHomepage('javascript:alert(1)'), null);
  assert.equal(safeHomepage(''), null);
});
