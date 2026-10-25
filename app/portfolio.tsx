import { useEffect, useRef, useState, type ReactNode } from "react";
import { PortfolioMap } from "./portfolio-map";
import { experience, links, projects, skills, type ProjectVisual, type ProjectMedia } from "./data";

const navigation = [["projects", "Work"], ["experience", "Experience"], ["about", "About"], ["contact", "Contact"]];
const filters = ["All work", "Software", "Applied AI"] as const;

function Arrow({ down = false }: { down?: boolean }) {
  return <svg className={down ? "arrow down" : "arrow"} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a data-analytics={href.includes("linkedin.com") ? "link-linkedin" : `link-github-${href.split("/").filter(Boolean).pop()}`} className={className} href={href} target="_blank" rel="noreferrer">{children}<Arrow /><span className="sr-only"> (opens in a new tab)</span></a>;
}

function ProjectArtwork({ kind }: { kind: ProjectVisual }) {
  if (kind === "network") return <div className="artwork network-art" aria-hidden="true">
    <div className="artwork-label"><span className="tiny-dot" /> MODEL → APPLICATION <span>01 / ML</span></div>
    <svg viewBox="0 0 560 250" className="network-drawing" fill="none">
      <g stroke="currentColor" opacity=".28"><path d="m60 64 130 60L60 194m0-70 130 0 94-75m-94 75 94 0m-94 0 94 75m0-150 92 75m-92 0h92m-92 75 92-75h105" /></g>
      <g fill="var(--diagram-node)" stroke="currentColor"><circle cx="60" cy="64" r="11"/><circle cx="60" cy="124" r="11"/><circle cx="60" cy="194" r="11"/><circle cx="190" cy="124" r="22"/><circle cx="284" cy="49" r="13"/><circle cx="284" cy="124" r="13"/><circle cx="284" cy="199" r="13"/><circle cx="376" cy="124" r="24"/></g>
      <circle className="signal-pulse" cx="376" cy="124" r="34" stroke="currentColor" opacity=".25"/>
      <rect x="451" y="89" width="75" height="70" rx="12" fill="var(--diagram-node)" stroke="currentColor"/>
      <path d="M469 140v-15m12 15v-30m12 30v-22m12 22V99" stroke="currentColor" strokeWidth="4"/>
    </svg>
    <div className="pipeline-labels"><span>Traffic features</span><span>Random Forest</span><span>Prediction</span></div>
    <div className="artwork-bottom"><span>TRAIN → SERVE → EXPLAIN</span><span>System overview</span></div>
  </div>;
  if (kind === "fitness") return <div className="artwork fitness-art" aria-hidden="true"><div className="artwork-label">GYMTRACKER<span>02 / SOFTWARE</span></div><div className="workout-illustration"><span className="mini-label">THE WORKOUT CYCLE</span><div className="workout-line"><span>01</span><b>Plan the session</b><i>↗</i></div><div className="workout-line"><span>02</span><b>Log the work</b><i>↗</i></div><div className="workout-line"><span>03</span><b>See the progress</b><i>↗</i></div></div><div className="artwork-bottom"><span>PLAN / TRAIN / TRACK</span><span>Workflow overview</span></div></div>;
  if (kind === "finance") return <div className="artwork finance-art" aria-hidden="true"><div className="artwork-label">PERSONAL FINANCE<span>03 / SOFTWARE</span></div><div className="finance-illustration"><div className="chart-key"><span><i/>Income</span><span><i/>Expenses</span></div><div className="chart-bars">{[38,65,48,78,60,88,72].map((height,i) => <div key={height}><i style={{height: height+"%"}}/><i style={{height:(height * .6 + i * 2)+"%"}}/></div>)}</div></div><div className="artwork-bottom"><span>TRANSACTIONS → PERSPECTIVE</span><span>Illustrative data</span></div></div>;
  if (kind === "vision") return <div className="artwork vision-art" aria-hidden="true"><div className="artwork-label">SENSOR HUB<span>04 / VISION</span></div><svg className="vision-drawing" viewBox="0 0 500 210" fill="none"><path d="M128 55V25h35m174 0h35v30m0 100v30h-35m-174 0h-35v-30" stroke="currentColor" opacity=".5"/><path d="m207 162-29-50q-9-20 4-20l26 29-12-73q-2-15 9-14l20 77-1-90q0-15 11-13l12 100 10-77q2-15 12-10l-1 92 17-59q4-13 14-6l-12 102-27 33z" stroke="currentColor" opacity=".55"/><g stroke="currentColor" strokeWidth="1.5"><path d="m231 171-23-50-26-24m49 74-12-74-13-54m25 128 12-70-8-82m-4 152 32-66 4-72m-36 138 51-61 11-45m-85 56 11-24 24 4 20 4 19 5"/></g><g fill="currentColor">{[[231,171],[208,121],[182,97],[219,97],[206,43],[243,101],[235,19],[263,105],[267,33],[282,110],[293,65]].map(([cx,cy])=><circle key={cx} cx={cx} cy={cy} r="4"/>)}</g></svg><div className="artwork-bottom"><span>CAMERA → LANDMARKS → GESTURE</span><span>Tracking illustration</span></div></div>;
  return <div className="artwork settle-art" aria-hidden="true"><div className="artwork-label">SPLIT SETTLE<span>05 / SOFTWARE</span></div><div className="settle-illustration"><span className="person-node">A</span><span className="person-node">B</span><span className="person-node">C</span><svg viewBox="0 0 360 140" fill="none"><path d="M55 8v55h250V8M180 8v116" stroke="currentColor" opacity=".4"/><circle cx="180" cy="63" r="5" fill="currentColor"/></svg><strong>One shared balance.</strong></div><div className="artwork-bottom"><span>SHARE / CALCULATE / SETTLE</span><span>Workflow overview</span></div></div>;
}

