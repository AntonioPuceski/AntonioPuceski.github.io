"use client";

import { useEffect, useState } from "react";
import { experience, links, projects, skills } from "./data";

const nav = ["About", "Experience", "Projects", "Skills", "Contact"];

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true"> ↗</span></a>;
}

export function Portfolio() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("antonio-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Theme preference is necessarily read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(saved ? saved === "dark" : preferred);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("antonio-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Antonio Puceski, home"><span>AP</span><strong>Antonio Puceski</strong></a>
        <button className="menu-button" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? "Close" : "Menu"}</button>
        <nav id="navigation" className={menu ? "nav open" : "nav"} aria-label="Main navigation">
          {nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}</a>)}
          <button className="theme-button" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}><span aria-hidden="true">{dark ? "☀" : "◐"}</span></button>
          <a className="nav-cv" href={links.email + "?subject=CV%20request"}>Request CV</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid wrap">
            <div className="hero-copy reveal">
              <p className="eyebrow"><span></span> Software Engineer · Skopje, North Macedonia</p>
              <h1>Engineering software<br />that works <em>clearly.</em></h1>
              <p className="hero-lead">I’m Antonio Puceski, a software engineer building reliable full-stack applications, backend systems, and software integrations.</p>
              <p className="hero-support">I work across REST APIs, relational databases, modern frontend applications, background services, software integrations, and practical AI.</p>
              <div className="hero-actions">
                <a className="button primary" href="#projects">View my work <span aria-hidden="true">↓</span></a>
                <a className="button secondary" href={links.email + "?subject=CV%20request"}>Request CV</a>
              </div>
              <div className="social-links"><ExternalLink href={links.github}>GitHub</ExternalLink><ExternalLink href={links.linkedin}>LinkedIn</ExternalLink></div>
            </div>
            <div className="portrait-wrap reveal" aria-label="Portrait of Antonio Puceski">
              <div className="portrait-halo"></div>
              <img src="/antonio-puceski-portrait.png" alt="Antonio Puceski, software engineer" width="900" height="1125" fetchPriority="high" />
              <div className="portrait-card"><span className="status-dot"></span><div><small>Current focus</small><strong>Full-stack & backend engineering</strong></div></div>
            </div>
          </div>
          <div className="hero-tech wrap" aria-label="Core technologies"><span>C# / .NET</span><span>Java / Spring</span><span>TypeScript</span><span>React · Angular · Vue</span><span>PostgreSQL</span></div>
        </section>

        <section className="section about" id="about">
          <div className="wrap two-col">
            <div><p className="section-kicker">01 / About</p><h2>A practical engineer with a product mindset.</h2></div>
            <div className="about-copy">
              <p className="large">I contribute to maintainable full-stack applications and software integration systems across backend APIs, data layers, and modern frontend frameworks.</p>
              <p>My professional experience spans C# and ASP.NET Core services, Angular and Vue.js applications, PostgreSQL and SQL Server, background processing, external integrations, reporting, and software quality assurance.</p>
              <p>I focus on reliable data handling, clear validation, useful documentation, and close collaboration with developers and stakeholders. Alongside .NET and Java systems, I build practical AI and computer-vision projects with Python.</p>
              <div className="principles"><span>Reliable by design</span><span>Clear to maintain</span><span>Built for real needs</span></div>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="wrap">
            <p className="section-kicker">02 / Experience</p><div className="section-heading"><h2>Experience that bridges building and quality.</h2><p>Software delivery, integrations, and careful verification—grounded in real teams and requirements.</p></div>
            <div className="timeline">
              {experience.map((item, i) => <article className="timeline-item" key={item.role}>
                <div className="timeline-marker"><span>{String(i + 1).padStart(2, "0")}</span></div>
                <p className="period">{item.period}</p>
                <div className="timeline-content"><p className="company">{item.company}</p><h3>{item.role}</h3><p>{item.summary}</p>{item.points.length > 0 && <ul>{item.points.map(p => <li key={p}>{p}</li>)}</ul>}</div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="wrap"><p className="section-kicker">03 / Selected work</p><div className="section-heading"><h2>Projects built around useful problems.</h2><p>Verified from the public source and documentation—no inflated metrics or invented features.</p></div>
            <div className="projects-list">
              {projects.map(project => <article className="project" key={project.name}>
                <div className={`project-visual ${project.accent}`} aria-hidden="true"><span className="visual-index">{project.index}</span><div className="visual-lines"><i></i><i></i><i></i></div><b>{project.type}</b></div>
                <div className="project-copy"><div className="project-top"><span>{project.index}</span><span>{project.type}</span></div><h3>{project.name}</h3><p className="purpose">{project.purpose}</p><p>{project.description}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links"><ExternalLink href={project.github}>View repository</ExternalLink>{project.live && <ExternalLink href={project.live}>Live application</ExternalLink>}</div></div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills"><div className="wrap"><p className="section-kicker">04 / Capabilities</p><div className="section-heading"><h2>Tools selected for the problem.</h2><p>A verified working stack across services, interfaces, data, and delivery.</p></div><div className="skills-grid">{skills.map((group, i) => <article className="skill-card" key={group.category}><span>0{i + 1}</span><h3>{group.category}</h3><div>{group.items.map(item => <b key={item}>{item}</b>)}</div></article>)}</div></div></section>

        <section className="section education"><div className="wrap education-grid"><div><p className="section-kicker">05 / Education</p><h2>Computer Science,<br />built on strong foundations.</h2></div><article><span className="education-year">2021 — 2026</span><h3>BSc in Computer Science</h3><p>Faculty of Computer Science and Engineering (FINKI)<br />Ss. Cyril and Methodius University in Skopje</p><strong>Expected completion: September 2026</strong></article></div></section>

        <section className="contact" id="contact"><div className="wrap contact-inner"><p className="section-kicker">06 / Contact</p><h2>Let’s build something<br /><em>useful.</em></h2><p>I’m open to junior software engineering, full-stack, backend, .NET, and Java opportunities—as well as thoughtful collaboration on useful software.</p><a className="email-link" href={links.email}>puceskia@gmail.com <span aria-hidden="true">↗</span></a><div className="contact-meta"><span>Skopje, North Macedonia</span><ExternalLink href={links.github}>GitHub</ExternalLink><ExternalLink href={links.linkedin}>LinkedIn</ExternalLink></div></div></section>
      </main>
      <footer><div className="wrap"><span>Antonio Puceski</span><span>© {new Date().getFullYear()} · Software engineered with care.</span></div></footer>
    </>
  );
}
