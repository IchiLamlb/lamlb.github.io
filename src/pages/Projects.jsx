import { useMemo, useState } from 'react';
import { Code, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Vaani',
    year: '2025',
    status: 'WIP',
    category: 'AI Assistant',
    description:
      'A voice-first digital assistant designed to make digital services usable for people with low literacy. The experience focuses on speech-led flows, intent detection, and simple task completion.',
    shortDescription: 'Voice-based assistant for low-literacy users.',
    tags: ['Python', 'Flask', 'Sentence Transformers'],
    image: '/assets/project-1.png',
    link: 'https://github.com/ankittroy-21/vaani',
    linkType: 'Code',
    role: 'Backend, NLP workflow',
    impact: 'Accessibility-first UX',
    featured: true,
  },
  {
    id: 2,
    title: 'Spotigram',
    year: '2026',
    status: 'Live',
    category: 'Automation',
    description:
      'A high-speed asynchronous Telegram bot that bridges Spotify and Telegram, with concurrent scraping, MongoDB-backed rate limiting, and a compact terminal-style interaction flow.',
    shortDescription: 'Spotify to Telegram bridge with async scraping.',
    tags: ['Python', 'Pyrogram', 'MongoDB', 'BeautifulSoup'],
    image: '/assets/project-2.png',
    link: 'https://github.com/ankittroy-21/Spotigram',
    linkType: 'Code',
    role: 'Bot architecture',
    impact: 'Fast media retrieval',
  },
  {
    id: 3,
    title: 'BBD Papers',
    year: '2025',
    status: 'Live',
    category: 'Education',
    description:
      'A full-stack educational platform that helps BBD University students find previous year question papers and study notes with less friction.',
    shortDescription: 'PYQ and notes platform for university students.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    image: '/assets/project-3.png',
    link: 'https://bbdpapers.me',
    linkType: 'Live',
    role: 'Full-stack product',
    impact: 'Student resource hub',
  },
  {
    id: 4,
    title: 'Support Triage Agent',
    year: '2025',
    status: 'WIP',
    category: 'RAG System',
    description:
      'A RAG-powered CLI agent that triages support tickets using ChromaDB retrieval and Groq LLM orchestration across multiple support domains.',
    shortDescription: 'RAG CLI agent for support ticket triage.',
    tags: ['Python', 'RAG', 'ChromaDB'],
    image: '/assets/project-4.png',
    link: 'https://github.com/ankittroy-21/hackerrank-orchestrate-may26',
    linkType: 'Code',
    role: 'Retrieval pipeline',
    impact: 'Faster ticket routing',
  },
];

const filters = ['All', 'Live', 'WIP'];

const statusMeta = {
  Live: {
    label: 'Live',
    tone: '#34d399',
    bg: 'rgba(52, 211, 153, 0.12)',
    border: 'rgba(52, 211, 153, 0.28)',
  },
  WIP: {
    label: 'In progress',
    tone: '#facc15',
    bg: 'rgba(250, 204, 21, 0.12)',
    border: 'rgba(250, 204, 21, 0.28)',
  },
};

