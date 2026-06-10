import React, { useState } from 'react';
import { Music } from 'lucide-react';

export default function SpotifyPlayer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block group cursor-pointer animate-[slideUp_0.5s_ease-out]">
      <div
        className={`relative flex items-center gap-4 rounded-full border bg-dark-200/40 p-2 pr-6 backdrop-blur-md transition-all duration-500 ease-out hover:bg-dark-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          ${isHovered ? 'border-[#1DB954]/50 shadow-[#1DB954]/20' : 'border-dark-300 shadow-purple-900/10'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glowing Background on hover */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#1DB954]/10 to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />

        {/* Album Art / Vinyl */}
        <div className="relative w-12 h-12 shrink-0 rounded-full bg-dark-300 p-0.5 shadow-inner">
          <div className="absolute inset-0 rounded-full border border-dark-100/50 z-10" />
          <img
            src="https://i.scdn.co/image/ab67616d0000b273722a27fc6ecad7f3bcff523e"
            alt="Album Art"
            className="w-full h-full rounded-full object-cover animate-[spin_4s_linear_infinite]"
          />
          {/* Vinyl inner circle */}
          <div className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dark-100 border border-dark-300 z-20" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center min-w-[120px] max-w-[160px] overflow-hidden">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[#1DB954]">
              <Music size={12} className={isHovered ? "animate-pulse" : ""} />
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#1DB954] uppercase font-semibold">Now Playing</span>
          </div>

          {/* Marquee effect for title if hovered */}
          <div className="relative w-full overflow-hidden h-[18px]">
            <div className={`whitespace-nowrap text-sm font-bold text-white transition-transform duration-300 ${isHovered ? 'animate-marquee' : ''}`}>
              Đừng Làm Trái Tim Anh Đau
            </div>
          </div>

          <div className="text-xs text-gray-400 truncate">Sơn Tùng M-TP</div>
        </div>

        {/* Audio Visualizer */}
        <div className="flex items-end gap-[2px] h-4 ml-2">
          <div className="w-[3px] bg-[#1DB954] rounded-full animate-audio-bar-1 opacity-80" />
          <div className="w-[3px] bg-[#1DB954] rounded-full animate-audio-bar-2 opacity-80" />
          <div className="w-[3px] bg-[#1DB954] rounded-full animate-audio-bar-3 opacity-80" />
          <div className="w-[3px] bg-[#1DB954] rounded-full animate-audio-bar-4 opacity-80" />
        </div>
      </div>
    </div>
  );
}
