import React, { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ChevronDown } from 'lucide-react';

const githubTheme = {
  light: ['#1e1e1e', '#bf5af222', '#bf5af255', '#bf5af299', '#bf5af2'],
  dark: ['#1e1e1e', '#bf5af222', '#bf5af255', '#bf5af299', '#bf5af2'],
};

const EXPERIENCES = [
  {
    id: 'safegate',
    role: 'Backend Developer',
    company: 'SafeGate',
    period: '08/2025 – Present',
    shortDesc: 'Designed and optimized backend APIs, resolved system performance bottlenecks, and participated in Agile sprint planning.',
    bullets: [
      'Architected high-performance microservices and RESTful API endpoints, improving system request processing throughput by 25%.',
      'Engineered database query optimizations and implemented a Redis caching layer, reducing API response times by 40% and database CPU utilization by 35%.',
      'Containerized core services using Docker and automated deployment workflows, reducing environment setup times and cutting manual release errors.',
      'Collaborated actively in an Agile/Scrum team of 6 engineers, contributing to system design documentation and security code reviews.'
    ],
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'REST API', 'Agile/Scrum']
  },
  {
    id: 'viettel',
    role: 'Backend Intern',
    company: 'Viettel Network',
    period: '07/2024 - 10/2024',
    shortDesc: 'Built custom CMS solutions, integrated payment gateways, and automated backend data pipelines for small business clients.',
    bullets: [
      'Developed and automated data aggregation scripts for telecommunication log processing pipelines, handling millions of network logs per day.',
      'Analyzed database performance, optimized PostgreSQL indexing strategies, and improved network log retrieval speeds by 30%.',
      'Built custom dashboard API endpoints and content management interfaces to visualize live traffic metrics for internal monitoring.',
      'Learned and integrated secure API communication standards, working closely with senior engineers in an enterprise-scale infrastructure.'
    ],
    skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Elasticsearch', 'REST API', 'Data Pipeline']
  }
];

export default function About() {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 pt-4 animate-[slideUp_0.5s_ease-out_forwards]">
      <div className="animate-[slideUp_0.5s_ease-out_0.1s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Who I Am</p>
        <h1 className="text-4xl font-bold text-white gold-underline pb-2">About Me</h1>
      </div>

      <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 flex flex-col gap-4 animate-[slideUp_0.5s_ease-out_0.2s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        {/* The original site has an API that loads the about text, here is the skeleton from the initial render, but we can also put static text if we wanted. I'll stick to the exact HTML structure for now. */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-dark-200 via-dark-300 to-dark-200 bg-[length:200%_100%] rounded-lg animate-pulse" style={{ width: '100%', height: '1rem' }}></div>
          </div>
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-dark-200 via-dark-300 to-dark-200 bg-[length:200%_100%] rounded-lg animate-pulse" style={{ width: '100%', height: '1rem' }}></div>
          </div>
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-dark-200 via-dark-300 to-dark-200 bg-[length:200%_100%] rounded-lg animate-pulse" style={{ width: '80%', height: '1rem' }}></div>
          </div>
        </div>
      </div>

      <div className="animate-[slideUp_0.5s_ease-out_0.3s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">Work Experience</p>
        <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 relative animate-fade-in">
          <div className="flex flex-col">
            {EXPERIENCES.map((exp, idx) => {
              const isExpanded = expandedItems[exp.id];
              const isLast = idx === EXPERIENCES.length - 1;
              return (
                <div key={exp.id} className={`${isLast ? 'mb-0 pb-1' : 'mb-6 pb-6'} flex gap-4 items-start relative z-10`}>
                  <div className="w-6 flex justify-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-gold border border-dark-300 relative z-20"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm">{exp.role}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{exp.company}</p>
                    <p className="text-gold text-sm mt-1">{exp.period}</p>
                    <p className="text-gray-400 text-sm mt-2">{exp.shortDesc}</p>
                    
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="flex items-center gap-1 text-xs text-gold/80 hover:text-gold transition-all mt-3 font-mono font-semibold group cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} group-hover:translate-y-0.5`} />
                    </button>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateRows: isExpanded ? '1fr' : '0fr',
                        transition: 'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease, margin-top 300ms ease',
                        opacity: isExpanded ? 1 : 0,
                        marginTop: isExpanded ? '1rem' : '0px',
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-dark-300/40 pt-4 flex flex-col gap-4">
                          <div>
                            <p className="text-xs text-gold/70 font-mono tracking-wider uppercase mb-2">Key Accomplishments</p>
                            <ul className="list-none space-y-2 text-sm text-gray-400 pl-1">
                              {exp.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex gap-2 items-start leading-relaxed">
                                  <span className="text-gold mt-1.5 select-none text-[8px]">◆</span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-xs text-gold/70 font-mono tracking-wider uppercase mb-2">Technologies Used</p>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.skills.map((skill, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-200 border border-dark-300 text-gray-300 hover:border-gold/30 hover:text-white transition-colors cursor-default"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute left-9 top-6 bottom-6 w-px bg-dark-300/60 pointer-events-none z-0"></div>
        </div>
      </div>

      <div className="animate-[slideUp_0.5s_ease-out_0.4s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">Education</p>
        <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 relative">
          <div className="flex flex-col">
            <div className="mb-6 pb-6 flex gap-4 items-start">
              <div className="w-6 flex justify-center">
                <div className="w-3 h-3 rounded-full bg-gold border border-dark-300 relative z-20"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Hanoi University of Science and Technology (HUST)</h3>
                <p className="text-gold text-sm mt-1">2021 – 2026</p>
                <p className="text-gray-400 text-sm mt-2">I graduated with an Excellent Degree in Computer Science & Engineering from this institution.</p>
              </div>
            </div>
            <div className="mb-0 pb-1 flex gap-4 items-start">
              <div className="w-6 flex justify-center">
                <div className="w-3 h-3 rounded-full bg-gold border border-dark-300 relative z-20"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Tran Phu High school for the gifted (Hai Phong)</h3>
                <p className="text-gold text-sm mt-1">2018 – 2021</p>
                <p className="text-gray-400 text-sm mt-2">I was a Computer Science specialist student at Tran Phu Gifted High School.</p>
              </div>
            </div>
          </div>
          <div className="absolute left-9 top-6 bottom-6 w-px bg-dark-300/60 pointer-events-none z-0"></div>
        </div>
      </div>

      <div className="animate-[slideUp_0.5s_ease-out_0.5s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">By The Numbers</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-bold text-gold">10+</span>
            <span className="text-xs text-gray-500 text-center">Projects Built</span>
          </div>
          <div className="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-bold text-gold">20+</span>
            <span className="text-xs text-gray-500 text-center">GitHub Repos</span>
          </div>
          <div className="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-bold text-gold">5+</span>
            <span className="text-xs text-gray-500 text-center">Certifications</span>
          </div>
          <div className="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-bold text-gold">15+</span>
            <span className="text-xs text-gray-500 text-center">Technologies</span>
          </div>
        </div>
      </div>

      <div className="animate-[slideUp_0.5s_ease-out_0.6s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">GitHub Contributions</p>
        <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 overflow-x-auto">
          <div className="p-4 rounded-xl bg-dark-100">
            <div className="overflow-x-auto">
              <div className="rounded-xl border border-dark-300 bg-dark-200/70 p-6 flex justify-center overflow-x-auto w-full">
                <GitHubCalendar
                  username="IchiLamlb"
                  theme={githubTheme}
                  colorScheme="dark"
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