function ProjectCard({ project, index }) {
  const meta = statusMeta[project.status] || statusMeta.WIP;
  const isFeatured = project.featured;
  const Icon = project.linkType === 'Code' ? Code : ExternalLink;

  return (
    <article
      className={`project-card ${isFeatured ? 'project-card--featured' : ''}`}
      style={{ animationDelay: `${0.12 + index * 0.08}s` }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card__media"
        aria-label={`Open ${project.title}`}
      >
        <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
        <span className="project-card__number">{String(index + 1).padStart(2, '0')}</span>
        <span className="project-card__open">
          <Icon size={14} />
          {project.linkType}
        </span>
      </a>

      <div className="project-card__body">
        <div className="project-card__topline">
          <span>{project.year}</span>
          <span
            className="project-status"
            style={{ '--status-color': meta.tone, '--status-bg': meta.bg, '--status-border': meta.border }}
          >
            {meta.label}
          </span>
        </div>

        <div className="project-card__heading">
          <p>{project.category}</p>
          <h2>{project.title}</h2>
        </div>

        <p className="project-card__summary">{isFeatured ? project.description : project.shortDescription}</p>

        <dl className="project-card__facts">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{project.impact}</dd>
          </div>
        </dl>

        <div className="project-card__tags" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === 'All' || project.status === filter),
    [filter],
  );

  const liveCount = projects.filter((project) => project.status === 'Live').length;
  const wipCount = projects.filter((project) => project.status === 'WIP').length;

  return (
    <div className="projects-page animate-[slideUp_0.5s_ease-out_forwards]">
      <section className="projects-hero" aria-labelledby="projects-title">
        <div className="projects-hero__copy">
          <p className="projects-kicker">Portfolio</p>
          <h1 id="projects-title">Selected Works</h1>
          <p>
            A focused set of products and engineering experiments across automation, AI workflows, and full-stack
            platforms.
          </p>
        </div>

        <div className="projects-hero__stats" aria-label="Project summary">
          <div>
            <strong>{projects.length}</strong>
            <span>Total projects</span>
          </div>
          <div>
            <strong>{liveCount}</strong>
            <span>Live builds</span>
          </div>
          <div>
            <strong>{wipCount}</strong>
            <span>In progress</span>
          </div>
        </div>
      </section>

      <div className="projects-toolbar" aria-label="Project filters">
        <div className="projects-toolbar__label">
          <span></span>
          Filter by status
        </div>
        <div className="projects-filters">
          {filters.map((item) => {
            const count = item === 'All' ? projects.length : projects.filter((project) => project.status === item).length;
            const active = filter === item;

            return (
              <button
                key={item}
                type="button"
                className={active ? 'is-active' : ''}
                onClick={() => setFilter(item)}
                aria-pressed={active}
              >
                <span>{item === 'WIP' ? 'In progress' : item}</span>
                <strong>{count}</strong>
              </button>
            );
          })}
        </div>
      </div>

      <section className="projects-grid" aria-live="polite">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </section>

      <style>{`
        .projects-page {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding-top: 1rem;
          color: #fff;
        }

        .projects-hero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
          gap: 1.25rem;
          align-items: stretch;
          margin-bottom: 1.25rem;
        }

        .projects-hero::before {
          content: '';
          position: absolute;
          inset: -48px -64px auto auto;
          width: 260px;
          height: 260px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(191, 90, 242, 0.18), transparent 64%);
          pointer-events: none;
          filter: blur(4px);
        }

        .projects-hero__copy,
        .projects-hero__stats,
        .projects-toolbar,
        .project-card {
          border: 1px solid rgba(58, 58, 58, 0.86);
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.012)),
            rgba(18, 18, 20, 0.88);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
          backdrop-filter: blur(16px);
        }

        .projects-hero__copy {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          padding: clamp(1.35rem, 3vw, 2.5rem);
        }

        .projects-hero__copy::after {
          content: '';
          position: absolute;
          right: 1.25rem;
          bottom: 1rem;
          width: 42%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(191, 90, 242, 0.8), transparent);
        }

        .projects-kicker,
        .projects-toolbar__label,
        .project-card__topline,
        .project-card__heading p,
        .project-card__facts dt,
        .project-card__tags span {
          font-family: 'JetBrains Mono', monospace;
        }

        .projects-kicker {
          margin-bottom: 0.65rem;
          color: #bf5af2;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .projects-hero h1 {
          max-width: 680px;
          font-size: clamp(2.4rem, 7vw, 5.6rem);
          line-height: 0.92;
          letter-spacing: -0.075em;
          font-weight: 800;
        }

        .projects-hero__copy p:last-child {
          max-width: 640px;
          margin-top: 1rem;
          color: #a3a3a3;
          font-size: clamp(0.95rem, 1.8vw, 1.08rem);
          line-height: 1.75;
        }

        .projects-hero__stats {
          border-radius: 28px;
          padding: 1rem;
          display: grid;
          gap: 0.8rem;
        }

        .projects-hero__stats div {
          position: relative;
          overflow: hidden;
          min-height: 102px;
          border-radius: 20px;
          border: 1px solid rgba(58, 58, 58, 0.68);
          background:
            radial-gradient(circle at top right, rgba(191, 90, 242, 0.16), transparent 45%),
            rgba(10, 10, 10, 0.35);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .projects-hero__stats strong {
          font-size: 2.15rem;
          line-height: 1;
          color: #fff;
        }

        .projects-hero__stats span {
          margin-top: 0.35rem;
          color: #8b8b8b;
          font-size: 0.78rem;
        }

        .projects-toolbar {
          position: sticky;
          top: 0.75rem;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
          border-radius: 22px;
          padding: 0.75rem;
        }

        .projects-toolbar__label {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding-left: 0.35rem;
          color: #858585;
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .projects-toolbar__label span {
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 999px;
          background: #bf5af2;
          box-shadow: 0 0 18px rgba(191, 90, 242, 0.8);
        }

        .projects-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .projects-filters button {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          min-height: 40px;
          border: 1px solid rgba(58, 58, 58, 0.9);
          border-radius: 999px;
          background: rgba(10, 10, 10, 0.3);
          color: #a3a3a3;
          padding: 0 0.55rem 0 0.9rem;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease;
        }

        .projects-filters button:hover,
        .projects-filters button:focus-visible {
          border-color: rgba(191, 90, 242, 0.55);
          color: #fff;
          outline: none;
          transform: translateY(-1px);
        }

        .projects-filters button.is-active {
          border-color: rgba(191, 90, 242, 0.9);
          background: linear-gradient(135deg, rgba(191, 90, 242, 0.28), rgba(191, 90, 242, 0.1));
          color: #fff;
        }

        .projects-filters button strong {
          min-width: 26px;
          height: 26px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          font-size: 0.75rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.1rem;
        }

        .project-card {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          min-height: 100%;
          display: grid;
          grid-template-rows: 230px 1fr;
          opacity: 0;
          transform: translateY(22px);
          animation: projectCardIn 560ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transition: border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease;
        }

        .project-card:hover,
        .project-card:focus-within {
          border-color: rgba(191, 90, 242, 0.46);
          transform: translateY(-4px);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.36), 0 0 42px rgba(191, 90, 242, 0.08);
        }

        .project-card--featured {
          grid-column: span 2;
          grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr);
          grid-template-rows: 1fr;
          min-height: 430px;
        }

        .project-card__media {
          position: relative;
          display: block;
          min-height: 230px;
          overflow: hidden;
          background: #0f0f10;
        }

        .project-card__media::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.58)),
            radial-gradient(circle at 20% 15%, rgba(191, 90, 242, 0.22), transparent 34%);
          transition: opacity 220ms ease;
        }

        .project-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.62;
          filter: saturate(0.92) contrast(1.05);
          transition: transform 650ms ease, opacity 220ms ease;
        }

        .project-card:hover .project-card__media img {
          transform: scale(1.055);
          opacity: 0.82;
        }

        .project-card__number {
          position: absolute;
          left: 1rem;
          top: 0.9rem;
          z-index: 2;
          color: rgba(255, 255, 255, 0.64);
          font-size: 0.74rem;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.18em;
        }

        .project-card__open {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          background: rgba(8, 8, 9, 0.72);
          color: #fff;
          padding: 0.55rem 0.75rem;
          font-size: 0.78rem;
          backdrop-filter: blur(10px);
        }

        .project-card__body {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .project-card--featured .project-card__body {
          padding: clamp(1.3rem, 3vw, 2rem);
        }

        .project-card__topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          color: #777;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .project-status {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid var(--status-border);
          border-radius: 999px;
          background: var(--status-bg);
          color: #e8e8e8;
          padding: 0.32rem 0.55rem;
          letter-spacing: 0;
          text-transform: none;
        }

        .project-status::before {
          content: '';
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 999px;
          background: var(--status-color);
          box-shadow: 0 0 14px var(--status-color);
        }

        .project-card__heading p {
          margin-bottom: 0.35rem;
          color: #bf5af2;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .project-card__heading h2 {
          color: #fff;
          font-size: clamp(1.35rem, 3vw, 2.3rem);
          line-height: 1.04;
          letter-spacing: -0.045em;
          font-weight: 800;
        }

        .project-card:not(.project-card--featured) .project-card__heading h2 {
          font-size: 1.45rem;
        }

        .project-card__summary {
          color: #b6b6b6;
          line-height: 1.68;
          font-size: 0.94rem;
        }

        .project-card__facts {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.65rem;
          margin: 0;
        }

        .project-card__facts div {
          border: 1px solid rgba(58, 58, 58, 0.68);
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.18);
          padding: 0.75rem;
        }

        .project-card__facts dt {
          color: #777;
          font-size: 0.62rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .project-card__facts dd {
          margin: 0.25rem 0 0;
          color: #f1f1f1;
          font-size: 0.82rem;
        }

        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-top: auto;
        }

        .project-card__tags span {
          border: 1px solid rgba(191, 90, 242, 0.2);
          border-radius: 999px;
          background: rgba(191, 90, 242, 0.08);
          color: rgba(255, 255, 255, 0.78);
          padding: 0.38rem 0.58rem;
          font-size: 0.68rem;
        }

        @keyframes projectCardIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .projects-hero,
          .project-card--featured {
            grid-template-columns: 1fr;
          }

          .project-card--featured {
            grid-column: span 1;
            min-height: 0;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .projects-toolbar {
            position: relative;
            top: auto;
            align-items: flex-start;
            flex-direction: column;
          }

          .projects-filters {
            justify-content: flex-start;
          }
        }

        @media (max-width: 560px) {
          .projects-page {
            padding-top: 0.25rem;
          }

          .projects-hero__copy,
          .projects-hero__stats,
          .project-card,
          .projects-toolbar {
            border-radius: 22px;
          }

          .projects-hero__stats {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            padding: 0.65rem;
          }

          .projects-hero__stats div {
            min-height: 86px;
            padding: 0.75rem;
          }

          .projects-hero__stats strong {
            font-size: 1.55rem;
          }

          .projects-hero__stats span {
            font-size: 0.68rem;
          }

          .projects-filters {
            width: 100%;
          }

          .projects-filters button {
            flex: 1 1 auto;
            justify-content: space-between;
          }

          .project-card {
            grid-template-rows: 210px 1fr;
          }

          .project-card__facts {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
