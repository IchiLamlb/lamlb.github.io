import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { DesktopNav, MobileNav } from './Navigation';
import { Terminal, Binoculars, ChevronDown } from 'lucide-react';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => setVisible(false), 500);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 transition-opacity duration-500" 
      style={{ opacity }}
    >
      <div 
        className="pointer-events-none absolute inset-0" 
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(191,90,242,0.015) 2px, rgba(191,90,242,0.015) 4px)' }}
      ></div>
      <div 
        className="relative flex items-center justify-center" 
        style={{ gap: 'clamp(24px, 8vw, 48px)' }}
      >
        <span 
          className="block text-[clamp(64px,18vw,96px)] font-bold leading-none text-[#bf5af2] [font-family:'Cinzel','Playfair_Display',Georgia,serif] animate-[slideRight_1s_ease-out_forwards]" 
          style={{ textShadow: '0 0 40px rgba(191,90,242,0.3)', opacity: 0, transform: 'translateX(-120px)' }}
        >
          A
        </span>
        <span 
          className="block text-[clamp(64px,18vw,96px)] font-bold leading-none text-[#bf5af2] [font-family:'Cinzel','Playfair_Display',Georgia,serif] animate-[slideLeft_1s_ease-out_forwards]" 
          style={{ textShadow: '0 0 40px rgba(191,90,242,0.3)', opacity: 0, transform: 'translateX(120px)' }}
        >
          R
        </span>
      </div>
      <style>{`
        @keyframes slideRight {
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export function ActionButtons() {
  return (
    <>
      <div className="fixed bottom-40 right-8 z-[35] group/terminal lg:bottom-24">
        <button className="w-14 h-14 rounded-full bg-gradient-to-br from-[#bf5af2]/20 to-[#bf5af2]/10 border-2 border-[#bf5af2]/60 flex items-center justify-center text-[#bf5af2] hover:border-[#bf5af2] hover:from-[#bf5af2]/30 hover:to-[#bf5af2]/20 transition-all shadow-lg shadow-[#bf5af2]/20" tabIndex="0">
          <span className="font-mono text-sm font-bold">&gt;_</span>
        </button>
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-dark-200 border border-[#bf5af2]/30 rounded-lg px-3 py-1.5 whitespace-nowrap opacity-0 group-hover/terminal:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl shadow-black/20 hidden lg:block">
          <p className="text-xs text-gold font-mono">Open Terminal</p>
        </div>
      </div>
      <div className="fixed bottom-24 right-8 z-40 lg:bottom-8">
        <div className="relative group/contact">
          <button className="w-14 h-14 rounded-full bg-gradient-to-br from-[#bf5af2]/20 to-[#bf5af2]/10 border-2 border-[#bf5af2]/60 flex items-center justify-center text-[#bf5af2] hover:border-[#bf5af2] hover:from-[#bf5af2]/30 hover:to-[#bf5af2]/20 transition-all shadow-lg shadow-[#bf5af2]/20" tabIndex="0">
            <Binoculars size={24} />
          </button>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-dark-200 border border-[#bf5af2]/30 rounded-lg px-3 py-1.5 whitespace-nowrap opacity-0 group-hover/contact:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl shadow-black/20 hidden lg:block">
            <p className="text-xs text-gold font-mono">Want to connect?</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function Layout() {
  return (
    <>
      <LoadingScreen />
      <DesktopNav />
      <MobileNav />
      <div className="relative z-10 flex min-h-screen">
        <div className="hidden shrink-0 p-8 pr-4 pt-8 lg:flex">
          {/* Profile Sidebar for Desktop will go here or empty space if it's part of page */}
        </div>
        <main className="min-w-0 flex-1 pt-0 lg:pt-6">
          <div className="px-6 pb-24 lg:px-10 lg:pb-12 lg:pt-20">
            <canvas className="fixed inset-0 pointer-events-none z-0"></canvas>
            <Outlet />
          </div>
        </main>
      </div>
      <ActionButtons />
    </>
  );
}