function ProjectMediaPreview({ media, name }: { media: ProjectMedia; name: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const isVideo = selected === media.images.length;

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function show() {
    setSelected(0);
    setOpen(true);
    dialog.current?.showModal();
  }

  return <>
    <button data-analytics={`preview-${name}`} ref={trigger} className="project-preview" onClick={show} aria-label={`View ${name} screenshots and demo`} aria-haspopup="dialog">
      <span className="project-preview-image"><img src={media.images[0].src} alt={media.images[0].caption} loading="lazy" decoding="async" width="1280" height="720" /></span>
      <span className="project-preview-footer"><span>{media.label}</span><strong>View demo <span aria-hidden="true">↗</span></strong></span>
    </button>
    <dialog ref={dialog} className="project-gallery" aria-label={`${name} media gallery`} onClose={() => { setOpen(false); trigger.current?.focus(); }}>
      {open && <div className="gallery-content">
        <div className="gallery-heading"><div><p className="eyebrow">PROJECT PREVIEW</p><h2>{name}</h2></div><button className="gallery-close" onClick={() => dialog.current?.close()} aria-label="Close project preview">Close <span aria-hidden="true">×</span></button></div>
        <p className="gallery-disclosure">{media.disclosure}</p>
        <figure className="gallery-figure">
          {isVideo ? <video key={media.video} controls playsInline preload="none" poster={media.images[0].src} aria-label={`${name} recorded demo`}>
            <source src={media.video} type="video/mp4" />
            <track kind="captions" src="/projects/silent.vtt" srcLang="en" label="Silent preview" />
            Your browser does not support embedded video. <a href={media.video}>Download the demo</a>.
          </video> : <img src={media.images[selected].src} alt={media.images[selected].caption} width="1280" height="720" />}
          <figcaption aria-live="polite">{isVideo ? media.videoCaption : `${selected + 1} / ${media.images.length} — ${media.images[selected].caption}`}</figcaption>
        </figure>
        <div className="gallery-controls" role="group" aria-label="Choose a preview">
          {media.images.map((item, index) => <button data-analytics={`screenshot-${name}-${index + 1}`} key={item.src} aria-pressed={selected === index} onClick={() => setSelected(index)}>{index + 1}. {item.caption}</button>)}
          <button data-analytics={`video-select-${name}`} aria-pressed={isVideo} onClick={() => setSelected(media.images.length)}>Watch video</button>
        </div>
      </div>}
    </dialog>
  </>;
}


export function Portfolio() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  const menuButton = useRef<HTMLButtonElement>(null);
  const visibleProjects = projects.filter(project => filter === "All work" || project.category === filter);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try { localStorage.setItem("antonio-theme", dark ? "dark" : "light"); } catch { /* Themes also work when storage is unavailable. */ }
  }, [dark]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu) { setMenu(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menu]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="wordmark" href="#top" aria-label="Antonio Puceski, home">antonio<span>.</span><span className="wordmark-surname">puceski</span></a>
        <nav id="navigation" className={menu ? "navigation is-open" : "navigation"} aria-label="Main navigation">
          {navigation.map(([id, label]) => <a data-analytics={`nav-${id}`} key={id} href={"#"+id} onClick={() => setMenu(false)}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="theme-button" onClick={() => setDark(!dark)} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>
            {dark ? <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></svg> : <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20 15.7A8.6 8.6 0 0 1 8.3 4a8.6 8.6 0 1 0 11.7 11.7Z"/></svg>}
          </button>
          <a data-analytics="contact-header-email" href={links.email} className="header-contact">Let’s talk <Arrow /></a>
          <button ref={menuButton} className="menu-button" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? "Close" : "Menu"}<span aria-hidden="true">{menu ? "−" : "+"}</span></button>
        </div>
      </div>
    </header>

    <main id="main">
      <section className="hero wrap" id="top" aria-labelledby="hero-heading">
        <div className="hero-topline"><p className="eyebrow">SOFTWARE ENGINEER / APPLIED AI</p><span className="availability"><span/>Open to opportunities</span></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 id="hero-heading">Thoughtful<br/>software.<br/><em>Practical AI.</em></h1>
            <p className="hero-intro">I’m Antonio. I build understandable systems<br className="desktop-break"/> and put machine learning to work.</p>
            <p className="hero-support">Software engineering graduate with experience in .NET applications, integrations, and quality assurance. Exploring what thoughtful engineering and applied AI can do together.</p>
            <div className="hero-actions"><a data-analytics="hero-play-portfolio" className="button button-primary" href="#explore">Play the portfolio <Arrow down/></a><a data-analytics="hero-browse-work" className="text-link" href="#projects">Browse my work <Arrow/></a></div>
          </div>
          <div className="hero-aside"><PortfolioMap/><div className="hero-profile"><img src="/antonio-puceski-portrait.png" alt="Antonio Puceski" width="56" height="56"/><div><strong>Antonio Puceski</strong><span>Software Engineer / Skopje, MK</span></div></div></div>
        </div>
        <div className="hero-bottom"><p>Built on fundamentals.<br/><strong>Driven by curiosity.</strong></p><div className="hero-technologies" aria-label="Core technologies"><span>C# / .NET</span><span>Python</span><span>TypeScript</span><span>Java</span><span>SQL</span></div><a href="#projects" className="scroll-link" aria-label="Scroll to selected work"><Arrow down/></a></div>
      </section>

      <section className="section work-section" id="projects" aria-labelledby="work-heading">
        <div className="wrap">
          <div className="section-topline"><p className="eyebrow">01 / SELECTED WORK</p><span className="section-aside">IDEAS, BUILT INTO SOFTWARE</span></div>
          <div className="section-heading"><h2 id="work-heading">A few things<br/>I’ve <em>put together.</em></h2><p>From reliable application backends to models that make predictions. Each project is a different way to connect the pieces.</p></div>
          <div className="project-toolbar"><div className="project-filters" role="group" aria-label="Filter projects">{filters.map(value=><button data-analytics={`filter-${value}`} key={value} aria-pressed={filter===value} onClick={()=>setFilter(value)}>{value}<span>{value==="All work" ? projects.length : projects.filter(p=>p.category===value).length}</span></button>)}</div><span className="project-count" role="status">{visibleProjects.length} projects</span></div>
          <div className="project-grid">
            {visibleProjects.map(project=><article key={project.id} className={"project-card "+((project.id==="01" || project.id==="06") ? "featured" : "")}>
              {project.media ? <ProjectMediaPreview media={project.media} name={project.name}/> : <ProjectArtwork kind={project.visual}/>}
              <div className="project-body"><p className="project-category">{project.type}</p><h3>{project.name}</h3><p className="project-purpose">{project.purpose}</p><p className="project-description">{project.description}</p><ul className="tags" aria-label="Technologies">{project.stack.map(tag=><li key={tag}>{tag}</li>)}</ul><div className="project-actions"><ExternalLink href={project.github}>Explore the code</ExternalLink><span className="project-number">/{project.id}</span></div><details className="project-notes"><summary data-analytics={`notes-${project.name}`}>Engineering notes<span aria-hidden="true">+</span></summary><dl>{project.notes.map(note=><div key={note.label}><dt>{note.label}</dt><dd>{note.text}</dd></div>)}</dl></details></div>
            </article>)}
          </div>
          <div className="work-footer"><span>More experiments, smaller builds, and work in progress.</span><ExternalLink href={links.github}>Find me on GitHub</ExternalLink></div>
        </div>
      </section>

      <section className="section experience-section" id="experience" aria-labelledby="experience-heading">
        <div className="wrap"><div className="section-topline"><p className="eyebrow">02 / EXPERIENCE</p><span className="section-aside">BUILDING. TESTING. LEARNING.</span></div>
          <div className="section-heading"><h2 id="experience-heading">The work behind<br/><em>the work.</em></h2><p>Experience on both sides of delivery: building features and integrations, then checking that software behaves as it should.</p></div>
          <div className="experience-list">{experience.map((item,i)=><article className="experience-item" key={item.company}><div className="experience-meta"><span className="experience-number">0{i+1}</span><p>{item.period}</p><span>{i===0 ? "Internship" : "Full-time"}</span></div><div className="experience-content"><div className="role-heading"><h3>{item.role}</h3><span>{item.company}</span></div><p>{item.summary}</p><ul>{item.points.map(point=><li key={point}>{point}</li>)}</ul><p className="experience-stack">{item.stack}</p></div></article>)}</div>
          <div className="international-note"><span className="mini-label">BEYOND THE DESK / 2023–2024</span><p>Seasonal work programs in the <strong>USA and Germany</strong> taught me to adapt quickly, communicate clearly, and work with people from different backgrounds.</p></div>
        </div>
      </section>

      <section className="section about-section" id="about" aria-labelledby="about-heading">
        <div className="wrap about-grid"><div className="about-intro"><p className="eyebrow">03 / A LITTLE ABOUT ME</p><h2 id="about-heading">Curious by nature.<br/><em>Engineer by choice.</em></h2><div className="about-monogram" aria-hidden="true">ap<span>✳</span></div><p className="location-note"><span className="tiny-dot"/>Based in Skopje, North Macedonia</p></div><div className="about-copy"><p className="large-copy">I like understanding how things work—and making them work a little better.</p><p>That curiosity takes me from APIs and database transactions to machine-learning pipelines and camera-based interfaces. I care about the connections: how data moves, how systems fail, and how people actually use what we build.</p><p>My QA background shapes the way I develop software. I think about edge cases, reproducible behavior, and the next person who will need to understand the code.</p><div className="education-block"><span className="mini-label">EDUCATION / OCT 2021 — SEP 2026</span><h3>BSc in Computer Science</h3><p>Faculty of Computer Science and Engineering (FINKI)<br/>Ss. Cyril and Methodius University in Skopje</p></div><div className="personal-details"><div><span className="mini-label">AWAY FROM THE EDITOR</span><p>Chess, football, hiking, and computer hardware.</p></div><div><span className="mini-label">LANGUAGES</span><p>Macedonian · Native<br/>English · Professional<br/>German · Basic</p></div></div></div></div>
      </section>

      <section className="section skills-section" id="skills" aria-labelledby="skills-heading"><div className="wrap"><div className="section-topline"><p className="eyebrow">04 / TOOLKIT</p><span className="section-aside">THE RIGHT TOOL FOR THE PROBLEM</span></div><h2 id="skills-heading">Different tools.<br/><em>One engineering mindset.</em></h2><div className="skills-grid">{skills.map((skill,i)=><article key={skill.category}><span className="skill-number">0{i+1} /</span><h3>{skill.category}</h3><p>{skill.description}</p><ul>{skill.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div></div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="wrap"><div className="contact-top"><p className="eyebrow">05 / WHAT’S NEXT?</p><span className="availability"><span/>Open to opportunities</span></div><h2 id="contact-heading">Good software starts<br/>with a <em>conversation.</em><span className="contact-star" aria-hidden="true">✳</span></h2><div className="contact-bottom"><p>Have a software engineering role, an applied AI project,<br className="desktop-break"/> or an interesting problem in mind? I’d love to hear about it.</p><a data-analytics="contact-email" className="contact-email" href={links.email}>puceskia@gmail.com <Arrow/></a></div><div className="contact-links"><div><ExternalLink href={links.linkedin}>LinkedIn</ExternalLink><ExternalLink href={links.github}>GitHub</ExternalLink><a data-analytics="request-cv" href={links.email+"?subject=CV%20request"}>Request my CV <Arrow/></a></div><span>Skopje, North Macedonia · Open to collaboration</span></div></div></section>
    </main>
    <footer className="site-footer"><div className="wrap"><a className="wordmark" href="#top">antonio<span>.</span>puceski</a><span>© {new Date().getFullYear()} Antonio Puceski</span><a href="/privacy.html">Privacy & analytics</a><a href="#top">Back to top <span aria-hidden="true">↑</span></a></div></footer>
  </>;
}

