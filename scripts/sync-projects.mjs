#!/usr/bin/env node
/**
 * Regenerate `src/lib/projects.generated.ts` from GitHub.
 *
 * The site is a static export, so it cannot ask GitHub at runtime. Instead this
 * script asks once and commits the answer; the build reads the snapshot. That
 * keeps `next build` deterministic and offline, and keeps the project list
 * honest — the source of truth is the account, not a hand-kept array.
 *
 *   npm run sync:projects
 *
 * Set GITHUB_TOKEN to lift the 60-requests/hour anonymous limit (CI does it for
 * you from the workflow's own token). Without one this still works, it just
 * spends the anonymous quota.
 */

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const USER = "x0r909";

/** Repositories that are not portfolio work, or that would be circular. */
const EXCLUDE = new Set([
  USER, // the profile README repo
  "Portofolio", // this site
  "test-environtment-setup", // course scratch space
]);

const OUTPUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/lib/projects.generated.ts"
);

async function fetchRepos() {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const repos = [];
  for (let page = 1; ; page += 1) {
    const url =
      `https://api.github.com/users/${USER}/repos` +
      `?per_page=100&sort=pushed&direction=desc&page=${page}`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
      const hint =
        response.status === 403
          ? " (rate limited — set GITHUB_TOKEN)"
          : "";
      throw new Error(`GitHub API ${response.status}${hint}`);
    }

    const batch = await response.json();
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

function toProject(repo) {
  return {
    name: repo.name,
    description: repo.description?.trim() || null,
    language: repo.language,
    topics: repo.topics ?? [],
    url: repo.html_url,
    homepage: repo.homepage?.trim() || null,
    pushedAt: repo.pushed_at,
    archived: Boolean(repo.archived),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  };
}

const repos = (await fetchRepos())
  .filter((repo) => !repo.fork && !EXCLUDE.has(repo.name))
  .map(toProject)
  .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));

const body = `/**
 * GENERATED — do not edit by hand.
 *
 * \`npm run sync:projects\` rewrites this from the GitHub API. The site is a
 * static export, so the build reads this snapshot rather than calling GitHub.
 *
 * Fields are GitHub's own facts: name, description, primary language, topics,
 * URL, last push, archive flag. Nothing here is editorial.
 */

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  topics: readonly string[];
  url: string;
  homepage: string | null;
  pushedAt: string;
  archived: boolean;
  stars: number;
  forks: number;
};

export const REPOS: readonly Repo[] = ${JSON.stringify(repos, null, 2)};
`;

await writeFile(OUTPUT, body, "utf8");
console.log(`wrote ${repos.length} repos to ${OUTPUT}`);