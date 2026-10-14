# ayushsanj.com

Personal portfolio of Ayush Sanj, a frontend engineer based in Patna, India.

The homepage introduces Ayush through a type led layout, then presents selected product contributions, work experience, and a direct contact link. The site also includes project, experience, about, writing, skills, contact, and résumé pages.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run build` creates a production build. `npm run lint` runs ESLint.

## GitHub projects

The homepage and Projects page load public repositories from `ayushsanjdev`, excluding forks, archived repositories, and disabled repositories. They sort by latest push and revalidate hourly on visits. “Recently active” means a push within the last 90 days. The homepage features RSVP, my-portfolio-2026, frontlane, and saathi-rides-lite in that fixed order, with GitHub metadata refreshed hourly. The Projects page offers the full collection, with search matching names, descriptions, languages, and topics; additional projects appear in batches of 12.

Public repositories work without credentials. Optionally set `GITHUB_TOKEN` in `.env.local` (or your hosting environment) for a higher GitHub API rate limit. The token is used only on the server. If GitHub is unavailable, the page displays a direct link to the repository list.

Run the project-data tests with `node --test tests/github-projects.test.mjs` (Node.js 22.18+).

The site uses native browser scrolling, with CSS smooth scrolling for in-page anchor links. Reduced-motion preferences disable scroll animation.

## License

Feel free to take inspiration, but do not copy the work wholesale and present it as your own.
