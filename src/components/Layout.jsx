import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { DesktopNav, MobileNav } from './Navigation';
import { Terminal, Binoculars, ChevronDown } from 'lucide-react';
import ProfileSidebar from './ProfileSidebar';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [logs, setLogs] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock body scrolling during loading
    document.body.style.overflow = 'hidden';

    const logQueue = [
      { text: '$ sh boot.sh', delay: 100, prog: 5 },
      { text: '> Initializing PostgreSQL connection... [OK]', delay: 350, prog: 15 },
      { text: '> Connecting Redis Cache... [OK]', delay: 600, prog: 28 },
      { text: '> Checking microservices health... [OK]', delay: 850, prog: 42 },
      { text: '> Loading environment variables... [OK]', delay: 1100, prog: 55 },
      { text: '> Starting API server on port 8080... [OK]', delay: 1350, prog: 68 },
      { text: '$ curl -s https://api.lelam.dev/profile', delay: 1650, prog: 82 },
      { text: '> Parsing profile schema... [OK]', delay: 1950, prog: 94 },
      { text: '> Done. Boot successful.', delay: 2200, prog: 100 },
    ];

    logQueue.forEach((item) => {
      setTimeout(() => {
        setLogs(prev => [...prev, item.text]);
        setProgress(item.prog);
      }, item.delay);
    });

    setTimeout(() => {
      setShowCode(true);
    }, 2450);

    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        setVisible(false);
        // Restore scrolling once loading is complete
        document.body.style.overflow = '';
      }, 500);
    }, 4500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden px-4 transition-opacity duration-500"
      style={{ opacity, backgroundColor: '#070708' }}
    >
      {/* Futuristic Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(191,90,242,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(191,90,242,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      ></div>
      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(191,90,242,0.02) 2px, rgba(191,90,242,0.02) 4px)' }}
      ></div>

      {/* Terminal Window */}
      <div
        className="w-full max-w-lg rounded-xl border p-4 font-mono text-xs shadow-2xl relative overflow-hidden backdrop-blur-md animate-[terminalPop_0.4s_ease-out_forwards]"
        style={{
          backgroundColor: '#0d0d10',
          borderColor: 'rgba(191, 90, 242, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(191, 90, 242, 0.15)',
        }}
      >
        {/* Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#bf5af2]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Controls */}
        <div className="flex items-center justify-between border-b border-dark-300/60 pb-3 mb-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-[10px] text-gray-500 tracking-wider">lelam@backend-server: ~</span>
          <div className="w-12"></div>
        </div>

        {/* Console logs */}
        <div className="space-y-1.5 text-gray-400 select-none min-h-[170px] flex flex-col justify-between">
          <div className="space-y-1">
            {logs.map((log, index) => {
              const isCommand = log.startsWith('$');
              return (
                <p key={index} className={isCommand ? 'text-white' : 'text-gray-400'}>
                  <span className="text-[#bf5af2]/80 mr-1.5 font-bold">{isCommand ? 'λ' : '⚡'}</span>
                  {log}
                </p>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 border-t border-dark-300/40 pt-3 flex flex-col gap-1.5">
            <div className="flex justify-between text-[9px] text-[#bf5af2] font-mono tracking-wider font-semibold">
              <span>BOOT LOADER STATUS</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 rounded overflow-hidden relative" style={{ backgroundColor: '#1a1a22', border: '1px solid rgba(191,90,242,0.1)' }}>
              <div
                className="h-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, rgba(191, 90, 242, 0.6), rgb(191, 90, 242))',
                  boxShadow: '0 0 8px rgba(191, 90, 242, 0.7)',
                }}
              ></div>
            </div>
          </div>

          {showCode && (
            <div className="border-t border-dark-300/40 pt-3 mt-2 animate-fade-in flex flex-col gap-2">
              <div className="text-[10px] text-[#bf5af2]/60 uppercase tracking-widest font-bold font-mono">Fetched Profile Details</div>

              {/* Profile Card */}
              <div
                className="flex flex-col gap-1 p-3 rounded-lg border relative group overflow-hidden"
                style={{
                  backgroundColor: 'rgba(45, 45, 45, 0.4)',
                  borderColor: 'rgba(58, 58, 58, 0.5)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#bf5af2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#bf5af2] font-bold">&lt;Developer /&gt;</span>
                  <span className="text-[10px] text-emerald-400 font-mono tracking-normal bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 animate-pulse">
                    ONLINE
                  </span>
                </div>

                {/* Glow styled LE LAM name */}
                <div className="text-3xl font-bold tracking-[0.25em] text-white mt-1 flex items-center gap-1.5 font-mono drop-shadow-[0_0_8px_rgba(191,90,242,0.5)]">
                  <span className="text-[#bf5af2]">LE</span>
                  <span className="text-white">LAM</span>
                  <span className="inline-block w-2.5 h-6 bg-[#bf5af2] animate-[blink_1s_infinite] ml-1"></span>
                </div>

                <div className="grid grid-cols-2 gap-y-1 mt-2 text-[10px] text-gray-500 border-t border-dark-300/20 pt-2 font-mono">
                  <div>ROLE: <span className="text-gray-300">Backend Architect</span></div>
                  <div>IP: <span className="text-gray-300">127.0.0.1</span></div>
                  <div>LOC: <span className="text-gray-300">Hanoi, VN</span></div>
                  <div>STATUS: <span className="text-gray-300">Ready</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes terminalPop {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
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
          <ProfileSidebar isMobile={false} />
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
