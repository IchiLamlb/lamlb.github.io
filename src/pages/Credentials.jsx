import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import credentialsData from '../credentials.json';

export default function Credentials() {
  const [creds] = useState(credentialsData);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 pt-4 animate-[slideUp_0.5s_ease-out_forwards]">
      <div className="animate-[slideUp_0.5s_ease-out_0.1s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Achievements</p>
        <h1 className="text-4xl font-bold text-white gold-underline pb-2">My Credentials</h1>
        <p className="text-gray-500 text-sm mt-4">6 credentials · scroll to explore</p>
      </div>

      <div className="flex flex-wrap gap-2 animate-[slideUp_0.5s_ease-out_0.2s_forwards]" style={{ opacity: 0, transform: 'translateY(10px)' }}>
        <button className="px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-gold text-dark border-gold font-semibold">All</button>
        <button className="px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white">
          Hackathon<span className="ml-1.5 text-[9px] opacity-60">2</span>
        </button>
        <button className="px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white">
          Certificates<span className="ml-1.5 text-[9px] opacity-60">4</span>
        </button>
      </div>

      <div className="hidden md:block relative animate-[slideUp_0.5s_ease-out_0.3s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #bf5af2 0px, #bf5af2 6px, transparent 6px, transparent 14px)' }}></div>
        <div className="flex flex-col gap-14">
          {creds.map((cred, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className={`flex items-center w-full gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-[calc(50%-28px)] flex justify-end">
                  <div className="w-full max-w-sm group" style={{ perspective: '1000px', opacity: 1, transform: isLeft ? 'translateX(-20px)' : 'translateX(20px)', transition: 'all 0.5s' }}>
                    <div className="h-full w-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]" style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: '190px' }}>
                      {/* Front Side */}
                      <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0 bg-dark-100 border border-dark-300 rounded-2xl overflow-hidden group-hover:border-gold/40 transition-colors cursor-pointer">
                        <div className="relative block overflow-hidden h-full w-full">
                          <img src={cred.img} alt={cred.title} className="absolute inset-0 h-full w-full opacity-100 object-cover" />
                        </div>
                        <div className="absolute top-3 right-3 text-gold font-mono text-xs tracking-[0.2em] uppercase max-w-[60%] text-right bg-dark-200/80 px-2 py-1 rounded backdrop-blur-sm">
                          {cred.title}
                        </div>
                      </div>
                      
                      {/* Back Side */}
                      <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} className="absolute inset-0 bg-dark-200 border border-gold/30 rounded-2xl p-4 flex flex-col justify-between gap-2.5 cursor-pointer">
                        <div>
                          <p className="text-gold text-[10px] font-mono uppercase tracking-widest mb-2">{cred.issuer}</p>
                          <p className="text-white text-xs font-semibold leading-snug">{cred.title}</p>
                          <p className="text-gray-500 text-[10px] font-mono mt-1">{cred.date}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cred.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 text-[9px] font-mono bg-dark-300 border border-gold/20 text-gold rounded-full uppercase">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {cred.link ? (
                              <a href={cred.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors w-fit">
                                <ExternalLink size={12} /> View Certificate
                              </a>
                            ) : (
                              <p className="text-[10px] text-gray-600">No link available</p>
                            )}
                          </div>
                          <p className="text-gold text-[10px] font-mono uppercase tracking-widest">Click to See</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-14 flex flex-col items-center shrink-0 relative z-10">
                  <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-dark-200 border-gold/50 scale-100">
                    <div className="w-2 h-2 rounded-full transition-colors duration-300 bg-gold/60"></div>
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

      {/* Mobile view omitted for brevity, but follows same structure */}
    </div>
  );
}
