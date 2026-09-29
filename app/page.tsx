import Image from "next/image";
import Link from "next/link";

const contributions = [
  {
    number: "01",
    name: "Evaltech",
    category: "Product interface",
    detail: "Dynamic form system and API integration",
    url: "https://evaltech.ai",
    domain: "evaltech.ai",
  },
  {
    number: "02",
    name: "RSVP",
    category: "Interaction detail",
    detail: "API driven location autocomplete",
    url: "https://rsvp.kim",
    domain: "rsvp.kim",
  },
];

const experience = [
  { company: "Kraftbase", role: "Software Engineer", period: "2025 — 2026" },
  { company: "Mera Farmhouse", role: "Frontend Developer", period: "2024 — 2025" },
  { company: "Team Geek Solutions", role: "Software Developer", period: "2021 — 2024" },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-top">
          <p>Frontend engineer <span aria-hidden="true">/</span> Patna, India</p>
          <p>Portfolio <span aria-hidden="true">/</span> 2026</p>
        </div>

        <h1 className="home-name" id="home-title">
          <span>Ayush</span>
          <span>Sanj<span className="name-period">.</span></span>
        </h1>

        <div className="home-hero-bottom">
          <p className="home-thesis">I build the part<br />you use.</p>
          <div className="home-intro">
            <p>
              React, TypeScript, and React Native. I work on product interfaces,
              the interactions inside them, and the details that make them feel right.
            </p>
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
            <h2 id="work-title">Selected contributions<span className="index-period">.</span></h2>
            <p>A form system and a location search, built for live products.</p>
          </div>

          <div className="work-list">
            {contributions.map((project) => (
              <article className="work-row" key={project.number}>
                <span className="work-number">{project.number}</span>
                <div className="work-primary">
                  <span className="work-category">{project.category}</span>
                  <h3>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.name}<span aria-hidden="true">↗</span>
                    </a>
                  </h3>
                </div>
                <div className="work-secondary">
                  <p>{project.detail}</p>
                  <span>{project.domain}</span>
                </div>
              </article>
            ))}
          </div>

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
    </div>
  );
}
