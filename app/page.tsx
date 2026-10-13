import Image from "next/image";
import Link from "next/link";
import HomeMotion from "@/components/HomeMotion";
import { getGitHubProjects } from "@/lib/github";
import { isRecentlyActive, safeHomepage } from "@/lib/github-projects";

export const revalidate = 3600;

const experience = [
  { company: "Kraftbase", role: "Software Engineer", period: "2025 — 2026" },
  { company: "Mera Farmhouse", role: "Frontend Developer", period: "2024 — 2025" },
  { company: "Team Geek Solutions", role: "Software Developer", period: "2021 — 2024" },
];

export default async function Home() {
  const { projects, fetchedAt } = await getGitHubProjects();
  const selectedProjects = [
    {
      name: "RSVP",
      category: "Contributor",
      detail: "API-driven location autocomplete for a live product.",
      url: "https://rsvp.kim",
      demo: null,
      language: null,
      pushedAt: null,
      recentlyActive: false,
    },
    ...["my-portfolio-2026", "frontlanejobs", "saathi-rides-lite"].flatMap(name => {
      const project = projects?.find(project => project.name.toLowerCase() === name);
      return project ? [project] : [];
    }).map(project => ({
      name: project.name,
      category: "Personal project",
      detail: project.description,
      url: project.html_url,
      demo: safeHomepage(project.homepage),
      language: project.language,
      pushedAt: project.pushed_at,
      recentlyActive: isRecentlyActive(project.pushed_at, fetchedAt),
    })),
  ];
  return (
    <HomeMotion>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-top">
          <p>Software Engineer · Frontend <span aria-hidden="true">/</span> Patna, India</p>
          <p>Self-taught <span aria-hidden="true">/</span> Still curious</p>
        </div>

        <h1 className="home-name" id="home-title">
          <span className="name-line"><span className="name-line-text">Ayush</span></span>
          <span className="name-line"><span className="name-line-text">Sanj<span className="name-period">.</span></span></span>
        </h1>

        <div className="home-hero-bottom">
          <p className="home-thesis">I build the part<br />you use.</p>
          <div className="home-intro">
            <p>
              Software engineer with 4+ years of experience specializing in responsive
              web and mobile experiences with React, TypeScript, and React Native,
              while expanding into backend development.
            </p>
            <p className="home-personal">An arts degree. A lot of curiosity.<br />A career built in the browser.</p>
            <a href="#selected-work">Selected work <span aria-hidden="true">↘</span></a>
          </div>
          <div className="home-portrait" aria-hidden="true">
            <Image
              src="/headshot.png"
              alt=""
              width={1254}
              height={1254}
              priority
              sizes="(max-width: 440px) 112px, (max-width: 900px) 124px, (max-width: 1100px) 140px, 176px"
            />
          </div>
        </div>
      </section>

      <section className="work-index" id="selected-work" aria-labelledby="work-title">
        <div className="work-index-inner">
          <div className="work-index-heading">
            <p className="section-index">01 / Work</p>
            <h2 id="work-title">Selected projects<span className="index-period">.</span></h2>
            <p>My latest active builds and work on live products.</p>
          </div>

          <div className="work-list">
            {selectedProjects.map((project, index) => (
              <article className="work-row work-row--selected" key={project.url}>
                <span className="work-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="work-primary">
                  <span className="work-category">{project.category}</span>
                  <h3>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <span className="project-name-roll">
                        <span className="project-name-original">{project.name}</span>
                        <span className="project-name-copy" aria-hidden="true">{project.name}</span>
                      </span>
                      <span className="work-arrow" aria-hidden="true">↗</span>
                    </a>
                  </h3>
                  <div className="work-contribution">
                    <p>{project.detail}</p>
                    {project.language && <span>{project.language}</span>}
                  </div>
                </div>
                <div className="selected-project-aside">
                  {project.pushedAt && <p className="selected-project-activity">{project.recentlyActive && <>Recently active<br /></>}<time dateTime={project.pushedAt}>Last push {new Date(project.pushedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</time></p>}
                  <div className="selected-project-links">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name}${project.pushedAt ? ' on GitHub' : ''}`}>{project.pushedAt ? 'Code' : 'Visit site'} ↗</a>
                    {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} live demo`}>Live demo ↗</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {projects === null && <p className="selected-project-fallback">GitHub projects couldn’t be loaded right now. <a href="https://github.com/ayushsanjdev?tab=repositories" target="_blank" rel="noopener noreferrer">Browse them on GitHub ↗</a></p>}
          <Link className="work-more" href="/projects">All projects <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="home-experience" aria-labelledby="experience-title">
        <div className="home-experience-intro">
          <p className="section-index">02 / Experience</p>
          <h2 id="experience-title">Web, mobile,<br />and the space between.</h2>
          <Link href="/work">Full experience <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="experience-list">
          {experience.map((job) => (
            <div className="experience-row" key={job.company}>
              <div>
                <h3>{job.company}</h3>
                <p>{job.role}</p>
              </div>
              <time>{job.period}</time>
            </div>
          ))}
        </div>
      </section>

      <section className="home-contact" aria-labelledby="contact-title">
        <p className="section-index">03 / Next</p>
        <h2 id="contact-title">Let’s make the<br />interface feel right.</h2>
        <a href="mailto:ayushsanjpro@gmail.com">ayushsanjpro@gmail.com <span aria-hidden="true">↗</span></a>
      </section>
    </HomeMotion>
  );
}
