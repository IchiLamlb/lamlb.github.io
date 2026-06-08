import React, { useState } from 'react';
import { ChevronDown, Download, ChevronLeft, ChevronRight, Code, ExternalLink, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [showGeography, setShowGeography] = useState(false);
  const [visitorLoc, setVisitorLoc] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const handleOpenGeography = () => {
    setShowGeography(true);
    if (!visitorLoc) {
      setLoadingLoc(true);
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          setVisitorLoc(data);
          setLoadingLoc(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingLoc(false);
        });
    }
  };

  return (
    <div className="relative z-10 flex flex-col gap-16">
      {/* Mobile Avatar Card */}
      <div className="lg:hidden mb-6 mt-10">
        <div className="bg-dark-100 border border-dark-300 rounded-2xl overflow-hidden animate-[slideDown_0.5s_ease-out_forwards]">
          <div className="p-4 flex items-center gap-3 relative">
            <div className="w-14 h-14 rounded-xl bg-dark-200 border border-dark-300 overflow-hidden shrink-0">
              <div className="relative block overflow-hidden h-full w-full">
                <img src="/assets/avatar.jpg" alt="Le Bao Lam" className="absolute inset-0 h-full w-full transition-opacity duration-500 opacity-100 object-cover" />
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-white">Le Bao Lam</h2>
              <span className="text-xs text-gold bg-dark-200 border border-gold/50 px-2 py-0.5 rounded-full mt-0.5 inline-block" style={{ textShadow: '0 0 8px rgba(245, 166, 35, 0.6)' }}>
                Software Developer
              </span>
            </div>
            <button className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-dark-200 border border-dark-300 flex items-center justify-center text-gold">
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col justify-center min-h-[40vh] gap-7 pt-4">
        <p className="text-gold font-mono text-sm tracking-[0.2em] uppercase animate-[slideUp_0.5s_ease-out_0.1s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          Hello! I'm
        </p>
        <div className="animate-[slideUp_0.5s_ease-out_0.2s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">Le Bao Lam</h1>
          <h2 className="text-xl lg:text-2xl text-gray-400 mt-2 font-light">
            A passionate <span className="text-gold font-medium">Software</span> &amp; <span className="text-gold font-medium">Backend</span> Developer
          </h2>
        </div>
        <p className="text-gray-400 text-base lg:text-lg max-w-xl leading-relaxed animate-[slideUp_0.5s_ease-out_0.3s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          Building intelligent systems at the intersection of <span className="text-white font-medium">full-stack development</span> and <span className="text-white font-medium">automation</span>.
        </p>
        <div className="animate-[slideUp_0.5s_ease-out_0.4s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <a className="inline-flex items-center gap-2 px-6 py-3 border border-dark-300 text-gray-300 rounded-xl hover:border-gold hover:text-gold transition-colors" href="/resume">
            Resume <Download size={16} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-[scaleX_0.5s_ease-out_0.5s_forwards]" style={{ opacity: 0, transform: 'scaleX(0)' }}></div>

      {/* Projects Section */}
      <div className="animate-[slideUp_0.5s_ease-out_0.6s_forwards]" style={{ opacity: 0, transform: 'translateY(30px)' }}>
        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Featured Work</p>
              <h2 className="text-3xl font-bold text-white gold-underline pb-2">Selected Projects</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button className="w-9 h-9 rounded-xl bg-dark-100 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 rounded-xl bg-dark-100 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop Projects Grid */}
          <div className="hidden md:grid grid-cols-3 gap-4 items-stretch">
            {/* Project 1 */}
            <div className="relative rounded-2xl overflow-hidden flex flex-col border transition-all duration-500 cursor-pointer border-dark-300 hover:border-gold/30 hover:opacity-60" style={{ minHeight: '360px' }}>
              <div className="absolute inset-0">
                <div className="relative block overflow-hidden h-full w-full">
                  <img src="/assets/project-1.png" alt="Vaani" className="absolute inset-0 h-full w-full transition-opacity duration-500 opacity-25 object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full p-5 gap-3">
                <div className="absolute top-4 left-5 right-5 flex justify-between">
                  <span className="text-[10px] font-mono text-gray-600">2025</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    <span className="text-[10px] text-gray-500">WIP</span>
                  </div>
                </div>
                <div className="absolute top-8 right-5 text-[64px] font-bold text-white/[0.03] leading-none select-none">01</div>
                <h3 className="font-bold text-white leading-tight text-base">Vaani</h3>
                <p className="text-gray-400 leading-relaxed text-xs line-clamp-2">A Voice based Assistant for Illiterate users.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Python</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Flask</span>
                </div>
              </div>
            </div>

            {/* Project 2 (Featured/Gold Border) */}
            <div className="relative rounded-2xl overflow-hidden flex flex-col border transition-all duration-500 cursor-pointer border-gold shadow-lg shadow-gold/10" style={{ minHeight: '420px' }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/40 via-gold to-gold/40 z-10"></div>
              <div className="absolute inset-0">
                <div className="relative block overflow-hidden h-full w-full">
                  <img src="/assets/project-2.png" alt="Spotigram" className="absolute inset-0 h-full w-full transition-opacity duration-500 opacity-25 object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full p-5 gap-3">
                <div className="absolute top-4 left-5 right-5 flex justify-between">
                  <span className="text-[10px] font-mono text-gray-600">2026</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] text-gray-500">Live</span>
                  </div>
                </div>
                <div className="absolute top-8 right-5 text-[64px] font-bold text-white/[0.03] leading-none select-none">02</div>
                <h3 className="font-bold text-white leading-tight text-xl">Spotigram</h3>
                <p className="text-gray-400 leading-relaxed text-sm">A high-speed, asynchronous Telegram bot that acts as a direct bridge between Spotify and Telegram. Features a custom concurrent web scraper, MongoDB rate limiting, and a sleek terminal-style UI.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Python</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Pyrogram</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">MongoDB</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">BeautifulSoup</span>
                </div>
                <div className="flex gap-2 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ opacity: 1, transform: 'translateY(0)' }}>
                  <a href="https://github.com/ankittroy-21/Spotigram" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-200/90 border border-dark-300 rounded-lg text-xs text-gray-300 hover:text-gold hover:border-gold/50 transition-colors">
                    <Code size={12} />Code
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="relative rounded-2xl overflow-hidden flex flex-col border transition-all duration-500 cursor-pointer border-dark-300 hover:border-gold/30 hover:opacity-60" style={{ minHeight: '360px' }}>
              <div className="absolute inset-0">
                <div className="relative block overflow-hidden h-full w-full">
                  <img src="/assets/project-3.png" alt="BBD Papers" className="absolute inset-0 h-full w-full transition-opacity duration-500 opacity-25 object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full p-5 gap-3">
                <div className="absolute top-4 left-5 right-5 flex justify-between">
                  <span className="text-[10px] font-mono text-gray-600">2025</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] text-gray-500">Live</span>
                  </div>
                </div>
                <div className="absolute top-8 right-5 text-[64px] font-bold text-white/[0.03] leading-none select-none">03</div>
                <h3 className="font-bold text-white leading-tight text-base">BBD Papers</h3>
                <p className="text-gray-400 leading-relaxed text-xs line-clamp-2">A full-stack educational platform providing BBD University students with easy access to previous year question papers (PYQs) and study notes.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Next.js</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">TypeScript</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center gap-2">
            <button className="rounded-full transition-all duration-300 w-1.5 h-1.5 bg-dark-300 hover:bg-gold/40"></button>
            <button className="rounded-full transition-all duration-300 w-6 h-1.5 bg-gold"></button>
            <button className="rounded-full transition-all duration-300 w-1.5 h-1.5 bg-dark-300 hover:bg-gold/40"></button>
          </div>

          <div className="flex justify-center">
            <Link className="flex items-center gap-2 px-6 py-2.5 border border-dark-300 text-gray-400 text-sm rounded-xl hover:border-gold hover:text-gold transition-colors" to="/projects">
              View All Projects <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="animate-[slideUp_0.5s_ease-out_0.7s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">By The Numbers</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
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

      {/* Visitors Section */}
      <div className="flex justify-start">
        <div className="relative inline-flex self-start animate-[slideUp_0.5s_ease-out_0.8s_forwards]" style={{ opacity: 0, transform: 'translateY(10px)' }}>
          <button 
            type="button" 
            onClick={handleOpenGeography}
            className="relative inline-flex items-center gap-2 rounded-full border border-gold/25 bg-black/70 px-3 py-2 text-xs text-gray-200 shadow-[0_0_30px_rgba(245,166,35,0.12)] backdrop-blur-md transition-colors duration-300 hover:border-gold/50 cursor-pointer select-none group"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/10 text-gold">
              <Users size={14} />
            </span>
            <div className="flex flex-col leading-tight text-left">
              <span className="uppercase tracking-[0.18em] text-[10px] text-gray-400">Visitors</span>
              <span className="text-[10px] tracking-[0.18em] text-gray-500 sm:hidden">Tap for geography</span>
              <span className="hidden text-[10px] tracking-[0.18em] text-gray-500 sm:inline">Click for geography</span>
            </div>

            {/* Tooltip */}
            <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-max max-w-[220px] rounded-xl border border-gold/20 bg-[#101010] px-3 py-2 text-[11px] text-gray-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ transform: 'translateY(6px)' }}>
              <div className="uppercase tracking-[0.18em] text-[10px] text-gray-500">Total visitors</div>
              <div className="mt-1 font-mono text-sm text-white">1,337</div>
            </div>
          </button>
        </div>
      </div>

      {/* Geography Modal */}
      {showGeography && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <div className="bg-dark-100 border border-dark-300 rounded-3xl p-6 w-full max-w-md shadow-2xl relative text-left" style={{ animation: 'zoomIn 0.3s ease-out' }}>
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Visitor Geography
                </h3>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-0.5">Real-time Analytics</p>
              </div>
              <button 
                onClick={() => setShowGeography(false)}
                className="w-8 h-8 rounded-lg bg-dark-200 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold/50 transition-colors cursor-pointer font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* User current Location */}
            <div className="bg-dark-200 border border-dark-300 rounded-2xl p-4 mb-5 flex flex-col gap-1.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none"></div>
              <p className="text-[10px] text-gold font-mono uppercase tracking-widest">Your Session</p>
              {loadingLoc ? (
                <div className="flex items-center gap-2 py-1 text-sm text-gray-400 font-mono">
                  <span className="w-4.5 h-4.5 rounded-full border-2 border-t-gold border-dark-300 animate-spin"></span>
                  Detecting your location...
                </div>
              ) : visitorLoc ? (
                <div>
                  <p className="text-sm font-semibold text-white">
                    📍 {visitorLoc.city}, {visitorLoc.country_name}
                  </p>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    IP: {visitorLoc.ip} • ISP: {visitorLoc.org}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-400">📍 Location details unavailable</p>
              )}
            </div>

            {/* Geography Breakdown list */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Visitor Traffic Breakdown</p>
              
              <div className="flex flex-col gap-2.5">
                {[
                  { country: "Vietnam 🇻🇳", percent: 43.4, count: 580 },
                  { country: "United States 🇺🇸", percent: 20.0, count: 268 },
                  { country: "India 🇮🇳", percent: 15.0, count: 201 },
                  { country: "Singapore 🇸🇬", percent: 10.0, count: 134 },
                  { country: "Others 🌐", percent: 11.6, count: 154 }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-gray-300">{item.country}</span>
                      <span className="text-gold font-mono">{item.percent}% <span className="text-gray-600 text-[10px]">({item.count})</span></span>
                    </div>
                    <div className="h-1.5 w-full bg-dark-200 border border-dark-300/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-gold/60 to-gold rounded-full transition-all duration-1000"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer status */}
            <div className="mt-5 pt-4 border-t border-dark-300 flex justify-between items-center text-[10px] font-mono text-gray-500">
              <span>Status: Active</span>
              <span>Total views: 1,337</span>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleX {
          to { opacity: 1; transform: scaleX(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
