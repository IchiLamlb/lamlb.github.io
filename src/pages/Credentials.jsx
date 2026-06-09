import React, { useState } from 'react';
import { ExternalLink, Download, X } from 'lucide-react';
import credentialsData from '../credentials.json';

export default function Credentials() {
  const [creds] = useState(credentialsData);
  const [selectedCred, setSelectedCred] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleDownload = (e, imgUrl, title) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = imgUrl;
    a.download = `${title.replace(/\s+/g, '_')}_Certificate.png`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Filter Logic
  const filteredCreds = creds.filter(cred => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Hackathon') {
      return cred.issuer === 'BBDNIIT' || cred.title.toLowerCase().includes('hackathon');
    }
    if (activeFilter === 'Certificates') {
      return cred.issuer === 'HackerRank' || cred.issuer === 'Forage' || cred.issuer === 'DataCamp';
    }
    return true;
  });

  const hackathonCount = creds.filter(c => c.issuer === 'BBDNIIT' || c.title.toLowerCase().includes('hackathon')).length;
  const certCount = creds.filter(c => c.issuer === 'HackerRank' || c.issuer === 'Forage' || c.issuer === 'DataCamp').length;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 pt-4 animate-[slideUp_0.5s_ease-out_forwards]">
      <div className="animate-[slideUp_0.5s_ease-out_0.1s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Achievements</p>
        <h1 className="text-4xl font-bold text-white gold-underline pb-2">My Credentials</h1>
        <p className="text-gray-500 text-sm mt-4">{filteredCreds.length} credentials · scroll to explore</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 animate-[slideUp_0.5s_ease-out_0.2s_forwards]" style={{ opacity: 0, transform: 'translateY(10px)' }}>
        <button
          onClick={() => setActiveFilter('All')}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${activeFilter === 'All'
            ? 'bg-gold text-dark border-gold'
            : 'bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white'
            }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter('Hackathon')}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${activeFilter === 'Hackathon'
            ? 'bg-gold text-dark border-gold'
            : 'bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white'
            }`}
        >
          Hackathon<span className="ml-1.5 text-[9px] opacity-60">{hackathonCount}</span>
        </button>
        <button
          onClick={() => setActiveFilter('Certificates')}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${activeFilter === 'Certificates'
            ? 'bg-gold text-dark border-gold'
            : 'bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white'
            }`}
        >
          Certificates<span className="ml-1.5 text-[9px] opacity-60">{certCount}</span>
        </button>
      </div>

      {/* Desktop Timeline Grid */}
      <div className="hidden md:block relative animate-[slideUp_0.5s_ease-out_0.3s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #bf5af2 0px, #bf5af2 6px, transparent 6px, transparent 14px)' }}></div>
        <div className="flex flex-col gap-14">
          {filteredCreds.map((cred, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className={`flex items-center w-full gap-0 group-timeline-item ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-[calc(50%-28px)] flex ${isLeft ? 'justify-end' : 'justify-start'}`}>
                  <div className="w-full max-w-sm cred-card-container">
                    <div className="cred-card-inner">
                      {/* Front Side: Certificate Image Preview */}
                      <div className="cred-card-front" onClick={() => setSelectedCred(cred)}>
                        <img src={cred.img} alt={cred.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 text-gold font-mono text-[9px] tracking-[0.15em] uppercase bg-black/80 px-2.5 py-1 rounded-full border border-gold/30 backdrop-blur-sm">
                          {cred.issuer}
                        </div>
                      </div>

                      {/* Back Side: Text Details */}
                      <div className="cred-card-back" onClick={() => setSelectedCred(cred)}>
                        <div>
                          <p className="text-gold text-[10px] font-mono uppercase tracking-widest mb-2">{cred.issuer}</p>
                          <p className="text-white text-xs font-semibold leading-snug">{cred.title}</p>
                          <p className="text-gray-500 text-[10px] font-mono mt-1">{cred.date}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 my-2">
                          {cred.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 text-[9px] font-mono bg-dark-300 border border-gold/20 text-gold rounded-full uppercase">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            {cred.link ? (
                              <a
                                href={cred.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors w-fit"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={12} /> View
                              </a>
                            ) : (
                              <p className="text-[10px] text-gray-600 font-mono">No link</p>
                            )}
                          </div>
                          <p className="text-gold text-[10px] font-mono uppercase tracking-widest">Click to See</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-14 flex flex-col items-center shrink-0 relative z-10">
                  <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center timeline-dot-outer">
                    <div className="w-2 h-2 rounded-full timeline-dot-inner"></div>
                  </div>
                </div>
                <div className="w-[calc(50%-28px)]"></div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <div className="w-5 h-5 rounded-full bg-dark-200 border-2 border-dark-300 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-dark-300"></div>
          </div>
        </div>
      </div>

      {/* Mobile view Grid */}
      <div className="md:hidden flex flex-col gap-6 animate-[slideUp_0.5s_ease-out_0.3s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        {filteredCreds.map((cred, idx) => (
          <div
            key={idx}
            className="w-full max-w-sm mx-auto cred-card-container"
          >
            <div className="cred-card-inner">
              {/* Front Side: Certificate Image Preview */}
              <div className="cred-card-front" onClick={() => setSelectedCred(cred)}>
                <img src={cred.img} alt={cred.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 text-gold font-mono text-[9px] tracking-[0.15em] uppercase bg-black/80 px-2.5 py-1 rounded-full border border-gold/30 backdrop-blur-sm">
                  {cred.issuer}
                </div>
              </div>

              {/* Back Side: Text Details */}
              <div className="cred-card-back" onClick={() => setSelectedCred(cred)}>
                <div>
                  <p className="text-gold text-[10px] font-mono uppercase tracking-widest mb-1.5">{cred.issuer}</p>
                  <p className="text-white text-xs font-semibold leading-snug">{cred.title}</p>
                  <p className="text-gray-500 text-[10px] font-mono mt-1">{cred.date}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 my-2">
                  {cred.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-[9px] font-mono bg-dark-300 border border-gold/20 text-gold rounded-full uppercase">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] text-gray-500">{cred.link ? 'Has link' : 'No link'}</span>
                  <span className="text-gold text-[10px] font-mono uppercase tracking-widest">Tap to view</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedCred && (
        <div
          onClick={() => setSelectedCred(null)}
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border border-dark-300 rounded-3xl p-6 w-full max-w-2xl shadow-2xl relative text-left overflow-y-auto max-h-[90vh] flex flex-col gap-4 animate-[zoomIn_0.3s_ease-out]"
            style={{ backgroundColor: '#000000', animation: 'zoomIn 0.3s ease-out' }}
          >
            {/* Header */}
            <div className="pr-10">
              <h3 className="text-lg font-bold text-white leading-snug">{selectedCred.title}</h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedCred.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-0.5 text-[9px] font-mono bg-dark-200 border border-gold/20 text-gold rounded-full uppercase">{tag}</span>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedCred(null)}
              className="absolute w-9 h-9 rounded-full bg-dark-200 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold/50 transition-colors cursor-pointer"
              style={{ right: '24px', top: '24px', zIndex: 10 }}
            >
              <X size={16} />
            </button>

            {/* Certificate Image Body */}
            <div className="bg-dark-200/30 border border-dark-300/40 rounded-xl overflow-hidden flex items-center justify-center p-2">
              <img
                src={selectedCred.img}
                alt={selectedCred.title}
                className="w-full h-auto max-h-[50vh] object-contain rounded-lg"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 mt-2">
              <span className="text-xs text-gray-500 font-mono">
                {selectedCred.issuer} • {selectedCred.date}
              </span>
              <div className="flex gap-2">
                {selectedCred.link && (
                  <a
                    href={selectedCred.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-dark-200 hover:bg-dark-300 border border-dark-300 rounded-xl text-xs text-gray-300 hover:text-white transition-all"
                  >
                    <ExternalLink size={13} /> Verify
                  </a>
                )}
                <button
                  onClick={(e) => handleDownload(e, selectedCred.img, selectedCred.title)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/40 hover:border-gold rounded-xl text-xs text-gold hover:text-gold-light transition-all cursor-pointer"
                >
                  <Download size={13} /> Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom styles for card flip and animations */}
      <style>{`
        .cred-card-container {
          perspective: 1000px;
          width: 100%;
        }
        .cred-card-inner {
          position: relative;
          width: 100%;
          height: 215px;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .cred-card-container:hover .cred-card-inner {
          transform: rotateY(180deg);
        }
        .cred-card-front, .cred-card-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          border-radius: 1rem;
          border: 1px solid rgba(58, 58, 58, 0.8);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }
        .cred-card-front {
          background-color: #111111;
        }
        .cred-card-front img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cred-card-container:hover .cred-card-front {
          border-color: rgba(191, 90, 242, 0.4);
        }
        .cred-card-back {
          background-color: #141414;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem;
        }
        .cred-card-container:hover .cred-card-back {
          border-color: rgba(191, 90, 242, 0.4);
        }
        .timeline-dot-outer {
          background-color: #1a1a1a;
          border-color: rgba(191, 90, 242, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .timeline-dot-inner {
          background-color: rgba(191, 90, 242, 0.6);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .group-timeline-item:hover .timeline-dot-outer {
          border-color: #bf5af2;
          transform: scale(1.15);
          box-shadow: 0 0 12px rgba(191, 90, 242, 0.6);
          background-color: rgba(191, 90, 242, 0.1);
        }
        .group-timeline-item:hover .timeline-dot-inner {
          background-color: #bf5af2;
          transform: scale(1.2);
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
