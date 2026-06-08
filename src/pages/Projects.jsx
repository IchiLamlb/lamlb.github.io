import React, { useState } from 'react';
import { Code, ExternalLink } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  
  const projects = [
    {
      id: 1,
      title: "Vaani",
      year: "2025",
      status: "WIP",
      statusColor: "bg-yellow-500",
      description: "Literacy remains a significant barrier to digital access for over 300 million Indians. This project presents VAANI, an innovative voice-first digital assistant designed to democratize access to digital services regardless of literacy level...",
      shortDescription: "A Voice based Assistant for Illiterate users.",
      tags: ["Python", "Flask", "Sentence Transformers"],
      image: "/assets/project-1.png",
      link: "https://github.com/ankittroy-21/vaani",
      linkType: "Code"
    },
    {
      id: 2,
      title: "Spotigram",
      year: "2026",
      status: "Live",
      statusColor: "bg-emerald-500",
      description: "A high-speed, asynchronous Telegram bot that acts as a direct bridge between Spotify and Telegram. Features a custom concurrent web scraper, MongoDB rate limiting, and a sleek terminal-style UI.",
      shortDescription: "A high-speed, asynchronous Telegram bot that acts as a direct bridge between Spotify and Telegram.",
      tags: ["Python", "Pyrogram", "MongoDB", "BeautifulSoup"],
      image: "/assets/project-2.png",
      link: "https://github.com/ankittroy-21/Spotigram",
      linkType: "Code"
    },
    {
      id: 3,
      title: "BBD Papers",
      year: "2025",
      status: "Live",
      statusColor: "bg-emerald-500",
      description: "A full-stack educational platform providing BBD University students with easy access to previous year question papers (PYQs) and study notes.",
      shortDescription: "A full-stack educational platform providing BBD University students with easy access to PYQs and notes.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      image: "/assets/project-3.png",
      link: "https://bbdpapers.me",
      linkType: "Live"
    },
    {
      id: 4,
      title: "Support Triage Agent",
      year: "2025",
      status: "WIP",
      statusColor: "bg-yellow-500",
      description: "RAG-powered CLI agent that triages support tickets across HackerRank, Claude, and Visa using ChromaDB retrieval and Groq LLM.",
      shortDescription: "RAG-powered CLI agent that triages support tickets.",
      tags: ["Python", "RAG", "ChromaDB"],
      image: "/assets/project-4.png",
      link: "https://github.com/ankittroy-21/hackerrank-orchestrate-may26",
      linkType: "Code"
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 pt-4 animate-[slideUp_0.5s_ease-out_forwards]">
      <div className="animate-[slideUp_0.5s_ease-out_0.1s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-gold">Portfolio</p>
        <h1 className="gold-underline pb-2 text-4xl font-bold text-white">Selected Works</h1>
        <p className="mt-4 text-sm text-gray-500">4 projects · Tap to explore</p>
      </div>

      <div className="flex flex-wrap gap-2 animate-[slideUp_0.5s_ease-out_0.2s_forwards]" style={{ opacity: 0, transform: 'translateY(10px)' }}>
        <button className="rounded-xl border px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 border-gold bg-gold font-semibold text-dark">All (4)</button>
        <button className="rounded-xl border px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 border-dark-300 bg-dark-100 text-gray-400 hover:border-gold/50 hover:text-white">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Live</span>
        </button>
        <button className="rounded-xl border px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 border-dark-300 bg-dark-100 text-gray-400 hover:border-gold/50 hover:text-white">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>WIP</span>
        </button>
        <button className="rounded-xl border px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 border-dark-300 bg-dark-100 text-gray-400 hover:border-gold/50 hover:text-white">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>Archived</span>
        </button>
      </div>

      <div className="hidden md:block">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
          {projects.map((project, idx) => (
            <div key={project.id} className="group relative overflow-hidden rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 animate-[slideUp_0.5s_ease-out_0.3s_forwards]" style={{ minHeight: idx === 0 ? '380px' : '220px', gridColumn: idx === 0 ? 'span 2' : 'span 1', gridRow: idx === 0 ? 'span 2' : 'span 1', perspective: '1200px', opacity: 0, transform: 'translateY(24px)' }}>
              <div style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: idx === 0 ? '380px' : '220px' }} className="h-full w-full transition-transform duration-700 hover:[transform:rotateY(180deg)]">
                {/* Front Side */}
                <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0">
                  <div className="absolute inset-0">
                    <div className="relative block overflow-hidden h-full w-full">
                      <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full transition-opacity duration-500 opacity-30 object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
                  </div>
                  <div className="absolute left-0 right-0 top-0 h-0.5 origin-left bg-gold transition-transform duration-300 group-hover:scale-x-100 scale-x-0" style={{ transform: 'scaleX(0)' }}></div>
                  <div className="relative z-10 flex h-full flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono text-gray-600">{project.year}</span>
                      <div className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${project.statusColor}`}></div>
                        <span className="text-[10px] text-gray-500">{project.status}</span>
                      </div>
                    </div>
                    {idx === 0 && <div className="pointer-events-none absolute right-5 top-8 select-none text-[80px] font-bold leading-none text-white/[0.03]">01</div>}
                    <div className="mt-auto space-y-3">
                      <div className="space-y-2">
                        <h3 className={`font-bold text-white leading-tight ${idx === 0 ? 'text-2xl' : 'text-base'}`}>{project.title}</h3>
                        {idx === 0 && <p className="text-gray-400 leading-relaxed text-sm max-w-md">{project.shortDescription}</p>}
                      </div>
                      {idx === 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[10px] font-mono text-gold/80">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="min-h-10"></div>
                      <div className="absolute bottom-4 right-5 text-[9px] uppercase tracking-[0.18em] text-gray-500/80">tap to know more</div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} className="absolute inset-0 rounded-2xl border border-gold/30 bg-dark-200 p-5">
                  <div className="flex h-full flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono text-gold uppercase tracking-widest">About</span>
                      <span className="text-[10px] text-gray-500">Tap to flip back</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-white text-lg">{project.title}</h3>
                      <p className="leading-relaxed text-gray-400 text-sm">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                         <span key={tag} className="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[10px] font-mono text-gold/80">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-auto flex gap-2">
                       <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg border border-dark-300 bg-dark-200/90 px-3 py-1.5 text-xs text-gray-300 transition-colors duration-200 hover:border-gold/50 hover:text-gold z-50">
                         {project.linkType === 'Code' ? <Code size={12} /> : <ExternalLink size={12} />}{project.linkType}
                       </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile view omitted for brevity but standard layout is same */}
      <div className="md:hidden relative pt-4 flex flex-col gap-8">
        {/* Simplified mobile view matching HTML structure roughly */}
        {projects.map(project => (
           <div key={project.id} className="group relative overflow-hidden rounded-2xl border border-dark-300 bg-dark-100 p-5 min-h-[320px]">
             <h3 className="font-bold text-white text-xl">{project.title}</h3>
             <p className="text-gray-400 text-sm mt-2">{project.description}</p>
           </div>
        ))}
      </div>
    </div>
  );
}
