import React, { useState, useEffect } from 'react';
import skillsData from '../skills.json';

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Parse the style strings to react objects, or just reset them for animation
    const parsedSkills = skillsData.map((s, i) => {
      // the original style has scale(0.7) and a random rotation. 
      // We will extract rotation or just generate a random one to avoid complex parsing.
      const randomRot = (Math.random() - 0.5) * 6; // -3 to 3 degrees
      return {
        ...s,
        id: i,
        rot: randomRot
      };
    });
    setSkills(parsedSkills);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 pt-4 animate-[slideUp_0.5s_ease-out_forwards]">
      <div className="animate-[slideUp_0.5s_ease-out_0.1s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Expertise</p>
        <h1 className="text-4xl font-bold text-white gold-underline pb-2">Technical Skills</h1>
        <p className="text-gray-500 text-sm mt-4">44 technologies · hover to explore</p>
      </div>

      <div className="flex flex-wrap gap-2 animate-[slideUp_0.5s_ease-out_0.2s_forwards]" style={{ opacity: 0, transform: 'translateY(10px)' }}>
        <button className="px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-gold text-dark border-gold font-semibold">All</button>
        <button className="px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white">
          Backend<span className="ml-1.5 opacity-50 text-[9px]">5</span>
        </button>
        <button className="px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white">
          Frontend<span className="ml-1.5 opacity-50 text-[9px]">7</span>
        </button>
        <button className="px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white">
          Libraries &amp; Frameworks<span className="ml-1.5 opacity-50 text-[9px]">9</span>
        </button>
        <button className="px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white">
          Database and Cloud<span className="ml-1.5 opacity-50 text-[9px]">10</span>
        </button>
        <button className="px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white">
          DevOps<span className="ml-1.5 opacity-50 text-[9px]">10</span>
        </button>
        <button className="px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white">
          AI &amp; ML<span className="ml-1.5 opacity-50 text-[9px]">3</span>
        </button>
      </div>

      <div className="relative w-full">
        <div className="grid gap-x-4 gap-y-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
          {skills.map((skill, idx) => (
            <div 
              key={skill.id} 
              className="relative flex flex-col items-center gap-2 cursor-default group animate-[popIn_0.4s_ease-out_forwards]"
              style={{ zIndex: 1, opacity: 0, animationDelay: `${idx * 0.02}s`, transform: `scale(1) rotate(${skill.rot}deg)` }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border relative overflow-hidden border-dark-300 bg-dark-100 group-hover:border-gold/50 group-hover:bg-dark-200 group-hover:scale-110 group-hover:z-10 group-hover:shadow-[0_0_20px_rgba(191,90,242,0.15)] group-hover:!rotate-0">
                  <div className="relative block overflow-hidden w-8 h-8">
                    <img 
                      src={skill.img} 
                      alt={skill.name} 
                      className="block h-full w-full object-contain transition-all duration-300 z-10 brightness-90 group-hover:brightness-100" 
                      style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(8) hue-rotate(280deg) brightness(1.05) contrast(0.95)' }} 
                    />
                  </div>
                </div>
                <p className="text-[10px] font-medium text-center leading-tight transition-colors duration-200 max-w-[64px] truncate text-gray-500 group-hover:text-gold">{skill.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.7) rotate(0deg); }
          100% { opacity: 1; transform: scale(1) var(--target-rot, rotate(0deg)); }
        }
      `}</style>
    </div>
  );
}
